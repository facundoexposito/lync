import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { isAdminRequest } from '@/lib/admin-auth'
import type { BlogCategory, PublishRequest } from '@/lib/admin-types'
import { writeClient } from '@/lib/sanity/client'

export const runtime = 'nodejs'
export const maxDuration = 30

const ALLOWED_EXTS = ['jpg', 'jpeg', 'png', 'webp', 'avif']
const ALLOWED_CATEGORIES: BlogCategory[] = ['Nightlife', 'Meetups', 'Wellness']

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

export async function POST(req: Request) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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

  try {
    // 1) Upload image to Sanity
    const imageBuffer = Buffer.from(imageBase64, 'base64')
    const imageAsset = await writeClient.assets.upload('image', imageBuffer, {
      filename: `${slug}.${ext}`,
    })

    // 2) Create blog post document
    const doc = await writeClient.create({
      _type: 'blogPost',
      title: body.title.trim(),
      slug: { _type: 'slug', current: slug },
      date: today(),
      category: body.category,
      excerpt: body.excerpt.trim(),
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAsset._id },
      },
      content: body.content.map((s) => ({
        _type: 'object',
        _key: crypto.randomUUID(),
        heading: s.heading?.trim() || undefined,
        body: s.body.map((p) => p.trim()).filter(Boolean),
      })),
    })

    // 3) Bust Next.js cache so the new post appears immediately
    revalidateTag('blog', 'max')

    const liveUrl = `https://lyncevents.com/blog/${slug}`

    return NextResponse.json({
      ok: true,
      slug,
      documentId: doc._id,
      url: liveUrl,
    })
  } catch (err: unknown) {
    const detail = err instanceof Error ? err.message : String(err)
    console.error('Sanity publish failed', err)
    return NextResponse.json(
      { error: 'Sanity publish failed', detail },
      { status: 502 }
    )
  }
}
