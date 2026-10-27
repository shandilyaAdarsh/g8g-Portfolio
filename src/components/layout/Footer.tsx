'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PageContainer } from './PageContainer'
import { ArrowUpRight, Mail, Instagram, Youtube } from 'lucide-react'

const footerNav = [
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'Studio', to: '/#studio' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { label: 'YouTube', href: 'https://youtube.com', icon: Youtube },
  { label: 'Email', href: 'mailto:hello@g8g.media', icon: Mail },
]

/**
 * Footer – Clean editorial light footer matching the reference design.
 * Rendered across inner pages; hidden on home to match the reference landing page terminating at Closing CTA.
 */
export function Footer() {
  const pathname = usePathname()
  const year = new Date().getFullYear()

  if (pathname === '/') {
    return null
  }

  return (
    <footer
      className="bg-white border-t border-border-subtle mt-12"
      role="contentinfo"
    >
      <PageContainer>
        {/* Top row */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 md:gap-20">
          {/* Brand block */}
          <div className="max-w-md">
            <Link href="/" className="inline-block mb-4">
              <img
                src="/images/showcase/logo.png"
                alt="g8g MEDIA"
                className="h-8 w-auto"
                width={137}
                height={32}
                loading="lazy"
              />
            </Link>
            <p className="font-display text-sm font-medium text-text-muted leading-relaxed mb-3">
              G8G Media is the video production and creative content division of{' '}
              <span className="text-text-primary font-bold">G8G Agency</span>.
            </p>
            <p className="text-sm text-text-muted leading-relaxed font-mono text-xs">
              TAGLINE: Turning Great Ideas into Great Products.
            </p>
          </div>

          {/* Nav + Connect */}
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-20">
            {/* Navigation */}
            <nav aria-label="Footer navigation">
              <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-text-muted mb-4">
                Explore
              </p>
              <ul className="flex flex-col gap-2.5" role="list">
                {footerNav.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.to}
                      className="font-display text-sm font-medium text-text-muted hover:text-accent transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Connect */}
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-text-muted mb-4">
                Connect
              </p>
              <ul className="flex flex-col gap-2.5" role="list">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={s.label}
                      className="inline-flex items-center gap-2 font-display text-sm font-medium text-text-muted hover:text-accent transition-colors duration-200"
                    >
                      <s.icon size={14} aria-hidden="true" />
                      <span>{s.label}</span>
                      {s.label !== 'Email' && (
                        <ArrowUpRight size={12} aria-hidden="true" className="opacity-60" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="py-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>
            &copy; {year} G8G Agency / G8G Media. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <span className="font-mono text-[11px] text-text-muted uppercase">
              4K CINEMA · 3D ANIMATION · MOTION
            </span>
            <span className="h-1 w-1 rounded-full bg-border-subtle" />
            <Link
              href="/contact"
              className="text-text-primary hover:text-accent font-semibold transition-colors duration-200"
            >
              Start a Project &rarr;
            </Link>
          </div>
        </div>
      </PageContainer>
    </footer>
  )
}
