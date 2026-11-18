import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/Hero'
import Section from '../components/Section'
import Button from '../components/Button'
import Icon from '../components/Icon'
import EmailLink from '../components/EmailLink'
import EmailModal from '../components/EmailModal'
import useEmailModal from '../hooks/useEmailModal'
import { mailtoUrl, meetUrl, site, whatsappUrl } from '../config/site'
import useFormSubmit, { isEmail } from '../hooks/useFormSubmit'
import { Checkbox, FormError, FormSuccess, SelectField, TextArea, TextField } from '../components/form/Fields'
import { Honeypot } from '../components/form/SpamProtection'

const UNIVERSITY = 'University Tutoring'
const SCHOOL = 'School, GCSE or A Level Tutoring'
const services = ['Project support', UNIVERSITY, SCHOOL, 'Contractor enquiry', 'General enquiry']
const methods = ['WhatsApp', 'Google Meet', 'Email']

// Accept a service name (case-insensitive), e.g. ?service=University tutoring
const matchService = (value) => services.find((s) => s.toLowerCase() === String(value || '').toLowerCase()) || ''

function validate(data) {
  const errors = {}
  const email = String(data.get('email') || '').trim()
  const whatsapp = String(data.get('whatsapp') || '').trim()

  if (!String(data.get('name') || '').trim()) errors.name = 'Please enter your name.'
  if (!email && !whatsapp) {
    errors.email = 'Please give us an email address or a WhatsApp number so we can reply.'
  } else if (email && !isEmail(email)) {
    errors.email = 'Please enter a valid email address.'
  } else if (whatsapp && !/^\+?[\d\s()-]{7,}$/.test(whatsapp)) {
    errors.whatsapp = 'Please enter a valid WhatsApp number, including country code.'
  }
  if (!data.get('service')) errors.service = 'Please choose a service.'
  if (!data.get('consent')) errors.consent = 'Please confirm you agree to us using your details to reply.'
  return errors
}

function ContactCard({ icon, title, children, action, delay }) {
  return (
    <li className="reveal" style={{ '--reveal-delay': delay }}>
      <div className="beam-card h-full">
        <div className="beam-inner flex h-full flex-col gap-4 p-7">
          <span className="icon-tile">
            <Icon name={icon} />
          </span>
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex-1 leading-relaxed text-mist">{children}</div>
          {action}
        </div>
      </div>
    </li>
  )
}

