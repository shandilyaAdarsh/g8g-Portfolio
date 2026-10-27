/** GROQ queries for G8G Media Sanity schema */

export const PROJECTS_QUERY = `*[_type == "project" && status in ["published", "concept"]] | order(featured desc, year desc) {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  category,
  status,
  featured,
  clientName,
  year,
  duration,
  format,
  aspect,
  accentColor,
  gradient,
  heroMedia,
  muxPlaybackId,
  gallery,
  challenge,
  solution,
  deliverables,
  technologies,
  results,
  nextSlug,
  seoTitle,
  seoDescription
}`

export const FEATURED_PROJECTS_QUERY = `*[_type == "project" && featured == true && status in ["published", "concept"]] | order(year desc) {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  category,
  status,
  featured,
  clientName,
  year,
  duration,
  format,
  aspect,
  accentColor,
  gradient,
  heroMedia,
  muxPlaybackId,
  deliverables,
  nextSlug
}`

export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  category,
  status,
  featured,
  clientName,
  year,
  duration,
  format,
  aspect,
  accentColor,
  gradient,
  heroMedia,
  muxPlaybackId,
  gallery,
  challenge,
  solution,
  deliverables,
  technologies,
  results,
  nextSlug,
  seoTitle,
  seoDescription
}`

export const ALL_PROJECT_SLUGS_QUERY = `*[_type == "project" && defined(slug.current)] {
  "slug": slug.current
}`

export const SERVICES_QUERY = `*[_type == "service"] | order(order asc, number asc) {
  _id,
  number,
  title,
  "slug": slug.current,
  headline,
  shortDesc,
  deliverables,
  iconName,
  order,
  seoTitle,
  seoDescription
}`

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  brandName,
  primaryDivision,
  tagline,
  inboxEmail,
  socialLinks,
  seoDefaults
}`
