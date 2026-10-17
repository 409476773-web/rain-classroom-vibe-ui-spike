# Button Group 独立实施审阅

日期：2026-10-07。审阅者：G1 实施代理，未编写本轮 Button Group 实现或文档修复。范围：共享 TSX/CSS、独立文档页与文档测试，并对照本轮 `before/`。只写本审阅记录，未改实现、运行测试或重复浏览器检查，未触及旧图表工作。

结论：当前修复未发现须修复的 P1/P2。六项诊断的实现与文档根因已有对应解决；真实浏览器结果由 Root 记录，本结论不替代视觉、对比度或 Human Gate。

| 诊断 | 源码审阅结果 |
| --- | --- |
| 内部圆角被 Button 覆盖 | `button-group.css:2,5-9` 将组规则置于 utilities；同层直接子项规则的 specificity 高于独立 `rounded-rain-button-*`，不再受 base/utility 层次冲突影响。外侧圆角保留子项原值。 |
| 普通接缝重叠 | `button-group.css:6,9` 删除负 margin，并移除后项的起始边框；前项结束边框单独拥有接缝。禁用透明度仍由现有 Button 处理，接缝不再由重叠的两个边框混合绘制。 |
| 显式 Separator 与邻边重复 | `button-group.css:7,10` 移除分隔线之前的结束边框；后项的起始边框已移除。TSX:27 给 wrapper 添加 orientation，未改变内 Separator 的装饰语义。 |
| 竖组分隔线占 9px | `button-group.css:12-14` 将 padding 和 height:auto 限于 vertical Separator。竖组使用 horizontal Separator，保留共享 Separator 的 1px 高度，不再有上下各 4px 的空隙。 |
| 文字块与按钮几何、字号不一致 | `button-group.css:11` 使用既有 medium radius/font-size/line-height，当前默认与紧凑 Button 均为 6px、14px/22px；高度继续由 items-stretch 跟随按钮。文字原有颜色、背景、padding 和非交互属性保留。 |
| 示例关系、反馈与复制代码不足 | `button-group-page.tsx:6-93` 拆为无 Separator 横向基准、显式 Separator、竖向、文字与保存四组。每组代码均包含 imports、局部状态、回调和所见组合；反馈具名且就近，各例状态独立，重做可启用、执行、禁用并恢复。 |

## API、键盘与旧入口

- 共享 TSX 对比 `before/` 的唯一变化为 Separator wrapper 的 `data-orientation`；Group 默认 horizontal、Separator 默认 vertical、role=group、useRender、公开导出和原生 props 继续保留。没有克隆子项、注入尺寸或引入组选择状态。
- `Button` 的默认 type=button、disabled、loading 阻止执行、密度选择和尺寸配方未修改。组保留各按钮独立 Tab 顺序、focus-visible z-index=1、可见溢出。原 G2 compatibility entry 仍 re-export 当前共享实现。
- 文档测试四项覆盖本地反馈隔离、重做恢复周期、基准/分隔线独立状态及四组匹配代码。源码断言没有把 CSS 外观或人工接受当成测试通过。本轮浏览器测试源码另覆盖真实 computed styles、几何、主题/密度、禁用切换、Tab/Enter 与窄屏；本审阅未执行或宣称其结果。
- Group 的接缝和文字字号修复也作用于旧 G2 使用方，属于本轮明确修复范围；旧场景的视觉接受记录仍是原范围，不因源码审阅自动变成本轮接受。

## 文档边界补充

追加审阅时，`button-group-page.tsx:77,79` 已说明 Button、Text、Separator 作为直接子项，Text 匹配默认或紧凑普通按钮字号。原两项可选 P3 已补充，无新增公共属性。

## 深色局部桥接追加审阅

`button-group-page.css:2-6` 同时限制 `.component-doc`、`data-rain-id="doc-button-group"` 和 `data-rain-theme="dark"`。仅在该页深色根元素上，将 legacy text-primary、surface-panel、surface-subtle 桥接至现有 Category neutral text-1、background-1/2，并将根背景设为 background-3；没有创建、修改或硬编码 Token 色值。

共享壳的 preview/code 使用 surface-panel，静态文字使用 surface-subtle，因继承该页根变量可获得正确暗色面；主文字读取 text-primary。`tokens.css:1077,1100-1102` 的既有 dark Category 值与新映射对应；text-secondary 与边框已在 dark scope 绑定 Category（`tokens.css:1346,1351-1352`），无需额外覆盖。新 CSS 没有命中浅色根或其他组件页，即使懒加载样式驻留也不会扩大选择器范围。CSS 导入仅在该页 TSX:4；Group/Button/Separator API 和共享壳未改。

追加结论：未发现 P1/P2。Root 新增 dark 浏览器断言已在旧实现失败；本审阅只核对该断言与修复源码，未重复运行或宣称绿色结果，不推导新的视觉/对比度接受。

## 审阅源码 SHA-256

| 文件 | SHA-256 |
| --- | --- |
| packages/ui/src/button-group/button-group.tsx | 89c70b9a5a8fa1698872af380049ff0e2a71ec5bae186a4c1bd759c2d31f6f9d |
| packages/ui/src/button-group/button-group.css | 74ef85768792cc85cdf2017c4779dbcc8be4453b23f1aecd6981f7878af847ec |
| apps/playground/src/docs/components/button-group-page.tsx | 24514e4980a2e6909f3b51a013c93e3252f5f39a17ae261a2290f1c85e530cc1 |
| apps/playground/src/docs/components/button-group-page.css | cacb186d74216d5f383c31ed5f296c5b77145656882604e1adb9c5ba35d18856 |
| apps/playground/src/docs/components/button-group-page.test.tsx | b6bee4bcf4437a81ad1c75659d42f2dd6488f8279da61f79cb4df1293326b96b |
