// Build-time + runtime constants. No Three.js imports here.

export const Env = {
  // Time
  LOGIC_HZ: 60,
  LOGIC_STEP_MS: 1000 / 60,
  MAX_DT_MS: 100,

  // Rendering
  PIXELS_PER_UNIT: 60,        // orthographic zoom baseline
  WORLD_UNITS_ACROSS: 24,     // world width shown at 1080p

  // Layers (Three.js Layers bitmask values)
  LAYER_DEFAULT: 0,
  LAYER_ALIEN_ENERGY: 1,
  LAYER_GROUND_FX: 2,
  LAYER_UI: 3,

  // Instability tiers
  INSTABILITY_TIERS: [0, 25, 50, 75, 100] as const,
  INSTABILITY_TIER_NAMES: ['Stable', 'Strained', 'Volatile', 'Critical', 'Collapse'] as const,

  // Earth
  EARTH_RADIUS: 6,
  EARTH_VISIBLE_ARC: Math.PI * 0.6, // 108 degrees of Earth visible
  REGION_COUNT_MIN: 8,
  REGION_COUNT_MAX: 12,
  CONDITION_COUNT: 3,

  // Combat
  SHIP_BASE_SPEED: 6.0,        // world units / sec
  PROJECTILE_BASE_SPEED: 14.0,
  PROJECTILE_TTL_SEC: 2.5,
  MAX_PROJECTILES: 200,
  MAX_MISSILES: 6,
  NUCLEAR_TELEGRAPH_TICKS: 240, // ~4 sec at 60Hz

  // Economy
  STARTING_HULL: 100,
  STARTING_SHIELD: 60,
  STARTING_ENERGY: 100,
  STARTING_SIGNAL: 30,
  STARTING_INSTABILITY: 0,

  // Difficulty
  ESCALATION_TICK_INTERVAL: 1800, // ~30s per escalation phase
  RESPONSE_CLOCK_MAX: 100,
  COUNTER_POOL_MATCH_THRESHOLD: 0.4,

  // Save
  SAVE_KEY_LIVE: 'current',
  SAVE_KEY_SETTINGS: 'settings',
  SAVE_KEY_META: 'meta',
  SAVE_KEY_RUNS: 'runs',
  SCHEMA_VERSION: 1,
} as const;

export type EnvConst = typeof Env;