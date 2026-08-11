// Legacy compatibility entry point.
//
// The former nine-scenario runner depended on a machine-specific Playwright path,
// removed mission/mask screens, and private Simulation fields. The maintained
// browser contract now lives in hotline-e2e.spec.js and resolves cached Playwright
// through npm exec, so old `node scripts/playtest.mjs` instructions delegate there.

import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scenario = process.argv[2] ?? 'all';
if (scenario !== 'all') {
  console.warn(
    `[playtest] scenario "${scenario}" retired; running the complete maintained browser suite instead.`,
  );
}

const projectDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const result = spawnSync(
  process.platform === 'win32' ? 'cmd.exe' : 'npm',
  process.platform === 'win32'
    ? ['/d', '/s', '/c', 'npm run e2e:playtest']
    : ['run', 'e2e:playtest'],
  {
    cwd: projectDir,
    stdio: 'inherit',
  },
);

process.exitCode = result.status ?? 1;
