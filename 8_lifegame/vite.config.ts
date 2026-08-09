import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// port 5185 — 5173/5174 (5_gamejam_1), 3000 (4_chunbai), 5183 (6_patapon3D), 5184 (7_hotlineShanghai) taken
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5185,
    strictPort: true,
    host: '0.0.0.0',
  },
  build: {
    target: 'es2022',
    sourcemap: true,
  },
})
