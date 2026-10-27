'use client'

import React from 'react'
import Link from 'next/link'
import { Camera, Box, Clapperboard, Layers, Diamond, ArrowRight } from 'lucide-react'
import { PageContainer } from '../layout/PageContainer'

const services = [
  {
    title: 'Product Films',
    description: 'Cinematic hardware & software launches that drive conversions.',
    icon: Camera,
    href: '/services/video-production#product-demos',
  },
  {
    title: 'CGI & 3D Animation',
    description: 'Exploded CAD views and photoreal simulations made to stop the scroll.',
    icon: Box,
    href: '/services/video-production#motion-graphics',
  },
  {
    title: 'Commercials & Ads',
    description: 'High-impact broadcast and digital campaign spots built for recall.',
    icon: Clapperboard,
    href: '/services/video-production#commercials',
  },
  {
    title: 'Explainer Videos',
    description: 'Translating complex platforms into clear, engaging visual guides.',
    icon: Layers,
    href: '/services/video-production#explainers',
  },
  {
    title: 'Brand Content',
    description: 'Authentic founder narratives and anthem films that build lasting trust.',
    icon: Diamond,
    href: '/services/video-production#brand-films',
  },
]

export function OurServicesStrip() {
  return (
    <section
      id="services"
      className="py-12 sm:py-16 md:py-[72px] bg-white border-y border-[#E9E6EB]/60"
      aria-label="Our Production Capabilities"
    >
      <PageContainer>
        {/* Eyebrow & Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E79]" />
              <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF2E79]">
                CAPABILITIES & FORMATS
              </p>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#111111] tracking-tight leading-[1.1]">
              Our services
            </h2>
          </div>

          <Link
            href="/services/video-production"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-display font-semibold text-[#111111] hover:text-[#FF2E79] transition-colors group self-start sm:self-auto cursor-pointer"
          >
            <span>Explore All Capabilities</span>
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 5-Column Capability Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-7 lg:gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <Link
                key={service.title}
                href={service.href}
                className="flex flex-col items-start p-5 sm:p-6 rounded-2xl bg-[#FAFAF8] hover:bg-white border border-neutral-200/70 hover:border-[#FF5CE1]/40 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-[#FF2E79] text-[#111111] group-hover:text-white flex items-center justify-center mb-4 transition-colors shadow-2xs">
                  <Icon size={20} strokeWidth={1.8} />
                </div>

                <span className="font-mono text-[10px] text-[#FF2E79] font-bold mb-1">
                  0{idx + 1}
                </span>

                <h3 className="font-display text-base font-extrabold text-[#111111] group-hover:text-[#FF2E79] transition-colors mb-2 leading-snug">
                  {service.title}
                </h3>

                <p className="text-[14px] leading-relaxed text-[#52525B] font-normal">
                  {service.description}
                </p>
              </Link>
            )
          })}
        </div>
      </PageContainer>
    </section>
  )
}
