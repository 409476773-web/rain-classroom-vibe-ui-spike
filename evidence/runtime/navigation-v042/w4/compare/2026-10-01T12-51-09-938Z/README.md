# W4 S1–S6：修复前保留矩阵

本轮是原尺寸对照证据，未获人工视觉验收。后续针对 1200 预算提示、R4 PDF/评分 Tabs、R6 局部表单样式的修复仍在进行；本目录保留修复前证据，不作为最终保真通过记录。

- 捕获：24/24；初始双图像素完全一致：23/24。
- 页面错误：0；控制台错误：0。
- 捕获期实现 SHA 未变：True；固定原稿 SHA 未变：True。
- 原稿 SHA：`d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c`。
- 未缩放、未 mask，所有双图及差分保留；指标仅定位差异，不能替代人工视觉验收。

| Case | Width | Captured | Initial pair exact |
| --- | ---: | --- | --- |
| S1-default | 1440 | yes | yes |
| S2-default | 1440 | yes | yes |
| S3-default | 1440 | yes | yes |
| S4-default | 1440 | yes | yes |
| S5-default | 1440 | yes | yes |
| S6-default | 1440 | yes | yes |
| S1-compact | 1440 | yes | yes |
| S1-hidden | 1440 | yes | yes |
| S3-overlay-inverse | 1440 | yes | yes |
| S4-grading | 1440 | yes | no |
| S5-icons | 1440 | yes | yes |
| S6-focus | 1440 | yes | yes |
| S1-inverse | 1440 | yes | yes |
| S2-inverse | 1440 | yes | yes |
| S3-inverse | 1440 | yes | yes |
| S4-inverse | 1440 | yes | yes |
| S5-inverse | 1440 | yes | yes |
| S6-inverse | 1440 | yes | yes |
| S3-overlay-light | 1440 | yes | yes |
| S3-global-overlay-inverse | 1440 | yes | yes |
| S5-tabs | 1440 | yes | yes |
| S5-tabs-peek | 1440 | yes | yes |
| S5-hidden | 1440 | yes | yes |
| S5-hidden-peek | 1440 | yes | yes |

截图稳定性补测见 [五帧诊断](../../../w5/stability/2026-10-01T12-56-28-534Z/README.md)。四个 grading 案例初始两帧存在 9 个圆角像素、最大通道差 1；后续自然连续帧完全一致。初始不稳定记录没有改写为 stable。
