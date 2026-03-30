'use client'

import { useState, useCallback } from 'react'
import { QuizStep } from './quiz-step'
import { QuizResults } from './quiz-results'
import { quizQuestions } from '@/data/quiz-questions'
import { QuizAnswer } from '@/lib/types'
import { ArrowLeft } from 'lucide-react'

export function QuizContainer() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [leadInfo, setLeadInfo] = useState<{
    name: string
    email: string
    phone?: string
    nationality: string
  } | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  const totalSteps = quizQuestions.length + 1 // questions + lead form
  const progress = ((currentStep + 1) / (totalSteps + 1)) * 100

  const handleAnswer = useCallback((questionId: string, answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }, [])

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1)
  }

  const handleLeadSubmit = (info: typeof leadInfo) => {
    setLeadInfo(info)
    setIsComplete(true)
  }

  const quizAnswers: QuizAnswer[] = Object.entries(answers).map(([questionId, answer], i) => ({
    step: i + 1,
    questionId,
    answer,
  }))

  if (isComplete) {
    return <QuizResults answers={quizAnswers} leadInfo={leadInfo} />
  }

  const isLeadStep = currentStep >= quizQuestions.length
  const currentQuestion = !isLeadStep ? quizQuestions[currentStep] : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-lync-cream via-white to-lync-cream/50 pt-24 pb-12 px-5">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-lync-blue font-semibold text-sm tracking-widest uppercase">Quiz</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-2">Find Your LYNC Experience</h1>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-gray-400 font-medium mb-2">
            <span>Step {currentStep + 1} of {totalSteps}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-lync-blue to-lync-gold rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Back button */}
        {currentStep > 0 && (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-400 hover:text-lync-navy transition-colors mb-4 text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        )}

        {/* Content */}
        <div className="animate-fade-up" key={currentStep}>
          <QuizStep
            currentStep={currentStep}
            question={currentQuestion}
            isLeadStep={isLeadStep}
            answers={answers}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onLeadSubmit={handleLeadSubmit}
          />
        </div>
      </div>
    </div>
  )
}
