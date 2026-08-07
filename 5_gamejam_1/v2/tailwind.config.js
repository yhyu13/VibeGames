/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        abyss: '#0b1024',
        cold: '#1a2a4a',
        candle: '#ff9a3c',
        blood: '#d6223a',
        paper: '#e8e0cc',
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'serif'],
      },
    },
  },
  plugins: [],
};
