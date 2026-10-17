# Tag 第三批 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 在真实 Tag 页面交付独立 TagSelect，以及自定义标签选择、创建、改名改色和解除关联的完整操作流程。

**Architecture:** TagSelect 直接组合已选定 Base UI Select 与既有 Tag 完整 Recipe；管理流程是页面内可复制的组合，使用 Base UI Popover、现有 Tag / CheckableTag / Input / Button。标签定义由稳定 ID 标识，与对象关联分开；不建立新的 Pattern 包或弹层控制器。

**Tech Stack:** 当前 React、TypeScript、Tailwind、Base UI 1.8.0、Vitest、Playwright；Base UI 从已有 Playground 依赖扩展至精确的 UI 消费包，不增加第二套底座。

## 1. 授权与当前范围

- 2026-09-09，用户在颜色目录第一阶段验收后明确要求“继续建设tag的下一步”。本轮进入第三批实施，沿用[流程草案](2026-09-09-tag-batch-three-design.md)中已经展示的默认流程。
- System Mode；TagSelect 为 managed Registry Candidate，管理组合为页面 local-experiment。真实体验仍留作本批 Human Gate，不将本轮指令写成完成后的体验确认。
- 默认勾选立即更新关联并保持面板打开；创建、选色、管理与编辑在同一面板中完成。第一版只实现此默认，不同时维护“点确定统一应用”的第二套状态。
- 前两批视觉、颜色目录验收及旧 Tag 对比度记录保持独立。颜色 ID / RGBA、原有 Tag 几何、全局 Focus 不在本批重设。
- Figma、包或 Registry 发布、业务后端、迁移、Git 及其他组件迁移不在本轮范围。

依据：[AGENTS](../../AGENTS.md)、[阶段状态](../../status/current-phase.yaml)、[Tag 设计](2026-09-08-tag-design.md)、[复用矩阵](../../evidence/rain-classic/reuse-matrix.yaml)、[ADR 0005](../adr/0005-headless-base.md)。

## 2. 实施合同

### TagSelect

- 有限本地 `options`：`value: string | number`、`label: string`、`color: TagColor`、可选 `disabled`。
- `value + onValueChange` 与 `defaultValue` 二选一；必须存在有效当前值。0、空字符串、数字 1 与字符串 "1" 各自保留，拒绝非有限数字、重复或失效身份；不自动选第一项。
- 独立 `open/defaultOpen/onOpenChange`，受控与非受控不混用；`size: 20 | 24 | 28` 默认 24，`appearance: filled | outlined | solid` 默认 Filled；支持 disabled、可访问名称、前图标和声明的 Local Recipe 部件。
- 新选项触发一次值变更并关闭；重选当前项只关闭。禁用项跳过，键盘活动项与已选项分开；Escape 返回触发器，Tab 与外部点击保留正常离开路径。
- 本步不加入多选、清空、创建、远程状态或搜索框；Base UI 原生文字导航保留。中文组合输入期间 Enter 不激活。
- Trigger 使用既有 Tag 颜色与完整尺寸；弹出候选用 Background/Neutral/1、已有 Neutral / Brand 角色、Space / Radius / Shadow，选中勾为正式图标。
- Portal 读取触发器所在的 `data-rain-theme`，打开时及主题变化时同步；定位、碰撞、外点、Escape 与回焦交给 Base UI。精确记录局部浮层层级和尺寸上限，不新增全局层级或几何 Token。

### 自定义标签组合

- `definitions: { id, name, color }[]` 与当前对象的 `value: string[]` 分开；20 色名称来自当前 Foundations 检索信息。
- 搜索复用现有词表；选择复用 CheckableTag 的原生 checkbox；选色使用其原生 radio。管理行的“编辑”位于单独的管理视图，不嵌入选项。
- 创建与编辑通过明确回调返回正式定义，宿主持有词表；关联由 `onValueChange` 交给宿主。示例只使用本地模拟数据和延迟，不接真实课程服务。
- 当前课程示例采用 trim 后非空及不区分英文字母大小写的同名规则；这仅是示例业务规则，不成为公共 Tag 不变量。
- 创建成功后选中返回 ID；编辑保留原 ID，并同步其他示例对象的引用。× 只解除当前关联，词表仍保留。
- 提交中锁定重复提交与编辑输入；失败保留名称、颜色及错误，允许重试。关闭面板不会重新打开或抢焦点；异步结果不得回写已经卸载的对象组合。
- 搜索、切换视图、创建 / 编辑、关闭与移除均有明确焦点与状态反馈；区域内错误替代私有 Toast。

## 3. 逐项实施

### Task 1：精确登记与底座接入

