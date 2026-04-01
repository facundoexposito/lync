'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { testimonials } from '@/data/testimonials'
import { PAGE_SHELL } from '@/lib/page-shell'

const AVATAR_COLORS = ['bg-lync', 'bg-rose-400', 'bg-amber-400'] as const

const RATING_STARS = '/brand/RATING/stars.webp'

export function Testimonials() {
  return (
    <section className="bg-cream py-12 pb-14 md:py-20 md:pb-16">
      <div className={PAGE_SHELL}>
      <motion.header
        className="mb-8 text-center md:mb-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h2 className="font-display text-2xl font-semibold leading-snug tracking-tight text-dark sm:text-3xl md:text-[2rem]">
          Reasons to keep showing up{' '}
          <span className="inline-block" aria-hidden>
            👀
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base font-normal text-muted md:text-lg">
          Don&apos;t just take our word for it. Hear from the girls who&apos;ve lived it.
        </p>
      </motion.header>

      <div className="relative">
        {/* Wide hero band — reference: photo dominates, cards only overlap the lower edge */}
        <div className="relative z-0 mx-auto h-[190px] w-full max-w-4xl overflow-hidden rounded-3xl ring-1 ring-inset ring-neutral-500/25 sm:h-[230px] md:h-[270px] lg:h-[300px]">
          <Image
            src="/brand/COMMUNITY/craft-night-group-table.webp"
            alt="LYNC community at a craft night event"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 56rem"
          />
        </div>

        {/* Cards: centered cluster, a touch wider than the photo band */}
        <div className="relative z-10 -mt-9 px-3 sm:-mt-11 sm:px-4 md:-mt-12 lg:-mt-14">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 md:gap-5">
            {testimonials.map((t, i) => (
              <ScrollReveal
                key={t.name}
                delay={i * 0.1}
                className="w-full max-w-[17rem] shrink-0 sm:max-w-[17.25rem] sm:basis-[17.25rem]"
              >
                <article className="flex h-[16.75rem] w-full flex-col rounded-2xl border-[0.5px] border-border bg-white p-3.5 shadow-md transition-shadow hover:shadow-lg sm:h-[17.5rem] md:h-[18.25rem] md:p-4">
                  <div className="flex shrink-0 items-center">
                    <span className="sr-only">
                      Rated {t.stars} out of 5 stars
                    </span>
                    <Image
                      src={RATING_STARS}
                      alt=""
                      width={240}
                      height={48}
                      className="h-[1.75rem] w-auto object-contain object-left sm:h-8 md:h-9"
                      sizes="(max-width: 640px) 165px, 200px"
                    />
                  </div>

                  <p className="mt-2 min-h-0 flex-1 overflow-y-auto text-left text-[13px] leading-relaxed text-dark sm:text-sm [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="mt-2 flex shrink-0 items-center gap-2.5 border-t-[0.5px] border-border/70 pt-2.5">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-sm font-semibold leading-snug text-dark [overflow-wrap:anywhere]">
                        {t.name}
                      </p>
                      {t.role && (
                        <p className="line-clamp-2 text-xs font-normal leading-tight text-muted">
                          {t.role}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
