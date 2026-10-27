import React from 'react'
import { Film, RotateCcw } from 'lucide-react'
import { Button } from '../ui/Button'

interface PortfolioEmptyStateProps {
  onReset: () => void
  categoryLabel?: string
}

export function PortfolioEmptyState({ onReset, categoryLabel }: PortfolioEmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="p-12 md:p-16 rounded-md bg-bg-secondary border border-border-subtle text-center flex flex-col items-center gap-4 my-8 max-w-xl mx-auto"
    >
      <div className="h-14 w-14 rounded-full bg-bg-primary border border-border-subtle flex items-center justify-center text-text-muted">
        <Film size={22} className="opacity-60" />
      </div>

      <h3 className="font-display text-xl font-bold text-text-primary">
        No case studies found
      </h3>

      <p className="text-sm text-text-muted leading-relaxed max-w-sm">
        {categoryLabel
          ? `We do not have any published projects currently listed under ${categoryLabel}. All projects in our registry represent confirmed production workflows.`
          : 'No projects match your current filter parameters.'}
      </p>

      <Button onClick={onReset} variant="secondary" size="sm" className="mt-2 gap-2">
        <RotateCcw size={14} />
        <span>Reset to All Work</span>
      </Button>
    </div>
  )
}
