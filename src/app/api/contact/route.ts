// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const rateLimitStore = new Map<string, { count: number; windowStart: number }>()
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  // NextRequest does not always expose ip; fall back to unknown
  return (req as { ip?: string }).ip || 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now })
    return false
  }

  record.count += 1
  rateLimitStore.set(ip, record)
  return record.count > RATE_LIMIT_MAX
}

function validatePayload(body: unknown): { valid: boolean; error?: string } {
  if (!body || typeof body !== 'object') return { valid: false, error: 'Invalid payload' }
  const { name, email, message, honeypot } = body as Record<string, unknown>

  if (honeypot) return { valid: false, error: 'Rejected' } // basic bot trap
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return { valid: false, error: 'Missing fields' }
  }

  const trimmedName = name.trim()
  const trimmedEmail = email.trim()
  const trimmedMessage = message.trim()

  if (!trimmedName || trimmedName.length > 120) return { valid: false, error: 'Invalid name' }
  if (!EMAIL_REGEX.test(trimmedEmail) || trimmedEmail.length > 160) return { valid: false, error: 'Invalid email' }
  if (!trimmedMessage || trimmedMessage.length > 5000) return { valid: false, error: 'Invalid message' }

  return { valid: true }
}

interface ContactForm {
  name: string
  email: string
  message: string
}

interface ContactConfig {
  from: string
  to: string
}

function getContactConfig(): ContactConfig | null {
  const from = process.env.CONTACT_FROM
  const to = process.env.CONTACT_TO

  if (!from || !to) return null
  return { from, to }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request)
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    let payload: ContactForm & { honeypot?: string }
    try {
      payload = await request.json()
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
    }

    const validation = validatePayload(payload)
    if (!validation.valid) {
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
    }

    const name = payload.name.trim()
    const email = payload.email.trim()
    const message = payload.message.trim()

    const contactConfig = getContactConfig()
    if (!resend || !contactConfig) {
      console.error('Contact transport not configured')
      return NextResponse.json(
        { success: false, error: 'Service unavailable' },
        { status: 503 }
      )
    }

    const timestamp = new Date().toISOString()

    const result = await resend.emails.send({
      from: contactConfig.from,
      to: contactConfig.to,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: `
Name: ${name}
Email: ${email}
Timestamp: ${timestamp}

Message:
${message}
      `.trim(),
      html: `
        <div style="font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; color: #111; line-height: 1.6; padding: 16px; background: #f7f7f8;">
          <div style="max-width: 640px; margin: 0 auto; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
            <div style="background: #0f172a; color: #fff; padding: 16px 20px;">
              <h2 style="margin: 0; font-size: 18px;">📨 New Portfolio Contact</h2>
              <p style="margin: 4px 0 0; font-size: 13px; color: #cbd5e1;">${timestamp}</p>
            </div>
            <div style="padding: 20px;">
              <div style="margin-bottom: 12px;">
                <div style="font-size: 13px; color: #6b7280;">Name</div>
                <div style="font-size: 15px; font-weight: 600;">${name}</div>
              </div>
              <div style="margin-bottom: 12px;">
                <div style="font-size: 13px; color: #6b7280;">Email</div>
                <div style="font-size: 15px; font-weight: 600;">
                  <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                </div>
              </div>
              <div style="margin-bottom: 12px;">
                <div style="font-size: 13px; color: #6b7280;">Message</div>
                <div style="font-size: 15px; white-space: pre-line; color: #0f172a;">${message}</div>
              </div>
            </div>
          </div>
        </div>
      `,
    })

    if (result.error) {
      console.error('Email send error:', result.error)
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Email send error:', err)
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
