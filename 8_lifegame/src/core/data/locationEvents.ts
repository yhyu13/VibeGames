import type { LocationEvent } from '../types'

// v1.2 §3: per-location weighted event tables — opportunity / neutral / trap, drawn once per
// arrival via the seeded turn rand stream (drawLocationEvent in core/simulation/events.ts).
// Weight convention per table: opportunity 2 / neutral 3 / trap 1 (trap ≈ 17%).
// eventMod: traps carry −1 (a bad turn of luck feeds the dice formula), mentor entries +1
// (preserves v1.1's 贵人格子+1 under the destination-event rule, spec §7.2), all others 0.
// Rest stamina bases encode v1.1's reciprocal divisors as fractions (spec §3: 10×0.5=5 etc.).

const library: LocationEvent[] = [
  {
    id: 'lib_notes',
    cellType: 'learn',
    kind: 'opportunity',
    weight: 2,
    eventMod: 0,
    scaledStats: ['cognition'],
    title: '学长笔记',
    text: '一位学长毕业前把四年的笔记留在了书架夹层里。',
    choices: [
      { id: 'deep_read', label: '认真研读', description: '认知 +12 × 出身系数,体力 −8', delta: { cognition: 12, stamina: -8 }, coefficient: 'learn', coefficientStats: ['cognition'] },
      { id: 'skim', label: '快速浏览', description: '认知 +6 × 出身系数,体力 −3', delta: { cognition: 6, stamina: -3 }, coefficient: 'learn', coefficientStats: ['cognition'] },
    ],
  },
  {
    id: 'lib_quiet',
    cellType: 'learn',
    kind: 'neutral',
    weight: 3,
    eventMod: 0,
    scaledStats: ['cognition'],
    title: '安静自习',
    text: '普通的一天,自习室里只有翻书声。',
    choices: [
      { id: 'self_study', label: '自习刷题', description: '认知 +6 × 出身系数,体力 −3', delta: { cognition: 6, stamina: -3 }, coefficient: 'learn', coefficientStats: ['cognition'] },
    ],
  },
  {
    id: 'lib_seat_war',
    cellType: 'learn',
    kind: 'trap',
    weight: 1,
    eventMod: -1,
    scaledStats: ['stamina', 'mood'],
    title: '占座大战',
    text: '期末周,你的座位被人用书占了,对方还振振有词。',
    choices: [
      { id: 'argue', label: '争一口气', description: '体力 −10,心态 −5', delta: { stamina: -10, mood: -5 }, coefficient: null, coefficientStats: [] },
      { id: 'yield', label: '忍了,换个位子', description: '体力 −4,心态 −2', delta: { stamina: -4, mood: -2 }, coefficient: null, coefficientStats: [] },
    ],
  },
]

const lecture: LocationEvent[] = [
  {
    id: 'lec_master',
    cellType: 'learn',
    kind: 'opportunity',
    weight: 2,
    eventMod: 0,
    scaledStats: ['cognition'],
    title: '名师公开课',
    text: '外校名师来讲行业实操,教室挤满了人。',
    choices: [
      { id: 'front_row', label: '前排认真听', description: '认知 +10 × 出身系数,体力 −5', delta: { cognition: 10, stamina: -5 }, coefficient: 'learn', coefficientStats: ['cognition'] },
      { id: 'back_row', label: '后排刷手机', description: '认知 +3 × 出身系数,心态 +2', delta: { cognition: 3, mood: 2 }, coefficient: 'learn', coefficientStats: ['cognition'] },
    ],
  },
  {
    id: 'lec_routine',
    cellType: 'learn',
    kind: 'neutral',
    weight: 3,
    eventMod: 0,
    scaledStats: ['cognition'],
    title: '例行大课',
    text: '照本宣科的一节课,但多少能学到点东西。',
    choices: [
      { id: 'attend', label: '随堂听讲', description: '认知 +5 × 出身系数,体力 −2', delta: { cognition: 5, stamina: -2 }, coefficient: 'learn', coefficientStats: ['cognition'] },
    ],
  },
  {
    id: 'lec_called_out',
    cellType: 'learn',
    kind: 'trap',
    weight: 1,
    eventMod: -1,
    scaledStats: ['mood', 'stamina'],
    title: '点名答不出',
    text: '老师点名提问,你正好走神,全班都在看你。',
    choices: [
      { id: 'wing_it', label: '硬着头皮答', description: '心态 −8,体力 −3', delta: { mood: -8, stamina: -3 }, coefficient: null, coefficientStats: [] },
      { id: 'fake_sick', label: '装病溜号', description: '心态 −3,体力 −2', delta: { mood: -3, stamina: -2 }, coefficient: null, coefficientStats: [] },
    ],
  },
]

