import React from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { PageContainer } from '../layout/PageContainer'
import { Project } from '@/data/projects'

interface NextProjectProps {
  nextProject: Project
}

export function NextProject({ nextProject }: NextProjectProps) {
  return (
    <section className="py-20 md:py-28 relative border-b border-border-subtle bg-bg-secondary/40">
      <PageContainer>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-xs font-display font-medium text-text-muted hover:text-accent transition-colors mb-4"
            >
              <ArrowLeft size={14} />
              <span>All Projects</span>
            </Link>

            <span className="font-mono text-xs text-accent uppercase tracking-wider block">
              Next Case Study
            </span>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mt-1">
              {nextProject.title}
            </h2>

            <p className="text-sm text-text-muted mt-2 max-w-lg line-clamp-2">
              {nextProject.description}
            </p>
          </div>

          <Link
            href={`/work/${nextProject.slug}`}
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white border border-border-subtle hover:border-black/30 group transition-all duration-300 self-start md:self-auto shadow-card hover:shadow-card-hover"
          >
            <div className="text-left">
              <span className="font-mono text-[10px] text-text-muted block uppercase">
                {nextProject.categoryLabel}
              </span>
              <span className="font-display text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                Read Case Study
              </span>
            </div>
            <ArrowRight
              size={18}
              className="text-accent group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </PageContainer>
    </section>
  )
}
