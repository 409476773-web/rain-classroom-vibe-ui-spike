# Drawer Refinement Implementation Plan

> **For Codex:** Execute the following tasks in this session, with test-first implementation and independent specification/code review. User authorization does not include Git operations or publication.

**Goal:** 将已确认的快速编辑、内容预览及三个关键状态落实到 Drawer 与 Playground，并保持现有四方向、模态、手势、吸附和消费方式。

**Architecture:** 复用 Base UI 1.8.0 的行为底座，公共组件只负责表面、固定首尾和正文滚动。新增最小的 `DrawerBody` 原生部件；编辑／预览切换、草稿、校验、模拟保存、失败和退出确认留在演示宿主。G6 原有证据封存，本轮建立有限后继证据，不将并发会话页差额纳入 Drawer 修改授权。

**Tech Stack:** React 19、TypeScript、Base UI 1.8.0、现有 Rain Foundations/UI、Vitest/Testing Library、Playwright 与 Codex 内置浏览器。沿用 `.worktrees/card-v2` / `codex/card-v2`，无新依赖。

## 当前授权与验证边界

- 用户先要求调研，再要求制作桌面／移动视觉方案，视觉阶段明确“暂时不改组件代码”。
- 2026-10-14 最新指令为“确定. 继续下一步”。本轮依据连续升级任务，将该指令理解为视觉确认后进入本计划的实现阶段。
- 已确认对象仅为 `outputs/drawer-visual-proposals-2026-10-14` 中展示的 Drawer 视觉与组合方向，不将其转记为新运行组件、全库、对比度或生产验收。
- 模拟保存与附件示例均须在演示文档外层标明；没有真实课程发布或服务连接。新运行版本的人工视觉 Gate 保持待确认。

## Task 1：冻结前态与有限差额

**Files:** 新建 `evidence/runtime/drawer-refinement-2026-10-14/` 中的 baseline、before 快照、授权引用与前置验证记录；保留所有原 G6 证据。

1. 保存本轮前当前 G6 来源文件、phase、旧 source-bindings/color ledger 等摘要；记录源文件的实际当前 hash，而不是将旧绑定当成当前事实。
2. 记录已有三个会话页差额：`g6-conversation-pages.tsx/.css/.test.tsx`。本轮只观察，不修改或重新接受。
3. 原 G6 固定 source-lock、baseline、before、原 color ledger、source-bindings、完成 proof 和12家族 Gate 不回写。
4. 只有为合法 Drawer 后继所必需的校验入口可以有限扩展；新桥必须拒绝扩大路径、未知 phase、旧 Gate 修改和未登记 paint，且保持上述并发差额可见。

## Task 2：最小公共结构与表面

**Files:** `packages/ui/src/drawer/drawer.tsx`、`drawer.css`、`drawer.test.tsx`。

1. 先补部件/ref/原生滚动事件、controlled snap、既有语义与关闭拦截测试，观察新增行为缺失导致的失败。
2. 新增 `DrawerBody`，转发原生 div 属性/ref。提供 `flex:1/min-height:0/overflow:auto` 与一致的阅读边界；不添加 dirty、save、headerActions 或第二个焦点引擎。
3. 首尾固定并对齐，标题保持16/24/600，正文14/22、长阅读15/26；Header 默认左对齐，桌面横24、窄屏横16。
4. 纵向桌面贴边、居中受控宽度，窄屏通栏；保留现有 style/className 状态回调、侧向几何和四方向 movement/stack 公式。680px 是本组件本轮几何选择，不新增全库尺寸 Token。
5. 把 snap 可见空间扣减从页面补丁移到公共容器配方；Popup 上解析引擎 non-inheriting offset，再传给 Content。带把手、隐藏把手、短屏都要检查，避免固定 Footer 落在可见区域之外。
6. 把手视觉缩为40×4，操作提示区域与可见线分别处理。沿用中性 Token 与圆角；遮罩保持既有语义色，取消普通编辑中不必要的模糊。头尾滚动边界由宿主状态表达。

