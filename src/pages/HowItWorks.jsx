import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Section, { SectionHeading } from '../components/Section'
import ContactOptions from '../components/ContactOptions'
import Card, { Icon } from '../components/Card'

const steps = [
  ['Initial enquiry', 'Get in touch by WhatsApp, Google Meet or email, whichever is easiest for you.'],
  ['Private conversation', 'We talk privately to understand what you need, your timings and any concerns.'],
  ['Agree scope, timing and price', 'We set out what will be delivered, when, and the price, so everything is clear up front.'],
  ['Agreement and invoice', 'You receive written confirmation of what has been agreed, followed by an invoice.'],
  ['Assignment and delivery', 'Your work is assigned to a suitable independent professional and delivered as agreed.'],
  ['Review and revisions', 'You review the work. If it does not match what was agreed, we will work to put it right.'],
]

const notes = [
  { icon: 'user', title: 'Independent contractors', text: 'Work is carried out by independent contractors and freelancers, who work with HIKMAIN Labs on a project-by-project basis.' },
  { icon: 'chat', title: 'A clear point of contact', text: 'You have one point of contact at HIKMAIN Labs throughout, so you never have to chase around.' },
  { icon: 'check', title: 'Scope review', text: 'If your needs change, we review the scope with you and agree any changes before they take effect.' },
  { icon: 'shield', title: 'Confidentiality', text: 'Information you share is treated as confidential and used only for the purpose of your project.' },
]

export default function HowItWorks() {
  return (
    <>
      <Seo
        title="How It Works"
        description="A clear six-step process from first enquiry to review and revisions, with scope, timing and price agreed before work begins."
      />
      <PageHero
        title="How it works"
        intro="A straightforward process, with clear agreement at every stage."
      />

      <Section>
        <ol className="relative mx-auto max-w-3xl space-y-8">
          <span aria-hidden="true" className="absolute left-5 top-2 hidden h-[calc(100%-1rem)] w-px bg-accent/30 sm:block" />
          {steps.map(([title, text], i) => (
            <li key={title} className="relative flex gap-5">
              <span
                aria-hidden="true"
                className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-white"
              >
                {i + 1}
              </span>
              <div>
                <h2 className="text-xl font-semibold">
                  <span className="sr-only">Step {i + 1}: </span>
                  {title}
                </h2>
                <p className="mt-1.5 leading-relaxed text-black/75">{text}</p>
                {i === 0 && <ContactOptions variant="dark" className="mt-4" subject="New enquiry" />}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="surface">
        <SectionHeading title="Good to know" intro="A few important points about how we work together." />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {notes.map((n) => (
            <li key={n.title}>
              <Card title={n.title} icon={<Icon name={n.icon} />} className="h-full">
                {n.text}
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
