import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import Button from '../components/Button'
import { site } from '../config/site'
import useFormSubmit, { isEmail } from '../hooks/useFormSubmit'
import { SelectField, TextField } from '../components/form/Fields'
import { Honeypot } from '../components/form/SpamProtection'

const grades = ['KS1', 'KS2', 'KS3', 'GCSE', 'A Level']
const REDIRECT_DELAY_MS = 2000 // long enough to read the confirmation message

function validate(data) {
  const errors = {}
  if (!String(data.get('name') || '').trim()) errors.name = 'Please enter your full name.'
  if (!isEmail(data.get('email'))) errors.email = 'Please enter a valid email address.'
  if (!/^\+?[\d\s()-]{7,}$/.test(String(data.get('phone') || '').trim())) {
    errors.phone = 'Please enter a valid phone number, including country code if outside the UK.'
  }
  if (!data.get('grade')) errors.grade = 'Please choose a grade or year.'
  if (!String(data.get('subject') || '').trim()) errors.subject = 'Please tell us which subject you are interested in.'
  return errors
}

export default function ElevateReferral() {
  const { status, errors, formError, onSubmit } = useFormSubmit({
    endpoint: site.forms.elevateReferralEndpoint,
    validate,
  })

  // Once the details are recorded, pass the visitor on to Elevate Tuition
  useEffect(() => {
    if (status !== 'success') return undefined
    const timer = setTimeout(() => window.location.assign(site.elevate.referralUrl), REDIRECT_DELAY_MS)
    return () => clearTimeout(timer)
  }, [status])

  return (
    <>
      <Seo
        title="School, GCSE & A Level Tutoring"
        description={`Tell us a bit about you, then continue to ${site.elevate.name} for school, GCSE and A Level tutoring.`}
      />
      <PageHero
        title="School, GCSE & A Level Tutoring"
        intro={`We work with ${site.elevate.name} for school students. Tell us a bit about you first.`}
      />

      <Section tone="surface">
        <div className="mx-auto max-w-2xl">
          {status === 'success' ? (
            <div role="status" className="rounded-xl border-2 border-accent bg-white p-6">
              <h2 className="text-xl font-semibold">Great! Redirecting you to {site.elevate.name}...</h2>
              <p className="mt-2 leading-relaxed">
                If nothing happens, <a href={site.elevate.referralUrl}>continue to {site.elevate.name}</a>.
              </p>
            </div>
          ) : (
            <form
              method="post"
              action={site.forms.elevateReferralEndpoint}
              onSubmit={onSubmit}
              noValidate
              className="relative space-y-6 rounded-2xl bg-white p-5 shadow-sm sm:p-8"
            >
              <Honeypot />
              <input type="hidden" name="_subject" value={`New ${site.elevate.name} referral`} />

              <TextField label="Full name" name="name" required autoComplete="name" error={errors.name} />
              <TextField label="Email" name="email" type="email" required autoComplete="email" error={errors.email} />
              <TextField label="Phone" name="phone" type="tel" required autoComplete="tel" error={errors.phone} />
              <SelectField
                label="Grade / Year"
                name="grade"
                required
                options={grades}
                placeholder="Choose a grade or year"
                error={errors.grade}
              />
              <TextField
                label="Subject of interest"
                name="subject"
                required
                placeholder="e.g. Maths, Chemistry"
                error={errors.subject}
              />

              <p className="rounded-lg bg-surface p-3 text-sm leading-relaxed text-black/75">
                We use the details you give here only to process your referral to {site.elevate.name}. See our{' '}
                <Link to="/privacy" className="text-action underline">Privacy Notice</Link>.
              </p>

              {formError && (
                <div role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-800">
                  <p>{formError}</p>
                  {status === 'error' && (
                    <p className="mt-2">
                      You can also{' '}
                      <a href={site.elevate.referralUrl} className="underline">continue to {site.elevate.name}</a> directly.
                    </p>
                  )}
                </div>
              )}

              <Button type="submit" disabled={status === 'sending'} className="w-full sm:w-auto">
                {status === 'sending' ? 'Sending…' : `Continue to ${site.elevate.name}`}
              </Button>
            </form>
          )}

          <p className="mt-6 text-sm">
            <Link to="/tutoring">&larr; Back to tutoring</Link>
          </p>
        </div>
      </Section>
    </>
  )
}
