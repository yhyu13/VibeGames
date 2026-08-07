import { useState } from 'react';
import { useUiStore } from '../store';
import { sendUiCommand } from './GameCanvas';
import { RATING_AXES } from '../core/data/ratingAxes';
import type { RatingAxisId } from '../core/types';

export default function RatingSheet() {
  const rating = useUiStore((s) => s.rating);
  const facts = rating.facts;
  const [stars, setStars] = useState<Record<RatingAxisId, number>>({
    mobility: 0,
    delivery: 0,
    visual: 0,
    remembered: 0,
  });

  const canSubmit = stars.mobility > 0 && stars.delivery > 0 && stars.visual > 0;
  const submit = (): void => {
    if (!canSubmit) return;
    sendUiCommand({ kind: 'ratingSubmit', stars: { ...stars, remembered: stars.remembered || autoRemembered() } });
  };

  const autoRemembered = (): number => {
    if (!facts) return 3;
    if (facts.maxCombo >= 4) return 4;
    return 3;
  };

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#0b1024]/50">
      <div className="fade-in-up v2-panel w-full max-w-lg rounded-xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif-cn text-xl font-bold text-amber-100">演出自评</h2>
          <span className="text-[10px] tracking-widest text-indigo-300/60">观众正在等你的评价</span>
        </div>

        {facts && (
          <div className="mb-4 grid grid-cols-2 gap-x-4 gap-y-1 rounded-lg border border-indigo-400/10 bg-indigo-500/5 px-4 py-2 text-[11px] text-indigo-200/80">
            <div>站位命中 <span className="text-amber-200">{Math.round(facts.stanceAccuracy)}%</span></div>
            <div>台词完整 <span className="text-amber-200">{Math.round(facts.lineCompleteness)}%</span></div>
            <div>最大连击 <span className="text-amber-200">×{facts.maxCombo}</span></div>
            <div>完美命中 <span className="text-amber-200">{facts.perfectCount}</span></div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {RATING_AXES.map((axis) => (
            <div key={axis.id} className="rounded-lg border border-indigo-400/10 bg-indigo-500/5 px-4 py-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-indigo-100">{axis.label}</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className={`rating-star ${stars[axis.id] >= n ? '' : 'opacity-25 grayscale'}`}
                      onClick={() => setStars((s) => ({ ...s, [axis.id]: n }))}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-1 min-h-[1rem] text-[11px] text-indigo-300/70">
                {stars[axis.id] > 0 ? axis.thresholds[stars[axis.id] as 1 | 2 | 3 | 4 | 5] : '点击星星自评'}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <button className="v2-btn" onClick={submit} disabled={!canSubmit}>
            提交自评
          </button>
          <span className="text-[10px] text-indigo-300/50">倒计时自动提交</span>
        </div>
      </div>
    </div>
  );
}
