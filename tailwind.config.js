/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a365d',
        secondary: '#2b6cb0',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1a365d',
            a: {
              color: '#2b6cb0',
              '&:hover': {
                color: '#1a365d',
              },
            },
            'h1, h2, h3, h4': {
              color: '#1a365d',
              fontFamily: 'var(--font-serif)',
            },
            blockquote: {
              borderLeftColor: '#e2e8f0',
              color: '#4a5568',
            },
            code: {
              color: '#1a365d',
              backgroundColor: '#f7fafc',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 