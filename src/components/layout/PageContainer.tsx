import React from 'react'
import clsx from 'clsx'

interface PageContainerProps {
  children: React.ReactNode
  className?: string
  /** Outer: full bleed | inner: max-width constrained */
  as?: keyof React.JSX.IntrinsicElements
}

/**
 * PageContainer – Centered responsive container matching Demo Duck-style wide-screen balance.
 * - Mobile (<640px): 16px gutters (width: min(100% - 32px, 1280px))
 * - Tablet (640-1024px): 24px gutters (width: min(100% - 48px, 1280px))
 * - Desktop (1024px+): 32px gutters (width: min(100% - 64px, 1280px))
 * - Wide Desktop (1280px+): expands up to 1300px for generous, premium presence.
 */
export function PageContainer({
  children,
  className,
  as: Tag = 'div',
}: PageContainerProps) {
  return (
    <Tag
      className={clsx(
        'mx-auto w-[min(100%-32px,1280px)] sm:w-[min(100%-48px,1280px)] lg:w-[min(100%-64px,1280px)] xl:w-[min(100%-64px,1300px)]',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
