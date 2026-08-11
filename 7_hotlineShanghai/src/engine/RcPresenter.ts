import type { SimSnapshot, Vec2 } from '../core/types';
import { RcPipeline, type RcFrameImages, type RcPipelineState } from './RcPipeline';
import { RC_LIGHT_TABLE } from '../core/data/lights';
import { buildTileMap, type TileMap } from '../core/world/tileMap';
import { hasLineOfSight } from '../core/world/lineOfSight';
import { FLASHLIGHT_CONE_ARC_DEG, PAL_MUZZLE, PLAYER_MELEE_DURATION, RC_AMBIENT_INTENSITY, RC_CASCADE_COUNT, RC_LIGHT_SCALE, RC_PLAYER_LIGHT_COLOR, RC_PLAYER_LIGHT_RADIUS, VISION_NEAR_DISTANCE } from '../core/constants';
import { visualCenter } from './renderCoordinates';

const WIDTH = 720;
const HEIGHT = 480;
const OPAQUE_BLACK = makeOpaqueBlackPlane(WIDTH, HEIGHT);

function makeOpaqueBlackPlane(width: number, height: number): Uint8ClampedArray {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let i = 3; i < data.length; i += 4) data[i] = 255;
  return data;
}

function parseHexRgb(hex: string): [number, number, number] {
  const value = hex.startsWith('#') ? hex.slice(1) : hex;
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

// 环境光按 cascade pass 逐次累加(RcPipeline 每个 cascade 各加一次),
// 契约总量 RC_AMBIENT_INTENSITY 需按 cascade 数均摊,否则多级叠加过曝
const AMBIENT_PER_PASS = RC_AMBIENT_INTENSITY / RC_CASCADE_COUNT;

export class RcPresenter {
  readonly canvas = document.createElement('canvas');
  readonly state: RcPipelineState;
  private pipeline: RcPipeline | null = null;
  private lost = false;
  private occlusion = new ImageData(WIDTH, HEIGHT);
  private emission = new ImageData(WIDTH, HEIGHT);
  private staticOcclusion = new ImageData(WIDTH, HEIGHT);
  private roomTopologyKey = '';
  private visibilityMasks = new Map<string, Uint8Array>();

  constructor(
    private readonly host: HTMLElement,
    private readonly source: HTMLCanvasElement,
  ) {
    this.canvas.width = WIDTH;
    this.canvas.height = HEIGHT;
    for (const canvas of [source, this.canvas]) {
      canvas.style.position = 'absolute';
      canvas.style.inset = '50% auto auto 50%';
      canvas.style.width = 'min(96vw, calc(92vh * 3 / 2))';
      canvas.style.height = 'min(92vh, calc(96vw * 2 / 3))';
      canvas.style.aspectRatio = '3 / 2';
      canvas.style.transform = 'translate(-50%, -50%)';
      canvas.style.imageRendering = 'pixelated';
    }
    this.canvas.style.zIndex = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.addEventListener('webglcontextlost', this.onContextLost);
    this.canvas.addEventListener('webglcontextrestored', this.onContextRestored);
    this.host.appendChild(this.canvas);
    this.pipeline = this.createPipeline();
    this.state = this.pipeline?.state() ?? this.fallbackState();
    this.source.style.opacity = this.pipeline === null ? '1' : '0';
  }

  render(snapshot: SimSnapshot): void {
    if (this.pipeline === null || this.lost) return;
    try {
      const frame = this.buildPlanes(snapshot);
      this.pipeline.render(frame, { cascadeCount: RC_CASCADE_COUNT, twoLoop: true, ditherEnabled: false, lightScale: RC_LIGHT_SCALE, ambientIntensity: AMBIENT_PER_PASS });
      Object.assign(this.state, this.pipeline.state());
    } catch (error) {
      console.warn('[RcPresenter] RC disabled:', error);
      this.disableRc();
    }
  }

  setConfig(config: { cascadeCount?: number; lightScale?: number; ambientIntensity?: number }): void {
    this.pipeline?.setConfig(config);
  }

  destroy(): void {
    this.canvas.removeEventListener('webglcontextlost', this.onContextLost);
    this.canvas.removeEventListener('webglcontextrestored', this.onContextRestored);
    this.pipeline?.destroy();
    this.pipeline = null;
    this.canvas.remove();
    this.source.style.opacity = '1';
  }

  private buildPlanes(snapshot: SimSnapshot): RcFrameImages {
    const sceneCtx = this.source.getContext('2d');
    if (sceneCtx === null) throw new Error('Canvas2D scene source unavailable');
    const sceneColor = sceneCtx.getImageData(0, 0, WIDTH, HEIGHT);
    const occlusion = this.occlusion;
    const emission = this.emission;
    emission.data.set(OPAQUE_BLACK);
    const room = snapshot.currentRoom;
    if (room === null) {
      occlusion.data.fill(255);
      this.roomTopologyKey = '';
    } else {
      const scale = Math.min(WIDTH / (room.width + 2), HEIGHT / (room.height + 2));
      const ox = Math.floor((WIDTH - room.width * scale) / 2);
      const oy = Math.floor((HEIGHT - room.height * scale) / 2);
      // 静态遮挡(墙 # + 掩体 X)按房间拓扑缓存,动态遮挡(灯座 / 角色)每帧叠加在缓存副本上
      const topologyKey = `${room.id}:${room.width}x${room.height}:${room.tiles.join('|')}`;
      if (topologyKey !== this.roomTopologyKey) {
        // 房间外一律视为遮挡(黑),防止光锥/发射盘溢出到房间外虚空;室内默认畅通(白),再叠加墙/掩体黑块
        this.fillRect(this.staticOcclusion, 0, 0, WIDTH, HEIGHT, 0, 0, 0);
        this.fillRect(this.staticOcclusion, ox, oy, room.width * scale, room.height * scale, 255, 255, 255);
        for (let y = 0; y < room.height; y += 1) for (let x = 0; x < room.width; x += 1) {
          const tile = room.tiles[y][x];
          // v3.4 绑定标准:墙 # = 整格遮挡;掩体 X = 视觉足迹遮挡(沙袋堆 0.88×0.72u 居中,
          // 与 drawSandbag 对齐)——SDF 大于视觉会多吞光,小于视觉会漏光,以视觉足迹为准
          if (tile === '#') this.fillRect(this.staticOcclusion, ox + x * scale, oy + y * scale, scale, scale, 0, 0, 0);
          else if (tile === 'X') this.fillRect(this.staticOcclusion, ox + (x + 0.06) * scale, oy + (y + 0.14) * scale, scale * 0.88, scale * 0.72, 0, 0, 0);
        }
        this.roomTopologyKey = topologyKey;
        this.visibilityMasks.clear();
      }
      occlusion.data.set(this.staticOcclusion.data);
      // 玩家随身暖灯:只承担暗场可读性,半径小于房间主灯且不参与 gameplay 视觉判定。
      // 先画随身灯再画场景灯,避免它在与主灯重叠时覆盖更亮的 oil-lamp emission seed。
      const [playerLightR, playerLightG, playerLightB] = parseHexRgb(RC_PLAYER_LIGHT_COLOR);
      const playerVisual = visualCenter(snapshot.player.position);
      this.fillDisk(
        emission,
        ox + playerVisual.x * scale,
        oy + playerVisual.y * scale,
        Math.max(5, scale * RC_PLAYER_LIGHT_RADIUS),
        playerLightR,
        playerLightG,
        playerLightB,
      );
      const towerPowered = snapshot.lightSources.some((light) => light.kind === 'searchlight' && !light.invalidated && light.intensity > 0);
      const tileMap = buildTileMap(room);
      for (const enemy of snapshot.enemies) {
        if (enemy.hp <= 0) continue;
        const enemyVisual = visualCenter(enemy.position);
        this.fillDisk(emission, ox + enemyVisual.x * scale, oy + enemyVisual.y * scale, Math.max(3, scale * 0.28), 22, 21, 19);
        if (enemy.role === 'tower_guard' && !towerPowered) continue;
        const coneLength = enemy.role === 'tower_guard' ? 12 : 5;
        const cone = enemy.role === 'tower_guard'
          ? [42, 44, 54]
          : enemy.state === 'alert' || enemy.state === 'engaging'
            ? [48, 31, 28]
            : enemy.state === 'suspicious'
              ? [46, 42, 30]
              : [34, 40, 36];
        const observerTileX = Math.floor(enemy.position.x / tileMap.tileSize);
        const observerTileY = Math.floor(enemy.position.y / tileMap.tileSize);
        const visibilityKey = `${enemy.id}:${observerTileX},${observerTileY}`;
        let visibility = this.visibilityMasks.get(visibilityKey);
        if (visibility === undefined) {
          visibility = this.buildVisibilityMask(tileMap, enemy.position);
          this.visibilityMasks.set(visibilityKey, visibility);
        }
        this.fillCone(
          emission,
          ox + enemyVisual.x * scale,
          oy + enemyVisual.y * scale,
          enemy.facingAngle,
          scale * coneLength,
          FLASHLIGHT_CONE_ARC_DEG * Math.PI / 180,
          cone[0],
          cone[1],
          cone[2],
          { x0: ox + scale, y0: oy + scale, x1: ox + (room.width - 1) * scale, y1: oy + (room.height - 1) * scale },
          scale * VISION_NEAR_DISTANCE,
          { data: visibility, roomWidth: room.width, roomHeight: room.height, scale, ox, oy },
        );
      }
      // Melee is a short visual-only RC flash. Keep it before authoritative scene
      // lights so a swing near the oil lamp cannot erase the stronger lamp seed.
      const [muzzleR, muzzleG, muzzleB] = parseHexRgb(PAL_MUZZLE);
      for (const swing of snapshot.melee) {
        const fade = Math.max(0, Math.min(1, swing.ttl / PLAYER_MELEE_DURATION));
        const gain = 0.35 + 0.65 * fade;
        const swingVisual = visualCenter(swing.position);
        this.fillDisk(
          emission,
          ox + (swingVisual.x + Math.cos(swing.facingAngle) * 0.7) * scale,
          oy + (swingVisual.y + Math.sin(swing.facingAngle) * 0.7) * scale,
          Math.max(3, scale * 0.4),
          Math.round(muzzleR * gain),
          Math.round(muzzleG * gain),
          Math.round(muzzleB * gain),
        );
      }
      // Draw authoritative scene lights last. RC seeds are single-valued RGBA pixels,
      // so a sight cone or local player light must not erase the stronger lamp seed.
      for (const light of snapshot.lightSources) {
        if (light.invalidated || light.intensity <= 0) continue;
        const spec = RC_LIGHT_TABLE[light.kind as keyof typeof RC_LIGHT_TABLE];
        const hex = (spec?.colorHex ?? '#ffc966').slice(1);
        let pulse = 1;
        if (spec?.pulse === 'sine' && spec.pulseHz !== undefined) pulse = 0.72 + 0.28 * Math.sin(snapshot.elapsedSeconds * Math.PI * 2 * spec.pulseHz);
        const gain = pulse * 0.95;
        const r = Math.round(parseInt(hex.slice(0, 2), 16) * gain);
        const g = Math.round(parseInt(hex.slice(2, 4), 16) * gain);
        const b = Math.round(parseInt(hex.slice(4, 6), 16) * gain);
        const lightVisual = visualCenter(light.position);
        this.fillDisk(emission, ox + lightVisual.x * scale, oy + lightVisual.y * scale, Math.max(3, scale * 0.2), r, g, b);
      }
    }
    const frame = {
      width: WIDTH,
      height: HEIGHT,
      sceneColor,
      occlusion,
      emission,
      lightCount: snapshot.lightSources.filter((light) => !light.invalidated).length,
    };
    if (import.meta.env.DEV) this.validatePlanes(frame);
    return frame;
  }

  private validatePlanes(frame: RcFrameImages): void {
    for (const image of [frame.sceneColor, frame.occlusion, frame.emission]) {
      if (image.width !== WIDTH || image.height !== HEIGHT) throw new Error('RC plane dimensions mismatch');
    }
    for (let i = 0; i < frame.occlusion.data.length; i += 4) {
      const r = frame.occlusion.data[i];
      if ((r !== 0 && r !== 255) || frame.occlusion.data[i + 1] !== r || frame.occlusion.data[i + 2] !== r || frame.occlusion.data[i + 3] !== 255) throw new Error('RC occlusion plane is not binary opaque');
      if (frame.emission.data[i + 3] !== 255) throw new Error('RC emission plane is not opaque');
    }
  }

  private fillRect(image: ImageData, x: number, y: number, w: number, h: number, r: number, g: number, b: number): void {
    const x0 = Math.max(0, Math.floor(x)); const y0 = Math.max(0, Math.floor(y));
    const x1 = Math.min(image.width, Math.ceil(x + w)); const y1 = Math.min(image.height, Math.ceil(y + h));
    for (let py = y0; py < y1; py += 1) for (let px = x0; px < x1; px += 1) this.setPixel(image, px, py, r, g, b);
  }

  private fillDisk(image: ImageData, cx: number, cy: number, radius: number, r: number, g: number, b: number): void {
    const rr = radius * radius;
    for (let y = Math.max(0, Math.floor(cy - radius)); y <= Math.min(image.height - 1, Math.ceil(cy + radius)); y += 1) {
      for (let x = Math.max(0, Math.floor(cx - radius)); x <= Math.min(image.width - 1, Math.ceil(cx + radius)); x += 1) {
        if ((x - cx) ** 2 + (y - cy) ** 2 <= rr) this.setPixel(image, x, y, r, g, b);
      }
    }
  }

  private buildVisibilityMask(tileMap: TileMap, origin: Vec2): Uint8Array {
    const mask = new Uint8Array(tileMap.width * tileMap.height);
    for (let y = 0; y < tileMap.height; y += 1) {
      for (let x = 0; x < tileMap.width; x += 1) {
        if (tileMap.blocksBullet({ x, y })) continue;
        const target = {
          x: (x + 0.5) * tileMap.tileSize,
          y: (y + 0.5) * tileMap.tileSize,
        };
        if (hasLineOfSight(tileMap, origin, target, 'vision')) {
          mask[y * tileMap.width + x] = 1;
        }
      }
    }
    return mask;
  }

  private fillCone(image: ImageData, cx: number, cy: number, angle: number, length: number, arc: number, r: number, g: number, b: number, bounds?: { x0: number; y0: number; x1: number; y1: number }, bandPx = length * 0.5, visibility?: { data: Uint8Array; roomWidth: number; roomHeight: number; scale: number; ox: number; oy: number }): void {
    // v3.5:实心扇形扫描填充——旧版按距离环描 1px 线,斜角下格点剪切留针孔,合成后读作抖动纹。
    // 逐像素 dot/perp 判定 + hypot 距离,无三角函数;增益 = 近场渐入(防头部过曝)× 远/近色带
    // (≤bandPx 柔 0.7,以外满功率 → 近带=必死区 VISION_NEAR_DISTANCE 在视觉上可读)
    const cosA = Math.cos(angle), sinA = Math.sin(angle);
    const tanHalf = Math.tan(arc / 2);
    const ramp = Math.max(1, length * 0.16);
    const ex0 = cx + Math.cos(angle - arc / 2) * length, ey0 = cy + Math.sin(angle - arc / 2) * length;
    const ex1 = cx + Math.cos(angle + arc / 2) * length, ey1 = cy + Math.sin(angle + arc / 2) * length;
    const mx = cx + cosA * length, my = cy + sinA * length;
    const x0 = Math.max(0, Math.floor(Math.min(cx, ex0, ex1, mx))), x1 = Math.min(image.width, Math.ceil(Math.max(cx, ex0, ex1, mx)));
    const y0 = Math.max(0, Math.floor(Math.min(cy, ey0, ey1, my))), y1 = Math.min(image.height, Math.ceil(Math.max(cy, ey0, ey1, my)));
    for (let y = y0; y < y1; y += 1) {
      for (let x = x0; x < x1; x += 1) {
        if (bounds && (x < bounds.x0 || x >= bounds.x1 || y < bounds.y0 || y >= bounds.y1)) continue;
        const dx = x - cx, dy = y - cy;
        const dot = dx * cosA + dy * sinA;
        if (dot < 1) continue;
        if (Math.abs(-dx * sinA + dy * cosA) > dot * tanHalf) continue;
        const distance = Math.hypot(dx, dy);
        if (distance > length) continue;
        if (visibility) {
          const tileX = Math.floor((x - visibility.ox) / visibility.scale);
          const tileY = Math.floor((y - visibility.oy) / visibility.scale);
          if (
            tileX < 0 ||
            tileY < 0 ||
            tileX >= visibility.roomWidth ||
            tileY >= visibility.roomHeight ||
            visibility.data[tileY * visibility.roomWidth + tileX] === 0
          ) continue;
        }
        const gain = Math.min(1, distance / ramp) * (distance <= bandPx ? 0.7 : 1);
        this.setPixel(image, x, y, Math.round(r * gain), Math.round(g * gain), Math.round(b * gain));
      }
    }
  }

  private setPixel(image: ImageData, x: number, y: number, r: number, g: number, b: number): void {
    if (x < 0 || y < 0 || x >= image.width || y >= image.height) return;
    const i = (y * image.width + x) * 4;
    image.data[i] = r; image.data[i + 1] = g; image.data[i + 2] = b; image.data[i + 3] = 255;
  }

  private createPipeline(): RcPipeline | null {
    try { return new RcPipeline(this.canvas, { cascadeCount: RC_CASCADE_COUNT, twoLoop: true, ditherEnabled: true, lightScale: RC_LIGHT_SCALE, ambientIntensity: AMBIENT_PER_PASS }); }
    catch (error) { console.warn('[RcPresenter] WebGL2 unavailable, using Canvas2D:', error); return null; }
  }

  private disableRc(): void {
    this.pipeline?.destroy();
    this.pipeline = null;
    this.canvas.style.visibility = 'hidden';
    this.source.style.opacity = '1';
    Object.assign(this.state, this.fallbackState());
  }

  private onContextLost = (event: Event): void => {
    event.preventDefault();
    this.lost = true;
    this.source.style.opacity = '1';
    this.canvas.style.visibility = 'hidden';
    Object.assign(this.state, this.fallbackState());
  };

  private onContextRestored = (): void => {
    this.pipeline = this.createPipeline();
    this.lost = false;
    if (this.pipeline !== null) {
      this.canvas.style.visibility = 'visible';
      this.source.style.opacity = '0';
      Object.assign(this.state, this.pipeline.state());
    } else {
      Object.assign(this.state, this.fallbackState());
    }
  };

  private fallbackState(): RcPipelineState {
    return { activeCascades: 0, resolutionScale: 1, ditherEnabled: false, lastFrameTimeMs: 0, lightCount: 0, jfaPasses: 0, propagationRate: 0, mixFactor: 0, lightScale: 0, ambientIntensity: 0, eps: 0, twoLoop: true, degraded: true };
  }
}
