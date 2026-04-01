import { notFound } from 'next/navigation'
import { resources, getResource } from '@/data/study-abroad'
import { ResourceArticle } from '@/components/study-abroad/resource-article'
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
  if (!resource) return { title: 'Resource Not Found | LYNC' }

  return {
    title: `${resource.title} | LYNC Resources`,
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
    },
  }
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params
  const resource = getResource(slug)
  if (!resource) notFound()

  const otherResources = resources.filter((r) => r.slug !== slug)

  return <ResourceArticle resource={resource} otherResources={otherResources} />
}
