import type { Metadata } from 'next'
import { Space_Grotesk, Inter, Instrument_Serif } from 'next/font/google'
import '@/styles/index.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument-serif',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://g8g.media'),
  title: {
    default: 'G8G Media | 3D Motion, Commercial Films & Product Video Studio',
    template: '%s | G8G Media',
  },
  description:
    'G8G Media is a premier creative production studio engineering 3D CGI commercials, technical product demo films, luxury real estate visuals, and category-defining brand films.',
  keywords: [
    '3D animation studio',
    'commercial video production',
    'luxury real estate commercial',
    'product demo videos',
    'technical explainer videos',
    'brand films',
    'motion graphics',
    'CGI brand films',
    'Unreal Engine 5 commercial',
    'G8G Media',
    'G8G Agency',
    'creative production company',
    'cinematic advertising',
    'corporate video production',
    'Frame.io review pipeline',
  ],
  authors: [{ name: 'G8G Agency', url: 'https://g8g.media' }],
  creator: 'G8G Agency',
  publisher: 'G8G Agency',
  category: 'Commercial Video Production & 3D Motion',
  classification: 'Creative Production Studio',
  alternates: {
    canonical: 'https://g8g.media',
    languages: {
      'en-US': 'https://g8g.media',
      'en-GB': 'https://g8g.media',
      'en-AE': 'https://g8g.media',
      'en-IN': 'https://g8g.media',
      'x-default': 'https://g8g.media',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['en_GB', 'en_AE', 'en_IN'],
    url: 'https://g8g.media',
    siteName: 'G8G Media',
    title: 'G8G Media | 3D Motion, Commercial Films & Product Video Studio',
    description:
      'G8G Media creates product videos, 3D CGI commercials, luxury real estate visuals, and cinematic brand films that make products impossible to ignore.',
    images: [
      {
        url: '/g8g-media-logo.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'G8G Media — Video Production & Creative Content Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@g8gmedia',
    creator: '@g8gmedia',
    title: 'G8G Media | 3D Motion, Commercial Films & Product Video Studio',
    description:
      'G8G Media creates product videos, 3D CGI commercials, luxury real estate visuals, and cinematic brand films that make products impossible to ignore.',
    images: ['/g8g-media-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '64x64', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  other: {
    'geo.region': 'GLOBAL',
    'geo.placename': 'Worldwide',
    'geo.position': '25.2048;55.2708',
    'ICBM': '25.2048, 55.2708',
    'revisit-after': '7 days',
    rating: 'general',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${instrumentSerif.variable}`}>
      <head>
        {/* Preconnect & DNS-Prefetch for Mux Video and Image CDN */}
        <link rel="preconnect" href="https://image.mux.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://stream.mux.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://image.mux.com" />
        <link rel="dns-prefetch" href="https://stream.mux.com" />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased min-h-screen flex flex-col font-body">
        {/* Accessibility skip-to-content link */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        <Navbar />

        <div className="flex-1 flex flex-col">{children}</div>

        <Footer />
      </body>
    </html>
  )
}
