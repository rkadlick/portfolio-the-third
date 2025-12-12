'use client'

import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { Project } from '../types'
import PageTransition from './common/PageTransition'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function Projects({ projects }: { projects: Project[] }) {
  const prefersReducedMotion = useReducedMotion()
  const baseInitial = prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }
  const baseAnimate = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
  const baseTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.05 }

  const featuredProjects = projects.filter((p: Project) => p.isFeatured)
  const regularProjects = projects.filter((p: Project) => !p.isFeatured)

  if (!projects.length) {
    return (
      <PageTransition className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
        <motion.div 
          className="backdrop-blur-sm rounded-2xl p-8"
          initial={baseInitial}
          animate={baseAnimate}
          transition={baseTransition}
        >
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <h2 className="text-2xl font-bold text-[var(--foreground)]">No projects yet</h2>
              <p className="text-sm text-[var(--muted)]">Check back later for updates.</p>
            </div>
          </div>
        </motion.div>
      </PageTransition>
    )
  }

  return (
    <PageTransition className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <motion.div 
        className="backdrop-blur-sm rounded-2xl p-8"
        initial={baseInitial}
        animate={baseAnimate}
        transition={baseTransition}
      >
        {featuredProjects.length > 0 && (
          <motion.div
            initial={baseInitial}
            animate={baseAnimate}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
        }
          >
            <div className="flex items-center mb-12">
              <div className="flex-grow h-[1px] bg-[var(--border)]"></div>
              <h2 className="text-2xl font-bold px-4 text-[var(--foreground)]">Featured Projects</h2>
              <div className="flex-grow h-[1px] bg-[var(--border)]"></div>
            </div>
            <div className="grid grid-cols-1 gap-8 mb-16">
              {featuredProjects.map((project: Project, index: number) => (
                <motion.div 
                  key={project._id}
                  initial={baseInitial}
                  animate={baseAnimate}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.35,
                    ease: [0.22, 1, 0.36, 1],
                    delay: prefersReducedMotion ? 0 : 0.15 + index * 0.05,
                  }}
                >
                  <ProjectCard project={project} isFeatured={true} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        <motion.div
          initial={baseInitial}
          animate={baseAnimate}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                  delay: featuredProjects.length > 0 ? 0.2 : 0.1,
                }
          }
        >
          <div className="flex items-center mb-12">
            <div className="flex-grow h-[1px] bg-[var(--border)]"></div>
            <h2 className="text-2xl font-bold px-4 text-[var(--foreground)]">Other Projects</h2>
            <div className="flex-grow h-[1px] bg-[var(--border)]"></div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {regularProjects.map((project: Project, index: number) => (
              <motion.div 
                key={project._id}
                initial={baseInitial}
                animate={baseAnimate}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.35,
                  ease: [0.22, 1, 0.36, 1],
                  delay: prefersReducedMotion ? 0 : (featuredProjects.length > 0 ? 0.25 : 0.15) + index * 0.05,
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </PageTransition>
  )
} 