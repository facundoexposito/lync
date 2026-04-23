import type { Retreat } from '@/data/retreats'
import { client } from './client'
import { urlFor } from './image'
import {
  ALL_RETREATS_QUERY,
  RETREAT_BY_SLUG_QUERY,
  RETREAT_SLUGS_QUERY,
} from './queries'

 
function imageToUrl(img: any): string {
  if (!img?.asset) return ''
  return urlFor(img).url()
}

 
function fileToUrl(file: any): string {
  return file?.asset?.url ?? ''
}

 
function mapSanityRetreat(doc: any): Retreat {
  return {
    id: doc._id,
    slug: doc.slug?.current ?? '',
    title: doc.title ?? '',
    subtitle: doc.subtitle ?? '',
    shortDescription: doc.shortDescription ?? '',
    location: doc.location ?? '',
    venue: doc.venue ?? '',
    dates: doc.dates ?? '',
    duration: doc.duration ?? '',
    groupSize: doc.groupSize ?? '',
    pricing: (doc.pricing ?? []).map((p: { type: string; price: string; perks: string[] }) => ({
      type: p.type ?? '',
      price: p.price ?? '',
      perks: p.perks ?? [],
    })),
    depositNote: doc.depositNote ?? '',
    itinerary: (doc.itinerary ?? []).map((d: { day: number; emoji: string; title: string; highlights: string[] }) => ({
      day: d.day ?? 0,
      emoji: d.emoji ?? '',
      title: d.title ?? '',
      highlights: d.highlights ?? [],
    })),
    dailySchedule: (doc.dailySchedule ?? []).map((s: { time: string; title: string; description: string; emoji?: string }) => ({
      time: s.time ?? '',
      title: s.title ?? '',
      description: s.description ?? '',
      emoji: s.emoji,
    })),
    inclusions: (doc.inclusions ?? []).map((inc: { emoji: string; title: string; description: string }) => ({
      emoji: inc.emoji ?? '',
      title: inc.title ?? '',
      description: inc.description ?? '',
    })),
    notIncluded: doc.notIncluded ?? [],
    images: {
      hero: imageToUrl(doc.images?.hero),
      intro: imageToUrl(doc.images?.intro),
      card: imageToUrl(doc.images?.card) || imageToUrl(doc.images?.hero),
      bento: (doc.images?.bento ?? []).map(imageToUrl),
      slideshow: (doc.images?.slideshow ?? []).map((img: { alt?: string }) => ({
        src: imageToUrl(img),
        alt: img.alt ?? '',
      })),
    },
    founderStory: doc.founderStory ?? '',
    founderAttribution: doc.founderAttribution ?? '',
    bookingUrl: doc.bookingUrl ?? '',
    brochurePath: fileToUrl(doc.brochure),
    contactEmail: doc.contactEmail ?? '',
    // New CMS-editable fields
    introText: doc.introText,
    programmeTitle: doc.programmeTitle,
    programmeSubtitle: doc.programmeSubtitle,
    founderStoryTitle: doc.founderStoryTitle,
    dailyScheduleSubtitle: doc.dailyScheduleSubtitle,
  }
}

export async function getAllRetreats(): Promise<Retreat[]> {
  const docs = await client.fetch(ALL_RETREATS_QUERY, {}, { next: { tags: ['retreat'] } })
  return docs.map(mapSanityRetreat)
}

export async function getRetreatBySlug(slug: string): Promise<Retreat | null> {
  const doc = await client.fetch(RETREAT_BY_SLUG_QUERY, { slug }, { next: { tags: ['retreat'] } })
  if (!doc) return null
  return mapSanityRetreat(doc)
}

export async function getRetreatSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(RETREAT_SLUGS_QUERY, {}, { next: { tags: ['retreat'] } })
}
