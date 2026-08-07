// engine/InputManager.test.ts — 纯函数测试（固定机位地面轴映射 + 快捷键表）

import { describe, expect, it } from 'vitest';
import { mapCameraRelativeMove } from './InputManager';

describe('mapCameraRelativeMove', () => {
  it('maps forward (W) to +z and right (D) to +x (fixed base camera)', () => {
    expect(mapCameraRelativeMove(1, 0)).toEqual({ x: 0, y: 0, z: 1 });
    expect(mapCameraRelativeMove(0, 1)).toEqual({ x: 1, y: 0, z: 0 });
    expect(mapCameraRelativeMove(-1, 0)).toEqual({ x: 0, y: 0, z: -1 });
    expect(mapCameraRelativeMove(0, -1)).toEqual({ x: -1, y: 0, z: 0 });
  });

  it('normalizes diagonal movement', () => {
    const move = mapCameraRelativeMove(1, 1);
    expect(Math.hypot(move.x, move.z)).toBeCloseTo(1);
    expect(move.x).toBeCloseTo(move.z);
  });

  it('returns zero move when idle', () => {
    expect(mapCameraRelativeMove(0, 0)).toEqual({ x: 0, y: 0, z: 0 });
  });
});
