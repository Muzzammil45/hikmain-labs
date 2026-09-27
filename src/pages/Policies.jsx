import { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import { lastUpdated, site } from '../config/site'

const { legalName, company, contact } = site

// Helper: a section with optional paragraphs and bullet points.
const sec = (heading, paragraphs = [], bullets = []) => ({ heading, paragraphs, bullets })

/**
 * Policy content, keyed by URL slug (matching site.policyLinks).
 * Source: HIKMAIN LABS LTD Website Launch Information Pack, 26 September 2026.
 * The pack's developer-only notes are deliberately not published here.
 */
const policies = {
  privacy: {
    title: 'Privacy Notice',
    description: `How ${legalName} handles personal data when you visit our website, contact us or use our services.`,
    sections: [
      sec('Who we are', [
        `${legalName} is a company registered in England and Wales under company number ${company.number}. Our registered office is ${company.registeredOffice}. This notice explains how we handle personal data when people visit our website, contact us, enquire about our services, become clients, receive tutoring support, or otherwise interact with us.`,
      ]),
      sec('Personal data we may collect', [], [
        'Identity and contact information, such as name, email address, telephone/WhatsApp number and any organisation or institution details voluntarily supplied.',
        'Enquiry information submitted through the website contact form, email or WhatsApp, including the contents of messages and information needed to understand the requested service.',
        'Client and service administration information, including communications, agreed project requirements, invoices, payment records and contract records where a person becomes a client.',
        'Technical and usage information generated when the website is used, such as pages viewed, approximate location derived from network information, device/browser information, referral source and interaction data, where collected through configured analytics services.',
        'Any other information a person chooses to provide. Visitors should avoid submitting unnecessary sensitive or confidential information through the general enquiry form.',
      ]),
      sec('Why we use personal data and lawful bases', ['We use personal data only where we have a lawful basis. Depending on the circumstances, this may include:'], [
        "Taking steps at a person's request before entering a contract, and performing a contract once services are agreed.",
        "Our legitimate interests in responding to enquiries, operating and improving HIKMAIN's services, maintaining business records, preventing misuse and protecting our systems, where those interests are not overridden by the individual's rights.",
        'Compliance with legal obligations, including accounting, tax, regulatory and record-keeping requirements.',
        'Consent where consent is required, including for non-essential cookies or analytics technologies where applicable. Consent may be withdrawn at any time through the available preference controls.',
      ]),
      sec('Who may receive personal data', [
        'Access is limited to people and service providers who reasonably need the information for the relevant purpose. This may include HIKMAIN personnel, authorised independent contractors working on an accepted service, website hosting and technology providers, analytics providers, professional advisers, payment providers and public authorities where disclosure is legally required. Contractors receive only information reasonably necessary for authorised work and are expected to follow applicable confidentiality and security requirements.',
      ]),
      sec('International transfers', [
        'HIKMAIN may work with independent contractors and service providers located outside the United Kingdom. Where UK personal data is transferred internationally, HIKMAIN will take appropriate steps required by applicable data-protection law, which may include using an adequacy arrangement or approved contractual safeguards where required.',
      ]),
      sec('How long we keep information', [
        'We keep personal data only for as long as reasonably necessary for the purpose for which it was collected and to meet legal, accounting, tax, dispute-resolution and security requirements. General enquiries that do not become a client relationship should be reviewed periodically and deleted when no longer needed. Contract, invoice and accounting records may need to be retained for longer statutory periods. Analytics retention follows the settings configured in the relevant analytics platform.',
      ]),
      sec('Your rights', [
        'Depending on the circumstances, individuals may have rights to request access to their personal data, correction of inaccurate data, deletion, restriction of processing, objection to certain processing, data portability, and withdrawal of consent where processing is based on consent. Some rights are subject to legal conditions and exceptions.',
      ]),
      sec('Contact and complaints', [
        `Privacy enquiries and rights requests can be sent to ${contact.email} or to ${legalName} at ${company.registeredOffice}. Individuals also have the right to complain to the UK Information Commissioner's Office (ICO) if they are concerned about how their personal data has been handled.`,
      ]),
      sec('Changes to this notice', [
        'We may update this notice when our website, services, providers or legal obligations change. The latest version always displays its most recent update date.',
      ]),
    ],
  },

  terms: {
    title: 'Website Terms of Use',
    description: `Terms for using the ${site.name} website.`,
    sections: [
      sec('About these terms', [
        `These Terms of Use apply to use of the ${legalName} website. They govern browsing and interaction with the website only. Specific paid services are governed by the relevant client agreement, project terms, invoice or other written agreement.`,
      ]),
      sec('Website content and intellectual property', [
        'Unless stated otherwise, the website and its original text, branding, graphics, layouts, documents and other content are owned by or licensed to HIKMAIN. Visitors may view the website for personal or legitimate business purposes but may not copy, reproduce, republish, sell, scrape or commercially exploit protected content without permission, except where permitted by law.',
      ]),
      sec('Acceptable use', [
        'Visitors must not misuse the website, attempt unauthorised access, interfere with security or availability, introduce malicious code, use automated systems in a way that places an unreasonable load on the service, impersonate another person, submit unlawful or fraudulent enquiries, or use the website to facilitate academic misconduct or other unlawful activity.',
      ]),
      sec('Information and availability', [
        'We aim to keep website information accurate and useful, but website content is general information and may change. Availability may occasionally be interrupted for maintenance, security, hosting or technical reasons. Nothing on the website guarantees that HIKMAIN will accept a particular project or provide a particular outcome.',
      ]),
      sec('Third-party links', [
        "The website may link to independent third-party websites or services, including partners or providers that may be more appropriate for a visitor's needs. A link does not make HIKMAIN responsible for the third party's website, availability, privacy practices, content or services. Visitors should review the third party's own terms and privacy information.",
      ]),
      sec('Liability', [
        "Nothing in these Terms excludes liability that cannot lawfully be excluded. To the fullest extent permitted by law, HIKMAIN is not responsible for losses arising solely from reliance on general website content, third-party websites, or interruptions outside HIKMAIN's reasonable control. Any liability connected with paid services is governed by the applicable service agreement.",
      ]),
      sec('Reporting misuse', [`Suspected website abuse, security issues or misuse can be reported to ${contact.email}.`]),
      sec('Governing law', [
        'These website Terms of Use are governed by the laws of England and Wales, subject to any mandatory rights that apply to a visitor and cannot legally be excluded.',
      ]),
    ],
  },
}

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

/** Renders text, turning any occurrence of the company email into a mailto link. */
function Rich({ text }) {
  const parts = text.split(contact.email)
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
    </Fragment>
  ))
}

