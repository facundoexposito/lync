import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { SITE_URL } from '@/lib/constants'

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

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
