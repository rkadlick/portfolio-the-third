'use client'

import { createContext, useContext } from 'react'

type Section = 'home' | 'contact' | 'projects' | 'blog'

interface SectionContextType {
  currentSection: Section
  onSectionChange: (section: Section) => void
}

export const SectionContext = createContext<SectionContextType>({
  currentSection: 'home',
  onSectionChange: () => {}
})

export const useSection = () => useContext(SectionContext) 