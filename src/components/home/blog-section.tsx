'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { CtaMotionLink } from '@/components/ui/cta-hover'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { HighlightStroke } from '@/components/ui/highlight-stroke'
import { PAGE_SHELL } from '@/lib/page-shell'
import { blogPosts } from '@/data/blog-posts'

export function BlogSection() {
  return (
    <section className="bg-white py-16 md:py-28">
      <div className={PAGE_SHELL}>
      {/* Centered header — matching page pattern */}
      <motion.header
        className="mb-10 text-center md:mb-14"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h2 className="font-display text-2xl font-semibold uppercase tracking-normal text-dark sm:text-3xl md:text-4xl">
          <span className="relative inline-block">
            From the <span className="text-lync">blog</span>
            <HighlightStroke />
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-muted md:text-lg">
          Guides and stories for life in Madrid. More posts landing soon.
        </p>
      </motion.header>

      {/* Card grid */}
      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {blogPosts.map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 0.08}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative h-36 sm:h-40">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20rem"
                />
              </div>

              {/* Text */}
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <h3 className="font-display text-base font-semibold leading-snug text-dark group-hover:text-lync md:text-lg">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-lync transition-all group-hover:gap-2">
                  Read more
                  <ArrowRight
                    size={14}
                    strokeWidth={2.5}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      {/* View all — primary blue CTA */}
      <motion.div
        className="mt-10 flex justify-center md:mt-14"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <CtaMotionLink
          href="/blog"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#5a96f5] to-lync-dark px-10 py-3.5 text-sm font-semibold text-white shadow-sm transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lync"
        >
          View all posts
        </CtaMotionLink>
      </motion.div>
      </div>
    </section>
  )
}
