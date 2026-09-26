import { useRef, useState } from 'react'
import { site } from '../config/site'

const MIN_FILL_MS = 3000 // humans take longer than this to complete a form

/**
 * Handles validation, spam checks and POSTing to a form endpoint.
 *   validate(formData) -> { fieldName: 'message' } (empty object when valid)
 * Returns { status, errors, formError, onSubmit }.
 *   status: 'idle' | 'sending' | 'success' | 'error'
 */
export default function useFormSubmit({ endpoint, validate }) {
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const startedAt = useRef(Date.now())

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
