import type { MetadataRoute } from 'next'

const baseUrl = 'https://ryanismy.name'

// Disallow known AI crawlers while allowing general search crawlers
const aiDisallow = [
  'GPTBot',
  'ChatGPT-User',
  'CCBot',
  'Google-Extended', // Google’s AI crawler; still allow Googlebot web search
  'Anthropic-AI',
  'Claude-Web',
  'FacebookBot',
  'Bytespider',
  'Amazonbot',
  'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: aiDisallow,
        disallow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api', // keep API routes private to crawlers
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}

