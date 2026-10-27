import { createClient, type ClientConfig } from '@sanity/client'
import { apiVersion, dataset, projectId, isSanityConfigured } from './env'

export const clientConfig: ClientConfig = {
  projectId: projectId || 'unconfigured',
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
}

/** Sanity read-only client for fetching published content */
export const sanityClient = isSanityConfigured
  ? createClient(clientConfig)
  : null

/** Preview client with read token if draft mode is active */
export function getPreviewClient(token?: string) {
  if (!isSanityConfigured) return null
  return createClient({
    ...clientConfig,
    useCdn: false,
    token: token || process.env.SANITY_API_READ_TOKEN,
    perspective: 'previewDrafts',
  })
}
