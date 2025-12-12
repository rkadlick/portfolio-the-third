'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  useEffect(() => setMounted(true), []);

  // Skip animation on first mount to reduce initial perceived delay
  const initial = mounted && !prefersReducedMotion ? { opacity: 0, y: 10 } : { opacity: 1 };
  const animate = { opacity: 1, y: 0 };
  const transition = prefersReducedMotion || !mounted
    ? { duration: 0 }
    : { duration: 0.2, ease: [0.22, 1, 0.36, 1] };

  return (
    <motion.div
      className={`w-full ${className}`}
      initial={initial}
      animate={animate}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
} 