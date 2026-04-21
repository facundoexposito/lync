import { NextResponse } from 'next/server'
import { buildAirtableLeadFields } from '@/lib/map-quiz-for-airtable'

const AIRTABLE_API = 'https://api.airtable.com/v0'

type Body = {
  lead: {
    name: string
    email: string
    phone?: string
    nationality: string
  }
  answers: Record<string, string | string[]>
  source: 'homepage' | 'quiz-page'
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  const pat = process.env.AIRTABLE_PAT
  const baseId = process.env.AIRTABLE_BASE_ID
  const table = process.env.AIRTABLE_TABLE_NAME ?? 'Leads'

  if (!pat || !baseId) {
    return NextResponse.json(
      { error: 'Missing AIRTABLE_PAT or AIRTABLE_BASE_ID' },
      { status: 500 }
    )
  }

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { lead, answers, source } = body

  if (
    !lead ||
    !isNonEmptyString(lead.name) ||
    !isNonEmptyString(lead.email) ||
    !isNonEmptyString(lead.nationality)
  ) {
    return NextResponse.json(
      { error: 'name, email, and nationality are required' },
      { status: 400 }
    )
  }

  if (!isValidEmail(lead.email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  if (source !== 'homepage' && source !== 'quiz-page') {
    return NextResponse.json({ error: 'Invalid source' }, { status: 400 })
  }

  if (!answers || typeof answers !== 'object') {
    return NextResponse.json({ error: 'answers object required' }, { status: 400 })
  }

  const fields = buildAirtableLeadFields(lead, answers, source)

  const url = `${AIRTABLE_API}/${baseId}/${encodeURIComponent(table)}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${pat}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ records: [{ fields }] }),
  })

  if (!res.ok) {
    const detail = await res.text()
    console.error('Airtable error', res.status, detail)
    return NextResponse.json(
      { error: 'Could not save lead', detail },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
