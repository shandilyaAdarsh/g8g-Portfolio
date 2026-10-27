import React from 'react'
import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { ServiceFAQ } from '@/components/services/ServiceFAQ'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { WavyDivider } from '@/components/common/WavyDivider'
import { BackgroundLogoWatermark } from '@/components/common/BackgroundLogoWatermark'
import { mediaServices, productionFormats, processSteps } from '@/data/mediaServices'
import { getVideoProductionServiceSchema, getBreadcrumbSchema } from '@/lib/structuredData'
import {
  ArrowUpRight,
  Film,
  CheckCircle,
  Play,
  Layers,
  Sparkles,
  Clapperboard,
  Tv,
  Smartphone,
  Cpu,
  ShieldCheck,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Video Production & Brand Films | G8G Media',
  description:
    "Explore G8G Media's video production services, including product demos, explainers, promotional videos and brand storytelling.",
  alternates: {
    canonical: 'https://g8g.media/services/video-production',
  },
  openGraph: {
    title: 'Video Production & Brand Films | G8G Media',
    description:
      "Explore G8G Media's video production services, including product demos, explainers, promotional videos and brand storytelling.",
    url: 'https://g8g.media/services/video-production',
  },
}

export default function VideoProductionPage() {
  const origin = 'https://g8g.media'
  const serviceSchema = getVideoProductionServiceSchema(origin)
  const breadcrumbSchema = getBreadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Video Production', path: '/services/video-production' },
    ],
    origin,
  )

  return (
    <main id="main-content" className="pt-20 bg-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([serviceSchema, breadcrumbSchema]),
        }}
      />

      {/* ── A. SERVICE HERO ─────────────────────────────────── */}
      <section
        className="py-20 md:py-28 relative overflow-hidden"
        aria-labelledby="service-hero-heading"
      >
        {/* Ambient lighting */}
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
              <Eyebrow>G8G Media · Flagship Capability</Eyebrow>
              <h1
                id="service-hero-heading"
                className="mt-4 font-display text-display-xl md:text-display-2xl font-bold text-text-primary tracking-tight leading-[1.05]"
              >
                Video that makes your{' '}
                <span className="text-accent underline decoration-accent/30 decoration-2 underline-offset-8">
                  message move.
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl">
                We help ambitious brands present complex products, articulate technical breakthroughs, and launch high-momentum campaigns through cinematic storytelling and precision motion design.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button as="a" href="/contact?service=video-production" variant="primary" size="lg" className="gap-2">
                  <span>Request a Production Brief</span>
                  <ArrowUpRight size={17} />
                </Button>
                <Button as="a" href="/work" variant="secondary" size="lg">
                  View Portfolio Examples
                </Button>
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
      <WavyDivider index={0} />

      {/* ── B. 6 CORE CAPABILITIES BREAKDOWN ────────────────── */}
      <section className="py-20 md:py-28 relative" aria-labelledby="capabilities-heading">
        <PageContainer>
          <div className="max-w-3xl mb-16">
            <Eyebrow>Production Formats · 06 Core Services</Eyebrow>
            <SectionHeading level={2} size="lg" id="capabilities-heading" className="mt-3">
              Specialized video formats for{' '}
              <span className="text-accent">every touchpoint.</span>
            </SectionHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaServices.map((service) => (
              <div
                key={service.id}
                id={service.slug}
                className="p-8 rounded-md bg-bg-secondary border border-border-subtle hover:border-accent/50 transition-colors duration-300 flex flex-col justify-between gap-6"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-accent bg-accent/10 px-2.5 py-1 rounded border border-accent/20">
                      FORMAT {service.number}
                    </span>
                    <span className="text-xs font-mono text-text-muted uppercase">
                      4K UHD 24FPS
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-text-primary">
                    {service.title}
                  </h3>

                  <p className="text-xs text-text-muted/80 italic mt-1">
                    {service.headline}
                  </p>

                  <p className="text-sm text-text-muted leading-relaxed mt-4">
                    {service.shortDesc}
                  </p>

                  <div className="mt-6 pt-4 border-t border-border-subtle">
                    <span className="text-xs font-display uppercase tracking-widest text-text-primary font-semibold block mb-2">
                      Included Deliverables:
                    </span>
                    <ul className="space-y-1.5 text-xs text-text-muted">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <CheckCircle size={13} className="text-accent flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                  <Button
                    as="a"
                    href={`/contact?service=${service.slug}`}
                    variant="text"
                    size="sm"
                    className="text-accent hover:underline flex items-center gap-1 p-0"
                  >
                    <span>Inquire this format &rarr;</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Organic Wavy Divider */}
      <WavyDivider index={1} />

      {/* ── C. MULTI-ASPECT RATIO ENGINEERING ───────────────── */}
      <section className="py-20 md:py-28 relative bg-bg-secondary/30">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <Eyebrow>Multi-Channel Readiness</Eyebrow>
              <SectionHeading level={2} size="lg" className="mt-3">
                Engineered for every{' '}
                <span className="text-accent">screen geometry.</span>
              </SectionHeading>
              <p className="mt-4 text-base text-text-muted leading-relaxed">
                Modern campaigns fail when horizontal video is hastily cropped into social feeds. We frame and shoot projects with dual and triple aspect guide overlays from pre-production.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-md bg-bg-primary border border-border-subtle flex flex-col gap-3">
                <div className="flex items-center gap-2 text-accent">
                  <Tv size={20} />
                  <span className="font-mono text-sm font-semibold">16:9 Widescreen</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Keynote presentations, desktop hero websites, YouTube 4K master broadcasts, investor pitch decks.
                </p>
              </div>

              <div className="p-6 rounded-md bg-bg-primary border border-border-subtle flex flex-col gap-3">
                <div className="flex items-center gap-2 text-accent">
                  <Smartphone size={20} />
                  <span className="font-mono text-sm font-semibold">9:16 Vertical</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Instagram Reels, TikTok, YouTube Shorts, and mobile app in-feed commercial placements.
                </p>
              </div>

              <div className="p-6 rounded-md bg-bg-primary border border-border-subtle flex flex-col gap-3">
                <div className="flex items-center gap-2 text-accent">
                  <Layers size={20} />
                  <span className="font-mono text-sm font-semibold">4:3 &amp; Square</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  LinkedIn corporate feed carousels, tablet keynote showcases, and editorial portfolio frames.
                </p>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Organic Wavy Divider */}
      <WavyDivider index={2} />

      {/* ── D. PRODUCTION FAQ ACCORDION ─────────────────────── */}
      <ServiceFAQ />

      {/* Organic Wavy Divider */}
      <WavyDivider index={3} />

      {/* ── E. CLOSING CTA ──────────────────────────────────── */}
      <ClosingCTA
        headline="Ready to launch a high-impact video?"
        supportingCopy="Tell us about the project, target audience, and preferred delivery timeline. Let's create an unforgettable visual asset."
        primaryLabel="Start a Project Brief"
        primaryHref="/contact?service=video-production"
        secondaryLabel="Explore Portfolio Work"
        secondaryHref="/work"
      />
    </main>
  )
}