**Check:** `pnpm exec vitest run packages/ui/src/drawer/drawer.test.tsx`；后续浏览器验证固定首尾与正文滚动、方向和 snap。

## Task 3：真实可操作的任务样板

**Files:** `apps/playground/src/docs/components/g6-interaction-pages.tsx/.css/.test.tsx`；只改 Drawer 相关函数与样式，OTP/Carousel 原功能保留。

1. 先补并运行失败测试：两项 RadioGroup、同一 Drawer 内预览返回、Esc/取消/关闭的 dirty 确认、安全焦点返回、失败保留与重试、保存中拒绝退出和重复提交。
2. 编辑采用 FormItem＋36px Input、FormItem＋Textarea、RadioGroup；底部取消／保存草稿。关闭 IconButton 用正式 close、36/20；容器展开操作归入头部。
3. 在同一 Root/Popup 内切换编辑和内容预览，保存草稿与编辑吸附位置；返回编辑恢复预览入口焦点。内容预览只显示一次对象名称，正文 Reading，元信息轻量文本，附件使用既有 Attachment 组合。
4. 只在 dirty 时使用现有 AlertDialog 请求明确决策。安全动作初始焦点；取消只回编辑，确认放弃才恢复已保存值并关闭；与父 Drawer 的最终焦点返回协调。
5. 表单校验先阻止空标题并聚焦该字段。异步保存使用宿主提交快照、同步 pendingRef 防重复与所有关闭入口；失败保留草稿，Alert 持续靠近操作，重试成功才更新 saved 并关闭。模拟计时器卸载清理。
6. 演示外层提供“正常保存／首次失败”和“默认／长内容”可重复样本选择，不把测试开关或内部说明写进业务面板。无真实文件时附件动作不制造伪下载。
7. 保留四方向、非模态、trap-focus，以及 Carousel-in-Drawer 的现有验证场景。
8. 2026-10-14用户实际页面反馈：普通关闭统一为Header右上角IconButton，移除方向/记录/阅读示例的底部大关闭按钮；阅读内Carousel行为与内容不变，Footer仅保留任务操作。

**Check:** `pnpm exec vitest run apps/playground/src/docs/components/g6-interaction-pages.test.tsx packages/ui/src/drawer/drawer.test.tsx`。

## Task 4：合同、Registry 与后继校验

**Files:** `packages/ui/src/drawer/README.md`、`manifests/ui/drawer.yaml`、`registry/g6-assets.json` 的 Drawer 项、`docs/ai/g6-components.md`；独立后继校验与测试按 Task 1 的有限范围登记。

1. 同步真实新增 Body 的 Parts/exportNames 与布局用法；`packages/ui/src/index.ts` 已 wildcard 导出，无需修改。
2. 修正 Base UI 1.8 的 `data-base-ui-swipe-ignore` 文档：按属性存在忽略整个区域，不解析轴值。
3. 附本轮视觉确认来源及新运行版本的验证范围；不提升成熟度、人工、对比度或发布状态。
4. 为两个改动 CSS 的实际新增/移除 paint 建立独立有限颜色记录，保留来源角色与待复核状态，不改原 G6 color ledger。
5. 回归已有 G6/闭环校验并如实记录前置并发差额；不通过重新绑定全部 G6 来消除不属于本轮的失败。

## Task 5：运行验证与独立审阅

**Files:** 新建 `tests/e2e/drawer-refinement.config.ts`、`drawer-refinement.spec.ts`；输出只写本轮 evidence，不覆盖原 G6 E2E 目录。

1. 类型检查和 Playground 构建；运行 Drawer、样板、有限后继和相关治理测试。
2. 浏览器覆盖1440×900、390×844、短高度；查看打开、单层预览返回、dirty三类关闭入口、安全取消/确认放弃、失败/重试、pending拦截、长正文、snap可达和方向基本回归。
3. 在内置浏览器实际观察标题/关闭、字段起点、Radio并列、底部按钮、Alert/确认层、长正文边界与附件。保存当前版本截图。
4. 先进行规格审阅，再进行代码质量审阅；处理发现并重验相关项。
5. 写 `verification.md`：列实际通过的范围和已存在的全局失败，保留真实触摸、软键盘、Safari/VoiceOver、全库对比度与新运行版人工视觉确认的边界。

