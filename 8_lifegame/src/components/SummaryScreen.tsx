import type { Origin, PaperAccount, ParallelState, PlayerState, TrackId } from '../core/types'
import {
  COGNITION_INFO_THRESHOLD,
  FINANCE_DYNASTY_FULL_GAME_WEALTH,
  MENTOR_FAVORED_TRACK,
  TOWN_EXAM_KID_FULL_GAME_WEALTH,
} from '../core/constants'
import { INTRO_TURN_LIMIT } from '../core/types'
import { accountValue, allPrices } from '../core/simulation/invest'
import { useGameStore } from '../store'

const TIER_ICON: Record<string, string> = {
  big_fail: '💥',
  fail: '😐',
  success: '✅',
  big_success: '🎉',
  awaken: '✨',
}

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
}: SummaryScreenProps) {
  const restart = useGameStore((s) => s.restart)
  const altAheadPct = player.wealth > 0 ? Math.round(((altPlayer.wealth - player.wealth) / player.wealth) * 100) : 0
  const playerLabel = originLabel(player.origin)
  const altLabel = originLabel(altPlayer.origin)
  const unawakenedReasons = player.awakened
    ? []
    : awakeningReasons(player, mentorUnlocked, track)
  // 模拟盘 final value: the account after the last week's close (all 17 ticks applied).
  const paperValue = Math.round(accountValue(paper, allPrices(INTRO_TURN_LIMIT + 1)))
  const paperPnl = paperValue - paper.initialCapital

  return (
    <div className="panel summary-panel">
      <div className="summary-heading">第一学期 + 寒假 · 17 周小结</div>
      <div className="summary-trace">
        {player.log.map((t) => (
          <span key={t.turn} className="summary-trace-item" title={`第${t.turn}回合`}>
            {TIER_ICON[t.dice.tier]}
          </span>
        ))}
      </div>
      <div className="summary-stats">
        <div>💰 本局财富: ¥{player.wealth.toLocaleString()}</div>
        <div>🧠 认知: {Math.round(player.cognition)}</div>
        <div className={paperPnl >= 0 ? 'pnl-up' : 'pnl-down'}>
          💼 模拟盘: ¥{paperValue.toLocaleString()} ({paperPnl >= 0 ? '+' : ''}¥{Math.abs(paperPnl).toLocaleString()})
        </div>
      </div>
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
          <span>圣诞夜留下了好印象，寒假又见了一面。爱情开始生长，但它不是通关奖励。</span>
        ) : loveImpression === 'good' ? (
          <span>圣诞夜留下了好印象。这段关系有了继续发生的可能。</span>
        ) : loveImpression === 'ordinary' ? (
          <span>圣诞夜只是一次普通相遇。认知与身心状态，也会影响你如何进入一段关系。</span>
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
          <div className="gap-bar gap-bar-you" style={{ width: '100%' }}>
            {playerLabel}: ¥{player.wealth.toLocaleString()}
          </div>
          <div
            className="gap-bar gap-bar-dynasty"
            style={{ width: `${Math.max(20, Math.min(150, 100 + altAheadPct))}%` }}
          >
            {altLabel}: ¥{altPlayer.wealth.toLocaleString()} ({altAheadPct >= 0 ? '+' : ''}
            {altAheadPct}%)
          </div>
        </div>
      </div>
      <div className="summary-gap-teaser">
        <div className="gap-teaser-label">如果你玩完整局(4 时代 32 回合,中等水平玩家参考值):</div>
        <div className="gap-teaser-bars">
          <div
            className="gap-bar gap-bar-you"
            style={{ width: `${Math.round((TOWN_EXAM_KID_FULL_GAME_WEALTH / FINANCE_DYNASTY_FULL_GAME_WEALTH) * 100)}%` }}
          >
            小镇做题家: ¥{TOWN_EXAM_KID_FULL_GAME_WEALTH.toLocaleString()}
          </div>
          <div className="gap-bar gap-bar-dynasty" style={{ width: '100%' }}>
            金融世家: ¥{FINANCE_DYNASTY_FULL_GAME_WEALTH.toLocaleString()}
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
