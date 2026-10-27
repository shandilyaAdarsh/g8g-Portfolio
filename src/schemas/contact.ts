import { z } from 'zod'

export const serviceOptions = [
  { value: 'product-demo-video', label: '3D Product Animation' },
  { value: 'promotional-advertising', label: 'Commercial Film' },
  { value: 'brand-film', label: 'Brand Anthem' },
  { value: 'explainer-video', label: 'Explainer / Demo' },
  { value: 'marketing-campaign-creative', label: 'Full Suite' },
  { value: 'product-launch-video', label: 'Product Launch Film' },
  { value: 'other-services', label: 'Custom Scope' },
] as const

export type ServiceOptionValue = (typeof serviceOptions)[number]['value']

export const budgetOptions = [
  { value: '10k-25k', label: '$10k – $25k' },
  { value: '25k-50k', label: '$25k – $50k' },
  { value: '50k-100k-plus', label: '$50k – $100k+' },
  { value: 'not-decided', label: 'Not decided yet' },
  { value: 'under-1000', label: 'Under $1,000' },
  { value: '1000-5000', label: '$1,000 – $5,000' },
  { value: '5000-10000', label: '$5,000 – $10,000' },
  { value: '10000-plus', label: '$10,000+' },
] as const

export type BudgetOptionValue = (typeof budgetOptions)[number]['value']

export const timelineOptions = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '2-4-weeks', label: 'Within 2–4 weeks' },
  { value: '1-3-months', label: 'Within 1–3 months' },
  { value: 'flexible', label: 'Flexible / exploring options' },
] as const

export type TimelineOptionValue = (typeof timelineOptions)[number]['value']

export const contactMethodOptions = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone call' },
  { value: 'video-call', label: 'Video consultation' },
] as const

export type ContactMethodValue = (typeof contactMethodOptions)[number]['value']

/** Helper to validate and normalize URL inputs */
const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i

/** Zod Schema for Contact & Project Inquiry */
export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name (at least 2 characters)')
    .max(100, 'Full name must not exceed 100 characters'),
  email: z
    .string()
    .trim()
    .min(1, 'Work email is required')
    .email('Please enter a valid work email address')
    .max(120, 'Email must not exceed 120 characters'),
  service: z.enum([
    'product-demo-video',
    'explainer-video',
    'promotional-advertising',
    'product-launch-video',
    'brand-film',
    'marketing-campaign-creative',
    'other-services',
  ], {
    message: 'Please select a service option',
  }),
  projectOverview: z
    .string()
    .trim()
    .min(10, 'Please describe your project or objectives (at least 10 characters)')
    .max(3000, 'Project description must not exceed 3,000 characters'),
  companyName: z
    .string()
    .trim()
    .max(100, 'Company name must not exceed 100 characters')
    .optional()
    .or(z.literal('')),
  websiteUrl: z
    .string()
    .trim()
    .max(200, 'Website URL must not exceed 200 characters')
    .optional()
    .refine((val) => !val || urlRegex.test(val), {
      message: 'Please enter a valid website address (e.g. company.com or https://company.com)',
    })
    .or(z.literal('')),
  region: z
    .string()
    .trim()
    .max(100, 'Region must not exceed 100 characters')
    .optional()
    .or(z.literal('')),
  budget: z.enum([
    'not-decided',
    'under-1000',
    '1000-5000',
    '5000-10000',
    '10000-plus',
    '10k-25k',
    '25k-50k',
    '50k-100k-plus',
  ]),
  timeline: z.enum(['asap', '2-4-weeks', '1-3-months', 'flexible']),
  contactMethod: z.enum(['email', 'phone', 'video-call']),
  honeypot: z.string().optional(), // Bot trap: must remain empty
  projectContext: z.string().max(100).optional(), // Passed from portfolio slug
})

export type ContactFormInputs = z.infer<typeof contactFormSchema>

/**
 * Maps known query parameter strings to verified service options.
 * If an invalid or unknown value is supplied, returns undefined.
 */
export function mapQueryToService(queryParam: string | null): ServiceOptionValue | undefined {
  if (!queryParam) return undefined
  const normalized = queryParam.toLowerCase().trim()

  const map: Record<string, ServiceOptionValue> = {
    'product-demo-video': 'product-demo-video',
    'product-demo': 'product-demo-video',
    'product-demos': 'product-demo-video',
    'product-video': 'product-demo-video',
    'explainer-video': 'explainer-video',
    'explainer': 'explainer-video',
    'explainers': 'explainer-video',
    'promotional-advertising': 'promotional-advertising',
    'promotional': 'promotional-advertising',
    'commercials': 'promotional-advertising',
    'advertising': 'promotional-advertising',
    'product-launch-video': 'product-launch-video',
    'product-launch': 'product-launch-video',
    'launch': 'product-launch-video',
    'brand-film': 'brand-film',
    'brand-films': 'brand-film',
    'marketing-campaign-creative': 'marketing-campaign-creative',
    'marketing-creatives': 'marketing-campaign-creative',
    'campaign': 'marketing-campaign-creative',
    'other-services': 'other-services',
    'motion-graphics': 'other-services',
    'digital-product': 'other-services',
  }

  return map[normalized]
}
