import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-19', // Use today's date
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Helper to generate excerpt from portable text
export function generateExcerpt(blocks: any[], length: number = 200) {
  const block = blocks.find(block => block._type === 'block') || blocks[0]
  if (!block) return ''
  
  const text = block.children
    .filter((child: any) => child._type === 'span')
    .map((span: any) => span.text)
    .join('')
  
  return text.length > length ? `${text.substring(0, length)}...` : text
} 