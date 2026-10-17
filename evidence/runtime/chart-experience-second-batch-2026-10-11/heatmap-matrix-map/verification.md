# 第二批 Heatmap / Matrix / 地图 / 结构流量验证

当前结果：冻结后的 **63 项目标单测、15 项实际 Chromium 场景通过**；Matrix / China 专项另 **4 项通过**。UI 和测试类型检查通过，China 专项的 Playground 类型检查通过。所有结果是当前本机、同一 `card-v2` 工作区的局部证据；不表示 Human Gate、实机 Safari / VoiceOver、物理触屏、200% 浏览器缩放、完整对比度、生产性能、发布或业务迁移完成。

最终运行是 `heatmap-browser/after-06-final/`，日志 `browser-after-06-final.log` 为 15 passed / 0 failed / 0 skipped，约 3.3 分钟。最终 15 份实际读数 / 几何 / 交互 JSON 无 pageerror；默认、11 变体和5流量变体的运行前后原生源码及当前样式哈希一致。`runtime-frozen-sha256.json` 的12个运行时 / 样式文件也在运行结束后重验一致，汇总见 `final-verification-facts.json`。两份浏览器配置仅连接同工作区的5173，不启动或替换其他服务，未运行会覆盖历史截图的旧测试。

## 已实现的局部行为

- Heatmap 在隐藏于读屏的原生 SVG 外，仅增加一个 HTML 键盘入口。方向键按已经绘制的周 / 行移动；Home / End、Ctrl + Home / End读取真实首尾日期。当前格使用既有 Focus Token 的2px蓝色描边；提示与读屏文字按日期重新查找当前值和坐标，数据更新保留仍存在的日期，消失则清除。
- 指针临时查看其他格 / 色阶后，离开恢复仍聚焦的目标。色阶 Focus、Click、Enter、Space都读取当前等级，**不作为开关，不使用 aria-pressed**；Escape、blur、外部 pointer清除。离散与连续色阶沿用原来的尺寸、间距、颜色和范围；离散按钮仍11×11，连续67px / 5段由浏览器量化至约13.390625px。
- 使用既有 xDomain传递结构示例已声明的过去日期窗口。窗外日历补位被隐藏 / 跳过；窗内负哨兵仍可读取为缺测，0仍为有效读数。默认示例的缺测读数不再成为负学习次数；共享默认 formatter将负数 / 非有限数显示为 No data，正常0 / 1文案不变。
- 5个结构 Sankey入口使用现有私有 Settings和与默认 Flow一致的边界选择器：正常、1人次细流向、一条流向为0。保留源流量与中间节点守恒；精确表保留0边，绘图只用正值边，Tooltip从实际绘制链接读取来源 / 去向 / 人次；恢复正常数据不改变原值。
- 未启用缩放的共享世界地图恢复原生触摸页面滚动；启用缩放的原生地图继续控制触摸。

原生修改仅在6个既有 Heatmap文件和 Choropleth的 touchAction分支；结构修改仅在私有 `structure.tsx`。没有新原生文件、依赖、公共组件 Prop或数据模型。生成样式由root按既有生成器更新，当前 hash记录包含 `styles.css` 与 `utilities.generated.css`；私有颜色、默认格尺寸、原生图形未换成其他库。

## 实际浏览器范围

