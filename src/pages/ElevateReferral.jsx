import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import Button from '../components/Button'
import { site } from '../config/site'
import useFormSubmit, { isEmail } from '../hooks/useFormSubmit'
import { Checkbox, SelectField, TextField } from '../components/form/Fields'
import { Honeypot } from '../components/form/SpamProtection'
import { fadeUp } from '../lib/motion'

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
  const [popupBlocked, setPopupBlocked] = useState(false)
  const [ageConfirmed, setAgeConfirmed] = useState(false)
  const [fieldsFilled, setFieldsFilled] = useState(false)
  const { status, errors, formError, onSubmit } = useFormSubmit({
    endpoint: site.forms.elevateReferralEndpoint,
    validate,
  })

  // Once Formspree has confirmed the referral was recorded, hand the visitor on to Elevate
  // Tuition after a short pause so they have time to read the confirmation first.
  //
  // Note: because window.open() here runs inside a setTimeout — not synchronously within the
  // click that submitted the form — most browsers no longer treat it as part of that user
  // gesture, so a popup blocker is more likely to block it than if it were opened immediately.
  // The manual "open it yourself" link below is the fallback for exactly that case.
  useEffect(() => {
    if (status !== 'success') return undefined
    const timer = setTimeout(() => {
      const opened = window.open(site.elevate.referralUrl, '_blank')
      if (opened) opened.opener = null // equivalent to rel="noopener" for a window.open() call
      setPopupBlocked(!opened)
    }, REDIRECT_DELAY_MS)
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
        <motion.div variants={fadeUp} className="mx-auto max-w-2xl">
          {status === 'success' ? (
            <div role="status" className="rounded-xl border-2 border-accent bg-white p-6">
              <h2 className="text-xl font-semibold">Great! You&rsquo;re registered with {site.elevate.name}.</h2>
              <p className="mt-2 leading-relaxed">
                Opening {site.elevate.name} in a new tab in a few seconds&hellip; or{' '}
                <a href={site.elevate.referralUrl} target="_blank" rel="noopener noreferrer">
                  continue now
                </a>
                .
              </p>

              {popupBlocked && (
                <div className="mt-3 rounded-lg bg-surface p-3">
                  <p className="text-sm leading-relaxed">
                    Your browser blocked the new tab. Please allow pop-ups for this site, or continue manually:
                  </p>
                  <Button href={site.elevate.referralUrl} className="mt-3 w-full sm:w-auto">
                    Open {site.elevate.name}
                  </Button>
                </div>
              )}
            </div>
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
                <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-800">
                  {formError}
                </p>
              )}

              <Checkbox
                name="ageConfirmed"
                checked={ageConfirmed}
                onChange={(event) => setAgeConfirmed(event.target.checked)}
                error={errors.ageConfirmed}
              >
                I confirm that I am aged 18 or over, or I am the learner&rsquo;s parent or guardian. I understand that
                HIKMAIN LABS LTD will use and share the information provided with Elevate Tuition to process this
                tutoring referral.
              </Checkbox>

              <Button
                type="submit"
                disabled={status === 'sending' || !fieldsFilled || !ageConfirmed}
                className="w-full sm:w-auto"
              >
                {status === 'sending' ? 'Sending…' : `Continue to ${site.elevate.name}`}
              </Button>
            </form>
          )}

          <p className="mt-6 text-sm">
            <Link to="/tutoring">&larr; Back to tutoring</Link>
          </p>
        </motion.div>
      </Section>
    </>
  )
}
