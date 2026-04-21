/**
 * One-time migration script: uploads Solstice retreat data to Sanity CMS.
 *
 * Usage:
 *   npx tsx scripts/migrate-to-sanity.ts
 *
 * Prerequisites:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID set in .env.local
 *   - SANITY_API_TOKEN set in .env.local (needs write access — create at sanity.io/manage)
 */

import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local')
  console.error('Create a write token at https://www.sanity.io/manage')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-04-20',
  token,
  useCdn: false,
})

const PUBLIC_DIR = path.resolve('public')

async function uploadImage(filePath: string): Promise<{ _type: 'image'; asset: { _type: 'reference'; _ref: string } }> {
  const fullPath = path.join(PUBLIC_DIR, filePath)
  console.log(`  Uploading image: ${filePath}`)
  const buffer = fs.readFileSync(fullPath)
  const asset = await client.assets.upload('image', buffer, {
    filename: path.basename(filePath),
    contentType: filePath.endsWith('.webp') ? 'image/webp' : 'image/jpeg',
  })
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
  }
}

async function uploadFile(filePath: string): Promise<{ _type: 'file'; asset: { _type: 'reference'; _ref: string } }> {
  const fullPath = path.join(PUBLIC_DIR, filePath)
  console.log(`  Uploading file: ${filePath}`)
  const buffer = fs.readFileSync(fullPath)
  const asset = await client.assets.upload('file', buffer, {
    filename: path.basename(filePath),
    contentType: 'application/pdf',
  })
  return {
    _type: 'file',
    asset: { _type: 'reference', _ref: asset._id },
  }
}

