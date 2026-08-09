// src/core/simulation/rcnodes.ts — RC 光源注册(静态灯位 + 活动光源)
// 静态灯位:从 RoomLayout 的 tile 生成(L → oil_lamp / N → neon_sign / S → searchlight);
// 活动光源:spawnLight 注册 + 每帧 tick 过期,数量上限 RC_MAX_ACTIVE_LIGHTS(冻结 §4.4.6)。
// 纯函数 / 纯数据:不触碰 WebGL,管线渲染由 engine/RcPipeline.ts 消费 ActiveRcLight[]。
import type { ActiveRcLight, RcLightKind, RoomLayout, Vec2 } from '../types';
import { RC_LIGHT_TABLE } from '../data/lights';
import { RC_MAX_ACTIVE_LIGHTS } from '../constants';
import { hexToRgb, v2Dist } from '../math';

let nextId = 0;
const genId = (): string => `light_${Date.now().toString(36)}_${(nextId++).toString(36)}`;

// 生成一个活动光源(配方来自 RC_LIGHT_TABLE,冻结 §4.4.7;intensityOverride 可临时调强)
export function spawnLight(kind: RcLightKind, position: Vec2, intensityOverride?: number): ActiveRcLight {
  const spec = RC_LIGHT_TABLE[kind];
  const rgb = hexToRgb(spec.colorHex);
  return {
    id: genId(),
    kind,
    position: { ...position },
    colorRgb: rgb,
    intensity: intensityOverride ?? spec.intensity,
    radius: spec.radius,
    ttl: spec.ttl ?? Infinity,
  };
}

// 静态灯位生成:遍历房间 tile,L/N/S → 光源;世界坐标 = tile 中心(tileSize 缩放)。
// 静态光源 ttl = Infinity,id 用 tile 坐标保证稳定(引擎可 diff,重进房间不变)。
export function staticLightsFromRoom(room: RoomLayout): ActiveRcLight[] {
  const lights: ActiveRcLight[] = [];
  const tile = room.tileSize;
  for (let y = 0; y < room.height; y++) {
    const row = room.tiles[y] ?? '';
    for (let x = 0; x < room.width; x++) {
      const ch = row[x];
      const kind: RcLightKind | null =
        ch === 'L' ? 'oil_lamp' : ch === 'N' ? 'neon_sign' : ch === 'S' ? 'searchlight' : null;
      if (!kind) continue;
      const light = spawnLight(kind, { x: (x + 0.5) * tile, y: (y + 0.5) * tile });
      light.id = `static_${kind}_${x}_${y}`;
      lights.push(light);
    }
  }
  // B28:decorativeLights 与 tile 灯同管线,注册为真 RC 光源
  for (const dl of room.decorativeLights ?? []) {
    const light = spawnLight(dl.kind, { x: (dl.tile.x + 0.5) * tile, y: (dl.tile.y + 0.5) * tile });
    light.id = `static_${dl.kind}_${dl.tile.x}_${dl.tile.y}`;
    lights.push(light);
  }
  return lights;
}

// 注册活动光源:超 RC_MAX_ACTIVE_LIGHTS 时按优先级丢弃 —— 静态光源保底,
// 其余先丢离 origin(默认新光源位置,通常传玩家位置 = "丢最远")最远者,同距丢强度低者。
export function registerLight(lights: ActiveRcLight[], light: ActiveRcLight, origin?: Vec2): ActiveRcLight[] {
  const next = [...lights, light];
  if (next.length <= RC_MAX_ACTIVE_LIGHTS) return next;
  const from = origin ?? light.position;
  next.sort((a, b) => {
    const aStatic = a.ttl === Infinity;
    const bStatic = b.ttl === Infinity;
    if (aStatic !== bStatic) return aStatic ? 1 : -1;
    const da = v2Dist(a.position, from);
    const db = v2Dist(b.position, from);
    if (da !== db) return db - da;
    return b.intensity - a.intensity;
  });
  return next.slice(0, RC_MAX_ACTIVE_LIGHTS);
}

// 光源过期结果:alive = 存留光源,expired = 本帧过期光源 id(协调器据此派发 rcLightExpired)
export interface LightTickResult {
  alive: ActiveRcLight[];
  expired: string[];
}

// 推进全部光源 TTL 并剪除过期者(静态光源 ttl=Infinity 永不剪除)
export function tickLightsAndPrune(lights: ActiveRcLight[], dt: number): LightTickResult {
  const alive: ActiveRcLight[] = [];
  const expired: string[] = [];
  for (const light of lights) {
    if (light.ttl !== Infinity) {
      light.ttl -= dt;
    }
    if (light.ttl === Infinity || light.ttl > 0) {
      alive.push(light);
    } else {
      expired.push(light.id);
    }
  }
  return { alive, expired };
}

// 仅推进 TTL(不剪除;旧接口保留)
export function tickLights(lights: ActiveRcLight[], dt: number): void {
  for (const l of lights) {
    if (l.ttl !== Infinity) {
      l.ttl -= dt;
    }
  }
}

// 剪除过期光源,返回存留列表(旧接口保留)
export function pruneExpired(lights: ActiveRcLight[]): ActiveRcLight[] {
  return lights.filter((l) => l.ttl === Infinity || l.ttl > 0);
}
