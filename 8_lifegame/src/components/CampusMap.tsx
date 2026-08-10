import { useEffect } from 'react'
import { CAMPUS_CELLS, LOCKED_CITY_CELLS } from '../core/data/cells'
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

  return (
    <div className="campus-map" aria-label="校园地图">
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
        const isCurrent = cell.id === position
        // v1.4: 贵人办公室 starts beyond an ordinary origin's 认知 — greyed, unlabeled,
        // unclickable until the library discovery beat. Kept ENABLED (no-op click) so the
        // hint tooltip still fires (disabled buttons swallow mouse events).
        const isMentorLocked = cell.id === 'mentor' && !mentorUnlocked
        return (
          <button
            key={cell.id}
            className={[
              'building',
              isCurrent ? 'building-current' : '',
              visited.has(cell.id) ? 'building-visited' : '',
              isMentorLocked ? 'building-locked' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            disabled={!clickable}
            onClick={isMentorLocked ? undefined : () => chooseDestination(cell.id)}
            title={isMentorLocked ? '你从没听说过这地方 · 也许该去图书馆转转' : isCurrent ? `${cell.label}(原地休整)` : cell.label}
          >
            <span className="building-icon">{isMentorLocked ? '❓' : cell.icon}</span>
            <span className="building-label">{isMentorLocked ? '???' : cell.label}</span>
          </button>
        )
      })}

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
