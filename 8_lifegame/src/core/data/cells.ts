import type { Cell } from '../types'

// 6 campus cells (fully visible per source doc's origin-visibility rule — campus is never grayed)
// + 3 locked city cells (visibility gate, the scene's "extreme case"). See TDD.md §2, art doc §2.
export const CAMPUS_CELLS: Cell[] = [
  { id: 'start', zone: 'campus', type: 'start', label: '出身定型', icon: '🏠', locked: false },
  { id: 'library', zone: 'campus', type: 'learn', label: '图书馆', icon: '📚', locked: false },
  { id: 'cafeteria', zone: 'campus', type: 'work', label: '食堂兼职', icon: '🍜', locked: false },
  { id: 'club', zone: 'campus', type: 'rest', label: '社团', icon: '👥', locked: false },
  { id: 'lecture', zone: 'campus', type: 'learn', label: '公开课', icon: '🏫', locked: false },
  { id: 'mentor', zone: 'campus', type: 'mentor', label: '免费贵人', icon: '🎓', locked: false },
]

export const LOCKED_CITY_CELLS: Cell[] = [
  { id: 'city_board', zone: 'city', type: 'work', label: '私董会', icon: '💼', locked: true },
  { id: 'city_pe', zone: 'city', type: 'work', label: 'PE 圈', icon: '💎', locked: true },
  { id: 'city_bank', zone: 'city', type: 'mentor', label: '投行内推', icon: '🏦', locked: true },
]

export function getCellById(id: string): Cell {
  const cell = [...CAMPUS_CELLS, ...LOCKED_CITY_CELLS].find((c) => c.id === id)
  if (!cell) throw new Error(`unknown cell id: ${id}`)
  return cell
}

export function campusCellAtOffset(fromId: string, offset: number): Cell {
  const idx = CAMPUS_CELLS.findIndex((c) => c.id === fromId)
  const startIdx = idx === -1 ? 0 : idx
  const nextIdx = (((startIdx + offset) % CAMPUS_CELLS.length) + CAMPUS_CELLS.length) % CAMPUS_CELLS.length
  return CAMPUS_CELLS[nextIdx]!
}
