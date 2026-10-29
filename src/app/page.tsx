import React from 'react'
import type { Metadata } from 'next'
import { ShowcaseHero } from '@/components/home/ShowcaseHero'
import { TypeOfWorkBanner } from '@/components/home/TypeOfWorkBanner'
import { ShowcaseProjectList } from '@/components/portfolio/ShowcaseProjectList'
import { OurTeamPartnersSection } from '@/components/home/OurTeamPartnersSection'
import { OurServicesStrip } from '@/components/home/OurServicesStrip'
import { ProcessStrip } from '@/components/home/ProcessStrip'
import { OurStudioSection } from '@/components/home/OurStudioSection'
import { BrandsBar } from '@/components/home/BrandsBar'
import { FaqSection } from '@/components/home/FaqSection'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { WavyDivider } from '@/components/common/WavyDivider'
import { StickyMobileCTA } from '@/components/common/StickyMobileCTA'
import {
  getOrganizationSchema,
  getWebsiteSchema,
  getFaqSchema,
  getProductionProcessSchema,
} from '@/lib/structuredData'
import { HOMEPAGE_FAQS } from '@/data/homepageFaqs'
import { getProjects } from '@/sanity/service'

export const metadata: Metadata = {
  title: 'G8G Media | Product Films, 3D Animation & Video Production',
  description:
    'G8G Media creates cinematic product films, 3D CGI animation, commercials and explainer videos for brands looking to communicate ideas through visual storytelling.',
  alternates: {
    canonical: 'https://g8g.media/',
  },
  openGraph: {
    title: 'G8G Media | Product Films, 3D Animation & Video Production',
    description:
      'G8G Media creates cinematic product films, 3D CGI animation, commercials and explainer videos for brands looking to communicate ideas through visual storytelling.',
    url: 'https://g8g.media/',
    images: ['/g8g-media-logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'G8G Media | Product Films, 3D Animation & Video Production',
    description:
      'G8G Media creates cinematic product films, 3D CGI animation, commercials and explainer videos for brands looking to communicate ideas through visual storytelling.',
    images: ['/g8g-media-logo.png'],
  },
}

export default async function HomePage() {
  const origin = 'https://g8g.media'
  const projects = await getProjects()

  const orgSchema = getOrganizationSchema(origin)
  const webSchema = getWebsiteSchema(origin)
  const faqSchema = getFaqSchema(HOMEPAGE_FAQS, origin)
  const processSchema = getProductionProcessSchema(origin)

  return (
    <main id="main-content" className="bg-white min-h-screen">
      {/* JSON-LD Structured Data (SEO + AEO + GEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([orgSchema, webSchema, faqSchema, processSchema]),
        }}
      />

      {/* 1. HERO — Your Video Production Partner /// with rotating animation */}
      <ShowcaseHero />

      {/* Organic Wavy Divider */}
      <WavyDivider index={0} />

      {/* 2. TYPE OF WORK — Interactive #EE82FB Banner */}
      <TypeOfWorkBanner />

      {/* Organic Wavy Divider */}
      <WavyDivider index={1} />

      {/* 4. FEATURED PROJECTS — 6 Real Projects + Alternating Break Strips */}
      <ShowcaseProjectList projects={projects} />

      {/* Organic Wavy Divider */}
      <WavyDivider index={2} />

      {/* 5. OUR TEAM & CLIENT TESTIMONIALS — #EE82FB Card + Rotating Carousel */}
      <OurTeamPartnersSection />

      {/* Organic Wavy Divider */}
      <WavyDivider index={3} />

      {/* 6. OUR SERVICES — 5-Column Capability Strip */}
      <OurServicesStrip />

      {/* Organic Wavy Divider */}
      <WavyDivider index={4} />

      {/* 7. SERVICES FLOW BANNER — 4-Step Production Flow */}
      <ProcessStrip />

      {/* Organic Wavy Divider */}
      <WavyDivider index={5} />

      {/* 8. OUR STUDIO — Signature #EE82FB Studio Section */}
      <OurStudioSection />

      {/* Organic Wavy Divider */}
      <WavyDivider index={6} />

      {/* 9. TRUSTED BY FORWARD-THINKING BRANDS */}
      <BrandsBar />

      {/* Organic Wavy Divider */}
      <WavyDivider index={7} />

      {/* 10. FAQ ACCORDION — 4 Questions (Timeline, Client Needs, Revisions, Formats) */}
      <FaqSection />

      {/* Organic Wavy Divider */}
      <WavyDivider index={8} />

      {/* 11. FINAL CTA BANNER */}
      <ClosingCTA
        headline="Have a Product Worth Showing?"
        supportingCopy="Tell us what you're building. We'll help you explore the right approach to product films, 3D animation or commercial video production."
        primaryLabel="Start Your Project"
        primaryHref="/contact"
      />

      {/* 12. STICKY MOBILE CTA — Appears on scroll past hero on mobile devices */}
      <StickyMobileCTA />
    </main>
  )
}
