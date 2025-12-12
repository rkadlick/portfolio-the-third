import type { Metadata } from 'next'
import Contact from '@/components/Contact'

const baseUrl = 'https://ryanismy.name'
const title = 'Contact – Ryan Kadlick'
const description = 'Get in touch with Ryan Kadlick for collaboration or opportunities.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseUrl}/contact` },
  openGraph: {
    title,
    description,
    url: `${baseUrl}/contact`,
    siteName: 'Ryan Kadlick',
    type: 'website',
  },
}

export default function ContactPage() {
  return <Contact />
} 