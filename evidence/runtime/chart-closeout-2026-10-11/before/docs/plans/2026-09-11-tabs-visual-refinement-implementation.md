# Tabs Visual Refinement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 按逐项确认的方案修正 Tabs 三种外观的几何与状态表达，加入双行纵向、显式横向等分和按页面空间换向，并保留现有选择、More、焦点与面板行为。

**Architecture:** 扩展现有完整 Tabs 与 Foundations 配方；继续由 Base UI 管理 Tabs 行为，沿用现有 DropdownMenu、隐藏项目注册、连续区间和面板保留逻辑。响应式换向只改变同一 Root 的实际方向，不重建实例；新增尺寸通过 Token 源生成，CSS 仅补充已登记的 Tabs 结构规则。

**Tech Stack:** 现有 React、TypeScript、Base UI 1.8.0、Rain Token、受约束 Tailwind、Vitest 与 Playwright；不增加依赖。

---

## 授权、基线与执行边界

- 用户已逐项确认[设计输入](2026-09-11-tabs-visual-refinement-design.md)，并在汇总后回复“继续推进”；本轮进入该限定范围的修订实施。
- 工作模式为 System Mode，资产仍为 registry-candidate。运行视觉 Human Gate、真实辅助技术和发布保持独立。
- 当前工作区尚无可用提交基线，全部现有工作保留在原目录。以新的 source-baseline.json 与修订前现场证据对照，不创建提交、分支或普通 Git worktree。
- 本地基线：evidence/runtime/tabs-visual-refinement/source-baseline.json，包含 46 个实际文件；修订前截图位于同目录 before/。
- 不修改其他组件、全局颜色资格、全局 Focus、Rain Classic、依赖或历史 B2 合同；不进行 Figma、发布、迁移或 Git 操作。
- 技能中的提交、另开会话和等待批次确认步骤不用于本轮：用户已要求继续推进，当前会话按计划连续完成，并在有实质结果时汇报。

## 接口与几何决定

1. 纵向新增 labelLines: 1 | 2，默认 1；2 行强制左对齐，同组同高。三档单行 28／32／38，对应双行 46／52／60。
2. 新增 widthMode: natural | equal，默认 natural；仅实际横向时使用，包括纵向折叠后的横向。垂直方向不等分内容宽度。
3. 纵向新增可选 collapseBelow 正数，由页面显式给出可用宽度阈值。完整示例先以 560px 为局部候选：192px 导航 + 16px 分区间距 + 352px 正文预算；不把该数值升级为全局断点。
4. 同一 Root 保留用户请求位置与实际位置。折叠为 top 时恢复单行、横向键盘方向和 More，展开回原 start／end 时恢复纵向配方；不以新 key 重建。
5. 纵向 192px 列宽、左右各 16px 内容留白。左对齐混用图标时预留对应尺寸的图标列；全部无图标时取消该列。数量紧随名称区、不换行，和图标一起相对名称块垂直居中。
6. 底板每项背景内缩 3px，点击区间隔保留 2px，外围不重复加 padding；得到外围 3px、相邻背景 8px。单行背景高 22／26／32，双行 40／46／54。
7. 浅底 selected 与 selected-disabled 不再使用常驻轮廓；全局 Focus 保留。指示线厚度仍 2／2／3，两端使用圆头。
8. 新增双行组件高度 Token 与静态高度类；size 仍只有三个档位，不将 46／52／60 变成额外 size 值，不开放通用宽度或间距类。
9. 名称／数量宽度预算须能容纳真实混排。极长内容仍保留真实值与可访问说明；不能以隐藏溢出来掩盖整个 Tab 撑破导航的问题。

公开使用形式：

    <Tabs aria-label="课程设置" position="start" labelLines={2}
      collapseBelow={560} items={items} />

    <Tabs aria-label="内容分区" widthMode="equal" items={items} />

## 执行任务

### R0：登记本轮范围，保留旧结果

Files:
- Create: docs/plans/2026-09-11-tabs-visual-refinement-design.md、本文与 evidence/runtime/tabs-visual-refinement/source-baseline.json。
- Modify: status/current-phase.yaml、scripts/verification-helpers.mjs、scripts/tabs-governance.test.ts、manifests/ui/tabs.yaml。

1. 保存当前源文件校验值及修订前现场证据，历史 Tabs 结果不覆盖。
2. 在 Tabs 原授权内增加精确的 visualRefinement 记录，注明本次用户语句、范围、设计与计划；将本轮实现／自动检查／独立审阅重新置为进行中／未运行／未运行。
3. 先添加授权记录、精确文件登记及伪造范围的负向测试，确认新记录在旧守卫下失败，再扩展到本轮精确记录。旧 preflight 与 B2 历史保持通过。
4. 使用 pnpm test --maxWorkers=2 scripts/tabs-governance.test.ts 验证。

