"use client"

import { useState } from 'react'
import Logo from './Logo'

interface NavbarProps {
  currentSection: 'home' | 'contact' | 'projects' | 'blog';
  onSectionChange: (section: 'home' | 'contact' | 'projects' | 'blog') => void;
}

const navigation = [
  { name: 'Projects', section: 'projects' as const },
  { name: 'Contact', section: 'contact' as const },
  { name: 'Blog', section: 'blog' as const },
]

export default function Navbar({ currentSection, onSectionChange }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-[22rem] sm:w-[36rem]">
          <div className="flex items-center justify-between h-full">
            {/* Logo - always visible in header */}
            <div className="flex items-center justify-center h-full sm:justify-start w-full sm:w-auto">
              <button 
                onClick={() => onSectionChange('home')}
                className={`nav-link ${currentSection === 'home' ? 'active' : ''}`}
              >
                <Logo />
              </button>
            </div>

            {/* Navigation Links - hidden on mobile */}
            <div className="hidden sm:flex items-center justify-center gap-1 h-full">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onSectionChange(item.section)}
                  className={`nav-link ${currentSection === item.section ? 'active' : ''}`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden absolute right-4 top-1/2 -translate-y-1/2">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-full text-[var(--muted)] 
                     hover:text-[var(--foreground)] hover:bg-[rgba(0,0,0,0.075)] cursor-pointer transition-all duration-300"
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
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  onSectionChange(item.section);
                  setIsMobileMenuOpen(false);
                }}
                className={`nav-link w-full ${currentSection === item.section ? 'active' : ''}`}
                style={{
                  margin: '0 auto',
                  width: '80%'
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
} 