import type { PlayerState } from '../core/types'
import { INTRO_TURN_LIMIT } from '../core/types'
import { useCountUp } from './useCountUp'

interface HUDProps {
  player: PlayerState
  microAwakeningToast: boolean
}

// v1.7 (user directive): all stats converge on the TWO things a player can actually
// control — 头脑(认知)and 身体(身心健康). Both get big presence; 财富 is an OUTCOME,
// demoted to a chip. The data layer keeps stamina/mood separate (dice stateMod contract
// intact) — only the DISPLAY fuses them into 身心健康.
export function HUD({ player, microAwakeningToast }: HUDProps) {
  const wealth = useCountUp(player.wealth)
  const cognition = useCountUp(player.cognition)
  const stamina = useCountUp(player.stamina)
  const mood = useCountUp(player.mood)
  const wellbeing = Math.round((stamina + mood) / 2)

  return (
    <div className="hud">
      <div className="hud-gauges">
        <div className="hud-gauge hud-gauge-cognition" title="头脑 —— 你能控制的东西之一 · 图书馆/教学楼/交流中心">
          <span className="hud-gauge-icon">🧠</span>
          <div className="hud-gauge-body">
            <span className="hud-gauge-label">
              认知 <b>{Math.round(cognition)}</b>
            </span>
            <div className="hud-gauge-bar">
              <div className="hud-gauge-fill" style={{ width: `${Math.max(0, Math.min(100, cognition))}%` }} />
            </div>
          </div>
        </div>
        <div className="hud-gauge hud-gauge-wellbeing" title="身体 —— 你能控制的东西之二 · 身心健康 = 情绪 + 体力 · 健身房/宿舍/食堂">
          <span className="hud-gauge-icon">💪</span>
          <div className="hud-gauge-body">
            <span className="hud-gauge-label">
              身心健康 <b>{wellbeing}</b>
              <i>
                情绪 {Math.round(mood)} · 体力 {Math.round(stamina)}
              </i>
            </span>
            <div className="hud-gauge-bar">
              <div className="hud-gauge-fill" style={{ width: `${Math.max(0, Math.min(100, wellbeing))}%` }} />
            </div>
          </div>
        </div>
      </div>
      <div className="hud-side">
        <div className="hud-turn">
          回合 {Math.min(player.turn, INTRO_TURN_LIMIT)}/{INTRO_TURN_LIMIT}
        </div>
        <div className="hud-wealth" title="财富是结果,不是你能直接控制的东西">
          💰 ¥{Math.round(wealth).toLocaleString()}
        </div>
      </div>
      {microAwakeningToast && (
        <div key={player.turn} className="micro-awakening-toast">
          🌱 微觉醒:原来 BTC 减半周期是 4 年
        </div>
      )}
    </div>
  )
}
