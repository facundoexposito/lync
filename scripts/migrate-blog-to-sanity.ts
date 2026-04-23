/**
 * One-time migration: seed existing blog posts into Sanity CMS.
 *
 * Usage:
 *   npx tsx scripts/migrate-blog-to-sanity.ts
 *
 * Requires SANITY_API_TOKEN in .env.local (or environment).
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kxf081e5'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2026-04-20'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('Missing SANITY_API_TOKEN — set it in .env.local or environment')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

interface Section {
  heading?: string
  body: string[]
}

interface PostData {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  imagePath: string // relative to public/
  content: Section[]
}

const posts: PostData[] = [
  {
    slug: 'the-fun-and-easy-way-to-expand-your-social-circle',
    title: 'The Fun and Easy Way to Expand Your Social Circle',
    date: '2025-03-25',
    category: 'Nightlife',
    excerpt:
      'Nothing beats a good girls\u2019 night out. Here\u2019s how to show up with confidence and leave with real connections.',
    imagePath: 'brand/BLOG/social-circle.jpg',
    content: [
      {
        body: [
          'Nothing beats a good girls\u2019 night out \u2014 the kind with great food, good cocktails, and a room full of energy that just clicks. But let\u2019s be real: showing up somewhere new, surrounded by people you don\u2019t know, can feel intimidating.',
          'That\u2019s exactly why we built LYNC. We take the guesswork out of socializing so you can focus on what actually matters \u2014 having a great time.',
        ],
      },
      {
        heading: 'See Who\u2019s Coming Before You Go',
        body: [
          'One of the things that makes LYNC different is that you can see who\u2019s attending before you even walk through the door. No more showing up blind and hoping for the best. You\u2019ll arrive with confidence, already knowing a few familiar faces \u2014 or at least knowing you\u2019re surrounded by girls who are just as excited to meet you.',
        ],
      },
      {
        heading: 'Every Night Out Is a Fresh Adventure',
        body: [
          'Whether it\u2019s a rooftop dinner, a wine tasting, or a themed cocktail night, every LYNC event is designed to feel easy and fun. No awkward small talk \u2014 just great energy, shareable moments, and real connections that actually last beyond the night.',
          'We curate the vibe so you don\u2019t have to. All you need to do is show up.',
        ],
      },
      {
        heading: 'Ready to Try It?',
        body: [
          'Join our next girls\u2019 night out and let the good times roll. Whether you\u2019re new to the city or just looking to shake up your routine, there\u2019s always a spot for you.',
        ],
      },
    ],
  },
  {
    slug: 'the-magic-of-coffee-meetups',
    title: 'The Magic of Coffee Meetups',
    date: '2025-03-25',
    category: 'Meetups',
    excerpt:
      'Sometimes, the best friendships start with a simple \u201CHey, let\u2019s grab a coffee.\u201D Here\u2019s why our coffee meetups work.',
    imagePath: 'brand/BLOG/coffee-meetups.webp',
    content: [
      {
        body: [
          'Sometimes, the best friendships start with a simple "Hey, let\u2019s grab a coffee." There\u2019s something about a warm cup and a low-key setting that makes conversation flow naturally \u2014 no pressure, no performance, just two people getting to know each other.',
          'That\u2019s the idea behind LYNC\u2019s coffee meetups. We connect women in the same city who want to broaden their social circle, without the stress of a big event or a loud bar.',
        ],
      },
      {
        heading: 'What to Expect',
        body: [
          'Our coffee meetups are designed to be relaxed and welcoming. Whether you\u2019re new to the city or you\u2019ve been here for years, you\u2019ll find that conversations come easy when everyone\u2019s there for the same reason \u2014 to meet cool people.',
          'Before the meetup, you can connect with other attendees through the LYNC platform. See who\u2019s coming, start a conversation, and show up already feeling like you belong.',
        ],
      },
      {
        heading: 'Discover Hidden-Gem Cafes',
        body: [
          'We don\u2019t just pick any random Starbucks. Every LYNC coffee meetup takes place at a carefully chosen caf\u00e9 \u2014 the kind of spot locals love but tourists never find. It\u2019s a chance to explore your city while making meaningful connections.',
        ],
      },
      {
        heading: 'No Pressure, Just Good Company',
        body: [
          'No pressure, no awkwardness \u2014 just good coffee and even better company. If you\u2019ve been meaning to put yourself out there but didn\u2019t know where to start, a coffee meetup is the perfect first step.',
        ],
      },
    ],
  },
  {
    slug: 'how-yoga-events-can-help-you-make-new-friends',
    title: 'How Yoga Events Can Help You Make New Friends',
    date: '2025-03-25',
    category: 'Wellness',
    excerpt:
      'Moving to a new city can feel overwhelming, but local yoga events are one of the best ways to meet like-minded people.',
    imagePath: 'brand/BLOG/yoga-friends.jpg',
    content: [
      {
        body: [
          'Moving to a new city can feel overwhelming \u2014 new streets, new routines, and a social circle that\u2019s basically starting from zero. But finding a local yoga event is one of the best ways to meet like-minded people who share your values.',
          'At LYNC, our yoga sessions are designed for everyone \u2014 whether you\u2019re a seasoned yogi or you\u2019ve never touched a mat. The goal isn\u2019t perfection; it\u2019s connection.',
        ],
      },
      {
        heading: 'A Stress-Free Way to Socialize',
        body: [
          'Unlike a bar or a networking event, yoga gives you a built-in icebreaker. You\u2019re all breathing together, moving together, and sharing an experience that naturally brings people closer. There\u2019s no pressure to be "on" \u2014 just show up as you are.',
        ],
      },
      {
        heading: 'The Conversations After Class',
        body: [
          'Some of the best connections happen after the last pose. Grabbing a smoothie or a coffee with someone you just practiced next to feels natural \u2014 no forced introductions needed. That\u2019s where real friendships start.',
        ],
      },
      {
        heading: 'Discover Local Studios',
        body: [
          'LYNC partners with local yoga studios across the city, giving you a chance to explore spaces you might never have found on your own. It\u2019s not just about the practice \u2014 it\u2019s about becoming part of a community.',
          'If you\u2019ve been looking for a way to meet people that doesn\u2019t involve shouting over music, yoga might be your answer. Check out our upcoming events and roll out your mat with us.',
        ],
      },
    ],
  },
]

async function migrate() {
  for (const post of posts) {
    console.log(`Migrating: ${post.title}`)

    // Upload image
    const imgAbsPath = path.resolve('public', post.imagePath)
    if (!fs.existsSync(imgAbsPath)) {
      console.error(`  Image not found: ${imgAbsPath} — skipping`)
      continue
    }
    const imageBuffer = fs.readFileSync(imgAbsPath)
    const imageAsset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(post.imagePath),
    })
    console.log(`  Uploaded image: ${imageAsset._id}`)

    // Create document
    const doc = await client.create({
      _type: 'blogPost',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      date: post.date,
      category: post.category,
      excerpt: post.excerpt,
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAsset._id },
      },
      content: post.content.map((s) => ({
        _type: 'object',
        _key: crypto.randomUUID(),
        heading: s.heading,
        body: s.body,
      })),
    })
    console.log(`  Created document: ${doc._id}`)
  }

  console.log('\nMigration complete!')
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
