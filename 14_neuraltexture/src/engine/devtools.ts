import {
  DECODER_IN,
  HIDDEN_WIDTH,
  LATENT_DIM,
  LATENT_RESOLUTION,
  MLP_PARAM_COUNT,
} from '../core/constants'
import { evalTeacher } from '../core/ggx'
import { encodeLatent, materialAt } from '../core/material'
import { decode } from '../core/mlp'
import { rusinkiewicz } from '../core/rusinkiewicz'
import { weightsFromArray } from '../core/train'
import type { DecoderInput, Vec3 } from '../core/types'
import { BAKED_STEPS, BAKED_VAL_L1, BAKED_WEIGHTS } from './baked'

export interface NeuralDebugApi {
  constants: {
    LATENT_DIM: number
    LATENT_RESOLUTION: number
    DECODER_IN: number
    HIDDEN_WIDTH: number
    MLP_PARAM_COUNT: number
  }
  bakedValL1: number
  bakedSteps: number
  materialAt: typeof materialAt
  encodeLatent: typeof encodeLatent
  evalTeacher: typeof evalTeacher
  evalNeural: (uv: [number, number], wi: Vec3, wo: Vec3) => Vec3
}

export function installDevtools(): NeuralDebugApi {
  const weights = weightsFromArray(BAKED_WEIGHTS)
  const api: NeuralDebugApi = {
    constants: { LATENT_DIM, LATENT_RESOLUTION, DECODER_IN, HIDDEN_WIDTH, MLP_PARAM_COUNT },
    bakedValL1: BAKED_VAL_L1,
    bakedSteps: BAKED_STEPS,
    materialAt,
    encodeLatent,
    evalTeacher,
    evalNeural: (uv, wi, wo) => {
      const s = materialAt(uv)
      const z = encodeLatent(s)
      const { wh, wd } = rusinkiewicz(wi, wo)
      const input: DecoderInput = [
        z[0], z[1], z[2], z[3], z[4], z[5], z[6], z[7],
        wh[0], wh[1], wh[2],
        wd[0], wd[1], wd[2],
      ]
      return decode(weights, input)
    },
  }
  ;(window as unknown as { __neural: NeuralDebugApi }).__neural = api
  return api
}
