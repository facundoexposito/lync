'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Sparkles } from 'lucide-react'
import { ADMIN_HEADER, ADMIN_STORAGE_KEY } from '@/lib/admin-auth'
import type {
  BlogBrief,
  BlogCategory,
  GeneratedPost,
} from '@/lib/admin-types'
import { BriefForm } from './brief-form'
import { PostPreview } from './post-preview'

const DEFAULT_BRIEF: BlogBrief = {
  workingTitle: '',
  category: 'Meetups',
  founderNote: '',
  keyQuestions: '',
}

type ImageState = {
  dataUrl: string
  ext: string
  name: string
  sizeKb: number
} | null

export function NewPostClient() {
  const router = useRouter()
  const [password, setPassword] = useState<string | null>(null)
  const [brief, setBrief] = useState<BlogBrief>(DEFAULT_BRIEF)
  const [image, setImage] = useState<ImageState>(null)
  const [generating, setGenerating] = useState(false)
  const [post, setPost] = useState<GeneratedPost | null>(null)
  const [publishing, setPublishing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem(ADMIN_STORAGE_KEY)
    if (!stored) {
      router.replace('/admin')
      return
    }
    setPassword(stored)
  }, [router])

  function handleAuthError() {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY)
    router.replace('/admin')
  }

  async function handleGenerate() {
    if (!password) return
    if (!brief.workingTitle.trim() || !brief.founderNote.trim()) {
      setError('Working title and founder note are required')
      return
    }
    setError(null)
    setGenerating(true)

    try {
      const res = await fetch('/api/admin/generate-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [ADMIN_HEADER]: password,
        },
        body: JSON.stringify(brief),
      })
      if (res.status === 401) {
        handleAuthError()
        return
      }
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to generate')
        return
      }
      setPost(data.post as GeneratedPost)
    } catch {
      setError('Network error during generation')
    } finally {
      setGenerating(false)
    }
  }

  async function handlePublish() {
    if (!password) return
    if (!post || !image) {
      setError('Need a generated post and an image to publish')
      return
    }
    setError(null)
    setPublishing(true)
    setPublishedUrl(null)

    try {
      const res = await fetch('/api/admin/publish-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [ADMIN_HEADER]: password,
        },
        body: JSON.stringify({
          ...post,
          imageDataUrl: image.dataUrl,
          imageExt: image.ext,
        }),
      })
      if (res.status === 401) {
        handleAuthError()
        return
      }
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to publish')
        return
      }
      setPublishedUrl(data.url || null)
      setPost(null)
      setImage(null)
      setBrief(DEFAULT_BRIEF)
    } catch {
      setError('Network error during publish')
    } finally {
      setPublishing(false)
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY)
    router.replace('/admin')
  }

  if (!password) {
    return <main className="min-h-screen bg-cream" />
  }

  return (
    <main className="min-h-screen bg-cream pb-16">
      <header className="sticky top-0 z-10 border-b border-border bg-white/90 px-5 py-4 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              LYNC Admin
            </p>
            <h1 className="font-display text-lg font-semibold uppercase tracking-normal text-dark sm:text-xl">
              New blog post
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-lync hover:text-lync"
          >
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 pt-8 sm:px-8">
        {publishedUrl && (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <h3 className="font-display text-base font-semibold text-emerald-800">
              Published!
            </h3>
            <p className="mt-1 text-sm text-emerald-700">
              Vercel will rebuild in ~1 minute. Once it&apos;s live:{' '}
              <a
                href={publishedUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline"
              >
                {publishedUrl}
              </a>
            </p>
          </div>
        )}

        {!post && (
          <section className="rounded-[1.75rem] border border-border bg-white p-6 shadow-sm sm:rounded-[2rem] sm:p-8">
            <BriefForm
              brief={brief}
              onBriefChange={setBrief}
              image={image}
              onImageChange={setImage}
            />

            {error && (
              <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
                {error}
              </p>
            )}

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#5a96f5] to-lync-dark py-3.5 text-sm font-semibold text-white shadow-sm transition-shadow hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 md:text-base"
            >
              <Sparkles size={16} />
              {generating ? 'Drafting with Claude…' : 'Generate draft'}
            </button>
          </section>
        )}

        {post && (
          <PostPreview
            post={post}
            onPostChange={setPost}
            image={image}
            category={brief.category as BlogCategory}
            onBack={() => setPost(null)}
            onPublish={handlePublish}
            publishing={publishing}
            error={error}
          />
        )}
      </div>
    </main>
  )
}