const cafeteria: LocationEvent[] = [
  {
    id: 'caf_tips',
    cellType: 'work',
    kind: 'opportunity',
    weight: 2,
    eventMod: 0,
    scaledStats: ['wealth'],
    title: '小费翻倍日',
    text: '校庆客流爆满,经理说今天小费翻倍。',
    choices: [
      { id: 'extra_shift', label: '多接一单', description: '财富 +¥8,000 × 出身系数,体力 −18', delta: { wealth: 8000, stamina: -18 }, coefficient: 'work', coefficientStats: ['wealth'] },
      { id: 'steady_shift', label: '稳定打工', description: '财富 +¥3,000 × 出身系数,体力 −8', delta: { wealth: 3000, stamina: -8 }, coefficient: 'work', coefficientStats: ['wealth'] },
    ],
  },
  {
    id: 'caf_normal',
    cellType: 'work',
    kind: 'neutral',
    weight: 3,
    eventMod: 0,
    scaledStats: ['wealth'],
    title: '普通一班',
    text: '人潮如常,你熟练地打完了这一班。',
    choices: [
      { id: 'routine_shift', label: '例行打工', description: '财富 +¥3,000 × 出身系数,体力 −8', delta: { wealth: 3000, stamina: -8 }, coefficient: 'work', coefficientStats: ['wealth'] },
    ],
  },
  {
    id: 'caf_spill',
    cellType: 'work',
    kind: 'trap',
    weight: 1,
    eventMod: -1,
    scaledStats: ['wealth', 'mood'],
    title: '打翻餐盘',
    text: '高峰期手一滑,一整托盘的餐盘摔了一地。',
    choices: [
      { id: 'own_it', label: '自认倒霉', description: '财富 −¥1,500,心态 −5', delta: { wealth: -1500, mood: -5 }, coefficient: null, coefficientStats: [] },
      { id: 'beg_manager', label: '跟经理求情', description: '财富 −¥800,体力 −5', delta: { wealth: -800, stamina: -5 }, coefficient: null, coefficientStats: [] },
    ],
  },
]

const club: LocationEvent[] = [
  {
    id: 'club_night',
    cellType: 'rest',
    kind: 'opportunity',
    weight: 2,
    eventMod: 0,
    scaledStats: ['mood', 'stamina'],
    title: '社团之夜',
    text: '社团办了场露天电影,大家坐在草坪上聊天到很晚。',
    choices: [
      { id: 'club_activity', label: '尽情玩一场', description: '心态 +15,体力 +出身恢复÷2', delta: { mood: 15, stamina: 0.5 }, coefficient: 'rest', coefficientStats: ['stamina'] },
    ],
  },
  {
    id: 'club_lounge',
    cellType: 'rest',
    kind: 'neutral',
    weight: 3,
    eventMod: 0,
    scaledStats: ['mood', 'stamina'],
    title: '活动室小坐',
    text: '活动室没什么人,你安安静静待了一下午。',
    choices: [
      { id: 'quiet_rest', label: '安静待会儿', description: '心态 +5,体力 +出身恢复', delta: { mood: 5, stamina: 1 }, coefficient: 'rest', coefficientStats: ['stamina'] },
    ],
  },
  {
    id: 'club_drama',
    cellType: 'rest',
    kind: 'trap',
    weight: 1,
    eventMod: -1,
    scaledStats: ['mood', 'stamina'],
    title: '社团矛盾',
    text: '两个部长吵起来了,群里@了所有人站队。',
    choices: [
      { id: 'mediate', label: '出面调解', description: '心态 −10,体力 −5', delta: { mood: -10, stamina: -5 }, coefficient: null, coefficientStats: [] },
      { id: 'lurk', label: '装没看见', description: '心态 −4', delta: { mood: -4 }, coefficient: null, coefficientStats: [] },
    ],
  },
]

