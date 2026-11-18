import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/Hero'
import Section, { SectionHeading } from '../components/Section'
import Button from '../components/Button'
import Icon from '../components/Icon'
import Accordion from '../components/Accordion'
import Modal, { modalOptionClass } from '../components/Modal'
import EmailModal from '../components/EmailModal'
import ContactOptions from '../components/ContactOptions'
import useEmailModal from '../hooks/useEmailModal'
import { meetUrl, whatsappUrl } from '../config/site'
import { categories } from '../content'

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
  const { hash } = useLocation()
  const [selectedId, setSelectedId] = useState(null)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const discussTriggerRef = useRef(null)
  const email = useEmailModal()

  // A link like /project-support#ai-data arrives with a category in mind; carry it into
  // the selector. Done after the first render so it matches the pre-rendered HTML.
  useEffect(() => {
    const id = hash.replace('#', '')
    if (categoryIds.includes(id)) setSelectedId(id)
  }, [hash])

  const selected = categories.find((c) => c.id === selectedId) || null
  const message = selected
    ? `Hello HIKMAIN Labs, I would like to discuss ${selected.enquiryContext}. Please let me know a suitable next step.`
    : 'Hello HIKMAIN Labs, I would like to discuss a project with you. Please let me know a suitable next step.'
  const emailSubject = selected ? `Project enquiry — ${selected.title}` : 'Project enquiry'
  const wa = whatsappUrl(message)

  return (
    <>
      <Seo
        title="AI & Project Support"
        description="Flexible AI, data, research and recurring digital project support for individuals, independent professionals and growing teams."
      />

      <PageHero
        eyebrow="AI and Digital Project Support"
        title="Reliable project support without building a full-time team"
        intro="HIKMAIN Labs helps individuals, independent professionals and growing teams complete AI, data, research and recurring digital work. We match each project with suitable independent professionals while managing communication, progress and quality through one clear point of contact."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#enquiry" size="lg">
            Discuss Your Project <Icon name="arrow" size={18} />
          </Button>
          <Button href="#selector" variant="ghost" size="lg">
            Explore Support Options
          </Button>
        </div>
      </PageHero>

      <Section id="selector">
        <SectionHeading
          eyebrow="Choose an area"
          title="Support options"
          intro="Select the category closest to your need. Your choice carries through to the enquiry below."
        />
        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {categories.map((category, i) => {
            const isSelected = selectedId === category.id
            return (
              <li
                key={category.id}
                id={category.id}
                className={`reveal flex scroll-mt-28 flex-col rounded-3xl bg-navy p-7 transition-[box-shadow,transform] duration-300 hover:-translate-y-1.5 ${
                  isSelected
                    ? 'shadow-[inset_0_0_0_2px_var(--color-teal),0_0_0_6px_rgba(94,234,212,.12),0_30px_60px_-30px_rgba(94,234,212,.4)]'
                    : 'shadow-[inset_0_0_0_1px_var(--color-line)] hover:shadow-[inset_0_0_0_1px_var(--color-line-strong)]'
                }`}
                style={{ '--reveal-delay': `${i * 0.08}s` }}
              >
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedId(isSelected ? null : category.id)}
                  className="flex flex-1 flex-col rounded-xl text-left"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="icon-tile">
                      <Icon name={category.icon} />
                    </span>
                    {isSelected && (
                      <span className="pop-in flex items-center gap-1.5 rounded-full bg-teal px-3 py-1 text-xs font-bold text-teal-ink">
                        <Icon name="check" size={14} strokeWidth={3} /> Selected
                      </span>
                    )}
                  </span>
                  <span className="mt-5 font-heading text-xl font-bold tracking-tight">{category.title}</span>
                  <span className="mt-4 flex flex-col gap-2 text-[14.5px] leading-relaxed text-mist">
                    {category.services.map((service) => (
                      <span key={service} className="flex gap-2.5">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                        <span>{service}</span>
                      </span>
                    ))}
                  </span>
                  <span className="mt-5 text-sm leading-relaxed text-muted">
                    <span className="font-semibold text-cloud">Suitable for:</span> {category.suitableFor}
                  </span>
                </button>
                {isSelected && (
                  <Button ref={discussTriggerRef} className="panel-in mt-6 w-full" onClick={() => setContactModalOpen(true)}>
                    Discuss This Option <Icon name="arrow" size={18} />
                  </Button>
                )}
              </li>
            )
          })}
        </ul>
      </Section>

      <Section id="managed-delivery">
        <SectionHeading
          title="You manage the project with HIKMAIN"
          intro="You do not need to coordinate several separate freelancers yourself. HIKMAIN Labs remains your main point of contact, assigns suitable independent professionals, monitors agreed work and organises delivery."
        />
        <ul className="mt-10 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {managedDeliveryPoints.map((point, i) => (
            <li
              key={point.title}
              className="lift reveal flex flex-col gap-3 rounded-3xl bg-navy/85 p-7 shadow-[inset_0_0_0_1px_var(--color-line)]"
              style={{ '--reveal-delay': `${i * 0.08}s` }}
            >
              <span className="icon-tile">
                <Icon name={point.icon} />
              </span>
              <h3 className="text-lg font-bold">{point.title}</h3>
              <p className="text-[15px] leading-relaxed text-mist">{point.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="process">
        <SectionHeading title="From enquiry to delivery" />
        <div aria-hidden="true" className="relative mt-12 hidden h-1.5 overflow-hidden rounded-full bg-royal lg:block">
          <div className="draw-line absolute inset-0 rounded-full bg-gradient-to-r from-sky to-teal" />
        </div>
        <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <li key={step.title} className="reveal flex flex-col gap-2.5" style={{ '--reveal-delay': `${i * 0.08}s` }}>
              <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-teal font-heading font-bold text-teal-ink">
                {i + 1}
              </span>
              <h3 className="text-lg font-bold">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="leading-relaxed text-mist">{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="reveal mt-10">
          <Link to="/how-it-works" className="inline-flex items-center gap-2 font-semibold text-teal no-underline hover:text-cloud">
            See Our Full Process <Icon name="arrow" size={18} />
          </Link>
        </p>
      </Section>

      <Section id="faq">
        <div className="flex flex-wrap items-start gap-12">
          <div className="min-w-0 flex-[1_1_300px]">
            <SectionHeading eyebrow="FAQ" title="Common questions" intro="Something else on your mind? Ask us in a private conversation." />
          </div>
          <Accordion className="reveal min-w-0 flex-[2_1_480px]" items={faqs} defaultOpenIds={['one-off-support']} />
        </div>
      </Section>

      <Section id="enquiry">
        <div className="reveal relative overflow-hidden rounded-[32px] bg-navy px-7 py-10 shadow-[inset_0_0_0_1px_var(--color-line-strong)] sm:px-14 sm:py-16">
          <div
            aria-hidden="true"
            className="blob-a pointer-events-none absolute -left-20 -top-32 h-96 w-96 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(94,234,212,.28), transparent 65%)' }}
          />
          <div className="relative max-w-3xl">
            <h2 className="text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-[1.08]">Tell us what needs to get done</h2>
            <p className="mt-5 text-lg leading-relaxed text-mist">
              Start with a private conversation. Tell us the type of work, approximate workload and desired timing. We will confirm
              whether we can help before agreeing the scope, price and next steps.
            </p>
            <div aria-live="polite">
              {selected && (
                <p className="pop-in mt-6 inline-flex items-center gap-2 rounded-full bg-teal/[.12] px-4 py-2 text-sm font-semibold text-teal">
                  <Icon name="check" size={16} strokeWidth={2.6} /> Asking about: {selected.title}
                </p>
              )}
            </div>
            <ContactOptions className="mt-8" subject={emailSubject} whatsappMessage={message} emailBody={message} />
          </div>
        </div>
      </Section>

      <EmailModal open={email.open} onClose={email.close} subject={emailSubject} body={message} triggerRef={discussTriggerRef} />
      <Modal
        open={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        title={selected ? `Discuss ${selected.title}` : 'Discuss your project'}
        description="Choose how you’d like to get in touch."
        triggerRef={discussTriggerRef}
      >
        <div className="mt-5 flex flex-col gap-2">
          <a href={wa || '/contact'} {...(wa ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={modalOptionClass}>
            <Icon name="chat" size={20} className="text-teal" /> Discuss on WhatsApp
          </a>
          <a href={meetUrl()} className={modalOptionClass}>
            <Icon name="video" size={20} className="text-teal" /> Request a Google Meet
          </a>
          <button
            type="button"
            className={modalOptionClass}
            onClick={() => {
              setContactModalOpen(false)
              email.openModal()
            }}
          >
            <Icon name="mail" size={20} className="text-teal" /> Send an Email
          </button>
        </div>
      </Modal>
    </>
  )
}
