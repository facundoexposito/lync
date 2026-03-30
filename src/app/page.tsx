import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/section'
import { EventCard } from '@/components/events/event-card'
import { events } from '@/data/events'
import { testimonials } from '@/data/testimonials'
import { faqs } from '@/data/faq'
import { Sparkles, Users, Calendar, Heart, Star, ChevronDown } from 'lucide-react'

export default function Home() {
  const upcomingEvents = events.slice(0, 3)

  return (
    <>
      {/* Hero Section */}
      <Section className="relative bg-gradient-to-br from-lync-blue to-blue-600 text-white min-h-[80vh] flex items-center">
        <div className="max-w-3xl">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 fade-in">
            Make Friends in Madrid in Minutes
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-50 fade-in">
            Join hundreds of international women building real friendships through curated events and community.
          </p>
          <Link href="/quiz">
            <Button size="lg" variant="secondary" className="fade-in">
              Find Your Experience
            </Button>
          </Link>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-white/60" />
        </div>
      </Section>

      {/* How It Works */}
      <Section background="white">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Sparkles, title: 'Take the Quiz', desc: 'Tell us about yourself and what you are looking for' },
            { icon: Users, title: 'Get Matched', desc: 'We recommend events that fit your vibe' },
            { icon: Calendar, title: 'Join an Event', desc: 'RSVP to curated experiences in Madrid' },
            { icon: Heart, title: 'Make Friends', desc: 'Build real connections with amazing women' },
          ].map((step, i) => (
            <div key={i} className="text-center fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-20 h-20 bg-lync-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon size={32} className="text-lync-blue" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Girls Love Lync */}
      <Section background="cream">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16">
          Why Girls Love LYNC
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: 'Make friends fast', desc: 'No more awkward small talk. Our events are designed to help you connect quickly.' },
            { title: 'Safe, girl-only community', desc: 'A welcoming space where everyone is here to make genuine friendships.' },
            { title: 'Weekly curated events', desc: 'From yoga to tapas nights, there is always something happening.' },
            { title: 'International students & expats', desc: 'Meet women from 80+ countries who get what it is like to be new in Madrid.' },
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <h3 className="font-display text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Upcoming Events */}
      <Section background="white">
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Upcoming Events
          </h2>
          <Link href="/events">
            <Button variant="outline">View All Events</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingEvents.map((event, i) => (
            <div key={event.id} className="fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section background="navy">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16">
          What Girls Are Saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <Star key={i} size={20} className="fill-lync-gold text-lync-gold" />
                ))}
              </div>
              <p className="text-white mb-4 italic">"{testimonial.quote}"</p>
              <p className="text-lync-gold font-semibold">— {testimonial.name}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Stats */}
      <Section background="cream">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { number: '500+', label: 'Women Connected' },
            { number: '80+', label: 'Nationalities' },
            { number: '50+', label: 'Events Hosted' },
          ].map((stat, i) => (
            <div key={i} className="fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="font-display text-5xl md:text-6xl font-bold text-lync-blue mb-2">
                {stat.number}
              </div>
              <div className="text-xl text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section background="white">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-lync-cream p-6 rounded-2xl fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <h3 className="font-display text-xl font-bold mb-3">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section background="navy" className="text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
          Ready to Find Your People?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Take the quiz and get matched to events that fit your vibe. Your Madrid friend group is waiting.
        </p>
        <Link href="/quiz">
          <Button size="lg" variant="secondary">
            Take the Quiz Now
          </Button>
        </Link>
      </Section>
    </>
  )
}
