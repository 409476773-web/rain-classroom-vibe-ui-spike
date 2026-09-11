# Rain Classic → Rain Next 全库定向复用审计 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 对 Rain Classic 当前全部公共资产及其直接依赖的共享内部行为进行一次可复现、只读、风险分层的跨项目审计，为每项资产形成有来源证据的 Rain Next 复用或不复用结论。

**Architecture:** Rain Classic 是只读来源，Rain Next 是审计产物的唯一写入位置。执行时先冻结 Rain Classic 的精确 Commit 和事实源哈希，再从公共出口、生命周期、Registry、契约和页面清单生成实时资产集合；随后完成全量静态映射，并只对当前 Spike 与高风险行为补充新鲜运行和浏览器证据。迁移标签、实现、Human Gate、发布和业务迁移保持为独立状态。

**Tech Stack:** Markdown、YAML、Node.js 22 ESM、TypeScript、Vitest、Git、Rain Classic 现有 Vue 2.7/Vite/Vitest 验证工具、Rain Next 现有 Playwright/Chromium 证据设施。

---

## 0. 已确认决策

本计划记录以下已经由用户确认的决定，执行时不得重新扩大或缩小：

1. 采用全库映射审计，不只覆盖 Rain Next 当前 8 个组件族。
2. 范围为 Rain Classic 当前全部公共资产，以及它们直接依赖的共享内部行为。
3. 孤立实验和无消费者的 Internal 不进入完整深审；废弃资产登记替代关系，不做无收益的运行复核。
4. 采用风险分层运行审计：全量完成静态映射，当前 Spike 与高风险行为必须补新鲜运行证据。
5. 高置信度资产按组件族批量进入 Human Gate；冲突项和低置信度项逐项确认。
6. 发生实质来源冲突时暂停该项，不静默继承。
7. 预计用时为 3–4 个工作日。

## 1. 工作模式与状态边界

- Rain Next 工作模式：`System Mode / governance and provenance audit`。
- Rain Classic 工作性质：只读来源；不得修改、格式化、生成、提交、发布或迁移其中的文件。
- Rain Next 当前仍处于 `foundation-spike-day-2`；本审计不自动推进到 Day 3。
- 本计划只授权未来创建审计事实、验证工具和证据，不授权组件实现、依赖安装、Figma 写入、Registry 发布、包发布、业务迁移或 Git 远端操作。
- 审计完成不等于资产已经在 Rain Next 实现、Design Reviewed、System Approved 或 Published。
- Local Git Commit 仍未授权。执行任务时用审阅检查点代替 Commit；只有用户另行明确授权后才能创建本地提交。
- Rain Next 当前尚无初始 Commit，不能安全创建普通 Git worktree。若执行前用户另行授权初始 Commit，可在独立 worktree 执行；否则只在当前工作区按本计划的文件白名单工作。

## 2. 来源优先级

发生冲突时按以下顺序处理：

1. 当前用户明确决策和 Rain Next 已锁定不变量；
2. Rain Next `AGENTS.md`、`SPIKE_BRIEF.md` 与 `status/current-phase.yaml`；
3. Rain Classic 正式 Figma 视觉与已确认业务语义；
4. Rain Classic 当前机器契约、生命周期、Registry、Vue 实现和新鲜运行证据；
5. Rain Classic 历史报告与旧截图；
6. 当前官方 shadcn Registry、Radix 或 Base UI 一手资料；
7. 实现推断。

Figma、中文设计源、契约、代码和运行结果出现实质冲突时，把该项标记为 `needs-decision`，记录冲突双方和影响，不自行选边。

## 3. 正式产物与支持文件

### 三份正式产物

- Create: `evidence/rain-classic/source-lock.yaml`
- Create: `evidence/rain-classic/reuse-matrix.yaml`
- Create: `docs/audits/2026-09-01-rain-classic-reuse-audit.md`

### 支持文件

- Create: `scripts/collect-rain-classic-inventory.mjs`
- Create: `scripts/collect-rain-classic-inventory.test.ts`
- Create: `scripts/verify-rain-classic-reuse-audit.mjs`
- Create: `scripts/verify-rain-classic-reuse-audit.test.ts`
- Create as needed: `evidence/rain-classic/runtime/**`
- Modify: `package.json`
- Modify: `scripts/verify-workspace.mjs`
- Modify: `scripts/verify-boundaries.mjs`

