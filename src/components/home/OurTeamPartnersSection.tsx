'use client'

import React from 'react'
import Link from 'next/link'
import { Play } from 'lucide-react'

export function OurTeamPartnersSection() {
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

  return (
    <section
      className="py-10 sm:py-14 md:py-16 bg-white overflow-hidden"
      aria-label="The People Behind the Picture"
    >
      {/* Aligned with page container on left, right column bleeds to right edge */}
      <div className="w-full pl-[max(1rem,calc((100vw-1280px)/2+1rem))] sm:pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] xl:pl-[max(2rem,calc((100vw-1300px)/2+2rem))] pr-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Team Narrative */}
          <div className="lg:col-span-5 flex flex-col items-start pr-4 sm:pr-8 lg:pr-4 py-2">
            <div className="flex items-center gap-2 font-display text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#FF2E79] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E79] animate-pulse" />
              <span>THE STUDIO CREW</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight mb-5 leading-[1.08]">
              The People Behind the Picture.
            </h2>

            <p className="text-sm sm:text-[15px] leading-relaxed text-[#52525B] font-normal max-w-lg mb-8">
              We bring together creative direction, filmmaking, 3D animation and motion design to turn ideas into compelling visual stories.
            </p>

            {/* Pill CTA button matching original #EE82FB theme color */}
            <Link
              href="/about"
              className="inline-flex items-center justify-center bg-[#EE82FB] text-[#111111] hover:bg-[#EE82FB]/85 active:scale-95 font-semibold text-xs sm:text-sm px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-xs transition-all duration-200"
            >
              <span>Meet the Team</span>
            </Link>
          </div>

          {/* Right Column: Signature #EE82FB Card with Factual Service Strip & 3x2 Craft Grid */}
          <div className="lg:col-span-7 bg-[#EE82FB] rounded-l-3xl sm:rounded-l-[44px] rounded-r-none p-6 sm:p-10 md:p-12 lg:p-14 pr-6 sm:pr-10 md:pr-14 lg:pr-20 xl:pr-24 border-y border-l border-[#D659E8]/35 shadow-md text-[#111111]">
            {/* Factual Service Strip Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 font-display text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#111111]/75 mb-2">
                <span className="w-3 h-[2px] bg-[#111111]" />
                <span>CORE CRAFT &amp; PRODUCTION</span>
              </div>
              <h3 className="font-display text-base sm:text-lg md:text-xl font-extrabold text-[#111111] leading-snug">
                Product Films · 3D CGI &amp; Animation · Commercials · Explainer Videos
              </h3>
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
