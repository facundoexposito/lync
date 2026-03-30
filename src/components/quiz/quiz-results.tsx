import Link from 'next/link'
import { EventCard } from '@/components/events/event-card'
import { events } from '@/data/events'
import { QuizAnswer } from '@/lib/types'
import { ArrowRight, MessageCircle, Check } from 'lucide-react'

interface Props {
  answers: QuizAnswer[]
  leadInfo: { name: string; email: string; phone?: string; nationality: string } | null
}

export function QuizResults({ answers, leadInfo }: Props) {
  const interests = answers.find(a => a.questionId === 'interests')
  const interestList = Array.isArray(interests?.answer) ? interests.answer : []
  const matched = events.filter(e => interestList.some(i => e.category.toLowerCase() === i)).slice(0, 3)
  const display = matched.length > 0 ? matched : events.slice(0, 3)

  return (
    <div className="min-h-screen pt-24 pb-16 px-5">
      <div className="max-w-4xl mx-auto">
        {/* Welcome */}
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-6xl block mb-6">🎉</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Welcome, <span className="text-lync">{leadInfo?.name}</span>!
          </h1>
          <p className="text-muted text-lg max-w-md mx-auto">
            Here are the events we picked for you based on your answers.
          </p>
        </div>

        {/* Events */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {display.map((event, i) => (
            <div key={event.id} className="animate-fade-up" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {/* Next steps */}
        <div className="bg-dark text-white rounded-2xl p-8 md:p-10 animate-fade-up delay-400">
          <h2 className="font-display text-2xl font-bold mb-8">What happens next</h2>
          <div className="space-y-5 mb-10">
            {[
              { text: `Recommendations sent to ${leadInfo?.email}` },
              { text: 'Join the WhatsApp community to meet girls before events' },
              { text: 'RSVP to your first event and show up — we handle the rest' },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-lync flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={12} className="text-white" />
                </div>
                <p className="text-white/70 text-sm">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/events"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-dark font-semibold py-3.5 rounded-full text-sm hover:bg-white/90 transition-colors"
            >
              Browse All Events <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/13107411846?text=Hi!%20I%20just%20took%20the%20quiz%20%F0%9F%98%8A"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-3.5 rounded-full text-sm hover:bg-[#20bd5a] transition-colors"
            >
              <MessageCircle size={16} /> Join WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
