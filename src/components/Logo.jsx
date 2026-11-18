import { useId } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../config/site'

/** The H mark on its own, for the logo and the hero hub. */
export function Mark({ size = 44, framed = true }) {
  const gid = useId().replace(/[^a-zA-Z0-9]/g, '')
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      {framed && (
        <>
          <defs>
            <linearGradient id={`mk${gid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#7DA8FF" />
              <stop offset="1" stopColor="#5EEAD4" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="94" height="94" rx="26" fill="#0A1B33" stroke={`url(#mk${gid})`} strokeWidth="3" />
        </>
      )}
      <path d="M31 25v50M69 25v50M31 50h38" stroke="#EEF4FF" strokeWidth="9" strokeLinecap="round" />
      <circle cx="69" cy="25" r="7" fill="#5EEAD4" />
    </svg>
  )
}

/** Logo mark and wordmark. Links home. */
export default function Logo({ tagline = true }) {
  return (
    <Link to="/" className="flex items-center gap-3 text-cloud no-underline" aria-label={`${site.name} home`}>
      <Mark size={42} />
      <span className="flex flex-col leading-tight">
        <span className="font-heading text-lg font-bold tracking-tight">
          HIKMAIN <span className="text-teal">Labs</span>
        </span>
        {tagline && <span className="text-[12.5px] text-muted">Project support · Tutoring</span>}
      </span>
    </Link>
  )
}