### R1：完整尺寸与状态源

Files:
- Modify: packages/foundations/src/tabs-token-contract.ts、同目录 tabs-token-contract.test.ts。
- Modify: scripts/token-foundation-outputs.mjs、scripts/generate-token-foundations.mjs、scripts/tabs-color-consumers.test.ts。
- Modify: packages/ui/src/tabs/tabs.styles.ts、packages/ui/src/utils/rain-class-names.ts。
- Generate: 既有 tokens.css、tailwind-theme.css、token-classes.generated.ts 与 token-foundations-v1.json。

1. 先验证双行高 46／52／60、底板 inset=3、列宽 192、内容留白 16，以及 Soft 不再有 selected border；观察测试失败。
2. 在单一 Token 源加入两行高度及静态类，仍保留三个 size 档位；更新精确高度合并规则。
3. 修改现有 Tabs 色彩消费源，使 Soft 边框不再登记为可见绘制；同步实际静态定义，其他颜色用途与资格保持原限定。
4. 运行 pnpm generate:tokens；不手工改生成 CSS。
5. 运行对应尺寸及颜色测试，确认新高度仅生成组件高度类、不能用于 width／gap。

### R2：纵向布局、圆头与全文入口

Files:
- Modify: packages/ui/src/tabs/tabs.tsx、tabs-full-label.tsx、tabs.test.tsx。
- Modify: packages/ui/src/styles.css，仅现有 Tabs 例外范围。
- Create: tests/e2e/tabs-visual-refinement.spec.ts。

1. 使用原有正式页面和长名称先添加浏览器回归：Tab／背景不得越过列宽、选中线与焦点完整可见、底板外围净距正确。先观察实际失败。
2. 增加单／双行、对齐、图标列及参数校验；用统一高度和受限名称宽度替代 min-content 撑宽。
3. 清除底板重复外围留白，保留 2px 点击区间隔；给指示线圆头。
4. 全文检测覆盖横向及纵向文字溢出，并检查祖先裁切；根因仍通过正确布局解决。
5. 触屏补偿以至少 44px 为目标，新增高度大于 44px 时不产生负留白。
6. 对所有三档、三种外观、左右方向及两个主题验证新布局几何；验证单行及无图标组没有额外空列。

### R3：等分、More 与响应式换向

Files:
- Modify: packages/ui/src/tabs/tabs.tsx、tabs-overflow.ts、tabs-overflow.test.ts。
- Expand: tests/e2e/tabs-visual-refinement.spec.ts。

1. 添加等分净宽、变窄后的 More、数量变化和已选／已聚焦项目显露的回归；观察旧实现失败。
2. 复用连续区间算法；以每项最小可辨认内容预算判断容纳数量，再将可用区域等分给实际可见 Tab。More 保持独立所需宽度，计算包含最后一个 Tab 到 More 的间距。
3. 新增 Root 宽度观察，只在页面指定阈值处更新实际方向；所有状态和内容身份保留。
4. 处理菜单打开期间换向，确保菜单、焦点和测量状态及时交接；外部焦点不被旧请求抢回。
5. 验证受控拒绝、延迟接受、菜单内／Tab 内／Panel 内／外部焦点，以及草稿在换向后保留。

### R4：正式页面与完整示例

Files:
- Modify: apps/playground/src/docs/components/tabs-page.tsx、tabs-page.css、tabs-page.test.tsx。
- Modify: manifests/ui/tabs.yaml、docs/plans/2026-09-10-tabs-design.md、docs/plans/2026-09-10-tabs-implementation.md。

1. 完整外观示例增加单／双行与自然／等分入口，在场景合适时显示对应选择；使用真实组件。
2. 设置场景改为统一双行和显式空间阈值，包含混用图标、数量与足够长的名称。
3. 既有测试检查区增加有限的真实回归场景，不创建平行伪实现。
4. 更新接口、尺寸口径及新旧视觉边界；旧计划标明历史基线与本轮替代关系，保留旧验证事实。

### R5：收紧并刷新当前守卫

Files:
- Modify: scripts/verify-tailwind-b2.mjs、scripts/verify-token-foundations.mjs、scripts/verification-helpers.mjs、scripts/verify-boundaries.mjs。
- Modify: scripts/tabs-governance.test.ts、scripts/tabs-color-consumers.test.ts、scripts/verification-helpers.test.ts、manifests/contracts/tailwind-b2.yaml。

1. 新高度和文件仅进入本轮精确登记；CSS 与实际 Tab／More 绘制路由的校验摘要按最终可审阅实现刷新。
2. 保留错误用途、弱色越权、伪造 metadata、移除 Focus、泄漏选择器、改变测量宿主的所有负向检查。
3. 如原有历史测试受登记变化影响，只修正与本轮增量直接相关的接线，不能放宽全局边界或改写冻结历史。
4. 运行 Tabs 定向单元检查和 pnpm verify:governance。

