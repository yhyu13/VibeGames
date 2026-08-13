// src/engine/sprites/PixelRenderer.ts — 程序化 16×16 像素 sprite 渲染(TDD §9 / §3.5)
//
// 零资产约束:所有 sprite 用 16×16 字符网格 + 调色板描述,运行时用 ImageData
// 栅格化 / 像素块直接画到 canvas 2d(不经过任何图片文件)。
//
// 对外用途:
//   - drawSprite():SceneManager 在场景 canvas 上绘制 16×16 像素块
//   - rasterize():把 sprite 转成 ImageData(可再 putImageData / 上传纹理)
//   - createOcclusionMap():由 RoomLayout 生成遮挡 mask(prepscene 语义:
//     纯白 = 空(透光),非白 = seed(遮光),见 shaders/prepscene.frag)

import { PLAYER_MELEE_ARC_DEG } from '../../core/constants';
import type { EnemyArchetype, FurnitureKind, RoomLayout } from '../../core/types';

/** 16×16 像素 sprite:rows = 16 行 × 每行 16 个字符;palette 把字符映射到 '#rrggbb' */
export interface PixelSprite {
  rows: string[];
  palette: Record<string, string>;
}

/**
 * 角色动画状态(05 §5.1 / §5.2):
 * idle=待机、walk=移动(按 animFps 切帧)、attack=近战(刀光弧由渲染层画)、death=死亡(半透明)。
 */
export type CharacterAnimState = 'idle' | 'walk' | 'attack' | 'death';

/**
 * 每状态的帧序列(05 §5.1 契约)。
 * 注意:该类型与 core/data/sprites.ts(并行会话实现中)同构,数据源 = CHARACTERS 注册表;
 * 磁盘版 sprites.ts 落地后此处可改为 `import type { SpriteFrames } from '../../core/data/sprites'`(结构兼容)。
 */
export interface SpriteFrames {
  idle: PixelSprite[]; // 1 帧
  walk: PixelSprite[]; // 2 帧
  attack: PixelSprite[]; // 1 帧(挥击弧由渲染层画)
  death: PixelSprite[]; // 1 帧
}

/**
 * 角色渲染定义(05 §5.1 契约):
 * id = 玩家或敌人 archetype;anchor = 旋转锚点(几何中心,sprite 网格坐标);
 * outlineColor = §1 描边色(玩家冷青 / 敌人暖色);animFps = walk 帧率。
 */
export interface CharacterDef {
  id: 'player' | EnemyArchetype;
  nameZh: string;
  frames: SpriteFrames;
  outlineColor: string;
  anchor: { x: number; y: number };
  animFps: number;
}

/** 遮挡 mask 里墙的填充色(非纯白 —— 纯白会被 prepscene 当作"空/透光") */
const OCCLUSION_WALL_COLOR: [number, number, number] = [25, 25, 30];
const SPRITE_SIZE = 16;
/** 死亡帧整体不透明度(05 §2.2:0.6) */
const DEATH_ALPHA = 0.6;
/** 刀光弧填充:半透明白(05 §2.2 attack) */
const MELEE_ARC_FILL = 'rgba(255, 255, 255, 0.5)';
/** 刀光弧带宽(sprite 像素单位,叠加在 sprite 外缘) */
const MELEE_ARC_BAND_PX = 2;
/** 面具蒙面像素字符(05 §4:maskThemeColor 只替换 'w' 像素) */
const MASK_PIXEL_CHAR = 'w';
/** 敌人头顶标记尺寸(06 §7 P3:16px 见方) */
const ENEMY_MARKER_SIZE = 16;
/** 敌人头顶标记颜色(06 §7 P3:普通敌人暖橙 / BOSS 警示色) */
const MARKER_TRIANGLE_COLOR = '#ffb066';
const MARKER_DIAMOND_COLOR = '#ff5a3c';
/** 敌人枪口闪光尺寸(06 §7 P3:4px 白块) */
const MUZZLE_FLASH_SIZE = 4;
/** 锁定目标描边脉冲频率(05 §7:3Hz) */
const LOCK_PULSE_HZ = 3;

