export type QuizAnswer = {
  step: number
  questionId: string
  answer: string | string[]
}

export type QuizResult = {
  answers: QuizAnswer[]
  recommendedEvents: string[]
  leadInfo?: {
    name: string
    email: string
    phone?: string
    nationality: string
  }
}

export type Event = {
  id: string
  title: string
  date: Date
  location: string
  category: 'Wellness' | 'Social' | 'Adventure' | 'Creative' | 'Nightlife'
  spotsLeft: number
  image: string
  price: string
  description: string
  highlights?: string[]
  schedulingUrl?: string
}

export type Testimonial = {
  name: string
  quote: string
  stars: number
  role?: string
  img?: string
}

export type FAQ = {
  question: string
  answer: string
}
