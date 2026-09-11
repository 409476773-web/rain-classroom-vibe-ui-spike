# Day 3 Core UI 运行证据

本目录记录 `foundation-spike-day-3` / Task 4 的本地实现、自动检查与分组件人工验收证据。Button 已于 2026-09-03 完成真实页面视觉与交互验收；这不表示其余 Core UI Human Gate、Figma 写入、正式 Figma Component、包或 Registry 发布、业务迁移、Git commit 或远程 Git 已完成。

- `core-ui-page.png`：Chromium 在 1440px 视口渲染的 Core UI 全页截图；页面恢复到默认状态后让 Primary Button 保持键盘焦点，便于同时检查四个组件家族和焦点外框。
  - IHDR 尺寸：`1440 × 3807`
  - 文件大小：`692099 bytes`
  - SHA-256：`6e3b80a99bb6ab78cff6e090231f315ff27b6227fc186f287d19f0e1c85280f7`
- `red-green-summary.md`：测试先行、真实浏览器排错和独立代码复核摘要。

常规浏览器检查把截图写入 Playwright 临时产物，不会覆盖本文件登记的正式截图。只有显式设置 `RAIN_UPDATE_DAY_3_EVIDENCE=1` 才会刷新正式截图；刷新后必须同步精确文件大小与 SHA-256，并重新运行边界检查。

截图中的四组组件是 `local-experiment / prototype-ready` 候选。它们已完成本地实现和自动检查；其中 Button Human Gate 已通过，Input、Tag/Badge、Surface/Card 仍待设计师验收。不能据此推断已经发布或进入业务系统。
