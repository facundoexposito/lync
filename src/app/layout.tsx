import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'LYNC | Make Friends in Madrid',
    template: '%s | LYNC',
  },
  description: 'Join hundreds of international women building meaningful friendships in Madrid through curated events and community.',
  keywords: 'madrid, friends, international, women, community, events, expats, students',
  alternates: {
    canonical: './',
  },
  openGraph: {
    siteName: 'LYNC',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/brand/COMMUNITY/social-bar-chic-wide-shot.webp', width: 1200, height: 630, alt: 'LYNC Community in Madrid' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
