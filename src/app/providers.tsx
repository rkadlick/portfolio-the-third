"use client"; // Mark this as a Client Component

import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";
import { SectionContext } from "../context/SectionContext";

export function Providers({ children }: { children: React.ReactNode }) {
  // Avoid hydration mismatch by mounting ThemeProvider only on the client
  const [mounted, setMounted] = useState(false);
  const [currentSection, setCurrentSection] = useState<'home' | 'contact' | 'projects' | 'blog'>('home');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSectionChange = (section: 'home' | 'contact' | 'projects' | 'blog') => {
    setCurrentSection(section);
  };

  if (!mounted) {
    // Render nothing or a fallback on the server
    // to avoid hydration mismatch before client mount
    // You could return null or a simple fragment
    return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      <SectionContext.Provider value={{ currentSection, onSectionChange: handleSectionChange }}>
        {children}
      </SectionContext.Provider>
    </ThemeProvider>
  );
}