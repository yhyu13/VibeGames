import { useEffect, useState } from 'react'
import { CAMPUS_CELLS, CAMPUS_LOCATION_GUIDES, LOCKED_CITY_CELLS } from '../core/data/cells'
import type { CampusCellId } from '../core/data/cells'
import { COGNITION_INFO_THRESHOLD, EXCHANGE_COGNITION_THRESHOLD } from '../core/constants'
import { LOCATION_EVENTS } from '../core/data/locationEvents'
import { NEXT_SEMESTER_TURN } from '../core/data/seasonEvents'
import { useGameStore } from '../store'

// v1.2 §2: a REAL campus map, not an abstract ring — buildings sited geographically on an
// 800×560 stylized campus, hub paths drawn between them, the locked city visible as a grey
// skyline beyond the north gate. Positions are presentation-only (like v1.1's RING_OFFSETS);
// distances have no mechanical meaning. Percent coords = (x/800, y/560) × 100.
const POSITIONS: Record<string, { x: number; y: number }> = {
  start: { x: 50, y: 84 }, // 宿舍 — south, where every run begins
  library: { x: 50, y: 38 }, // 图书馆 — center-north, the campus heart
  lecture: { x: 78, y: 52 }, // 教学楼 — east
  cafeteria: { x: 22, y: 54 }, // 食堂 — west
  club: { x: 24, y: 23 }, // 社团中心 — northwest
  mentor: { x: 76, y: 21 }, // 贵人办公室 — northeast, near the gate
  gym: { x: 18, y: 80 }, // 健身房 — southwest, next to the dorm (v1.7)
  exchange: { x: 82, y: 80 }, // 对外交流中心 — southeast, near the lecture hall (v1.7)
}

// Hub paths in the same 800×560 space (visual only). 图书馆 is the hub; 宿舍 fans out south.
const PATH_EDGES: [string, string][] = [
  ['start', 'library'],
  ['library', 'lecture'],
  ['library', 'cafeteria'],
  ['library', 'club'],
  ['library', 'mentor'],
  ['start', 'cafeteria'],
  ['start', 'lecture'],
  ['cafeteria', 'club'],
  ['lecture', 'mentor'],
  ['start', 'gym'],
  ['gym', 'cafeteria'],
  ['start', 'exchange'],
  ['exchange', 'lecture'],
]

const svgPoint = (id: string) => {
  const p = POSITIONS[id]!
  return { x: (p.x / 100) * 800, y: (p.y / 100) * 560 }
}

