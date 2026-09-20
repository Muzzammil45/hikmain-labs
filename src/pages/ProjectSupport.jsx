import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Section, { SectionHeading } from '../components/Section'
import Card, { Icon } from '../components/Card'
import ContactOptions from '../components/ContactOptions'

const groups = [
  {
    id: 'ai',
    icon: 'data',
    title: 'AI related support',
    intro: 'Skilled human input for AI and data projects that need careful, consistent judgement.',
    items: [
      ['Human evaluation', 'Reviewing AI outputs against clear criteria, so quality can be measured and improved.'],
      ['Feedback', 'Structured written feedback on outputs, prompts or responses, tailored to your guidelines.'],
      ['Data annotation', 'Labelling and categorising data accurately and consistently, following your instructions.'],
    ],
  },
  {
    id: 'research',
    icon: 'search',
    title: 'Research and information support',
    intro: 'Well-organised information, so you can spend your time on decisions rather than searching.',
    items: [
      ['Online research', 'Finding reliable, relevant sources on the topics that matter to your project.'],
      ['Information gathering', 'Collecting the details you need from multiple places into one clear picture.'],
      ['Organisation', 'Structuring findings in the format you prefer, such as spreadsheets, summaries or notes.'],
    ],
  },
  {
    id: 'ongoing',
    icon: 'repeat',
    title: 'Ongoing remote support',
    intro: 'For work that continues week after week, with the structure to keep it dependable.',
    items: [
      ['Recurring assignments', 'A regular rhythm of tasks agreed in advance, scaled up or down as needed.'],
      ['Tracking', 'Clear visibility of what has been completed and what is coming next.'],
      ['Quality control', 'Checks built into each assignment so standards stay consistent over time.'],
    ],
  },
]

export default function ProjectSupport() {
  return (
    <>
      <Seo
        title="Project Support"
        description="AI evaluation and annotation, online research and ongoing remote support from HIKMAIN Labs, delivered by a managed network of independent professionals."
      />
      <PageHero
        title="Project support that fits how you work"
        intro="From one-off tasks to weekly recurring support, we match your project with skilled independent professionals and manage delivery for you."
      />

      {groups.map((g, i) => (
        <Section key={g.id} id={g.id} tone={i % 2 ? 'surface' : 'white'}>
          <SectionHeading title={g.title} intro={g.intro} />
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {g.items.map(([title, text]) => (
              <li key={title}>
                <Card title={title} icon={<Icon name={g.icon} />} className="h-full">
                  {text}
                </Card>
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section tone="dark">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold !text-white">Discuss Your Project</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/90">
            Tell us about your project through whichever channel suits you. We will start with a private
            conversation and agree scope, timing and price with you before any work begins.
          </p>
          <ContactOptions className="mt-8" subject="Project support enquiry" />
        </div>
      </Section>
    </>
  )
}
