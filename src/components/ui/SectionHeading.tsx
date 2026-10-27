import React from 'react'
import clsx from 'clsx'

interface SectionHeadingProps {
  children: React.ReactNode
  /** Render as h1 | h2 | h3 */
  level?: 1 | 2 | 3
  /** Size variant */
  size?: 'xl' | 'lg' | 'md'
  className?: string
  id?: string
}

const sizes = {
  xl: 'text-display-2xl',
  lg: 'text-display-xl',
  md: 'text-display-lg',
}

/**
 * SectionHeading – large, editorial headline with Space Grotesk.
 */
export function SectionHeading({
  children,
  level = 2,
  size = 'lg',
  className,
  id,
}: SectionHeadingProps) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements

  return (
    <Tag
      id={id}
      className={clsx(
        'font-display font-bold text-text-primary',
        sizes[size],
        className,
      )}
    >
      {children}
    </Tag>
  )
}
