import type { Cell } from '../types'

export type CampusCellId =
  | 'start'
  | 'library'
  | 'cafeteria'
  | 'club'
  | 'lecture'
  | 'mentor'
  | 'gym'
  | 'exchange'

export interface CampusLocationGuide {
  benefitChip: string
  riskChip: string
  benefits: string
  risks: string
}

// Stable navigation guidance: these describe each building's usual value direction, not a
// guaranteed event result. The event tables remain the mechanical source of exact deltas.
export const CAMPUS_LOCATION_GUIDES = {
  start: {
    benefitChip: '身心↑',
    riskChip: '失眠风险',
    benefits: '体力↑ · 心态↑',
    risks: '失眠时体力↓ · 心态↓',
  },
  library: {
    benefitChip: '认知↑',
    riskChip: '体力↓',
    benefits: '认知↑',
    risks: '学习消耗体力 · 冲突时心态↓',
  },
  cafeteria: {
    benefitChip: '生活费↑',
    riskChip: '体力↓',
    benefits: '生活费↑',
    risks: '打工消耗体力 · 出错时生活费/心态↓',
  },
  club: {
    benefitChip: '身心↑',
    riskChip: '社交风险',
    benefits: '心态↑ · 体力↑',
    risks: '社交冲突时心态↓ · 体力↓',
  },
  lecture: {
    benefitChip: '认知↑',
    riskChip: '体力↓',
    benefits: '认知↑ · 可选择未来方向',
    risks: '上课消耗体力 · 失误时心态↓',
  },
  mentor: {
    benefitChip: '认知↑',
    riskChip: '可能落空',
    benefits: '认知↑ · 心态↑ · 获得认可时觉醒',
    risks: '需要能力与方向对口 · 相遇不保证成功',
  },
  gym: {
    benefitChip: '身心↑',
    riskChip: '受伤风险',
    benefits: '体力↑ · 心态↑',
    risks: '过度训练时体力↓ · 心态↓',
  },
  exchange: {
    benefitChip: '认知↑↑',
    riskChip: '高风险',
    benefits: '认知↑↑ · 交流顺利时心态↑',
    risks: '展示失败时认知↓ · 心态↓',
  },
} as const satisfies Record<CampusCellId, CampusLocationGuide>

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
  // v1.7: two more unlockables. locked stays false — the map greys them out via state
  // (gymUnlocked beat / derived cognition gate), same pattern as 贵人办公室.
  { id: 'gym', zone: 'campus', type: 'rest', label: '健身房', icon: '💪', locked: false },
  { id: 'exchange', zone: 'campus', type: 'learn', label: '对外交流中心', icon: '🌏', locked: false },
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
