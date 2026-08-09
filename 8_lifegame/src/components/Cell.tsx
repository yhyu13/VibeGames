import type { Cell as CellType } from '../core/types'

interface CellProps {
  cell: CellType
  current: boolean
  visited: boolean
}

export function Cell({ cell, current, visited }: CellProps) {
  const classNames = [
    'cell',
    cell.locked ? 'cell-locked' : 'cell-lit',
    current ? 'cell-current' : '',
    visited && !cell.locked ? 'cell-visited' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classNames} title={cell.locked ? '出身差看不见 · 未解锁' : cell.label}>
      <span className="cell-icon">{cell.icon}</span>
      <span className="cell-label">{cell.label}</span>
      {cell.locked && <span className="cell-lock">🔒</span>}
      {current && <span className="cell-current-ring" aria-hidden />}
    </div>
  )
}
