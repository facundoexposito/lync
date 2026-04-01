'use client'

import { useState, useCallback } from 'react'
import { QuizStep } from './quiz-step'
import { QuizResults } from './quiz-results'
import { quizQuestions } from '@/data/quiz-questions'
import { QuizAnswer } from '@/lib/types'
import { ArrowLeft } from 'lucide-react'

export function QuizContainer() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [leadInfo, setLeadInfo] = useState<{ name: string; email: string; phone?: string; nationality: string } | null>(null)
  const [done, setDone] = useState(false)

  const total = quizQuestions.length + 1
  const progress = total > 0 ? ((step + 1) / total) * 100 : 0
  const isLead = step >= quizQuestions.length
  const question = !isLead ? quizQuestions[step] : null

  const handleAnswer = useCallback((id: string, answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [id]: answer }))
  }, [])

  const quizAnswers: QuizAnswer[] = Object.entries(answers).map(([questionId, answer], i) => ({
    step: i + 1, questionId, answer,
  }))

  if (done) return <QuizResults answers={quizAnswers} leadInfo={leadInfo} />

  return (
    <div className="flex min-h-screen flex-col bg-cream pt-20">
      {/* Progress bar — full width at top */}
      <div className="fixed top-16 left-0 right-0 z-40 h-1 bg-border md:top-20">
        <div className="h-full bg-lync transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-5 sm:py-10">
        <div className="w-full max-w-md">
          {/* Step info */}
          <div className="mb-5 flex items-center justify-between sm:mb-6">
            {step > 0 ? (
              <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-1.5 text-muted hover:text-dark text-sm transition-colors">
                <ArrowLeft size={16} /> Back
              </button>
            ) : <div />}
            <span className="text-xs font-mono text-muted">{step + 1} / {total}</span>
          </div>

          {/* Content */}
          <div key={step} className="animate-fade-up">
            <QuizStep
              question={question}
              isLeadStep={isLead}
              answers={answers}
              onAnswer={handleAnswer}
              onNext={() => setStep(s => s + 1)}
              onLeadSubmit={(info) => { setLeadInfo(info); setDone(true) }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