### 明确不修改

- Do not modify: `/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/**`
- Do not modify: `packages/foundations/**`
- Do not modify: `packages/ui/**`
- Do not modify: `packages/layouts/**`
- Do not modify: `apps/playground/**`
- Do not modify before the Human Gate: `status/current-phase.yaml`
- Do not create: `manifests/**` 或 `registry/**` 中的 Rain Next 正式资产条目

## 4. 审计数据模型

### 4.1 `source-lock.yaml`

至少保存：

```yaml
schemaVersion: "1.0"
kind: "RainClassicSourceLock"
auditId: "RC2RN-REUSE-AUDIT-001"
source:
  repository: "409476773-web/rain-classroom-design-system"
  branch: "<captured-branch>"
  commit: "<40-char-commit>"
  tree: "<40-char-tree>"
  packageName: "@rain-classroom/design-system"
  packageVersion: "<captured-version>"
  trackedWorktreeClean: true
  untrackedFilesExcluded: true
  localPathStored: false
facts:
  - path: "src/index.js"
    sha256: "<64-char-sha256>"
  - path: "src/component-lifecycle.js"
    sha256: "<64-char-sha256>"
  - path: "src/registry/component-registry.generated.js"
    sha256: "<64-char-sha256>"
target:
  project: "rain-classroom-vibe-ui-spike"
  phaseAtStart: "foundation-spike-day-2"
boundaries:
  sourceReadOnly: true
  figmaWrite: "not-authorized"
  publication: "not-authorized"
  businessMigration: "not-authorized"
```

不得保存本机绝对路径、Remote URL、凭据、OAuth、Keychain 信息或业务身份数据。

### 4.2 `reuse-matrix.yaml`

每个资产至少包含：

```yaml
- id: "rain-classic/ui/input"
  stableName: "Input"
  identity: "component"
  source:
    owner: "src/components/Input/Input.vue"
    contract: "src/components/Input/input.contract.js"
    evidence: []
    lifecycleStatus: "<captured-status>"
  audit:
    staticReview: "reviewed"
    riskTier: "deep"
    runtimeReview: "passed"
    browserReview: "passed"
    confidence: "high"
    status: "awaiting-human"
  inheritance:
    retainedTraits: []
    redesignedTraits: []
    intentionallyNotInherited: []
  decision:
    migrationLabel: "rewrite-from-rain"
    targetLayer: "ui"
    targetAsset: "input"
    rationale: "<concise evidence-backed rationale>"
    blockers: []
```

矩阵还必须有 `targetGaps`，覆盖 Rain Next 当前 8 个组件族与 4 个 Layout 中没有直接 Rain Classic 公共资产的目标，例如 Dialog、Surface/Card、Statistic、Stack、Inline 或 Grid。没有旧来源必须写为 `classicSource: none`，不得伪造对应组件。

### 4.3 独立状态轴

以下字段不得互相推导：

- `audit.status`: `unreviewed | reviewed | needs-decision | awaiting-human | accepted`
- `audit.confidence`: `high | medium | low`
- `audit.riskTier`: `deep | standard | record-only`
- `decision.migrationLabel`: `adopt-shadcn | adapt-shadcn | rewrite-from-rain | retain-vue-only | react-only | retire`
- `implementation`: 固定为 `not-started`
- `humanGate`: 审计执行结束前固定为 `not-evaluated` 或 `awaiting-human`
- Figma、Package/Registry、Business Migration、Local Commit、Remote Git 分别保持未授权或未发生

## 5. 风险分层规则

### `deep`

必须完成静态、测试、运行和真实浏览器检查：

- Rain Next 首批 8 个组件族对应的 Rain Classic 资产；
- Input、Select/MenuItem、Tag/Badge、Button、Table/DataTable/QueryTable；
- Popup/Popover/Tooltip、Focus、Overlay、Keyboard、Selection；
- Tree/ManageTree、DragDrop、Scroll、Pane/Layout ownership；
- 任何来源冲突、测试漂移、缺失契约或低置信度资产。

### `standard`

必须检查源码、契约、生命周期、Registry、文档、测试和全库验证结果；没有异常时不要求逐项新截图。近期不进入 Rain Next、行为风险较低的公共组件默认属于此层。

