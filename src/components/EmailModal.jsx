import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from './Card'
import { gmailUrl, mailtoUrl, outlookUrl, site } from '../config/site'

const emailOptions = (subject) => [
  { key: 'gmail', label: 'Open Gmail', href: gmailUrl(subject) },
  { key: 'outlook', label: 'Open Outlook', href: outlookUrl(subject) },
  { key: 'app', label: 'Open Mail App', href: mailtoUrl(subject) },
]

/** Copies text to the clipboard, falling back to a hidden textarea on older browsers. */
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(textarea)
      return ok
    } catch {
      return false
    }
  }
}

/**
 * Modal offering ways to email HIKMAIN Labs: Gmail, Outlook, the visitor's default mail
 * app, or copying the address. A plain mailto: link does nothing on many desktop
 * browsers when no mail client is configured, so this gives people a working option.
 * Opened via the EmailLink component or the useEmailModal hook, not used on its own.
 */
export default function EmailModal({ open, onClose, subject, triggerRef }) {
  const dialogRef = useRef(null)
  const [copyState, setCopyState] = useState('idle') // 'idle' | 'copied' | 'failed'

  useEffect(() => {
    if (!open) return undefined
    dialogRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const trigger = triggerRef?.current
    return () => {
      document.body.style.overflow = previousOverflow
      trigger?.focus?.()
    }
  }, [open, triggerRef])

  // requestClose (rather than the onClose prop directly) also resets the copy confirmation,
  // so the next time the modal opens it doesn't briefly show the previous "Copied" state.
  const requestClose = () => {
    setCopyState('idle')
    onClose()
  }

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        requestClose()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll('a[href], button:not([disabled])')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- requestClose is recreated each render but is stable in behaviour
  }, [open])

  if (!open) return null

  const handleCopy = async () => {
    setCopyState((await copyToClipboard(site.contact.email)) ? 'copied' : 'failed')
  }

  // Rendered into document.body via a portal: EmailLink is often used inline (e.g. inside a
  // <p>), and a fixed-position dialog can't validly nest inside such elements in the DOM.
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center">
      {/* Decorative scrim: a real button so it's natively clickable, but hidden from tab
          order and assistive tech since the visible Close button and Escape key already
          cover keyboard and screen-reader ways to dismiss the dialog. */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={requestClose}
        className="absolute inset-0 bg-black/50"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-modal-title"
        tabIndex={-1}
        className="relative animate-fade-up w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl outline-none sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="email-modal-title" className="text-lg font-semibold">
              Email {site.name}
            </h2>
            <p className="mt-1 text-sm text-black/70">Choose how you&rsquo;d like to send your email.</p>
          </div>
          <button
            type="button"
            onClick={requestClose}
            aria-label="Close"
            className="-m-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-black/60 hover:bg-surface hover:text-black focus-visible:outline-2 focus-visible:outline-action"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <p className="mt-4 break-all rounded-lg bg-surface px-3 py-2 text-sm font-medium">{site.contact.email}</p>

        <div className="mt-5 space-y-2">
          {emailOptions(subject).map((option) => (
            <a
              key={option.key}
              href={option.href}
              {...(option.key !== 'app' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold transition-colors hover:border-action hover:bg-blue-50 hover:text-action focus-visible:outline-2 focus-visible:outline-action"
            >
              <Icon name="mail" /> {option.label}
            </a>
          ))}
          <button
            type="button"
            onClick={handleCopy}
            className="flex w-full items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-semibold transition-colors hover:border-action hover:bg-blue-50 hover:text-action focus-visible:outline-2 focus-visible:outline-action"
          >
            <Icon name={copyState === 'copied' ? 'check' : 'copy'} />
            {copyState === 'copied' ? 'Copied to clipboard' : copyState === 'failed' ? "Couldn't copy — try again" : 'Copy Email Address'}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
