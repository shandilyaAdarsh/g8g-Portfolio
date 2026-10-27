'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { WavyDivider } from '../common/WavyDivider'
import { VideoPlayer } from '../video/VideoPlayer'
import { PageContainer } from '../layout/PageContainer'
import { Project, projects as defaultProjects } from '@/data/projects'

interface ShowcaseProjectListProps {
  projects?: Project[]
}

interface ProjectEnhancement {
  elaboratedDescription: string
  featurePreviewImage: string
  featurePreviewLabel: string
  featuresUsed: string[]
}

const projectEnhancements: Record<string, ProjectEnhancement> = {
  'nexa-audio-commercial': {
    elaboratedDescription:
      'Ultra-luxury architectural marvels and visionary skylines demand more than standard walk-throughs—they require high-emotion cinema. We directed an immersive launch commercial for Emirates Billionaire Rubaab, fusing photorealistic 3D architectural CGI, golden-hour anamorphic cinematography, and a bespoke spatial score to unveil an iconic development that drove sold-out pre-launch allocations.',
    featurePreviewImage:
      'https://image.mux.com/MP3DuFGuhTlLI8MyK8rHEzpb9evbHHMnGQTgxgSOJcE/thumbnail.webp?time=12&width=960&height=540&fit_mode=smartcrop',
    featurePreviewLabel: 'Billionaire Rubaab Identity',
    featuresUsed: [
      'Photoreal 3D Architectural CGI',
      'Anamorphic Skyline Cinematography',
      'Bespoke Orchestral Soundscape',
      'Biometric UI & Telemetry Tracking',
    ],
  },
  'terra-motors-brand-film': {
    elaboratedDescription:
      'Commercial electric mobility needed an authentic cinematic narrative beyond sterile specifications and generic corporate tropes. We captured a dawn-to-dusk Nordic cinema journey on anamorphic glass, merging raw torque cinematography with live telemetry VFX to debut the flagship fleet at the global energy summit.',
    featurePreviewImage: '/images/showcase/terra-media.png',
    featurePreviewLabel: 'Anamorphic Fleet Telemetry',
    featuresUsed: [
      'Anamorphic Cinema Primes',
      'In-Camera Telemetry Tracking',
      'Dawn-to-Dusk Nordic Lighting',
      'Spatial EV Powertrain SFX',
    ],
  },
  'geico-animated-partnership': {
    elaboratedDescription:
      'Traditional policy messaging required an energetic, high-recall twist to captivate younger digital demographics across fast-scrolling feeds. We engineered a dynamic 2D/3D character animation campaign pairing beloved brand nostalgia with fast-paced digital humor and tailored multi-channel cutdowns.',
    featurePreviewImage: '/images/showcase/geico-media.png',
    featurePreviewLabel: '2D/3D Cel Shading VFX',
    featuresUsed: [
      'Frame-by-Frame Character Rigging',
      '2D/3D Cel Shading Compositing',
      'Dynamic Audio Stems & Foley',
      'Multi-Format 9:16 & 16:9 Cuts',
    ],
  },
  'crohns-colitis-foundation': {
    elaboratedDescription:
      'Complex cellular gene therapy breakthroughs were previously impenetrable to patients, advocates, and medical donors alike. We constructed a 3D molecular explainer translating intricate DNA delivery mechanisms into clear, humane visual metaphors adopted globally as core patient curriculum.',
    featurePreviewImage: '/images/showcase/asgct-brain.png',
    featurePreviewLabel: '3D Cellular Molecular VFX',
    featuresUsed: [
      '3D Molecular Cellular VFX',
      'Peer-Reviewed Visual Metaphors',
      'Precision Medical Shading',
      'Broadcast Voiceover Mastering',
    ],
  },
  'meraki-go-explainer': {
    elaboratedDescription:
      'Small business owners frequently found enterprise-grade cloud networking hardware intimidating to self-install and deploy. We created a fast-paced mixed-media onboarding film illustrating a frictionless 5-minute unbox-to-cloud setup that significantly reduced customer onboarding friction.',
    featurePreviewImage: '/images/showcase/meraki-media.png',
    featurePreviewLabel: 'Mixed-Media UI Compositing',
    featuresUsed: [
      'Macro Live-Action Hardware Film',
      'UI Workflow Screen Tracking',
      '5-Minute Setup Sequence Design',
      'Platform Cutdowns (16:9 & 9:16)',
    ],
  },
  'nexenta-animated-campaigns': {
    elaboratedDescription:
      'Enterprise software-defined storage felt abstract and invisible to enterprise IT directors and infrastructure buyers. We developed kinetic typography and glowing data-stream animations driving home petabyte resilience and high-throughput velocity across high-performing B2B ad campaigns.',
    featurePreviewImage: '/images/showcase/nexenta-media.png',
    featurePreviewLabel: 'Kinetic Neon Typography',
    featuresUsed: [
      'Kinetic Neon Data Typography',
      'Enterprise Storage Particle FX',
      'High-CTR Ad Variant Engineering',
      'Custom Electronic Sound Design',
    ],
  },
}

