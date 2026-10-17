# Navigation v0.4.2 候选对照索引

当前状态：**G1 待人工评审**。截图与差异测量不构成视觉验收，所有对照结果 `approved: false`。

以 [最终汇总](2026-09-27T20-08-28-468Z/README.md) 和 [逐案例机器索引](2026-09-27T20-08-28-468Z/review-summary.json) 为准：

| 案例 | 权威证据目录 |
| --- | --- |
| A1 default / resource / count track，R2 1200 / 1440 / 1600 | [20:04 完整捕获](2026-09-27T20-04-03-601Z/comparison-report.json) |
| A4 default / selected-second，Connections default / selected-second / outlined behavior | [20:08 最后增量捕获](2026-09-27T20-08-28-468Z/comparison-report.json) |

两次运行均退出 0，source hashes 在各轮捕获前后一致，浏览器 console error / page error 均为 0。20:08 的 A4 / Connections 替换 20:04 对应结果，其余案例沿用 20:04。两轮间仅修正 samples.tsx / samples.css 中的 A4 / Connections 样本。

推荐打开：

- [R2 1440 原稿 / 候选并排](2026-09-27T20-04-03-601Z/R2-default-1440-comparison/side-by-side.png)
- [A1 带数量轨道并排](2026-09-27T20-04-03-601Z/A1-count-track-comparison/side-by-side.png)
- [A4 原稿 / 候选并排](2026-09-27T20-08-28-468Z/A4-default-comparison/side-by-side.png)
- [ConnectedSurface 原稿 / 候选并排](2026-09-27T20-08-28-468Z/Connections-default-comparison/side-by-side.png)

剩余真差异：复用图标与原稿 inline SVG 的图形差异；A1 Global 起点 +0.8906px；R2 1200 / 1440 tab 的小于 1px 宽度差及累积位置差；R2 初始视区之外的后续章节组仍有 8–11px 纵向节奏差。详见最终汇总，未以截图不可见为理由宣称一致。

A1 count 仅对照轨道；W3 完整画板不在此次 parity，outlined 仅为 Connections identity fixture 的行为证据。历史失败、修正前截图和补充测量均保留，不覆盖基线。
