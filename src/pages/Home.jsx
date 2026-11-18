import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { Mark } from '../components/Logo'
import HubVisual from '../components/HubVisual'
import ServiceTabs from '../components/ServiceTabs'
import ContactOptions from '../components/ContactOptions'
import { HeroBackdrop, WordReveal } from '../components/Hero'
import Section, { BeamCard, CtaPanel, Marquee, SectionHeading, StepsLine } from '../components/Section'
import { audiences, marqueeItems, reasons, steps } from '../content'
import { site } from '../config/site'

export default function Home() {
  return (
    <>
      <Seo />

      <HeroBackdrop>
        <div className="container-page flex flex-wrap items-center gap-12 pb-24 pt-32 sm:pb-32 sm:pt-40">
          <div className="flex min-w-0 flex-[1_1_500px] flex-col gap-6">
            <p className="fade-in flex items-center gap-2.5 self-start rounded-full bg-royal/55 py-2 pl-3 pr-4 text-sm text-mist shadow-[inset_0_0_0_1px_var(--color-line-strong)]">
              <span className="live-dot" />
              UK-registered · A managed network of independent professionals
            </p>
            <WordReveal
              text="Skilled support built around your project."
              highlight={2}
              className="text-[clamp(2.6rem,5.8vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.035em]"
            />
            <p className="fade-in max-w-[34em] text-lg leading-relaxed text-mist sm:text-[18.5px]" style={{ animationDelay: '.65s' }}>
              {site.description}
            </p>
            <div className="fade-in flex flex-wrap gap-3" style={{ animationDelay: '.85s' }}>
              <Button to="/contact" size="lg">
                Tell Us What You Need <Icon name="arrow" size={18} />
              </Button>
              <Button to="/project-support" variant="ghost" size="lg">
                Explore Our Services
              </Button>
            </div>
          </div>
          <div className="min-w-0 flex-[1_1_420px]">
            <HubVisual />
          </div>
        </div>
      </HeroBackdrop>

      <Marquee items={marqueeItems} />

      <Section>
        <SectionHeading
          eyebrow="Who we support"
          title="Support that fits the way you work."
          intro="Whether you are working alone or growing a team, we adapt to your situation."
        />
        <ul className="mt-10 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
          {audiences.map((a, i) => (
            <li key={a.title} className="reveal" style={{ '--reveal-delay': `${i * 0.06}s` }}>
              <BeamCard className="h-full" innerClassName="flex flex-col gap-3">
                <span className="icon-tile">
                  <Icon name={a.icon} />
                </span>
                <h3 className="text-xl font-bold leading-snug">{a.title}</h3>
                <p className="text-[14.5px] leading-relaxed text-mist">{a.text}</p>
              </BeamCard>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="services" className="pt-4 sm:pt-8">
        <SectionHeading eyebrow="What we do" title="Our services" intro="Pick an area to see exactly what’s included." />
        <div className="mt-8">
          <ServiceTabs />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="How it works" title="Six clear steps. Agreement at every stage.">
          <p className="text-[17px] leading-relaxed text-mist">
            A straightforward process, with scope, timing and price agreed before any work begins.
          </p>
        </SectionHeading>
        <div className="mt-12">
          <StepsLine steps={steps} />
        </div>
        <p className="reveal mt-10">
          <Link to="/how-it-works" className="inline-flex items-center gap-2 font-semibold text-teal no-underline hover:text-cloud">
            See our full process <Icon name="arrow" size={18} />
          </Link>
        </p>
      </Section>

      <Section>
        <div className="flex flex-wrap items-center gap-14">
          <div className="reveal relative aspect-[4/5] min-w-0 max-w-[440px] flex-[1_1_320px] overflow-hidden rounded-[32px] p-[2px]">
            <div
              aria-hidden="true"
              className="absolute -inset-1/2 animate-[spin_8s_linear_infinite]"
              style={{ background: 'conic-gradient(from 0deg, #5EEAD4, #7DA8FF, #12305A, #5EEAD4)' }}
            />
            <div
              className="relative flex h-full flex-col justify-between rounded-[30px] p-8"
              style={{ background: 'linear-gradient(160deg, #12305A, #050D1F)' }}
            >
              <Mark size={64} framed={false} />
              <svg aria-hidden="true" viewBox="0 0 200 200" className="spin-slower mx-auto w-3/4 opacity-80">
                <circle cx="100" cy="100" r="96" fill="none" stroke="#5EEAD4" strokeOpacity=".35" strokeDasharray="2 8" />
                <circle cx="100" cy="100" r="64" fill="none" stroke="#7DA8FF" strokeOpacity=".25" />
                <circle cx="100" cy="4" r="5" fill="#5EEAD4" />
                <circle cx="164" cy="100" r="4" fill="#7DA8FF" />
                <circle cx="36" cy="100" r="3" fill="#5EEAD4" fillOpacity=".7" />
              </svg>
              <div className="flex flex-col gap-2.5">
                <p className="font-heading text-[22px] font-bold">{site.legalName}</p>
                <p className="text-sm leading-relaxed text-muted">
                  Registered in England and Wales · Company number {site.company.number} · Newcastle upon Tyne
                </p>
              </div>
            </div>
          </div>
          <div className="reveal flex min-w-0 flex-[1_1_460px] flex-col gap-5">
            <p className="eyebrow">Why HIKMAIN Labs</p>
            <h2 className="h-section">Reliable support, carefully managed.</h2>
            <p className="text-[17px] leading-relaxed text-mist">
              Our mission is to make reliable, skilled support more accessible through clear communication, flexible
              arrangements and carefully managed delivery.
            </p>
            <p className="grad-text font-heading text-[clamp(1.4rem,2.4vw,1.9rem)] font-bold leading-snug">
              Reliability. Quality. Confidentiality. Flexibility.
            </p>
          </div>
        </div>

        <ul className="mt-14 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-6">
          {reasons.map((r, i) => (
            <li
              key={r.title}
              className={`lift reveal flex flex-col gap-3 rounded-3xl bg-navy/85 p-7 shadow-[inset_0_0_0_1px_var(--color-line)] ${
                i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'
              } ${i === 4 ? 'sm:col-span-2 lg:col-span-2' : ''}`}
              style={{ '--reveal-delay': `${(i % 3) * 0.08}s` }}
            >
              <span className="bob text-teal" style={{ animationDelay: `${i * 0.4}s` }}>
                <Icon name={r.icon} size={32} strokeWidth={1.7} />
              </span>
              <h3 className="text-[19px] font-bold leading-snug">{r.title.replace(/\.$/, '')}</h3>
              <p className="text-[15px] leading-relaxed text-mist">{r.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="pt-4">
        <CtaPanel title="Let’s talk about your project" actions={<ContactOptions subject="Project enquiry" />}>
          <p className="text-[17px] leading-relaxed text-mist">
            Tell us what you need in a private conversation. There is no obligation, and we will agree scope, timing and price
            with you before any work begins.
          </p>
        </CtaPanel>
      </Section>
    </>
  )
}
