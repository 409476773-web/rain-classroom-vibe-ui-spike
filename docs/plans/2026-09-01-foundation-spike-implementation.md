# Rain Next Foundation Spike Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 在 10 个工作日内建立 Rain Next 的最小可运行 Foundation、8 个组件族、4 个 Layout 原语和 4 类 Benchmark，并用真实运行、自动检查、视觉差异和人工 Gate 材料回答架构是否值得继续。

**Architecture:** 使用一个 pnpm workspace 管理单一 Playground 应用与 Foundations、UI、Layouts 三个共享包；Benchmark 先作为 Playground 内的 `local-experiment`，验证通过后再决定是否提升为 Pattern、Block 或 Template。Headless Primitive 在 Day 4 以前只存在于隔离实验目录，必须由 ADR 选择一个方案后才能进入公共 UI。

**Tech Stack:** React、TypeScript、Vite、Tailwind CSS、pnpm workspace、Vitest、Testing Library、Playwright；Headless 候选为 Radix Primitives 与 Base UI，胜者由同条件 Select / Dialog 实验决定。

---

## 0. 执行前提与当前边界

本计划是后续实施合同，不是当前实施状态。执行前必须读取：

- `AGENTS.md`
- `SPIKE_BRIEF.md`
- `status/current-phase.yaml`
- `docs/audits/2026-09-01-visual-asset-audit.md`
- `evidence/visual-evidence.yaml`
- `benchmarks/benchmark-registry.yaml`

当前 `foundation-spike-preparation` 阶段不允许安装依赖、创建运行时或实现组件。只有用户明确授权 `day-1-runtime-start` 后，才执行 Task 1 及后续任务。每个 Task 末尾的 commit 也是条件步骤：只有 `status/current-phase.yaml` 单独允许 Local Git Commit 时才能执行；否则把建议 commit message 记录为 pending。

### 0.1 已比较的仓库组织方案

1. **推荐：单 Playground + 三个共享包。** 最少运行入口，同时保留 Foundations / UI / Layouts 的真实依赖边界；Benchmark 在同一站点可直接与组件文档并排比较。
2. **不选：所有源码放在一个 Vite app。** Day 1 更快，但无法真实验证 Registry、Manifest、依赖方向和公共资产边界。
3. **暂不选：Playground 与 Prototype 两个独立 app。** 边界最清晰，但在 10 日 Spike 内会重复路由、构建和测试配置；若 Spike 成功，再拆分为独立应用。

### 0.2 目标目录

```text
apps/
  playground/
    src/
      docs/
      benchmarks/
      experiments/
        headless/
      routes/
packages/
  foundations/
  ui/
  layouts/
manifests/
registry/
tests/
  e2e/
evidence/
  runtime/
docs/
  adr/
  reports/
```

依赖方向固定为：

```text
foundations → primitive behavior → ui / layouts → benchmark composition
```

Playground 可以消费所有共享包；任何共享包不得反向依赖 Playground 或 Benchmark。

### 0.3 Day 1 授权的唯一转换顺序

Task 1 不得自行解锁。进入 Task 1 前必须按以下顺序发生：

1. 用户明确授权 `day-1-runtime-start`；
2. 在不安装依赖、不创建运行时的治理步骤中更新 `status/current-phase.yaml`：
   - `currentPhase.id: foundation-spike-day-1`
   - `currentPhase.status: authorized`
   - `currentPhase.authorizationScope: day-1-runtime-scaffold-and-quality-gates`
   - `checkpoints[id=day-1-runtime-start].status: authorized`
   - 将“安装依赖”“最小 React/Vite/Tailwind 运行骨架”“测试基础设施”移入 `allowedActions`
   - Figma 写入、公共组件、发布、迁移、commit 和远程 Git 继续留在 `blockedActions`
3. 重新读取并验证上述精确值；
4. 只有第 3 步通过后，才运行环境检查和 Task 1 的文件/依赖操作。

如果用户授权范围与上述 Day 1 范围不同，先修订本计划与阶段文件，不能靠执行者自行扩大。

## 1. 十日与任务映射

