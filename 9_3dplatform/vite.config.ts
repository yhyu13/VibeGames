import { defineConfig } from 'vite'

// Dev server pinned to 5186 with strictPort per TDD.md §1 (5183/5185/5173/3000 taken by siblings).
export default defineConfig({
  server: { port: 5186, strictPort: true },
  preview: { port: 5186, strictPort: true },
  build: { target: 'esnext' }
})
