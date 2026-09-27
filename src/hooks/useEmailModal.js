import { useRef, useState } from 'react'

/**
 * Open/close state and click handling shared by anything that opens the email options
 * modal. A modified click (middle-click, Ctrl/Cmd/Shift/Alt-click) is left alone so the
 * underlying mailto: link still opens in a new tab as the browser normally would.
 */
export default function useEmailModal() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)

  const onClick = (event) => {
    if (event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    setOpen(true)
  }

  // For opening the modal from code rather than a real click (e.g. a button inside another
  // modal that hands off to this one), bypassing the click-event checks above.
  const openModal = () => setOpen(true)

  return { open, onClick, openModal, close: () => setOpen(false), triggerRef }
}
