// src/core/data/sprites.ts — 角色像素数据(权威:docs/design/05-character-design.md §2/§3)
//
// 纯数据文件(core/ 平台纯净):零 THREE / 零 DOM / 零 engine 导入。
// 结构兼容 engine/sprites/PixelRenderer.ts 的 PixelSprite({ rows, palette }),
// 渲染层(drawCharacter)负责:描边 / 旋转 / 面具蒙面色替换 / 刀光弧叠加。
// 描边色不入像素,见 §1 可读性表(玩家冷青 #8ab4ff / 敌人暖橙 #ffb066 / boss 警示 #ff5a3c)。
//
// 约定:
// - 每帧 rows = 16 行 × 每行 16 字符;'.' = 透明。
// - 顶视角对称骨架:帽 + 头肩 + 躯干(§2/§3)。
// - walk 2 帧:帧 B = 肩部整体 1px 平移(玩家另加围巾尾 1px 摆动,§2.2)。
// - attack 帧 = idle 帧(挥击刀光弧由渲染层画,§2.2/§5.2)。
// - death 帧 = 整体压扁的尸堆(不透明度 0.6 由渲染层处理)。

import type { EnemyArchetype } from '../types';

// B26:程序化派生动画帧(纯数据,不触 engine)
// strideFrame:底部 4 行(腿部)左右平移 1px → walk C/D 步幅帧
function strideFrame(base: PixelSprite, dx: -1 | 1): PixelSprite {
  const rows = base.rows.map((row, i) => {
    if (i < base.rows.length - 4) return row;
    const chars = row.split('');
    if (dx > 0) return ['.', ...chars.slice(0, -1)].join('');
    return [...chars.slice(1), '.'].join('');
  });
  return { rows, palette: base.palette };
}

// lungeFrame:躯干(第 4-9 行)前移 1px、腿部(第 10-13 行)后错 1px → 攻击突刺帧
function lungeFrame(base: PixelSprite): PixelSprite {
  const rows = base.rows.map((row, i) => {
    if (i >= 4 && i <= 9) return ['.', ...row.slice(0, -1)].join('');
    if (i >= 10 && i <= 13) return [...row.slice(1), '.'].join('');
    return row;
  });
  return { rows, palette: base.palette };
}

// ─── 结构兼容类型(本地定义,不 import engine)───

/** 16×16 像素帧:rows = 16 行 × 16 字符;palette 把字符映射到 '#rrggbb' */
export interface PixelSprite {
  rows: string[];
  palette: Record<string, string>;
}

/** 四态动画帧组(§5.1 契约):idle 1 帧 / walk 2 帧 / attack 1 帧 / death 1 帧 */
export interface SpriteFrames {
  idle: PixelSprite[];
  walk: PixelSprite[];
  attack: PixelSprite[];
  death: PixelSprite[];
}

/** 角色定义(§5.1 契约):描边色 / 旋转锚点 / walk 帧率 */
export interface CharacterDef {
  id: 'player' | EnemyArchetype;
  nameZh: string;
  frames: SpriteFrames;
  outlineColor: string; // §1 描边色(玩家冷 / 敌人暖)
  anchor: { x: number; y: number }; // 旋转锚点(几何中心)
  animFps: number; // walk 帧率
}

// ─── 玩家:地下抵抗线人(§2.1 冻结像素图)───
// k = 风衣 PAL_INK #0a0910 / c = 钢灰礼帽 PAL_STEEL #4a4a52
// w = 米色蒙面 PAL_IVORY #f5e6b8(面具激活时由渲染层替换为主题色)
// r = 灯笼红围巾 PAL_LANTERN #e54a1a(亮色锚点,v1.1 新灯笼红)/ d = 风衣亮褶 #2e2c3a(第三档)

const PLAYER_PALETTE: Record<string, string> = {
  k: '#0a0910',
  c: '#4a4a52',
  w: '#f5e6b8',
  r: '#e54a1a',
  d: '#2e2c3a',
};

const PLAYER_IDLE: PixelSprite = {
  rows: [
    '................',
    '......kccc......',
    '....kccccck.....',
    '....kccwwwwk....',
    '....kwwwwwwk....',
    '....kwwwwwwk....',
    '....kkkkkkkk....',
    '.....kkkkkk.....',
    '....kkkkkkkk....',
    '....krrkkrrk....',
    '.....kkkkkk.....',
    '....kkkkkkkk....',
    '....kkkkkkkk....',
    '....dddddddd....',
    '................',
    '................',
  ],
  palette: PLAYER_PALETTE,
};

