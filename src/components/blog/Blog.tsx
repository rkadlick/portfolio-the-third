'use client';

import { motion } from 'framer-motion';
import { Post } from '@/types';
import BlogPost from './BlogPost';
import PageTransition from '../common/PageTransition';
import { useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';


export default function Blog({ posts }: { posts: Post[] }) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const baseInitial = prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 };
  const baseAnimate = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 };
  const baseTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 };

  if (selectedPost) {
    return (
      <PageTransition className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
        <motion.div
          className="backdrop-blur-sm rounded-2xl p-8"
          initial={baseInitial}
          animate={baseAnimate}
          transition={baseTransition}
        >
          <BlogPost post={selectedPost} onBack={() => setSelectedPost(null)} />
        </motion.div>
      </PageTransition>
    );
  }


  return (
    <PageTransition className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <motion.div
        className="backdrop-blur-sm rounded-2xl p-8"
        initial={baseInitial}
        animate={baseAnimate}
        transition={baseTransition}
      >
        <motion.div
          className="flex items-center mb-12"
          initial={baseInitial}
          animate={baseAnimate}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.6 }
          }
        >
          <div className="flex-grow h-[1px] bg-[var(--border)]"></div>
          <h2 className="text-2xl font-bold px-4 text-[var(--foreground)]">Blog Posts</h2>
          <div className="flex-grow h-[1px] bg-[var(--border)]"></div>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 gap-8"
          initial={baseInitial}
          animate={baseAnimate}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.8 }
          }
        >
          {posts.length === 0 ? (
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-[var(--foreground)]">No blog posts yet</h2>
                <p className="text-sm text-[var(--foreground)]">Check back later for updates</p>
              </div>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                className="cursor-pointer"
                onClick={() => setSelectedPost(post)}
                role="button"
                tabIndex={0}
                aria-label={`Open blog post ${post.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPost(post);
                  }
                }}
              >
                {/* Reuse your card/list layout as desired; keep minimal here */}
                <div className="card p-6">
                  <h3 className="text-xl font-bold text-[var(--foreground)]">{post.title}</h3>
                  <p className="text-sm text-[var(--muted)] mt-2">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </motion.div>
      </motion.div>
    </PageTransition>
  );
}