import { delimiter, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const binDir = process.env.PATH.split(delimiter).find((entry) => entry.includes(`${delimiter === ';' ? '\\' : '/'}_npx${delimiter === ';' ? '\\' : '/'}`));
if (!binDir) throw new Error('npm exec did not expose its cached Playwright package');
const nodeModules = resolve(binDir, '..');
const cli = join(nodeModules, 'playwright', 'cli.js');
const result = spawnSync(process.execPath, [cli, 'test', '--config', 'scripts/playwright.e2e.config.mjs'], {
  cwd: process.cwd(),
  env: { ...process.env, PLAYWRIGHT_TEST_PATH: join(nodeModules, 'playwright', 'test.mjs') },
  stdio: 'inherit',
});
process.exitCode = result.status ?? 1;
