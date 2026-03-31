'use client'

import { motion, useReducedMotion } from 'motion/react'
import SpotlightCard from '@/components/ui/spotlight-card'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { WHY_LYNC_PILLARS } from '@/data/why-lync'
import { PAGE_SHELL } from '@/lib/page-shell'

const MID = (WHY_LYNC_PILLARS.length - 1) / 2

function fanTransform(i: number) {
  const dist = i - MID
  const rotate = dist * 6.5
  const y = Math.abs(dist) * 12
  const z = Math.round(14 - Math.abs(dist) * 3)
  const scale = Math.abs(dist) <= 0.6 ? 1.03 : 0.97
  return { rotate, y, z, scale }
}

export function WhyLync() {
  const reduceMotion = useReducedMotion()

  return (
    <section className={`bg-white py-14 md:py-24 ${PAGE_SHELL}`}>
      <motion.header
        className="mb-5 text-center md:mb-6"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h2 className="font-nav text-2xl font-semibold uppercase tracking-normal text-dark sm:text-3xl md:text-4xl">
          Why girls love <span className="text-lync">LYNC</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-muted md:text-lg">
          Real friendships through curated events — not awkward apps.
        </p>
      </motion.header>

      {/* Mobile / tablet: stacked cards */}
      <div className="mx-auto flex max-w-lg flex-col gap-6 lg:hidden">
        {WHY_LYNC_PILLARS.map((pillar, i) => {
          const Icon = pillar.Icon
          return (
            <ScrollReveal key={pillar.title} delay={reduceMotion ? 0 : i * 0.06}>
              <SpotlightCard
                className="rounded-2xl border border-border bg-white p-5 shadow-lg"
                spotlightColor="rgba(54,121,241,0.06)"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lync text-white shadow-sm">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-nav text-lg font-semibold uppercase tracking-normal text-dark">{pillar.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{pillar.description}</p>
                  </div>
                </div>
                <div
                  className="mt-4 flex aspect-[5/3] items-center justify-center rounded-xl bg-surface"
                  role="img"
                  aria-label={`Event photo — ${pillar.title}`}
                >
                  <span className="text-xs font-medium text-muted">Event photo</span>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          )
        })}
      </div>

      {/* Desktop: fanned overlapping cards (Timeleft-style) */}
      <div className="mx-auto hidden max-w-6xl flex-wrap items-end justify-center gap-y-4 lg:flex lg:px-4">
        {WHY_LYNC_PILLARS.map((pillar, i) => {
          const Icon = pillar.Icon
          const { rotate, y, z, scale } = fanTransform(i)
          const innerTwo = i === 1 || i === 2
          const heroGradient = i === 2

          return (
            <motion.div
              key={pillar.title}
              className={`w-[min(100%,15.5rem)] shrink-0 xl:w-[17rem] ${i > 0 ? '-ml-8 xl:-ml-10' : ''}`}
              initial={reduceMotion ? false : { opacity: 0, y: 48, rotate: 0, scale: 0.94 }}
              whileInView={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y, rotate, scale }
              }
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                type: 'spring',
                stiffness: 140,
                damping: 22,
                delay: reduceMotion ? 0 : i * 0.07,
              }}
              style={{
                zIndex: z,
                transformOrigin: 'bottom center',
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: y - 8,
                      scale: scale * 1.04,
                      transition: { type: 'spring', stiffness: 420, damping: 26 },
                    }
              }
            >
              <SpotlightCard
                className={`rounded-2xl border shadow-xl transition-shadow duration-300 hover:shadow-2xl ${
                  heroGradient
                    ? 'border-white/20 bg-gradient-to-b from-emerald-50/95 via-lync-light/90 to-sky-100/85'
                    : 'border-border bg-white'
                }`}
                spotlightColor="rgba(54,121,241,0.08)"
              >
                <div className="p-5 pt-6">
                  <h3 className="font-nav text-base font-semibold uppercase leading-snug tracking-normal text-dark xl:text-lg">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted xl:text-sm">{pillar.description}</p>

                  <div
                    className={`relative mt-4 flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-xl ${
                      heroGradient ? 'bg-white/40' : 'bg-surface'
                    }`}
                    role="img"
                    aria-label={`Illustration — ${pillar.title}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/[0.03] to-transparent" aria-hidden />
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lync text-white shadow-md ring-4 ring-white/80">
                      <Icon size={28} strokeWidth={1.6} />
                    </span>
                    {innerTwo && (
                      <span className="mt-2 text-[10px] font-medium uppercase tracking-normal text-muted">
                        LYNC in action
                      </span>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
