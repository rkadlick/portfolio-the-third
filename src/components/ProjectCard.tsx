'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Project } from '../types'
import { urlFor } from '../lib/sanity'

function LightningIcon() {
  return (
    <svg 
      className="icon-spin w-5 h-5" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg 
      className="icon-spin w-5 h-5" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M16 18L22 12L16 6M8 6L2 12L8 18"
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ProjectCard({ project, isFeatured = false }: { project: Project; isFeatured?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isFeatured) {
    return (
      <div className="card featured-project-card">
        <div className="featured-project-content">
          <div>
            <h3 className="text-3xl font-bold mb-4 text-[var(--foreground)]">{project.title}</h3>
            <div className="flex space-x-4 mb-6">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-primary"
                >
                  <span className="button-text" style={{ minWidth: '88px' }}>
                    <LightningIcon />
                    <span>Live Demo</span>
                  </span>
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-secondary"
                >
                  <span className="button-text" style={{ minWidth: '108px' }}>
                    <CodeIcon />
                    <span>Source Code</span>
                  </span>
                </a>
              )}
            </div>
            <p className="text-[var(--foreground)] mb-6">{project.description}</p>
            <div className="flex flex-wrap">
              {project.tags?.map((tag) => (
                <span key={tag._id} className="project-tag">
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        {project.image && (
          <div className="featured-project-image-container md:block hidden">
            <div className="featured-project-image">
              <Image
                src={urlFor(project.image).url()}
                alt={project.title}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div 
      className="card non-featured-project-card"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[var(--foreground)]">{project.title}</h3>
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <span className={`transition-opacity duration-300 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
              More details
            </span>
            <svg
              className={`project-arrow-icon w-5 h-5 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        <div className="flex space-x-4 mb-4 mt-1">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="button-text" style={{ minWidth: '88px' }}>
                <LightningIcon />
                <span>Live Demo</span>
              </span>
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-secondary"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="button-text" style={{ minWidth: '108px' }}>
                <CodeIcon />
                <span>Source Code</span>
              </span>
            </a>
          )}
        </div>

        <div className="flex flex-wrap">
          {project.tags?.map((tag) => (
            <span key={tag._id} className="project-tag">
              {tag.name}
            </span>
          ))}
        </div>

        <div 
          className={`project-details-dropdown ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-[var(--foreground)] text-sm pt-3">{project.description}</p>
        </div>
      </div>
    </div>
  )
} 