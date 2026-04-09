export const postsData = [
    {
        slug: 'shader-art',
        title: '着色器艺术：从数学到视觉诗篇',
        date: '2024-01-15',
        tag: 'WebGL',
        excerpt: '探索GLSL着色器如何将数学公式转化为流动的视觉艺术，解密生成式美学的底层逻辑。',
        content: `着色器（Shader）是GPU编程的核心，它让我们能够用数学公式创造视觉奇观。

## 什么是着色器？

着色器是一种在GPU上运行的程序，用于计算像素的颜色和位置。

\`\`\`glsl
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 col = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0, 2, 4));
    gl_FragColor = vec4(col, 1.0);
}
\`\`\`

## 核心概念

### 1. 距离场 (Signed Distance Fields)
使用数学函数定义形状，创建一个连续的场。

### 2. 噪声 (Noise)
随机但连续的数值，用于创造自然纹理。

### 3. 波形 (Waves)
周期性函数产生流动效果。

着色器的世界是无限的，等待你去探索和创造。`
    },
    {
        slug: 'micro-interactions',
        title: '微交互的宏观影响',
        date: '2024-01-08',
        tag: '交互设计',
        excerpt: '那些看似微不足道的动效细节，如何累积成令人难忘的用户体验。',
        content: `微交互是用户体验设计中的细枝末节，但它们的影响力远超你的想象。

## 为什么微交互重要？

- **反馈感知**：让用户知道系统正在响应
- **引导操作**：通过视觉提示指导用户行为
- **情感连接**：精致的细节让人感到被关怀

## 常见的微交互类型

### 按钮悬停
- 颜色变化
- 轻微位移
- 光晕效果

### 加载状态
- 骨架屏
- 进度条
- 脉冲动画

### 成功反馈
- 勾选动画
- 震动反馈
- 颜色变化

记住：**细节决定成败**。`
    },
    {
        slug: 'canvas-deep-dive',
        title: '代码即画笔：Canvas深度潜入',
        date: '2023-12-20',
        tag: '创意编程',
        excerpt: '从基础API到高级渲染技巧，掌握Canvas绘制的完整知识体系。',
        content: `Canvas是HTML5最强大的图形API之一，它让我们能够用JavaScript绘制任何你能想象到的图形。

## 基础绘制

\`\`\`javascript
const ctx = canvas.getContext('2d');
ctx.fillRect(x, y, width, height);
ctx.arc(x, y, radius, startAngle, endAngle);
ctx.beginPath();
\`\`\`

## 动画循环

使用 \`requestAnimationFrame\` 创建流畅的动画：

\`\`\`javascript
function animate() {
    ctx.clearRect(0, 0, width, height);
    // 绘制逻辑
    requestAnimationFrame(animate);
}
\`\`\`

## 高级技巧

- **离屏Canvas**：预渲染复杂图形
- **图像合成**：使用 globalCompositeOperation
- **像素操作**：直接读写像素数据

Canvas的世界，等待你的探索！`
    }
];

export function getAllPosts() {
    return postsData.map(post => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        tag: post.tag,
        excerpt: post.excerpt
    }));
}

export function getPostBySlug(slug) {
    return postsData.find(post => post.slug === slug);
}