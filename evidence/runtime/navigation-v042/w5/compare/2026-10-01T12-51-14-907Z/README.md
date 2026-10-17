# W5 R4–R6：修复前保留矩阵

本轮是原尺寸对照证据，未获人工视觉验收。后续针对 1200 预算提示、R4 PDF/评分 Tabs、R6 局部表单样式的修复仍在进行；本目录保留修复前证据，不作为最终保真通过记录。

- 捕获：19/19；初始双图像素完全一致：16/19。
- 页面错误：0；控制台错误：0。
- 捕获期实现 SHA 未变：True；固定原稿 SHA 未变：True。
- 原稿 SHA：`d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c`。
- 未缩放、未 mask，所有双图及差分保留；指标仅定位差异，不能替代人工视觉验收。

| Case | Width | Captured | Initial pair exact |
| --- | ---: | --- | --- |
| R4-interaction | 1440 | yes | yes |
| R4-interaction | 1200 | yes | yes |
| R4-interaction | 1600 | yes | yes |
| R4-grading | 1440 | yes | no |
| R4-grading | 1200 | yes | no |
| R4-grading | 1600 | yes | no |
| R5-default | 1440 | yes | yes |
| R5-default | 1200 | yes | yes |
| R5-default | 1600 | yes | yes |
| R6-default | 1440 | yes | yes |
| R6-default | 1200 | yes | yes |
| R6-default | 1600 | yes | yes |
| R4-interaction-selected | 1440 | yes | yes |
| R4-grading-selected | 1440 | yes | yes |
| R5-seek-second | 1440 | yes | yes |
| R6-table | 1440 | yes | yes |
| R6-form | 1440 | yes | yes |
| R6-board | 1440 | yes | yes |
| R6-album | 1440 | yes | yes |

截图稳定性补测见 [五帧诊断](../../stability/2026-10-01T12-56-28-534Z/README.md)。四个 grading 案例初始两帧存在 9 个圆角像素、最大通道差 1；后续自然连续帧完全一致。初始不稳定记录没有改写为 stable。

实际 DOM 业务操作：7 项，均有候选断言。已打开并排图确认的差额：R5 1200 缺原稿强制隐藏 global 与 24px预算提示；R6 1200 缺24px提示；R4 PDF页375→340、h4/段落间距与评分Tabs肩部不匹配；R6 字段/新建块间距待局部修复。精确实测见 [PDF-budget-precise-measurement.json](PDF-budget-precise-measurement.json)。这些已交给实现者修复，不宣称本轮视觉完成。
