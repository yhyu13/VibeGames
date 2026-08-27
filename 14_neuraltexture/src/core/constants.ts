/**
 * Frozen neural-material contract.
 * Numbers from SIGGRAPH 2026 neural-shading-s26 step 03, scaled to a browser intro:
 * 8-D latent, decoder 14→32→32→3, Rusinkiewicz (wh, wd).
 * Course ships 4096²×8 (512 MiB) — we ship 64²×8.
 */

export const LATENT_DIM = 8
export const LATENT_RESOLUTION = 64
export const HIDDEN_WIDTH = 32
export const DECODER_IN = LATENT_DIM + 6 // 8 latent + wh.xyz + wd.xyz
export const DECODER_OUT = 3
export const LEAKY_RELU_SLOPE = 0.01
export const MIN_COS = 1e-3

/** Packed MLP: W0 (32×14) + B0 (32) + W1 (32×32) + B1 (32) + W2 (3×32) + B2 (3). */
export const W0_OFF = 0
export const W0_LEN = HIDDEN_WIDTH * DECODER_IN // 448
export const B0_OFF = W0_OFF + W0_LEN // 448
export const B0_LEN = HIDDEN_WIDTH
export const W1_OFF = B0_OFF + B0_LEN // 480
export const W1_LEN = HIDDEN_WIDTH * HIDDEN_WIDTH // 1024
export const B1_OFF = W1_OFF + W1_LEN // 1504
export const B1_LEN = HIDDEN_WIDTH
export const W2_OFF = B1_OFF + B1_LEN // 1536
export const W2_LEN = DECODER_OUT * HIDDEN_WIDTH // 96
export const B2_OFF = W2_OFF + W2_LEN // 1632
export const B2_LEN = DECODER_OUT
export const MLP_PARAM_COUNT = B2_OFF + B2_LEN // 1635

export const ADAM_B1 = 0.9
export const ADAM_B2 = 0.999
export const ADAM_EPS = 1e-8
export const TRAIN_LR_START = 1e-3
export const TRAIN_LR_END = 1e-5
export const TRAIN_STEPS = 8000
export const TRAIN_BATCH = 256

/** Demo lighting (world space). Key light orbits around +Y. */
export const KEY_LIGHT_COLOR: [number, number, number] = [8.0, 6.4, 4.2]
export const FILL_LIGHT_DIR: [number, number, number] = [-0.35, 0.55, 0.4]
export const FILL_LIGHT_COLOR: [number, number, number] = [0.18, 0.22, 0.32]
export const AMBIENT: [number, number, number] = [0.03, 0.035, 0.05]
export const KEY_LIGHT_RADIUS = 2.4
export const KEY_LIGHT_HEIGHT = 1.6

export const BALL_RADIUS = 0.72
export const BALL_GAP = 2.15

export const TONE_MAPPING_EXPOSURE = 0.85

/** Night ceramic studio. */
export const BG_COLOR = 0x05060a
export const PEDESTAL_COLOR = 0x12141c
