// src/dev/phasePreview.ts — DEV-only 阶段预览(2026-08-09,P4 起)
// 用途:正式 SceneManager(P6)恢复前,用真实 core Simulation + engine/InputManager
// 在浏览器里玩当前 phase(移动 / 瞄准 / 拆灯),可视化 lightField / 灯状态 / 事件流。
// 非 ship 代码:只服务 playtest + 截图门(scripts/phase-playtest.mjs,用户指令 2026-08-09)。
// 页面:phase-preview.html(dev server 直接访问)。

import { Simulation } from '../core/simulation/Simulation.ts';
import { InputManager } from '../engine/InputManager.ts';
import { installDevtools } from '../engine/devtools.ts';
import type { SimEvent, Vec2 } from '../core/types.ts';
import { CHARACTERS, LAMP_SPRITES, type PixelSprite } from '../core/data/sprites.ts';
import {
  ENEMY_VIEW_DISTANCE,
  FLASHLIGHT_CONE_ARC_DEG,
  LMB_LIGHT_PRIORITY_RANGE,
  PAL_INK,
  PAL_LANTERN,
  PAL_MUZZLE,
  PAL_PAPER,
  PAL_STEEL,
  PAL_WALL_RED_BRICK,
  STRIPE_HEIGHT,
} from '../core/constants.ts';
import { angleToVec, degToRad } from '../core/math.ts';

// ─── 渲染常量 ───
const TILE_PX = 48;      // 1u = 48px(10×9 房 → 480×432,居中于 960×540)
const SPRITE_PX = 3;     // 16×16 精灵 → 48px(与 1 tile 同尺寸)
const LAMP_GLOW_RGB = '255,201,102';
const CONE_RGB = '255,176,102';
const PHASE_LABEL = 'P4-P5 拆灯 · 击杀 · 死亡';

const canvas = document.getElementById('preview') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!; // dev 预览页:拿不到 2d context 时整页直接抛错即可
const hudEl = document.getElementById('hud');

// ─── 可变状态(restart 时整体替换)───
let sim = new Simulation();
let input = new InputManager();
let last = performance.now();
let acc = 0;
let flashWhite = 0;
let flashRed = 0;
let seenEvents = 0;

const FIXED_DT = 1 / 60;

function restart(): void {
  sim = new Simulation();
  input.detach();
  input = new InputManager();
  input.attach(canvas);
  installDevtools(sim);
  last = performance.now();
  acc = 0;
  flashWhite = 0;
  flashRed = 0;
  seenEvents = 0;
}

// 暴露给 Playwright 驱动(重开 / 读 sim)
declare global {
  interface Window {
    __phasePreview?: { restart(): void; getSim(): Simulation };
  }
}
window.__phasePreview = { restart, getSim: () => sim };

input.attach(canvas);
installDevtools(sim);

// ─── 世界 → 屏幕 ───
function roomOffset(): { ox: number; oy: number } {
  const room = sim.snapshot().currentRoom;
  const w = (room?.width ?? 10) * TILE_PX;
  const h = (room?.height ?? 9) * TILE_PX;
  return { ox: Math.round((canvas.width - w) / 2), oy: Math.round((canvas.height - h) / 2) };
}

function toPx(world: Vec2): Vec2 {
  const { ox, oy } = roomOffset();
  return { x: ox + world.x * TILE_PX, y: oy + world.y * TILE_PX };
}

function drawPixelSprite(sprite: PixelSprite, x: number, y: number, ps: number): void {
  sprite.rows.forEach((row, iy) => {
    for (let ix = 0; ix < row.length; ix += 1) {
      const ch = row[ix];
      if (ch === '.') continue;
      const color = sprite.palette[ch];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(Math.round(x + ix * ps), Math.round(y + iy * ps), ps, ps);
    }
  });
}

function drawRoom(): void {
  const snap = sim.snapshot();
  const room = snap.currentRoom;
  if (!room) return;
  const { ox, oy } = roomOffset();
  const ts = room.tileSize * TILE_PX;
  for (let ty = 0; ty < room.height; ty += 1) {
    const row = room.tiles[ty] ?? '';
    for (let tx = 0; tx < room.width; tx += 1) {
      const ch = row[tx] ?? '.';
      const x = ox + tx * ts;
      const y = oy + ty * ts;
      if (ch === '#') {
        ctx.fillStyle = PAL_WALL_RED_BRICK;
        ctx.fillRect(x, y, ts, ts);
        ctx.fillStyle = 'rgba(10,9,16,0.25)';
        ctx.fillRect(x, y, ts, 2);
      } else if (ch === 'X') {
        ctx.fillStyle = PAL_STEEL;
        ctx.fillRect(x, y, ts, ts);
      } else if (ch === 'D') {
        ctx.fillStyle = PAL_PAPER;
        ctx.fillRect(x, y, ts, ts);
        ctx.fillStyle = PAL_LANTERN;
        ctx.fillRect(x + ts * 0.11, y + ts * 0.11, ts * 0.78, ts * 0.78);
      } else {
        const pal = room.floorPalette ?? ['#3a1410', '#050408'];
        const band = Math.floor((ty * room.tileSize) / STRIPE_HEIGHT) % pal.length;
        ctx.fillStyle = pal[band] ?? '#3a1410';
        ctx.fillRect(x, y, ts, ts);
      }
    }
  }
}

