import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Button from '../components/Button'
import Card, { Icon } from '../components/Card'
import Pattern from '../components/Pattern'
import Section, { SectionHeading } from '../components/Section'
import ContactOptions from '../components/ContactOptions'

const audiences = [
  { icon: 'user', title: 'Individuals', text: 'Personal projects, research or learning goals that need a capable extra pair of hands.' },
  { icon: 'task', title: 'Independent professionals', text: 'Consultants and specialists who want reliable support without taking on more overhead.' },
  { icon: 'data', title: 'Freelancers', text: 'Extra capacity for busy periods, or specialist input on a piece of client work.' },
  { icon: 'learn', title: 'Students', text: 'Personalised tutoring that builds real understanding and confidence.' },
  { icon: 'group', title: 'Growing teams', text: 'Flexible, remote support for projects that need to move without permanent hires.' },
]

const services = [
  { icon: 'data', title: 'AI and data project support', text: 'Human evaluation, feedback and data annotation to help AI and data projects stay accurate.', to: '/project-support' },
  { icon: 'task', title: 'Digital project assistance', text: 'Online research, information gathering and organisation, delivered clearly and on time.', to: '/project-support' },
  { icon: 'repeat', title: 'Ongoing weekly support', text: 'Recurring assignments with tracking and quality control for work that continues.', to: '/project-support' },
  { icon: 'learn', title: 'Personalised tutoring', text: 'One-to-one and small-group learning support that focuses on genuine understanding.', to: '/tutoring' },
]

const reasons = [
  ['Built around your project.', 'We start by listening, then shape the support to fit your goals, not the other way round.'],
  ['Skilled independent professionals.', 'Work is carried out by carefully selected contractors and freelancers with relevant experience.'],
  ['One clear point of contact.', 'You always know who to speak to, and we manage delivery so you don’t have to.'],
  ['Flexible arrangements.', 'One-off tasks or ongoing weekly support, scaled up or down as your needs change.'],
  ['Clear communication and confidentiality.', 'Scope, timing and price are agreed in writing, and your information is treated with care.'],
]

export default function Home() {
  return (
    <>
      <Seo
        description="HIKMAIN Labs provides flexible AI project support, digital assistance and personalised tutoring for individuals, independent professionals and growing teams."
      />

      {/* Hero */}
      <div className="relative overflow-hidden bg-primary text-white">
        <Pattern tone="dark" className="absolute -right-24 top-4 h-auto w-[40rem] opacity-80 sm:w-[48rem]" />
        <div className="container-page relative grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-5">
          <div className="animate-fade-up lg:col-span-3">
            <h1 className="text-4xl font-bold leading-tight !text-white sm:text-5xl lg:text-6xl">
              Skilled support built around your project
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
              HIKMAIN Labs provides flexible AI project support, digital assistance and personalised
              tutoring for individuals, independent professionals and growing teams.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact" variant="primary">
                Tell Us What You Need
              </Button>
              <Button to="/project-support" variant="outlineLight">
                Explore Our Services
              </Button>
            </div>
          </div>

          {/* Decorative "project board" panel: abstract, no stock imagery */}
          <div aria-hidden="true" className="hidden lg:col-span-2 lg:block">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span>This week</span>
                <span className="rounded-full bg-accent/30 px-2 py-0.5 text-teal-200">On track</span>
              </div>
              {['Research brief', 'Annotation batch 3', 'Weekly quality check'].map((t, i) => (
                <div key={t} className="mt-3 flex items-center gap-3 rounded-lg bg-white/10 px-3 py-2.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${i === 0 ? 'bg-teal-300' : i === 1 ? 'bg-blue-300' : 'bg-white/50'}`} />
                  <span className="text-sm text-white/90">{t}</span>
                  <span className="ml-auto h-1.5 w-16 rounded-full bg-white/20">
                    <span className="block h-full rounded-full bg-teal-300" style={{ width: `${[100, 65, 30][i]}%` }} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Audience */}
      <Section>
        <SectionHeading
          eyebrow="Who we support"
          title="Support that fits the way you work"
          intro="Whether you are working alone or growing a team, we adapt to your situation."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a) => (
            <li key={a.title}>
              <Card title={a.title} icon={<Icon name={a.icon} />} className="h-full">
                {a.text}
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* Services */}
      <Section tone="surface">
        <SectionHeading eyebrow="What we do" title="Our services" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.title}>
              <Card title={s.title} icon={<Icon name={s.icon} />} className="h-full">
                <p>{s.text}</p>
                <Link to={s.to} className="mt-4 inline-block font-semibold text-action underline underline-offset-2 hover:text-primary">
                  Learn more<span className="sr-only"> about {s.title}</span> &rarr;
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* Reasons */}
      <Section>
        <SectionHeading eyebrow="Why HIKMAIN Labs" title="Reliable support, carefully managed" />
        <ul className="mt-10 grid gap-4 lg:grid-cols-2">
          {reasons.map(([lead, rest]) => (
            <li key={lead} className="flex gap-4 rounded-xl bg-surface p-5">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-white" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
              </span>
              <p className="leading-relaxed">
                <strong className="font-semibold">{lead}</strong> <span className="text-black/75">{rest}</span>
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Closing CTA */}
      <Section tone="dark" className="relative overflow-hidden">
        <Pattern tone="dark" className="absolute -left-20 bottom-0 h-auto w-[36rem] opacity-60" />
        <div className="relative max-w-3xl">
          <h2 className="text-3xl font-bold !text-white sm:text-4xl">Let&rsquo;s talk about your project</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/90">
            Tell us what you need in a private conversation. There is no obligation, and we will
            agree scope, timing and price with you before any work begins.
          </p>
          <ContactOptions className="mt-8" subject="Project enquiry" />
        </div>
      </Section>
    </>
  )
}
