import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Section, { SectionHeading } from '../components/Section'
import Card, { Icon } from '../components/Card'
import Button from '../components/Button'
import { site } from '../config/site'

const formats = [
  { icon: 'user', title: 'One-to-one tutoring', text: 'Focused sessions shaped around your pace, goals and questions.' },
  { icon: 'group', title: 'Small groups', text: 'Shared sessions for friends, classmates or study groups who want to learn together.' },
  { icon: 'chat', title: 'Subject explanations', text: 'Clear, patient explanations of the ideas you find difficult, in different ways until they click.' },
  { icon: 'task', title: 'Revision support', text: 'Structured review of topics, with practice questions and feedback on your answers.' },
  { icon: 'learn', title: 'Exam preparation', text: 'Techniques, timing and practice to help you approach exams with confidence.' },
]

export default function Tutoring() {
  return (
    <>
      <Seo
        title="Tutoring"
        description={`Personalised university tutoring from ${site.name}, with school, GCSE and A Level support through our independent partner, ${site.elevate.name}.`}
      />
      <PageHero
        title="Personalised tutoring at every stage"
        intro={`${site.name} provides personalised tutoring for university students. For school and pre-university support from KS1 to A Level, we work with ${site.elevate.name}, an independent tutoring partner.`}
      />

      <Section>
        <h2 className="sr-only">Choose your tutoring</h2>
        <ul className="grid gap-6 md:grid-cols-2">
          <li className="flex flex-col">
            <Card title="University Tutoring" icon={<Icon name="learn" />} className="flex-1">
              <p>One-to-one and small-group learning support that focuses on genuine understanding.</p>
              <Button to="/contact?service=University tutoring" className="mt-6 w-full sm:w-auto">
                Enquire About University Tutoring
              </Button>
            </Card>
          </li>
          <li className="flex flex-col">
            <Card title="School, GCSE & A Level Tutoring" icon={<Icon name="group" />} className="flex-1">
              <p>Expert pre-university support from KS1 to A Level, delivered by {site.elevate.name}</p>
              <Button to="/elevate-referral" variant="secondary" className="mt-6 w-full sm:w-auto">
                Get Started
              </Button>
            </Card>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              You will continue your enquiry directly with {site.elevate.name}, which operates independently
              and has its own pricing, terms and privacy policy.
            </p>
          </li>
        </ul>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="University tutoring" title="Ways to learn with us" />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {formats.map((f) => (
            <li key={f.title}>
              <Card title={f.title} icon={<Icon name={f.icon} />} className="h-full">
                {f.text}
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="University subjects"
          title="What you can learn"
          intro="Not seeing your subject? Ask us. We will tell you honestly whether we can help."
        />
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {site.tutoringSubjects.map((s) => (
            <li key={s.title}>
              <Card title={s.title} className="h-full">
                {s.detail}
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" id="academic-integrity">
        <div className="rounded-2xl border-2 border-accent bg-white p-6 shadow-sm sm:p-10">
          <div className="flex items-start gap-4">
            <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent sm:flex" aria-hidden="true">
              <Icon name="shield" />
            </span>
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Academic integrity</h2>
              <p className="mt-4 text-lg font-medium leading-relaxed">
                {site.academicIntegrityStatement}
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