### `record-only`

仅用于已有明确替代项的废弃资产、无消费者孤立实验或不进入完整范围的 Internal。必须记录排除依据和替代关系；不能只从清单中消失。

## 6. 迁移判定规则

每项资产只能选择一个迁移标签：

| 标签 | 使用条件 |
| --- | --- |
| `adopt-shadcn` | Rain Classic 没有独特视觉、业务或行为规则，可直接采用已批准外部来源并受 Rain Token 约束 |
| `adapt-shadcn` | 外部来源提供合适行为基础，但必须保留或重新设计 Rain 的视觉、语义、Parts 或组合规则 |
| `rewrite-from-rain` | Rain Classic 的视觉、业务或行为规则价值高，需要用 React 重新实现 |
| `retain-vue-only` | 只服务现有 Vue 产品，Rain Next 当前没有合理目标 |
| `react-only` | Rain Classic 没有来源，是 Rain Next 新增能力 |
| `retire` | 重复、过时或已有更清晰替代项 |

迁移标签不代表优先级、成熟度、实现完成、Human Gate 或发布状态。

## 7. 执行任务

### Task 1: 执行前只读 Preflight

**Files:**

- Read: `AGENTS.md`
- Read: `SPIKE_BRIEF.md`
- Read: `status/current-phase.yaml`
- Read: `docs/audits/2026-09-01-visual-asset-audit.md`
- Read: `/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/AGENTS.md`
- Read: `/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/ai/START_HERE.md`
- Read: `/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/roadmap/REFACTOR_ROADMAP.yaml`
- Read: `/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/plans/2026-07-22-rain-classroom-ai-ready-component-standard-design.md`

**Step 1: Confirm the Rain Next boundary**

Run:

```bash
git status --short --branch
```

Expected: 显示当前无 Commit 的本地工作区；记录已有用户文件，不清理、不提交。

因为当前仓库尚无初始 Commit，所有既有文件均为 untracked，`git diff --check` 不能单独证明修改范围。执行写入前还必须运行：

```bash
git status --short --untracked-files=all
mktemp -d /private/tmp/rain-next-reuse-plan-baseline.XXXXXX
```

记录完整文件清单，并把本计划将修改的既有文件复制到返回的临时目录作为精确比较基线。临时基线不得写回仓库；不得用 `git add`、初始 Commit 或清理工作区替代该保护措施。

**Step 2: Confirm the Rain Classic committed source**

Run these separately from the Rain Classic root:

```bash
git status --short --branch
git rev-parse --verify HEAD
git rev-parse HEAD^{tree}
git branch --show-current
```

Expected: 获得精确 Commit、Tree 和 Branch。若存在 tracked 修改，停止并让用户选择审计 HEAD 还是明确的工作树状态；不得自行混入未提交修改。

**Step 3: Confirm source files exist**

Run:

```bash
test -f src/index.js
test -f src/component-lifecycle.js
test -f src/registry/component-registry.generated.js
test -f scripts/generate-refactor-baseline.mjs
test -f package.json
```

Expected: 全部 exit 0。任何缺失都属于 source drift，停止 Task 1。

**Step 4: Review checkpoint**

Report CP1 Candidate：Commit、Tree、Branch、Package Version、tracked 是否干净、untracked 是否排除。不要写状态文件，也不要开始资产判断。

### Task 2: 用 TDD 建立审计验证器

**Files:**

- Create: `scripts/verify-rain-classic-reuse-audit.test.ts`
- Create: `scripts/verify-rain-classic-reuse-audit.mjs`
- Modify: `package.json`
- Modify: `scripts/verify-workspace.mjs`
- Modify: `scripts/verify-boundaries.mjs`

**Step 1: Write failing fixture tests**

测试必须在 `/private/tmp` fixture 中覆盖：

- 缺少 `source-lock.yaml`；
- 非 40 位 Commit 或 Tree；
- 重复资产 ID；
- 非法迁移标签；
- 公共资产覆盖缺口；
- 被公共资产直接依赖但未登记的 Internal；
- Rain Next 8+4 目标缺口未登记；
- `accepted` 但仍有 `needs-decision`；
- 审计记录错误声称实现、发布或迁移已经发生；
- strict live mode 的 Commit 与锁定值不一致。

