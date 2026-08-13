#version 300 es
precision highp float;

// 阶段 [6] final：base + radiance*uLightScale（加法合成，06-rendering-readability F3）
// + 4x4 Bayer dither 回压光贡献项（仅影响 light contribution，不清洗 base）。

out vec4 fragColor;

uniform sampler2D uSceneMap;    // base 场景色
uniform sampler2D uRadianceMap; // cascade 输出
uniform vec2   uRadianceAtlasSize; // 480x224 atlas (screen bottom-aligned)
uniform vec2   uRadianceScreenSize; // work 分辨率(与 atlas 相同或为其子集)
uniform int   uDitherEnabled;
uniform float uLightScale;
uniform float uTime;

// 4x4 Bayer（列主序：BAYER4x4[col][row]）
const mat4 BAYER4x4 = mat4(
  vec4( 0.0, 12.0,  3.0, 15.0),
  vec4( 8.0,  4.0, 11.0,  7.0),
  vec4( 2.0, 14.0,  1.0, 13.0),
  vec4(10.0,  6.0,  9.0,  5.0)
);

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(textureSize(uSceneMap, 0));
  vec3 base = texture(uSceneMap, uv).rgb;
  vec3 radiance;
  if (uRadianceAtlasSize.x > 0.0 && uRadianceAtlasSize.y > 0.0) {
    // Atlas: screen content bottom-aligned; c0 block = 4x4 atlas texels (16 rays/probe).
    // 每个 probe 的 4×4 方向 texel 块,其角点(texel 坐标 block*4+2.0)经 LINEAR
    // 恰好等于全部 16 个方向的平均 → 单 probe 值 = texture(uv=(block*4+2.5)/atlasSize)。
    // 双线性插值 4 个相邻 probe → 光池边缘平滑渐变(v3.10)。
    vec2 sceneSize = vec2(textureSize(uSceneMap, 0));
    vec2 rcCoord = (gl_FragCoord.xy - vec2(0.5)) * (uRadianceScreenSize / sceneSize);
    vec2 texel = clamp(rcCoord, vec2(0.0), uRadianceScreenSize - vec2(1.0));
    vec2 p = texel * 0.25 - vec2(0.5);
    vec2 p00 = floor(p);
    vec2 f = clamp(p - p00, 0.0, 1.0);
    vec2 s = uRadianceAtlasSize;
    vec2 uv00 = clamp((p00 * 4.0 + 2.5) / s, 0.0, 1.0);
    vec2 uv10 = clamp(((p00 + vec2(1.0, 0.0)) * 4.0 + 2.5) / s, 0.0, 1.0);
    vec2 uv01 = clamp(((p00 + vec2(0.0, 1.0)) * 4.0 + 2.5) / s, 0.0, 1.0);
    vec2 uv11 = clamp(((p00 + vec2(1.0, 1.0)) * 4.0 + 2.5) / s, 0.0, 1.0);
    vec3 r00 = texture(uRadianceMap, uv00).rgb;
    vec3 r10 = texture(uRadianceMap, uv10).rgb;
    vec3 r01 = texture(uRadianceMap, uv01).rgb;
    vec3 r11 = texture(uRadianceMap, uv11).rgb;
    radiance = mix(mix(r00, r10, f.x), mix(r01, r11, f.x), f.y);
  } else {
    radiance = texture(uRadianceMap, uv).rgb;
  }

  vec3 lit = base + radiance * uLightScale;

  if (uDitherEnabled == 1) {
    ivec2 cell = ivec2(mod(gl_FragCoord.xy, 4.0));
    float threshold = BAYER4x4[cell.x][cell.y] / 16.0;
    float luma = dot(radiance, vec3(0.299, 0.587, 0.114));
    vec3 quantizedLight = step(vec3(threshold), vec3(luma)) * radiance;
    lit = base + mix(radiance, quantizedLight, 0.5) * uLightScale;
  }

  fragColor = vec4(lit, 1.0);
}
