import type { SimSnapshot } from '../core/types';
import { RcPipeline, type RcFrameImages, type RcPipelineState } from './RcPipeline';
import { RC_LIGHT_TABLE } from '../core/data/lights';
import { FLASHLIGHT_CONE_ARC_DEG, PAL_MUZZLE, PLAYER_MELEE_DURATION, RC_AMBIENT_INTENSITY, RC_CASCADE_COUNT, RC_LIGHT_SCALE, VISION_NEAR_DISTANCE } from '../core/constants';

const WIDTH = 480;
const HEIGHT = 432;

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

  constructor(
    private readonly host: HTMLElement,
    private readonly source: HTMLCanvasElement,
  ) {
    this.canvas.width = WIDTH;
    this.canvas.height = HEIGHT;
    for (const canvas of [source, this.canvas]) {
      canvas.style.position = 'absolute';
      canvas.style.inset = '50% auto auto 50%';
      canvas.style.width = 'min(92vw, calc(92vh * 10 / 9))';
      canvas.style.height = 'min(92vh, calc(92vw * 9 / 10))';
      canvas.style.aspectRatio = '10 / 9';
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

  setConfig(config: { lightScale?: number; ambientIntensity?: number }): void {
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
    emission.data.fill(0);
    for (let i = 3; i < emission.data.length; i += 4) emission.data[i] = 255;
    const room = snapshot.currentRoom;
    if (room === null) {
      occlusion.data.fill(255);
      this.roomTopologyKey = '';
    } else {
      const scale = Math.min(WIDTH / 12, HEIGHT / 11);
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
      }
      occlusion.data.set(this.staticOcclusion.data);
      const lamp = snapshot.lightSources[0];
      if (lamp !== undefined && lamp.state !== 'dead') {
        this.fillDisk(occlusion, ox + lamp.position.x * scale, oy + lamp.position.y * scale, Math.max(2, scale * 0.13), 0, 0, 0);
      }
      // v3.4 绑定标准:角色 occluder = 锚点(脚底)接触影圆盘 r0.22u,取代 0.32×0.68u 竖胶囊——
      // 竖直精灵是"站立高度"而非俯视体块,胶囊在脚下形成违和的竖长黑块;圆盘读作自然接触影
      this.fillDisk(occlusion, ox + snapshot.player.position.x * scale, oy + snapshot.player.position.y * scale, scale * 0.22, 0, 0, 0);
      for (const light of snapshot.lightSources) {
        if (light.invalidated || light.intensity <= 0) continue;
        const spec = RC_LIGHT_TABLE[light.kind as keyof typeof RC_LIGHT_TABLE];
        const hex = (spec?.colorHex ?? '#ffc966').slice(1);
        let pulse = 1;
        if (spec?.pulse === 'sine' && spec.pulseHz !== undefined) pulse = 0.72 + 0.28 * Math.sin(snapshot.elapsedSeconds * Math.PI * 2 * spec.pulseHz);
        // v3.3:发射盘增益 0.95 + 半径 0.2——ambient 降到 0.06 后灯周围明暗差由灯本体发射承担
        // (e2e 视觉门:intact−broken 亮度差 >10);ambient 0.06 给了余量,不会复现 v3.2 前的白球过曝
        const gain = pulse * 0.95;
        const r = Math.round(parseInt(hex.slice(0, 2), 16) * gain);
        const g = Math.round(parseInt(hex.slice(2, 4), 16) * gain);
        const b = Math.round(parseInt(hex.slice(4, 6), 16) * gain);
        this.fillDisk(emission, ox + light.position.x * scale, oy + light.position.y * scale, Math.max(3, scale * 0.2), r, g, b);
      }
      // 攻击闪光:挥击 ttl 内一记 PAL_MUZZLE 暖闪,随剩余时间衰减
      const muzzle = PAL_MUZZLE.slice(1);
      for (const swing of snapshot.melee) {
        const fade = Math.max(0, Math.min(1, swing.ttl / PLAYER_MELEE_DURATION));
        const gain = 0.35 + 0.65 * fade;
        const fx = ox + (swing.position.x + Math.cos(swing.facingAngle) * 0.7) * scale;
        const fy = oy + (swing.position.y + Math.sin(swing.facingAngle) * 0.7) * scale;
        this.fillDisk(emission, fx, fy, Math.max(3, scale * 0.4), Math.round(parseInt(muzzle.slice(0, 2), 16) * gain), Math.round(parseInt(muzzle.slice(2, 4), 16) * gain), Math.round(parseInt(muzzle.slice(4, 6), 16) * gain));
      }
      // 角色可读性底光(v3.2):极暗暖盘贴着角色,保证黑场中自身/敌人可辨(HM 式自发光感,不影响 sim 光照判定)
      this.fillDisk(emission, ox + snapshot.player.position.x * scale, oy + snapshot.player.position.y * scale, Math.max(3, scale * 0.3), 26, 21, 15);
      // v3.6 S4:遍历全部敌人(多敌传播)——底光 / 遮挡盘 / 状态色手电锥逐敌发射
      for (const enemy of snapshot.enemies) {
        if (enemy.hp <= 0) continue;
        this.fillDisk(emission, ox + enemy.position.x * scale, oy + enemy.position.y * scale, Math.max(3, scale * 0.28), 24, 22, 18);
        this.fillDisk(occlusion, ox + enemy.position.x * scale, oy + enemy.position.y * scale, scale * 0.22, 0, 0, 0);
        // 手电锥发射:锥角 = 检测锥角(FLASHLIGHT_CONE_ARC_DEG),长度 = 检测距离 5u
        // 手电属巡逻兵自身装备,与油灯生死无关——灯碎后锥形光继续扫射,成为暗房唯一威胁源
        // v3.3:锥形发射裁剪到房间内界(墙内侧面),不再把光画进墙体/溢出房外
        // v3.5 状态色:巡逻绿 / 警觉黄(?) / 发现红(!);远/近色带分界 = VISION_NEAR_DISTANCE
        const cone = enemy.state === 'alert' || enemy.state === 'engaging' ? [76, 26, 22] : enemy.state === 'suspicious' ? [70, 58, 22] : [34, 64, 40];
        this.fillCone(emission, ox + enemy.position.x * scale, oy + enemy.position.y * scale, enemy.facingAngle, scale * 5, FLASHLIGHT_CONE_ARC_DEG * Math.PI / 180, cone[0], cone[1], cone[2], { x0: ox + scale, y0: oy + scale, x1: ox + (room.width - 1) * scale, y1: oy + (room.height - 1) * scale }, scale * VISION_NEAR_DISTANCE);
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

  private fillCone(image: ImageData, cx: number, cy: number, angle: number, length: number, arc: number, r: number, g: number, b: number, bounds?: { x0: number; y0: number; x1: number; y1: number }, bandPx = length * 0.5): void {
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
