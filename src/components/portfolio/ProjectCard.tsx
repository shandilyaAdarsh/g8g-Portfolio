'use client'

import React from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Clock } from 'lucide-react'
import { Project } from '@/data/projects'
import { VideoPlayer } from '../video/VideoPlayer'
import { trackEvent } from '@/utils/analytics'
import clsx from 'clsx'

interface ProjectCardProps {
  project: Project
  onSelect?: (project: Project) => void
  priority?: boolean
  className?: string
}

export function ProjectCard({ project, onSelect, priority = false, className }: ProjectCardProps) {
  const reduced = useReducedMotion()
  const videoSource = project.videoUrl || project.videoLoop

  return (
    <motion.article
      className={clsx(
        'group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-border-subtle shadow-card hover:shadow-card-hover transition-all duration-300 focus-within:ring-2 focus-within:ring-accent',
        className,
      )}
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ duration: 0.25 }}
    >
      {/* Media Visual Area with Interactive Video Preview & Fullscreen */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#0A0A0A] border-b border-border-subtle">
        {videoSource || project.playbackId ? (
          <VideoPlayer
            src={videoSource}
            playbackId={project.playbackId}
            poster={project.thumbnail}
            title={project.title}
            aspect="16/9"
            autoPlay={true}
            loop={true}
            muted={true}
            showBadge={false}
            className="w-full h-full rounded-none border-none shadow-none"
          />
        ) : project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading={priority ? 'eager' : 'lazy'}
          />
        ) : (
          <div className={clsx('w-full h-full bg-gradient-to-br', project.gradient)} />
        )}

        {/* Top badges (pointer-events-none so player hover works seamlessly) */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10 text-[11px] font-mono pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#111215] font-semibold border border-border-subtle shadow-sm pointer-events-auto">
            {project.categoryLabel}
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white pointer-events-auto">
            <Clock size={11} aria-hidden="true" />
            <span>{project.duration}</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col justify-between flex-1 gap-4">
        <div>
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-1.5 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
              {project.eyebrow || project.categoryLabel}
            </span>
          </div>

          <h3 className="font-display text-xl font-bold text-[#111215] group-hover:text-accent transition-colors duration-200">
            <Link
              href={`/work/${project.slug}`}
              onClick={() => {
                trackEvent('portfolio_project_opened', {
                  project_slug: project.slug,
                  category: project.category,
                })
              }}
              className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 text-sm text-text-muted leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs">
          <span className="text-[11px] text-text-muted font-mono">
            {project.format}
          </span>

          <Link
            href={`/work/${project.slug}`}
            onClick={() => {
              trackEvent('portfolio_project_opened', {
                project_slug: project.slug,
                category: project.category,
              })
            }}
            className="inline-flex items-center gap-1.5 font-display font-semibold text-[#111215] group-hover:text-accent transition-colors"
          >
            <span>Case Study</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