// 帧 B:肩部(第 6-10 行)右移 1px + 围巾尾右摆 1px(§2.2)
const PLAYER_WALK_B: PixelSprite = {
  rows: [
    '................',
    '......kccc......',
    '....kccccck.....',
    '....kccwwwwk....',
    '....kwwwwwwk....',
    '....kwwwwwwk....',
    '.....kkkkkkkk...',
    '......kkkkkk....',
    '.....kkkkkkkk...',
    '.....krrkkrrk...',
    '......kkkkkk....',
    '....kkkkkkkk....',
    '....kkkkkkkk....',
    '....dddddddd....',
    '................',
    '................',
  ],
  palette: PLAYER_PALETTE,
};

// death:整体压扁的尸堆(围巾散落 + 衣褶,占底部约 1/3 高)
const PLAYER_DEATH: PixelSprite = {
  rows: [
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '.....kkkkkk.....',
    '....kkkkkkkk....',
    '...kkddkkddkk...',
    '...krrkddkrrk...',
    '....dddddddd....',
    '................',
    '................',
  ],
  palette: PLAYER_PALETTE,
};

// ─── soldier 占领军(§3.1):钢盔 + 右肩袖章红 + 左胸金徽记 ───
// h = 军绿钢灰 #5a6352 / H = 亮档 #7c8a6a / d = 暗档 #3a4034
// f = 肤色 #c8a88a / a = 袖章红 PAL_BLOOD #d8201a / g = 徽记金 PAL_PAPER #e8dca0

const SOLDIER_PALETTE: Record<string, string> = {
  h: '#5a6352',
  H: '#7c8a6a',
  d: '#3a4034',
  f: '#c8a88a',
  a: '#d8201a',
  g: '#e8dca0',
};

const SOLDIER_IDLE: PixelSprite = {
  rows: [
    '................',
    '......hhhh......',
    '.....hhHhhh.....',
    '....hhhHhhhh....',
    '....dffffffd....',
    '....dffffffd....',
    '....dddddddd....',
    '....hhhhhhaa....',
    '....hHhHhHhH....',
    '....gHhHhHhH....',
    '....hhhhhhhh....',
    '....hhhHhhhh....',
    '....dddddddd....',
    '....dddddddd....',
    '................',
    '................',
  ],
  palette: SOLDIER_PALETTE,
};

// 帧 B:肩部(第 6-11 行)右移 1px
const SOLDIER_WALK_B: PixelSprite = {
  rows: [
    '................',
    '......hhhh......',
    '.....hhHhhh.....',
    '....hhhHhhhh....',
    '....dffffffd....',
    '....dffffffd....',
    '.....dddddddd...',
    '.....hhhhhhaa...',
    '.....hHhHhHhH...',
    '.....gHhHhHhH...',
    '.....hhhhhhhh...',
    '.....hhhHhhhh...',
    '....dddddddd....',
    '....dddddddd....',
    '................',
    '................',
  ],
  palette: SOLDIER_PALETTE,
};

const SOLDIER_DEATH: PixelSprite = {
  rows: [
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '.....hhhhhh.....',
    '....hhhhhhhh....',
    '...hhHhHhaHhh...',
    '...gHhdHhdHhh...',
    '....dddddddd....',
    '................',
    '................',
  ],
  palette: SOLDIER_PALETTE,
};

// ─── policeman 伪警(§3.2):大盖帽(帽檐 2px 亮)+ 白手套 + 斜挂警棍 ───
// u = 墨蓝黑 #2a2f3a / U = 亮档 #4a5268 / v = 暗档 #181c26
// f = 肤色 #c8a88a / g = 白手套 PAL_IVORY #f5e6b8 / b = 警棍 PAL_RUST #7a2a1c

const POLICEMAN_PALETTE: Record<string, string> = {
  u: '#2a2f3a',
  U: '#4a5268',
  v: '#181c26',
  f: '#c8a88a',
  g: '#f5e6b8',
  b: '#7a2a1c',
};

const POLICEMAN_IDLE: PixelSprite = {
  rows: [
    '................',
    '.....uuuuuu.....',
    '....uuuuuuuu....',
    '....UUUUUUUU....',
    '....UUUUUUUU....',
    '....vffffffv....',
    '....vffffffv....',
    '....vvvvvvvv....',
    '....uuuuuuuu....',
    '....uuUuUuUu....',
    '....uuUuuUuu....',
    '....buuuuuuu....',
    '....ubuuuuuu....',
    '...gvvvvvvvvg...',
    '................',
    '................',
  ],
  palette: POLICEMAN_PALETTE,
};

