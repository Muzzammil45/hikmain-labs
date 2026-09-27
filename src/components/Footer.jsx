import { Link } from 'react-router-dom'
import Logo from './Logo'
import { Icon } from './Card'
import { site, whatsappUrl } from '../config/site'

const headingClass = 'font-heading text-sm font-semibold uppercase tracking-wider text-teal-300'
const linkClass = 'text-sm text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline'

export default function Footer() {
  const wa = whatsappUrl()
  const phoneHref = `tel:${site.contact.phone.replace(/\s/g, '')}`

  const contactItems = [
    { icon: 'mail', label: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: 'phone', label: site.contact.phone, href: phoneHref },
    wa && { icon: 'chat', label: 'WhatsApp', href: wa, external: true },
  ].filter(Boolean)

  return (
    <footer className="bg-primary text-white">
      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/85">{site.footerDescription}</p>
            <p className="mt-5 text-xs leading-relaxed text-white/75">
              <span className="font-semibold text-white">{site.legalName}</span>
              <br />
              UK Registered | Company Number: {site.company.number} | Registered Office:{' '}
              {site.company.registeredOffice}
            </p>
          </div>

          {/* Link columns */}
          {site.footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className={headingClass}>{col.title}</h2>
              <ul className="mt-4 space-y-3">
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

          {/* Contact */}
          <div>
            <h2 className={headingClass}>Contact</h2>
            <ul className="mt-4 space-y-3">
              {contactItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`${linkClass} flex items-start gap-3 break-all`}
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className="mt-0.5 shrink-0 text-teal-300 [&_svg]:h-5 [&_svg]:w-5">
                      <Icon name={item.icon} />
                    </span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/75 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}
          </p>
          <nav aria-label="Legal">
            <ul className="flex gap-6">
              {site.policyLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="underline underline-offset-4 hover:text-white">
                    {link.short || link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
