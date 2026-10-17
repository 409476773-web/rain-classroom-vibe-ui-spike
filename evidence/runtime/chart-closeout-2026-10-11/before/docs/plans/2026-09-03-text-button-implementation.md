# TextButton 可交互验收页 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. 本会话采用 subagent-driven-development 执行，并在实现后按规格、代码质量两步复核；仓库的禁止 Git 写入规则优先，不创建分支、worktree 或 commit。

**Goal:** 把已确认的文字操作与链接规则实现为可点击的本地验收页面，保护已验收的普通 Button。

**Architecture:** 操作继续使用 `Button variant="text"`，不新增独立公共 TextButton。导航使用原生 `<a>` 的薄 Link recipe，输入框只消费现有 trailingAction。演示逻辑、模拟等待与帮助目的页留在 Playground；不接真实数据或权限。

**Tech Stack:** 当前已安装的 React / TypeScript / Vite、Rain Foundations、Vitest、Testing Library、Playwright；不新增依赖。

---

## 授权、边界与基线

- 用户已确认 [设计稿](2026-09-03-text-button-design.md)，并明确授权“开始 TextButton 的实现，做成可以亲自点击、体验和检查的页面”。
- 工作模式：System Mode，Button 文字变体与 Link recipe；验收页为本地示例，不成为正式业务 Template。
- 只新增 TextButton 本轮授权与独立实现/检查记录，Day 3 阶段及普通 Button 的已接受 Gate 保持不变；本轮 Human Gate 待人工确认。
- 不改 Input 的激活、清除、校验或输入逻辑；不改其他组件、全局色板、Headless、Figma、包发布、业务迁移或 Git 状态。
- 原有工作区尚无提交且含未跟踪文件，禁止清理。无关 Tailwind 方案文件保持原样。
- 开工基线：`pnpm typecheck` 通过；`pnpm test` 361 项通过；`pnpm test:e2e` 8 项通过。第一次浏览器检查因沙箱禁止本机端口失败，授权环境重跑通过，不视为组件缺陷。
- 验证：先看到新测试因能力缺失失败，再实现；最后运行完整验证、普通 Button 回归、真实浏览器检查。自动通过不替代设计师验收。

## 本轮公开使用方式与候选细节

### 不增加第二套文字按钮身份

```tsx
<Button variant="text">编辑</Button>
<Button variant="text" tone="brand" size="compact">查看结果</Button>
<Button variant="text" tone="danger" disabled>移除</Button>
<Link href="#text-button-help">使用帮助</Link>
<Link href="#text-button-help" appearance="inline">使用帮助</Link>
```

- 现有 `ButtonSize` 五档、`ButtonTone` 两色不变。
- `ButtonTextSize = "small" | "compact" | "regular"`；`ButtonTextTone = "default" | "brand" | "danger"`。
- `ButtonProps` 使用条件类型：普通分支保留原 API，text 分支仅接受文字三档尺寸、三色；不支持 text 的 block，不给普通按钮新增 brand 色。禁止独立 `TextButton` export。
- 候选默认：Compact→compact（13/24），Default→regular（14/26）；small（12/20）显式选择。这里只确定可运行映射，不登记像素验收通过。
- Link 为真正锚点，`href` 必须存在；`appearance` 为 standalone（默认）或 inline。首版不提供 Link 的 loading、disabled 或 tone，也不通过按钮模拟导航。
- 独立 Link 使用 14px/20px 字体、26px 候选高度和左右 6px 候选留白；正文 Link 继承正文排版，不套固定高度或按钮留白。`target="_blank"` 自动补充可见的“（新标签页打开）”提示，并合并 `noopener noreferrer`。

### 不改普通 Button 的候选样式

- 文字操作：平时 border=0、透明底、自然完整宽度、字重 400，左右各 6px；不继承普通按钮的最小宽度和省略号。
- 灰蓝取 Classic `#56688F`，主题蓝复用普通 Button 次级文字 `#0F55DF`，危险红复用 `--rain-button-danger-text`（`#C9343F`）。通过独立组件 token 映射，不改变 Foundations 42 色角色或主品牌蓝。
- 默认/突出浅底候选：白色任务面与品牌蓝混合 4%（hover）/8%（pressed）；危险浅底候选：白色任务面与既有危险实心背景混合 6%/10%。使用不透明浅底，检查小字号文本在每个状态的对比；不直接照搬普通 Button 较浓的浅底。
- 禁用仅前景约 30%，根节点 opacity=1，不把焦点和整个控件一起淡化；禁用不响应鼠标/键盘。
- 加载复用 Button 的同一 PNG 与 800ms 转动，保持原色与根 opacity=1；沿用已有左替换、隐藏右图标、可选 loadingLabel、防重复与保留键盘位置。布局变化必须实测并如实记录，不新造全局防跳动方案。
- 几何候选：12/13/14px 字号对应 20/24/26px 高度、14/18/20px 行高；圆角 6px，上下约 3px；左图标/加载 14/16/16px，间距 4px，右图标 12px。来源是 Classic，候选不是已确认精确值。
- 键盘：细蓝 1px 轮廓加 20% 浅蓝外圈；高对比度保留系统可见轮廓，减少动效时不转动。不修改全局 focus。
- Link 平时主题蓝、hover 与 active 候选仅加深文字，无底；visited 保持蓝。独立入口不加线，正文常驻细下划线，换行仍可看清。

