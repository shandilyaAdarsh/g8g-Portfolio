import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Client-safe plugin registration
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/** Check prefers-reduced-motion at runtime */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * useGsapContext – standard React hook for GSAP animations with automatic cleanup.
 * Uses gsap.context() to isolate selectors, respects prefers-reduced-motion,
 * and calls ctx.revert() on unmount to eliminate duplicate triggers and memory leaks.
 */
export function useGsapContext(
  callback: (ctx: gsap.Context) => void,
  scope?: React.RefObject<HTMLElement | null>,
  deps: React.DependencyList = [],
) {
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return

    // Ensure ScrollTrigger is registered
    gsap.registerPlugin(ScrollTrigger)

    const reduced = prefersReducedMotion()

    // Isolate all GSAP selector scoping to the provided ref or document
    const ctx = gsap.context((context: any) => {
      if (reduced) {
        // Reduced motion: immediate state without animations
        return
      }
      callback(context)
    }, scope?.current || undefined)

    return () => {
      ctx.revert()
    }
  }, deps)
}

export { gsap, ScrollTrigger }
