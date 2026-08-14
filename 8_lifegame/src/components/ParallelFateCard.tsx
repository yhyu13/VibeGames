import type {
  DiceRollResult,
  InvestmentResult,
  Origin,
  ParallelFateSnapshot,
  StatDelta,
} from '../core/types'
import { TIER_LABEL } from './tierLabels'

interface ParallelFateCardProps {
  dice: DiceRollResult
  altFate: ParallelFateSnapshot
  realEventDelta: StatDelta | null
  realInvestment: InvestmentResult | null // null on the turn-1 开户 beat (no trade yet)
  realMentorHit: boolean | null
  altOrigin: Origin
}

const fmt = (n: number | undefined) => (n === undefined ? '—' : `${n >= 0 ? '+' : ''}${n.toLocaleString()}`)

// One stat as a head-to-head "duel" — each origin gets its own track, fills proportional to
// |delta| share, and the side that moved more this turn gets the gold winner ring.
function DuelBar({
  label,
  real,
  alt,
  youIcon,
  altIcon,
  index,
}: {
  label: string
  real: number | undefined
  alt: number | undefined
  youIcon: string
  altIcon: string
  index: number
}) {
  if (real === undefined && alt === undefined) return null
  const pct = (v: number | undefined) => {
    if (v === undefined || v === 0) return 0
    const total = Math.abs(real ?? 0) + Math.abs(alt ?? 0)
    if (total === 0) return 50
    return Math.max(4, Math.round((Math.abs(v) / total) * 100))
  }
  const youWins = (real ?? 0) > (alt ?? 0)
  const altWins = (alt ?? 0) > (real ?? 0)
  return (
    <div className="fate-duel">
      <div className="fate-duel-label">{label}</div>
      <div className={`fate-duel-row${youWins ? ' fate-duel-winner' : ''}`}>
        <span className="fate-duel-badge">{youIcon}</span>
        <span className="fate-duel-track">
          <span
            className={`fate-duel-fill ${(real ?? 0) >= 0 ? 'fate-duel-gain' : 'fate-duel-loss'}`}
            style={{ width: `${pct(real)}%`, animationDelay: `${index * 90}ms` }}
          />
        </span>
        <span className="fate-duel-num">{fmt(real)}</span>
      </div>
      <div className={`fate-duel-row${altWins ? ' fate-duel-winner' : ''}`}>
        <span className="fate-duel-badge">{altIcon}</span>
        <span className="fate-duel-track">
          <span
            className={`fate-duel-fill ${(alt ?? 0) >= 0 ? 'fate-duel-gain' : 'fate-duel-loss'}`}
            style={{ width: `${pct(alt)}%`, animationDelay: `${(index + 1) * 90}ms` }}
          />
        </span>
        <span className="fate-duel-num">{fmt(alt)}</span>
      </div>
    </div>
  )
}

export function ParallelFateCard({ dice, altFate, realEventDelta, realInvestment, realMentorHit, altOrigin }: ParallelFateCardProps) {
  const tierDiffers = dice.tier !== altFate.diceTier
  const isDynasty = altOrigin === 'finance_dynasty'
  const altLabel = isDynasty ? '金融世家' : '小镇做题家'
  const altIcon = isDynasty ? '🎩' : '🧑🎓'
  const playerLabel = isDynasty ? '小镇做题家' : '金融世家'
  const playerIcon = isDynasty ? '🧑🎓' : '🎩'
  // Medallion STYLE follows the origin, not the you/alt seat — the dark-gold face is always 金融世家.
  const playerMedal = isDynasty ? 'fate-medallion-town' : 'fate-medallion-dynasty'
  const altMedal = isDynasty ? 'fate-medallion-dynasty' : 'fate-medallion-town'
  // The thesis callout ALWAYS lands: when tiers differ it's 投胎, when they match it's 本金.
  const callout = tierDiffers
    ? '同样的骰子,不同的出身,不同的结果 —— 这不是运气,是投胎。'
    : '同样的骰子,同样的手气 —— 本金不同,结果已经不同。'
  const investmentLabel = realInvestment === null
    ? '开户'
    : realInvestment.side === 'hold'
      ? '不操作 · 继续持有'
      : `${realInvestment.side === 'buy' ? '买入' : '卖出'} ${realInvestment.units.toLocaleString()} 份 @ ¥${realInvestment.price.toLocaleString()}`
  const investmentMod = realInvestment !== null && realInvestment.side === 'hold'
    ? ' fate-investment-cash'
    : realInvestment !== null && realInvestment.side === 'sell'
      ? ' fate-investment-liquidated'
      : ''
  return (
    <div className="panel fate-panel">
      <div className="fate-heading">
        <span className="fate-seal" aria-hidden>⚖️</span>
        <div className="fate-heading-text">
          <b>平行命运</b>
          <span>同一把骰子 · 两种出身</span>
        </div>
      </div>

      <div className="fate-vs">
        <div className="fate-combatant">
          <span className={`fate-medallion ${playerMedal}`} aria-hidden>{playerIcon}</span>
          <span className="fate-who">你 · {playerLabel}</span>
          <span className={`fate-tier-chip tier-text-${dice.tier}`}>
            {TIER_LABEL[dice.tier]} <i>{dice.total}</i>
          </span>
        </div>
        <div className="fate-vs-badge">VS</div>
        <div className="fate-combatant">
          <span className={`fate-medallion ${altMedal}`} aria-hidden>{altIcon}</span>
          <span className="fate-who">{altLabel}</span>
          <span className={`fate-tier-chip tier-text-${altFate.diceTier}`}>
            {TIER_LABEL[altFate.diceTier]} <i>{altFate.diceTotal}</i>
          </span>
        </div>
      </div>

      <div className={`fate-callout${tierDiffers ? '' : ' fate-callout-flat'}`}>{callout}</div>

      {altFate.mentorHit !== null && (
        <div className="fate-mentor-row">
          🎓 贵人:你 {realMentorHit ? '接住了' : '错过了'} · {altLabel} {altFate.mentorHit ? '接住了' : '错过了'}
        </div>
      )}

      {realInvestment !== null && (
        <div className={`fate-investment-context${investmentMod}`}>{investmentLabel}</div>
      )}

      <DuelBar label="生活费" real={realEventDelta?.wealth} alt={altFate.eventDelta.wealth} youIcon={playerIcon} altIcon={altIcon} index={0} />
      <DuelBar label="认知" real={realEventDelta?.cognition} alt={altFate.eventDelta.cognition} youIcon={playerIcon} altIcon={altIcon} index={1} />
      <DuelBar
        label="投资"
        real={realInvestment === null ? undefined : realInvestment.weekPnlAbs}
        alt={realInvestment === null ? undefined : altFate.investmentPnlAbs}
        youIcon={playerIcon}
        altIcon={altIcon}
        index={2}
      />
    </div>
  )
}