// 帧 B:肩部(第 7-12 行)右移 1px
const POLICEMAN_WALK_B: PixelSprite = {
  rows: [
    '................',
    '.....uuuuuu.....',
    '....uuuuuuuu....',
    '....UUUUUUUU....',
    '....UUUUUUUU....',
    '....vffffffv....',
    '....vffffffv....',
    '.....vvvvvvvv...',
    '.....uuuuuuuu...',
    '.....uuUuUuUu...',
    '.....uuUuuUuu...',
    '.....buuuuuuu...',
    '.....ubuuuuuu...',
    '...gvvvvvvvvg...',
    '................',
    '................',
  ],
  palette: POLICEMAN_PALETTE,
};

const POLICEMAN_DEATH: PixelSprite = {
  rows: [
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '.....uuuuuu.....',
    '....uuuuuuuu....',
    '...uuUbuUbuuu...',
    '...gUvvvvvvUg...',
    '....vvvvvvvv....',
    '................',
    '................',
  ],
  palette: POLICEMAN_PALETTE,
};

// ─── spy 特务(§3.3):礼帽 + 墨镜 + 深红领带 + 米色风衣 ───
// m = 风衣主色 #c8b898 / M = 亮档 PAL_IVORY #f5e6b8 / t = 暗档 #8a7c66
// c = 礼帽 PAL_STEEL #4a4a52 / e = 墨镜 PAL_INK #0a0910 / a = 领带红 PAL_BLOOD #d8201a
// f = 肤色 #c8a88a

const SPY_PALETTE: Record<string, string> = {
  m: '#c8b898',
  M: '#f5e6b8',
  t: '#8a7c66',
  c: '#4a4a52',
  e: '#0a0910',
  a: '#d8201a',
  f: '#c8a88a',
};

const SPY_IDLE: PixelSprite = {
  rows: [
    '................',
    '......cccc......',
    '....cccccccc....',
    '....cccccccc....',
    '....ee....ee....',
    '....tfffffft....',
    '....tttttttt....',
    '....mmmmmmmm....',
    '....mMmMmMmM....',
    '....mammammm....',
    '....mmmmmmmm....',
    '....mMmmMmmM....',
    '....tttttttt....',
    '....tttttttt....',
    '................',
    '................',
  ],
  palette: SPY_PALETTE,
};

// 帧 B:肩部(第 6-11 行)右移 1px
const SPY_WALK_B: PixelSprite = {
  rows: [
    '................',
    '......cccc......',
    '....cccccccc....',
    '....cccccccc....',
    '....ee....ee....',
    '....tfffffft....',
    '.....tttttttt...',
    '.....mmmmmmmm...',
    '.....mMmMmMmM...',
    '.....mammammm...',
    '.....mmmmmmmm...',
    '.....mMmmMmmM...',
    '....tttttttt....',
    '....tttttttt....',
    '................',
    '................',
  ],
  palette: SPY_PALETTE,
};

const SPY_DEATH: PixelSprite = {
  rows: [
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '.....mmmmmm.....',
    '....mmmmmmmm....',
    '...mmamMtammm...',
    '...ttMmttMmmt...',
    '....tttttttt....',
    '................',
    '................',
  ],
  palette: SPY_PALETTE,
};

// ─── boss 特务长(§3.4):高帽 + 金肩章 + 金边大衣(描边警示色 #ff5a3c)───
// o = 大衣主色 #1e1c24 / O = 亮档 #3a3646 / n = 暗档 PAL_INK #0a0910
// g = 金边 PAL_PAPER #e8dca0(肩章 / 大衣下摆 2px)/ f = 肤色 #c8a88a

const BOSS_PALETTE: Record<string, string> = {
  o: '#1e1c24',
  O: '#3a3646',
  n: '#0a0910',
  g: '#e8dca0',
  f: '#c8a88a',
};

const BOSS_IDLE: PixelSprite = {
  rows: [
    '................',
    '......oooo......',
    '.....oooooo.....',
    '.....oooooo.....',
    '.....oooooo.....',
    '....oooooooo....',
    '....nffffffn....',
    '....nnnnnnnn....',
    '....ggoooooo....',
    '....oOoOoOoO....',
    '....oooooooo....',
    '....oOoOoOoO....',
    '....gggggggg....',
    '....gggggggg....',
    '................',
    '................',
  ],
  palette: BOSS_PALETTE,
};

// 帧 B:肩部(第 7-11 行)右移 1px(金边下摆不动)
const BOSS_WALK_B: PixelSprite = {
  rows: [
    '................',
    '......oooo......',
    '.....oooooo.....',
    '.....oooooo.....',
    '.....oooooo.....',
    '....oooooooo....',
    '....nffffffn....',
    '.....nnnnnnnn...',
    '.....ggoooooo...',
    '.....oOoOoOoO...',
    '.....oooooooo...',
    '.....oOoOoOoO...',
    '....gggggggg....',
    '....gggggggg....',
    '................',
    '................',
  ],
  palette: BOSS_PALETTE,
};

