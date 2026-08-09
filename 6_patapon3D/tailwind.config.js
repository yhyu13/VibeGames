/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 与 TDD §4.5 / 02-art-direction §3.2 同步
        patapong: {
          floor: '#2a1a4a',
          'floor-line': '#ff3aaa',
          'bg-top': '#0a0a2a',
          'bg-bottom': '#1a0a3a',
          p1: '#3affc8',
          ai: '#ff7a3a',
          ball: '#ffd83a',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
};
