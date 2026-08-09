#version 300 es
precision highp float;

// 阶段 [2] prepjfa：sceneSeed -> jfaSeed（RGBA16F）
// alpha==1 的像素写入自身 UV（RG），距离初值 0（B），alpha=1 表示“有 seed”。

out vec4 fragColor;

uniform sampler2D uSceneMap;

void main() {
  vec2 fragCoord = gl_FragCoord.xy / vec2(textureSize(uSceneMap, 0));
  vec4 mask = texture(uSceneMap, fragCoord);

  if (mask.a == 1.0) {
    mask = vec4(fragCoord, 0.0, 1.0);
  }

  fragColor = mask;
}