export default function Policies({ slug }) {
  const policy = policies[slug]

  return (
    <>
      <Seo title={policy.title} description={policy.description} />
      <PageHero title={policy.title}>
        <p className="text-sm text-white/80">Last updated: {lastUpdated}</p>
      </PageHero>

      <Section>
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Policy navigation: tabs on small screens, sticky list on large screens */}
          <nav aria-label="Policies" className="lg:col-span-1">
            <ul className="flex flex-wrap gap-2 lg:sticky lg:top-24 lg:flex-col lg:gap-1">
              {site.policyLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'bg-surface text-black hover:bg-primary/10'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <article className="max-w-3xl lg:col-span-3">
            {policy.sections.map((s) => (
              <section key={s.heading} id={slugify(s.heading)} className="mt-9 scroll-mt-24 first:mt-0">
                <h2 className="text-xl font-semibold sm:text-2xl">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className="mt-3 leading-relaxed text-black/80">
                    <Rich text={p} />
                  </p>
                ))}
                {s.bullets.length > 0 && (
                  <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-black/80 marker:text-accent">
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <p className="mt-12 border-t border-slate-200 pt-6 text-sm text-black/70">
              Questions about this page? <Link to="/contact">Contact us</Link>.
            </p>
          </article>
        </div>
      </Section>
    </>
  )
}