| 日程 | 本计划任务 | 当日停止条件 |
| --- | --- | --- |
| Day 1 | Task 1–2 | 空壳可运行；目录、质量命令、证据入口可检查 |
| Day 2 | Task 3 | 30–45 个语义 token 与字体、密度、Focus、动效夹具可运行 |
| Day 3 | Task 4 | Button、Input、Tag/Badge、Surface/Card 的状态矩阵可运行 |
| Day 4 | Task 5 | Radix / Base UI 同条件证据齐备，ADR 锁定单一 Headless Base |
| Day 5 | Task 6–7 | Select、Dialog、Table Primitives、Statistic 齐备 |
| Day 6 | Task 8 | Stack、Inline、Grid、Split/Sidebar 的滚动与折叠证据齐备 |
| Day 7 | Task 9 | Benchmark A、B 可运行并记录差异 |
| Day 8 | Task 10 | Benchmark C、D 可运行并记录差异 |
| Day 9 | Task 11–12 | Manifest/Registry 候选、跨 Benchmark 自动回归和截图齐备 |
| Day 10 | Task 13 | 形成继续 / 修正 / 停止结论，并进入 `awaiting_human` |

---

### Task 1: 验证已记录的 Day 1 授权并建立最小 workspace

**Files:**

- Read: `status/current-phase.yaml`
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `tsconfig.base.json`
- Create: `.gitignore`
- Create: `apps/playground/package.json`
- Create: `apps/playground/index.html`
- Create: `apps/playground/vite.config.ts`
- Create: `apps/playground/tsconfig.json`
- Create: `apps/playground/src/main.tsx`
- Create: `apps/playground/src/app.tsx`
- Create: `apps/playground/src/styles.css`
- Create: `scripts/verify-workspace.mjs`

**Step 1: 验证授权与环境**

Run:

```bash
rg -n "foundation-spike-day-1|day-1-runtime-start|authorized" status/current-phase.yaml
node --version
pnpm --version
```

Expected: 阶段、授权范围和检查点均符合 0.3 的精确值；Node 满足当前 Vite / Playwright 要求；pnpm 可用。若任一项不满足，停止，不修改阶段文件或运行时。

**Step 2: 先写结构检查**

在 `scripts/verify-workspace.mjs` 中检查目标目录、包名唯一、workspace 引用和禁止的反向依赖；此时运行应因文件缺失而失败。

Run: `node scripts/verify-workspace.mjs`

Expected: FAIL，明确列出缺失的 workspace 文件，不允许以未捕获异常结束。

**Step 3: 建立最小文件**

根脚本至少提供：

```json
{
  "scripts": {
    "dev": "pnpm --filter @rain-next/playground dev",
    "build": "pnpm -r build",
    "typecheck": "pnpm -r typecheck",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "verify": "pnpm typecheck && pnpm test && pnpm build && pnpm test:e2e"
  }
}
```

Playground 首屏只显示项目名、当前阶段、四个 Benchmark 入口和“尚未实现”的明确状态；不要导入 shadcn 默认主题或示例组件。

**Step 4: 安装最小依赖**

仅在步骤 1 已授权后执行：

```bash
pnpm add -D -w typescript vite @vitejs/plugin-react @tailwindcss/vite tailwindcss vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom @playwright/test
pnpm add --filter @rain-next/playground react react-dom
pnpm add -D --filter @rain-next/playground @types/react @types/react-dom
pnpm exec playwright install chromium
```

不要安装组件集合或 Headless 候选；它们属于 Task 5。

**Step 5: 运行最小验证**

Run:

```bash
node scripts/verify-workspace.mjs
pnpm typecheck
pnpm build
```

Expected: PASS；构建只有空壳，不得据此更新组件、Benchmark 或 Human Gate 状态。

**Step 6: 条件 commit**

建议 message：`chore: scaffold rain next spike workspace`。未获 Local Git Commit 授权时跳过。

---

### Task 2: 建立质量门、证据入口与最小页面索引

**Files:**

- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `tests/setup.ts`
- Create: `tests/e2e/playground-shell.spec.ts`
- Create: `apps/playground/src/routes/route-registry.ts`
- Create: `apps/playground/src/routes/overview-page.tsx`
- Create: `apps/playground/src/docs/evidence-index.ts`
- Create: `apps/playground/src/docs/benchmark-index.ts`
- Create: `scripts/verify-evidence.mjs`
- Create: `scripts/verify-boundaries.mjs`

**Step 1: 写失败的页面入口与证据测试**

测试必须断言：

