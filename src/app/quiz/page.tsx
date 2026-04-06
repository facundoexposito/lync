import { QuizContainer } from '@/components/quiz/quiz-container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Find Your Experience',
  description: 'Take our quick quiz to get matched with LYNC events and experiences that fit your vibe in Madrid. Find your perfect social circle in minutes.',
  openGraph: {
    images: [{ url: '/brand/COMMUNITY/pilates-group-laughing.webp', width: 1200, height: 630, alt: 'LYNC Quiz — Find Your Experience' }],
  },
}

export default function QuizPage() {
  return <QuizContainer />
}