/** 几何光场真实采样(0.5u 网格)叠加为暖色光池 —— 拆灯后的 0.3s 坍缩可见 */
function drawLightPool(): void {
  const room = sim.snapshot().currentRoom;
  if (!room) return;
  const { ox, oy } = roomOffset();
  const cell = TILE_PX / 2;
  for (let wy = 0; wy < room.height * 2; wy += 1) {
    for (let wx = 0; wx < room.width * 2; wx += 1) {
      const v = sim.lightField.sampleAt({ x: wx * 0.5 + 0.25, y: wy * 0.5 + 0.25 });
      if (v <= 0.01) continue;
      ctx.fillStyle = `rgba(${LAMP_GLOW_RGB},${(v * 0.5).toFixed(3)})`;
      ctx.fillRect(ox + wx * cell, oy + wy * cell, cell, cell);
    }
  }
}

function drawLamp(): void {
  const snap = sim.snapshot();
  for (const ls of snap.lightStates) {
    if (ls.kind !== 'oil_lamp') continue;
    const frames = LAMP_SPRITES.oil_lamp;
    const frame =
      ls.state === 'dead' ? frames.broken : ls.state === 'damaged' ? frames.damaged : frames.intact;
    const p = toPx(ls.position);
    const half = (16 * SPRITE_PX) / 2;
    if (ls.state !== 'dead') {
      const g = ctx.createRadialGradient(p.x, p.y, 2, p.x, p.y, TILE_PX * 2);
      g.addColorStop(0, `rgba(${LAMP_GLOW_RGB},0.28)`);
      g.addColorStop(1, `rgba(${LAMP_GLOW_RGB},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(p.x - TILE_PX * 2, p.y - TILE_PX * 2, TILE_PX * 4, TILE_PX * 4);
    }
    drawPixelSprite(frame, p.x - half, p.y - half, SPRITE_PX);
  }
}

function drawCone(e: { position: Vec2; facingAngle: number }): void {
  const p = toPx(e.position);
  const half = degToRad(FLASHLIGHT_CONE_ARC_DEG) / 2;
  const len = ENEMY_VIEW_DISTANCE * TILE_PX;
  ctx.fillStyle = `rgba(${CONE_RGB},0.12)`;
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.arc(p.x, p.y, len, e.facingAngle - half, e.facingAngle + half);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = `rgba(${CONE_RGB},0.35)`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.lineTo(p.x + Math.cos(e.facingAngle - half) * len, p.y + Math.sin(e.facingAngle - half) * len);
  ctx.moveTo(p.x, p.y);
  ctx.lineTo(p.x + Math.cos(e.facingAngle + half) * len, p.y + Math.sin(e.facingAngle + half) * len);
  ctx.stroke();
}

function drawEntities(): void {
  const snap = sim.snapshot();
  // 敌人(手电锥 + 巡逻兵占位 sprite + 受光护甲金圈)
  for (const e of snap.enemies) {
    drawCone(e);
    const def = CHARACTERS.flashlight_patrol;
    const p = toPx(e.position);
    const half = (16 * SPRITE_PX) / 2;
    drawPixelSprite(def.frames.idle[0], p.x - half, p.y - half, SPRITE_PX);
    if (sim.lightField.isShielded(e.position)) {
      ctx.strokeStyle = `rgba(${LAMP_GLOW_RGB},0.9)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, half + 4, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  // 玩家 + 瞄准线(白线 = LMB 拆灯优先范围 2u;橙线 = 近战范围)
  const p = snap.player;
  const pp = toPx(p.position);
  const def = CHARACTERS.player;
  const half = (16 * SPRITE_PX) / 2;
  const dir = angleToVec(p.facingAngle);
  ctx.strokeStyle = 'rgba(255,255,255,0.75)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pp.x, pp.y);
  ctx.lineTo(pp.x + dir.x * LMB_LIGHT_PRIORITY_RANGE * TILE_PX, pp.y + dir.y * LMB_LIGHT_PRIORITY_RANGE * TILE_PX);
  ctx.stroke();
  ctx.strokeStyle = `rgba(${PAL_MUZZLE},0.55)`;
  ctx.beginPath();
  ctx.moveTo(pp.x, pp.y);
  ctx.lineTo(pp.x + dir.x * (LMB_LIGHT_PRIORITY_RANGE + 0.6) * TILE_PX, pp.y + dir.y * (LMB_LIGHT_PRIORITY_RANGE + 0.6) * TILE_PX);
  ctx.stroke();
  drawPixelSprite(def.frames.idle[0], pp.x - half, pp.y - half, SPRITE_PX);
}

/** 击杀白闪 / 格挡白闪 / 死亡红 vignette(P5 反馈,事件驱动) */
function drawJuice(): void {
  const snap = sim.snapshot();
  if (flashWhite > 0) {
    ctx.fillStyle = `rgba(245,230,184,${Math.min(0.85, flashWhite).toFixed(3)})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  const dead = snap.player.hp <= 0;
  if (flashRed > 0 || dead) {
    const a = dead ? 0.38 : Math.min(0.45, flashRed * 0.7);
    const g = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, canvas.height * 0.2,
      canvas.width / 2, canvas.height / 2, canvas.height * 0.72,
    );
    g.addColorStop(0, 'rgba(216,32,26,0)');
    g.addColorStop(1, `rgba(216,32,26,${a.toFixed(3)})`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  if (dead) {
    ctx.fillStyle = '#f5e6b8';
    ctx.font = '28px Consolas, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('DEAD — 重生中…', canvas.width / 2, canvas.height / 2 - 10);
  }
}

function avgRoomLight(): number {
  const room = sim.snapshot().currentRoom;
  if (!room) return 0;
  let total = 0;
  let n = 0;
  for (let wy = 0; wy < room.height * 2; wy += 1) {
    for (let wx = 0; wx < room.width * 2; wx += 1) {
      total += sim.lightField.sampleAt({ x: wx * 0.5 + 0.25, y: wy * 0.5 + 0.25 });
      n += 1;
    }
  }
  return total / n;
}

const EVENT_LABEL: Partial<Record<SimEvent['kind'], string>> = {
  lightSmash: '拆灯',
  lightDestroyed: '灯碎',
  invalidateLight: '灯池失效',
  attackBlocked: '格挡',
  enemyKilled: '击杀',
  playerKilled: '死亡',
  melee: '挥击',
  weaponPicked: '拾刀',
  enemyAlert: '敌警觉',
  enemyAttack: '敌呼叫',
  sfx: '音效',
};

function render(): void {
  ctx.fillStyle = PAL_INK;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawRoom();
  drawLightPool();
  drawLamp();
  drawEntities();
}

function updateHud(): void {
  if (!hudEl) return;
  const snap = sim.snapshot();
  const lamp = snap.lightStates[0];
  const enemy = snap.enemies[0];
  const events = sim.events.slice(-8);
  const evText = events.length === 0
    ? '(无)'
    : events
        .map((e) =>
          e.kind === 'lightSmash'
            ? `${EVENT_LABEL[e.kind] ?? e.kind} HP${e.hp}`
            : `${EVENT_LABEL[e.kind] ?? e.kind}`,
        )
        .join(' · ');
  hudEl.innerHTML =
    `<b>HS PHASE PREVIEW · ${PHASE_LABEL}</b>\n` +
    `WASD 移动 · 鼠标瞄准 · LMB 攻击(2u 内优先拆灯) · R 重开\n` +
    `房间 ${snap.currentRoom?.id ?? '-'} · 灯 ${lamp ? `${lamp.state} HP ${lamp.hp}/${lamp.maxHp}` : '-'} · ` +
    `敌人 ${enemy ? `${enemy.archetype} ${enemy.state}` : '-'}\n` +
    `光池均值 ${avgRoomLight().toFixed(4)} · 事件:${evText}`;
}

function frame(now: number): void {
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  acc += dt;
  while (acc >= FIXED_DT) {
    for (const a of input.drain()) sim.input(a);
    sim.step(FIXED_DT);
    acc -= FIXED_DT;
  }
  const evs = sim.events;
  for (let i = seenEvents; i < evs.length; i += 1) {
    const e = evs[i];
    if (e.kind === 'attackBlocked') flashWhite = Math.max(flashWhite, 0.16);
    else if (e.kind === 'enemyKilled') flashWhite = Math.max(flashWhite, 0.1);
    else if (e.kind === 'playerKilled') flashRed = 0.55;
  }
  seenEvents = evs.length;
  flashWhite = Math.max(0, flashWhite - dt * 1.1);
  flashRed = Math.max(0, flashRed - dt * 0.9);
  render();
  drawJuice();
  updateHud();
  requestAnimationFrame(frame);
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyR') restart();
});

requestAnimationFrame(frame);
