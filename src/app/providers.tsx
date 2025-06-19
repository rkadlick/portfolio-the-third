// app/providers.tsx (REFINED SOLUTION)
"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
 
  return (
  
<ThemeProvider
      attribute="data-theme" // Matches what Tailwind expects
      defaultTheme="system"  // Your preferred default
      enableSystem           // Allows system preference detection
      enableColorScheme      // Helps browser UI adapt
    >
      {children}
    </ThemeProvider>
  );
}