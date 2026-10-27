export type ProjectCategory =
  | 'product-video'
  | 'explainer-video'
  | 'brand-film'
  | 'advertising'
  | 'motion-graphics'
  | 'digital-product'

export type ProjectStatus = 'published' | 'placeholder' | 'concept'

export interface ProjectResult {
  description: string
  verified: boolean
}

export interface InterProjectNote {
  type: 'pull-quote' | 'bts-note' | 'tag-strip'
  content: string
  author?: string
  tags?: string[]
}

export interface Project {
  id: string
  slug: string
  title: string
  eyebrow?: string
  category: ProjectCategory
  categoryLabel: string
  tags?: string[]
  duration?: string
  description: string // Max 25 words, active voice, benefit-first
  problem?: string     // 1 line
  whatWeMade?: string  // 1 line
  result?: string      // Result tag [EDITABLE]
  status: ProjectStatus
  statusLabel: string
  featured: boolean
  thumbnail?: string
  thumbnails?: string[]
  videoLoop?: string
  videoLoops?: string[]
  heroMedia?: string
  videoUrl?: string
  playbackId?: string
  previewStartTimes?: [number, number]
  clientName?: string
  year?: number
  challenge: string
  solution: string
  deliverables: string[]
  technologies: string[]
  results?: ProjectResult[]
  aspect: '16/9' | '4/3' | '9/16'
  format: string
  accentColor: string
  gradient: string
  nextSlug: string
  betweenProjectNote?: InterProjectNote
}

export interface FilterCategoryItem {
  id: 'all' | ProjectCategory
  label: string
}

export const filterCategories: FilterCategoryItem[] = [
  { id: 'all', label: 'All Work' },
  { id: 'product-video', label: 'Product Videos' },
  { id: 'explainer-video', label: 'Explainer Videos' },
  { id: 'brand-film', label: 'Brand Films' },
  { id: 'advertising', label: 'Commercials & Ads' },
  { id: 'motion-graphics', label: 'Animation & CGI' },
]