**Step 2: Run the test to verify RED**

Run:

```bash
pnpm vitest run scripts/verify-rain-classic-reuse-audit.test.ts
```

Expected: FAIL，因为验证器尚不存在。

**Step 3: Implement the minimal verifier**

验证器必须复用 `scripts/verification-helpers.mjs` 的 YAML parser，并提供两种模式：

- 默认 snapshot mode：只检查 Rain Next 内的锁定文件、矩阵和报告一致性；
- live mode：当设置 `RAIN_CLASSIC_AUDIT_ROOT` 时，额外读取 Rain Classic 当前 Commit 和事实源文件，与 source lock 比较。

strict completion 由 `RAIN_REUSE_AUDIT_REQUIRE_COMPLETE=1` 开启；开启后不允许 `unreviewed`、空结论或未解释冲突。

**Step 4: Add the package script**

在 `package.json` 中新增：

```json
"verify:reuse-audit": "node scripts/verify-rain-classic-reuse-audit.mjs"
```

在审计进入 `awaiting-human` 前，不把 strict completion 写入默认 `verify`。默认 `verify:governance` 可以在矩阵骨架稳定后加入 snapshot mode。

**Step 5: Verify the governance RED before changing allowlists**

新增测试文件、但尚未同步 allowlist 时运行：

```bash
pnpm verify:boundaries
```

Expected: FAIL，明确报告新的审计脚本位于 Day 2 全源码白名单之外。该 RED 证明 fail-closed 门禁真实覆盖本次范围变化。

**Step 6: Synchronize the exact governance allowlists**

执行最小治理同步：

- `scripts/verify-workspace.mjs` 的 `requiredFiles` 先登记 Task 2 已创建的两个验证器文件，并在根 `expectedScripts` 精确登记 `verify:reuse-audit`；Task 3 Collector GREEN 后再登记对应的两个 Collector 文件；
- `scripts/verify-boundaries.mjs` 的 Day 2 根脚本合同精确登记 `verify:reuse-audit`，Day 2 全源码白名单登记本计划新增的四个审计脚本；
- 不修改 Day 1 合同，不扩大依赖白名单，不把审计授权解释为组件、Layout、Benchmark、Figma、发布、迁移或 Git 授权。

**Step 7: Run GREEN**

Run:

```bash
pnpm vitest run scripts/verify-rain-classic-reuse-audit.test.ts
```

Expected: PASS，且每种错误 fixture 都产生精确可读的失败原因。

同时运行：

```bash
pnpm verify:workspace
pnpm verify:boundaries
```

Expected: PASS；精确脚本合同与 Day 2 全源码白名单均只新增本审计所需条目。

**Step 8: Review checkpoint instead of Commit**

Run:

```bash
git status --short --untracked-files=all
rg -n "[[:blank:]]+$" \
  docs/plans/2026-09-01-rain-classic-to-rain-next-reuse-audit.md \
  package.json \
  scripts/verify-workspace.mjs \
  scripts/verify-boundaries.mjs \
  scripts/verify-rain-classic-reuse-audit.test.ts \
  scripts/verify-rain-classic-reuse-audit.mjs
```

Expected: whitespace 扫描无匹配；把当前文件清单与 Task 1 临时基线比较后，只有本任务白名单内文件新增或变化。使用临时基线的 `git diff --no-index` 复核四个既有文件的精确差异。不要 Commit。

### Task 3: 生成实时 Rain Classic 资产清单

**Files:**

- Create: `scripts/collect-rain-classic-inventory.test.ts`
- Create: `scripts/collect-rain-classic-inventory.mjs`
- Create: `evidence/rain-classic/source-lock.yaml`
- Create initial: `evidence/rain-classic/reuse-matrix.yaml`

**Step 1: Write collector tests**

fixture 至少验证：

- 根公共导出全部被读取并去除 alias 重复；
- 生命周期条目与公共组件正确关联；
- Registry 的 public Component、Pattern、Template、Domain 被保留；
- public asset 的直接 Internal dependency 被加入；
- 无消费者 Internal 被标记 `excluded-isolated-internal`；
- 页面 Pattern/Template 不因没有组件生命周期而丢失；
- Rain Next 8+4 目标全部出现在 `targetGaps` 对照中。

