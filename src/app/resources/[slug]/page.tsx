import { notFound } from 'next/navigation'
import { resources, getResource } from '@/data/study-abroad'
import { ResourceArticle } from '@/components/study-abroad/resource-article'
import { SITE_URL } from '@/lib/constants'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const resource = getResource(slug)
  if (!resource) return { title: 'Resource Not Found' }

  return {
    title: resource.title,
    description: resource.description,
    openGraph: {
      title: resource.title,
      description: resource.description,
      type: 'article',
      publishedTime: resource.date,
      images: [{ url: resource.image, width: 1200, height: 630, alt: resource.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: resource.title,
      description: resource.description,
      images: [{ url: resource.image, alt: resource.title }],
    },
  }
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params
  const resource = getResource(slug)
  if (!resource) notFound()

  const otherResources = resources.filter((r) => r.slug !== slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: resource.title,
    description: resource.description,
    image: `${SITE_URL}${resource.image}`,
    datePublished: resource.date,
    author: {
      '@type': 'Organization',
      name: 'LYNC',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'LYNC',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/brand/ICON_BLUE.png` },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResourceArticle resource={resource} otherResources={otherResources} />
    </>
  )
}
