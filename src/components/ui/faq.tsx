'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQProps {
  question: string
  answer: string
}

export function FAQ({ question, answer }: FAQProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="w-full text-left bg-lync-cream/60 hover:bg-lync-cream rounded-2xl p-6 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-lg font-bold pr-4">{question}</h3>
        <ChevronDown
          size={20}
          className={`text-lync-blue flex-shrink-0 mt-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      <div
        className={`grid transition-all duration-200 ${isOpen ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      </div>
    </button>
  )
}
