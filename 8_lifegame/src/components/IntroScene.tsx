import { useEffect, useState } from 'react'
import { useGameStore } from '../store'
import { mentorHitFromChoiceId } from '../core/simulation/events'
import { CampusMap } from './CampusMap'
import { HUD } from './HUD'
import { DiceRoller } from './DiceRoller'
import { EventModal } from './EventModal'
import { InvestPanel } from './InvestPanel'
import { AICoachPanel } from './AICoachPanel'
import { SummaryScreen } from './SummaryScreen'
import { SpecialEventBanner } from './SpecialEventBanner'
import { ParallelFateCard } from './ParallelFateCard'
import { BeatOverlay } from './BeatOverlay'

// v1.2 §1: world layer (HUD + banner + campus map) is always mounted; ONE beat overlay sits
// on top per phase. The old .context-panel swap and .fate-stage bottom band are gone — the
// results beat is a single WIDE card: coach left, 平行命运 right.
export function IntroScene() {
  const state = useGameStore((s) => s.state)
  const runId = useGameStore((s) => s.runId)
  const {
    player,
    altPlayer,
    phase,
    pendingDice,
    pendingEvent,
    pendingEventChoiceId,
    pendingInvestment,
    pendingCoach,
    pendingMicroAwakening,
    pendingAltFate,
    pendingRealEventDelta,
    pendingSpecialEvent,
  } = state

  // Turn-1 出身定型 opening beat (spec §6): UI-only card, consumes no turn. Reset per run.
  const [openingOpen, setOpeningOpen] = useState(true)
  useEffect(() => setOpeningOpen(true), [runId])

  if (phase === 'summary') {
    return (
      <div className="intro-scene">
        <HUD player={player} microAwakeningToast={false} />
        <div className="summary-stage">
          <SummaryScreen player={player} altPlayer={altPlayer} />
        </div>
      </div>
    )
  }

  const realMentorHit = mentorHitFromChoiceId(pendingEventChoiceId)
  const showOpening = openingOpen && phase === 'choose_destination' && player.log.length === 0

  return (
    <div className="intro-scene">
      <HUD player={player} microAwakeningToast={pendingMicroAwakening} />
      {pendingSpecialEvent && <SpecialEventBanner result={pendingSpecialEvent} />}
      <CampusMap />
      {phase === 'choose_destination' && !showOpening && (
        <div className="map-hint">点击一栋建筑前往 · 骰子决定你到了之后发生什么</div>
      )}

      {showOpening && (
        <BeatOverlay>
          <div className="panel opening-panel">
            <div className="event-icon">🏠</div>
            <h2 className="opening-title">出身定型</h2>
            <p>这是你的开局 —— 小镇做题家 × Web 2.0。</p>
            <p>8 个回合,一张校园地图。去哪,你自己定;骰子决定你到了之后会发生什么。</p>
            <button className="btn btn-primary" onClick={() => setOpeningOpen(false)}>
              走进校园 →
            </button>
          </div>
        </BeatOverlay>
      )}
      {phase === 'dice' && (
        <BeatOverlay>
          <DiceRoller dice={pendingDice} />
        </BeatOverlay>
      )}
      {phase === 'event' && pendingEvent && (
        <BeatOverlay>
          <EventModal offer={pendingEvent} />
        </BeatOverlay>
      )}
      {phase === 'invest' && (
        <BeatOverlay>
          <InvestPanel />
        </BeatOverlay>
      )}
      {phase === 'results' && pendingCoach && pendingDice && pendingAltFate && (
        <BeatOverlay wide>
          <div className="results-grid">
            <AICoachPanel coach={pendingCoach} investment={pendingInvestment} turn={player.turn} />
            <ParallelFateCard
              dice={pendingDice}
              altFate={pendingAltFate}
              realEventDelta={pendingRealEventDelta}
              realInvestmentPnlAbs={pendingInvestment?.pnlAbs ?? null}
              realMentorHit={realMentorHit}
            />
          </div>
        </BeatOverlay>
      )}
    </div>
  )
}
