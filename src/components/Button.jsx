import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

const variants = {
  primary: 'btn-primary shimmer',
  ghost: 'btn-ghost',
  light: 'btn-light',
}

/** Renders a router Link, an external <a>, or a <button>, depending on the props given. */
const Button = forwardRef(function Button(
  { variant = 'primary', size, to, href, className = '', children, ...rest },
  ref,
) {
  const classes = `btn ${variants[variant] || variants.primary} ${size === 'lg' ? 'btn-lg' : ''} ${className}`

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a
        ref={ref}
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
    <button ref={ref} type="button" className={classes} {...rest}>
      {children}
    </button>
  )
})

export default Button
