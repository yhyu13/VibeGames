import type { PlayerState } from '../core/types'
import { INTRO_TURN_LIMIT } from '../core/types'
import { useCountUp } from './useCountUp'

interface HUDProps {
  player: PlayerState
  microAwakeningToast: boolean
}

export function HUD({ player, microAwakeningToast }: HUDProps) {
  const wealth = useCountUp(player.wealth)
  const cognition = useCountUp(player.cognition)
  const stamina = useCountUp(player.stamina)
  const mood = useCountUp(player.mood)

  return (
    <div className="hud">
      <div className="hud-turn">
        回合 {Math.min(player.turn, INTRO_TURN_LIMIT)}/{INTRO_TURN_LIMIT}
      </div>
      <div className="hud-stat hud-stat-wealth">
        <span className="hud-stat-icon">💰</span>
        <span className="hud-stat-value">¥{Math.round(wealth).toLocaleString()}</span>
      </div>
      <div className="hud-stat hud-stat-cognition">
        <span className="hud-stat-icon">🧠</span>
        <span className="hud-stat-value">{Math.round(cognition)}</span>
      </div>
      <div className="hud-stat hud-stat-stamina">
        <span className="hud-stat-icon">🔋</span>
        <span className="hud-stat-value">{Math.round(stamina)}</span>
      </div>
      <div className="hud-stat hud-stat-mood">
        <span className="hud-stat-icon">🙂</span>
        <span className="hud-stat-value">{Math.round(mood)}</span>
      </div>
      {microAwakeningToast && (
        <div key={player.turn} className="micro-awakening-toast">
          🌱 微觉醒:原来 BTC 减半周期是 4 年
        </div>
      )}
    </div>
  )
}
