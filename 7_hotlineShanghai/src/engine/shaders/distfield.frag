#version 300 es
precision highp float;

// 阶段 [4] distfield：jfaSeed(final) -> sceneSdf（R = 归一化距离）。

out vec4 fragColor;

uniform sampler2D uJFA;

void main() {
  vec2 fragCoord = gl_FragCoord.xy / vec2(textureSize(uJFA, 0));
  fragColor = vec4(vec3(texture(uJFA, fragCoord).b), 1.0);
}
