interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`font-bold text-2xl tracking-tight group ${className}`}>
      <span className="logo-text dark:text-white text-[var(--logo-text)]">Ryan</span>
      <span className="logo-text text-[var(--primary)]">K</span>
      <span className="logo-text dark:text-white text-[var(--logo-text)]">.</span>
    </div>
  )
} 