- Overview 以普通链接列表直接进入 Components 与 Benchmarks；
- 不存在持久文档站导航、平台级侧栏或 Benchmark 范围外的导航系统；
- 四个 Benchmark ID 均存在；
- 14 个 Visual Evidence ID 均存在；
- 每个 Evidence 的本地截图存在；
- Benchmark 双向引用一致。

Run:

```bash
pnpm test -- playground-shell
node scripts/verify-evidence.mjs
```

Expected: FAIL，因为路由与索引尚未实现。

**Step 2: 实现最小页面索引**

只建立扁平的 Overview 链接索引和状态标签，不实现持久文档站导航，也不实现组件演示。这是测试夹具入口，不是 Brief 中被禁用的“文档站导航”。页面不使用产品平台的深色一级导航，但可使用冷色工作区、白色任务面和低阴影保留 Rain 视觉 DNA。

**Step 3: 验证**

Run:

```bash
pnpm test -- playground-shell
node scripts/verify-evidence.mjs
node scripts/verify-boundaries.mjs
pnpm exec playwright test tests/e2e/playground-shell.spec.ts
```

Expected: PASS；截图仅作为运行证据，不代表视觉 Gate。

**Step 4: 条件 commit**

建议 message：`test: add playground and evidence quality gates`。

---

### Task 3: 实现 Foundations 合同与展示夹具

**Files:**

- Create: `packages/foundations/package.json`
- Create: `packages/foundations/src/index.ts`
- Create: `packages/foundations/src/tokens.css`
- Create: `packages/foundations/src/token-contract.ts`
- Create: `packages/foundations/src/typography.css`
- Create: `packages/foundations/src/density.tsx`
- Create: `packages/foundations/src/motion.css`
- Create: `packages/foundations/src/focus.css`
- Test: `packages/foundations/src/token-contract.test.ts`
- Test: `packages/foundations/src/density.test.tsx`
- Create: `apps/playground/src/docs/foundations-page.tsx`
- Create: `tests/e2e/foundations.spec.ts`

**Step 1: 写 token 合同失败测试**

测试至少断言：

- 语义 token 总数为 30–45；
- `brand-primary` 的值为 `#1561F8`；
- text、surface、border、action、selection、focus、semantic、intelligence 均有最小角色；
- radius 只暴露 4 / 6 / 8 / 10 / full；
- shadow 只暴露 none / overlay / dialog；
- intelligence gradient 不被普通 primary action 引用；
- CSS 与 TypeScript 导出集合一致。

Run: `pnpm test -- token-contract`

Expected: FAIL，指出尚未定义的角色。

**Step 2: 写字体、密度与 Focus 失败测试**

断言 UI / Reading / Data 三个字体角色、Compact / Default 上下文、control / item / danger Focus 语义，以及 `prefers-reduced-motion` 降级存在。Data 字体测试必须把中文单位与数字拆为不同节点。

**Step 3: 实现最小 Foundations**

从跨节点证据提炼规则，不逐页抄色值。旧 Figma 中的蓝、紫、绿、橙只能作为关系证据；除锁定品牌蓝外，不直接提升为 token。字体文件的存在、授权和实际渲染分别记录；缺失时使用声明过的回退，不伪装为目标字体已验证。

**Step 4: 建立视觉夹具**

Foundations 页面展示：

- 所有语义色角色及使用说明；
- Compact / Default 的同一控件对照；
- UI / Reading / Data 混排；
- 三类 Focus；
- reduced motion 对照。

**Step 5: 验证**

Run:

```bash
pnpm test -- token-contract density
pnpm exec playwright test tests/e2e/foundations.spec.ts
pnpm typecheck
```

Expected: PASS；另保存 Day 2 运行截图与字体环境说明。

**Step 6: 条件 commit**

建议 message：`feat: establish rain next foundations`。

---

### Task 4: 实现四个无复杂 Headless 依赖的 UI 家族

**Files:**

