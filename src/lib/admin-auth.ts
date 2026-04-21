import { timingSafeEqual } from 'crypto'

/** Header the client sends on every admin API call. */
export const ADMIN_HEADER = 'x-admin-password'

/** Key used by the client to remember the password for the tab. */
export const ADMIN_STORAGE_KEY = 'lync_admin_pwd'

export function checkAdminPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  const a = Buffer.from(input)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

/** Read the admin password from request headers and validate it. */
export function isAdminRequest(req: Request): boolean {
  const pwd = req.headers.get(ADMIN_HEADER)
  if (!pwd) return false
  return checkAdminPassword(pwd)
}
