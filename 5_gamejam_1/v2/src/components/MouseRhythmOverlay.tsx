import { useMemo } from 'react';
import { useUiStore } from '../store';
import { rhythmProgress, targetPosition } from '../core/simulation/mouseRhythm';
import type { RhythmJudgement } from '../core/simulation/mouseRhythm';

// V2 osu 式：判定圈固定，approach 圈从 3.2× 缩到 1.0×（=判定圈）即节拍点。
// 反馈 300/100/50 分档 + 早晚方向箭头（↓早 ↑晚）+ 长按进度 + 替身追踪目标。

const APPROACH_OVERSCALE = 3.2;

const JUDGEMENT_META: Record<RhythmJudgement, { score: string; label: string; color: string }> = {
  perfect: { score: '300', label: '完美', color: '#ffd27d' },
  good: { score: '100', label: '良好', color: '#8fd3f4' },
  normal: { score: '50', label: '普通', color: '#8fe0b8' },
  miss: { score: '×', label: '落空', color: '#d66a67' },
};

const COMBO_MILESTONES = [4, 8, 12];

export default function MouseRhythmOverlay() {
  const rhythm = useUiStore((s) => s.rhythm);
  const shadowScreen = useUiStore((s) => s.shadowScreen);
  const targets = rhythm.chart?.targets ?? [];
  const current = targets[rhythm.targetIndex];
  const visibleTargets = useMemo(() => targets.slice(rhythm.targetIndex, rhythm.targetIndex + 3), [targets, rhythm.targetIndex]);
  if (!rhythm.active || !rhythm.chart || !current) return null;

  const last = rhythm.lastJudgement;
  const meta = last ? JUDGEMENT_META[last] : null;
  const milestone = last && last !== 'miss' && COMBO_MILESTONES.includes(rhythm.combo);

  return (
    <div className="mouse-rhythm-layer no-select fixed inset-0 z-20" aria-label="鼠标谱操作区">
      <div className="mouse-rhythm-caption">
        <span>攻击节拍</span>
        <span>{rhythm.targetIndex + 1}/{targets.length}</span>
        {rhythm.combo > 0 && <span className="mouse-rhythm-combo">连击 ×{rhythm.combo}</span>}
        {rhythm.holdProgress !== null && <span className="text-[#8fd3f4]">长按中</span>}
      </div>

      {visibleTargets.map((target, offset) => {
        const point = targetPosition(target, target.kind === 'shadow' ? shadowScreen : null);
        const progress = rhythmProgress(target, rhythm.elapsed);
        const active = offset === 0;
        const approachScale = 1 + (APPROACH_OVERSCALE - 1) * progress;
        const kindClass = target.kind === 'hold' ? 'rhythm-target-hold' : target.kind === 'shadow' ? 'rhythm-target-shadow' : '';
        return (
          <div
            className={`rhythm-target ${kindClass} ${active ? 'rhythm-target-active' : 'rhythm-target-next'}`}
            key={target.id}
            style={{ left: `${point.x * 100}%`, top: `${point.y * 100}%` }}
          >
            {active && <div className="rhythm-judgment-ring" />}
            {active && (
              <div
                className="rhythm-approach-ring"
                style={{ transform: `translate(-50%, -50%) scale(${approachScale.toFixed(3)})` }}
              />
            )}
            <div className="rhythm-target-core">{target.rank}</div>
            {active && target.kind === 'hold' && rhythm.holdProgress !== null && (
              <div className="rhythm-hold-bar">
                <div style={{ width: `${rhythm.holdProgress * 100}%` }} />
              </div>
            )}
            {active && <span className="rhythm-target-hint">
              {target.kind === 'shadow' ? '追踪替身 · 缩圈时点击' : target.kind === 'hold' ? '点击并按住' : '缩圈重合时点击'}
            </span>}
          </div>
        );
      })}

      {meta && (
        <div className="rhythm-result" key={`${rhythm.targetIndex}-${rhythm.combo}`}>
          <span className="rhythm-result-score" style={{ color: meta.color }}>{meta.score}</span>
          <span className="rhythm-result-dir">{last === 'miss' ? 'MISS' : rhythm.lastJudgementEarly ? '↓ 早' : '↑ 晚'}</span>
          <span className="rhythm-result-label" style={{ color: meta.color }}>{meta.label}</span>
        </div>
      )}
      {milestone && <div className="rhythm-milestone">名场面！</div>}
      <div className="mouse-rhythm-help">移入目标 · 缩圈与判定圈重合时按左键</div>
    </div>
  );
}
