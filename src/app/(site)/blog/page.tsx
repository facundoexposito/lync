import { getAllBlogs } from '@/lib/sanity/fetchers'
import { BlogList } from '@/components/blog/blog-list'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Tips, stories, and guides for making real friends in Madrid. From girls\u2019 nights to yoga meetups, discover how to build your social circle abroad.',
  openGraph: {
    images: [{ url: '/brand/BLOG/social-circle.jpg', width: 1200, height: 630, alt: 'LYNC Blog' }],
  },
}

export default async function BlogPage() {
  const posts = await getAllBlogs()
  return <BlogList posts={posts} />
}
