// scripts/legend-check.mjs — 操作表唯一真源的守卫
//
// 为什么需要这个文件:标题画面和战斗 HUD 曾经各抄了一份同样的操作字符串,
// BUGS.md B66 记录过它们漂移一次(改了 HUD 忘了改标题)。round #16 把两份手动
// 改回相等 —— 那是修好了一次,不是修好了这一类。这个脚本把"只有一份"变成会
// 失败的条件,所以下一次漂移在提交前就会被拦住,而不是等到某个玩家发现标题
// 教的操作是错的。
//
// 四类断言,任何一类单独都不够:
//
//   A 数据      把 src/core/data/controls.ts 真的打包执行,断言它渲染出的两行
//               与 2026-09-11 落地的字节一致。没有这一段,一个被子集化的
//               模块(比如不小心变成空数组)会让 B/C/D 段全部"通过"——列表空了,
//               自然没有第二份,自然也没有未绑定的键位,自然也印得出来。
//   B 唯一      全 src/ 下除了 controls.ts 自己,任何文件都不得再出现那一行。
//               这是 B66 的复发守卫。
//   C 真实      表里教的每一个键,都必须**在同一个语句里**做表里说的那件事。
//   D 显示      两个画面必须真的把那一行**印出来**。
//
// C 和 D 各自被一次变异证明过(round #22,2026-09-11):
//
//   C 原来的写法是 `source.includes("'KeyE'")` —— 只查键位还在不在文件里。
//     把 InputManager 里 KeyE 和 KeyF 的 kind 对调(E 去切模式、F 去交互),
//     两个键位字面量都还在,**守卫照样 PASS**,而玩家按 E 做的是 F 的事。
//     现在每个条目同时声明 key 和 action,断言要求两者落在同一个语句上
//     (键位那一行,或紧接的下一行 —— 一行式的 `if (...) {` + 下一行是常见写法)。
//     同一次对调现在会让 C 变红。
//
//   D 原来的写法是 `source.includes('hudVerbs')` —— 而 import 语句本身就含这个
//     词。把 `{hudVerbs()}` 从 HUD 和 MainMenu 里都删掉、只留 import,两个画面
//     一个字都不显示,**守卫照样 PASS** —— 正好是这段注释原本说要防的那种
//     "唯一可以靠两个画面都不显示来达成"。现在这里不读源码,而是把两个组件真的
//     渲染一遍,在产出的 HTML 里找那一行。
//
// D 的代价要说清楚:这两个组件从此必须能在 Node 里渲染(不要有模块级的 window/
// document 访问)。渲染失败会以一条点名文件的断言报错,而不是静默跳过。
//
// 本文件在落地前被反向验证过(删掉第二份→B 红;把 KeyR 改成 KeyQ→C 红;
// 把表清空→A 红;对调 E/F 的 kind→C 红;从两个画面删掉渲染→D 红)。
// 一个匹配文本的守卫必须先证明它会失败,否则它只是在报平安。

import { strict as assert } from 'node:assert';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
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
const HUD_FILE = join(SRC, 'components', 'HUD.tsx');
const MENU_FILE = join(SRC, 'components', 'MainMenu.tsx');

// esbuild 跑在入口文件所在的目录里解析裸导入,而入口在系统临时目录 —— 所以
// nodePaths 把解析指回本树。react-dom/server 是 CJS 且 require('util'),ESM
// 产物里没有 require,banner 补一个。
const BUNDLE_OPTIONS = {
  bundle: true,
  platform: 'node',
  format: 'esm',
  jsx: 'automatic',
  loader: { '.css': 'empty' },
  logLevel: 'silent',
  absWorkingDir: ROOT,
  nodePaths: [join(ROOT, 'node_modules')],
  banner: {
    js: "import { createRequire as __legendCr } from 'node:module'; const require = __legendCr(import.meta.url);",
  },
};

// ── A 数据:执行真源,断言它渲染出的就是这两个画面该显示的东西 ────────────────
const tempDir = await mkdtemp(join(tmpdir(), '7hs-legend-'));
const bundlePath = join(tempDir, 'controls.mjs');
let controls;

