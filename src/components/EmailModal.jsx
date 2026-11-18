import { useState } from 'react'
import Modal, { modalOptionClass } from './Modal'
import Icon from './Icon'
import { gmailUrl, mailtoUrl, outlookUrl, site } from '../config/site'

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
 * Ways to email HIKMAIN Labs: Gmail, Outlook, the visitor's mail app, or copying the
 * address. A plain mailto: link does nothing on many desktops with no mail client set
 * up, so this always gives people a working option.
 */
export default function EmailModal({ open, onClose, subject, body, triggerRef }) {
  const [copyState, setCopyState] = useState('idle') // 'idle' | 'copied' | 'failed'

  const close = () => {
    setCopyState('idle')
    onClose()
  }

  const options = [
    { key: 'gmail', label: 'Open Gmail', href: gmailUrl(subject, body), external: true },
    { key: 'outlook', label: 'Open Outlook', href: outlookUrl(subject, body), external: true },
    { key: 'app', label: 'Open Mail App', href: mailtoUrl(subject, body) },
  ]

  return (
    <Modal
      open={open}
      onClose={close}
      title={`Email ${site.name}`}
      description="Choose how you’d like to send your email."
      triggerRef={triggerRef}
    >
      <p className="mt-4 break-all rounded-xl bg-midnight/60 px-3.5 py-2.5 text-sm font-medium text-teal">{site.contact.email}</p>
      <div className="mt-4 space-y-2">
        {options.map((option) => (
          <a
            key={option.key}
            href={option.href}
            {...(option.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={modalOptionClass}
          >
            <Icon name="mail" size={20} className="text-teal" /> {option.label}
          </a>
        ))}
        <button
          type="button"
          onClick={async () => setCopyState((await copyToClipboard(site.contact.email)) ? 'copied' : 'failed')}
          className={modalOptionClass}
        >
          <Icon name={copyState === 'copied' ? 'check' : 'copy'} size={20} className="text-teal" />
          <span aria-live="polite">
            {copyState === 'copied' ? 'Copied to clipboard' : copyState === 'failed' ? 'Couldn’t copy — try again' : 'Copy Email Address'}
          </span>
        </button>
      </div>
    </Modal>
  )
}
