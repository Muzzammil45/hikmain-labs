/**
 * CENTRAL SITE CONFIGURATION
 * --------------------------
 * Every company detail, contact channel and form endpoint used across the site
 * lives here. Update this one file and the header, footer, contact sections and
 * forms all change together. Values in [SQUARE BRACKETS] are placeholders.
 */

export const lastUpdated = '26 September 2026' // shown on every policy page

export const site = {
  name: 'HIKMAIN Labs',
  legalName: 'HIKMAIN LABS LTD',
  domain: '[DOMAIN TO BE UPDATED]', // e.g. https://www.hikmainlabs.co.uk
  tagline: 'Skilled support built around your project',

  company: {
    number: '17454287',
    registeredOffice: '272 Wingrove Avenue, Newcastle Upon Tyne, NE4 9AA, United Kingdom',
  },

  contact: {
    email: 'hikmainlabs@gmail.com',
    phone: '+44 7392 420327',
    // International format, digits only, no "+" or spaces (used for wa.me links).
    whatsappNumber: '447392420327',
    // Link to a Google Calendar appointment page, or leave blank to use email.
    googleMeetRequestUrl: '', // TODO: optional booking link
  },

  // Form delivery. Both forms POST to Formspree. The contractor form's
  // auto-response (applicant confirmation email) is switched on in the Formspree dashboard.
  forms: {
    contactEndpoint: 'https://formspree.io/f/xdekwbrj',
    applicationEndpoint: 'https://formspree.io/f/maenpvrz',
    // Cloudflare Turnstile site key. The env var lets local development use
    // Cloudflare's test key, because the live key only works on the approved domain.
    captchaSiteKey: import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAFE+tIZmIuqnQMw1O',
  },

  // Elevate Tuition: independent partner for school, GCSE and A Level tutoring.
  elevate: {
    name: 'Elevate Tuition',
    url: 'https://elevatetuition.online/',
    // Full wa.me link (with pre-filled message) to Elevate's WhatsApp.
    whatsappUrl:
      'https://wa.me/447533469509?text=Hi%20Elevate%20Tuition%2C%20I%20was%20referred%20through%20the%20HIKMAIN%20Labs%20website%20and%20would%20like%20to%20ask%20about%20tutoring.',
  },

  // University-level subjects advertised on the Tutoring page.
  tutoringSubjects: [
    {
      title: 'Maths and Statistics',
      detail: 'From school maths through to university-level statistics and data literacy.',
    },
    {
      title: 'Sciences',
      detail: 'Biology, Chemistry and Physics, with a focus on understanding, not memorising.',
    },
    {
      title: 'Computer Science and AI',
      detail: 'Programming foundations, data science and machine learning concepts.',
    },
  ],

  // Footer / policy links.
  policyLinks: [
    { label: 'Privacy Notice', to: '/privacy' },
    { label: 'Cookie Policy', to: '/cookies' },
    { label: 'Terms of Use', to: '/terms' },
    { label: 'Academic Integrity Policy', to: '/academic-integrity' },
    { label: 'Contractor Network Notice', to: '/contractor-notice' },
    { label: 'Accessibility Statement', to: '/accessibility' },
  ],

  nav: [
    { label: 'Home', to: '/' },
    { label: 'Project Support', to: '/project-support' },
    { label: 'Tutoring', to: '/tutoring' },
    { label: 'How It Works', to: '/how-it-works' },
    { label: 'About', to: '/about' },
    { label: 'Join Our Network', to: '/join' },
    { label: 'Contact', to: '/contact' },
  ],
}

export const whatsappUrl = (message = 'Hello HIKMAIN Labs, I would like to discuss a project.') =>
  site.contact.whatsappNumber
    ? `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`
    : null

export const mailtoUrl = (subject = 'Enquiry from the HIKMAIN Labs website') =>
  `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`

export const meetUrl = () => site.contact.googleMeetRequestUrl || mailtoUrl('Google Meet request')
