'use client'

import { useState } from 'react'
import { Section } from '@/components/layout/section'
import { EventCard } from '@/components/events/event-card'
import { events } from '@/data/events'
import type { Metadata } from 'next'

const categories = ['All', 'Wellness', 'Social', 'Adventure', 'Creative', 'Nightlife'] as const

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const filteredEvents =
    selectedCategory === 'All'
      ? events
      : events.filter((event) => event.category === selectedCategory)

  return (
    <>
      <Section background="cream" className="text-center">
        <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
          Upcoming Events
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          From yoga sessions to tapas nights, find your next adventure and make friends along the way.
        </p>
      </Section>

      <Section background="white">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-lync-blue text-white'
                  : 'bg-lync-cream text-lync-navy hover:bg-lync-blue/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, i) => (
            <div key={event.id} className="fade-in" style={{ animationDelay: `${i * 50}ms` }}>
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No events in this category yet. Check back soon!
            </p>
          </div>
        )}
      </Section>
    </>
  )
}
