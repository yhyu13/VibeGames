#version 300 es
precision highp float;

// 阶段 [1] prepscene：occlusion + emission -> sceneSeed（RGBA8）
// 语义与 radiance-cascades-demo 一致：
//   - occlusion 纯白 = 空（无 seed），非白 = 墙（seed，alpha=1）
//   - emission 纯黑 = 无光；光斑覆盖墙/地板，作为发光 seed
// 干净 GLSL ES 3.00 移植：无任何隐式 int->float 转换。
//
// 采样尺度修正(2026-08-13)：seed 目标 = 工作分辨率(如 360×240)，而
// occlusion/emission 上传纹理 = 源分辨率(720×480)。旧代码用
// textureSize(uOcclusionMap) 作分母 → uv 只覆盖上传纹理左上 1/4 象限，
// 所有发光种子(油灯/探照灯/霓虹/枪口)全部落空，仅玩家随身灯软盘边缘漏入。
// 修正：按工作分辨率 uResolution 归一化 gl_FragCoord。

out vec4 fragColor;

uniform sampler2D uOcclusionMap;
uniform sampler2D uEmissionMap;
uniform vec2  uResolution;     // 工作分辨率(seed 目标尺寸)
uniform vec2  uMousePos;
uniform float uBrushSize;
uniform vec4  uBrushColor;
uniform int   uMouseLight;

void main() {
  vec2 fragCoord = gl_FragCoord.xy / uResolution;

  vec4 o = texture(uOcclusionMap, fragCoord);
  vec4 e = texture(uEmissionMap, fragCoord);

  if (o == vec4(1.0)) {
    o = vec4(0.0);
  } else {
    o = vec4(0.0, 0.0, 0.0, 1.0);
  }

  if (e == vec4(0.0, 0.0, 0.0, 1.0)) {
    e = vec4(0.0);
  }

  fragColor = (max(e.a, o.a) == e.a) ? e : o;

  // 画笔灯位（游戏集成时 uMouseLight=0，灯位全部来自 uEmissionMap）
  if (uMouseLight == 1 && distance(gl_FragCoord.xy, uMousePos) < uBrushSize * 64.0) {
    fragColor = uBrushColor;
  }
}
