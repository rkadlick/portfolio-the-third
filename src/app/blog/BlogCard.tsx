'use client'

import Link from 'next/link'
import { Post } from '../../types'
import { generateExcerpt } from '../../lib/sanity'

export default function BlogCard({ post }: { post: Post }) {
  return (
    <div className="card">
      <div className="flex-1 p-8">
        <Link
          href={`/blog/${post.slug.current}`}
          className="block group"
        >
          <h3 className="text-2xl font-bold text-blue-600 mb-3 group-hover:text-blue-700 transition-colors">
            {post.title}
          </h3>
        </Link>

        <p className="text-[#1a1a1a] mb-8 text-lg">
          {generateExcerpt(post.body)}
        </p>

        <div className="flex items-center text-sm text-[var(--muted)]">
          <span className="font-medium text-[#1a1a1a]">
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