// Top-level game orchestrator. Wires state + render + input + audio + save.

import { signal, effect } from '@preact/signals-core';
import { WebGLRenderer } from 'three';
import { Env } from './Env.js';
import { Loop } from './Loop.js';
import { GameScene } from '../render/Scene.js';
import { EarthView } from '../render/Earth/EarthView.js';
import { ShipView } from '../render/Ship/ShipView.js';
import { ProjectilePool } from '../render/Combat/ProjectilePool.js';
import { DefenseView } from '../render/Combat/DefenseView.js';
import { MissileView } from '../render/Combat/MissileView.js';
import { HUD } from '../render/UI/HUD.js';
import { StrategicMap } from '../render/UI/StrategicMap.js';
import { BurdenOverlay } from '../render/UI/BurdenOverlay.js';
import { EndScreen } from '../render/UI/EndScreen.js';
import { Input } from '../input/Input.js';
import { audio } from '../audio/AudioGraph.js';
import { playFire, playHit, playExplosion, playMissileLaunch } from '../audio/Sfx.js';
import { createEarthState, recordWeaponUse, adjustEarthStat } from '../state/earth/EarthState.js';
import { createShipState, damageShip, consumeEnergy, addHeat, coolShip } from '../state/ship/ShipState.js';
import { generateRegionLayout, attachRegionsToEarth } from '../state/earth/regions-layout.js';
import { pickRandomConditions } from '../state/earth/conditions.js';
import { createRng, type RNG } from '../state/rng.js';
import { asCommanderId, asArchetypeId, asWeaponId } from '../state/id.js';
import { spawnProjectile, tickProjectile } from '../state/combat/Projectile.js';
import { spawnDefenseFromSpec, tickDefense } from '../state/combat/Defense.js';
import { launchMissile, tickMissile, isMissileLive } from '../state/combat/Missile.js';
import { computeDamage, applyDamageToDefense } from '../state/combat/Damage.js';
import { pickTarget } from '../state/combat/Targeting.js';
import { evaluateBurdens, commitBurdens, tierOf, applyInstability, setInstabilityRng, createInstabilityTracker, type InstabilityTracker } from '../state/ship/Instability.js';
import { tickEscalation, setEscalationRng } from '../state/progression/Escalation.js';
import { interceptMissile } from '../state/combat/Missile.js';
import { getActiveCounterEffect } from '../state/progression/Counter.js';
import { regenShield } from '../state/ship/ShipState.js';
import { detectEnding } from '../state/progression/VictoryPaths.js';
import { createEventLog, logEvent } from '../state/progression/Events.js';
import { store, defaultSettings, defaultMeta } from '../state/save/Store.js';
import { snapshotRun } from '../state/save/Snapshot.js';
import { applyCounterEffects } from '../state/progression/Counter.js';
import { ADAPTATION_DEFS_BY_ID } from '../state/ship/adaptations.js';
import { initVirus, updateVirus } from '../state/puzzle/Virus.js';
import { initPropaganda, updatePropaganda } from '../state/puzzle/Propaganda.js';
import type { Projectile, Defense, Missile, RunState, PuzzleKind } from '../state/types.js';
import type { PuzzleState } from '../state/puzzle/Puzzle.js';
import { WEAPON_DEFS_BY_ID } from '../state/ship/weapons.js';
import { REGION_DEFS_BY_ID } from '../state/earth/regions.js';

const INTEGRITY_PER_KILL = 5;          // 20 kills from 24 defenses + nukes finish it
const ANNIHILATION_PROGRESS_PER_KILL = 0.045; // 22 kills -> ~1.0 progress
const SHIP_HIT_PROBABILITY = 0.18;
const ENEMY_PROJECTILE_DAMAGE = 4;
const MISSILE_IMPACT_DAMAGE = 35;
const PUZZLE_TRIGGER_INTERVAL_TICKS = 600;
const PUZZLE_AUTO_TIMEOUT_SEC = 45;

