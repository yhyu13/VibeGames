import type { TimelineMilestone } from '../types'

// The intro is one 2014 university semester for a protagonist born in 1995. These are
// historical context markers, not market signals; the investment panel remains the only place
// that exposes noisy market information.
export const LIFE_TIMELINE: TimelineMilestone[] = [
  { year: 1995, label: '出生', detail: '个人电脑和拨号上网仍是少数人的窗口。', icon: '🍼' },
  { year: 2001, label: '互联网启蒙', detail: '网吧、门户与搜索引擎开始改变获取知识的方式。', icon: '🖥️' },
  { year: 2008, label: '金融危机', detail: '世界第一次让你看见：资产价格会改写普通人的生活。', icon: '🌪️' },
  { year: 2011, label: '移动互联网', detail: '智能手机把信息差装进每个人的口袋。', icon: '📱' },
  { year: 2013, label: '选择前夜', detail: '金融是显学，人工智能仍像少数人的远方。', icon: '🔭' },
  { year: 2014, label: '进入大学', detail: '19 岁，13 周校园学期、3 周寒假与新学期开学组成这段旅程。', icon: '🎓' },
  { year: 2014, label: '圣诞与寒假', detail: '爱情与梦想都不是通关道具，却会成为人生的一部分。', icon: '🎄' },
  { year: 2015, label: '新学期开学', detail: '贵人会出现；能力与方向提高认可概率，但相遇仍有不确定性。', icon: '🌱' },
]

export const SEMESTER_YEAR = 2014
export const NEXT_SEMESTER_YEAR = 2015
