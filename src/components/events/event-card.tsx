'use client'

import Image from 'next/image'
import { Event } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { MapPin, Calendar, Users } from 'lucide-react'

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

  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:border-lync/30 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${colors.bg} ${colors.text}`}
          >
            {event.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 rounded-full bg-dark/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {event.price}
        </div>
      </div>

      <div className="p-5">
        <h3 className="mb-3 font-display text-lg font-semibold uppercase tracking-normal transition-colors group-hover:text-lync">
          {event.title}
        </h3>

        <div className="mb-4 flex flex-col gap-1.5 text-sm text-muted">
          <div className="flex items-center gap-2">
            <Calendar size={13} className="shrink-0" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={13} className="shrink-0" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={13} className="shrink-0" />
            <span>{event.spotsLeft} spots left</span>
          </div>
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
      </div>
    </div>
  )
}
