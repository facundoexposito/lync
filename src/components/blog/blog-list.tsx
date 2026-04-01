'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { HighlightStroke } from '@/components/ui/highlight-stroke'
import { type BlogPost, formatBlogDate, CATEGORY_COLORS } from '@/data/blog-posts'

const blogEmojis = ['✍️', '📖', '💡', '🗺️', '☕', '🌍']

function RotatingBlogEmoji() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % blogEmojis.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.6, rotate: 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="text-4xl"
        >
          {blogEmojis[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as const },
})

export function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <>
      {/* White header */}
      <div className="bg-white pt-22 pb-8 md:pt-26 md:pb-10">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <motion.header className="text-center" {...fadeUp(0)}>
            <RotatingBlogEmoji />
            <h1 className="font-display text-3xl font-semibold uppercase tracking-normal text-dark sm:text-4xl md:text-5xl">
              <span className="relative inline-block">
                Blog
                <HighlightStroke className="absolute -bottom-1 left-0 w-full" strokeWidth={5} />
              </span>
            </h1>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted md:text-base">
              Guides, stories, and tips for building your social life in&nbsp;Madrid.
            </p>
          </motion.header>
        </div>
      </div>

      {/* Cream grid */}
      <div className="bg-cream pb-12 pt-8 md:pb-16 md:pt-10">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => {
              const catColor = CATEGORY_COLORS[post.category]
              return (
                <ScrollReveal key={post.slug} delay={i * 0.1}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <span className={`mb-2 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${catColor?.bg ?? 'bg-lync-light'} ${catColor?.text ?? 'text-lync'}`}>
                        {post.category}
                      </span>
                      <h2 className="font-display text-lg font-semibold leading-snug text-dark group-hover:text-lync md:text-xl">
                        {post.title}
                      </h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <time className="text-xs font-medium text-muted" dateTime={post.date}>
                          {formatBlogDate(post.date)}
                        </time>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-lync transition-all group-hover:gap-2.5">
                          Read more
                          <ArrowRight size={14} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
