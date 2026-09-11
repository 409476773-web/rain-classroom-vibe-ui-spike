# Day 2 RED → GREEN 摘要

## RED

1. `pnpm verify:boundaries`
   - exit 1；明确报错：`no explicit boundary policy exists for phase foundation-spike-day-2`。
2. `pnpm test -- token-contract`
   - 12 项合同测试中 11 项失败；首个失败明确指出 semantic color roles 为 0，text / surface / border / action / selection / focus / semantic / intelligence、radius 与 shadow 尚未定义。
3. `pnpm exec vitest run packages/foundations/src/density.test.tsx`
   - 10 项中 9 项失败；明确指出 UI / Reading / Data、DensityProvider、三类 Focus 与 reduced-motion 合同缺失。
4. 将测试提升为真实导入与渲染后，三个目标测试文件共 26 项中 24 项失败；失败原因是 token、DensityProvider 和真实 FoundationsPage 尚未实现，而不是测试语法或模块解析错误。
5. Overview 入口测试 8 项中 2 项失败；明确缺少普通 Foundations 链接且阶段文案仍为 Day 1。

## GREEN

- token、density、真实页面 DOM 与 Overview 单测：4 个文件、34 项通过。
- Foundations Chromium E2E：1 项通过；覆盖普通链接、41 个语义色角色、普通 action 不使用 AI 渐变、Compact / Default、Data Value / Unit 拆分、三类 Focus、reduced-motion 和全页截图。
- 初版 `pnpm verify`：exit 0；Day 2 治理、lockfile、workspace、evidence、boundary、typecheck、73 项 Vitest、两个 workspace build 以及 2 项 Chromium E2E 全部通过。
- 最终 boundary 摘要：3 个 package manifests、10 个 application sources、11 个 shared-package sources；fail-closed dependency、lifecycle、full-source allowlist 与 blocked-layer 限制已生效。

## 调试记录

- 首次 E2E 启动因沙箱禁止绑定 `127.0.0.1:4173`（`EPERM`）失败；使用获准的本地预览权限后正常启动。
- 首次可运行 E2E 在 Focus 样式断言失败：测试把焦点移动到 danger 后才读取全部三个节点，已失焦节点正确返回 `outline: none`。修复测试时序为“逐个聚焦并立即读取”，未修改生产 Focus 样式；随后通过。
- 首次全量验证只剩 Overview 状态文字对比度为 4.066，低于 4.5 门槛。将该功能状态从 `text-muted` 改用 `text-secondary` 后，定向 E2E 与唯一一次全量复核均通过。

## 规格审查回归

### RED

1. 更新浏览器字体断言后，Foundations E2E 明确失败：预期 computed family 为 `LINE Seed JP App_OTF`，实际为错误的 `LINE Seed JP App_OTF Bold`。
2. Motion、Data family、Density CSS 变量与治理 helper 回归合计 43 项中 6 项失败：正常态 region 仍为 `infinite alternate`，DensityProvider 未注入指标，PNG / importer helper 未定义。
3. `/private/tmp` 副本将 canonical PNG 替换为 1-byte 文本，并向 lockfile 新增 `packages/ui` phantom importer；旧 `verify-boundaries` 与旧 `verify-workspace` 均错误 exit 0。
4. Token 值比对测试的可逆 mutation 将 CSS `brand-primary` 从 `#1561F8` 改为 `#1561F7`，测试精确失败并显示 CSS / TS 差异；随后立即恢复。
5. PNG 门初次启用后，boundary 因 README 尚未记录 SHA-256 而 exit 1，证明摘要记录与真实文件已强制关联。

### GREEN

- Region Motion 为单次、`normal`、`both` 的有限区域转换；Reduced Motion 仍为 `0ms` / `none`。
- Data 字体使用 `LINE Seed JP App_OTF` + `font-weight: 700`；Chromium 中 computed family、`document.fonts.check()` 和 distinct metrics 均验证命中。
- DensityProvider 从 `densityMetrics` 注入 control height、inline padding 和 item gap CSS 变量；Playground 只消费变量，不再重复写入数值。
- 新门对同一临时副本明确拒绝：1-byte PNG 报告异常小且 PNG/IHDR 无效；phantom importer 报告实际集合多出 `packages/ui`。
- Canonical PNG 通过显式更新开关刷新；常规 E2E 写入 Playwright 临时产物。两项 E2E 前后 canonical SHA-256 均为 `e69db9321178d45fee6fb854e30aba24bfc6e6104ff42eb5f844bb598f62785a`。
- 审查修复后 `pnpm verify`：exit 0；治理门、两个 workspace typecheck/build、7 个 Vitest 文件共 79 项、两项 Chromium E2E 全部通过；常规 E2E 后 canonical hash 未变。

