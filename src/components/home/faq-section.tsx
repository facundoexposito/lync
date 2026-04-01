'use client'

import { motion } from 'motion/react'
import { FaqItem } from '@/components/ui/faq'
import { faqs } from '@/data/faq'
import { PAGE_SHELL } from '@/lib/page-shell'

export function FaqSection() {
  return (
    <section
      className="bg-cream pb-14 pt-8 md:pb-24 md:pt-12"
      aria-labelledby="faq-heading"
    >
      <div className={PAGE_SHELL}>
      <motion.header
        className="mb-8 text-center md:mb-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h2
          id="faq-heading"
          className="font-display text-2xl font-semibold tracking-tight text-dark sm:text-3xl md:text-4xl"
        >
          Frequently Asked Questions
        </h2>
      </motion.header>

      <div className="mx-auto flex max-w-3xl flex-col gap-2.5 md:gap-3">
        {faqs.map((item) => (
          <FaqItem
            key={item.question}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
      </div>
    </section>
  )
}
