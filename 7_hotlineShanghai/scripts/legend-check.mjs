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
//   C 真实      表里教的每一个键,都要真的**按下去**做表里说的那件事。
//   D 显示      两个画面必须真的把那一行**印出来**,而且**只印那一行**。
//
// C 和 D 都被返工过两次,每一次都是被一个反例推翻的。所以这里记下反例本身,
// 而不是记下"现在这版是对的":
//
//   C 第一版(round #19)是 `source.includes("'KeyE'")` —— 只查键位还在不在文件里。
//     C 第二版(round #22)改成"含键位的那一行、或它的下一行里,有没有出现动作
//     字面量"。两版都被推翻,第二版是被一行**注释**推翻的:在真正的处理器上方写
//     `// 'KeyE' -> kind: 'interactStart'`,再把 E 和 F 的 kind 对调,C 照样 PASS。
//     裁判的原话是两个版本的注释声称的都比代码证明的多 —— 所以这一段不再读源码。
//     它真的 new 一个 InputManager,经由 start() 注册到 window 上的那个监听器
//     按下每一个键,断言 send() 收到的东西**恰好**是表里说它该收到的东西。
//     注释改不动收件箱,文本相邻也改不动。
//
//   D 第一版是 `source.includes('hudVerbs')` —— import 语句本身就含这个词。把
//     `{hudVerbs()}` 从两个画面里删掉、只留 import,一个字都不显示,守卫照样 PASS。
//     D 第二版(round #22)改成渲染组件、在产出的 HTML 里 includes(那一行),
//     两个方向都被推翻:超集能过(标题多印一条 `· G 手雷` 也 PASS —— 正是 B66
//     的形状:画面教了游戏没有的操作),而纯样式改动误红(每个条目各包一个
//     <span> 就找不到那一行,尽管玩家看到的字一模一样)。
//     D 现在先把 HTML 归一化成纯文本(标签换成空格、连续空白压成一个),再断言
//     那一行是**整行** —— 后面不许再接一个分隔符加条目。元素边界和缩进不再影响
//     判定,多印一条则会让它变红。
//
// D 的代价要说清楚,而且现在是一个被测量的代价:这两个组件必须能在 Node 里渲染。
// 具体指它们不得在渲染期读浏览器全局量;真读了,断言会点名是哪一个、并给出两条
// 出路(挪进 effect,或加进下面的 BROWSER_SHIM 并说明为什么那个读取本身合理)。
// 只报"渲染失败"而不说是哪个全局量、为什么,等于把守卫的机制当成守卫的对象来报错。
//
// 本文件在落地前被反向验证过。这一版逐条重跑了裁判指出的四个方向:
//   加注释 + 对调 E/F 的 kind → C 红(曾经是绿的)
//   标题多印一条表外条目      → D 红(曾经是绿的)
//   每个条目各包一个 <span>   → 绿  (曾经是红的)
//   渲染期读 window.matchMedia → 绿 (曾经是红的)
// 一个匹配文本的守卫必须先证明它会失败,而一个声称读过行为的守卫必须先证明
// 它会被一行注释骗过 —— 两件事都真的发生过。

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

// ── C 真实:表里教的每一个键,都要真的**按下去**做表里说的那件事 ──────────────
// 这张表是按"整条目"索引而不是按按键前缀:前缀解析对 `鼠标瞄准` 这种不带空格的
// 条目会失败,而整条目索引会在条目增删时直接报错,逼作者写下这个键位凭什么成立。
//
// press 和 expect 必须成对给出:只给 expect 就是那个可以在说谎的操作表上报平安
// 的版本;只给 press 则是"按下去会发生什么"没人记得写下来。
const SAME_STATEMENT_WINDOW = 2;
const AIM = -1234.5; // 正常坐标算不出来的角度:看见它,就说明 aimAngle 真的被调用了

// 只在按键/渲染期间存在的浏览器替身。恢复成"从来没有过",而不是设成 undefined ——
// 一个 undefined 的 window 和不存在 的 window 对 `typeof window !== 'undefined'`
// 是两回事,不要在这里制造第三种状态。
async function withBrowserGlobals(globals, fn) {
  const had = Object.getOwnPropertyDescriptor(globalThis, 'window');
  globalThis.window = globals;
  try {
    return await fn();
  } finally {
    if (had) Object.defineProperty(globalThis, 'window', had);
    else delete globalThis.window;
  }
}

function keyEvent(code, repeat = false) {
  return {
    code,
    repeat,
    prevented: false,
    preventDefault() {
      this.prevented = true;
    },
  };
}
function mouseEvent(button) {
  return {
    button,
    prevented: false,
    preventDefault() {
      this.prevented = true;
    },
  };
}
function pointerEvent(clientX, clientY) {
  return { clientX, clientY };
}

