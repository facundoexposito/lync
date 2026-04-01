'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { studentServices, schoolServices, resources } from '@/data/study-abroad'
import type { ServiceItem, ResourceItem } from '@/data/study-abroad'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import SpotlightCard from '@/components/ui/spotlight-card'
import { CtaMotionLink, CtaMotionA } from '@/components/ui/cta-hover'

/* ── Tab config ───────────────────────────────────── */

const tabs = [
  { id: 'Services' as const, emoji: '💼' },
  { id: 'Resources' as const, emoji: '📚' },
  { id: 'Consultation' as const, emoji: '💬' },
]
type Tab = (typeof tabs)[number]['id']

const WHATSAPP_LINK =
  'https://wa.me/34612345678?text=Hi!%20I%E2%80%99d%20like%20to%20book%20a%20free%20study%20abroad%20consultation.'

/* ── Rotating emoji (exported for page hero) ──────── */

const heroEmojis = ['🎓', '✈️', '🇪🇸', '📚', '🌍', '🏛️']

export function RotatingEmoji() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroEmojis.length)
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
          {heroEmojis[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

/* ── Fan layout helper ───────────────────────────── */

function fanTransform(i: number, count: number) {
  const mid = (count - 1) / 2
  const dist = i - mid
  const rotate = dist * 5.5
  const y = Math.abs(dist) * 10
  const z = Math.round(14 - Math.abs(dist) * 3)
  return { rotate, y, z }
}

/* ── Main component ───────────────────────────────── */

export function StudyAbroadTabs() {
  const [active, setActive] = useState<Tab>('Services')

  return (
    <div>
      {/* Segmented tab bar */}
      <div className="flex justify-center pb-10 md:pb-14">
        <div className="inline-flex rounded-full bg-white p-1.5 shadow-sm ring-1 ring-black/[0.04]">
          {tabs.map(({ id, emoji }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className="relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors md:px-6 md:py-2.5 md:text-base"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {active === id && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-lync shadow-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 inline-flex items-center gap-1.5 ${
                  active === id ? 'font-semibold text-white' : 'text-muted'
                }`}
              >
                <span className="text-sm md:text-base">{emoji}</span>
                {id}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {active === 'Services' && <ServicesPanel />}
          {active === 'Resources' && <ResourcesPanel />}
          {active === 'Consultation' && <ConsultationPanel />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ── Services panel ───────────────────────────────── */

function ServicesPanel() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="space-y-16">
      {/* For Students */}
      <div>
        <ScrollReveal>
          <div className="mb-6 text-center lg:mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-lync/10 px-5 py-2.5 text-base font-semibold text-lync md:text-lg">
              🎓 For Students
            </span>
          </div>
        </ScrollReveal>
        <FannedServiceCards items={studentServices} reduceMotion={!!reduceMotion} />
      </div>

      {/* For Schools */}
      <div>
        <ScrollReveal>
          <div className="mb-6 text-center lg:mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-dark/10 px-5 py-2.5 text-base font-semibold text-dark md:text-lg">
              🏫 For Schools
            </span>
          </div>
        </ScrollReveal>
        <FannedServiceCards items={schoolServices} reduceMotion={!!reduceMotion} />
      </div>
    </div>
  )
}

/* ── Fanned service cards (desktop fan + mobile stack) ── */

function FannedServiceCards({
  items,
  reduceMotion,
}: {
  items: ServiceItem[]
  reduceMotion: boolean
}) {
  const count = items.length

  return (
    <>
      {/* Mobile / tablet: stacked cards */}
      <div className="mx-auto flex max-w-lg flex-col gap-5 lg:hidden">
        {items.map((item, i) => (
          <ScrollReveal key={item.title} delay={reduceMotion ? 0 : i * 0.06}>
            <SpotlightCard
              className="rounded-2xl border border-border bg-white p-5 shadow-lg"
              spotlightColor="rgba(54,121,241,0.06)"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 text-3xl">{item.emoji}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold uppercase tracking-normal text-dark">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-1.5 pl-12">
                {item.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-sm text-muted"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lync" />
                    {b}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </ScrollReveal>
        ))}
      </div>

      {/* Desktop: fanned overlapping cards */}
      <div className="mx-auto hidden max-w-6xl items-end justify-center lg:flex lg:px-4">
        {items.map((item, i) => {
          const { rotate, y, z } = fanTransform(i, count)

          return (
            <motion.div
              key={item.title}
              className={`w-[min(100%,15.5rem)] shrink-0 xl:w-[17rem] ${
                i > 0 ? '-ml-6 xl:-ml-8' : ''
              }`}
              initial={
                reduceMotion ? false : { opacity: 0, y: 48, rotate: 0 }
              }
              whileInView={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y, rotate }
              }
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                type: 'spring',
                stiffness: 140,
                damping: 22,
                delay: reduceMotion ? 0 : i * 0.07,
              }}
              style={{ zIndex: z, transformOrigin: 'bottom center' }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: y - 8,
                      scale: 1.04,
                      transition: {
                        type: 'spring',
                        stiffness: 420,
                        damping: 26,
                      },
                    }
              }
            >
              <SpotlightCard
                className="flex h-[24rem] flex-col rounded-2xl border border-border bg-white shadow-xl transition-shadow duration-300 hover:shadow-2xl xl:h-[26rem]"
                spotlightColor="rgba(54,121,241,0.08)"
              >
                <div className="flex h-full flex-col p-4 pt-5">
                  <span className="text-2xl">{item.emoji}</span>
                  <h3 className="mt-2.5 font-display text-sm font-semibold uppercase leading-snug tracking-normal text-dark xl:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-muted xl:text-xs">
                    {item.description}
                  </p>
                  <ul className="mt-3 space-y-1">
                    {item.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-1.5 text-[11px] leading-snug text-muted xl:text-xs"
                      >
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-lync" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </motion.div>
          )
        })}
      </div>
    </>
  )
}

/* ── Resources panel ──────────────────────────────── */

function ResourcesPanel() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      {resources.map((r, i) => (
        <ScrollReveal key={r.title} delay={i * 0.08}>
          <ResourceCard item={r} />
        </ScrollReveal>
      ))}
    </div>
  )
}

function ResourceCard({ item }: { item: ResourceItem }) {
  const { emoji, title, description, href } = item
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-lg md:p-6"
    >
      <span className="mb-3 text-3xl">{emoji}</span>
      <h3 className="mb-2 font-display text-lg font-semibold uppercase tracking-normal text-dark">
        {title}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-muted">{description}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-lync transition-colors group-hover:text-lync-dark">
        Read Guide
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  )
}

/* ── Consultation panel ───────────────────────────── */

function ConsultationPanel() {
  return (
    <div>
      <ScrollReveal>
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-lync to-lync-dark p-8 text-center text-white md:p-14">
            {/* Decorative circles */}
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-white/10" />

            <div className="relative">
              <span className="mb-5 inline-block text-5xl">💬</span>
              <h2 className="mb-3 font-display text-3xl font-semibold uppercase tracking-normal sm:text-4xl">
                Book a Free Consultation
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-base text-white/80 md:text-lg">
                Not sure where to start? Chat with our team to get personalized
                advice on universities, visas, and life in Madrid — completely
                free, no strings attached.
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <CtaMotionA
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3 text-sm font-semibold text-white shadow-md"
                >
                  💬 Chat on WhatsApp
                </CtaMotionA>
                <CtaMotionLink
                  href="/study-abroad"
                  className="inline-flex items-center gap-2 rounded-full bg-white/20 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm"
                >
                  Learn More
                  <ArrowRight size={16} />
                </CtaMotionLink>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
