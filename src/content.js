/**
 * Page copy that more than one page uses: the support categories (Home and AI & Project
 * Support), the six-step process (Home and How It Works) and the reasons to choose
 * HIKMAIN (Home and About). Kept here so the wording stays identical everywhere.
 */
import { site } from './config/site'

export const categories = [
  {
    id: 'ai-data',
    icon: 'data',
    label: 'AI & data',
    title: 'AI and Data Support',
    headline: 'Human judgement for AI and data projects',
    summary: 'Human evaluation, feedback and data annotation to help AI and data projects stay accurate.',
    services: [
      'Human evaluation of AI outputs',
      'Response comparison and ranking',
      'Written feedback against project guidelines',
      'Data annotation and categorisation',
      'Prompt and response review',
      'Accuracy and consistency checking',
      'Quality review of completed batches',
    ],
    suitableFor: 'AI training, evaluation, data preparation and projects that require consistent human judgement.',
    // Worded to read naturally after "I would like to discuss…" in enquiry messages
    enquiryContext: 'human evaluation support for an AI or data project',
  },
  {
    id: 'research-digital',
    icon: 'search',
    label: 'Research',
    title: 'Research and Digital Assistance',
    headline: 'Information found, structured and maintained',
    summary: 'Online research, information gathering and organisation, delivered clearly and on time.',
    services: [
      'Online research and source gathering',
      'Information gathering and verification',
      'Spreadsheet organisation',
      'Concise research summaries',
      'Project documentation',
      'Data entry and digital administration',
      'Organisation of findings',
    ],
    suitableFor:
      'consultants, freelancers, students and independent professionals who need information found, structured or maintained.',
    enquiryContext: 'research and digital assistance',
  },
  {
    id: 'ongoing',
    icon: 'repeat',
    label: 'Ongoing',
    title: 'Ongoing Managed Support',
    headline: 'Dependable weekly support, without permanent hires',
    summary: 'Recurring assignments with tracking and quality control for work that continues.',
    services: [
      'Weekly recurring assignments',
      'Repeated digital workloads',
      'Task allocation across suitable contractors',
      'Progress tracking',
      'Weekly completion summaries',
      'Quality control',
      'Flexible capacity as workload changes',
    ],
    suitableFor: 'regular work that needs dependable completion without hiring permanent staff.',
    enquiryContext: 'ongoing weekly project support',
  },
]

export const tutoringFormats = [
  { icon: 'user', title: 'One-to-one tutoring', text: 'Focused sessions shaped around your pace, goals and questions.' },
  { icon: 'group', title: 'Small groups', text: 'Shared sessions for friends, classmates or study groups who want to learn together.' },
  { icon: 'chat', title: 'Subject explanations', text: 'Clear, patient explanations of the ideas you find difficult, in different ways until they click.' },
  { icon: 'task', title: 'Revision support', text: 'Structured review of topics, with practice questions and feedback on your answers.' },
  { icon: 'learn', title: 'Exam preparation', text: 'Techniques, timing and practice to help you approach exams with confidence.' },
]

export const steps = [
  ['Initial enquiry', 'Get in touch by WhatsApp, Google Meet or email, whichever is easiest for you.'],
  ['Private conversation', 'We talk privately to understand what you need, your timings and any concerns.'],
  ['Agree scope, timing and price', 'We set out what will be delivered, when, and the price, so everything is clear up front.'],
  ['Agreement and invoice', 'You receive written confirmation of what has been agreed, followed by an invoice.'],
  ['Assignment and delivery', 'Your work is assigned to a suitable independent professional and delivered as agreed.'],
  ['Review and revisions', 'You review the work. If it does not match what was agreed, we will work to put it right.'],
]

export const reasons = [
  { icon: 'task', title: 'Built around your project.', text: 'We start by listening, then shape the support to fit your goals, not the other way round.' },
  { icon: 'group', title: 'Skilled independent professionals.', text: 'Work is carried out by carefully selected contractors and freelancers with relevant experience.' },
  { icon: 'chat', title: 'One clear point of contact.', text: 'You always know who to speak to, and we manage delivery so you don’t have to.' },
  { icon: 'repeat', title: 'Flexible arrangements.', text: 'One-off tasks or ongoing weekly support, scaled up or down as your needs change.' },
  { icon: 'shield', title: 'Clear communication and confidentiality.', text: 'Scope, timing and price are agreed in writing, and your information is treated with care.' },
]

export const audiences = [
  { icon: 'user', title: 'Individuals', text: 'Personal projects, research or learning goals that need a capable extra pair of hands.' },
  { icon: 'task', title: 'Independent professionals', text: 'Consultants and specialists who want reliable support without taking on more overhead.' },
  { icon: 'data', title: 'Freelancers', text: 'Extra capacity for busy periods, or specialist input on a piece of client work.' },
  { icon: 'learn', title: 'Students', text: 'Personalised tutoring that builds real understanding and confidence.' },
  { icon: 'group', title: 'Growing teams', text: 'Flexible, remote support for projects that need to move without permanent hires.' },
]

export const marqueeItems = [
  'Human evaluation of AI outputs',
  'Data annotation',
  'Online research',
  'Ongoing managed support',
  'University tutoring',
  'Quality review',
]

export const tutoringSummary = `University-level tutoring from ${site.name}, with school and sixth-form support available through our partner, ${site.elevate.name}.`