**Step 2: Verify RED**

Run:

```bash
pnpm vitest run scripts/collect-rain-classic-inventory.test.ts
```

Expected: FAIL，因为 collector 尚不存在。

**Step 3: Implement read-only collection**

Collector 接受显式 `--source` 和 `--output` 参数。它应动态导入 Rain Classic 的 `collectRefactorBaseline()` 与 `componentRegistry`，但只读取数据；不得调用 `writeRefactorBaseline()`。

核心结构：

```js
const baselineModule = await import(
  pathToFileURL(join(sourceRoot, "scripts/generate-refactor-baseline.mjs")).href
);
const registryModule = await import(
  pathToFileURL(join(sourceRoot, "src/registry/component-registry.generated.js")).href
);

const baseline = await baselineModule.collectRefactorBaseline(sourceRoot);
const registry = registryModule.componentRegistry;
```

直接 Internal 只通过 Registry dependency 或明确机器契约依赖纳入，不通过文件名猜测。

**Step 4: Verify GREEN**

Run:

```bash
pnpm vitest run scripts/collect-rain-classic-inventory.test.ts
```

Expected: PASS。

随后把两个 Collector 文件加入 `scripts/verify-workspace.mjs` 的 `requiredFiles`，并运行 `pnpm verify:workspace`。Expected: PASS，且 required file 合同没有提前要求尚未创建的文件。

**Step 5: Generate a transient current inventory**

生成前重新读取 Rain Classic 的 Commit、Tree 和三个事实源 SHA-256；任何值与 Task 1 Candidate 不一致都立即停止并重新执行 Task 1。

先运行：

```bash
mktemp -d /private/tmp/rain-classic-reuse-audit.XXXXXX
```

记录返回的精确临时目录，再运行 collector；`--output` 指向该目录中的 `inventory.json`。

Expected: 输出当前 public exports、canonical public assets、Pattern/Template/Domain、生命周期差异、直接 Internal 和排除项总数；Rain Classic 工作区 `git status` 前后不变。

**Step 6: Write source lock and matrix skeleton**

- `source-lock.yaml` 写入 Commit、Tree、Package 和事实源 SHA-256。
- `reuse-matrix.yaml` 为每个范围内资产建立唯一条目，初始 `audit.status: unreviewed`。
- 所有 Rain Next 8+4 目标建立映射或 `targetGaps` 记录。
- 不在矩阵中复制业务身份数据或 Figma 完整 URL。

**Step 7: Run CP1 checks**

Run:

```bash
pnpm verify:reuse-audit
RAIN_CLASSIC_AUDIT_ROOT="/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0" pnpm verify:reuse-audit
RAIN_CLASSIC_AUDIT_ROOT="/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0" RAIN_REUSE_AUDIT_REQUIRE_COMPLETE=1 pnpm verify:reuse-audit
```

Expected: snapshot 与非 strict live structure PASS，并报告实时资产总数、直接 Internal 数量和排除数量；live mode 同时证明 Commit、Tree 和事实源 SHA-256 未漂移。strict completion 应因 `unreviewed` 明确失败，这是预期状态。

暂停并让用户确认 CP1 的真实数量与来源锁定后，再进入 Task 4。

### Task 4: 审计 Foundations 与共享行为

**Files:**

- Modify: `evidence/rain-classic/reuse-matrix.yaml`
- Create as needed: `evidence/rain-classic/runtime/foundations-and-behaviors.md`

**Step 1: Review canonical source groups**

最少检查：

- `src/styles/tokens.scss`
- `src/icons/semantic-icon.contract.js`
- `src/layout/**`
- `src/components/Popup/**`
- `src/behaviors/pagination/**`
- `src/behaviors/hierarchy/**`
- `src/behaviors/drag-drop/**`
- 对应契约、测试、Registry 和当前 Roadmap 证据

**Step 2: Record inheritance boundaries**

分别写明：

- 可继承的品牌、视觉、业务、行为和无障碍规则；
- 必须重新设计的 React/Headless 实现；
- 不继承的 Vue API、SCSS 结构、旧 Focus 规则和历史债务；
- Rain Next Foundations 已存在规则是否冲突。

**Step 3: Run focused source tests in a temporary clone**

