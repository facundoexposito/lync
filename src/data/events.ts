import { Event } from '@/lib/types'

export const ACUITY_BOOKING_URL = 'https://lyncevents.as.me/schedule/62219b14'

export const events: Event[] = [
  {
    id: '1',
    title: 'Sunday Picnic in the Park',
    date: new Date('2026-04-12T12:00:00'),
    location: 'Retiro Park, Madrid',
    category: 'Social',
    spotsLeft: 20,
    image: '/brand/COMMUNITY/social-five-girls-restaurant-booth.webp',
    price: '€15.50',
    description:
      'Grab a blanket and join us for a relaxed Sunday picnic with great food, new friends, and sunshine in one of Madrid\'s most beautiful parks.',
    highlights: ['Snacks & drinks provided', 'Games & icebreakers', '2 hours'],
  },
  {
    id: '2',
    title: 'Sip & Shade: Coloring & Wine in the Park',
    date: new Date('2026-04-15T17:00:00'),
    location: 'Madrid Centro',
    category: 'Creative',
    spotsLeft: 10,
    image: '/brand/COMMUNITY/craft-night-group-table.webp',
    price: '€18.99',
    description:
      'Unwind with a glass of wine and adult coloring books in a gorgeous park setting. No artistic talent required — just good vibes.',
    highlights: ['Wine included', 'Art supplies provided', '2 hours'],
  },
  {
    id: '3',
    title: 'Internship Masterclass: CV Reviews & Strategy',
    date: new Date('2026-04-17T18:00:00'),
    location: 'Madrid Centro',
    category: 'Social',
    spotsLeft: 10,
    image: '/brand/COMMUNITY/workshop-talk-presenter.webp',
    price: '€32.99',
    description:
      'Level up your career with CV reviews, interview prep, and networking strategies led by industry professionals.',
    highlights: ['1-on-1 CV review', 'Interview techniques', '90 minutes'],
  },
  {
    id: '4',
    title: 'Yoga, Acupuncture & Gut Health in Nature',
    date: new Date('2026-04-19T10:00:00'),
    location: 'Casa de Campo, Madrid',
    category: 'Wellness',
    spotsLeft: 10,
    image: '/brand/COMMUNITY/yoga-class-tree-pose.webp',
    price: '€45.00',
    description:
      'A holistic wellness experience combining outdoor yoga, acupuncture tasters, and a gut health workshop — plus goodie bags to take home.',
    highlights: ['Goodie bags included', 'Expert-led sessions', '2 hours'],
  },
  {
    id: '5',
    title: 'Unlimited Wine, DJ Set & New Friends',
    date: new Date('2026-04-25T20:00:00'),
    location: 'Malasaña, Madrid',
    category: 'Nightlife',
    spotsLeft: 15,
    image: '/brand/COMMUNITY/social-bar-lounge-large-group.webp',
    price: '€28.99',
    description:
      'The ultimate girls\' night out — unlimited wine, a live DJ, and a room full of amazing women ready to dance and connect.',
    highlights: ['Unlimited wine', 'Live DJ', '2 hours'],
  },
  {
    id: '6',
    title: 'Rooftop Cocktail Class',
    date: new Date('2026-04-27T18:30:00'),
    location: 'Salamanca, Madrid',
    category: 'Social',
    spotsLeft: 10,
    image: '/brand/COMMUNITY/social-four-girls-cocktails.webp',
    price: '€42.99',
    description:
      'Learn to mix craft cocktails on a stunning rooftop terrace with panoramic views of Madrid\'s skyline.',
    highlights: ['3 cocktails included', 'Rooftop venue', '2 hours'],
  },
  {
    id: '7',
    title: 'Pizza Cooking Class & Prosecco on a Rooftop',
    date: new Date('2026-04-29T19:00:00'),
    location: 'Chamberí, Madrid',
    category: 'Creative',
    spotsLeft: 10,
    image: '/brand/COMMUNITY/sushi-event-group-photo.webp',
    price: '€38.99',
    description:
      'Roll up your sleeves and learn to make authentic Italian pizza from scratch — then enjoy your creation with prosecco on a rooftop.',
    highlights: ['Prosecco included', 'Take-home recipe', '2 hours'],
  },
]
