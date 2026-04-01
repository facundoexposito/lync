'use client'

import { motion, useInView } from 'motion/react'
import { useRef, useState, useEffect, useCallback } from 'react'
import { Heart, Star, Globe, Users } from 'lucide-react'
import { HighlightStroke } from '@/components/ui/highlight-stroke'
import { PAGE_SHELL } from '@/lib/page-shell'

const stats = [
  {
    displayText: '2,300+',
    label: 'Members',
    icon: Heart,
    hoverBg: 'md:hover:bg-lync md:hover:border-lync',
    activeBg: 'rgb(54,121,241)',
    rotation: -3,
  },
  {
    displayText: '4.9/5',
    label: 'Event Rating',
    icon: Star,
    hoverBg: 'md:hover:bg-amber-400 md:hover:border-amber-400',
    activeBg: 'rgb(251,191,36)',
    rotation: 2,
  },
  {
    displayText: '40+',
    label: 'Nationalities',
    icon: Globe,
    hoverBg: 'md:hover:bg-emerald-500 md:hover:border-emerald-500',
    activeBg: 'rgb(16,185,129)',
    rotation: -2,
  },
  {
    displayText: 'Girl-only',
    label: 'Curated community',
    icon: Users,
    hoverBg: 'md:hover:bg-violet-500 md:hover:border-violet-500',
    activeBg: 'rgb(139,92,246)',
    rotation: 3,
  },
]

function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  const check = useCallback(() => setMobile(window.innerWidth < 768), [])
  useEffect(() => {
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [check])
  return mobile
}

export function TrustBento() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' })
  const isMobile = useIsMobile()
  const [activeIdx, setActiveIdx] = useState(-1)

  // Auto-cycle through bubbles on mobile
  useEffect(() => {
    if (!isMobile || !isInView) return
    // Start the cycle after the entrance animation finishes (~1s)
    const startDelay = setTimeout(() => {
      setActiveIdx(0)
    }, 1000)
    return () => clearTimeout(startDelay)
  }, [isMobile, isInView])

  useEffect(() => {
    if (!isMobile || activeIdx < 0) return
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % stats.length)
    }, 1500)
    return () => clearInterval(timer)
  }, [isMobile, activeIdx])

  return (
    <section
      className="bg-white py-8 md:py-12"
    >
      <div className={`flex flex-col items-center justify-center md:min-h-[38svh] ${PAGE_SHELL}`}>
      <motion.div
        className="mb-3 md:mb-4"
        initial={{ opacity: 0, y: 12, scale: 0.92 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-40px 0px' }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        aria-hidden
      >
        <Globe
          className="h-9 w-9 text-[#007AFF] sm:h-11 sm:w-11"
          strokeWidth={1.5}
          aria-hidden
        />
      </motion.div>
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
          const isActive = isMobile && activeIdx === i
          return (
            <motion.div
              key={stat.label}
              className={`flex cursor-default items-center justify-center rounded-full border-2 px-4 py-3 shadow-sm transition-all duration-200 md:hover:scale-105 md:hover:text-white md:hover:shadow-lg sm:px-9 sm:py-5 md:px-11 md:py-6 ${stat.hoverBg}`}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      rotate: stat.rotation,
                      scale: isActive ? 1.08 : 1,
                      backgroundColor: isActive ? stat.activeBg : 'rgb(255,255,255)',
                      borderColor: isActive ? stat.activeBg : 'rgba(26,26,26,0.2)',
                      color: isActive ? 'rgb(255,255,255)' : 'rgb(26,26,26)',
                    }
                  : { opacity: 0, y: 30, rotate: 0 }
              }
              transition={{
                duration: 0.6,
                delay: isInView && !isActive ? 0.08 + i * 0.1 : 0,
                ease: [0.34, 1.56, 0.64, 1],
                backgroundColor: { duration: 0.4 },
                borderColor: { duration: 0.4 },
                color: { duration: 0.3 },
                scale: { duration: 0.3 },
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
