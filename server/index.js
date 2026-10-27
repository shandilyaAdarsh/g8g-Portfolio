/**
 * Production HTTP Server for G8G Agency / G8G Media
 * Serves static build files from dist/ and handles POST /api/contact.
 */
import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DIST_DIR = path.resolve(__dirname, '../dist')
const PORT = process.env.PORT || 3000

// Dynamic loader for contactHandler (supports both .ts via tsx and compiled .js)
let contactHandler = null
async function getContactHandler() {
  if (contactHandler) return contactHandler
  try {
    const mod = await import('./contactHandler.ts')
    contactHandler = mod.handleContactRequest
    return contactHandler
  } catch {
    const mod = await import('./contactHandler.js')
    contactHandler = mod.handleContactRequest
    return contactHandler
  }
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
}

const server = http.createServer(async (req, res) => {
  const url = req.url || '/'
  const cleanUrl = url.split('?')[0]

  // Global Security Headers (WCAG & OWASP recommended)
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'SAMEORIGIN')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  // 1. API Endpoints
  if (cleanUrl === '/api/contact') {
    try {
      const handler = await getContactHandler()
      await handler(req, res)
    } catch (err) {
      console.error('[G8G SERVER ERROR]', err)
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ success: false, error: 'Internal server error processing inquiry.' }))
    }
    return
  }

  if (cleanUrl === '/api/health') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        status: 'healthy',
        service: 'G8G Media Production Server',
        timestamp: new Date().toISOString(),
      }),
    )
    return
  }

  // 2. Static File Resolution
  let filePath = path.join(DIST_DIR, cleanUrl)
  const isDirectFile = fs.existsSync(filePath) && fs.statSync(filePath).isFile()

  if (isDirectFile) {
    const ext = path.extname(filePath).toLowerCase()
    const contentType = MIME_TYPES[ext] || 'application/octet-stream'

    // Cache immutable assets with hashes, revalidate HTML & dynamic content
    if (cleanUrl.startsWith('/assets/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    } else if (ext === '.html') {
      res.setHeader('Cache-Control', 'no-cache')
    } else {
      res.setHeader('Cache-Control', 'public, max-age=86400')
    }

    res.writeHead(200, { 'Content-Type': contentType })
    fs.createReadStream(filePath).pipe(res)
    return
  }

  // 3. SPA Route Fallback (Only for routes without file extensions)
  const hasFileExtension = path.extname(cleanUrl).length > 0
  if (!hasFileExtension) {
    const indexHtmlPath = path.join(DIST_DIR, 'index.html')
    if (fs.existsSync(indexHtmlPath)) {
      res.setHeader('Cache-Control', 'no-cache')
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      fs.createReadStream(indexHtmlPath).pipe(res)
      return
    }
  }

  // 4. Missing Static Asset -> Proper 404
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('404 Not Found')
})

server.listen(PORT, () => {
  console.log(`[G8G Production Server] Listening on http://localhost:${PORT}`)
})
