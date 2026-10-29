'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * OurStudioSection – Styled in the signature light shade (#EE82FB):
 * - Covers all the way to the LEFT side (rounded-l-none, full left bleed)
 * - Right side aligned with container grid with rounded-r-3xl (rounded-r-[36px])
 * - High-contrast #111111 typography & dark pill button
 * - Studio photo framed in rounded-2xl card on the right
 */
export function OurStudioSection() {
  return (
    <section
      id="studio"
      className="py-6 sm:py-8 md:py-10 bg-white relative overflow-hidden"
      aria-label="Our Studio"
    >
      {/* Container covering all the way to the left edge, aligned to page container on the right */}
      <div className="w-full pl-0 pr-[max(1rem,calc((100vw-1280px)/2+1rem))] sm:pr-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] lg:pr-[max(2rem,calc((100vw-1280px)/2+2rem))] xl:pr-[max(2rem,calc((100vw-1300px)/2+2rem))]">
        <div className="relative rounded-r-3xl sm:rounded-r-[36px] rounded-l-none overflow-hidden p-6 sm:p-10 md:p-12 lg:p-14 pl-6 sm:pl-10 md:pl-14 lg:pl-20 xl:pl-28 border-y border-r border-[#D659E8]/40 shadow-md bg-[#EE82FB] text-[#111111]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center max-w-[1300px] ml-auto">
            {/* Left Column: Text & CTA (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-start relative z-10">
              {/* Eyebrow: dark dash + THE PHILOSOPHY */}
              <div className="flex items-center gap-2 font-display text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#111111]/80 mb-3">
                <span className="w-4 h-[2px] bg-[#111111]" />
                <span>THE PHILOSOPHY</span>
              </div>

              {/* Headline */}
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.35rem] font-extrabold text-[#111111] leading-[1.08] tracking-tight mb-4">
                We Make Ideas Visible.
              </h2>

              {/* Body paragraph */}
              <p className="text-[#111111]/85 text-xs sm:text-sm md:text-[14px] leading-relaxed mb-6 font-normal max-w-md">
                G8G Media combines visual storytelling and production craft to help brands communicate products, technology and ideas with clarity and impact.
              </p>

              {/* Pill Button */}
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 bg-[#111111] text-white font-display text-xs sm:text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-neutral-800 active:scale-95 transition-all shadow-sm group"
              >
                <span>Explore the Studio</span>
                <ArrowRight
                  size={13}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            {/* Right Column: Studio Crew Photo (7 cols) */}
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-black/10 bg-neutral-900 group">
                <img
                  src="/images/showcase/studio-team-animated.jpg"
                  alt="G8G Media Creative Studio Team"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                  width={1024}
                  height={576}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Factual Core Service Strip */}
          <div className="mt-8 pt-8 border-t border-[#111111]/15 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[1300px] ml-auto">
            <div>
              <div className="font-display text-lg sm:text-xl lg:text-2xl font-extrabold text-[#111111] tracking-tight">
                Product Films
              </div>
              <p className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#111111]/75 mt-1 font-semibold">
                Cinematic Launch Visuals
              </p>
            </div>
            <div>
              <div className="font-display text-lg sm:text-xl lg:text-2xl font-extrabold text-[#111111] tracking-tight">
                3D CGI &amp; Animation
              </div>
              <p className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#111111]/75 mt-1 font-semibold">
                Photorealistic Visualisation
              </p>
            </div>
            <div>
              <div className="font-display text-lg sm:text-xl lg:text-2xl font-extrabold text-[#111111] tracking-tight">
                Commercials
              </div>
              <p className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#111111]/75 mt-1 font-semibold">
                Brand &amp; Campaign Films
              </p>
            </div>
            <div>
              <div className="font-display text-lg sm:text-xl lg:text-2xl font-extrabold text-[#111111] tracking-tight">
                Explainer Videos
              </div>
              <p className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#111111]/75 mt-1 font-semibold">
                Clear Technical Storytelling
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
