import React from 'react'
import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ContactForm } from '@/components/contact/ContactForm'
import { getBreadcrumbSchema } from '@/lib/structuredData'
import { WavyDivider } from '@/components/common/WavyDivider'
import { BackgroundLogoWatermark } from '@/components/common/BackgroundLogoWatermark'
import { Mail, Shield, Clock, Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact G8G Media | Start a Project Inquiry',
  description:
    'Tell us about the product, brand or idea you want to bring to life. Contact G8G Media to discuss your video production brief.',
  alternates: {
    canonical: 'https://g8g.media/contact',
  },
  openGraph: {
    title: 'Contact G8G Media | Start a Project Inquiry',
    description:
      'Tell us about the product, brand or idea you want to bring to life. Contact G8G Media to discuss your video production brief.',
    url: 'https://g8g.media/contact',
  },
}

export default function ContactPage() {
  const origin = 'https://g8g.media'
  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ],
    origin,
  )

  return (
    <main id="main-content" className="pt-20">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Background ambient lighting */}
        <div
          className="pointer-events-none absolute -top-32 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, #C5FF62 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Ambient background logo watermark */}
        <div className="pointer-events-none absolute -bottom-16 -left-12 lg:left-1/4 lg:-bottom-20 z-0 opacity-20 select-none">
          <BackgroundLogoWatermark size="hero" opacity="opacity-100" />
        </div>

        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* ── Left Column: Editorial Information (5 cols) ─────── */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <Eyebrow>LET&apos;S TALK PRODUCTION</Eyebrow>
                <h1 className="mt-4 font-display text-display-xl font-bold text-text-primary tracking-tight leading-[1.08]">
                  Tell Us What You&apos;re{' '}
                  <span className="text-accent underline decoration-accent/30 decoration-2 underline-offset-8">
                    Building.
                  </span>
                </h1>
                <p className="mt-6 text-base sm:text-lg text-text-muted leading-relaxed">
                  Tell us about your goals, target launch window, and budget tier. We will return a tailored creative treatment and roadmap within 24 hours.
                </p>
              </div>

              {/* Inquiry Notice Card */}
              <div className="p-6 rounded-md bg-bg-secondary border border-border-subtle flex flex-col gap-4 mt-2">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded bg-bg-primary text-accent border border-border-subtle">
                    <Mail size={16} />
                  </span>
                  <div>
                    <span className="text-xs text-text-muted block font-mono uppercase">
                      Verified Studio Inbox
                    </span>
                    <a
                      href="mailto:hello@g8g.media"
                      className="font-display text-sm font-semibold text-text-primary hover:text-accent transition-colors"
                    >
                      hello@g8g.media
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-border-subtle">
                  <span className="p-2 rounded bg-bg-primary text-accent border border-border-subtle">
                    <Shield size={16} />
                  </span>
                  <div>
                    <span className="text-xs text-text-muted block font-mono uppercase">
                      Confidentiality Guarantee
                    </span>
                    <span className="text-xs text-text-primary font-medium">
                      Standard NDA available upon initial request
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-border-subtle">
                  <span className="p-2 rounded bg-bg-primary text-accent border border-border-subtle">
                    <Clock size={16} />
                  </span>
                  <div>
                    <span className="text-xs text-text-muted block font-mono uppercase">
                      Inquiry Scope
                    </span>
                    <span className="text-xs text-text-primary font-medium">
                      Submission is an inquiry, not a guaranteed booking
                    </span>
                  </div>
                </div>
              </div>

              {/* Studio Scope & Privacy Note */}
              <div className="p-4 rounded-sm bg-bg-primary border border-border-subtle flex items-start gap-3 text-xs text-text-muted">
                <Lock size={15} className="text-accent flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold text-text-primary block">
                    Data Privacy & Retention
                  </span>
                  <p className="leading-relaxed">
                    We collect project details solely to formulate a relevant production proposal. Submissions are retained for business consultation purposes and never shared with third parties.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right Column: Interactive Form (7 cols) ────────── */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Organic Wavy Divider */}
      <WavyDivider index={0} />
    </main>
  )
}
