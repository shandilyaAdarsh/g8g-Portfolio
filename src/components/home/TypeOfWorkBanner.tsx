'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { VideoPlayer } from '../video/VideoPlayer'

interface WorkTypeCategory {
  id: string
  name: string
  tagline: string
  ctaText: string
  href: string
  projectTitle: string
  projectDescription: string
  badgeLabel: string
  playbackId?: string
  videoLoop?: string
  poster?: string
}

const workTypeCategories: WorkTypeCategory[] = [
  {
    id: 'animation',
    name: '3D CGI',
    tagline: 'Product animation and visualisation.',
    ctaText: 'Explore 3D Work',
    href: '/work?category=motion-graphics',
    projectTitle: 'Tech Product Animation & 3D CGI',
    projectDescription:
      'Photorealistic 3D visuals and dynamic motion design that reveal intricate product engineering, hardware features, and internal mechanics.',
    badgeLabel: '4K CGI BREAKDOWN',
    playbackId: 'u9BqX02dLjNqoAMpiD8x00HJIgzftTI02IODOtlm4jX6wQ',
    poster:
      'https://image.mux.com/u9BqX02dLjNqoAMpiD8x00HJIgzftTI02IODOtlm4jX6wQ/thumbnail.webp?width=1920&height=1080&fit_mode=smartcrop',
  },
  {
    id: 'live-action',
    name: 'Live Action',
    tagline: 'Product films and commercials.',
    ctaText: 'Explore 3D Work',
    href: '/work?category=brand-film',
    projectTitle: 'Cinematic Brand Film',
    projectDescription:
      'Cinematic live-action storytelling combining deliberate lighting, authentic performances, and camera direction that connect on a human level.',
    badgeLabel: 'ANAMORPHIC CINEMA',
    videoLoop: '/videos/showcase/loop-19.mp4',
    poster: '/images/showcase/terra-media.png',
  },
  {
    id: 'hybrid',
    name: 'Hybrid',
    tagline: 'Filmmaking meets CGI and motion.',
    ctaText: 'Explore 3D Work',
    href: '/work',
    projectTitle: '3D & Live Action Commercial',
    projectDescription:
      'Physical cinematography seamlessly fused with photorealistic CGI, simulated physics, and visual effects to bring future-facing products to life.',
    badgeLabel: 'HYBRID VFX COMPOSITE',
    playbackId: 'MP3DuFGuhTlLI8MyK8rHEzpb9evbHHMnGQTgxgSOJcE',
    poster:
      'https://image.mux.com/MP3DuFGuhTlLI8MyK8rHEzpb9evbHHMnGQTgxgSOJcE/thumbnail.webp?width=1920&height=1080&fit_mode=smartcrop',
  },
]

export function TypeOfWorkBanner() {
  const [activeTab, setActiveTab] = useState(0)
  const current = workTypeCategories[activeTab]

  return (
    <section
      className="py-6 sm:py-8 md:py-10 bg-white overflow-hidden"
      aria-label="Types of Work"
    >
      {/* Aligned to page container on left, bleeding cleanly to right edge */}
      <div className="w-full pl-[max(1rem,calc((100vw-1280px)/2+1rem))] sm:pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] xl:pl-[max(2rem,calc((100vw-1300px)/2+2rem))] pr-0">
        <div className="relative rounded-l-3xl sm:rounded-l-[36px] rounded-r-none overflow-hidden p-6 sm:p-10 md:p-12 lg:p-14 pr-6 sm:pr-10 md:pr-14 lg:pr-20 xl:pr-28 border-y border-l border-[#D659E8]/40 shadow-md bg-[#EE82FB] text-[#111111]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start max-w-[1300px]">
            {/* Left Column: 16:9 Video Player Card (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-start w-full">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-950 shadow-2xl border border-black/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full relative"
                  >
                    <VideoPlayer
                      playbackId={current.playbackId}
                      src={current.videoLoop}
                      poster={current.poster}
                      title={current.projectTitle}
                      aspect="16/9"
                      autoPlay={true}
                      loop={true}
                      muted={true}
                      badgeLabel={current.badgeLabel}
                      className="w-full h-full rounded-2xl border-none shadow-none"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Video Title & Quick Summary below player */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2 text-xs text-[#111111]/70 font-mono">
                <span className="font-semibold text-[#111111]">
                  Featured: {current.projectTitle}
                </span>
                <span className="text-[#111111] font-bold">4K Cinema Master</span>
              </div>
            </div>

            {/* Right Column: Interactive Category Selector (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-start pt-2">
              {/* Eyebrow Label with dark dash */}
              <div className="flex items-center gap-2 font-display text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#111111]/80 mb-2">
                <span className="w-4 h-[2px] bg-[#111111]" />
                <p>OUR CRAFT</p>
              </div>

              {/* Section Headline */}
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#111111] leading-tight tracking-tight mb-3">
                Three Ways to Bring Ideas to Life.
              </h2>

              {/* Supporting Copy */}
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#111111]/85 font-normal mb-5 max-w-md">
                From photorealistic 3D animation to live-action filmmaking, we create visuals that make complex products easier to understand and compelling to watch.
              </p>

              {/* Interactive Category Selector Pills */}
              <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-5" role="tablist">
                {workTypeCategories.map((cat, idx) => {
                  const isActive = activeTab === idx
                  return (
                    <button
                      key={cat.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTab(idx)}
                      className={`font-display text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#111111] text-white shadow-md scale-105'
                          : 'bg-white/80 hover:bg-white text-[#111111] hover:shadow-xs'
                      }`}
                    >
                      {cat.name}
                    </button>
                  )
                })}
              </div>

              {/* Active Tab Headline & Description */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111111] leading-snug tracking-tight">
                    {current.tagline}
                  </h3>

                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#111111]/80 font-normal">
                    {current.projectDescription}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={current.href}
                      className="inline-flex items-center gap-2 bg-[#111111] text-white font-display text-xs sm:text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-neutral-800 active:scale-95 transition-all shadow-sm group"
                    >
                      <span>Explore 3D Work</span>
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
