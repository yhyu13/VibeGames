/**
 * Type augmentation for `three-mesh-bvh/webgpu`.
 *
 * The package ships a very loose d.ts (everything `unknown`) and omits several
 * runtime exports (wgslTagFn, transformStruct, rayStruct, ...). These
 * declarations mirror the actual runtime surface (verified against the
 * installed source) so the DDGI engine can use them with strict TS.
 */
declare module 'three-mesh-bvh/webgpu' {
  export const wgslTagFn: (tokens: TemplateStringsArray, ...args: unknown[]) => unknown
  export const transformStruct: unknown
  export const rayStruct: unknown
  export const rayIntersectionResultStruct: unknown
}

// make this file a module so the block above is an augmentation, not a fresh declaration
export {}