### 输入框示例的策略，不上升为整个 Input 的新规则

- 常驻一个文字操作，空输入或“模拟不可用”时显式 disabled，保留位置；不使用 clearable，避免混淆尚未讨论的叉号。
- 演示“检查”只校验本地演示文案，模拟等待后显示结果，不请求后台。
- 输入与文字操作分别保留焦点；点击后不强制把焦点抢回输入框。加载期间仍可编辑输入，但结果只对应触发时的快照，文案明确说明。
- Enter 复用 Input 现有 IME 防护；演示仅在可用且非加载时触发同一动作。真实操作系统中文输入候选窗仍需设计师体验，合成事件检查不能替代。
- 两种密度分别使用紧凑/常规文字档；不改 Input 的既有高度、激活、清除或校验代码。

## Task 1：组件文字分支与真实 Link

**Files:**

- Modify: `packages/ui/src/button/button.tsx`、`packages/ui/src/styles.css`、`packages/ui/src/index.ts`
- Create: `packages/ui/src/button/button-text.test.tsx`、`packages/ui/src/link/link.tsx`、`packages/ui/src/link/link.test.tsx`
- Protect: `packages/ui/src/button/button.test.tsx`、`packages/ui/src/button/assets/button-loading.png`、Input 及 Foundations 全部实现

**Step 1 — Write failing tests:**

- text 的三色/三尺寸及默认密度、必需文字、非法尺寸/颜色/block 的类型反例。
- 原生按钮键盘、ref、禁用、loading 防重复、左右图标替换、loadingLabel、可见状态及追踪属性。
- Link 原生语义、href/ref/原生属性、inline/standalone、默认同页、另开提示与 rel 合并；禁止不支持的 Link API。
- 样式检查 text 不继承普通 border/min-width/weight/ellipsis/root opacity；保留普通 Button 原测试。

**Step 2 — Verify RED:** `pnpm test packages/ui/src/button/button-text.test.tsx packages/ui/src/link/link.test.tsx`。记录预期缺失能力失败；新模块缺失先写出明确测试后实施，不把导入拼写错误当作有效行为证明。

**Step 3 — Implement minimal code:** 按上面的条件类型扩展现有 Button，不复制 loading 逻辑；新增 Link 薄 recipe；CSS 仅新增限定 text / rain-link 的规则与组件 token，不修改普通 Button 原规则。`data-rain-id="ui-button"` 与 `data-variant="text"`；Link 使用 `ui-link` 与明确 parts。

**Step 4 — Verify GREEN:** `pnpm test packages/ui/src/button packages/ui/src/link`、`pnpm typecheck`。先规格复核，再代码质量复核；修正后复核。

**Step 5 — Checkpoint:** 不提交 Git。报告 core 变更与检查，再进入验收页。

## Task 2：可操作的独立验收页

**Files:**

- Create: `apps/playground/src/docs/components/text-button-page.tsx`、`text-button-page.css`、`text-button-page.test.tsx`、`text-button-icons.tsx`
- Modify: `apps/playground/src/app.tsx`、`apps/playground/src/docs/components/core-ui-page.tsx`
- Protect: 其他家族示例、页面全局样式、Input 原代码与现有 route-registry

**Step 1 — Write failing tests:** 新路由 `#text-button`、标题/状态说明、三色三档四种组合、真实点击结果、切换禁用、模拟加载、防重复、两种密度 Input 常驻/Enter/IME、默认同页与新标签页链接。

**Step 2 — Verify RED:** `pnpm test apps/playground/src/docs/components/text-button-page.test.tsx`，新页尚未提供上述能力。

**Step 3 — Implement:**

