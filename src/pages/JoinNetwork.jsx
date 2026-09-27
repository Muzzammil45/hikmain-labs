import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import Button from '../components/Button'
import { site } from '../config/site'
import useFormSubmit, { isEmail } from '../hooks/useFormSubmit'
import { Checkbox, Fieldset, FileField, TextArea, TextField } from '../components/form/Fields'
import { Honeypot } from '../components/form/SpamProtection'
import { fadeUp } from '../lib/motion'

const infoPoints = [
  'Assignments are offered on a project-by-project basis, depending on client needs.',
  'Applying does not guarantee acceptance into the network, and acceptance does not guarantee work.',
  'Rates are agreed for each assignment before it begins.',
  'Contractors are responsible for their own taxes, insurance and any registrations required where they live.',
  'You will be expected to keep client and project information confidential.',
  'Suitable background or identity checks may be requested for certain assignments, where appropriate and lawful.',
]

const declarations = [
  ['declare_status', `I understand that I would be an independent contractor or freelancer, not an employee, worker or agent of ${site.legalName}.`],
  ['declare_no_guarantee', 'I understand that joining the network does not guarantee any minimum amount, duration or frequency of work.'],
  ['declare_accuracy', 'I confirm that the information I have provided is accurate and complete to the best of my knowledge.'],
  ['declare_taxes', 'I understand that I am responsible for my own taxes, insurance and any registrations required.'],
  // Rendered with a Privacy Notice link in the form below
  ['declare_gdpr'],
]

const MAX_FILE_MB = 5
const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024
const ALLOWED_FILE = /\.(pdf|docx?|rtf|txt)$/i
// Filenames that clearly suggest sensitive personal documents (e.g. "passport-scan.pdf").
// Deliberately narrow so ordinary CV names such as "personal-statement.pdf" still pass.
// Client-side guard only; the on-page warning is the main protection.
const SENSITIVE_FILE = /passport|driv(er|ing)[\s_-]*licen[cs]e|national[\s_-]*(id|insurance)|\bnin\b|\bssn\b|social[\s_-]*security|bank[\s_-]*statement|payslip|\bvisa\b|birth[\s_-]*cert|\bid[\s_-]*(card|scan|document)|identity[\s_-]*(card|document)/i

const required = {
  full_name: 'Please enter your full name.',
  country: 'Please enter your country of residence.',
  address: 'Please enter your address.',
  timezone: 'Please enter your time zone.',
  availability: 'Please describe your general availability.',
  expertise: 'Please tell us your areas of expertise.',
  experience: 'Please describe your relevant experience.',
  statement: 'Please tell us why you are interested.',
}

function validate(data) {
  const errors = {}
  for (const [name, message] of Object.entries(required)) {
    if (!String(data.get(name) || '').trim()) errors[name] = message
  }
  if (!isEmail(data.get('email'))) errors.email = 'Please enter a valid email address.'
  if (!data.get('equipment')) errors.equipment = 'Please confirm you have suitable equipment and internet.'
  for (const [name] of declarations) {
    if (!data.get(name)) errors[name] = 'Please tick to confirm this declaration.'
  }

  const file = data.get('supporting_file')
  if (file && file.size > 0) {
    if (!ALLOWED_FILE.test(file.name)) errors.supporting_file = 'Please upload a PDF, Word document, RTF or text file.'
    else if (file.size > MAX_FILE_BYTES) errors.supporting_file = `Your file is larger than ${MAX_FILE_MB} MB. Please upload a smaller version.`
    else if (SENSITIVE_FILE.test(file.name)) errors.supporting_file = 'This looks like a sensitive personal document. Please upload only a CV or portfolio.'
  }
  return errors
}

