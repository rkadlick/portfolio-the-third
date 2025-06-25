"use client";

import { motion } from "framer-motion";
import ParticleBackground from "./ParticleBackground";
import HolographicImage from "./HolographicImage";
import Link from "next/link";
import PageTransition from "./common/PageTransition";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function GitHubIcon() {
  return (
    <svg
      className="icon-spin w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      className="icon-spin w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="lg:fixed lg:inset-0 min-h-screen flex items-center justify-center overflow-y-auto lg:overflow-hidden">
      {!prefersReducedMotion && (
        <motion.div
          className="fixed inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 4,
            ease: [0.4, 0, 0.2, 1],
            delay: 0.8,
          }}
        >
          <ParticleBackground />
        </motion.div>
      )}

      <PageTransition className="pointer-events-none relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-8 py-24 lg:-translate-y-16">
        <div className="pointer-events-auto w-full lg:w-[60%] bg-[var(--card-bg)]/60 backdrop-blur-md rounded-2xl p-12">
          <motion.h1 
            className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.4
            }}
          >
            <span className="block mb-2">Hi, I&apos;m Ryan</span>
            <span
              className="block text-[var(--primary)]"
              style={{ fontSize: "0.85em" }}
            >
              Full Stack Developer
            </span>
          </motion.h1>

          <motion.p 
            className="mt-4 text-[var(--muted)] text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.6
            }}
          >
            As a Software Developer with a Master&apos;s in Computer Science, my
            expertise lies in crafting web applications using technologies such
            as React, Next.js, and a full-stack skillset encompassing Python and
            Java. I&apos;m also deeply interested in exploring the world of AI.
            Explore my diverse <Link href="/projects" className="special-link">projects</Link> to see my skills in action. I look
            forward to engaging with new opportunities and contributing my
            skills to exciting ventures.
          </motion.p>

          <motion.div 
            className="flex space-x-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.8
            }}
          >
            <a
              href="https://github.com/rkadlick"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
            >
              <span className="button-text" style={{ minWidth: "fit-content" }}>
                <GitHubIcon />
                <span>GitHub</span>
              </span>
            </a>
            <a
              href="https://linkedin.com/in/ryankadlick"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-secondary"
            >
              <span className="button-text" style={{ minWidth: "fit-content" }}>
                <LinkedInIcon />
                <span>LinkedIn</span>
              </span>
            </a>
          </motion.div>
        </div>

        <motion.div 
          className="pointer-events-auto mt-8 lg:mt-0 w-full max-w-[300px] lg:max-w-none lg:w-[40%] lg:ml-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 1
          }}
        >
          <div className="relative w-full max-w-md">
            <HolographicImage
              src="/profilePictureBackground.png"
              alt="Profile"
            />
          </div>
        </motion.div>
      </PageTransition>
    </div>
  );
}
