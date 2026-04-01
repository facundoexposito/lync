'use client'

import { useState, useCallback } from 'react'
import { motion } from 'motion/react'
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
      <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-5 sm:py-10">
        <motion.div
          className="w-full max-w-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Card */}
          <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-lg sm:rounded-[2rem] sm:p-7 md:p-8">
            {/* Header — only on first step */}
            {step === 0 && (
              <div className="mb-6 text-center sm:mb-7">
                <h1 className="font-display text-2xl font-semibold uppercase tracking-normal text-dark sm:text-3xl md:text-4xl">
                  Find your <span className="text-lync">experience</span>
                </h1>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                  A few quick questions, then we&apos;ll match you with events you&apos;ll actually want to go to.
                </p>
              </div>
            )}

            {/* Step info + progress bar */}
            <div className="mb-5 sm:mb-6">
              <div className="mb-1.5 flex items-center justify-between">
                {step > 0 ? (
                  <button
                    onClick={() => setStep(s => s - 1)}
                    className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-dark"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                ) : <div />}
                <span className="text-xs font-medium tabular-nums text-muted">
                  Step <span className="font-semibold text-dark">{step + 1}</span> of <span className="font-semibold text-dark">{total}</span>
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-lync-light">
                <div
                  className="h-full rounded-full bg-lync transition-[width] duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                  role="progressbar"
                  aria-valuenow={step + 1}
                  aria-valuemin={1}
                  aria-valuemax={total}
                  aria-label={`Step ${step + 1} of ${total}`}
                />
              </div>
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
        </motion.div>
      </div>
    </div>
  )
}
