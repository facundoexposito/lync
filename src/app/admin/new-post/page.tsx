import { NewPostClient } from '@/components/admin/new-post-client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'New post — LYNC Admin',
  robots: { index: false, follow: false },
}

export default function NewPostPage() {
  return <NewPostClient />
}
