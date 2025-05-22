'use client'

import Image from 'next/image'
import { Post } from '../../types'
import { generateExcerpt, urlFor } from '../../lib/sanity'

export default function BlogCard({ post }: { post: Post }) {
  console.log(post)
  return (
    <div className="card cursor-pointer hover:shadow-lg transition-shadow duration-200">
      <div className="flex">
        {post.mainImage && (
          <div className="relative w-1/3 min-h-[250px]">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              className="object-cover rounded-l-lg"
              fill
              priority
            />
          </div>
        )}
        <div className={`flex-1 p-8 ${!post.mainImage ? 'w-full' : ''}`}>
          <h3 className="text-2xl font-bold text-[var(--primary)] mb-3 group-hover:text-[var(--primary-hover)] transition-colors">
            {post.title}
          </h3>

          <p className="text-[var(--foreground)] mb-8 text-lg">
            {generateExcerpt(post.body)}
          </p>

          <div className="flex items-center text-sm text-[var(--muted)]">
            <span className="font-medium text-[var(--foreground)]">
              {post.author?.name}
            </span>
            <span className="mx-2">•</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </div>
        </div>
      </div>
    </div>
  )
} 