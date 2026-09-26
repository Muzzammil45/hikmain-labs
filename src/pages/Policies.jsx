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
        `${legalName} ("HIKMAIN", "we", "us" or "our") is a company registered in England and Wales under company number ${company.number}. Our registered office is ${company.registeredOffice}. This notice explains how we handle personal data when people visit our website, contact us, enquire about our services, become clients, receive tutoring support, or otherwise interact with us.`,
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

  cookies: {
    title: 'Cookie Policy',
    description: `How the ${site.name} website uses cookies and similar technologies.`,
    intro: "This policy explains how HIKMAIN's website uses cookies and similar storage/access technologies.",
    sections: [
      sec('Types of technologies', [], [
        'Strictly necessary technologies: required for core website operation, security, network delivery or remembering a visitor’s cookie preference. These are limited to what is genuinely necessary. Our enquiry and application forms use Cloudflare Turnstile, a security check that helps us block automated spam.',
        'Analytics technologies: HIKMAIN plans to use Google Analytics and Vercel Analytics to understand website traffic and how visitors use the site so that performance and content can be improved.',
        'Marketing technologies: none are currently used.',
      ]),
      sec('Google Analytics', [
        'Google Analytics may use cookies and related technologies to measure visits and interactions. Where it is used, it will only run after a visitor has agreed to non-essential analytics.',
      ]),
      sec('Vercel Analytics', [
        'Vercel Analytics is used for website performance and usage insights. We describe here what the live implementation actually does, rather than assuming a cookie is present.',
      ]),
      sec('Visitor choices', [
        'Non-essential storage or access technologies are not activated until a visitor has made the choice required by applicable UK rules. Visitors can reject non-essential technologies as easily as they can accept them and can revisit their preferences later. Browser controls can also be used to block or delete cookies.',
      ]),
      sec('Changes to this policy', [
        'We update this policy whenever analytics, advertising, embedded media or other tracking technologies change.',
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

  'academic-integrity': {
    title: 'Academic Integrity Policy',
    description: `${site.name} supports genuine learning. Read what tutoring support we do and do not provide.`,
    statement: true,
    intro:
      "HIKMAIN supports learning. Our tutoring and academic-support services are intended to help students understand material, develop skills and improve their own work - not to replace the student's authorship, identity or responsibility.",
    sections: [
      sec('Permitted support', [], [
        'Teaching and explaining concepts, including university-level material.',
        'Revision sessions, study planning, practice questions and worked examples created for learning.',
        "Reviewing a student's own draft and providing feedback, explanations and suggestions for improvement.",
        'Helping students understand assignment instructions, marking criteria, research methods, referencing principles and study techniques.',
        "Proofreading or language feedback where this remains consistent with the student's institution rules and does not replace the student's substantive work.",
        'General educational guidance and skills development.',
      ]),
      sec('Support we will not provide', [], [
        'Writing or completing assessed essays, reports, dissertations, assignments or other submissions for a student to present as their own.',
        "Sitting, taking or completing an examination, test, quiz, interview or other assessment on another person's behalf.",
        "Impersonating a student or using a student's account to misrepresent who completed assessed work.",
        'Creating fabricated research, references, results or evidence, or knowingly assisting plagiarism.',
        'Helping a person evade academic-integrity controls or conceal prohibited assistance.',
      ]),
      sec('Right to refuse or stop work', [
        "HIKMAIN may refuse, pause or terminate a tutoring or academic-support request where we reasonably believe the requested work would breach this policy, an institution's academic-integrity rules, applicable law, or a third-party platform's legitimate requirements.",
      ]),
      sec('Misconduct discovered after payment', [
        'If prohibited conduct is discovered after payment or after work has begun, HIKMAIN may stop the affected service. Any refund or amount due will be considered according to the work legitimately performed, the applicable client terms and the circumstances of the breach. Payment does not create a right to receive prohibited assistance.',
      ]),
      sec('Student responsibility', [
        'Students remain responsible for understanding and complying with the rules of their university, college, course, examination body or other institution, including any rules on AI-assisted work, proofreading, collaboration and tutoring.',
      ]),
    ],
  },

  'contractor-notice': {
    title: 'Contractor Network Notice',
    description: `How ${site.name} works with independent contractors and freelancers.`,
    intro: 'HIKMAIN uses a network of independent contractors to support certain AI, technology, project and related services.',
    sections: [
      sec('Independent status', [
        'Contractors are engaged on an independent-contractor basis and are not employees merely because they perform work for HIKMAIN or its clients. HIKMAIN does not guarantee a minimum amount of work, number of projects, working hours or earnings. Contractors may accept or decline new assignments and may generally provide services to other businesses, subject to confidentiality, security and accepted project obligations.',
      ]),
      sec('Projects, fees and invoices', [
        "Project scope, rates, deadlines and other project-specific requirements may be agreed separately. Contractors are normally expected to invoice HIKMAIN for amounts due for accepted work. Payment timing, currency and method are governed by the contractor's agreement and any applicable project-specific terms.",
      ]),
      sec('Benefits and taxes', [
        'Independent contractors are not entitled under the contractor arrangement to employee benefits such as paid holiday, sick pay, pension contributions or guaranteed wages. Contractors are generally responsible for their own tax, registration and statutory obligations in the jurisdiction in which they operate, subject to any legal reporting or withholding obligations that apply to HIKMAIN.',
      ]),
      sec('Client and data protection', [
        'Contractors may receive access to client information, systems or credentials only where reasonably necessary for authorised work. They are expected to comply with confidentiality, data-protection, security, account-access and intellectual-property requirements applicable to their engagement.',
      ]),
      sec('No authority to bind HIKMAIN', [
        'A contractor cannot enter into a contract or financial commitment on behalf of HIKMAIN, or represent themselves as a director or employee of HIKMAIN, unless expressly authorised in writing.',
      ]),
    ],
  },

  accessibility: {
    title: 'Accessibility Statement',
    description: `${site.name}'s commitment to an accessible website.`,
    intro: 'HIKMAIN wants its website to be usable by as many people as reasonably possible, including people who use assistive technologies.',
    sections: [
      sec('Accessibility target', [
        'The website is designed and maintained with WCAG 2.2 Level AA as the accessibility target. This statement describes a target, not a certification that every page currently conforms.',
      ]),
      sec('Measures for the website', [], [
        'Use clear heading structures, readable text and meaningful link labels.',
        'Provide keyboard-accessible navigation and controls.',
        'Provide text alternatives for meaningful images where appropriate.',
        'Maintain sufficient visual contrast and visible focus indicators.',
        'Ensure forms have clear labels, instructions and understandable error messages.',
        'Avoid relying only on colour, sound or pointer interaction to communicate essential information.',
        'Test important pages and forms across common screen sizes and interaction methods.',
      ]),
      sec('Known limitations', [
        "No specific accessibility limitations have yet been formally documented. Third-party embedded services, such as the Cloudflare Turnstile security check on our forms, may have accessibility characteristics outside HIKMAIN's direct control.",
      ]),
      sec('Feedback', [
        `If a visitor experiences an accessibility problem or needs information in a different format, they can contact HIKMAIN at ${contact.email} or ${contact.phone}. Please include the page or feature involved and a description of the problem where possible.`,
      ]),
      sec('Ongoing improvement', [
        'HIKMAIN will review accessibility as the website evolves and will aim to address material barriers identified through testing or user feedback.',
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
            {policy.statement && (
              <p className="rounded-xl border-2 border-accent p-5 text-lg font-medium leading-relaxed">
                HIKMAIN Labs supports genuine learning. Tutors explain concepts, give feedback and help
                students practice, but do not sit examinations, impersonate students or complete assessed
                work for submission as the student&rsquo;s own.
              </p>
            )}
            {policy.intro && (
              <p className={`${policy.statement ? 'mt-6' : ''} text-lg leading-relaxed text-black/80`}>
                {policy.intro}
              </p>
            )}

            {policy.sections.map((s) => (
              <section key={s.heading} id={slugify(s.heading)} className="mt-9 scroll-mt-24">
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
