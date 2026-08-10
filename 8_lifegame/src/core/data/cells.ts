import type { Cell } from '../types'

// v1.2: the 6 campus locations as geographically-sited buildings (spec §2) — ids are stable
// (save/log compatibility), labels/icons updated for the real campus map. Visual positions
// live in components/CampusMap.tsx (presentation-only data, mirroring v1.1's RING_OFFSETS).
// The 3 locked city cells become the skyline beyond the north gate (visibility gate intact).
export const CAMPUS_CELLS: Cell[] = [
  { id: 'start', zone: 'campus', type: 'start', label: '宿舍', icon: '🏠', locked: false },
  { id: 'library', zone: 'campus', type: 'learn', label: '图书馆', icon: '📚', locked: false },
  { id: 'cafeteria', zone: 'campus', type: 'work', label: '食堂', icon: '🍜', locked: false },
  { id: 'club', zone: 'campus', type: 'rest', label: '社团中心', icon: '👥', locked: false },
  { id: 'lecture', zone: 'campus', type: 'learn', label: '教学楼', icon: '🏫', locked: false },
  { id: 'mentor', zone: 'campus', type: 'mentor', label: '贵人办公室', icon: '🎓', locked: false },
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

// v1.2: campusCellAtOffset retired — movement is player-chosen (spec §7.1), dice no longer
// move the token.
