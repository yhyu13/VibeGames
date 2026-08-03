// Halftone post-process pass.

uniform sampler2D tDiffuse;
uniform float intensity;
uniform vec2 resolution;
varying vec2 vUv;

void main() {
  vec4 color = texture2D(tDiffuse, vUv);
  if (intensity <= 0.0) {
    gl_FragColor = color;
    return;
  }
  float dots = 50.0;
  vec2 px = vUv * resolution / dots;
  float d = length(fract(px) - 0.5);
  float pattern = smoothstep(0.35, 0.5, d);
  vec3 lum = vec3(dot(color.rgb, vec3(0.299, 0.587, 0.114)));
  vec3 halftone = mix(color.rgb, lum * (1.0 - pattern), intensity * 0.5);
  gl_FragColor = vec4(halftone, color.a);
}