import { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Section, { SectionHeading } from '../components/Section'
import Card, { Icon } from '../components/Card'
import Button from '../components/Button'
import Accordion from '../components/Accordion'
import EmailModal from '../components/EmailModal'
import ContactOptionsModal from '../components/ContactOptionsModal'
import useEmailModal from '../hooks/useEmailModal'
import { mailtoUrl, meetUrl, whatsappUrl } from '../config/site'
import { fadeUp } from '../lib/motion'

// Logged for now (no analytics platform wired up yet); kept in one place so it's easy to
// swap for a real analytics call later.
function track(event, data) {
  // eslint-disable-next-line no-console
  console.log('[analytics]', event, data)
}

const categories = [
  {
    id: 'ai-data',
    icon: 'data',
    title: 'AI and Data Support',
    services: [
      'Human evaluation of AI outputs',
      'Response comparison and ranking',
      'Written feedback against project guidelines',
      'Data annotation and categorisation',
      'Prompt and response review',
      'Accuracy and consistency checking',
      'Quality review of completed batches',
    ],
    suitableFor: 'AI training, evaluation, data preparation and projects that require consistent human judgement.',
    // Used to fill in enquiry messages, worded to read naturally after "I would like to discuss…"
    enquiryContext: 'human evaluation support for an AI or data project',
  },
  {
    id: 'research-digital',
    icon: 'search',
    title: 'Research and Digital Assistance',
    services: [
      'Online research and source gathering',
      'Information gathering and verification',
      'Spreadsheet organisation',
      'Concise research summaries',
      'Project documentation',
      'Data entry and digital administration',
      'Organisation of findings',
    ],
    suitableFor:
      'consultants, freelancers, students and independent professionals who need information found, structured or maintained.',
    enquiryContext: 'research and digital assistance',
  },
  {
    id: 'ongoing',
    icon: 'repeat',
    title: 'Ongoing Managed Support',
    services: [
      'Weekly recurring assignments',
      'Repeated digital workloads',
      'Task allocation across suitable contractors',
      'Progress tracking',
      'Weekly completion summaries',
      'Quality control',
      'Flexible capacity as workload changes',
    ],
    suitableFor: 'regular work that needs dependable completion without hiring permanent staff.',
    enquiryContext: 'ongoing weekly project support',
  },
]

const managedDeliveryPoints = [
  { icon: 'task', title: 'Suitable assignment', text: 'Work is allocated according to the agreed need and available capability.' },
  { icon: 'chat', title: 'Central communication', text: 'The client deals with HIKMAIN as the principal project contact.' },
  { icon: 'data', title: 'Progress visibility', text: 'Updates are organised around the agreed project or recurring workload.' },
  { icon: 'check', title: 'Quality review', text: 'Completed work is checked against the agreed scope before or during delivery.' },
]

const processSteps = [
  { title: 'Discuss the project', text: 'Start privately by WhatsApp, Google Meet or email.' },
  { title: 'Agree the arrangement', text: 'Confirm scope, timing, price, written terms and invoice.' },
  { title: 'Assign and manage work', text: 'HIKMAIN coordinates suitable independent support.' },
  { title: 'Review and complete', text: 'Check the agreed output and organise delivery or revisions.' },
]

const faqs = [
  { id: 'one-off-support', question: 'Can I request one-off support?', answer: 'Yes. One-off tasks, short projects and recurring support can all be discussed.' },
  { id: 'weekly-support', question: 'Can HIKMAIN provide ongoing weekly support?', answer: 'Yes, where the workload, timing and available capacity are suitable.' },
  { id: 'who-completes', question: 'Who completes my project?', answer: 'Suitable independent professionals may be assigned and coordinated by HIKMAIN.' },
  { id: 'single-contact', question: 'Will I communicate with several contractors?', answer: 'Normally HIKMAIN remains the central point of contact unless another arrangement is agreed.' },
  { id: 'pricing', question: 'How is the price decided?', answer: 'Price is based on the scope, workload, timing and delivery requirements and is agreed privately.' },
  { id: 'workload-changes', question: 'Can workload increase or decrease?', answer: 'Changes can be discussed and require an updated agreement where they affect scope or price.' },
  { id: 'confidentiality', question: 'How do you handle confidential information?', answer: 'Confidentiality requirements are discussed before acceptance.' },
  { id: 'revisions', question: 'Can I request revisions?', answer: 'Revision arrangements are defined in the agreed scope.' },
  { id: 'outside-scope', question: 'What happens outside the agreed scope?', answer: 'Additional work is discussed and confirmed separately before it begins.' },
  { id: 'not-guaranteed', question: 'Is every project accepted?', answer: 'No. HIKMAIN reviews each request for suitability, capacity and clarity before confirming.' },
]

const categoryIds = categories.map((c) => c.id)

export default function ProjectSupport() {
  const location = useLocation()
  // A footer/home-page link like /project-support#ai-data can arrive with a category already
  // in mind; carrying that into the selector keeps the page consistent with what was clicked.
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const id = location.hash.replace('#', '')
    return categoryIds.includes(id) ? id : null
  })
  const { open: emailOpen, onClick: emailOnClick, openModal: openEmailModal, close: emailClose, triggerRef: emailTriggerRef } = useEmailModal()
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const discussTriggerRef = useRef(null)

  const selectCategory = (id) => {
    setSelectedCategory(id)
    track('support_category_selected', { category: id })
  }

  const discussOption = (categoryId) => {
    track('discuss_option_clicked', { category: categoryId })
    setContactModalOpen(true)
  }

  // "Send an Email" inside the contact-options modal hands off to the sitewide email modal
  // (Gmail/Outlook/mail app/copy) rather than a bare mailto:, matching every other email
  // link on the site; the two modals never show at once, so closing one to open the other
  // reads as a single smooth swap.
  const handleEmailFromContactModal = () => {
    setContactModalOpen(false)
    openEmailModal()
    track('enquiry_initiated', { channel: 'email' })
  }

  const selected = categories.find((c) => c.id === selectedCategory) || null

  const whatsappMessage = selected
    ? `Hello HIKMAIN Labs, I would like to discuss ${selected.enquiryContext}. Please let me know a suitable next step.`
    : 'Hello HIKMAIN Labs, I would like to discuss a project with HIKMAIN. Please let me know a suitable next step.'
  const emailSubject = selected ? `Project enquiry — ${selected.title}` : 'Project enquiry'
  const emailBody = selected
    ? `Hello HIKMAIN Labs, I would like to discuss ${selected.enquiryContext}. Please let me know a suitable next step.`
    : 'Hello HIKMAIN Labs, I would like to discuss a project with you. Please let me know a suitable next step.'
  const wa = whatsappUrl(whatsappMessage)

  return (
    <>
      <Seo
        title="AI & Project Support"
        description="Flexible AI, data, research and recurring digital project support for individuals, independent professionals and growing teams."
      />

      {/* Hero */}
      <PageHero
        eyebrow="AI and Digital Project Support"
        title="Reliable project support without building a full-time team"
        intro="HIKMAIN Labs helps individuals, independent professionals and growing teams complete AI, data, research and recurring digital work. We match each project with suitable independent professionals while managing communication, progress and quality through one clear point of contact."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="#enquiry">Discuss Your Project</Button>
          <Button href="#selector" variant="outlineLight">
            Explore Support Options
          </Button>
        </div>
      </PageHero>

      {/* Support selector */}
      <Section id="selector">
        <SectionHeading
          eyebrow="Choose an area"
          title="Support options"
          intro="Select the category closest to your need. Your choice carries through to the enquiry below."
        />
        <motion.ul variants={fadeUp} className="mt-8 grid gap-5 md:grid-cols-3">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id
            return (
              // The border/shadow/hover-lift live on the <li> (the visual "card") so the
              // selection button and the "Discuss This Option" button below can be real,
              // independent sibling <button>s rather than one nested inside the other.
              <li
                key={category.id}
                id={category.id}
                className={`scroll-mt-16 flex h-full flex-col rounded-xl border-2 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md ${
                  isSelected ? 'border-accent ring-2 ring-accent/30' : 'border-slate-200 hover:border-action/60'
                }`}
              >
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => selectCategory(category.id)}
                  className="flex flex-1 flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent" aria-hidden="true">
                      <Icon name={category.icon} />
                    </div>
                    {isSelected && (
                      <span className="flex items-center gap-1 rounded-full bg-accent-dark px-2.5 py-1 text-xs font-semibold text-white">
                        <Icon name="check" />
                        Selected
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{category.title}</h3>
                  <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-black/75">
                    {category.services.map((service) => (
                      <li key={service} className="flex gap-2">
                        <span aria-hidden="true" className="text-accent-dark">&bull;</span>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-black/70">
                    <span className="font-semibold text-black">Suitable for:</span> {category.suitableFor}
                  </p>
                </button>
                {isSelected && (
                  <Button
                    ref={discussTriggerRef}
                    variant="secondary"
                    className="mt-4 w-full"
                    onClick={() => discussOption(category.id)}
                  >
                    Discuss This Option
                  </Button>
                )}
              </li>
            )
          })}
        </motion.ul>
      </Section>

      {/* Managed delivery */}
      <Section id="managed-delivery" tone="surface">
        <SectionHeading
          title="You manage the project with HIKMAIN"
          intro="You do not need to coordinate several separate freelancers yourself. HIKMAIN Labs remains your main point of contact, assigns suitable independent professionals, monitors agreed work and organises delivery."
        />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {managedDeliveryPoints.map((point) => (
            <li key={point.title}>
              <Card title={point.title} icon={<Icon name={point.icon} />} className="h-full">
                {point.text}
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* Compact process */}
      <Section id="process">
        <SectionHeading title="From enquiry to delivery" />
        <motion.ol variants={fadeUp} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <li key={step.title}>
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-white"
              >
                {i + 1}
              </span>
              <h3 className="mt-3 text-lg font-semibold">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-1.5 leading-relaxed text-black/75">{step.text}</p>
            </li>
          ))}
        </motion.ol>
        <p className="mt-8 text-sm">
          <Link to="/how-it-works" onClick={() => track('full_process_link_clicked')}>
            See Our Full Process
          </Link>
        </p>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="surface">
        <SectionHeading title="Common questions" />
        <Accordion className="mt-8" items={faqs} />
      </Section>

      {/* Enquiry */}
      <Section id="enquiry" tone="dark">
        <motion.div variants={fadeUp} className="max-w-3xl">
          <h2 className="text-3xl font-bold !text-white">Tell us what needs to get done</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/90">
            Start with a private conversation. Tell us the type of work, approximate workload and desired timing. We will
            confirm whether we can help before agreeing the scope, price and next steps.
          </p>
          {selected && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-teal-200">
              <Icon name="check" /> Asking about: {selected.title}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              variant="light"
              {...(wa ? { href: wa } : { to: '/contact' })}
              onClick={() => track('enquiry_initiated', { channel: 'whatsapp' })}
            >
              <Icon name="chat" /> Discuss on WhatsApp
            </Button>
            <Button
              variant="outlineLight"
              href={meetUrl()}
              onClick={() => track('enquiry_initiated', { channel: 'meet' })}
            >
              <Icon name="video" /> Request a Google Meet
            </Button>
            <Button
              ref={emailTriggerRef}
              variant="outlineLight"
              href={mailtoUrl(emailSubject, emailBody)}
              onClick={(event) => {
                emailOnClick(event)
                track('enquiry_initiated', { channel: 'email' })
              }}
            >
              <Icon name="mail" /> Send an Email
            </Button>
          </div>
          <p className="mt-3 text-sm text-white/70">
            {selected ? `Discussing: ${selected.title}` : 'Request a Meeting'}
          </p>
        </motion.div>
      </Section>
      <EmailModal open={emailOpen} onClose={emailClose} subject={emailSubject} body={emailBody} triggerRef={emailTriggerRef} />
      <ContactOptionsModal
        open={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        categoryTitle={selected?.title}
        whatsappHref={wa}
        onWhatsAppClick={() => track('enquiry_initiated', { channel: 'whatsapp' })}
        meetHref={meetUrl()}
        onMeetClick={() => track('enquiry_initiated', { channel: 'meet' })}
        onEmailClick={handleEmailFromContactModal}
        triggerRef={discussTriggerRef}
      />
    </>
  )
}
