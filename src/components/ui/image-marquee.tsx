'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageSlot {
  alt: string
  src?: string
}

interface ImageMarqueeProps {
  images: ImageSlot[]
  speed?: number
  direction?: 'left' | 'right'
  className?: string
  imageClassName?: string
}

export function ImageMarquee({
  images,
  speed = 40,
  direction = 'left',
  className,
  imageClassName,
}: ImageMarqueeProps) {
  const animDir = direction === 'left' ? 'marquee-left' : 'marquee-right'

  const renderSlot = (slot: ImageSlot, i: number) => (
    <div
      key={i}
      className={cn(
        'flex-shrink-0 w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden mx-2',
        imageClassName
      )}
    >
      {slot.src ? (
        <Image
          src={slot.src}
          alt={slot.alt}
          width={288}
          height={384}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-cream flex items-center justify-center">
          <p className="text-dark/30 text-sm text-center px-4">{slot.alt}</p>
        </div>
      )}
    </div>
  )

  return (
    <div
      className={cn('overflow-hidden select-none group', className)}
      aria-hidden="true"
    >
      <div
        className="flex w-max group-hover:[animation-play-state:paused]"
        style={{ animation: `${animDir} ${speed}s linear infinite` }}
      >
        <div className="flex shrink-0">{images.map(renderSlot)}</div>
        <div className="flex shrink-0">{images.map((s, i) => renderSlot(s, i + images.length))}</div>
      </div>
    </div>
  )
}
