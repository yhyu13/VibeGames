#version 300 es
precision highp float;

// Canonical Radiance Cascades - interval pass (one ray per atlas texel).
// Reference: Yaazarai/GMShaders-Radiance-Cascades (position-first probe blocks,
// each texel = one direction of one probe; probe count quarters per cascade,
// rays per probe quadruple per cascade).
// Atlas layout: block side size = 2^(cascadeIndex+2) (16 rays/probe @ c0);
// direction index = mod(coord, size) row-major; probe origin = cell center (screen px).
// v3.10:4 ray/probe → 16 ray/probe(22.5° 间隔)——4 射线只在 4 条对角线上命中,
// 光池呈星形臂伪影;16 射线的臂几乎连成连续圆盘。每 texel = 1 条射线,
// interval pass 成本不变,仅探针间距 2→4 工作像素。
#define TWO_PI 6.2831853071795864769252867665590
#define MAX_RAY_STEPS 128

out vec4 fragColor;

uniform sampler2D uDistanceField;
uniform sampler2D uSceneMap;
uniform sampler2D uDirectLighting;

uniform vec2  uResolution;     // atlas size (screen padded to block grid)
uniform vec2  uScreenSize;     // screen size in px
uniform float uMinSide;        // min(uScreenSize)
uniform float uCascadeIndex;
uniform float uCascadeCount;
uniform float uBaseIntervalPx;
uniform float uMixFactor;
uniform float uPropagationRate;
uniform float uEps;
uniform int   uAmbient;
uniform vec3  uAmbientColor;
uniform float uAmbientIntensity;

float pow4(float n) { return exp2(2.0 * n); }

vec4 radiance_interval(vec2 uv, vec2 dir, float a, float b) {
  uv += a * dir;
  float travelledDist = a;

  for (int i = 0; i < MAX_RAY_STEPS; i++) {
    float dist = texture(uDistanceField, uv).r;
    uv += dir * dist;

    if (uv.xy != clamp(uv.xy, 0.0, 1.0)) break;

    if (dist < uEps) {
      if (uMixFactor != 0.0) {
        vec2 directUv = uv * (uScreenSize / uResolution);
        return vec4(
          mix(
            texture(uSceneMap, uv).rgb,
            max(
              texture(uDirectLighting, directUv).rgb,
              texture(uDirectLighting, directUv - (dir * (1.0 / uScreenSize))).rgb * uPropagationRate
            ),
            uMixFactor
          ),
          1.0
        );
      }
      return vec4(texture(uSceneMap, uv).rgb, 1.0);
    }

    travelledDist += dist;
    if (travelledDist >= b) break;
  }
  return vec4(0.0);
}

void main() {
  vec2 coord = floor(gl_FragCoord.xy);
  float size = exp2(uCascadeIndex + 2.0);        // block side in atlas px = sqrt(16*4^c)
  float rayCount = 16.0 * pow4(uCascadeIndex);   // rays per probe

  vec2 blockPos = mod(coord, vec2(size));
  vec2 cell = floor(coord / vec2(size));
  float dirIndex = blockPos.y * size + blockPos.x;
  float theta = (dirIndex + 0.5) * (TWO_PI / rayCount);

  vec2 origin = (cell + 0.5) * size; // probe center in atlas px; screen is bottom-aligned
  origin /= uScreenSize;             // screen UV

  float intervalStartPx = uBaseIntervalPx * (pow4(uCascadeIndex) - 1.0) / 3.0;
  float intervalEndPx = uBaseIntervalPx * pow4(uCascadeIndex);
  float a = intervalStartPx / uMinSide;
  float b = (intervalStartPx + intervalEndPx) / uMinSide;

  vec2 dir = vec2(
    cos(theta) * min(uScreenSize.x, uScreenSize.y) / max(uScreenSize.x, uScreenSize.y),
    sin(theta)
  );

  vec4 radiance = radiance_interval(origin, dir, a, b);
  if (uCascadeIndex == uCascadeCount && uAmbient == 1) {
    // v3.11:环境光 = 亮度地板(max),不是叠加(+=)——叠加语义在光池尾部
    // 产生"暗环"(池尾 < 环境光,池子周围一圈暗带)。地板语义下池子坐在
    // 环境光上,径向剖面单调无环。
    radiance.rgb = max(radiance.rgb, uAmbientColor * uAmbientIntensity);
  }
  fragColor = vec4(radiance.rgb, radiance.a);
}