- Create: `packages/ui/package.json`
- Create: `packages/ui/src/index.ts`
- Create: `packages/ui/src/button/button.tsx`
- Test: `packages/ui/src/button/button.test.tsx`
- Create: `packages/ui/src/input/input.tsx`
- Test: `packages/ui/src/input/input.test.tsx`
- Create: `packages/ui/src/tag/tag.tsx`
- Create: `packages/ui/src/badge/badge.tsx`
- Test: `packages/ui/src/tag/tag-badge.test.tsx`
- Create: `packages/ui/src/surface/surface.tsx`
- Create: `packages/ui/src/card/card.tsx`
- Test: `packages/ui/src/surface/surface-card.test.tsx`
- Create: `apps/playground/src/docs/components/core-ui-page.tsx`
- Create: `tests/e2e/core-ui.spec.ts`

**Step 1: 为公共根节点写失败测试**

每个组件根节点必须输出稳定的 `data-rain-id`；语义子区域使用 `data-slot`；适用时输出 `data-variant`、`data-state`、`data-size`、`data-density`。交互测试优先以 role、label、accessible name 定位。

**Step 2: 写状态矩阵失败测试**

- Button：primary / secondary / ghost / danger、disabled、loading、Compact / Default、focus-visible；
- Input：label 关联、placeholder、附加位、clear、error、disabled、两种密度；
- Tag / Badge：信息与状态、可移除边界、键盘移除；
- Surface / Card：page / panel / raised；Card 只表达独立对象，不替代任意 Stack。

Run: `pnpm test -- button input tag-badge surface-card`

Expected: FAIL，先证明公共实现不存在。

**Step 3: 逐家族最小实现**

只使用 Foundations token。不得从 shadcn 示例复制默认颜色、圆角或阴影，不新增 Benchmark 专属 props。

**Step 4: 文档化修改边界**

每个家族页面提供 Overview、useWhen、doNotUseWhen、Variants、States、Density、Anatomy、Accessibility、允许/禁止修改、Visual Lineage 和成熟度。当前成熟度最高只能是 `prototype-ready`，不得标记 `system-approved`。

**Step 5: 验证**

Run:

```bash
pnpm test -- button input tag-badge surface-card
pnpm exec playwright test tests/e2e/core-ui.spec.ts
node scripts/verify-boundaries.mjs
```

Expected: PASS；人工视觉结论仍为 `not-evaluated`。

**Step 6: 条件 commit**

建议 message：`feat: add core rain ui families`。

---

### Task 5: 对 Radix 与 Base UI 做同条件 Headless 实验

**Files:**

- Create: `apps/playground/src/experiments/headless/README.md`
- Create: `apps/playground/src/experiments/headless/test-contract.ts`
- Create: `apps/playground/src/experiments/headless/radix/select-sample.tsx`
- Create: `apps/playground/src/experiments/headless/radix/dialog-sample.tsx`
- Create: `apps/playground/src/experiments/headless/base-ui/select-sample.tsx`
- Create: `apps/playground/src/experiments/headless/base-ui/dialog-sample.tsx`
- Test: `apps/playground/src/experiments/headless/headless-contract.test.tsx`
- Create: `tests/e2e/headless-comparison.spec.ts`
- Create: `docs/adr/0001-headless-base.md`

**Step 1: 冻结同条件合同**

两个候选必须使用相同 token、DOM 语义目标、中文内容、Compact / Default 尺寸和测试路径。合同至少覆盖：

- Select：键盘打开/关闭、方向键、选中、禁用项、定位、焦点返回；
- Dialog：触发、Escape、遮罩策略、初始焦点、Tab 约束、关闭后焦点返回、长内容、固定底栏；
- 共通：源码可读性、状态属性、Tailwind/token 接入、包与维护复杂度。

**Step 2: 写失败的共享测试**

测试应通过候选 adapter 运行同一套断言，而不是复制两套宽松测试。

Run: `pnpm test -- headless-contract`

Expected: FAIL，因为候选 adapter 尚未实现。

**Step 3: 安装隔离候选**

```bash
pnpm add --filter @rain-next/playground radix-ui @base-ui/react
```

依赖由实际导入它们的 `@rain-next/playground` 声明，且只用于 `apps/playground/src/experiments/headless/**`；在 ADR 前不得从 `packages/ui/**` 导入任一候选。

**Step 4: 实现最小样本并跑真实浏览器**

Run:

```bash
pnpm test -- headless-contract
pnpm exec playwright test tests/e2e/headless-comparison.spec.ts
```

Expected: 两个候选各自产生明确的通过、失败和已知缺口；禁止用总分掩盖 Dialog Focus 或 Select 键盘的结构性失败。

**Step 5: 完成 ADR**

