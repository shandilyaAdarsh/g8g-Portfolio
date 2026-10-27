import type { IncomingMessage, ServerResponse } from 'http'
import { contactFormSchema, type ContactFormInputs } from '../src/schemas/contact'
import { recordInquiryToExcel } from '../src/lib/excelHandler'

/** In-memory rate limiting store (IP -> array of timestamps) */
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5
const MAX_PAYLOAD_SIZE = 50 * 1024 // 50 KB

/** Generate unique, human-friendly reference ID */
export function generateReferenceId(): string {
  const year = new Date().getFullYear()
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase()
  const timestamp = Date.now().toString().slice(-4)
  return `G8G-INQ-${year}-${randomChars}${timestamp}`
}

/** HTML entity escaping to prevent injection */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Rate limiter checker */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const timestamps = rateLimitMap.get(ip) || []
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return false
  }

  recent.push(now)
  rateLimitMap.set(ip, recent)
  return true
}

/** Reset rate limit (useful for testing) */
export function resetRateLimitStore(): void {
  rateLimitMap.clear()
}

/** Extract client IP address safely */
export function getClientIp(req: IncomingMessage): string {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim()
  }
  return req.socket.remoteAddress || '127.0.0.1'
}

/** Server-side Email Dispatcher */
export async function dispatchInquiryEmail(data: ContactFormInputs, referenceId: string): Promise<{
  delivered: boolean
  provider: string
  note: string
}> {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY || process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_EMAIL_TO || 'hello@g8g.media'
  const fromEmail = process.env.CONTACT_EMAIL_FROM || 'inquiries@g8g.media'

  if (!apiKey) {
    // Documented unconfigured state: Validated and logged, but no live credentials
    console.info(`[G8G SERVER] Inquiry received (${referenceId}). EMAIL_PROVIDER_API_KEY not configured. Mocking delivery.`)
    return {
      delivered: false,
      provider: 'unconfigured',
      note: 'Inquiry validated and queued internally. Set EMAIL_PROVIDER_API_KEY in server environment for live delivery.',
    }
  }

  try {
    // Example: Dispatch using Resend REST API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: data.email,
        subject: `[New Inquiry ${referenceId}] ${data.fullName} - ${data.service}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #101116; color: #F1F0E9; padding: 24px; border-radius: 8px;">
            <div style="border-bottom: 2px solid #C5FF62; padding-bottom: 12px; margin-bottom: 20px;">
              <h2 style="color: #C5FF62; margin: 0;">G8G Media · New Project Inquiry</h2>
              <p style="color: #8A8A8E; font-size: 13px; margin: 4px 0 0 0;">Reference ID: <strong>${referenceId}</strong></p>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 6px 0; color: #8A8A8E;">Client Name:</td><td style="color: #FFF; font-weight: bold;">${escapeHtml(data.fullName)}</td></tr>
              <tr><td style="padding: 6px 0; color: #8A8A8E;">Work Email:</td><td style="color: #FFF;"><a href="mailto:${escapeHtml(data.email)}" style="color: #C5FF62;">${escapeHtml(data.email)}</a></td></tr>
              ${data.companyName ? `<tr><td style="padding: 6px 0; color: #8A8A8E;">Company:</td><td style="color: #FFF;">${escapeHtml(data.companyName)}</td></tr>` : ''}
              ${data.websiteUrl ? `<tr><td style="padding: 6px 0; color: #8A8A8E;">Website:</td><td style="color: #FFF;"><a href="${escapeHtml(data.websiteUrl)}" style="color: #C5FF62;">${escapeHtml(data.websiteUrl)}</a></td></tr>` : ''}
              ${data.region ? `<tr><td style="padding: 6px 0; color: #8A8A8E;">Region:</td><td style="color: #FFF;">${escapeHtml(data.region)}</td></tr>` : ''}
              <tr><td style="padding: 6px 0; color: #8A8A8E;">Service:</td><td style="color: #C5FF62; font-weight: bold;">${escapeHtml(data.service)}</td></tr>
              <tr><td style="padding: 6px 0; color: #8A8A8E;">Budget Tier:</td><td style="color: #FFF;">${escapeHtml(data.budget || 'not-decided')}</td></tr>
              <tr><td style="padding: 6px 0; color: #8A8A8E;">Timeline:</td><td style="color: #FFF;">${escapeHtml(data.timeline || 'flexible')}</td></tr>
              <tr><td style="padding: 6px 0; color: #8A8A8E;">Preferred Contact:</td><td style="color: #FFF;">${escapeHtml(data.contactMethod || 'email')}</td></tr>
              ${data.projectContext ? `<tr><td style="padding: 6px 0; color: #8A8A8E;">Project Context:</td><td style="color: #FFF;">${escapeHtml(data.projectContext)}</td></tr>` : ''}
            </table>
            <div style="margin-top: 20px; padding: 16px; background: #191A20; border-radius: 4px; border-left: 3px solid #C5FF62;">
              <h4 style="margin: 0 0 8px 0; color: #C5FF62; font-size: 13px; text-transform: uppercase;">Project Overview:</h4>
              <p style="margin: 0; line-height: 1.6; color: #F1F0E9; white-space: pre-wrap;">${escapeHtml(data.projectOverview)}</p>
            </div>
            <p style="font-size: 11px; color: #8A8A8E; margin-top: 24px; text-align: center;">
              This transmission was securely handled by G8G Agency Server Endpoint · Reference ${referenceId}
            </p>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const errBody = await response.text()
      console.error('[G8G SERVER] Provider error dispatching email:', errBody)
      return {
        delivered: false,
        provider: 'resend',
        note: 'Email provider reported an error during dispatch.',
      }
    }

    return {
      delivered: true,
      provider: 'resend',
      note: 'Inquiry delivered to verified inbox.',
    }
  } catch (error) {
    console.error('[G8G SERVER] Exception during email delivery:', error)
    return {
      delivered: false,
      provider: 'network',
      note: 'Network exception occurred while communicating with email provider.',
    }
  }
}

/** Core HTTP Request Processor for POST /api/contact */
export async function handleContactRequest(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: false, error: 'Method not allowed. Use POST.' }))
    return
  }

  // 1. Rate Limiting
  const ip = getClientIp(req)
  if (!checkRateLimit(ip)) {
    res.statusCode = 429
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        success: false,
        error: 'Too many requests. Please wait a few minutes before submitting another inquiry.',
      }),
    )
    return
  }

  // 2. Read Request Body with Size Limit
  const chunks: Buffer[] = []
  let size = 0
  let payloadTooLarge = false

  await new Promise<void>((resolve, reject) => {
    req.on('data', (chunk: Buffer | string) => {
      const buf = typeof chunk === 'string' ? Buffer.from(chunk) : chunk
      size += buf.length
      if (size > MAX_PAYLOAD_SIZE) {
        payloadTooLarge = true
        return
      }
      chunks.push(buf)
    })
    req.on('end', () => resolve())
    req.on('error', (err: Error) => reject(err))
  })

  if (payloadTooLarge) {
    res.statusCode = 413
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        success: false,
        error: 'Payload too large. Submissions must not exceed 50 KB.',
      }),
    )
    return
  }

  const body = Buffer.concat(chunks).toString('utf-8')

  // 3. Parse JSON Body
  let parsedJson: unknown
  try {
    parsedJson = JSON.parse(body)
  } catch {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: false, error: 'Invalid JSON request payload.' }))
    return
  }

  // 4. Honeypot check (Anti-Spam)
  if (typeof parsedJson === 'object' && parsedJson !== null && 'honeypot' in parsedJson) {
    const hp = (parsedJson as Record<string, unknown>).honeypot
    if (hp && typeof hp === 'string' && hp.trim().length > 0) {
      // Bot filled hidden field: quietly reject without revealing bot trap
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ success: false, error: 'Submission rejected by spam filter.' }))
      return
    }
  }

  // 5. Schema Validation with Zod
  const rawPayload = typeof parsedJson === 'object' && parsedJson !== null ? (parsedJson as Record<string, unknown>) : {}
  const payloadToValidate = {
    budget: 'not-decided',
    timeline: 'flexible',
    contactMethod: 'email',
    ...rawPayload,
  }

  const validationResult = contactFormSchema.safeParse(payloadToValidate)
  if (!validationResult.success) {
    const fieldErrors: Record<string, string> = {}
    const issues = validationResult.error.issues || []
    issues.forEach((err) => {
      const field = err.path.join('.') || 'form'
      fieldErrors[field] = err.message
    })

    res.statusCode = 422
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        success: false,
        error: 'Validation failed. Please verify the submitted fields.',
        fieldErrors,
      }),
    )
    return
  }

  const formData = validationResult.data
  const referenceId = generateReferenceId()
  const timestamp = new Date().toISOString()

  // 6. Record to Excel Spreadsheet (and CSV / Webhook)
  const excelResult = await recordInquiryToExcel(formData, referenceId, timestamp)

  // 7. Email Dispatch
  const deliveryResult = await dispatchInquiryEmail(formData, referenceId)

  // 8. Successful Response
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      success: true,
      referenceId,
      status: deliveryResult.delivered ? 'delivered' : 'accepted',
      emailDelivered: deliveryResult.delivered,
      excelLogged: excelResult.success,
      providerNote: deliveryResult.note,
      timestamp,
      message: 'Your project inquiry has been received.',
    }),
  )
}
