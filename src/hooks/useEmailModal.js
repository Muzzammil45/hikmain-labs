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

  return { open, onClick, close: () => setOpen(false), triggerRef }
}
