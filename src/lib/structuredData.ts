/**
 * Structured Data (JSON-LD) generators for G8G Agency & G8G Media.
 * Comprehensive SEO, AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization) schemas.
 * Strictly adheres to verified business facts without fictitious awards, ratings, or fake reviews.
 */
import { Project } from '../data/projects'

export interface BreadcrumbItem {
  name: string
  path: string
}

export interface FaqItem {
  question: string
  answer: string
}

/**
 * Converts mm:ss or text duration into ISO 8601 Duration format (e.g. "0:38" -> "PT38S", "1:45" -> "PT1M45S")
 */
export function formatDurationISO(durationStr?: string): string {
  if (!durationStr) return 'PT1M'
  const parts = durationStr.split(':').map((s) => parseInt(s.trim(), 10))
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    const mins = parts[0]
    const secs = parts[1]
    if (mins === 0) return `PT${secs}S`
    if (secs === 0) return `PT${mins}M`
    return `PT${mins}M${secs}S`
  }
  return 'PT1M'
}

/**
 * Primary Organization and ProfessionalService Schema (SEO + GEO).
 * Provides clear entity identity, geographic reach, and service catalog for search and generative engines.
 */
export function getOrganizationSchema(origin: string = 'https://g8g.media') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${origin}/#organization`,
    name: 'G8G Agency',
    alternateName: ['G8G Media', 'G8G Creative Studio', 'G8G Production'],
    url: origin,
    logo: {
      '@type': 'ImageObject',
      url: `${origin}/g8g-media-logo.png`,
      caption: 'G8G Media Studio Emblem',
      width: '1200',
      height: '630',
    },
    slogan: 'Turning Great Ideas into Great Products.',
    email: 'hello@g8g.media',
    description:
      'G8G Agency is a creative enterprise with G8G Media as its specialized creative production division, delivering cinematic product videos, 3D CGI commercials, luxury real estate visual showcases, and technical brand films.',
    foundingDate: '2023',
    founder: {
      '@type': 'Person',
      name: 'Adarsh Shandilya',
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Worldwide',
      },
      {
        '@type': 'Country',
        name: 'United States',
      },
      {
        '@type': 'Country',
        name: 'United Arab Emirates',
      },
      {
        '@type': 'Country',
        name: 'United Kingdom',
      },
      {
        '@type': 'Country',
        name: 'India',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'European Union',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Worldwide',
      addressLocality: 'Global Digital Production Studio',
      description: 'Distributed international creative studio serving clients globally.',
    },
    priceRange: '$$$',
    currenciesAccepted: 'USD, EUR, GBP, AED, INR',
    paymentAccepted: 'Bank Wire, Stripe, Credit Card',
    sameAs: [
      'https://github.com/shandilyaAdarsh/g8g-Portfolio',
      'https://vimeo.com/g8gmedia',
      'https://www.youtube.com/@g8gmedia',
      'https://www.linkedin.com/company/g8g-media',
      'https://twitter.com/g8gmedia',
    ],
    knowsAbout: [
      'Video Production',
      '3D Motion Design & CGI',
      'Luxury Real Estate Commercial Films',
      'Automotive Brand Films',
      'Product Demo Videos',
      'Technical Explainer Videos',
      'Product Launch Campaigns',
      'Commercial Advertising',
      'DaVinci Resolve Studio Color Grading',
      'Dolby Atmos Spatial Audio',
      'Unreal Engine 5.4 Cinematics',
      'Frame.io Review Pipeline',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'G8G Media Production Capabilities',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '3D CGI Commercials & Architectural Films',
            description:
              'Photorealistic 3D CGI, volumetric lighting, and cinema-grade commercial films for luxury real estate and physical technology.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Product Demo Videos',
            description:
              'Interface-accurate, cinematic demonstration videos communicating the core utility of enterprise SaaS and hardware products.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Technical Explainer Videos',
            description:
              'Narrative-driven explanatory videos simplifying complex protocols, fintech mechanisms, and cloud architectures.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cinematic Brand Films',
            description:
              'High-concept brand anthems establishing visionary positioning, founder legacy, and market authority.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Product Launch Keynote Videos',
            description:
              'High-impact reveal films engineered for global press conferences, social drops, and keynote reveals.',
          },
        },
      ],
    },
  }
}

/**
 * WebSite Schema for Search Sitelinks and Generative Search Indexing
 */
export function getWebsiteSchema(origin: string = 'https://g8g.media') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    url: origin,
    name: 'G8G Media',
    alternateName: ['G8G Agency Portfolio', 'G8G Media Studio'],
    publisher: {
      '@id': `${origin}/#organization`,
    },
    description:
      'G8G Media creates product videos, 3D CGI commercials, technical explainers, and brand films that turn complex stories into scroll-stopping video content.',
    inLanguage: 'en-US',
  }
}

/**
 * FAQPage Schema (Answer Engine Optimization - AEO).
 * Enables Google AI Overviews, Perplexity, Claude, and ChatGPT to directly cite answers.
 */
