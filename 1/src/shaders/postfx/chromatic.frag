// Chromatic aberration (instability-driven).

uniform sampler2D tDiffuse;
uniform float intensity;
uniform vec2 resolution;
varying vec2 vUv;

void main() {
  vec2 dir = vUv - 0.5;
  float dist = length(dir);
  vec2 offset = normalize(dir) * intensity * dist;
  vec4 cr = texture2D(tDiffuse, vUv + offset);
  vec4 cg = texture2D(tDiffuse, vUv);
  vec4 cb = texture2D(tDiffuse, vUv - offset);
  gl_FragColor = vec4(cr.r, cg.g, cb.b, cg.a);
}