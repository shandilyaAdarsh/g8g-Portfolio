'use client'

import React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { fadeUp, stagger } from '../../lib/motion'

interface RevealProps {
  children: React.ReactNode
  /** Delay before the animation starts (seconds) */
  delay?: number
  /** Use stagger container for multiple children */
  staggered?: boolean
  className?: string
}

/**
 * Reveal – wraps children in a fade-up entrance animation.
 * Automatically disables animation when prefers-reduced-motion is set.
 */
export function Reveal({ children, delay = 0, staggered = false, className }: RevealProps) {
  const reduced = useReducedMotion()

  const variants = staggered ? stagger : fadeUp

  const initial = reduced ? 'visible' : 'hidden'

  return (
    <motion.div
      className={className}
      variants={variants}
      initial={initial}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      style={delay && !reduced ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </motion.div>
  )
}
