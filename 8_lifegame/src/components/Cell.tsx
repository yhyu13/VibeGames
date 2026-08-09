import type { Cell as CellType } from '../core/types'

interface CellProps {
  cell: CellType
  current: boolean
  visited: boolean
  offset?: [number, number]
}

export function Cell({ cell, current, visited, offset }: CellProps) {
  const classNames = [
    'cell',
    cell.locked ? 'cell-locked' : 'cell-lit',
    current ? 'cell-current' : '',
    visited && !cell.locked ? 'cell-visited' : '',
  ]
    .filter(Boolean)
    .join(' ')

  // transform is a single CSS property -- position (translate) and the current-cell highlight
  // (scale) must be composed into ONE declaration here, not split across this inline style and
  // a separate stylesheet rule, or one would silently clobber the other instead of combining.
  const translate = offset ? `translate(${offset[0]}px, ${offset[1]}px)` : ''
  const scale = current ? ' scale(1.08)' : ''
  const style = offset || current ? { transform: `${translate}${scale}` } : undefined

  return (
    <div className={classNames} style={style} title={cell.locked ? '出身差看不见 · 未解锁' : cell.label}>
      {cell.locked ? (
        <>
          <span className="cell-icon cell-icon-mystery">❔</span>
          <span className="cell-label cell-label-mystery">???</span>
        </>
      ) : (
        <>
          <span className="cell-icon">{cell.icon}</span>
          <span className="cell-label">{cell.label}</span>
        </>
      )}
      {cell.locked && <span className="cell-lock">🔒</span>}
      {current && <span className="cell-current-ring" aria-hidden />}
    </div>
  )
}
