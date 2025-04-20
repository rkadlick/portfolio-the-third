import Link from 'next/link'

interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <Link href="/" className={`font-bold text-2xl tracking-tight ${className}`}>
      <span className="text-gray-900">Ryan</span>
      <span className="text-blue-600">K</span>
      <span className="text-gray-900">.</span>
    </Link>
  )
} 