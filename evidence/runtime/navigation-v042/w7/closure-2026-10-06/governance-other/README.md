# W7 非导航颜色诊断独立只读归因

2026-10-06，范围为上一轮 `governance-final.log` 的非导航 **192 条退出诊断**。它们不是 192 个独立 UI 缺陷。本轮只新增此目录证据，不修改产品、Token、检查器、历史账本或阶段记录。

`node evidence/runtime/navigation-v042/w7/closure-2026-10-06/governance-other/probe.mjs` 本次退出 **0**。[结果](./probe-result.json)实跑 Report-A 119、G1 36、Tree 16，共 171 条，逐条与原日志相等；其他 21 个来源确认仍消费 Category，但无消费者表。三个在内存中追加的新 Category paint 均被现有检查器拒绝。追踪源码、检查器、phase 及旧账本散列运行前后相同。这个退出码只表示归因和反例检查成立，颜色合规仍未证明。

| 所有者 | 行数 | 当前含义及缺口 |
| --- | ---: | --- |
| Report-A V2 | 119 | 原消费者表只有 13 行，12 行在 V2 精确源码中缺失；当前 62 个 Category paint 未登记，36 个声明、3 个边框、raw 总括和 metadata 总括重复报告了未覆盖源码。这 115 条是版本登记落后及来源证明缺口，不是调色授权。另 4 条对比度沿用首版父背景，不代表当前 V2 渲染值。 |
| G1 | 36 | 当前 68 行有限账本完整，28 条对比度和 8 条资格仍保留。至少 5 条是静态不可达主题组合：dark root 后续更高优先级覆盖下，原 Text/Second/4 不生效（3 条）；dark-only selector 被计算到 light（2 条）。其余父背景和状态也需按真实组合证明，不能将整组称为 36 个实际界面错误。 |
| Tree | 16 | 10 条对比度、6 条资格。已有 20 行登记，不是缺表。当前可展开/拖动图标仍是 interactive、critical、meaningful-icon，原 3:1 和 weak Neutral 资格必须保留；辅助文字仍按 4.5:1 检查。 |
| Breadcrumb | 3 | 三个源码没有消费者表。已有视觉验收明确 `contrastAcceptance:not-granted`。需建立 TSX 静态 class、CSS state、伪元素及 demo 父背景的精确表，不能继承导航人工对比度验收。 |
| G3 页面/重建 | 6 | 阶段明确登记留待独立 Foundation Gate，源码存在 Category 消费。此为主动延期的缺表，不是已登记后检查器漏识。 |
| G3 共享组件 | 8 | Command、HoverCard、Kbd、Menubar、NavigationMenu、ScrollArea、Sheet、Sidebar。均无消费者表；需要普通、hover、active/open、disabled、overlay 和宿主背景的实际角色。G3 自身仍 pending 视觉与独立颜色 Gate。 |
| 其他原型 | 4 | ExamEditor 两文件、ListComposition、TeacherGrading 均无表。原型授权或局部视觉确认不能代替颜色源登记。 |

## 人工验收的真实边界

- 导航 2026-10-05 人工检验只覆盖其候选导航运行范围，不能消除这 192 条。
- G1 有自己的 2026-09-21 人工对比度接受（见 `status/current-phase.yaml` 的 `componentRefinements.tokenFirstV12.contrastAcceptance` 和 [G1 验证](../../../../token-first-v12-g1/verification.md)）。它允许报告“人工接受且原阈值发现保留”，不表示自动数值全部达标。历史 28 条发现、当前 36 条静态组合和当前源码没有相同的已接受 fingerprint，不能复制导航 accepted status 或直接将全部当前组合改成 accepted exceptions。
- Report-A 用户明确允许本页浅辅助文本，但 `contrastAcceptance:not-granted` 仍保留。最新 [V2 反馈](../../../../learning-report-a/v2-feedback/verification.md)记录范围说明实际 **1.925:1**、白底备注/分母 **2.282:1**，低于普通文字 4.5:1；原静态范围说明 2.28/2.08/3.61/4.11 使用的白/Neutral3 父背景与已接受 V2 4% colour-mix 不同。首版登记缺失不能掩盖这些当前值。
- Tree 与 Breadcrumb 只有自己的视觉验收，颜色及真实辅助技术尚未关闭；没有独立颜色豁免。

## 最小修复顺序和停止边界

1. **优先在当前导航 W7 闭合准确来源与状态表达。** 保留旧账本及固定阈值，把已登记但尚无真实父背景的项目如实标 pending，避免另开全局 CSS 引擎或为绿灯改 UI。
2. **Report-A 的单一共因是首版表未跟随已授权 V2。** 最小后续是新增当前 V2 有限表，绑定当前源码 SHA、已授权 V2 plan、具体 selector/property/value/alias/state/parent/role；旧 13 行表与 SHA 留作首版来源。首版允许 V2 实现，不自动提供其渐变、alpha、currentColor、图表语义证明。可先登记并保留 unresolved/under-threshold 状态，不能把 119 行消掉后宣称全仓通过。
3. **G1 的共因是静态状态与 cascade 组合未约束。** 最小后续是限定当前源中两条 `.g1-support` 的具体主题和真实 5% surface，再核对该运行范围自身的人工接受。不得删除全部 dark 发现或更改 critical、interactive、文字 4.5:1 / 图标 3:1 来获得零失败。
4. **其余 21 个登记文件是各自组件合同工作。** 可做精确登记、不改 UI，但 8 个共享组件存在任意 caller、overlay、状态色关系，登记本身不等于当前导航 W7 自动颜色通过；原 G3 Gate 等延期事实须保留。
5. **Tree 16 条没有本轮可无损消除的共因。** 所需证据是其自身状态/背景、真实意义及交互角色和明确颜色决定。W7 可以准确归因，不能盲改 Tree 默认色或借已有导航人审关闭 Tree Gate。

