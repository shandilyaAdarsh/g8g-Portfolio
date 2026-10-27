import * as XLSX from 'xlsx'
import fs from 'fs'
import path from 'path'
import type { ContactFormInputs } from '@/schemas/contact'

export interface RecordedInquiryRow {
  'Reference ID': string
  'Submission Date (UTC)': string
  'Submission Date (Local)': string
  'Client Name': string
  'Work Email': string
  'Company': string
  'Website': string
  'Service Requested': string
  'Budget Tier': string
  'Timeline': string
  'Preferred Contact Method': string
  'Region': string
  'Project Context': string
  'Project Overview': string
  'Status': string
}

const SERVICE_LABELS: Record<string, string> = {
  'product-demo-video': '3D Product Animation',
  'promotional-advertising': 'Commercial Film',
  'brand-film': 'Brand Anthem',
  'explainer-video': 'Explainer / Demo',
  'marketing-campaign-creative': 'Full Suite',
  'product-launch-video': 'Product Launch Film',
  'other-services': 'Custom Scope',
}

const BUDGET_LABELS: Record<string, string> = {
  '10k-25k': '$10k – $25k',
  '25k-50k': '$25k – $50k',
  '50k-100k-plus': '$50k – $100k+',
  '10000-plus': '$10,000+',
  '5000-10000': '$5,000 – $10,000',
  '1000-5000': '$1,000 – $5,000',
  'under-1000': 'Under $1,000',
  'not-decided': 'Not decided yet',
}

const TIMELINE_LABELS: Record<string, string> = {
  'asap': 'As soon as possible',
  '2-4-weeks': 'Within 2-4 weeks',
  '1-3-months': 'Within 1-3 months',
  'flexible': 'Flexible / exploring options',
}

const CONTACT_METHOD_LABELS: Record<string, string> = {
  'email': 'Email',
  'phone': 'Phone call',
  'video-call': 'Video consultation',
}

const COLUMN_WIDTHS = [
  { wch: 22 }, // Reference ID
  { wch: 22 }, // Submission Date (UTC)
  { wch: 24 }, // Submission Date (Local)
  { wch: 24 }, // Client Name
  { wch: 28 }, // Work Email
  { wch: 24 }, // Company
  { wch: 28 }, // Website
  { wch: 26 }, // Service Requested
  { wch: 18 }, // Budget Tier
  { wch: 22 }, // Timeline
  { wch: 22 }, // Preferred Contact Method
  { wch: 18 }, // Region
  { wch: 20 }, // Project Context
  { wch: 50 }, // Project Overview
  { wch: 16 }, // Status
]

/**
 * Sequential queue to prevent concurrent file access on disk
 */
let fileWriteQueue: Promise<void> = Promise.resolve()

/**
 * Returns the absolute path to the inquiries Excel spreadsheet
 */
export function getExcelFilePath(): string {
  if (process.env.EXCEL_INQUIRIES_PATH) {
    return path.resolve(process.env.EXCEL_INQUIRIES_PATH)
  }
  return path.join(process.cwd(), 'data', 'inquiries.xlsx')
}

/**
 * Returns the absolute path to the backup CSV file
 */
export function getCsvFilePath(): string {
  const excelPath = getExcelFilePath()
  return path.join(path.dirname(excelPath), 'inquiries.csv')
}

/**
 * Converts form data and metadata into a clean, formatted Excel row
 */
export function formatInquiryRow(
  data: ContactFormInputs,
  referenceId: string,
  timestamp?: string,
): RecordedInquiryRow {
  const dateObj = timestamp ? new Date(timestamp) : new Date()

  return {
    'Reference ID': referenceId,
    'Submission Date (UTC)': dateObj.toUTCString(),
    'Submission Date (Local)': dateObj.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'medium',
    }),
    'Client Name': data.fullName || '',
    'Work Email': data.email || '',
    'Company': data.companyName || '',
    'Website': data.websiteUrl || '',
    'Service Requested': SERVICE_LABELS[data.service] || data.service,
    'Budget Tier': BUDGET_LABELS[data.budget || 'not-decided'] || data.budget || 'Not decided yet',
    'Timeline': TIMELINE_LABELS[data.timeline || 'flexible'] || data.timeline || 'Flexible',
    'Preferred Contact Method':
      CONTACT_METHOD_LABELS[data.contactMethod || 'email'] || data.contactMethod || 'Email',
    'Region': data.region || '',
    'Project Context': data.projectContext || 'Direct Inquiry',
    'Project Overview': data.projectOverview || '',
    'Status': 'NEW / UNREAD',
  }
}

/**
 * Dispatches inquiry data to Google Sheets / Office 365 Webhook if configured
 */
