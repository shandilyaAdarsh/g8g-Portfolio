# G8G Media — Creative Production Studio & Portfolio

> High-velocity creative production studio directing category-defining films for ambitious tech products, luxury architecture, and high-growth brands.

---

## ⚡ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom typography & responsive design tokens
- **Animations**: [Motion](https://motion.dev/) (Framer Motion) & [GSAP](https://gsap.com/)
- **Streaming & Video**: [Mux Video](https://mux.com/) HLS streaming & adaptive responsive players
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Automation**: Real-time multi-channel logging to Excel (`xlsx`), CSV, and live Google Sheets webhook
- **Icons**: [Lucide React](https://lucide.dev/)
- **Type Safety**: [TypeScript 5](https://www.typescriptlang.org/) strict mode

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/shandilyaAdarsh/g8g-Portfolio.git
cd g8g-Portfolio

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🧪 Testing & Verification

The codebase includes an automated test suite verifying server endpoints, contact validation, rate limiting, and SEO structured data:

```bash
# Run full automated test suite (Contact API + SEO & Structured Data)
npm test

# Run TypeScript type check
npm run typecheck

# Production build
npm run build
```

---

## 📁 Project Architecture

```
├── public/                 # Static assets, branding marks, and video media
│   └── images/showcase/    # High-definition showcase assets & watermarks
├── src/
│   ├── app/                # Next.js App Router pages & API routes
│   │   ├── api/contact/    # Inquiries submission & webhook endpoint
│   │   ├── api/inquiries/  # Inquiries Excel/CSV export endpoint
│   │   ├── work/           # Selected work gallery & case studies
│   │   ├── about/          # Studio philosophy & brand architecture
│   │   └── contact/        # Production brief inquiry form
│   ├── components/         # Reusable UI components & section blocks
│   ├── data/               # Project registry & service taxonomy
│   ├── lib/                # Excel engine, structured data & utilities
│   └── schemas/            # Zod validation schemas
├── server/                 # Standalone server request handlers
├── scripts/                # Google Sheets sync webhook & automation scripts
└── tests/                  # Automated test suite
```

---

## 🔒 Confidentiality & Security

Client inquiries submitted through the contact form are automatically processed and stored in `data/inquiries.xlsx` and synced to Google Sheets. Sensitive customer data and local environment variables (`.env.local`) are strictly excluded from version control.

---

© 2026 G8G Media. All rights reserved.
