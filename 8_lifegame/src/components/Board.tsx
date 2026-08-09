import { CAMPUS_CELLS, LOCKED_CITY_CELLS } from '../core/data/cells'
import type { PlayerState } from '../core/types'
import { Cell } from './Cell'

interface BoardProps {
  player: PlayerState
}

// Center of a 460x460 ring. Index i here MUST correspond to CAMPUS_CELLS[i] — offsets are
// passed as an explicit inline transform per cell (not CSS nth-child) so adding/removing
// sibling elements in the ring (background shapes, the path SVG) can never silently
// desync the layout the way an nth-child selector would.
const RING_OFFSETS: [number, number][] = [
  [0, -165],
  [142, -82],
  [142, 82],
  [0, 165],
  [-142, 82],
  [-142, -82],
]

const PATH_POINTS = RING_OFFSETS.map(([x, y]) => [230 + x, 230 + y])

export function Board({ player }: BoardProps) {
  const visitedIds = new Set(player.log.map((t) => t.cellId))
  return (
    <div className="board">
      <div className="board-ring">
        <div className="board-quad" aria-hidden />
        <svg className="board-path" viewBox="0 0 460 460" aria-hidden>
          <polygon points={PATH_POINTS.map((p) => p.join(',')).join(' ')} />
        </svg>
        {CAMPUS_CELLS.map((cell, i) => {
          const [x, y] = RING_OFFSETS[i]!
          return (
            <Cell
              key={cell.id}
              cell={cell}
              current={cell.id === player.position}
              visited={visitedIds.has(cell.id)}
              offset={[x, y]}
            />
          )
        })}
      </div>
      <div className="board-city-preview">
        <div className="board-city-label">城市区 · 出身差看不见</div>
        <div className="board-city-cells">
          {LOCKED_CITY_CELLS.map((cell) => (
            <Cell key={cell.id} cell={cell} current={false} visited={false} />
          ))}
        </div>
      </div>
    </div>
  )
}
