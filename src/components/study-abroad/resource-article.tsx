'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import type { ResourceItem } from '@/data/study-abroad'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as const },
})

function formatResourceDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function ResourceArticle({
  resource,
  otherResources,
}: {
  resource: ResourceItem
  otherResources: ResourceItem[]
}) {
  return (
    <main className="bg-cream pt-22 pb-12 md:pt-26 md:pb-16">
      <article className="mx-auto max-w-3xl px-5 sm:px-8">
        {/* Back + meta row */}
        <motion.div className="mb-4 flex items-center justify-between" {...fadeUp(0)}>
          <Link
            href="/study-abroad"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-dark"
          >
            <ArrowLeft size={14} /> All Resources
          </Link>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{resource.emoji}</span>
            <time className="text-xs font-medium text-muted" dateTime={resource.date}>
              {formatResourceDate(resource.date)}
            </time>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-display text-2xl font-semibold leading-tight tracking-normal text-dark sm:text-3xl md:text-4xl"
          {...fadeUp(0.1)}
        >
          {resource.title}
        </motion.h1>

        {/* Hero image */}
        <motion.div
          className="relative mt-5 aspect-[2/1] w-full overflow-hidden rounded-2xl md:mt-6"
          {...fadeUp(0.2)}
        >
          <Image
            src={resource.image}
            alt={resource.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 48rem"
            priority
          />
        </motion.div>

        {/* Body */}
        <div className="mt-6 space-y-6 md:mt-8">
          {resource.content.map((section, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              {section.heading && (
                <h2 className="mb-2 font-display text-lg font-semibold text-dark sm:text-xl">
                  {section.heading}
                </h2>
              )}
              {section.body.map((paragraph, j) => (
                <p
                  key={j}
                  className="mt-2.5 text-[0.9375rem] leading-[1.75] text-dark/90 first:mt-0 md:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div className="mt-8 rounded-2xl border border-border bg-white p-5 text-center shadow-sm sm:p-6 md:mt-10">
            <h3 className="font-display text-lg font-semibold uppercase text-dark sm:text-xl">
              Need Help?
            </h3>
            <p className="mx-auto mt-1.5 max-w-md text-sm leading-relaxed text-muted">
              Book a free consultation and we&apos;ll guide you through the process step by step.
            </p>
            <Link
              href="/study-abroad"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#5a96f5] to-lync-dark px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md"
            >
              Book a Free Consultation <ArrowRight size={15} />
            </Link>
          </div>
        </ScrollReveal>
      </article>

      {/* Related resources */}
      {otherResources.length > 0 && (
        <section className="mx-auto mt-10 max-w-5xl px-5 sm:px-8 md:mt-12">
          <ScrollReveal>
            <h2 className="mb-5 font-display text-lg font-semibold uppercase tracking-normal text-dark sm:text-xl">
              More Resources
            </h2>
          </ScrollReveal>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {otherResources.map((related, i) => (
              <ScrollReveal key={related.slug} delay={i * 0.08}>
                <Link
                  href={related.href}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-lg md:p-6"
                >
                  <span className="mb-3 text-3xl">{related.emoji}</span>
                  <h3 className="mb-2 font-display text-lg font-semibold uppercase tracking-normal text-dark">
                    {related.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted">
                    {related.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-lync transition-colors group-hover:text-lync-dark">
                    Read Guide
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
