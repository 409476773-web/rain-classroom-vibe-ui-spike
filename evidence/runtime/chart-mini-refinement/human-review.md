# 迷你图表双尺寸：待用户视觉审阅

2026-10-09，本地技术交付完成；视觉 Gate 仍为 awaiting-user-review。以下材料供本轮尺寸与图文排版审阅，不代表发布、业务迁移或整体对比度接受。

打开 [业务预览](http://127.0.0.1:5173/#chart-business)，依次看“两档迷你图表”、指标卡、表格、列表及底部舒展组。图表库在 line / area / bar / pie / ring 入口提供两档型号；[原型目录](http://127.0.0.1:5387/bklit-catalog.html) 保持同一套选择与对照。

## 当前材料

| 材料 | 主要看什么 |
| --- | --- |
| [两档画廊，916px](final-preview/gallery-916.png) | 同图的紧凑与舒展比例、标签、留白和九种表达 |
| [指标卡，916px](final-preview/cards-916.png) | 主读数、进度弧中心、文本基线与卡片分组 |
| [指标卡，1440px](final-preview/cards-1440.png) | 桌面整体密度 |
| [指标卡，390px](final-preview/cards-390.png) | 窄屏换行与图文间距 |
| [表格，1440px](final-preview/table-1440.png) | 紧凑条形与人数对齐、56px 行高 |
| [列表，1440px](final-preview/list-1440.png) | 标题、分数和完成分组 |
| [完整宿主与底部组](browser/embedding/desktop.png) | 业务对象与图文关系；最终底部字级以当前预览为准 |

上述最终截图为 normal / revision 0，图形截图使用 reduced motion 稳定后拍摄；不是普通动效表现录像。普通悬停、更新、离屏恢复及 reduced 的事实记录在 [browser/verification.md](browser/verification.md)。列表截图主要覆盖列表行，底部舒展组请在当前预览查看，最终实测中心读数为 18px/22px。

## 本轮待审点

1. 两档在各自宿主中的密度是否合适：表格紧凑、卡片舒展、列表成组。
2. 图形、数字和说明的大小关系是否清楚；卡片基线、表格人数对齐是否自然。
3. 进度弧是否保持圆形与底部开口；中心百分比和“完成率”组合是否易读。
4. 缺测、全零、超范围和窄屏时，状态说明及分组是否顺畅。
5. 普通更新 / 悬停速度是否符合预期；Ring 保留弹簧更新，未承诺 650ms 内结束。

技术边界、下载验证和遗留问题见 [verification.md](verification.md)。本轮没有设第三档、自动切档或全局密度开关。
