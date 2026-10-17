# 蓝灰单色配方接入验证

2026-10-08。用户确认五档色阶后明确“确定。开始修改”。工作区为 `.worktrees/card-v2`，分支 `codex/card-v2`，HEAD `321e1a0`。本轮为共享未发布候选中的配方增量。

## 已实现

新增 `monochrome-blue / 蓝灰单色`；原型图库和组件文档均可选择。15个适用图型接入：面积、折线、柱、组合、饼／环饼、进度环、雷达、时间散点、漏斗、仪表、桑基、旭日、日历热图、地图、实时线。K线和盈亏线沿用方向语义配方。

`--chart-1…5` 为 `#6288C7 / #3F5D91 / #91B0E1 / #BFD3F2 / #E5EEFC`。类别身份在图形、图例与提示之间共用变量；强度色按雾蓝到深蓝映射。漏斗当前四阶段逐段过渡；旭日当前三类区块取中浅色，文字使用 `Text/Neutral/1`。示例默认配方、品牌蓝、原生源码和动效不变。同步15份Manifest、README、AI指南与局部颜色消费登记，没有新增依赖或全局Token。

## 本轮检查

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| 图表合同、源码锁、作用域与颜色登记 | 8项通过，退出码0 | [unit.log](unit.log) |
| Chromium组件文档回归与蓝灰配方 | 6项通过，退出码0 | [playwright.log](playwright.log) |
| Playground类型检查 | 通过，退出码0 | [typecheck-playground.log](typecheck-playground.log) |
| Prototype类型检查 | 通过，退出码0 | [typecheck-prototype.log](typecheck-prototype.log) |
| 测试源码类型检查 | 通过，退出码0 | [typecheck-tests.log](typecheck-tests.log) |
| 独立图库构建 | 通过，退出码0；保留大于500kB的构建体积提示 | [build.log](build.log) |

浏览器检查覆盖17个既有文档入口、下载源码、样式隔离，以及蓝灰实际柱体／面积描边／渐变停靠点、切换与恢复、更新、图例焦点、15图可选入口、强度顺序、旭日深色文字、两实例渐变ID与390px稳定布局。[颜色／更新事实](playground/monochrome/facts.json)、[15图与响应尺寸事实](playground/monochrome/catalog-facts.json)。尺寸由1440px改为390px时，SVG测量更新前可短暂保留旧宽度，稳定后页面宽度为390px；检查等待真实布局条件，无布局代码补丁。

测试先在缺少配方选项时失败；旭日标签最初用 `Text/Neutral/2`，在中蓝底色上的对比度为4.14:1，收紧实际文字色检查后再次失败。修正为 `Text/Neutral/1` 后全部通过。

## 实际截图与可复现入口

- [图库](http://127.0.0.1:5387/bklit-catalog.html#chart-bar)、[组件文档](http://127.0.0.1:5173/#chart-bar)：选择“蓝灰单色”。预览进程已核对来自本worktree对应应用。
- [柱图1440px](playground/monochrome/bar-1440.png)、[面积1440px](playground/monochrome/area-1440.png)、[漏斗1440px](playground/monochrome/funnel-1440.png)。
- [柱图390px](playground/monochrome/bar-390.png)、[面积390px](playground/monochrome/area-390.png)、[漏斗390px](playground/monochrome/funnel-390.png)。

## 保留的验证边界

[不透明色测量](contrast.json)记录五档在白底上的对比度约6.59、3.58、2.21、1.52、1.17；浅色档不据此获得必要细线或小点的对比度通过。旭日深色文字在三档中浅底色上的对比度约6.99、10.17、13.23，渐隐与交互叠加状态另按实际检查。颜色资源为五档，不承诺任意五系列均可辨。

独立审阅确认目录／Manifest配方集合一致、默认值保留、颜色级联与强度顺序正确；其发现的旭日文字问题已修正。完整对比度与辅助技术验收仍独立开放。本配方 `visualHumanGate: passed`，依据下节的用户明确确认；本轮未发布、未写回Figma、未迁移业务、未commit／push／PR。

## 用户视觉审核

2026-10-08，用户明确“确定。蓝灰单色完成视觉审核”。本配方的 `visualHumanGate` 据此更新为 `passed`，审核范围为当前 `monochrome-blue / 蓝灰单色` 五档配色及其在15个适用图型中的配方应用。实施交付时的待视觉审阅状态由本次用户确认关闭。

完整对比度、辅助技术、其他配方与图表的验收继续按各自范围记录；本次仅登记用户视觉确认，没有变更代码、技术检查结果、资产成熟度、发布、Figma、业务迁移或Git状态。
