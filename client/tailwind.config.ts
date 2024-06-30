import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        text_color: '#011E1A',
        border: '#075e54',
        input: '#075e54',
        ring: '#075e54',
        background: '#f9f7f4',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#075e54',
          foreground: 'black',
          50: '#e6efee',
          100: '#b2cdca',
          200: '#8db5b0',
          300: '#59938c',
          400: '#397e76',
          500: '#075e54',
          600: '#06564c',
          700: '#05433c',
          800: '#04342e',
          900: '#032723',
        },
        secondary: {
          DEFAULT: '#128c7e',
          foreground: '',
          50: '#e7f4f2',
          100: '#b6dbd7',
          200: '#92cac4',
          300: '#60b2a9',
          400: '#41a398',
          500: '#128c7e',
          600: '#107f73',
          700: '#0d6359',
          800: '#0a4d45',
          900: '#083b35',
        },
        success: {
          50: '#e9fbf0',
          100: '#bbf1d0',
          200: '#9bebb9',
          300: '#6de298',
          400: '#51dc85',
          500: '#25d366',
          600: '#22c05d',
          700: '#1a9648',
          800: '#147438',
          900: '#10592b',
        },
        error: {
          50: '#fcecec',
          100: '#f5c3c3',
          200: '#f0a7a7',
          300: '#e97e7e',
          400: '#e56565',
          500: '#de3f3f',
          600: '#ca3939',
          700: '#9e2d2d',
          800: '#7a2323',
          900: '#5d1a1a',
        },
        base: {
          50: '#fdfcfc',
          100: '#f9f7f4',
          200: '#f6f3ef',
          300: '#f2eee8',
          400: '#f0eae4',
          500: '#ece5dd',
          600: '#d7d0c9',
          800: '#476662',
          900: '#011E1A',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')],
} satisfies Config;

export default config;
