import type { SimSnapshot } from '../core/types';
import { RcPipeline, type RcFrameImages, type RcPipelineState } from './RcPipeline';
import { RC_LIGHT_TABLE } from '../core/data/lights';
import { PAL_MUZZLE, PLAYER_MELEE_DURATION, RC_AMBIENT_INTENSITY, RC_CASCADE_COUNT, RC_LIGHT_SCALE, RC_PLAYER_LIGHT_COLOR, RC_PLAYER_LIGHT_RADIUS } from '../core/constants';
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
  lastPlanes: RcFrameImages | null = null;

  /** DEV 调试:暴露管线实例供 __rcPipelineInstance 读取各阶段纹理 */
  get pipelineInstance(): RcPipeline | null {
    return this.pipeline;
  }

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

  render(snapshot: SimSnapshot, shake: { x: number; y: number } = { x: 0, y: 0 }): void {
    if (this.pipeline === null || this.lost) return;
    try {
      const frame = this.buildPlanes(snapshot, shake);
      this.lastPlanes = frame;
      this.pipeline.render(frame, { twoLoop: true, ditherEnabled: false });
      Object.assign(this.state, this.pipeline.state());
    } catch (error) {
      console.warn('[RcPresenter] RC disabled:', error);
      this.disableRc();
    }
  }

  setConfig(config: { cascadeCount?: number; lightScale?: number; ambientIntensity?: number; debugTint?: [number, number, number] }): void {
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

  private buildPlanes(snapshot: SimSnapshot, shake: { x: number; y: number }): RcFrameImages {
    const sceneCtx = this.source.getContext('2d');
    if (sceneCtx === null) throw new Error('Canvas2D scene source unavailable');
    const sceneColor = sceneCtx.getImageData(0, 0, WIDTH, HEIGHT);
    const occlusion = this.occlusion;
    const emission = this.emission;
    emission.data.set(OPAQUE_BLACK);
    const room = snapshot.currentRoom;
    let roomRect: { x0: number; y0: number; x1: number; y1: number } | undefined;
    if (room === null) {
      occlusion.data.fill(255);
      this.roomTopologyKey = '';
    } else {
      const scale = Math.min(WIDTH / (room.width + 2), HEIGHT / (room.height + 2));
      const ox = Math.floor((WIDTH - room.width * scale) / 2);
      const oy = Math.floor((HEIGHT - room.height * scale) / 2);
      // 屏幕抖动:sceneColor 从已抖动的 source canvas 抓取,emission/occlusion 必须
      // 同样跟随抖动,否则光池/阴影在抖动期间与 sprite 脱开(shake 0.12s ±5px)。
      // 用含抖动的 ox/oy 画所有动态平面;静态遮挡缓存保持世界锚定,按需平移。
      const jx = shake.x;
      const jy = shake.y;
      const sox = ox + jx;
      const soy = oy + jy;
      // final.frag 用房间矩形把房间外虚空的光贡献压为近黑(修 ambient 灰带)。
      // 矩形精确跟随 SceneManager 的实时抖动偏移(0 容差):抖动最大 ±5px,
      // 固定容差会在静止帧留下等宽的可见灰带。
      roomRect = {
        x0: sox,
        y0: soy,
        x1: sox + room.width * scale,
        y1: soy + room.height * scale,
      };
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
      }
      // 遮挡平面跟随抖动平移(只有抖动时才做全平面平移,静止帧走快速 memcpy)
      if (jx !== 0 || jy !== 0) {
        this.translatePlane(this.staticOcclusion, occlusion, jx, jy);
      } else {
        occlusion.data.set(this.staticOcclusion.data);
      }
      // 玩家随身暖灯:只承担暗场可读性,半径小于房间主灯且不参与 gameplay 视觉判定。
      // 先画随身灯再画场景灯,避免它在与主灯重叠时覆盖更亮的 oil-lamp emission seed。
      const [playerLightR, playerLightG, playerLightB] = parseHexRgb(RC_PLAYER_LIGHT_COLOR);
      const playerVisual = visualCenter(snapshot.player.position);
      this.fillSoftDisk(
        emission,
        sox + playerVisual.x * scale,
        soy + playerVisual.y * scale,
        Math.max(3, scale * RC_PLAYER_LIGHT_RADIUS),
        playerLightR,
        playerLightG,
        playerLightB,
      );
      // Melee is a short visual-only RC flash. Keep it before authoritative scene
      // lights so a swing near the oil lamp cannot erase the stronger lamp seed.
      const [muzzleR, muzzleG, muzzleB] = parseHexRgb(PAL_MUZZLE);
      for (const swing of snapshot.melee) {
        const fade = Math.max(0, Math.min(1, swing.ttl / PLAYER_MELEE_DURATION));
        const gain = 0.35 + 0.65 * fade;
        const swingVisual = visualCenter(swing.position);
        this.fillDisk(
          emission,
          sox + (swingVisual.x + Math.cos(swing.facingAngle) * 0.7) * scale,
          soy + (swingVisual.y + Math.sin(swing.facingAngle) * 0.7) * scale,
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
        // v3.8:种子盘半径 0.2→0.4 格(c1/c2 级联射线从 6/30px 起步,0.2 格≈3.4px 工作半径
        // 的种子会让粗级联在 SDF 行走中全部脱靶,合并回传黑块 → 光池出现孔洞/星形伪影;
        // 0.4 格≈6.9px 工作半径,c1(6px)直接落在盘内命中,粗级联不再吞光)
        this.fillDisk(emission, sox + lightVisual.x * scale, soy + lightVisual.y * scale, Math.max(3, scale * 0.4), r, g, b);
      }
      // v3.7: 瞬时光源（muzzle flash / 爆炸 / 血花等）在 activeLights 里，必须写入
      // emission 种子平面，否则枪口闪光完全不会进入 RC 光照。
      // 使用与 SceneManager 相同的 visualCenter 锚点；半径按光源半径(世界单位)缩放，
      // 颜色按 intensity 归一到 8bit。只处理静态 lightSources 之外的瞬时光，
      // 避免把 oil_lamp/searchlight/neon 再以超大半径重画一遍造成纵向糊斑。
      const staticKinds = new Set<string>(snapshot.lightSources.map((light) => light.kind));
      for (const light of snapshot.activeLights) {
        if (light.ttl !== Infinity && light.ttl <= 0) continue;
        if (staticKinds.has(light.kind as string)) continue;
        const spec = RC_LIGHT_TABLE[light.kind as keyof typeof RC_LIGHT_TABLE] ?? RC_LIGHT_TABLE.oil_lamp;
        const hex = spec.colorHex.slice(1);
        // 瞬时光（枪口/爆炸）的 intensity 可 >1，允许饱和到 255 形成醒目种子；
        // 静态灯走 lightSources 分支，不受影响。
        const gain = Math.min(1.6, Math.max(0.1, light.intensity));
        const r = Math.min(255, Math.round(parseInt(hex.slice(0, 2), 16) * gain));
        const g = Math.min(255, Math.round(parseInt(hex.slice(2, 4), 16) * gain));
        const b = Math.min(255, Math.round(parseInt(hex.slice(4, 6), 16) * gain));
        const lightVisual = visualCenter(light.position);
        // 枪口/爆炸这类瞬时光只做紧凑种子,RC 传播会负责扩散;
        // 与静态灯同步提高到 0.4 格,保证粗级联能命中(否则光池带孔/偏移)。
        const radius = Math.max(3, scale * 0.4);
        this.fillDisk(emission, sox + lightVisual.x * scale, soy + lightVisual.y * scale, radius, r, g, b);
      }
    }
    const frame = {
      width: WIDTH,
      height: HEIGHT,
      sceneColor,
      occlusion,
      emission,
      lightCount: snapshot.lightSources.filter((light) => !light.invalidated).length,
      roomRect,
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

  /** 整平面按整数偏移平移(dst = src 平移后,越界填黑=虚空遮挡)。只在抖动帧调用。 */
  private translatePlane(src: ImageData, dst: ImageData, dx: number, dy: number): void {
    const ix = Math.round(dx);
    const iy = Math.round(dy);
    const w = src.width;
    const h = src.height;
    const s = src.data;
    const d = dst.data;
    for (let y = 0; y < h; y += 1) {
      const sy = y - iy;
      for (let x = 0; x < w; x += 1) {
        const sx = x - ix;
        const di = (y * w + x) * 4;
        if (sx >= 0 && sx < w && sy >= 0 && sy < h) {
          const si = (sy * w + sx) * 4;
          d[di] = s[si]; d[di + 1] = s[si + 1]; d[di + 2] = s[si + 2]; d[di + 3] = 255;
        } else {
          d[di] = 0; d[di + 1] = 0; d[di + 2] = 0; d[di + 3] = 255;
        }
      }
    }
  }

  private fillDisk(image: ImageData, cx: number, cy: number, radius: number, r: number, g: number, b: number): void {
    const rr = radius * radius;
    for (let y = Math.max(0, Math.floor(cy - radius)); y <= Math.min(image.height - 1, Math.ceil(cy + radius)); y += 1) {
      for (let x = Math.max(0, Math.floor(cx - radius)); x <= Math.min(image.width - 1, Math.ceil(cx + radius)); x += 1) {
        if ((x - cx) ** 2 + (y - cy) ** 2 <= rr) this.setPixel(image, x, y, r, g, b);
      }
    }
  }

  // 软边光斑:中心满强度 → 边缘 0 的平方衰减。硬边实心盘经 RC 传播/双线性上采样后
  // 会形成可见的环形"选中光圈";平方衰减让随身灯只作局部提亮,不产生圆环。
  private fillSoftDisk(image: ImageData, cx: number, cy: number, radius: number, r: number, g: number, b: number): void {
    const rr = radius * radius;
    for (let y = Math.max(0, Math.floor(cy - radius)); y <= Math.min(image.height - 1, Math.ceil(cy + radius)); y += 1) {
      for (let x = Math.max(0, Math.floor(cx - radius)); x <= Math.min(image.width - 1, Math.ceil(cx + radius)); x += 1) {
        const d2 = (x - cx) ** 2 + (y - cy) ** 2;
        if (d2 > rr) continue;
        const falloff = 1 - Math.sqrt(d2) / radius;
        const gain = falloff * falloff;
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
