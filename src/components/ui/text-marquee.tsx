'use client'

import { cn } from '@/lib/utils'

interface TextMarqueeProps {
  items: string[]
  separator?: string
  speed?: number
  direction?: 'left' | 'right'
  className?: string
  itemClassName?: string
  separatorClassName?: string
}

export function TextMarquee({
  items,
  separator = '∞',
  speed = 30,
  direction = 'left',
  className,
  itemClassName,
  separatorClassName,
}: TextMarqueeProps) {
  const content = items.flatMap((item, i) => [
    <span key={`item-${i}`} className={cn('whitespace-nowrap', itemClassName)}>
      {item}
    </span>,
    <span
      key={`sep-${i}`}
      className={cn('mx-6 md:mx-10 text-lync flex-shrink-0', separatorClassName)}
    >
      {separator}
    </span>,
  ])

  const animDir = direction === 'left' ? 'marquee-left' : 'marquee-right'

  return (
    <div className={cn('overflow-hidden select-none', className)} aria-hidden="true">
      <div
        className="flex items-center w-max"
        style={{
          animation: `${animDir} ${speed}s linear infinite`,
        }}
      >
        <div className="flex items-center shrink-0">{content}</div>
        <div className="flex items-center shrink-0">{content}</div>
      </div>
    </div>
  )
}
