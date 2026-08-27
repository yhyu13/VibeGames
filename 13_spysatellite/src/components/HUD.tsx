// components/HUD.tsx — heat bar, lock pip, alt/zoom, beat clock.
import { COURTYARD_ZOOM, MISSION_TIME, SHOT_TIME } from '../core/constants'
import { RADIO_BEATS } from '../core/data/courtyard'
import type { GameState } from '../core/types'

export function HUD({ sim }: { sim: GameState }) {
  const heatPct = Math.round(sim.sensor.heat * 100)
  const hot = heatPct >= 80 || sim.sensor.overheatTimer > 0
  const remain = Math.max(0, MISSION_TIME - sim.elapsed)
  const beat = sim.radio.liveBeat ? RADIO_BEATS[sim.radio.liveBeat - 1] : null
  const beatLeft = beat ? Math.max(0, beat.t + beat.window - sim.elapsed) : 0
  const onTile = sim.zoom01 >= COURTYARD_ZOOM
  const alt = Math.round(412_000 * (1 - sim.zoom01) + 180)

  return (
    <div className="hud">
      <div className="hud-tl">
        <div className="hud-label">EYE-13 · NADIR</div>
        <div className="hud-row">ALT {alt} m</div>
        <div className="hud-row">ZOOM {(1 + sim.zoom01 * 839).toFixed(0)}×</div>
        <div className={`hud-row ${onTile ? 'hud-ok' : ''}`}>{onTile ? 'COURTYARD LOCK BAND' : 'ORBIT'}</div>
      </div>
      <div className="hud-tr">
        <div className="hud-label">T+{sim.elapsed.toFixed(1)} · {remain.toFixed(0)}s</div>
        <div className="hud-row">SHOT {Math.max(0, SHOT_TIME - sim.elapsed).toFixed(1)}s</div>
        <div className={`hud-row ${sim.lock.held ? 'hud-ok' : 'hud-warn'}`}>
          LOCK {sim.lock.held ? `HOLD ${sim.lock.heldFor.toFixed(1)}s` : 'OPEN'}
        </div>
      </div>
      <div className="hud-bl">
        <div className="hud-label">SAR HEAT {heatPct}%</div>
        <div className="heat-track">
          <div className={`heat-fill${hot ? ' hot' : ''}`} style={{ width: `${heatPct}%` }} />
        </div>
        <div className="hud-row" style={{ marginTop: 6 }}>
          {sim.sensor.overheatTimer > 0
            ? `OVERHEAT DROP ${sim.sensor.overheatTimer.toFixed(1)}s`
            : sim.sensor.sarOn
              ? 'SAR ON · HOLD SPACE / MMB'
              : 'OPTICAL · HOLD SPACE / MMB'}
        </div>
        {beat && (
          <div className="hud-warn" style={{ marginTop: 8 }}>
            KT #{beat.id} · {beatLeft.toFixed(1)}s
          </div>
        )}
      </div>
      <div className="hud-br">WHEEL ZOOM · LMB LOCK/TX · SPACE SAR · ESC PAUSE · R RESTART</div>
      <div className={`lock-pip${sim.lock.held ? '' : ' off'}`} />
    </div>
  )
}
