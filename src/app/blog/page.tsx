import { blogPosts } from '@/data/blog-posts'
import { BlogList } from '@/components/blog/blog-list'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | LYNC Madrid',
  description:
    'Tips, stories, and guides for making real friends in Madrid. From girls\u2019 nights to yoga meetups, discover how to build your social circle abroad.',
  openGraph: {
    title: 'Blog | LYNC Madrid',
    description:
      'Tips, stories, and guides for making real friends in Madrid.',
    type: 'website',
  },
}

export default function BlogPage() {
  return <BlogList posts={blogPosts} />
}
