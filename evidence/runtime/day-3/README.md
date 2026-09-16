# Day 3 Core UI runtime evidence

本目录只记录 `foundation-spike-day-3` / Task 4 的本地运行证据。它证明 Button、Input、Tag/Badge 与 Surface/Card 四组 `local-experiment` 资产已在 Playground 中以真实代码和浏览器输出接受自动验证；它们尚未登记候选 Manifest，不表示 Human Gate、Figma 写入、正式 Figma Component、包/Registry 发布、业务迁移、local commit 或远程 Git 操作已完成。

- `core-ui-page.png`：Chromium 以 1440px 视口渲染 `#components` 的全页 canonical 截图，覆盖四组家族、Compact / Default 密度、关键状态、无障碍文案、Visual lineage 与 Modification boundary。
  - IHDR 尺寸：`1440 × 2630`
  - 文件大小：`383329 bytes`
  - SHA-256：`0fa5022a3d31812ce400c28a154b8fd337c0255e98c29399bb95d192f47bee40`
- `red-green-summary.md`：Task 4 的 TDD、类型检查、浏览器故障排查与最终验证摘要。

截图已人工查看：页面结构完整，无横向溢出；四个家族的层级、状态、密度与修改边界均可见；Input Focus 延续 VE-014 的浅蓝表面、1px 品牌边框与轻量 halo；Surface/Card 保持边框分层且不引入常态阴影；Tag 移除动作使用文字，不以 Unicode 或自绘图标替代正式图标资产。

`RAIN_UPDATE_DAY_3_EVIDENCE=1` 只在显式执行 Day 3 Chromium spec 时生成 Playwright 截图产物。刷新 canonical 文件后，必须同步上述尺寸、文件大小与 SHA-256，并重跑边界和完整质量门。
