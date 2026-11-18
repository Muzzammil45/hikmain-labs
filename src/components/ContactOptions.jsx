import Button from './Button'
import EmailModal from './EmailModal'
import Icon from './Icon'
import useEmailModal from '../hooks/useEmailModal'
import { mailtoUrl, meetUrl, whatsappUrl } from '../config/site'

/**
 * WhatsApp / Google Meet / Email buttons. WhatsApp can carry a pre-filled message;
 * if no WhatsApp number is configured, that button falls back to the contact page.
 */
export default function ContactOptions({ subject, whatsappMessage, emailBody, onChannel, className = '' }) {
  const wa = whatsappUrl(whatsappMessage)
  const { open, onClick, close, triggerRef } = useEmailModal()

  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
      <Button {...(wa ? { href: wa } : { to: '/contact' })} onClick={() => onChannel?.('whatsapp')}>
        <Icon name="chat" size={20} /> WhatsApp
      </Button>
      <Button variant="ghost" href={meetUrl()} onClick={() => onChannel?.('meet')}>
        <Icon name="video" size={20} /> Google Meet
      </Button>
      <Button
        ref={triggerRef}
        variant="ghost"
        href={mailtoUrl(subject, emailBody)}
        onClick={(event) => {
          onClick(event)
          onChannel?.('email')
        }}
      >
        <Icon name="mail" size={20} /> Email
      </Button>
      <EmailModal open={open} onClose={close} subject={subject} body={emailBody} triggerRef={triggerRef} />
    </div>
  )
}
