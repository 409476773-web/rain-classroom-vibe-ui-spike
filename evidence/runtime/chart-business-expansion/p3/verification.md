# P3 分类与周期业务图表 · 2026-10-09

本批完成 T12—T15 的本地技术建设；共享实现仍为 registry-candidate / unpublished，视觉待用户审阅。P4关系网络、P5省市地图与T22全批收口尚未完成，没有把P3测试通过写成全图表库验收通过。用户继续请求及唯一工作区见 baseline.md。

2026-10-09后续选型反馈：CH-060/049改轻面积、CH-112改固定0—10分柱状比较；本次修改及新鲜专项验证独立记录于[反馈记录](feedback-2026-10-09/verification.md)。下表保留P3初次交付记录，新效果尚待用户复核。

## 实际交付

- LineChart / AreaChart / ComposedChart 显式 xMode=category，稳定字符串ID、独立point中心定位、按输入排序、xLabel显示文案、最近项命中；默认time保持。
- 分类不生成日期，也不按时间下采样。Brush/Projection、日期标记/参考区域、LiveXAxis等时间专属组合明确拒绝。
- Line/Area/PatternArea静态及动画路径保留null断口；0有效，NaN/Infinity拒绝，markers/默认Tooltip不补假0。连续更新、中断与分类重排沿当前几何接续。
- SeriesBar.yAxisId、Composed逐轴固定零基线yDomains、同轴堆叠总量。矩形和提示共用几何；偏移由当前可见行计算，时间范围子集不借用原第0行偏移。连续入场/更新/重排保持同一节点，reduce或关闭动画在下一次绘制到终态；负数柱拒绝，已有负数趋势保持兼容。
- #chart-category 独立页面：CH-060学期、CH-005学院数量与覆盖率、CH-067层级堆叠与覆盖率、CH-049周期、CH-073版本面积、CH-112固定0—10评分。全部Mock，精确表、同名学院校区、原始日期、不同长度null尾、跨年/闰日校验与口径说明随附。
- 真实源码下载保存当前场景、状态、更新次数、重播、顺序与配色。分类下载仅含本地fixture/图形/CSS，不带世界geometry；P1 mini和P2 matrix仍各自归属原页面。
- 来源锁保留上游commit/hash并记录本地差异；新category-scale为Rain辅助扩展，已进入Registry shared闭包。4份Manifest、README、AI指南、组件目录和执行状态同步。

## 新鲜验证

| 检查 | 本次结果 | 证据 |
| --- | --- | --- |
| 图表/V1专项单测、全部业务fixture、170映射、18入口、来源hash及安装闭包 | 38文件368用例全部通过，exit0；最终serial完整运行 | unit-serial-final.log |
| UI、Playground、Prototype类型检查 | 3包全部通过，exit0 | *-typecheck.log |
| Playground与独立Prototype图库构建 | 两项通过，exit0；原大型bundle警告仍存在 | *-build-final.log |
| 测试项目类型检查 | exit1，4项未改动文件的既有错误，无P3文件诊断 | tests-typecheck.log |
| 新分类页面/动效浏览器 | normal/reduce 6/6通过，包括真正中间帧、同节点中断重排、堆叠无缝隙、缺口、原日期、键盘表格与390px横滚 | category-browser-final.log; browser/stack-motion-*.json |
| 原文档目录/17图/15蓝灰配方/隔离回归 | 6/6通过 | playground-browser-final.log |
| 时间交互代表：曲线、Brush鼠标/键盘/reset、拖选、Live暂停/后台/manual步进、水平/3D条、下载配置、funnel reduce | 7/7通过 | time-browser.log |
| 170官网变体当前源码独立消费 | 170份下载typecheck/build通过；当前UI与Foundations源码复制，已装缓存依赖，不是clean install或逐170浏览器验收 | consumption-final/official-variants/facts.json |
| 业务当前源码独立消费 | 7宿主状态+14迷你+13分类=34份下载typecheck/build/browser/update/390px通过，pageErrors=[] | consumption-final/facts.json |
| 公共样式生成核对 | 1388扫描候选通过，生成样式无手改 | generate-chart-styles --check |
| 新页必要文字抽样 | 标题9.15:1，轴/图例/说明6.56:1，reference5.57:1，表头5.29:1；正常白底样本 | browser/contrast-facts.json |
| 图形抽样 | 知识点柱3.58/6.59:1，浅色覆盖率线2.21:1；保留已确认蓝灰色阶，完整对比度Gate未关闭 | graph-contrast-facts.json |

初次宽并行单测出现Matrix/structure 5s资源超时，最终没有改测试超时或实现，完整单worker运行368/368通过。原目录初次第6例因5387服务未开启失败，启动本批自己的Prototype服务后通过，最终6/6完整回归；服务已停止，原5173服务保留。初次独立消费将Tooltip附属SVG计入主绘图区数量，真实浏览器读取确认无pageerror后收紧主SVG定位；最终34份通过。失败原始日志保留，没有写成初次即通过。

## 状态和未覆盖

用户视觉仍待审，正常白底文字抽样不替代完整对比度、dark/高对比主题、VoiceOver、真实Safari与实体触屏。浅色第三系列2.21:1已登记，没有改动已确认全局蓝灰色阶。原17入口+Matrix共18入口及170官网身份保留；分类业务页不是新的通用图型。

测试类型的4个既有错误：packages/ui/src/toast/toast.test.tsx 15/16的exact选项，以及tests/e2e/chart-feedback.config.ts和chart-feedback-legend-tooltip.config.ts的reducedMotion配置类型；本批未修改这些文件。

没有新依赖、全局Tokens、Git提交/推送、PR、发布、Figma写入或业务迁移。当前worktree既有修改未清理。P4是下一批技术工作，P3视觉意见单独保留。

## 历史证据说明

初次时间交互回归未设置该测试的证据环境变量，刷新了旧目录 evidence/runtime/chart-variants/interactions/ 中 line-brush-pointer-keyboard-reset.png 与 funnel-normal-replay-reduced-900.png 两张截图。本次像素另复制至P3/time-interactions/；旧像素未事先备份，不能声称已经恢复。未改动既有Human Gate。这是本次执行失误，后续运行的截图、trace与事实均写入P3独立目录。
