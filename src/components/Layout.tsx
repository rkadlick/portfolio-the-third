import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ThemeToggle from './ThemeToggle'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
      <ThemeToggle />
    </div>
  )
} 