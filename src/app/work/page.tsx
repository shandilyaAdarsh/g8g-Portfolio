import React from 'react'
import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { PortfolioExplorer } from '@/components/portfolio/PortfolioExplorer'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { WavyDivider } from '@/components/common/WavyDivider'
import { BackgroundLogoWatermark } from '@/components/common/BackgroundLogoWatermark'
import { getProjects } from '@/sanity/service'
import { getBreadcrumbSchema } from '@/lib/structuredData'

export const metadata: Metadata = {
  title: 'Selected Creative Work | G8G Media',
  description:
    'Explore selected creative work, product films, explainer videos, and brand storytelling by G8G Media.',
  alternates: {
    canonical: 'https://g8g.media/work',
  },
  openGraph: {
    title: 'Selected Creative Work | G8G Media',
    description:
      'Explore selected creative work, product films, explainer videos, and brand storytelling by G8G Media.',
    url: 'https://g8g.media/work',
  },
}

export default async function WorkPage() {
  const origin = 'https://g8g.media'
  const projects = await getProjects()

  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: 'Work', path: '/work' },
    ],
    origin,
  )

  return (
    <main id="main-content" className="pt-20 bg-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* ── A. PORTFOLIO HERO ─────────────────────────────────── */}
      <section
        className="py-20 md:py-28 relative overflow-hidden"
        aria-labelledby="portfolio-hero-heading"
      >
        {/* Subtle background ambient lighting */}
        <div
          className="pointer-events-none absolute -top-32 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, #C5FF62 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
            <div className="lg:col-span-7 xl:col-span-7 relative z-10">
              <Eyebrow>G8G MEDIA / SELECTED WORK</Eyebrow>
              <h1
                id="portfolio-hero-heading"
                className="mt-4 font-display text-display-xl md:text-display-2xl font-bold text-text-primary tracking-tight leading-[1.05]"
              >
                Ideas made{' '}
                <span className="text-accent underline decoration-accent/30 decoration-2 underline-offset-8">
                  visible.
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl font-normal">
                Explore selected creative work, product stories and visual experiences. Each project begins with a message worth communicating.
              </p>

              {/* Quick stats strip */}
              <div className="mt-10 pt-6 border-t border-border-subtle flex flex-wrap items-center gap-6 text-xs font-mono text-text-muted">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{projects.length} CASE STUDIES &amp; SPEC CONCEPTS</span>
                </span>
                <span>·</span>
                <span>MULTI-ASPECT FORMATS</span>
                <span>·</span>
                <span>ZERO SYNTHETIC METRICS</span>
              </div>
            </div>

            {/* Right Column: Hero Background Logo Watermark */}
            <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 items-center justify-end relative z-0 pointer-events-none select-none">
              <BackgroundLogoWatermark
                size="hero"
                opacity="opacity-65"
                className="w-full translate-y-2 lg:translate-y-6"
              />
            </div>

            {/* Mobile / Tablet subtle background watermark */}
            <div className="lg:hidden absolute -right-10 -bottom-6 pointer-events-none select-none z-0 opacity-25">
              <BackgroundLogoWatermark size="sm" opacity="opacity-100" />
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Organic Wavy Divider */}
      <WavyDivider index={1} />

      {/* ── B & C. INTERACTIVE FILTER & GALLERY EXPLORER ───────── */}
      <PortfolioExplorer initialProjects={projects} />

      {/* Organic Wavy Divider */}
      <WavyDivider index={2} />

      {/* ── D. CLOSING CTA ────────────────────────────────────── */}
      <ClosingCTA
        headline="Have an ambitious visual project in mind?"
        supportingCopy="Whether launching a new hardware product, scaling a developer platform, or refreshing your brand film assets, let's explore how G8G Media can help."
        primaryLabel="Start a Project"
        primaryHref="/contact"
        secondaryLabel="Capabilities & Pricing"
        secondaryHref="/services/video-production"
      />
    </main>
  )
}
