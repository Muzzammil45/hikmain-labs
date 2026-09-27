import EmailModal from './EmailModal'
import useEmailModal from '../hooks/useEmailModal'
import { mailtoUrl } from '../config/site'

/**
 * Renders the company email address as a real mailto: link (so it still works with no
 * JavaScript, and middle-click / "copy link" behave normally), but an ordinary left-click
 * opens a modal of ways to send the email instead, since mailto: alone often does nothing
 * on a desktop with no mail client configured.
 */
export default function EmailLink({ subject, className = '', children, ...rest }) {
  const { open, onClick, close, triggerRef } = useEmailModal()

  return (
    <>
      <a
        ref={triggerRef}
        href={mailtoUrl(subject)}
        onClick={onClick}
        className={`cursor-pointer ${className}`}
        {...rest}
      >
        {children}
      </a>
      <EmailModal open={open} onClose={close} subject={subject} triggerRef={triggerRef} />
    </>
  )
}