/**
 * MuxTimedPreview – Renders a looping, muted Mux HLS clip that starts at a
 * specific segment (e.g. 'last20' for the last 20 seconds, 'mid20' for the middle 20 seconds).
 */
function MuxTimedPreview({
  playbackId,
  segment = 'last20',
  poster,
  alt,
  className,
}: {
  playbackId: string
  segment?: 'last20' | 'mid20' | number
  poster?: string
  alt?: string
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const startTimeRef = useRef<number>(typeof segment === 'number' ? segment : 0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const streamUrl = `https://stream.mux.com/${playbackId}.m3u8`
    video.muted = true
    video.defaultMuted = true

    let hlsInstance: any = null
    let destroyed = false

    const computeStartTime = () => {
      const dur = video.duration
      if (typeof segment === 'number') {
        return segment
      }
      if (dur && Number.isFinite(dur) && dur > 0) {
        if (segment === 'last20') {
          return Math.max(0, dur - 20)
        } else if (segment === 'mid20') {
          return Math.max(0, (dur - 20) / 2)
        }
      }
      return segment === 'last20' ? 18 : 9
    }

    const seekAndPlay = () => {
      if (destroyed || !video) return
      const sTime = computeStartTime()
      startTimeRef.current = sTime
      video.currentTime = sTime
      const p = video.play()
      if (p !== undefined) {
        p.catch(() => {})
      }
    }

    const handleTimeUpdate = () => {
      if (!video) return
      const sTime = startTimeRef.current
      if (video.currentTime >= sTime + 20.5) {
        video.currentTime = sTime
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', seekAndPlay)
    video.addEventListener('loadedmetadata', seekAndPlay)

    let isLoaded = false
    const initHls = () => {
      if (isLoaded || destroyed || !video) return
      isLoaded = true

      import('hls.js')
        .then(({ default: Hls }) => {
          if (destroyed) return

          if (Hls.isSupported()) {
            const hls = new Hls({
              enableWorker: true,
              capLevelToPlayerSize: true,
              startLevel: -1,
              maxMaxBufferLength: 10,
              maxBufferSize: 5 * 1000 * 1000,
            })
            hlsInstance = hls
            hls.attachMedia(video)
            hls.on(Hls.Events.MEDIA_ATTACHED, () => {
              if (!destroyed) hls.loadSource(streamUrl)
            })
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              if (!destroyed) seekAndPlay()
            })
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = streamUrl
            seekAndPlay()
          }
        })
        .catch(() => {
          if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = streamUrl
            seekAndPlay()
          }
        })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry || !video) return
        if (entry.isIntersecting) {
          if (!isLoaded) {
            initHls()
          } else {
            video.play().catch(() => {})
          }
        } else {
          if (!video.paused) video.pause()
        }
      },
      { rootMargin: '200px 0px 200px 0px', threshold: 0.05 },
    )
    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
      destroyed = true
      observer.disconnect()
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', seekAndPlay)
      video.removeEventListener('loadedmetadata', seekAndPlay)
      if (hlsInstance) {
        hlsInstance.destroy()
        hlsInstance = null
      }
    }
  }, [playbackId, segment])

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden gpu-layer">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="none"
        poster={poster}
        className={className || 'w-full h-full object-cover'}
        aria-label={alt || 'Video preview'}
      />
    </div>
  )
}

