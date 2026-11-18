import Seo from '../components/Seo'
import PageHero from '../components/Hero'
import Section, { BeamCard, CtaPanel, SectionHeading } from '../components/Section'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { site } from '../config/site'

const companyStatement = `${site.legalName} is a UK-registered company providing flexible project support and personalised learning services through a managed network of independent professionals.`

const values = [
  ['Reliability', 'check', 'We do what we say we will, when we say we will.'],
  ['Clear communication', 'chat', 'Plain language, agreed in writing, with no surprises.'],
  ['Quality', 'task', 'Careful matching and review so work meets the standard agreed.'],
  ['Confidentiality', 'shield', 'Your information is handled with care and shared only where needed.'],
  ['Flexibility', 'repeat', 'Arrangements that adapt as your project or learning needs change.'],
  ['Continuous improvement', 'data', 'We listen to feedback and keep refining how we work.'],
]

export default function About() {
  return (
    <>
      <Seo title="About" description={companyStatement} />
      <PageHero eyebrow="About us" title={`About ${site.name}`} highlight={2} />

      <Section>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="reveal flex flex-col gap-4 rounded-[28px] bg-navy/85 p-8 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-10">
            <h2 className="text-[clamp(1.6rem,3vw,2.25rem)] font-bold">Who we are</h2>
            <p className="text-lg leading-relaxed text-mist">{companyStatement}</p>
            <p className="mt-auto text-sm leading-relaxed text-faint">
              Company number {site.company.number} · Registered office: {site.company.registeredOffice}
            </p>
          </div>
          <BeamCard className="beam-on no-tilt reveal" innerClassName="flex h-full flex-col gap-4 sm:p-10" style={{ '--reveal-delay': '.1s' }}>
            <h2 className="text-[clamp(1.6rem,3vw,2.25rem)] font-bold">Our mission</h2>
            <p className="text-lg leading-relaxed text-mist">
              Our mission is to make reliable, skilled support more accessible through clear communication, flexible arrangements
              and carefully managed delivery.
            </p>
          </BeamCard>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Our values" />
        <ul className="mt-10 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(([title, icon, text], i) => (
            <li key={title} className="reveal" style={{ '--reveal-delay': `${(i % 3) * 0.08}s` }}>
              <BeamCard className="h-full" innerClassName="flex flex-col gap-3">
                <span className="icon-tile">
                  <Icon name={icon} />
                </span>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="leading-relaxed text-mist">{text}</p>
              </BeamCard>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <CtaPanel
          title="Work with us"
          actions={
            <div className="flex flex-wrap gap-3">
              <Button to="/contact" size="lg">
                Tell Us What You Need
              </Button>
              <Button to="/join" variant="ghost" size="lg">
                Join Our Network
              </Button>
            </div>
          }
        >
          <p className="text-[17px] leading-relaxed text-mist">
            Looking for support, or a skilled professional interested in joining our network?
          </p>
        </CtaPanel>
      </Section>
    </>
  )
}
