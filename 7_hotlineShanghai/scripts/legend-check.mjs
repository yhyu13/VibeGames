// scripts/legend-check.mjs — 操作表唯一真源的守卫
//
// 为什么需要这个文件:标题画面和战斗 HUD 曾经各抄了一份同样的操作字符串,
// BUGS.md B66 记录过它们漂移一次(改了 HUD 忘了改标题)。round #16 把两份手动
// 改回相等 —— 那是修好了一次,不是修好了这一类。这个脚本把"只有一份"变成会
// 失败的条件,所以下一次漂移在提交前就会被拦住,而不是等到某个玩家发现标题
// 教的操作是错的。
//
// 三类断言,任何一类单独都不够:
//
//   A 数据      把 src/core/data/controls.ts 真的打包执行,断言它渲染出的两行
//               与 2026-09-11 落地的字节一致。没有这一段,一个被子集化的
//               模块(比如不小心变成空数组)会让 B/C 段全部"通过"——列表空了,
//               自然没有第二份,自然也没有未绑定的键位。
//   B 唯一      全 src/ 下除了 controls.ts 自己,任何文件都不得再出现那一行。
//               这是 B66 的复发守卫。
//   C 真实      表里教的每一个键,都必须能在引擎的按键处理里找到对应分支;
//               而表中没有的键位也不会被悄悄教。这是"教的操作确实存在"的守卫。
//
// 本文件在落地前被反向验证过三次(删掉第二份→B 红;把 KeyR 改成 KeyQ→C 红;
// 把表清空→A 红)。一个匹配文本的守卫必须先证明它会失败,否则它只是在报平安。

import { strict as assert } from 'node:assert';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { readdirSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const SRC = join(ROOT, 'src');
const BINDINGS = join(SRC, 'engine', 'InputManager.ts');
const APP = join(SRC, 'App.tsx');
const CONTROLS = join(SRC, 'core', 'data', 'controls.ts');

// ── A 数据:执行真源,断言它渲染出的就是这两个画面该显示的东西 ────────────────
const tempDir = await mkdtemp(join(tmpdir(), '7hs-legend-'));
const bundlePath = join(tempDir, 'controls.mjs');
let controls;

try {
  await build({
    entryPoints: [CONTROLS],
    outfile: bundlePath,
    bundle: true,
    platform: 'node',
    format: 'esm',
    logLevel: 'silent',
  });
  controls = await import(`${pathToFileURL(bundlePath).href}?t=${Date.now()}`);
} finally {
  await rm(tempDir, { recursive: true, force: true });
}

const HUD_LINE = 'WASD 慢走 · Shift+WASD 冲刺 · 鼠标瞄准 · LMB 射击 · RMB 挥刀 · R 掷枪 · E 拾取 · F 切换';
const TITLE_ONLY_LINE = 'Space 翻滚 · Tab 暂停 · Esc 返回标题';

assert.equal(typeof controls.hudVerbs, 'function', 'controls.ts must export hudVerbs()');
assert.equal(controls.hudVerbs(), HUD_LINE, 'the HUD legend line changed');
assert.equal(
  controls.TITLE_ONLY_VERBS.join(controls.VERB_SEPARATOR),
  TITLE_ONLY_LINE,
  'the title-only legend line changed',
);

// 条目本身没有形状可查 —— 上面两条 exact 断言已经逐个钉死了它们,再加一条
// "必须含空格"只会把 `鼠标瞄准`(已发布的字节,唯一不带空格的一条)判红,
// 而统一成 `鼠标 瞄准` 会把渲染结果一起改掉,一个改动就变成两个。
// 这里只查一件事:条目不能自带分隔符,否则 join 之后没人分得清 11 条还是 12 条。
const VERBS = [...controls.CONTROL_VERBS, ...controls.TITLE_ONLY_VERBS];
assert.ok(VERBS.length >= 10, `expected the full verb table, got ${VERBS.length} entries`);
for (const entry of VERBS) {
  assert.ok(entry.trim().length > 0, 'legend entries may not be empty');
  assert.ok(!entry.includes(controls.VERB_SEPARATOR), `legend entry ${JSON.stringify(entry)} contains the separator`);
}

// ── C 真实:表里教的每一个键,都要能在按键处理里找到对应分支 ──────────────────
// 这张表是按"整条目"索引而不是按按键前缀:前缀解析对 `鼠标瞄准` 这种不带空格的
// 条目会失败,而整条目索引会在条目增删时直接报错,逼作者写下这个键位凭什么成立。
const KEY_PROOF = {
  'WASD 慢走': { file: BINDINGS, token: "keys.has('KeyD')" },
  'Shift+WASD 冲刺': { file: BINDINGS, token: "'ShiftLeft'" },
  '鼠标瞄准': { file: BINDINGS, token: "'mousemove'" },
  'LMB 射击': { file: BINDINGS, token: 'e.button === 0' },
  'RMB 挥刀': { file: BINDINGS, token: 'e.button === 2' },
  'R 掷枪': { file: BINDINGS, token: "'KeyR'" },
  'E 拾取': { file: BINDINGS, token: "'KeyE'" },
  'F 切换': { file: BINDINGS, token: "'KeyF'" },
  'Space 翻滚': { file: BINDINGS, token: "'Space'" },
  'Tab 暂停': { file: BINDINGS, token: "'Tab'" },
  'Esc 返回标题': { file: APP, token: "'Escape'" },
};

assert.deepEqual(
  [...VERBS].sort(),
  Object.keys(KEY_PROOF).sort(),
  'every legend entry must declare the binding that makes it true (and no entry may be taught without one)',
);

for (const [entry, { file, token }] of Object.entries(KEY_PROOF)) {
  const source = await readFile(file, 'utf8');
  assert.ok(
    source.includes(token),
    `the legend teaches ${JSON.stringify(entry)} but ${relative(ROOT, file)} no longer contains ${JSON.stringify(token)}`,
  );
}

// ── B 唯一:那一行只许出现在 controls.ts ─────────────────────────────────────
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });
}