`docs/adr/0001-headless-base.md` 必须记录：候选版本、合同、运行证据、差异、选择、放弃理由、退出策略。若没有候选通过核心行为，ADR 结论应为“无胜者”，并停止公共 Select / Dialog 实现。

**Step 6: 清理边界**

ADR 有胜者后，公共 UI 只依赖胜者。败者样本可保留在明确的 `local-experiment` 中用于证据，但不得进入 Registry、Manifest 或生产依赖图。任何删除或依赖移除只在目标和 ADR 已确认后执行。

**Step 7: 条件 commit**

建议 message：`docs: decide headless base from controlled comparison`。

---

### Task 6: 用 ADR 胜者实现 Select 与 Dialog

**Files:**

- Create: `packages/ui/src/select/select.tsx`
- Test: `packages/ui/src/select/select.test.tsx`
- Create: `packages/ui/src/dialog/dialog.tsx`
- Test: `packages/ui/src/dialog/dialog.test.tsx`
- Create: `apps/playground/src/docs/components/headless-ui-page.tsx`
- Create: `tests/e2e/select-dialog.spec.ts`

**Step 1: 写公共 API 与可访问性失败测试**

Select 不建设搜索能力；长列表需求留给未来 Combobox。Dialog 提供 Title、Description、Content、Close 和固定操作区组合，不把“新建教材”业务字段写进公共组件。

**Step 2: 写关键路径失败测试**

覆盖 Task 5 的核心键盘与 Focus 合同，并增加：

- 嵌套在滚动容器时的弹层定位；
- Dialog 长内容的内容区滚动与底栏职责；
- reduced motion；
- danger focus；
- 关闭后触发器移除时的安全退化。

Run: `pnpm test -- select dialog`

Expected: FAIL。

**Step 3: 最小包装胜者**

Rain 组件负责视觉、token、追踪属性和公开组合 API；Headless 库负责底层行为。保留库自带状态属性，但 Rain 的 `data-state` 不得成为第二事实源。

**Step 4: 浏览器验证**

Run:

```bash
pnpm test -- select dialog
pnpm exec playwright test tests/e2e/select-dialog.spec.ts
```

Expected: PASS；保存键盘路径和 Dialog Focus 返回的可检查证据。

**Step 5: 条件 commit**

建议 message：`feat: add accessible select and dialog`。

---

### Task 7: 实现 Table Primitives 与 Statistic

**Files:**

- Create: `packages/ui/src/table/table.tsx`
- Test: `packages/ui/src/table/table.test.tsx`
- Create: `packages/ui/src/statistic/statistic.tsx`
- Test: `packages/ui/src/statistic/statistic.test.tsx`
- Create: `apps/playground/src/docs/components/data-ui-page.tsx`
- Create: `tests/e2e/data-ui.spec.ts`

**Step 1: 写失败测试**

Table 只覆盖语义表头、行、单元格、选择、状态、批量选择和 Empty slot；不建设 DataGrid、虚拟化、拖拽列或服务端查询。Statistic 必须把 Value、Unit、Label 分开，Data 字体只作用于数字和紧贴的西文符号，中文单位保持 PingFang SC。

**Step 2: 实现两种密度**

Compact 的 44px 表头 / 48px 行高只作为 VE-009 的起始证据，不是未经验证的永久硬编码；通过 density token 表达，并在页面对比可扫读性。Default 复用同一结构。

**Step 3: 验证**

Run:

```bash
pnpm test -- table statistic
pnpm exec playwright test tests/e2e/data-ui.spec.ts
```

Expected: PASS；表格交互与报告字体均有真实渲染证据。

**Step 4: 条件 commit**

建议 message：`feat: add table primitives and statistic`。

---

### Task 8: 实现四个 Layout 原语

**Files:**

- Create: `packages/layouts/package.json`
- Create: `packages/layouts/src/index.ts`
- Create: `packages/layouts/src/stack.tsx`
- Create: `packages/layouts/src/inline.tsx`
- Create: `packages/layouts/src/grid.tsx`
- Create: `packages/layouts/src/split.tsx`
- Test: `packages/layouts/src/layouts.test.tsx`
- Create: `apps/playground/src/docs/layouts-page.tsx`
- Create: `tests/e2e/layout-scroll-focus.spec.ts`

