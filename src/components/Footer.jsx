import { Link } from 'react-router-dom'
import Logo from './Logo'
import EmailLink from './EmailLink'
import Icon from './Icon'
import { site, whatsappUrl } from '../config/site'

const headingClass = 'text-xs font-bold uppercase tracking-[0.14em] text-teal'
const linkClass = 'text-[14.5px] text-mist no-underline transition-colors hover:text-cloud'

export default function Footer() {
  const wa = whatsappUrl()
  const phoneHref = `tel:${site.contact.phone.replace(/\s/g, '')}`

  return (
    <footer className="border-t border-royal bg-midnight">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo tagline={false} />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">{site.footerDescription}</p>
          <p className="mt-5 text-xs leading-relaxed text-faint">
            <span className="font-semibold text-mist">{site.legalName}</span>
            <br />
            UK Registered | Company Number: {site.company.number} | Registered Office: {site.company.registeredOffice}
          </p>
        </div>

        {site.footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className={headingClass}>{col.title}</h2>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className={headingClass}>Contact</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <EmailLink className={`${linkClass} flex items-start gap-3 break-all`}>
                <Icon name="mail" size={20} className="mt-px shrink-0 text-teal" />
                <span>{site.contact.email}</span>
              </EmailLink>
            </li>
            <li>
              <a href={phoneHref} className={`${linkClass} flex items-start gap-3`}>
                <Icon name="phone" size={20} className="mt-px shrink-0 text-teal" />
                <span>{site.contact.phone}</span>
              </a>
            </li>
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className={`${linkClass} flex items-start gap-3`}>
                  <Icon name="chat" size={20} className="mt-px shrink-0 text-teal" />
                  <span>WhatsApp</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="container-page flex flex-col gap-3 border-t border-royal py-7 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <nav aria-label="Legal">
          <ul className="flex gap-6">
            {site.policyLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-mist underline underline-offset-4 hover:text-cloud">
                  {link.short || link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