因此本批可无损完成归因和精确登记/状态表达；全仓绿色仍需要具体来源、背景和角色证据。以上结论不增加发布、迁移、Figma 或 Git 授权。

## 本轮 R2 最小修复独立审查

`node evidence/runtime/navigation-v042/w7/closure-2026-10-06/governance-other/successor-review.mjs` 本次退出 **0**，详见 [独立结果](./successor-review-result.json)。没有修改被审源码，也未再运行全仓套件。

- **源码范围准确。** 97 项 current-source SHA 全部重新核验，与冻结 review02 的差额恰为登记的五项：两个先前指南更新、R2 CSS 一行账户 hover、Manifest 和 Registry 当前来源登记。投影删除该唯一新 selector 后精确回到 `c81cbfe6…` 基线，现行 `6c3145aa…` 散列正确；没有几何、断点或 Token 值改动。
- **投影不能吞掉额外源码。** 七个独立内存反例均被拒绝：追加 raw paint、追加 Category paint、改为 context region、取消 enabled/aria-disabled 条件、重复 selector、更换 Alpha Token、追加宽度。其他路径不投影，随后仍受各自来源散列校验。原 helpers 的两个定向检查结果为 2 项通过，新增投影测试还检查重复、区域、Token 和额外 raw paint；本独立 probe 额外核对 Category 与 disabled/geometry 分支。
- **当前与基线没有混淆。** live `sourceFreezeBinding` 为基线 17 项匹配、当前原样 16 项；早期 `samples.css` 单列在未属于 review02 的范围。810 个基线未证明 paint 保留，新的账户 hover 是第 811 个 pending paint use，明确 `humanReview:not-inherited-from-baseline`，自动合规仍 `unproved`。
- **退出门槛未降低。** 原 18 条缺表提示改为“已登记，仍需 parent/role/state conformance”，依然调用现有 `failures.push`，CLI 对非空失败仍设置退出码 1；不是 warning 或豁免。此次 probe 按源码路径验证这条分支，没有把它冒称又一次全仓 Token 运行。
- **现行来源与历史链保留。** Manifest 和 Registry 当前来源 hash 匹配修复后 CSS，新增修复记录明确不继承旧人审且未发布；Registry 冻结包中全部既存字段（除了明确更新的 currentSourceSnapshot）逐项深度比较相等，旧视觉 acceptance 和原 source lineage 均保留。

未发现此最小修改放过额外 paint、改低原阈值、扩张人工验收或改写冻结交付包。上方非导航 192 条归因和下阈值事实保持原记录；source audit 的分类冲突、真实父背景、状态与辅助技术仍需各自证据。

## 后续：现行元数据的既有治理入口修复

根代理随后授权修复全量单元测试暴露的共因：`collectRecordedPostB2Documents` 仍只接受旧 Registry 字节，R2 合法现行来源登记使它丢弃整个导航有限 inventory，进一步导致 Boundary 和 B2 的 Manifest/源码清单连锁失败。本小批实际修改仅 `scripts/verification-helpers.mjs` 与 `scripts/verify-tailwind-b2.test.ts`，未修改 phase、Registry、Manifest、UI、Token 或冻结包。

既有入口增加单一有限投影：当前 Registry、R2 Manifest、R2 CSS 三份完整 SHA 必须精确匹配，完整 phase 仍须验证；随后仅将保存的旧 currentSourceSnapshot 还原、移除两个 successor lineage 字段，投影结果仍须匹配原 `6c259632…` accepted Registry SHA。旧 inventory 和所有来源/依赖/未发布边界保持。Boundary 的 `recordedRegistries` 共用此入口，未另加白名单。

原合并检查先红（1 项失败、退出 1），修复后新检查、原 W7 finite-inventory、原 B2 system-contract **3 项通过，退出 0**；source、dependency、publication、人审、Manifest 错 hash、额外 CSS，以及 phase 的发布/范围/人审扩张共九类反例仍拒绝。见 [本批结果](./metadata-successor-summary.json)、[红](./metadata-successor-red.json)、[绿](./metadata-successor-green.json)及[精确补丁](./metadata-successor-helper.patch)。`verification-helpers-before-metadata-successor.mjs` 是通过仅反转此精确补丁重建的前状态，不冒称变更前直接采集的副本。

原导航 Boundary 18 项顺序复测为 **17 通过、1 失败、0 跳过，退出 1**（[结果](./metadata-boundaries-after.json)）。剩余 baseline 诊断已经变为 source outside complete Day3 allowlist：本轮三个新颜色检查文件尚未进入既有有限导航脚本清单。不得将此结果写为 Boundary 全通过；根代理收到具体来源后负责精确登记。本代理已按根要求停止额外测试，让全量单元检查独占运行。
