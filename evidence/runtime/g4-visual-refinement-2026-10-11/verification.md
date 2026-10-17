# G4 展示页视觉反馈验证

本轮已完成用户授权的排版覆盖修复、Item「课程资料列表」精修，以及 Typography、Progress 的场景整理。后续反馈中的「阅读／下载同尺寸」也已落实：两条可用资料在桌面及 390px 下都实测为 **14px 字号、20px 行高、40×26px**。71 项相关单元检查、18 项浏览器检查、全工作区类型检查、Playground 构建及资产索引检查通过。

实施仍在既有 `card-v2` 工作树中。自动验证与独立审阅为 `passed-scoped`；用户视觉 Human Gate 为 `awaiting_human`，对比接受为 `not-granted`，候选继续未发布。本轮未进行 Git、Figma、发布或业务迁移。

## 实际变化

### 排版与 Typography

共享文档 CSS 保留段落零外边距，把 24px 默认行高放到预览容器；header 说明保留自己的 24px。带排版预设的真实段落不再被后代 P 规则覆盖。浏览器直接测量 UI default 为 14/22、supporting 为 13/20、caption 为 12/20、Reading 内部段落为 15/26，同时检查了直接展示的 9 个字阶。

Typography 以一份连续课程导读呈现标题、引言、元信息、正文与阅读提示；已有字阶可直接比较。关键数字的数值与中文单位继续分开使用 Data 与 UI 字体。阅读容器、字阶容器与数字摘要各自有明确用途，沿用现有字体与 Token。

### Item 课程资料列表

同一课程承载面内组织三份资料，名称、类别、阅读时间／来源、开放及已读状态连续对齐。默认最大宽度 720px 属于本页布局；390px 下动作自然移到文字下方，完整标题没有截断或横向溢出。

阅读复用现有 Dialog，标记已读不会重复计数。返回、Escape 关闭和标记已读后的焦点回到原阅读触发器。下载保留原生 Link 与 download，生成对应的 Markdown；浏览器取得的课程导读文件与弹窗标题及三段正文逐字一致。第三份资料显示开放时间并禁用操作。阅读按钮采用既有 text/regular 尺寸，与 standalone Link 的 14/20、26px 高度一致，复制片段同步更新。

![Item 桌面课程资料场景](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/g4-visual-refinement-2026-10-11/browser/item-desktop-scene.png)

![Item 390px 课程资料场景](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/g4-visual-refinement-2026-10-11/browser/item-narrow-scene.png)

### Progress 任务场景

任务名称、实际数量、比例、状态与恢复动作放在同一最大 560px 的任务容器中；推进、模拟失败和重置明确标为外部演示控制。暂停与失败保持已完成量，失败时重试为任务内主要动作；完成后提供课程资料入口。

未知耗时使用已有 Spinner 和处理说明，本页局部隐藏比例轨道，保留 value=null 的无数值语义。按答卷份数计量的例子仍显示实际 6/24 与 25%。没有计时器或虚构百分比。

示例代码就近放入原生 details；unknown 的 TSX 与 CSS 分别标明文件名。7 个页面复制片段和 3 个指南片段都对真实 UI 类型编译通过。查看代码入口保留原生 summary 焦点，Tab、Enter 展开和 Space 收起均实际通过。

## 范围与前身

- `baseline.json` 保存实际采集的 58 个原件 SHA 和原始文件，后续不重新采集或改写。
- 两个 E2E 原件在采集时已包含本轮初始 Typography RED／输出目录修改。`baseline-addendum.json` 明确区分实际原件和 `predecessor/` 中的精确逆向重建；重建前身与原 G4 不可变 source-bindings SHA 一致，不能被描述为更早的现场快照。
- 本轮 [source-bindings.json](source-bindings.json) 只登记 18 个有限源文件和 7 个原 G4 证据的保留 SHA；通过后继组合读取既有记录，不重写原 G4 source-bindings。原 G4 38 个来源及 10 个公共源／记录一起验证，见[完整性](source-integrity.json)。
- `component-doc.css` 只进行两项精确变更：保留后代段落的零外边距，分离 header 行高，并把 24px 默认行高交由预览容器继承。带 UI／Reading 预设的实际文字节点保留自己的行高。
- 三个 Manifest 只追加 `verification.visualRefinement`，原能力、来源、Gate 和 Registry 不变。
- 原 G4 来源锁、公共 Item／Progress、Foundation Token 和其他阶段的 Gate 不变。最终冻结见[元数据记录](final-metadata-freeze.json)，本轮不自动晋升为全库视觉默认。

## 最终验证

