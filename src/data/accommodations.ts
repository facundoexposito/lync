export interface Feature {
  emoji: string
  title: string
  description: string
}

export interface RoomType {
  title: string
  description: string
  image: string
  features: string[]
}

export interface Amenity {
  title: string
  image: string
}

export interface ExclusiveOffer {
  title: string
  description: string
  promoCode: string
  discount: string
  cta: string
  href: string
}

/* ── Features ──────────────────────────────────────── */

export const features: Feature[] = [
  {
    emoji: '🏠',
    title: 'Private Studios',
    description:
      'Fully furnished private studios with en-suite bathrooms, kitchenettes, and study areas designed for student life.',
  },
  {
    emoji: '💪',
    title: 'State-of-the-Art Gym',
    description:
      'On-site fitness center with modern equipment so you can keep up your routine without leaving the building.',
  },
  {
    emoji: '📚',
    title: 'Study Spaces',
    description:
      'Dedicated quiet study rooms and co-working areas perfect for exam prep and group projects.',
  },
  {
    emoji: '👕',
    title: 'In-Building Laundry',
    description:
      'Convenient laundry facilities right in the building — no trips across town needed.',
  },
  {
    emoji: '🛋️',
    title: 'Social Lounges',
    description:
      'Stylish communal lounges, a cinema room, and sky lounge for relaxing and meeting fellow residents.',
  },
  {
    emoji: '🔒',
    title: '24/7 Security',
    description:
      'Round-the-clock security, CCTV, and secure key-card access for complete peace of mind.',
  },
  {
    emoji: '🎉',
    title: 'Social Events',
    description:
      'Regular resident events, from rooftop parties to cultural outings, making it easy to build your social circle.',
  },
]

/* ── Room Types ────────────────────────────────────── */

export const roomTypes: RoomType[] = [
  {
    title: 'Deluxe Studio',
    description:
      'The premium choice — a spacious studio with a large desk area, ample storage, and modern finishes throughout.',
    image: '/brand/COLLEGIATE/deluxe-studio.jpg',
    features: [
      'En-suite bathroom',
      'Double bed',
      'Large study desk',
      'Kitchenette with hob & fridge',
      'Ample wardrobe storage',
    ],
  },
  {
    title: 'Classic Studio',
    description:
      'Everything you need in a smart, compact layout. Ideal for students who want privacy without the premium price tag.',
    image: '/brand/COLLEGIATE/classic-studio.jpg',
    features: [
      'En-suite bathroom',
      'Single bed',
      'Study desk & chair',
      'Kitchenette',
      'Built-in storage',
    ],
  },
  {
    title: 'Classic Studio Plus',
    description:
      'A step up from the Classic with extra living space and enhanced furnishings for added comfort.',
    image: '/brand/COLLEGIATE/classic-studio-plus.jpg',
    features: [
      'En-suite bathroom',
      'Double bed',
      'Study desk & chair',
      'Kitchenette with hob & fridge',
      'Extra living space',
    ],
  },
]

/* ── Communal Spaces ───────────────────────────────── */

export const amenities: Amenity[] = [
  { title: 'Rooftop Terrace', image: '/brand/COLLEGIATE/rooftop.jpg' },
  { title: 'Gym', image: '/brand/COLLEGIATE/gym.jpg' },
  { title: 'Library', image: '/brand/COLLEGIATE/library.jpg' },
  { title: 'Cinema Room', image: '/brand/COLLEGIATE/cinema.jpg' },
  { title: 'Sky Lounge', image: '/brand/COLLEGIATE/sky-lounge.jpg' },
  { title: 'Lounge Bar', image: '/brand/COLLEGIATE/lounge-bar.jpg' },
]

/* ── Exclusive Offer ───────────────────────────────── */

export const exclusiveOffer: ExclusiveOffer = {
  title: 'Exclusive LYNC Discount',
  description:
    'Book through LYNC and get an exclusive discount on your Collegiate Madrid booking. Use our promo code at checkout or mention it when contacting Collegiate directly.',
  promoCode: 'CMC-LYN-200',
  discount: '€200 off',
  cta: 'Book Now',
  href: 'https://www.collegiatestudentliving.com/madrid/',
}
