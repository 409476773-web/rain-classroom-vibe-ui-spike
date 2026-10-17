# Button Group 多尺寸独立实施审阅

日期：2026-10-08。审阅者：G1 实施代理，未参与本轮源码编辑。范围：本目录 `before/` 与当前 Group CSS、独立页 TSX/CSS/测试、E2E spec；只写本审阅文件，未修改实现、重复运行测试或浏览器，未读取或调整未冻结的 phase/Gate 状态。

结论：未发现 P1/P2/P3。当前实现符合计划中的最小共享方案：子 Button 继续拥有 size，无新增 Group API、CSS 变量、依赖或 Token 数值。

## 源码与调用核对

- `button-group.css:10-14` 的五条关系选择器 specificity 为 `0,2,0`：`:where` 使 `:has` 参数权重为零。现有连接角规则为 `0,4,0`，因此尺寸映射改变外侧半径而不会盖回内部圆角；这同时适用于横向和竖向 Text。
- 五档 min-height / 字号 / 行高 / 半径对应真实 Button Tokens：mini `28 / 13 / 18 / 6px`，small `32 / 14 / 22 / 6px`，medium `36 / 14 / 22 / 6px`，large `40 / 14 / 22 / 6px`，xl `48 / 16 / 24 / 8px`。Text 的 min-height 补足竖组中原来只有自然行高的几何；横组继续 stretch。Text 原有 padding、背景、边框与静态语义保留。
- `Button` 总是输出 resolved `data-size`。无显式 size 时默认 density 选择 medium，compact 选择 small；显式 size 优先。新关系不使用通用 compact control-height 的 30px，而使用 Button small 的 32px。
- 关系限定直接 ordinary Button 和直接 Text，排除 variant=text，避免其 small 与普通 small 撞名。独立 Text、没有普通 Button 的组不匹配新关系，继续原 medium 字号/行高/半径和自然高度。现行旧 G2 两组无显式 size，唯一旧 G2 Text 位于组外；无默认调用回归。混合尺寸或包裹子项仍按文档的同尺寸、直接子项边界处理。
- 与 `before/` 字节比对确认 Group TSX、Button TSX、Button 样式、Tokens 及公共 ComponentDoc TSX/CSS 未修改。现有禁用内容透明度、结构边框、Separator 色值/完整线、focus-visible z-index、Button 原生 disabled/type/Tab 行为均保留。
- `button-group-page.tsx:54-88,132-153` 展示五档各横向、文字、竖向，共 15 组，显式 size 一致；竖组含 Text、横向 Separator 和禁用按钮。回调更新具名尺寸反馈，不干扰旧例的状态。代码具备 imports、状态、完整组成、回调及 `overflow-x-auto p-rain-4`，没有未定义宿主变量或新增公共接口。
- `button-group-page.css:21-24` 的尺寸容器只作用该页：组外可换行，组内维持连接；单组 wrapper 横向滚动、max-width=100%、padding=4px，给 XL 三按钮至少 480px 的真实宽度和 3px 焦点 halo 留出空间。

## 测试与证据范围

新增文档检查覆盖 15 组的实际 size 标记。新增 E2E 在浅/深色和默认/紧凑密度下读取五档三种组合的真实尺寸、字体、行高、外角、禁用透明度及 1px 横线，并检查窄屏无页面横向溢出、XL 局部滚动。原禁用接缝、显式线、默认密度、键盘和反馈检查保留；原全页 Text 代码计数改为原提交示例内计数，是因新增多尺寸代码含 Text 而收窄定位，不弱化原例要求。

只读查看 `behavior.log` 与 `browser-green.log` 末尾，分别记录 112 项行为检查和 11 项 Chromium 检查通过。审阅者未复跑、未独立看图，不将这些结果推导为人工视觉、对比度或其他浏览器接受；其余执行结果由 Root 的本轮验证记录闭合。

## 审阅源码 SHA-256

| 文件 | SHA-256 |
| --- | --- |
| packages/ui/src/button-group/button-group.css | 2be21a8f1955e1702a7eda0a0a784eac9177f289e1ed8159df36a2cd8d89b160 |
| apps/playground/src/docs/components/button-group-page.tsx | c9fe97c50b86c4023c0a8d0d6fb7fa97035a7a50654b838a32f6adfe860902aa |
| apps/playground/src/docs/components/button-group-page.css | c6dd229374b5545c483ac221a01ea28e4f1af3389bf664ed35369bd4c517b8f4 |
| apps/playground/src/docs/components/button-group-page.test.tsx | e0e7c4f7236919f8363f1a912fcabb38fb70e8e0cb1ef27bd4095616a7910f91 |
| tests/e2e/button-group-repair.spec.ts | e91359b15554ea881a3c5ebf1684df249d609bc6e7a29d56b567db8ec6691159 |
