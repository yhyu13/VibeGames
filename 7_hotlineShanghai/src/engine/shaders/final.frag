#version 300 es
precision highp float;

// 阶段 [6] final：base * mix(0.50, 1.0, illumination) + radiance*uLightScale（深暗部 + 光池全色）
// + 4x4 Bayer dither 回压光贡献项（仅影响 light contribution，不清洗 base）。

out vec4 fragColor;

uniform sampler2D uSceneMap;    // base 场景色
uniform sampler2D uRadianceMap; // cascade 输出
uniform sampler2D uEmissionMap; // direct scene-light seeds; final bloom keeps source lights visibly bright
uniform vec2   uRadianceAtlasSize; // cascade atlas size
uniform vec2   uRadianceScreenSize; // RC working screen size (may be half resolution)
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
  vec2 uv = (gl_FragCoord.xy - 0.5) / vec2(textureSize(uSceneMap, 0));
  vec3 base = texelFetch(uSceneMap, ivec2(gl_FragCoord.xy - 0.5), 0).rgb;
  vec3 radiance;
  if (uRadianceAtlasSize.x > 0.0 && uRadianceAtlasSize.y > 0.0) {
    // Atlas: screen content bottom-aligned; c0 block = 2x2 atlas texels.
    // Sampling at texel centers with LINEAR averages each probe's directions
    // and blends neighboring probes (canonical final display).
    vec2 sceneSize = vec2(textureSize(uSceneMap, 0));
    vec2 rcCoord = (gl_FragCoord.xy - vec2(0.5)) * (uRadianceScreenSize / sceneSize);
    vec2 radUv = (rcCoord + vec2(0.5, uRadianceAtlasSize.y - uRadianceScreenSize.y)) / uRadianceAtlasSize;
    radiance = texture(uRadianceMap, radUv).rgb;
  } else {
    radiance = texture(uRadianceMap, uv).rgb;
  }

  float illumination = clamp(dot(radiance, vec3(0.299, 0.587, 0.114)) * uLightScale, 0.0, 1.0);
  vec3 lit = base * mix(0.50, 1.0, illumination) + radiance * uLightScale;

  // Keep direct-source reinforcement compact. The former 14 px sparse grid stamped
  // nine displaced copies of every emitter into dark pixels, which read as ghost
  // squares/rings after half-resolution RC upscaling.
  vec3 source = texture(uEmissionMap, uv).rgb;
  float emissionLuma = dot(source, vec3(0.299, 0.587, 0.114));
  float bloomWeight = 0.145 - 0.105 * smoothstep(0.12, 0.50, emissionLuma);
  lit += source * (uLightScale * bloomWeight);

  if (uDitherEnabled == 1) {
    ivec2 cell = ivec2(mod(gl_FragCoord.xy, 4.0));
    float threshold = BAYER4x4[cell.x][cell.y] / 16.0;
    float luma = dot(radiance, vec3(0.299, 0.587, 0.114));
    vec3 quantizedLight = step(vec3(threshold), vec3(luma)) * radiance;
    vec3 light = mix(radiance, quantizedLight, 0.5) * uLightScale;
    float ditheredIllumination = clamp(dot(light, vec3(0.299, 0.587, 0.114)), 0.0, 1.0);
    lit = base * mix(0.50, 1.0, ditheredIllumination) + light + source * (uLightScale * bloomWeight);
  }

  fragColor = vec4(lit, 1.0);
}
