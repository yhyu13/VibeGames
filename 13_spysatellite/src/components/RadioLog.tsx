// components/RadioLog.tsx — 7-beat script + TX log.
import { RADIO_BEATS } from '../core/data/courtyard'
import type { GameState } from '../core/types'

// The sim records WHY a beat died (FALSE/LATE/NOJOY/BLIND/NO LOCK) in radio.log,
// but the log read them collapsed to "FAIL". Surface the reason so a miss reads
// distinct from a success — the point of a spy-comm failure is the wrong intel.
function failReason(sim: GameState, beatId: number): string {
  for (let i = sim.radio.log.length - 1; i >= 0; i--) {
    const l = sim.radio.log[i]
    if (!l.ok && l.beat === beatId) return l.tag
  }
  return 'FAIL'
}

export function RadioLog({ sim }: { sim: GameState }) {
  const live = sim.radio.liveBeat
  const beat = live ? RADIO_BEATS[live - 1] : null
  return (
    <div className="radio">
      <h2>RADIO · SCRIPT 7</h2>
      {RADIO_BEATS.map((b) => {
        const r = sim.radio.results[b.id - 1]
        const cls = r === 'pass' ? 'pass' : r === 'fail' ? 'fail' : live === b.id ? 'live' : ''
        return (
          <div key={b.id} className={`radio-line ${cls}`}>
            {b.id}  {b.prompt}{r === 'pass' ? ` · ${b.txTag}` : r === 'fail' ? ` · ${failReason(sim, b.id)}` : ''}
          </div>
        )
      })}
      <div className="radio-prompt">
        {beat ? `KT: ${beat.prompt}` : sim.radio.lastTx ? `TX ${sim.radio.lastTx}` : 'STANDBY'}
      </div>
    </div>
  )
}
