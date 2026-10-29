export interface FaqItem {
  question: string
  answer: string
}

export const HOMEPAGE_FAQS: FaqItem[] = [
  {
    question: 'How long does a typical project take?',
    answer:
      'Production timelines depend on project scope. A standard 3D CGI or live-action production typically spans 2 to 6 weeks from initial kickoff to final delivery.',
  },
  {
    question: 'Do we need a finished script before reaching out?',
    answer:
      'No. We collaborate with teams at any stage, whether shaping an idea from scratch or working directly from an existing script and creative brief.',
  },
  {
    question: 'How are review rounds and revisions handled?',
    answer:
      'Structured review milestones are agreed before production begins. Feedback is integrated at defined stages—concept, storyboard, rough cut, and final grade—ensuring smooth, predictable progress.',
  },
  {
    question: 'What deliverables do we receive upon project completion?',
    answer:
      'You receive full-resolution 4K master files alongside web-optimised versions and agreed platform-specific cutdowns formatted for your campaign channels.',
  },
]
