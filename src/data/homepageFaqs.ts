export interface FaqItem {
  question: string
  answer: string
}

export const HOMEPAGE_FAQS: FaqItem[] = [
  {
    question: 'How fast can we go from initial brief to final delivery?',
    answer:
      'Standard productions average 3 to 5 weeks. If you have an urgent product launch or keynote date, we offer an expedited 14-day sprint pipeline.',
  },
  {
    question: 'Do we need a script or storyboard before reaching out?',
    answer:
      'No. Over 70% of our partners come to us with just a technical spec sheet or a slide deck. We handle creative concepting, scriptwriting, and visual storyboarding from scratch.',
  },
  {
    question: 'How do review rounds and revisions work?',
    answer:
      'We use Frame.io for frame-accurate, timecode-synced feedback. You and your team click directly on the video to leave notes, and revisions are returned within 24–48 hours.',
  },
  {
    question: 'What exact deliverables do we receive at completion?',
    answer:
      'Full 4K ProRes 422 HQ masters, compressed web-ready H.264/HLS packages, 9:16 vertical cuts optimized for Instagram/TikTok/YouTube Shorts, 6-second teaser cuts, and isolated audio stems.',
  },
]