// ─── v1.1 标志家具(HM 家具集,02-art-direction.md §4.2)───
// 字符网格 = 家具的 tile 占用(每字符 1 tile);cellPx = 渲染时每 tile 的像素。
// 简单几何即可:硬边色块平涂,对照 HM 的纯色家具。
const FURNITURE_ART: Record<FurnitureKind, { art: string[]; palette: Record<string, string> }> = {
  sofa: {
    art: ['kkk', 'asa'],
    palette: { k: '#5a2e1a', a: '#4a2416', s: '#7a4a28' },
  },
  round_table: {
    art: ['tt', 'tt'],
    palette: { t: '#8a5a30' },
  },
  bed: {
    art: ['ppp', 'pwp'],
    palette: { p: '#f0e6d0', w: '#d8b890' },
  },
  bookshelf: {
    art: ['bb', 'bb', 'bb'],
    palette: { b: '#6a4020' },
  },
  plant: {
    art: ['g', 'p'],
    palette: { g: '#2a9a6a', p: '#8a5a30' },
  },
  fridge: {
    art: ['ff', 'fh'],
    palette: { f: '#e8e8f0', h: '#8a8a94' },
  },
  tea_table: {
    art: ['tt', 'tc'],
    palette: { t: '#8a5a30', c: '#e8dca0' },
  },
  mahjong_table: {
    art: ['gg', 'gg'],
    palette: { g: '#2a7a5a' },
  },
  neon_sign: {
    art: ['n', 'n', 'n'],
    palette: { n: '#ff2a44' },
  },
  oil_lamp: {
    art: ['y'],
    palette: { y: '#ffc966' },
  },
  searchlight: {
    art: ['e'],
    palette: { e: '#e0e0ff' },
  },
  sandbag: {
    art: ['s'],
    palette: { s: '#8a6a3a' },
  },
};

export class PixelRenderer {
  /** 固定 16×16 */
  static readonly SPRITE_SIZE = SPRITE_SIZE;

  /**
   * 把 16×16 字符网格栅格化成 ImageData(RGBA)。
   * 未知字符 / 空位 = 透明;颜色字符 = 不透明像素。
   */
  static rasterize(sprite: PixelSprite): ImageData {
    const image = new ImageData(SPRITE_SIZE, SPRITE_SIZE);
    const data = image.data;
    for (let row = 0; row < SPRITE_SIZE; row += 1) {
      const line = sprite.rows[row] ?? '';
      for (let col = 0; col < SPRITE_SIZE; col += 1) {
        const ch = line[col];
        if (ch === undefined) continue;
        const hex = sprite.palette[ch];
        if (hex === undefined) continue;
        const rgb = PixelRenderer.parseHex(hex);
        if (rgb === null) continue;
        const idx = (row * SPRITE_SIZE + col) * 4;
        data[idx] = rgb[0];
        data[idx + 1] = rgb[1];
        data[idx + 2] = rgb[2];
        data[idx + 3] = 255;
      }
    }
    return image;
  }

  /**
   * 把 16×16 sprite 以像素块形式画到 canvas 2d。
   * pixelSize = 每个像素块的实际边长(1 = 16×16 px,2 = 32×32 px,类推)。
   * 像素块用整数对齐 fillRect,保持像素颗粒不被抗锯齿糊掉。
   */
  static drawSprite(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    sprite: PixelSprite,
    pixelSize: number = 1,
  ): void {
    PixelRenderer.drawPixels(ctx, sprite, x, y, Math.max(1, Math.floor(pixelSize)));
  }

  /**
   * 绕 sprite 几何中心旋转绘制(05 §5.2)。
   * x / y = 未旋转时 sprite 包围盒左上角;旋转中心 = 包围盒中心(x + 半宽, y + 半高),
   * 用 Canvas save/translate/rotate/restore 保证不污染调用方变换状态。
   */
  static drawSpriteRotated(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    sprite: PixelSprite,
    pixelSize: number = 1,
    angleRad: number,
  ): void {
    const size = Math.max(1, Math.floor(pixelSize));
    const half = (SPRITE_SIZE * size) / 2;
    ctx.save();
    ctx.translate(x + half, y + half);
    ctx.rotate(angleRad);
    PixelRenderer.drawPixels(ctx, sprite, -half, -half, size);
    ctx.restore();
  }

