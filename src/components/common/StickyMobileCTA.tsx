'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isPast = window.scrollY > 450
          setVisible((prev) => (prev !== isPast ? isPast : prev))
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200/80 px-4 py-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
          aria-label="Quick Action"
        >
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            <div>
              <p className="font-display text-xs font-bold text-[#111111] leading-tight">
                Ready to make a video?
              </p>
              <p className="text-[11px] text-[#52525B]">
                Tell us about your project
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-[#FF2E79] text-white font-display text-xs font-bold px-4 py-2 rounded-full shadow-sm active:scale-95 transition-all group shrink-0"
            >
              <span>Start a Project</span>
              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
