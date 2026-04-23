'use client'

import { ArrowLeft, Plus, Trash2, Upload } from 'lucide-react'
import type { BlogCategory, GeneratedPost } from '@/lib/admin-types'
import { CATEGORY_COLORS } from '@/data/blog-posts'

type ImageState = {
  dataUrl: string
  ext: string
  name: string
  sizeKb: number
} | null

interface Props {
  post: GeneratedPost
  onPostChange: (post: GeneratedPost) => void
  image: ImageState
  category: BlogCategory
  onBack: () => void
  onPublish: () => void
  publishing: boolean
  error: string | null
}

export function PostPreview({
  post,
  onPostChange,
  image,
  onBack,
  onPublish,
  publishing,
  error,
}: Props) {
  const catColor = CATEGORY_COLORS[post.category]

  function updateSection(i: number, key: 'heading' | 'body', value: string) {
    const next = [...post.content]
    if (key === 'heading') {
      next[i] = { ...next[i], heading: value }
    } else {
      next[i] = {
        ...next[i],
        body: value.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
      }
    }
    onPostChange({ ...post, content: next })
  }

  function addSection() {
    onPostChange({
      ...post,
      content: [...post.content, { heading: 'New section', body: [''] }],
    })
  }

  function removeSection(i: number) {
    onPostChange({
      ...post,
      content: post.content.filter((_, idx) => idx !== i),
    })
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-dark"
        >
          <ArrowLeft size={14} /> Back to brief
        </button>
        <span className="text-xs font-medium text-muted">
          Preview &middot; editable
        </span>
      </div>

      {/* Preview card that mirrors blog card style */}
      <article className="rounded-[1.75rem] border border-border bg-white p-6 shadow-sm sm:rounded-[2rem] sm:p-8">
        {/* Cat + slug row */}
        <div className="mb-3 flex flex-wrap items-center gap-2.5">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
              catColor?.bg ?? 'bg-lync-light'
            } ${catColor?.text ?? 'text-lync'}`}
          >
            {post.category}
          </span>
          <span className="font-mono text-xs text-muted">/{post.slug}</span>
        </div>

        {/* Title */}
        <label className="mb-1 block text-xs font-semibold uppercase tracking-normal text-muted">
          Title
        </label>
        <input
          value={post.title}
          onChange={(e) => onPostChange({ ...post, title: e.target.value })}
          className="mb-4 w-full rounded-xl border border-border bg-white px-4 py-3 font-display text-xl font-semibold text-dark shadow-sm outline-none focus:border-lync focus:ring-2 focus:ring-lync/10 sm:text-2xl"
        />

        {/* Excerpt */}
        <label className="mb-1 block text-xs font-semibold uppercase tracking-normal text-muted">
          Excerpt
        </label>
        <textarea
          rows={2}
          value={post.excerpt}
          onChange={(e) => onPostChange({ ...post, excerpt: e.target.value })}
          className="mb-5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-dark shadow-sm outline-none focus:border-lync focus:ring-2 focus:ring-lync/10"
        />

        {/* Image preview */}
        <label className="mb-1 block text-xs font-semibold uppercase tracking-normal text-muted">
          Cover image
        </label>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.dataUrl}
            alt={post.title}
            className="mb-6 aspect-[2/1] w-full rounded-2xl object-cover"
          />
        ) : (
          <div className="mb-6 flex aspect-[2/1] w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-surface/50 text-sm font-semibold text-muted">
            <Upload size={14} /> No image attached — go back and upload one
          </div>
        )}

        {/* Sections */}
        <div className="space-y-5">
          {post.content.map((section, i) => (
            <div key={i} className="rounded-2xl border border-border bg-surface/30 p-4">
              <div className="mb-2 flex items-start justify-between gap-3">
                <label className="text-xs font-semibold uppercase tracking-normal text-muted">
                  Section {i + 1} heading
                </label>
                <button
                  type="button"
                  onClick={() => removeSection(i)}
                  className="text-muted transition-colors hover:text-rose-600"
                  aria-label="Remove section"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <input
                value={section.heading ?? ''}
                onChange={(e) => updateSection(i, 'heading', e.target.value)}
                placeholder="(Optional — leave blank for intro section)"
                className="mb-2 w-full rounded-lg border border-border bg-white px-3 py-2 font-display text-base font-semibold text-dark outline-none focus:border-lync focus:ring-2 focus:ring-lync/10"
              />
              <label className="mb-1 block text-xs font-semibold uppercase tracking-normal text-muted">
                Paragraphs (blank line = new paragraph)
              </label>
              <textarea
                rows={5}
                value={section.body.join('\n\n')}
                onChange={(e) => updateSection(i, 'body', e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm leading-relaxed text-dark outline-none focus:border-lync focus:ring-2 focus:ring-lync/10"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addSection}
            className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border bg-white px-4 py-2 text-xs font-semibold text-muted transition-colors hover:border-lync hover:text-lync"
          >
            <Plus size={13} /> Add section
          </button>
        </div>
      </article>

      {error && (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={publishing}
          className="flex-1 rounded-full border border-border bg-white py-3.5 text-sm font-semibold text-dark transition-colors hover:border-lync hover:text-lync disabled:cursor-not-allowed disabled:opacity-60 md:text-base"
        >
          Back
        </button>
        <button
          onClick={onPublish}
          disabled={publishing || !image}
          className="flex-[2] rounded-full bg-gradient-to-b from-[#5a96f5] to-lync-dark py-3.5 text-sm font-semibold text-white shadow-sm transition-shadow hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 md:text-base"
        >
          {publishing ? 'Publishing to Studio…' : 'Publish post'}
        </button>
      </div>
    </section>
  )
}