不得在 Rain Classic 原工作区运行会生成或改写文件的命令。使用 Task 7 的临时 clone 方法执行 focused tests；当前任务先记录所需测试文件和浏览器场景。

**Step 4: Review checkpoint**

Expected: Foundations 与共享行为全部不再是 `unreviewed`；任何语义冲突进入 `needs-decision`，不降低置信度掩盖冲突。

### Task 5: 全库公共组件静态映射

**Files:**

- Modify: `evidence/rain-classic/reuse-matrix.yaml`

按 collector 产生的实时清单分批，不使用手写固定总数。

**Batch A — Form / Action**

- Button、TextButton、IconButton；
- Input、SearchInput、InputNumber、TextArea、FormItem；
- Select、MenuItem、Radio、Checkbox、Switch、Segmented。

**Batch B — Status / Feedback / Content**

- Tag、Badge、StatusIndicator 及 Domain variants；
- Avatar family；
- Empty、Message、Tooltip、Popover 与其公共消费者。

**Batch C — Collection / Data / Tree**

- Pagination；
- DataTable、QueryTable、EditableCell、RowReorder 及相关 Table contracts；
- Tree、TreeNode、ManageTree；
- collector 在当前 Commit 发现的其他公共资产。

**Step for every asset**

1. 读取 owner、contract、lifecycle、registry、设计文档和测试。
2. 确认真实 public identity，避免按导出 alias 重复计数。
3. 填写 retained、redesigned、intentionally-not-inherited。
4. 选择一个 migration label 和 Rain Next target layer。
5. 给出 evidence-backed rationale、risk tier、confidence 和 blockers。
6. 当前 Spike 或高风险项标为 `deep`；其他公共项至少为 `standard`。

**Batch checks**

每批完成后运行：

```bash
pnpm verify:reuse-audit
```

Expected: 已审批次无空字段、非法标签或重复 ID；未审批次仍清晰显示为 `unreviewed`。

### Task 6: Layout、Pattern、Template、Domain 与 Rain Next 缺口

**Files:**

- Modify: `evidence/rain-classic/reuse-matrix.yaml`

**Step 1: Audit higher-level assets**

从当前 Registry、root exports、`src/layout/**`、`src/patterns/**` 和 Demo pages 读取真实清单，覆盖：

- Layout Foundation、Container、PaneGroup、Recipes 与 Scroll Ownership；
- QueryTable、ManageTree、FilterBar、FormSection、CollectionShell、WorkbenchShell、MasterDetail、ReviewWorkbench；
- 当前 Commit 中登记的 Template 和 Domain 资产。

**Step 2: Preserve ownership boundaries**

- Layout 只继承空间、区域、响应式、滚动和折叠规则；
- Table、Tree、Form 与业务面保留自身语义和事务边界；
- Vue 页面不得被整体映射为 Rain Next 万能组件。

**Step 3: Complete Rain Next target gaps**

对 Rain Next 8+4 逐项确认：

- 有 Rain Classic 来源：链接到对应资产；
- 只有视觉或业务来源：记录 `rewrite-from-rain` 或 `adapt-shadcn` 的依据；
- 没有来源：记录 `classicSource: none` 与 `react-only` 或外部来源候选；
- 不得因为名称相似就视为同一资产。

**Step 4: External source check when required**

只有 `adopt-shadcn` 或 `adapt-shadcn` 候选需要读取当前官方一手资料。记录 Registry、Item、Version/Commit 和用途，不安装依赖、不复制源码。若上游版本无法确认，把结论标为 `needs-decision`。

**Step 5: CP2**

输出迁移标签按 Layer、Family、Risk 和 Confidence 的分布，以及全部冲突与 target gaps。暂停让用户确认 CP2 后，再运行深层验证。

### Task 7: 风险分层运行与浏览器验证

**Files:**

- Create: `evidence/rain-classic/runtime/README.md`
- Create as needed: `evidence/rain-classic/runtime/<family>/**`
- Modify: `evidence/rain-classic/reuse-matrix.yaml`

**Step 1: Create an isolated source copy**

Run `mktemp -d` 获取精确临时目录，然后从锁定 Rain Classic 仓库执行本地 clone：

```bash
git clone --local --no-hardlinks /Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0 <temporary-directory>/rain-classic
```

