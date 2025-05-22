import { client } from '../../../lib/sanity'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        mainImage,
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
    
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
} 