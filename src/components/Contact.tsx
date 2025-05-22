'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { getPageTransition } from '@/lib/transitions'

interface FormData {
  name: string
  email: string
  message: string
}

interface ContactProps {
  fromSection?: 'home' | 'projects' | 'contact' | 'blog';
}

type SubmissionStatus = {
  type: 'success' | 'error' | null;
  message: string;
}

function PaperPlaneIcon() {
  return (
    <svg
      className="w-5 h-5" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M21.5 12L3.5 3.5L6.5 12L3.5 20.5L21.5 12Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M6.5 12H12.5" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Contact({ fromSection = 'home' }: ContactProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<SubmissionStatus>({ type: null, message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Determine animation direction based on navigation flow
  const getDirection = (): 'left' | 'right' => {
    const sectionOrder = ['home', 'projects', 'contact', 'blog'];
    const currentIndex = sectionOrder.indexOf('contact');
    const fromIndex = sectionOrder.indexOf(fromSection);
    return fromIndex < currentIndex ? 'right' : 'left';
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: `Error: ${json.error || 'Unknown error occurred'}` });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      variants={getPageTransition(getDirection())}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8"
    >
      <div className="backdrop-blur-sm rounded-2xl p-8">
        <div className="flex items-center mb-4">
          <div className="flex-grow h-[1px] bg-[var(--border)]"></div>
          <h2 className="text-2xl font-bold px-4 text-[var(--foreground)]">Get in Touch</h2>
          <div className="flex-grow h-[1px] bg-[var(--border)]"></div>
        </div>

        <p className="text-center text-lg text-[var(--muted)] mb-12">
          Have a question or want to work together? Send me a message!
        </p>

        <div className="max-w-2xl mx-auto">
          <div className="card p-8">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[var(--foreground)] mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="block w-full rounded-md border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] shadow-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[var(--foreground)] mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="block w-full rounded-md border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] shadow-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[var(--foreground)] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="block w-full rounded-md border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] shadow-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] sm:text-sm"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button button-primary w-full sm:w-auto cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="button-text justify-center relative" style={{ minWidth: '108px' }}>
                    {isSubmitting ? (
                      <>
                        {/* Invisible placeholder to maintain button size */}
                        <div className="opacity-0">
                          <PaperPlaneIcon />
                          <span>Send Message</span>
                        </div>
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[var(--card-bg)]"></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <PaperPlaneIcon />
                        <span>Send Message</span>
                      </>
                    )}
                  </span>
                </button>
                {status.type && (
                  <div className={`text-sm ${status.type === 'success' ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                    {status.message}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 