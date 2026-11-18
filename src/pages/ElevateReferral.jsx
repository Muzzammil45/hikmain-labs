import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/Hero'
import Section from '../components/Section'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { site } from '../config/site'
import useFormSubmit, { isEmail } from '../hooks/useFormSubmit'
import { Checkbox, FormError, FormSuccess, SelectField, TextField } from '../components/form/Fields'
import { Honeypot } from '../components/form/SpamProtection'

const grades = ['KS1', 'KS2', 'KS3', 'GCSE', 'A Level']
const REDIRECT_DELAY_MS = 2500 // gives the visitor time to read the confirmation before the handoff
const requiredFields = ['name', 'email', 'phone', 'grade', 'subject']

function validate(data) {
  const errors = {}
  if (!String(data.get('name') || '').trim()) errors.name = 'Please enter your full name.'
  if (!isEmail(data.get('email'))) errors.email = 'Please enter a valid email address.'
  if (!/^\+?[\d\s()-]{7,}$/.test(String(data.get('phone') || '').trim())) {
    errors.phone = 'Please enter a valid phone number, including country code if outside the UK.'
  }
  if (!data.get('grade')) errors.grade = 'Please choose a grade or year.'
  if (!String(data.get('subject') || '').trim()) errors.subject = 'Please tell us which subject you are interested in.'
  if (!data.get('ageConfirmed')) errors.ageConfirmed = 'Please tick this box to continue.'
  return errors
}

export default function ElevateReferral() {
  const [ageConfirmed, setAgeConfirmed] = useState(false)
  const [fieldsFilled, setFieldsFilled] = useState(false)
  const { status, errors, formError, onSubmit } = useFormSubmit({
    endpoint: site.forms.elevateReferralEndpoint,
    validate,
  })

  // Once Formspree has recorded the referral, hand the visitor on to Elevate Tuition in the
  // same tab after a short pause. (The previous site opened a new tab from a timer, which
  // most browsers block as a pop-up; a same-tab navigation is never blocked.)
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
        eyebrow={`With ${site.elevate.name}`}
        title="School, GCSE & A Level Tutoring"
        intro={`We work with ${site.elevate.name} for school students. Tell us a bit about you first.`}
      />

      <Section narrow>
        {status === 'success' ? (
          <FormSuccess title={`Great! You’re registered with ${site.elevate.name}.`}>
            <p>
              Taking you to {site.elevate.name} in a few seconds&hellip; or{' '}
              <a href={site.elevate.referralUrl} className="text-teal underline">
                continue now
              </a>
              .
            </p>
          </FormSuccess>
        ) : (
          <form
            method="post"
            action={site.forms.elevateReferralEndpoint}
            onSubmit={onSubmit}
            onChange={(event) => {
              const data = new FormData(event.currentTarget)
              setFieldsFilled(requiredFields.every((name) => String(data.get(name) || '').trim()))
            }}
            noValidate
            className="reveal relative space-y-6 rounded-[28px] bg-navy/85 p-6 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-10"
          >
            <Honeypot />
            <input type="hidden" name="_subject" value={`New ${site.elevate.name} referral`} />

            <TextField label="Full name" name="name" required autoComplete="name" error={errors.name} />
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField label="Email" name="email" type="email" required autoComplete="email" error={errors.email} />
              <TextField label="Phone" name="phone" type="tel" required autoComplete="tel" error={errors.phone} />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <SelectField
                label="Grade / Year"
                name="grade"
                required
                options={grades}
                placeholder="Choose a grade or year"
                error={errors.grade}
              />
              <TextField label="Subject of interest" name="subject" required placeholder="e.g. Maths, Chemistry" error={errors.subject} />
            </div>

            <p className="rounded-2xl bg-midnight/50 p-4 text-sm leading-relaxed text-muted">
              We use the details you give here only to process your referral to {site.elevate.name}. See our{' '}
              <Link to="/privacy" className="text-teal underline">
                Privacy Notice
              </Link>
              .
            </p>

            <FormError>{formError}</FormError>

            <Checkbox
              name="ageConfirmed"
              checked={ageConfirmed}
              onChange={(event) => setAgeConfirmed(event.target.checked)}
              error={errors.ageConfirmed}
            >
              I confirm that I am aged 18 or over, or I am the learner&rsquo;s parent or guardian. I understand that {site.legalName}{' '}
              will use and share the information provided with {site.elevate.name} to process this tutoring referral.
            </Checkbox>

            <Button type="submit" size="lg" disabled={status === 'sending' || !fieldsFilled || !ageConfirmed} className="w-full sm:w-auto">
              {status === 'sending' ? 'Sending…' : `Continue to ${site.elevate.name}`}
            </Button>
          </form>
        )}

        <p className="mt-8 text-sm">
          <Link to="/tutoring" className="inline-flex items-center gap-2 text-teal no-underline hover:text-cloud">
            <span className="rotate-180">
              <Icon name="arrow" size={16} />
            </span>
            Back to tutoring
          </Link>
        </p>
      </Section>
    </>
  )
}
