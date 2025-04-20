import { PortableTextBlock } from '@portabletext/types'
import { Image, Slug } from 'sanity'

export interface Author {
  _id: string
  name: string
  slug: Slug
  image: Image
  bio?: PortableTextBlock[]
  socialLinks?: {
    github?: string
    linkedin?: string
    twitter?: string
  }
}

export interface Post {
  _id: string
  title: string
  slug: Slug
  author: Author
  mainImage: Image
  body: PortableTextBlock[]
  publishedAt: string
  categories?: Array<{
    _id: string
    title: string
  }>
  metaDescription?: string
  keywords?: string[]
}

export interface Project {
  _id: string
  title: string
  slug: Slug
  image: Image
  description: string
  liveLink?: string
  githubLink?: string
  tags: Tag[]
  isFeatured?: boolean
  order?: number
}

export interface Tag {
  _id: string
  name: string
  slug: Slug
}

// Helper type for Sanity references
export interface Reference {
  _ref: string
  _type: string
} 