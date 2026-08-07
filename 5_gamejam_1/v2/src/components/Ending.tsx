import { useUiStore } from '../store';
import { sendUiCommand } from './GameCanvas';
import type { EndingVariant, PersistedStats } from '../core/types';

const ENDING_META: Record<EndingVariant, { title: string; sub: string; tone: string }> = {
  curtainA: { title: '谢幕 · 掌声', sub: '你被记住了。直播间灯牌亮到天明。', tone: 'text-amber-200' },
  curtainB: { title: '空房间', sub: '观众走了。屏幕暗下去，只有你自己的呼吸声。', tone: 'text-indigo-300' },
  early: { title: '提前谢幕', sub: '三次被击倒。演出没有撑到第四幕。', tone: 'text-red-300' },
  hidden: { title: '疯狂的一夜', sub: '你毁掉了舞台，弹幕却疯了一样刷屏——所有人都记住了你。', tone: 'text-red-400' },
};

export default function Ending() {
  const phase = useUiStore((s) => s.runState.phase);
  const ending = useUiStore((s) => s.ending);
  const stats = ending.stats as PersistedStats | null;
  const variant = ending.variant;

  if (phase === 'ENDING_HIDDEN') {
    return (
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#1a0508]/80">
        <div className="fade-in-up flex flex-col items-center gap-4 text-center">
          <div className="text-xs tracking-[0.5em] text-red-300/70">HIDDEN ENDING</div>
          <h1 className="font-serif-cn title-glow text-4xl font-black tracking-[0.2em] text-red-200">{ENDING_META.hidden.title}</h1>
          <p className="max-w-md text-sm leading-relaxed text-red-100/80">{ENDING_META.hidden.sub}</p>
          <StatsBlock stats={stats} />
          <div className="mt-4 flex gap-3">
            <button className="v2-btn-danger" onClick={() => sendUiCommand({ kind: 'restartRun' })}>再疯一次</button>
            <button className="v2-btn" onClick={() => sendUiCommand({ kind: 'quitToTitle' })}>返回标题</button>
          </div>
        </div>
      </div>
    );
  }

  const meta = variant ? ENDING_META[variant] : ENDING_META.curtainB;

  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0b1024]/80">
      <div className="fade-in-up flex flex-col items-center gap-4 text-center">
        <h1 className={`font-serif-cn title-glow text-5xl font-black tracking-[0.25em] ${meta.tone}`}>{meta.title}</h1>
        <p className="max-w-md text-sm leading-relaxed text-indigo-200/80">{meta.sub}</p>
        <StatsBlock stats={stats} />
        <div className="mt-4 flex gap-3">
          <button className="v2-btn-gold" onClick={() => sendUiCommand({ kind: 'restartRun' })}>再演一场</button>
          <button className="v2-btn" onClick={() => sendUiCommand({ kind: 'quitToTitle' })}>返回标题</button>
        </div>
        {phase === 'ENDING_NORMAL' && (
          <div className="text-[10px] tracking-widest text-indigo-400/40">有些结局，藏在别的地方…</div>
        )}
      </div>
    </div>
  );
}

function StatsBlock({ stats }: { stats: PersistedStats | null }) {
  if (!stats) return null;
  return (
    <div className="v2-panel rounded-lg px-6 py-3 text-xs text-indigo-200/80">
      累计直播 <span className="text-amber-200">{stats.totalRounds}</span> 场 · 生涯最佳连击
      <span className="text-amber-200"> ×{stats.bestCombo}</span> · 完美
      <span className="text-amber-200"> {stats.perfectTotal}</span> 次 · 观众峰值
      <span className="text-amber-200"> {stats.viewerPeak}</span>
    </div>
  );
}
