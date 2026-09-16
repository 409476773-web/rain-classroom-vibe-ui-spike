# Card 视觉修订验证与交接

**后续默认样式已更新：**用户要求操作区保持整体同色，浅底仅作可选参考。最新 [同色操作区续验](footer-default-feedback/verification.md) 单独记录；下文截图、全量和独立审阅均为此前首轮修订的历史范围。

2026-09-13。用户授权“开始按计划实施”，在既有 `codex/card-v2` 工作区修订 Card 与四个示例。源码与独立审阅已完成，最终画面待用户集中视觉验收。此记录取代当前预览说明，不改写旧V2/VD-1/VD-2历史证据。

入口：[Card 文档预览](http://127.0.0.1:5298/#card) · [独立课程空间](http://127.0.0.1:5299/)。构建从 `.worktrees/card-v2` 启动；旧5198/5199入口可能仍显示旧构建。

## 实际实现

- 七个公共部件、原生语义/事件/ref、panel/raised、根Recipe归属与嵌套隔离保留。默认/sm留白16/12px；不改变内部控件Density。
- 标题16/24、描述14/22、公告日期13/22；指标22/28、%14/22，均为本轮候选。数值不超过24px；数值及%显式Data Bold，中文仍用UI字体。
- Header不再按360px无条件将单个Action换行。300/360/361/384卡宽下短标题、长中文和连续英文不与更多按钮重叠。宽操作通过明确局部Recipe另起一行。
- 课程默认上图下文，保留480px容器临界的左右排列；封面为诚实的缺省占位，未新增美术素材。课程标题不再重复放大，说明左、文字入口右。
- 更多菜单复用32/16 IconButton和已确认横向更多图标。保存复用32px主按钮，底部右对齐；Background/Neutral/2极浅底色、无顶部分割线、无新阴影。
- 提醒标题空白或对象未选时显示关联错误，不产生成功反馈；有效保存反映当前标题与对象。课程、提醒反馈分别留在对应卡片，演示动作说明真实。
- 推荐示例最大384px，左右媒体示例640px；原生details收纳更多预览条件和开发验证。说明改为“修改一张卡片，不影响其他卡片”，展开/折叠不卸载或丢失草稿。
- 未修改公共Button/Input/Select/Tag/IconButton、Foundations色值/字体/Focus、rainCn、Registry源清单或依赖。1874个受保护文件、78份旧Card证据均与实际起点哈希一致。底部圆角使用现有Radius/8逻辑方向CSS，避免扩大当前不支持的rounded-b工具类。

## 本轮检查

|检查|结果|证据|
|---|---|---|
|起点类型/定向单元|类型通过；11/11|baseline-types.log、baseline-unit-retry.log|
|起点浏览器|9/9，真实旧样式与截图留存|baseline-browser-retry.log、before/|
|修订类型|通过|types-complete.log|
|修订定向单元/授权负例|246/246|targeted-unit.log|
|全量单元|86文件、1273/1273；2 workers，未跳过用例|unit-limited-workers.log|
|治理与颜色消费者|通过；完成状态的最终复核见最终日志|governance-final.log|
|构建|两应用通过；保留既有大块输出提示|build-final.log|
|最终生产浏览器|Card5+Core UI4，共9/9|production-browser-final.log|
|独立源码与画面|passed；三项补充覆盖已闭合|independent-review.md|
|人工视觉|awaiting_human|results.json RC-31|
|对比度接受|not-granted，深色Focus未决|focus-summary.json|

生产浏览器：Chromium151、macOS、DPR1，常规视口1440×1200，窄视口360×900；Card本身另测300/360/361/384宽度。媒体临界按内容盒479/480/481px；长数值与宽操作使用测试中的明确DOM压力条件，未伪装为业务默认值。

验证包括无Header/Footer、隐藏提交Footer恢复底部padding、Default/Compact控件密度、内层Footer/Action/Recipe/变量隔离、反向主题、菜单Enter/Escape与焦点返回、选择器、空值/有效保存、状态互不覆盖、原Core UI消费者、独立Prototype不加载Playground私有CSS。完整逐项状态见 [32项台账](results.json)，RO/RP与后续批次未运行。

## 画面与实际测量

- [浅色](production/card-light.png) · [深色](production/card-dark.png) · [开发验证](production/card-developer-dark.png)
- [窄屏强制颜色模拟](production/card-narrow-forced-colors.png) · [独立原型深色](production/prototype-dark.png)
- [浅色样式与字体](production/card-light-appearance.json) · [深色样式与字体](production/card-dark-appearance.json)

每主题采集21个文字或容器继承文字配对，共42个；最小浅色5.125:1、深色4.540:1。这不是全部控件边界/图标/状态的完整对比度矩阵，也不把容器继承色等同其所有不同色后代。

CDP实际字形字体：公告中文PingFangSC-Semibold，指标83和%均为LINESeedJPApp_OTF-Bold；仅证明本机该字形命中，不承诺其他机器字体环境。

内置浏览器另实际执行有效保存，反馈在提醒卡内显示当前标题和对象。三个操作的真实Tab/Shift+Tab路径均出现focus-visible，根overflow保持visible。基础表面上的焦点线配对：深色保存2.739:1、查看课程2.573:1，均低于3:1；更多操作8.369:1。浅色分别3.643、3.835、6.565。原始测量保留halo和内侧offset样式；这些数值是基础表面配对，不能称为完整像素合成或全局Focus验收通过。

forced colors/reduced motion仅Chromium模拟。内置浏览器尝试原生放大快捷键后innerWidth758、DPR2和CSSzoom1均未改变，未将无效动作或CSSzoom冒充真实浏览器放大。真实缩放、辅助技术和物理触屏仍待人工检查。

## 失败与修正

1. 初次源码备份保留了.test.tsx扩展，被Vitest当作额外测试；改为全部.txt快照后起点11/11通过。失败日志保留，未改测试扫描器。
2. 本地浏览器首次启动受端口权限限制；使用已授权本地运行权限后起点9/9通过。
3. 候选rounded-b-rain-8不在受控工具类映射；改为局部Recipe CSS消费既有Radius/8，未放宽全局视觉权限。
4. 空status被display:none移出可访问树；改为既有sr-only，反馈显示时恢复正常排版。错误字段和就近live反馈复验通过。
5. 宽操作新增四个结构类被真实构建检查发现；仅本次精确授权下补充清单，未允许默认视觉类。
6. 实测%命中LINESeedRegular；本地单位改为Bold并重建，最终CDP确认修复。
7. 新测量助手严格类型检查发现数组索引可空；补充固定RGB索引的类型断言，运行算法未变，类型复验通过。
8. 全量单元与生产浏览器并行时，边界扫描撞上浏览器未归档的临时trace CSS/HTML；浏览器结束后独立重跑全量。未为临时产物增加源码允许项；失败日志保留。
9. 默认并发的再次全量运行中，既有FIFO拒绝测试的1秒子进程期限超时；本轮源变更不涉及该验证流程。降低至2个worker复验全量，不改断言、期限或验证器。

## 状态、续接与回滚

旧phase的cardV2完成记录保留；本修订在其visualRefinement内单独记录实现、自动检查、独立审阅、Human Gate和对比度。用户此前接受极浅操作区只是设计方向，不能替代当前画面验收。

实际起点为已有大量未提交修改的321e1a0工作区。before/source保留本轮修改文件的原文.txt，before/source-sha256.json记录完整起点摘要；before/git-diff.patch不单独承担未跟踪文件回滚。只能按本批逐文件/逐块恢复，禁止reset/clean或恢复HEAD覆盖原V2工作。

最终源码摘要、受保护文件和旧证据校验见preservation.json。未新建commit、合并、push/PR、发布、Figma写入或业务迁移。下一步集中评审四个Recipe；M0-C、深色Focus、真实设备和后续组件仍分别开放。
