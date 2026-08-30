import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 端口 5184(避 4_chunbai=3000 / 5_gamejam_1=5173 / 6_patapong3D=5183)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5184,
    strictPort: true,
    host: true,
  },
  build: {
    target: 'es2022',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
});
