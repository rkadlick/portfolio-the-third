import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { PortableTextBlock } from '@portabletext/types'

interface SanityBlock extends PortableTextBlock {
  _type: 'block'
  children: {
    _type: 'span'
    text: string
    marks?: string[]
  }[]
}

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
export function generateExcerpt(blocks: PortableTextBlock[], length: number = 200) {
  const block = blocks.find(block => block._type === 'block') as SanityBlock | undefined || blocks[0] as SanityBlock
  if (!block) return ''
  
  const text = block.children
    .filter(child => child._type === 'span')
    .map(span => span.text)
    .join('')
  
  return text.length > length ? `${text.substring(0, length)}...` : text
} 