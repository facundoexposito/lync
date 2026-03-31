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

interface Props {
  question: QuizQuestion | null
  isLeadStep: boolean
  answers: Record<string, string | string[]>
  onAnswer: (id: string, answer: string | string[]) => void
  onNext: () => void
  onLeadSubmit: (info: { name: string; email: string; phone?: string; nationality: string }) => void
}

export function QuizStep({ question, isLeadStep, answers, onAnswer, onNext, onLeadSubmit }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', nationality: '' })

  if (isLeadStep) {
    return (
      <div>
        <span className="text-4xl block mb-6">✉️</span>
        <h2 className="mb-2 font-nav text-3xl font-semibold uppercase tracking-normal md:text-4xl">Almost there!</h2>
        <p className="text-muted mb-10">Where should we send your personalized recommendations?</p>

        <form onSubmit={(e) => { e.preventDefault(); onLeadSubmit(form) }} className="space-y-4">
          {[
            { key: 'name', label: 'First Name', type: 'text', placeholder: 'Rebecca', required: true },
            { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', required: true },
            { key: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: '+34 612 345 678', required: false },
            { key: 'nationality', label: 'Nationality', type: 'text', placeholder: 'American, British...', required: true },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-semibold uppercase tracking-normal text-muted mb-2">
                {f.label} {f.required && <span className="text-lync">*</span>}
              </label>
              <input
                type={f.type}
                required={f.required}
                value={form[f.key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border border-border focus:border-lync focus:ring-2 focus:ring-lync/10 outline-none transition-all text-dark placeholder:text-muted/40"
                placeholder={f.placeholder}
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-lync text-white font-semibold py-4 rounded-full text-base hover:bg-lync-dark transition-colors mt-6"
          >
            See My Results <ArrowRight size={18} />
          </button>
        </form>
      </div>
    )
  }

  if (!question) return null

  const currentAnswer = answers[question.id]
  const selected: string[] = Array.isArray(currentAnswer) ? currentAnswer : currentAnswer ? [currentAnswer] : []

  const handleClick = (value: string) => {
    if (question.type === 'multi') {
      const next = selected.includes(value) ? selected.filter(v => v !== value) : [...selected, value]
      onAnswer(question.id, next)
    } else {
      onAnswer(question.id, value)
      setTimeout(onNext, 250)
    }
  }

  return (
    <div>
      <h2 className="mb-2 font-nav text-3xl font-semibold md:text-4xl">{question.question}</h2>
      {question.subtitle && <p className="text-muted text-sm mb-8">{question.subtitle}</p>}
      {!question.subtitle && <div className="mb-8" />}

      <div className="space-y-2.5">
        {question.options.map((opt) => {
          const isSelected = selected.includes(opt.value)
          return (
            <button
              key={opt.value}
              onClick={() => handleClick(opt.value)}
              className={`w-full flex items-center gap-4 p-4 md:p-5 rounded-xl border-2 transition-all duration-150 text-left ${
                isSelected
                  ? 'border-lync bg-lync-light'
                  : 'border-border hover:border-muted/30'
              }`}
            >
              <span className="text-2xl flex-shrink-0">{opt.icon}</span>
              <div className="flex-1">
                <span className="font-semibold text-dark text-sm md:text-base">{opt.label}</span>
                {opt.subtitle && <span className="block text-muted text-xs mt-0.5">{opt.subtitle}</span>}
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                isSelected ? 'bg-lync border-lync' : 'border-border'
              }`}>
                {isSelected && <Check size={12} className="text-white" />}
              </div>
            </button>
          )
        })}
      </div>

      {question.type === 'multi' && (
        <button
          onClick={onNext}
          disabled={selected.length === 0}
          className={`w-full flex items-center justify-center gap-2 font-semibold py-4 rounded-full mt-8 transition-all ${
            selected.length > 0
              ? 'bg-dark text-white hover:bg-lync'
              : 'bg-surface text-muted cursor-not-allowed'
          }`}
        >
          Continue <ArrowRight size={18} />
        </button>
      )}
    </div>
  )
}