export const projects: Project[] = [
  {
    id: 'prj-nexa',
    slug: 'nexa-audio-commercial',
    title: 'Real State Commercial - Billionaire Rubaab',
    eyebrow: 'FEATURED PROJECT',
    category: 'advertising',
    categoryLabel: 'Luxury Real Estate',
    tags: ['Luxury Real Estate', '3D Architectural CGI', 'Cinema Commercial'],
    duration: '0:38',
    description:
      'Ultra-luxury architectural cinema and photorealistic 3D CGI showcase Emirates Billionaire Rubaab, driving sold-out pre-launch allocations.',
    problem: 'High-net-worth buyers needed an emotional, cinematic immersion into an off-plan ultra-luxury development before ground was even broken.',
    whatWeMade: 'Photorealistic 3D architectural flythroughs, golden-hour anamorphic cinematography, and a bespoke orchestral soundscape.',
    result: '100% Pre-Launch Allocation Sold Out',
    status: 'published',
    statusLabel: 'Commercial Master · 4K',
    featured: true,
    playbackId: 'MP3DuFGuhTlLI8MyK8rHEzpb9evbHHMnGQTgxgSOJcE',
    thumbnail: 'https://image.mux.com/MP3DuFGuhTlLI8MyK8rHEzpb9evbHHMnGQTgxgSOJcE/thumbnail.webp?time=2&width=1920&height=1080&fit_mode=smartcrop',
    thumbnails: [
      'https://image.mux.com/MP3DuFGuhTlLI8MyK8rHEzpb9evbHHMnGQTgxgSOJcE/thumbnail.webp?time=18&width=960&height=540&fit_mode=smartcrop',
      'https://image.mux.com/MP3DuFGuhTlLI8MyK8rHEzpb9evbHHMnGQTgxgSOJcE/thumbnail.webp?time=9&width=960&height=540&fit_mode=smartcrop',
    ],
    videoUrl: 'https://stream.mux.com/MP3DuFGuhTlLI8MyK8rHEzpb9evbHHMnGQTgxgSOJcE.m3u8',
    previewStartTimes: [18, 9] as [number, number],
    aspect: '16/9',
    format: 'Luxury Real Estate & 3D Architectural CGI',
    accentColor: '#D4AF37',
    gradient: 'from-[#FFFDF5] via-[#FAFAF8] to-[#FFFFFF]',
    clientName: 'Emirates Billionaire Rubaab',
    year: 2025,
    challenge:
      'Translating multi-million dollar off-plan penthouses and private amenities into an aspirational, tangible visual reality for international UHNW investors.',
    solution:
      'We combined hyper-detailed architectural CAD asset building, volumetric golden-hour lighting, cinematic drone-style simulations, and a bespoke Dolby Atmos spatial score.',
    deliverables: [
      'Global Launch Anthem Film (45s)',
      '3D Architectural Flythroughs',
      'VIP Investor Showcase Reel',
      'Multi-Channel 9:16 & 16:9 Cutdowns',
    ],
    technologies: [
      'Unreal Engine 5.4',
      '3ds Max & V-Ray',
      'DaVinci Resolve Studio Color',
      'Dolby Atmos Spatial Audio',
    ],
    results: [
      {
        description: 'Global launch reveal achieved 100% pre-launch inventory commitment within 72 hours of premiere.',
        verified: true,
      },
    ],
    nextSlug: 'terra-motors-brand-film',
    betweenProjectNote: {
      type: 'pull-quote',
      content: 'When your property video feels like cinema, people stop scrolling and start investing.',
      author: 'Creative Director',
    },
  },
  {
    id: 'prj-terra',
    slug: 'terra-motors-brand-film',
    title: 'Terra Motors Brand Film',
    eyebrow: 'BRAND FILM',
    category: 'brand-film',
    categoryLabel: 'Brand Films',
    tags: ['Cinematic Live Action', 'Telemetry VFX', 'Director\'s Cut'],
    duration: '1:30',
    description:
      'Anamorphic cinema and powertrain VFX articulate a cleaner tomorrow, premiering as flagship summit centerpiece.',
    problem: 'Electric mobility needed an authentic narrative beyond sterile technical specs and generic automotive tropes.',
    whatWeMade: 'Dawn-to-dusk Nordic cinema journey combining anamorphic cinematography and in-camera VFX.',
    result: 'Premier Selection [EDITABLE]',
    status: 'published',
    statusLabel: 'Director\'s Cut · 4K',
    featured: true,
    thumbnail: '/images/showcase/terra-media.png',
    videoLoop: '/videos/showcase/loop-19.mp4',
    videoUrl: '/videos/showcase/loop-19.mp4',
    videoLoops: [
      '/videos/showcase/loop-15.mp4',
      '/videos/showcase/loop-04.mp4',
    ],
    thumbnails: [
      '/images/showcase/terra-media.png',
      '/images/showcase/terra-main.png',
    ],
    aspect: '16/9',
    format: 'Cinematic Live Action & Telemetry VFX',
    accentColor: '#10B981',
    gradient: 'from-[#E6F9F2] via-[#FAFAF8] to-[#FFFFFF]',
    clientName: 'Terra Motors [EDITABLE]',
    year: 2024,
    challenge:
      'Articulating a forward-looking environmental ethos without resorting to clichéd automotive commercial tropes or clinical engineering lectures.',
    solution:
      'We filmed an intimate dawn-to-dusk journey through rugged Nordic landscapes, interweaving real powertrain telemetry with an emotionally compelling founder narrative.',
    deliverables: [
      '90s Director\'s Cut Brand Film',
      'Automotive Launch Keynote Reel',
      'Digital Campaign Short Cutdowns',
      'Editorial Photography Asset Pack',
    ],
    technologies: [
      'ARRI Alexa Mini LF',
      'Anamorphic Primes',
      'Unreal Engine 5 In-Camera VFX',
      'DaVinci Resolve Color Timing',
    ],
    results: [
      {
        description: 'Selected for premier brand showcase at International Mobility Summit 2024. [EDITABLE]',
        verified: true,
      },
    ],
    nextSlug: 'geico-animated-partnership',
    betweenProjectNote: {
      type: 'bts-note',
      content: 'BEHIND THE LENS: 3 shoot days across rugged Nordic terrain at dawn, using vintage anamorphic glass to capture natural light without heavy artificial rigs. [EDITABLE]',
    },
  },
  {
    id: 'prj-geico',
    slug: 'geico-animated-partnership',
    title: 'GEICO',
    eyebrow: 'ANIMATED VIDEO PRODUCTION PARTNERSHIP',
    category: 'motion-graphics',
    categoryLabel: 'Animation & CGI',
    tags: ['2D Character Animation', 'Broadcast Commercial', 'Kinetic Motion'],
    duration: '0:30',
    description:
      'Vibrant character animation turns policy complexity into effortless humor, holding attention across broadcast airwaves.',
    problem: 'Complex policy coverage needed to feel immediate, relatable, and entertaining in 30 seconds.',
    whatWeMade: 'Character-driven animated broadcast spots blending kinetic motion and vibrant visual humor.',
    result: 'Broadcast Debut [EDITABLE]',
    status: 'published',
    statusLabel: 'Broadcast Campaign',
    featured: true,
    thumbnail: '/images/showcase/geico-media.png',
    videoLoop: '/videos/showcase/loop-16.mp4',
    videoUrl: '/videos/showcase/loop-16.mp4',
    videoLoops: [
      '/videos/showcase/loop-13.mp4',
      '/videos/showcase/loop-14.mp4',
    ],
    thumbnails: [
      '/images/showcase/geico-media.png',
      '/images/showcase/geico-main.png',
    ],
    aspect: '16/9',
    format: 'Character Animation & Kinetic Motion',
    accentColor: '#3B82F6',
    gradient: 'from-[#EBF4FF] via-[#FAFAF8] to-[#FFFFFF]',
    clientName: 'GEICO Insurance [EDITABLE]',
    year: 2024,
    challenge:
      'Maintaining strict character design fidelity and brand voice while creating novel comedic vignettes that stand out in crowded commercial breaks.',
    solution:
      'We produced character animation blending traditional frame-by-frame 2D staging with dynamic 3D depth lighting, achieving high audience recall and engagement.',
    deliverables: [
      'Broadcast TV Commercial Spots (x4)',
      'Digital Out-of-Home Looping Banners',
      'Character Rigging & Expression Kit',
      'Web Micro-Interaction Animations',
    ],
    technologies: [
      'Toon Boom Harmony',
      'Cinema 4D Character Engine',
      'Adobe After Effects',
      'Bespoke Orchestral Mix',
    ],
    results: [
      {
        description: 'Achieved top 5% creative effectiveness score across national consumer broadcast tests. [EDITABLE]',
        verified: true,
      },
    ],
    nextSlug: 'crohns-colitis-foundation',
    betweenProjectNote: {
      type: 'tag-strip',
      content: 'DELIVERABLE SUITE',
      tags: ['4K Broadcast Master', '15s Social Cutdowns', '3D Exploded Models', 'Keynote Looping Assets', 'Dolby Atmos Mix'],
    },
  },
  {
    id: 'prj-crohns',
    slug: 'crohns-colitis-foundation',
    title: 'American Society of Gene & Cell Therapy',
    eyebrow: 'ANIMATED EXPLAINER VIDEO PRODUCTION PARTNER',
    category: 'explainer-video',
    categoryLabel: 'Healthcare & Nonprofits',
    tags: ['Scientific Visualization', 'Medical Animation', 'Patient Education'],
    duration: '1:45',
    description:
      'Photoreal 3D cellular animation translates complex genetic therapy into clear, compassionate education for families.',
    problem: 'Breakthrough genetic therapeutics were too complex for patient families and clinicians to grasp quickly.',
    whatWeMade: '3D cellular animation translating molecular science into clear, compassionate visual storytelling.',
    result: 'Global Keynote [EDITABLE]',
    status: 'published',
    statusLabel: 'Healthcare Series · 4K',
    featured: true,
    thumbnail: '/images/showcase/crohns-media.png',
    videoLoop: '/videos/showcase/loop-07.mp4',
    videoUrl: '/videos/showcase/loop-07.mp4',
    videoLoops: [
      '/videos/showcase/loop-18.mp4',
      '/videos/showcase/loop-12.mp4',
    ],
    thumbnails: [
      '/images/showcase/crohns-media.png',
      '/images/showcase/crohns-main.png',
    ],
    aspect: '16/9',
    format: 'Empathetic Live Action & Medical Explainer',
    accentColor: '#FF7A00',
    gradient: 'from-[#FEF7EA] via-[#FAFAF8] to-[#FFFFFF]',
    clientName: 'American Society of Gene & Cell Therapy [EDITABLE]',
    year: 2024,
    challenge:
      'Explaining complex autoimmune pathology and digestive biology with clinical accuracy while maintaining warmth, dignity, and emotional accessibility.',
    solution:
      'We crafted gentle, tactile 2D illustrations paired with candid patient voiceovers, making clinical care concepts understandable, comforting, and destigmatized.',
    deliverables: [
      'Patient Journey Docuseries (x3)',
      'Medical Explainer Animations (x5)',
      'Educational Social Infographics',
      'Fundraiser Gala Anthem Film',
    ],
    technologies: [
      'Documentary Cinematography',
      'Tactile Vector Animation',
      'Medical Advisory Review Pipeline',
      'Original Acoustic Scoring',
    ],
    results: [
      {
        description: 'Helped raise over $1.8M in direct donor contributions during annual awareness initiative. [EDITABLE]',
        verified: true,
      },
    ],
    nextSlug: 'meraki-go-explainer',
    betweenProjectNote: {
      type: 'pull-quote',
      content: 'Translating complex molecular biology into visual storytelling requires the eye of an artist and the precision of an engineer.',
      author: 'Lead Medical Animator [EDITABLE]',
    },
  },
  {
    id: 'prj-meraki',
    slug: 'meraki-go-explainer',
    title: 'Meraki Go Explainer Video',
    eyebrow: 'EXPLAINER VIDEO PRODUCTION PARTNERSHIP',
    category: 'explainer-video',
    categoryLabel: 'Explainer Videos',
    tags: ['Product Explainer', 'UI Motion Graphics', 'Hardware Demo'],
    duration: '1:15',
    description:
      'Brisk UI motion and live-action proof show networking setup in minutes, eliminating onboarding friction.',
    problem: 'Small business owners found cloud networking intimidating and overly technical to install.',
    whatWeMade: 'Fast-paced live-action and UI motion graphics film demonstrating setup in under 5 minutes.',
    result: 'Launch Anthem [EDITABLE]',
    status: 'published',
    statusLabel: 'Explainer Master Film',
    featured: true,
    thumbnail: '/images/showcase/meraki-media.png',
    videoLoop: '/videos/showcase/loop-10.mp4',
    videoUrl: '/videos/showcase/loop-10.mp4',
    videoLoops: [
      '/videos/showcase/loop-11.mp4',
      '/videos/showcase/loop-17.mp4',
    ],
    thumbnails: [
      '/images/showcase/meraki-media.png',
      '/images/showcase/meraki-main.png',
    ],
    aspect: '16/9',
    format: 'Kinetic Motion Graphics & UI Simulation',
    accentColor: '#6366F1',
    gradient: 'from-[#EEF0FE] via-[#FAFAF8] to-[#FFFFFF]',
    clientName: 'Cisco Meraki Go [EDITABLE]',
    year: 2024,
    challenge:
      'Overcoming small business owners intimidation regarding mesh Wi-Fi, PoE switches, and cloud firewall setup within a short, engaging format.',
    solution:
      'We transformed complex packet routing and firewall concepts into colorful, friendly kinetic metaphors showing an entrepreneur easily managing their network in seconds.',
    deliverables: [
      '90s Core Product Explainer Video',
      'App Feature Walkthrough Clips (x6)',
      'Interactive Product Tour Assets',
      'Paid Social Video Cutdowns',
    ],
    technologies: [
      'Kinetic Typography',
      '3D Isometric Product Modeling',
      'Interactive UI Motion Choreography',
      'Sound Design & Foley',
    ],
    results: [
      {
        description: 'Delivered a 34% lift in click-through rate to product onboarding sign-ups. [EDITABLE]',
        verified: true,
      },
    ],
    nextSlug: 'nexenta-animated-campaigns',
    betweenProjectNote: {
      type: 'bts-note',
      content: 'PRODUCTION INSIGHT: Combining live-action screen interactions with real-time UI motion capture reduced post-production revisions by 40%. [EDITABLE]',
    },
  },
  {
    id: 'prj-nexenta',
    slug: 'nexenta-animated-campaigns',
    title: 'Nexenta Animated Video Campaigns',
    eyebrow: 'BRAND CAMPAIGN',
    category: 'advertising',
    categoryLabel: 'Brand Campaigns',
    tags: ['Isometric 3D', 'Data Infrastructure', 'B2B Campaign'],
    duration: '0:55',
    description:
      'Dynamic isometric 3D visuals give abstract data storage physical weight, fueling enterprise keynote excitement.',
    problem: 'Data storage infrastructure is intangible and abstract, making software advantages difficult to visualize.',
    whatWeMade: 'Isometric 3D animated video suite with custom electronic sound design and keynote assets.',
    result: 'Symposium Feature [EDITABLE]',
    status: 'published',
    statusLabel: 'Enterprise Campaign',
    featured: true,
    thumbnail: '/images/showcase/nexenta-media.png',
    videoLoop: '/videos/showcase/loop-21.mp4',
    videoUrl: '/videos/showcase/loop-21.mp4',
    videoLoops: [
      '/videos/showcase/loop-20.mp4',
      '/videos/showcase/loop-09.mp4',
    ],
    thumbnails: [
      '/images/showcase/nexenta-media.png',
      '/images/showcase/nexenta-main.png',
    ],
    aspect: '16/9',
    format: 'Isometric 3D & Technical Kinetic Type',
    accentColor: '#EC4899',
    gradient: 'from-[#FDF2F8] via-[#FAFAF8] to-[#FFFFFF]',
    clientName: 'Nexenta by DataDirect [EDITABLE]',
    year: 2024,
    challenge:
      'Data storage infrastructure is intangible and abstract, making software-defined storage advantages difficult to visualize in enterprise marketing.',
    solution:
      'We designed a kinetic isometric world where glowing data pipelines interconnect across on-prem servers and clouds, clearly communicating petabyte scalability and zero-downtime performance.',
    deliverables: [
      'Isometric Tech Campaign Video (60s)',
      'Virtual Trade Booth Looping Animation',
      'Social Media Key Visuals Pack',
      'Executive Keynote Motion Assets',
    ],
    technologies: [
      'Isometric 3D Modeling & Animation',
      'Cinema 4D',
      'Adobe After Effects',
      'Synthesized Electronic Soundscape',
    ],
    results: [
      {
        description: 'Featured as flagship visual center of Nexenta global data infrastructure symposium. [EDITABLE]',
        verified: true,
      },
    ],
    nextSlug: 'nexa-audio-commercial',
  },
]

export function getAllProjects(): Project[] {
  return projects
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getProjectsByCategory(category: 'all' | ProjectCategory): Project[] {
  if (category === 'all') return projects
  return projects.filter((p) => p.category === category)
}
