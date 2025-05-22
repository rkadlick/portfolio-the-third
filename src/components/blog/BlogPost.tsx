'use client'

import Image from 'next/image'
import { PortableText, PortableTextComponentProps } from '@portabletext/react'
import { Post } from '../../types'
import { urlFor } from '../../lib/sanity'

interface ImageValue {
  _type: string
  asset: {
    _ref: string
    _type: string
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
  }
}

interface LinkMarkProps {
  children: React.ReactNode
  value?: {
    href: string
  }
}

const components = {
  types: {
    image: ({ value }: PortableTextComponentProps<ImageValue>) => {
      if (!value) return null
      
      // Calculate aspect ratio based on hotspot if available
      const imageStyle = value.hotspot 
        ? { objectPosition: `${value.hotspot.x * 100}% ${value.hotspot.y * 100}%` }
        : { objectFit: 'contain' as const }

      return (
        <figure className="my-8">
          <div className="relative max-w-3xl mx-auto">
            <div className="relative h-[400px] w-full">
              <Image
                src={urlFor(value).url()}
                alt={value.alt || ''}
                className="rounded-lg"
                fill
                style={imageStyle}
              />
            </div>
            {value.caption && (
              <figcaption className="mt-2 text-center text-sm text-[var(--muted)]">
                {value.caption}
              </figcaption>
            )}
          </div>
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }: LinkMarkProps) => {
      const rel = value?.href.startsWith('/') ? undefined : 'noreferrer noopener'
      return (
        <a
          href={value?.href}
          rel={rel}
          className="text-[var(--primary)] hover:text-[var(--primary-hover)]"
        >
          {children}
        </a>
      )
    },
  },
}

interface BlogPostProps {
  post: Post
  onBack: () => void
}

export default function BlogPost({ post, onBack }: BlogPostProps) {
  return (
    <article className="card">
      <div className="p-8">
        <button
          onClick={onBack}
          className="mb-8 text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors duration-200 cursor-pointer"
        >
          ← Back to Posts
        </button>

        {post.mainImage && (
          <div className="relative aspect-[16/9] mb-8 rounded-lg overflow-hidden">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              className="object-cover"
              fill
              priority
            />
          </div>
        )}

        <header className="mb-8">
          <div className="flex items-center mb-4 text-sm text-[var(--muted)]">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            {post.author?.name && (
              <>
                <span className="mx-2">•</span>
                <span className="font-medium text-[var(--foreground)]">
                  {post.author.name}
                </span>
              </>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            {post.title}
          </h1>
        </header>

        <div className="prose prose-lg prose-blue mx-auto dark:prose-invert max-w-none">
          <PortableText value={post.body} components={components} />
        </div>
      </div>
    </article>
  )
} 