  /**
   * 外圈 1px 亮描边(05 §1 / §5.2):遍历 sprite 非透明像素的 4 邻域(上/下/左/右),
   * 邻域为空像素(透明或越界)处补 1 格描边块 —— 暗背景上保证角色可辨认。
   * 描边色由调用方传入(def.outlineColor:玩家冷青 / 敌人暖色),不入 sprite 数据。
   */
  static drawOutline(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    sprite: PixelSprite,
    pixelSize: number = 1,
    colorHex: string,
  ): void {
    const size = Math.max(1, Math.floor(pixelSize));
    ctx.fillStyle = colorHex;
    for (let row = 0; row < SPRITE_SIZE; row += 1) {
      for (let col = 0; col < SPRITE_SIZE; col += 1) {
        if (!PixelRenderer.isOpaqueAt(sprite, row, col)) continue;
        if (!PixelRenderer.isOpaqueAt(sprite, row - 1, col)) {
          ctx.fillRect(x + col * size, y + (row - 1) * size, size, size);
        }
        if (!PixelRenderer.isOpaqueAt(sprite, row + 1, col)) {
          ctx.fillRect(x + col * size, y + (row + 1) * size, size, size);
        }
        if (!PixelRenderer.isOpaqueAt(sprite, row, col - 1)) {
          ctx.fillRect(x + (col - 1) * size, y + row * size, size, size);
        }
        if (!PixelRenderer.isOpaqueAt(sprite, row, col + 1)) {
          ctx.fillRect(x + (col + 1) * size, y + row * size, size, size);
        }
      }
    }
  }

  /**
   * 角色绘制(05 §5.2 契约):描边 → 旋转 → sprite;walk 帧按 animFps 切帧;
   * attack 时叠加 60° 半透明白刀光弧(PLAYER_MELEE_ARC_DEG,渲染层画);
   * death 时整体不透明度 0.6(05 §2.2)。
   * maskThemeColor 仅玩家生效:把蒙面 'w' 像素替换为面具主题色(05 §4),围巾/描边不变。
   * 整组(描边 + sprite + 刀光弧)统一绕 def.anchor 旋转,朝向跟随 facingAngle。
   */
  static drawCharacter(
    ctx: CanvasRenderingContext2D,
    def: CharacterDef,
    state: CharacterAnimState,
    facingAngle: number,
    x: number,
    y: number,
    pixelSize: number = 1,
    maskThemeColor?: string,
  ): void {
    const size = Math.max(1, Math.floor(pixelSize));
    const sprite = PixelRenderer.pickFrame(def, state);
    // anchor = 旋转锚点(几何中心,sprite 网格坐标);+0.5 取该格像素块的中心
    const anchorX = Math.min(SPRITE_SIZE - 1, Math.max(0, def.anchor.x)) + 0.5;
    const anchorY = Math.min(SPRITE_SIZE - 1, Math.max(0, def.anchor.y)) + 0.5;
    // §4 面具主题色仅替换玩家蒙面('w' 像素)
    const themeColor = maskThemeColor !== undefined && def.id === 'player' ? maskThemeColor : undefined;

    ctx.save();
    ctx.translate(x + anchorX * size, y + anchorY * size);
    ctx.rotate(facingAngle);
    if (state === 'death') ctx.globalAlpha = DEATH_ALPHA;
    // 05 §5.2 顺序:描边 → 旋转 → sprite;attack 刀光弧最后画(覆盖在角色前方)
    PixelRenderer.drawOutline(ctx, -anchorX * size, -anchorY * size, sprite, size, def.outlineColor);
    PixelRenderer.drawPixels(ctx, sprite, -anchorX * size, -anchorY * size, size, themeColor);
    if (state === 'attack') PixelRenderer.drawMeleeArc(ctx, size);
    ctx.restore();
  }

  /**
   * 由房间布局生成遮挡 mask(ImageData)。
   * 墙 '#' / 静态掩体 'X' → 非纯白种子色(遮光);其余(地板 / 门 / 灯位)→ 黑色种子。
   * pxPerTile = 每 tile 的像素数(由调用方按相机缩放换算)。
   */
  static createOcclusionMap(room: RoomLayout, pxPerTile: number): ImageData {
    const tile = Math.max(1, Math.round(pxPerTile));
    const width = Math.max(1, room.width * tile);
    const height = Math.max(1, room.height * tile);
    const image = new ImageData(width, height);
    const data = image.data;
    for (let row = 0; row < room.height; row += 1) {
      const line = room.tiles[row] ?? '';
      for (let col = 0; col < room.width; col += 1) {
        const ch = line[col] ?? '.';
        const blocks = ch === '#' || ch === 'X';
        const r = blocks ? OCCLUSION_WALL_COLOR[0] : 0;
        const g = blocks ? OCCLUSION_WALL_COLOR[1] : 0;
        const b = blocks ? OCCLUSION_WALL_COLOR[2] : 0;
        for (let dy = 0; dy < tile; dy += 1) {
          for (let dx = 0; dx < tile; dx += 1) {
            const idx = ((row * tile + dy) * width + col * tile + dx) * 4;
            data[idx] = r;
            data[idx + 1] = g;
            data[idx + 2] = b;
            data[idx + 3] = 255;
          }
        }
      }
    }
    return image;
  }

