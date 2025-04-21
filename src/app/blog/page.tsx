import { client } from '../../lib/sanity'
import { Post } from '../../types'
import BlogCard from './BlogCard'

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
    <div className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="flex items-center mb-4">
        <div className="flex-grow h-[1px] bg-gray-200"></div>
        <h2 className="text-2xl font-bold px-4">Blog Posts</h2>
        <div className="flex-grow h-[1px] bg-gray-200"></div>
      </div>

      <p className="text-center text-lg text-[var(--muted)] mb-12">
        Thoughts, tutorials, and insights about web development
      </p>

      <div className="grid grid-cols-1 gap-8">
        {posts.map((post: Post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
} 