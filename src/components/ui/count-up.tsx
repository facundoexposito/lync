'use client'

import { useInView, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'

interface CountUpProps {
  to: number
  from?: number
  duration?: number
  className?: string
  suffix?: string
}

export default function CountUp({ to, from = 0, duration = 2, className = '', suffix = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(from)
  const springValue = useSpring(motionValue, {
    damping: 20 + 40 * (1 / duration),
    stiffness: 100 * (1 / duration),
  })
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' })

  useEffect(() => {
    if (ref.current) ref.current.textContent = String(from) + suffix
  }, [from, suffix])

  useEffect(() => {
    if (isInView) {
      motionValue.set(to)
    }
  }, [isInView, motionValue, to])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest: number) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest) + suffix
      }
    })
    return () => unsubscribe()
  }, [springValue, suffix])

  return <span className={className} ref={ref} />
}
