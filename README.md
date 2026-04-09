# Creative Signals

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/vanilla-js-yellow.svg" alt="Vanilla JS">
</p>

> 在技术与艺术的交汇点发射信号 - 一个现代感十足的个人博客与作品集网站

## 截图

![Creative Signals](src/assets/images/preview.png)

## 特性

### 动态视觉效果
- **信号波背景** - Hero区域使用Canvas绘制的动态波形动画
- **鼠标粒子拖尾** - 移动时产生金色/青色光点效果
- **文章卡片动画** - 每张卡片都有独特的Canvas背景动画
- **交互式粒子演示** - 可与鼠标互动的粒子吸引系统
- **滚动触发动画** - 元素渐入效果
- **时间线悬停动效** - 节点放大和光晕效果
- **文章详情弹窗** - 点击文章卡片查看完整内容

### 视觉设计
- 深炭黑背景配合柔和白色文字
- 琥珀金 + 青蓝渐变点缀
- 卡片悬停时的3D倾斜效果和光效边框
- 高对比度设计，清晰可读

### 博客系统
- 在 `src/js/data/posts.js` 中添加文章
- 支持Markdown格式（标题、代码块、列表等）
- 点击卡片即可查看文章详情

### 自定义配置
编辑 `src/js/data/config.js` 轻松修改：
- 网站名称
- Hero区域内容
- 联系信息
- 页脚版权

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/Echo-Kang-hub/Signal-Portfolio.git

# 进入目录
cd Signal-Portfolio

# 安装依赖
npm install

# 启动服务
npm run dev
```

访问 http://localhost:3000

## 项目结构

```
Signal-Portfolio/
├── index.html              # 主入口文件
├── src/
│   ├── css/
│   │   └── main.css        # 主样式文件
│   └── js/
│       ├── main.js         # 主入口脚本
│       ├── data/
│       │   ├── config.js    # 用户配置
│       │   ├── content.js  # 实验项目、时间线数据
│       │   └── posts.js    # 博客文章数据
│       ├── effects/
│       │   ├── signalWave.js
│       │   ├── mouseParticles.js
│       │   ├── demoParticles.js
│       │   ├── postModal.js
│       │   └── ...
│       └── utils/
│           └── markdown.js # Markdown解析器
├── demo/
│   └── index.html          # 原始Demo版本
└── package.json
```

## 添加博客文章

编辑 `src/js/data/posts.js`：

```javascript
export const postsData = [
    {
        slug: 'your-post-slug',
        title: '你的文章标题',
        date: '2024-01-15',
        tag: '技术标签',
        excerpt: '文章摘要...',
        content: `文章内容，支持 **Markdown** 格式...
        
## 二级标题

\`\`\`javascript
// 代码块
console.log('Hello');
\`\`\`
`
    }
];
```

## 浏览器支持

- Chrome/Edge (最新)
- Firefox (最新)
- Safari (最新)

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

<p align="center">Made with ❤️ for Creative Coding</p>