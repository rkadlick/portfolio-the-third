import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "../components/common/Footer";
import ThemeToggle from "../components/common/ThemeToggle";

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
        <Providers>
          <main className="flex-grow pt-24">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          <Footer />
          <ThemeToggle />
        </Providers>
      </body>
    </html>
  );
}
