import { NextRequest, NextResponse } from 'next/server'
import {
  checkRateLimit,
  generateReferenceId,
  dispatchInquiryEmail,
} from '../../../../server/contactHandler'
import { contactFormSchema } from '@/schemas/contact'
import { recordInquiryToExcel } from '@/lib/excelHandler'

const MAX_PAYLOAD_SIZE = 50 * 1024 // 50 KB

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: securityHeaders,
  })
}

export async function POST(req: NextRequest) {
  // 1. Rate Limiting Check
  const forwarded = req.headers.get('x-forwarded-for')
  const clientIp = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1'

  if (!checkRateLimit(clientIp)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many requests. Please wait a few minutes before submitting another inquiry.',
      },
      { status: 429, headers: securityHeaders },
    )
  }

  // 2. Read Request Body with Size Limit
  const rawBody = await req.text()
  if (Buffer.byteLength(rawBody, 'utf8') > MAX_PAYLOAD_SIZE) {
    return NextResponse.json(
      {
        success: false,
        error: 'Payload too large. Submissions must not exceed 50 KB.',
      },
      { status: 413, headers: securityHeaders },
    )
  }

  // 3. Parse JSON Body
  let parsedJson: unknown
  try {
    parsedJson = JSON.parse(rawBody)
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON request payload.' },
      { status: 400, headers: securityHeaders },
    )
  }

  // 4. Honeypot check (Anti-Spam)
  if (typeof parsedJson === 'object' && parsedJson !== null && 'honeypot' in parsedJson) {
    const hp = (parsedJson as Record<string, unknown>).honeypot
    if (hp && typeof hp === 'string' && hp.trim().length > 0) {
      return NextResponse.json(
        { success: false, error: 'Submission rejected by spam filter.' },
        { status: 400, headers: securityHeaders },
      )
    }
  }

  // 5. Schema Validation with Zod
  const rawPayload =
    typeof parsedJson === 'object' && parsedJson !== null
      ? (parsedJson as Record<string, unknown>)
      : {}

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

    return NextResponse.json(
      {
        success: false,
        error: 'Validation failed. Please verify the submitted fields.',
        fieldErrors,
      },
      { status: 422, headers: securityHeaders },
    )
  }

  const formData = validationResult.data
  const referenceId = generateReferenceId()
  const timestamp = new Date().toISOString()

  // 6. Record to Excel Spreadsheet (and CSV / Webhook)
  const excelResult = await recordInquiryToExcel(formData, referenceId, timestamp)

  // 7. Server-side Email Dispatch
  const deliveryResult = await dispatchInquiryEmail(formData, referenceId)

  // 8. Successful Response
  return NextResponse.json(
    {
      success: true,
      referenceId,
      status: deliveryResult.delivered ? 'delivered' : 'accepted',
      emailDelivered: deliveryResult.delivered,
      excelLogged: excelResult.success,
      providerNote: deliveryResult.note,
      timestamp,
      message: 'Your project inquiry has been received.',
    },
    { status: 200, headers: securityHeaders },
  )
}