## 规格复审回归

### RED

1. 复审确认默认 Foundations E2E 无条件断言 LINE Seed 本机命中；该测试会在没有 LINE Seed 的合法 CI 环境失败，与声明的回退合同冲突。
2. `/private/tmp` 副本仅将 README 记录的文件大小从 `598701` 改为 `598700 bytes`，旧 boundary 仍错误 exit 0。
3. 新增 Chromium Motion 计算值断言后，可逆 mutation 将 region duration 从 `220ms` 改为 `221ms`；E2E 精确失败，显示预期 `0.22s`、实际 `0.221s`，随后立即恢复。

### GREEN

- 默认 E2E 强制 Data 的首选 family、700 字重、完整回退链与 Value / Unit 拆分；命中探针只记录 `target-hit` / `fallback-hit`，默认两者均合法。本轮未在缺少 LINE Seed 的独立机器上运行。
- `RAIN_REQUIRE_LINE_SEED=1` 严格证据模式在当前机器通过：`target-hit`、font check `true`、`700 48px` 同字重 Canvas distinct metrics `true`。`RAIN_UPDATE_DAY_2_EVIDENCE=1` 同样会启用该严格门。
- 同一 Chromium E2E 先在 `no-preference` 断言 region name / `0.22s` / iteration `1` / direction `normal` / fill `both`，再切换 `reduce` 断言 `none` / `0s`，并保持 reduce 后截图。
- 新 boundary 对同一 size-off-by-one 副本 exit 1，精确报告 recorded `598700` / received `598701`；README 的 size 与 SHA 均要求唯一记录。
- 规格复审修复后的最终 `pnpm verify`：exit 0；governance / lockfile / workspace / evidence / boundary、两个 workspace typecheck / build、7 个 Vitest 文件共 79 项及 2 项 Chromium E2E 全部通过。默认字体模式在当前机器记录 `target-hit`，但不以命中本机字体作为通过条件。

## 代码质量复审回归

### RED

1. 新增治理、Density、页面和生命周期合同后，4 个定向 Vitest 文件共 54 项中 18 项失败；失败分别指向缺失的 `:root` Default Density、Overlay Motion、页面标题焦点、Evidence/Benchmark Day 2 lifecycle 锁、根测试类型检查，以及尚未收口的 Task 3 lifecycle。
2. 浏览器回归新增后 3 项均失败：Foundations 激活后标题未获焦，Overview Benchmark 仍使用独立硬编码的 `not-implemented`，主 Foundations 测试同样在标题焦点处停止。
3. 在根测试类型检查启用后，故障注入分别向 E2E、脚本测试、Playwright config 与 Vitest config 写入类型错误；`pnpm typecheck` 精确报告四处 `TS2322` 并 exit 1，随后立即恢复探针。自审扩展至全部 App/Foundations 测试时又暴露 token CSS match 的 `string | undefined` 类型错误；修正收窄后，对 Foundations 测试的独立故障注入再次以 `TS2322` exit 1。
4. Day 2 临时证据副本同时漂移 YAML 与 TypeScript index 时，旧 evidence 门对 projectLifecycle、Visual Evidence implementation / automatedVerification / humanGate 及 Benchmark 同三字段均错误 exit 0。

### GREEN

- `densityMetrics` 由测试侧字面合同锁定；Provider 注入使用独立期望复核，Provider 外的独立 `:root` 同步提供 Default 的 `36px / 14px / 10px`，且不会由主题选择器重置嵌套 Compact。
- Evidence 门在 Day 1 与 Day 2 均精确锁定两个 projectLifecycle 及每个 VE/BM entry lifecycle；7 项协调漂移负向测试均被拒绝。
- 根 `typecheck` 保留两个 workspace 检查，并新增 App/Foundations 全部测试、根 tests、scripts tests、Playwright config 与 Vitest config 覆盖；恢复故障探针后通过。
- 键盘 Enter 可正向进入 `#foundations`、反向返回 `#overview`，两次激活均把焦点移至新页面唯一的 `tabIndex=-1` 一级标题；返回链接已改为纯文本。
- 三类 Focus 的浏览器实际 outline color 分别锁定，并相对各自背景达到至少 3:1；Region / Feedback / Overlay 在正常偏好下均有非零时长，Reduced Motion 下均降为 0。
- Overview Benchmark 状态由 Benchmark index 与关联 Evidence index 交叉解析，不再维护独立的 `not-implemented` 状态。
- Task 3 lifecycle 收口为 implementation `completed`、automated verification `passed`、Human Gate `not-evaluated`；未写入脆弱测试数量。
- 移除返回箭头后以严格字体证据模式刷新 canonical PNG：`1440 × 4368`、`598580 bytes`、SHA-256 `66c089608047b84aa5cc92b4280082d53b2b9c14e1d33528f204838d8573d8fc`。

