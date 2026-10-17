# ADR 0002：Tailwind B2 组合与局部隔离

日期：2026-09-03。决策状态：用户已确认方向并明确授权 B2 试点。实施、自动验证和 Human Gate 分别见 [阶段状态](../../status/current-phase.yaml)；本文不代表试点通过。

## 问题

AI 需要便于理解和改造的组件源码，但单一页面的探索不应改变所有消费者。Tailwind 提供静态、可组合的样式语言，本身并不提供隔离、设计约束或全局晋升权限。

## 决策

采用 Tailwind-first、非 Tailwind-only 的 B2：Global Master 为 managed；页面任务只读共享源码，默认作用域为当前页面或功能。AI 静默选择 Existing Variant → Local Recipe → Local Fork，只有意图不明、越过规范或影响关键行为时才询问。

- Rain 私有参考值 → 公共语义 / 组件 / 组合 Token → Tailwind v4 inline 映射。映射不复制数值，不开放 Tailwind 默认视觉体系。
- 结构布局类可使用；视觉类只能来自 Rain 或已登记局部候选。禁止正式 Master / Fork 消费默认色板、未登记任意值、私有参考 Token、important 或动态拼接类名。
- Local Recipe 为具名、可追踪的 Parts 样式搭配；需要改变 anatomy、DOM 或行为时使用 Local Fork。两者均为 local-experiment，不自动进入公共检索。
- Fork 保存来源组件、来源文件与 checksum、创建版本、scope、modifiedParts、candidateTokens、syncStatus、promotionStatus。更新检查只展示差异；普通变更人工合并，明确登记的严重缺陷或无障碍修复为 required-review，不自动覆盖。
- 局部候选 Token 使用 `--rain-local-<feature>-<role>`，登记值、原因、消费者、创建时间，只在该功能根节点生效；不写全局 `:root`，删除局部资产时一起清理。
- CSS 例外按必要性判断，不按比例判断。复杂 Parts 联动、浏览器特殊状态和关键帧可保留；每项需登记理由、选择器、Token、scope 与测试，不能用例外恢复无约束 CSS。
- CVA 0.7.1 组织静态 Variant，tailwind-merge 3.6.0 处理类冲突。只允许这两项直接依赖；安装前审计版本、license、scripts、integrity 和传递依赖，不额外直接使用 clsx。

## 图标与已完成工作

保留 [ADR 0001](0001-icon-assets-and-semantic-consumption.md) 及完整图标库。普通图标由宿主 currentColor 供色，固有配色保留原图，使用单图标静态入口。B2 的 Token 检查不能改写 source-locked SVG 或将图标原始色值误判成页面裸色。

迁移保留当前 Button 的 tertiary / text、五档尺寸及 text 专属轴、Link 消费方式、正式 PNG Loading mask；Input 的清空呈现不因新增图标规则自动改变。图标大小由宿主 Part 的 Rain 组件 Token 控制，不通过 important 覆盖 renderer。浏览器验证须覆盖未分层图标 CSS 与 Tailwind layers 的优先级。

Day 3 结果保存为历史，Button、图标库、源修复的已接受 Gate 与文字按钮待确认 Gate 原位保留。已有 `manifests/icons.json` 和 `registry/icons.json` 保留，Registry 不是空目录，也未因登记而发布。B2 不新增可分发 Registry 项。

## 不采用的方案

- 仅外围组合、所有 Master 继续原生 CSS：改动较小，但不能验证 AI 直接读写 Tailwind Parts 的价值，故不作为此次实验目标。
- 纯 B、默认直接修改共享源码：局部意图可能影响所有消费者，不符合默认隔离需求。
- Tailwind-only：特殊浏览器行为和图标来源容易被迫重写；代码比例不能证明质量。
- 默认复制全组件 / 全图标库：提高维护和同步成本，故先 Variant，再 Recipe，确有结构需要才 Fork。

## 代价与剩余风险

需要维护少量来源元数据、精确边界和类名合同；Fork 不会自动获得共享修复。层叠顺序、动态密度变量和 namespace 冲突均需实测。采用 Tailwind 不保证 AI 更快，也不保证修改正确，必须保留失败或未测结论。

晋升由人工决定。日常只静默记录候选；至少三个独立场景后，仅在阶段收尾、发布前或用户主动询问时集中提示一次。暂缓后无新证据不重提，严重缺陷与无障碍问题除外。

## 试点与验收

仅 Button、Input、一个搜索操作区。原生 CSS 基线和 B2 执行 [设计文档](../plans/2026-09-03-tailwind-b2-local-fork-design.md) 的同三项请求。先冻结相同夹具、前置状态与验收条件，再记录真实 diff、测试和截图；未观察到的用户纠正或编辑体验写 not-measured，快照不等于实测。

安全项必须全部通过：局部任务不改 Master、不影响非目标页面；无 Token 越界；Focus / Error / Disabled / Loading / IME / 键盘不退化；Fork 来源与更新可追踪；原有检查和图标组合回归通过。

价值项至少三项优于基线：首次成功、用户纠正次数、修改范围正确性、继续编辑的易理解与易操作程度。耗时仅作辅助。达标后仍需独立 Human Gate；不达标或未测不足以证明更优时不扩大。Gate 通过也不自动授权下一批组件。

## 范围外

Select / Dialog / Headless / Table / Statistic / Layout、Tag / Badge / Surface / Card 迁移、图标重绘或重新导出、全局自动晋升、Figma 写入与发布、包或 Registry 发布、业务迁移、分支 / worktree / commit / 远端 Git 均不在本次实施范围。

## 执行

[实施计划](../plans/2026-09-03-tailwind-b2-local-fork-implementation.md) 按批次执行，小检查即时、完整检查集中。先建立 fail-closed 阶段与历史状态保护，再完成基线实测、两项依赖审计安装、Token 映射、组件迁移和局部对照；任何一步不得凭后续计划标记为完成。
