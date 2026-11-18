import { useEffect, useRef, useState } from 'react'
import { site } from '../config/site'

const MIN_FILL_MS = 3000 // humans take longer than this to complete a form

/**
 * Handles validation, spam checks and POSTing to a form endpoint.
 *   validate(formData) -> { fieldName: 'message' } (empty object when valid)
 *   onBeforeSend() -> called synchronously once validation passes, just before the
 *     network request starts. Use this (not a `status === 'success'` effect) for anything
 *     that must count as part of the user's original click, such as window.open() — browsers
 *     only exempt popups from their blocker when opened synchronously within the click's own
 *     call stack, before any `await`, so opening one later (e.g. after the request resolves,
 *     or from a timer) gets blocked.
 * Returns { status, errors, formError, onSubmit }.
 *   status: 'idle' | 'sending' | 'success' | 'error'
 */
export default function useFormSubmit({ endpoint, validate, onBeforeSend }) {
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const startedAt = useRef(0)

  // Record when the form appeared, for the minimum-fill-time spam check
  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // Spam checks. Bots get a silent "success" so they learn nothing.
    if (data.get('_gotcha')) {
      setStatus('success')
      return
    }
    if (Date.now() - startedAt.current < MIN_FILL_MS) {
      setFormError('That was very quick. Please check your answers and press submit again.')
      return
    }

    const found = validate ? validate(data) : {}
    setErrors(found)
    setFormError('')
    if (Object.keys(found).length) {
      const firstName = Object.keys(found)[0]
      form.querySelector(`[name="${firstName}"]`)?.focus()
      return
    }

    if (!endpoint) {
      setStatus('error')
      setFormError(
        `This form isn't connected yet. Please email us at ${site.contact.email} instead.`,
      )
      return
    }

    onBeforeSend?.()

    setStatus('sending')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      setStatus('success')
    } catch {
      setStatus('error')
      setFormError(
        `Sorry, something went wrong sending your message. Please try again or email ${site.contact.email}.`,
      )
    }
  }

  return { status, errors, formError, onSubmit }
}

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim())
