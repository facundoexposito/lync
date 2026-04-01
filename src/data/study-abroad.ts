export interface ServiceItem {
  title: string
  description: string
  bullets: string[]
  emoji: string
}

interface Section {
  heading?: string
  body: string[]
}

export interface ResourceItem {
  slug: string
  title: string
  description: string
  href: string
  emoji: string
  date: string
  image: string
  content: Section[]
}

/* ── For Students ─────────────────────────────────── */

export const studentServices: ServiceItem[] = [
  {
    title: 'University & Program Selection',
    description:
      'We help you find the perfect study abroad program that matches your academic goals and lifestyle preferences.',
    bullets: [
      'Personalized university shortlist based on your profile',
      'Degree and exchange program comparison',
      'Guidance on language requirements and entry criteria',
      'Insight into campus life and city culture',
    ],
    emoji: '🎓',
  },
  {
    title: 'Application Assistance',
    description:
      'From essays to documentation, we guide you through every step of the application process.',
    bullets: [
      'Application timeline and deadline tracking',
      'Personal statement and motivation letter review',
      'Document checklist and preparation support',
      'Follow-up and status monitoring with universities',
    ],
    emoji: '📝',
  },
  {
    title: 'Visa & Immigration Support',
    description:
      'Navigate Spanish visa requirements with confidence. We provide step-by-step guidance and documentation support.',
    bullets: [
      'Student visa application walkthrough',
      'Required document preparation and review',
      'Consulate appointment guidance',
      'TIE (foreign identity card) process support',
    ],
    emoji: '🛂',
  },
  {
    title: 'On-Ground Integration',
    description:
      'Land in Madrid with a community ready to welcome you. We help you settle in and feel at home from day one.',
    bullets: [
      'Airport pickup and initial orientation',
      'Accommodation guidance and neighborhood tips',
      'Social integration through LYNC events',
      'Ongoing support throughout your stay',
    ],
    emoji: '🤝',
  },
]

/* ── For Schools ──────────────────────────────────── */

export const schoolServices: ServiceItem[] = [
  {
    title: 'Informational Seminars',
    description:
      'We visit schools to provide students with firsthand insights about studying in Spain and Madrid student life.',
    bullets: [
      'Presentations on the Spanish education system',
      'Real student testimonials and Q&A sessions',
      'Information on scholarships and financial planning',
    ],
    emoji: '🎤',
  },
  {
    title: 'Counseling Sessions',
    description:
      'One-on-one and group counseling to help students make informed decisions about their European education journey.',
    bullets: [
      'Personalized academic path assessments',
      'Parent and family information sessions',
      'Follow-up support after initial counseling',
    ],
    emoji: '💬',
  },
  {
    title: 'European University Fairs',
    description:
      'We organize and participate in university fairs connecting students with top European institutions.',
    bullets: [
      'Access to representatives from leading universities',
      'Live application workshops',
      'Networking opportunities for students and parents',
    ],
    emoji: '🌍',
  },
]

/* ── Resources ────────────────────────────────────── */

