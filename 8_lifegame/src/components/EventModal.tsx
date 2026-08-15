import type { EventOffer, LocationEventKind } from '../core/types'
import { getCellById } from '../core/data/cells'
import { useGameStore } from '../store'
import { formatYuan } from './format'

// v1.2 §3: every location event declares its kind — the player learns that the same building
// can hand them an opportunity OR a trap (and the dice tier they just rolled scales it).
const KIND_LABEL: Record<LocationEventKind, string> = {
  opportunity: '机会',
  neutral: '日常',
  trap: '麻烦',
}

// v2.5: love beats carry their own badge — the first meeting, the library meeting, the
// 期末 invitation, and the Christmas reunion are 支线 beats, not campus tables.
const LOVE_BADGE: Record<string, string> = {
  love_first_encounter: '爱情支线 · 初次相遇',
  love_second_meeting: '爱情支线 · 再遇',
  love_third_party: '爱情支线 · 邀约',
  christmas_encounter: '圣诞夜',
  winter_reunion: '寒假 · 再见一面',
}

// v2.5: the dynasty relationship line gets its own badge — the 关系不是资产 crisis stages.
const RELATIONSHIP_BADGE: Record<string, string> = {
  relationship_doubt: '世家关系线 · 1/3',
  relationship_money: '世家关系线 · 2/3',
  relationship_break: '世家关系线 · 3/3',
}

const LOVE_ICON: Record<string, string> = {
  christmas_encounter: '🎄',
  winter_reunion: '❄️',
}

interface EventModalProps {
  offer: EventOffer
}

function SpecialChoiceCard() {
  const pending = useGameStore((s) => s.state.pendingSpecialChoice)
  const chooseSpecialChoice = useGameStore((s) => s.chooseSpecialChoice)
  if (!pending) return null
  const { event } = pending
  return (
    <div className="panel event-panel event-panel-special">
      <div className="event-heading" role="heading" aria-level={2}>
        <span className="event-icon" aria-hidden>{event.icon}</span> {event.label}
        <span className="event-kind-badge event-kind-badge-special">人生抉择</span>
      </div>
      <p className="event-text">{event.text}</p>
      <div className="event-choices">
        {event.choices?.map((choice) => (
          <button key={choice.id} className="btn btn-choice" onClick={() => chooseSpecialChoice(choice.id)}>
            <span className="choice-label">{choice.label}</span>
            <span className="choice-description">
              {choice.wealthFlat
                ? `生活费 ${choice.wealthFlat > 0 ? '+' : ''}${formatYuan(choice.wealthFlat)}`
                : choice.wealthPct !== 0
                  ? `生活费 ${choice.wealthPct > 0 ? '+' : ''}${choice.wealthPct}%`
                  : ''}
              {Object.entries(choice.delta)
                .filter(([, v]) => v !== 0)
                .map(([k, v]) => `${k === 'cognition' ? '认知' : k === 'stamina' ? '体力' : '情绪'} ${v! > 0 ? '+' : ''}${v}`)
                .join(' · ')}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export function EventModal({ offer }: EventModalProps) {
  const chooseEvent = useGameStore((s) => s.chooseEvent)
  // v2.4: a choice-based special event (drawn at arrival) is shown BEFORE the location card.
  const pendingSpecial = useGameStore((s) => s.state.pendingSpecialChoice)
  // The player has already ARRIVED — the location is their current position (EventOffer
  // deliberately doesn't carry the cell id; spec §7). Hook order is FIXED above the early
  // return — the special card must not change how many hooks EventModal runs (React rule).
  const position = useGameStore((s) => s.state.player.position)
  const cell = getCellById(position)
  if (pendingSpecial) return <SpecialChoiceCard />
  const { event } = offer
  const loveBadge = LOVE_BADGE[event.id]
  const relationshipBadge = RELATIONSHIP_BADGE[event.id]
  const specialBadge = loveBadge ?? relationshipBadge
  // v2.5 self-critique: story beats (love/relationship/seasonal) are location-INDEPENDENT —
  // "宿舍 · 迎新晚会" or "食堂 · 关系危机" contradict the fiction, so beat cards drop the
  // destination prefix entirely and let the badge + icon carry the context.
  const headingIcon = specialBadge ? (LOVE_ICON[event.id] ?? (relationshipBadge ? '🎩' : '❤️')) : cell.icon

  return (
    <div className={`panel event-panel event-kind-${event.kind}${loveBadge ? ' event-panel-love' : ''}${relationshipBadge ? ' event-panel-relationship' : ''}`}>
      <div className="event-heading" role="heading" aria-level={2}>
        {specialBadge ? (
          <>
            <span className="event-icon" aria-hidden>{headingIcon}</span> {event.title}
            <span className={`event-kind-badge ${loveBadge ? 'event-kind-badge-love' : 'event-kind-badge-relationship'}`}>{specialBadge}</span>
          </>
        ) : (
          <>
            <span className="event-icon" aria-hidden>{cell.icon}</span> {cell.label} · {event.title}
            <span className={`event-kind-badge event-kind-badge-${event.kind}`}>
              {KIND_LABEL[event.kind]}
            </span>
          </>
        )}
      </div>
      <p className="event-text">{event.text}</p>
      {offer.mentorTrusted && (
        <p className="mentor-trust-line"><span aria-hidden>🎓</span> 贵人听说你选了人工智能方向 —— 他觉得你是同道中人，愿意多聊几句。</p>
      )}
      <div className="event-choices">
        {event.choices.map((choice) => (
          <button key={choice.id} className="btn btn-choice" onClick={() => chooseEvent(choice.id)}>
            <span className="choice-label">{choice.label}</span>
            <span className="choice-description">{choice.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
