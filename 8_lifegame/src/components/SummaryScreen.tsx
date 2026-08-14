import type { Origin, PaperAccount, ParallelState, PlayerState, TrackId } from '../core/types'
import {
  COGNITION_INFO_THRESHOLD,
  FINANCE_DYNASTY_FULL_GAME_WEALTH,
  MENTOR_FAVORED_TRACK,
  TOWN_EXAM_KID_FULL_GAME_WEALTH,
  paperGoalProgressFor,
} from '../core/constants'
import { INTRO_TURN_LIMIT } from '../core/types'
import { accountValue, allPrices } from '../core/simulation/invest'
import { useGameStore } from '../store'

const TIER_SHORT: Record<string, string> = {
  big_fail: '大败',
  fail: '失败',
  success: '成功',
  big_success: '大胜',
  awaken: '觉醒',
}

// v2.5: the love line's semester stage labels for the summary card.
const LOVE_STAGE_TEXT: Record<string, string> = {
  met: '迎新晚会上认识了 TA,故事才刚刚开始。',
  knowing: '从图书馆到期末,你们已经熟稔。这段关系有了继续生长的土壤。',
  close: '期末的跨年夜,你答应了 TA 的邀约。故事在圣诞夜之前就已经有了温度。',
}

// 2d6 survival table: P(2d6 >= k). The "win" line is total >= 7 (success tier), so for a
// given modifier sum the win probability is P(2d6 >= 7 - modSum).
const D6_AT_LEAST: Record<number, number> = {
  2: 1, 3: 35 / 36, 4: 33 / 36, 5: 30 / 36, 6: 26 / 36, 7: 21 / 36,
  8: 15 / 36, 9: 10 / 36, 10: 6 / 36, 11: 3 / 36, 12: 1 / 36, 13: 0,
}

const WIN_TIERS: ReadonlySet<string> = new Set(['success', 'big_success', 'awaken'])

const originLabel = (origin: Origin) =>
  origin === 'finance_dynasty' ? '金融世家' : '小镇做题家'

interface SummaryScreenProps {
  player: PlayerState
  altPlayer: ParallelState
  paper: PaperAccount
  mentorUnlocked: boolean
  track: TrackId | null
  loveImpression: 'none' | 'ordinary' | 'good'
  loveReunion: boolean
  loveStage?: 'none' | 'met' | 'knowing' | 'close'
  // v2.6: 人生目标 = 模拟盘翻盘目标; the account value is computed internally at final prices.
  paperGoal?: number
}

function awakeningReasons(
  player: PlayerState,
  mentorUnlocked: boolean,
  track: TrackId | null,
): string[] {
  const reasons: string[] = []

  if (!mentorUnlocked) {
    reasons.push('未发现贵人办公室：先去图书馆，从信息里找到贵人的入口。')
  }
  if (track === null) {
    reasons.push('尚未选择未来方向：去教学楼完成职业规划课。')
  } else if (track !== MENTOR_FAVORED_TRACK) {
    reasons.push('方向未对口：贵人寻找的是提前押注人工智能的人。')
  }
  if (player.cognition < COGNITION_INFO_THRESHOLD) {
    reasons.push(
      `能力未达标：结算认知 ${Math.round(player.cognition)}/${COGNITION_INFO_THRESHOLD}，`
      + `至少达到 ${COGNITION_INFO_THRESHOLD} 才能赢得高概率信任。`,
    )
  }

  if (mentorUnlocked) {
    const missedMentor = player.log.some(
      (turn) => turn.eventChoiceId === 'mentor_miss',
    )
    reasons.push(
      missedMentor
        ? '到访过贵人办公室，但这次相遇没有获得认可；能力与方向对口可把认可概率提高到 90%。'
        : '尚未前往贵人办公室争取认可：觉醒只由贵人认可触发，不由骰子档位触发。',
    )
  }

  return reasons
}

