// engine/devtools.ts — __gameManifest / __sim / __rendererInfo 注入（仅 DEV）+ 可选 Tweakpane 桥（TDD §3.4）
// 生产构建（import.meta.env.DEV === false）不注册、不引用。

import type { SimApi } from '../core/simulation/Simulation';
import type { SceneManager } from './SceneManager';

declare global {
  interface Window {
    __gameManifest?: () => string; // worldText.buildPromptContext(sim) 全文
    __sim?: unknown;               // Simulation 实例（只读调试）
    __rendererInfo?: () => { drawCalls: number; triangles: number; geometries: number; textures: number };
  }
}

export function installDevtools(sim: SimApi, scene: SceneManager): void {
  if (!import.meta.env.DEV) return;
  window.__gameManifest = () => sim.getManifestText();
  window.__sim = sim;
  window.__rendererInfo = () => scene.getRendererInfo();
  installTweakpane(scene);
}

/** Tweakpane 仅 DEV 可选依赖：未安装时动态 import 失败被吞，不影响任何路径。 */
function installTweakpane(scene: SceneManager): void {
  try {
    const spec = 'tweak' + 'pane'; // 非字面量模块名：未安装时 tsc 不解析、生产 import 图不含
    void import(spec)
      .then((mod) => {
        type PaneLike = {
          addBinding(obj: object, key: string, opts?: unknown): { on(event: string, cb: (ev: { value: unknown }) => void): unknown };
        };
        const Pane = (mod as { Pane?: new (opts?: unknown) => PaneLike }).Pane;
        if (typeof Pane !== 'function') return;
        const pane = new Pane({ title: 'Boss 焦虑 · DEV' });
        const anxiety = { value: 30 };
        pane.addBinding(anxiety, 'value', { min: 0, max: 100, label: 'anxiety' }).on('change', (ev) => {
          const v = ev.value as number;
          scene.setAnxiety(v, v < 31 ? 'calm' : v < 61 ? 'nervous' : v < 86 ? 'shaky' : 'panic');
        });
        const anims = { run: 'idleSway' as const };
        pane.addBinding(anims, 'run', {
          options: {
            idleSway: 'idleSway', armorFiddle: 'armorFiddle', standUp: 'standUp', swordRaise: 'swordRaise',
            attack: 'attack', knockdown: 'knockdown', hairTidy: 'hairTidy', breakCharacter: 'breakCharacter',
            kneelPanic: 'kneelPanic', pickUpSword: 'pickUpSword', bow: 'bow',
          },
        }).on('change', (ev) => scene.playBossAnim(ev.value as 'idleSway'));
      })
      .catch(() => undefined);
  } catch {
    /* 未安装 tweakpane → 忽略 */
  }
}
