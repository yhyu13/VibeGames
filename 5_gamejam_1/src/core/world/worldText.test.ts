// src/core/world/worldText.test.ts — 世界即文本 tokenizers（TDD §3.4）
import { describe, expect, it } from 'vitest';
import type { BossState, PlayerPresence } from '../types';
import type { SimState } from '../simulation/Simulation';
import { buildPromptContext, describeEntities, describeRules, describeWorld } from './worldText';

const boss: BossState = {
  id: 'boss',
  innerState: 'PERFORM',
  pos: { x: 0, y: 0, z: 0 },
  rot: { x: 0, y: 0, z: 0 },
  hp: 60,
  maxHp: 100,
  anxiety: 42,
  seen: 50,
  band: 'nervous',
  script: 'dignity',
  stageIndex: 1,
  beatIndex: 2,
  performMode: 'scripted',
  recovering: false,
  knockdownCount: 1,
  breakdownTimer: 0,
  anim: 'swordRaise',
};

const player: PlayerPresence = {
  approachSpeed: 1.2,
  distanceToThrone: 3.5,
  dodgeCount: 2,
  hitsLanded: 3,
  dodgeTimingQuality: 1,
  barrageActive: false,
  aggression: 0.8,
  lingerTime: 2,
  state: 'engaging',
};

const simState: SimState = {
  boss,
  phase: 'PERFORM',
  round: 2,
  player,
  time: 45,
  beat: null,
};

describe('describeWorld', () => {
  it('emits a world section with bounds, anchors, colliders and lights', () => {
    const text = describeWorld();
    expect(text).toContain('【世界清单 world】');
    expect(text).toContain('x[-18,18] y[0,10] z[-14,14]');
    expect(text).toContain('王座位置: (-8, 0, 0)');
    expect(text).toContain('站位锚点: (-2,-4) (-2,0) (-2,4)');
    expect(text).toContain('玩家影子路径: (18,0) → (-8,0)');
    expect(text).toContain('立柱碰撞体: 4 根');
    expect(text).toContain('灯光锚点: 烛火(-8,3.2) 顶光(0,8)');
  });
});

describe('describeRules', () => {
  it('emits a rules section with frozen numbers', () => {
    const text = describeRules();
    expect(text).toContain('【规则 rules】');
    expect(text).toContain('WASD 走位');
    expect(text).toContain('总评 ≥4.5 完美 / ≥3.5 合格');
    expect(text).toContain('击倒累计 3 次提前谢幕');
    expect(text).toContain('R1: 逼近 1m/s · 伤害 20 · 闪避 30% · 弹幕 ≤1 条');
    expect(text).toContain('R2: 逼近 1.15m/s · 伤害 22 · 闪避 45% · 弹幕 ≤2 条');
    expect(text).toContain('R4: 逼近 1.5m/s · 伤害 30 · 闪避 75% · 弹幕 ≤3 条');
  });

  it('emits anxiety sources, decay, bands and rating axes', () => {
    const text = describeRules();
    expect(text).toContain('基线30');
    expect(text).toContain('轮次疲劳+4×(R−1)');
    expect(text).toContain('首见+8');
    expect(text).toContain('稳步逼近+1.4/s');
    expect(text).toContain('犹豫+0.6/s');
    expect(text).toContain('弹幕+12/条');
    expect(text).toContain('命中+5');
    expect(text).toContain('完美闪避+10');
    expect(text).toContain('普通闪避+3');
    expect(text).toContain('落空+2');
    expect(text).toContain('忘词+6');
    expect(text).toContain('打断+15');
    expect(text).toContain('跪地 2s 后回落 70');
    expect(text).toContain('无源 3s 后 −2/s');
    expect(text).toContain('评估阶段 −4/s（最多 −40 不破 10）');
    expect(text).toContain('完整率40%');
    expect(text).toContain('落空30%');
    expect(text).toContain('A1 走位 站位≥90% 且抖动<5% → 5★');
    expect(text).toContain('A2 台词 完整率≥95% 且零忘词 → 5★');
    expect(text).toContain('A3 视觉 3/3 阶段且连击≥4 → 5★');
    expect(text).toContain('A4 被看见 ≥80（系统代填）');
    expect(text).toContain('影子距离 <12m');
    expect(text).toContain('单阶段 30s、强制收尾 90s');
  });
});

describe('describeEntities', () => {
  it('emits boss, phase and player entity rows', () => {
    const text = describeEntities(simState);
    expect(text).toContain('【实体 entities】');
    expect(text).toContain('Boss: state=PERFORM hp=60/100 anxiety=42 band=nervous seen=50 script=dignity stage=2/3 beat=2 knockdowns=1');
    expect(text).toContain('全局阶段: PERFORM round=2');
    expect(text).toContain('玩家替身: engaging distance=3.5m hits=3 dodges=2');
  });
});

describe('buildPromptContext', () => {
  it('joins the three sections in order with blank lines', () => {
    const text = buildPromptContext(simState);
    expect(text).toBe(`${describeWorld()}\n\n${describeRules()}\n\n${describeEntities(simState)}`);
    expect(text.indexOf('【世界清单 world】')).toBeLessThan(text.indexOf('【规则 rules】'));
    expect(text.indexOf('【规则 rules】')).toBeLessThan(text.indexOf('【实体 entities】'));
  });
});
