#version 300 es
// RC Lab 通用全屏三角形顶点着色器（RC 管线所有 pass 共用）。
layout(location = 0) in vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
