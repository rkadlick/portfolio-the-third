'use client'

import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { Post } from '../../types'
import { urlFor } from '../../lib/sanity'

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value) return null
      return (
        <div className="relative w-full h-96 my-8">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || ''}
            className="rounded-lg"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a
          href={value.href}
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

        {post.mainImage && (
          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              className="object-cover"
              fill
              priority
            />
          </div>
        )}

        <div className="prose prose-lg prose-blue mx-auto dark:prose-invert max-w-none">
          <PortableText value={post.body} components={components} />
        </div>
      </div>
    </article>
  )
} 