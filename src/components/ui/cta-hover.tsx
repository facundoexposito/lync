'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

const MotionLink = motion.create(Link)

const transition = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 26,
  mass: 0.9,
}

/** Slight horizontal emphasis — feels like the pill eases wider */
const hover = { scaleX: 1.045, scaleY: 1.018 }
const tap = { scaleX: 1.02, scaleY: 1.01 }

export function CtaMotionLink(props: ComponentProps<typeof MotionLink>) {
  const reduced = useReducedMotion()
  const { style, ...rest } = props
  return (
    <MotionLink
      {...rest}
      initial={false}
      whileHover={reduced ? undefined : hover}
      whileTap={reduced ? undefined : tap}
      transition={transition}
      style={{ transformOrigin: 'center', ...style }}
    />
  )
}

/** Use when a plain Next `Link` must sit above overlapping layers (e.g. absolute fan cards) */
export function CtaHoverWrap({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const reduced = useReducedMotion()
  return (
    <motion.span
      className={cn('inline-flex', className)}
      initial={false}
      whileHover={reduced ? undefined : hover}
      whileTap={reduced ? undefined : tap}
      transition={transition}
      style={{ transformOrigin: 'center' }}
    >
      {children}
    </motion.span>
  )
}

type MotionButtonProps = ComponentProps<typeof motion.button>

export function CtaMotionButton({ style, disabled, ...props }: MotionButtonProps) {
  const reduced = useReducedMotion()
  const animate = !reduced && !disabled
  return (
    <motion.button
      {...props}
      disabled={disabled}
      initial={false}
      whileHover={animate ? hover : undefined}
      whileTap={animate ? tap : undefined}
      transition={transition}
      style={{ transformOrigin: 'center', ...style }}
    />
  )
}

type MotionAProps = ComponentProps<typeof motion.a>

export function CtaMotionA(props: MotionAProps) {
  const reduced = useReducedMotion()
  const { style, ...rest } = props
  return (
    <motion.a
      {...rest}
      initial={false}
      whileHover={reduced ? undefined : hover}
      whileTap={reduced ? undefined : tap}
      transition={transition}
      style={{ transformOrigin: 'center', ...style }}
    />
  )
}
