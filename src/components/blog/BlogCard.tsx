'use client'

import { Post } from '../../types'
import { generateExcerpt } from '../../lib/sanity'

export default function BlogCard({ post }: { post: Post }) {
  return (
    <div className="card cursor-pointer hover:shadow-lg transition-shadow duration-200">
      <div className="flex-1 p-8">
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
  )
} 