**Step 1: 写职责边界失败测试**

- Stack / Inline 只处理方向、对齐、换行和 token 间距；
- Grid 只处理列和区域分配；
- Split / Sidebar 只拥有 Pane 尺寸、折叠与外部滚动边界；
- Layout 不读取题目、课程、班级或教师状态；
- 共享包依赖图不反向指向 UI 业务组合。

**Step 2: 写真实浏览器行为测试**

至少覆盖：

- 主区与 Inspector 独立滚动；
- Pane 收起后焦点移至仍可见的恢复按钮；
- 打开后焦点不会跳入隐藏 Pane；
- Default 外壳可嵌 Compact 表格；
- reduced motion 下收起不依赖动画完成事件。

**Step 3: 最小实现与夹具**

用 VE-003、VE-009、VE-012 的区域关系作为证据；不复制固定 240 / 375 / 400px 为公共 API，改用有上下限的可配置尺寸。

**Step 4: 验证**

Run:

```bash
pnpm test -- layouts
pnpm exec playwright test tests/e2e/layout-scroll-focus.spec.ts
node scripts/verify-boundaries.mjs
```

Expected: PASS。

**Step 5: 条件 commit**

建议 message：`feat: add rain next layout primitives`。

---

### Task 9: 完成 Benchmark A 与 B

**Files:**

- Create: `apps/playground/src/benchmarks/compact-data-management/fixture.ts`
- Create: `apps/playground/src/benchmarks/compact-data-management/page.tsx`
- Test: `apps/playground/src/benchmarks/compact-data-management/page.test.tsx`
- Create: `apps/playground/src/benchmarks/default-large-form/fixture.ts`
- Create: `apps/playground/src/benchmarks/default-large-form/page.tsx`
- Test: `apps/playground/src/benchmarks/default-large-form/page.test.tsx`
- Create: `tests/e2e/benchmark-a.spec.ts`
- Create: `tests/e2e/benchmark-b.spec.ts`
- Create: `evidence/runtime/benchmark-a/README.md`
- Create: `evidence/runtime/benchmark-b/README.md`

**Step 1: 写失败的 Benchmark A 合同**

以 VE-001 与 VE-009 为正式来源，验证搜索/筛选、批量选择、Compact Table、Tag/状态、选中行、分页和右侧 Inspector。选择状态与当前行状态必须可区分；Inspector 独立滚动；工具栏不得使用页面级尺寸补丁。

**Step 2: 写失败的 Benchmark B 合同**

以 VE-014 为正式来源，验证长表单 Dialog、分区、单双列、上传占位、长文本、校验、视口内滚动与固定底栏。AI 智能识别/填充必须绑定具体分区，并提供生成中、成功、失败、撤销或人工确认的最小状态，不把 AI 按钮扩展成全局装饰。

**Step 3: 使用隐私安全 fixture**

Fixture 只能使用虚构课程、题目和作者；不得复制 VE-010 的联系方式、头像、履历或任何真实/疑似真实教师数据，也不得复制 Figma 示例 ID。

**Step 4: 最小高保真实现**

Benchmark 保持 `assetIdentity: local-experiment`。优先组合现有 UI / Layout；页面私有 Pattern 可以存在，但必须列出来源与待迁移项。不得为了还原单页向公共组件添加专属 props。

**Step 5: 验证并记录差异**

Run:

```bash
pnpm test -- compact-data-management default-large-form
pnpm exec playwright test tests/e2e/benchmark-a.spec.ts tests/e2e/benchmark-b.spec.ts
```

Expected: PASS；保存桌面运行截图、键盘路径、已知视觉差异。更新 Benchmark 的 `implementation` / `automatedVerification` 时，只反映实际结果；Human Gate 保持独立。

**Step 6: 条件 commit**

建议 message：`feat: implement compact table and large form benchmarks`。

---

### Task 10: 完成 Benchmark C 与 D

**Files:**

- Create: `apps/playground/src/benchmarks/complex-workbench/fixture.ts`
- Create: `apps/playground/src/benchmarks/complex-workbench/page.tsx`
- Test: `apps/playground/src/benchmarks/complex-workbench/page.test.tsx`
- Create: `apps/playground/src/benchmarks/report-key-data/fixture.ts`
- Create: `apps/playground/src/benchmarks/report-key-data/page.tsx`
- Test: `apps/playground/src/benchmarks/report-key-data/page.test.tsx`
- Create: `tests/e2e/benchmark-c.spec.ts`
- Create: `tests/e2e/benchmark-d.spec.ts`
- Create: `evidence/runtime/benchmark-c/README.md`
- Create: `evidence/runtime/benchmark-d/README.md`

