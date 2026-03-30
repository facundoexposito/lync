'use client'

import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react'
import React, { useRef } from 'react'

interface ShinyTextProps {
  text: string
  className?: string
  speed?: number
  color?: string
  shineColor?: string
}

export default function ShinyText({
  text,
  className = '',
  speed = 3,
  color = '#007AFF',
  shineColor = '#66b3ff',
}: ShinyTextProps) {
  const progress = useMotionValue(0)
  const elapsedRef = useRef(0)
  const lastTimeRef = useRef<number | null>(null)
  const animationDuration = speed * 1000

  useAnimationFrame((time) => {
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time
      return
    }
    const delta = time - lastTimeRef.current
    lastTimeRef.current = time
    elapsedRef.current += delta
    const cycleTime = elapsedRef.current % (animationDuration + 1000)
    if (cycleTime < animationDuration) {
      progress.set((cycleTime / animationDuration) * 100)
    } else {
      progress.set(100)
    }
  })

  const backgroundPosition = useTransform(progress, (p) => `${150 - p * 2}% center`)

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{
        backgroundImage: `linear-gradient(120deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundPosition,
      }}
    >
      {text}
    </motion.span>
  )
}
