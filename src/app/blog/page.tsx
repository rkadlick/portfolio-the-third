import Link from 'next/link'
import { client, generateExcerpt } from '../../lib/sanity'
import { Post } from '../../types'

async function getPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      body,
      "author": author->{
        name,
        image
      }
    }
  `)
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="relative bg-[var(--card-bg)] pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl tracking-tight font-extrabold text-[var(--text)] sm:text-4xl">
            Blog
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-[var(--muted)] sm:mt-4">
            Thoughts, tutorials, and insights about web development
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
          {posts.map((post: Post) => (
            <div
              key={post._id}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex-1 bg-[var(--card-bg)] p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="block mt-2"
                  >
                    <p className="text-xl font-semibold text-[var(--text)]">
                      {post.title}
                    </p>
                    <p className="mt-3 text-base text-[var(--muted)]">
                      {generateExcerpt(post.body)}
                    </p>
                  </Link>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <span className="sr-only">{post.author.name}</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-[var(--text)]">
                      {post.author.name}
                    </p>
                    <div className="flex space-x-1 text-sm text-[var(--muted)]">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 