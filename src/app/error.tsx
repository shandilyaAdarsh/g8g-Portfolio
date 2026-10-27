'use client'

import React, { useEffect } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { Button } from '@/components/ui/Button'
import { RotateCcw } from 'lucide-react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[G8G Media Error]', error)
  }, [error])

  return (
    <main id="main-content" className="pt-32 pb-24 min-h-[70vh] flex items-center">
      <PageContainer>
        <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-6">
          <span className="font-mono text-xs text-accent uppercase tracking-widest px-2.5 py-1 rounded bg-accent/10 border border-accent/20">
            ERROR 500 · PRODUCTION INTERRUPTED
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
            Unexpected Sequence Halt
          </h1>
          <p className="text-base text-text-muted leading-relaxed">
            An unexpected error occurred while rendering this sequence. Our engineering pipeline has been notified.
          </p>
          <div className="pt-4 flex flex-wrap gap-4 justify-center">
            <Button onClick={() => reset()} variant="primary" size="md" className="gap-2">
              <RotateCcw size={16} />
              <span>Retry Scene</span>
            </Button>
            <Button as="a" href="/" variant="secondary" size="md">
              Return to Homepage
            </Button>
          </div>
        </div>
      </PageContainer>
    </main>
  )
}
