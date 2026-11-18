import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Icon from './Icon'

/**
 * Accessible dialog: focus moves in on open and back to the trigger on close, Tab is
 * kept inside, Escape and the backdrop close it, and the page behind stops scrolling.
 * Rendered into document.body so it can be opened from inline text (e.g. a link in a <p>).
 */
export default function Modal({ open, onClose, title, description, triggerRef, children }) {
  const dialogRef = useRef(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!open) return undefined
    dialogRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const trigger = triggerRef?.current

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCloseRef.current()
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
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      trigger?.focus?.()
    }
  }, [open, triggerRef])

  if (!open) return null

  const titleId = 'modal-title'
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center">
      {/* Backdrop: clickable, but hidden from tab order and assistive tech, since the
          Close button and the Escape key already dismiss the dialog. */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="fade-in absolute inset-0 bg-midnight/75 backdrop-blur-sm"
        style={{ animationDuration: '.3s' }}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="panel-in relative w-full max-w-sm rounded-3xl bg-navy p-6 text-cloud shadow-[inset_0_0_0_1px_var(--color-line-strong),0_40px_80px_-30px_rgba(0,0,0,.8)] outline-none sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="text-lg font-bold">
              {title}
            </h2>
            {description && <p className="mt-1 text-sm text-muted">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-m-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-mist transition-colors hover:bg-white/5 hover:text-cloud"
          >
            <Icon name="close" size={20} strokeWidth={2} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  )
}

export const modalOptionClass =
  'flex w-full items-center gap-3 rounded-2xl bg-midnight/60 px-4 py-3.5 text-left text-sm font-semibold text-cloud no-underline shadow-[inset_0_0_0_1px_var(--color-line)] transition-[box-shadow,background-color,color] hover:bg-royal/60 hover:text-teal hover:shadow-[inset_0_0_0_1px_var(--color-teal)]'
