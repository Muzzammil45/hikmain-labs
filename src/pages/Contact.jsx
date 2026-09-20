import { Link, useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import Card, { Icon } from '../components/Card'
import Button from '../components/Button'
import { mailtoUrl, meetUrl, site, whatsappUrl } from '../config/site'
import useFormSubmit, { isEmail } from '../hooks/useFormSubmit'
import { Checkbox, SelectField, TextArea, TextField } from '../components/form/Fields'
import { Captcha, Honeypot } from '../components/form/SpamProtection'

const services = ['Project support', 'Tutoring', 'Contractor enquiry', 'General enquiry']
const methods = ['WhatsApp', 'Google Meet', 'Email']

// Accept either "Tutoring" or "Project support" etc. from ?service=
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

export default function Contact() {
  const [params] = useSearchParams()
  const { status, errors, formError, onSubmit } = useFormSubmit({
    endpoint: site.forms.contactEndpoint,
    validate,
  })
  const wa = whatsappUrl()

  return (
    <>
      <Seo
        title="Contact"
        description="Contact HIKMAIN Labs by WhatsApp, Google Meet or email to talk about project support or tutoring."
      />
      <PageHero
        title="Tell us what you need"
        intro="Choose whichever way of getting in touch suits you. Every conversation starts privately and with no obligation."
      />

      <Section>
        <h2 className="sr-only">Ways to get in touch</h2>
        <ul className="grid gap-5 md:grid-cols-3">
          <li>
            <Card title="WhatsApp" icon={<Icon name="chat" />} className="h-full">
              <p>Message us on WhatsApp Business for a quick, informal first conversation.</p>
              <Button className="mt-4" variant="primary" {...(wa ? { href: wa } : { href: mailtoUrl('WhatsApp request') })}>
                {wa ? 'Chat on WhatsApp' : 'Request a WhatsApp chat'}
              </Button>
            </Card>
          </li>
          <li>
            <Card title="Google Meet" icon={<Icon name="video" />} className="h-full">
              <p>Prefer to talk face to face? Request a Google Meet call at a time that suits you.</p>
              <Button className="mt-4" variant="secondary" href={meetUrl()}>
                Request a Google Meet
              </Button>
            </Card>
          </li>
          <li>
            <Card title="Email" icon={<Icon name="mail" />} className="h-full">
              <p>
                Write to us at{' '}
                <a href={`mailto:${site.contact.email}`} className="break-all font-medium text-action underline">
                  {site.contact.email}
                </a>
                .
              </p>
              <Button className="mt-4" variant="secondary" href={mailtoUrl()}>
                Send an email
              </Button>
            </Card>
          </li>
        </ul>
      </Section>

      <Section tone="surface">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold sm:text-3xl">Or send us a short message</h2>

          {status === 'success' ? (
            <div role="status" className="mt-6 rounded-xl border-2 border-accent bg-white p-6">
              <h3 className="text-xl font-semibold">Thank you, your message is on its way</h3>
              <p className="mt-2 leading-relaxed">
                We will get back to you using your preferred contact method as soon as we can.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="relative mt-6 space-y-6 rounded-2xl bg-white p-5 shadow-sm sm:p-8">
              <Honeypot />
              <input type="hidden" name="_subject" value="New enquiry from the HIKMAIN Labs website" />

              <TextField label="Name" name="name" required autoComplete="name" error={errors.name} />
              <fieldset className="space-y-6">
                <legend className="text-sm text-black/70">Please provide at least one way for us to reach you.</legend>
                <TextField label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
                <TextField
                  label="WhatsApp number"
                  name="whatsapp"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Include country code, e.g. +44 7700 900123"
                  error={errors.whatsapp}
                />
              </fieldset>
              <SelectField
                label="Service of interest"
                name="service"
                required
                options={services}
                placeholder="Choose a service"
                defaultValue={matchService(params.get('service'))}
                error={errors.service}
              />
              <SelectField label="Preferred contact method" name="preferred_method" options={methods} placeholder="No preference" />
              <TextArea label="Short message" name="message" rows={4} maxLength={2000} />

              <Checkbox name="consent" error={errors.consent}>
                I agree to HIKMAIN LABS LTD using my details to reply to this enquiry, as described in the{' '}
                <Link to="/privacy" className="text-action underline">Privacy Notice</Link>.
              </Checkbox>

              <Captcha />

              {formError && (
                <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-800">
                  {formError}
                </p>
              )}

              <Button type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </Button>
            </form>
          )}
        </div>
      </Section>
    </>
  )
}
