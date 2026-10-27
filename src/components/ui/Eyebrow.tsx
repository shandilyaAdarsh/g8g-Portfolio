import React from 'react'
import clsx from 'clsx'

interface EyebrowProps {
  children: React.ReactNode
  className?: string
  /** Show the decorative dot before the text */
  dot?: boolean
}

/**
 * Eyebrow – small all-caps label used above section headings.
 */
export function Eyebrow({ children, className, dot = true }: EyebrowProps) {
  return (
    <p
      className={clsx(
        'inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.18em] text-text-muted',
        className,
      )}
    >
      {dot && (
        <span
          className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0"
          aria-hidden="true"
        />
      )}
      {children}
    </p>
  )
}
