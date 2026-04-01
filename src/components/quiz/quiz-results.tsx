import { CtaMotionLink, CtaMotionA } from '@/components/ui/cta-hover'
import { EventCard } from '@/components/events/event-card'
import { events } from '@/data/events'
import { QuizAnswer } from '@/lib/types'
import { ArrowRight, MessageCircle, Check } from 'lucide-react'

interface Props {
  answers: QuizAnswer[]
  leadInfo: { name: string; email: string; phone?: string; nationality: string } | null
  /** Homepage inline layout: no full-viewport shell, tighter stack */
  embedded?: boolean
}

export function QuizResults({ answers, leadInfo, embedded = false }: Props) {
  const interests = answers.find(a => a.questionId === 'interests')
  const interestList = Array.isArray(interests?.answer) ? interests.answer : []
  const matched = events.filter(e => interestList.some(i => e.category.toLowerCase() === i)).slice(0, 3)
  const display = matched.length > 0 ? matched : events.slice(0, 3)

  return (
    <div
      className={
        embedded
          ? 'py-2'
          : 'min-h-screen px-5 pb-16 pt-24'
      }
    >
      <div className={`mx-auto ${embedded ? 'max-w-2xl' : 'max-w-4xl'}`}>
        {/* Welcome */}
        <div
          className={`animate-fade-up text-center ${embedded ? 'mb-8' : 'mb-16'}`}
        >
          <span className={`block ${embedded ? 'mb-3 text-5xl' : 'mb-6 text-6xl'}`}>
            🎉
          </span>
          <h1
            className={`mb-3 font-display font-semibold uppercase tracking-normal ${
              embedded
                ? 'text-2xl md:text-3xl'
                : 'mb-4 text-4xl md:text-5xl'
            }`}
          >
            Welcome,{' '}
            <span className="text-lync">{leadInfo?.name}</span>!
          </h1>
          <p
            className={`mx-auto max-w-md text-muted ${embedded ? 'text-sm md:text-base' : 'text-lg'}`}
          >
            Here are the events we picked for you based on your answers.
          </p>
        </div>

        {/* Events */}
        <div
          className={`grid grid-cols-1 gap-5 ${embedded ? 'mb-8 sm:grid-cols-2' : 'mb-16 md:grid-cols-3'}`}
        >
          {display.map((event, i) => (
            <div key={event.id} className="animate-fade-up" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {/* Next steps */}
        <div
          className={`animate-fade-up rounded-2xl bg-dark text-white delay-400 ${
            embedded ? 'p-6 md:p-8' : 'p-8 md:p-10'
          }`}
        >
          <h2
            className={`font-display font-semibold uppercase tracking-normal ${
              embedded ? 'mb-5 text-xl md:text-2xl' : 'mb-8 text-2xl'
            }`}
          >
            What happens next
          </h2>
          <div className={`space-y-5 ${embedded ? 'mb-6' : 'mb-10'}`}
          >
            {[
              { text: `Recommendations sent to ${leadInfo?.email}` },
              { text: 'Join the WhatsApp community to meet girls before events' },
              { text: 'RSVP to your first event and show up. We handle the rest' },
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
            <CtaMotionLink
              href="/events"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-dark font-semibold py-3.5 rounded-full text-sm hover:bg-white/90 transition-colors"
            >
              Browse All Events <ArrowRight size={16} />
            </CtaMotionLink>
            <CtaMotionA
              href="https://wa.me/13107411846?text=Hi!%20I%20just%20took%20the%20quiz%20%F0%9F%98%8A"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-3.5 rounded-full text-sm hover:bg-[#20bd5a] transition-colors"
            >
              <MessageCircle size={16} /> Join WhatsApp
            </CtaMotionA>
          </div>
        </div>
      </div>
    </div>
  )
}
