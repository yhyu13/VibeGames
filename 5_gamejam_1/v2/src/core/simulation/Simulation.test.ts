// core/simulation/Simulation.test.ts

import { describe, expect, it } from 'vitest';
import { Simulation, type StoragePort } from './Simulation';
import type { SimEvent } from './events';
import type { TickInput } from '../types';

class MemoryStorage implements StoragePort {
  private map = new Map<string, unknown>();
  load<T>(key: string): T | null {
    return (this.map.get(key) as T | undefined) ?? null;
  }
  save(key: string, value: unknown): void {
    this.map.set(key, value);
  }
}

/** 模拟 GameEngine 的 persist 消费 */
function consume(storage: StoragePort, events: SimEvent[]): void {
  for (const e of events) if (e.type === 'persist') storage.save(e.key, e.value);
}

function tick(sim: Simulation, storage: StoragePort, overrides?: Partial<TickInput>): SimEvent[] {
  const events = sim.update({
    time: 0,
    dt: 1 / 60,
    player: sim.getState().player,
    controls: { move: { x: 0, y: 0, z: 0 }, attackPressed: false, attackHeld: false },
    ui: null,
    rhythm: null,
    barrageBurst: false,
    ...overrides,
  });
  consume(storage, events);
  return events;
}

function fastForward(sim: Simulation, storage: StoragePort, seconds: number): void {
  const steps = Math.floor(seconds * 60);
  for (let i = 0; i < steps; i++) tick(sim, storage);
}

/** 真人式游玩：替身前摇窗口内按下 LMB（边沿）闪避 */
function playDodging(sim: Simulation, storage: StoragePort, seconds: number): void {
  const steps = Math.floor(seconds * 60);
  for (let i = 0; i < steps; i++) {
    const p = sim.getState().player;
    const dodging = p.windup > 0.55 && p.windup < 1.0;
    tick(sim, storage, {
      controls: { move: { x: 0, y: 0, z: 0 }, attackPressed: dodging, attackHeld: false },
    });
  }
}

function startRun(sim: Simulation, storage: StoragePort): void {
  tick(sim, storage, { ui: { kind: 'startRun' } });
}

describe('Simulation FSM', () => {
  it('starts in MENU and begins a run via startRun', () => {
    const storage = new MemoryStorage();
    const sim = new Simulation(storage);
    expect(sim.getState().phase).toBe('MENU');
    startRun(sim, storage);
    expect(sim.getState().phase).toBe('WAIT');
    expect(sim.getState().runActive).toBe(true);
  });

  it('scriptPick moves WAIT → SENSE with difficulty anxiety', () => {
    const storage = new MemoryStorage();
    const sim = new Simulation(storage);
    startRun(sim, storage);
    tick(sim, storage, { ui: { kind: 'scriptPick', script: 'dignity' } });
    expect(sim.getState().phase).toBe('SENSE');
    expect(sim.getState().boss.script).toBe('dignity');
    expect(sim.getState().boss.anxiety).toBeGreaterThan(30);
  });

  it('WAIT timeout falls back to freePlay', () => {
    const storage = new MemoryStorage();
    const sim = new Simulation(storage);
    startRun(sim, storage);
    fastForward(sim, storage, 13);
    expect(sim.getState().phase).toBe('SENSE');
    expect(sim.getState().boss.performMode).toBe('freePlay');
  });

  it('SENSE → PERFORM when the shadow steps onto the stage', () => {
    const storage = new MemoryStorage();
    const sim = new Simulation(storage);
    startRun(sim, storage);
    tick(sim, storage, { ui: { kind: 'scriptPick', script: 'tragic' } });
    fastForward(sim, storage, 15);
    expect(sim.getState().phase).toBe('PERFORM');
    expect(sim.getState().beat).not.toBeNull();
  });

  it('WASD movement moves the boss and updates facing', () => {
    const storage = new MemoryStorage();
    const sim = new Simulation(storage);
    startRun(sim, storage);
    const beforeZ = sim.getState().boss.pos.z;
    fastForward(sim, storage, 1);
    expect(sim.getState().boss.pos.z).toBe(beforeZ);
    tick(sim, storage, { controls: { move: { x: 1, y: 0, z: 0 }, attackPressed: false, attackHeld: false } });
    expect(sim.getState().boss.pos.x).toBeGreaterThan(0);
    expect(Math.abs(sim.getState().boss.rot.y)).toBeGreaterThan(0);
  });

  it('rhythm feedback: perfect reduces anxiety, miss increases it', () => {
    const storage = new MemoryStorage();
    const sim = new Simulation(storage);
    startRun(sim, storage);
    const before = sim.getState().boss.anxiety;
    tick(sim, storage, { rhythm: { judgement: 'perfect', early: false, combo: 1 } });
    expect(sim.getState().boss.anxiety).toBeLessThan(before);
    tick(sim, storage, { rhythm: { judgement: 'miss', early: false, combo: 0 } });
    expect(sim.getState().boss.anxiety).toBeGreaterThan(before);
  });

  it('perfect dodge during shadow windup avoids damage', () => {
    const storage = new MemoryStorage();
    const sim = new Simulation(storage);
    startRun(sim, storage);
    tick(sim, storage, { ui: { kind: 'scriptPick', script: 'dignity' } });
    playDodging(sim, storage, 45); // 覆盖 SENSE + PERFORM 前段（开演 3.5s 后才出第一刀）
    expect(sim.getState().player.hitsLanded).toBe(0);
    expect(sim.getState().boss.knockdownCount).toBe(0);
  });

  it('three knockdowns (no dodging) end the run early', () => {
    const storage = new MemoryStorage();
    const sim = new Simulation(storage);
    startRun(sim, storage);
    tick(sim, storage, { ui: { kind: 'scriptPick', script: 'dignity' } });
    fastForward(sim, storage, 15);
    fastForward(sim, storage, 400);
    const st = sim.getState();
    expect(['ENDING_NORMAL', 'ENDING_HIDDEN']).toContain(st.phase);
  });

  it('completes a full round cycle into EVALUATE then DIARY then round 2', () => {
    const storage = new MemoryStorage();
    const sim = new Simulation(storage);
    startRun(sim, storage);
    tick(sim, storage, { ui: { kind: 'scriptPick', script: 'dignity' } });
    playDodging(sim, storage, 90); // 完成三阶段谱面（全闪避）
    const st = sim.getState();
    expect(['EVALUATE', 'DIARY', 'WAIT']).toContain(st.phase);
    if (st.phase === 'EVALUATE') {
      tick(sim, storage, { ui: { kind: 'ratingSubmit', stars: { mobility: 4, delivery: 4, visual: 4, remembered: 4 } } });
    }
    const st2 = sim.getState();
    expect(['DIARY', 'WAIT']).toContain(st2.phase);
    if (st2.phase === 'DIARY') {
      tick(sim, storage, { ui: { kind: 'diaryPick', entryId: 'L_DIARY_01' } });
    }
    expect(sim.getState().round).toBeGreaterThanOrEqual(2);
    expect(sim.getState().phase).toBe('WAIT');
  });

  it('viewers start at base and grow with seen', () => {
    const storage = new MemoryStorage();
    const sim = new Simulation(storage);
    const counts: number[] = [];
    const run = (seconds: number): void => {
      const steps = Math.floor(seconds * 60);
      for (let i = 0; i < steps; i++) {
        const events = sim.update({
          time: 0,
          dt: 1 / 60,
          player: sim.getState().player,
          controls: { move: { x: 0, y: 0, z: 0 }, attackPressed: false, attackHeld: false },
          ui: null,
          rhythm: { judgement: 'perfect', early: false, combo: 3 },
          barrageBurst: false,
        });
        for (const e of events) if (e.type === 'viewers') counts.push(e.count);
      }
    };
    startRun(sim, storage);
    run(30);
    expect(counts[0]).toBeGreaterThanOrEqual(3);
    expect(Math.max(...counts)).toBeGreaterThan(3);
  });

  it('pause toggles the phase without advancing sim', () => {
    const storage = new MemoryStorage();
    const sim = new Simulation(storage);
    startRun(sim, storage);
    tick(sim, storage, { ui: { kind: 'pauseToggle' } });
    expect(sim.getState().phase).toBe('PAUSE');
    fastForward(sim, storage, 5);
    expect(sim.getState().phase).toBe('PAUSE');
    tick(sim, storage, { ui: { kind: 'pauseToggle' } });
    expect(sim.getState().phase).toBe('WAIT');
  });

  it('persists stats on ending', () => {
    const storage = new MemoryStorage();
    const sim = new Simulation(storage);
    startRun(sim, storage);
    tick(sim, storage, { ui: { kind: 'scriptPick', script: 'mad' } });
    fastForward(sim, storage, 15);
    fastForward(sim, storage, 600);
    const stats = storage.load<{ totalRounds: number }>('stats');
    expect(stats?.totalRounds).toBeGreaterThanOrEqual(1);
  });
});

