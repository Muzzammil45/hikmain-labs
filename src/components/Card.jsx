export default function Card({ title, children, icon, className = '', as: Tag = 'h3' }) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md ${className}`}
    >
      {icon && (
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent" aria-hidden="true">
          {icon}
        </div>
      )}
      {title && <Tag className="text-lg font-semibold">{title}</Tag>}
      <div className={`${title ? 'mt-2' : ''} leading-relaxed text-black/75`}>{children}</div>
    </div>
  )
}

/** Small reusable icons (stroke, inherit colour). */
export function Icon({ name }) {
  const paths = {
    data: 'M4 19V9m6 10V5m6 14v-7m4 7H2',
    task: 'M9 11l3 3 8-8M5 5h6M5 12h2M5 19h14',
    repeat: 'M4 12a8 8 0 0113.5-5.8L20 8m0-4v4h-4M20 12a8 8 0 01-13.5 5.8L4 16m0 4v-4h4',
    learn: 'M3 9l9-5 9 5-9 5-9-5zm4 3.5V17c0 1 2.2 2 5 2s5-1 5-2v-4.5',
    search: 'M21 21l-4.3-4.3M17 10a7 7 0 11-14 0 7 7 0 0114 0z',
    chat: 'M21 12a8 8 0 01-11.5 7.2L4 20l1-4.5A8 8 0 1121 12z',
    mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
    video: 'M4 7h10v10H4zM14 11l6-3v8l-6-3',
    check: 'M5 13l4 4L19 7',
    user: 'M12 12a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0',
    group: 'M9 11a3 3 0 100-6 3 3 0 000 6zm7 1a2.5 2.5 0 100-5m-13 12a6 6 0 0112 0m2-5a5 5 0 016 5',
    shield: 'M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z',
  }
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name] || paths.check} />
    </svg>
  )
}
