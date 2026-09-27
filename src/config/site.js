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
  // Default meta description (also used for the Home page)
  description:
    'HIKMAIN Labs provides flexible AI project support, digital assistance and personalised tutoring for individuals, independent professionals and growing teams.',

  // Shown on the Tutoring page.
  academicIntegrityStatement:
    'HIKMAIN Labs supports genuine learning. Tutors explain concepts, give feedback and help students practice, but do not sit examinations, impersonate students or complete assessed work for submission as the student’s own.',

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
    // Elevate referral pre-form: captures details before sending visitors on to Elevate Tuition.
    elevateReferralEndpoint: 'https://formspree.io/f/mzezjwoq',
  },

  // Elevate Tuition: independent partner for school, GCSE and A Level tutoring.
  elevate: {
    name: 'Elevate Tuition',
    url: 'https://elevatetuition.online/',
    // Where the referral pre-form sends visitors once their details have been recorded.
    referralUrl: 'https://elevatetuition.online/?ref=hikmain',
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

  // Policy pages. `short` is the label used in the footer's bottom bar.
  policyLinks: [
    { label: 'Privacy Notice', short: 'Privacy', to: '/privacy' },
    { label: 'Terms of Use', short: 'Terms of Use', to: '/terms' },
  ],

  // Footer content.
  footerDescription:
    'HIKMAIN Labs provides flexible AI project support, digital assistance and personalised tutoring through a managed network of independent professionals. University tutoring is delivered by HIKMAIN Labs, with school and sixth-form support through our partner, Elevate Tuition.',

  footerColumns: [
    {
      title: 'Services',
      links: [
        { label: 'AI & Project Support', to: '/project-support' },
        { label: 'AI and data support', to: '/project-support#ai-data' },
        { label: 'Research support', to: '/project-support#research-digital' },
        { label: 'Ongoing remote support', to: '/project-support#ongoing' },
        { label: 'Tutoring', to: '/tutoring' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', to: '/about' },
        { label: 'How It Works', to: '/how-it-works' },
        { label: 'Join Our Network', to: '/join' },
        { label: 'Contact', to: '/contact' },
      ],
    },
  ],

  nav: [
    { label: 'Home', to: '/' },
    { label: 'AI & Project Support', to: '/project-support' },
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

const DEFAULT_EMAIL_SUBJECT = 'Enquiry from the HIKMAIN Labs website'
const bodyParam = (name, body) => (body ? `&${name}=${encodeURIComponent(body)}` : '')

export const mailtoUrl = (subject = DEFAULT_EMAIL_SUBJECT, body) =>
  `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}${bodyParam('body', body)}`

// Compose-in-browser links, offered as alternatives to mailto: from the email options modal
// (a plain mailto: link silently does nothing if the visitor has no desktop mail client set up).
export const gmailUrl = (subject = DEFAULT_EMAIL_SUBJECT, body) =>
  `https://mail.google.com/mail/?view=cm&to=${site.contact.email}&su=${encodeURIComponent(subject)}${bodyParam('body', body)}`

export const outlookUrl = (subject = DEFAULT_EMAIL_SUBJECT, body) =>
  `https://outlook.live.com/mail/0/compose?to=${site.contact.email}&subject=${encodeURIComponent(subject)}${bodyParam('body', body)}`

export const meetUrl = () => site.contact.googleMeetRequestUrl || mailtoUrl('Google Meet request')