Expected: clone HEAD 与 `source-lock.yaml` 完全一致。若不一致，停止并重新执行 CP1。

**Step 2: Install only from the lockfile**

在临时 clone 运行：

```bash
pnpm install --frozen-lockfile --offline --ignore-scripts
```

Expected: exit 0。若本机缓存不足，不绕过锁文件；按权限规则请求网络安装授权或报告阻塞。

**Step 3: Run the full Rain Classic verification**

Run:

```bash
pnpm verify
```

Expected: exit 0。记录实际测试文件数、测试数、构建模块、包消费和失败项；不得复制历史总数充当本轮结果。

**Step 4: Run focused high-risk tests**

至少覆盖：

- Input / Select / MenuItem / Tag / Badge / Button；
- Popup / Popover / Tooltip / Focus return；
- DataTable / QueryTable / Pagination / Selection；
- Tree / ManageTree / Hierarchy / DragDrop；
- Layout / Pane / Scroll ownership。

使用当前文件系统发现到的精确测试路径；若原计划名称已漂移，先更新矩阵 evidence path，不猜测路径。

**Step 5: Start the temporary Vue demo**

Run in a persistent terminal session:

```bash
pnpm run dev -- --host 127.0.0.1 --port 4175
```

Expected: Vite demo 可访问。使用真实浏览器检查 `deep` 资产的键盘、Focus、Overlay、Selection、Scroll、Drag 和状态恢复；只保留不含私有业务身份数据的截图。

**Step 6: Record evidence**

每个 `deep` 资产写入：

- 实际命令与结果；
- Demo route 或测试夹具；
- Browser result；
- 截图相对路径与 SHA-256（如保留）；
- 失败、差异和判断影响。

运行失败不得自动把资产改为 `retain-vue-only` 或 `retire`；应标记 `needs-decision` 或证据不足。

**Step 7: Verify the original source stayed unchanged**

回到 Rain Classic 原工作区运行：

```bash
git status --short --branch
```

Expected: 与 Task 1 完全一致。不要清理原有用户文件。

### Task 8: 完成报告与严格机器验收

**Files:**

- Create: `docs/audits/2026-09-01-rain-classic-reuse-audit.md`
- Modify: `evidence/rain-classic/reuse-matrix.yaml`
- Modify if stable: `package.json`

**Step 1: Write the human-readable report**

报告必须包含：

1. 来源 Commit、范围和排除项；
2. public、direct Internal、Pattern/Template/Domain 总数；
3. 各 migration label、target layer、risk tier、confidence 分布；
4. 当前 Spike 8+4 映射；
5. 可继承、必须重设和明确不继承的跨资产规则；
6. 全部冲突、低置信度项和 target gaps；
7. 运行与浏览器证据；
8. 推荐的 Rain Next 实施顺序；
9. 独立生命周期边界；
10. Human Gate 批量确认包。

**Step 2: Complete the matrix**

- 所有范围内条目离开 `unreviewed`；
- 高置信度条目进入 `awaiting-human`；
- 冲突项保持 `needs-decision`；
- `implementation`、publication 与 migration 保持未开始或未授权。

**Step 3: Run strict live validation**

Run from Rain Next:

```bash
RAIN_CLASSIC_AUDIT_ROOT="/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0" RAIN_REUSE_AUDIT_REQUIRE_COMPLETE=1 pnpm verify:reuse-audit
```

Expected: 只有在锁定 Commit 未漂移、100% 范围覆盖、所有必填结论存在、冲突均有解释时 exit 0。

**Step 4: Run the Rain Next quality profile**

Run:

```bash
pnpm verify
git diff --check
```

Expected: exit 0；审计基础设施没有破坏现有 Day 2 Foundations、Evidence 或 Playground。

### Task 9: 第二遍复核与 Human Gate

**Files:**

- Review only: `evidence/rain-classic/source-lock.yaml`
- Review only: `evidence/rain-classic/reuse-matrix.yaml`
- Review only: `docs/audits/2026-09-01-rain-classic-reuse-audit.md`

**Step 1: Run a second-pass review**

使用与首次分类分离的检查清单重新验证：

