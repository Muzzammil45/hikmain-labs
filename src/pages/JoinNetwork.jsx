import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/Hero'
import Section from '../components/Section'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { site } from '../config/site'
import useFormSubmit, { isEmail } from '../hooks/useFormSubmit'
import { Checkbox, Fieldset, FileField, FormError, FormSuccess, TextArea, TextField } from '../components/form/Fields'
import { Honeypot } from '../components/form/SpamProtection'

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

  const link = String(data.get('supporting_link') || '').trim()
  if (link && !/^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(link)) {
    errors.supporting_link = 'Please enter a full web link, e.g. https://drive.google.com/…'
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
      <PageHero
        eyebrow="Join our network"
        title="Join Our Contractor Network"
        highlight={2}
        intro="HIKMAIN Labs works with skilled independent contractors and freelancers on a project-by-project basis. Joining our network is not employment and does not guarantee any minimum amount, duration or frequency of work."
      >
        <Button href="#apply" size="lg">
          Go to the application <Icon name="arrow" size={18} />
        </Button>
      </PageHero>

      <Section narrow>
        <div className="reveal rounded-[28px] bg-navy/85 p-7 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-10">
          <h2 className="text-2xl font-bold">Before you apply</h2>
          <ul className="mt-6 grid gap-3">
            {infoPoints.map((p) => (
              <li key={p} className="flex gap-3 leading-relaxed text-mist">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal">
                  <Icon name="check" size={14} strokeWidth={2.8} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <h2 id="apply" className="reveal mt-16 scroll-mt-28 text-[clamp(1.75rem,3vw,2.25rem)] font-bold">
          Application form
        </h2>

        {status === 'success' ? (
          <div className="mt-6">
            <FormSuccess title="Thank you for applying">
              {site.forms.paidPlan
                ? 'We have received your application and will send a confirmation to the email address you provided. If you do not see it within a few minutes, please check your spam folder. '
                : 'We have received your application. '}
              Applications are reviewed as assignments arise, so we may not reply to every applicant.
            </FormSuccess>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="relative mt-6 space-y-6 rounded-[28px] bg-navy/85 p-6 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-10"
          >
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
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField label="Time zone" name="timezone" required placeholder="e.g. GMT, UTC+5" error={errors.timezone} />
              <TextField
                label="General availability"
                name="availability"
                required
                placeholder="e.g. weekday evenings, about 10 hours a week"
                error={errors.availability}
              />
            </div>
            <TextArea label="Areas of expertise" name="expertise" required rows={3} error={errors.expertise} />
            <TextField label="Languages" name="languages" placeholder="e.g. English (fluent), Urdu (native)" />
            <TextArea label="Relevant experience" name="experience" required rows={5} error={errors.experience} />

            {site.forms.paidPlan ? (
              <FileField
                label="Supporting material (CV or portfolio)"
                name="supporting_file"
                accept=".pdf,.doc,.docx,.rtf,.txt"
                error={errors.supporting_file}
                hint={`PDF or Word, up to ${MAX_FILE_MB} MB. Please do not upload passports, ID documents, bank details or any other sensitive personal documents.`}
              />
            ) : (
              <TextField
                label="Link to your CV or portfolio"
                name="supporting_link"
                type="url"
                inputMode="url"
                placeholder="e.g. a Google Drive, Dropbox or LinkedIn link"
                error={errors.supporting_link}
                hint="Please make sure the link can be opened by anyone who has it. Do not share passports, ID documents, bank details or any other sensitive personal documents."
              />
            )}

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

            <div className="rounded-2xl bg-midnight/50 p-5 shadow-[inset_0_0_0_1px_var(--color-line)]">
              <Fieldset legend="Declarations" hint="All of the following are required.">
                {declarations.map(([name, text]) => (
                  <Checkbox key={name} name={name} error={errors[name]}>
                    {name === 'declare_gdpr' ? (
                      <>
                        I consent to {site.legalName} processing my personal data to assess my application, as described in the{' '}
                        <Link to="/privacy" className="text-teal underline">
                          Privacy Notice
                        </Link>
                        .
                      </>
                    ) : (
                      text
                    )}
                  </Checkbox>
                ))}
              </Fieldset>
            </div>

            <p className="rounded-2xl bg-midnight/50 p-4 text-sm leading-relaxed text-muted">
              We use the information in this application only to assess your suitability for our contractor network and to contact
              you about it. Please don&rsquo;t include sensitive personal documents. See our{' '}
              <Link to="/privacy" className="text-teal underline">
                Privacy Notice
              </Link>{' '}
              for how we handle your data and your rights.
            </p>

            <FormError>{formError}</FormError>

            <Button type="submit" size="lg" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Submit application'}
            </Button>
          </form>
        )}
      </Section>
    </>
  )
}
