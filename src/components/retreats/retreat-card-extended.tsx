import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays, MapPin, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Retreat } from '@/data/retreats'

interface RetreatCardExtendedProps {
  retreat: Retreat
  reversed?: boolean
}

export function RetreatCardExtended({ retreat, reversed = false }: RetreatCardExtendedProps) {
  const startingPrice = retreat.pricing[0]?.price ?? ''

  return (
    <Link href={`/retreats/${retreat.slug}`} className="group block">
      <div
        className={cn(
          'flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:border-lync/30 hover:shadow-xl',
          'lg:flex-row',
          reversed && 'lg:flex-row-reverse'
        )}
      >
        {/* Image — 55% on desktop */}
        <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9] lg:aspect-auto lg:min-h-[400px] lg:w-[55%]">
          <Image
            src={retreat.images.hero}
            alt={retreat.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 55vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Location badge */}
          <div className="absolute top-4 left-4">
            <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-dark backdrop-blur-sm">
              <MapPin size={13} />
              {retreat.location}
            </span>
          </div>

          {/* Price badge */}
          <div className="absolute top-4 right-4">
            <span className="rounded-full bg-white px-3.5 py-1.5 text-sm font-bold text-lync shadow-sm">
              From {startingPrice}
            </span>
          </div>
        </div>

        {/* Content — 45% on desktop */}
        <div className="flex flex-1 flex-col justify-center p-5 sm:p-8 lg:p-10">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-lync sm:mb-2 sm:text-xs">
            {retreat.dates}
          </p>

          <h3 className="mb-1 font-display text-xl font-semibold uppercase tracking-normal transition-colors group-hover:text-lync sm:text-3xl lg:text-4xl">
            {retreat.title}
          </h3>

          <p className="mb-3 text-sm font-medium text-dark/60 sm:mb-4 sm:text-lg">
            {retreat.subtitle}
          </p>

          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted sm:mb-6 sm:text-base">
            {retreat.shortDescription}
          </p>

          {/* Stat row */}
          <div className="mb-4 flex flex-wrap items-center gap-3 border-t border-border pt-4 text-xs text-muted sm:mb-6 sm:gap-4 sm:pt-5 sm:text-sm">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} className="text-lync" />
              {retreat.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={14} className="text-lync" />
              {retreat.groupSize}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-lync" />
              {retreat.venue}
            </span>
          </div>

          {/* CTA */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#5a96f5] to-lync-dark px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-shadow group-hover:shadow-md sm:px-6 sm:py-3">
              View Retreat <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
