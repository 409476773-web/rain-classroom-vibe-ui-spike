# Button Group 样式优化 Implementation Plan

**Goal:** 按用户「开始改代码」落实已分析的四项优化。
**Architecture:** 仅在 Button Group 组合层保持禁用结构线、把现有禁用透明度移到已有内容 Parts；分隔线使用与普通接缝一致的既有边框 Token，横竖方向均完整连接。独立展示页以原生 details 折叠各例代码，集中对照禁用位置，反馈用现有 13px / 20px 与 8px 间距。
**Tech Stack:** 现有 React、Rain Button/Separator、CSS、Vitest 与 Playwright；不增加依赖。

System Mode，registry-candidate。不修改独立 Button 默认、公共 Token 数值、共同文档壳、旧 Registry 字节、旧 Gates 或其他图表任务。V02 用统一结构表达组，V04 弱化反馈层级，D02 集中状态对照。新视觉 Human Gate 保持待审。

1. 在现有文档/浏览器测试加入结构线稳定、首中尾/全禁用与代码按需展开检查；保留修复前预期失败。
2. 改 packages/ui/src/button-group/button-group.css；保持组件 API、原生 disabled、Tab 和焦点，统一完整 Separator。
3. 改 button-group-page.tsx/.css；复用 DocExample/DocCode，原生 details，仅本页调整反馈和布局。
4. 类型、相关行为、真实 Chromium 几何/主题/密度/键盘/390px 检查；实际看图。按既有精确来源记录新增本轮 successor，不覆盖旧记录。独立审阅后给可运行入口。

证据目录 evidence/runtime/button-group-style-2026-10-08/。尚需确认：禁用的结构完整感、状态对照密度与线强度在实际主题下的观感。Git/Figma/发布/迁移不在授权内。
