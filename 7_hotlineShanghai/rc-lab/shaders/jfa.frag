#version 300 es
precision highp float;

// 阶段 [3] JFA：jump flood，9 邻域，跳距 n/2 -> 1（每 pass uJumpSize 减半）。
// RG = 最近 seed 的 UV；B = 最近距离（按高归一化）；A = 是否有 seed。

out vec4 fragColor;

uniform sampler2D uCanvas;
uniform int uJumpSize;

void main() {
  vec2 resolution = vec2(textureSize(uCanvas, 0));
  vec2 fragCoord = gl_FragCoord.xy / resolution;
  float closest = 1.0;
  fragColor = vec4(0.0);

  for (int Nx = -1; Nx <= 1; Nx++) {
    for (int Ny = -1; Ny <= 1; Ny++) {
      vec2 nTex = fragCoord + (vec2(float(Nx), float(Ny)) / resolution) * float(uJumpSize);
      vec4 nSample = texture(uCanvas, nTex);

      if (nTex != clamp(nTex, 0.0, 1.0)) continue; // 跳过画面外
      if (nSample.a == 0.0) continue;              // 无 seed

      float d = length((nSample.rg - fragCoord) * vec2(resolution.x / resolution.y, 1.0));
      if (d < closest) {
        closest = d;
        fragColor = vec4(nSample.rg, d, 1.0);
      }
    }
  }
}
