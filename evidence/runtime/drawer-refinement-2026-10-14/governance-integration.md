# Drawer 后继治理接入

最终状态：三个 seal 已计算，Carousel canonical 前任视图已通过真实 reader；本轮来源绑定已封存。当前完整 reader 在最后的范围保留检查拒绝并行 Conversation CSS 差额，所以不是全库治理通过记录。原 G6 的118份保留证据未改动。下文 PENDING 和接入步骤描述制作过程；最终结果见 verification.md。

## 独立文件与入口

- `scripts/drawer-refinement-governance.mjs`
- `scripts/drawer-refinement-governance.test.ts`
- 读取入口：`readDrawerRefinementSourceBindings(root, status, parsePhase)`。
- 它先核对所传 phase 与实际磁盘；没有 `drawerRefinement` 时返回 null，有该阶段但未封存则明确拒绝。
- 精确路径集合由 `drawerRefinementFiles` 给出；必须项由 `drawerRefinementRequiredFiles` 给出。未列出的路径不能加入本轮来源绑定。
- 独立 snap consumer 入口只允许 `apps/playground/drawer-refinement-consumer.html` 与 `apps/playground/src/drawer-refinement-consumer.tsx`；没有加入已删除的 tests/e2e consumer 路径。
- 共享 TSX 使用已安装 Vite 的公开 `parseSync` 解析，不增加依赖。只允许 taskSeed、TaskDraftDrawer、DrawerPage、DirectionalDrawers、ModalityDrawers 的声明变化和独立任务组件导入。用户17:42追加的统一右上角关闭要求，仅为 DrawerCarousel 增加下述精确关闭区例外；不将整个函数列入可变声明。其余声明与导入保持有效前任的内容。共享 CSS 只允许既有 Drawer 专属规则变化；混合选择器、Carousel-in-Drawer 阅读规则和普通公共布局规则保持。共享测试只允许两项旧草稿测试移入独立任务测试，保留 Carousel-in-Drawer 测试。
- DrawerCarousel 的 Header 只允许增加 `g6-drawer-example-header` 和包裹原 Title/Description 的 `g6-drawer-example-copy`，再放置 `DrawerClose` 渲染的36/20 `IconButton`、`CloseIcon` 和精确 `aria-label="关闭资料阅读"`；只删除原“返回课程”关闭按钮所在 Footer。解析后规范化这两处，再逐字比较其余函数；标题/说明原文另行逐字比较。任何引擎调用、手势属性、Carousel children、选项、状态与新增关闭事件均不能由此例外通过。
- 新 CloseIcon 只允许来自 `@rain-next/ui/icons/close` 的同名导入；IconButton/DrawerBody/原DrawerFooter相关导入不能别名覆盖其他共享符号。颜色范围没有新增；两条新的 header/copy CSS 只含结构布局。

## 前任与并发边界

现有 `baseline.json` 是本轮开始时的观察记录，其 before 快照包含三个会话页差额和进行中的 Carousel 治理模块。这些观察不能直接变成被接受的前任。

最终 `source-bindings.json` 的 `predecessor` 只能是：

1. `kind: "g6"`：原 G6 source-bindings；或
2. `kind: "carousel"`：已经通过现有 `readCarouselUpgradeSourceBindings` 的 Carousel 后继。

有效前任的只读视图位于本轮 `predecessor/`。这是另一个目录，不能覆盖目前已经冻结的 `before/`。原 G6 前任需要 selected source 的原绑定字节、phase、Drawer Manifest 和 Registry；Carousel 前任还需要其 reader 实际读取的原 G6 baseline/source-bindings/color ledger、Carousel 已封存来源、对应 beforeSnapshot、授权/颜色/design-lineage 与已确认本地设计文件。无需 node_modules、consumer 构建缓存或整个 evidence 树。

Carousel 情况下，该视图由真实 Carousel reader 完整检查；当前 Carousel proof 与其已验证来源也必须保持一致。PENDING Carousel、假 descriptor、临时允许名单和回调返回值不能替代它。

