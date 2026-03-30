'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { quizQuestions } from '@/data/quiz-questions'
import { QuizAnswer } from '@/lib/types'
import { ChevronLeft } from 'lucide-react'

interface QuizStepProps {
  currentStep: number
  totalSteps: number
  answers: QuizAnswer[]
  onAnswer: (questionId: string, answer: string | string[]) => void
  onNext: () => void
  onBack: () => void
  onLeadSubmit: (info: {
    name: string
    email: string
    phone?: string
    nationality: string
  }) => void
}

export function QuizStep({
  currentStep,
  totalSteps,
  answers,
  onAnswer,
  onNext,
  onBack,
  onLeadSubmit,
}: QuizStepProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nationality: '',
  })

  const currentQuestion = quizQuestions.find((q) => q.step === currentStep)
  const isLeadForm = currentStep === totalSteps - 1

  const handleOptionClick = (value: string) => {
    if (currentQuestion?.type === 'multi') {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value]
      setSelectedValues(newValues)
      onAnswer(currentQuestion.id, newValues)
    } else {
      setSelectedValues([value])
      onAnswer(currentQuestion!.id, value)
    }
  }

  const handleNextClick = () => {
    if (currentQuestion?.type === 'single' && selectedValues.length > 0) {
      setSelectedValues([])
    }
    onNext()
  }

  const handleLeadFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLeadSubmit(formData)
  }

  const currentAnswer = answers.find(
    (a) => a.questionId === currentQuestion?.id
  )
  const isAnswered = currentQuestion?.type === 'multi' 
    ? selectedValues.length > 0 
    : currentAnswer !== undefined || selectedValues.length > 0

  if (isLeadForm) {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl fade-in">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-lync-blue transition-colors mb-6"
        >
          <ChevronLeft size={20} />
          Back
        </button>

        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Almost there! 🎉
        </h2>
        <p className="text-gray-600 mb-8">
          Tell us how to send your personalized event recommendations.
        </p>

        <form onSubmit={handleLeadFormSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-lync-blue focus:outline-none transition-colors"
              placeholder="Your first name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-lync-blue focus:outline-none transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone (Optional)
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-lync-blue focus:outline-none transition-colors"
              placeholder="+34 123 456 789"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nationality *
            </label>
            <input
              type="text"
              required
              value={formData.nationality}
              onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-lync-blue focus:outline-none transition-colors"
              placeholder="e.g., American, British, Spanish"
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            See My Recommendations
          </Button>
        </form>
      </div>
    )
  }

  if (!currentQuestion) return null

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl fade-in">
      {currentStep > 1 && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-lync-blue transition-colors mb-6"
        >
          <ChevronLeft size={20} />
          Back
        </button>
      )}

      <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
        {currentQuestion.question}
      </h2>
      {currentQuestion.subtitle && (
        <p className="text-gray-600 mb-8">{currentQuestion.subtitle}</p>
      )}

      <div className="grid grid-cols-1 gap-4 mb-8">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedValues.includes(option.value)
          return (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
                isSelected
                  ? 'border-lync-blue bg-lync-blue/5 scale-[1.02]'
                  : 'border-gray-200 hover:border-lync-blue/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{option.icon}</div>
                <div className="flex-1">
                  <div className="font-semibold text-lg">{option.label}</div>
                  {'subtitle' in option && option.subtitle && (
                    <div className="text-sm text-gray-600">{option.subtitle}</div>
                  )}
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-lync-blue flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {currentQuestion.type === 'multi' ? (
        <Button
          size="lg"
          className="w-full"
          onClick={handleNextClick}
          disabled={!isAnswered}
        >
          Continue
        </Button>
      ) : (
        isAnswered && (
          <Button size="lg" className="w-full" onClick={handleNextClick}>
            Continue
          </Button>
        )
      )}
    </div>
  )
}
