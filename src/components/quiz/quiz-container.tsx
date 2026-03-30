'use client'

import { useState } from 'react'
import { QuizStep } from './quiz-step'
import { QuizResults } from './quiz-results'
import { quizQuestions } from '@/data/quiz-questions'
import { QuizAnswer } from '@/lib/types'

export function QuizContainer() {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [leadInfo, setLeadInfo] = useState<{
    name: string
    email: string
    phone?: string
    nationality: string
  } | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  const totalSteps = quizQuestions.length + 2 // questions + lead form + results

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === questionId)
      if (existing) {
        return prev.map((a) =>
          a.questionId === questionId ? { ...a, answer } : a
        )
      }
      return [...prev, { step: currentStep, questionId, answer }]
    })
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleLeadSubmit = (info: typeof leadInfo) => {
    setLeadInfo(info)
    setIsComplete(true)
    handleNext()
  }

  const progress = (currentStep / totalSteps) * 100

  if (isComplete && currentStep === totalSteps) {
    return <QuizResults answers={answers} leadInfo={leadInfo} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lync-cream to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-lync-blue transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Step {currentStep} of {totalSteps}
          </p>
        </div>

        {/* Quiz Step */}
        <QuizStep
          currentStep={currentStep}
          totalSteps={totalSteps}
          answers={answers}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onBack={handleBack}
          onLeadSubmit={handleLeadSubmit}
        />
      </div>
    </div>
  )
}