try {
  await build({
    entryPoints: [CONTROLS],
    outfile: bundlePath,
    ...BUNDLE_OPTIONS,
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

// ── C 真实:表里教的每一个键,都要在同一个语句里做表里说的那件事 ──────────────
// 这张表是按"整条目"索引而不是按按键前缀:前缀解析对 `鼠标瞄准` 这种不带空格的
// 条目会失败,而整条目索引会在条目增删时直接报错,逼作者写下这个键位凭什么成立。
//
// key 和 action 都必须给出:只给 key 就是 round #22 之前那个可以在说谎的操作表上
// 报平安的版本。action 允许落在键位那一行的下一行,因为 `if (...)` 换行再写
// 函数体是这个文件里已有的写法(App.tsx 的 Escape)。
const SAME_STATEMENT_WINDOW = 2;
const KEY_PROOF = {
  'WASD 慢走': { file: BINDINGS, key: "keys.has('KeyD')", action: "kind: 'move'" },
  'Shift+WASD 冲刺': { file: BINDINGS, key: "'ShiftLeft'", action: "'sprint'" },
  '鼠标瞄准': { file: BINDINGS, key: "'mousemove'", action: 'this.onMove' },
  'LMB 射击': { file: BINDINGS, key: 'e.button === 0', action: "kind: 'fireStart'" },
  'RMB 挥刀': { file: BINDINGS, key: 'e.button === 2', action: "kind: 'attackStart'" },
  'R 掷枪': { file: BINDINGS, key: "'KeyR'", action: "kind: 'throwStart'" },
  'E 拾取': { file: BINDINGS, key: "'KeyE'", action: "kind: 'interactStart'" },
  'F 切换': { file: BINDINGS, key: "'KeyF'", action: "kind: 'toggleMode'" },
  'Space 翻滚': { file: BINDINGS, key: "'Space'", action: "kind: 'dodge'" },
  'Tab 暂停': { file: BINDINGS, key: "'Tab'", action: 'this.onPause' },
  'Esc 返回标题': { file: APP, key: "'Escape'", action: "'quitToTitle'" },
};

assert.deepEqual(
  [...VERBS].sort(),
  Object.keys(KEY_PROOF).sort(),
  'every legend entry must declare the binding that makes it true (and no entry may be taught without one)',
);

for (const [entry, { file, key, action }] of Object.entries(KEY_PROOF)) {
  const lines = (await readFile(file, 'utf8')).split('\n');
  const at = lines.findIndex((line, i) =>
    line.includes(key) && lines.slice(i, i + SAME_STATEMENT_WINDOW).some((w) => w.includes(action)),
  );
  assert.ok(
    at >= 0,
    `the legend teaches ${JSON.stringify(entry)} but ${relative(ROOT, file)} has no statement where ${JSON.stringify(key)} does ${JSON.stringify(action)}`,
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

// ── D 显示:两个画面必须真的把那一行印出来 ───────────────────────────────────
// 不读源码、只读渲染结果 —— 见文件顶部 D 段的由来。
async function renderScreen(componentName, componentFile) {
  const dir = await mkdtemp(join(tmpdir(), '7hs-screen-'));
  const entry = join(dir, 'screen.mjs');
  const out = join(dir, 'screen.bundle.mjs');
  try {
    await writeFile(
      entry,
      `import * as React from 'react'\n` +
        `import { renderToStaticMarkup } from 'react-dom/server'\n` +
        `import { ${componentName} } from ${JSON.stringify(componentFile)}\n` +
        `export const html = renderToStaticMarkup(React.createElement(${componentName}))\n`,
      'utf8',
    );
    await build({ entryPoints: [entry], outfile: out, ...BUNDLE_OPTIONS });
    const mod = await import(`${pathToFileURL(out).href}?t=${Date.now()}`);
    return mod.html;
  } catch (e) {
    assert.fail(
      `${relative(ROOT, componentFile)} could not be rendered in Node, so the legend check cannot see what it prints: ${e}`,
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

const HUD_HTML = await renderScreen('HUD', HUD_FILE);
const MENU_HTML = await renderScreen('MainMenu', MENU_FILE);

for (const [name, html] of [
  ['HUD', HUD_HTML],
  ['MainMenu', MENU_HTML],
]) {
  assert.ok(
    html.includes(HUD_LINE),
    `${name} renders no legend line — it exists in controls.ts, but that screen does not print it`,
  );
}
assert.ok(
  MENU_HTML.includes(TITLE_ONLY_LINE),
  'MainMenu renders no title-only line — 唯一 must not be achieved by showing it nowhere',
);

console.log(
  `Legend check: PASS (${VERBS.length} verbs, single source, every taught key bound to its action, both screens render it)`,
);
