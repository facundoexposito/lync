'use client'

import { useState } from 'react'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { GraduationCap, Building2, ChevronDown } from 'lucide-react'
import type { Metadata } from 'next'

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
      {/* Hero */}
      <Section background="cream" className="text-center">
        <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
          Study Abroad in Madrid
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Expert guidance and community support to make your Madrid study abroad experience unforgettable.
        </p>
      </Section>

      {/* For Students */}
      <Section background="white">
        <button
          onClick={() => setOpenSection(openSection === 'students' ? null : 'students')}
          className="w-full flex items-center justify-between p-6 bg-lync-cream rounded-2xl hover:bg-lync-blue/10 transition-colors mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-lync-blue rounded-full flex items-center justify-center">
              <GraduationCap className="text-white" size={24} />
            </div>
            <h2 className="font-display text-3xl font-bold text-lync-navy">For Students</h2>
          </div>
          <ChevronDown
            size={24}
            className={`text-lync-navy transition-transform ${
              openSection === 'students' ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSection === 'students' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 fade-in">
            {studentServices.map((service, i) => (
              <div
                key={i}
                className="bg-white border-2 border-lync-cream p-6 rounded-2xl"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <h3 className="font-display text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* For Schools */}
      <Section background="white" className="pt-0">
        <button
          onClick={() => setOpenSection(openSection === 'schools' ? null : 'schools')}
          className="w-full flex items-center justify-between p-6 bg-lync-cream rounded-2xl hover:bg-lync-blue/10 transition-colors mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-lync-navy rounded-full flex items-center justify-center">
              <Building2 className="text-white" size={24} />
            </div>
            <h2 className="font-display text-3xl font-bold text-lync-navy">For Schools</h2>
          </div>
          <ChevronDown
            size={24}
            className={`text-lync-navy transition-transform ${
              openSection === 'schools' ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSection === 'schools' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 fade-in">
            {schoolServices.map((service, i) => (
              <div
                key={i}
                className="bg-white border-2 border-lync-cream p-6 rounded-2xl"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <h3 className="font-display text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* CTA */}
      <Section background="navy" className="text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Get in touch to learn more about how LYNC can support your study abroad experience.
        </p>
        <Button size="lg" variant="secondary">
          Contact Us
        </Button>
      </Section>
    </>
  )
}