export class Game {
  readonly canvas: HTMLCanvasElement;
  readonly renderer: WebGLRenderer;
  readonly scene: GameScene;
  readonly run: RunState;
  readonly input: Input;
  readonly loop: Loop;
  readonly hud: HUD;
  readonly strategicMap: StrategicMap;
  readonly burdenOverlay: BurdenOverlay;
  readonly endScreen: EndScreen;

  readonly earthView: EarthView;
  readonly shipView: ShipView;
  readonly projectilePool: ProjectilePool;
  readonly defenseView: DefenseView;
  readonly missileView: MissileView;

  private projectiles: Projectile[] = [];
  private defenses: Defense[] = [];
  private missiles: Missile[] = [];
  private combatRegion: string | null = null;
  private lastPrimaryPulse = 0;
  private lastSecondaryPulse = 0;
  private rng: RNG;
  private nextPuzzleAtTick = 0;
  private activePuzzle: PuzzleState | null = null;
  private instabilityTracker: InstabilityTracker = createInstabilityTracker();
  private destructionKills = 0;
  private puzzleKills = 0;
  private totalKills = 0;
  private shieldRegenAttempts = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.renderer = new WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);

    this.scene = new GameScene();
    this.scene.init(this.renderer);
    this.scene.resize(window.innerWidth, window.innerHeight);

    // Seed deterministically. ?seed=URL param allows replay; otherwise a fixed
