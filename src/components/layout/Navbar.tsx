'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { PageContainer } from './PageContainer'

const navLinks = [
  { label: 'Work', to: '/work' },
  { label: 'Capabilities', to: '/services' },
  { label: 'Pipeline', to: '/#pipeline' },
  { label: 'Studio', to: '/#studio' },
  { label: 'About', to: '/about' },
]

/**
 * Navbar – Floating transparent glass header with curved corners in matching light shade (#EE82FB):
 * - Floats centered with curved pill shape (rounded-full)
 * - Transparent sheer glass: bg-[#EE82FB]/20 backdrop-blur-md, crisp glass border & subtle tinted shadow
 * - Left: g8gMEDIA logo
 * - Center: Work | Services | Studio | About links
 * - Right: Black pill "Start a Project →" button
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const reduced = useReducedMotion()

  /* Throttled scroll detection synced to display refresh */
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isPast = window.scrollY > 15
          setScrolled((prev) => (prev !== isPast ? isPast : prev))
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  /* Close menu on Escape */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  /* Close menu when pathname changes */
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className="fixed top-3 sm:top-4 md:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 md:px-6 pointer-events-none transition-all duration-200"
        role="banner"
      >
        <div
          className={`w-[min(100%,1220px)] rounded-full transition-all duration-300 pointer-events-auto shadow-[0_8px_30px_rgba(0,0,0,0.04)] ${
            scrolled
              ? 'bg-[#EE82FB]/35 backdrop-blur-xl py-2 px-4 sm:px-6 shadow-[0_12px_36px_rgba(0,0,0,0.08)]'
              : 'bg-[#EE82FB]/20 backdrop-blur-md py-2.5 px-4 sm:px-6'
          }`}
        >
          <nav
            className="flex items-center justify-between h-8 sm:h-9"
            aria-label="Main navigation"
          >
            {/* Left Group: Logo + Desktop Nav Links */}
            <div className="flex items-center gap-6 sm:gap-8 lg:gap-10">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-md shrink-0"
                aria-label="G8G Media – Home"
                onClick={() => setMenuOpen(false)}
              >
                <img
                  src="/images/showcase/logo.png"
                  alt="g8g MEDIA"
                  className="h-6 sm:h-7 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
                  width={130}
                  height={28}
                />
              </Link>

              {/* Desktop Nav Links (Space Grotesk, bold, separated, grey) */}
              <div className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-8">
                {navLinks.map((link) => {
                  const isHash = link.to.includes('#')
                  const isActive =
                    !isHash &&
                    (pathname === link.to ||
                      (link.to !== '/' && pathname?.startsWith(link.to)))

                  return (
                    <Link
                      key={link.label}
                      href={link.to}
                      className={`font-display text-[13.5px] sm:text-[14px] tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-sm px-1.5 py-0.5 ${
                        isActive
                          ? 'text-[#18181B] font-bold'
                          : 'text-[#52525B] hover:text-[#18181B] font-bold'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Desktop CTA Button (Right) */}
            <div className="hidden md:flex items-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 bg-[#111111] text-white font-body text-xs font-semibold px-4 py-2 rounded-full hover:bg-neutral-800 active:scale-95 transition-all duration-200 shadow-sm group"
              >
                <span>Start a Project</span>
                <ArrowRight
                  size={13}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-1.5 rounded-lg text-[#111111] hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-dialog"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile navigation overlay */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-black/25 backdrop-blur-xs"
            />

            {/* Floating Mobile Card without harsh outlines */}
            <motion.div
              id="mobile-nav-dialog"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-3 sm:mx-4 mt-20 max-w-md sm:mx-auto rounded-3xl bg-[#EE82FB]/90 backdrop-blur-xl p-6 flex flex-col justify-between shadow-2xl"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.to

                  return (
                    <Link
                      key={link.label}
                      href={link.to}
                      onClick={() => setMenuOpen(false)}
                      className={`font-display text-lg tracking-wide py-2.5 border-b border-[#EE82FB]/20 font-bold ${
                        isActive ? 'text-[#18181B] font-extrabold' : 'text-[#52525B] hover:text-[#18181B]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>

              <div className="pt-5 border-t border-[#EE82FB]/20 flex flex-col gap-3 mt-4">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-[#111111] text-white font-display text-xs sm:text-sm font-semibold py-2.5 rounded-full shadow-sm hover:bg-neutral-800"
                >
                  <span>Start a Project</span>
                  <ArrowRight size={14} />
                </Link>
                <p className="text-[11px] text-[#111111]/70 text-center font-mono">
                  G8G Media · Creative Production Division
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