export async function dispatchWebhookSync(
  row: RecordedInquiryRow,
  rawPayload: ContactFormInputs,
): Promise<{ dispatched: boolean; note?: string }> {
  const webhookUrl =
    process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
    process.env.EXCEL_WEBHOOK_URL ||
    process.env.ZAPIER_INQUIRY_WEBHOOK_URL ||
    process.env.MAKE_INQUIRY_WEBHOOK_URL

  if (!webhookUrl) {
    return { dispatched: false, note: 'No webhook URL configured in environment variables.' }
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...row,
        raw: rawPayload,
      }),
      redirect: 'follow',
    })

    // If redirected to Google sign-in page, warn user about deployment permissions
    if (res.url && res.url.includes('accounts.google.com')) {
      console.warn(
        '[G8G Webhook] Google Sheets Web App redirected to Google Sign-In. In Google Apps Script, ensure "Who has access" is set to "Anyone" (not "Only myself").',
      )
      return {
        dispatched: false,
        note: 'Google Apps Script requires "Who has access" set to "Anyone".',
      }
    }

    if (!res.ok && res.status !== 302) {
      console.warn(`[Excel Webhook] Endpoint returned status ${res.status}`)
      return { dispatched: false, note: `HTTP ${res.status}` }
    }

    console.info('[G8G AUTOMATION] Successfully synced inquiry to Google Sheets Webhook!')
    return { dispatched: true }
  } catch (err) {
    console.error('[Excel Webhook Error]', err)
    return { dispatched: false, note: String(err) }
  }
}

/**
 * Automates recording inquiry into the Excel spreadsheet (and CSV backup) on disk
 */
export async function recordInquiryToExcel(
  data: ContactFormInputs,
  referenceId: string,
  timestamp?: string,
): Promise<{ success: boolean; filePath: string; totalRecords: number; error?: string }> {
  const row = formatInquiryRow(data, referenceId, timestamp)
  const excelPath = getExcelFilePath()
  const csvPath = getCsvFilePath()

  // Run asynchronously through the sequential write queue
  return new Promise((resolve) => {
    fileWriteQueue = fileWriteQueue
      .then(async () => {
        try {
          const dir = path.dirname(excelPath)
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
          }

          let existingRows: RecordedInquiryRow[] = []

          if (fs.existsSync(excelPath)) {
            try {
              const fileBuffer = fs.readFileSync(excelPath)
              const existingWb = XLSX.read(fileBuffer, { type: 'buffer' })
              const sheetName = existingWb.SheetNames[0] || 'Inquiries'
              const existingWs = existingWb.Sheets[sheetName]
              if (existingWs) {
                existingRows = XLSX.utils.sheet_to_json<RecordedInquiryRow>(existingWs)
              }
            } catch (readErr) {
              console.warn('[ExcelHandler] Could not parse existing workbook, initializing fresh:', readErr)
            }
          }

          // Append new inquiry row
          const updatedRows = [...existingRows, row]

          // Build workbook with formatted columns
          const wb = XLSX.utils.book_new()
          const ws = XLSX.utils.json_to_sheet(updatedRows)
          ws['!cols'] = COLUMN_WIDTHS

          XLSX.utils.book_append_sheet(wb, ws, 'Inquiries')
          const outputBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' })
          fs.writeFileSync(excelPath, outputBuffer)

          // Parallel CSV export for portable viewing / terminal inspection
          try {
            const csvContent = XLSX.utils.sheet_to_csv(ws)
            fs.writeFileSync(csvPath, csvContent, 'utf-8')
          } catch (csvErr) {
            console.warn('[ExcelHandler] CSV backup write non-fatal warning:', csvErr)
          }

          // Trigger optional Google Sheets / Webhook in the background
          dispatchWebhookSync(row, data).catch((e) =>
            console.warn('[Excel Webhook Non-fatal Error]:', e),
          )

          console.info(
            `[G8G AUTOMATION] Successfully updated Excel spreadsheet (${updatedRows.length} total inquiries) -> ${excelPath}`,
          )

          resolve({
            success: true,
            filePath: excelPath,
            totalRecords: updatedRows.length,
          })
        } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : String(err)
          console.error('[G8G AUTOMATION ERROR] Failed to update Excel spreadsheet:', errorMessage)
          resolve({
            success: false,
            filePath: excelPath,
            totalRecords: 0,
            error: errorMessage,
          })
        }
      })
      .catch((queueErr) => {
        console.error('[ExcelHandler Queue Error]', queueErr)
        resolve({
          success: false,
          filePath: excelPath,
          totalRecords: 0,
          error: String(queueErr),
        })
      })
  })
}
