import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, MapPin, Users } from 'lucide-react'
import type { Retreat } from '@/data/retreats'

interface RetreatCardProps {
  retreat: Retreat
}

export function RetreatCard({ retreat }: RetreatCardProps) {
  const startingPrice = retreat.pricing[0]?.price ?? ''

  return (
    <Link href={`/retreats/${retreat.slug}`} className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:border-lync/30 hover:shadow-lg">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={retreat.images.card}
            alt={retreat.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-dark backdrop-blur-sm">
              <MapPin size={12} />
              {retreat.location}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-lync shadow-sm">
              From {startingPrice}
            </span>
          </div>

          {/* View Retreat hover overlay — desktop only */}
          <div className="absolute inset-0 hidden items-center justify-center bg-dark/0 transition-colors duration-300 group-hover:bg-dark/40 lg:flex">
            <span className="flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-dark opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
              View Retreat
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-1 font-display text-lg font-semibold uppercase tracking-normal transition-colors group-hover:text-lync">
            {retreat.title}
          </h3>
          <p className="mb-3 text-sm font-medium text-lync">
            {retreat.dates}
          </p>
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted">
            {retreat.shortDescription}
          </p>

          {/* Stat row */}
          <div className="mt-auto flex items-center gap-4 border-t border-border pt-4 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} className="text-lync" />
              {retreat.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={14} className="text-lync" />
              {retreat.groupSize}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
