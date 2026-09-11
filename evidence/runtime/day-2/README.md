# Day 2 Foundations runtime evidence

本目录只记录 `foundation-spike-day-2` / Task 3 及 Day 2.1 Focus / Color 修正的本地运行证据，不表示 Human Gate、Figma 写入、正式 Figma Component、包/Registry 发布、业务迁移或 Git 操作已完成。

- `foundations-page.png`：Chromium 以 1440px 视口、`prefers-reduced-motion: reduce` 渲染的全页截图；截图时 Compact Input 保持键盘焦点，用于检查原稿方向的浅蓝表面、1px 品牌边框和轻量 halo。
  - IHDR 尺寸：`1440 × 4636`
  - 文件大小：`656036 bytes`
  - SHA-256：`56d4caaf64559ff7ec3ac6aa1db884a5eca3a19c87b99b16b1ee050be2ac67a4`
- `font-environment.md`：字体文件存在、使用授权与浏览器渲染探针的分离记录。
- `red-green-summary.md`：TDD RED→GREEN 和浏览器故障排查摘要。

常规 E2E 只强制 Data 字体声明、700 字重、完整回退链和 Value / Unit 拆分；运行探针会记录 `target-hit` 或 `fallback-hit`，两者均是可移植验证的合法结果。`RAIN_REQUIRE_LINE_SEED=1` 启用严格字体证据模式；`RAIN_UPDATE_DAY_2_EVIDENCE=1` 同时启用严格字体证据并刷新 canonical 截图。

常规 E2E 截图写入 Playwright 测试产物目录，不覆写已审计的 canonical 证据。Canonical 刷新后必须同步上述精确文件大小与 SHA-256，并重跑治理门；两项均与真实 PNG 强制一致。

页面中的控件是 Foundation 展示夹具，使用原生 HTML；没有提前实现 Day 3 UI 组件、Layout 或 Benchmark 页面。
