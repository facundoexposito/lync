import { AdminLoginScreen } from '@/components/admin/admin-login-screen'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return <AdminLoginScreen />
}
