import { useMemo } from 'react';
import { useUiStore } from '../store';
import { rhythmProgress, targetPosition } from '../core/simulation/mouseRhythm';
import type { RhythmJudgement } from '../core/simulation/mouseRhythm';

// v3：osu 式缩圈。判定圈（hit circle）固定；approach 圈从大缩到恰好盖住判定圈即为节拍点。
// 反馈使用 300 / 100 / 50 分档 + 早晚方向箭头（↑晚 ↓早），连击按里程碑爆发。

const APPROACH_OVERSCALE = 3.2; // approach 圈初始放大倍数，缩到 1.0 时 = 判定圈

const JUDGEMENT_META: Record<RhythmJudgement, { score: string; label: string; color: string }> = {
  perfect: { score: '300', label: '完美', color: '#ffd27d' },
  good: { score: '100', label: '良好', color: '#8fd3f4' },
  normal: { score: '50', label: '普通', color: '#8fe0b8' },
  miss: { score: '×', label: '落空', color: '#d66a67' },
};

const COMBO_MILESTONES = [4, 8, 12];

export default function MouseRhythmOverlay() {
  const rhythm = useUiStore((s) => s.rhythm);
  const targets = rhythm.chart?.targets ?? [];
  const current = targets[rhythm.targetIndex];
  const visibleTargets = useMemo(() => targets.slice(rhythm.targetIndex, rhythm.targetIndex + 3), [targets, rhythm.targetIndex]);
  if (!rhythm.active || !rhythm.chart || !current) return null;

  const last = rhythm.lastJudgement;
  const meta = last ? JUDGEMENT_META[last] : null;
  const milestone = last && last !== 'miss' && rhythm.combo >= 2 && COMBO_MILESTONES.includes(rhythm.combo);

  return (
    <div className="mouse-rhythm-layer no-select" aria-label="鼠标谱操作区">
      <div className="mouse-rhythm-caption">
        <span>攻击节拍</span>
        <span className="mouse-rhythm-count">{rhythm.targetIndex + 1}/{targets.length}</span>
        {rhythm.combo > 0 && <span className="mouse-rhythm-combo">连击 ×{rhythm.combo}</span>}
      </div>
      {visibleTargets.map((target, offset) => {
        const point = targetPosition(target, rhythm.elapsed);
        const progress = rhythmProgress(target, rhythm.elapsed);
        const active = offset === 0;
        const approachScale = 1 + (APPROACH_OVERSCALE - 1) * progress;
        return (
          <div
            className={`rhythm-target rhythm-target-${target.shape} ${active ? 'rhythm-target-active' : 'rhythm-target-next'}`}
            key={target.id}
            style={{ left: `${point.x * 100}%`, top: `${point.y * 100}%` }}
          >
            {active && <div className="rhythm-judgment-ring" />}
            {active && <div className="rhythm-approach-ring" style={{ transform: `translate(-50%, -50%) scale(${approachScale.toFixed(3)})` }} />}
            <div className="rhythm-target-core">{target.rank}</div>
            {active && <span className="rhythm-target-hint">缩圈重合时点击</span>}
          </div>
        );
      })}
      {meta && (
        <div className={`rhythm-result rhythm-result-${last}`} key={`${rhythm.targetIndex}-${rhythm.combo}`}>
          <span className="rhythm-result-score" style={{ color: meta.color }}>{meta.score}</span>
          <span className="rhythm-result-dir">
            {last === 'miss' ? 'MISS' : rhythm.lastJudgementEarly ? '↓ 早' : '↑ 晚'}
          </span>
          <span className="rhythm-result-label" style={{ color: meta.color }}>{meta.label}</span>
        </div>
      )}
      {milestone && <div className="rhythm-milestone">名场面！</div>}
      <div className="mouse-rhythm-help">移入目标 · 缩圈与判定圈重合时按左键</div>
    </div>
  );
}
