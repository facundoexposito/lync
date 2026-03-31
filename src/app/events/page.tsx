'use client'

import { useState } from 'react'
import { EventCard } from '@/components/events/event-card'
import { events } from '@/data/events'

const categories = ['All', 'Wellness', 'Social', 'Adventure', 'Creative', 'Nightlife'] as const

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const filteredEvents =
    selectedCategory === 'All'
      ? events
      : events.filter((event) => event.category === selectedCategory)

  return (
    <>
      <section className="py-16 md:py-24 bg-cream text-center">
        <div className="mx-auto max-w-6xl px-5">
          <h1 className="mb-6 font-nav text-5xl font-semibold uppercase tracking-normal md:text-6xl">
            Upcoming Events
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            From yoga sessions to tapas nights, find your next adventure and make friends along the way.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-lync text-white'
                    : 'bg-cream text-dark hover:bg-lync/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, i) => (
              <div key={event.id} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                <EventCard event={event} />
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted">
                No events in this category yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
