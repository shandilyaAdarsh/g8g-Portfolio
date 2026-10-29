'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ArrowRight, Play, X } from 'lucide-react'
import { PageContainer } from '../layout/PageContainer'
import { VideoPlayer } from '../video/VideoPlayer'

/**
 * ShowcaseHero – High-impact, cinematic hero:
 * - Eyebrow: CINEMATIC PRODUCT FILMS · 3D CGI · MOTION DESIGN
 * - Dominant Headline: We Direct Films That Make Products Impossible to Ignore.
 * - Clear supporting copy
 * - Two distinct CTAs: Launch Your Campaign + Watch Studio Reel
 * - Standalone 4K Mux Studio Player on right column
 */
export function ShowcaseHero() {
  const [showreelOpen, setShowreelOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      className="relative pt-28 sm:pt-32 md:pt-36 lg:pt-36 pb-12 sm:pb-16 md:pb-20 bg-white overflow-hidden"
      aria-label="Introduction"
    >
      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          {/* Left Column: Typography & CTAs (6 cols / 50% width) */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            {/* Eyebrow Label */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="flex items-center gap-2 mb-3 sm:mb-3.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E79] animate-pulse" />
              <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF2E79]">
                CINEMATIC PRODUCT FILMS · 3D CGI · MOTION DESIGN
              </p>
            </motion.div>

            {/* Dominant Headline */}
            <motion.h1
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[72px] font-extrabold text-[#111111] leading-[1.05] tracking-tight mb-5"
            >
              We Direct Films That Make<br className="hidden sm:inline" /> Products Impossible to Ignore.
            </motion.h1>

            {/* Clear Supporting Copy */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="text-[15px] sm:text-[16px] md:text-[17px] leading-[1.58] text-[#52525B] max-w-lg mb-7 font-normal"
            >
              We create cinematic product videos, photorealistic 3D animation and commercials that bring ambitious ideas to life.
            </motion.p>

            {/* Interactive Actions: Primary Black Pill + Watch Showreel */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              className="flex flex-wrap items-center gap-3.5 sm:gap-5 relative"
            >
              {/* Primary CTA Button: Launch Your Campaign */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-[#111111] text-white font-display text-xs sm:text-sm font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full hover:bg-neutral-800 active:scale-95 transition-all duration-200 shadow-sm group cursor-pointer"
              >
                <span>Launch Your Campaign</span>
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              {/* Secondary CTA Button: Watch Studio Reel */}
              <button
                type="button"
                onClick={() => setShowreelOpen(true)}
                className="inline-flex items-center gap-2.5 font-display text-xs sm:text-sm font-semibold text-[#111111] hover:text-[#FF2E79] transition-colors group cursor-pointer"
                aria-label="Watch Studio Reel"
              >
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FF2E79] text-white flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shadow-xs">
                  <Play size={12} className="fill-white translate-x-0.5" />
                </span>
                <span>Watch Studio Reel</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual - Studio Mux 4K Player (6 cols / 50% width) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.32, ease: 'easeOut' }}
            className="lg:col-span-6 flex justify-center lg:justify-end items-center relative"
          >
            <div className="relative w-full max-w-[580px] xl:max-w-[620px]">
              {/* Interactive Mux 4K Video Player with Hover Controls & Fullscreen */}
              <VideoPlayer
                playbackId="lnhJ3HkEx00ppw8y9cXOaIRTQ0101RDsjzupOP13nqMnWw"
                poster="https://image.mux.com/lnhJ3HkEx00ppw8y9cXOaIRTQ0101RDsjzupOP13nqMnWw/thumbnail.webp?time=1&width=1920&height=1080&fit_mode=smartcrop"
                title="G8G Media · Creative Showcase Reel"
                aspect="16/9"
                autoPlay={true}
                loop={true}
                muted={true}
                badgeLabel="STUDIO SHOWREEL · 4K CINEMA MASTER"
                className="w-full shadow-2xl rounded-2xl sm:rounded-3xl border border-neutral-200/60"
              />
            </div>
          </motion.div>
        </div>
      </PageContainer>

      {/* Showreel Modal */}
      <AnimatePresence>
        {showreelOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="G8G Media Showreel"
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl bg-[#111111] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <div className="p-4 flex items-center justify-between border-b border-white/10">
                <span className="font-display font-semibold text-white text-sm">
                  G8G Media · Creative Showreel
                </span>
                <button
                  type="button"
                  onClick={() => setShowreelOpen(false)}
                  className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close Showreel"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                <VideoPlayer
                  playbackId="lnhJ3HkEx00ppw8y9cXOaIRTQ0101RDsjzupOP13nqMnWw"
                  poster="https://image.mux.com/lnhJ3HkEx00ppw8y9cXOaIRTQ0101RDsjzupOP13nqMnWw/thumbnail.webp?time=1&width=1920&height=1080&fit_mode=smartcrop"
                  title="G8G Media Master Reel 4K"
                  aspect="16/9"
                  autoPlay={true}
                  loop={true}
                  muted={false}
                  badgeLabel="STUDIO SHOWREEL · 4K"
                  className="w-full h-full rounded-none border-none shadow-none"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
