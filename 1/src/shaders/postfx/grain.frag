// Film grain.

uniform sampler2D tDiffuse;
uniform float intensity;
uniform float time;
varying vec2 vUv;

float rand(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec4 color = texture2D(tDiffuse, vUv);
  float g = rand(vUv + time) - 0.5;
  color.rgb += g * intensity;
  gl_FragColor = color;
}