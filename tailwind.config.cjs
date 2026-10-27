/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#FFFFFF',
        'bg-card': '#FFFFFF',
        'accent': '#FF2E79',
        'accent-hover': '#FF1464',
        'text-primary': '#111111',
        'text-muted': '#62616A',
        'border-subtle': '#E9E6EB',
        'border-light': '#E9E6EB',
        'dark-pill': '#111111',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', '"Space Grotesk"', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(2.75rem, 6vw, 4.5rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'display-xl': ['clamp(2rem, 4.5vw, 3.25rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 4px 24px -2px rgba(17, 18, 21, 0.05), 0 2px 8px -1px rgba(17, 18, 21, 0.03)',
        'card-hover': '0 16px 36px -4px rgba(17, 18, 21, 0.09), 0 6px 16px -2px rgba(17, 18, 21, 0.05)',
        'pill': '0 2px 10px rgba(17, 18, 21, 0.08)',
      },
      screens: {
        xs: '360px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0, transform: 'translateY(12px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
