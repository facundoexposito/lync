'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { CtaMotionButton } from '@/components/ui/cta-hover'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { HighlightStroke } from '@/components/ui/highlight-stroke'
import { PAGE_SHELL } from '@/lib/page-shell'

/** Bump when replacing assets under public/brand/3D-ELEMENTS/ (invalidates next/image + browser cache). */
const ILLUSTRATIONS_V = '20260401b'

const EVENTS = [
  {
    title: 'Dinners',
    description:
      'Make friends with five new faces over good food. Expect laughs, stories, and conversations that light you up.',
    cta: 'Book a dinner',
    illustration: `/brand/3D-ELEMENTS/DINNER.webp?v=${ILLUSTRATIONS_V}`,
    illustrationAlt: '3D illustration for dinner events',
    photo: '/brand/COMMUNITY/social-five-girls-restaurant-booth.webp',
  },
  {
    title: 'Wellness',
    description:
      'Yoga, hikes, and mindful mornings. Move your body and meet your people.',
    cta: 'Find a session',
    illustration: `/brand/3D-ELEMENTS/WELLNESS.webp?v=${ILLUSTRATIONS_V}`,
    illustrationAlt: '3D illustration for wellness events',
    photo: '/brand/COMMUNITY/yoga-class-tree-pose.webp',
  },
  {
    title: 'Adventures',
    description:
      'From day trips to rooftop sunsets, explore Madrid with girls who are down for anything.',
    cta: 'See adventures',
    illustration: `/brand/3D-ELEMENTS/ADVENTURE.webp?v=${ILLUSTRATIONS_V}`,
    illustrationAlt: '3D illustration for adventure events',
    largeIllustration: true,
    photo: '/brand/COMMUNITY/run-club-viewpoint-arms-raised.webp',
  },
] as const

function EventIllustration({
  src,
  alt,
  className,
  large,
}: {
  src: string
  alt: string
  className?: string
  large?: boolean
}) {
  return (
    <div className={`relative shrink-0 ${className ?? ''}`}>
      <Image
        src={src}
        alt={alt}
        width={large ? 896 : 640}
        height={large ? 896 : 640}
        className="h-full w-full object-contain object-bottom drop-shadow-sm"
        sizes={
          large
            ? '(max-width: 768px) 280px, 380px'
            : '(max-width: 768px) 200px, 280px'
        }
      />
    </div>
  )
}

export function EventsShowcase() {
  return (
    <section className="bg-white py-16 md:py-28">
      <div className={PAGE_SHELL}>
      <motion.header
        className="mb-14 text-center md:mb-20"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h2 className="font-display text-2xl font-semibold uppercase tracking-normal text-dark sm:text-3xl md:text-4xl">
          <span className="relative inline-block">
            Explore our <span className="text-lync">events</span>
            <HighlightStroke />
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-pretty text-base text-muted md:text-lg">
          Curated experiences designed to help you connect,
          <br />
          unwind, and create memories.
        </p>
      </motion.header>

      <div className="mx-auto flex max-w-5xl flex-col gap-20 md:gap-28">
        {EVENTS.map((event, i) => (
          <EventRow key={event.title} event={event} index={i} />
        ))}
      </div>
      </div>
    </section>
  )
}

function EventRow({
  event,
  index,
}: {
  event: (typeof EVENTS)[number]
  index: number
}) {
  const reversed = index % 2 !== 0
  const largeIllustration =
    'largeIllustration' in event && event.largeIllustration === true

  return (
    <ScrollReveal delay={0.05}>
      <div className="flex flex-col gap-8 md:hidden">
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src={event.photo}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 36rem"
            />
          </div>
          <div
            className={`pointer-events-none absolute z-10 ${
              largeIllustration
                ? '-bottom-[4.75rem] sm:-bottom-20 left-0 -translate-x-2 sm:-left-2 sm:-translate-x-3'
                : '-bottom-9 sm:-bottom-11 left-0 sm:-left-1'
            }`}
          >
            <EventIllustration
              src={event.illustration}
              alt={event.illustrationAlt}
              large={largeIllustration}
              className={
                largeIllustration
                  ? 'h-[13.5rem] w-[13.5rem] sm:h-60 sm:w-60'
                  : 'h-40 w-40 sm:h-44 sm:w-44'
              }
            />
          </div>
        </div>

        <div className="pt-2">
          <h3 className="font-display text-3xl font-bold text-dark">
            {event.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-muted">
            {event.description}
          </p>
          <button
            type="button"
            className="mt-6 rounded-full bg-gradient-to-b from-[#5a96f5] to-lync-dark px-7 py-3 text-sm font-semibold text-white shadow-sm transition-shadow hover:shadow-md"
          >
            {event.cta}
          </button>
        </div>
      </div>

      <div
        className={`hidden items-center gap-12 md:flex lg:gap-20 ${
          reversed ? 'flex-row-reverse' : ''
        }`}
      >
        <div className="flex-1">
          <h3 className="font-display text-4xl font-bold text-dark lg:text-5xl">
            {event.title}
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted lg:text-lg">
            {event.description}
          </p>
          <CtaMotionButton
            type="button"
            className="mt-8 rounded-full bg-gradient-to-b from-[#5a96f5] to-lync-dark px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-shadow hover:shadow-md"
          >
            {event.cta}
          </CtaMotionButton>
        </div>

        <div className="relative flex-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src={event.photo}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 28rem"
            />
          </div>
          <div
            className={`pointer-events-none absolute z-10 ${
              largeIllustration
                ? reversed
                  ? '-bottom-20 lg:-bottom-[7rem] right-0 sm:-right-4 lg:-right-11'
                  : '-bottom-20 lg:-bottom-[7rem] left-0 sm:-left-4 lg:-left-11'
                : `${reversed ? 'right-0 sm:-right-3 lg:-right-8' : 'left-0 sm:-left-3 lg:-left-8'} -bottom-12 lg:-bottom-16`
            }`}
          >
            <EventIllustration
              src={event.illustration}
              alt={event.illustrationAlt}
              large={largeIllustration}
              className={
                largeIllustration
                  ? 'h-64 w-64 lg:h-80 lg:w-80'
                  : 'h-48 w-48 lg:h-56 lg:w-56'
              }
            />
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}
