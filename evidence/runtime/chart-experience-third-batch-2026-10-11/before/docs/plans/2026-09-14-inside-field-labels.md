# Inside Field Labels Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为现有 Input / SearchInput / Select 提供可选的框内固定标题，并应用于表格筛选栏，保持常规32px、紧凑28px单行同高。

**Architecture:** 在 FormItem 增加 `labelPosition="top" | "inside"`，默认 top。同一个字段上下文持有标题、ID、必填和校验信息；内部 InsideFieldLabel 复用该上下文，Input 与 Select 在自身框体内呈现真实标签，SearchInput 随 Input 复用。标签位置独立于 outlined / filled / underlined，原有编辑、搜索、弹层、选择与禁用逻辑保留。

**Tech Stack:** 既有 React、TypeScript、Rain Token、Base UI、Vitest、Playwright；无新增依赖。

---

授权来源：2026-09-14 用户确认讨论范围后明确“开始实施”。System Mode；继续现有 `.worktrees/card-v2`，不创建或提交 Git 分支。完整检查与独立审阅后准备人工验收，不自动关闭视觉或对比度 Gate。

### Task 1: 固定范围与回归基线

- 备份本次相关原文件到 `/tmp/rain-inline-label-before`；治理记录保存旧来源哈希，旧批次基线不改写。
- 阶段使用 `tableRn08.insideFieldLabels` 精确子记录；对应 Input / SearchInput / Select / FormItem manifests 更新可选能力。
- 范围不包含触发区域内搜索、多行标签新布局、日期选择器、全局默认尺寸或分页器变更。

### Task 2: 共享字段标题

- 修改 `packages/ui/src/input/form-item.tsx`，提供位置选项与内部标签部件。框外和框内只能出现一个真实 label，ID、字段名、help/message、required 继续由同一上下文提供。
- 修改 `packages/ui/src/input/input.tsx` 与 `packages/ui/src/select/select.tsx` 接入标签；Input 标签位于图标与输入区域前。Select 标题原始点击不重复触发 frame，原生 label 激活将动作交给真正的触发按钮。
- `formItemColors.inside` 使用 Text/Neutral/3；禁用标题继承既有禁用文字色。框内必填星号同样继承标题色，保留形状与原生必填语义；所有启用标题/星号仍按关键交互文字4.5验证，不新增例外。
- `packages/ui/src/styles.css` 仅补 `.rain-field-label { max-width: 50%; }`，内部文字截断并保留完整字段名/原生 title，防止长标题挤占全部值区域。复用已有间距和字体。
- 单元先红后绿：运行 `pnpm exec vitest run packages/ui/src/input/input-field.test.tsx packages/ui/src/select/select.test.tsx`。覆盖标签持久、label 激活、值/清空/搜索、上下文和权限；不复制旧测试。

### Task 3: 资料筛选与组件示例

- `apps/prototype/src/data-table-recipe.tsx` 两个 FormItem 显式采用 inside；控件32/28尺寸保持。配套 CSS 将状态字段的基础宽度由160px改为200px，容纳标题和“全部状态”。
- Input 与 Select 现有说明页各增加一个框内标题示例，并说明外部标题默认、单行多选摘要及筛选用途。现有示例保留。
- 多选工具栏沿用 summary / count 与 +N，不引入标签换行或新的搜索模式。

### Task 4: 验证与收口

- Browser plugin not available，按 frontend-testing-debugging 技能复用现有 Playwright。目标流程：`#table` → 输入查询/选择状态/切换密度与主题 → 标题始终在框内，值与操作响应正确，按钮同高；共享组件样本另外检查标签切换、长标题与权限。
- 更新 `tests/e2e/table.spec.ts`，新增 `tests/e2e/inside-labels.spec.ts` 与精简配置；截图/浏览器测量留在 `/tmp/rain-inside-label-browser`。桌面与320px、浅/深主题、两档尺寸，复核控件边界、标题与值颜色/位置、console、overlay、键盘与真实交互。
- 运行相关单元、`pnpm typecheck`、`pnpm verify:governance`、`pnpm build`、Table三引擎套件与新增专项；有必要时追加原Input/Select回归。只报告本批实际结果。
- 使用 requesting-code-review 进行独立技术复审，修复可复现问题。依仓库治理合同同步验证记录与状态；人工视觉/对比度接受保持独立。

## 执行结果（2026-09-14）

四项任务完成。FormItem 提供可选 inside，Input/SearchInput/Select 共用真实标签与字段语义；资料筛选栏及组件文档已接入。默认 top、既有 Select 搜索/多选表现、分页器与表格视觉规格保留。

相关家族与页面101项（包含核心61项）、定向治理23项、Table三引擎15项、专项三引擎两主题6种场景、完整治理、类型检查与生产构建通过。独立技术复核通过；框内标题及星号启用状态最低对比度5.303:1，无新增豁免。分批结果与记录见 [验证记录](../../evidence/runtime/inside-field-labels/verification.md)。人工视觉仍待验收，对比度接受与发布状态未变。

## 框内标题颜色续调（2026-09-14）

用户提供20:18截图并明确要求“框内固定标题的颜色可以更浅一些（跟正文进一步拉开差距）”。System Mode，限定共享 FormItem inside label：Text/Neutral/3 改为既有 Text/Neutral/4，Input、SearchInput、Select 同步继承；正文、占位、禁用与上方标题不变。此新决策替代上文首批的标题色选择，不覆盖首批测量历史。

验证沿用专项浏览器的颜色/交互与浅深主题检查、现有治理测试及 Token 单源生成核验；不新增组件或基础 Token。框内星号继续继承标题色，完整保留 critical/interactive 与4.5阈值；实际不足及弱色适用性如实登记 pending，不自动接受。截图与结果写入本批 evidence 的 lighter-color 续调记录。

2026-09-14 用户回复“确定，没问题。”，本轮框内固定标题的限定运行视觉已接受，见 [确认记录](../../evidence/runtime/inside-field-labels/visual-acceptance.md)。颜色待复核发现仍独立保留。
