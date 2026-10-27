'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Plus, Minus, HelpCircle } from 'lucide-react'
import { PageContainer } from '../layout/PageContainer'
import { Eyebrow } from '../ui/Eyebrow'
import { SectionHeading } from '../ui/SectionHeading'
import { serviceFAQs, FAQItem } from '../../data/mediaServices'
import { Reveal } from '../motion/Reveal'

export function ServiceFAQ() {
  const [openId, setOpenId] = useState<string | null>(serviceFAQs[0].id)
  const reduced = useReducedMotion()

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="faq"
      className="py-24 md:py-32 relative border-b border-border-subtle"
      aria-labelledby="faq-heading"
    >
      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading and Context (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Reveal>
              <Eyebrow>Common Inquiries · Production FAQ</Eyebrow>
              <SectionHeading level={2} size="lg" id="faq-heading" className="mt-3">
                Everything you need to know before we{' '}
                <span className="text-accent">roll camera.</span>
              </SectionHeading>
              <p className="mt-4 text-base text-text-muted leading-relaxed">
                Clear answers regarding production formats, scoping guidelines, asset deliverables, and collaborative reviews.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="p-6 rounded-md bg-bg-secondary border border-border-subtle flex flex-col gap-3">
                <span className="text-xs font-mono uppercase tracking-widest text-accent">
                  Need a custom scope?
                </span>
                <p className="text-xs text-text-muted leading-relaxed">
                  Have unique timeline requirements, bespoke technical demos, or multi-format social campaign needs? Reach out to discuss a customized production brief.
                </p>
                <Link
                  href="/contact"
                  className="text-xs font-display font-semibold text-text-primary hover:text-accent underline underline-offset-4 transition-colors pt-1"
                >
                  Contact Production Team &rarr;
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Accordion list (7 cols) */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
            {serviceFAQs.map((item) => {
              const isOpen = openId === item.id
              const contentId = `faq-content-${item.id}`
              const buttonId = `faq-btn-${item.id}`

              return (
                <div key={item.id} className="py-5">
                  <button
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left flex items-center justify-between gap-4 py-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  >
                    <span className="font-display text-base sm:text-lg font-semibold text-text-primary group-hover:text-accent transition-colors duration-200">
                      {item.question}
                    </span>

                    <span className="h-8 w-8 rounded-sm bg-bg-secondary border border-border-subtle flex items-center justify-center text-text-muted group-hover:border-accent group-hover:text-accent transition-colors flex-shrink-0">
                      {isOpen ? (
                        <Minus size={16} aria-hidden="true" />
                      ) : (
                        <Plus size={16} aria-hidden="true" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={contentId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={reduced ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={reduced ? { opacity: 0, height: 0 } : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-sm text-text-muted leading-relaxed pr-8 pb-2">
                          {item.answer}
                        </p>
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
