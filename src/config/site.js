/**
 * CENTRAL SITE CONFIGURATION
 * --------------------------
 * Every company detail, contact channel and form endpoint used across the site
 * lives here. Update this one file and the header, footer, contact sections and
 * forms all change together. Values in [SQUARE BRACKETS] are placeholders.
 */

export const site = {
  name: 'HIKMAIN Labs',
  legalName: 'HIKMAIN LABS LTD',
  domain: '[DOMAIN TO BE UPDATED]', // e.g. https://www.hikmainlabs.co.uk
  tagline: 'Skilled support built around your project',

  company: {
    number: '[TO BE UPDATED]',
    registeredOffice: '[TO BE UPDATED]',
  },

  contact: {
    // Use a company-controlled address, not a personal one.
    email: 'hello@example.com', // TODO: replace with company email
    // International format, digits only, no "+" or spaces. e.g. 447700900123
    whatsappNumber: '', // TODO: replace with WhatsApp Business number
    // Link to a Google Calendar appointment page, or leave blank to use email.
    googleMeetRequestUrl: '', // TODO: optional booking link
  },

  // Form delivery. Both forms POST here. Create a form at https://formspree.io
  // (or a compatible service), point it at the company inbox, and enable its
  // auto-response for the contractor form so applicants get a confirmation email.
  forms: {
    contactEndpoint: '', // TODO: e.g. https://formspree.io/f/xxxxxxxx
    applicationEndpoint: '', // TODO: e.g. https://formspree.io/f/yyyyyyyy
    // Optional Cloudflare Turnstile / hCaptcha site key for extra spam protection.
    captchaSiteKey: '',
  },

  // Subjects advertised on the Tutoring page.
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
