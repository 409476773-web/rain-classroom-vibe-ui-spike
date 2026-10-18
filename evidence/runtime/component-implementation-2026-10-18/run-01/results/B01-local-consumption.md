# B01 扫描器与局部消费者结果补充

本文件由 baseline_audit 分工完成；公共 Tabs 四方向/Light/Dark/NavigationBar 由整合者执行并写入 B01 总结果。本补充不会将未测的 B01 总 gate 写为通过。

状态：扫描器边界与当前 8 处局部真实消费 fixed-and-verified（L/I）；旧 chart-theme.css 对应第 9 处 not-reproduced-with-evidence / source-only。Human Gate：not-evaluated；Publication：保持原状。

## 输入、真实原因与已确认任务差异

基准 HEAD `6a2364c8b0325a243b2de8ebe12361e305aab333`，指定工作区 `github-review-20261017`；B00 已有 12 处变量消费修复，不恢复错误变量来制造本轮 red。本批先扩展窄回归再实现。

原扫描器只在全树找名字，孤立样式定义可错误满足未导入的消费者；只有 CSS block comment 被去除，JS comment 会误计引用；未明确区分懒加载、第三方 fallback、作用域与实际加载。新增 5 个边界先失败，当前共 11 个测试通过；不存在的 Rain 名称即便有 fallback 仍失败。

真实入口扫描发现 `drawer-refinement-consumer.tsx` 与两个 Bklit 入口缺 `motion.css`，图表目录还缺使用公共 UI 组件时的 `ui/styles.css`。`entry-browser-red-02` 在真实 Chromium 计算值确认三入口 feedback/overlay/region/ease 皆空；图表目录实际有 62 个 Rain Button，公共 field style 未注册。该页本次没有 InputNumber 实例，因此只主张 CSS 依赖闭包缺口，不主张已重现 InputNumber 可见错误。补齐 4 行导入后值分别为 `140ms / 180ms / 220ms / cubic-bezier(0.2, 0.8, 0.2, 1)`，field style 已注册，页面壳层与可见控制未见异常。

计划第 9 处 `apps/prototype/src/scenarios/bklit-validation/chart-theme.css` 已无 TS/CSS import；当前页面使用 `@rain-next/ui/charts/styles.css`。扫描报告将其列为 `unreachedSources`，真实页面未挂载旧样式，也没有 `.rain-chart summary` 消费对象。保留旧源码修正，不为了评测重新引入旧主题或制造对象。

## 本批改动文件

- `scripts/verify-css-variables.mjs`：沿实际 package exports、静态 JS/TS import/export、字面动态 import、CSS @import 建立每个入口依赖；使用仓库现有 Vite parser，未增加依赖。JS/CSS 注释处理保留行号；`?raw`/`?url` 视为数据而非执行依赖；公用声明包与实际 HTML 入口分别列明。
- `scripts/verify-css-variables.test.ts`：孤立定义、静态/CSS/package 依赖、lazy-only 未证明、JS/CSS 注释与字符串、第三方/嵌套 fallback、未解析本地 import、有限宿主 override 与组件内联 producer；原有 name/inline writer/Tabs 指纹断言保留。
- `apps/playground/src/drawer-refinement-consumer.tsx`、`apps/prototype/src/scenarios/bklit-validation/main.tsx`：仅增加 motion CSS import。
- `apps/prototype/src/scenarios/bklit-validation/catalog-main.tsx`：仅增加 motion 与 public UI CSS import。
- `tests/e2e/css-local-consumption.spec.ts`、`css-local-consumption.config.ts`：独立端口 5392/5393、7 个真实页面检查，截图/JSON/trace 只写新目录。

没有改动 Token 定义、局部页面布局、公共组件默认、Tabs 源码/合同、设计方法、状态 owner、旧接受或旧证据。

## 扫描器实际覆盖与限制

`scanner-report-01/output.log` 为完整 JSON：1704 源文件、13151 Rain 字面引用、981 个 Rain 定义、16 个实际/声明入口；名称及入口依赖 hard failure 为 0。另有 1057 条非 Rain 变量引用清单与 293 条待复核事项，保留路径/行/变量/来源/作用域/原因。

待复核包括：非 Rain 外部 producer，带 fallback 的精确可选宿主 override（Tree 两项、ConnectedSurface 两项），组件局部内联 producer（Tree rich-spacing/anchor），以及无法静态证明的 lazy/运行时范围。只按精确文件、变量、fallback 或 scope 登记；不存在任意 `--rain-*` 前缀豁免。未知 Rain 名即使有 fallback 也失败，隔离文件不能普遍满足入口。

这不是完整 CSS cascade、元素作用域、主题、运行时执行、第三方库或对比度证明。`unreachedSources` 同时列出本轮尚未接当前 HTML 入口的 filter-toolbar/grading-actions，以及旧 chart-theme/next.css，供对应任务收口。

## 真实页面矩阵

