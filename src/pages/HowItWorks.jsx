import Seo from '../components/Seo'
import PageHero from '../components/Hero'
import Section, { SectionHeading, StepsLine } from '../components/Section'
import ContactOptions from '../components/ContactOptions'
import Icon from '../components/Icon'
import { steps } from '../content'

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
      <PageHero eyebrow="How it works" title="How it works" intro="A straightforward process, with clear agreement at every stage." />

      <Section>
        <StepsLine
          steps={steps}
          renderExtra={(i) =>
            i === 0 ? <ContactOptions className="mt-2 [&_.btn]:min-h-11 [&_.btn]:px-4 [&_.btn]:text-sm lg:flex-col" subject="New enquiry" /> : null
          }
        />
      </Section>

      <Section>
        <SectionHeading title="Good to know" intro="A few important points about how we work together." />
        <ul className="mt-10 grid gap-3.5 sm:grid-cols-2">
          {notes.map((n, i) => (
            <li
              key={n.title}
              className="lift reveal flex gap-5 rounded-3xl bg-navy/85 p-7 shadow-[inset_0_0_0_1px_var(--color-line)]"
              style={{ '--reveal-delay': `${(i % 2) * 0.08}s` }}
            >
              <span className="icon-tile">
                <Icon name={n.icon} />
              </span>
              <div>
                <h3 className="text-lg font-bold">{n.title}</h3>
                <p className="mt-2 leading-relaxed text-mist">{n.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
