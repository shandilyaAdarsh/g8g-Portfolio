'use client'

import React from 'react'
import { PageContainer } from '../layout/PageContainer'

interface WavyDividerProps {
  index?: number
  className?: string
  color?: string
  contained?: boolean
}

/**
 * WavyDivider – Organic, slightly uneven hand-drawn wave separator:
 * - 3 distinct uneven wave variations that rotate to give a natural, crafted agency aesthetic
 * - Uses the theme light shade color (#EE82FB)
 * - Can be placed inside PageContainer or standalone
 */
export function WavyDivider({
  index = 0,
  className = '',
  color = '#EE82FB',
  contained = true,
}: WavyDividerProps) {
  const patternId = `wavy-divider-pat-${index}`

  // 3 hand-drawn, slightly uneven wave variations
  const wavePaths = [
    // Variation 0: slightly higher second crest, gentle organic troughs
    'M 0 8 C 6 2, 14 2.5, 20 8 C 26 13.5, 34 14, 40 8 C 47 3, 53 1.5, 60 8 C 67 14.5, 75 13, 82 8 C 88 3.5, 96 3, 102 8 C 108 13, 114 13.5, 120 8',
    // Variation 1: asymmetric wave widths and softer third peak
    'M 0 8 C 7 3, 15 1.5, 22 8 C 29 14, 37 13, 44 8 C 50 3.5, 58 3, 64 8 C 71 13.5, 79 14.5, 86 8 C 93 2, 101 2.5, 108 8 C 114 13, 117 13.5, 120 8',
    // Variation 2: playful organic rhythm with deeper first dip
    'M 0 8 C 5 2.5, 13 3, 18 8 C 25 14.5, 33 13.5, 40 8 C 48 1.5, 56 2, 62 8 C 69 13, 77 14, 84 8 C 91 3, 99 2, 106 8 C 113 13.5, 117 13, 120 8',
  ]

  const activePath = wavePaths[Math.abs(index) % wavePaths.length]

  const dividerSvg = (
    <div
      className={`w-full overflow-hidden py-3 sm:py-4 flex items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-4"
        style={{ color }}
        height="16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="120"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <path
              d={activePath}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </pattern>
        </defs>
        <rect width="100%" height="16" fill={`url(#${patternId})`} />
      </svg>
    </div>
  )

  if (contained) {
    return <PageContainer>{dividerSvg}</PageContainer>
  }

  return dividerSvg
}
