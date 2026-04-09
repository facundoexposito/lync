'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { QuizStep } from '@/components/quiz/quiz-step'
import { QuizResults } from '@/components/quiz/quiz-results'
import { quizQuestions } from '@/data/quiz-questions'
import { PAGE_SHELL } from '@/lib/page-shell'
import type { QuizAnswer, Event } from '@/lib/types'

interface QuizSectionProps {
  events?: Event[]
}

export function QuizSection({ events = [] }: QuizSectionProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [leadInfo, setLeadInfo] = useState<{
    name: string
    email: string
    phone: string
    nationality: string
  } | null>(null)
  const [done, setDone] = useState(false)

  const total = quizQuestions.length + 1
  const progress = total > 0 ? ((step + 1) / total) * 100 : 0
  const isLead = step >= quizQuestions.length
  const question = !isLead ? quizQuestions[step] : null

  const handleAnswer = useCallback(
    (id: string, answer: string | string[]) => {
      setAnswers((prev) => ({ ...prev, [id]: answer }))
    },
    []
  )

  const quizAnswers: QuizAnswer[] = Object.entries(answers).map(
    ([questionId, answer], i) => ({
      step: i + 1,
      questionId,
      answer,
    })
  )

  if (done) {
    return (
      <section className="bg-cream pb-14 pt-10 md:pb-20 md:pt-16">
        <div className={PAGE_SHELL}>
          <div className="mx-auto w-full max-w-3xl rounded-[2rem] border border-border bg-white p-6 shadow-lg sm:rounded-[2.5rem] md:p-10 lg:p-12">
            <QuizResults answers={quizAnswers} leadInfo={leadInfo} events={events} embedded />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-cream pb-12 pt-10 md:pb-16 md:pt-14">
      <div className={PAGE_SHELL}>
      <motion.div
        className="mx-auto w-full max-w-xl rounded-[1.75rem] border border-lync/15 bg-white p-6 shadow-[0_12px_40px_-8px_rgba(54,121,241,0.18)] sm:max-w-2xl sm:rounded-3xl sm:p-8 md:p-9"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="mb-5 flex justify-center">
          <Image
            src="/brand/ICON_BLUE.png"
            alt="LYNC"
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
            priority
          />
        </div>

        <header className="mb-6 text-center">
          <h2 className="font-display text-xl font-semibold uppercase tracking-normal text-dark sm:text-2xl md:text-[1.65rem]">
            Find your <span className="text-lync">community</span>
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
            <span className="block">
              A few quick questions, then we&apos;ll match you
            </span>
            <span className="block">
              with events you&apos;ll actually want to go to.
            </span>
          </p>
        </header>

        {/* Back + step (small, right) flush above progress bar */}
        <div className="mb-4">
          <div className="mb-1 flex items-baseline justify-between gap-3">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-lync"
              >
                <ArrowLeft size={14} strokeWidth={2} />
                Back
              </button>
            ) : (
              <span className="text-xs" aria-hidden />
            )}
            <p className="font-nav shrink-0 text-[11px] tabular-nums leading-none text-muted sm:text-xs">
              Step{' '}
              <span className="font-semibold text-dark">{step + 1}</span>
              {' of '}
              <span className="font-semibold text-dark">{total}</span>
            </p>
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

        <div key={step} className="animate-fade-up">
          <QuizStep
            question={question}
            isLeadStep={isLead}
            answers={answers}
            onAnswer={handleAnswer}
            onNext={() => setStep((s) => s + 1)}
            onLeadSubmit={(info) => {
              setLeadInfo(info)
              setDone(true)
            }}
            variant="oval"
          />
        </div>
      </motion.div>
      </div>
    </section>
  )
}
