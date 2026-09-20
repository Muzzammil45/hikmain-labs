import Button from './Button'
import { Icon } from './Card'
import { mailtoUrl, meetUrl, whatsappUrl } from '../config/site'

/**
 * WhatsApp / Google Meet / Email buttons.
 * If the WhatsApp number hasn't been configured yet, the button falls back to the contact page.
 */
export default function ContactOptions({ variant = 'light', subject, className = '' }) {
  const wa = whatsappUrl()
  const secondary = variant === 'light' ? 'outlineLight' : 'secondary'
  const first = variant === 'light' ? 'light' : 'primary'

  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
      <Button variant={first} {...(wa ? { href: wa } : { to: '/contact' })}>
        <Icon name="chat" /> WhatsApp
      </Button>
      <Button variant={secondary} href={meetUrl()}>
        <Icon name="video" /> Google Meet
      </Button>
      <Button variant={secondary} href={mailtoUrl(subject)}>
        <Icon name="mail" /> Email
      </Button>
    </div>
  )
}
