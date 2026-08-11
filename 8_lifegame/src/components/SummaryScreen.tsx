import type { Origin, ParallelState, PlayerState } from '../core/types'
import { TOWN_EXAM_KID_FULL_GAME_WEALTH, FINANCE_DYNASTY_FULL_GAME_WEALTH } from '../core/constants'
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
}

export function SummaryScreen({ player, altPlayer }: SummaryScreenProps) {
  const restart = useGameStore((s) => s.restart)
  const altAheadPct = player.wealth > 0 ? Math.round(((altPlayer.wealth - player.wealth) / player.wealth) * 100) : 0
  const playerLabel = originLabel(player.origin)
  const altLabel = originLabel(altPlayer.origin)

  return (
    <div className="panel summary-panel">
      <div className="summary-heading">学期结束 · 13 周小结</div>
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
        <div>{player.awakened ? '✨ 本局已觉醒' : '尚未觉醒'}</div>
      </div>
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
