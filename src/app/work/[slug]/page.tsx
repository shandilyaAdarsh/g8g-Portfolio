import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageContainer } from '@/components/layout/PageContainer'
import { CaseStudyHero } from '@/components/portfolio/CaseStudyHero'
import { ProjectMedia } from '@/components/portfolio/ProjectMedia'
import { CaseStudySection } from '@/components/portfolio/CaseStudySection'
import { NextProject } from '@/components/portfolio/NextProject'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { WavyDivider } from '@/components/common/WavyDivider'
import { getProjectBySlug, getProjects } from '@/sanity/service'
import { getCaseStudySchema, getVideoObjectSchema, getBreadcrumbSchema } from '@/lib/structuredData'
import { CheckCircle2, ShieldCheck } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((p) => ({
    slug: p.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found | G8G Media',
    }
  }

  const origin = 'https://g8g.media'
  const ogImage = project.thumbnail || '/g8g-media-logo.png'

  return {
    title: `${project.title} | Case Study | G8G Media`,
    description: project.description,
    keywords: [
      project.categoryLabel,
      project.title,
      'G8G Media Case Study',
      ...project.deliverables,
      ...project.technologies,
    ],
    alternates: {
      canonical: `${origin}/work/${project.slug}`,
    },
    openGraph: {
      type: 'video.other',
      title: `${project.title} | Case Study | G8G Media`,
      description: project.description,
      url: `${origin}/work/${project.slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Case Study | G8G Media`,
      description: project.description,
      images: [ogImage],
    },
  }
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const origin = 'https://g8g.media'
  const allProjects = await getProjects()
  const nextProject =
    (project.nextSlug ? await getProjectBySlug(project.nextSlug) : undefined) ||
    allProjects.find((p) => p.slug !== project.slug) ||
    allProjects[0]

  const caseStudySchema = getCaseStudySchema(project, origin)
  const videoObjectSchema = getVideoObjectSchema(project, origin)
  const breadcrumbSchema = getBreadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: 'Work', path: '/work' },
      { name: project.title, path: `/work/${project.slug}` },
    ],
    origin,
  )

  return (
    <main id="main-content" className="bg-white">
      {/* JSON-LD Structured Data (SEO + AEO Video Carousel) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([caseStudySchema, videoObjectSchema, breadcrumbSchema]),
        }}
      />

      {/* ── A. PROJECT HERO ─────────────────────────────────── */}
      <CaseStudyHero project={project} />

      {/* Organic Wavy Divider */}
      <WavyDivider index={0} />

      {/* ── B. MEDIA PRESENTATION FRAME ─────────────────────── */}
      <section className="py-12 md:py-20 relative bg-bg-primary">
        <PageContainer>
          <div className="max-w-5xl mx-auto">
            <ProjectMedia project={project} />
          </div>
        </PageContainer>
      </section>

      {/* Organic Wavy Divider */}
      <WavyDivider index={1} />

      {/* ── C. THE CHALLENGE ─────────────────────────────────── */}
      <CaseStudySection
        eyebrow="Phase 01 · Production Context"
        title="The Core Communication Challenge"
        id="challenge"
      >
        <div className="space-y-6">
          <p className="text-base sm:text-lg text-text-muted leading-relaxed">
            {project.challenge}
          </p>

          <div className="p-6 rounded-md bg-bg-secondary border border-border-subtle flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-accent">
              Objective Metric
            </span>
            <p className="text-sm text-text-primary">
              Transform intricate technological specifications into visceral, intuitive storytelling
              without reducing technical fidelity for expert stakeholders.
            </p>
          </div>
        </div>
      </CaseStudySection>

      {/* Organic Wavy Divider */}
      <WavyDivider index={2} />

      {/* ── D. THE SOLUTION & CRAFT APPROACH ────────────────── */}
      <CaseStudySection
        eyebrow="Phase 02 · Execution"
        title="Creative Direction & Treatment"
        altBg
        id="solution"
        aside={
          <div className="p-6 rounded-md bg-bg-primary border border-border-subtle flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
              Production Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-bg-secondary text-xs font-mono text-text-primary border border-border-subtle"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        }
      >
        <div className="space-y-6">
          <p className="text-base sm:text-lg text-text-muted leading-relaxed">
            {project.solution}
          </p>

          {/* Deliverables checklist */}
          <div className="pt-4 border-t border-border-subtle">
            <h4 className="font-display text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Master Deliverables Included:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.deliverables.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-3.5 rounded bg-bg-primary border border-border-subtle"
                >
                  <CheckCircle2 size={16} className="text-accent flex-shrink-0" />
                  <span className="text-xs font-medium text-text-primary">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CaseStudySection>

      {/* ── E. VERIFIED OUTCOMES ─────────────────────────────── */}
      {project.results && project.results.length > 0 && (
        <>
          <WavyDivider index={3} />
          <CaseStudySection
            eyebrow="Phase 03 · Quality Verification"
            title="Verified Production Outcomes"
            id="results"
          >
            <div className="space-y-4">
              {project.results.map((res, i) => (
                <div
                  key={i}
                  className="p-5 rounded-md bg-bg-secondary border border-border-subtle flex items-start gap-4"
                >
                  <ShieldCheck size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-text-primary leading-relaxed">
                      {res.description}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                      Verified Specification Standard
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CaseStudySection>
        </>
      )}

      {/* Organic Wavy Divider */}
      <WavyDivider index={4} />

      {/* ── F. NEXT CASE STUDY SEQUENCING ────────────────────── */}
      <NextProject nextProject={nextProject} />

      {/* Organic Wavy Divider */}
      <WavyDivider index={5} />

      {/* ── G. CLOSING INQUIRY CTA ──────────────────────────── */}
      <ClosingCTA
        headline={`Ready to create a standout film like ${project.title.split('·')[0].trim()}?`}
        supportingCopy="Tell us about the product or brand vision you want to communicate. We will prepare a detailed creative treatment and production estimate."
        primaryLabel="Start a Project"
        primaryHref={`/contact?project=${project.slug}`}
        secondaryLabel="Explore More Work"
        secondaryHref="/work"
      />
    </main>
  )
}
