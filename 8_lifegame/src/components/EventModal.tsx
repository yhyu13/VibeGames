import type { EventOffer, LocationEventKind } from '../core/types'
import { getCellById } from '../core/data/cells'
import { useGameStore } from '../store'

// v1.2 §3: every location event declares its kind — the player learns that the same building
// can hand them an opportunity OR a trap (and the dice tier they just rolled scales it).
const KIND_LABEL: Record<LocationEventKind, string> = {
  opportunity: '机会',
  neutral: '日常',
  trap: '麻烦',
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
      <div className="event-heading">
        <span className="event-icon">{event.icon}</span> {event.label}
        <span className="event-kind-badge event-kind-badge-special">人生抉择</span>
      </div>
      <p className="event-text">{event.text}</p>
      <div className="event-choices">
        {event.choices?.map((choice) => (
          <button key={choice.id} className="btn btn-choice" onClick={() => chooseSpecialChoice(choice.id)}>
            <span className="choice-label">{choice.label}</span>
            <span className="choice-description">
              {choice.wealthPct !== 0 ? `财富 ${choice.wealthPct > 0 ? '+' : ''}${choice.wealthPct}%` : ''}
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

  return (
    <div className={`panel event-panel event-kind-${event.kind}`}>
      <div className="event-heading">
        <span className="event-icon">{cell.icon}</span> {cell.label} · {event.title}
        <span className={`event-kind-badge event-kind-badge-${event.kind}`}>
          {KIND_LABEL[event.kind]}
        </span>
      </div>
      <p className="event-text">{event.text}</p>
      {offer.mentorTrusted && (
        <p className="mentor-trust-line">👁 贵人听说你选了人工智能方向 —— 他觉得你是同道中人,愿意多聊几句。</p>
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
