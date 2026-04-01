'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqItemProps {
  question: string
  answer: string
}

/** Cream-tint accordion row on `bg-cream` */
export function FaqItem({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="w-full rounded-2xl bg-[#FAF8F4] px-5 py-4 text-left shadow-sm ring-1 ring-black/[0.04] md:px-7 md:py-5"
      aria-expanded={open}
    >
      <div className="flex items-center justify-between gap-4">
        <h3
          className={`font-nav text-sm leading-snug text-dark md:text-base ${open ? 'font-semibold' : 'font-medium'}`}
        >
          {question}
        </h3>
        <ChevronDown
          size={22}
          strokeWidth={2}
          className={`shrink-0 text-muted transition-transform duration-200 ${
            open ? '-rotate-180' : ''
          }`}
          aria-hidden
        />
      </div>
      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="font-body pt-3 text-sm font-normal leading-relaxed text-muted md:text-[15px]">
            {answer}
          </p>
        </div>
      </div>
    </button>
  )
}
