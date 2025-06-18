'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { Project } from '../types'
import PageTransition from './common/PageTransition'

// Pre-load projects data
let preloadedProjects: Project[] | null = null;

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(!preloadedProjects)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (preloadedProjects) {
          setProjects(preloadedProjects)
          setIsLoading(false)
          return
        }

        const response = await fetch('/api/projects')
        const data = await response.json()
        setProjects(data)
        preloadedProjects = data
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    )
  }

  const featuredProjects = projects.filter((p: Project) => p.isFeatured)
  const regularProjects = projects.filter((p: Project) => !p.isFeatured)

  return (
    <PageTransition className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <motion.div 
        className="backdrop-blur-sm rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.4
        }}
      >
        {featuredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.6
            }}
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.8 + index * 0.2
                  }}
                >
                  <ProjectCard project={project} isFeatured={true} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: featuredProjects.length > 0 ? 1 : 0.6
          }}
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: (featuredProjects.length > 0 ? 1.2 : 0.8) + index * 0.2
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