Carousel 的四个共享来源使用 `carousel-regions-only`、`carousel-registry-only`、`carousel-phase-only`、`carousel-guide-only`，其 after 是 canonical projection hash。构造 `predecessor/` 时，所有 Carousel sourceFiles 应写入 `carouselBindingBytes(root, path, binding.beforeSnapshot)`，不能把共享文件 live raw bytes 当成 canonical after；其原始 beforeSnapshot 仍原样复制到视图对应路径。真实 Carousel reader 验证后，Drawer 会再逐文件要求视图原始 bytes SHA 等于 binding.after，拒绝混入 Drawer 或其他兄弟修改的视图。当前工作区里的 Carousel beforeSnapshot 也必须保持原 before hash。

未进入 Drawer 来源绑定的 Carousel scoped 文件，Drawer 同时核对两个方向：`carouselBindingBytes` 的SHA必须等于 after；`carouselProjectedPredecessor` 保留现场兄弟源码，其SHA必须等于 before。因此 phase条目位置不同可以通过 canonical 校验，而任何未授权兄弟改动仍失败。原 G6 入口仍应验证 live siblings 投影，不用 canonical 视图替换不属于 Drawer 的现场内容。

模块把原 G6 sourceFiles/protectedSources 与合法 Carousel after-state 合成为有效前任。所有未进入 Drawer 绑定的路径仍逐项匹配该前任，所以已观察的三会话页漂移仍会失败；它们没有被吸收、豁免或重新接受。暂未合法封存的并发改动不会阻止独立 Drawer 源码/浏览器验证，但会保持跨家族治理限制。

有效前任也继承原 G6 已封存的两份精确 observation：`concurrent-source-observation.json`（SHA `569c0f267fa6157c9046ac09c24e0d5d3acf8dfa2ead3a5014fe085960ecd881`）仅含 RN14 starter 两文件；`concurrent-document-observation.json`（SHA `7a5e3c867011452b4c8265b8cc1deeb45b7205849c57be89a3a33d1f3e772d04`）仅含 Rain Designer 文档。`readDrawerInheritedG6Observations` 检查记录原始hash、固定字段/路径、baseline或已封存文档前任、精确beforeSnapshot和before hash，再把这三个原已观察after纳入 expected。它们不成为 Drawer 可编辑路径，现场再次变化仍失败；没有加入 Conversation 观察或通用豁免。

## 最终记录形状

```js
{
  kind: "DrawerRefinementSourceBindings",
  scope: drawerRefinementScope,
  authorization: drawerRefinementAuthorization,
  baseline: { path: drawerRefinementEvidence + "baseline.json", sha256: baselineHash },
  predecessor: {
    kind: "g6", // 或经真实 reader 验证的 "carousel"
    root: drawerRefinementEvidence + "predecessor",
    sourceBindings: "evidence/runtime/g6-components-2026-10-14/source-bindings.json",
    sha256: "真实前任 record hash"
  },
  sourceFiles: {
    // 必须项全部登记；其他项仅从有限清单选取。
    // 旧文件 before 必须等于有效前任的 after；新文件为 null。
    "path": { before: "hash或null", beforeSnapshot: "predecessor/path或null", after: "当前raw hash" }
  },
  evidenceFiles: {
    "evidence/runtime/drawer-refinement-2026-10-14/authorization.json": "真实hash",
    "evidence/runtime/drawer-refinement-2026-10-14/color-consumers.json": "真实hash"
  }
}
```

phase 项使用导出的 `drawerRefinementAuthorization` 全部字段，增加本轮 verification/sourceBindings/colorConsumers 路径和三个生命周期字段。只增加 `componentRefinements.drawerRefinement`；完整删去这一项后必须等于有效前任 phase。旧 G6 的十二项授权、其他阶段、任何 Gate 不变。Registry 只允许 Drawer 的 exportNames 增加一次 DrawerBody，其他字段与其他资产逐项保留。

## 共享入口集成（由主代理进行）