**Step 1: 写失败的 Benchmark C 合同**

以 VE-003、VE-012、VE-009 为正式来源，验证 Task Bar、左侧上下文、主任务区、右侧 Inspector、独立滚动与 Pane 收起。Tree/ManageTree 的层级、发布、锁定、完成和批量语义留在 Benchmark 私有 Pattern，Split 不接管这些业务状态。

**Step 2: 写失败的 Benchmark D 合同**

以 VE-010 与 VE-007 为正式来源，验证报告标题、4 个 KPI、趋势、摘要和 AI 洞察；普通 KPI 的紫/青/蓝只是数据类别，不自动成为 AI token。数字与西文符号使用 Data 字体，中文单位使用 PingFang SC。

**Step 3: 最小实现**

避免建设真实图表平台。趋势可用语义化 SVG 或简单图表适配层，但必须有文本等价信息；证书轮播、真实教师档案、全产业链交互和后端数据均不进入范围。

**Step 4: 验证并记录差异**

Run:

```bash
pnpm test -- complex-workbench report-key-data
pnpm exec playwright test tests/e2e/benchmark-c.spec.ts tests/e2e/benchmark-d.spec.ts
```

Expected: PASS；保存运行截图、滚动/折叠/Focus 证据和差异说明。

**Step 5: 条件 commit**

建议 message：`feat: implement workbench and report benchmarks`。

---

### Task 11: 建立 Manifest 与源码 Registry 候选

**Files:**

- Create: `manifests/schema.yaml`
- Create: `manifests/foundations.yaml`
- Create: `manifests/ui/button.yaml`
- Create: `manifests/ui/input.yaml`
- Create: `manifests/ui/select.yaml`
- Create: `manifests/ui/dialog.yaml`
- Create: `manifests/ui/tag-badge.yaml`
- Create: `manifests/ui/surface-card.yaml`
- Create: `manifests/ui/table.yaml`
- Create: `manifests/ui/statistic.yaml`
- Create: `manifests/layouts.yaml`
- Create: `registry/rain-next.json`
- Create: `scripts/verify-manifests.mjs`
- Test: `tests/registry/registry-integrity.test.ts`

**Step 1: 写失败的 Schema 与引用检查**

每个公共候选必须声明 identity、maturity、description、useWhen、doNotUseWhen、anatomy、parts、variants、states、density、dependencies、tokens、compositionRules、modificationMode、accessibility、visualLineage、figmaMapping、sourcePath 和 migrationNotes。

**Step 2: 登记候选而非发布资产**

Registry 只描述源码文件和依赖关系；所有资产保持 `registry-candidate` 或更低成熟度，publication 为 `not-authorized`。Benchmark 私有组件不进入公共 Registry。

**Step 3: 验证**

Run:

```bash
node scripts/verify-manifests.mjs
pnpm test -- registry-integrity
node scripts/verify-boundaries.mjs
```

Expected: PASS；不执行 npm publish、Registry 发布或 Figma 映射写入。

**Step 4: 条件 commit**

建议 message：`feat: register foundation spike candidates`。

---

### Task 12: 执行 Day 9 跨 Benchmark 回归

**Files:**

- Create: `tests/e2e/keyboard-regression.spec.ts`
- Create: `tests/e2e/focus-regression.spec.ts`
- Create: `tests/e2e/density-regression.spec.ts`
- Create: `tests/e2e/typography-regression.spec.ts`
- Create: `tests/e2e/reduced-motion.spec.ts`
- Create: `scripts/audit-token-bypass.mjs`
- Create: `scripts/audit-traceability.mjs`
- Create: `docs/reports/foundation-spike-verification.md`

**Step 1: 先写会暴露违规的审计**

审计页面裸品牌色、近义圆角、任意阴影、未登记字体、丢失的 `data-rain-id` / `data-slot`、共享包反向依赖、Headless 混用和隐私 fixture。

**Step 2: 运行完整验证**

Run:

