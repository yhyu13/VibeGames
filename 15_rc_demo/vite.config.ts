import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [],
  server: {
    port: 5194,
  },
  preview: {
    port: 5194,
  },
});