function MediaPreview({
  playbackId,
  videoLoop,
  segment,
  fallbackSrc,
  poster,
  alt,
  className,
}: {
  playbackId?: string
  videoLoop?: string
  segment?: 'last20' | 'mid20' | number
  fallbackSrc?: string
  poster?: string
  alt?: string
  className?: string
}) {
  if (playbackId) {
    return (
      <MuxTimedPreview
        playbackId={playbackId}
        segment={segment}
        poster={poster}
        alt={alt}
        className={className}
      />
    )
  }
  if (videoLoop) {
    return (
      <video
        src={videoLoop}
        autoPlay
        loop
        muted
        playsInline
        poster={poster || fallbackSrc}
        className={className || 'w-full h-full object-cover'}
      />
    )
  }
  return (
    <img
      src={fallbackSrc || poster || ''}
      alt={alt || ''}
      className={className || 'w-full h-full object-cover'}
      loading="lazy"
      decoding="async"
    />
  )
}

/**
 * ScrollAnimatedFeatures – Yellow Area Component:
 * - Animated motion with scroll: appears when scrolling down into the section,
 *   recedes smoothly as user scrolls past ahead.
 * - Displays features used in the project with clean chip boxes.
 * - Features a dedicated craft preview image with overlay badge.
 */
function ScrollAnimatedFeatures({
  previewImage,
  previewLabel,
  features,
  accentColor = '#0066FF',
  projectTitle,
}: {
  previewImage: string
  previewLabel: string
  features: string[]
  accentColor?: string
  projectTitle: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 92%', 'end 8%'],
  })

  // Appears when scrolling down into section, recedes as you move ahead
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0, 1, 1, 0.25])
  const y = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [40, 0, 0, -25])
  const scale = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.95, 1, 1, 0.97])

  const motionStyle = shouldReduceMotion ? {} : { opacity, y, scale }

  return (
    <motion.div
      ref={containerRef}
      style={motionStyle}
      className="mt-6 sm:mt-7 p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 shadow-xs transition-shadow hover:shadow-md will-change-transform"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 mb-3.5 pb-2.5 border-b border-neutral-200/60">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: accentColor }}
          />
          <span className="font-display text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#111111]">
            Features &amp; Craft Specs
          </span>
        </div>
      </div>

      {/* Grid: Preview Image on Left, Features List on Right */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 sm:gap-4 items-center">
        {/* Preview Image Thumbnail with Craft Badge (5 cols) */}
        <div className="sm:col-span-5 relative aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200 shadow-2xs group">
          <img
            src={previewImage}
            alt={`${projectTitle} – ${previewLabel}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-2 left-2 right-2 pointer-events-none">
            <span className="inline-block text-[9px] font-mono font-semibold text-white/95 bg-black/75 px-2 py-0.5 rounded border border-white/15 truncate max-w-full">
              {previewLabel}
            </span>
          </div>
        </div>

        {/* Feature Badges Grid (7 cols) */}
        <div className="sm:col-span-7 grid grid-cols-2 gap-2">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-2 sm:p-2.5 rounded-lg bg-white border border-neutral-200/80 shadow-3xs flex items-center gap-2 text-left hover:border-neutral-300 transition-colors"
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: accentColor }}
              />
              <span className="text-[11px] sm:text-xs font-medium text-[#111111] leading-tight line-clamp-2">
                {feat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/**
 * BackgroundG8GLogoWatermark – Soft light-shade background watermark:
 * - Uses the authentic original g8g logo mark (cropped without 'MEDIA').
 * - Preserves 100% of the original logo's graphical identity.
 * - Rendered in an ultra-soft, delicate light shade (#D5D5D5 - #F2F2F4) with gentle opacity.
 * - Sits strictly below the craft feature card in the background (z-0), never overlapping above anything.
 * - 100% uncropped on left, right, top, and bottom—fully intact.
 * - Completely static and non-interactive (pointer-events-none, select-none).
 */
function BackgroundG8GLogoWatermark() {
  return (
    <div
      className="relative z-0 w-full flex-1 flex items-center justify-center lg:justify-start pointer-events-none select-none overflow-visible mt-6 sm:mt-8 pt-2 pb-6"
      aria-hidden="true"
    >
      <img
        src="/images/showcase/g8g-logo-lightgrey@4x.png"
        srcSet="/images/showcase/g8g-logo-lightgrey.png 319w, /images/showcase/g8g-logo-lightgrey@2x.png 638w, /images/showcase/g8g-logo-lightgrey@4x.png 1276w"
        sizes="(max-width: 640px) 380px, (max-width: 1024px) 520px, 700px"
        alt=""
        draggable={false}
        className="w-full max-w-[440px] sm:max-w-[540px] md:max-w-[620px] lg:max-w-[680px] xl:max-w-[720px] h-auto object-contain select-none pointer-events-none opacity-65"
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      />
    </div>
  )
}

function ProjectRow({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const pid = project.playbackId

  const posterImage = pid
    ? `https://image.mux.com/${pid}/thumbnail.webp?width=1280&height=720&fit_mode=smartcrop`
    : project.thumbnail || '/images/showcase/type-of-work-eyz.png'

  const fallbackTop = project.thumbnails?.[0] || project.thumbnail
  const fallbackBottom = project.thumbnails?.[1] || project.thumbnail

  const loopTop = project.videoLoops?.[0]
  const loopBottom = project.videoLoops?.[1]

  const isMediaLeft = index % 2 === 0
  const eyebrowColor = project.accentColor || '#0066FF'

  const enhancement = projectEnhancements[project.slug] || {
    elaboratedDescription: project.description,
    featurePreviewImage: posterImage,
    featurePreviewLabel: 'Craft Spec Preview',
    featuresUsed: project.tags?.slice(0, 4) || ['Cinema 4K', 'Sound Design', 'Color Grade', 'Motion FX'],
  }

  return (
    <div className="flex flex-col">
      {/* Break Strip / Stat Callout (Between Projects) */}
      {index === 3 && (
        <div className="my-10 sm:my-14 py-8 sm:py-10 px-6 sm:px-10 rounded-2xl sm:rounded-3xl bg-neutral-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#FF2E79] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E79] animate-pulse" />
              <span>DIRECTOR&apos;S BENCHMARK</span>
            </div>
            <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-white/95 leading-snug">
              &ldquo;When your product video feels like cinema, people stop scrolling and start believing.&rdquo;
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#FF2E79] hover:bg-[#ff1464] text-white font-display text-xs sm:text-sm font-semibold px-5 sm:px-6 py-3 rounded-full transition-all shadow-md group"
            >
              <span>Commission a Film</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      )}

      {/* Wavy divider separating each showcase project */}
      {index > 0 && <WavyDivider index={index} contained={false} />}

      <article
        className="py-12 sm:py-16 md:py-20 relative overflow-visible"
        style={{ contentVisibility: 'auto', containIntrinsicSize: '650px' }}
        aria-labelledby={`project-title-${project.slug}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">

          {/* Large Featured Media & Scroll-Animated Feature Card Column (6 cols) */}
          <div className={`lg:col-span-6 flex flex-col ${isMediaLeft ? 'lg:order-1' : 'lg:order-2'}`}>
            {/* 16:9 Widescreen Cinema Player */}
            <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-neutral-200/60 shadow-lg group">
              <VideoPlayer
                playbackId={pid}
                src={!pid ? (project.videoUrl || project.videoLoop) : undefined}
                poster={posterImage}
                title={project.title}
                aspect="16/9"
                autoPlay={true}
                loop={true}
                muted={true}
                caseStudyUrl={`/work/${project.slug}`}
                caseStudyLabel="Case Study"
                badgeLabel={project.format || '4K MASTER'}
                className="w-full h-full rounded-2xl sm:rounded-3xl border-none shadow-none"
              />
            </div>

            {/* YELLOW AREA: Animated motion with scroll, features used, and preview image (TOP BOX - ALWAYS z-10) */}
            <div className="relative z-10">
              <ScrollAnimatedFeatures
                previewImage={enhancement.featurePreviewImage}
                previewLabel={enhancement.featurePreviewLabel}
                features={enhancement.featuresUsed}
                accentColor={eyebrowColor}
                projectTitle={project.title}
              />
            </div>

            {/* Large Background Watermark: Strictly below top box, 100% uncropped, light shade, staying in background */}
            <BackgroundG8GLogoWatermark />
          </div>

          {/* BLUE AREA (Elaborated Text) + Staggered 2-Preview-Screen Column (6 cols) */}
          <div className={`lg:col-span-6 flex flex-col relative z-10 ${isMediaLeft ? 'lg:order-2' : 'lg:order-1'}`}>

            {/* BLUE AREA: Eyebrow with category, dot, and format */}
            <div className="flex items-center gap-2 mb-2.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: eyebrowColor }}
              />
              <p
                className="font-display text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em]"
                style={{ color: eyebrowColor }}
              >
                {project.eyebrow || project.categoryLabel}
              </p>
              <span className="text-neutral-300">·</span>
              <span className="font-mono text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-wider">
                {project.format || '4K Cinema Master'}
              </span>
            </div>

            {/* Project Title */}
            <h2
              id={`project-title-${project.slug}`}
              className="font-display text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.45rem] font-extrabold text-[#111111] leading-[1.08] tracking-tight mb-3"
            >
              <Link href={`/work/${project.slug}`} className="hover:text-neutral-700 transition-colors">
                {project.title}
              </Link>
            </h2>

            {/* Elaborated Text Narrative filling the section appropriately */}
            <p className="text-[#52525B] text-xs sm:text-sm md:text-[14px] leading-relaxed mb-4 font-normal">
              {enhancement.elaboratedDescription}
            </p>

            {/* Micro-Brief Highlights: Problem, Solution, and Outcome Metric */}
            <div className="mb-4 p-3.5 rounded-xl bg-neutral-50/90 border border-neutral-200/70 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500 shrink-0 w-16">
                  Problem:
                </span>
                <span className="text-neutral-700 leading-snug">
                  {project.problem || project.challenge}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500 shrink-0 w-16">
                  Made:
                </span>
                <span className="text-neutral-700 leading-snug">
                  {project.whatWeMade || project.solution}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1.5 border-t border-neutral-200/50">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  Verified Result:
                </span>
                <span
                  className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md"
                  style={{ backgroundColor: `${eyebrowColor}15`, color: eyebrowColor }}
                >
                  {project.result || '[EDITABLE: Verified Impact]'}
                </span>
              </div>
            </div>

            {/* Project Card Micro-Tags & Learn More Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-7">
              <div className="flex flex-wrap items-center gap-1.5">
                {['4K Master', 'Direction & CGI', 'Sound Design'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/work/${project.slug}`}
                className="inline-flex items-center justify-center bg-[#111111] text-white hover:bg-neutral-800 active:scale-95 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap self-start shrink-0 shadow-2xs group"
              >
                <span>Learn More</span>
                <ArrowRight size={13} className="ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Staggered 2-Preview-Screen Cards */}
            <div className="relative w-full pt-1 sm:pt-2">

              {/* Card 1 – Plays last 20 seconds (if Mux) or loop 1 / thumbnail 1 */}
              <div
                className={`w-[88%] sm:w-[84%] ${isMediaLeft ? 'ml-auto' : 'mr-auto'} aspect-video rounded-2xl overflow-hidden shadow-md border border-neutral-200/70 bg-black group/card1 relative`}
              >
                <MediaPreview
                  playbackId={pid}
                  videoLoop={loopTop}
                  segment="last20"
                  fallbackSrc={fallbackTop}
                  poster={
                    pid
                      ? `https://image.mux.com/${pid}/thumbnail.webp?time=18&width=960&height=540&fit_mode=smartcrop`
                      : fallbackTop
                  }
                  alt={`${project.title} – final sequence preview`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card1:scale-[1.03]"
                />
                <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
                  <span className="text-[10px] font-mono font-semibold text-white/90 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
                    {pid ? 'Last 20s' : 'Preview 01'}
                  </span>
                </div>
              </div>

              {/* Card 2 – Plays middle 20 seconds (if Mux) or loop 2 / thumbnail 2 */}
              <div
                className={`w-[76%] sm:w-[72%] -mt-14 sm:-mt-20 md:-mt-24 ${isMediaLeft ? 'mr-auto' : 'ml-auto'} relative z-10 aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 sm:border-[5px] border-white bg-black group/card2`}
              >
                <MediaPreview
                  playbackId={pid}
                  videoLoop={loopBottom}
                  segment="mid20"
                  fallbackSrc={fallbackBottom}
                  poster={
                    pid
                      ? `https://image.mux.com/${pid}/thumbnail.webp?time=9&width=960&height=540&fit_mode=smartcrop`
                      : fallbackBottom
                  }
                  alt={`${project.title} – mid sequence preview`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card2:scale-[1.03]"
                />
                <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
                  <span className="text-[10px] font-mono font-semibold text-white/90 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
                    {pid ? 'Mid 20s' : 'Preview 02'}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

const filterPills = [
  'All Selected',
  '3D Animation',
  'Commercials',
  'Brand Anthems',
  'Hardware Demos',
] as const

type FilterPill = (typeof filterPills)[number]

/**
 * ShowcaseProjectList – Editorial portfolio with full video showcase:
 * - Section Header: Selected Commissions (2024–2026) · Proof in Motion
 * - Interactive category filters & break strip callouts
 * - Left: 16:9 widescreen VideoPlayer + Scroll-Animated Feature Card + Large G8G Logo Background Watermark
 * - Right: Elaborated Project Narrative & Micro-Brief + Staggered Dual Preview Screens
 */
export function ShowcaseProjectList({ projects }: ShowcaseProjectListProps) {
  const [activeFilter, setActiveFilter] = useState<FilterPill>('All Selected')
  const baseProjects = projects && projects.length > 0 ? projects : defaultProjects

  const filteredProjects = baseProjects.filter((p) => {
    if (activeFilter === 'All Selected') return true
    if (activeFilter === '3D Animation') {
      return (
        p.category === 'motion-graphics' ||
        p.slug.includes('geico') ||
        p.slug.includes('crohns') ||
        p.slug.includes('nexenta')
      )
    }
    if (activeFilter === 'Commercials') {
      return (
        p.category === 'advertising' ||
        p.slug.includes('nexa') ||
        p.slug.includes('nexenta') ||
        p.slug.includes('geico')
      )
    }
    if (activeFilter === 'Brand Anthems') {
      return (
        p.category === 'brand-film' ||
        p.slug.includes('terra') ||
        p.slug.includes('crohns')
      )
    }
    if (activeFilter === 'Hardware Demos') {
      return (
        p.category === 'product-video' ||
        p.slug.includes('meraki') ||
        p.slug.includes('nexa')
      )
    }
    return true
  })

  const displayProjects = filteredProjects.length > 0 ? filteredProjects : baseProjects

  return (
    <section
      id="selected-work"
      className="py-4 sm:py-6 bg-white overflow-hidden"
      aria-label="Selected Client Work"
    >
      <PageContainer>
        {/* Section Header & Subtitle */}
        <div className="pt-6 sm:pt-10 pb-8 sm:pb-12 border-b border-neutral-200/80 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 font-display text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#111111]/75 mb-3">
                <span className="w-3.5 h-[2px] bg-[#111111]" />
                <span>SELECTED COMMISSIONS (2024–2026)</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
                Proof in Motion.
              </h2>
            </div>
            <p className="text-xs sm:text-sm md:text-[15px] text-[#52525B] max-w-md leading-relaxed font-normal">
              Every project is engineered for two metrics: viewer retention and brand prestige.
            </p>
          </div>

          {/* Filter Pills */}
          <div
            className="flex flex-wrap items-center gap-2 sm:gap-2.5"
            role="tablist"
            aria-label="Filter Selected Commissions"
          >
            {filterPills.map((pill) => {
              const isActive = activeFilter === pill
              return (
                <button
                  key={pill}
                  onClick={() => setActiveFilter(pill)}
                  role="tab"
                  aria-selected={isActive}
                  className={`font-display text-xs sm:text-[13px] font-semibold px-4 sm:px-5 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#111111] text-white shadow-sm'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-[#111111]/80 hover:text-[#111111]'
                  }`}
                >
                  {pill}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col">
          {displayProjects.map((project, index) => (
            <ProjectRow
              key={project.id || project.slug}
              project={project}
              index={index}
            />
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