export function getFaqSchema(faqs: FaqItem[], origin: string = 'https://g8g.media') {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${origin}/#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Video Production Service Schema (SEO + GEO).
 */
export function getVideoProductionServiceSchema(origin: string = 'https://g8g.media') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${origin}/services/video-production#service`,
    name: 'Video Production & Creative Content',
    serviceType: 'Video Production',
    provider: {
      '@id': `${origin}/#organization`,
    },
    description:
      'End-to-end video production services by G8G Media, including 3D CGI commercials, product demo videos, technical explainers, brand films, and multi-format launch campaigns.',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'G8G Media Production Capabilities',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Product Demo Videos',
            description:
              'Cinematic, interface-accurate demonstration videos for digital software and physical tech products.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Explainer Videos',
            description:
              'Narrative-driven explanatory videos clarifying complex business architectures and mechanisms.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Brand Films',
            description:
              'High-concept cinematic narratives establishing vision, mission, and long-term brand equity.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Product Launch Videos',
            description:
              'High-impact cinematic launch films engineered for keynotes, social drops, and press releases.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Promotional & Advertising Videos',
            description:
              'Paced, performance-tested commercial creatives for paid media and social campaigns.',
          },
        },
      ],
    },
  }
}

/**
 * HowTo Schema for Production Workflow (AEO).
 * Structures the 4-step production workflow for AI reasoning engines.
 */
export function getProductionProcessSchema(origin: string = 'https://g8g.media') {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${origin}/#process`,
    name: 'G8G Media Commercial Video Production Workflow',
    description:
      'A streamlined 4-phase creative pipeline delivering finished 4K commercial films from brief to final delivery in 3 to 5 weeks.',
    totalTime: 'P4W',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Concept & Narrative Architecture',
        text: 'Discovery alignment, creative concept generation, positioning architecture, and script development.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Styleframes & Cinematic Storyboarding',
        text: 'Photorealistic visual styleframes, camera lens mapping, color palettes, and frame-by-frame animatics.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Production, 3D CGI & Motion Simulation',
        text: 'Live-action cinematography, Unreal Engine 5 3D asset generation, procedural motion design, and lighting.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Color Grading, Audio Mix & Multi-Format Delivery',
        text: 'DaVinci Resolve studio grade, Dolby Atmos sound design, frame-accurate review via Frame.io, and multi-ratio exports.',
      },
    ],
  }
}

/**
 * VideoObject Schema for Case Studies and Portfolio Commercials (AEO + SEO Video Rich Results).
 */
export function getVideoObjectSchema(project: Project, origin: string = 'https://g8g.media') {
  const thumbnailUrl = project.thumbnail
    ? project.thumbnail.startsWith('http')
      ? project.thumbnail
      : `${origin}${project.thumbnail}`
    : `${origin}/g8g-media-logo.png`

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${origin}/work/${project.slug}#video`,
    name: project.title,
    description: project.description,
    thumbnailUrl: [thumbnailUrl],
    uploadDate: `${project.year || 2025}-01-01T00:00:00Z`,
    contentUrl: project.videoUrl || undefined,
    embedUrl: project.videoUrl || undefined,
    duration: formatDurationISO(project.duration),
    inLanguage: 'en-US',
    productionCompany: {
      '@id': `${origin}/#organization`,
    },
    creator: {
      '@id': `${origin}/#organization`,
    },
  }
}

/**
 * BreadcrumbList Schema for Navigation Hierarchy
 */
export function getBreadcrumbSchema(items: BreadcrumbItem[], origin: string = 'https://g8g.media') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${origin}${item.path}`,
    })),
  }
}

/**
 * ContactPage Schema for Contact Portal (SEO + GEO Local Entity)
 */
export function getContactPageSchema(origin: string = 'https://g8g.media') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${origin}/contact#contactpage`,
    url: `${origin}/contact`,
    name: 'Contact G8G Media Studio',
    description: 'Direct inquiry and production brief intake portal for G8G Media.',
    mainEntity: {
      '@type': 'ContactPoint',
      contactType: 'Production Inquiries & Sales',
      email: 'hello@g8g.media',
      availableLanguage: ['English'],
      areaServed: 'Worldwide',
    },
  }
}

/**
 * Portfolio ItemList Schema for /work (SEO + AEO List Citation)
 */
export function getPortfolioCollectionSchema(projects: Project[], origin: string = 'https://g8g.media') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${origin}/work#portfolio`,
    name: 'G8G Media Selected Case Studies & Commercials',
    itemListElement: projects.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: p.title,
      url: `${origin}/work/${p.slug}`,
      description: p.description,
    })),
  }
}

/**
 * CaseStudy CreativeWork Schema
 */
export function getCaseStudySchema(project: Project, origin: string = 'https://g8g.media') {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${origin}/work/${project.slug}#work`,
    headline: project.title,
    name: project.title,
    description: project.description,
    creator: {
      '@id': `${origin}/#organization`,
    },
    genre: project.categoryLabel,
    keywords: [project.categoryLabel, ...project.deliverables, ...project.technologies],
    inLanguage: 'en-US',
    aspectRatio: project.aspect,
    duration: project.duration,
    video: getVideoObjectSchema(project, origin),
  }
}
