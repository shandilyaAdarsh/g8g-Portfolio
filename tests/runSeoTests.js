/**
 * Automated Technical SEO & Indexing Test Suite for G8G Media
 * Verifies sitemap.xml, robots.txt, canonical definitions, structured data, and routing configs.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  getOrganizationSchema,
  getWebsiteSchema,
  getVideoProductionServiceSchema,
  getBreadcrumbSchema,
  getCaseStudySchema,
} from '../src/lib/structuredData.ts'
import { projects } from '../src/data/projects.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')

let passedCount = 0
let failedCount = 0

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`)
    passedCount++
  } else {
    console.error(`  [FAIL] ${message}`)
    failedCount++
  }
}

console.log('\n======================================================')
console.log('   G8G MEDIA PHASE 5 — SEO & INDEXING TEST SUITE')
console.log('======================================================\n')

// 1. Robots.txt Verification
console.log('--- 1. Robots.txt Directives ---')
const robotsPath = path.join(ROOT_DIR, 'public', 'robots.txt')
assert(fs.existsSync(robotsPath), 'public/robots.txt exists on disk')
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf-8')
  assert(robotsContent.includes('User-agent: *'), 'Specifies User-agent: *')
  assert(robotsContent.includes('Allow: /'), 'Allows root path indexing')
  assert(robotsContent.includes('Disallow: /api/'), 'Disallows indexing of backend /api/ endpoints')
  assert(
    robotsContent.includes('Sitemap: https://g8g.media/sitemap.xml'),
    'Declares canonical sitemap location',
  )
}

// 2. Sitemap.xml Verification
console.log('\n--- 2. XML Sitemap Verification ---')
const sitemapPath = path.join(ROOT_DIR, 'public', 'sitemap.xml')
assert(fs.existsSync(sitemapPath), 'public/sitemap.xml exists on disk')
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8')
  assert(sitemapContent.startsWith('<?xml'), 'Has valid XML declaration')
  assert(sitemapContent.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'), 'Has valid sitemap urlset namespace')

  // Check essential static routes
  const essentialRoutes = [
    'https://g8g.media/',
    'https://g8g.media/services',
    'https://g8g.media/services/video-production',
    'https://g8g.media/work',
    'https://g8g.media/about',
    'https://g8g.media/contact',
  ]
  essentialRoutes.forEach((route) => {
    assert(sitemapContent.includes(`<loc>${route}</loc>`), `Includes canonical route: ${route}`)
  })

  // Check all real project slugs exist in sitemap
  assert(projects.length === 6, `Verified registry contains exactly 6 projects (found ${projects.length})`)
  projects.forEach((p) => {
    const projectUrl = `https://g8g.media/work/${p.slug}`
    assert(sitemapContent.includes(`<loc>${projectUrl}</loc>`), `Includes case study slug: ${p.slug}`)
  })

  // Verify NO fake or test routes exist
  assert(!sitemapContent.includes('/test'), 'Excludes testing routes')
  assert(!sitemapContent.includes('/api'), 'Excludes API endpoints')
}

// 3. Hosting & SPA Fallbacks
console.log('\n--- 3. Hosting & SPA Direct Routing Fallbacks ---')
const redirectsPath = path.join(ROOT_DIR, 'public', '_redirects')
assert(fs.existsSync(redirectsPath), 'public/_redirects exists for Netlify/Cloudflare')
if (fs.existsSync(redirectsPath)) {
  const redirectsContent = fs.readFileSync(redirectsPath, 'utf-8')
  assert(redirectsContent.includes('/*      /index.html   200'), 'Configures wildcard 200 rewrite for client-side routing')
}

const vercelPath = path.join(ROOT_DIR, 'vercel.json')
assert(fs.existsSync(vercelPath), 'vercel.json exists')
if (fs.existsSync(vercelPath)) {
  const vercelJson = JSON.parse(fs.readFileSync(vercelPath, 'utf-8'))
  assert(Array.isArray(vercelJson.rewrites), 'Contains rewrites rule array')
  assert(Array.isArray(vercelJson.headers), 'Configures custom security headers')
}

// 4. Structured Data (JSON-LD) Validation
console.log('\n--- 4. Structured Data (JSON-LD) Schemas ---')
const org = getOrganizationSchema('https://g8g.media')
assert(org['@context'] === 'https://schema.org', 'Organization context is schema.org')
assert(org['@type'] === 'Organization', 'Organization @type is Organization')
assert(org.name === 'G8G Agency', 'Brand name is accurately G8G Agency')
assert(org.alternateName.includes('G8G Media'), 'Alternate name includes G8G Media')
assert(!('aggregateRating' in org), 'Zero fake aggregate ratings in Organization schema')
assert(!('review' in org), 'Zero fake reviews in Organization schema')

const serviceSchema = getVideoProductionServiceSchema('https://g8g.media')
assert(serviceSchema['@type'] === 'Service', 'Service schema @type is Service')
assert(serviceSchema.serviceType === 'Video Production', 'Service type is Video Production')

const breadcrumbs = getBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Work', path: '/work' },
], 'https://g8g.media')
assert(breadcrumbs['@type'] === 'BreadcrumbList', 'Breadcrumbs @type is BreadcrumbList')
assert(breadcrumbs.itemListElement.length === 2, 'Breadcrumbs has 2 hierarchy items')

const sampleProject = projects[0]
const caseStudySchema = getCaseStudySchema(sampleProject, 'https://g8g.media')
assert(caseStudySchema['@type'] === 'CreativeWork', 'Case study @type is CreativeWork')
assert(caseStudySchema.headline === sampleProject.title, 'Case study headline matches project title')

console.log('\n------------------------------------------------------')
console.log(`Results: ${passedCount} passed, ${failedCount} failed`)
console.log('======================================================\n')

if (failedCount > 0) {
  process.exit(1)
}
