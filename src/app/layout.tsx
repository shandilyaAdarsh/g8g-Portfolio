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
    default: 'G8G Media | Video Production & Creative Content',
    template: '%s | G8G Media',
  },
  description:
    'G8G Media creates product videos, explainers, brand films and promotional content to help businesses communicate their ideas.',
  keywords: [
    'video production',
    'product videos',
    'explainer videos',
    'brand films',
    'motion graphics',
    'commercial production',
    'G8G Media',
    'G8G Agency',
  ],
  authors: [{ name: 'G8G Agency' }],
  creator: 'G8G Agency',
  publisher: 'G8G Agency',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://g8g.media',
    siteName: 'G8G Media',
    title: 'G8G Media | Video Production & Creative Content',
    description:
      'G8G Media creates product videos, explainers, brand films and promotional content to help businesses communicate their ideas.',
    images: [
      {
        url: '/g8g-media-logo.png',
        width: 1200,
        height: 630,
        alt: 'G8G Media — Video Production & Creative Content',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'G8G Media | Video Production & Creative Content',
    description:
      'G8G Media creates product videos, explainers, brand films and promotional content to help businesses communicate their ideas.',
    images: ['/g8g-media-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '64x64', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${instrumentSerif.variable}`}>
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