### R6：真实验证与独立审阅

Files:
- Modify: tests/e2e/tabs.spec.ts；保留原 864 态覆盖，更新确实已修订的几何预期。
- Expand: tests/e2e/tabs-visual-refinement.spec.ts。
- Create: evidence/runtime/tabs-visual-refinement/verification.md、independent-review.md、source-hashes.json 与实际截图／测量。

1. 所有本轮截图及事实写入新的修订目录，不能覆盖原证据。
2. 原状态矩阵覆盖字体、颜色、按下与焦点组合；新增布局矩阵覆盖全尺寸／外观／左右／主题的双行和横向等分，并补充真实长名称与图标／数量混排。
3. 在真实浏览器检查修订前的问题，特别是最小档、两端圆头、外围 3px、相邻背景 8px、焦点可见和省略号；并排比较浅底与二级按钮。
4. 运行完整 VITEST_MAX_WORKERS=2 pnpm verify。旧 Radix 对照中已标注 test.fail 的历史预期不作为新增失败，也不能掩盖实际新失败。
5. 完成独立审阅，处理真实发现并复测受影响范围。实现、自动检查、独立审阅分别记录；视觉 Human Gate 不自动通过。
6. 最后更新当前状态、校验源文件快照并重新运行必要治理检查，向用户提供实际预览和精确验收边界。

## 当前进度

- R0—R4：授权、Token、共用布局、换向与正式页面已实现，全部定向回归完成。
- R5：精确 CSS / 实际绘制摘要与新增证据登记已刷新，治理链通过；新增证据目录拒绝未登记文件的负向检查与历史夹具 232 项回归通过。
- R6：最终全链通过，85 文件／1261 项单元测试、223 项浏览器测试，包含 864 态及新增 72 组布局；原生滚动条、字体度量误提示与独立审阅发现已关闭。完整结果见本轮 verification.md。
- 新方案运行视觉：2026-09-12 用户明确回复“完成视觉验收”，当前版本的运行视觉 Human Gate 已通过；实际辅助技术：未运行；发布与 Git：未执行。

## 追加实施：默认限长指示线（2026-09-12）

- 目标／模式：按用户 09-11 明确要求和 24／28／32px 选择，在 System Mode 修改现有 managed Tabs；资产保持 registry-candidate。
- 范围：Tabs 尺寸 Token、默认 indicatorSize、纵向限长 CSS、正式预览切换、Manifest、相关测试与当前修订证据。旧 stretch 几何保持；Headless、Focus、颜色及其他外观不变。
- 验证：先用默认值回归确认旧实现失败；浏览器检查三尺寸、两主题、四位置、自然／等分、长短内容和两种长度选项；继续运行当前完整验证及独立审阅。
- 假设：最大值不等于强制固定值；纵向沿用项高作为原伸展长度。等分模式下 stretch 仍按原分配项宽计算。
- 证据：indicator-baseline.json 保留本次修改前的摘要；indicator-facts.json 与 indicator-light.png / indicator-dark.png 记录追加结果。此前 R0—R6 的通过事实属于追加修改前的快照，不能单独证明本次默认变化通过。
- 当前进度：实现、独立审阅及完整验证已完成。85 文件／1262 项单元、225 项浏览器通过，覆盖原 864 态、72 组布局及新增 96 组限长事实；12 组两种模式切换保留选中项与草稿。运行视觉 Human Gate 已于 2026-09-12 获用户确认；收尾治理与源摘要核对见验证记录。

## 运行视觉验收登记（2026-09-12）

用户明确回复“完成视觉验收”。本次按 System Mode 登记当前 Tabs 运行视觉确认，包含三种外观、三档尺寸、四方向、此前布局修订与两种蓝线长度方式（默认 24／28／32px 上限）。修改范围仅为当前状态、Manifest、Registry、精确验收守卫、相应测试及证据；组件源码与运行时视觉不变。

使用现有 humanGateDecision 方式记录用户原文、日期、运行视觉限定范围及证据入口。验收不会授予新的对比度例外，也不推进真实辅助技术、完整跨浏览器、发布、Figma、业务迁移或 Git 状态。验证方法为登记前后运行源码摘要一致，精确验收的正向／负向回归及治理链；上一轮完整运行结果保留时间与范围，不作为本次重新执行。

登记收尾：当前阶段、Manifest、Registry 已同步 accepted / tabs-runtime-visual-only；治理、421 项脚本回归、最终类型检查及受影响的 12 项 Tabs 治理通过，独立只读审阅通过。组件运行时未变化，源摘要已刷新。
