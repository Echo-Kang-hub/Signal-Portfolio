---
title: 着色器艺术：从数学到视觉诗篇
date: 2024-01-15
tag: WebGL
excerpt: 探索GLSL着色器如何将数学公式转化为流动的视觉艺术，解密生成式美学的底层逻辑。
---

# 着色器艺术：从数学到视觉诗篇

着色器（Shader）是GPU编程的核心，它让我们能够用数学公式创造视觉奇观。

## 什么是着色器？

着色器是一种在GPU上运行的程序，用于计算像素的颜色和位置。

```glsl
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0, 2, 4));
    gl_FragColor = vec4(col, 1.0);
}
```

## 核心概念

### 1. 距离场 (Signed Distance Fields)
使用数学函数定义形状，创建一个连续的场。

### 2. 噪声 (Noise)
随机但连续的数值，用于创造自然纹理。

### 3. 波形 (Waves)
周期性函数产生流动效果。

着色器的世界是无限的，等待你去探索和创造。