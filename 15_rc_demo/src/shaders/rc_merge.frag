#version 300 es
precision highp float;

// Canonical Radiance Cascades - merge pass.
// For every ray that missed in the current interval, fetch the 4 matching
// direction texels from each of the 4 spatially-overlapping upper probes,
// average the 4 directions, then bilinear-interpolate the 4 probes.
// Reference: Yaazarai/GMShaders-Radiance-Cascades Shd_RadianceMerging.fsh.
out vec4 fragColor;

uniform sampler2D uInterval;  // current cascade interval result (a=1 hit, a=0 miss)
uniform sampler2D uLastPass;  // upper cascade MERGED atlas

uniform vec2  uResolution;    // atlas size
uniform float uCascadeIndex;
uniform float uCascadeCount;
uniform int   uDisableMerging;
uniform int   uAmbient;
uniform vec3  uAmbientColor;
uniform float uAmbientIntensity;

float pow4(float n) { return exp2(2.0 * n); }

vec4 fetchUpper(vec2 upperCell, vec2 dirTexel) {
  float sizeN1 = exp2(uCascadeIndex + 3.0);
  vec2 probeTexel = upperCell * sizeN1 + dirTexel;
  if (probeTexel.x < 0.0 || probeTexel.y < 0.0 ||
      probeTexel.x >= uResolution.x || probeTexel.y >= uResolution.y) {
    return vec4(0.0);
  }
  vec2 uv = (probeTexel + 0.5) / uResolution;
  return texture(uLastPass, uv);
}

void main() {
  vec2 coord = floor(gl_FragCoord.xy);
  float size = exp2(uCascadeIndex + 2.0);
  vec2 blockPos = mod(coord, vec2(size));
  vec2 cell = floor(coord / vec2(size));
  float dirIndex = blockPos.y * size + blockPos.x;

  vec4 radiance = texture(uInterval, (coord + 0.5) / uResolution);
  radiance.a = 1.0 - radiance.a; // 1 = ray missed, merge allowed

  if (radiance.a != 0.0 && uCascadeIndex < uCascadeCount && uDisableMerging != 1) {
    vec2 upperBase = floor((cell - 1.0) / 2.0);
    vec2 weight = vec2(0.25) + (cell - (upperBase * 2.0 + 1.0)) * vec2(0.5);

    vec4 TL = vec4(0.0);
    vec4 TR = vec4(0.0);
    vec4 BL = vec4(0.0);
    vec4 BR = vec4(0.0);
    for (float i = 0.0; i < 4.0; i += 1.0) {
      float thetaN1 = dirIndex * 4.0 + i;
      vec2 dirTexel = vec2(
        mod(thetaN1, exp2(uCascadeIndex + 3.0)),
        floor(thetaN1 / exp2(uCascadeIndex + 3.0))
      );
      TL += fetchUpper(upperBase + vec2(0.0, 0.0), dirTexel);
      TR += fetchUpper(upperBase + vec2(1.0, 0.0), dirTexel);
      BL += fetchUpper(upperBase + vec2(0.0, 1.0), dirTexel);
      BR += fetchUpper(upperBase + vec2(1.0, 1.0), dirTexel);
    }
    TL /= 4.0;
    TR /= 4.0;
    BL /= 4.0;
    BR /= 4.0;

    vec4 top = mix(TL, TR, weight.x);
    vec4 bot = mix(BL, BR, weight.x);
    vec4 merged = mix(top, bot, weight.y);
    radiance = vec4(radiance.rgb + radiance.a * merged.rgb, 1.0);
  }

  // v3.11:环境光 = 亮度地板(max),与 interval 一致;不再随 merge 遍数叠加
  radiance.rgb = max(radiance.rgb, uAmbientColor * float(uAmbient) * uAmbientIntensity);
  fragColor = vec4(radiance.rgb, 1.0);
}
