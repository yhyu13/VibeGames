#version 300 es
precision highp float;

// 阶段 [5] cascade：demo rc.frag 的干净 GLSL ES 3.00 移植。
// probe 数学 / 合并条件 / MAX_RAY_STEPS 与 radiance-cascades-demo 完全一致；
// 仅两处有意修正（见 rc-lab/README.md）：
//   - 全部显式 int->float 转换（不做运行时字符串补丁）
//   - uDirectLighting 采样使用 uv 本身（demo 的 -uv.y 是 raylib 翻转残留）

#define TWO_PI 6.2831853071795864769252867665590
// EPS 由 uniform 传入：demo 的 0.0005 只适用于 R16 SDF；
// RGBA8 SDF 量化步长 1/255≈0.0039，必须取 3/255≈0.0118 才能稳定命中表面。
uniform float uEps;
#define FIRST_LEVEL (uCascadeIndex == 0)
#define LAST_LEVEL (uCascadeIndex == uCascadeAmount)
#define MAX_RAY_STEPS 128

out vec4 fragColor;

uniform sampler2D uDistanceField;
uniform sampler2D uSceneMap;
uniform sampler2D uDirectLighting;
uniform sampler2D uLastPass;

uniform vec2  uResolution;
uniform int   uBaseRayCount;
uniform int   uCascadeDisplayIndex;
uniform int   uCascadeIndex;
uniform int   uCascadeAmount;
uniform int   uSrgb;
uniform float uPropagationRate;
uniform int   uDisableMerging;
uniform float uBaseInterval;
uniform float uMixFactor;
uniform int   uAmbient;
uniform vec3  uAmbientColor;
uniform float uAmbientIntensity;

struct probe {
  float spacing;
  vec2 size;
  vec2 position;
  vec2 rayPosition;
  float intervalStart;
  float intervalEnd;
  float rayCount;
};

probe get_probe_info(int index) {
  probe p;
  vec2 fragCoord = gl_FragCoord.xy / uResolution;

  float probeAmount = pow(float(uBaseRayCount), float(index));
  p.spacing = sqrt(probeAmount);
  p.size = 1.0 / vec2(p.spacing);
  p.position = mod(fragCoord, p.size) * p.spacing;
  p.rayCount = pow(float(uBaseRayCount), float(index + 1));
  p.rayPosition = floor(fragCoord / p.size);

  float a = uBaseInterval;
  p.intervalStart = (FIRST_LEVEL)
    ? 0.0
    : a * pow(float(uBaseRayCount), float(index)) / min(uResolution.x, uResolution.y);
  p.intervalEnd = a * pow(float(uBaseRayCount), float(index + 1)) / min(uResolution.x, uResolution.y);
  return p;
}

vec3 lin_to_srgb(vec3 rgb) {
  return mix(
    1.055 * pow(rgb, vec3(1.0 / 2.4)) - 0.055,
    rgb * 12.92,
    lessThanEqual(rgb, vec3(0.0031308))
  );
}

vec4 radiance_interval(vec2 uv, vec2 dir, float a, float b) {
  uv += a * dir;
  float travelledDist = a;

  for (int i = 0; i < MAX_RAY_STEPS; i++) {
    float dist = texture(uDistanceField, uv).r;
    uv += dir * dist;

    if (uv.xy != clamp(uv.xy, 0.0, 1.0)) break;

    if (dist < uEps) {
      if (uMixFactor != 0.0) {
        return vec4(
          mix(
            texture(uSceneMap, uv).rgb,
            max(
              texture(uDirectLighting, uv).rgb,
              texture(uDirectLighting, uv - (dir * (1.0 / uResolution))).rgb * uPropagationRate
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
  // 调试直出（uCascadeDisplayIndex < 0）：不跑算法，直接显示输入纹理
  if (uCascadeDisplayIndex == -1) {
    // 四通道分别输出四个采样器的 R 值，精确定位哪个 sampler 绑错
    vec2 dbgUv = gl_FragCoord.xy / uResolution;
    fragColor = vec4(
      texture(uDistanceField, dbgUv).r,
      texture(uSceneMap, dbgUv).r,
      texture(uDirectLighting, dbgUv).r,
      texture(uLastPass, dbgUv).r
    );
    return;
  }
  if (uCascadeDisplayIndex == -2) {
    fragColor = texture(uLastPass, gl_FragCoord.xy / uResolution);
    return;
  }
  if (uCascadeDisplayIndex == -3) {
    fragColor = texture(uDistanceField, gl_FragCoord.xy / uResolution);
    return;
  }

  vec4 radiance = vec4(0.0);
  probe p = get_probe_info(uCascadeIndex);
  probe up = get_probe_info(uCascadeIndex + 1);

  float baseIndex = float(uBaseRayCount) * (p.rayPosition.x + (p.spacing * p.rayPosition.y));

  for (float i = 0.0; i < float(uBaseRayCount); i += 1.0) {
    float index = baseIndex + i;
    float angle = (index / p.rayCount) * TWO_PI;

    vec4 deltaRadiance = vec4(0.0);
    deltaRadiance += radiance_interval(
      p.position,
      vec2(
        cos(angle) * min(uResolution.x, uResolution.y) / max(uResolution.x, uResolution.y),
        sin(angle)
      ),
      p.intervalStart,
      p.intervalEnd
    );

    // 合并：射线在区间内未命中，则从上一 pass（uLastPass）取对应 probe 的亮度。
    if (!(LAST_LEVEL) && deltaRadiance.a == 0.0 && uDisableMerging != 1) {
      up.position = vec2(
        mod(index, up.spacing), floor(index / up.spacing)
      ) * up.size;

      #define PIXEL vec2(1.0) / uResolution
      vec2 offset = p.position / up.spacing;
      offset = clamp(offset, PIXEL, up.size - PIXEL);
      vec2 uv = up.position + offset;

      deltaRadiance += texture(uLastPass, uv);
    }

    radiance += deltaRadiance;
  }

  radiance /= float(uBaseRayCount);
  radiance += vec4(uAmbientColor * float(uAmbient) * uAmbientIntensity, 1.0);

  if (uCascadeIndex < uCascadeDisplayIndex) {
    radiance = vec4(vec3(texture(uLastPass, gl_FragCoord.xy / uResolution)), 1.0);
  }

  fragColor = vec4(
    (FIRST_LEVEL && uSrgb == 1) ? lin_to_srgb(radiance.rgb) : radiance.rgb,
    1.0
  );
}
