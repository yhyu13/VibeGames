import { strict as assert } from 'node:assert';
import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const run = (command, args) => {
  // Windows shell:可执行路径含空格必须引号包裹;裸命令(npm)加 .cmd 后缀让 cmd.exe 正确解析
  const isWin = process.platform === 'win32';
  const cmd = isWin
    ? (command.includes('\\') || command.includes('/') ? `"${command}"` : `${command}.cmd`)
    : command;
  const result = spawnSync(cmd, args, { cwd: process.cwd(), encoding: 'utf8', shell: isWin });
  assert.equal(result.status, 0, `${cmd} ${args.join(' ')} failed:\n${result.stdout}${result.stderr}`);
};

const presenter = await readFile('src/engine/RcPresenter.ts', 'utf8');
const pipeline = await readFile('src/engine/RcPipeline.ts', 'utf8');
const finalShader = await readFile('src/engine/shaders/final.frag', 'utf8');

assert.match(presenter, /Object\.assign\(this\.state, this\.fallbackState\(\)\)/, 'fallback must mutate the public live state');
assert.match(presenter, /roomTopologyKey/, 'occlusion cache must invalidate on room topology');
assert.match(pipeline, /UNPACK_FLIP_Y_WEBGL, 1/, 'ImageData uploads must align Canvas top-left rows with WebGL output');
assert.match(finalShader, /base \* mix\(0\.50, 1\.0/, 'unlit scene must remain readable while lit areas retain sprite color');

run(process.execPath, ['scripts/process-intro-sprites.mjs', '--check']);
run('npm', ['run', 'typecheck']);
run('npm', ['run', 'build']);
run('npm', ['run', 'light-break:check']);
run('npm', ['run', 'combat-loop:check']);
console.log('Intro polish check: PASS (assets, RC state/planes/orientation/contrast, typecheck, build, light break, combat loop)');
