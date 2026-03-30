import { Event } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { MapPin, Calendar, Users } from 'lucide-react'

interface EventCardProps {
  event: Event
}

const categoryConfig: Record<string, { bg: string; text: string; dot: string }> = {
  Wellness: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-400' },
  Social: { bg: 'bg-pink-50', text: 'text-pink-700', dot: 'bg-pink-400' },
  Adventure: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400' },
  Creative: { bg: 'bg-violet-50', text: 'text-violet-700', dot: 'bg-violet-400' },
  Nightlife: { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-400' },
}

export function EventCard({ event }: EventCardProps) {
  const cat = categoryConfig[event.category] || categoryConfig.Social

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-lync-blue/20 hover:shadow-xl transition-all duration-300">
      {/* Image placeholder */}
      <div className="relative h-52 bg-gradient-to-br from-lync-cream to-lync-cream-dark overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lync-navy/20 text-sm font-medium">📸 {event.category}</span>
        </div>
        {/* Category tag */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cat.bg} ${cat.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
            {event.category}
          </span>
        </div>
        {/* Spots remaining */}
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-lync-navy">
            {event.spotsLeft} spots left
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-lync-navy mb-3 group-hover:text-lync-blue transition-colors">
          {event.title}
        </h3>

        <div className="space-y-2 text-sm text-gray-500 mb-5">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-lync-blue" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-lync-blue" />
            <span>{event.location}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">{event.description}</p>

        <button className="w-full bg-lync-navy text-white font-semibold py-3.5 rounded-full hover:bg-lync-blue transition-colors duration-200 text-sm">
          Reserve Your Spot
        </button>
      </div>
    </div>
  )
}
