import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  background?: 'white' | 'cream' | 'dark' | 'blue'
}

const bgClasses: Record<NonNullable<SectionProps['background']>, string> = {
  white: 'bg-white',
  cream: 'bg-cream',
  dark: 'bg-dark text-white',
  blue: 'bg-lync text-white',
}

export function Section({ children, className, background = 'white' }: SectionProps) {
  return (
    <section className={cn('py-16 md:py-24', bgClasses[background], className)}>
      <div className="mx-auto max-w-6xl px-5">
        {children}
      </div>
    </section>
  )
}
