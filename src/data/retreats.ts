export interface Retreat {
  id: string
  title: string
  destination: string
  dates: string
  duration: string
  price: string
  image: string
  description: string
  highlights: string[]
}

export interface Inclusion {
  emoji: string
  title: string
  description: string
}

export const RETREATS_BOOKING_URL = 'https://lyncevents.as.me/schedule/62219b14'

export const retreats: Retreat[] = [
  {
    id: '1',
    title: 'Mediterranean Coastal Escape',
    destination: 'Costa Brava, Spain',
    dates: 'June 20 – 23, 2026',
    duration: '4 days / 3 nights',
    price: '€499',
    image: '/brand/COMMUNITY/run-club-group-viewpoint-panorama.webp',
    description:
      'A four-day coastal retreat with beach yoga, cliff-side hikes, and sunset dinners overlooking the Mediterranean. The perfect way to recharge and connect.',
    highlights: [
      'Beach yoga sessions',
      'Guided coastal hikes',
      'Sunset dinner by the sea',
      'Group excursion to hidden coves',
    ],
  },
  {
    id: '2',
    title: 'Algarve Adventure',
    destination: 'Algarve, Portugal',
    dates: 'September 12 – 15, 2026',
    duration: '4 days / 3 nights',
    price: '€549',
    image: '/brand/COMMUNITY/run-club-viewpoint-arms-raised.webp',
    description:
      'Explore dramatic cliffs, hidden beaches, and charming fishing villages with your LYNC crew. Adventure, wellness, and unforgettable sunsets.',
    highlights: [
      'Cliff-top morning yoga',
      'Kayaking to sea caves',
      'Vineyard wine tasting',
      'Farewell beach bonfire',
    ],
  },
  {
    id: '3',
    title: 'Mountain Wellness Retreat',
    destination: 'Mallorca, Spain',
    dates: 'November 7 – 10, 2026',
    duration: '4 days / 3 nights',
    price: '€479',
    image: '/brand/COMMUNITY/pilates-group-laughing.webp',
    description:
      'Disconnect and recharge in the Tramuntana mountains with daily yoga, olive grove walks, and cozy group dinners in a rustic finca.',
    highlights: [
      'Daily yoga & meditation',
      'Olive grove & vineyard walks',
      'Cooking class with local chef',
      'Stargazing night',
    ],
  },
]

export const inclusions: Inclusion[] = [
  {
    emoji: '🏠',
    title: 'Accommodation',
    description:
      'Beautiful shared villas and boutique stays, hand-picked for comfort and vibes.',
  },
  {
    emoji: '🧭',
    title: 'Curated Activities',
    description:
      'From yoga to city tours, every day is designed to be memorable and fun.',
  },
  {
    emoji: '🍽️',
    title: 'Meals & Drinks',
    description:
      'Group dinners, local food tours, and welcome drinks included.',
  },
  {
    emoji: '👯',
    title: 'Community',
    description:
      'Travel with an incredible group of women who become lifelong friends.',
  },
  {
    emoji: '📸',
    title: 'Photo Memories',
    description:
      'Professional photos throughout the trip so you can live in the moment.',
  },
  {
    emoji: '🚐',
    title: 'Transport',
    description:
      'Airport transfers and all transport between activities covered.',
  },
]
