// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Your main CSS import
import { Providers } from "./providers";
import ThemeToggle from "../components/common/ThemeToggle";
import Navbar from "../components/common/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ryan Kadlick - Full Stack Developer",
  description: "Portfolio and blog of Ryan Kadlick, a full stack developer specializing in React, TypeScript, and Node.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* 
        This script should be placed directly here in the <body> tag in layout.tsx.
        Next.js will automatically lift it to the <head> section during the build process
        if it's a direct child of <html> or nested within components that render to head.
        Placing it directly within <html> is more explicit for head placement.
      */}
      <script id="next-themes-script" dangerouslySetInnerHTML={{
          __html: `(function() {
            try {
              var theme = localStorage.getItem('theme');
              var resolvedTheme = 'light'; // Default fallback, matches your root CSS
              if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                resolvedTheme = 'dark';
              } else if (theme === 'light') {
                resolvedTheme = 'light';
              }

              // Apply data-theme attribute
              document.documentElement.setAttribute('data-theme', resolvedTheme);

              // Inject critical inline styles to prevent FOUC
              var style = document.createElement('style');
              style.setAttribute('id', 'next-themes-inline-css'); // Give it an ID for potential debugging/removal
              style.appendChild(document.createTextNode(\`
                html { color-scheme: \${resolvedTheme}; }
                body {
                  background-color: \${resolvedTheme === 'dark' ? '#1a1a1a' : '#ffffff'};
                  color: \${resolvedTheme === 'dark' ? '#ffffff' : '#1a1a1a'};
                }
              \`));
              document.head.appendChild(style);

            } catch (e) {
              console.error('Error applying theme:', e); // Add error logging for debugging
            }
          })();`
        }} />

      <body className={`${inter.className} bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="flex-grow pt-24">
              {children}
          </main>
          <ThemeToggle />
        </Providers>
      </body>
    </html>
  );
}