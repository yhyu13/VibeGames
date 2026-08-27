// components/RadioLog.tsx — 7-beat script + TX log.
import { RADIO_BEATS } from '../core/data/courtyard'
import type { GameState } from '../core/types'

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
            {b.id}  {b.prompt}{r === 'pass' ? ` · ${b.txTag}` : r === 'fail' ? ' · FAIL' : ''}
          </div>
        )
      })}
      <div className="radio-prompt">
        {beat ? `KT: ${beat.prompt}` : sim.radio.lastTx ? `TX ${sim.radio.lastTx}` : 'STANDBY'}
      </div>
    </div>
  )
}
