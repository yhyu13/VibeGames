import { describe, expect, it } from 'vitest';
import { mapCameraRelativeMove } from './InputManager';

describe('camera-relative movement', () => {
  it('maps forward and right to fixed base-camera ground axes', () => {
    expect(mapCameraRelativeMove(1, 0)).toEqual({ x: -0.877, y: 0, z: -0.481 });
    expect(mapCameraRelativeMove(0, 1)).toEqual({ x: 0.481, y: 0, z: -0.877 });
  });

  it('normalizes diagonal movement', () => {
    const move = mapCameraRelativeMove(1, 1);
    expect(Math.hypot(move.x, move.z)).toBeCloseTo(1);
  });
});
