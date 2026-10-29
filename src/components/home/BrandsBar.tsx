'use client'

import React from 'react'
import { PageContainer } from '../layout/PageContainer'

interface BrandItem {
  id: string
  name: string
  commissionTag: string
  accentColor: string
  renderLogo: () => React.ReactNode
}

const brandItems: BrandItem[] = [
  {
    id: 'cisco',
    name: 'CISCO',
    commissionTag: 'Global Product Film',
    accentColor: '#049FD9',
    renderLogo: () => (
      <div className="flex items-center gap-2.5">
        <svg
          viewBox="0 0 100 36"
          fill="currentColor"
          className="h-5 w-auto text-[#049FD9]"
          aria-hidden="true"
        >
          {/* Authentic Cisco bridge signal waves */}
          <rect x="6" y="22" width="4" height="12" rx="2" />
          <rect x="17" y="14" width="4" height="20" rx="2" />
          <rect x="28" y="6" width="4" height="28" rx="2" />
          <rect x="39" y="14" width="4" height="20" rx="2" />
          <rect x="50" y="2" width="4" height="32" rx="2" />
          <rect x="61" y="14" width="4" height="20" rx="2" />
          <rect x="72" y="6" width="4" height="28" rx="2" />
          <rect x="83" y="14" width="4" height="20" rx="2" />
          <rect x="94" y="22" width="4" height="12" rx="2" />
        </svg>
        <span className="font-display tracking-[0.24em] font-extrabold text-sm text-[#111111]">
          CISCO
        </span>
      </div>
    ),
  },
  {
    id: 'emirates',
    name: 'EMIRATES',
    commissionTag: '3D Real Estate Anthem',
    accentColor: '#D4AF37',
    renderLogo: () => (
      <div className="flex items-center gap-2.5">
        <svg
          viewBox="0 0 26 26"
          fill="none"
          className="w-5 h-5 text-[#D4AF37] shrink-0"
          aria-hidden="true"
        >
          <path
            d="M13 2L16.5 9.5H24.5L18 14.5L20.5 22.5L13 17.5L5.5 22.5L8 14.5L1.5 9.5H9.5L13 2Z"
            fill="#D4AF37"
            fillOpacity="0.25"
            stroke="#D4AF37"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="13" cy="13.5" r="2.5" fill="#D4AF37" />
        </svg>
        <span className="font-display tracking-[0.22em] font-black text-sm text-[#111111]">
          EMIRATES
        </span>
      </div>
    ),
  },
  {
    id: 'vylo',
    name: 'VYLO',
    commissionTag: 'Category Launch Film',
    accentColor: '#FF2E79',
    renderLogo: () => (
      <div className="flex items-center gap-2.5">
        <svg viewBox="0 0 26 26" fill="none" className="w-5 h-5 shrink-0" aria-hidden="true">
          <path d="M3 5L13 23L23 5H17.5L13 14.5L8.5 5H3Z" fill="url(#vylo-grad-brand)" />
          <defs>
            <linearGradient id="vylo-grad-brand" x1="3" y1="5" x2="23" y2="23" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF2E79" />
              <stop offset="1" stopColor="#9333EA" />
            </linearGradient>
          </defs>
        </svg>
        <span className="font-display tracking-[0.2em] font-black text-sm sm:text-base text-[#111111]">
          VYLO
        </span>
      </div>
    ),
  },
  {
    id: 'geico',
    name: 'GEICO',
    commissionTag: 'Broadcast 3D Commercial',
    accentColor: '#3B82F6',
    renderLogo: () => (
      <div className="flex items-center gap-2.5">
        <div className="w-5 h-5 rounded-md bg-[#004B87] flex items-center justify-center text-white text-[11px] font-black font-display tracking-tight shadow-2xs">
          G
        </div>
        <span className="font-display tracking-[0.14em] font-black text-sm sm:text-base text-[#111111]">
          GEICO
        </span>
      </div>
    ),
  },
  {
    id: 'meraki',
    name: 'MERAKI',
    commissionTag: 'Mixed-Media Explainer',
    accentColor: '#6366F1',
    renderLogo: () => (
      <div className="flex items-center gap-2.5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          className="w-5 h-5 text-[#6366F1] shrink-0"
          aria-hidden="true"
        >
          <circle cx="6" cy="12" r="3" fill="#6366F1" />
          <circle cx="18" cy="6" r="3" fill="#6366F1" />
          <circle cx="18" cy="18" r="3" fill="#6366F1" />
          <line x1="9" y1="12" x2="15" y2="7" />
          <line x1="9" y1="12" x2="15" y2="17" />
        </svg>
        <span className="font-display tracking-[0.26em] font-extrabold text-xs sm:text-sm text-[#111111]">
          MERAKI
        </span>
      </div>
    ),
  },
  {
    id: 'nextenta',
    name: 'NEXTENTA',
    commissionTag: 'Enterprise Data Anthem',
    accentColor: '#10B981',
    renderLogo: () => (
      <div className="flex items-center gap-2.5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="w-5 h-5 text-[#10B981] shrink-0"
          aria-hidden="true"
        >
          <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" fill="#10B981" fillOpacity="0.2" />
          <path d="M12 2V22" />
          <path d="M21 7L3 17" />
          <path d="M3 7L21 17" />
        </svg>
        <span className="font-display tracking-[0.22em] font-extrabold text-xs sm:text-sm text-[#111111]">
          NEXTENTA
        </span>
      </div>
    ),
  },
]

/**
 * BrandsBar – Elevated Brand Authority & Client Trust Showcase:
 * - Rich vector logos with authentic iconography & stylized typography
 * - Tactile glassmorphic cards with responsive hover elevation
 * - Production commission tags indicating the scope of work
 * - Bottom authority metrics strip reinforcing category leadership
 */
export function BrandsBar() {
  return (
    <section
      className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden"
      aria-labelledby="brands-heading"
    >
      <PageContainer>
        <div className="flex flex-col items-center relative">
          {/* Eyebrow: Dual Pink Pulse Dots + Tagline */}
          <div className="flex items-center gap-2 font-display text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF2E79] mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF2E79] animate-pulse" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF2E79]" />
            <span>TRUSTED BY INDUSTRY LEADERS</span>
          </div>

          {/* Section Headline */}
          <h3
            id="brands-heading"
            className="font-display text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-extrabold text-[#111111] text-center tracking-tight leading-snug mb-3 max-w-2xl"
          >
            Chosen by High-Velocity Tech Brands &amp; Global Enterprises.
          </h3>

          <p className="text-xs sm:text-sm text-neutral-600 max-w-lg text-center mb-8 sm:mb-10 font-normal leading-relaxed">
            From Silicon Valley product launches to international real estate anthems, our films establish immediate category authority.
          </p>

          {/* Responsive 6-Brand Showcase Grid */}
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-4 lg:gap-3.5">
            {brandItems.map((brand) => (
              <div
                key={brand.id}
                className="group relative p-4 sm:p-4.5 rounded-2xl bg-neutral-50/80 hover:bg-white border border-neutral-200/80 hover:border-neutral-300 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[96px] sm:min-h-[104px]"
              >
                {/* Brand Logo & Indicator */}
                <div className="flex items-center justify-between w-full">
                  <div className="transition-transform duration-300 group-hover:scale-102">
                    {brand.renderLogo()}
                  </div>
                  <span
                    className="w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-125"
                    style={{ backgroundColor: brand.accentColor }}
                    aria-hidden="true"
                  />
                </div>

                {/* Commission Scope Micro-Tag */}
                <div className="mt-3 pt-2 border-t border-neutral-200/50 flex items-center">
                  <span className="text-[9.5px] sm:text-[10px] font-mono text-neutral-500 group-hover:text-neutral-800 transition-colors uppercase tracking-wider truncate">
                    {brand.commissionTag}
                  </span>
                </div>

                {/* Subtle Hover Accent Underline */}
                <div
                  className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: brand.accentColor }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>

          {/* Factual Core Service Strip */}
          <div className="mt-8 sm:mt-10 pt-6 border-t border-neutral-200/70 w-full flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-8 text-[11px] sm:text-xs font-mono text-neutral-500 font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-2 text-neutral-800">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E79]" />
              Product Films
            </span>
            <span className="hidden sm:inline text-neutral-300">·</span>
            <span className="flex items-center gap-2 text-neutral-800">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              3D CGI &amp; Animation
            </span>
            <span className="hidden sm:inline text-neutral-300">·</span>
            <span className="flex items-center gap-2 text-neutral-800">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              Commercials
            </span>
            <span className="hidden sm:inline text-neutral-300">·</span>
            <span className="flex items-center gap-2 text-neutral-800">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              Explainer Videos
            </span>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
