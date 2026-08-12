import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

export default {
  testDir: here,
  testMatch: /rc-fix-selfcheck\.spec\.js/,
  timeout: 90_000,
  workers: 1,
  reporter: 'line',
  use: {
    baseURL: 'http://127.0.0.1:5184',
    viewport: { width: 1280, height: 720 },
    headless: true,
    launchOptions: {
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-angle=swiftshader', '--enable-webgl'],
    },
  },
  webServer: {
    command: 'npm run dev',
    cwd: '..',
    url: 'http://127.0.0.1:5184',
    reuseExistingServer: true,
    timeout: 60_000,
  },
};
