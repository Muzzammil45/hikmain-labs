import Seo from '../components/Seo'
import PageHero from '../components/Hero'
import Section, { BeamCard, SectionHeading } from '../components/Section'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { site } from '../config/site'
import { tutoringFormats } from '../content'

export default function Tutoring() {
  return (
    <>
      <Seo
        title="Tutoring"
        description={`Personalised university tutoring from ${site.name}, with school, GCSE and A Level support through our independent partner, ${site.elevate.name}.`}
      />
      <PageHero
        eyebrow="Tutoring"
        title="Personalised tutoring at every stage"
        highlight={2}
        intro={`${site.name} provides personalised tutoring for university students. For school and pre-university support from KS1 to A Level, we work with ${site.elevate.name}, an independent tutoring partner.`}
      />

      <Section>
        <h2 className="sr-only">Choose your tutoring</h2>
        <ul className="grid gap-5 md:grid-cols-2">
          <li className="reveal flex flex-col">
            <BeamCard className="beam-on flex-1" innerClassName="flex h-full flex-col gap-4 sm:p-10">
              <span className="icon-tile">
                <Icon name="learn" />
              </span>
              <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] font-bold">University Tutoring</h3>
              <p className="text-[17px] leading-relaxed text-mist">
                One-to-one and small-group learning support that focuses on genuine understanding.
              </p>
              <Button to="/contact?service=University tutoring" className="mt-auto self-start">
                Enquire About University Tutoring <Icon name="arrow" size={18} />
              </Button>
            </BeamCard>
          </li>
          <li className="reveal flex flex-col" style={{ '--reveal-delay': '.1s' }}>
            <BeamCard className="flex-1" innerClassName="flex h-full flex-col gap-4 sm:p-10">
              <span className="icon-tile">
                <Icon name="group" />
              </span>
              <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] font-bold">School, GCSE &amp; A Level Tutoring</h3>
              <p className="text-[17px] leading-relaxed text-mist">
                Expert pre-university support from KS1 to A Level, delivered by {site.elevate.name}.
              </p>
              <Button to="/elevate-referral" variant="ghost" className="mt-auto self-start">
                Get Started
              </Button>
            </BeamCard>
            <p className="mt-3 px-1 text-sm leading-relaxed text-muted">
              You will continue your enquiry directly with {site.elevate.name}, which operates independently and has its own
              pricing, terms and privacy policy.
            </p>
          </li>
        </ul>
      </Section>

      <Section>
        <SectionHeading eyebrow="University tutoring" title="Ways to learn with us" />
        <ul className="mt-10 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
          {tutoringFormats.map((f, i) => (
            <li key={f.title} className="reveal" style={{ '--reveal-delay': `${i * 0.06}s` }}>
              <BeamCard className="h-full" innerClassName="flex flex-col gap-3">
                <span className="icon-tile">
                  <Icon name={f.icon} />
                </span>
                <h3 className="text-lg font-bold leading-snug">{f.title}</h3>
                <p className="text-[14.5px] leading-relaxed text-mist">{f.text}</p>
              </BeamCard>
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
        <ul className="mt-10 grid gap-3.5 md:grid-cols-3">
          {site.tutoringSubjects.map((s, i) => (
            <li
              key={s.title}
              className="lift reveal flex flex-col gap-3 rounded-3xl bg-navy/85 p-7 shadow-[inset_0_0_0_1px_var(--color-line)]"
              style={{ '--reveal-delay': `${i * 0.08}s` }}
            >
              <span className="font-heading text-sm font-bold text-teal">0{i + 1}</span>
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="leading-relaxed text-mist">{s.detail}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="academic-integrity">
        <div className="reveal relative overflow-hidden rounded-[32px] p-[2px]">
          <div
            aria-hidden="true"
            className="absolute -inset-1/2 animate-[spin_10s_linear_infinite]"
            style={{ background: 'conic-gradient(from 0deg, #5EEAD4, #7DA8FF, #12305A, #5EEAD4)' }}
          />
          <div className="relative flex items-start gap-5 rounded-[30px] bg-navy p-7 sm:p-12">
            <span className="icon-tile hidden sm:flex">
              <Icon name="shield" />
            </span>
            <div>
              <h2 className="text-[clamp(1.6rem,3vw,2.25rem)] font-bold">Academic integrity</h2>
              <p className="mt-4 text-lg font-medium leading-relaxed text-mist">{site.academicIntegrityStatement}</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