const BOSS_DEATH: PixelSprite = {
  rows: [
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '.....oooooo.....',
    '....oooooooo....',
    '...oOoOgOoOoo...',
    '...gggggggggg...',
    '....gggggggg....',
    '................',
    '................',
  ],
  palette: BOSS_PALETTE,
};

// ─── CHARACTERS 注册表(§5.1:Record<'player' | EnemyArchetype, CharacterDef>)───
// 描边色 §1 表:玩家 #8ab4ff(冷青)/ soldier·policeman·spy·flashlight_patrol #ffb066(暖橙)/ boss #ff5a3c(警示)
// 旋转锚点 = 几何中心 (8, 8);walk 帧率统一 4 fps(§2.2)

export const CHARACTERS: Record<'player' | EnemyArchetype, CharacterDef> = {
  player: {
    id: 'player',
    nameZh: '线人',
    frames: {
      idle: [PLAYER_IDLE],
      walk: [PLAYER_IDLE, PLAYER_WALK_B, strideFrame(PLAYER_WALK_B, 1), strideFrame(PLAYER_WALK_B, -1)],
      attack: [PLAYER_IDLE, lungeFrame(PLAYER_IDLE)],
      death: [PLAYER_DEATH],
    },
    outlineColor: '#8ab4ff',
    anchor: { x: 8, y: 8 },
    animFps: 6,
  },
  soldier: {
    id: 'soldier',
    nameZh: '占领军',
    frames: {
      idle: [SOLDIER_IDLE],
      walk: [SOLDIER_IDLE, SOLDIER_WALK_B, strideFrame(SOLDIER_WALK_B, 1), strideFrame(SOLDIER_WALK_B, -1)],
      attack: [SOLDIER_IDLE, lungeFrame(SOLDIER_IDLE)],
      death: [SOLDIER_DEATH],
    },
    outlineColor: '#ffb066',
    anchor: { x: 8, y: 8 },
    animFps: 6,
  },
  policeman: {
    id: 'policeman',
    nameZh: '伪警',
    frames: {
      idle: [POLICEMAN_IDLE],
      walk: [POLICEMAN_IDLE, POLICEMAN_WALK_B, strideFrame(POLICEMAN_WALK_B, 1), strideFrame(POLICEMAN_WALK_B, -1)],
      attack: [POLICEMAN_IDLE, lungeFrame(POLICEMAN_IDLE)],
      death: [POLICEMAN_DEATH],
    },
    outlineColor: '#ffb066',
    anchor: { x: 8, y: 8 },
    animFps: 6,
  },
  spy: {
    id: 'spy',
    nameZh: '特务',
    frames: {
      idle: [SPY_IDLE],
      walk: [SPY_IDLE, SPY_WALK_B, strideFrame(SPY_WALK_B, 1), strideFrame(SPY_WALK_B, -1)],
      attack: [SPY_IDLE, lungeFrame(SPY_IDLE)],
      death: [SPY_DEATH],
    },
    outlineColor: '#ffb066',
    anchor: { x: 8, y: 8 },
    animFps: 6,
  },
  // v3.1(2026-08-09):flashlight_patrol 先用巡捕骨架占位,正式 sprite 走 07 §2 流水线(M1.6+)
  flashlight_patrol: {
    id: 'flashlight_patrol',
    nameZh: '巡逻兵',
    frames: {
      idle: [POLICEMAN_IDLE],
      walk: [POLICEMAN_IDLE, POLICEMAN_WALK_B, strideFrame(POLICEMAN_WALK_B, 1), strideFrame(POLICEMAN_WALK_B, -1)],
      attack: [POLICEMAN_IDLE, lungeFrame(POLICEMAN_IDLE)],
      death: [POLICEMAN_DEATH],
    },
    outlineColor: '#ffb066',
    anchor: { x: 8, y: 8 },
    animFps: 6,
  },
  boss: {
    id: 'boss',
    nameZh: '特务长',
    frames: {
      idle: [BOSS_IDLE],
      walk: [BOSS_IDLE, BOSS_WALK_B, strideFrame(BOSS_WALK_B, 1), strideFrame(BOSS_WALK_B, -1)],
      attack: [BOSS_IDLE, lungeFrame(BOSS_IDLE)],
      death: [BOSS_DEATH],
    },
    outlineColor: '#ff5a3c',
    anchor: { x: 8, y: 8 },
    animFps: 6,
  },
};
