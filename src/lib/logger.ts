type LogLevel = 'info' | 'warn' | 'error'

function log(level: LogLevel, message: string, meta?: Record<string, unknown>) {
  const payload = meta ? { ...meta, level, message } : { level, message }
  // eslint-disable-next-line no-console
  console[level](`[${level}] ${message}`, meta ?? '')
}

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => log('info', message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => log('warn', message, meta),
  error: (message: string, meta?: Record<string, unknown>) => log('error', message, meta),
}