// 宿舍: Cell record keeps legacy type 'start', but its events carry cellType 'rest' —
// attribution reads the EVENT's cellType (spec §6), so 宿舍 turns attribute to 情绪.
const dorm: LocationEvent[] = [
  {
    id: 'dorm_roommate',
    cellType: 'rest',
    kind: 'opportunity',
    weight: 2,
    eventMod: 0,
    scaledStats: ['mood', 'stamina'],
    title: '室友带饭',
    text: '室友带了热腾腾的饭回来,还帮你占了浴室。',
    choices: [
      { id: 'good_sleep', label: '好好睡一觉', description: '心态 +8,体力 +出身恢复×1.2', delta: { mood: 8, stamina: 1.2 }, coefficient: 'rest', coefficientStats: ['stamina'] },
    ],
  },
  {
    id: 'dorm_plain',
    cellType: 'rest',
    kind: 'neutral',
    weight: 3,
    eventMod: 0,
    scaledStats: ['stamina', 'mood'],
    title: '平凡一天',
    text: '没课的一天,补了个午觉。',
    choices: [
      { id: 'nap', label: '补个午觉', description: '体力 +出身恢复×0.8,心态 +3', delta: { stamina: 0.8, mood: 3 }, coefficient: 'rest', coefficientStats: ['stamina'] },
    ],
  },
  {
    id: 'dorm_insomnia',
    cellType: 'rest',
    kind: 'trap',
    weight: 1,
    eventMod: -1,
    scaledStats: ['stamina', 'mood'],
    title: '失眠到天亮',
    text: '翻来覆去到凌晨四点,脑子里全是事。',
    choices: [
      { id: 'push_through', label: '硬撑新一天', description: '体力 −12,心态 −6', delta: { stamina: -12, mood: -6 }, coefficient: null, coefficientStats: [] },
    ],
  },
]

// 贵人办公室: NOT weight-drawn. Arrival triggers the v1.1 mentor roll
// (ORIGIN_MENTOR_FREE_HIT_PROB per origin, seeded) and picks hit/miss (spec §3 exception).
// Both entries carry eventMod +1 (preserves v1.1's 贵人+1). Choice ids mentor_hit/mentor_miss
// are load-bearing — mentorHitFromChoiceId decodes them.
export const MENTOR_EVENTS: { hit: LocationEvent; miss: LocationEvent } = {
  hit: {
    id: 'mentor_hit',
    cellType: 'mentor',
    kind: 'opportunity',
    weight: 0,
    eventMod: 1,
    scaledStats: ['cognition', 'mood'],
    title: '贵人指点',
    text: '免费的贵人接住了你 —— 一顿饭换来半小时真东西。',
    choices: [
      { id: 'mentor_hit', label: '虚心求教', description: '认知 +10,心态 +10', delta: { cognition: 10, mood: 10 }, coefficient: null, coefficientStats: [] },
    ],
  },
  miss: {
    id: 'mentor_miss',
    cellType: 'mentor',
    kind: 'neutral',
    weight: 0,
    eventMod: 1,
    scaledStats: ['cognition'],
    title: '贵人不在',
    text: '办公室没人,你在门口留了张字条。',
    choices: [
      { id: 'mentor_miss', label: '留个联系方式', description: '认知 +2(至少认识了个人)', delta: { cognition: 2 }, coefficient: null, coefficientStats: [] },
    ],
  },
}

