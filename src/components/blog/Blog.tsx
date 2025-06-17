'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Post } from '@/types'
import { getPageTransition } from '@/lib/transitions'
// import BlogCard from './BlogCard'
import BlogPost from './BlogPost'

// Pre-load blog posts data
let preloadedPosts: Post[] | null = null;

interface BlogProps {
  fromSection?: string;
}

export default function Blog({ fromSection }: BlogProps) {
  // const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(!preloadedPosts)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        if (preloadedPosts) {
          // setPosts(preloadedPosts)
          setLoading(false)
          return
        }

        const response = await fetch('/api/blog')
        const data = await response.json()
        // setPosts(data)
        preloadedPosts = data
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const getDirection = () => {
    const sections = ['home', 'projects', 'contact', 'blog']
    const currentIndex = sections.indexOf('blog')
    const fromIndex = fromSection ? sections.indexOf(fromSection) : -1
    
    if (fromIndex === -1) return 'left'
    return fromIndex < currentIndex ? 'right' : 'left'
  }

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    )
  }

  if (selectedPost) {
    return (
        <motion.div
          variants={getPageTransition(getDirection())}
          initial="initial"
          animate="animate"
          exit="exit"
          className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8"
        >
          <div className="backdrop-blur-sm rounded-2xl p-8">
            <BlogPost post={selectedPost} onBack={() => setSelectedPost(null)} />
          </div>
        </motion.div>
    )
  }

  return (
    
      <motion.div
        variants={getPageTransition(getDirection())}
        initial="initial"
        animate="animate"
        exit="exit"
        className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8"
      >
        <div className="backdrop-blur-sm rounded-2xl p-8">
          <div className="flex items-center mb-12">
            <div className="flex-grow h-[1px] bg-[var(--border)]"></div>
            <h2 className="text-2xl font-bold px-4 text-[var(--foreground)]">Blog Posts</h2>
            <div className="flex-grow h-[1px] bg-[var(--border)]"></div>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {/* {posts.map((post) => (
              <div 
                key={post._id} 
                onClick={() => setSelectedPost(post)}
                className="cursor-pointer"
              >
                <BlogCard post={post} />
              </div>
            ))} */}
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-[var(--foreground)]">No blog posts yet</h2>
                <p className="text-sm text-[var(--foreground)]">Check back later for updates</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
  )
} 