## 最终代码质量复审回归

### RED

1. 新增共享 Evidence 的 Benchmark 独立推进回归后，BM-A 预期 `completed`，旧 Overview 却从 VE-009 解析为 `not-started`；定向 Vitest 精确失败，证明生命周期被错误耦合。
2. 新增浏览器 History Back 与 Feedback 状态回归后 4 项均失败：从空 hash、`#components`、`#benchmarks` 返回 Overview 时目标标题未获焦或缺少 `tabIndex=-1`，Feedback hover 前后 `transform` 仍为 `none`。
3. 新增共享 alpha-aware 对比度合同后，定向 Vitest 因 `tests/e2e/color-contrast.ts` 不存在而失败；实现文件后，Day 2 boundary 又按预期拒绝两个尚未加入精确 allowlist 的新文件。

### GREEN

- Overview 仅消费各 Benchmark 自身 lifecycle；BM-A 与 BM-C 即使共享 VE-009，也可分别渲染 `completed` 与 `not-started`，Evidence 沿用独立治理门验证引用存在与对称关系。
- Hash 由单一 route 解析同时决定 view 与 focus target；初始加载不抢焦点，键盘链接与浏览器 Back 均可把焦点移到当前 Overview / Components / Benchmarks / Foundations 的唯一有效标题。
- Feedback fixture 在 hover 与 keyboard focus 时改变 `transform`、边框和表面色；Chromium 同时验证非零时长、交互前后属性变化及移出后的恢复，Reduced Motion 仍降为 `0s`。
- 两项 Chromium spec 改用同一个 alpha-aware 对比度 helper；合同锁定黑白 21:1 与半透明黑在白底约 3.98:1，并由 workspace、boundary 与根 tests typecheck 覆盖。
- 最终 `pnpm verify`：exit 0；governance、根与 workspace typecheck、8 个 Vitest 文件共 97 项、两个 workspace build 及 6 项 Chromium E2E 全部通过。E2E 后再次运行 boundary 仍通过，canonical PNG SHA-256 保持 `66c089608047b84aa5cc92b4280082d53b2b9c14e1d33528f204838d8573d8fc`。

## Day 2.1 Focus / Color 用户评审修正

### RED

1. 第一轮新合同的 3 个定向测试文件共 39 项，8 项失败；精确指向 41→42 语义角色、Reference Palette 缺失、`text-muted` 在 raised 表面仅 4.42:1、三类 Focus 未统一、旧 `3px + 3px` recipe 及 Input 夹具身份缺失。
2. 用户明确要求 Input Focus 更接近原始设计稿后，新增的 halo 合同与视觉血缘文案测试在 25 项中 2 项失败，证明旧实现仍是实色外圈。
3. 治理 helper 的负向测试首次运行因私有 Reference CSS 变量消费检测器缺失而失败。
4. 首次完整 `pnpm verify` 在 110 项 Vitest、两个 workspace build 通过后，Overview Chromium 精确失败：入口返回浏览器原生 1px outline。回溯确认原因是删除页面硬编码 3px Focus 后，Overview 链接没有接入 `data-focus="item"` Foundation 合同。

### GREEN

- 内部 Reference Palette 映射 42 个稳定 Semantic Roles；`text-placeholder` 从 Disabled 拆分，`text-muted` 在 panel / raised / page / subtle 上均达到 4.5:1。
- 通用 Focus 保留 control / item / danger 三语义且统一为品牌蓝 `2px + 1px`；Input 候选改为 VE-014 方向的浅蓝表面、1px 品牌边框和 14% 品牌色 2px halo，forced-colors 保留 CanvasText outline。
- 4 个定向 Vitest 文件中新实现合同全部通过；阶段收口前只有预期的“当前状态仍为进行中”治理断言失败。
- Foundations Chromium 定向回归 5/5 通过；严格字体证据模式 1/1 通过，LINE Seed 记录 `target-hit`。
- Canonical 截图已刷新并人工检查：`1440 × 4636`、`656036 bytes`、SHA-256 `56d4caaf64559ff7ec3ac6aa1db884a5eca3a19c87b99b16b1ee050be2ac67a4`；Compact Input 保持 Focus 以便直接对照。
- Overview 三个入口统一接入 `item` Focus，并将过期的“41 个语义色角色”更新为 42；新增定向单元回归和 Overview Chromium 均通过。
- 最终 `pnpm verify`：exit 0；governance / lockfile / workspace / evidence / boundary、根与两个 workspace typecheck、8 个 Vitest 文件共 111 项、两个 workspace build 及 6 项 Chromium E2E 全部通过。

本文件记录可复核的命令摘要，不替代命令原始输出。
