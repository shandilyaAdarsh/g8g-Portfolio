export interface ServiceItem {
  id: string
  slug: string
  number: string
  title: string
  headline: string
  shortDesc: string
  fullDesc: string
  deliverables: string[]
  idealFor: string
  iconName: 'Film' | 'Lightbulb' | 'Megaphone' | 'Rocket' | 'Video' | 'Clapperboard'
}

export interface ProductionFormat {
  id: string
  name: string
  summary: string
  strengths: string[]
  statusBadge: string
}

export interface ProcessStep {
  number: string
  title: string
  subtitle: string
  description: string
  milestone: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface PositioningPillar {
  number: string
  title: string
  description: string
}

export const mediaServices: ServiceItem[] = [
  {
    id: 'product-demos',
    slug: 'product-demos',
    number: '01',
    title: 'Product Demo Videos',
    headline: 'Showcase physical and digital products in their clearest light.',
    shortDesc:
      'Cinematic walkthroughs and feature spotlights that make user experiences and hardware craft tangible.',
    fullDesc:
      'We translate hardware engineering or digital software workflows into captivating, crystal-clear demonstrations. Rather than dry screencasts, we construct dynamic visual sequences that emphasize ergonomics, utility, and user delight.',
    deliverables: [
      'Comprehensive product walkthrough (60–90s)',
      'Individual feature spotlight vignettes (15s)',
      'High-resolution interface looping animations',
    ],
    idealFor: 'SaaS platforms, consumer electronics, hardware startups, and physical tools.',
    iconName: 'Film',
  },
  {
    id: 'explainers',
    slug: 'explainers',
    number: '02',
    title: 'Explainer Videos',
    headline: 'Turn complex architectures and ideas into digestible stories.',
    shortDesc:
      'Clear, narrative-driven storytelling that breaks down intricate concepts without losing technical fidelity.',
    fullDesc:
      'When your product solves a deep, multi-layered problem, standard copy falls short. We distill technical workflows, cryptographic systems, or enterprise workflows into structured visual stories that convert prospects within seconds.',
    deliverables: [
      'Narrative explainer video (60–120s)',
      'Modular chapters for sales pitch decks',
      'Script & storyboard source documentation',
    ],
    idealFor: 'Fintech, deep tech, cloud infrastructure, AI platforms, and B2B software.',
    iconName: 'Lightbulb',
  },
  {
    id: 'commercials',
    slug: 'commercials',
    number: '03',
    title: 'Commercials & Advertising',
    headline: 'High-energy commercial creatives built for performance.',
    shortDesc:
      'Targeted commercial spots and high-impact advertising assets designed to hook attention in competitive feeds.',
    fullDesc:
      'Modern advertising requires immediate retention. We engineer commercials with strong 3-second visual hooks, rhythmic pacing, and clear direct-action messaging optimized across aspect ratios for YouTube, social feeds, and digital broadcast.',
    deliverables: [
      'Primary commercial cut (30s & 15s)',
      'Vertical 9:16 mobile variations',
      'Alternative hook variations for A/B testing',
    ],
    idealFor: 'Direct-to-consumer brands, product launches, brand awareness campaigns.',
    iconName: 'Megaphone',
  },
  {
    id: 'product-launches',
    slug: 'product-launches',
    number: '04',
    title: 'Product Launch Videos',
    headline: 'Generate momentum for landmark releases and keynote moments.',
    shortDesc:
      'High-impact reveal sequences built for keynote events, investor presentations, and major digital unveilings.',
    fullDesc:
      'A launch happens once. We create cinematic reveal films that build anticipation, celebrate craftsmanship, and deliver a triumphant visual payoff for product keynotes, press releases, and global digital drops.',
    deliverables: [
      'Cinematic launch film / keynote reveal',
      'Teaser clips for social anticipation campaign',
      'Press kit video loops and hero website video',
    ],
    idealFor: 'Series launches, flagship product updates, conference keynotes.',
    iconName: 'Rocket',
  },
  {
    id: 'brand-films',
    slug: 'brand-films',
    number: '05',
    title: 'Brand Films',
    headline: 'Communicate company ethos, culture, and long-term vision.',
    shortDesc:
      'Emotionally resonant films that define your brand identity and establish authentic connections with audiences.',
    fullDesc:
      'Brand films transcend feature lists. We delve into founder origins, engineering conviction, and organizational philosophy, creating a timeless film asset that aligns teams, customers, and industry partners.',
    deliverables: [
      'Master brand anthem film (90–180s)',
      'Recruitment & culture cutdown',
      'Website ambient header cut',
    ],
    idealFor: 'Company milestones, funding announcements, brand repositioning.',
    iconName: 'Video',
  },
  {
    id: 'marketing-creatives',
    slug: 'marketing-creatives',
    number: '06',
    title: 'Creative Campaign Content',
    headline: 'Modular content packages built for multi-channel distribution.',
    shortDesc:
      'Consistent, campaign-ready visual assets engineered for social channels, paid acquisition, and content marketing.',
    fullDesc:
      'Instead of a single video, we produce cohesive content suites. We establish visual guidelines, repeatable motion templates, and multi-format video assets that keep your brand consistently visible across every digital touchpoint.',
    deliverables: [
      'Multi-format content pack (16:9, 1:1, 9:16)',
      'Kinetic motion design templates',
      'Digital display & looping web assets',
    ],
    idealFor: 'Growth teams, ongoing marketing campaigns, content-led product distribution.',
    iconName: 'Clapperboard',
  },
]

export const productionFormats: ProductionFormat[] = [
  {
    id: 'fmt-motion',
    name: 'Animation & Motion Graphics',
    summary:
      'From sleek 2D vector animation to complex 3D kinetic typography and interface choreography.',
    strengths: [
      'Abstract concept visualization',
      'Pixel-perfect software UI reproduction',
      'Complete art-direction flexibility without physical staging limits',
    ],
    statusBadge: 'Core Studio Specialization',
  },
  {
    id: 'fmt-live',
    name: 'Live-Action Production',
    summary:
      'Studio cinematography, macro product photography, and intentional human interaction.',
    strengths: [
      'Tactile physical product representation',
      'Authentic human connection and documentary realism',
      'High-end cinema optics, lighting, and sound capture',
    ],
    statusBadge: 'Confirmed via Studio Brief',
  },
  {
    id: 'fmt-mixed',
    name: 'Mixed-Media Production',
    summary:
      'Blending authentic live-action photography with graphic motion overlays, annotations, and 3D accents.',
    strengths: [
      'Balances real-world trust with digital clarity',
      'Highlights internal mechanisms over real devices',
      'Modern, highly editorial studio aesthetic',
    ],
    statusBadge: 'Core Studio Specialization',
  },
  {
    id: 'fmt-shortform',
    name: 'Short-Form Marketing Creatives',
    summary:
      'Vertical-first (9:16) video designed with swift hook mechanics, rhythmic captions, and high energy.',
    strengths: [
      'Optimized for mobile viewing contexts',
      'Fast turnaround iterations for performance testing',
      'Designed to capture attention in the first 3 seconds',
    ],
    statusBadge: 'Core Studio Specialization',
  },
]

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    subtitle: 'Objectives, Audience & Message',
    description:
      'We thoroughly dissect your product, market context, key value proposition, and communication hurdles. We agree on the exact message and measure of success before creative work starts.',
    milestone: 'Creative Brief & Strategic Alignment Document',
  },
  {
    number: '02',
    title: 'Concept',
    subtitle: 'Direction, Script & Storyboard',
    description:
      'We craft treatment scripts, moodboards, and visual storyboards. You see and approve the narrative flow, visual style, and pacing before a single frame of final footage or animation is created.',
    milestone: 'Approved Script & Visual Storyboard',
  },
  {
    number: '03',
    title: 'Produce',
    subtitle: 'Production & Animation',
    description:
      'We execute the confirmed visual direction through precision motion design, 3D asset generation, live filming, or mixed media workflows. Voiceover recording and initial sound pass are integrated.',
    milestone: 'First-Cut Work-in-Progress Review (v1)',
  },
  {
    number: '04',
    title: 'Refine',
    subtitle: 'Feedback & Polish',
    description:
      'We gather consolidated, structured feedback from your team. We fine-tune transitions, color grade, typography timing, and sound design to achieve uncompromising studio polish.',
    milestone: 'Locked Cut & Final Color/Audio Approval',
  },
  {
    number: '05',
    title: 'Deliver',
    subtitle: 'Multi-Format Export & Archival',
    description:
      'We render and master the final approved videos in all agreed resolutions, codecs, and aspect ratios (16:9, 9:16, 1:1, 4:5), ready for deployment across web, social, and broadcast.',
    milestone: 'Master Deliverable Package & Cloud Archive Access',
  },
]

