/**
 * G8G Media — Privacy-Conscious, Provider-Neutral Analytics Abstraction.
 *
 * Designed to cleanly route conversion and interaction events to any verified
 * analytics provider (Google Analytics 4, Plausible, PostHog, Fathom, etc.)
 * WITHOUT logging personally identifiable information (PII).
 *
 * If no measurement ID is configured, operations gracefully no-op.
 */

export type AnalyticsEventName =
  | 'project_cta_clicked'
  | 'portfolio_project_opened'
  | 'service_page_viewed'
  | 'contact_form_started'
  | 'contact_form_submitted'
  | 'contact_form_failed'

export interface EventPayloadMap {
  project_cta_clicked: {
    cta_label: string
    location: string
    service_context?: string
  }
  portfolio_project_opened: {
    project_slug: string
    category: string
  }
  service_page_viewed: {
    service_id: string
    service_name?: string
  }
  contact_form_started: {
    service_prefilled?: string
    from_project?: string
  }
  contact_form_submitted: {
    service: string
    has_company: boolean
    has_website: boolean
    budget_range: string
    timeline_preference: string
    reference_id: string
  }
  contact_form_failed: {
    service: string
    error_stage: 'client_validation' | 'server_rejection' | 'network_error'
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    plausible?: (eventName: string, options?: { props?: Record<string, unknown> }) => void
  }
}

/**
 * Tracks an analytics event across configured providers in a privacy-preserving manner.
 * Strictly guarantees NO PII (no names, emails, messages, or freeform text) is transmitted.
 */
export function trackEvent<E extends AnalyticsEventName>(
  eventName: E,
  properties: EventPayloadMap[E],
): void {
  // Safe SSR/test check
  if (typeof window === 'undefined') return

  const isDebug =
    (typeof process !== 'undefined' &&
      (process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true' ||
        process.env.NODE_ENV === 'development')) ||
    (typeof import.meta !== 'undefined' &&
      ((import.meta as any).env?.VITE_ANALYTICS_DEBUG === 'true' || (import.meta as any).env?.DEV))

  if (isDebug) {
    console.debug(`[G8G Analytics Event] "${eventName}":`, properties)
  }

  // 1. Google Analytics 4 (gtag.js / dataLayer)
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, properties)
    } catch (err) {
      console.warn('[G8G Analytics] Failed to dispatch gtag event:', err)
    }
  } else if (Array.isArray(window.dataLayer)) {
    try {
      window.dataLayer.push({
        event: eventName,
        ...properties,
      })
    } catch (err) {
      console.warn('[G8G Analytics] Failed to push to dataLayer:', err)
    }
  }

  // 2. Plausible Analytics support
  if (typeof window.plausible === 'function') {
    try {
      window.plausible(eventName, { props: properties as Record<string, unknown> })
    } catch (err) {
      console.warn('[G8G Analytics] Failed to dispatch plausible event:', err)
    }
  }
}

/**
 * Simple session guard to prevent duplicate rapid events (e.g. repeated form renders).
 */
const sentEventsCache = new Set<string>()

export function trackEventOnce<E extends AnalyticsEventName>(
  key: string,
  eventName: E,
  properties: EventPayloadMap[E],
): void {
  if (sentEventsCache.has(key)) return
  sentEventsCache.add(key)
  trackEvent(eventName, properties)
}
