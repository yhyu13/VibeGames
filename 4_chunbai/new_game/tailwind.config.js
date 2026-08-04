/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pixel-title': ['"Press Start 2P"', 'monospace'],
        'pixel': ['VT323', 'monospace'],
      },
      colors: {
        'neon-blue': '#4488ff',
        'neon-cyan': '#00f0ff',
        'neon-pink': '#ff00ff',
        'neon-orange': '#ff6644',
        'dark-bg': '#0a0a1a',
        'dark-card': '#151528',
        'mecha-panel': '#1a1a2e',
        'mecha-border': '#00f0ff',
        'mecha-hp': '#00f0ff',
        'mecha-sp': '#ffcc00',
        'mecha-warning': '#ff8800',
        'mecha-danger': '#ff2244',
      },
      boxShadow: {
        'pixel': '2px 2px 0px 0px rgba(0, 240, 255, 0.5)',
        'pixel-sm': '1px 1px 0px 0px rgba(0, 240, 255, 0.5)',
      },
    },
  },
  plugins: [],
}
