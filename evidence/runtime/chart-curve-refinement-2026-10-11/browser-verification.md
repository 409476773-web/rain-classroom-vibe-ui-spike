# 曲线调整浏览器专项验证

通过 14 项浏览器用例：核心 12 项见 `browser-tests-02.log`；分类 Area 补充 2 项见 `browser-tests-03.log`，补充运行 exit 0。合计 234 次真实原生 SVG 几何快照，0 页面异常。自动汇总及源冻结核对见 `browser-summary.json`。

| 范围 | 条件 | 结果 |
| --- | --- | --- |
| 默认 Line / Area / Composed | 1440、390；普通与减少动效 | 原始人数、完成率的一位显示精度、Tooltip、缺测、全零、单项、更新及重播通过 |
| official Area、双轴 Line、markers/dashed-tail Composed | 同上 | 每条曲线峰谷不超过自身数据；完整 Tooltip；28 个 marker circle；第 5 点虚线起点通过 |
| Mini Line / Area | 同上；96×32、128×48 | 原尺寸、共享读数、装饰性无 Tooltip、缺测/全零/单项、更新及重播通过 |
| semester / period / version 分类 Area | 1440、390；减少动效 | 原始点数、完整精确表、Tooltip、两期原日期、更新/重播/全零/缺测通过；窄屏保留横向滚动 |

修改前、修改后各冻结 24 个代表区域。`browser-comparison.json` 的 24 组保护比较全部通过：颜色、线宽、可见填充、字体样式、图例、日期标签、SVG 尺寸一致；44 条真实原生路径发生曲线变化。Line / Area 及非率值变体的日期和人数表格也保持一致。完成率精度调整属于本轮授权变化。

双轴 Line 的 rate 曲线，在两个宽度下均从浏览器采样的 5 次转向降为 1 次，与原始数据的 1 次转向相符。该计数读取实际 SVG `getPointAtLength`；独立的精确导数审计仍由 `curve-audit/` 证据负责。

原始图片和完整路径分别位于 `browser-before/`、`browser-after/`。分类补充图及 Tooltip 图位于 `browser-tests/after-tests-03/category/`。已肉眼查看默认组合图、窄屏 Area、双轴 Line、markers、Mini 全家族、分类 period 和 version；最终视觉选择仍由用户确认。

初轮失败来自取证方式，保留原始日志与 trace：透明填充与 `none` 的视觉等价性、marker 父级变换坐标、更新后的合法刻度数量、重复分类 URL 保留状态。仅修正测试与证据读取；未修改 runtime，也未降低曲线/真实读数断言。最终 12＋2 份通过结果和 after 图片使用同一冻结源码。

全 tests 类型检查 `browser-typecheck-06.log` 仍只有 4 项既有诊断：Toast 两处 `exact`，旧 chart-feedback 与 chart-feedback-legend-tooltip 配置各一处 `reducedMotion`。新增曲线用例无类型诊断。