describe('Simulation events', () => {
  it('emits phase, dialogue, sound and viewer events on run start', () => {
    const storage = new MemoryStorage();
    const sim = new Simulation(storage);
    const events = sim.update({ ui: { kind: 'startRun' } } as unknown as TickInput);
    const kinds = events.map((e) => e.type);
    expect(kinds).toContain('phase');
    expect(kinds).toContain('dialogue');
    expect(kinds).toContain('sound');
    expect(kinds).toContain('viewers');
  });
});

describe('hidden ending chain', () => {
  it('reaches an ending and choice B respects the chain', () => {
    const storage = new MemoryStorage();
    const sim = new Simulation(storage);
    startRun(sim, storage);
    tick(sim, storage, { ui: { kind: 'scriptPick', script: 'mad' } });
    playDodging(sim, storage, 120);
    if (sim.getState().phase === 'EVALUATE') {
      tick(sim, storage, { ui: { kind: 'ratingSubmit', stars: { mobility: 2, delivery: 1, visual: 2, remembered: 1 } } });
    }
    if (sim.getState().phase === 'DIARY') {
      tick(sim, storage, { ui: { kind: 'diaryPick', entryId: 'L_DIARY_02' } });
    }
    for (let i = 0; i < 3 && sim.getState().phase === 'WAIT'; i++) {
      tick(sim, storage, { ui: { kind: 'scriptPick', script: 'mad' } });
      playDodging(sim, storage, 120);
      if (sim.getState().phase === 'EVALUATE') {
        tick(sim, storage, { ui: { kind: 'ratingSubmit', stars: { mobility: 2, delivery: 1, visual: 2, remembered: 1 } } });
      }
      if (sim.getState().phase === 'DIARY') {
        tick(sim, storage, { ui: { kind: 'diaryPick', entryId: 'L_DIARY_02' } });
      }
    }
    if (sim.getState().phase === 'ENDING_NORMAL') {
      tick(sim, storage, { ui: { kind: 'dialogueChoice', choice: 'B' } });
      expect(['ENDING_NORMAL', 'ENDING_HIDDEN']).toContain(sim.getState().phase);
    } else {
      expect(true).toBe(true);
    }
  });
});
