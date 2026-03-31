'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Heart, Star, Globe, Users } from 'lucide-react'
import { PAGE_SHELL } from '@/lib/page-shell'

const stats = [
  {
    displayText: '2,300+',
    label: 'Members',
    icon: Heart,
    bg: 'bg-lync',
    text: 'text-white',
    iconClass: 'text-white/90',
    rotation: -3,
  },
  {
    displayText: '4.9/5',
    label: 'Event Rating',
    icon: Star,
    bg: 'bg-amber-400',
    text: 'text-dark',
    iconClass: 'text-dark/70',
    rotation: 2,
  },
  {
    displayText: '40+',
    label: 'Nationalities',
    icon: Globe,
    bg: 'bg-emerald-500',
    text: 'text-white',
    iconClass: 'text-white/90',
    rotation: -2,
  },
  {
    displayText: 'Girl-only',
    label: 'Curated community',
    icon: Users,
    bg: 'bg-violet-500',
    text: 'text-white',
    iconClass: 'text-white/90',
    rotation: 3,
  },
]

function HighlightStroke() {
  return (
    <motion.svg
      viewBox="0 0 300 12"
      fill="none"
      className="absolute -bottom-1.5 left-0 w-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.path
        d="M4 8C60 4 140 3 150 4C200 5 260 6 296 8"
        stroke="var(--color-lync)"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
      />
    </motion.svg>
  )
}

export function TrustBento() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' })

  return (
    <section
      className={`flex min-h-[44svh] flex-col items-center justify-center bg-white py-8 md:min-h-[38svh] md:py-12 ${PAGE_SHELL}`}
    >
      <motion.h2
        className="mb-8 text-center font-nav text-2xl font-semibold uppercase tracking-normal text-dark sm:text-3xl md:mb-10 md:text-4xl"
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-40px 0px' }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <span className="relative inline-block">
          Our Community
          <HighlightStroke />
        </span>
      </motion.h2>
      <div
        ref={ref}
        className="grid w-full max-w-5xl grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center md:gap-5"
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              className={`${stat.bg} ${stat.text} flex cursor-default items-center justify-center rounded-full px-4 py-3 shadow-lg transition-transform duration-200 hover:scale-105 sm:px-9 sm:py-5 md:px-11 md:py-6`}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, rotate: stat.rotation }
                  : { opacity: 0, y: 30, rotate: 0 }
              }
              transition={{
                duration: 0.6,
                delay: 0.08 + i * 0.1,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2.5">
                  <Icon size={18} className={`${stat.iconClass} sm:hidden`} strokeWidth={2} />
                  <Icon size={22} className={`${stat.iconClass} hidden sm:block`} strokeWidth={2} />
                  <span className="text-lg font-bold leading-none sm:text-3xl md:text-4xl">
                    {stat.displayText}
                  </span>
                </div>
                <p className="mt-1 text-[11px] font-semibold opacity-80 sm:mt-1.5 sm:text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