// default makes runs reproducible across hot reloads.
    const urlSeed = new URLSearchParams(location.search).get('seed');
    const seed = urlSeed ? Number(urlSeed) >>> 0 : 0x4ea11ad5;
    this.rng = createRng(seed);
    setEscalationRng(this.rng);
    setInstabilityRng(this.rng);
    this.run = this.newRun(seed);

    this.input = new Input();
    this.input.attach(window);

    this.earthView = new EarthView(this.run.earth);
    this.scene.scene.add(this.earthView.group);
    this.shipView = new ShipView(this.run.ship);
    this.scene.scene.add(this.shipView.group);
    this.projectilePool = new ProjectilePool();
    this.scene.scene.add(this.projectilePool.group);
    this.defenseView = new DefenseView();
    this.scene.scene.add(this.defenseView.group);
    this.missileView = new MissileView();
    this.scene.scene.add(this.missileView.group);

    this.hud = new HUD(this.run);
    this.strategicMap = new StrategicMap(this.run);
    this.burdenOverlay = new BurdenOverlay(this.run.ship);
    this.endScreen = new EndScreen();

    window.addEventListener('resize', () => this.handleResize());

    this.loop = new Loop({
      tick: (dt) => this.tick(dt),
      render: (alpha) => this.render(alpha),
    });

    effect(() => {
      const inst = this.run.ship.instability.value;
      audio.setInstability(inst / 100);
    });

    effect(() => {
      const outcome = this.run.outcome.value;
      if (outcome) {
        this.endScreen.show(outcome, this.run.clock.peek(), () => this.restart());
      }
    });

    const onFirstInput = () => {
      audio.init();
      audio.resume();
      window.removeEventListener('keydown', onFirstInput);
      window.removeEventListener('mousedown', onFirstInput);
    };
    window.addEventListener('keydown', onFirstInput);
    window.addEventListener('mousedown', onFirstInput);

    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyM' && !e.repeat) this.strategicMap.toggle();
      if (e.code === 'KeyX' && !e.repeat) this.handleAltFire();
      if (e.code === 'Escape' && !e.repeat) this.tryIntercept();
      if (e.code === 'KeyP' && !e.repeat) this.tryOfferPuzzle();
    });
  }

  start(): void {
    this.loop.start();
    this.startCombat();
  }

  private restart(): void {
    void store.appendRun({
      id: `${this.run.seed.peek()}-${Date.now()}`,
      seed: this.run.seed.peek(),
      commander: this.run.commander,
      outcome: this.run.outcome.peek() ?? { kind: 'defeat', reason: 'mission' },
      ticks: this.run.clock.peek(),
      startedAt: Date.now() - this.run.clock.peek() * 16,
      endedAt: Date.now(),
    });
    location.reload();
  }

  private newRun(seed: number): RunState {
    const rng = createRng(seed);
    const earth = createEarthState();
    const regions = generateRegionLayout(rng, 8);
    attachRegionsToEarth(earth, regions);
    earth.activeConditions.value = pickRandomConditions(rng, Env.CONDITION_COUNT);
    const ship = createShipState();

    void store.loadSettings().then((s) => { if (!s) void store.saveSettings(defaultSettings()); });
    void store.loadMeta().then((m) => { if (!m) void store.saveMeta(defaultMeta()); });

    return {
      seed: signal(seed),
      commander: asCommanderId('harvester'),
      archetype: asArchetypeId('harvester'),
      earth,
      ship,
      victory: {
        annihilation: signal(0),
        submission: signal(0),
        digital: signal(0),
        fracture: signal(0),
      },
      events: createEventLog(),
      encounter: signal({ kind: 'strategic' }),
      clock: signal(0),
      outcome: signal(null),
    };
  }

  private startCombat(): void {
    const region = Object.values(this.run.earth.regions.peek()).find((r) => r.visualState.peek() === 'intact');
    if (!region) return;
    this.combatRegion = region.id;
    const def = REGION_DEFS_BY_ID[region.id];
    if (!def) return;
    this.defenses = [
      spawnDefenseFromSpec(region.id, 'low', 0.0, def.defense),
      spawnDefenseFromSpec(region.id, 'high', 0.4, def.defense),
      spawnDefenseFromSpec(region.id, 'atmosphere', 0.8, def.defense),
    ];
    this.run.encounter.value = { kind: 'combat', regionId: region.id, defenses: this.defenses, missiles: [] };
    this.hud.showMissileWarning(`ENGAGED: ${def.name.toUpperCase()}`);
    setTimeout(() => this.hud.hideMissileWarning(), 2000);
  }

  /** Cycle to next intact region when current is cleared. */
  private tryAdvanceRegion(): void {
    if (this.defenses.some((d) => d.hp > 0)) return;
    if (!this.combatRegion) return;
    const region = this.run.earth.regions.peek()[this.combatRegion];
    if (region) {
      region.visualState.value = 'destroyed';
      adjustEarthStat(this.run.earth, 'globalPanic', 6);
      logEvent(this.run.events, 'region-destroyed', this.run.clock.peek(), { regionId: this.combatRegion });
    }
    this.combatRegion = null;
    setTimeout(() => this.startCombat(), 800);
  }

  private handleFire(): void {
    if (this.run.outcome.peek()) return;
    const encounter = this.run.encounter.peek();
    if (!encounter || encounter.kind !== 'combat') return;
    const slot = this.run.ship.weapons.peek()[0];
    if (!slot) return;
    const def = WEAPON_DEFS_BY_ID[slot.archetype];
    if (!def) return;
    if (!consumeEnergy(this.run.ship, def.cost)) return;
    addHeat(this.run.ship, def.heat);
    const shipPos = this.run.ship.position.peek();
    const proj = spawnProjectile(shipPos.lane, shipPos.arc, slot.archetype, 'player');
    this.projectiles.push(proj);
    recordWeaponUse(this.run.earth, def.element, shipPos.lane);
    playFire(String(def.element));
  }

  private handleAltFire(): void {
    if (this.run.outcome.peek()) return;
    const ws = this.run.ship.weapons.peek().slice();
    if (ws.length < 2) return;
    [ws[0], ws[1]] = [ws[1]!, ws[0]!];
    this.run.ship.weapons.value = ws;
  }

  private tryIntercept(): void {
    for (const m of this.missiles) {
      if (!m.intercepted && interceptMissile(m, this.rng)) {
        playExplosion();
        logEvent(this.run.events, 'missile-intercepted', this.run.clock.peek());
        this.hud.hideMissileWarning();
        return;
      }
    }
  }

  /** Periodically offer a puzzle opportunity. */
  private tryOfferPuzzle(): void {
    if (this.run.outcome.peek()) return;
    if (this.activePuzzle) return;
    const kind: PuzzleKind = this.rng.chance(0.5) ? 'virus' : 'propaganda';
    const seed = Math.floor(this.rng.next() * 0x7fffffff);
    const timer = 60;
    this.activePuzzle = kind === 'virus' ? initVirus('p1', seed, timer) : initPropaganda('p1', seed, timer);
    this.run.encounter.value = { kind: 'puzzle', puzzleId: 'p1', seed, timer };
    this.hud.showMissileWarning(`PUZZLE: ${kind.toUpperCase()} — X to advance, ESC to stealth`);
    logEvent(this.run.events, 'puzzle-started', this.run.clock.peek(), { kind, seed });
  }

  private resolvePuzzle(outcome: { networkDelta: number; unityDelta: number; resolveDelta: number; panicDelta: number; disableDefense?: 'turret' | 'battery' | 'shield' | 'jammer' | 'satellite' | 'mine' | 'decoy' | 'nuclear'; revealIntel?: string }): void {
    const e = this.run.earth;
    const fx = getActiveCounterEffect(e);
    const halfProp = fx === 'propaganda:half-effect' ? 0.5 : 1.0;
    const nDelta = outcome.networkDelta * (this.activePuzzle?.kind === 'propaganda' ? halfProp : 1.0);
    const uDelta = outcome.unityDelta * (this.activePuzzle?.kind === 'propaganda' ? halfProp : 1.0);
    const rDelta = outcome.resolveDelta * (this.activePuzzle?.kind === 'propaganda' ? halfProp : 1.0);
    const pDelta = outcome.panicDelta * (this.activePuzzle?.kind === 'propaganda' ? halfProp : 1.0);
    adjustEarthStat(e, 'networkControl', nDelta);
    adjustEarthStat(e, 'humanUnity', uDelta);
    adjustEarthStat(e, 'humanResolve', rDelta);
    adjustEarthStat(e, 'globalPanic', pDelta);
    if (outcome.disableDefense) {
      for (const d of this.defenses) if (d.type === outcome.disableDefense) d.hp = 0;
    }
    const v = this.run.victory;
    if (nDelta > 0) v.digital.value = Math.min(1, v.digital.peek() + nDelta / 200);
    if (uDelta < 0) v.fracture.value = Math.min(1, v.fracture.peek() + -uDelta / 100);
    if (rDelta < 0) v.submission.value = Math.min(1, v.submission.peek() + -rDelta / 60);
    if (pDelta > 0) v.submission.value = Math.min(1, v.submission.peek() + pDelta / 200);
    if (this.activePuzzle?.success) this.puzzleKills++;
    applyInstability(this.run.ship, 8);
    this.activePuzzle = null;
    this.run.encounter.value = { kind: 'combat', regionId: this.combatRegion as never, defenses: this.defenses, missiles: this.missiles };
    logEvent(this.run.events, 'puzzle-resolved', this.run.clock.peek(), outcome);
    this.hud.hideMissileWarning();
  }

  /** Grant an alien adaptation mid-run as the Instability economy source. */
  private grantAdaptation(id: string): void {
    if (this.run.ship.adaptations.peek().includes(id as never)) return;
    const def = ADAPTATION_DEFS_BY_ID[id];
    if (!def) return;
    const list = this.run.ship.adaptations.peek().slice();
    list.push(id as never);
    this.run.ship.adaptations.value = list;
    applyInstability(this.run.ship, def.instabilityCost);
    logEvent(this.run.events, 'adaptation-granted', this.run.clock.peek(), { id, cost: def.instabilityCost });
    this.hud.showMissileWarning(`ADAPTATION: ${def.name.toUpperCase()} (+${def.instabilityCost} instability)`);
    setTimeout(() => this.hud.hideMissileWarning(), 2500);
  }

  private tick(dt: number): void {
    if (this.run.outcome.peek()) return;
    this.run.clock.value++;

    const primaryNow = this.input.primaryPulse.peek();
    const secondaryNow = this.input.secondaryPulse.peek();
    const primaryJustPressed = primaryNow !== this.lastPrimaryPulse;
    const secondaryJustPressed = secondaryNow !== this.lastSecondaryPulse;
    if (primaryJustPressed) {
      this.lastPrimaryPulse = primaryNow;
      if (!this.activePuzzle) this.handleFire();
    }
    if (secondaryJustPressed) {
      this.lastSecondaryPulse = secondaryNow;
      if (!this.activePuzzle) this.handleAltFire();
    }

    // Puzzle tick (every frame for timer + detection; input only on pulse)
    if (this.activePuzzle) {
      this.tickPuzzle(dt, primaryJustPressed, secondaryJustPressed);
    }

    // Movement
    const s = this.input.state.peek();
    if (s.moveLeft) {
      const p = this.run.ship.position.peek();
      this.run.ship.position.value = { ...p, arc: p.arc - 1.2 * dt };
    }
    if (s.moveRight) {
      const p = this.run.ship.position.peek();
      this.run.ship.position.value = { ...p, arc: p.arc + 1.2 * dt };
    }
    if (s.laneUp) {
      const p = this.run.ship.position.peek();
      const order = ['atmosphere', 'low', 'high'] as const;
      const idx = order.indexOf(p.lane);
      this.run.ship.position.value = { ...p, lane: order[(idx + 2) % 3]! };
    }
    if (s.laneDown) {
      const p = this.run.ship.position.peek();
      const order = ['atmosphere', 'low', 'high'] as const;
      const idx = order.indexOf(p.lane);
      this.run.ship.position.value = { ...p, lane: order[(idx + 1) % 3]! };
    }

    this.tickCombat(dt);
    coolShip(this.run.ship, 3 * dt);

    // Periodic shield regen; halved when shield-breaker counter is active
    const fx = getActiveCounterEffect(this.run.earth);
    const shipPos = this.run.ship.position.peek();
    const inHighJam = fx === 'high-orbit:jam-signal' && shipPos.lane === 'high';
    if (this.run.clock.peek() % 60 === 0) {
      const regen = fx === 'ship:shield-regen-halved' ? 2 : 4;
      regenShield(this.run.ship, inHighJam ? 0 : regen);
      this.shieldRegenAttempts++;
    }

    const newBurdens = evaluateBurdens(this.run.ship, this.instabilityTracker);
    if (newBurdens.length > 0) {
      commitBurdens(this.run.ship, newBurdens);
      logEvent(this.run.events, 'burden-added', this.run.clock.peek(), newBurdens);
    }

    tickEscalation(this.run, dt);
    applyCounterEffects(this.run, this.defenses, this.missiles);

    const ending = detectEnding(this.run);
    if (ending) this.run.outcome.value = ending;

    if (this.run.ship.hull.peek() <= 0) {
      this.run.outcome.value = { kind: 'defeat', reason: 'hull' };
    }
    if (tierOf(this.run.ship.instability.peek()) === 'collapse' && this.run.clock.peek() % 60 === 0) {
      damageShip(this.run.ship, 5);
    }

    // Update behavior histograms so adaptive counters actually adapt.
    this.totalKills = Math.max(this.totalKills, this.destructionKills + this.puzzleKills);
    if (this.totalKills > 0) {
      this.run.earth.playerBehavior.destructionRatio.value =
        this.destructionKills / this.totalKills;
    }
    const avgShieldReliance = this.totalKills > 0 ? Math.min(1, this.shieldRegenAttempts / (this.totalKills + 1) / 60) : 0;
    this.run.earth.playerBehavior.shieldReliance.value = avgShieldReliance;

    // Periodic adaptation grant so the Instability economy exists.
    // First grant at tick 300, then every 1200 ticks (~20s).
    if (this.run.clock.peek() === 300) this.grantAdaptation('void-step');
    else if (this.run.clock.peek() === 900) this.grantAdaptation('eye-of-the-void');
    else if (this.run.clock.peek() === 1500) this.grantAdaptation('resonance-cascade');
    else if (this.run.clock.peek() === 2100) this.grantAdaptation('phase-lance');

    // Auto-offer puzzle every PUZZLE_TRIGGER_INTERVAL_TICKS if none active
    if (
      this.run.clock.peek() > 0 &&
      this.run.clock.peek() >= this.nextPuzzleAtTick &&
      !this.activePuzzle
    ) {
      this.tryOfferPuzzle();
      this.nextPuzzleAtTick = this.run.clock.peek() + PUZZLE_TRIGGER_INTERVAL_TICKS;
    }

    // Region cycling
    this.tryAdvanceRegion();

    if (this.run.clock.peek() % 600 === 0) {
      void store.saveLive(snapshotRun(this.run));
    }
  }

  private tickPuzzle(dt: number, primaryJustPressed: boolean, secondaryJustPressed: boolean): void {
    if (!this.activePuzzle) return;
    const input = {
      primary: primaryJustPressed,
      secondary: secondaryJustPressed,
      cursor: { x: 0, y: 0 },
    };
    const puzzleFx = getActiveCounterEffect(this.run.earth);
    const detectionBoost = puzzleFx === 'puzzle:faster-detection' ? 1.5 : 1.0;
    if (this.activePuzzle.kind === 'virus') {
      updateVirus(this.activePuzzle, dt, input, detectionBoost);
    } else if (this.activePuzzle.kind === 'propaganda') {
      updatePropaganda(this.activePuzzle, dt, input, detectionBoost);
    }
    if (this.activePuzzle.success !== null && this.activePuzzle.outcome) {
      this.resolvePuzzle(this.activePuzzle.outcome);
    } else if (this.activePuzzle.remaining <= 0 && this.activePuzzle.success === null) {
      this.resolvePuzzle(this.activePuzzle.outcome ?? { networkDelta: 0, unityDelta: 0, resolveDelta: 0, panicDelta: 0 });
    }
  }

  private tickCombat(dt: number): void {
    const alive: Projectile[] = [];
    const combatFx = getActiveCounterEffect(this.run.earth);
    for (const p of this.projectiles) {
      const stillAlive = tickProjectile(p, dt);
      if (!stillAlive) {
        continue;
      }
      if (p.owner === 'player') {
        const target = pickTarget(this.defenses, p);
        if (target && Math.abs(target.arc - p.arc) < 0.08) {
          const dmg = computeDamage({ projectile: p, target, earth: this.run.earth, ship: this.run.ship });
          const result = applyDamageToDefense(target, dmg.final, this.run.earth);
          if (result.hullDamage > 0) {
            playHit();
            if (target.hp <= 0) {
              playExplosion();
              adjustEarthStat(this.run.earth, 'planetaryIntegrity', -INTEGRITY_PER_KILL);
              this.run.victory.annihilation.value += ANNIHILATION_PROGRESS_PER_KILL;
              this.run.earth.alienExposure.value += 0.5;
              const region = this.run.earth.regions.peek()[target.regionId];
              if (region) region.visualState.value = 'damaged';
              this.destructionKills++;
              const rt = this.run.earth.playerBehavior.regionTargeting.peek();
              rt[target.regionId] = (rt[target.regionId] ?? 0) + 1;
              this.run.earth.playerBehavior.regionTargeting.value = rt;
            }
          }
          continue;
        }
      } else {
        const shipPos = this.run.ship.position.peek();
        if (p.lane === shipPos.lane && Math.abs(p.arc - shipPos.arc) < 0.1 && this.rng.chance(SHIP_HIT_PROBABILITY)) {
          damageShip(this.run.ship, ENEMY_PROJECTILE_DAMAGE);
          playHit();
          logEvent(this.run.events, 'ship-hit', this.run.clock.peek());
          continue;
        }
      }
      alive.push(p);
    }
    this.projectiles = alive;

    // Defenses: fire toward ship. low-orbit counter doubles fire rate in low lane.
    const lowDouble = combatFx === 'low-orbit:double-fire';
    for (const d of this.defenses) {
      if (d.hp <= 0) continue;
      const firesPerTick = (lowDouble && d.lane === 'low') ? 2 : 1;
      tickDefense(d, dt, () => {
        const shipPos = this.run.ship.position.peek();
        const proj = spawnProjectile(shipPos.lane, d.arc, asWeaponId('kinetic'), 'earth');
        proj.vArc = -2.5;
        this.projectiles.push(proj);
      });
      // Cheap second fire if doubled.
      if (firesPerTick === 2 && d.hp > 0 && d.cooldown <= 0.5) {
        const shipPos2 = this.run.ship.position.peek();
        const proj2 = spawnProjectile(shipPos2.lane, d.arc, asWeaponId('kinetic'), 'earth');
        proj2.vArc = -2.5;
        this.projectiles.push(proj2);
        d.cooldown = 1.0;
      }
    }

    // Missiles: tick and impact
    const liveMissiles: Missile[] = [];
    for (const m of this.missiles) {
      tickMissile(m, dt);
      if (m.intercepted) continue;
      if (m.eta <= 0) {
        // Impact
        damageShip(this.run.ship, MISSILE_IMPACT_DAMAGE);
        playExplosion();
        adjustEarthStat(this.run.earth, 'planetaryIntegrity', -3);
        adjustEarthStat(this.run.earth, 'globalPanic', -4);
        logEvent(this.run.events, 'missile-impact', this.run.clock.peek(), { source: m.sourceRegion });
        continue;
      }
      liveMissiles.push(m);
    }
    this.missiles = liveMissiles;

    const phase = this.run.earth.escalationPhase.peek();
    const missileFx = getActiveCounterEffect(this.run.earth);
    // phase3:force-missile forces a launch right when phase 3 activates.
    const forceLaunch = missileFx === 'phase3:force-missile' && phase === 3 && this.run.clock.peek() < 30;
    if (phase >= 3 && (forceLaunch || this.run.clock.peek() % 600 === 0) && this.missiles.length < Env.MAX_MISSILES) {
      const regionIds = Object.keys(this.run.earth.regions.peek());
      if (regionIds.length > 0) {
        const source = regionIds[Math.floor(this.rng.next() * regionIds.length)]!;
        const missile = launchMissile(source as never, 'nuclear');
        this.missiles.push(missile);
        playMissileLaunch();
        logEvent(this.run.events, 'missile-launched', this.run.clock.peek(), { source });
        this.hud.showMissileWarning('⚠ NUCLEAR MISSILE INCOMING — ESC to intercept');
      }
    }
  }

  private render(alpha: number): void {
    this.shipView.beginTick();
    this.shipView.update(0.016, alpha);
    this.earthView.update(0.016);
    this.projectilePool.update(0.016);
    this.projectilePool.sync(this.projectiles);
    this.defenseView.update(0.016);
    this.defenseView.sync(this.defenses);
    this.missileView.update(0.016);
    this.missileView.sync(this.missiles);
    this.scene.render(this.renderer, this.run.ship.instability.peek() / 100);
  }

  private handleResize(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.scene.resize(w, h);
  }
}