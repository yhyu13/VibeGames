#version 300 es
precision highp float;

// 阶段 [1] prepscene：occlusion + emission -> sceneSeed（RGBA8）
// 语义与 radiance-cascades-demo 一致：
//   - occlusion 纯白 = 空（无 seed），非白 = 墙（seed，alpha=1）
//   - emission 纯黑 = 无光；光斑覆盖墙/地板，作为发光 seed
// 干净 GLSL ES 3.00 移植：无任何隐式 int->float 转换。

out vec4 fragColor;

uniform sampler2D uOcclusionMap;
uniform sampler2D uEmissionMap;
uniform vec2  uMousePos;
uniform float uBrushSize;
uniform vec4  uBrushColor;
uniform int   uMouseLight;

void main() {
  vec2 resolution = vec2(textureSize(uOcclusionMap, 0));
  vec2 fragCoord = gl_FragCoord.xy / resolution;

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
