import EmailModal from './EmailModal'
import useEmailModal from '../hooks/useEmailModal'
import { mailtoUrl } from '../config/site'

/**
 * The company email as a real mailto: link (so it works without JavaScript, and
 * middle-click or "copy link" behave normally), but an ordinary click opens the email
 * options modal instead.
 */
export default function EmailLink({ subject, className = '', children, ...rest }) {
  const { open, onClick, close, triggerRef } = useEmailModal()
  return (
    <>
      <a ref={triggerRef} href={mailtoUrl(subject)} onClick={onClick} className={`cursor-pointer ${className}`} {...rest}>
        {children}
      </a>
      <EmailModal open={open} onClose={close} subject={subject} triggerRef={triggerRef} />
    </>
  )
}