export default function Contact() {
  const [params] = useSearchParams()
  const { status, errors, formError, onSubmit } = useFormSubmit({
    endpoint: site.forms.contactEndpoint,
    validate,
  })
  const wa = whatsappUrl()
  const email = useEmailModal()
  const [service, setService] = useState('')
  const isSchool = service === SCHOOL

  // Pre-select a service from ?service=…, after the first render so it matches the pre-rendered HTML.
  useEffect(() => {
    const match = matchService(params.get('service'))
    if (match) setService(match)
  }, [params])

  return (
    <>
      <Seo
        title="Contact"
        description="Contact HIKMAIN Labs by WhatsApp, Google Meet or email to talk about project support or tutoring."
      />
      <PageHero
        eyebrow="Contact"
        title="Tell us what you need"
        highlight={2}
        intro="Choose whichever way of getting in touch suits you. Every conversation starts privately and with no obligation."
      />

      <Section>
        <h2 className="sr-only">Ways to get in touch</h2>
        <ul className="grid gap-4 lg:grid-cols-3">
          <ContactCard
            icon="chat"
            title="WhatsApp"
            delay="0s"
            action={
              <Button className="w-full" href={wa || mailtoUrl('WhatsApp request')}>
                {wa ? 'Chat on WhatsApp' : 'Request a WhatsApp chat'}
              </Button>
            }
          >
            <p>Message us on WhatsApp Business for a quick, informal first conversation.</p>
          </ContactCard>
          <ContactCard
            icon="video"
            title="Google Meet"
            delay=".08s"
            action={
              <Button className="w-full" variant="ghost" href={meetUrl()}>
                Request a Google Meet
              </Button>
            }
          >
            <p>Prefer to talk face to face? Request a Google Meet call at a time that suits you.</p>
          </ContactCard>
          <ContactCard
            icon="mail"
            title="Email"
            delay=".16s"
            action={
              <Button ref={email.triggerRef} className="w-full" variant="ghost" href={mailtoUrl()} onClick={email.onClick}>
                Send an email
              </Button>
            }
          >
            <p>
              Write to us at <EmailLink className="break-words font-medium">{site.contact.email}</EmailLink>.
            </p>
          </ContactCard>
        </ul>
        <EmailModal open={email.open} onClose={email.close} triggerRef={email.triggerRef} />
      </Section>

      <Section narrow className="pt-0 sm:pt-4">
        <h2 className="reveal text-[clamp(1.75rem,3vw,2.25rem)] font-bold">Or send us a short message</h2>

        {status === 'success' ? (
          <div className="mt-6">
            <FormSuccess title="Thank you, your message is on its way">
              We will get back to you using your preferred contact method as soon as we can.
            </FormSuccess>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="reveal relative mt-6 space-y-6 rounded-[28px] bg-navy/85 p-6 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-10"
          >
            <Honeypot />
            <input type="hidden" name="_subject" value="New enquiry from the HIKMAIN Labs website" />

            <SelectField
              label="Service of interest"
              name="service"
              required
              options={services}
              placeholder="Choose a service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              error={errors.service}
            />

            <div aria-live="polite">
              {isSchool && (
                <div className="panel-in rounded-2xl bg-teal/[.08] p-5 shadow-[inset_0_0_0_1px_rgba(94,234,212,.45)]">
                  <h3 className="text-lg font-bold">Contact {site.elevate.name} directly</h3>
                  <p className="mt-2 leading-relaxed text-mist">
                    For school and pre-university tutoring, please contact {site.elevate.name} directly. They are an independent
                    tutoring partner with their own pricing, terms and privacy policy.
                  </p>
                  <Button className="mt-4" to="/elevate-referral">
                    Get Started <Icon name="arrow" size={18} />
                  </Button>
                </div>
              )}
            </div>

            {/* Hidden (not unmounted) for school enquiries, so typed answers survive switching back */}
            <div className={isSchool ? 'hidden' : 'space-y-6'}>
              <TextField label="Name" name="name" required autoComplete="name" error={errors.name} />
              <fieldset className="space-y-6">
                <legend className="mb-4 text-sm text-muted">Please provide at least one way for us to reach you.</legend>
                <div className="grid gap-6 sm:grid-cols-2">
                  <TextField label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
                  <TextField
                    label="WhatsApp number"
                    name="whatsapp"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Include country code, e.g. +44 7700 900123"
                    error={errors.whatsapp}
                  />
                </div>
              </fieldset>
              <SelectField label="Preferred contact method" name="preferred_method" options={methods} placeholder="No preference" />
              <TextArea label="Short message" name="message" rows={4} maxLength={2000} />

              <Checkbox name="consent" error={errors.consent}>
                I agree to {site.legalName} using my details to reply to this enquiry, as described in the{' '}
                <Link to="/privacy" className="text-teal underline">
                  Privacy Notice
                </Link>
                .
              </Checkbox>

              <p className="rounded-2xl bg-midnight/50 p-4 text-sm leading-relaxed text-muted">
                We use the details you give here only to reply to your enquiry. Please don&rsquo;t include sensitive or confidential
                information in your message. See our{' '}
                <Link to="/privacy" className="text-teal underline">
                  Privacy Notice
                </Link>{' '}
                for how we handle your data and your rights.
              </p>

              <FormError>{formError}</FormError>

              <Button type="submit" size="lg" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </Button>
            </div>
          </form>
        )}
      </Section>
    </>
  )
}
