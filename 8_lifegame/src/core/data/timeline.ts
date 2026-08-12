import type { TimelineMilestone } from '../types'

// The intro is one 2014 university semester for a protagonist born in 1995. The history
// progression starts at the 2014 进入大学 milestone — the moment the playable journey begins.
// Earlier birth/childhood context is intentionally not shown so the top bar tracks the
// semester and its aftermath. These are historical context markers, not market signals;
// the investment panel remains the only place that exposes noisy market information.
export const LIFE_TIMELINE: TimelineMilestone[] = [
  { year: 2014, label: '进入大学', detail: '19 岁，13 周校园学期、3 周寒假与新学期开学组成这段旅程。', icon: '🎓' },
  { year: 2014, label: '圣诞与寒假', detail: '爱情与梦想都不是通关道具，却会成为人生的一部分。', icon: '🎄' },
  { year: 2015, label: '新学期开学', detail: '贵人会出现；能力与方向提高认可概率，但相遇仍有不确定性。', icon: '🌱' },
]

export const SEMESTER_YEAR = 2014
export const NEXT_SEMESTER_YEAR = 2015
