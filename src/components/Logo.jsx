import { Link } from 'react-router-dom'
import { site } from '../config/site'

/** Logo mark and wordmark, for use on the dark (primary) background. Links home. */
export default function Logo() {
  return (
    <Link to="/" className="inline-flex items-center gap-2.5 text-white" aria-label={`${site.name} home`}>
      <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill="#ffffff" fillOpacity="0.1" />
        <path d="M20 16v32M44 16v32M20 32h24" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
        <circle cx="44" cy="16" r="4" fill="#5eead4" />
      </svg>
      <span className="font-heading text-lg font-bold tracking-tight">
        HIKMAIN <span className="font-semibold text-teal-300">Labs</span>
      </span>
    </Link>
  )
}
