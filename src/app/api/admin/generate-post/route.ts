import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getAllBlogs } from '@/lib/sanity/fetchers'
import { isAdminRequest } from '@/lib/admin-auth'
import type { BlogBrief, BlogCategory, GeneratedPost } from '@/lib/admin-types'

export const runtime = 'nodejs'

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5'
const ALLOWED_CATEGORIES: BlogCategory[] = ['Nightlife', 'Meetups', 'Wellness']

function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80)
}

const LYNC_CONTEXT = `You are the editor-in-chief of LYNC, a platform that helps international women in Madrid make real friends through curated events (coffee meetups, wine nights, yoga sessions, workshops, and retreats).
Brand voice:
- Warm, confident, honest. Never corporate. Never hype-y.
- Writes like a slightly older friend giving advice over coffee.
- Madrid-specific details welcome (neighborhoods, cafés, cultural beats) — but don't invent real venue names or events unless given.
- The audience is mostly women aged ~23-35 who recently moved to Madrid (students, expats, travelers).
Structure of every LYNC post:
- 3 to 5 sections total.
- The FIRST section has NO heading (intro) — 2 short paragraphs.
- All other sections have a heading (title-case, evocative) and 1-2 short paragraphs.
- Short paragraphs (2-4 sentences), no bullet lists, no emoji in body, no quotes from fake people.
- End with a soft CTA-style closing paragraph that nudges to LYNC events/community without feeling salesy.
- Length: ~400-550 words total.`

async function buildUserPrompt(brief: BlogBrief): Promise<string> {
  const blogPosts = await getAllBlogs()
  const examples = blogPosts
    .slice(0, 3)
    .map((p, i) =>
      [
        `### Example ${i + 1}`,
        `Title: ${p.title}`,
        `Category: ${p.category}`,
        `Excerpt: ${p.excerpt}`,
        'Sections:',
        ...p.content.map((s, j) =>
          [
            `  (${j + 1}) heading: ${s.heading ?? '[intro, no heading]'}`,
            ...s.body.map((b) => `     ${b}`),
          ].join('\n')
        ),
      ].join('\n')
    )
    .join('\n\n')

  return [
    'Write ONE new LYNC blog post based on the brief below, matching the voice and structure of the examples.',
    '',
    '## Existing posts (for style reference only — do not copy)',
    examples,
    '',
    '## Brief',
    `Working title: ${brief.workingTitle}`,
    `Category: ${brief.category}`,
    `Note from the founder:\n${brief.founderNote}`,
    brief.keyQuestions.trim()
      ? `Key questions / topics to cover (turn these into section headings, in order):\n${brief.keyQuestions}`
      : 'No specific questions provided — you choose the section angles.',
    '',
    '## Output',
    'Return ONLY valid JSON matching this schema (no prose, no markdown fences):',
    `{
  "title": "polished, title-case, not clickbaity",
  "excerpt": "one sentence, under 180 chars, used for meta description + card preview",
  "content": [
    { "body": ["paragraph 1", "paragraph 2"] },
    { "heading": "Section Heading", "body": ["paragraph 1", "paragraph 2"] }
  ]
}`,
  ].join('\n')
}

function extractJson(text: string): unknown {
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  const raw = (fence ? fence[1] : text).trim()
  const start = raw.indexOf('{')
  const end = raw.lastIndexOf('}')
  if (start === -1 || end === -1) throw new Error('No JSON object found in model output')
  return JSON.parse(raw.slice(start, end + 1))
}

function isValidGeneratedShape(x: unknown): x is {
  title: string
  excerpt: string
  content: Array<{ heading?: string; body: string[] }>
} {
  if (!x || typeof x !== 'object') return false
  const o = x as Record<string, unknown>
  if (typeof o.title !== 'string' || typeof o.excerpt !== 'string') return false
  if (!Array.isArray(o.content) || o.content.length === 0) return false
  for (const s of o.content as unknown[]) {
    if (!s || typeof s !== 'object') return false
    const sec = s as Record<string, unknown>
    if (sec.heading !== undefined && typeof sec.heading !== 'string') return false
    if (!Array.isArray(sec.body) || sec.body.length === 0) return false
    if (!sec.body.every((p) => typeof p === 'string' && p.trim().length > 0)) return false
  }
  return true
}

export async function POST(req: Request) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing ANTHROPIC_API_KEY' }, { status: 500 })
  }

  let brief: BlogBrief
  try {
    brief = (await req.json()) as BlogBrief
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!brief.workingTitle?.trim() || !brief.founderNote?.trim()) {
    return NextResponse.json(
      { error: 'workingTitle and founderNote are required' },
      { status: 400 }
    )
  }
  if (!ALLOWED_CATEGORIES.includes(brief.category)) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
  }

  const client = new Anthropic({ apiKey })

  let rawText: string
  try {
    const resp = await client.messages.create({
      model: MODEL,
      max_tokens: 2000,
      temperature: 0.7,
      system: LYNC_CONTEXT,
      messages: [{ role: 'user', content: await buildUserPrompt(brief) }],
    })
    const block = resp.content.find((b) => b.type === 'text')
    if (!block || block.type !== 'text') {
      throw new Error('No text block in Claude response')
    }
    rawText = block.text
  } catch (err) {
    console.error('Claude error', err)
    return NextResponse.json(
      { error: 'Claude generation failed', detail: String(err) },
      { status: 502 }
    )
  }

  let parsed: unknown
  try {
    parsed = extractJson(rawText)
  } catch (err) {
    console.error('JSON parse failed', err, rawText)
    return NextResponse.json(
      { error: 'Model returned invalid JSON', detail: rawText.slice(0, 500) },
      { status: 502 }
    )
  }

  if (!isValidGeneratedShape(parsed)) {
    console.error('Shape validation failed', parsed)
    return NextResponse.json(
      { error: 'Model output did not match schema' },
      { status: 502 }
    )
  }

  const titleFallback = brief.workingTitle.trim()
  const title = parsed.title.trim() || titleFallback
  const slug = slugify(title) || slugify(titleFallback) || `post-${Date.now()}`

  const post: GeneratedPost = {
    slug,
    title,
    category: brief.category,
    excerpt: parsed.excerpt.trim(),
    content: parsed.content.map((s) => ({
      heading: s.heading?.trim() || undefined,
      body: s.body.map((b) => b.trim()).filter(Boolean),
    })),
  }

  return NextResponse.json({ post })
}
