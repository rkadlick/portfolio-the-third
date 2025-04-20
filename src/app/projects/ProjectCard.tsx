'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Project } from '../../types'
import { urlFor } from '../../lib/sanity'

function RocketIcon() {
  return (
    <svg 
      className="icon-spin w-5 h-5" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M12.5 4.5C9 4.5 7 7 7 9.5C7 12.5 9.5 14 9.5 14C9.5 14 8.5 21.5 12.5 21.5C16.5 21.5 15.5 14 15.5 14C15.5 14 18 12.5 18 9.5C18 7 16 4.5 12.5 4.5Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M12.5 14C14.7091 14 16.5 12.2091 16.5 10C16.5 7.79086 14.7091 6 12.5 6C10.2909 6 8.5 7.79086 8.5 10C8.5 12.2091 10.2909 14 12.5 14Z" 
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
        d="M16 18L22 12L16 6" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M8 6L2 12L8 18" 
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
            <h3 className="text-3xl font-bold mb-4 text-[#1a1a1a]">{project.title}</h3>
            <div className="flex space-x-4 mb-6">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-primary"
                >
                  <span className="button-text" style={{ minWidth: '88px' }}>
                    <RocketIcon />
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
            <p className="text-[#1a1a1a] mb-6">{project.description}</p>
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
          <div className="featured-project-image-container">
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
          <h3 className="text-xl font-bold text-[#1a1a1a]">{project.title}</h3>
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
                <RocketIcon />
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
          <p className="text-[#1a1a1a] text-sm pt-3">{project.description}</p>
        </div>
      </div>
    </div>
  )
} 