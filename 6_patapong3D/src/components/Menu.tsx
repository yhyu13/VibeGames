/**
 * components/Menu.tsx — 主菜单(MENU phase)
 *
 * M1.5 by agent-ui。街机霓虹风,色值直接用 TDD §4.5 冻结 hex 常量
 * (不 import three):#3affc8(P1 青绿)/ #ffd83a(球黄)/ #ff3aaa(边线粉)。
 * PLAY 按钮 → sendUiCommand('startMatch') → 引擎转 READY。
 */

import { usePatapongStore } from '../store';

const CONTROLS: ReadonlyArray<{ key: string; desc: string }> = [
  { key: 'W / S', desc: '上下移动' },
  { key: 'SPACE', desc: '发球' },
  { key: 'R', desc: '重赛' },
  { key: 'ESC', desc: '菜单' },
  { key: 'M', desc: '静音' },
];

export function Menu() {
  const phase = usePatapongStore((s) => s.phase);
  const sendUiCommand = usePatapongStore((s) => s.sendUiCommand);

  if (phase !== 'MENU') return null;

  return (
    <div className="pointer-events-auto absolute inset-0 flex flex-col items-center justify-center gap-7 bg-black/50">
      {/* 标题 */}
      <h1 className="pata-menu-in text-7xl font-black italic tracking-tight text-[#3affc8] [text-shadow:0_0_30px_rgba(58,255,200,0.6)]">
        PATAPONG{' '}
        <span className="text-[#ffd83a] [text-shadow:0_0_30px_rgba(255,216,58,0.6)]">3D</span>
      </h1>

      {/* PLAY 大按钮 */}
      <button
        type="button"
        onClick={() => sendUiCommand('startMatch')}
        className="pointer-events-auto rounded-lg border-2 border-[#ff3aaa] bg-[#1a1a3a] px-16 py-4 text-3xl font-bold tracking-[0.3em] text-white shadow-[0_0_25px_rgba(255,58,170,0.45)] transition-transform duration-150 hover:scale-105 hover:bg-[#2a2a4a] active:scale-95"
      >
        PLAY
      </button>

      <p className="text-xs tracking-[0.25em] text-[#ffd83a]/80">先到 7 分胜 · 2-5 分钟一局</p>

      {/* 5 行操作说明 */}
      <ul className="flex flex-col items-center gap-1.5 font-mono text-sm text-white/60">
        {CONTROLS.map((c) => (
          <li key={c.key} className="flex items-center gap-3">
            <span className="w-24 rounded border border-[#ff3aaa]/40 bg-[#1a1a3a] px-2 py-0.5 text-center text-[11px] font-bold text-[#ff3aaa]">
              {c.key}
            </span>
            <span>{c.desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