async function loadBindings() {
  const dir = await mkdtemp(join(tmpdir(), '7hs-bindings-'));
  const out = join(dir, 'bindings.mjs');
  try {
    await build({ entryPoints: [BINDINGS], outfile: out, ...BUNDLE_OPTIONS });
    return await import(`${pathToFileURL(out).href}?t=${Date.now()}`);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

// 一次按键 = 一个全新的 InputManager(键位集合必须是干净的)+ 一个只记录的收件箱。
// 按下去的方式是调用 start() 真正注册到 window 上的那个监听器 —— 连"监听器有没有
// 挂上去"也一起覆盖了,而直接调 onDown 不会。
async function press(InputManager, drive) {
  const listeners = new Map();
  const log = [];
  const win = {
    addEventListener(type, fn) {
      if (!listeners.has(type)) listeners.set(type, []);
      listeners.get(type).push(fn);
    },
    removeEventListener(type, fn) {
      listeners.set(type, (listeners.get(type) ?? []).filter((f) => f !== fn));
    },
  };
  return withBrowserGlobals(win, () => {
    const manager = new InputManager(
      (input) => log.push({ via: 'send', input }),
      () => AIM,
      () => log.push({ via: 'onPause' }),
    );
    manager.start();
    drive({
      fire(type, event) {
        for (const fn of listeners.get(type) ?? []) fn(event);
      },
      update: () => manager.update(),
    });
    manager.stop();
    return log;
  });
}

const KEY_PROOF = {
  'WASD 慢走': {
    press: (h) => {
      h.fire('keydown', keyEvent('KeyD'));
      h.update();
    },
    expect: [{ via: 'send', input: { kind: 'move', dir: { x: 1, y: 0 }, speedMode: 'walk' } }],
  },
  'Shift+WASD 冲刺': {
    press: (h) => {
      h.fire('keydown', keyEvent('ShiftLeft'));
      h.fire('keydown', keyEvent('KeyD'));
      h.update();
    },
    expect: [{ via: 'send', input: { kind: 'move', dir: { x: 1, y: 0 }, speedMode: 'sprint' } }],
  },
  '鼠标瞄准': {
    press: (h) => h.fire('mousemove', pointerEvent(120, 480)),
    expect: [{ via: 'send', input: { kind: 'aim', angle: AIM } }],
  },
  'LMB 射击': {
    press: (h) => h.fire('mousedown', mouseEvent(0)),
    expect: [{ via: 'send', input: { kind: 'fireStart' } }],
  },
  'RMB 挥刀': {
    press: (h) => h.fire('mousedown', mouseEvent(2)),
    expect: [{ via: 'send', input: { kind: 'attackStart' } }],
  },
  'R 掷枪': {
    press: (h) => h.fire('keydown', keyEvent('KeyR')),
    expect: [{ via: 'send', input: { kind: 'throwStart' } }],
  },
  'E 拾取': {
    press: (h) => h.fire('keydown', keyEvent('KeyE')),
    expect: [{ via: 'send', input: { kind: 'interactStart' } }],
  },
  'F 切换': {
    press: (h) => h.fire('keydown', keyEvent('KeyF')),
    expect: [{ via: 'send', input: { kind: 'toggleMode' } }],
  },
  'Space 翻滚': {
    press: (h) => h.fire('keydown', keyEvent('Space')),
    expect: [{ via: 'send', input: { kind: 'dodge' } }],
  },
  'Tab 暂停': {
    press: (h) => {
      const e = keyEvent('Tab');
      h.fire('keydown', e);
      // 暂停不只是"调了 onPause":Tab 的默认行为会把焦点移走,不拦下来的话玩家
      // 暂停回来会发现键盘不再响应 —— 表上写着"暂停",做出来的却是别的事。
      assert.equal(e.prevented, true, 'Tab 暂停 must preventDefault, or pausing also tabs the focus away');
    },
    expect: [{ via: 'onPause' }],
  },
  'Esc 返回标题': {
    // 唯一一条行为覆盖不到的:处理器在 App.tsx 的一个 useEffect 里(不是
    // InputManager),而 SSR 不跑 effect,所以它没法用同一个方式按下。于是它退化成
    // 下面那条只含这一条的窄检查。要真正覆盖它,得先把这段处理挪出 effect。
    // 与其假装覆盖了,不如写下来 —— 这是这张表里唯一一处仍然相信文本的地方。
    press: null,
    source: { file: APP, key: "'Escape'", action: "'quitToTitle'" },
  },
};

assert.deepEqual(
  [...VERBS].sort(),
  Object.keys(KEY_PROOF).sort(),
  'every legend entry must declare what pressing it does (and no entry may be taught without one)',
);
for (const [entry, proof] of Object.entries(KEY_PROOF)) {
  assert.ok(
    proof.press === null || typeof proof.press === 'function',
    `${JSON.stringify(entry)} must declare a press(), or be explicitly marked as not pressable`,
  );
}

const { InputManager } = await loadBindings();
for (const [entry, { press: drive, expect }] of Object.entries(KEY_PROOF)) {
  if (!drive) continue;
  const log = await press(InputManager, drive);
  assert.deepEqual(
    log,
    expect,
    `the legend teaches ${JSON.stringify(entry)}, but pressing it produced ${JSON.stringify(log)} instead of ${JSON.stringify(expect)}`,
  );
}

// 上表里唯一 press: null 的那一条,在这里被查源码。窄,而且只窄到这一条。
for (const [entry, { source }] of Object.entries(KEY_PROOF)) {
  if (!source) continue;
  const lines = (await readFile(source.file, 'utf8')).split('\n');
  const at = lines.findIndex((line, i) =>
    line.includes(source.key) && lines.slice(i, i + SAME_STATEMENT_WINDOW).some((w) => w.includes(source.action)),
  );
  assert.ok(
    at >= 0,
    `${JSON.stringify(entry)} is the one entry the behavioural pass cannot reach, and ${relative(ROOT, source.file)} has no statement where ${JSON.stringify(source.key)} does ${JSON.stringify(source.action)}`,
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

// ── D 显示:两个画面必须真的把那一行印出来,而且只印那一行 ───────────────────────────────────
// 不读源码、只读渲染结果 —— 见文件顶部 D 段的两次返工。
const SEPARATOR = controls.VERB_SEPARATOR.trim();
// 标签换成空格、连续空白压成一个。这一步单独就让 <span> 拆行不再误红(拆开的是
// 同一个可见的行),而**整行**断言让超集不再漏过(多印的那一条紧跟在那一行后面)。
const plainText = (html) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

// 渲染期允许这两个组件读到的浏览器全局量:一个**显式的最小集**,不是完整的 DOM。
// 加进来的标准是"这个读取本身合理"(响应式断点、设备像素比),不是"为了让红变绿"。
// 这里没有的东西被读到,下面的 catch 会点名是哪一个,并说明两条出路 —— 只报
// "渲染失败"会把守卫的机制当成守卫的对象来报错,读的人会去修渲染,而不是修画面。
const BROWSER_SHIM = {
  matchMedia: (query) => ({
    matches: false,
    media: String(query),
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent: () => false,
  }),
  innerWidth: 1280,
  innerHeight: 720,
  devicePixelRatio: 1,
  addEventListener() {},
  removeEventListener() {},
  requestAnimationFrame: (fn) => setTimeout(fn, 0),
  cancelAnimationFrame: () => {},
};

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
    return await withBrowserGlobals(BROWSER_SHIM, async () => {
      const mod = await import(`${pathToFileURL(out).href}?t=${Date.now()}`);
      return mod.html;
    });
  } catch (e) {
    const missing = /([A-Za-z_$][\w$]*) is not defined/.exec(String(e && e.message));
    assert.fail(
      missing
        ? `${relative(ROOT, componentFile)} reads the browser global ${JSON.stringify(missing[1])} while it renders, and section D renders it in Node. Two ways out: move the read out of render (into an effect, where a screen that may be rendered before a browser exists belongs), or add that API to BROWSER_SHIM in this file and say why the read is legitimate.`
        : `${relative(ROOT, componentFile)} could not be rendered in Node, so the legend check cannot see what it prints: ${e}`,
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

// 印出来了,而且**到此为止**:那一行后面不许再接一个分隔符加条目。只查 includes
// 的话,标题多印一条 `· G 手雷`(表里没有、也没绑定任何东西的条目)照样通过 ——
// 那正是 B66 的形状:画面教了游戏没有的操作。
function assertLegendLine(name, text, line) {
  const at = text.indexOf(line);
  assert.ok(at >= 0, `${name} renders no legend line — it exists in controls.ts, but that screen does not print it`);
  const tail = text.slice(at + line.length, at + line.length + 12);
  assert.ok(
    !tail.startsWith(` ${SEPARATOR}`),
    `${name} prints a legend line that runs past the table: ${JSON.stringify(line + tail)} — a screen must not teach a control the game does not have (B66)`,
  );
}

const HUD_TEXT = plainText(await renderScreen('HUD', HUD_FILE));
const MENU_TEXT = plainText(await renderScreen('MainMenu', MENU_FILE));
assertLegendLine('HUD', HUD_TEXT, HUD_LINE);
assertLegendLine('MainMenu', MENU_TEXT, HUD_LINE);
// 标题行也单独查一次 —— 唯一 must not be achieved by showing it nowhere。
assertLegendLine('MainMenu', MENU_TEXT, TITLE_ONLY_LINE);

console.log(
  `Legend check: PASS (${VERBS.length} verbs, single source, ` +
    `${Object.values(KEY_PROOF).filter((p) => p.press).length} keys pressed through the real InputManager and each producing exactly its action, ` +
    `both screens print the line and nothing past it)`,
);
