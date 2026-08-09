import { CAMPUS_CELLS, LOCKED_CITY_CELLS } from '../core/data/cells'
import type { PlayerState } from '../core/types'
import { Cell } from './Cell'

interface BoardProps {
  player: PlayerState
}

export function Board({ player }: BoardProps) {
  const visitedIds = new Set(player.log.map((t) => t.cellId))
  return (
    <div className="board">
      <div className="board-ring">
        {CAMPUS_CELLS.map((cell) => (
          <Cell key={cell.id} cell={cell} current={cell.id === player.position} visited={visitedIds.has(cell.id)} />
        ))}
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
