import { Link } from 'react-router-dom'
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
        description="Personalised one-to-one and small-group tutoring in maths, statistics, sciences and computer science, focused on genuine learning."
      />
      <PageHero
        title="Personalised tutoring for genuine understanding"
        intro="Learning support that adapts to you, delivered online by independent tutors from our managed network."
      >
        <Button to="/contact?service=Tutoring">Request Tutoring Support</Button>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="How we help" title="Ways to learn with us" />
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

      <Section tone="surface">
        <SectionHeading
          eyebrow="Subjects"
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

      <Section id="academic-integrity">
        <div className="rounded-2xl border-2 border-accent bg-white p-6 shadow-sm sm:p-10">
          <div className="flex items-start gap-4">
            <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent sm:flex" aria-hidden="true">
              <Icon name="shield" />
            </span>
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Academic integrity</h2>
              <p className="mt-4 text-lg font-medium leading-relaxed">
                HIKMAIN Labs supports genuine learning. Tutors explain concepts, give feedback and help
                students practice, but do not sit examinations, impersonate students or complete assessed
                work for submission as the student&rsquo;s own.
              </p>
              <p className="mt-4">
                Read our full <Link to="/academic-integrity">Academic Integrity Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold !text-white">Ready to get started?</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/90">
            Tell us the subject, level and what you would like to achieve. We will discuss it with you
            privately and agree the arrangements before any sessions begin.
          </p>
          <Button to="/contact?service=Tutoring" variant="light" className="mt-8">
            Request Tutoring Support
          </Button>
        </div>
      </Section>
    </>
  )
}
