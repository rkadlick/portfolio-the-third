import { describe, it, expect } from 'vitest'
import { generateExcerpt } from './sanity'
import type { PortableTextBlock } from '@portabletext/types'

const block = (text: string): PortableTextBlock => ({
  _type: 'block',
  style: 'normal',
  markDefs: [],
  children: [
    {
      _type: 'span',
      text,
    },
  ],
})

describe('generateExcerpt', () => {
  it('returns empty string for empty blocks', () => {
    expect(generateExcerpt([])).toBe('')
  })

  it('returns first block text when shorter than length', () => {
    const blocks = [block('Hello world')]
    expect(generateExcerpt(blocks, 50)).toBe('Hello world')
  })

  it('truncates and appends ellipsis when longer than length', () => {
    const text = 'A'.repeat(30)
    const blocks = [block(text)]
    expect(generateExcerpt(blocks, 10)).toBe(`${'A'.repeat(10)}...`)
  })
})
