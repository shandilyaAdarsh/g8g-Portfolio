import { sanityClient } from './client'
import { isSanityConfigured } from './env'
import {
  PROJECTS_QUERY,
  FEATURED_PROJECTS_QUERY,
  PROJECT_BY_SLUG_QUERY,
  ALL_PROJECT_SLUGS_QUERY,
  SERVICES_QUERY,
} from './queries'
import {
  projects as localProjects,
  Project,
  getAllProjects as getLocalAllProjects,
  getFeaturedProjects as getLocalFeaturedProjects,
  getProjectBySlug as getLocalProjectBySlug,
} from '@/data/projects'
import { mediaServices as localServices, ServiceItem } from '@/data/mediaServices'

/**
 * Fetch all projects – combines Sanity CMS when configured with verified local fallback.
 */
export async function getProjects(): Promise<Project[]> {
  if (!isSanityConfigured || !sanityClient) {
    return getLocalAllProjects()
  }

  try {
    const data = await sanityClient.fetch<any[]>(PROJECTS_QUERY, {}, {
      next: { revalidate: 60 },
    })

    if (!data || data.length === 0) {
      return getLocalAllProjects()
    }

    // Map Sanity schema fields to Project interface
    return data.map((item: any) => ({
      id: item._id,
      slug: item.slug,
      title: item.title,
      category: item.category,
      categoryLabel: item.category?.replace('-', ' ').toUpperCase() || 'VIDEO',
      tags: item.tags || ['3D Animation', 'Sound Design'],
      description: item.shortDescription || '',
      problem: item.problem || item.challenge || '',
      whatWeMade: item.whatWeMade || item.solution || '',
      result: item.result || '[EDITABLE: Verified Metric]',
      status: item.status || 'published',
      statusLabel: item.status === 'published' ? 'Verified Master Film' : 'Studio Concept',
      featured: Boolean(item.featured),
      thumbnail: item.heroMedia ? undefined : undefined,
      videoUrl: item.muxPlaybackId ? `https://stream.mux.com/${item.muxPlaybackId}.m3u8` : undefined,
      playbackId: item.muxPlaybackId,
      clientName: item.clientName,
      year: item.year,
      challenge: item.challenge || '',
      solution: item.solution || '',
      deliverables: item.deliverables || [],
      technologies: item.technologies || [],
      results: item.results || [],
      aspect: item.aspect || '16/9',
      format: item.format || 'Cinematic Film',
      duration: item.duration || '1:00',
      accentColor: item.accentColor || '#C5FF62',
      gradient: item.gradient || 'from-[#192212] via-[#101116] to-[#0A0D08]',
      nextSlug: item.nextSlug || 'lumina-os-product-film',
    }))
  } catch (err) {
    console.warn('[Sanity Data Fetch] Failed to fetch projects from Sanity, using local fallback:', err)
    return getLocalAllProjects()
  }
}

/**
 * Fetch featured projects
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getProjects()
  return all.filter((p) => p.featured)
}

/**
 * Fetch single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (!isSanityConfigured || !sanityClient) {
    return getLocalProjectBySlug(slug)
  }

  try {
    const item = await sanityClient.fetch<any>(PROJECT_BY_SLUG_QUERY, { slug }, {
      next: { revalidate: 60 },
    })

    if (!item) {
      return getLocalProjectBySlug(slug)
    }

    return {
      id: item._id,
      slug: item.slug,
      title: item.title,
      category: item.category,
      categoryLabel: item.category?.replace('-', ' ').toUpperCase() || 'VIDEO',
      tags: item.tags || ['3D Animation', 'Sound Design'],
      description: item.shortDescription || '',
      problem: item.problem || item.challenge || '',
      whatWeMade: item.whatWeMade || item.solution || '',
      result: item.result || '[EDITABLE: Verified Metric]',
      status: item.status || 'published',
      statusLabel: item.status === 'published' ? 'Verified Master Film' : 'Studio Concept',
      featured: Boolean(item.featured),
      videoUrl: item.muxPlaybackId ? `https://stream.mux.com/${item.muxPlaybackId}.m3u8` : undefined,
      playbackId: item.muxPlaybackId,
      clientName: item.clientName,
      year: item.year,
      challenge: item.challenge || '',
      solution: item.solution || '',
      deliverables: item.deliverables || [],
      technologies: item.technologies || [],
      results: item.results || [],
      aspect: item.aspect || '16/9',
      format: item.format || 'Cinematic Film',
      duration: item.duration || '1:00',
      accentColor: item.accentColor || '#C5FF62',
      gradient: item.gradient || 'from-[#192212] via-[#101116] to-[#0A0D08]',
      nextSlug: item.nextSlug || 'lumina-os-product-film',
    }
  } catch {
    return getLocalProjectBySlug(slug)
  }
}

/**
 * Fetch all project slugs for generateStaticParams
 */
export async function getAllProjectSlugs(): Promise<string[]> {
  if (!isSanityConfigured || !sanityClient) {
    return localProjects.map((p) => p.slug)
  }

  try {
    const data = await sanityClient.fetch<Array<{ slug: string }>>(ALL_PROJECT_SLUGS_QUERY)
    if (data && data.length > 0) {
      return data.map((d: { slug: string }) => d.slug)
    }
  } catch {
    // fallback
  }

  return localProjects.map((p) => p.slug)
}
