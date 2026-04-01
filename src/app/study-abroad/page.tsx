'use client'

import { useState } from 'react'
import { CtaMotionLink } from '@/components/ui/cta-hover'
import { GraduationCap, Building2, ChevronDown, ArrowRight } from 'lucide-react'

const studentServices = [
  {
    title: 'University & Program Selection',
    desc: 'We help you find the perfect study abroad program that matches your academic goals and lifestyle preferences.',
  },
  {
    title: 'Application Assistance',
    desc: 'From essays to documentation, we guide you through every step of the application process.',
  },
  {
    title: 'Visa and Immigration Support',
    desc: 'Navigate Spanish visa requirements with confidence. We provide step-by-step guidance and documentation support.',
  },
  {
    title: 'On-Ground Support & Integration',
    desc: 'Land in Madrid with a friend group ready to welcome you. We help you settle in and feel at home from day one.',
  },
]

const schoolServices = [
  {
    title: 'Informational Seminars',
    desc: 'We visit schools to provide students with firsthand insights about studying in Spain and Madrid student life.',
  },
  {
    title: 'Counseling Sessions',
    desc: 'One-on-one and group counseling to help students make informed decisions about their European education journey.',
  },
  {
    title: 'European University Fairs',
    desc: 'We organize and participate in university fairs connecting students with top European institutions.',
  },
]

export default function StudyAbroadPage() {
  const [openSection, setOpenSection] = useState<'students' | 'schools' | null>('students')

  return (
    <>
      <section className="py-16 md:py-24 bg-cream text-center">
        <div className="mx-auto max-w-6xl px-5">
          <h1 className="mb-6 font-display text-5xl font-semibold uppercase tracking-normal md:text-6xl">
            Study Abroad in Madrid
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Expert guidance and community support to make your Madrid study abroad experience unforgettable.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <button
            onClick={() => setOpenSection(openSection === 'students' ? null : 'students')}
            className="w-full flex items-center justify-between p-6 bg-cream rounded-2xl hover:bg-lync/10 transition-colors mb-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-lync rounded-full flex items-center justify-center">
                <GraduationCap className="text-white" size={24} />
              </div>
              <h2 className="font-display text-3xl font-semibold uppercase tracking-normal text-dark">For Students</h2>
            </div>
            <ChevronDown
              size={24}
              className={`text-dark transition-transform ${
                openSection === 'students' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSection === 'students' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-fade-up">
              {studentServices.map((service, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-cream p-6 rounded-2xl"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <h3 className="mb-3 font-display text-xl font-semibold uppercase tracking-normal">{service.title}</h3>
                  <p className="text-muted">{service.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-0 md:py-0">
        <div className="mx-auto max-w-6xl px-5">
          <button
            onClick={() => setOpenSection(openSection === 'schools' ? null : 'schools')}
            className="w-full flex items-center justify-between p-6 bg-cream rounded-2xl hover:bg-lync/10 transition-colors mb-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-dark rounded-full flex items-center justify-center">
                <Building2 className="text-white" size={24} />
              </div>
              <h2 className="font-display text-3xl font-semibold uppercase tracking-normal text-dark">For Schools</h2>
            </div>
            <ChevronDown
              size={24}
              className={`text-dark transition-transform ${
                openSection === 'schools' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSection === 'schools' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-up">
              {schoolServices.map((service, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-cream p-6 rounded-2xl"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <h3 className="mb-3 font-display text-xl font-semibold uppercase tracking-normal">{service.title}</h3>
                  <p className="text-muted">{service.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-lync text-white text-center">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="mb-6 font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Get in touch to learn more about how LYNC can support your study abroad experience.
          </p>
          <CtaMotionLink
            href="/about"
            className="inline-flex items-center gap-2 bg-white text-dark font-semibold px-8 py-4 rounded-full text-lg hover:bg-cream transition-colors"
          >
            Contact Us <ArrowRight size={20} />
          </CtaMotionLink>
        </div>
      </section>
    </>
  )
}
