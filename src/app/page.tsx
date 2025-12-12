import type { Metadata } from 'next'
import Home from '@/components/Home'

const title = 'Ryan Kadlick – Full Stack Developer'
const description =
  'Portfolio and blog of Ryan Kadlick, full stack developer focused on React, TypeScript, and Node.js.'
const url = 'https://ryanismy.name'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: 'Ryan Kadlick',
    type: 'website',
  },
}

export default function HomePage() {
  return <Home />
}
