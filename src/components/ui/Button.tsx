'use client'

import React from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import clsx from 'clsx'

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'text'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  as?: 'button' | 'a'
  href?: string
  to?: string
  children: React.ReactNode
}

const base =
  'inline-flex items-center justify-center gap-2 font-display font-medium tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-full select-none whitespace-nowrap'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-[#111215] text-white hover:bg-[#262830] active:bg-black shadow-pill',
  secondary:
    'border border-border-subtle bg-white text-text-primary hover:border-text-primary hover:bg-[#F7F7F4] active:bg-[#EEEEEC]',
  accent:
    'bg-accent text-white hover:bg-accent-hover active:bg-[#E0105C] shadow-pill',
  text:
    'text-text-primary hover:text-accent underline-offset-4 hover:underline p-0 bg-transparent rounded-none',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'text-xs md:text-sm px-4 py-2',
  md: 'text-sm md:text-base px-6 py-2.5 md:py-3',
  lg: 'text-base md:text-lg px-8 py-3.5 md:py-4',
}

const MotionLink = motion.create(Link)

/**
 * Button – primary (dark pill), secondary (clean white/border pill), accent (hot pink), text.
 * Includes Motion press / hover feedback.
 * Supports Next.js Link transitions when 'to' or internal 'href' is provided.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  to,
  className,
  children,
  ...props
}: ButtonProps) {
  const reduced = useReducedMotion()

  const classes = clsx(base, variants[variant], sizes[size], className)

  const motionProps = reduced
    ? {}
    : {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
      }

  const destination = to || href

  // Internal client navigation
  if (destination && destination.startsWith('/') && !destination.startsWith('/#')) {
    return (
      <MotionLink href={destination} className={classes} {...motionProps}>
        {children}
      </MotionLink>
    )
  }

  // Anchor / Hash or external link
  if (as === 'a' && destination) {
    return (
      <motion.a href={destination} className={classes} {...motionProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button className={classes} {...motionProps} {...(props as object)}>
      {children}
    </motion.button>
  )
}
