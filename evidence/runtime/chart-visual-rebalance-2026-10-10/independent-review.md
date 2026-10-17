# 图表视觉层级修订：独立复核

复核对象为本轮 `before/` 快照与最终运行时，包含主文档宿主、技术参考折叠、变体动作、Rain Button 样式隔离、Sunburst、配对迷你图库与指标卡。复核期间未修改运行时；补充了一项真实浏览器样式回归，并在实现者修正后重新核查最终文件与截图。

**结论：发现两项样式回归，均已修复并验证。最终复核未发现尚未处理的阻断性代码问题。用户视觉确认仍为待定。**

## 已修复的发现

### P2：排除 Rain Button 时提高了通用规则优先级，重新给原生图例加框

中间版本在 `chart-examples.css` 的通用按钮规则上增加 `:not([data-rain-id])`，使 specificity 从 `(0,1,1)` 增至 `(0,2,1)`，压过原有 `.rain-chart .rain-chart-legend-button`、`.rain-chart-variant-legend-item` 与 `.rain-chart-progress-legend-heading` 的 `(0,2,0)`。`chart-variants/trend.tsx:50` 的原生按钮没有 inline border/background/padding 能抵消该规则；保存的 Line 变体截图直接显示图例成为边框盒子。

独立浏览器回归使用实际 `line-trio-brush`，确认 `borderTopWidth` 为 `1px`、合同为 `0px`，以样式断言失败，见 `review-native-legend-red-confirmed/`。第一次测试误用不存在的 `line-default`，只产生定位超时，保存在 `review-native-legend-red/`；该次不计为有效 RED。

最终 `chart-examples.css:22-23` 使用 `:where(:not([data-rain-id]))`，排除 Rain 组件同时保持原规则优先级；后续图例规则仍可覆盖原生按钮。新增 native TrendLegend 回归验证无边框、透明背景及原有 Rain 6/8px 内边距；Rain text Button 回归同时通过。最终 `variants/line-1440-all-variants-reduce.png` 已恢复轻量图例，没有边框盒子。

### P2：标准文档宿主使部分业务普通读数继承 14/22

`component-doc.css:1` 的 `.component-doc.core-ui-shell` 以更高 specificity 提供 14px/22px，覆盖业务页原有 13px/20px 基础字体。未声明字号行高的五个排名 `.rain-business-reading` 因此偏离普通读数合同。实现者已在 `chart-business/chart-business.css:29` 对既有类明确 Rain 13px/20px，没有改动图形、颜色、数据或单位。

已独立检查修正源码与 `business-e2e/final/typography/typography.json`：普通读数全部为 13px/20px，三个指标卡主读数为 28px/36px；`business-e2e-typography-final.log` 的三项回归通过。

## 最终语义、键盘与导出复核

- `chart-page.tsx:30-73` 恢复标准宿主宽度和边距，图形在操作区之前；配方、数据状态、系列数、尺寸、更新和重播的名称、状态与处理函数保留。技术参考使用原生 `details/summary`，没有把接口内容放进不可访问的自定义隐藏层。Enter 开合、复制入口和操作区 Tab 顺序在 1440/390px 验证。
- `chart-variant-gallery.tsx:43-55` 只移动更新、重播及状态位置并降低按钮权重。稳定身份、卡片独立 revision/replay、设置、懒加载和激活逻辑、源码选择、下载及官网链接保留；340px 最小图区保留以避免懒加载占位收缩。
- Sunburst 仅减轻父层入口读数和提示文案。`chart-examples.tsx:222-267` 的多层导航、焦点恢复、受控 focus/hover、完整悬停路径、精确叶项数据、字号/尺寸/颜色映射与动效参数未改变。Enter/Space、回到父层、数据切换与外部焦点在新回归和既有 E03 正常/减少动效检查中通过。
- `mini-examples.tsx:137-170` 保留九种表达、每种两种型号，变为九个有名称的 section、十八个 figure；React `useId` 保持描述 ID 的多实例唯一性，figure 指向共同读数。图形与原始数据、量程、尺寸和动画定义保留。
- `embedding-examples.tsx:38-44` 继续使用既有 `getProgressReading`；目标卡把百分比作为主读数，并保留完成数量和目标。缺测、零分母及非法情况不制造有效百分比。新增 `showReading` 只是页面局部迷你示例的可选参数，默认 true；没有修改共享 charts 公共 API。
- `chart-example-source.tsx`、数据文件、目录与变体身份在本轮基线中未变化；下载采用运行文件的 raw import，包含更新后的 mini examples、embedding 与 CSS，没有缺少新增依赖。新回归实际触发并完成变体源码下载。基线登记的 216 个共享 UI/chart 文件未发生本轮差异。

## 已保存画面的独立检查

前后各十张图统一使用 `monochrome-blue / normal / revision 0 / reduce`，视口为 1440px 和 390px。三个主图精确表文本前后一致；修改前截图源哈希与本轮基线八项一致。最终截图的八个源哈希重新核对当前文件全部一致，`after-browser/facts.json` 没有 pageerror。

已查看实际保存的前后 Sunburst 窄屏、指标卡桌面/窄屏、图库桌面/窄屏，以及修正前后 Line 原生图例。最终 Sunburst 入口没有多排边框块，图库可就近比较两个型号，三个指标卡主读数有一致层级；所看截图中未见裁切或文字覆盖。此处记录可见情况，不代替用户对美感、阅读密度和现代图形质感的接受。

页面容器本身也发生了授权内的变化：桌面默认样本从 1440px 收至 1016px 内容区，390px 视口内容区从 390px 收至 358px。图库高度由桌面 1122px 降至 573px、窄屏 4032px 降至 1647px。应保持相同视口比较，不把不同裁剪宽度强行缩放为同宽来推导图形尺寸或字体改动。

## 验证与剩余范围

最终稳定代码：新七项回归加既有默认宿主十二项，**19/19 通过，56.1s，退出 0**；变体 T01/T03 与 Bar 21 卡、Line 18 卡、Sunburst 3 卡两宽度检查，**5/5 通过，43.5s，退出 0**。前后十图已重新刷新，结果和源 freshness 记录于 `regression-status.json`。

本复核没有重新进行全部 170 个变体、Safari、VoiceOver、真实触屏、完整对比度和 forced-colors 验收；这些不得由本次 Chromium 与源码检查推导为通过。更紧凑的图库、位于图下的操作区和新增标准页边距的阅读体验仍需用户确认；现有 long Sunburst 三层样本不属于本轮重建。

Playground 类型检查通过；测试项目仍保留原有四处类型诊断（两处 Toast `exact`、两处旧 Playwright config `reducedMotion`），见 `tests-typecheck-final.log`，不能表述为全仓类型检查通过。本轮没有发现共享数据合同或公开 API 的意外扩大；发布、Figma、业务迁移、Git 集成和视觉 Human Gate 均不由本复核关闭。
