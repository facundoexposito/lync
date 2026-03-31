import type { LucideIcon } from 'lucide-react'
import { HeartHandshake, UserRound, CalendarDays, Plane } from 'lucide-react'

export interface WhyLyncPillar {
  title: string
  description: string
  Icon: LucideIcon
}

export const WHY_LYNC_PILLARS: WhyLyncPillar[] = [
  {
    title: 'Make friends fast',
    description: 'Warm introductions and real conversations — not endless swiping.',
    Icon: HeartHandshake,
  },
  {
    title: 'Safe, girl-only community',
    description: 'Curated spaces where you can relax and be yourself.',
    Icon: UserRound,
  },
  {
    title: 'Weekly curated events',
    description: 'Tapas, brunches, walks, and nights out — all organised for you.',
    Icon: CalendarDays,
  },
  {
    title: 'Internationals & students',
    description: 'Designed for women new to Madrid who want a real circle.',
    Icon: Plane,
  },
]
