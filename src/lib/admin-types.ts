/** Shared types for the admin blog-publishing flow. */

export type BlogCategory = 'Nightlife' | 'Meetups' | 'Wellness'

export interface GeneratedSection {
  heading?: string
  body: string[]
}

export interface GeneratedPost {
  slug: string
  title: string
  category: BlogCategory
  excerpt: string
  content: GeneratedSection[]
}

export interface BlogBrief {
  workingTitle: string
  category: BlogCategory
  founderNote: string
  keyQuestions: string
}

export interface PublishRequest extends GeneratedPost {
  imageDataUrl: string
  imageExt: string
}
