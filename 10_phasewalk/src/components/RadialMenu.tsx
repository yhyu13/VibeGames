// components/RadialMenu.tsx — Tab 圆圈 UI: four-quadrant phase selector (v4).
// Quadrant map: ↑=气(gas) · ↓=固(solid) · ←=液(liquid) · →=焰(plasma)
import { PHASE_ICON, PHASE_LABEL } from '../core/constants'
import { emitRadialHover, useGame } from '../store'
import type { PhaseId } from '../core/types'

const QUAD: Array<{ phase: PhaseId; left: string; top: string }> = [
  { phase: 'gas', left: '50%', top: '22%' },
  { phase: 'solid', left: '50%', top: '78%' },
  { phase: 'liquid', left: '20%', top: '50%' },
  { phase: 'plasma', left: '80%', top: '50%' },
]

export function RadialMenu() {
  const radial = useGame((s) => s.radial)
  if (!radial.active) return null
  return (
    <div className="radial" onMouseLeave={() => emitRadialHover(null)}>
      <div className="radial-ring" />
      {QUAD.map((q) => (
        <div
          key={q.phase}
          className={'radial-q' + (radial.highlighted === q.phase ? ' sel' : '')}
          style={{ left: q.left, top: q.top }}
          data-phase={q.phase}
          onMouseEnter={(e) => {
            // A button-held pointer over a quadrant is an orbit-camera DRAG, not a hover selection —
            // only a button-up pointer moving across counts (round 23). This stops a drag that sweeps
            // across or rests on a quadrant from latching `hovered` and committing an unintended switch
            // on Tab-release (round 22's fix handled the sweep, this closes the rest-at-release case).
            if (e.buttons === 0) emitRadialHover(q.phase)
          }}
        >
          <span className="radial-icon">{PHASE_ICON[q.phase]}</span>
          <span className="radial-label">{PHASE_LABEL[q.phase]}</span>
        </div>
      ))}
    </div>
  )
}