| 检查 | 结果与证据 |
| --- | --- |
| 相关单元检查 | 7 文件、71/71：[最终日志](scoped-unit-final.log)。页面 11、Item 6、Progress 17、Typography 合同 12、路由 3、原 G4 治理 13、新增量治理 9。 |
| 工作区类型检查 | 5 个工作区包及测试配置通过：[日志](typecheck-final.log)。 |
| Playground 构建 | 通过：[日志](playground-build-final.log)。现有图表等大包告警保留。 |
| 浏览器 | 18/18、0 skipped、0 flaky；1440×1000 与 390×844：[日志](browser/browser-final.log)、[报告](browser/report.json)。所有检查的 console/pageerror 记录为空，未过滤错误。 |
| 场景与可访问行为 | 浅／深、Default／Compact；阅读、下载、关闭焦点、完整长标题、进度推进／暂停／重试／完成、未知语义、reduced-motion、forced-colors、summary 键盘操作。 |
| 相邻旧页面 | Button Group、Spinner 与 Chart 的实际反馈和说明段落抽查通过；不代表全库回归。 |
| 复制代码 | [7 个页面片段](copied-examples-typecheck.log)、[3 个指南片段](copied-guides-typecheck.log) 类型编译通过；提取原文保存在对应目录。页面单元检查还验证 TSX 语法及独立 CSS。 |
| 资产索引 | 引用、公共导出与生成内容一致：[日志](asset-index-check.log)。 |
| 有限颜色检查 | 348 次测量，174 次有必要对比阈值，0 失败及 0 源 paint 失败：[记录](color-verification.json)。不代表人工或全库对比验收。 |
| 独立审阅 | 源稿及四张最终截图无阻塞问题；基线守卫单独只读复核见[记录](baseline-guard-review.md)。静态图不替代键盘检查或用户视觉判断。 |

## 保留的失败与限制

- 初始实际段落行高 RED 和场景检查过程保留在 `browser/red/`、`browser/first-scenarios/`。
- 用户指出的动作尺寸差异通过新断言复现：原阅读 12/14、36×20，下载 14/20、40×26。RED 保存于 [action-red](browser/action-red/item-desktop-action-sizes.json)，最终测量见[桌面](browser/item-desktop-action-sizes.json)与[390px](browser/item-narrow-action-sizes.json)。
- 新“查看代码”入口曾声明 Category Brand 边界。Dark 下该边界对当前面板为 2.573:1，低于必要边界的 3:1。`governance-focus-category-red.log` 保留失败；最终移除本轮自定义边界，保留原生 summary 焦点反馈，没有降低阈值或接受例外。
- 五项全局验证的 before view 已通过 58 原件 SHA 自检；每次运行单独验证两份 E2E 前身重建。它是本轮按文件构造的只读前身视图，未修改文件仍读取当前工作区，并非完整历史工作区快照。
- 新增旧证据防改写反向测试，拒绝同时修改原件、before 副本与绑定，以及重新采集基线。原始 RED 与最终 GREEN 保留，真实 58 份原件没有改写。
- Source 仍在编辑时一次合并检查因 E2E 新断言使阶段绑定 SHA 过期而失败：[日志](scoped-unit-before-freeze.log)。这是本轮未冻结状态产生的失败；最终冻结后 71/71 通过，没有归类为旧失败或放松守卫。
- 原有 Token、Tailwind、Workspace、Boundary、Evidence 全局验证仍各自 exit 1。最终 completed 状态的原始诊断与本轮只读前身视图逐行完全相同，分别为 229／1685／7／46／2 行；没有新增诊断、诊断过滤或阈值放宽。[完整比较](global-before-current-comparison.json) 同时写明前身视图局限，不能把专项通过称为全局通过。
- 浏览器事实和颜色数值不等同于人工视觉、字体可读性、跨浏览器或完整无障碍验收。

## 未验证与状态

未运行全库浏览器／单元回归，未实测 Safari、移动设备、VoiceOver 或完整无障碍流程。浏览器 computed font-family 和本机截图不能保证其他环境拥有相同字体；没有分发字体或修改回退方案。

自动检查和独立审阅已经完成；最终视觉、阅读感受与真实业务内容适用性仍待用户检阅。Human Gate、对比接受、发布和生产采用各自保持原范围。

入口：[Item](http://127.0.0.1:5391/#item)、[Typography](http://127.0.0.1:5391/#typography)、[Progress](http://127.0.0.1:5391/#progress)。使用指南：[G4 组合说明](../../../docs/ai/g4-components.md)；[实施计划](../../../docs/plans/2026-10-11-g4-visual-refinement.md)。