```bash
pnpm typecheck
pnpm test
pnpm build
node scripts/verify-evidence.mjs
node scripts/verify-manifests.mjs
node scripts/verify-boundaries.mjs
node scripts/audit-token-bypass.mjs
node scripts/audit-traceability.mjs
pnpm exec playwright test
```

Expected: 所有命令产生明确结果。任何失败都原样记录，不降低门槛、不写成“基本通过”。

**Step 3: 视觉证据检查**

对四个 Benchmark 生成固定视口截图，与对应 Visual Evidence 做人工可读的结构/密度/字体/表面差异表。像素差异或自动分数只用于定位，不替代 Human Gate。

**Step 4: 写验证报告**

`docs/reports/foundation-spike-verification.md` 分别记录：实现、单元/组件测试、浏览器测试、可访问性、视觉检查、未运行项、失败项、环境和证据路径。

**Step 5: 条件 commit**

建议 message：`test: run cross-benchmark spike regression`。

---

### Task 13: 形成 Day 10 决策与人工 Gate 材料

**Files:**

- Create: `docs/reports/foundation-spike-decision.md`
- Modify: `status/current-phase.yaml`
- Modify: `benchmarks/benchmark-registry.yaml`
- Modify: `evidence/visual-evidence.yaml`

**Step 1: 逐条判定 H1–H6**

每个假设只能写 `supported`、`partially-supported` 或 `rejected`，并链接实际证据。不得用文件数量或组件声明数量替代结论。

**Step 2: 做三选一结论**

- Continue：四类 Benchmark 和关键行为均有证据，架构值得进入下一阶段；
- Continue with corrections：基础方向成立，但必须先修正列出的结构问题；
- Stop / reset：出现密度分叉、Headless 无胜者、Layout 职责错误、页面硬编码主导等结构性失败。

**Step 3: 更新独立状态**

只更新已实际发生的轴：

- implementation；
- `automatedVerification`；
- Human Gate 改为 `awaiting_human`，不可自行改为 accepted；
- Figma material、Figma publication、package/Registry publication、business migration、local commit、remote Git 继续按真实授权记录。

**Step 4: 准备人工 Gate 清单**

人工评审至少比较四个 Benchmark 的品牌血缘、信息层级、密度、字体、Focus、AI 语义、滚动/折叠和已知差异。明确需要用户判断的问题，不把自动截图写成设计接受。

**Step 5: 运行最终新鲜验证**

Run:

```bash
pnpm verify
git diff --check
git status --short
```

Expected: `pnpm verify` 的实际结果被完整记录；Git 检查只说明本地工作区，不推导 commit 或远端状态。

**Step 6: 条件 commit**

建议 message：`docs: conclude rain next foundation spike`。只有 Local Git Commit 获授权时执行；创建 remote、push 或 PR 仍需另外授权。

---

## 2. 每日固定报告格式

每天结束时按独立状态报告：

1. 当前阶段与 Prototype / System Mode；
2. 实际修改文件；
3. 亲自运行的命令和结果；
4. 失败、未运行和尚未验证；
5. Visual Evidence / Benchmark / Implementation / Automated Verification / Human Gate；
6. Figma Material / Figma Publication / Registry Publication / Business Migration；
7. Local Git Commit / Remote Git；
8. Local Experiment、Registry Candidate 或 System Asset；
9. 下一个用户检查点。

## 3. 立即停止条件

出现以下任一情况，停止扩展实现并先报告：

- 当前阶段未授权依赖或运行时操作；
- Figma 来源与登记节点不一致；
- Headless 两候选均未通过核心 Focus/键盘行为；
- 为单个页面必须复制公共组件或新增大量页面专属 token；
- Compact / Default 需要两套实现；
- Layout 被迫接管 Tree、Table、Form 或业务状态；
- 真实/疑似真实教师或学生信息进入 fixture、截图说明或代码；
- 自动检查无法产生可信证据；
- 需要 Figma、包、Registry、业务或远端 Git 写入。

## 4. 计划完成定义

只有 Task 1–13 均按真实状态执行、四类 Benchmark 有运行证据、H1–H6 有明确结论并已准备 `awaiting_human` 材料时，才称“10 日 Spike 实施完成”。它仍不代表 Human Gate accepted、Figma 发布、Registry/包发布、业务迁移、本地 commit 或远端 Git 完成。
