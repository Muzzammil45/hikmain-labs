import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import { site } from '../../config/site'

/**
 * Honeypot field. Real visitors never see or fill it; bots usually do.
 * Hidden off-screen rather than display:none so simple bots still populate it.
 */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  )
}

/**
 * Cloudflare Turnstile security check. On success the widget adds a hidden
 * "cf-turnstile-response" field to the surrounding <form>, which the submit hook
 * requires before sending, and which is forwarded with the submission.
 */
export function Captcha() {
  const [error, setError] = useState('')
  const siteKey = site.forms.captchaSiteKey
  if (!siteKey) return null

  return (
    <div>
      <Turnstile
        siteKey={siteKey}
        options={{ theme: 'light', size: 'flexible', language: 'en-gb' }}
        onSuccess={() => setError('')}
        onError={() =>
          setError(
            `The security check could not load. Please refresh the page, or email us at ${site.contact.email}.`,
          )
        }
        onExpire={() => setError('')}
      />
      {error && (
        <p role="alert" className="mt-2 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