- 一张清楚的浅色组件验收页，无侧栏、复杂导航、额外 Card 系统或真实业务模板；沿用 Rain 字体/色彩，页面所有文案中文可理解。
- 页首“设计已确认 · 效果待你验收”和“演示数据，不会连接后台或修改课程”；返回原组件页。
- 依次提供颜色与三态比较、三档尺寸、四种图文组合、可触发/结束的模拟加载、两种输入框组合、独立/正文链接以及窄空间长文案。
- 所有启用的演示操作给出可见且可播报的本地反馈；禁用不能操作。加载计时有卸载清理，不随机等待。
- 原组件页只增加清楚的 TextButton 验收入口，不变更普通 Button 的视觉示例。
- 同页与新标签页链接指向本机 `#text-button-help` 演示目的页，有明确返回入口；不打开真实课程或后台。
- 图标只读复用 Classic `src/icons/edit.svg` 与 `src/icons/chevron-right.svg` 已登记几何；仅把固定填色改为 currentColor。来源登记在 fixture 注释与最终报告，不新建公共 Icon/Registry。不得用 Unicode 或临时自绘 SVG 占位。
- 保留四种组成各自独立点击区域；双侧示例左 edit 表识别，右 chevron 表展开，用简单本地披露区域，不实现 Popup。

**Step 4 — Verify GREEN:** 专项页面测试、类型检查、路由旧测试。规格复核通过后再代码质量复核。

**Step 5 — Checkpoint:** 不给人工检查打勾，进入真实浏览器验证。

## Task 3：限定授权、浏览器检查与交接

**Files:**

- Modify: `status/current-phase.yaml`、`scripts/verify-boundaries.mjs`、`scripts/verification-helpers.mjs`、`scripts/verification-helpers.test.ts`
- Create: `tests/e2e/text-button.spec.ts`、`docs/verification/2026-09-03-text-button-implementation.md`
- Evidence: `evidence/runtime/day-3/text-button-*.png`（仅本地虚构内容）
- Modify: 设计稿仅追加本轮授权与交接链接，不覆盖已确认规则和未勾选的人工清单

**Step 1 — Failing checks:** 为精确 TextButton 细分授权写验证测试，拒绝失配范围与过早 Human Gate；扩展精确文件名单，不放开目录。新增浏览器测试先看到新页面/样式未实现失败。

**Step 2 — Minimal governance implementation:** 以独立 `componentRefinements.textButton` 记录授权、实现、自动检查和人工状态；现有 Day 3、Button accepted 与其他 Gate 均保持。新增文件仅随该精确授权可用；不移除任何依赖、阻塞层或全源检查。

**Step 3 — Browser verification:**

```sh
pnpm test:e2e tests/e2e/text-button.spec.ts
pnpm verify
pnpm verify:reuse-audit
```

- 真鼠标 hover/pressed 和真实 Tab/Enter/Space；disabled 与 loading 不重复执行。
- 三色文本对比、三尺寸几何、前景淡化、原色加载、800ms canonical mask，完整标签不省略。
- 两密度 Input 的常驻、禁用保位、焦点协作、加载快照/Enter/IME 防护，整体不遮挡。
- 真链接、正文换行、无底/下划线、目标提示、浏览器后退/新页；新页焦点规则。
- 1440 宽桌面与 375/320 窄屏、放大场景；forced colors、reduced motion。
- 重新运行原 8 项浏览器用例，不降低普通 Button 验收断言。

**Step 4 — Independent reviews:** 规格逐条对照设计 TB-01…TB-14，再独立代码质量审查；有重要问题则修复与重测。没有 commit 范围时读实际文件和本轮变更清单，不编造 SHA。

**Step 5 — Handoff:** 保存本轮结果、来源与候选差异，打开 `http://127.0.0.1:5173/#text-button`；如原服务不可用，启动明确的本机服务。只在检查完成后记录本轮 implementation/automated 状态；Human Gate 为 `awaiting_human`。不登记发布或生产完成。

## 执行记录

- [x] 开工前检查与普通 Button 基线（361 单元测试、8 浏览器测试、类型检查）。
- [x] Task 1：Button 文字分支与 Link recipe；规格复核通过，质量复核发现的新标签页读屏提示已修复并复核，67 项核心测试与类型检查通过。
- [x] Task 2：7 区可点击验收页；26 项页面测试通过，规格与独立质量复核通过；长操作和窄空间正文链接示例已补齐。
- [x] Task 3：精确授权、完整验证与浏览器交接；全量验证通过（Vitest 488 项执行、Chromium 18 项）、复用审核通过，桌面/窄屏截图已检查，5173 体验页已打开。详见 [实施与验收记录](../verification/2026-09-03-text-button-implementation.md)。
- 人工视觉验收：未开始，等设计师实际体验后单独确认。
