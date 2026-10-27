import React from 'react'
import { PageContainer } from '../layout/PageContainer'
import { Eyebrow } from '../ui/Eyebrow'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../motion/Reveal'
import clsx from 'clsx'

interface CaseStudySectionProps {
  eyebrow: string
  title: string
  children: React.ReactNode
  aside?: React.ReactNode
  className?: string
  id?: string
  altBg?: boolean
}

export function CaseStudySection({
  eyebrow,
  title,
  children,
  aside,
  className,
  id,
  altBg = false,
}: CaseStudySectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        'py-20 md:py-28 relative border-b border-border-subtle',
        altBg && 'bg-bg-secondary/30',
        className,
      )}
    >
      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
              <SectionHeading level={2} size="lg" className="mt-2">
                {title}
              </SectionHeading>
            </Reveal>

            {aside && <Reveal delay={0.1}>{aside}</Reveal>}
          </div>

          {/* Right Column: Content Body (7 cols) */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>{children}</Reveal>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