用户授权的实现任务将在本会话继续执行，无需再次选择执行方式。

## 2026-10-15 已确认的视觉与交互修复

用户明确要求“开始按照分析，修复视觉与交互”。本次在现有 worktree 内执行页面 Local Experiment，公共组件、Token、旧证据与 Gate 不变。

1. 先补回归：整行点击、当前项重复点击不重置、返回任务恢复阅读位置、宽度上限保留列表、平板右侧通栏；要求、表格行数和宽度独立变化。
2. 头部保留标题、课次、调宽和关闭，移除顶部手势柄；列表降低重复选中强调，底部翻页集中成组。
3. 根据列表实际左边界给它保留280px及24px间隔，调宽仍复用 Rain Resizable；不再用固定80%挤压列表。<=768px按右侧通栏查看。
4. 属性与正文限制阅读宽度，表格使用全部空间；明确显示横向滚动提示、预览行数及查看全部入口。任务切换按对象保存阅读状态。
5. 构建当前8768演示，运行相关交互测试、类型检查，并实际检查桌面正常/宽版、平板与手机、拖动/键盘调宽、长内容及弹窗编辑；记录实际结果，不将自查标记为人工验收。

设计依据：本会话对当前页面与 Fluent 2 Drawer、Ant Design Drawer 实例、Linear/Notion官方图的只读比较；Rain Designer v0.2.1及本库原型接入约定。具体视觉仍消费 Rain Tokens，不移植参考产品皮肤。

### 本次实现与检查记录

- 修改：`g6-task-details-drawer.tsx/.css/.test.tsx`、`g6-drawer-width-control.tsx`及本页场景说明；8768演示的`interactive-src/main.tsx`明确草稿编辑示例与任务列表独立，并重建其静态产物。公共Drawer/Resizable/Button实现、全局Token与原G6证据未改。
- 要求、明细行数和宽度独立；全行点击；当前项重复点击保持阅读；返回任务恢复正文展开、纵向位置、表格范围及横向位置。窄窗口通栏时复用现有模态焦点管理，桌面列表仍可操作。
- 回归先复现失败：宽度上限、平板布局、独立展开与阅读保持；浏览器追加发现横向位置丢失，新增失败回归后修复。最终3个相关测试文件共26项通过；Playground类型检查通过，8768静态构建成功。构建仍有大于500kB的分块提示，未在本轮调整全库导出或拆包。
- 浏览器1280×720：默认480px；展开后实测847px，列表280px、两区间隔24px；拖动100px后详情747px；方向键有效，End至360px、Home至847px。要求展开与8组明细分别生效；重复点击保持720px纵向位置，首次进入另一任务为0，返回恢复720；表格横向179px切换返回仍为179px。
- 浏览器390×844：实际页面宽390px，通栏右侧详情宽390px，文档未横向溢出；无调宽入口，关闭处Shift+Tab回到末尾可用操作，翻至末项禁用后一项并聚焦前一项。772px窗口另观察到详情419px、列表280px及24px间隔，窄详情中的属性改为单列。
- 截图保存在原演示目录下`visual-interaction-fix-2026-10-15/`。这些是本次局部自查；新运行视觉仍待用户确认，真实触控、Safari/VoiceOver和全库对比度未验证。本次无发布、Figma写入、业务迁移或Git提交，未提升候选状态、重绑旧证据或关闭Human Gate。
- 最终742×747窗口检查：右侧通栏详情首尾与表格提示可见；关闭后编辑弹窗宽616px，预览与返回编辑保持一个Dialog，未修改草稿即可关闭。交付截图为`current-window-742.jpg`及`mobile-390.jpg`，保留最新页面供用户检查；临时尺寸覆盖已重置。
