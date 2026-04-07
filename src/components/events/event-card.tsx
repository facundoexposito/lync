'use client'

import Image from 'next/image'
import { Event } from '@/lib/types'
import { formatDate, formatTime } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'

interface EventCardProps {
  event: Event
}

const catColor: Record<string, { bg: string; text: string }> = {
  Wellness: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  Social: { bg: 'bg-amber-100', text: 'text-amber-700' },
  Adventure: { bg: 'bg-sky-100', text: 'text-sky-700' },
  Creative: { bg: 'bg-violet-100', text: 'text-violet-700' },
  Nightlife: { bg: 'bg-rose-100', text: 'text-rose-600' },
}

export function EventCard({ event }: EventCardProps) {
  const colors = catColor[event.category] || { bg: 'bg-gray-100', text: 'text-gray-700' }

  const card = (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:border-lync/30 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${colors.bg} ${colors.text}`}
          >
            {event.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-lync shadow-sm">
            {event.price}
          </span>
        </div>

        {/* Book Now hover overlay — desktop only */}
        {event.schedulingUrl && (
          <div className="absolute inset-0 hidden items-center justify-center bg-dark/0 transition-colors duration-300 group-hover:bg-dark/40 lg:flex">
            <span className="flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-dark opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
              Book Now <ArrowUpRight size={15} />
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-3 line-clamp-2 font-display text-lg font-semibold uppercase tracking-normal transition-colors group-hover:text-lync">
          {event.title}
        </h3>

        <div className="mb-4 flex flex-col gap-1.5 text-sm text-muted">
          <span>📅 {formatDate(event.date)}</span>
          <span>🕐 {formatTime(event.date)}</span>
          <span>📍 {event.location}</span>
          <span>🔥 {event.spotsLeft} spots left</span>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted">
          {event.description}
        </p>

        {event.highlights && (
          <div className="mt-4 flex flex-wrap gap-2">
            {event.highlights.map((h) => (
              <span
                key={h}
                className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted"
              >
                {h}
              </span>
            ))}
          </div>
        )}

        {/* Book Now button — always visible on mobile/tablet, hidden on desktop (hover overlay used instead) */}
        {event.schedulingUrl && (
          <div className="mt-auto pt-4 lg:hidden">
            <span className="flex w-full items-center justify-center gap-1.5 rounded-full bg-lync py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-lync-dark">
              Book Now <ArrowUpRight size={15} />
            </span>
          </div>
        )}
      </div>
    </div>
  )

  if (event.schedulingUrl) {
    return (
      <a
        href={event.schedulingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {card}
      </a>
    )
  }

  return card
}
