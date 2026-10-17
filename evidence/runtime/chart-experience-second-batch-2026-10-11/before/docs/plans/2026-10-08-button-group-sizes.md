# Button Group 多尺寸 Implementation Plan

**Goal:** 用户确认上轮样式后要求补充多尺寸，完整展示现有 mini/small/medium/large/xl。
**Architecture:** 子 Button 继续拥有 size，Group 不新增尺寸 API。同尺寸直接 ordinary Button 的 data-size 通过低 specificity :has/:where 关系让组内 Text 使用对应既有字号、行高、半径和最小高度；独立 Text 不变。Separator 沿用现有完整线。页面新增五档对照与完整复制示例；XL 用局部横向滚动承接窄容器。
**Tech Stack:** 现有 React / Rain Button / CSS / 原生 details / Vitest / Playwright。System Mode，registry-candidate。

V02 保持跨尺寸共同结构；V05 按内容、尺寸和行为一起检查；D05 大尺寸不挤坏窄容器。使用既有 Button Tokens，不新增或修改 Token 数值。

1. 先加入多尺寸展示、Text 匹配、默认密度、禁用接缝与局部滚动的最小失败检查。
2. 修改 button-group.css 与 button-group-page.tsx/.css；保留 API、独立 Button、独立 Text 和现有例子。
3. 检查五档横组/竖组/文字/线/禁用的真实几何，以及浅深两主题、窄屏、键盘和可复制代码。类型/相关行为/构建验证；实际看图。
4. 在新 evidence/runtime/button-group-sizes-2026-10-08/ 记录 successor，保留旧修复和样式记录。只确认用户已检阅的上轮样式；新多尺寸视觉Gate仍待审。独立复核后给新入口。

不执行 Git、Figma、发布、迁移；共同文档壳、其他组件和并行图表工作保持。
