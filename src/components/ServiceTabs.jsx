import { useState } from 'react'
import Button from './Button'
import Icon from './Icon'
import { categories, tutoringFormats, tutoringSummary } from '../content'
import { site } from '../config/site'

const panels = [
  ...categories.map((c) => ({
    key: c.id,
    label: c.label,
    kicker: c.title,
    headline: c.headline,
    summary: c.summary,
    suitableFor: c.suitableFor,
    items: c.services,
    cta: 'Explore this service',
    to: `/project-support#${c.id}`,
  })),
  {
    key: 'tutoring',
    label: 'Tutoring',
    kicker: 'Personalised tutoring',
    headline: 'University tutoring that builds real understanding',
    summary: tutoringSummary,
    suitableFor: `university students. For school and pre-university support from KS1 to A Level, we work with ${site.elevate.name}, an independent tutoring partner.`,
    items: [...tutoringFormats.map((f) => f.title), site.tutoringSubjects.map((s) => s.title).join(' · ')],
    cta: 'Explore tutoring',
    to: '/tutoring',
  },
]

/**
 * Home-page services: a sliding pill switches between the four service areas, and each
 * switch brings in a panel whose items cascade in one by one. Every panel's text is in
 * the pre-rendered HTML (inactive ones are hidden), so search engines read all four.
 */
export default function ServiceTabs() {
  const [active, setActive] = useState(0)

  const onKeyDown = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (active + (e.key === 'ArrowRight' ? 1 : panels.length - 1)) % panels.length
    setActive(next)
    document.getElementById(`svc-tab-${panels[next].key}`)?.focus()
  }

  return (
    <div>
      <div className="reveal">
        <div
          role="tablist"
          aria-label="Service areas"
          onKeyDown={onKeyDown}
          className="relative grid w-full grid-cols-4 rounded-full sm:inline-grid sm:w-auto bg-navy p-1.5 shadow-[inset_0_0_0_1px_var(--color-line)]"
        >
          <span
            aria-hidden="true"
            className="absolute bottom-1.5 top-1.5 w-[calc((100%-12px)/4)] rounded-full bg-teal shadow-[0_8px_24px_-8px_rgba(94,234,212,.6)] transition-[left] duration-400 ease-out-soft"
            style={{ left: `calc(6px + ${active} * (100% - 12px) / 4)` }}
          />
          {panels.map((p, i) => (
            <button
              key={p.key}
              id={`svc-tab-${p.key}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`svc-panel-${p.key}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={`relative h-12 w-full rounded-full px-1 text-[13px] font-bold transition-colors duration-300 sm:w-[150px] sm:text-[14.5px] ${
                i === active ? 'text-teal-ink' : 'text-cloud hover:text-teal'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {panels.map((p, i) => (
        <div
          key={p.key}
          id={`svc-panel-${p.key}`}
          role="tabpanel"
          aria-labelledby={`svc-tab-${p.key}`}
          hidden={i !== active}
          className="mt-8"
        >
          {i === active && (
            <div className="beam-card beam-on no-tilt panel-in rounded-[30px]">
              <div
                className="beam-inner flex flex-wrap gap-11 rounded-[29px] p-7 sm:p-12"
                style={{ background: 'linear-gradient(160deg, #0E2442, #0A1B33 55%)' }}
              >
                <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-5">
                  <p className="text-[13px] text-muted">{p.kicker}</p>
                  <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.1]">{p.headline}</h3>
                  <p className="text-[17px] leading-relaxed text-mist">{p.summary}</p>
                  <p className="rounded-2xl bg-teal/[.08] px-5 py-4 text-[15px] leading-relaxed text-mist shadow-[inset_0_0_0_1px_rgba(94,234,212,.3)]">
                    <strong className="text-cloud">Suitable for:</strong> {p.suitableFor}
                  </p>
                  <Button to={p.to} className="self-start">
                    {p.cta} <Icon name="arrow" size={18} />
                  </Button>
                </div>
                <ul className="grid min-w-0 flex-[1_1_340px] content-start gap-2.5 sm:grid-cols-2">
                  {p.items.map((item, j) => (
                    <li
                      key={item}
                      className="panel-in flex items-start gap-3 rounded-2xl bg-midnight/55 px-4 py-3.5 text-[14.5px] leading-snug shadow-[inset_0_0_0_1px_var(--color-line)]"
                      style={{ animationDelay: `${0.04 + j * 0.045}s` }}
                    >
                      <span className="mt-px flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-teal text-teal-ink">
                        <Icon name="check" size={12} strokeWidth={3.4} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {/* Inactive panels keep their text in the page for search engines and no-JS visitors */}
          {i !== active && (
            <div>
              <h3>{p.headline}</h3>
              <p>{p.summary}</p>
              <ul>
                {p.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
