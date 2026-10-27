import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PageContainer } from '../layout/PageContainer'
import { BackgroundLogoWatermark } from '../common/BackgroundLogoWatermark'
import { Project } from '@/data/projects'

interface CaseStudyHeroProps {
  project: Project
}

export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  return (
    <section className="pt-24 md:pt-32 pb-12 relative border-b border-border-subtle overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-32 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06]"
        style={{
          background: `radial-gradient(circle, ${project.accentColor || '#C5FF62'} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <PageContainer>
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-display font-medium text-text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
          >
            <ArrowLeft size={14} />
            <span>Back to Selected Work</span>
          </Link>
        </div>

        {/* Hero Title & Eyebrow Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
          <div className="lg:col-span-8 xl:col-span-8 relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded">
                {project.categoryLabel}
              </span>
              <span className="font-mono text-xs text-text-muted">·</span>
              <span className="font-mono text-xs text-text-muted bg-bg-secondary border border-border-subtle px-2.5 py-1 rounded">
                {project.statusLabel}
              </span>
              {project.clientName && (
                <>
                  <span className="font-mono text-xs text-text-muted">·</span>
                  <span className="font-mono text-xs text-text-primary">
                    Client: {project.clientName}
                  </span>
                </>
              )}
              {project.year && (
                <>
                  <span className="font-mono text-xs text-text-muted">·</span>
                  <span className="font-mono text-xs text-text-muted">
                    {project.year}
                  </span>
                </>
              )}
            </div>

            <h1 className="font-display text-display-xl md:text-display-2xl font-bold text-text-primary tracking-tight leading-[1.06]">
              {project.title}
            </h1>

            <p className="mt-6 text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl font-normal">
              {project.description}
            </p>

            {/* Metadata Specs Bar */}
            <div className="mt-10 pt-6 border-t border-border-subtle grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
              <div>
                <span className="font-mono text-text-muted uppercase tracking-wider block">Production Format</span>
                <span className="font-display font-semibold text-text-primary mt-1 block">
                  {project.format}
                </span>
              </div>
              <div>
                <span className="font-mono text-text-muted uppercase tracking-wider block">Duration / Runtime</span>
                <span className="font-display font-semibold text-text-primary mt-1 block">
                  {project.duration}
                </span>
              </div>
              <div>
                <span className="font-mono text-text-muted uppercase tracking-wider block">Native Aspect</span>
                <span className="font-display font-semibold text-text-primary mt-1 block">
                  {project.aspect} Master
                </span>
              </div>
              <div>
                <span className="font-mono text-text-muted uppercase tracking-wider block">Deliverables Count</span>
                <span className="font-display font-semibold text-accent mt-1 block">
                  {project.deliverables.length} Master Assets
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Background Logo Watermark */}
          <div className="hidden lg:flex lg:col-span-4 xl:col-span-4 items-center justify-end relative z-0 pointer-events-none select-none">
            <BackgroundLogoWatermark
              size="md"
              opacity="opacity-60"
              className="w-full translate-y-2 lg:translate-y-4"
            />
          </div>

          {/* Mobile / Tablet subtle background watermark */}
          <div className="lg:hidden absolute -right-10 -bottom-6 pointer-events-none select-none z-0 opacity-20">
            <BackgroundLogoWatermark size="sm" opacity="opacity-100" />
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
