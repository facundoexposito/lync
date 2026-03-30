'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

interface FAQProps { question: string; answer: string }

export function FAQ({ question, answer }: FAQProps) {
  const [open, setOpen] = useState(false)

  return (
    <button onClick={() => setOpen(!open)} className="w-full text-left border border-border rounded-xl p-5 hover:border-lync/20 transition-colors bg-white">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-semibold text-sm md:text-base pr-4">{question}</h3>
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-surface flex items-center justify-center">
          {open ? <Minus size={14} className="text-lync" /> : <Plus size={14} className="text-muted" />}
        </div>
      </div>
      <div className={`grid transition-all duration-200 ${open ? 'grid-rows-[1fr] mt-3' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className="text-muted text-sm leading-relaxed">{answer}</p>
        </div>
      </div>
    </button>
  )
}
