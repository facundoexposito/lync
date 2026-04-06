import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LYNC',
  url: SITE_URL,
  logo: `${SITE_URL}/brand/ICON_BLUE.png`,
  description: 'A community for international women building meaningful friendships in Madrid through curated events, retreats, and resources.',
  foundingLocation: {
    '@type': 'Place',
    name: 'Madrid, Spain',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
