import React from 'react'
import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Page Not Found | G8G Media',
  description: 'The sequence or page you requested does not exist in our production registry.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <main id="main-content" className="pt-32 pb-24 min-h-[70vh] flex items-center">
      <PageContainer>
        <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-6">
          <span className="font-mono text-xs text-accent uppercase tracking-widest px-2.5 py-1 rounded bg-accent/10 border border-accent/20">
            ERROR 404 · SCENE NOT FOUND
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
            Off-Script Destination
          </h1>
          <p className="text-base text-text-muted leading-relaxed">
            The sequence you are looking for does not exist or has been relocated in our production reel.
          </p>
          <div className="pt-4 flex flex-wrap gap-4 justify-center">
            <Button as="a" href="/" variant="primary" size="md" className="gap-2">
              <ArrowLeft size={16} />
              <span>Return to Homepage</span>
            </Button>
            <Button as="a" href="/work" variant="secondary" size="md">
              Explore Portfolio
            </Button>
          </div>
        </div>
      </PageContainer>
    </main>
  )
}
