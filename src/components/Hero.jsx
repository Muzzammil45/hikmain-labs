import { useRef } from 'react'

/**
 * The dark hero backdrop shared by every page: a navy glow, a faint dot grid, streams of
 * light flowing toward the HIKMAIN hub, and a soft spotlight that follows the cursor.
 * The spotlight writes CSS variables straight onto the element (no React re-render).
 */
export function HeroBackdrop({ children, className = '', streams = true }) {
  const ref = useRef(null)
  const frame = useRef(0)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
    })
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: 'radial-gradient(ellipse 80% 70% at 75% 8%, #12305A 0%, #0A1B33 45%, #050D1F 85%)',
        '--mx': '70%',
        '--my': '30%',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(440px circle at var(--mx) var(--my), rgba(94,234,212,.12), transparent 70%)' }}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 820"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="streamGrad" x1="0" x2="1">
            <stop offset="0" stopColor="#7DA8FF" stopOpacity="0" />
            <stop offset=".6" stopColor="#7DA8FF" stopOpacity=".9" />
            <stop offset="1" stopColor="#5EEAD4" />
          </linearGradient>
          <pattern id="dotGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.1" fill="#ffffff" fillOpacity="0.06" />
          </pattern>
        </defs>
        <rect width="1440" height="820" fill="url(#dotGrid)" />
        {streams && (
          <>
            <g fill="none" stroke="#7DA8FF" strokeOpacity=".12" strokeWidth="1">
              {STREAMS.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
            <g fill="none" stroke="url(#streamGrad)" strokeWidth="2.2" strokeLinecap="round">
              {STREAMS.map((d, i) => (
                <path
                  key={d}
                  d={d}
                  className="stream"
                  style={{ animationDuration: `${3.6 + (i % 4) * 0.6}s`, animationDelay: `${-i * 0.7}s` }}
                />
              ))}
            </g>
          </>
        )}
      </svg>
      <div className="relative">{children}</div>
    </div>
  )
}

const STREAMS = [
  'M-40 140 C 380 120, 700 260, 1080 360',
  'M-40 300 C 360 290, 720 330, 1080 380',
  'M-40 470 C 380 470, 720 420, 1080 395',
  'M-40 640 C 400 650, 760 500, 1080 410',
  'M1480 120 C 1320 200, 1220 300, 1110 365',
  'M1480 700 C 1320 600, 1220 470, 1110 415',
]

/** A headline whose words rise out of a soft blur, one after another. */
export function WordReveal({ text, highlight = 0, as: Tag = 'h1', className = '' }) {
  const words = text.split(' ')
  return (
    <Tag className={className}>
      {words.map((w, i) => (
          <span key={i}>
            <span
              className={`word ${i >= words.length - highlight ? 'text-teal' : ''}`}
              style={{ animationDelay: `${0.05 + i * 0.07}s` }}
            >
              {w}
            </span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
      ))}
    </Tag>
  )
}

/** Hero for inner pages: eyebrow, word-reveal title, intro and optional actions. */
export default function PageHero({ eyebrow, title, highlight = 0, intro, children }) {
  return (
    <HeroBackdrop>
      <div className="container-page pb-20 pt-36 sm:pb-24 sm:pt-44">
        {eyebrow && (
          <p className="fade-in mb-5 flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.14em] text-teal">
            <span className="live-dot" />
            {eyebrow}
          </p>
        )}
        <WordReveal
          text={title}
          highlight={highlight}
          className="max-w-4xl text-[clamp(2.4rem,5.2vw,4.25rem)] font-bold leading-[1.04] tracking-[-0.035em]"
        />
        {intro && (
          <p className="fade-in mt-6 max-w-3xl text-lg leading-relaxed text-mist sm:text-[19px]" style={{ animationDelay: '.6s' }}>
            {intro}
          </p>
        )}
        {children && (
          <div className="fade-in mt-9" style={{ animationDelay: '.8s' }}>
            {children}
          </div>
        )}
      </div>
    </HeroBackdrop>
  )
}