async function migrate() {
  console.log('Starting Solstice retreat migration...\n')

  // Upload images
  console.log('Uploading images...')
  const heroImage = await uploadImage('/brand/RETREATS/solstice-sunset-group.webp')
  const introImage = await uploadImage('/brand/RETREATS/solstice-beach-group.webp')

  const bentoImages = await Promise.all([
    uploadImage('/brand/RETREATS/solstice-waterfall.webp'),
    uploadImage('/brand/RETREATS/solstice-surfing.webp'),
    uploadImage('/brand/RETREATS/solstice-beach-reading.webp'),
    uploadImage('/brand/RETREATS/solstice-night-group.webp'),
  ])

  const slideshowPaths = [
    { path: '/brand/RETREATS/slideshow/sunset-beach.webp', alt: 'Golden sunset on the Costa Rican beach' },
    { path: '/brand/RETREATS/slideshow/group-dining.webp', alt: 'Communal dinner with friends' },
    { path: '/brand/RETREATS/slideshow/waterfall-hike.webp', alt: 'Montezuma waterfall hike' },
    { path: '/brand/RETREATS/slideshow/surfing-ocean.webp', alt: 'Surfing in the Pacific Ocean' },
    { path: '/brand/RETREATS/slideshow/group-beach-night.webp', alt: 'Evening on the beach with the group' },
    { path: '/brand/RETREATS/slideshow/reading-beach.webp', alt: 'Reading on the beach at golden hour' },
    { path: '/brand/RETREATS/slideshow/villa-view.webp', alt: 'House of Shakti with ocean view' },
    { path: '/brand/RETREATS/slideshow/waves-fun.webp', alt: 'Playing in the waves' },
    { path: '/brand/RETREATS/slideshow/sunset-landscape.webp', alt: 'Pacific sunset from Santa Teresa' },
    { path: '/brand/RETREATS/slideshow/group-sunset.webp', alt: 'Group watching the sunset together' },
    { path: '/brand/RETREATS/slideshow/beach-dusk.webp', alt: 'Beach at dusk in Costa Rica' },
  ]

  const slideshowImages = []
  for (const slide of slideshowPaths) {
    const img = await uploadImage(slide.path)
    slideshowImages.push({
      ...img,
      _key: Math.random().toString(36).slice(2, 10),
      alt: slide.alt,
    })
  }

  // Upload brochure PDF
  console.log('\nUploading brochure...')
  const brochure = await uploadFile('/solstice-brochure.pdf')

  // Create the document
  console.log('\nCreating Solstice retreat document...')

  const doc = {
    _type: 'retreat',
    title: 'Solstice',
    slug: { _type: 'slug', current: 'solstice' },
    subtitle: 'A Journey Back to Your Heart',
    shortDescription:
      'Seven days in the Costa Rican jungle with a small circle of like-minded women. Yoga, sailing, waterfall hikes, bioluminescence kayaking, and deep connection.',
    location: 'Santa Teresa, Costa Rica',
    venue: 'House of Shakti',
    dates: 'March 22–29, 2026',
    duration: '7 nights',
    groupSize: '10 women',
    depositNote: '50% deposit to reserve · Monthly payments available',

    // New CMS-editable fields
    introText:
      'This is not a holiday. It is not a yoga retreat. It is not a break from your life.\n\nIt is a return. To yourself. To your heart. To the quiet, certain knowing inside you that has always understood your truest purpose — if only you would give it the space to speak.',
    programmeTitle: 'Seven Days of Becoming',
    programmeSubtitle:
      'This outline reflects the heart and intention of each day. Specific workshops and timings may shift — what will never change is the depth, the care, and the transformation.',
    founderStoryTitle: 'How Costa Rica Changed My Life',
    dailyScheduleSubtitle:
      'No two days are exactly the same — but every single one belongs entirely to you.',

    pricing: [
      {
        _key: 'shared',
        type: 'Shared Room',
        price: '$2,250',
        perks: [
          'Your own single bed in a shared room',
          'All organic breakfasts & dinners',
          'Daily yoga, meditation & breathwork',
          'All workshops & ceremonies',
          'Sailing, waterfall hike & kayaking',
          'Sauna & ice bath access',
          'SOLSTICE goodie bag',
          'Monthly payment plan available',
        ],
      },
      {
        _key: 'private',
        type: 'Private Room',
        price: '$3,000',
        perks: [
          'Your own private room',
          'All organic breakfasts & dinners',
          'Daily yoga, meditation & breathwork',
          'All workshops & ceremonies',
          'Sailing, waterfall hike & kayaking',
          'Sauna & ice bath access',
          'SOLSTICE goodie bag',
          'Monthly payment plan available',
        ],
      },
    ],

    itinerary: [
      { _key: 'd1', day: 1, emoji: '🌅', title: 'Arrival & Opening Circle', highlights: ['Settle into House of Shakti', 'Explore your jungle home & meet your circle', 'Opening ceremony to set intentions', 'Create our sacred container together'] },
      { _key: 'd2', day: 2, emoji: '🧘', title: 'Ground & Release', highlights: ['Morning movement to ground into your body', 'Afternoon session to release what you carry', 'Breath, sound & somatic practice', 'Sauna & ice bath for deep integration'] },
      { _key: 'd3', day: 3, emoji: '🌿', title: 'Root in Nature', highlights: ['Workshop in the wisdom of plants', 'Hike to Montezuma waterfall', 'Swim in the pool at its base', 'Connect with the natural world'] },
      { _key: 'd4', day: 4, emoji: '🔥', title: 'Reclaim Your Power', highlights: ['Remember who you are beneath every role', 'Drop the labels — reclaim your truth', 'One of the most powerful afternoons', 'Arrive open'] },
      { _key: 'd5', day: 5, emoji: '⛵', title: 'Sail to Tortuga Island', highlights: ['Full day sailing trip to Tortuga Island', 'Snorkelling in crystal-clear water', 'White sand beaches & open blue horizon', 'Be wild and alive'] },
      { _key: 'd6', day: 6, emoji: '💫', title: 'Be Witnessed', highlights: ['Workshop on the power of being truly heard', 'Evening fire show on the beach', 'Dancing, fire & laughter', 'A core memory you carry forever'] },
      { _key: 'd7', day: 7, emoji: '🌌', title: 'Glow & Carry It Home', highlights: ['Bioluminescence kayaking at nightfall', 'Paddle through glowing water in the dark', 'Closing circle — share what you take home', 'A final communal meal together'] },
    ],

    dailySchedule: [
      { _key: 's1', time: '5:30 AM', emoji: '🌿', title: 'The jungle wakes you', description: 'Howler monkeys roll through the canopy like thunder. Birds fill the air with sound that can only be described as music. You lie there — not reaching for your phone — just listening. Completely at peace.' },
      { _key: 's2', time: '7:30 AM', emoji: '🧘', title: 'Sacred morning begins', description: 'Barefoot to the shala as the sun rises. Guided meditation, breathwork or EFT, then 75 minutes of yoga or pilates. You leave feeling wrung out and radiant all at once.' },
      { _key: 's3', time: '10:00 AM', emoji: '🍽️', title: 'Breakfast together', description: 'Organic, nourishing food. Tropical fruit, local produce. Slow eating. Real conversations.' },
      { _key: 's4', time: '11 AM – 4 PM', emoji: '🌊', title: 'The afternoon is yours', description: 'Waterfalls. Hammocks. Sauna. Ice bath. Rest or adventure — you choose.' },
      { _key: 's5', time: '4:00 PM', emoji: '✨', title: 'Workshops & excursions', description: 'Ceremonies, sailing, or bioluminescent kayaking. Experiences you carry home forever.' },
      { _key: 's6', time: '7:00 PM', emoji: '🕯️', title: 'Dinner', description: 'Candlelight. Slow meals. Deep connection. By day three, strangers feel like sisters.' },
      { _key: 's7', time: 'Evening', emoji: '🌌', title: 'The stars', description: 'Fire dancers, ocean, silence, gratitude. Moments you never forget.' },
    ],

    inclusions: [
      { _key: 'i1', emoji: '🏡', title: '7 Nights at House of Shakti', description: 'Your jungle home in Santa Teresa — open-air living surrounded by nature.' },
      { _key: 'i2', emoji: '🍽️', title: 'Organic Breakfasts & Dinners', description: 'Healthy, nourishing meals with tropical fruit and local produce daily.' },
      { _key: 'i3', emoji: '🧘', title: 'Daily Yoga, Meditation & Breathwork', description: 'Morning movement and mindfulness practices to ground and centre you.' },
      { _key: 'i4', emoji: '✨', title: 'Curated Workshops & Ceremonies', description: 'Transformative sessions designed for deep connection and self-discovery.' },
      { _key: 'i5', emoji: '⛵', title: 'Sailing Trip to Tortuga Island', description: 'A full day of snorkelling, white sand beaches, and open blue horizon.' },
      { _key: 'i6', emoji: '🌊', title: 'Montezuma Waterfall Hike', description: 'Hike through the jungle to swim in the pool at the base of the waterfall.' },
      { _key: 'i7', emoji: '🌌', title: 'Bioluminescence Kayaking', description: 'Paddle through glowing water in the dark ocean — pure magic.' },
      { _key: 'i8', emoji: '🔥', title: 'Fire Show at Rancho Itauna', description: 'Dancing, fire, laughter, and an unforgettable evening on the beach.' },
      { _key: 'i9', emoji: '🧊', title: 'Sauna & Ice Bath Access', description: 'Deep integration and recovery after workshops and movement.' },
      { _key: 'i10', emoji: '🎁', title: 'SOLSTICE Welcome Goodie Bag', description: 'A curated welcome gift to start your retreat journey.' },
      { _key: 'i11', emoji: '📋', title: 'Pre-Retreat Guide & Welcome Call', description: 'Everything you need to prepare, plus a personal welcome before you arrive.' },
    ],

    notIncluded: [
      'Flights to Costa Rica',
      'Airport transfers (taxi contact provided)',
      'Lunches — explore Santa Teresa locally',
      'Optional surf lessons (~$50)',
      'Personal spending & souvenirs',
    ],

    images: {
      hero: heroImage,
      intro: introImage,
      card: heroImage,
      bento: bentoImages.map((img, i) => ({
        ...img,
        _key: `bento${i}`,
      })),
      slideshow: slideshowImages,
    },

    founderStory:
      'I remember the exact moment. Sitting on a rock beside a waterfall deep in the jungle — barefoot, sun on my face, a dog I\'d never met curled beside me like we\'d known each other for years.\n\nI had been running for a long time. Between cities, between versions of myself, between who I thought I was supposed to be and who I could feel pulling at me from somewhere deeper. Costa Rica didn\'t care about any of that. The jungle has a way of stripping things back.\n\nHere, I found something I hadn\'t realised I was missing: stillness inside movement. I would wake before sunrise, walk barefoot to the beach while it was still dark, and simply breathe — watching the sky turn from black to pink to gold. And in that silence, I began to hear myself again.\n\nThe women I met changed me too. We cooked together, laughed until our sides ached, cried without explanation, held space for each other\'s truths without judgment. I understood then that transformation is not a solo journey — it happens in community, in the sacred circle of women willing to go there with you.\n\nCosta Rica gave me my heart back. And now I want to bring you here — to the place, the energy, and the medicine that changed everything for me. Because you deserve to feel what I felt on that rock beside that waterfall.',

    founderAttribution: 'Rebecca, Founder of Lync Events Madrid',

    bookingUrl: 'https://lyncevents.as.me/schedule/62219b14/appointment/91617255/calendar/11387680',
    brochure,
    contactEmail: 'lynccommunity@gmail.com',
  }

  const result = await client.create(doc)
  console.log(`\nDone! Created retreat document: ${result._id}`)
  console.log(`View it at: https://lyncevents.com/studio`)
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
