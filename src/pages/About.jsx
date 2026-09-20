import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Section, { SectionHeading } from '../components/Section'
import Card, { Icon } from '../components/Card'
import Button from '../components/Button'

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
      <Seo
        title="About"
        description="HIKMAIN LABS LTD is a UK-registered company providing flexible project support and personalised learning services through a managed network of independent professionals."
      />
      <PageHero title="About HIKMAIN Labs" />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Who we are</h2>
            <p className="mt-4 text-lg leading-relaxed text-black/80">
              HIKMAIN LABS LTD is a UK-registered company providing flexible project support and
              personalised learning services through a managed network of independent professionals.
            </p>
          </div>
          <div className="rounded-2xl bg-surface p-6 sm:p-8">
            <h2 className="text-2xl font-bold sm:text-3xl">Our mission</h2>
            <p className="mt-4 text-lg leading-relaxed text-black/80">
              Our mission is to make reliable, skilled support more accessible through clear
              communication, flexible arrangements and carefully managed delivery.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading title="Our values" />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(([title, icon, text]) => (
            <li key={title}>
              <Card title={title} icon={<Icon name={icon} />} className="h-full">
                {text}
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="dark">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold !text-white">Work with us</h2>
          <p className="mt-4 text-lg text-white/90">
            Looking for support, or a skilled professional interested in joining our network?
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/contact" variant="light">Tell Us What You Need</Button>
            <Button to="/join" variant="outlineLight">Join Our Network</Button>
          </div>
        </div>
      </Section>
    </>
  )
}
