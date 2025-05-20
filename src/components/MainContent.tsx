'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Home from './Home'
import Contact from './Contact'
import Projects from './Projects'
import Navbar from './common/Navbar'
import Blog from './blog/Blog'
import { useSection } from '../context/SectionContext'

export default function MainContent() {
  const { currentSection, onSectionChange } = useSection();
  const [previousSection, setPreviousSection] = useState<'home' | 'contact' | 'projects' | 'blog'>('home');

  const handleSectionChange = (section: 'home' | 'contact' | 'projects' | 'blog') => {
    setPreviousSection(currentSection);
    onSectionChange(section);
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'contact':
        return <Contact fromSection={previousSection} />;
      case 'projects':
        return <Projects fromSection={previousSection} />;
      case 'blog':
        return <Blog fromSection={previousSection} />;
      default:
        return <Home fromSection={previousSection} />;
    }
  };

  return (
    <>
      <Navbar currentSection={currentSection} onSectionChange={handleSectionChange} />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto w-full flex items-center">
          <AnimatePresence mode="wait">
            {renderSection()}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
} 