export function CampusMap() {
  const phase = useGameStore((s) => s.state.phase)
  const position = useGameStore((s) => s.state.player.position)
  const pendingDestinationId = useGameStore((s) => s.state.pendingDestinationId)
  const log = useGameStore((s) => s.state.player.log)
  const mentorUnlocked = useGameStore((s) => s.state.mentorUnlocked)
  const cognition = useGameStore((s) => s.state.player.cognition)
  const chooseDestination = useGameStore((s) => s.chooseDestination)
  const arrive = useGameStore((s) => s.arrive)

  // walking: the token glides to the destination (CSS transition on left/top), then arrival
  // resolves the seeded draw + shock. 600ms matches the token transition in styles.css.
  useEffect(() => {
    if (phase !== 'walking') return
    const timer = window.setTimeout(arrive, 600)
    return () => window.clearTimeout(timer)
  }, [phase, arrive])

  const visited = new Set(log.map((t) => t.cellId))
  const tokenAt = phase === 'walking' && pendingDestinationId ? pendingDestinationId : position
  const tokenPos = POSITIONS[tokenAt] ?? POSITIONS.start!
  const clickable = phase === 'choose_destination'
  const turn = useGameStore((s) => s.state.player.turn)
  const nextSemesterOpening = turn === NEXT_SEMESTER_TURN
  const [previewCellId, setPreviewCellId] = useState<string | null>(null)

  const previewCell = previewCellId ? CAMPUS_CELLS.find((cell) => cell.id === previewCellId) ?? null : null
  const previewEvents = previewCell ? LOCATION_EVENTS[previewCell.id] ?? [] : []
  const previewGuide = previewCell ? CAMPUS_LOCATION_GUIDES[previewCell.id as CampusCellId] : null
  const previewLockHint = previewCell
    ? previewCell.id === 'mentor' && !mentorUnlocked
      ? '你从没听说过这地方 · 也许该去图书馆转转'
      : previewCell.id === 'gym' && cognition < COGNITION_INFO_THRESHOLD
        ? `认知 ≥ ${COGNITION_INFO_THRESHOLD} 才会意识到锻炼也能回复心智`
        : previewCell.id === 'exchange' && cognition < EXCHANGE_COGNITION_THRESHOLD
          ? `认知 ≥ ${EXCHANGE_COGNITION_THRESHOLD} 才跟得上这里的节奏 · 先提升自己`
          : null
    : null

  return (
    <div className="campus-map" role="group" aria-label="校园地图">
      <div className="campus-depth-layer campus-depth-layer-back" aria-hidden />
      <div className="campus-depth-layer campus-depth-layer-front" aria-hidden />
      {/* v2.5: CSS-only life on the map — clouds drift, trees sway; no assets, aria-hidden. */}
      <div className="campus-decor" aria-hidden>
        <span className="decor-cloud" style={{ left: '8%', top: '16%' }}>☁️</span>
        <span className="decor-cloud" style={{ left: '64%', top: '10%', animationDelay: '-4s' }}>☁️</span>
        <span className="decor-tree" style={{ left: '6%', top: '62%' }}>🌳</span>
        <span className="decor-tree" style={{ left: '90%', top: '68%', animationDelay: '-3s' }}>🌳</span>
        <span className="decor-tree" style={{ left: '44%', top: '88%', animationDelay: '-6s' }}>🌳</span>
        <span className="decor-flower" style={{ left: '28%', top: '74%' }}>🌼</span>
        <span className="decor-flower" style={{ left: '71%', top: '40%', animationDelay: '-2s' }}>🌼</span>
        <span className="decor-flower" style={{ left: '12%', top: '44%', animationDelay: '-5s' }}>🌷</span>
      </div>
      <svg className="campus-paths" viewBox="0 0 800 560" preserveAspectRatio="none" aria-hidden>
        {PATH_EDGES.map(([a, b]) => {
          const p1 = svgPoint(a)
          const p2 = svgPoint(b)
          return <line key={`${a}-${b}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} />
        })}
      </svg>

      <div className="campus-gate" aria-hidden>
        <div className="campus-gate-label">北门 · 城市区(未解锁)</div>
        <div className="campus-skyline">
          {LOCKED_CITY_CELLS.map((cell) => (
            <div key={cell.id} className="skyline-tower" title="出身差看不见 · 未解锁">
              <span className="skyline-icon">{cell.icon}</span>
              <span className="skyline-lock">🔒</span>
            </div>
          ))}
        </div>
      </div>

      {CAMPUS_CELLS.map((cell) => {
        const pos = POSITIONS[cell.id]!
        const guide = CAMPUS_LOCATION_GUIDES[cell.id as CampusCellId]
        const isCurrent = cell.id === position
        // v1.4: 贵人办公室 starts beyond an ordinary origin's 认知 — greyed, unlabeled,
        // unclickable until the library discovery beat. Kept ENABLED (no-op click) so the
        // hint tooltip still fires (disabled buttons swallow mouse events).
        // v1.7: same ??? treatment for the two new unlockables — cognition reveals both;
        // the first gym visit after that still plays the 办卡 beat.
        const lockHint =
          cell.id === 'mentor' && !mentorUnlocked
            ? '你从没听说过这地方 · 也许该去图书馆转转'
            : cell.id === 'gym' && cognition < COGNITION_INFO_THRESHOLD
              ? `认知 ≥ ${COGNITION_INFO_THRESHOLD} 才会意识到锻炼也能回复心智`
              : cell.id === 'exchange' && cognition < EXCHANGE_COGNITION_THRESHOLD
                ? `认知 ≥ ${EXCHANGE_COGNITION_THRESHOLD} 才跟得上这里的节奏 · 先提升自己`
                : null
        return (
          <button
            key={cell.id}
            className={[
              'building',
              isCurrent ? 'building-current' : '',
              visited.has(cell.id) ? 'building-visited' : '',
              lockHint ? 'building-locked' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            disabled={!clickable || (nextSemesterOpening && cell.id !== (mentorUnlocked ? 'mentor' : 'library'))}
            aria-disabled={!!lockHint}
            aria-label={lockHint ?? undefined}
            onClick={lockHint ? undefined : () => chooseDestination(cell.id)}
            onMouseEnter={() => setPreviewCellId(cell.id)}
            onFocus={() => setPreviewCellId(cell.id)}
            onMouseLeave={() => setPreviewCellId(null)}
            onBlur={() => setPreviewCellId(null)}
            title={lockHint ?? (isCurrent ? `${cell.label}(原地休整)` : cell.label)}
          >
            <span className="building-icon">{lockHint ? '❓' : cell.icon}</span>
            <span className="building-label">{lockHint ? '???' : cell.label}</span>
            {lockHint ? (
              <span className="building-lock-chip">解锁条件</span>
            ) : (
              <span className="building-guide" aria-label={`收益 ${guide.benefitChip},代价 ${guide.riskChip}`}>
                <span className="building-guide-benefit">{guide.benefitChip}</span>
                <span className="building-guide-risk">{guide.riskChip}</span>
              </span>
            )}
          </button>
        )
      })}

      {previewCell && (
        <aside className="location-preview" aria-live="polite">
          {previewLockHint ? (
            <>
              <div className="location-preview-heading">❓ 未解锁地点</div>
              <div className="location-preview-lock">🔒 {previewLockHint}</div>
            </>
          ) : (
            <>
              <div className="location-preview-heading">{previewCell.icon} {previewCell.label} · 去之前先看</div>
              {previewGuide && (
                <div className="location-preview-guide">
                  <div className="location-preview-benefit"><b>主要有利</b><span>{previewGuide.benefits}</span></div>
                  <div className="location-preview-risk"><b>代价/风险</b><span>{previewGuide.risks}</span></div>
                </div>
              )}
              {previewEvents.length > 0 && (
                <div className="location-preview-events">
                  {previewEvents.map((event) => (
                    <span key={event.id} className={`location-preview-event preview-${event.kind}`}>
                      <b>{event.kind === 'opportunity' ? '机会' : event.kind === 'trap' ? '风险' : '日常'}</b>{event.title}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}
        </aside>
      )}

      <div
        className="token"
        style={{ left: `${tokenPos.x}%`, top: `${tokenPos.y}%` }}
        aria-hidden
      >
        🧑‍🎓
      </div>
    </div>
  )
}
