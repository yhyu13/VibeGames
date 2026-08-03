import './style.css';
import { EventBus } from './core/events';
import { Input } from './core/input';
import { FixedTimestep } from './core/fixedTimestep';
import { RNG } from './core/rng';
import type { MajorAction, MinorAction, NodeId, RunState } from './core/types';
import { GameRenderer } from './render/renderer';
import { ParticleFx } from './render/fx';
import { createEarth, createStarfield } from './render/atmosphere';
import { CombatScene } from './combat/combatScene';
import { CombatHudView } from './ui/hud';
import { createMetaStore, type MetaStore } from './game/meta';
import {
  createRun,
  dayDefenses,
  startDay,
  destroyTarget,
  applyCounterattack,
  autoResolve,
  scoreRun,
  checkWin,
  primaryTargets,
} from './game/run';
import { applyMutation, applyBanes } from './game/mutations';
import { applyConversion, applyMessage, isJammed, suspicionTick } from './game/propaganda';
import { compromise, generatePuzzle } from './game/virus';
import { MESSAGES } from './data/messages';
import { initAudio, playSfx, startMusic, setSfxVolume, setMusicVolume } from './audio/synth';
import {
  showMenu,
  showScan,
  showPropaganda,
  showVirus,
  showBuild,
  showResults,
  type ScreenCtx,
} from './ui/screens';
import { runVirusMinigame } from './ui/minigame';
import { el } from './ui/dom';

const app = document.getElementById('app')!;
const renderer = new GameRenderer(app, true);
createStarfield(renderer.scene);

const earth = createEarth(150);
earth.position.set(0, -30, -300);
renderer.scene.add(earth);

const fx = new ParticleFx(renderer.scene);
const bus = new EventBus();
const input = new Input();
input.attach(renderer.renderer.domElement);

const uiLayer = el('div');
uiLayer.id = 'ui';
app.appendChild(uiLayer);

const meta: MetaStore = createMetaStore();
renderer.setBloom(meta.save.settings.gfx.bloom);
setSfxVolume(meta.save.settings.audio.sfx);
setMusicVolume(meta.save.settings.audio.music);

bus.on('audio:play', ({ id }) => playSfx(id));

let currentRun: RunState | null = null;
let combat: CombatScene | null = null;
let combatHud: CombatHudView | null = null;

function ctx(): ScreenCtx {
  return {
    ui: uiLayer,
    bus,
    meta,
    run: currentRun,
    cb: {
      startRun,
      executeMajor,
      executeMinor,
      endDay: endDayFlow,
      goMenu,
      buyWeapon: (id) => meta.buyWeapon(id),
      buyMutation: (id) => meta.buyMutation(id),
      upgradeWeapon,
      synthesize,
      mutate,
      applyPropaganda,
      attackNode,
      newRunFromResults: goMenu,
    },
  };
}

function ensureAudio(): void {
  initAudio();
  startMusic();
}

document.addEventListener(
  'click',
  () => {
    ensureAudio();
  },
  { once: true },
);

function goMenu(): void {
  endCombatSilent();
  showMenu(ctx());
}

function startRun(weaponIds: string[], daily: boolean): void {
  ensureAudio();
  const seed = daily ? seedFromDateNow() : Math.floor(Math.random() * 0x7fffffff);
  currentRun = createRun(seed, weaponIds.length ? weaponIds : ['plasma-lance', 'kinetic-rods']);
  enterScan();
}

