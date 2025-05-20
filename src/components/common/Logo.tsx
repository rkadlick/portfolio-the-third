interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`font-bold text-2xl tracking-tight group ${className}`}>
      <span className="logo-text text-[var(--logo-text)] group-hover:text-[var(--nav-link-hover)] [.nav-link.active_&]:text-[var(--nav-link-active)]">Ryan</span>
      <span className="logo-text text-[var(--primary)]">K</span>
      <span className="logo-text text-[var(--logo-text)] group-hover:text-[var(--nav-link-hover)] [.nav-link.active_&]:text-[var(--nav-link-active)]">.</span>
    </div>
  )
} 