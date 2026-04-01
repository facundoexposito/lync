'use client'

import Image from 'next/image'

const PHRASES = [
  'New friends',
  'Tapas',
  'Drinks',
  'Weekend hikes',
  'Madrid nights',
  'Real talk',
  'Women-led',
  'Curated vibes',
] as const

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {PHRASES.map((phrase) => (
        <div key={phrase} className="flex items-center">
          <span className="px-4 text-xs font-medium uppercase tracking-[0.14em] text-muted/65 sm:px-6 sm:text-sm md:text-base">
            {phrase}
          </span>
          <Image
            src="/brand/ICON_BLUE.png"
            alt=""
            width={32}
            height={32}
            className="h-4 w-auto shrink-0 sm:h-5 md:h-6"
          />
        </div>
      ))}
    </div>
  )
}

/** Ambient ticker — low contrast, slow scroll */
export function BrandStripMarquee() {
  return (
    <div
      className="border-y border-border/35 bg-white/40"
      aria-hidden
    >
      <div className="overflow-hidden py-4 sm:py-5 md:py-6">
        <div
          className="brand-marquee-track flex w-max will-change-transform"
          style={{
            animationName: 'marquee-left',
            animationDuration: '55s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationFillMode: 'none',
          }}
        >
          <Row />
          <Row />
        </div>
      </div>
    </div>
  )
}