export const LOCATION_EVENTS: Record<string, LocationEvent[]> = {
  start: dorm,
  library,
  cafeteria,
  club,
  lecture,
  // mentor office uses MENTOR_EVENTS via the probability roll, not this table
}

// v1.3 §1: the 开户 beat — FORCED on turn 1 regardless of which building the player
// clicked (Simulation.arrive intercepts the draw). Investing is a story unlock, not a
// day-one given. weight 0: never part of any location table. scaledStats []: a story
// beat, not tier-scaled. cellType 'learn' so the coach attributes it to 认知.
// Both choices unlock the sim account — no soft-lock.
export const ACCOUNT_OPENING_EVENT: LocationEvent = {
  id: 'open_account',
  cellType: 'learn',
  kind: 'opportunity',
  weight: 0,
  eventMod: 0,
  scaledStats: [],
  title: '第一次听说股市',
  text: '', // filled per arrival building from ACCOUNT_OPENING_FLAVOR at draw time
  choices: [
    {
      id: 'open_sim',
      label: '开个模拟户练练',
      description: '认知 +5 × 出身系数 · 解锁模拟盘',
      delta: { cognition: 5 },
      coefficient: 'learn',
      coefficientStats: ['cognition'],
    },
    {
      id: 'open_watch',
      label: '先听听再说',
      description: '心态 +3 · 解锁模拟盘',
      delta: { mood: 3 },
      coefficient: null,
      coefficientStats: [],
    },
  ],
}

// Per-building flavor text for the 开户 beat — the SAME unlock, witnessed from wherever
// the player happened to walk on turn 1 (keyed by cell id; 'start' = 宿舍).
export const ACCOUNT_OPENING_FLAVOR: Record<string, string> = {
  start: '室友躺在床上刷手机,突然坐起来:"你敢信吗,隔壁寝室老王模拟盘一周赚了 20 个点。"',
  library: '书架转角,一本翻旧了的《聪明的投资者》夹着张纸条:"模拟盘第 3 周,终于看懂 K 线了。"',
  cafeteria: '隔壁桌两个男生拍着桌子争论满仓还是空仓,你端着餐盘听了一整顿饭。',
  club: '社团招新摊位上,投资协会的学长把一张模拟盘大赛传单塞进你手里。',
  lecture: '公开课老师放下粉笔:"这节课不讲理论——每个人回去开一个模拟盘账户,下周交割。"',
  mentor: '贵人的办公室门开着,里面飘出一句话:"先拿模拟盘练。真金白银的事,急什么。"',
}

// v1.4: the 发现贵人 beat — FORCED on the first library visit AFTER the 开户 turn
// (Simulation.arrive intercepts the library draw when !mentorUnlocked). 贵人办公室 is
// outside an ordinary origin's 认知: you literally don't know it exists until you browse
// the library. Same shape as the 开户 beat: weight 0 (never table-drawn), both choices
// unlock, no soft-lock. Unlike 开户 this does NOT skip the invest phase (the account is
// already open by then) — discovery is a normal library turn with a revelation attached.
export const MENTOR_DISCOVERY_EVENT: LocationEvent = {
  id: 'discover_mentor',
  cellType: 'learn',
  kind: 'opportunity',
  weight: 0,
  eventMod: 0,
  scaledStats: ['cognition'],
  title: '海报栏里的发现',
  text: '图书馆海报栏,一堆招新传单底下压着张讲座海报:"校友返校分享 —— 一杯咖啡,换半小时真东西。地点:贵人办公室。"你盯着"贵人"两个字看了很久。',
  choices: [
    {
      id: 'note_address',
      label: '记下地址',
      description: '认知 +6 × 出身系数 · 解锁贵人办公室',
      delta: { cognition: 6 },
      coefficient: 'learn',
      coefficientStats: ['cognition'],
    },
    {
      id: 'ask_librarian',
      label: '向管理员打听',
      description: '认知 +4 × 出身系数,心态 +2 · 解锁贵人办公室',
      delta: { cognition: 4, mood: 2 },
      coefficient: 'learn',
      coefficientStats: ['cognition'],
    },
  ],
}
