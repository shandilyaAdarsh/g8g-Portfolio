'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus, Minus } from 'lucide-react'
import { PageContainer } from '../layout/PageContainer'

interface FaqItem {
  question: string
  answer: string
}

const FAQS: FaqItem[] = [
  {
    question: 'How fast can we go from initial brief to final delivery?',
    answer:
      'Standard productions average 3 to 5 weeks. If you have an urgent product launch or keynote date, we offer an expedited 14-day sprint pipeline.',
  },
  {
    question: 'Do we need a script or storyboard before reaching out?',
    answer:
      'No. Over 70% of our partners come to us with just a technical spec sheet or a slide deck. We handle creative concepting, scriptwriting, and visual storyboarding from scratch.',
  },
  {
    question: 'How do review rounds and revisions work?',
    answer:
      'We use Frame.io for frame-accurate, timecode-synced feedback. You and your team click directly on the video to leave notes, and revisions are returned within 24–48 hours.',
  },
  {
    question: 'What exact deliverables do we receive at completion?',
    answer:
      'Full 4K ProRes 422 HQ masters, compressed web-ready H.264/HLS packages, 9:16 vertical cuts optimized for Instagram/TikTok/YouTube Shorts, 6-second teaser cuts, and isolated audio stems.',
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section className="py-12 md:py-[72px] bg-white relative overflow-hidden" aria-labelledby="faq-heading">
      <PageContainer>
        <div className="max-w-3xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E79]" />
            <span className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF2E79]">
              FAQ &amp; COLLABORATION
            </span>
          </div>

          {/* Heading */}
          <h2
            id="faq-heading"
            className="font-display text-3xl sm:text-4xl md:text-[44px] font-black text-[#111111] text-center tracking-tight leading-tight mb-4"
          >
            Everything you need to know <br className="hidden sm:inline" />
            before we <span className="font-serif italic font-normal text-[#FF2E79]">roll.</span>
          </h2>

          <p className="text-[#52525B] text-center text-sm sm:text-base max-w-lg mx-auto mb-10 leading-relaxed">
            Transparent workflows, defined milestones, and zero hidden surprises from script to screen.
          </p>

          {/* Accordion List */}
          <div className="space-y-3">
            {FAQS.map((item, idx) => {
              const isOpen = openIndex === idx
              const questionId = `faq-question-${idx}`
              const answerId = `faq-answer-${idx}`

              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-neutral-900/15 bg-neutral-50/70 shadow-xs'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                  }`}
                >
                  <button
                    id={questionId}
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E79]"
                  >
                    <span className="font-display text-base sm:text-lg font-bold text-[#111111] pr-2">
                      {item.question}
                    </span>
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isOpen
                          ? 'bg-[#111111] text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                      aria-hidden="true"
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={answerId}
                        role="region"
                        aria-labelledby={questionId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-[15px] text-[#52525B] leading-relaxed border-t border-neutral-100">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
