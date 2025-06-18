'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Post } from '@/types'
import BlogPost from './BlogPost'
import PageTransition from '../common/PageTransition'

// Pre-load blog posts data
let preloadedPosts: Post[] | null = null;

export default function Blog() {
  const [loading, setLoading] = useState(!preloadedPosts)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        if (preloadedPosts) {
          setLoading(false)
          return
        }

        const response = await fetch('/api/blog')
        const data = await response.json()
        preloadedPosts = data
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    )
  }

  if (selectedPost) {
    return (
      <PageTransition className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
        <motion.div 
          className="backdrop-blur-sm rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.4
          }}
        >
          <BlogPost post={selectedPost} onBack={() => setSelectedPost(null)} />
        </motion.div>
      </PageTransition>
    )
  }

  return (
    <PageTransition className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <motion.div 
        className="backdrop-blur-sm rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.4
        }}
      >
        <motion.div 
          className="flex items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.6
          }}
        >
          <div className="flex-grow h-[1px] bg-[var(--border)]"></div>
          <h2 className="text-2xl font-bold px-4 text-[var(--foreground)]">Blog Posts</h2>
          <div className="flex-grow h-[1px] bg-[var(--border)]"></div>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.8
          }}
        >
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-[var(--foreground)]">No blog posts yet</h2>
              <p className="text-sm text-[var(--foreground)]">Check back later for updates</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </PageTransition>
  )
} 