export const resources: ResourceItem[] = [
  {
    slug: 'authorization-to-return',
    title: 'Authorization to Return to Spain',
    description:
      'Everything you need to know about obtaining your authorization to return while your TIE is being processed.',
    href: '/resources/authorization-to-return',
    emoji: '📋',
    date: '2025-04-10',
    image: '/brand/RESOURCES/authorization-to-return.jpg',
    content: [
      {
        body: [
          'If you\u2019re a student in Spain waiting for your TIE (Tarjeta de Identidad de Extranjero) to be processed, you might be wondering: can I leave the country and come back? The answer is yes \u2014 but you\u2019ll need an authorization to return (autorización de regreso) before you travel.',
          'This document is essential for any international student who needs to travel outside of Spain while their residency card is being processed or renewed. Without it, you could face serious issues re-entering the country.',
        ],
      },
      {
        heading: 'What Is the Authorization to Return?',
        body: [
          'The autorización de regreso is a temporary travel document issued by the Spanish immigration office (Oficina de Extranjería). It allows you to leave Spain and return while your TIE card is being processed, renewed, or modified.',
          'It\u2019s valid for 90 days from the date of issue, and you can only use it once. If you plan multiple trips, you\u2019ll need a new authorization each time.',
        ],
      },
      {
        heading: 'When Do You Need One?',
        body: [
          'You\u2019ll need an authorization to return if your initial TIE application is still being processed, if you\u2019re in the middle of renewing your TIE, or if your TIE has expired and you\u2019ve applied for a new one but haven\u2019t received it yet.',
          'If your TIE is currently valid and not expired, you don\u2019t need this document \u2014 your TIE itself serves as your re-entry permit.',
        ],
      },
      {
        heading: 'How to Apply',
        body: [
          'You\u2019ll need to book an appointment (cita previa) at your local Oficina de Extranjería. The required documents typically include your passport, a copy of your TIE application receipt (resguardo), proof of your travel plans (such as a flight booking), the completed EX-13 form, and the fee payment (Tasa 052).',
          'Appointments can be booked through the Spanish government\u2019s online portal. We recommend booking well in advance, as slots fill up quickly \u2014 especially during holiday seasons.',
        ],
      },
      {
        heading: 'Tips from Our Team',
        body: [
          'Always carry the authorization alongside your passport when traveling. Make copies of all your documents and keep them separate from the originals. If you\u2019re cutting it close on time, the airport immigration officers are familiar with this document, but having everything organized will speed up the process.',
          'Need help navigating the process? Our team at LYNC has guided hundreds of students through this exact situation. Book a free consultation and we\u2019ll walk you through every step.',
        ],
      },
    ],
  },
  {
    slug: 'tie-card-guide',
    title: 'TIE Card Guide',
    description:
      'Step-by-step guide to applying for your Tarjeta de Identidad de Extranjero in Madrid.',
    href: '/resources/tie-card-guide',
    emoji: '💳',
    date: '2025-04-08',
    image: '/brand/RESOURCES/tie-card-guide.png',
    content: [
      {
        body: [
          'The TIE (Tarjeta de Identidad de Extranjero) is your foreign identity card in Spain. Think of it as your official residency document \u2014 it proves your legal status, serves as your ID for banking and contracts, and allows you to travel freely within the Schengen zone.',
          'Every international student staying in Spain for more than six months needs to apply for a TIE within 30 days of arriving in the country. Here\u2019s how to get yours in Madrid.',
        ],
      },
      {
        heading: 'Step 1: Gather Your Documents',
        body: [
          'Before you book an appointment, make sure you have the following: your passport (original and copy), your student visa (the one stamped in your passport), the completed EX-17 application form, a recent passport-sized photo with a white background, proof of enrollment at your Spanish university, and the fee payment receipt (Tasa 790, code 012).',
          'Pro tip: Get your passport photos taken at any "fotos carnet" shop near a police station \u2014 they know the exact specifications required.',
        ],
      },
      {
        heading: 'Step 2: Book Your Appointment',
        body: [
          'You\u2019ll need a cita previa (prior appointment) at the Oficina de Extranjería in Madrid. You can book this through the Sede Electrónica website. Select "Madrid" as your province, then choose "Policía - Toma de Huellas (Expedición de Tarjeta)" as your procedure.',
          'Appointments are released periodically and tend to fill up fast. Check the portal first thing in the morning for the best availability. If you can\u2019t find a slot, keep refreshing \u2014 cancellations open up throughout the day.',
        ],
      },
      {
        heading: 'Step 3: Attend Your Appointment',
        body: [
          'Arrive at least 15 minutes early with all your original documents and copies. You\u2019ll provide your fingerprints and submit your paperwork. The officer will give you a receipt (resguardo) with an estimated pickup date \u2014 typically 30 to 45 days later.',
          'Keep this receipt safe. It serves as temporary proof of your residency status while your TIE is being produced.',
        ],
      },
      {
        heading: 'Step 4: Pick Up Your TIE',
        body: [
          'You\u2019ll need another appointment to pick up your finished TIE card. Bring your passport and the resguardo receipt. The card is valid for the duration of your student visa and can be renewed if you extend your studies.',
          'Once you have your TIE, you can open a Spanish bank account, sign rental contracts, and travel within the Schengen area without needing additional documentation. It\u2019s one of the most important documents you\u2019ll have during your time in Spain.',
        ],
      },
    ],
  },
  {
    slug: 'ie-university-application-guide',
    title: 'IE University Application Guide',
    description:
      'A comprehensive walkthrough for applying to IE University, one of Spain\'s top-ranked institutions.',
    href: '/resources/ie-university-application-guide',
    emoji: '📄',
    date: '2025-04-05',
    image: '/brand/RESOURCES/ie-university-application-guide.jpg',
    content: [
      {
        body: [
          'IE University is one of Spain\u2019s most prestigious international universities, with campuses in Madrid and Segovia. Known for its innovative teaching methods and diverse student body, it consistently ranks among the top business schools and universities in Europe.',
          'Whether you\u2019re applying for an undergraduate degree, a master\u2019s program, or an MBA, here\u2019s everything you need to know about the application process.',
        ],
      },
      {
        heading: 'Programs and Deadlines',
        body: [
          'IE offers programs in business, law, architecture, technology, and the humanities. Undergraduate admissions operate on a rolling basis, meaning the earlier you apply, the better your chances. Master\u2019s and MBA programs typically have multiple intake rounds throughout the year.',
          'We recommend submitting your application at least two to three months before your preferred start date. Some popular programs fill up quickly, so early applications are strongly encouraged.',
        ],
      },
      {
        heading: 'What You\u2019ll Need',
        body: [
          'The typical application requires your academic transcripts, a personal essay or motivation letter, letters of recommendation (usually one or two), proof of English proficiency (TOEFL, IELTS, or equivalent), and a copy of your passport.',
          'For graduate programs, you may also need GMAT or GRE scores, a CV or resume, and evidence of professional experience depending on the specific program.',
        ],
      },
      {
        heading: 'The Admissions Interview',
        body: [
          'One of the unique aspects of IE\u2019s admissions process is the personal interview. This can be conducted in person, via video call, or through their innovative video essay format where you record responses to prompts.',
          'The interview focuses on your motivation, leadership potential, and cultural fit. Be prepared to talk about why you chose IE specifically, your career goals, and how you plan to contribute to the IE community.',
        ],
      },
      {
        heading: 'Scholarships and Financial Aid',
        body: [
          'IE offers a range of merit-based scholarships for international students. These include the IE Talent and Innovation Scholarships, the IE Foundation Scholarships, and several program-specific awards. Scholarship applications are typically submitted alongside your main application.',
          'If you\u2019re considering IE, our team can help you navigate the application, review your essays, and prepare for your interview. Reach out for a free consultation to get started.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-study-abroad-in-madrid',
    title: 'How to Study Abroad in Madrid',
    description:
      'Your complete guide to choosing a program, preparing your move, and thriving in Madrid.',
    href: '/resources/how-to-study-abroad-in-madrid',
    emoji: '📍',
    date: '2025-04-01',
    image: '/brand/RESOURCES/how-to-study-abroad-in-madrid.jpg',
    content: [
      {
        body: [
          'Madrid is one of Europe\u2019s most exciting cities for international students. With world-class universities, a vibrant cultural scene, affordable living, and sunshine most of the year, it\u2019s easy to see why thousands of students choose Madrid as their study abroad destination.',
          'But planning a move abroad can feel overwhelming. This guide covers everything you need to know \u2014 from choosing the right program to settling into your new home.',
        ],
      },
      {
        heading: 'Choosing the Right Program',
        body: [
          'Madrid is home to several top-ranked universities including Universidad Complutense de Madrid, IE University, Universidad Carlos III, and Universidad Autónoma de Madrid. Each offers exchange programs, full degree programs, and short-term study options for international students.',
          'Think about what matters most to you: program reputation, language of instruction (many programs are offered in English), campus location, and the specific courses or specializations available. Your choice should align with both your academic and personal goals.',
        ],
      },
      {
        heading: 'Visa and Legal Requirements',
        body: [
          'If you\u2019re a non-EU citizen staying longer than 90 days, you\u2019ll need a student visa. The application process starts at your country\u2019s Spanish consulate and typically requires an acceptance letter from your university, proof of financial means, health insurance, and a clean background check.',
          'Once you arrive in Spain, you have 30 days to apply for your TIE (foreign identity card). We have a dedicated guide on the TIE process if you need more details.',
        ],
      },
      {
        heading: 'Finding Accommodation',
        body: [
          'Most students in Madrid choose between shared apartments (pisos compartidos), student residences (residencias), or homestays. Neighborhoods popular with students include Moncloa, Malasaña, Lavapiés, and Chamberí \u2014 all well-connected by metro and bus.',
          'Start your housing search at least two months before your arrival. Platforms like Idealista, Spotahome, and HousingAnywhere are good starting points. Be cautious of scams and never pay a deposit before seeing the apartment in person or through a verified video tour.',
        ],
      },
      {
        heading: 'Making the Most of Your Time',
        body: [
          'Studying abroad is about more than academics. Madrid offers an incredible food scene, world-famous museums (the Prado, Reina Sofía, Thyssen), parks like Retiro, and easy weekend trips to cities like Toledo, Segovia, and Barcelona.',
          'Joining communities like LYNC is one of the best ways to meet other international students and build a social circle from day one. Don\u2019t wait for friendships to happen \u2014 put yourself out there, attend events, and embrace the experience.',
        ],
      },
    ],
  },
  {
    slug: 'health-insurance-for-students',
    title: 'Health Insurance for Students',
    description:
      'Compare insurance options and understand what coverage you need as an international student in Spain.',
    href: '/resources/health-insurance-for-students',
    emoji: '🏥',
    date: '2025-03-28',
    image: '/brand/RESOURCES/health-insurance-for-students.jpg',
    content: [
      {
        body: [
          'Health insurance is a mandatory requirement for obtaining a Spanish student visa \u2014 and it\u2019s also essential for your peace of mind while living abroad. Understanding your options can save you money and ensure you\u2019re properly covered.',
          'Spain has an excellent public healthcare system, but as an international student, your access to it depends on your visa type and home country. Here\u2019s what you need to know.',
        ],
      },
      {
        heading: 'Insurance Requirements for Your Visa',
        body: [
          'The Spanish consulate requires that your health insurance meets specific criteria: it must be issued by a company operating in Spain, provide full coverage without copays or deductibles, cover the entire duration of your stay, and include repatriation coverage.',
          'Travel insurance or policies with high deductibles are typically not accepted. Make sure your policy explicitly states "sin copagos" (no copays) to avoid issues at the consulate.',
        ],
      },
      {
        heading: 'Popular Insurance Providers',
        body: [
          'Several insurance companies specialize in coverage for international students in Spain. Popular options include Adeslas, Sanitas, MAPFRE, and Asisa. These providers offer student-specific plans that meet visa requirements and typically cost between 40 to 80 euros per month.',
          'Some universities also offer group insurance plans at discounted rates. Check with your university\u2019s international office before purchasing your own policy \u2014 you might save money by joining a group plan.',
        ],
      },
      {
        heading: 'Public vs. Private Healthcare',
        body: [
          'Spain\u2019s public healthcare system (Seguridad Social) is excellent, but access for students varies. EU citizens with a European Health Insurance Card (EHIC) can use public services. Non-EU students generally rely on private insurance, though some regions allow students to register with the public system after arriving.',
          'Private insurance gives you access to shorter wait times, English-speaking doctors, and more flexibility in choosing specialists. For most international students, private insurance is the most practical option.',
        ],
      },
      {
        heading: 'What to Do in an Emergency',
        body: [
          'In an emergency, go directly to the nearest hospital emergency room (urgencias) \u2014 they are required to treat you regardless of your insurance status. For non-emergencies, call your insurance provider\u2019s helpline to find a nearby clinic or doctor.',
          'Save your insurance company\u2019s emergency number in your phone before you arrive. Keep a digital and physical copy of your insurance card and policy documents. If you need help choosing the right plan, our team can guide you through the options during a free consultation.',
        ],
      },
    ],
  },
  {
    slug: 'student-metro-card-abono-joven',
    title: 'Student Metro Card (Abono Joven)',
    description:
      'How to get the discounted youth metro pass and navigate Madrid\'s public transport system.',
    href: '/resources/student-metro-card-abono-joven',
    emoji: '🚇',
    date: '2025-03-25',
    image: '/brand/RESOURCES/student-metro-card-abono-joven.jpg',
    content: [
      {
        body: [
          'Madrid has one of the best public transport systems in Europe, and if you\u2019re under 26, you can take advantage of the Abono Joven \u2014 a monthly pass that gives you unlimited travel on metro, bus, and commuter trains (Cercanías) for just 20 euros per month.',
          'It\u2019s one of the best deals in the city and an absolute must-have for any student living in Madrid. Here\u2019s how to get yours.',
        ],
      },
      {
        heading: 'What Is the Abono Joven?',
        body: [
          'The Abono Joven (also called the Abono Transporte Joven) is a discounted monthly travel pass available to anyone aged 7 to 25 living in the Community of Madrid. For 20 euros per month, you get unlimited rides on all Madrid metro lines, all EMT city buses, Cercanías commuter trains, and light rail within your zone.',
          'The standard youth pass covers Zone A (central Madrid), which is enough for most students. If you live further out, you can purchase a pass that includes additional zones for a small extra cost.',
        ],
      },
      {
        heading: 'How to Get Your Card',
        body: [
          'First, you\u2019ll need a Tarjeta de Transporte Público (public transport card). You can apply for one online through the Consorcio Regional de Transportes de Madrid website or in person at designated metro stations and tobacco shops (estancos).',
          'To apply, you\u2019ll need your passport or TIE, a passport-sized photo, and proof of your address in Madrid (an empadronamiento certificate or a utility bill). The card itself costs a small one-time fee and is valid for 10 years.',
        ],
      },
      {
        heading: 'Loading Your Monthly Pass',
        body: [
          'Once you have your transport card, you can load the Abono Joven at any metro station ticket machine, online through the CRTM website, or via the Madrid Mobility 360 app on your phone.',
          'The pass renews monthly and is charged to your card. You can set up automatic renewal or load it manually each month. The pass activates on the first day of the month regardless of when you purchase it, so buying it mid-month means you\u2019re paying for a partial month.',
        ],
      },
      {
        heading: 'Navigating Madrid Like a Local',
        body: [
          'Madrid\u2019s metro system has 13 lines covering the entire city, running from around 6 AM to 1:30 AM daily. For late nights, the "búho" (night bus) network takes over with routes across the city.',
          'Download the Madrid Metro app or Google Maps for real-time navigation. Most students find that between the metro and bus system, you can get anywhere in Madrid quickly and affordably. A car is completely unnecessary \u2014 and honestly, parking is a nightmare anyway.',
        ],
      },
    ],
  },
]

export function getResource(slug: string): ResourceItem | undefined {
  return resources.find((r) => r.slug === slug)
}
