import { Link } from 'react-router-dom'
import { site } from '../config/site'

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-heading text-xl font-bold">{site.legalName}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              UK Registered | Company Number: {site.company.number} | Registered Office:{' '}
              {site.company.registeredOffice}
            </p>
            <p className="mt-4 text-sm">
              <a
                href={`mailto:${site.contact.email}`}
                className="font-medium text-white underline underline-offset-2 hover:text-teal-300"
              >
                {site.contact.email}
              </a>
            </p>
          </div>

          <nav aria-label="Legal and policies">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-teal-300">
              Policies
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {site.policyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/85 underline underline-offset-2 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-sm text-white/70">
          &copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