| 原局部目标 | 实测结果 |
|---|---|
| component-doc loading strong | Spinner 真实页 semibold，计算值与当前 token 相同 |
| g3 navigation link strong | 教学空间菜单真实打开，标签字重匹配 semibold |
| slider label / output 两处 | 两个角色计算值均匹配 semibold |
| task-details pagination | 真实任务详情打开，min-width 48px 且 box width≥48 |
| exam display modes | hover 显示真实“移动到”入口后打开弹窗，width 240px，紧凑选中有效 |
| Bklit link / focus 两处 | 真实链接颜色匹配 text-link，键盘 link 与 data summary focus outline 2px 且颜色匹配 focus-control |
| 旧 chart-theme focus | 无活动 import/消费对象；source-only，不记浏览器 passed |
| 三个遗漏样式入口 | 修前计算值缺失；修后依赖值与公共 field style 已注册 |

浏览器使用 Chromium、1440×1000、默认 Light、no-preference motion；本分工未测 Dark，公共 Tabs 的主题矩阵见整合者 B01 结果。查看过图表目录前/后、exam 模式条、Bklit 焦点截图；图表目录截图包含进入动效过程，仅用于壳层/控制对照，不宣称完整图表动效/视觉接受。7 项 after 用例全部通过，且输入快照稳定。

## 实际命令与结果

所有命令通过 append-only `run-component-check.mjs B01 <check-id>`；完整参数、日志哈希与输入快照见各 `command.json`。

- `scanner-boundaries-red-01` — `pnpm exec vitest run scripts/verify-css-variables.test.ts`；exit 1。
- `scanner-boundaries-green-01` — `pnpm exec vitest run scripts/verify-css-variables.test.ts`；exit 1。
- `scanner-boundaries-green-02` — `pnpm exec vitest run scripts/verify-css-variables.test.ts`；exit 1。
- `scanner-boundaries-green-03` — `pnpm exec vitest run scripts/verify-css-variables.test.ts`；exit 1。
- `scanner-boundaries-green-04` — `pnpm exec vitest run scripts/verify-css-variables.test.ts`；exit 0。
- `entry-browser-red-02` — `pnpm exec playwright test --config tests/e2e/css-local-consumption.config.ts --grep \[B01-entry\]`；exit 1。
- `local-consumer-browser-before-01` — `pnpm exec playwright test --config tests/e2e/css-local-consumption.config.ts`；exit 1。
- `local-consumer-browser-after-01` — `pnpm exec playwright test --config tests/e2e/css-local-consumption.config.ts`；exit 0。
- `scanner-report-01` — `node scripts/verify-css-variables.mjs --json`；exit 0。
- `prototype-types-01` — `pnpm --filter @rain-next/prototype typecheck`；exit 0。
- `affected-consumer-build-01` — `pnpm --filter @rain-next/playground --filter @rain-next/prototype build`；exit 0。
- `local-diff-01` — `git diff --check -- scripts/verify-css-variables.mjs scripts/verify-css-variables.test.ts tests/e2e/css-local-consumption.spec.ts tests/e2e/css-local-consumption.config.ts apps/playground/src/drawer-refinement-consumer.tsx apps/prototype/src/scenarios/bklit-validation/main.tsx apps/prototype/src/scenarios/bklit-validation/catalog-main.tsx`；exit 0。

`scanner-boundaries-red-01` 是新增边界的真实 5 项失败；green-01 中使用 TypeScript 7 包不存在的旧 parser API，已改为仓库当前使用的 Vite parser，不替换依赖；green-02/03 持续暴露实际入口缺口和 finite scoped producer，保留日志。green-04 11/11 通过。浏览器 before-01 中 exam 未先 hover、旧 chart summary 不存在属于测试路径假设，已按真实 DOM 改正；entry-red-02 单独保存当前缺依赖事实，after-01 7/7 通过。Prototype 类型与两个应用构建通过；构建原有大 chunk 提示仍存在，未调阈值。

## 保留合同、未测、回退与下一任务

保留源锁、既有修前快照/接受、原断言、唯一公共文档路由与局部原型身份。不执行完整 verify，不把本地、自动检查、Human、published 混为一谈。Safari/VoiceOver/真实触摸/全库对比度、第三方全部 runtime scope 与 Human Gate 未验证。

三个入口修改前完整文件和 SHA 存在 `../b01/entry-imports-before/`，可精确只撤销这 4 行导入。scanner 原版本从 B00 backup 取回，不覆盖用户原有 deep-review 修改；新测试/config 可单独撤销。旧 evidence 不变，本轮失败记录 append-only 保留。

下一步：整合者合并公共 Tabs/NavigationBar 结果、更新有限 successor 来源清单并执行 S 阶段 gate；C01/C03 检查未接活动入口的示例投影；最终评测仍绑定最终重新导出 Starter 快照。

## 配置类型补充

`tests-types-shim-01` 实测指出 `css-local-consumption.config.ts` 的顶层 `use.reducedMotion` 不属于当前真实 Playwright 1.62.1 的 TestOptions，运行时 fixture 也未读取它。已精确移入 `use.contextOptions.reducedMotion`，不伪造声明、不改 tsconfig、不扩参数类型。先前 B01 测量使用浏览器默认 no-preference，改后显式相同值；既有结果保留。该次全 tests 类型检查还发现两个并行开发中的其他 owner 项（asset-config-examples 未落模块、rn14 必选属性 delete），不报告全库类型 passed。
