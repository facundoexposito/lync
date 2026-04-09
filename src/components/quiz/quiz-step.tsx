'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { CtaMotionButton } from '@/components/ui/cta-hover'

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
  onLeadSubmit: (info: { name: string; email: string; phone: string; nationality: string }) => void
  /** Homepage blue oval: white pills, light question copy */
  variant?: 'default' | 'oval'
}

export function QuizStep({
  question,
  isLeadStep,
  answers,
  onAnswer,
  onNext,
  onLeadSubmit,
  variant = 'default',
}: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', nationality: '' })
  const isOval = variant === 'oval'

  const nationalities = [
    'American', 'Argentinian', 'Australian', 'Austrian', 'Belgian', 'Brazilian',
    'British', 'Canadian', 'Chilean', 'Chinese', 'Colombian', 'Czech', 'Danish',
    'Dutch', 'Ecuadorian', 'Finnish', 'French', 'German', 'Greek', 'Hungarian',
    'Indian', 'Irish', 'Israeli', 'Italian', 'Japanese', 'Korean', 'Mexican',
    'Norwegian', 'Peruvian', 'Polish', 'Portuguese', 'Romanian', 'Russian',
    'South African', 'Spanish', 'Swedish', 'Swiss', 'Turkish', 'Ukrainian',
    'Venezuelan',
  ]

  if (isLeadStep) {
    const inputClass = `w-full rounded-xl border border-border bg-white px-3 py-2.5 text-dark shadow-sm outline-none transition-all placeholder:text-muted/60 focus:border-lync focus:ring-2 focus:ring-lync/10 sm:py-3 ${
      isOval ? '' : 'px-4 py-3.5'
    }`

    return (
      <div className={isOval ? 'text-center' : undefined}>
        {!isOval && (
          <span className="mb-3 block text-3xl">✉️</span>
        )}
        <h2
          className={`font-display font-semibold uppercase tracking-normal ${
            isOval
              ? 'mb-2 text-xl text-dark md:text-2xl'
              : 'mb-1 text-2xl text-dark md:text-3xl'
          }`}
        >
          Almost there!
        </h2>
        <p
          className={`text-sm md:text-base ${
            isOval ? 'mb-5 text-muted' : 'mb-5 text-muted md:mb-6'
          }`}
        >
          Where should we send your personalized recommendations?
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onLeadSubmit(form)
          }}
          className={`text-left ${
            isOval
              ? 'mx-auto w-full rounded-2xl border border-border bg-cream/70 p-4 sm:p-5 md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-3 md:p-5'
              : 'space-y-3 rounded-2xl border border-border bg-white p-4 shadow-md sm:p-5 md:space-y-4'
          }`}
        >
          {/* Name */}
          <div className={isOval ? 'space-y-1.5' : ''}>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-normal text-muted">
              First Name <span className="text-lync">*</span>
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
              placeholder="Rebecca"
            />
          </div>

          {/* Email */}
          <div className={isOval ? 'space-y-1.5' : ''}>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-normal text-muted">
              Email <span className="text-lync">*</span>
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>

          {/* Nationality (dropdown) */}
          <div className={isOval ? 'space-y-1.5' : ''}>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-normal text-muted">
              Nationality <span className="text-lync">*</span>
            </label>
            <select
              required
              value={form.nationality}
              onChange={(e) => setForm({ ...form, nationality: e.target.value })}
              className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M2%204l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-8`}
            >
              <option value="" disabled>Select nationality</option>
              {nationalities.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Phone */}
          <div className={isOval ? 'space-y-1.5' : ''}>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-normal text-muted">
              Phone <span className="text-lync">*</span>
            </label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
              placeholder="+34 612 345 678"
            />
          </div>

          <CtaMotionButton
            type="submit"
            className={`flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#5a96f5] to-lync-dark text-sm font-semibold text-white shadow-sm transition-shadow hover:shadow-md ${
              isOval
                ? 'col-span-full mt-2 py-3 sm:py-3.5 md:mt-1 md:text-base'
                : 'mt-4 py-3.5 md:py-4 md:text-base'
            }`}
          >
            See My Results <ArrowRight size={18} />
          </CtaMotionButton>
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

  if (isOval) {
    const n = question.options.length
    const gridFour =
      question.type === 'single' && n === 4
        ? 'grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3'
        : null
    const gridMulti =
      question.type === 'multi' && n >= 4
        ? 'grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5'
        : null
    const listClass = gridFour ?? gridMulti ?? 'flex flex-col gap-2'

    return (
      <div className="w-full">
        <h2 className="font-display mb-2 text-center text-lg font-semibold leading-snug text-dark sm:text-xl md:mb-3 md:text-2xl">
          {question.question}
        </h2>
        {question.subtitle ? (
          <p className="mb-5 text-center text-sm text-muted">{question.subtitle}</p>
        ) : (
          <div className="mb-5" />
        )}

        <div className={`mx-auto w-full ${listClass}`}>
          {question.options.map((opt) => {
            const isSelected = selected.includes(opt.value)
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleClick(opt.value)}
                className={`flex min-h-[3rem] w-full items-center gap-3 rounded-2xl border px-4 py-2.5 text-left text-sm font-semibold transition-all duration-150 sm:min-h-[3.25rem] sm:text-[0.9375rem] ${
                  isSelected
                    ? 'border-lync bg-lync-light text-lync-dark shadow-sm'
                    : 'border-border bg-cream/40 text-dark hover:border-lync/35 hover:bg-lync-light/50'
                }`}
              >
                {opt.icon && <span className="flex-shrink-0 text-lg leading-none sm:text-xl">{opt.icon}</span>}
                <div className="min-w-0 flex-1">
                  <span>{opt.label}</span>
                  {opt.subtitle && (
                    <span className="mt-0.5 block text-xs font-normal text-muted">{opt.subtitle}</span>
                  )}
                </div>
                <div
                  className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                    isSelected ? 'border-lync bg-lync' : 'border-border bg-white'
                  }`}
                >
                  {isSelected && <Check size={12} className="text-white" strokeWidth={2.5} />}
                </div>
              </button>
            )
          })}
        </div>

        {question.type === 'multi' && (
          <CtaMotionButton
            type="button"
            onClick={onNext}
            disabled={selected.length === 0}
            className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all sm:text-base ${
              selected.length > 0
                ? 'bg-lync text-white hover:bg-lync-dark'
                : 'cursor-not-allowed bg-border text-muted'
            }`}
          >
            Continue <ArrowRight size={16} />
          </CtaMotionButton>
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-1 font-display text-xl font-semibold leading-snug text-dark sm:text-2xl md:text-[1.65rem]">
        {question.question}
      </h2>
      {question.subtitle ? (
        <p className="mb-4 text-sm text-muted">{question.subtitle}</p>
      ) : (
        <div className="mb-4" />
      )}

      <div className="rounded-2xl border border-border bg-white p-3 shadow-sm sm:p-4">
        <div className="space-y-2">
          {question.options.map((opt) => {
            const isSelected = selected.includes(opt.value)
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleClick(opt.value)}
                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-150 sm:gap-3.5 sm:px-3.5 sm:py-3 ${
                  isSelected
                    ? 'border-lync bg-lync-light shadow-sm'
                    : 'border-border bg-surface/80 hover:border-lync/35 hover:bg-lync-light/40'
                }`}
              >
                {opt.icon && <span className="flex-shrink-0 text-xl sm:text-2xl">{opt.icon}</span>}
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-semibold text-dark">{opt.label}</span>
                  {opt.subtitle && (
                    <span className="mt-0.5 block text-xs text-muted">{opt.subtitle}</span>
                  )}
                </div>
                <div
                  className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    isSelected ? 'border-lync bg-lync' : 'border-border bg-white'
                  }`}
                >
                  {isSelected && <Check size={10} className="text-white" strokeWidth={3} />}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {question.type === 'multi' && (
        <CtaMotionButton
          type="button"
          onClick={onNext}
          disabled={selected.length === 0}
          className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all sm:py-3.5 sm:text-base ${
            selected.length > 0
              ? 'bg-dark text-white hover:bg-lync'
              : 'cursor-not-allowed bg-surface text-muted'
          }`}
        >
          Continue <ArrowRight size={16} />
        </CtaMotionButton>
      )}
    </div>
  )
}
