'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Film, X, Check } from 'lucide-react'
import Link from 'next/link'
import { Project, ProjectCategory, filterCategories } from '@/data/projects'
import { ProjectCard } from './ProjectCard'
import { ProjectFilters } from './ProjectFilters'
import { PortfolioEmptyState } from './PortfolioEmptyState'
import { Button } from '../ui/Button'
import { VideoPlayer } from '../video/VideoPlayer'
import { gsap, useGsapContext } from '@/lib/gsap'

interface PortfolioExplorerProps {
  initialProjects: Project[]
}

export function PortfolioExplorer({ initialProjects }: PortfolioExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | ProjectCategory>('all')
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null)
  const reduced = useReducedMotion()
  const gridRef = useRef<HTMLDivElement>(null)

  const filteredProjects = initialProjects.filter((p) => {
    if (activeCategory === 'all') return true
    return p.category === activeCategory
  })

  const activeCategoryItem = filterCategories.find((c) => c.id === activeCategory)

  // GSAP Staggered Reveal on filter changes
  useGsapContext(
    () => {
      if (gridRef.current?.children) {
        gsap.from(gridRef.current.children, {
          opacity: 0,
          y: 25,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
        })
      }
    },
    gridRef,
    [activeCategory],
  )

  return (
    <>
      {/* ── B. FILTER ROW ─────────────────────────────────────── */}
      <section className="py-8 border-b border-border-subtle bg-bg-secondary/20 sticky top-16 md:top-20 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <ProjectFilters
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />

          <span className="text-xs font-mono text-text-muted hidden md:inline">
            SHOWING {filteredProjects.length} OF {initialProjects.length} RELEASES
          </span>
        </div>
      </section>

      {/* ── C. PROJECT GRID / EMPTY STATE ─────────────────────── */}
      <section className="py-16 md:py-24 relative min-h-[50vh]" aria-label="Portfolio gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <PortfolioEmptyState
              categoryLabel={activeCategoryItem?.label}
              onReset={() => setActiveCategory('all')}
            />
          ) : (
            <div
              id="portfolio-grid"
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
            >
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  priority={idx < 3}
                  onSelect={(p) => setActiveModalProject(p)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── D. INTERACTIVE MODAL PREVIEW ──────────────────────── */}
      <AnimatePresence>
        {activeModalProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={reduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0 }}
              className="absolute inset-0 bg-bg-primary/90 backdrop-blur-md"
              onClick={() => setActiveModalProject(null)}
            />

            {/* Modal Dialog Container */}
            <motion.div
              initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-md bg-bg-secondary border border-border-subtle shadow-2xl p-6 sm:p-8 z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                aria-label="Close project modal"
                className="absolute top-5 right-5 p-2 rounded-sm text-text-muted hover:text-text-primary hover:bg-bg-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              >
                <X size={20} />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-2 text-xs font-mono text-accent mb-2">
                <span>{activeModalProject.categoryLabel}</span>
                <span>·</span>
                <span className="text-text-muted">{activeModalProject.duration}</span>
              </div>

              <h3 id="modal-project-title" className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
                {activeModalProject.title}
              </h3>

              {/* Media Preview Box with Real Video Player */}
              <div className="mt-6 w-full rounded-xl overflow-hidden aspect-video relative border border-border-subtle bg-black">
                <VideoPlayer
                  src={activeModalProject.videoUrl || activeModalProject.videoLoop || '/videos/showcase/loop-03.mp4'}
                  playbackId={activeModalProject.playbackId}
                  poster={activeModalProject.thumbnail}
                  title={activeModalProject.title}
                  aspect="16/9"
                  autoPlay={true}
                  loop={true}
                  muted={false}
                  badgeLabel={activeModalProject.format}
                  className="w-full h-full rounded-none border-none shadow-none"
                />
              </div>

              {/* Description & Details */}
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-xs font-display uppercase tracking-widest text-text-muted font-semibold">
                    Overview
                  </h4>
                  <p className="mt-1 text-sm text-text-primary leading-relaxed">
                    {activeModalProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-display uppercase tracking-widest text-text-muted font-semibold">
                    Production Treatment & Approach
                  </h4>
                  <p className="mt-1 text-sm text-text-muted leading-relaxed">
                    {activeModalProject.solution}
                  </p>
                </div>

                {/* Deliverables List */}
                <div>
                  <h4 className="text-xs font-display uppercase tracking-widest text-text-muted font-semibold mb-2">
                    Confirmed Deliverables in Package:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {activeModalProject.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2 p-2 rounded bg-bg-primary border border-border-subtle/80">
                        <Check size={14} className="text-accent flex-shrink-0" />
                        <span className="text-text-primary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button
                  as="a"
                  href={`/work/${activeModalProject.slug}`}
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto justify-center gap-2"
                >
                  <span>Full Case Study Page</span>
                  <ArrowUpRight size={15} />
                </Button>

                <Button
                  onClick={() => setActiveModalProject(null)}
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto justify-center"
                >
                  Close Preview
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