export default function JoinNetwork() {
  const { status, errors, formError, onSubmit } = useFormSubmit({
    endpoint: site.forms.applicationEndpoint,
    validate,
  })

  return (
    <>
      <Seo
        title="Join Our Network"
        description="Apply to join the HIKMAIN Labs network of independent contractors and freelancers for project-by-project work."
      />
      <PageHero title="Join Our Contractor Network" />

      <Section>
        <motion.div variants={fadeUp} className="mx-auto max-w-3xl">
          <p className="rounded-xl border-l-4 border-accent bg-surface p-5 text-lg leading-relaxed">
            HIKMAIN Labs works with skilled independent contractors and freelancers on a
            project-by-project basis. Joining our network is not employment and does not guarantee any
            minimum amount, duration or frequency of work.
          </p>

          <h2 className="mt-10 text-2xl font-bold">Before you apply</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed marker:text-accent">
            {infoPoints.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <h2 id="apply" className="mt-14 text-2xl font-bold">Application form</h2>

          {status === 'success' ? (
            <div role="status" className="mt-6 rounded-xl border-2 border-accent bg-surface p-6">
              <h3 className="text-xl font-semibold">Thank you for applying</h3>
              <p className="mt-2 leading-relaxed">
                We have received your application and will send a confirmation to the email address you
                provided. If you do not see it within a few minutes, please check your spam folder. Applications are
                reviewed as assignments arise, so we may not reply to every applicant.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="relative mt-6 space-y-6">
              <Honeypot />
              <input type="hidden" name="_subject" value="New contractor network application" />

              <div className="grid gap-6 sm:grid-cols-2">
                <TextField label="Full name" name="full_name" required autoComplete="name" error={errors.full_name} />
                <TextField label="Preferred name" name="preferred_name" />
              </div>
              <TextField label="Email" name="email" type="email" required autoComplete="email" error={errors.email} />
              <TextField label="Country of residence" name="country" required autoComplete="country-name" error={errors.country} />
              <TextField
                label="Address"
                name="address"
                required
                autoComplete="street-address"
                placeholder="e.g. 123 Main Street, Lagos, Nigeria"
                error={errors.address}
              />
              <TextField label="Time zone" name="timezone" required placeholder="e.g. GMT, UTC+5" error={errors.timezone} />
              <TextField
                label="General availability"
                name="availability"
                required
                placeholder="e.g. weekday evenings, about 10 hours a week"
                error={errors.availability}
              />
              <TextArea label="Areas of expertise" name="expertise" required rows={3} error={errors.expertise} />
              <TextField label="Languages" name="languages" placeholder="e.g. English (fluent), Urdu (native)" />
              <TextArea label="Relevant experience" name="experience" required rows={5} error={errors.experience} />

              <FileField
                label="Supporting material (CV or portfolio)"
                name="supporting_file"
                accept=".pdf,.doc,.docx,.rtf,.txt"
                error={errors.supporting_file}
                hint={`PDF or Word, up to ${MAX_FILE_MB} MB. Please do not upload passports, ID documents, bank details or any other sensitive personal documents.`}
              />

              <Checkbox name="equipment" error={errors.equipment}>
                I confirm that I have a suitable computer and a reliable internet connection for remote work.
              </Checkbox>

              <TextArea
                label="Application statement"
                name="statement"
                required
                rows={5}
                hint="Tell us why you are interested in joining the network."
                error={errors.statement}
              />

              <Fieldset legend="Declarations" hint="All of the following are required.">
                {declarations.map(([name, text]) => (
                  <Checkbox key={name} name={name} error={errors[name]}>
                    {name === 'declare_gdpr' ? (
                      <>
                        I consent to {site.legalName} processing my personal data to assess my application, as
                        described in the <Link to="/privacy" className="text-action underline">Privacy Notice</Link>.
                      </>
                    ) : (
                      text
                    )}
                  </Checkbox>
                ))}
              </Fieldset>

              <p className="rounded-lg bg-surface p-3 text-sm leading-relaxed text-black/75">
                We use the information in this application only to assess your suitability for our
                contractor network and to contact you about it. Please don&rsquo;t include sensitive
                personal documents. See our{' '}
                <Link to="/privacy" className="text-action underline">Privacy Notice</Link> for how we handle your
                data and your rights.
              </p>

              {formError && (
                <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-800">
                  {formError}
                </p>
              )}

              <Button type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Submit application'}
              </Button>
            </form>
          )}
        </motion.div>
      </Section>
    </>
  )
}
