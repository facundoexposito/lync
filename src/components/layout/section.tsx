import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  background?: 'white' | 'cream' | 'navy'
}

export function Section({ children, className, background = 'white' }: SectionProps) {
  const bgClasses = {
    white: 'bg-white',
    cream: 'bg-lync-cream',
    navy: 'bg-lync-navy text-white',
  }
  
  return (
    <section
      className={cn(
        'py-16 md:py-24',
        bgClasses[background],
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {children}
      </div>
    </section>
  )
}
