import * as THREE from "three";
import { createRenderer } from "./render/renderer";
import { GameScene } from "./render/scene";
import { FollowCamera } from "./render/camera";
import { ParticleSystem } from "./render/effects";
import { AudioSynth } from "./audio/synth";
import { initUI, destroyUI } from "./ui/overlay";
import { useGameStore } from "./state/store";
import { FixedLoopImpl } from "./core/fixedLoop";
import type { InputState } from "./logic/sim";
import { FIXED_DT } from "./core/types";

const app = document.getElementById("app")!;
const rendererHandle = createRenderer(app);
const gameScene = new GameScene();
rendererHandle.scene.add(gameScene.group);

const particles = new ParticleSystem(200);
rendererHandle.scene.add(particles.object3D);

const cameraRig = new FollowCamera(rendererHandle.camera, gameScene.shipObject, new THREE.Vector3(0, 0, 0));
cameraRig.snap();

const audio = new AudioSynth();
initUI(app, audio);

const input: InputState = { yaw: 0, pitch: 0, fire: false, weaponIndex: 0 };

const keys = new Set<string>();

window.addEventListener("keydown", (e) => {
  keys.add(e.code);
  if (e.code === "Space") e.preventDefault();
  audio.init();
});

window.addEventListener("keyup", (e) => keys.delete(e.code));

window.addEventListener("mousedown", (e) => {
  if (e.button === 0) {
    audio.init();
    input.fire = true;
  }
});

window.addEventListener("mouseup", (e) => {
  if (e.button === 0) input.fire = false;
});

window.addEventListener("resize", () => rendererHandle.resize());

const loop = new FixedLoopImpl(FIXED_DT);
loop.setSimStep((dt: number, time: number) => {
  const state = useGameStore.getState();
  input.yaw = (keys.has("KeyD") || keys.has("ArrowRight") ? 1 : 0) - (keys.has("KeyA") || keys.has("ArrowLeft") ? 1 : 0);
  input.pitch = (keys.has("KeyW") || keys.has("ArrowUp") ? 1 : 0) - (keys.has("KeyS") || keys.has("ArrowDown") ? 1 : 0);
  if (keys.has("Digit1")) input.weaponIndex = 0;
  if (keys.has("Digit2")) input.weaponIndex = 1;
  if (keys.has("Digit3")) input.weaponIndex = 2;
  if (keys.has("KeyR")) input.fire = true;
  if (state.sim) state.setInput(input);
  state.tick(dt);
  void time;
});

loop.setRenderStep((alpha: number, time: number) => {
  const state = useGameStore.getState();
  const sim = state.sim;
  if (sim && state.screen === "run") {
    gameScene.sync(sim, alpha);
  }
  cameraRig.update(1 / 60);
  particles.update(1 / 60);
  rendererHandle.render();
  void time;
});

loop.start();

window.addEventListener("beforeunload", () => {
  loop.stop();
  destroyUI();
  rendererHandle.dispose();
});
