'use client'

import { useState, FormEvent } from 'react'

interface FormData {
  name: string
  email: string
  message: string
}

function PaperPlaneIcon() {
  return (
    <svg 
      className="icon-spin w-5 h-5" 
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

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // For now, just log the form data
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', message: '' })
    // Show success message
    alert('Message sent! (This is a demo - no actual message was sent)')
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="flex items-center mb-4">
        <div className="flex-grow h-[1px] bg-gray-200"></div>
        <h2 className="text-2xl font-bold px-4">Get In Touch</h2>
        <div className="flex-grow h-[1px] bg-gray-200"></div>
      </div>

      <p className="text-center text-lg text-[var(--muted)] mb-12">
        I&apos;d love to hear from you! Send me a message and I&apos;ll get back to you as soon as possible.
      </p>

      <div className="max-w-2xl mx-auto">
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#1a1a1a] mb-2"
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
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#1a1a1a] mb-2"
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
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-[#1a1a1a] mb-2"
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
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="button button-primary w-full sm:w-auto cursor-pointer"
              >
                <span className="button-text justify-center sm:justify-start" style={{ minWidth: '108px' }}>
                  <PaperPlaneIcon />
                  <span>Send Message</span>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 