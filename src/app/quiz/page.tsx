import { QuizContainer } from '@/components/quiz/quiz-container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Find Your Experience | LYNC Quiz',
  description: 'Take our quick quiz to get matched with events and experiences that fit your vibe in Madrid.',
}

export default function QuizPage() {
  return <QuizContainer />
}