1. 在 G6 reader 的入口核对 live phase 后调用 Drawer reader。它必须先完全验证，不能用 try/catch 把失败当作不存在。
2. 有 Drawer 时使用它已验证的 `carouselUpgrade`；没有时沿现有 Carousel 入口。原 G6 proof 的文件读取按两层前任投影：若 Carousel 绑定拥有该路径，读取 Drawer `predecessorRoot` 下 Carousel 的原 beforeSnapshot；否则若 Drawer 绑定拥有该路径，读取 Drawer 的 beforeSnapshot；否则读取 live 文件。不能对未知路径自动回退到历史文件。
3. 原 G6 proof 成功后合并当前 sourceFiles.after，保留原 G6 的 before 值；额外返回可信 `drawerRefinement` 记录。旧阶段 phase 恢复仅在 exactRecord 匹配已验证记录时删除这一精确新阶段，拒绝其他新字段。
4. G6 颜色入口需要同样分层：原 ledger 在证明过的旧来源上验证，本轮 Drawer paint 由独立本轮 ledger 检查。不得让本模块的来源绑定替代实际颜色检查。
5. CLI 的写出路径只能是本轮目录。不要调用旧 G6 refresh 或把当前 proof 写回旧 G6 目录。

`docs/ai/g6-components.md` 若进入 Drawer 绑定，`validateDrawerRefinementGuide` 仅接受当前精确 Drawer 表格行、混合示例import加入DrawerBody、`{body}`外包DrawerBody这三处替换。其余资产行、Carousel内容、段落、导入和示例必须与有效前任逐字一致，不能将整份指南当作 Drawer 所有。

最后才设 `baselineHash`、计算 `drawerRefinementBindingSeal(record)` 并设 `sourceSeal`，将 moduleHash 临时置为64个零计算模块摘要，设最终 moduleHash，再把模块当前 raw hash填回 sourceFiles。Seal函数只将本模块的 after 归一为 self；其余 hash 都是 raw bytes。此步骤必须基于已审阅的最终来源，不在组件和并发共享文件仍变化时执行。

## 已执行检查

- 首次 RED：9项测试因新 reader 尚不存在而失败。
- 实现后发现本仓 TypeScript 7 顶层导出没有旧 compiler API，改用已有 Vite 的公开 parser；随后9项通过。
- 补充了“传入旧 phase 不可隐藏磁盘中的新阶段”负例，先观察1项失败，修正后9项全部通过。
- 当前记录只证明合同正/反例；完整 sealed reader、合法 Carousel 前态视图和全局治理尚未形成通过结论。
- 补充测试类型检查 `pnpm exec tsc -p tsconfig.tests.json --pretty false`，退出 0。随后合同测试复跑 9/9 通过；不完整 draft 的负例同时兼容封存前的 seal 拒绝与封存后的缺失原始 proof 拒绝。

复验：`pnpm exec vitest run scripts/drawer-refinement-governance.test.ts`。

## 独立颜色清单与接入

入口为 `verifyDrawerColorConsumers(root = process.cwd(), bindings?)`，文件为 `scripts/drawer-color-consumers.mjs`、`scripts/drawer-color-consumers.test.ts` 与本轮 `color-consumers.json`。不调用 `getG6SourceBindings`，因此能在 Carousel 未封存、Conversation 差额未处理时独立核对 Drawer 颜色来源；返回 `sourceChainStatus: not-evaluated-by-color-verifier`，不替代来源链验证。

有限集合只有三份 CSS（公共 Drawer、共享 interaction、独立 task Drawer）和两份 TSX（公共 Drawer、独立 task Drawer）。本轮观察 baseline 与原 G6 色清单的原始 hash 固定校验。各源登记完整 before/after hash；每条 paint 带原范围、现范围、两侧整文件 hash 和声明片段 hash。41条保留、4条新增、1条移除；移除仅 blur(4px)，新增仅 demo note Text/Neutral/3、header/footer Border/Neutral/3 与 reading outline:none。原声明沿用原 G6 角色与父表面，不重新分类。

两份 TSX 当前没有 paint utility；既有公共 style 透传逐段保留，新任务组件不能加入 inline style 或未登记 paint utility。新增原始色、新 Token 消费、删除其他共享 paint、修改范围/hash/角色、编造测量、放宽 Gate 都被拒绝。

