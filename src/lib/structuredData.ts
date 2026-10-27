/**
 * Structured Data (JSON-LD) generators for G8G Agency & G8G Media.
 * Uses strictly verified business details without fictitious awards, ratings, or addresses.
 */
import { Project } from '../data/projects'

export function getOrganizationSchema(origin: string = 'https://g8g.media') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${origin}/#organization`,
    name: 'G8G Agency',
    alternateName: ['G8G Media', 'G8G'],
    url: origin,
    logo: `${origin}/g8g-media-logo.png`,
    slogan: 'Turning Great Ideas into Great Products.',
    email: 'hello@g8g.media',
    description:
      'G8G Agency is a creative enterprise with G8G Media as its specialized creative production division, delivering cinematic product videos, explainers, brand films, and advertising creatives.',
    knowsAbout: [
      'Video Production',
      'Product Demo Videos',
      'Explainer Videos',
      'Brand Films',
      'Product Launch Videos',
      'Commercial Advertising',
      'Motion Design',
    ],
  }
}

export function getWebsiteSchema(origin: string = 'https://g8g.media') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    url: origin,
    name: 'G8G Media',
    publisher: {
      '@id': `${origin}/#organization`,
    },
    description:
      'G8G Media creates product videos, explainers, brand films and promotional content to help businesses communicate their ideas.',
    inLanguage: 'en-US',
  }
}

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
      'End-to-end video production services by G8G Media, including product demo videos, technical explainers, promotional commercials, brand films, and launch campaigns.',
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
            description: 'Cinematic, interface-accurate demonstration videos for digital software and physical tech products.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Explainer Videos',
            description: 'Narrative-driven explanatory videos clarifying complex business architectures and mechanisms.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Brand Films',
            description: 'High-concept cinematic narratives establishing vision, mission, and long-term brand equity.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Product Launch Videos',
            description: 'High-impact cinematic launch films engineered for keynotes, social drops, and press releases.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Promotional & Advertising Videos',
            description: 'Paced, performance-tested commercial creatives for paid media and social campaigns.',
          },
        },
      ],
    },
  }
}

export interface BreadcrumbItem {
  name: string
  path: string
}

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
  }
}
