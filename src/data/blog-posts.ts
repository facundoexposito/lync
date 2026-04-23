export interface Section {
  heading?: string
  body: string[]
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  image: string
  content: Section[]
}

/** Category → [bg, text] Tailwind classes */
export const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Nightlife: { bg: 'bg-rose-100', text: 'text-rose-600' },
  Meetups: { bg: 'bg-amber-100', text: 'text-amber-700' },
  Wellness: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
}

export function formatBlogDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