export function SummaryScreen({
  player,
  altPlayer,
  paper,
  mentorUnlocked,
  track,
  loveImpression,
  loveReunion,
  loveStage = 'none',
  paperGoal,
}: SummaryScreenProps) {
  const restart = useGameStore((s) => s.restart)
  // v2.6 贫困逻辑: a ¥1,000 生活费 base makes percentage gaps meaningless (+29,900%) —
  // show the ¥ gap instead; the bar ratio stays clamped for both directions.
  const wealthGap = altPlayer.wealth - player.wealth
  // v2.6: a ¥1,000 生活费 base also made the old "100 + gap/100" width blow past 150% and
  // overflow the 640px panel. Scale both bars to the larger wealth with an 8% floor so the
  // ¥1,000 base is still a visible sliver and neither bar ever exceeds 100% width.
  const maxWealth = Math.max(player.wealth, altPlayer.wealth, 1)
  const youGapPct = Math.max(8, Math.round((player.wealth / maxWealth) * 100))
  const altGapPct = Math.max(8, Math.round((altPlayer.wealth / maxWealth) * 100))
  const playerLabel = originLabel(player.origin)
  const altLabel = originLabel(altPlayer.origin)
  const unawakenedReasons = player.awakened
    ? []
    : awakeningReasons(player, mentorUnlocked, track)
  // 模拟盘 final value: the account after the last week's close (all 17 ticks applied).
  const paperValue = Math.round(accountValue(paper, allPrices(INTRO_TURN_LIMIT + 1)))
  const paperPnl = paperValue - paper.initialCapital
  // v2.6: 人生目标 verdicts — 财富目标 reads the PAPER account (第一桶金 = 模拟盘翻盘),
  // progress NET of the origin's paper capital (小镇 ¥100,000 → ¥200,000 的 10 万空间).
  const paperGoalMet = paperGoal !== undefined && paperValue >= paperGoal
  const paperGoalPct = paperGoal !== undefined
    ? paperGoalProgressFor(player.origin, paperValue)
    : 0
  const paperNet = Math.max(0, paperValue - (player.origin === 'finance_dynasty' ? 300_000 : 100_000))
  const paperSpan = paperGoal !== undefined ? Math.max(0, paperGoal - (player.origin === 'finance_dynasty' ? 300_000 : 100_000)) : 0
  // v2.6 origin-consistency: the ¥1,000 start and the "先亏到 5 万" drawdown arc are town-only —
  // finance_dynasty starts 生活费 at ¥300,000 and its paper capital has no ¥50,000 drawdown story.
  const lifeStart = player.origin === 'finance_dynasty' ? 300_000 : 1_000
  const paperDrawdownHint = player.origin === 'finance_dynasty'
    ? '大多数人先亏到本金近半再学乖'
    : '大多数人先亏到 5 万再学乖'
  const loveGoalMet = loveReunion || loveStage === 'close'
  const loveGoalStarted = loveStage !== 'none' || loveImpression !== 'none'
  // Per-week dice odds: the chance that THIS roll lands success-or-better given its actual
  // modifiers, plus the raw dice luck (2d6 vs the expected 7).
  const turnOdds = player.log.map((t) => {
    const modSum = t.dice.originMod + t.dice.eraMod + t.dice.stateMod + t.dice.eventMod
    const k = Math.max(2, Math.min(13, 7 - modSum))
    const winPct = Math.round((D6_AT_LEAST[k] ?? 0) * 100)
    const luck = t.dice.rolls[0] + t.dice.rolls[1] - 7
    return { turn: t.turn, tier: t.dice.tier, winPct, luck, modSum, dice: t.dice }
  })
  const totalLuck = turnOdds.reduce((sum, t) => sum + t.luck, 0)
  const wins = turnOdds.filter((t) => WIN_TIERS.has(t.tier)).length
  const actualWinPct = turnOdds.length ? Math.round((wins / turnOdds.length) * 100) : 0
  const avgWinPct = turnOdds.length ? Math.round(turnOdds.reduce((sum, t) => sum + t.winPct, 0) / turnOdds.length) : 0

  return (
    <div className="panel summary-panel">
      <div className="summary-heading">第一学期 + 寒假 · 17 周小结</div>
      <div className="luck-grid" role="group" aria-label="每周骰运明细">
        {turnOdds.map((t) => (
          <div
            key={t.turn}
            className={`luck-cell luck-${t.tier}`}
            title={`第 ${t.turn} 周 · 骰子 ${t.dice.rolls[0]} + ${t.dice.rolls[1]} · 修正 ${t.modSum >= 0 ? '+' : ''}${t.modSum} · 运气 ${t.luck >= 0 ? '+' : ''}${t.luck}`}
          >
            <b>第{t.turn}周</b>
            <span>{TIER_SHORT[t.tier]}</span>
            <i>胜率 {t.winPct}%</i>
          </div>
        ))}
      </div>
      <div className="luck-summary">
        <span><b>{wins} 胜 {turnOdds.length - wins} 负</b> · 平均预期胜率 {avgWinPct}% / 实际 {actualWinPct}%</span>
        <span>总运气值 <b className={totalLuck >= 0 ? 'pnl-up' : 'pnl-down'}>{totalLuck >= 0 ? '+' : ''}{totalLuck}</b>（2d6 相对均值 7 的累计偏差，正=偏好运）</span>
      </div>
      <div className="summary-stats">
        <div>🏠 生活费: ¥{player.wealth.toLocaleString()} {player.origin === 'finance_dynasty' ? '(起点 ¥300,000)' : '(起点 ¥1,000)'}</div>
        <div>🧠 认知: {Math.round(player.cognition)}</div>
        <div className={paperPnl >= 0 ? 'pnl-up' : 'pnl-down'}>
          💼 模拟盘: ¥{paperValue.toLocaleString()} ({paperPnl >= 0 ? '+' : ''}¥{Math.abs(paperPnl).toLocaleString()})
        </div>
      </div>
      {paperGoal !== undefined && (
        <div className="summary-goals">
          <div className={`summary-goal summary-goal-wealth${paperGoalMet ? ' summary-goal-met' : ''}`}>
            <b>{paperGoalMet ? '✅ 财富目标 · 达成' : '🎯 财富目标 · 进行中'}</b>
            <div className="summary-goal-track">
              <div className="summary-goal-fill" style={{ width: `${paperGoalPct}%` }} />
            </div>
            <span>
              {paperGoalMet
                ? `模拟盘翻到了 ¥${paperValue?.toLocaleString()} —— 你从 ¥${lifeStart.toLocaleString()} 的生活费开始,在模拟盘上挣出了人生第一桶金。`
                : `已翻盘 ¥${paperNet.toLocaleString()} / ¥${paperSpan.toLocaleString()} (${paperGoalPct}%)。${paperDrawdownHint} —— 翻盘,还差一点。`}
            </span>
          </div>
          <div className={`summary-goal summary-goal-love${loveGoalMet ? ' summary-goal-met' : ''}`}>
            <b>{loveGoalMet ? '✅ 爱情目标 · 达成' : loveGoalStarted ? '❤️ 爱情目标 · 进行中' : '❤️ 爱情目标 · 未开始'}</b>
            <span>
              {loveGoalMet
                ? '你找到了一个愿意并肩的人。爱情不决定觉醒,但它让这趟旅程有了回声。'
                : loveGoalStarted
                  ? LOVE_STAGE_TEXT[loveStage] ?? '故事有了开头,结局留给未来。'
                  : '迎新晚会上你没有主动开口。没关系,有些人会迟到,但不代表不会来。'}
            </span>
          </div>
        </div>
      )}
      {player.awakened ? (
        <div className="summary-awakening summary-awakening-success">
          <strong>✨ 本局已觉醒</strong>
          <span>新学期开学，贵人认可了你，金融世家出身已经解锁。</span>
        </div>
      ) : (
        <div className="summary-awakening summary-awakening-pending">
          <strong>尚未觉醒 · 原因</strong>
          <ul>
            {unawakenedReasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="summary-love">
        <strong>❤️ 爱情支线 · 不影响觉醒结局</strong>
        {loveReunion ? (
          <span>学期里和 TA 一路走来,圣诞夜重逢,寒假又见了一面。爱情开始生长,但它不是通关奖励。</span>
        ) : loveStage === 'close' ? (
          <span>从迎新晚会到期末的邀约,你们已经并肩走过了整个学期。爱情不是通关奖励,但它是这段旅程的回声。</span>
        ) : loveStage === 'met' || loveStage === 'knowing' ? (
          <span>{LOVE_STAGE_TEXT[loveStage]} 认知与身心健康,会影响你如何进入一段关系。</span>
        ) : loveImpression === 'good' ? (
          <span>圣诞夜留下了好印象。这段关系有了继续发生的可能。</span>
        ) : loveImpression === 'ordinary' ? (
          <span>圣诞夜只是一次普通相遇。认知与身心健康,也会影响你如何进入一段关系。</span>
        ) : (
          <span>这次旅程没有展开爱情支线。</span>
        )}
      </div>
      {player.origin === 'town_exam_kid' && (
        <div className="summary-dream">🌠 小镇做题家也可以有梦想。没有被看见，不等于梦想不值得继续。</div>
      )}
      <div className="summary-gap-teaser">
        <div className="gap-teaser-label">
          这一局的平行命运 —— 同样的骰子、同样的选择,另一种出身会走到哪里:
        </div>
        <div className="gap-teaser-bars">
          <div className="gap-bar-row">
            <div className="gap-bar-label">{playerLabel}: ¥{player.wealth.toLocaleString()}</div>
            <div className="gap-bar-track"><div className="gap-bar gap-bar-you" style={{ width: `${youGapPct}%` }} /></div>
          </div>
          <div className="gap-bar-row">
            <div className="gap-bar-label">{altLabel}: ¥{altPlayer.wealth.toLocaleString()} ({wealthGap >= 0 ? '多' : '少'} ¥{Math.abs(wealthGap).toLocaleString()})</div>
            <div className="gap-bar-track"><div className="gap-bar gap-bar-dynasty" style={{ width: `${altGapPct}%` }} /></div>
          </div>
        </div>
      </div>
      <div className="summary-gap-teaser">
        <div className="gap-teaser-label">如果你玩完整局(4 时代 32 回合,中等水平玩家参考值):</div>
        <div className="gap-teaser-bars">
          <div className="gap-bar-row">
            <div className="gap-bar-label">小镇做题家: ¥{TOWN_EXAM_KID_FULL_GAME_WEALTH.toLocaleString()}</div>
            <div className="gap-bar-track"><div className="gap-bar gap-bar-you" style={{ width: `${Math.round((TOWN_EXAM_KID_FULL_GAME_WEALTH / FINANCE_DYNASTY_FULL_GAME_WEALTH) * 100)}%` }} /></div>
          </div>
          <div className="gap-bar-row">
            <div className="gap-bar-label">金融世家: ¥{FINANCE_DYNASTY_FULL_GAME_WEALTH.toLocaleString()}</div>
            <div className="gap-bar-track"><div className="gap-bar gap-bar-dynasty" style={{ width: '100%' }} /></div>
          </div>
        </div>
        <div className="gap-teaser-note">同样中等水平、同样不付费 —— 6.4 倍差距。这不是 bug,是 feature。</div>
      </div>
      <div className="next-doc-teaser">下一份文档:Ch07 贵人系统 + Ch09 投资策略库 敬请期待</div>
      <button className="btn btn-primary" onClick={() => restart()}>
        再来一次 ↻
      </button>
    </div>
  )
}