  /**
   * 像素块绘制核心(全部公开绘制 API 的共用底层):
   * maskThemeColor 传入时,蒙面 'w' 像素替换为面具主题色(05 §4),其余颜色不变。
   */
  private static drawPixels(
    ctx: CanvasRenderingContext2D,
    sprite: PixelSprite,
    x: number,
    y: number,
    size: number,
    maskThemeColor?: string,
  ): void {
    for (let row = 0; row < SPRITE_SIZE; row += 1) {
      const line = sprite.rows[row] ?? '';
      for (let col = 0; col < SPRITE_SIZE; col += 1) {
        const ch = line[col];
        if (ch === undefined) continue;
        const base = sprite.palette[ch];
        if (base === undefined) continue;
        const color = maskThemeColor !== undefined && ch === MASK_PIXEL_CHAR ? maskThemeColor : base;
        ctx.fillStyle = color;
        ctx.fillRect(x + col * size, y + row * size, size, size);
      }
    }
  }

  /** 该格是否为不透明像素(越界 / 空字符 / 无调色板映射 = 透明) */
  private static isOpaqueAt(sprite: PixelSprite, row: number, col: number): boolean {
    if (row < 0 || col < 0 || row >= SPRITE_SIZE || col >= SPRITE_SIZE) return false;
    const ch = sprite.rows[row]?.[col];
    if (ch === undefined) return false;
    return sprite.palette[ch] !== undefined;
  }

  /**
   * 按状态取帧(05 §2.2 / §5.2):
   * walk 以 def.animFps(默认 4 fps)按时钟切帧,保证帧率稳定;
   * 帧缺失时逐级回退到 idle → walk → attack → death。
   */
  private static pickFrame(def: CharacterDef, state: CharacterAnimState): PixelSprite {
    const fallback =
      def.frames.idle[0] ??
      def.frames.walk[0] ??
      def.frames.attack[0] ??
      def.frames.death[0];
    switch (state) {
      case 'idle':
        return def.frames.idle[0] ?? fallback;
      case 'walk': {
        const walk = def.frames.walk;
        if (walk.length === 0) return fallback;
        const frameIndex = Math.floor((performance.now() / 1000) * def.animFps) % walk.length;
        return walk[frameIndex];
      }
      case 'attack':
        return PixelRenderer.cycleFrames(def.frames.attack, 12) ?? fallback;
      case 'death':
        return def.frames.death[0] ?? fallback;
      default:
        return fallback;
    }
  }

  /** B26:按给定 fps 循环切帧(attack 突刺 12fps;walk 走 def.animFps) */
  private static cycleFrames(frames: PixelSprite[], fps: number): PixelSprite | undefined {
    if (frames.length === 0) return undefined;
    const frameIndex = Math.floor((performance.now() / 1000) * fps) % frames.length;
    return frames[frameIndex];
  }

  /**
   * 敌人头顶悬浮标记(06 §7 P3):16px 见方,锚定在 (x, y) 左上角。
   * normal = 暖橙 #ffb066 三角(boss 以外的 archetype);boss = 警示色 #ff5a3c 菱形。
   */
  static drawEnemyMarker(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    kind: 'normal' | 'boss',
  ): void {
    const size = ENEMY_MARKER_SIZE;
    const cx = x + size / 2;
    const topY = y;
    const bottomY = y + size;
    const midY = y + size / 2;
    ctx.beginPath();
    if (kind === 'boss') {
      ctx.moveTo(cx, topY);
      ctx.lineTo(cx + size / 2, midY);
      ctx.lineTo(cx, bottomY);
      ctx.lineTo(cx - size / 2, midY);
      ctx.closePath();
      ctx.fillStyle = MARKER_DIAMOND_COLOR;
    } else {
      ctx.moveTo(cx, topY);
      ctx.lineTo(cx + size / 2, bottomY);
      ctx.lineTo(cx - size / 2, bottomY);
      ctx.closePath();
      ctx.fillStyle = MARKER_TRIANGLE_COLOR;
    }
    ctx.fill();
  }

