/** A page section with consistent spacing and an optional anchor id. */
export default function Section({ id, className = '', children, narrow = false }) {
  return (
    <section id={id} className={`scroll-mt-24 py-16 sm:py-24 ${className}`}>
      <div className={narrow ? 'container-page max-w-[880px]' : 'container-page'}>{children}</div>
    </section>
  )
}

export function SectionHeading({ eyebrow, title, intro, className = '', children }) {
  return (
    <div className={`reveal flex max-w-3xl flex-col gap-3 ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="h-section">{title}</h2>
      {intro && <p className="text-[17px] leading-relaxed text-mist">{intro}</p>}
      {children}
    </div>
  )
}

/** Card with a light that runs around its edge and a gentle tilt on hover. */
export function BeamCard({ className = '', innerClassName = '', children, style }) {
  return (
    <div className={`beam-card ${className}`} style={style}>
      <div className={`beam-inner p-6 sm:p-7 ${innerClassName}`}>{children}</div>
    </div>
  )
}

/** Big service names gliding across the page. */
export function Marquee({ items }) {
  const row = items.flatMap((item) => [item, '✦'])
  return (
    <div className="marquee-mask overflow-hidden border-y border-royal bg-navy py-5" aria-hidden="true">
      <div className="marquee gap-9 font-heading text-[clamp(1.1rem,2vw,1.4rem)] font-semibold text-mist">
        {[...row, ...row].map((t, i) => (
          <span key={i} className={t === '✦' ? 'text-teal' : 'whitespace-nowrap'}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Numbered steps joined by a line that draws itself as the section scrolls into view. */
export function StepsLine({ steps, renderExtra }) {
  return (
    <div className="relative">
      <div aria-hidden="true" className="relative mb-6 hidden h-1.5 overflow-hidden rounded-full bg-royal md:block">
        <div className="draw-line absolute inset-0 rounded-full bg-gradient-to-r from-sky to-teal" />
      </div>
      <ol className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-5">
        {steps.map(([title, text], i) => (
          <li key={title} className="reveal flex flex-col gap-2.5" style={{ '--reveal-delay': `${i * 0.08}s` }}>
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-teal font-heading font-bold text-teal-ink"
            >
              {i + 1}
            </span>
            <h3 className="text-[19px] font-bold leading-snug">
              <span className="sr-only">Step {i + 1}: </span>
              {title}
            </h3>
            <p className="text-[14.5px] leading-relaxed text-mist">{text}</p>
            {renderExtra?.(i)}
          </li>
        ))}
      </ol>
    </div>
  )
}

/** Closing call-to-action panel with drifting colour glows. */
export function CtaPanel({ title, children, actions }) {
  return (
    <div className="reveal relative overflow-hidden rounded-[32px] bg-navy px-7 py-10 shadow-[inset_0_0_0_1px_var(--color-line-strong)] sm:px-14 sm:py-16">
      <div
        aria-hidden="true"
        className="blob-a pointer-events-none absolute -left-20 -top-32 h-96 w-96 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(94,234,212,.28), transparent 65%)' }}
      />
      <div
        aria-hidden="true"
        className="blob-b pointer-events-none absolute -bottom-36 -right-16 h-[28rem] w-[28rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(125,168,255,.3), transparent 65%)' }}
      />
      <div className="relative flex flex-wrap items-center justify-between gap-8">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 className="text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.08]">{title}</h2>
          {children}
        </div>
        {actions}
      </div>
    </div>
  )
}
