/**
 * core/data/court.ts - v2.0 court voxels (procedural)
 *
 * Floor + neon edges + back wall + corner lights + rhythm bar baseline.
 */

import { COURT_SIZE_Y, COURT_SIZE_Z, RHYTHM_BAR_LENGTH_X, RHYTHM_BAR_Y } from '../constants.js';
import { COLORS } from './colors.js';
import type { Lane, Voxel } from '../types.js';

const FLOOR_Y = -COURT_SIZE_Y / 2 + 1;
const BACK_Z = -COURT_SIZE_Z / 2 + 0.5;
const DRUM_PAD_Y = -6.5;
const DRUM_PAD_Z = 3;
const DRUM_PAD_SIZE = 0.8;

/** 4 drum pads rendered in front of the camera (intro awakening stage). */
export const DRUM_PAD_DEFS: ReadonlyArray<{ lane: Lane; position: { x: number; y: number; z: number }; color: string }> = [
  { lane: 0, position: { x: -3, y: DRUM_PAD_Y, z: DRUM_PAD_Z }, color: COLORS.NOTE_PATA },
  { lane: 1, position: { x: -1, y: DRUM_PAD_Y, z: DRUM_PAD_Z }, color: COLORS.NOTE_PON },
  { lane: 2, position: { x: 1, y: DRUM_PAD_Y, z: DRUM_PAD_Z }, color: COLORS.NOTE_DON },
  { lane: 3, position: { x: 3, y: DRUM_PAD_Y, z: DRUM_PAD_Z }, color: COLORS.NOTE_CHAKA },
] as const;

export function generateCourtVoxels(): Voxel[] {
  const voxels: Voxel[] = [];

  // floor
  for (let x = -11; x <= 11; x++) {
    for (let z = -3; z <= 3; z++) {
      voxels.push({
        position: { x, y: FLOOR_Y, z },
        size: 1,
        color: COLORS.FLOOR_BASE,
        emissive: COLORS.FLOOR_BASE,
        emissiveIntensity: 0.2,
      });
    }
  }

  // neon edges
  for (let x = -11; x <= 11; x++) {
    for (const z of [-3, 3]) {
      voxels.push({
        position: { x, y: FLOOR_Y, z },
        size: 1,
        color: COLORS.FLOOR_LINE,
        emissive: COLORS.FLOOR_LINE,
        emissiveIntensity: 0.5,
      });
    }
  }
  for (let z = -3; z <= 3; z++) {
    for (const x of [-11, 11]) {
      voxels.push({
        position: { x, y: FLOOR_Y, z },
        size: 1,
        color: COLORS.FLOOR_LINE,
        emissive: COLORS.FLOOR_LINE,
        emissiveIntensity: 0.5,
      });
    }
  }

  // back wall decoration
  for (let x = -10; x <= 10; x += 2) {
    voxels.push({
      position: { x, y: FLOOR_Y + 1, z: BACK_Z },
      size: 1,
      color: COLORS.FLOOR_LINE,
      emissive: COLORS.FLOOR_LINE,
      emissiveIntensity: 0.35,
    });
  }

  // corner lights
  const corners = [
    { x: -10, z: -2.5 },
    { x: 10, z: -2.5 },
    { x: -10, z: 2.5 },
    { x: 10, z: 2.5 },
  ];
  for (const c of corners) {
    for (let y = FLOOR_Y + 1; y <= FLOOR_Y + 4; y++) {
      voxels.push({
        position: { x: c.x, y, z: c.z },
        size: 0.5,
        color: COLORS.HIGHLIGHT,
        emissive: COLORS.HIGHLIGHT,
        emissiveIntensity: 0.6,
      });
    }
  }

  // rhythm bar baseline (decorative)
  for (let x = -RHYTHM_BAR_LENGTH_X / 2; x <= RHYTHM_BAR_LENGTH_X / 2; x++) {
    voxels.push({
      position: { x, y: RHYTHM_BAR_Y, z: 0 },
      size: 0.25,
      color: COLORS.RHYTHM_BAR,
      emissive: COLORS.RHYTHM_BAR,
      emissiveIntensity: 0.5,
    });
  }

  // 4 drum pads (intro stage; also visible as idle court decor)
  for (const def of DRUM_PAD_DEFS) {
    voxels.push({
      position: def.position,
      size: DRUM_PAD_SIZE,
      color: def.color,
      emissive: def.color,
      emissiveIntensity: 0.35,
    });
  }

  return voxels;
}

export const DEFAULT_COURT_VOXELS: readonly Voxel[] = generateCourtVoxels();
