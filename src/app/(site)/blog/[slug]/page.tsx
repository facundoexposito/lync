import { notFound } from 'next/navigation'
import { getBlogBySlug, getBlogSlugs, getAllBlogs } from '@/lib/sanity/fetchers'
import { BlogArticle } from '@/components/blog/blog-article'
import { SITE_URL } from '@/lib/constants'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getBlogSlugs()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogBySlug(slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, alt: post.title }],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogBySlug(slug)
  if (!post) notFound()

  const allPosts = await getAllBlogs()
  const otherPosts = allPosts.filter((p) => p.slug !== slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
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
      <BlogArticle post={post} otherPosts={otherPosts} />
    </>
  )
}
