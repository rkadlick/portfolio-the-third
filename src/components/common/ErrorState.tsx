interface ErrorStateProps {
  title: string
  message: string
}

export default function ErrorState({ title, message }: ErrorStateProps) {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="card p-8 text-center">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">{title}</h2>
        <p className="text-[var(--muted)] mt-2">{message}</p>
      </div>
    </div>
  )
}
