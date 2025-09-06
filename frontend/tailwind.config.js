/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      colors: {
        background: '#f5f9ff',   // very light bluish-white (water theme base)
        surface: '#ffffff',      // clean white cards/sections
        primary: '#FF9933',      // saffron (flag top)
        secondary: '#138808',    // green (flag bottom)
        accent: '#00AEEF',       // modern aqua blue (water accent)
        highlight: '#1e90ff',    // deeper blue highlight
        text: '#0f172a',         // dark navy (highly readable on light bg)
        'text-secondary': '#475569', // softer slate text
        border: '#cbd5e1',       // light neutral border
      },
      gradientColorStops: {
        tricolor: {
          saffron: '#FF9933',
          white: '#ffffff',
          green: '#138808',
        },
      },
      backgroundImage: {
        'tricolor-diagonal': 'linear-gradient(135deg, #FF9933 0%, #ffffff 50%, #138808 100%)',
        'water-wave': 'linear-gradient(135deg, #00AEEF 0%, #67e8f9 100%)',
      },
      animation: {
        'background-shine': 'background-shine 2s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'background-shine': {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
}
