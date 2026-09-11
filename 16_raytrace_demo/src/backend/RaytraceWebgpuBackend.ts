/**
 * src/backend/RaytraceWebgpuBackend.ts — WebGPU 后端占位(stub)
 *
 * 这是"then WebGPU"的接缝。当前不实现 —— 只保证接口签名与 demo 消费点可编译,
 * 构造即抛错给出清晰的迁移指引。实现了这个接口后,main.ts 无需改动即可切到
 * three/webgpu 路径(见 RaytraceBackend.ts 的接口说明)。
 *
 * ─── 计划中的 three/webgpu + three/tsl 计算光线追踪替换 ───
 * 把 VoxelRaycaster 的片段着色部分改成 WGSL 计算内核(wgslFn),DDA 遍历与
 * ReSTIR 时间重采样逐像素并行:
 *
 *   1. 体素化仍走 CPU(复用 VoxelRaycaster 的 fillBox/fillSphere/fillEllipsoid),
 *     把材质 ID 网格上传为 storageTexture / 3D texture。
 *   2. 命中内核(marchGrid): 两层 DDA(宏格占用 + 细格)全部改写为 WGSL
 *     WGSLFn,输入 uGrid / uMacro 3D 纹理、光线的 ro/rd,输出 Hit。
 *   3. 着色内核(shadeGrid): Cook-Torrance GGX + 太阳软阴影 + 体素 AO +
 *     ReSTIR GI 时间重采样 —— 用 three/tsl 的 Fn / wgslFn 表达,历史 ping-pong
 *     换成 WebGPU 计算/存储缓冲区。
 *   4. 调度: 每个屏幕像素一个 workgroup 项,MRT 上屏换成着色 storage texture
 *     + compute pass → 再贴到默认 framebuffer。
 *   5. 水面: 解析平面反射仍在 WGSL 内做(同 VoxelRaycaster 的 shadeWater)。
 *
 * 迁移时保持本接口不变,只改 init()/render()/setSize() 内部实现。
 */

export class RaytraceWebgpuBackend {
  readonly kind = 'webgpu' as const;
  readonly capability = {
    kind: 'webgpu' as const,
    reason: 'webgpu-backend-not-implemented',
  };

  constructor() {
    throw new Error(
      'raytrace-demo WebGPU backend is not implemented — swap to three/webgpu + ' +
        'three/tsl compute raytracer here. See RaytraceWebgpuBackend.ts block comment.',
    );
  }

  init(_container: HTMLElement): never {
    throw new Error('WebGPU backend not implemented');
  }

  render(): never {
    throw new Error('WebGPU backend not implemented');
  }

  setSize(): never {
    throw new Error('WebGPU backend not implemented');
  }

  setQuality(): never {
    throw new Error('WebGPU backend not implemented');
  }

  dispose(): void {
    // 无资源;构造即抛错,不会走到这里
  }
}
