// Lighting setup: IBL via RoomEnvironment + key/fill/rim.

import {
  AmbientLight,
  DirectionalLight,
  HemisphereLight,
  PMREMGenerator,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { WebGLRenderer } from 'three';

export function setupLighting(scene: import('three').Scene, renderer: WebGLRenderer) {
  // IBL via RoomEnvironment (no external HDR for MVP)
  const pmrem = new PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;

  // Key
  const key = new DirectionalLight('#cce0ff', 1.2);
  key.position.set(8, 12, 16);
  scene.add(key);

  // Fill (alien violet)
  const fill = new DirectionalLight('#9b6cff', 0.7);
  fill.position.set(-10, -4, 8);
  scene.add(fill);

  // Rim (alien green)
  const rim = new DirectionalLight('#6cff9b', 0.6);
  rim.position.set(0, -10, 12);
  scene.add(rim);

  // Hemisphere for soft ambient
  const hemi = new HemisphereLight('#7080a0', '#0a0a14', 0.5);
  scene.add(hemi);

  // Low ambient floor
  const amb = new AmbientLight('#1a1a26', 0.3);
  scene.add(amb);

  return { key, fill, rim, hemi, amb };
}