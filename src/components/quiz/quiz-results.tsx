import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { EventCard } from '@/components/events/event-card'
import { events } from '@/data/events'
import { QuizAnswer } from '@/lib/types'
import { Sparkles, Calendar, Heart } from 'lucide-react'

interface QuizResultsProps {
  answers: QuizAnswer[]
  leadInfo: {
    name: string
    email: string
    phone?: string
    nationality: string
  } | null
}

export function QuizResults({ answers, leadInfo }: QuizResultsProps) {
  // Simple recommendation logic - in Phase 2, this would be more sophisticated
  const interestsAnswer = answers.find((a) => a.questionId === 'interests')
  const interests = Array.isArray(interestsAnswer?.answer)
    ? interestsAnswer.answer
    : []

  const recommendedEvents = events.filter((event) => {
    const categoryMatch = interests.some(
      (interest) => event.category.toLowerCase() === interest
    )
    return categoryMatch
  }).slice(0, 3)

  // Fallback to first 3 events if no matches
  const displayEvents = recommendedEvents.length > 0 ? recommendedEvents : events.slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-lync-cream to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl text-center mb-12 fade-in">
          <div className="w-20 h-20 bg-lync-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles size={40} className="text-lync-blue" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Welcome to LYNC, {leadInfo?.name}! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Based on your answers, we've found the perfect events to help you make friends in Madrid.
          </p>
          <div className="bg-lync-blue/5 rounded-2xl p-6 max-w-md mx-auto">
            <p className="text-sm text-gray-600">
              We'll send your personalized recommendations to{' '}
              <span className="font-semibold text-lync-navy">{leadInfo?.email}</span>
            </p>
          </div>
        </div>

        {/* Recommended Events */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="text-lync-blue" size={32} />
            <h2 className="font-display text-3xl font-bold">Your Recommended Events</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayEvents.map((event, i) => (
              <div key={event.id} className="fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-lync-navy text-white rounded-3xl p-8 md:p-12 fade-in">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="text-lync-gold" size={32} />
            <h2 className="font-display text-3xl font-bold">What's Next?</h2>
          </div>
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-lync-gold rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lync-navy">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Check Your Email</h3>
                <p className="text-blue-100">
                  We've sent your event recommendations and next steps to your inbox.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-lync-gold rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lync-navy">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Join Our WhatsApp Community</h3>
                <p className="text-blue-100">
                  Connect with other girls, get event updates, and ask questions.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-lync-gold rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lync-navy">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">RSVP to Your First Event</h3>
                <p className="text-blue-100">
                  Pick an event that sounds fun and secure your spot!
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/events" className="flex-1">
              <Button variant="secondary" size="lg" className="w-full">
                Browse All Events
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" size="lg" className="w-full border-white text-white hover:bg-white hover:text-lync-navy">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
