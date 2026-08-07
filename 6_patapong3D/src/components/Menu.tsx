/**
 * components/Menu.tsx — 主菜单(MENU phase,M3 完善 by agent-ui)
 *
 * 街机霓虹风:大标题 'PATAPONG 3D' 霓虹渐变(bg-clip-text 三色渐变)+ 副标题;
 * PLAY 大按钮;5 行操作说明;M3 新增:
 * - 战绩行(totalMatches 场 / P1 胜 p1Wins / 最长 rally longestRally 拍,store.stats 为空显示 '—')
 * - '静音:开/关' 按钮(读 store.settings?.muted,click → sendUiCommand('toggleMute'))
 * - '重置数据' 按钮(window.confirm 二次确认 → sendUiCommand('resetData'))
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
  const stats = usePatapongStore((s) => s.stats);
  const settings = usePatapongStore((s) => s.settings);
  const sendUiCommand = usePatapongStore((s) => s.sendUiCommand);

  if (phase !== 'MENU') return null;

  const muted = settings?.muted ?? false;

  const handleReset = () => {
    if (window.confirm('确定清空战绩与设置?此操作不可恢复。')) {
      sendUiCommand('resetData');
    }
  };

  return (
    <div className="pointer-events-auto absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/50">
      {/* 标题:霓虹渐变 + 副标题 */}
      <h1 className="pata-menu-in bg-gradient-to-r from-[#3affc8] via-[#ffd83a] to-[#ff3aaa] bg-clip-text font-arcade text-8xl font-black italic tracking-tight text-transparent drop-shadow-[0_0_30px_rgba(255,216,58,0.35)]">
        PATAPONG 3D
      </h1>
      <p className="-mt-3 text-sm tracking-[0.5em] text-white/60">体素乒乓球 · 先到 7 分胜</p>

      {/* PLAY 大按钮 */}
      <button
        type="button"
        onClick={() => sendUiCommand('startMatch')}
        className="btn-pata pointer-events-auto rounded-lg border-2 border-[#ff3aaa] bg-[#1a1a3a] px-16 py-4 text-3xl font-bold tracking-[0.3em] text-white shadow-[0_0_25px_rgba(255,58,170,0.45)] hover:bg-[#2a2a4a]"
      >
        PLAY
      </button>

      <p className="text-xs tracking-[0.25em] text-[#ffd83a]/80">2-5 分钟一局</p>

      {/* 战绩行(无数据 → '—') */}
      <div className="flex items-center gap-5 font-mono text-sm text-white/70">
        <span>
          战绩 <span className="text-white">{stats?.totalMatches ?? '—'}</span> 场
        </span>
        <span className="text-white/25">·</span>
        <span>
          P1 胜 <span className="text-[#3affc8]">{stats?.p1Wins ?? '—'}</span>
        </span>
        <span className="text-white/25">·</span>
        <span>
          最长 rally <span className="text-[#ffd83a]">{stats?.longestRally ?? '—'}</span> 拍
        </span>
      </div>

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

      {/* 设置工具行:静音 / 重置数据 */}
      <div className="flex items-center gap-4 font-mono text-xs">
        <button
          type="button"
          onClick={() => sendUiCommand('toggleMute')}
          className="btn-pata rounded border border-[#ffd83a]/40 bg-[#1a1a3a] px-4 py-1.5 text-[#ffd83a]"
        >
          静音:{muted ? '开' : '关'}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="btn-pata rounded border border-white/20 bg-[#1a1a3a] px-4 py-1.5 text-white/60"
        >
          重置数据
        </button>
      </div>
    </div>
  );
}
