import React from 'react'
import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { WavyDivider } from '@/components/common/WavyDivider'
import { BackgroundLogoWatermark } from '@/components/common/BackgroundLogoWatermark'
import { getBreadcrumbSchema } from '@/lib/structuredData'
import { ArrowUpRight, Compass, Layers, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About G8G Agency & G8G Media | Turning Great Ideas into Great Products',
  description:
    'The brand architecture and creative philosophy behind G8G Agency and G8G Media. Turning Great Ideas into Great Products.',
  alternates: {
    canonical: 'https://g8g.media/about',
  },
  openGraph: {
    title: 'About G8G Agency & G8G Media | Turning Great Ideas into Great Products',
    description:
      'The brand architecture and creative philosophy behind G8G Agency and G8G Media. Turning Great Ideas into Great Products.',
    url: 'https://g8g.media/about',
  },
}

export default function AboutPage() {
  const origin = 'https://g8g.media'
  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
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

      {/* Editorial Header */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
            <div className="lg:col-span-7 xl:col-span-7 relative z-10">
              <Eyebrow>Brand Architecture · About Us</Eyebrow>
              <h1 className="mt-4 font-display text-display-xl md:text-display-2xl font-bold text-text-primary tracking-tight leading-[1.05]">
                Turning Great Ideas into{' '}
                <span className="text-accent underline decoration-accent/30 decoration-2 underline-offset-8">
                  Great Products.
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl">
                G8G Agency is a creative and technological parent enterprise. G8G Media is its dedicated creative production division, built specifically to provide high-end video storytelling, technical explainers, and commercial film assets.
              </p>
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
      <WavyDivider index={0} />

      {/* Brand Architecture Breakdown */}
      <section className="py-20 md:py-28 relative bg-bg-secondary/30">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <div>
                <Eyebrow>Organizational Framework</Eyebrow>
                <SectionHeading level={2} size="lg" className="mt-3">
                  Two unified entities with a{' '}
                  <span className="text-accent">singular standard.</span>
                </SectionHeading>
                <p className="mt-4 text-base text-text-muted leading-relaxed">
                  Rather than behaving like a dispersed generalist agency, G8G separates strategic product architecture from focused visual storytelling.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Parent Brand Card */}
              <div className="p-8 rounded-md bg-bg-primary border border-border-subtle">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
                    PARENT ENTITY
                  </span>
                  <span className="h-2 w-2 rounded-full bg-border-subtle" />
                </div>
                <h3 className="font-display text-2xl font-bold text-text-primary">
                  G8G Agency
                </h3>
                <p className="mt-3 text-sm text-text-muted leading-relaxed">
                  Provides high-level strategic direction, brand positioning, and foundational infrastructure. G8G Agency anchors the collective mission to turn ambitious concepts into enduring market products.
                </p>
              </div>

              {/* Primary Division Card */}
              <div className="p-8 rounded-md bg-bg-primary border border-accent/40 shadow-xl shadow-accent/5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-accent">
                    PRIMARY CREATIVE DIVISION
                  </span>
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                </div>
                <h3 className="font-display text-2xl font-bold text-text-primary">
                  G8G Media
                </h3>
                <p className="mt-3 text-sm text-text-muted leading-relaxed">
                  The cinematic production studio executing films, product videos, explainers, launch anthems, and multi-channel campaign creatives. G8G Media operates with its own distinct creative direction and specialized production pipelines.
                </p>

                <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between">
                  <span className="text-xs font-mono text-text-muted">
                    ESTABLISHED PRODUCTION PIPELINE
                  </span>
                  <Button
                    as="a"
                    href="/services/video-production"
                    variant="primary"
                    size="sm"
                    className="gap-1.5"
                  >
                    <span>View Capabilities</span>
                    <ArrowUpRight size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Organic Wavy Divider */}
      <WavyDivider index={1} />

      {/* Craft Principles */}
      <section className="py-20 md:py-28 relative">
        <PageContainer>
          <div className="max-w-3xl mb-16">
            <Eyebrow>Operating Tenets · Craft Principles</Eyebrow>
            <SectionHeading level={2} size="lg" className="mt-3">
              How we approach creative{' '}
              <span className="text-accent">execution.</span>
            </SectionHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-md bg-bg-secondary border border-border-subtle flex flex-col gap-4">
              <span className="p-2.5 rounded bg-bg-primary text-accent border border-border-subtle w-fit">
                <Compass size={20} />
              </span>
              <h3 className="font-display text-lg font-bold text-text-primary">
                Uncompromising Narrative Rigor
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Visual effects and motion typography mean nothing without an ironclad narrative structure. We write treatments that respect the intelligence of your target customer.
              </p>
            </div>

            <div className="p-8 rounded-md bg-bg-secondary border border-border-subtle flex flex-col gap-4">
              <span className="p-2.5 rounded bg-bg-primary text-accent border border-border-subtle w-fit">
                <Layers size={20} />
              </span>
              <h3 className="font-display text-lg font-bold text-text-primary">
                Multi-Format Engineering
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                A video must work where it is consumed. We engineer every project from pre-production with framing guides for 16:9 widescreen, 9:16 mobile feeds, and looping website hero frames.
              </p>
            </div>

            <div className="p-8 rounded-md bg-bg-secondary border border-border-subtle flex flex-col gap-4">
              <span className="p-2.5 rounded bg-bg-primary text-accent border border-border-subtle w-fit">
                <ShieldCheck size={20} />
              </span>
              <h3 className="font-display text-lg font-bold text-text-primary">
                Transparent Milestones
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Clear briefs, script sign-offs, and scheduled revision windows. No surprise timelines, hidden costs, or black-box processes.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Organic Wavy Divider */}
      <WavyDivider index={2} />

      {/* CTA */}
      <ClosingCTA
        headline="Have an ambitious idea in development?"
        supportingCopy="Let's discuss how G8G Media can help translate it into compelling video and creative content."
        primaryLabel="Start a Project"
        primaryHref="/contact"
        secondaryLabel="Explore Selected Work"
        secondaryHref="/work"
      />
    </main>
  )
}