- 是否有 public export、Registry asset 或直接 Internal 漏项；
- 是否按 alias 重复计数；
- 是否将 Gate/测试状态错误继承给 Rain Next；
- 是否把 Vue API 或 SCSS 当作可直接复用资产；
- 是否对名称相似但语义不同的资产做了错误映射；
- 是否有无证据的 `adopt-shadcn`、`retire` 或高置信度结论；
- 是否保存了敏感 URL、身份数据或本机绝对路径。

如果用户之后明确要求使用 subagent，才可把该第二遍复核委托给独立 agent；否则由当前会话用独立检查阶段完成。

**Step 2: Prepare CP3**

Human Gate 材料分为：

- 高置信度资产：按组件族批量确认；
- 中置信度资产：按迁移标签和目标层确认；
- 低置信度、`needs-decision` 和冲突项：逐项确认。

**Step 3: Stop at `awaiting-human`**

执行者不得自行把 `humanGate` 或 `audit.status` 改为 `accepted`。用户确认 CP3 只关闭复用审计 Gate，不授权实现、Figma 写入、Registry/Package 发布、业务迁移、Local Commit 或 Remote Git。

**Step 4: Post-Gate status proposal**

只有用户接受 CP3 后，另行提出最小 `status/current-phase.yaml` 更新方案。未获得明确授权前，不修改该文件。

## 8. 停止条件

出现任一情况时停止相关任务并报告：

- Rain Classic tracked 工作树有未确认修改；
- Source Commit、Tree 或事实源 SHA 在执行中变化；
- 公共出口、Registry 和生命周期无法解释地不一致；
- 缺失来源会显著改变迁移标签；
- 需要修改 Rain Classic 才能继续；
- 需要安装或复制未授权外部 Registry 资产；
- 需要 Figma 写入、发布或业务数据；
- 真实运行失败原因不明；
- Human Gate 决策对架构或当前 Spike 范围产生重大改变。

局部条目阻塞不必停止整个审计；将其标记为 `needs-decision`，继续完成不依赖该结论的其他条目。

## 9. 完成定义

只有同时满足以下条件，才可以报告“Rain Classic → Rain Next 全库定向复用审计已完成，等待/通过 Human Gate”：

- source lock 精确且 live check 一致；
- 100% 当前公共资产有唯一记录；
- 直接共享 Internal 全部登记，孤立 Internal 有排除原因；
- Rain Next 8+4 全部有来源映射或 target gap；
- 每项都有来源、身份、继承边界、唯一迁移标签、目标层、置信度和证据状态；
- 所有 `deep` 资产有新鲜运行与浏览器结果；
- snapshot、strict live、Vitest、`pnpm verify` 和 `git diff --check` 均通过；
- 第二遍复核没有未解释的高优先级问题；
- 报告没有混淆审计、实现、Human Gate、发布和迁移；
- Rain Classic 原工作区未被修改；
- 未执行 Local Commit 或任何远程写入。

## 10. 时间盒与检查点

| 阶段 | 预计时间 | 检查点 |
| --- | ---: | --- |
| Preflight、source lock、实时盘点 | 0.5 天 | CP1：来源 Commit 与真实资产总数 |
| Foundations、共享行为 | 0.5 天 | 共享规则与冲突清单 |
| 全库公共资产与高层资产映射 | 1–1.5 天 | CP2：迁移标签和 target gaps |
| 风险分层运行与浏览器验证 | 0.5–1 天 | 新鲜运行证据 |
| 第二遍复核与 Gate 材料 | 0.5 天 | CP3：Human Gate |

超过 4 个工作日仍无法收口时，不扩大为组件实现项目；应报告是来源漂移、运行环境、证据缺口还是范围判断造成超时，并由用户决定修正范围。

## 11. 执行交接

本计划文件本身不构成审计启动授权。开始执行时必须再次确认：

- 当前只做审计，不做组件实现；
- Rain Classic 保持只读；
- Local Commit、Figma、发布和迁移仍未授权；
- 从 Task 1 开始，在 CP1、CP2、CP3 停止等待确认。

执行方式可在获得开始授权后选择：

1. **Subagent-Driven（本会话）**：只有用户明确选择 subagent 执行时，才按任务分派并在每个检查点复核。
2. **Parallel Session（独立会话）**：在新会话中使用 `executing-plans`，按 Task 1–9 顺序执行并在 CP1、CP2、CP3 停止。
