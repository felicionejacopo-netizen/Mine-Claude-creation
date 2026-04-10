/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Syne', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] },
      colors: {
        brand: { 400: '#4ade80', 500: '#22c55e', 600: '#16a34a' },
        surface: { 600: '#22222f', 700: '#1a1a24', 800: '#111118', 900: '#0a0a0f' },
      },
    },
  },
  plugins: [],
}
