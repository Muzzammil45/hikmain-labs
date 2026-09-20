const tones = {
  white: 'bg-white text-black',
  surface: 'bg-surface text-black',
  dark: 'bg-primary text-white',
}

export default function Section({ tone = 'white', className = '', children, id }) {
  return (
    <section id={id} className={`${tones[tone]} py-14 sm:py-20 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  )
}

export function SectionHeading({ eyebrow, title, intro, tone = 'white', className = '' }) {
  const dark = tone === 'dark'
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && (
        <p className={`text-sm font-semibold uppercase tracking-wider ${dark ? 'text-teal-300' : 'text-accent'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-2 text-2xl font-bold sm:text-3xl ${dark ? '!text-white' : ''}`}>{title}</h2>
      {intro && <p className={`mt-4 text-lg leading-relaxed ${dark ? 'text-white/85' : 'text-black/75'}`}>{intro}</p>}
    </div>
  )
}
