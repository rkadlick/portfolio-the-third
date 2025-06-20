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
                document.documentElement.setAttribute('data-theme', 'dark');
              } else if (theme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
              } else { // Fallback if no preference or invalid; defaults to light here
                document.documentElement.setAttribute('data-theme', 'light');
              }
            } catch (e) {}
          })();`
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
