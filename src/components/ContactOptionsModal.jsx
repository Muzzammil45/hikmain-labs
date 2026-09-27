import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Button from './Button'
import { Icon } from './Card'

/**
 * The same three ways to get in touch as the page's final "enquiry" section — WhatsApp,
 * Google Meet, Email — surfaced in a modal so a visitor who has just picked a category can
 * act on it immediately, without scrolling. Email hands off to the sitewide EmailModal
 * (Gmail/Outlook/mail app/copy) rather than a bare mailto: link, via onEmailClick.
 */
export default function ContactOptionsModal({
  open,
  onClose,
  categoryTitle,
  whatsappHref,
  onWhatsAppClick,
  meetHref,
  onMeetClick,
  onEmailClick,
  triggerRef,
}) {
  const dialogRef = useRef(null)

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

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
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
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-options-title"
        tabIndex={-1}
        className="relative animate-fade-up w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl outline-none sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="contact-options-title" className="text-lg font-semibold">
              {categoryTitle ? `Discuss ${categoryTitle}` : 'Discuss your project'}
            </h2>
            <p className="mt-1 text-sm text-black/70">Choose how you&rsquo;d like to get in touch.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-m-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-black/60 hover:bg-surface hover:text-black focus-visible:outline-2 focus-visible:outline-action"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <Button
            variant="secondary"
            {...(whatsappHref ? { href: whatsappHref } : { to: '/contact' })}
            onClick={onWhatsAppClick}
            className="w-full"
          >
            <Icon name="chat" /> Discuss on WhatsApp
          </Button>
          <Button variant="secondary" href={meetHref} onClick={onMeetClick} className="w-full">
            <Icon name="video" /> Request a Google Meet
          </Button>
          <Button variant="secondary" onClick={onEmailClick} className="w-full">
            <Icon name="mail" /> Send an Email
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
