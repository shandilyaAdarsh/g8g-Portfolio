'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageContainer } from '../layout/PageContainer'

interface ClosingCTAProps {
  headline?: string
  supportingCopy?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

/**
 * ClosingCTA – Vibrant pink-to-peach gradient banner:
 * - Rounded card with pink-to-peach-to-magenta gradient
 * - Left: "Ready to make a video?" headline + subtext
 * - Right: black pill "Start a Project →" button with magnetic hover & arrow slide
 */
export function ClosingCTA({
  headline = 'Have a Product Worth Showing?',
  supportingCopy = "Tell us what you're building. We'll help you explore the right approach to product films, 3D animation or commercial video production.",
  primaryLabel = 'Start Your Project',
  primaryHref = '/contact',
  secondaryLabel,
  secondaryHref,
}: ClosingCTAProps) {
  return (
    <section className="py-12 md:py-[72px] bg-white relative overflow-hidden" aria-labelledby="cta-heading">
      <PageContainer>
        {/* Main Gradient Card */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-7 sm:p-10 md:p-12 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 bg-gradient-to-r from-[#FFA0C5] via-[#E292FA] to-[#FFA0A0]">
          {/* Left: Availability Pill + Headline + Body */}
          <div className="flex flex-col items-start text-left relative z-10 max-w-2xl">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 border border-black/10 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#111111] font-bold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>CURRENTLY BOOKING COMMISSIONS</span>
            </div>

            <h2
              id="cta-heading"
              className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-[#111111] tracking-tight leading-[1.12] mb-3"
            >
              {headline}
            </h2>

            <p className="text-[#111111]/85 text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed max-w-xl">
              {supportingCopy}
            </p>
          </div>

          {/* Right: Primary Button + Secondary Quick Email Link */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3.5 shrink-0 relative z-10 w-full sm:w-auto">
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center gap-2 bg-[#111111] text-white font-display text-xs sm:text-sm font-bold px-7 py-3.5 rounded-full hover:bg-neutral-800 active:scale-95 transition-all shadow-md group w-full sm:w-auto"
            >
              <span>{primaryLabel}</span>
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            <a
              href="mailto:team@g8g.media"
              className="font-mono text-xs text-[#111111]/80 hover:text-[#111111] font-medium transition-colors underline decoration-black/25 underline-offset-4"
            >
              Prefer a quick email? team@g8g.media
            </a>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
