import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
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
      <body className={`${inter.className} bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col`}>
      <script id="next-themes-script" dangerouslySetInnerHTML={{
          __html: `(function() {
            try {
              var theme = localStorage.getItem('theme');
              if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.setAttribute('data-theme', 'dark'); // <-- SETS THE DARK THEME ATTRIBUTE
              } else if (theme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
              } else { // Fallback if no preference or invalid; assumes light as initial default
                document.documentElement.setAttribute('data-theme', 'light');
              }
            } catch (e) {}
          })();`
        }} />
        <style dangerouslySetInnerHTML={{
          __html: `
            /*
              Define the dark mode variables here. These will be available instantly
              as soon as the HTML is parsed. Only include variables that directly
              affect the background and foreground, to keep it minimal.
            */
            [data-theme="dark"] {
              --background: #1a1a1a; /* Your dark background color */
              --foreground: #ffffff; /* Your dark foreground color */
              /* You might also need card-bg if it's the primary background of your sections */
              --card-bg: #32323e;
              /* Add any other VARS that are critical to prevent the flash (e.g., primary text, button backgrounds) */
              /* You do NOT need to copy ALL vars from globals.css, just the ones that show up early. */
            }

            /* Optional, but often helpful: Explicitly set html/body background to use the variable */
            /* This makes sure the background applies even to the bare <body> before any React content */
            html, body {
              background-color: var(--background);
              color: var(--foreground);
            }
          `
        }} />
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
