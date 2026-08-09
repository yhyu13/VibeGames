#version 300 es
precision highp float;

// 阶段 [6] final：base + radiance*uLightScale（加法合成，06-rendering-readability F3）
// + 4x4 Bayer dither 回压光贡献项（仅影响 light contribution，不清洗 base）。

out vec4 fragColor;

uniform sampler2D uSceneMap;    // base 场景色
uniform sampler2D uRadianceMap; // cascade 输出
uniform vec2   uRadianceAtlasSize; // 480x224 atlas (screen bottom-aligned)
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
    // Atlas: screen content bottom-aligned; c0 block = 2x2 atlas texels.
    // Sampling at texel centers with LINEAR averages each probe's directions
    // and blends neighboring probes (canonical final display).
    vec2 radUv = (gl_FragCoord.xy + 0.5) / uRadianceAtlasSize;
    radiance = texture(uRadianceMap, radUv).rgb;
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
