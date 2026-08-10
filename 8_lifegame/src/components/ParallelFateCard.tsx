import type { DiceRollResult, ParallelFateSnapshot, StatDelta } from '../core/types'
import { TIER_LABEL } from './tierLabels'

interface ParallelFateCardProps {
  dice: DiceRollResult
  altFate: ParallelFateSnapshot
  realEventDelta: StatDelta | null
  realInvestmentPnlAbs: number
  realMentorHit: boolean | null
}

function StatDeltaRow({ label, real, alt }: { label: string; real: number | undefined; alt: number | undefined }) {
  if (real === undefined && alt === undefined) return null
  const fmt = (n: number | undefined) => (n === undefined ? '—' : `${n >= 0 ? '+' : ''}${n.toLocaleString()}`)
  return (
    <div className="fate-stat-row">
      <span className="fate-stat-label">{label}</span>
      <span className="fate-stat-you">你 {fmt(real)}</span>
      <span className="fate-stat-alt">金融世家 {fmt(alt)}</span>
    </div>
  )
}

export function ParallelFateCard({ dice, altFate, realEventDelta, realInvestmentPnlAbs, realMentorHit }: ParallelFateCardProps) {
  const tierDiffers = dice.tier !== altFate.diceTier
  return (
    <div className="panel fate-panel">
      <div className="fate-heading">平行命运 · 金融世家同款骰子</div>
      <div className="fate-dice-row">
        <div className="fate-dice-side">
          <span className="fate-dice-who">你</span>
          <span className={`fate-dice-tier tier-text-${dice.tier}`}>
            {TIER_LABEL[dice.tier]} ({dice.total})
          </span>
        </div>
        <div className="fate-dice-vs">同一把骰子</div>
        <div className="fate-dice-side">
          <span className="fate-dice-who">金融世家</span>
          <span className={`fate-dice-tier tier-text-${altFate.diceTier}`}>
            {TIER_LABEL[altFate.diceTier]} ({altFate.diceTotal})
          </span>
        </div>
      </div>
      {tierDiffers && <div className="fate-callout">同样的骰子,不同的出身,不同的结果 —— 这不是运气,是投胎。</div>}
      {altFate.mentorHit !== null && (
        <div className="fate-mentor-row">
          🎓 贵人:你 {realMentorHit ? '接住了' : '错过了'} · 金融世家 {altFate.mentorHit ? '接住了' : '错过了'}
        </div>
      )}
      <StatDeltaRow label="财富" real={realEventDelta?.wealth} alt={altFate.eventDelta.wealth} />
      <StatDeltaRow label="认知" real={realEventDelta?.cognition} alt={altFate.eventDelta.cognition} />
      <StatDeltaRow label="投资" real={realInvestmentPnlAbs} alt={altFate.investmentPnlAbs} />
    </div>
  )
}
