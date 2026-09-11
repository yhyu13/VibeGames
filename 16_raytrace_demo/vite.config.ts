import { defineConfig } from 'vite';

// 独立静态演示:无 React、无插件。base './' 使构建产物可被任意静态服务器托管。
export default defineConfig({
  base: './',
  server: {
    port: 5210,
    strictPort: true,
    host: '0.0.0.0',
  },
  build: {
    target: 'es2022',
    sourcemap: true,
  },
});
