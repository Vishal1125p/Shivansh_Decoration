import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669', // Primary green
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        gold: {
          50: '#FDFBF0',
          100: '#FAF4DC',
          200: '#F5E6BE',
          300: '#ECD391',
          400: '#E2BF64',
          500: '#D4AF37',
          600: '#B89020',
          700: '#946E14',
          800: '#73510F',
          900: '#523809',
        },
        surface: {
          light: '#FFFFFF',
          soft: '#F8FAF9',
          muted: '#F0FDF4',
          border: '#E2E8F0',
        },
        cream: {
          50: '#FCFAF7',
          100: '#F8F4EC',
          200: '#F0E8D9',
          300: '#E4D8C1',
          400: '#D5C4A3',
          500: '#BFA87E',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'green-glow': '0 4px 20px -2px rgba(5, 150, 105, 0.35)',
        'green-glow-lg': '0 8px 30px -4px rgba(5, 150, 105, 0.45)',
        'gold-glow': '0 4px 20px -2px rgba(5, 150, 105, 0.3)',
        'gold-glow-lg': '0 8px 30px -4px rgba(5, 150, 105, 0.4)',
        'card-light': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'card-elevated': '0 12px 30px -4px rgba(5, 150, 105, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'green-gradient': 'linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)',
        'emerald-gradient': 'linear-gradient(135deg, #34D399 0%, #059669 50%, #065F46 100%)',
        'gold-gradient': 'linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)',
        'light-surface-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #F8FAF9 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
