'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Heart, Star, Globe, Users } from 'lucide-react'
import { HighlightStroke } from '@/components/ui/highlight-stroke'
import { PAGE_SHELL } from '@/lib/page-shell'

const stats = [
  {
    displayText: '2,300+',
    label: 'Members',
    icon: Heart,
    hoverBg: 'hover:bg-lync hover:border-lync',
    rotation: -3,
  },
  {
    displayText: '4.9/5',
    label: 'Event Rating',
    icon: Star,
    hoverBg: 'hover:bg-amber-400 hover:border-amber-400',
    rotation: 2,
  },
  {
    displayText: '40+',
    label: 'Nationalities',
    icon: Globe,
    hoverBg: 'hover:bg-emerald-500 hover:border-emerald-500',
    rotation: -2,
  },
  {
    displayText: 'Girl-only',
    label: 'Curated community',
    icon: Users,
    hoverBg: 'hover:bg-violet-500 hover:border-violet-500',
    rotation: 3,
  },
]

export function TrustBento() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' })

  return (
    <section
      className="bg-white py-8 md:py-12"
    >
      <div className={`flex min-h-[44svh] flex-col items-center justify-center md:min-h-[38svh] ${PAGE_SHELL}`}>
      <motion.h2
        className="mb-12 text-center font-display text-2xl font-semibold uppercase tracking-normal text-dark sm:text-3xl md:mb-16 md:text-4xl"
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
              className={`flex cursor-default items-center justify-center rounded-full border-2 border-dark/20 bg-white px-4 py-3 text-dark shadow-sm transition-all duration-200 hover:scale-105 hover:text-white hover:shadow-lg sm:px-9 sm:py-5 md:px-11 md:py-6 ${stat.hoverBg}`}
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
                  <Icon size={18} className="opacity-70 sm:hidden" strokeWidth={2} />
                  <Icon size={22} className="hidden opacity-70 sm:block" strokeWidth={2} />
                  <span className="text-lg font-bold leading-none sm:text-3xl md:text-4xl">
                    {stat.displayText}
                  </span>
                </div>
                <p className="mt-1 text-[11px] font-semibold opacity-70 sm:mt-1.5 sm:text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
      </div>
    </section>
  )
}
