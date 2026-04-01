'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import SpotlightCard from '@/components/ui/spotlight-card'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { HighlightStroke } from '@/components/ui/highlight-stroke'
import { WHY_LYNC_PILLARS } from '@/data/why-lync'
import { PAGE_SHELL } from '@/lib/page-shell'

const MID = (WHY_LYNC_PILLARS.length - 1) / 2

function fanTransform(i: number) {
  const dist = i - MID
  const rotate = dist * 6.5
  const y = Math.abs(dist) * 12
  const z = Math.round(14 - Math.abs(dist) * 3)
  return { rotate, y, z, scale: 1 }
}

export function WhyLync() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="bg-white py-14 md:py-24">
      <div className={PAGE_SHELL}>
      <motion.header
        className="mb-5 text-center md:mb-8"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h2 className="font-display text-2xl font-semibold uppercase tracking-normal text-dark sm:text-3xl md:text-4xl">
          <span className="relative inline-block">
            Why girls love <span className="text-lync">LYNC</span>
            <HighlightStroke />
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-muted md:text-lg">
          Real friendships through curated events, not awkward apps.
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
                    <h3 className="font-display text-lg font-semibold uppercase tracking-normal text-dark">{pillar.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{pillar.description}</p>
                  </div>
                </div>
                <div
                  className="relative mt-4 aspect-[5/3] overflow-hidden rounded-xl"
                  role="img"
                  aria-label={`Event photo — ${pillar.title}`}
                >
                  <Image
                    src={pillar.img}
                    alt={pillar.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 28rem"
                  />
                </div>
              </SpotlightCard>
            </ScrollReveal>
          )
        })}
      </div>

      {/* Desktop: fanned overlapping cards (Timeleft-style) */}
      <div className="mx-auto mt-6 hidden max-w-6xl flex-wrap items-end justify-center gap-y-4 lg:mt-10 lg:flex lg:px-4">
        {WHY_LYNC_PILLARS.map((pillar, i) => {
          const { rotate, y, z, scale } = fanTransform(i)

          return (
            <motion.div
              key={pillar.title}
              className={`w-[min(100%,15.5rem)] shrink-0 self-end xl:w-[17rem] ${i > 0 ? '-ml-8 xl:-ml-10' : ''}`}
              initial={reduceMotion ? false : { opacity: 0, y: 48, rotate: 0, scale: 1 }}
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
                      scale: 1.04,
                      transition: { type: 'spring', stiffness: 420, damping: 26 },
                    }
              }
            >
              <SpotlightCard
                className="flex h-[21rem] flex-col rounded-2xl border border-border bg-white shadow-xl transition-shadow duration-300 hover:shadow-2xl xl:h-[22rem]"
                spotlightColor="rgba(54,121,241,0.08)"
              >
                <div className="flex h-full flex-col p-4 pt-5">
                  <h3 className="font-display text-base font-semibold uppercase leading-snug tracking-normal text-dark xl:text-lg">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted xl:text-sm">
                    {pillar.description}
                  </p>

                  <div
                    className="relative mt-3 flex-1 overflow-hidden rounded-xl"
                    role="img"
                    aria-label={`Photo — ${pillar.title}`}
                  >
                    <Image
                      src={pillar.img}
                      alt={pillar.title}
                      fill
                      className="object-cover"
                      sizes="17rem"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" aria-hidden />
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          )
        })}
      </div>
      </div>
    </section>
  )
}
