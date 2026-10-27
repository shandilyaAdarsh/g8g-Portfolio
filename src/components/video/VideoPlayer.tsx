'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Hls from 'hls.js'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  ArrowUpRight,
  Check,
} from 'lucide-react'
import clsx from 'clsx'

export interface QualityOption {
  id: number
  label: string
}

export interface VideoPlayerProps {
  src?: string
  playbackId?: string
  poster?: string
  title?: string
  aspect?: '16/9' | '4/3' | '9/16' | '1/1' | 'auto'
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  className?: string
  caseStudyUrl?: string
  caseStudyLabel?: string
  badgeLabel?: string
  showBadge?: boolean
}

/**
 * Format seconds into m:ss or mm:ss
 */
function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0 || !Number.isFinite(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

export function VideoPlayer({
  src,
  playbackId,
  poster,
  title = 'Video Showcase',
  aspect = '16/9',
  autoPlay = true,
  loop = true,
  muted: initialMuted = true,
  className,
  caseStudyUrl,
  caseStudyLabel = 'Case Study',
  badgeLabel,
  showBadge = true,
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressTrackRef = useRef<HTMLDivElement>(null)
  const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null)
  const hlsRef = useRef<Hls | null>(null)

  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay)
  const [isMuted, setIsMuted] = useState<boolean>(initialMuted)
  const [volume, setVolume] = useState<number>(initialMuted ? 0 : 1)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [progressPercent, setProgressPercent] = useState<number>(0)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false)
  const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false)
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1)
  const [qualityLevels, setQualityLevels] = useState<QualityOption[]>([])
  const [selectedQuality, setSelectedQuality] = useState<number>(-1)
  const [hasError, setHasError] = useState<boolean>(false)
  const [centerAnimation, setCenterAnimation] = useState<'play' | 'pause' | null>(null)
  const userPausedRef = useRef<boolean>(!autoPlay)

  // Resolve source URL: prioritize Mux playbackId if provided
  const resolvedSrc = playbackId
    ? `https://stream.mux.com/${playbackId}.m3u8`
    : src

  // Resolve poster URL: prioritize explicit poster, or real Mux video frame thumbnail if playbackId is set
  const resolvedPoster =
    poster !== undefined && poster !== ''
      ? poster
      : playbackId
      ? `https://image.mux.com/${playbackId}/thumbnail.webp?time=2&width=1920&height=1080&fit_mode=smartcrop`
      : undefined

  const isVideo = Boolean(
    resolvedSrc &&
      !resolvedSrc.toLowerCase().endsWith('.gif') &&
      !resolvedSrc.toLowerCase().endsWith('.png') &&
      !resolvedSrc.toLowerCase().endsWith('.jpg') &&
      !resolvedSrc.toLowerCase().endsWith('.jpeg') &&
      !resolvedSrc.toLowerCase().endsWith('.webp'),
  )

  const isHls = Boolean(
    resolvedSrc &&
      (resolvedSrc.includes('.m3u8') || resolvedSrc.includes('stream.mux.com')),
  )

  const displayBadgeLabel =
    badgeLabel ||
    (playbackId
      ? '4K MUX MASTER'
      : isHls
      ? '4K HLS STREAM'
      : '4K UHD MASTER')

  const aspectClass =
    aspect === '16/9'
      ? 'aspect-video'
      : aspect === '4/3'
      ? 'aspect-[4/3]'
      : aspect === '9/16'
      ? 'aspect-[9/16]'
      : aspect === '1/1'
      ? 'aspect-square'
      : ''

  // ── HLS.js streaming lifecycle ──────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video || !resolvedSrc || !isHls || hasError) return

    if (hlsRef.current) {
      hlsRef.current.destroy()
      hlsRef.current = null
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        // CRITICAL FOR QUALITY: Never cap rendition quality to CSS element dimensions!
        // This ensures the pristine 4K/1080p master is preserved.
        capLevelToPlayerSize: false,
        startLevel: -1,
        autoStartLoad: true,
        maxMaxBufferLength: 15,
        maxBufferSize: 15 * 1000 * 1000, // 15MB high-fidelity buffer (optimized for smooth multi-player scrolling)
      })

      hlsRef.current = hls
      hls.attachMedia(video)

      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(resolvedSrc)
      })

      hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
        if (data.levels && data.levels.length > 0) {
          const levels: QualityOption[] = [
            { id: -1, label: 'Auto (Best Quality)' },
            ...data.levels.map((lvl, index) => {
              const height = lvl.height || 0
              let label = `${height}p`
              if (height >= 2160) label = '4K UHD (2160p)'
              else if (height >= 1440) label = '2K QHD (1440p)'
              else if (height >= 1080) label = '1080p Full HD'
              else if (height >= 720) label = '720p HD'
              return { id: index, label }
            }),
          ]
          setQualityLevels(levels)
        }

        if (autoPlay && !userPausedRef.current) {
          const playPromise = video.play()
          if (playPromise !== undefined) {
            playPromise
              .then(() => setIsPlaying(true))
              .catch(() => {
                if (!video.muted) {
                  video.muted = true
                  setIsMuted(true)
                  video.play().catch(() => setIsPlaying(false))
                } else {
                  setIsPlaying(false)
                }
              })
          }
        }
      })

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad()
              break
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError()
              break
            default:
              hls.destroy()
              setHasError(true)
              break
          }
        }
      })

      return () => {
        hls.destroy()
        hlsRef.current = null
      }
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Apple HLS (Safari, iOS WebKit)
      video.src = resolvedSrc
      if (autoPlay && !userPausedRef.current) {
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => {
              if (!video.muted) {
                video.muted = true
                setIsMuted(true)
                video.play().catch(() => setIsPlaying(false))
              } else {
                setIsPlaying(false)
              }
            })
        }
      }
    }
  }, [resolvedSrc, isHls, autoPlay, hasError])

  // ── Viewport intersection observer: pause offscreen to eliminate scroll lag ──
  useEffect(() => {
    if (!isVideo || !resolvedSrc || hasError) return
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return

    video.muted = isMuted
    video.defaultMuted = isMuted

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return

        if (entry.isIntersecting) {
          if (autoPlay && !userPausedRef.current) {
            const playPromise = video.play()
            if (playPromise !== undefined) {
              playPromise
                .then(() => setIsPlaying(true))
                .catch(() => {
                  if (!video.muted) {
                    video.muted = true
                    setIsMuted(true)
                    video.play().catch(() => setIsPlaying(false))
                  } else {
                    setIsPlaying(false)
                  }
                })
            }
          }
        } else {
          // Off screen: immediately pause to free up GPU decoder threads
          if (!video.paused) {
            video.pause()
            setIsPlaying(false)
          }
        }
      },
      {
        rootMargin: '120px 0px 120px 0px',
        threshold: 0.1,
      },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [resolvedSrc, autoPlay, isVideo, hasError, isMuted])

  // ── Track video progress & duration ─────────────────────────────────────
  const handleTimeUpdate = () => {
    if (isScrubbing) return
    const video = videoRef.current
    if (!video) return

    const current = video.currentTime || 0
    const total = video.duration || 0

    setCurrentTime(current)
    if (total > 0 && Number.isFinite(total)) {
      setDuration(total)
      setProgressPercent((current / total) * 100)
    }
  }

  const handleLoadedMetadata = () => {
    const video = videoRef.current
    if (!video) return
    if (video.duration && !isNaN(video.duration) && Number.isFinite(video.duration)) {
      setDuration(video.duration)
    }
  }

  // ── Play / Pause toggle ─────────────────────────────────────────────────
  const togglePlay = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation()
      const video = videoRef.current
      if (!video || !isVideo) return

      if (video.paused || video.ended) {
        userPausedRef.current = false
        video
          .play()
          .then(() => {
            setIsPlaying(true)
            setCenterAnimation('play')
            setTimeout(() => setCenterAnimation(null), 550)
          })
          .catch(() => {
            // Play blocked
          })
      } else {
        userPausedRef.current = true
        video.pause()
        setIsPlaying(false)
        setCenterAnimation('pause')
        setTimeout(() => setCenterAnimation(null), 550)
      }
    },
    [isVideo],
  )

  // ── Mute / Unmute toggle ────────────────────────────────────────────────
  const toggleMute = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation()
      const video = videoRef.current
      if (!video) return

      if (video.muted || volume === 0) {
        const restoreVol = volume === 0 ? 1 : volume
        video.muted = false
        video.volume = restoreVol
        setIsMuted(false)
        setVolume(restoreVol)
      } else {
        video.muted = true
        setIsMuted(true)
      }
    },
    [volume],
  )

  // ── Volume slider change ────────────────────────────────────────────────
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    const newVol = parseFloat(e.target.value)
    const video = videoRef.current
    if (!video) return

    video.volume = newVol
    setVolume(newVol)
    if (newVol === 0) {
      video.muted = true
      setIsMuted(true)
    } else {
      video.muted = false
      setIsMuted(false)
    }
  }

  // ── Fullscreen toggle with cross-browser and fallback support ───────────
  const toggleFullscreen = useCallback(async (e?: React.MouseEvent) => {
    e?.stopPropagation()
    const container = containerRef.current
    const video = videoRef.current

    try {
      const doc = document as any
      const isCurrentlyFullscreen =
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement

      if (!isCurrentlyFullscreen) {
        if (container) {
          if (container.requestFullscreen) {
            await container.requestFullscreen()
          } else if ((container as any).webkitRequestFullscreen) {
            await (container as any).webkitRequestFullscreen()
          } else if ((container as any).msRequestFullscreen) {
            await (container as any).msRequestFullscreen()
          } else if (video && (video as any).webkitEnterFullscreen) {
            ;(video as any).webkitEnterFullscreen()
          }
          setIsFullscreen(true)
        }
      } else {
        if (doc.exitFullscreen) {
          await doc.exitFullscreen()
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen()
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen()
        }
        setIsFullscreen(false)
      }
    } catch {
      // Fallback: toggle internal full-viewport CSS mode
      setIsFullscreen((prev) => !prev)
    }
  }, [])

  // Sync fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as any
      const current = Boolean(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement,
      )
      setIsFullscreen(current)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
    }
  }, [])

  // ── Progress Scrubber Seek ──────────────────────────────────────────────
  const seekToPosition = (clientX: number) => {
    const track = progressTrackRef.current
    const video = videoRef.current
    if (!track || !video || !duration) return

    const rect = track.getBoundingClientRect()
    const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const ratio = clickX / rect.width
    const targetTime = ratio * duration

    video.currentTime = targetTime
    setCurrentTime(targetTime)
    setProgressPercent(ratio * 100)
  }

  const handleScrubberMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsScrubbing(true)
    seekToPosition(e.clientX)

    const onMouseMove = (moveEvent: MouseEvent) => {
      seekToPosition(moveEvent.clientX)
    }

    const onMouseUp = () => {
      setIsScrubbing(false)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const handleScrubberTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsScrubbing(true)
    if (e.touches[0]) seekToPosition(e.touches[0].clientX)

    const onTouchMove = (moveEvent: TouchEvent) => {
      if (moveEvent.touches[0]) seekToPosition(moveEvent.touches[0].clientX)
    }

    const onTouchEnd = () => {
      setIsScrubbing(false)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }

    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend', onTouchEnd)
  }

  // ── Playback Speed selection ────────────────────────────────────────────
  const changeSpeed = (speed: number) => {
    const video = videoRef.current
    if (video) {
      video.playbackRate = speed
      setPlaybackSpeed(speed)
    }
    setShowSettingsMenu(false)
  }

  // ── Quality selection ───────────────────────────────────────────────────
  const changeQuality = (levelId: number) => {
    setSelectedQuality(levelId)
    if (hlsRef.current) {
      hlsRef.current.currentLevel = levelId
    }
    setShowSettingsMenu(false)
  }

  // ── Mouse hover timer management ────────────────────────────────────────
  const handleMouseMove = () => {
    setIsHovered(true)
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current)
    }
    // Auto-hide controls after 3 seconds of stillness while playing
    if (isPlaying && !showSettingsMenu && !isScrubbing) {
      hideControlsTimerRef.current = setTimeout(() => {
        setIsHovered(false)
      }, 3000)
    }
  }

  const handleMouseLeave = () => {
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current)
    }
    if (!showSettingsMenu) {
      setIsHovered(false)
    }
  }

  // ── Keyboard accessibility shortcuts ────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'k') {
      e.preventDefault()
      togglePlay()
    } else if (e.key === 'f') {
      e.preventDefault()
      toggleFullscreen()
    } else if (e.key === 'm') {
      e.preventDefault()
      toggleMute()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      if (videoRef.current && Number.isFinite(duration)) {
        videoRef.current.currentTime = Math.min(
          videoRef.current.currentTime + 5,
          duration || 9999,
        )
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      if (videoRef.current) {
        videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 5, 0)
      }
    }
  }

  const showControls = isHovered || !isPlaying || showSettingsMenu || isScrubbing

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`${title} video player`}
      className={clsx(
        'group relative w-full overflow-hidden bg-black select-none outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-300 gpu-layer',
        isFullscreen
          ? 'fixed inset-0 z-[9999] h-screen w-screen rounded-none flex items-center justify-center'
          : 'rounded-2xl sm:rounded-3xl shadow-lg border border-neutral-200/40',
        className,
      )}
    >
      {/* ── 1. Video Element / Fallback Image ────────────────────────── */}
      <div
        className={clsx(
          'relative w-full h-full flex items-center justify-center cursor-pointer',
          !isFullscreen && aspectClass,
        )}
        onClick={togglePlay}
        onDoubleClick={toggleFullscreen}
      >
        {isVideo && resolvedSrc && !hasError ? (
          <video
            ref={videoRef}
            src={!isHls ? resolvedSrc : undefined}
            poster={resolvedPoster}
            playsInline
            loop={loop}
            muted={isMuted}
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => {
              if (!isHls) setHasError(true)
            }}
            onEnded={() => {
              if (!loop) setIsPlaying(false)
            }}
            className={clsx(
              'w-full h-full transition-transform duration-700 ease-out',
              isFullscreen ? 'object-contain max-h-screen' : 'object-cover',
            )}
          />
        ) : resolvedPoster || (!isVideo && resolvedSrc) ? (
          <img
            src={resolvedPoster || resolvedSrc}
            alt={title}
            className={clsx(
              'w-full h-full',
              isFullscreen ? 'object-contain' : 'object-cover',
            )}
          />
        ) : (
          <div className="w-full h-full bg-neutral-900" />
        )}

        {/* Ambient Darkened Gradient Overlay on Hover for crisp icon contrast */}
        <div
          className={clsx(
            'pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35 transition-opacity duration-300',
            showControls ? 'opacity-100' : 'opacity-0',
          )}
        />

        {/* Center Animated Feedback Icon on Play/Pause */}
        {centerAnimation && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-20">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/75 backdrop-blur-md text-white flex items-center justify-center shadow-2xl animate-ping opacity-75">
              {centerAnimation === 'play' ? (
                <Play size={28} className="fill-white translate-x-0.5" />
              ) : (
                <Pause size={28} className="fill-white" />
              )}
            </div>
          </div>
        )}

        {/* Initial Big Play Button when paused */}
        {!isPlaying && !centerAnimation && isVideo && !hasError && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FF2E79] text-white flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
              <Play size={24} className="fill-white translate-x-0.5" />
            </div>
          </div>
        )}
      </div>

      {/* ── 2. Top Header Bar (Title, 4K Badge, Case Study Link) ───── */}
      <div
        className={clsx(
          'absolute top-0 inset-x-0 p-3 sm:p-5 flex items-center justify-between z-20 pointer-events-none transition-all duration-300',
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2',
        )}
      >
        {/* Left Badge */}
        {showBadge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono pointer-events-auto shadow-sm">
            <span
              className={clsx(
                'w-2 h-2 rounded-full',
                isPlaying ? 'bg-[#FF2E79] animate-pulse' : 'bg-white/60',
              )}
            />
            <span className="font-semibold tracking-wider">{displayBadgeLabel}</span>
          </div>
        )}

        {/* Right Case Study Link if provided */}
        {caseStudyUrl && (
          <Link
            href={caseStudyUrl}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 hover:bg-white backdrop-blur-md text-[#111111] text-xs font-display font-semibold transition-transform hover:scale-105 shadow-md group/btn"
          >
            <span>{caseStudyLabel}</span>
            <ArrowUpRight
              size={13}
              className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            />
          </Link>
        )}
      </div>

      {/* ── 3. Settings Popup Menu (Playback Speed & Quality Level) ─ */}
      {showSettingsMenu && (
        <div
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          className="absolute bottom-16 sm:bottom-20 right-4 sm:right-6 z-40 w-52 rounded-xl bg-neutral-900/95 backdrop-blur-xl border border-white/15 shadow-2xl p-2.5 text-white text-xs font-sans max-h-80 overflow-y-auto"
        >
          {/* Speed options */}
          <div className="px-2 py-1 font-semibold text-[11px] uppercase tracking-wider text-white/50 border-b border-white/10 mb-1">
            Playback Speed
          </div>
          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
            <button
              key={speed}
              type="button"
              onClick={() => changeSpeed(speed)}
              className={clsx(
                'w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer',
                playbackSpeed === speed
                  ? 'bg-[#FF2E79] text-white font-bold'
                  : 'hover:bg-white/10 text-white/85',
              )}
            >
              <span>{speed === 1 ? '1.0x (Normal)' : `${speed}x`}</span>
              {playbackSpeed === speed && <Check size={12} className="stroke-[3]" />}
            </button>
          ))}

          {/* Quality options (if HLS stream) */}
          <div className="px-2 py-1 font-semibold text-[11px] uppercase tracking-wider text-white/50 border-t border-white/10 mt-2 mb-1">
            Quality
          </div>
          {qualityLevels.length > 0 ? (
            qualityLevels.map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => changeQuality(lvl.id)}
                className={clsx(
                  'w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer',
                  selectedQuality === lvl.id
                    ? 'bg-[#FF2E79] text-white font-bold'
                    : 'hover:bg-white/10 text-white/85',
                )}
              >
                <span>{lvl.label}</span>
                {selectedQuality === lvl.id && <Check size={12} className="stroke-[3]" />}
              </button>
            ))
          ) : (
            <div className="px-2.5 py-1 text-[11px] text-white/70 flex items-center justify-between">
              <span>Resolution</span>
              <span className="font-mono text-white font-bold">4K UHD Master</span>
            </div>
          )}
        </div>
      )}

      {/* ── 4. Bottom Video Player Control Bar (Matching User Screenshot) ── */}
      <div
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        className={clsx(
          'absolute bottom-0 inset-x-0 z-30 px-3 sm:px-5 pb-3 sm:pb-4 pt-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center gap-2.5 sm:gap-4 transition-all duration-300',
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none',
        )}
      >
        {/* Play / Pause Button */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="text-white hover:text-[#FF2E79] hover:scale-110 active:scale-95 transition-all p-1 cursor-pointer shrink-0 focus-visible:outline-none"
        >
          {isPlaying ? (
            <Pause size={18} className="fill-white" />
          ) : (
            <Play size={18} className="fill-white translate-x-0.5" />
          )}
        </button>

        {/* Time Display (e.g. 1:11 as in user screenshot) */}
        <div className="text-white font-mono text-[12px] sm:text-[13px] font-medium tracking-tight shrink-0 select-none min-w-[34px]">
          {formatTime(currentTime || 0)}
        </div>

        {/* Scrubber / Progress Bar */}
        <div
          ref={progressTrackRef}
          onMouseDown={handleScrubberMouseDown}
          onTouchStart={handleScrubberTouchStart}
          role="slider"
          aria-label="Seek video position"
          aria-valuemin={0}
          aria-valuemax={duration || 100}
          aria-valuenow={currentTime}
          className="relative flex-1 h-6 flex items-center cursor-pointer group/scrub py-2"
        >
          {/* Background Track Line */}
          <div className="w-full h-1 sm:h-1.5 bg-white/35 rounded-full overflow-hidden transition-all duration-150 group-hover/scrub:h-2">
            {/* Active Progress Fill Line */}
            <div
              className="h-full bg-white transition-[width] duration-75"
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
            />
          </div>

          {/* White Circular Scrubber Thumb Handle (matching user screenshot) */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.85)] border border-white/80 pointer-events-none transition-transform group-hover/scrub:scale-125"
            style={{
              left: `${Math.min(100, Math.max(0, progressPercent))}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>

        {/* Volume / Speaker Icon with Hover Mini-Slider */}
        <div className="relative flex items-center group/vol shrink-0">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="text-white hover:text-[#FF2E79] hover:scale-110 active:scale-95 transition-all p-1 cursor-pointer focus-visible:outline-none"
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={18} />
            ) : (
              <Volume2 size={18} />
            )}
          </button>

          {/* Slide-out Volume Slider on Hover */}
          <div className="w-0 group-hover/vol:w-16 overflow-hidden transition-all duration-200 flex items-center ml-1">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Volume slider"
              className="w-16 h-1 bg-white/40 accent-white rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Settings Cog Icon Button */}
        <button
          type="button"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation()
            setShowSettingsMenu(!showSettingsMenu)
          }}
          aria-label="Video Settings"
          className={clsx(
            'text-white hover:text-[#FF2E79] hover:scale-110 active:scale-95 transition-all p-1 cursor-pointer shrink-0 focus-visible:outline-none',
            showSettingsMenu && 'text-[#FF2E79] rotate-45',
          )}
        >
          <Settings size={18} />
        </button>

        {/* Fullscreen Expand Icon Button (matching 4-corner bracket in screenshot) */}
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          className="text-white hover:text-[#FF2E79] hover:scale-110 active:scale-95 transition-all p-1 cursor-pointer shrink-0 focus-visible:outline-none"
        >
          {isFullscreen ? (
            /* Exit Fullscreen 4-bracket SVG */
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-current"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
            </svg>
          ) : (
            /* Enter Fullscreen 4-bracket SVG (matching user screenshot) */
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-current"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
