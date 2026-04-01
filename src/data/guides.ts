export interface Guide {
  title: string
  description: string
  image: string
  price: string
  compareAt: string
  href: string
  highlights: string[]
}

export const guides: Guide[] = [
  {
    title: 'The Ultimate Madrid Starter Pack',
    description:
      'Your complete guide to moving and living in Madrid. Covers first steps when you land, packing checklists, and hard-won tips from 4 years of Madrid living.',
    image: '/brand/GUIDES/starter-pack.png',
    price: '$19.99',
    compareAt: '$39.99',
    href: 'https://lync-events.myshopify.com/products/the-ultimate-madrid-starter-pack-your-complete-guide-to-moving-living-in-madrid',
    highlights: [
      'Step-by-step relocation roadmap',
      'Packing & pre-arrival checklists',
      'Neighborhood breakdown',
      'Banking, healthcare & admin setup',
    ],
  },
  {
    title: 'The Ultimate Madrid Guide',
    description:
      'Best activities, restaurants, cafes, and more — community-curated insider recommendations from 4,000+ women covering dining, neighborhoods, and hidden gems.',
    image: '/brand/GUIDES/madrid-guide.png',
    price: '$20.00',
    compareAt: '$35.99',
    href: 'https://lync-events.myshopify.com/products/the-ultimate-madrid-guide-best-activities-restaurants-cafes-more',
    highlights: [
      'Top restaurants & cafes by neighborhood',
      'Best activities & day plans',
      'Hidden gems only locals know',
      'Curated by 4,000+ community members',
    ],
  },
  {
    title: 'IE University Application Guide',
    description:
      'Step-by-step ebook to maximize your chances. Includes a 10-step application plan, interview prep, 115+ practice questions, and scholarship strategies.',
    image: '/brand/GUIDES/ie-guide.png',
    price: '$29.99',
    compareAt: '$50.99',
    href: 'https://lync-events.myshopify.com/products/ie-university-application-step-by-step-ebook-to-maximize-your-chances',
    highlights: [
      '10-step application plan',
      '115+ interview practice questions',
      'Scholarship strategies',
      'From a 75% scholarship recipient',
    ],
  },
]