const NEEDLE = controls.CONTROL_VERBS[0]; // 'WASD 慢走'
const restated = [];
for (const file of walk(SRC)) {
  if (!statSync(file).isFile() || !/\.(ts|tsx)$/.test(file)) continue;
  if (file === CONTROLS) continue;
  // 相邻两条条目同时出现才算"又抄了一份列表"——单个键名(比如注释里的 LMB)
  // 是正常引用,不是第二份真源。
  const source = await readFile(file, 'utf8');
  const pair = controls.VERB_SEPARATOR.trim() + ' ' + controls.CONTROL_VERBS[1].split(' ')[0];
  if (source.includes(NEEDLE) || source.includes(pair)) restated.push(relative(ROOT, file));
}
assert.deepEqual(restated, [], `the legend was restated outside controls.ts in: ${restated.join(', ')}`);

// 两个消费者必须真的读真源 —— 否则"唯一"可以靠两个画面都不显示来达成。
for (const [file, accessor] of [
  [join(SRC, 'components', 'HUD.tsx'), 'hudVerbs'],
  [join(SRC, 'components', 'MainMenu.tsx'), 'hudVerbs'],
]) {
  const source = await readFile(file, 'utf8');
  assert.ok(
    source.includes(`from '../core/data/controls'`) && source.includes(accessor),
    `${relative(ROOT, file)} no longer reads the legend from core/data/controls`,
  );
}
await readFile(join(SRC, 'components', 'MainMenu.tsx'), 'utf8').then((s) =>
  assert.ok(s.includes('TITLE_ONLY_VERBS'), 'MainMenu must render the title-only entries from the table'),
);

console.log(
  `Legend check: PASS (${VERBS.length} verbs, single source, every taught key bound in the engine)`,
);
