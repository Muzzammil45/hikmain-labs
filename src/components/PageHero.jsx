import Pattern from './Pattern'

/** Compact dark hero used at the top of inner pages. Renders the page's single h1. */
export default function PageHero({ title, intro, children }) {
  return (
    <div className="relative overflow-hidden bg-primary text-white">
      <Pattern tone="dark" className="absolute -right-16 top-0 h-full w-[34rem] opacity-70" />
      <div className="container-page relative py-14 sm:py-20">
        <h1 className="max-w-3xl text-3xl font-bold !text-white sm:text-4xl lg:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/85">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  )
}
