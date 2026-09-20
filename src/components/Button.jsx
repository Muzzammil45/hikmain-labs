import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-base font-semibold transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0'

const variants = {
  primary: 'bg-action text-white shadow-sm hover:bg-blue-700 hover:shadow-md',
  secondary: 'border-2 border-action bg-white text-action hover:bg-blue-50',
  // For use on dark (primary-coloured) backgrounds
  light: 'bg-white text-primary shadow-sm hover:bg-surface',
  outlineLight: 'border-2 border-white/70 text-white hover:bg-white/10',
}

/** Renders a router Link, external <a>, or <button> depending on the props given. */
export default function Button({ variant = 'primary', to, href, className = '', children, ...rest }) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    )
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
