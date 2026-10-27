'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, ArrowRight, Play, Quote } from 'lucide-react'

const testimonials = [
  {
    quote:
      'G8G turned our high-end acoustic specs into a breathtaking visual anthem that made our preorder launch convert at historic highs.',
    author: '[Client Name] [EDITABLE]',
    role: 'Creative Director, Audio Tech [EDITABLE]',
  },
  {
    quote:
      'The raw torque and cinematic lighting they captured for our EV fleet film gave our enterprise launch the prestige of an automotive brand.',
    author: '[Client Name] [EDITABLE]',
    role: 'VP of Marketing, Mobility Brand [EDITABLE]',
  },
  {
    quote:
      'From 3D cellular animation to multi-channel cuts, they made complex science deeply emotional and crystalline clear for our global audience.',
    author: '[Client Name] [EDITABLE]',
    role: 'Director of Communications, BioTech Foundation [EDITABLE]',
  },
]

export function OurTeamPartnersSection() {
  const [currentIdx, setCurrentIdx] = useState(0)

  const cards = [
    {
      type: 'image' as const,
      src: '/images/showcase/studio-team.png',
      alt: 'Creative team crafting video storyboard',
    },
    {
      type: 'image' as const,
      src: 'https://image.mux.com/MP3DuFGuhTlLI8MyK8rHEzpb9evbHHMnGQTgxgSOJcE/thumbnail.webp?time=6&width=960&height=540&fit_mode=smartcrop',
      alt: 'Real Estate Commercial - Billionaire Rubaab video master',
      showPlayIcon: true,
    },
    {
      type: 'image' as const,
      src: '/images/showcase/crohns-media.png',
      alt: 'American Society of Gene & Cell Therapy animation master',
      showPlayIcon: true,
    },
    {
      type: 'image' as const,
      src: 'https://image.mux.com/u9BqX02dLjNqoAMpiD8x00HJIgzftTI02IODOtlm4jX6wQ/thumbnail.webp?width=640&height=480&fit_mode=smartcrop',
      alt: 'Animated character video production preview',
      showPlayIcon: true,
    },
    {
      type: 'image' as const,
      src: '/images/showcase/studio-team-animated.jpg',
      alt: 'G8G Media production crew on set',
    },
    {
      type: 'image' as const,
      src: '/images/showcase/studio-team.png',
      alt: 'Behind the scenes video editing workflow',
    },
  ]

  const nextTestimonial = () => {
    setCurrentIdx((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const activeTestimonial = testimonials[currentIdx]

  return (
    <section
      className="py-10 sm:py-14 md:py-16 bg-white overflow-hidden"
      aria-label="Our Team and Client Testimonial"
    >
      {/* Aligned with page container on left, right column bleeds to right edge */}
      <div className="w-full pl-[max(1rem,calc((100vw-1280px)/2+1rem))] sm:pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] xl:pl-[max(2rem,calc((100vw-1300px)/2+2rem))] pr-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Our Team Narrative (5 cols, max 3 lines) */}
          <div className="lg:col-span-5 flex flex-col items-start pr-4 sm:pr-8 lg:pr-4 py-2">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight mb-5 leading-[1.08]">
              Our team
            </h2>

            <div className="space-y-3 text-sm sm:text-[15px] leading-relaxed text-[#52525B] font-normal max-w-lg mb-8">
              <p>
                We&apos;re G8G Media—a crew of directors, 3D animators, and cinematographers crafting cinema-grade product films and commercials.
              </p>
              <p>
                We clearly educate your audience by creatively engaging them, transforming ambitious concepts into high-converting visual stories.
              </p>
              <p>
                Work with us, and you&apos;re part of the team too—moving people and brands forward together.
              </p>
            </div>

            {/* Pill CTA button matching original #EE82FB theme color */}
            <Link
              href="/about"
              className="inline-flex items-center justify-center bg-[#EE82FB] text-[#111111] hover:bg-[#EE82FB]/85 active:scale-95 font-semibold text-xs sm:text-sm px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-xs transition-all duration-200"
            >
              <span>Meet the team</span>
            </Link>
          </div>

          {/* Right Column: Original #EE82FB Card with Client Testimonials & 3x2 Grid (7 cols, bleeding right) */}
          <div className="lg:col-span-7 bg-[#EE82FB] rounded-l-3xl sm:rounded-l-[44px] rounded-r-none p-6 sm:p-10 md:p-12 lg:p-14 pr-6 sm:pr-10 md:pr-14 lg:pr-20 xl:pr-24 border-y border-l border-[#D659E8]/35 shadow-md text-[#111111]">
            {/* Testimonial Header */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="font-display text-base sm:text-lg md:text-xl font-bold text-[#111111] leading-snug">
                A few kind words from our{' '}
                <Link
                  href="/services"
                  className="underline decoration-2 underline-offset-4 decoration-[#111111] hover:opacity-80 transition-opacity font-extrabold"
                >
                  friends and clients:
                </Link>
              </h3>

              {/* Keyboard accessible carousel controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                  className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#111111] flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-2xs cursor-pointer"
                >
                  <ArrowLeft size={13} />
                </button>
                <button
                  type="button"
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                  className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#111111] flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-2xs cursor-pointer"
                >
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Testimonial Quote Display */}
            <div className="mb-7 relative" role="region" aria-label="Client Testimonial Quote">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <blockquote className="font-display text-base sm:text-lg md:text-[19px] font-bold text-[#111111] leading-snug">
                    &ldquo;{activeTestimonial.quote}&rdquo;
                  </blockquote>
                  <p className="font-mono text-xs text-[#111111]/80 font-medium">
                    {activeTestimonial.author} — <span className="opacity-90">{activeTestimonial.role}</span>
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 3x2 Photo/Preview Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {cards.map((c, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden shadow-xs bg-neutral-900 group"
                >
                  <img
                    src={c.src}
                    alt={c.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {c.showPlayIcon && (
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-[#111111] shadow-sm">
                        <Play size={13} className="ml-0.5 fill-current" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
