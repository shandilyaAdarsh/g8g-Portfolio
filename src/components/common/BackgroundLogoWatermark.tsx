import React from 'react'

export interface BackgroundLogoWatermarkProps {
  className?: string
  imgClassName?: string
  opacity?: string
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'full'
  alt?: string
}

/**
 * BackgroundLogoWatermark – Reusable authentic G8G logo watermark:
 * - Uses the authentic original g8g logo mark (cropped without 'MEDIA').
 * - Preserves 100% of the original logo's graphical identity.
 * - Rendered in an ultra-soft, delicate light shade (#D5D5D5 - #F2F2F4).
 * - Sits strictly in the background (z-0), never overlapping above interactive elements.
 * - 100% uncropped on left, right, top, and bottom—fully intact.
 * - Completely static and non-interactive (pointer-events-none, select-none).
 */
export function BackgroundLogoWatermark({
  className = '',
  imgClassName = '',
  opacity = 'opacity-65',
  size = 'hero',
  alt = '',
}: BackgroundLogoWatermarkProps) {
  const sizeMap: Record<string, string> = {
    sm: 'max-w-[260px] sm:max-w-[320px]',
    md: 'max-w-[360px] sm:max-w-[440px] lg:max-w-[500px]',
    lg: 'max-w-[440px] sm:max-w-[520px] lg:max-w-[600px]',
    hero: 'max-w-[380px] sm:max-w-[460px] lg:max-w-[520px] xl:max-w-[580px]',
    full: 'w-full',
  }

  const maxWidthClass = sizeMap[size] || sizeMap.hero

  return (
    <div
      className={`pointer-events-none select-none overflow-visible flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <img
        src="/images/showcase/g8g-logo-lightgrey@4x.png"
        srcSet="/images/showcase/g8g-logo-lightgrey.png 319w, /images/showcase/g8g-logo-lightgrey@2x.png 638w, /images/showcase/g8g-logo-lightgrey@4x.png 1276w"
        sizes="(max-width: 640px) 340px, (max-width: 1024px) 500px, 720px"
        alt={alt}
        draggable={false}
        className={`w-full h-auto object-contain select-none pointer-events-none transition-opacity duration-300 ${maxWidthClass} ${opacity} ${imgClassName}`}
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      />
    </div>
  )
}
