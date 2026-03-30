import Link from 'next/link'
import { EventCard } from '@/components/events/event-card'
import { events } from '@/data/events'
import { QuizAnswer } from '@/lib/types'
import { Sparkles, Calendar, Heart, ArrowRight, MessageCircle } from 'lucide-react'

interface QuizResultsProps {
  answers: QuizAnswer[]
  leadInfo: { name: string; email: string; phone?: string; nationality: string } | null
}

export function QuizResults({ answers, leadInfo }: QuizResultsProps) {
  const interestsAnswer = answers.find(a => a.questionId === 'interests')
  const interests = Array.isArray(interestsAnswer?.answer) ? interestsAnswer.answer : []

  const recommendedEvents = events
    .filter(e => interests.some(i => e.category.toLowerCase() === i))
    .slice(0, 3)
  const displayEvents = recommendedEvents.length > 0 ? recommendedEvents : events.slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-lync-cream via-white to-lync-cream/50 pt-24 pb-16 px-5">
      <div className="max-w-4xl mx-auto">
        {/* Success */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 text-center mb-10 animate-scale-in">
          <div className="w-20 h-20 bg-gradient-to-br from-lync-gold to-lync-gold-light rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles size={36} className="text-white" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Welcome, <span className="italic text-lync-blue">{leadInfo?.name}</span>! 🎉
          </h1>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            Based on your answers, here are the perfect events to kick off your LYNC journey.
          </p>
        </div>

        {/* Recommended Events */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="text-lync-blue" size={24} />
            <h2 className="font-display text-2xl font-bold">Your Recommended Events</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayEvents.map((event, i) => (
              <div key={event.id} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-lync-navy rounded-3xl p-8 md:p-10 animate-fade-up delay-300">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="text-lync-gold" size={24} />
            <h2 className="font-display text-2xl font-bold text-white">What Happens Next</h2>
          </div>
          <div className="space-y-6 mb-10">
            {[
              { num: '1', title: 'Check Your Inbox', desc: `We've sent your personalized picks to ${leadInfo?.email}` },
              { num: '2', title: 'Join the WhatsApp', desc: 'Connect with the community, get event updates, meet girls before events' },
              { num: '3', title: 'Show Up', desc: 'RSVP and come as you are — we\'ll handle the rest' },
            ].map((step) => (
              <div key={step.num} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-lync-gold rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm text-lync-navy">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-0.5">{step.title}</h3>
                  <p className="text-white/50 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/events"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-lync-gold text-lync-navy font-semibold py-3.5 rounded-full hover:bg-lync-gold-light transition-all duration-200"
            >
              Browse All Events <ArrowRight size={18} />
            </Link>
            <a
              href="https://wa.me/13107411846?text=Hi!%20I%20just%20took%20the%20quiz%20%F0%9F%98%8A"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-green-500 text-white font-semibold py-3.5 rounded-full hover:bg-green-600 transition-all duration-200"
            >
              <MessageCircle size={18} /> Join WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
