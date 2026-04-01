'use client'

import { motion } from 'motion/react'

export function HighlightStroke() {
  return (
    <motion.svg
      viewBox="0 0 300 12"
      fill="none"
      className="absolute -bottom-3 left-0 w-full"
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
