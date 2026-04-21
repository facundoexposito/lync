import { NextResponse } from 'next/server'
import { checkAdminPassword } from '@/lib/admin-auth'

export async function POST(req: Request) {
  let body: { password?: unknown }
  try {
    body = (await req.json()) as { password?: unknown }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (typeof body.password !== 'string' || body.password.length === 0) {
    return NextResponse.json({ error: 'Password required' }, { status: 400 })
  }

  if (!checkAdminPassword(body.password)) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  return NextResponse.json({ ok: true })
}
