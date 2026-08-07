import { useMemo } from 'react';
import { useUiStore } from '../store';
import { rhythmProgress, targetPosition } from '../core/simulation/mouseRhythm';

const JUDGEMENT_LABEL = {
  perfect: '完美',
  good: '良好',
  normal: '普通',
  miss: '落空',
} as const;

export default function MouseRhythmOverlay() {
  const rhythm = useUiStore((s) => s.rhythm);
  const targets = rhythm.chart?.targets ?? [];
  const current = targets[rhythm.targetIndex];
  const visibleTargets = useMemo(() => targets.slice(rhythm.targetIndex, rhythm.targetIndex + 3), [targets, rhythm.targetIndex]);
  if (!rhythm.active || !rhythm.chart || !current) return null;

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
        return (
          <div
            className={`rhythm-target rhythm-target-${target.shape} ${active ? 'rhythm-target-active' : 'rhythm-target-next'}`}
            key={target.id}
            style={{ left: `${point.x * 100}%`, top: `${point.y * 100}%` }}
          >
            <div className="rhythm-target-ring" style={active ? { transform: `scale(${0.55 + progress * 0.45})` } : undefined} />
            <div className="rhythm-target-core">{target.rank}</div>
            {active && <span className="rhythm-target-hint">点击</span>}
          </div>
        );
      })}
      {rhythm.lastJudgement && (
        <div className={`rhythm-result rhythm-result-${rhythm.lastJudgement}`}>
          {JUDGEMENT_LABEL[rhythm.lastJudgement]}
        </div>
      )}
      <div className="mouse-rhythm-help">移入目标 · 缩圈时按左键</div>
    </div>
  );
}
