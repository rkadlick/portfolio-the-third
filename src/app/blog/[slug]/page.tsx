import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client, urlFor } from '../../../lib/sanity'
import { Post } from '../../../types'
import { notFound } from 'next/navigation'

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
          className="text-blue-600 hover:text-blue-800"
        >
          {children}
        </a>
      )
    },
  },
}

async function getPost(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      mainImage,
      body,
      publishedAt,
      "author": author->{
        name,
        image
      }
    }`,
    { slug }
  )
}

export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  )

  return slugs.map((slug: string) => ({
    slug,
  }))
}

interface PostPageProps {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post: Post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-6 flex items-center">
          {post.author.image && (
            <div className="relative h-10 w-10 rounded-full overflow-hidden">
              <Image
                src={urlFor(post.author.image).url()}
                alt={post.author.name}
                className="h-10 w-10 rounded-full"
                fill
              />
            </div>
          )}
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
            <div className="flex space-x-1 text-sm text-gray-500">
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
      </header>

      {post.mainImage && (
        <div className="relative aspect-video mb-8">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            className="rounded-lg"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      <div className="prose prose-lg prose-blue mx-auto">
        <PortableText value={post.body} components={components} />
      </div>
    </article>
  )
} 