| 范围 | 当前实际证据 |
| --- | --- |
| 默认 Heatmap，1440 / 390 × normal / reduce | 126格；缺测与0分开；真实指针下的数据更新当前值；实际键盘首日 / 缺测日；可见焦点描边；Escape→Click及Enter / Space / Click读取同等级2；外部清除；11px透明色阶；更新保持格位置 / 尺寸 / 圆角；原生格仍是实际命中目标。 |
| 全11 Heatmap变体，同四个组合 | 半年179格、周一180格、全年361格；当前窗口首尾日期与实际 Tooltip一致；SVG无每格Tab入口；Loading无键盘入口，显示数据后启用；无页面横向溢出。 |
| 390全年键盘末格，normal / reduce | 内层 scrollLeft=445，content780 / client324；页面Y保持，末格x342—353位于wrapper33—357内；Tooltip位于视口内，页面宽390。 |
| 世界地图，390 CDP触摸 | 默认 touch-action:auto，真实8段触摸手势使页面0→97px；无残留Tooltip。缩放变体仍none，并由实际放大按钮变为1.2倍matrix。 |
| 全5 Sankey变体，同四个组合 | 每个正常 / 1 / 0场景共60份实际表 / 原生链接 / Tooltip事实；源与中间节点守恒；0保留在表；正常值恢复；原生路径无NaN / Infinity，窄屏页面无横溢出。 |

Focus截图已实际检查：`heatmap-browser/after-06-final/default-390-no-preference-missing-focus.png` 与 `default-1440-no-preference-missing-focus.png`。当前格为6月10日缺测，蓝色描边清楚；原来的小色阶完整保留。其他普通 / reduce、末格滚动截图同目录。

Matrix / China的完整独立记录位于 `matrix-china/verification.md`：4 / 4，34.332秒。Matrix的12×12、7×24保留单一键盘入口、精确末格、内层滚动 / sticky标题、当前值更新、0 / 缺测和长标签。实际 China边界继续使用34全国地区、广东21地区和深圳440300；normal / reduce的选择 / 158→162更新 / 返回 / 单触点页面滚动 / 放大拖移 / pinch / 旧视图恢复 / 失败重试通过。600px精确表在390px区域内键盘横滚至210，最右值列可读、页面保持390。

China额外两处真实缺陷由root明确扩展当前必要边界授权，仅修私有 `china-region-map.tsx` 的既有 MapBindings及 `china-region-page.css` 的 `.rain-china-data min-width:0`；未推广控制器、修改共享 Table或隐藏数据列。子任务25文件最终前后同hash，RED→最终只有这两个私有运行时文件改变，其余23不变。

## 保留的失败与当前替代关系

- `tdd-red.log`：键盘 / 稳定读数 / 地图触摸 / 流量单位新断言10失败42通过；`tdd-extra-red.log`保存原默认formatter的 `-1 contributions`，1失败17通过。
- `sankey-control-red.log`：原生候选没有可操作的私有边界选择入口，1失败16通过；现已接线。
- `legend-style-red.log`及对应实际JSON：新原生 button继承示例页通用按钮回退，原11px被撑成29px、8px padding / 1px border / 白底。仅在原生色阶已有style中清除背景、边框、内边距，最终尺寸恢复。
- `legend-read-rule-red.log`：4失败12通过；`legend-read-rule-browser-red.log`：真实 Escape→Click之后预览被错误清除，1失败。root重新明确L01后，两份原生色阶的 onClick直接复用当前focus(level)路径。此前Click清除的GREEN**被此最终规则替代，不能作为当前成功证据**。
- 初次浏览器 `after-01`是沙盒未能启动浏览器；后续允许实际启动，没有自动审批拒绝。`after-02`默认用例把正常数据不存在的缺测 findIndex=-1误当末格，另有JSDoc变更使源哈希变化；仅修测试状态选择并保持源静止。`after-05`的4失败仅因原13.4px连续段被Chromium量化至13.390625px、测试精度过严；测试明确容许1/64px布局量化。
- China真实 pointercancel零坐标 / 页面拖动地图、精确表600px撑宽的RED、时间线、computedStyle、修前文件与差异均在子目录保留。

最后一次目标单测 `target-tests-legend-read-final.log` 为4文件63 / 63。最后 UI与测试类型检查是 `typecheck-ui-final.log`、`typecheck-tests-legend-read-final.log`，均exit0。全170独立消费、最终源锁、两个构建与合并工程 / 文档审阅由root统一执行，本子任务未重复消费或修改对应发布 / 治理状态。