  /**
   * 敌人枪口闪光(06 §7 P3):4px 白色实心块,中心锚定 (x, y)。
   * 由调用方按 facingAngle 把中心推到 sprite 前缘,持续 2 帧由调用方控制。
   */
  static drawMuzzleFlash(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    const s = MUZZLE_FLASH_SIZE;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x - s / 2, y - s / 2, s, s);
  }

  /**
   * 锁定目标脉冲描边辅助(06 §7 P3 / 05 §7 提前到 M1):
   * 以 def.outlineColor 之外的自定义色(#ff5a3c)按 3Hz 正弦脉动透明度,
   * 绕角色外圈补一层 1px 描边(叠加在原有描边之上,不重复绘制角色本体)。
   * phaseSec = 脉冲相位时钟(performance.now()/1000,由调用方传入)。
   */
  static drawLockOutline(
    ctx: CanvasRenderingContext2D,
    sprite: PixelSprite,
    x: number,
    y: number,
    pixelSize: number,
    phaseSec: number,
  ): void {
    const size = Math.max(1, Math.floor(pixelSize));
    const pulse = 0.45 + 0.55 * Math.abs(Math.sin((phaseSec * LOCK_PULSE_HZ) * 2 * Math.PI));
    ctx.save();
    ctx.globalAlpha = pulse;
    PixelRenderer.drawOutline(ctx, x, y, sprite, size, MARKER_DIAMOND_COLOR);
    ctx.restore();
  }

  /**
   * 近战刀光弧(05 §2.2 attack / §5.2 渲染层画):
   * 以角色中心为圆心、PLAYER_MELEE_ARC_DEG 张角(±半角)的环形扇区,
   * 覆盖在角色前方(本地坐标 -Y 方向,facingAngle 已由旋转矩阵带入),半透明白。
   */
  private static drawMeleeArc(ctx: CanvasRenderingContext2D, size: number): void {
    const half = (SPRITE_SIZE * size) / 2;
    const halfArc = ((PLAYER_MELEE_ARC_DEG / 2) * Math.PI) / 180;
    ctx.beginPath();
    ctx.arc(0, 0, half + MELEE_ARC_BAND_PX * size, -Math.PI / 2 - halfArc, -Math.PI / 2 + halfArc, false);
    ctx.arc(0, 0, half, -Math.PI / 2 + halfArc, -Math.PI / 2 - halfArc, true);
    ctx.closePath();
    ctx.fillStyle = MELEE_ARC_FILL;
    ctx.fill();
  }

  /**
   * v1.1 标志家具绘制(02-art-direction.md §4.2;HM 家具集):
   * 把 FURNITURE_ART 字符网格以硬边色块平涂画到 canvas 2d。
   * (x, y) = 家具左上角像素;cellPx = 每 tile 的像素边长(世界 1u → 屏幕 px);
   * 每字符一格 tile,宽高即家具的 tile 占用(沙发 3×2、圆桌 2×2 ...)。
   */
  static drawFurniture(
    ctx: CanvasRenderingContext2D,
    kind: FurnitureKind,
    x: number,
    y: number,
    cellPx: number,
  ): void {
    const def = FURNITURE_ART[kind];
    if (def === undefined) return;
    const cell = Math.max(1, Math.round(cellPx));
    const rows = def.art;
    for (let row = 0; row < rows.length; row += 1) {
      const line = rows[row] ?? '';
      for (let col = 0; col < line.length; col += 1) {
        const hex = def.palette[line[col]];
        if (hex === undefined) continue;
        ctx.fillStyle = hex;
        ctx.fillRect(Math.round(x) + col * cell, Math.round(y) + row * cell, cell, cell);
      }
    }
  }

  /** '#rrggbb' → [r, g, b](0..255);非法输入返回 null */
  private static parseHex(hex: string): [number, number, number] | null {
    const m = /^#([0-9a-fA-F]{6})$/.exec(hex.trim());
    if (m === null) return null;
    const n = Number.parseInt(m[1], 16);
    return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
  }
}