function seedFromDateNow(): number {
  const d = new Date();
  let h = 2166136261;
  const s = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function enterScan(): void {
  if (!currentRun) return;
  currentRun.targets = primaryTargets(currentRun);
  dayDefenses(currentRun, bus);
  bus.emit('day:started', { day: currentRun.day });
  showScan(ctx());
}

function executeMajor(action: MajorAction, nodeId?: NodeId): void {
  if (!currentRun) return;
  switch (action) {
    case 'assault':
      startCombat();
      break;
    case 'propaganda':
      if (currentRun.day <= currentRun.jammedUntil) return;
      showPropaganda(ctx());
      break;
    case 'virus':
      showVirus(ctx());
      break;
    case 'doomsday': {
      const dealt = doomsdayNow();
      if (dealt > 0) enterBuild();
      break;
    }
  }
  void nodeId;
}

function doomsdayNow(): number {
  if (!currentRun) return 0;
  if (currentRun.day <= currentRun.doomsdayUsed + 2) return 0;
  currentRun.doomsdayUsed = currentRun.day;
  const rng = new RNG(currentRun.seed + currentRun.day * 104729);
  const targets = currentRun.targets.filter((t) => !t.destroyed);
  let dealt = 0;
  for (const t of targets) {
    if (rng.chance(0.8)) {
      const dmg = 150 / Math.max(1, targets.length) + rng.int(0, 30);
      t.hp -= dmg;
      dealt += dmg;
      if (t.hp <= 0) destroyTarget(currentRun, t, bus);
    }
  }
  pushLog(`Doomsday Ray strikes: ${Math.round(dealt)} damage.`);
  return dealt;
}

function executeMinor(action: MinorAction): void {
  if (!currentRun) return;
  const run = currentRun;
  switch (action) {
    case 'repair':
      if (run.salvage < 3) return;
      run.salvage -= 3;
      run.ship.hull = Math.min(run.ship.maxHull, run.ship.hull + 20);
      bus.emit('hull:changed', { hull: run.ship.hull, maxHull: run.ship.maxHull });
      bus.emit('salvage:changed', { salvage: run.salvage });
      pushLog('Hull repaired +20.');
      break;
    case 'resupply':
      run.salvage += 6;
      bus.emit('salvage:changed', { salvage: run.salvage });
      pushLog('Resupply: +6 salvage.');
      break;
    case 'drone':
      if (run.salvage < 5) return;
      run.salvage -= 5;
      run.autoDisables += 1;
      bus.emit('salvage:changed', { salvage: run.salvage });
      pushLog('Deployed drone: disables 1 defense per day.');
      break;
    case 'analyze':
      for (const s of run.segments) s.suspicion = Math.max(0, s.suspicion - 12);
      pushLog('Analysis complete: suspicion reduced.');
      break;
  }
}

function upgradeWeapon(id: string): boolean {
  if (!currentRun || currentRun.salvage < 6) return false;
  currentRun.salvage -= 6;
  currentRun.ship.weaponMods[id] = (currentRun.ship.weaponMods[id] ?? 0) + 10;
  bus.emit('salvage:changed', { salvage: currentRun.salvage });
  pushLog(`Weapon upgraded: ${id} +10 damage.`);
  return true;
}

function synthesize(a: string, b: string): boolean {
  if (!currentRun || currentRun.salvage < 8) return false;
  currentRun.salvage -= 8;
  const hybrid = `${a}+${b}`;
  currentRun.ship.weaponIds = currentRun.ship.weaponIds.filter((w) => w !== a && w !== b);
  currentRun.ship.weaponIds.push(hybrid);
  bus.emit('salvage:changed', { salvage: currentRun.salvage });
  pushLog(`Synthesized hybrid weapon: ${hybrid}.`);
  return true;
}

function mutate(id: string): void {
  if (!currentRun) return;
  applyMutation(currentRun, id, bus);
  showBuild(ctx());
}

function applyPropaganda(cardIds: string[]): void {
  if (!currentRun) return;
  const run = currentRun;
  if (cardIds.length === 0) return;
  for (const id of cardIds) {
    const card = MESSAGES.find((m) => m.id === id);
    if (!card) continue;
    const res = applyMessage(run.segments, card, run.profile.propagandaMult * run.ship.broadcast);
    run.segments = res.segments;
    for (const sid of res.newlyConverted) applyConversion(run, sid, bus);
    pushLog(`Broadcast: "${card.name}" (+${Math.round(card.conviction * run.profile.propagandaMult)} conviction).`);
  }
  if (isJammed(run.segments)) {
    run.jammedUntil = run.day + 2;
    pushLog('Suspicion threshold reached — broadcast array JAMMED for 2 days.');
  }
  enterBuild();
}

function attackNode(nodeId: NodeId): void {
  if (!currentRun) return;
  const run = currentRun;
  const node = run.nodes.find((n) => n.id === nodeId);
  if (!node || node.compromised) return;
  const cortexBonus = run.mutations.some((m) => m.id === 'overclocked-cortex') ? 2 : 0;
  const puzzle = generatePuzzle(run.seed + run.day * 65537, nodeId, run.day, cortexBonus);
  const overlay = el('div');
  overlay.style.position = 'absolute';
  overlay.style.inset = '0';
  overlay.style.background = 'rgba(0,0,0,0.6)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  uiLayer.appendChild(overlay);
  void runVirusMinigame(overlay, puzzle, () => overlay.remove()).then((res) => {
    overlay.remove();
    if (!currentRun) return;
    if (res.success && res.solved) {
      compromise(currentRun, nodeId, bus);
    } else {
      for (const s of currentRun.segments) s.suspicion = Math.min(100, s.suspicion + 5);
      pushLog(`Virus injection failed against ${nodeId}.`);
    }
    enterBuild();
  });
}

function pushLog(text: string): void {
  currentRun?.log.push(text);
  bus.emit('log', { text });
}

function startCombat(): void {
  if (!currentRun) return;
  combatHud = new CombatHudView({
    onExpedite: () => expedite(),
    onAbort: () => {
      if (combat) combatEnd({ victory: false, hullLoss: 0, destroyedIds: [] });
    },
  });
  uiLayer.appendChild(combatHud.root);
  combat = new CombatScene(currentRun, bus, fx, renderer.camera, combatHud, input);
  renderer.scene.add(combat.group);
  combatHud.onEndHook((result) => combatEnd(result));
  input.requestLock(renderer.renderer.domElement);
  renderer.renderer.domElement.addEventListener('click', onCanvasClick);
}

function onCanvasClick(): void {
  if (combat && !input.pointerLocked) input.requestLock(renderer.renderer.domElement);
}

function expedite(): void {
  if (!currentRun || !combat) return;
  const rng = new RNG(currentRun.seed ^ (currentRun.day * 2654435761));
  const res = autoResolve(currentRun, 45, rng);
  for (const id of res.destroyedIds) {
    const t = currentRun.targets.find((x) => x.id === id);
    if (t) {
      t.destroyed = true;
      t.hp = 0;
      destroyTarget(currentRun, t, bus);
    }
  }
  if (res.hullLoss > 0) pushLog(`Withdrawal under fire: -${res.hullLoss} hull.`);
  const remaining = currentRun.targets.filter((t) => !t.destroyed);
  const victory = remaining.length === 0;
  combatEnd({ victory, hullLoss: res.hullLoss, destroyedIds: res.destroyedIds });
}

function combatEnd(result: { victory: boolean; hullLoss: number; destroyedIds: string[] }): void {
  const run = currentRun;
  if (combat) {
    combat.dispose();
    combat = null;
  }
  if (combatHud) {
    combatHud.dispose();
    combatHud = null;
  }
  renderer.renderer.domElement.removeEventListener('click', onCanvasClick);
  input.releaseLock();
  if (!run) return;
  bus.emit('combat:end', { victory: result.victory });
  pushLog(result.victory ? 'Assault successful — all targets eliminated.' : `Assault failed (${result.destroyedIds.length} destroyed).`);
  if (run.ship.hull <= 0) {
    endRun('defeat');
    return;
  }
  enterBuild();
}

function enterBuild(): void {
  showBuild(ctx());
}

function endDayFlow(): void {
  if (!currentRun) return;
  const run = currentRun;
  applyCounterattack(run, bus);
  run.segments = suspicionTick(run.segments);
  if (run.ship.hull <= 0) {
    endRun('defeat');
    return;
  }
  const outcome = checkWin(run);
  if (outcome !== 'none') {
    endRun(outcome);
    return;
  }
  const rng = new RNG(run.seed + run.day * 1299709);
  applyBanes(run, rng, bus);
  startDay(run, bus);
  enterScan();
}

function endRun(outcome: RunState['outcome']): void {
  if (!currentRun) return;
  const run = currentRun;
  run.outcome = outcome;
  const alienium = scoreRun(run);
  const bloodless = outcome === 'shutdown' || outcome === 'conversion';
  meta.recordRun(outcome, alienium, bloodless);
  showResults(ctx(), outcome, alienium);
}

function endCombatSilent(): void {
  if (combat) {
    combat.dispose();
    combat = null;
  }
  if (combatHud) {
    combatHud.dispose();
    combatHud = null;
  }
  input.releaseLock();
}

const clock = new FixedTimestep(60);
let menuAngle = 0;

function fixedUpdate(): void {
  combat?.fixedUpdate(1 / 60);
  fx.update(1 / 60);
}

function renderFrame(): void {
  if (!combat) {
    menuAngle += 0.0016;
    renderer.camera.position.set(Math.cos(menuAngle) * 380, 40, Math.sin(menuAngle) * 380 - 300);
    renderer.camera.lookAt(earth.position);
  }
  earth.rotation.y += 0.0004;
  renderer.render();
}

function loop(now: number): void {
  requestAnimationFrame(loop);
  clock.frame(now, fixedUpdate);
  renderFrame();
}

requestAnimationFrame((t) => {
  clock.start(t);
  loop(t);
});

goMenu();
