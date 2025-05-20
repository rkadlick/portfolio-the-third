'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getPageTransition } from '../lib/transitions'
import ProjectCard from './ProjectCard'
import { Project } from '../types'

// Pre-load projects data
let preloadedProjects: Project[] | null = null;

interface ProjectsProps {
  fromSection?: string;
}

export default function Projects({ fromSection }: ProjectsProps) {
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

  const getDirection = () => {
    const sections = ['home', 'projects', 'contact', 'blog']
    const currentIndex = sections.indexOf('projects')
    const fromIndex = fromSection ? sections.indexOf(fromSection) : -1
    
    if (fromIndex === -1) return 'left'
    return fromIndex < currentIndex ? 'right' : 'left'
  }

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
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={getPageTransition(getDirection())}
        className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8"
      >
        <div className="backdrop-blur-sm rounded-2xl p-8">
          {featuredProjects.length > 0 && (
            <div>
              <div className="flex items-center mb-12">
                <div className="flex-grow h-[1px] bg-[var(--border)]"></div>
                <h2 className="text-2xl font-bold px-4 text-[var(--foreground)]">Featured Projects</h2>
                <div className="flex-grow h-[1px] bg-[var(--border)]"></div>
              </div>
              <div className="grid grid-cols-1 gap-8 mb-16">
                {featuredProjects.map((project: Project) => (
                  <div key={project._id}>
                    <ProjectCard project={project} isFeatured={true} />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <div className="flex items-center mb-12">
              <div className="flex-grow h-[1px] bg-[var(--border)]"></div>
              <h2 className="text-2xl font-bold px-4 text-[var(--foreground)]">Other Projects</h2>
              <div className="flex-grow h-[1px] bg-[var(--border)]"></div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {regularProjects.map((project: Project) => (
                <div key={project._id}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
  )
} 