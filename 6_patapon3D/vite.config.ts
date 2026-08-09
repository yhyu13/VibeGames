import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 端口 5183 — 独占
// 5_gamejam_1 = 5173
// 4_chunbai/new_game = 3000
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5183,
    strictPort: true,
    host: '0.0.0.0',
  },
  build: {
    target: 'es2022',
    sourcemap: true,
  },
});
