// components/EndCard.tsx
import { RADIO_BEATS } from '../core/data/courtyard'
import type { EndReason, GameState } from '../core/types'

const COPY: Record<EndReason, { title: string; line: string }> = {
  win: { title: 'SHOT', line: 'VIP down. Lock held. GO on the wire.' },
  abort: { title: 'ABORT', line: 'Two failed beats. Kill team walks.' },
  miss: { title: 'MISS', line: 'GO never sent. The shot never happens.' },
  lockdrop: { title: 'MISS', line: 'Lock dropped at the shot. Round hits dirt.' },
  timeout: { title: 'TIMEOUT', line: '90s. Window closed.' },
}

export function EndCard({ sim }: { sim: GameState }) {
  if (!sim.end) return null
  const score = sim.radio.results.filter((r) => r === 'pass').length
  // Branch the abort card on which beat killed the run (per-beat consequence.
  // Falls back to the generic card only if no fatal beat was recorded.)
  const fatal = sim.radio.failBeat ? RADIO_BEATS[sim.radio.failBeat - 1] : null
  const c = sim.end === 'abort' && fatal
    ? { title: fatal.failTitle, line: fatal.failLine }
    : COPY[sim.end]
  return (
    <div className={`endcard${sim.end === 'win' ? '' : ' lose'}`}>
      <h1>{c.title}</h1>
      <p>{c.line}</p>
      <div className="score">{score}/7 BEATS</div>
      <div className="hint">R · RESTART</div>
    </div>
  )
}