修改 `status/current-phase.yaml`、`scripts/verification-helpers.mjs`、`scripts/verify-boundaries.mjs` 及对应阶段测试；声明本批确切文件、UI 的 `@base-ui/react: 1.8.0`、TagSelect 的 `/select` 和页面组合的 `/popover` 导入。其他包、文件和历史阶段继续拒绝 Headless 导入。

先用 `scripts/tag-batch-three-governance.test.ts` 复现缺少授权合同，再实现最小增量；同步锁文件并检查冻结历史副本。保留工作区已有任务，不创建 Git 工作树或提交。

### Task 2：TagSelect

新增 `packages/ui/src/tag/tag-select.tsx`、`tag-select.styles.ts`、`tag-select.test.tsx`；按需要追加 `packages/ui/src/styles.css` 的精确机械样式，导出至 `packages/ui/src/index.ts`。

先检查合法 / 非法值、受控 / 默认值、重选不重复、禁用、独立展开轴，再实现组件。复用 `getTagRecipe`，不复制已有颜色表。扩展 Typography 的精确组件身份及样式消费者声明，只有 TagSelect Solid 标签继承已有 700 规则。

### Task 3：完整管理组合与页面

新增 `apps/playground/src/docs/components/tag-management-recipe.tsx`、`tag-management-recipe.test.tsx`、`tag-flow-examples.tsx`；在现有 `tag-page.tsx` 接入，页面样式追加到 `tag-page.css`。

测试先覆盖选择、隐藏候选仍保留关联、空名 / 同名、全部 20 色、创建稳定 ID、错误重试、重复提交、同 ID 编辑与多处引用、关闭期间完成、卸载及移除后的焦点。已有只展示删除 / 撤销的示例保留，不把它当作完整管理流程。

### Task 4：使用合同与颜色登记

新增 `manifests/ui/tag-select.yaml`、独立的 `registry/tag-select.json`，避免把前两批 Registry 的 accepted 自动扩给第三批。管理组合在 Tag 文档说明中保留 local-experiment 身份。

修改 `scripts/token-foundation-outputs.mjs` 和 `scripts/verify-token-foundations.mjs`，登记本批精确部件及页面 / Popup 父底；复用已有校验与 Tag 来源，不接受原有对比度例外。生成结果只由 `pnpm generate:tokens` 更新。

### Task 5：真实浏览器检查

新增 `tests/e2e/tag-batch-three.spec.ts`。用独立本地测试端口，保留用户正在查看的 4173 服务；截图写入 `evidence/runtime/tag-batch-three/`，不覆盖前两批。

覆盖键盘 / 鼠标、焦点、受控展开、同值重选、禁用项、三尺寸三外观、Light / Dark / 嵌套主题、主题变化后的 Portal、360px、边缘翻转、滚动容器、长名称、200% 文字与强制颜色；实际走完选择、创建、选色、同名、错误重试、编辑与解除关联。

中文输入先检查真实 React 事件守卫；操作系统 IME 和读屏只有实际执行才报告完成。页面自动检查不代替本批体验确认。

### Task 6：回归与交付

运行本批与受影响 Tag / Typography / 阶段测试、`pnpm verify:governance`、`pnpm typecheck`、`pnpm build` 和本批浏览器检查。测试失败先定位真实原因；不通过扩大白名单或删除原断言掩盖问题。

按 requesting-code-review 完成一次独立审阅并修复有效问题。更新[验证记录](../../evidence/runtime/tag-batch-three/verification.md)、精确范围、已运行检查和待验收内容；打开真实 `#tag` 页面供本批体验确认。

## 4. 当前检查点

2026-09-10：Task 1–6 的实现、自动验证和独立审阅已完成。14 个相关测试文件共 532 项分批通过，Tag 三批合计 15 项真实 Chromium 检查通过，类型、构建及完整治理通过。两项禁用 / 焦点问题已修复，200% 文字容纳、真实背景合成与旧批次回归均有检查；结果与限制见[验证记录](../../evidence/runtime/tag-batch-three/verification.md)。

2026-09-10 用户确认“好的，这一版视觉已经完成人工验收，没有问题。”，本批 Human Gate 登记为 `accepted`，精确范围为 `tag-batch-three-runtime-visual-only`；本版还包含所有关闭按钮末端留白减少 2px 的修订。交互保留既有自动验证结论，不从本次视觉确认推导真实 IME、读屏、业务服务或对比度通过。

原定三批功能建设已齐备。TagSelect 保持 Registry Candidate，管理组合保持 local-experiment；没有默认第四批。实际操作系统 IME / 读屏验证、真实业务接口与权限接入，以及公共资产发布分别按后续使用需要安排。短列表之外的本地搜索、标签合并 / 归档 / 排序和公共管理 Pattern 均等待明确场景。旧对比度问题未被接受；Figma、发布、业务迁移和 Git 写入未获得授权。