新增 note 是页面辅助文本，父表面在 DocExample preview 中明确为 Background/Neutral/1，仍按4.5:1测量；light 6.5648、dark 8.5487。header/footer 为冗余分区线，`content: decorative`，`minimum: 0`，实际合成比值为light 1.3178、dark 1.2767，`meetsMinimum: null`；不能把该结果解释成达到了3:1或改用于必要边界。新 reading outline例外只适用于无动作、tabIndex=-1的程序焦点阅读锚点，不能扩展到控件或Tab停靠点。祖先opacity、嵌套brightness、动画、forced-colors和用户覆盖均未获运行态确认。

返回结构保留 ledger 全字段，并增加：

```js
{
  registrationStatus: "verified-finite-declarations",
  sourceChainStatus: "not-evaluated-by-color-verifier",
  contrastStatus: "declared-pairings-runtime-unproved",
  measurements, pendingContrastFindings, pendingEligibilityFindings, pendingPaintObservations
}
```

当前有98条静态配对测量，0条阈值不足、0条角色资格错误、18条仍未验证的原生/效果观察；`humanGate: awaiting_human`、`contrastAcceptance: not-granted`、`publication: unpublished`始终保持。

共享颜色入口先在已证明的旧来源上验证原 G6 ledger，再合并 `verifyDrawerColorConsumers(root, verifiedDrawerBindings)` 返回的数组。传入bindings时会额外检查本轮ledger raw hash和全部5个颜色源的after hash；因此这5个源必须在最终Drawer绑定中登记。未封存阶段直接省略第二个参数运行独立检查即可。不要将原G6 ledger替换为本轮ledger，也不要用颜色成功清除来源链失败。

复验：`pnpm exec vitest run scripts/drawer-color-consumers.test.ts scripts/drawer-refinement-governance.test.ts`。首轮7项RED确认模块缺失；实现后通过；补充inline/raw-utility负例先观察1项失败，再补充限制后复验。

最终复验：两份独立测试共16项通过（本轮 `color-governance-tests.log`）；测试类型检查退出0；独立实际来源验证退出0，摘要为 `color-verification.json`。期间精确绑定正确检测到并发task布局与snapPoint源变更；确认4条paint不变后，清单已更新到最新5份来源。该摘要不建立来源链或人工对比度验收。

17:42关闭区反馈后的续验：新增 DrawerCarousel 正/反例测试先失败，再实施精确例外后通过。收到主代理源稳定通知后，颜色清单更新到包含公共 Overlay key 重置、统一关闭按钮与两条布局规则的5份当前来源；paint差额仍为41保留/4新增/1移除，测量仍为98条。最终测试总数17项，详情以更新后的 `color-governance-tests.log` 和 `color-verification.json` 为准。

本次17项测试和独立颜色来源验证退出0。续验的测试类型检查退出1，报告的三项均在并发 `scripts/carousel-upgrade-governance.test.ts:71/81/84`，内容为 `{}` 上不存在 `componentRefinements`；未报告 Drawer 文件错误。本代理未修改该并发文件；此前通过的类型检查不代替本次最新结果。

Carousel scoped mode 兼容与指南合同续验：先观察新增3项负例失败，再完成实现；补充TSX/Registry/Guide投影的live兄弟漂移负例。最终两份独立测试共21项通过，最新测试类型检查退出0。颜色清单没有变动。构造canonical前任视图并通过真实sealed reader仍由最终接入完成，本次不把合同测试记成整条来源链通过。

原 G6 observation 继承续验：真实两份记录与前任/快照复制进独立fixture，新增正反例先RED后实现；覆盖篡改记录、纳入Conversation、篡改before快照、错误baseline与扩大editable scope。封存后不完整记录测试已预建G6证据目录，使拒绝固定在缺失source-bindings文件。主代理添加的integration测试有限路径与最后执行的retained检查位置保持不变；本代理未改共享入口、phase或integration测试。

该轮最终23项独立治理/颜色测试通过，测试类型检查退出0。模块和治理测试来源已经变化，最终Drawer seal须由接入流程重算后再运行整链检查。
