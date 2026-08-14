import type { PlayerState } from '../core/types'
import { INTRO_TURN_LIMIT } from '../core/types'
import { paperGoalProgressFor } from '../core/constants'
import { useCountUp } from './useCountUp'

interface HUDProps {
  player: PlayerState
  microAwakeningToast: boolean
  paperGoal?: number
  paperValue?: number
  loveStage?: 'none' | 'met' | 'knowing' | 'close'
  mentorFavor?: number
}

// v1.7 (user directive): all stats converge on the TWO things a player can actually
// control — 头脑(认知)and 身体(身心健康). Both get big presence; 财富 is an OUTCOME,
// demoted to a chip. The data layer keeps stamina/mood separate (dice stateMod contract
// intact) — only the DISPLAY fuses them into 身心健康.
// v2.5: a 人生目标 chip tracks the wealth goal established at the opening card, the love
// line's stage shows as a heart chip once the story has begun, and 贵人好感 shows when a
// benefactor noticed you (raises the office hit probability).
// v2.6 贫困逻辑: the 🎯 chip reads the PAPER-account 翻盘 progress (第一桶金 = 模拟盘),
// NOT the ¥1,000 生活费 — the 💰 chip stays the life ledger.
const LOVE_STAGE_LABEL = { met: '初识', knowing: '走近', close: '并肩' } as const

export function HUD({ player, microAwakeningToast, paperGoal, paperValue, loveStage, mentorFavor }: HUDProps) {
  const wealth = useCountUp(player.wealth)
  const cognition = useCountUp(player.cognition)
  const stamina = useCountUp(player.stamina)
  const mood = useCountUp(player.mood)
  const wellbeing = Math.round((stamina + mood) / 2)
  // v2.6: paper-goal progress is NET of the origin's paper capital (模拟盘 10万→20万 翻盘).
  const goalPct = paperGoal !== undefined && paperValue !== undefined
    ? paperGoalProgressFor(player.origin, paperValue)
    : null

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
        {goalPct !== null && (
          <div className="hud-goal" title={`财富目标 · 模拟盘翻盘 ¥${paperGoal?.toLocaleString()} —— 第一桶金从模拟盘挣,不从生活费涨`}>
            🎯 翻盘 <b>{goalPct}%</b>
          </div>
        )}
        {loveStage && loveStage !== 'none' && (
          <div className="hud-goal hud-goal-love" title="爱情支线 · 不影响觉醒结局">
            ❤️ {LOVE_STAGE_LABEL[loveStage]}
          </div>
        )}
        {mentorFavor !== undefined && mentorFavor > 0 && (
          <div className="hud-goal hud-goal-mentor" title={`贵人好感 +${mentorFavor} · 有人注意到了你 —— 办公室认可概率提升 ${Math.round(mentorFavor * 12)}%`}>
            👁 贵人好感 <b>+{mentorFavor}</b>
          </div>
        )}
        <div className="hud-turn">
          第 {Math.min(player.turn, INTRO_TURN_LIMIT)} 周/{INTRO_TURN_LIMIT} 周
        </div>
        <div className="hud-wealth" title="生活费 —— 你从家里带来的全部家当(小镇 ¥1,000)。大钱的故事,在模拟盘上">
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
