# Button Group 修复验证

日期：2026-10-07。用户在只读诊断六项问题后授权「继续修复」。范围为现有 Button Group Parts 与独立 Playground 页；候选未发布，新视觉 Human Gate 待用户检阅。

入口：[Button Group](http://127.0.0.1:5376/#button-group)。页面、组件和库的公开 API 仍沿用现有资产；未修改 Button 默认值、Foundation Token 值、旧 Registry 字节、Git 或业务服务。

## 已修复

| 问题 | 最终行为与实测 |
| --- | --- |
| 内侧圆角未消除 | 组合样式与 Button utility 处于同层，以组合选择器覆盖内角。横组中间项四角归零，首尾外角保留 6px；浅/深、默认/紧凑四组合检查通过。 |
| 接缝重复叠加 | 删除负 margin；普通接缝只由前项结束边框绘制。显式 Separator 前后两项邻边移除，仅保留一条 Separator；禁用/启用/恢复期间位置连续。 |
| 竖组留下空档 | Separator wrapper 标记真实方向；上下 inset 仅用于竖线。竖向组的横线区域从 9px 变为 1px，前后按钮紧邻该区域，无原 7px 空档。 |
| 文字块规格不协调 | 复用既有普通 Button medium 字号、行高与圆角：14px/22px/6px；默认和紧凑下文字块与相邻按钮等高。文档明确该文字规格适用于默认/紧凑普通按钮，显式其他尺寸需单独组合验证。 |
| 示例反馈串区 | 横向基准、横向显式分隔线、竖向、文字与保存四例各自保留本地状态及具名反馈；下方操作不修改上方反馈。撤销/重做/恢复状态可重复切换。 |
| 展示与调用说明不足 | 四种可见组合各有完整 imports/state/callback/代码；文字组合包含 ButtonGroupText。补充直接子项、同尺寸按钮与分隔方向说明。 |

查看实际截图时发现深色示例混入旧白色 panel 与浅色静态文字底板。该项先记录失败，再用仅匹配 `doc-button-group` 的深色 CSS 桥接三个既有 Semantic alias 到现有 Category 配色，并设置现有深色阅读背景；共享文档壳和其他页面未改。深色 panel 实测从 rgb(255,255,255) 变为 rgb(30,36,59)，见 [深色失败](dark-red.log) 和 [最终浏览器记录](browser-green.log)。

## 检查与证据

| 检查 | 结果 |
| --- | --- |
| 修复前真实 CSS 缺陷 | 三项预期失败：内角 6px、横线区域 9px、静态文字 16px；[browser-red.log](browser-red.log)、[报告](browser/report-red.json) 和 results-red/ 保留。 |
| 最终真实 Chromium | 七项通过，退出码 0：[browser-green.log](browser-green.log)、[报告](browser/report.json)。覆盖真实圆角/边框/分隔尺寸、两主题两密度、禁用恢复、键盘、反馈归属、390px 不溢出及深色底板。 |
| 相关行为回归 | 七文件、113 项通过，退出码 0：[behavior.log](behavior.log)。含 Button 既有样式/状态、G2 兼容入口、Toast、独立文档和入口。 |
| 独立展示页 | 四项先红后绿，最终四项再次通过：[文档记录](documentation-verification.md)、[最终运行](doc-tests-final.log)。 |
| 类型 / 构建 | UI、Playground、测试源码类型检查及 Playground 构建均退出码 0：[UI](ui-typecheck.log)、[Playground](playground-typecheck.log)、[测试](test-typecheck.log)、[构建](build.log)。保留已有大体积 chunk 提示。 |
| 独立审阅 | 当前源与接口范围没有 P1/P2；见 [实施审阅](implementation-review.md)、[治理审阅](governance-review.md)。 |
| 精确治理 / 索引 | 本轮五项治理检查通过，源/Registry/角色篡改会被拒绝；[治理结果](governance-final.json)、[测试](governance-final-tests.log)。资产索引闭合退出码 0：[asset-index-check.log](asset-index-check.log)。 |
| 深色阅读配色 | 新局部桥接检查零发现；正文对两个真实父表面分别实测 15.40 / 13.55，静态标签 9.10，均保留 4.5 要求；没有降低边界角色或授予人工对比度接受：[配色结果](doc-color-result.json)。 |

实际浅/深、桌面/窄屏示例截图保留在 browser/，实施者已查看横向基准、显式接缝、竖组、文字组合及深色底板。自动几何/键盘检查与实施者看图不代替用户视觉验收，也不代表完整 Safari/VoiceOver 或对比度验收。

## 合同与边界

新增独立 `buttonGroupRepair` 精确授权，旧 G123 completed、来源验收与所有未授权范围保持。当前修复的 Manifest 与源绑定另行记录，不覆盖旧八十二源快照或旧检验日志。绑定差额、冻结 Registry 与原阶段保护见 [source-bindings.json](source-bindings.json)、[授权记录](authorization-checks.json)。

本轮同时存在其他线程的图表建设，部分全库校验受到其阶段登记与来源变化影响；这些发现单列于 verify-*.log 与 token-attribution.json，未扩大 Button Group 授权、静默修改图表工作或清除历史 Token 发现。本记录仅确认上述限定范围检查。

最终实现与 scoped 自动/独立检查状态为 completed / passed-scoped；Human Gate 仍 awaiting_human。六个源散列核对、八份导航交付包和 HEAD 保护结果见 [summary.json](summary.json)。
