import { CtaMotionButton } from '@/components/ui/cta-hover'
import { Event } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { MapPin, Calendar } from 'lucide-react'

interface EventCardProps { event: Event }

const catEmoji: Record<string, string> = {
  Wellness: '🧘‍♀️', Social: '🎉', Adventure: '🏔️', Creative: '🎨', Nightlife: '🌙',
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="group border border-border rounded-2xl overflow-hidden hover:border-lync/30 hover:shadow-lg transition-all duration-300 bg-white">
      {/* Image area */}
      <div className="relative h-48 bg-surface flex items-center justify-center">
        <span className="text-5xl">{catEmoji[event.category] || '📸'}</span>
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-dark">
          {event.category}
        </div>
        <div className="absolute top-3 right-3 bg-lync text-white rounded-full px-3 py-1 text-xs font-semibold">
          {event.spotsLeft} spots left
        </div>
      </div>

      <div className="p-6">
        <h3 className="mb-3 font-display text-lg font-semibold uppercase tracking-normal transition-colors group-hover:text-lync">
          {event.title}
        </h3>
        <div className="flex flex-col gap-1.5 text-sm text-muted mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={13} />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={13} />
            <span>{event.location}</span>
          </div>
        </div>
        <p className="text-muted text-sm leading-relaxed mb-5 line-clamp-2">{event.description}</p>
        <CtaMotionButton
          type="button"
          className="w-full bg-dark text-white font-semibold py-3 rounded-full text-sm hover:bg-lync transition-colors duration-200"
        >
          Reserve Your Spot
        </CtaMotionButton>
      </div>
    </div>
  )
}
