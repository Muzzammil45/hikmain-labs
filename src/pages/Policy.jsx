import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import { site } from '../config/site'

const placeholder = (topic) => `[Content to be provided: ${topic}]`

const policies = {
  privacy: {
    title: 'Privacy Notice',
    sections: [
      ['Who we are', placeholder('controller details and contact for data protection queries')],
      ['What personal data we collect', placeholder('categories of data collected through the contact and application forms')],
      ['How and why we use it', placeholder('purposes and lawful bases under UK GDPR')],
      ['Sharing and retention', placeholder('recipients, international transfers and retention periods')],
      ['Your rights', placeholder('rights of access, correction, erasure and complaint to the ICO')],
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    sections: [
      ['What are cookies', placeholder('plain-language explanation')],
      ['Cookies we use', placeholder('list of cookies, purposes and durations, or a statement that only essential cookies are used')],
      ['Managing cookies', placeholder('how visitors can control or withdraw consent')],
    ],
  },
  terms: {
    title: 'Website Terms of Use',
    sections: [
      ['Using this website', placeholder('acceptable use')],
      ['Information on this website', placeholder('no-advice and accuracy disclaimers')],
      ['Intellectual property', placeholder('ownership of website content')],
      ['Liability', placeholder('limitation of liability')],
      ['Governing law', placeholder('jurisdiction')],
    ],
  },
  'academic-integrity': {
    title: 'Academic Integrity Policy',
    statement: true,
    sections: [
      ['What tutors do', placeholder('explaining concepts, giving feedback, guiding practice')],
      ['What tutors do not do', placeholder('examinations, impersonation, completing assessed work for submission as the student’s own')],
      ['If a request breaches this policy', placeholder('how requests are declined and how concerns are handled')],
    ],
  },
  'contractor-notice': {
    title: 'Contractor Network Notice',
    sections: [
      ['Nature of the relationship', placeholder('independent contractor status, no employment, no guaranteed work')],
      ['Applications and data', placeholder('how applicant data is used and retained')],
      ['Confidentiality and conduct', placeholder('expectations for client information')],
      ['Taxes and checks', placeholder('contractor responsibilities and any lawful checks')],
    ],
  },
  accessibility: {
    title: 'Accessibility Statement',
    sections: [
      ['Our commitment', placeholder('commitment to WCAG 2.2 AA')],
      ['Known limitations', placeholder('any known accessibility issues')],
      ['Feedback and contact', placeholder('how to report accessibility problems')],
    ],
  },
}

export default function Policy({ slug }) {
  const policy = policies[slug]
  return (
    <>
      <Seo title={policy.title} description={`${policy.title} for ${site.name}.`} />
      <PageHero title={policy.title} />
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="rounded-lg bg-surface p-4 text-sm">
            This is a placeholder layout. Final wording should be reviewed by a qualified adviser before
            publication.
          </p>
          {policy.statement && (
            <p className="mt-8 rounded-xl border-2 border-accent p-5 text-lg font-medium leading-relaxed">
              HIKMAIN Labs supports genuine learning. Tutors explain concepts, give feedback and help
              students practice, but do not sit examinations, impersonate students or complete assessed
              work for submission as the student&rsquo;s own.
            </p>
          )}
          {policy.sections.map(([heading, body]) => (
            <section key={heading} className="mt-8">
              <h2 className="text-xl font-semibold">{heading}</h2>
              <p className="mt-2 leading-relaxed text-black/75">{body}</p>
            </section>
          ))}
          <p className="mt-10">
            Questions? <Link to="/contact">Contact us</Link>.
          </p>
        </div>
      </Section>
    </>
  )
}
