'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageSlideshowProps {
  images: { src: string; alt: string }[]
  /** Seconds between slides */
  interval?: number
}

export function ImageSlideshow({ images, interval = 4 }: ImageSlideshowProps) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, interval * 1000)
    return () => clearInterval(timer)
  }, [next, interval, isPaused])

  return (
    <div
      className="relative aspect-[16/10] overflow-hidden rounded-2xl sm:aspect-[2/1]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {images.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1152px"
          className={cn(
            'object-cover transition-all duration-1000 ease-in-out',
            i === current
              ? 'scale-100 opacity-100'
              : 'scale-105 opacity-0'
          )}
          priority={i === 0}
        />
      ))}

      {/* Progress dots */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              i === current
                ? 'w-6 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/75'
            )}
          />
        ))}
      </div>

      {/* Subtle gradient overlay at bottom for dot visibility */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  )
}
