// Compatibility entry point. Playwright is resolved through npm exec by the package script,
// and the shared browser suite now validates RC Lab, the production port, showcase, and copy.
import { spawnSync } from 'node:child_process';

const result = spawnSync(
  process.platform === 'win32' ? 'cmd.exe' : 'npm',
  process.platform === 'win32'
    ? ['/d', '/s', '/c', 'npm run rc-lab:check']
    : ['run', 'rc-lab:check'],
  {
    cwd: process.cwd(),
    stdio: 'inherit',
  },
);

process.exitCode = result.status ?? 1;
