"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'

const navigation = [
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isCurrentPath = (path: string) => {
    return pathname === path
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Background container */}
      <div className="fixed top-0 left-1/2 h-[4.5rem] w-full -translate-x-1/2 
        border border-white/[0.1] dark:border-white/[0.05]
        bg-[var(--card-bg)]/80 dark:bg-[var(--card-bg)]/75
        shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] dark:shadow-[0_15px_40px_-5px_rgba(0,0,0,0.5)]
        backdrop-blur-[0.5rem] 
        sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full">
      </div>

      <nav className="relative h-[4.5rem] sm:h-[3.25rem] sm:mt-6">
        {/* Desktop Navigation */}
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-[22rem] sm:w-[36rem]">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link 
              href="/" 
              className={`flex items-center justify-center h-full px-4 transition-colors duration-200 relative
                ${isCurrentPath('/') 
                  ? 'text-[var(--foreground)]' 
                  : 'text-[var(--muted)] hover:text-[var(--muted-hover)]'}`}
            >
              <Logo />
              {isCurrentPath('/') && (
                <span className="absolute inset-0 -z-10 rounded-full bg-[var(--background)]"></span>
              )}
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center justify-center gap-1 h-full">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center justify-center h-[2.75rem] px-4 text-sm font-medium transition-colors duration-200
                    ${isCurrentPath(item.href)
                      ? 'text-[var(--foreground)]'
                      : 'text-[var(--muted)] hover:text-[var(--muted-hover)]'}`}
                >
                  {item.name}
                  {isCurrentPath(item.href) && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-[var(--background)]"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Blog Link */}
            <Link
              href="/blog"
              className={`flex items-center justify-center h-[2.75rem] px-4 rounded-full text-sm font-medium transition-colors duration-200
                ${isCurrentPath('/blog')
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-[var(--muted)] hover:text-blue-600 hover:bg-blue-50'}`}
            >
              Blog
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden absolute right-4 top-1/2 -translate-y-1/2">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-full text-[var(--muted)] 
                     hover:text-[var(--muted-hover)] hover:bg-[var(--background)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {!isMobileMenuOpen ? (
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-[var(--card-bg)]/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-full text-base font-medium transition-colors duration-200
                ${isCurrentPath('/')
                  ? 'bg-[var(--background)] text-[var(--foreground)]'
                  : 'text-[var(--muted)] hover:text-[var(--muted-hover)] hover:bg-[var(--background)]'}`}
            >
              Home
            </Link>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-full text-base font-medium transition-colors duration-200
                  ${isCurrentPath(item.href)
                    ? 'bg-[var(--background)] text-[var(--foreground)]'
                    : 'text-[var(--muted)] hover:text-[var(--muted-hover)] hover:bg-[var(--background)]'}`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/blog"
              className={`block px-3 py-2 rounded-full text-base font-medium transition-colors duration-200
                ${isCurrentPath('/blog')
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-[var(--muted)] hover:text-blue-600 hover:bg-blue-50'}`}
            >
              Blog
            </Link>
          </div>
        </div>
      )}
    </header>
  )
} 