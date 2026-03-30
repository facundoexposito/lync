'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

interface QuizQuestion {
  id: string
  step: number
  question: string
  subtitle?: string
  options: { value: string; label: string; icon: string; subtitle?: string }[]
  type: string
}

interface QuizStepProps {
  currentStep: number
  question: QuizQuestion | null
  isLeadStep: boolean
  answers: Record<string, string | string[]>
  onAnswer: (questionId: string, answer: string | string[]) => void
  onNext: () => void
  onLeadSubmit: (info: { name: string; email: string; phone?: string; nationality: string }) => void
}

export function QuizStep({ question, isLeadStep, answers, onAnswer, onNext, onLeadSubmit }: QuizStepProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', nationality: '' })

  if (isLeadStep) {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">🎉</span>
          <h2 className="font-display text-3xl font-bold mb-2">Almost there!</h2>
          <p className="text-gray-500">Tell us where to send your personalized recommendations.</p>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); onLeadSubmit(formData) }}
          className="space-y-5"
        >
          {[
            { key: 'name', label: 'First Name', type: 'text', placeholder: 'Rebecca', required: true },
            { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', required: true },
            { key: 'phone', label: 'Phone (Optional)', type: 'tel', placeholder: '+34 612 345 678', required: false },
            { key: 'nationality', label: 'Nationality', type: 'text', placeholder: 'American, British, French...', required: true },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-semibold text-lync-navy mb-2">
                {field.label} {field.required && <span className="text-lync-blue">*</span>}
              </label>
              <input
                type={field.type}
                required={field.required}
                value={formData[field.key as keyof typeof formData]}
                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-lync-blue focus:outline-none transition-colors text-lync-navy placeholder:text-gray-300"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-lync-gold text-lync-navy font-bold py-4 rounded-full text-lg hover:bg-lync-gold-light transition-all duration-200 mt-8"
          >
            See My Recommendations
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    )
  }

  if (!question) return null

  const currentAnswer = answers[question.id]
  const selectedValues: string[] = Array.isArray(currentAnswer) ? currentAnswer : currentAnswer ? [currentAnswer] : []

  const handleClick = (value: string) => {
    if (question.type === 'multi') {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value]
      onAnswer(question.id, newValues)
    } else {
      onAnswer(question.id, value)
      // Auto-advance on single select after a brief delay
      setTimeout(onNext, 300)
    }
  }

  const canContinue = question.type === 'multi' ? selectedValues.length > 0 : selectedValues.length > 0

  return (
    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100">
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">{question.question}</h2>
      {question.subtitle && (
        <p className="text-gray-400 mb-6 text-sm">{question.subtitle}</p>
      )}
      {!question.subtitle && <div className="mb-6" />}

      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option) => {
          const isSelected = selectedValues.includes(option.value)
          return (
            <button
              key={option.value}
              onClick={() => handleClick(option.value)}
              className={`relative flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 text-left group ${
                isSelected
                  ? 'border-lync-blue bg-lync-blue-light shadow-sm'
                  : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className="text-3xl flex-shrink-0">{option.icon}</span>
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-lync-navy block">{option.label}</span>
                {option.subtitle && (
                  <span className="text-gray-400 text-sm">{option.subtitle}</span>
                )}
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                isSelected
                  ? 'bg-lync-blue border-lync-blue'
                  : 'border-gray-200 group-hover:border-gray-300'
              }`}>
                {isSelected && <Check size={14} className="text-white" />}
              </div>
            </button>
          )
        })}
      </div>

      {question.type === 'multi' && (
        <button
          onClick={onNext}
          disabled={!canContinue}
          className={`w-full flex items-center justify-center gap-2 font-bold py-4 rounded-full text-lg mt-6 transition-all duration-200 ${
            canContinue
              ? 'bg-lync-navy text-white hover:bg-lync-blue'
              : 'bg-gray-100 text-gray-300 cursor-not-allowed'
          }`}
        >
          Continue
          <ArrowRight size={20} />
        </button>
      )}
    </div>
  )
}
