import { Event } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { MapPin, Calendar, Users } from 'lucide-react'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const categoryColors = {
    Wellness: 'bg-green-100 text-green-800',
    Social: 'bg-pink-100 text-pink-800',
    Adventure: 'bg-orange-100 text-orange-800',
    Creative: 'bg-purple-100 text-purple-800',
    Nightlife: 'bg-blue-100 text-blue-800',
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Placeholder Image */}
      <div className="h-48 bg-lync-cream flex items-center justify-center text-lync-navy/40">
        <p className="text-sm px-4 text-center">Photo: {event.title}</p>
      </div>

      <div className="p-6">
        {/* Category Tag */}
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
            categoryColors[event.category]
          }`}
        >
          {event.category}
        </span>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-lync-navy mb-3">
          {event.title}
        </h3>

        {/* Details */}
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span className="font-semibold text-lync-blue">
              {event.spotsLeft} spots left
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4">{event.description}</p>

        {/* CTA Button */}
        <button className="w-full bg-lync-blue text-white font-semibold py-3 rounded-full hover:bg-blue-600 transition-colors">
          Reserve Your Spot
        </button>
      </div>
    </div>
  )
}
