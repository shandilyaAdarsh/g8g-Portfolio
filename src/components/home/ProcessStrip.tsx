'use client'

import React from 'react'
import { ArrowRight, Compass, FileText, Film, Share2 } from 'lucide-react'
import { PageContainer } from '../layout/PageContainer'

const flowSteps = [
  {
    step: '01',
    name: 'Discover',
    icon: Compass,
    description: 'Define the audience, goals and creative direction.',
  },
  {
    step: '02',
    name: 'Develop',
    icon: FileText,
    description: 'Shape the concept, script and storyboard.',
  },
  {
    step: '03',
    name: 'Produce',
    icon: Film,
    description: 'Film, animate, edit and refine the visuals.',
  },
  {
    step: '04',
    name: 'Deliver',
    icon: Share2,
    description: 'Prepare approved assets in the agreed formats.',
  },
]

/**
 * ProcessStrip – Services Flow Banner:
 * - Heading: "From Brief to Final Cut."
 * - Supporting copy: "A collaborative process that keeps every project focused on the message, the visuals and the intended audience."
 * - 4 concise stages: Discover, Develop, Produce, Deliver
 */
export function ProcessStrip() {
  return (
    <section
      id="pipeline"
      aria-label="Production Pipeline Blueprint"
      className="py-10 sm:py-14 md:py-16 bg-white overflow-hidden scroll-mt-24"
    >
      <PageContainer>
        {/* Banner Card Container with soft gradient & rounded-3xl */}
        <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 bg-neutral-50 border border-neutral-200/80 shadow-xs">
          {/* Eyebrow & Headline */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-neutral-200/70">
            <div>
              <div className="flex items-center gap-2 font-display text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#111111]/75 mb-2">
                <span className="w-3.5 h-[2px] bg-[#111111]" />
                <span>THE PROCESS</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight">
                From Brief to Final Cut.
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#52525B] max-w-sm leading-relaxed">
              A collaborative process that keeps every project focused on the message, the visuals and the intended audience.
            </p>
          </div>

          {/* 4 Connected Flow Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative">
            {flowSteps.map((item, index) => {
              const Icon = item.icon
              const isLast = index === flowSteps.length - 1

              return (
                <div
                  key={item.step}
                  className="relative p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-neutral-200 shadow-2xs hover:shadow-sm hover:border-[#D659E8]/50 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* Step number badge & icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center justify-center font-display text-xs font-bold px-2.5 py-1 rounded-full bg-[#EE82FB]/30 text-[#111111] border border-[#EE82FB]">
                        Stage {item.step}
                      </span>

                      <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-[#111111] group-hover:bg-[#EE82FB] transition-colors">
                        <Icon size={15} />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="font-display text-base sm:text-lg font-bold text-[#111111] mb-2 leading-snug">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] leading-relaxed text-[#52525B] font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Flow arrow for desktop */}
                  {!isLast && (
                    <div
                      className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-neutral-200 items-center justify-center text-neutral-400 shadow-2xs pointer-events-none"
                      aria-hidden="true"
                    >
                      <ArrowRight size={11} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
