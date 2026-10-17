# G1 review-04 · 连接页签几何修订

2026-09-30 用户确认讨论结论并授权开始修改代码。System Mode，仅 navigation-browser / ScopeNavigation / ConnectedSurface 候选和所属验证、合同。

- 页签之间含更多入口间距 8px；未选中 Hover 背景距工作面 8px，选中才连接。
- 内容、图标、主副标题基线与点击区在未选中/hover/选中以及 inset/merged 间稳定；选中字重不挤动内容。
- 两种模式只改变水平内缩；贴边模式按选中项实际接触的边接管外角，其他工作面角保留。更多入口不被视为已选页签。
- 复用现有 spacing 8、圆角和浅 hover Token、Tabs 行为及单一 SVG 轮廓；不改普通 Tabs / 全局 Token / Classic / 冻结 HTML。
- 设计方法 V05（内容、外观、行为一起核验）、D02（间距、对齐、表面归属），沿用已确认字号和信息层级。
- 验证：几何单元回归；实际浏览器 A4 / Connections / R2 的两模式、首中末项、hover/selection 对齐和截图；独立消费者草稿/内部 Tabs、More 下拉；类型检查/构建与源码来源完整性。
- 未验证假设：同一基线容器与字体中，上述几何能保留原稿已认可轮廓质感；由本轮截图交 G1 复审。G1 仍 pending，W3–W8 不推进。

实施前工作区摘要：codex/card-v2，HEAD 321e1a0c1b5f9284e0fcb5167fa059d6174b1752；5198 服务来自本工作树 apps/playground。已有修改保护哈希与本轮源文件副本随附。

## 结果与对照

| 场景 | 修改前 | 当前实测 |
|---|---|---|
| A4 / Connections / R2 项间距 | 2px | 8px |
| R2末项到More（inset / merged） | 26px / 2px | 8px / 8px |
| 三样本页签顶部（inset / merged） | 8px / 0px | 8px / 8px |
| A4 / Connections 接缝高度（inset / merged） | 72px / 64px | 72px / 72px |
| 未选中hover到工作面 | 由轨道高度偶然决定；常见0px | 两模式固定8px |
| 主标题、说明、图标在idle/hover/selected及模式间 | 模式切换时整体垂直偏移 | 相对页签横向位置、相对frame纵向位置差0 |
| merged首项选中 | 两个工作面上角都清零 | 仅左侧连接由页签接管，右上角保留 |
| merged中间或More前末项选中 | 两个工作面上角都清零 | 两个上角保留 |

原稿的A4/R2本轮已实际打开、悬停、选择并截图；`reference/facts.json`记录原稿哈希及几何，冻结HTML仍为 `d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c`。本轮按用户已确认规则覆盖间距与连接细节，不声称与旧原稿像素一致。

| 对照 | 原稿 | 修改前组件 | 当前组件 |
|---|---|---|---|
| A4 hover | [原稿](reference/A4-default-hover.png) | [inset](before/A4-inset-hover.png) | [inset](after/A4-inset-hover.png) / [merged](after/A4-merged-hover.png) |
| R2 hover | [原稿](reference/R2-default-hover.png) | [merged](before/R2-merged-hover.png) | [inset](after/R2-inset-hover.png) / [merged](after/R2-merged-hover.png) |
| 中间项与外角 | [原稿A4](reference/A4-default-selected.png) | [merged A4](before/A4-merged-middle.png) | [merged A4](after/A4-merged-middle.png) / [merged R2](after/R2-merged-middle.png) |
| 末项与More | — | [R2](before/R2-merged-last.png) | [R2](after/R2-merged-last.png) |

[修改前几何](before/geometry.json)、[当前几何](after/geometry.json)包含三样本、两模式及idle/hover/selected/last状态。浏览器验证实际SVG填充区域，而非仅检查属性文字。通用几何单元另覆盖真正右边缘接管和当前项被裁切后恢复外角。

## 验证与边界

- [unit-before.log](unit-before.log)：新增圆角回归先失败，3项原检查通过；[unit-after.log](unit-after.log)：4文件31项通过。
- [browser-before.log](browser-before.log)：真实修改前间距2px导致新8px断言失败；[browser.log](browser.log)：10项浏览器检查通过。包含原9项行为/回归、当前6组合的hover与对齐；29处hover检查仍通过。
- [build.log](build.log)：Playground类型检查和构建通过；保留既有大chunk提示。
- [regression-03-after](regression-03-after/)记录More下拉、计数、轻Mask和短窗口；旧review-01/02/03证据保持原样，新回归输出写入本目录。
- 运行环境：本机Chromium、zh-CN、DPR1、reduced-motion。全浏览器、真实读屏、对比度验收未在本轮扩展；G1仍pending。

本轮代码修改只在共享导航CSS和ConnectedSurface（几何、裁切状态、样式）四个文件；A1、普通Tabs、R2业务/草稿及原稿未改。Scope保持170–255px宽度上限和原有可见槽预算；只有当轨道到达最大项宽时不再撑满，以保证More贴近末项。无新断点、依赖、全局Token、Classic、Figma、Git提交或发布。

[资产检查](asset-check.json)：5项Manifest/Registry/依赖与源码哈希通过。历史阶段对照通过，原review-03完整转存为history，其他阶段与Gate不变。[保护核对](protection.json)：10,323个已有文件中仅14个本任务所属文件变化，无缺失；当前轮没有检测到范围外文件改动。
