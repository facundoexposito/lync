import { NextResponse } from 'next/server'
import { Octokit } from '@octokit/rest'
import { isAdminRequest } from '@/lib/admin-auth'
import type { BlogCategory, PublishRequest } from '@/lib/admin-types'

export const runtime = 'nodejs'
export const maxDuration = 30

const BLOG_DATA_PATH = 'src/data/blog-posts.ts'
const BLOG_IMAGE_DIR = 'public/brand/BLOG'
const ALLOWED_EXTS = ['jpg', 'jpeg', 'png', 'webp', 'avif']
const ALLOWED_CATEGORIES: BlogCategory[] = ['Nightlife', 'Meetups', 'Wellness']

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

/** Render one GeneratedSection as a TypeScript object literal with 6-space indent. */
function renderSection(section: { heading?: string; body: string[] }): string {
  const lines: string[] = ['      {']
  if (section.heading) {
    lines.push(`        heading: ${JSON.stringify(section.heading)},`)
  }
  lines.push('        body: [')
  for (const p of section.body) {
    lines.push(`          ${JSON.stringify(p)},`)
  }
  lines.push('        ],')
  lines.push('      },')
  return lines.join('\n')
}

function renderPostLiteral(post: {
  slug: string
  title: string
  date: string
  category: BlogCategory
  excerpt: string
  image: string
  content: Array<{ heading?: string; body: string[] }>
}): string {
  const sections = post.content.map(renderSection).join('\n')
  return [
    '  {',
    `    slug: ${JSON.stringify(post.slug)},`,
    `    title: ${JSON.stringify(post.title)},`,
    `    date: ${JSON.stringify(post.date)},`,
    `    category: ${JSON.stringify(post.category)},`,
    `    excerpt: ${JSON.stringify(post.excerpt)},`,
    `    image: ${JSON.stringify(post.image)},`,
    '    content: [',
    sections,
    '    ],',
    '  },',
  ].join('\n')
}

/** Insert a new post literal at the top of the `blogPosts` array. */
function insertPostIntoSource(source: string, postLiteral: string): string {
  const marker = 'export const blogPosts: BlogPost[] = ['
  const idx = source.indexOf(marker)
  if (idx === -1) {
    throw new Error('Could not locate blogPosts array in blog-posts.ts')
  }
  const insertAt = idx + marker.length
  return `${source.slice(0, insertAt)}\n${postLiteral}${source.slice(insertAt)}`
}

export async function POST(req: Request) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_REPO_OWNER
  const repo = process.env.GITHUB_REPO_NAME
  const branch = process.env.GITHUB_REPO_BRANCH || 'main'

  if (!token || !owner || !repo) {
    return NextResponse.json(
      { error: 'Missing GITHUB_TOKEN / GITHUB_REPO_OWNER / GITHUB_REPO_NAME' },
      { status: 500 }
    )
  }

  let body: PublishRequest
  try {
    body = (await req.json()) as PublishRequest
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (
    !body.slug?.trim() ||
    !body.title?.trim() ||
    !body.excerpt?.trim() ||
    !Array.isArray(body.content) ||
    body.content.length === 0 ||
    !body.imageDataUrl ||
    !body.imageExt
  ) {
    return NextResponse.json({ error: 'Missing required post fields' }, { status: 400 })
  }
  if (!ALLOWED_CATEGORIES.includes(body.category)) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
  }

  const ext = body.imageExt.toLowerCase().replace(/^\./, '').replace('jpeg', 'jpg')
  if (!ALLOWED_EXTS.includes(ext)) {
    return NextResponse.json(
      { error: `Unsupported image extension: ${body.imageExt}` },
      { status: 400 }
    )
  }

  const base64Match = body.imageDataUrl.match(/^data:image\/[\w+.-]+;base64,(.+)$/)
  if (!base64Match) {
    return NextResponse.json({ error: 'Invalid image data URL' }, { status: 400 })
  }
  const imageBase64 = base64Match[1]

  const slug = body.slug.replace(/[^a-z0-9-]/gi, '').toLowerCase()
  const imagePath = `${BLOG_IMAGE_DIR}/${slug}.${ext}`
  const postWithMeta = {
    slug,
    title: body.title.trim(),
    date: today(),
    category: body.category,
    excerpt: body.excerpt.trim(),
    image: `/${imagePath.replace(/^public\//, '')}`,
    content: body.content.map((s) => ({
      heading: s.heading?.trim() || undefined,
      body: s.body.map((p) => p.trim()).filter(Boolean),
    })),
  }

  const octokit = new Octokit({ auth: token })

  try {
    // 1) Read current blog-posts.ts from GitHub (authoritative source)
    const file = await octokit.repos.getContent({
      owner,
      repo,
      path: BLOG_DATA_PATH,
      ref: branch,
    })
    if (Array.isArray(file.data) || file.data.type !== 'file' || !('content' in file.data)) {
      throw new Error('Unexpected response fetching blog-posts.ts')
    }
    const currentSource = Buffer.from(file.data.content, 'base64').toString('utf8')

    if (currentSource.includes(`slug: ${JSON.stringify(postWithMeta.slug)}`)) {
      return NextResponse.json(
        { error: `A post with slug "${slug}" already exists` },
        { status: 409 }
      )
    }

    const newSource = insertPostIntoSource(currentSource, renderPostLiteral(postWithMeta))

    // 2) Get current branch head + tree
    const refData = await octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${branch}`,
    })
    const parentCommitSha = refData.data.object.sha
    const parentCommit = await octokit.git.getCommit({
      owner,
      repo,
      commit_sha: parentCommitSha,
    })
    const baseTreeSha = parentCommit.data.tree.sha

    // 3) Upload image + ts file as blobs
    const [imageBlob, tsBlob] = await Promise.all([
      octokit.git.createBlob({ owner, repo, content: imageBase64, encoding: 'base64' }),
      octokit.git.createBlob({
        owner,
        repo,
        content: Buffer.from(newSource, 'utf8').toString('base64'),
        encoding: 'base64',
      }),
    ])

    // 4) Create a new tree containing both files
    const newTree = await octokit.git.createTree({
      owner,
      repo,
      base_tree: baseTreeSha,
      tree: [
        { path: imagePath, mode: '100644', type: 'blob', sha: imageBlob.data.sha },
        { path: BLOG_DATA_PATH, mode: '100644', type: 'blob', sha: tsBlob.data.sha },
      ],
    })

    // 5) Commit + update branch
    const commitMessage = `blog: publish "${postWithMeta.title}" via /admin`
    const newCommit = await octokit.git.createCommit({
      owner,
      repo,
      message: commitMessage,
      tree: newTree.data.sha,
      parents: [parentCommitSha],
    })
    await octokit.git.updateRef({
      owner,
      repo,
      ref: `heads/${branch}`,
      sha: newCommit.data.sha,
    })

    const commitUrl = `https://github.com/${owner}/${repo}/commit/${newCommit.data.sha}`
    const liveUrl = `https://lyncevents.com/blog/${slug}`

    return NextResponse.json({
      ok: true,
      slug,
      commitUrl,
      url: liveUrl,
    })
  } catch (err: unknown) {
    const detail = err instanceof Error ? err.message : String(err)
    console.error('GitHub publish failed', err)
    return NextResponse.json(
      { error: 'GitHub publish failed', detail },
      { status: 502 }
    )
  }
}
