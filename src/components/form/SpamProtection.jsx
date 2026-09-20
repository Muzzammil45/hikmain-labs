import { useEffect, useRef } from 'react'
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

/** Optional Cloudflare Turnstile widget, rendered only if a site key is configured. */
export function Captcha() {
  const ref = useRef(null)
  const key = site.forms.captchaSiteKey

  useEffect(() => {
    if (!key || !ref.current) return
    const render = () => window.turnstile?.render(ref.current, { sitekey: key })
    if (window.turnstile) {
      render()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.onload = render
    document.head.appendChild(script)
  }, [key])

  return key ? <div ref={ref} /> : null
}
