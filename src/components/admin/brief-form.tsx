'use client'

import { useRef } from 'react'
import { Upload, X } from 'lucide-react'
import type { BlogBrief, BlogCategory } from '@/lib/admin-types'

type ImageState = {
  dataUrl: string
  ext: string
  name: string
  sizeKb: number
} | null

const CATEGORIES: BlogCategory[] = ['Nightlife', 'Meetups', 'Wellness']
const MAX_IMAGE_BYTES = 5 * 1024 * 1024

interface Props {
  brief: BlogBrief
  onBriefChange: (brief: BlogBrief) => void
  image: ImageState
  onImageChange: (image: ImageState) => void
}

export function BriefForm({ brief, onBriefChange, image, onImageChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File) {
    if (file.size > MAX_IMAGE_BYTES) {
      alert('Image is too large. Please use under 5 MB.')
      return
    }
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = String(reader.result || '')
      onImageChange({
        dataUrl,
        ext,
        name: file.name,
        sizeKb: Math.round(file.size / 1024),
      })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-5">
      {/* Title */}
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-normal text-muted">
          Working title <span className="text-lync">*</span>
        </label>
        <input
          type="text"
          value={brief.workingTitle}
          onChange={(e) => onBriefChange({ ...brief, workingTitle: e.target.value })}
          placeholder="e.g. Why Wine Tastings Work for Making Friends"
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-dark shadow-sm outline-none transition-all placeholder:text-muted/60 focus:border-lync focus:ring-2 focus:ring-lync/10"
        />
        <p className="mt-1 text-xs text-muted">
          Claude can rewrite this. Rough is fine.
        </p>
      </div>

      {/* Category */}
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-normal text-muted">
          Category <span className="text-lync">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onBriefChange({ ...brief, category: c })}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                brief.category === c
                  ? 'bg-lync text-white shadow-sm'
                  : 'border border-border bg-white text-dark hover:border-lync/50 hover:text-lync'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Founder note */}
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-normal text-muted">
          Note from the founder <span className="text-lync">*</span>
        </label>
        <textarea
          rows={4}
          value={brief.founderNote}
          onChange={(e) => onBriefChange({ ...brief, founderNote: e.target.value })}
          placeholder="What do you want readers to take away? Any story, quote, or angle you want included."
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-dark shadow-sm outline-none transition-all placeholder:text-muted/60 focus:border-lync focus:ring-2 focus:ring-lync/10"
        />
      </div>

      {/* Key questions */}
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-normal text-muted">
          Key questions / section topics
        </label>
        <textarea
          rows={4}
          value={brief.keyQuestions}
          onChange={(e) => onBriefChange({ ...brief, keyQuestions: e.target.value })}
          placeholder={
            '- What makes this event special?\n- How do attendees connect beforehand?\n- Where in Madrid does it happen?'
          }
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-dark shadow-sm outline-none transition-all placeholder:text-muted/60 focus:border-lync focus:ring-2 focus:ring-lync/10"
        />
        <p className="mt-1 text-xs text-muted">
          One per line. These become the article&apos;s section headings.
        </p>
      </div>

      {/* Image */}
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-normal text-muted">
          Cover image <span className="text-lync">*</span>
        </label>

        {!image ? (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-surface/50 px-4 py-8 text-sm font-semibold text-muted transition-colors hover:border-lync hover:text-lync"
          >
            <Upload size={16} /> Upload image (max 5 MB)
          </button>
        ) : (
          <div className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.dataUrl}
                alt={image.name}
                className="h-12 w-16 flex-shrink-0 rounded-md object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-dark">{image.name}</p>
                <p className="text-xs text-muted">
                  {image.sizeKb.toLocaleString()} KB · .{image.ext}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onImageChange(null)}
              className="flex-shrink-0 rounded-full border border-border bg-white p-1.5 text-muted transition-colors hover:border-rose-300 hover:text-rose-600"
              aria-label="Remove image"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) handleFile(f)
            e.target.value = ''
          }}
        />
      </div>
    </div>
  )
}
