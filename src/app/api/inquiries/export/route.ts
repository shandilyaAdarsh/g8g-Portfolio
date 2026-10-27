import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import { getExcelFilePath, getCsvFilePath } from '@/lib/excelHandler'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const format = url.searchParams.get('format') || 'xlsx'
  const secretKey = url.searchParams.get('secret')

  // Optional protection: if ADMIN_SECRET_KEY is configured in env, require it
  const adminSecret = process.env.ADMIN_SECRET_KEY
  if (adminSecret && secretKey !== adminSecret) {
    return NextResponse.json(
      { error: 'Unauthorized. Provide valid secret key (?secret=YOUR_KEY).' },
      { status: 401 },
    )
  }

  if (format === 'csv') {
    const csvPath = getCsvFilePath()
    if (!fs.existsSync(csvPath)) {
      return NextResponse.json(
        { error: 'No inquiries have been recorded yet.' },
        { status: 404 },
      )
    }

    const fileContent = fs.readFileSync(csvPath, 'utf-8')
    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="g8g-media-inquiries.csv"',
      },
    })
  }

  // Default: XLSX Excel format
  const excelPath = getExcelFilePath()
  if (!fs.existsSync(excelPath)) {
    return NextResponse.json(
      { error: 'No inquiries have been recorded yet in inquiries.xlsx.' },
      { status: 404 },
    )
  }

  const fileBuffer = fs.readFileSync(excelPath)
  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="g8g-media-inquiries.xlsx"',
    },
  })
}