export const positioningPillars: PositioningPillar[] = [
  {
    number: '01',
    title: 'Clear communication of complex products',
    description:
      'We eliminate ambiguity. Whether explaining distributed ledger mechanics or intricate industrial hardware, we make value instantly understandable.',
  },
  {
    number: '02',
    title: 'Visual storytelling tailored to the brand',
    description:
      'No copy-paste agency formulas. Every color tone, kinetic transition, and sound cue is customized to reflect your distinct brand architecture.',
  },
  {
    number: '03',
    title: 'Audience-grounded creative thinking',
    description:
      'We balance artistic ambition with audience psychology — crafting visual hooks that resonate with developers, executives, or consumer buyers.',
  },
  {
    number: '04',
    title: 'Structured, collaborative production process',
    description:
      'Clear milestones, transparent feedback rounds, and fixed deliverables. You always know where the project stands and what comes next.',
  },
  {
    number: '05',
    title: 'Multi-platform deliverable packages',
    description:
      'Every project includes the required cutdowns, vertical versions, and web-ready formats so your investment works across all digital channels.',
  },
]

export const serviceFAQs: FAQItem[] = [
  {
    id: 'faq-types',
    question: 'What types of videos can G8G Media create?',
    answer:
      'G8G Media produces product demo videos, explainer videos, commercials & advertising creatives, product launch reveal films, brand origin films, and multi-format campaign content. We work primarily in motion graphics, 2D/3D animation, and mixed-media production, with live-action capabilities scoped per confirmed brief.',
  },
  {
    id: 'faq-info',
    question: 'What information should I provide before starting?',
    answer:
      'To kick off an initial consultation, the most helpful details are: an overview of the product or idea, your primary communication objective (e.g. launch announcement, conversion lift, or concept education), your target audience, any existing brand guidelines, and your target timeline. If you don’t have a full brief yet, we will help you define it during discovery.',
  },
  {
    id: 'faq-launch',
    question: 'Can you create videos for product launches?',
    answer:
      'Yes. Product launch films are a core focus. We create complete launch suites including teaser clips, keynote-ready reveal films, high-resolution website hero loops, and social cutdowns synchronized with your launch date.',
  },
  {
    id: 'faq-scope',
    question: 'How is a production project scoped?',
    answer:
      'Every project is scoped individually based on narrative duration, production style (e.g. 2D vector vs. custom 3D CGI vs. live-action), the number of required aspect ratio deliverables (16:9, 9:16, etc.), and the production schedule. We provide a transparent scope of work with milestone sign-offs before production begins.',
  },
  {
    id: 'faq-discuss',
    question: 'How can I discuss a project with G8G Media?',
    answer:
      'You can reach out directly via our Start a Project enquiry form or email hello@g8g.media. We will review your preliminary details, schedule a brief discovery conversation, and prepare a tailored creative outline and scope.',
  },
]
