# Dropdown 第一批：视觉与 Headless 实验证据

日期：2026-09-09。授权来源：用户“开始进入第一批”。范围为建设计划 Task 1/2；身份为 `local-experiment`。

已完成可操作样本和同条件底座比较，选择 Base UI 1.8.0。公共 DropdownMenu / Popover 实现、现有 Select / Dialog 迁移、Token 新增、视觉 Human Gate、发布和 Figma 写入保持独立。当前共享工作区完整验证尚未通过。

最新局部页面已按用户“确定”及后续“继续推进”完成 360px 面板修订，见[宽度与体量修订](#宽度与体量修订)。下方初批及 13:17 记录保留各自运行时状态；本次最新验证以末节为准。

## 可评审结果

- [本地样本页](http://127.0.0.1:5190/dropdown-review.html)：原稿外观与 Rain Token 并排比较，支持浅色/深色、两组留白、两组普通状态背景、两组阴影。
- [建设计划](../../../docs/plans/2026-09-09-dropdown-family-construction-plan.md)：7 个 Figma 画板、交接文档与后续范围。
- [局部 Manifest](../../../apps/playground/src/experiments/headless/manifest.json)：来源、用途、候选值、颜色登记和独立生命周期。
- [ADR 0005](../../../docs/adr/0005-headless-base.md)：相同 Select / Dialog / Menu / Popover 合同下的决策与成本。

左列仅代表浅色原稿外观加本次已确认文字规则，使用正式字体和 600/400；不是旧 Figma 的逐像素副本。右列和实际 Portal 消费当前主题。普通标题默认两行；关键限制和禁用原因完整展开。点击样本可叠加选中状态，Tab 可观察全局键盘 Focus。

## 自动验证

| 检查 | 当前结果 | 原始记录 |
| --- | --- | --- |
| 本批授权、依赖位置、局部样式与原稿观察范围 | 4 项通过；含实际 CLI 集成扫描 | [local-governance-final.log](local-governance-final.log) |
| 共享授权与历史冻结边界辅助检查 | 与本批合计 235 项通过 | [governance-tests-final.log](governance-tests-final.log) |
| 本批 Chromium 浏览器合同 | 25 项正常通过，2 项 Radix 原生预期失败；无意外失败或跳过 | [browser-final.log](browser-final.log)、[结构化结果](browser-results-final.json) |
| 类型检查 | 通过 | [typecheck-latest.log](typecheck-latest.log) |
| 生产构建 | 通过；保留现有图标展示大分块提示 | [build-final.log](build-final.log) |
| 图标校验 | 899 / 899，通过 | [icons.log](icons.log) |
| Token 来源与消费登记 | 最新复跑通过；颜色 finding 仍未验收 | [tokens-latest.log](tokens-latest.log) |
| 锁文件、工作区、既有 Evidence | 通过 | [governance-latest.log](governance-latest.log) |
| 全库单元检查 | 1,032 通过，30 失败，共 1,062 项 | [unit-suite-final.log](unit-suite-final.log) |
| 全库 Chromium 检查 | 111 项正常通过，2 项 Radix 预期失败，4 项其他意外失败，共 117 项 | [full-browser-final.log](full-browser-final.log)、[结构化结果](full-browser-results-final.json) |

全库运行快照曾报告 Select / Field / Input 变更相关问题：共享字段 CVA 位置、颜色登记与生成输出、Input 样式例外、Select 静态类/来源/Manifest 登记，以及旧页面断言。Token 检查后续复跑已通过；最近 Tailwind 记录仍有 Select 静态类与尚缺的浏览器文件登记问题。全库浏览器失败为 `core-ui.spec.ts` 的家族展示与 Input/Tag Focus、`input.spec.ts` 的两主题 Input 状态、`text-button.spec.ts` 的 Input 内嵌动作。未改写这些断言来为本批制造全绿；详见 [边界链路](governance-latest.log)、[Tailwind 检查](tailwind-latest.log)、[Token 检查](tokens-latest.log)。这些日志是运行时快照，并行任务后续可能继续更新对应文件。

本批的 Headless 导入只允许出现在两个实验适配器，候选依赖只放在 Playground。公共 UI 的 Headless 依赖禁令继续生效。历史冻结夹具会剔除新登记的 Dropdown 和 Select 增量，再还原原始归档，防止把当前新增文件误当成历史输入。

## 行为证据

| 实测合同 | Base UI | Radix |
| --- | --- | --- |
| 打开、Home/End、关闭及焦点返回 | 通过 | 通过 |
| 业务控制 Action / Checkbox 关闭及逐项覆盖；键鼠一致 | 通过 | 通过 |
| 导航条目显式关闭；键鼠一致 | 通过 | 通过 |
| 子菜单 Escape 只关闭当前层 | 通过 | 原生关闭整棵菜单，预期失败 |
| 非模态 Menu Tab 离开到下一页面控件 | 通过 | 原生阻止 Tab，预期失败 |
| Select 受控值、方向键、禁用项、选中与焦点返回 | 通过 | 通过 |
| Menu → Dialog 交接、Tab 约束、Escape、遮罩及长内容 | 通过 | 通过 |
| 开放面板中的搜索、分类、独立收藏、空结果、失败重试 | 通过 | 通过 |
| 外部点击保留目标焦点；深色 Portal；360px 视口边界 | 通过 | 通过 |

两项预期失败保留同一目标合同与真实失败记录：[Radix 子菜单 Escape](radix-native-escape-failure.md)、[Radix Tab](radix-native-tab-failure.md)。测试报告将其归为“符合预期”，不表示目标行为通过。未添加第二套键盘控制器修补败方。

Base UI 使用其原生 `closeOnClick`、焦点入口和可用高度；Radix 按其公开 `onSelect`、自动焦点事件及可用高度变量接入。相同共享内容承载搜索、选择、失败状态和业务关闭。模板首次提交模拟失败，重试成功；提交期间不能切换模板，避免提交旧选择后丢失新选择。

## 视觉及颜色

| 材料 | 已观察内容 |
| --- | --- |
| [浅色全页](light-full-review.png)、[深色全页](dark-full-review.png) | 7 组内容/状态，600/400，选中主题色，普通与危险项，220/282/340px 长内容样本 |
| [浅色 Checked + Focus](light-checked-focus.png)、[深色 Checked + Focus](dark-checked-focus.png) | 已选与悬停、真实键盘 Focus 同时存在 |
| [浅色 Danger + Pressed + Focus](light-danger-pressed-focus.png)、[深色状态](dark-danger-pressed-focus.png) | 危险背景与全局品牌 Focus 分离 |
| [Base 窄屏深色面板](base-dark-narrow-panel.png)、[Radix 窄屏深色面板](radix-dark-narrow-panel.png) | 360px 视口内定位、可滚动内容、固定底部操作 |

浏览器断言核对 15/22 与 13/18 对应的 36/60、34/58 两组自然高度；初批 Light/Dark 选中 Label 和 Description 都使用各自主题的 `Text/Brand/1`；普通 Description 已在下方 13:17 修订中改为浅一档 `/2`，Label 600、Description 400。已选 + Disabled 保留这一规则。强制颜色下检查 2px 系统焦点且无阴影；真实操作系统读屏、真实 IME 输入和触屏尚未实测。

57 项 Token 消费用途已登记，原稿观察、局部几何和系统色仅以精确选择器/属性/值/媒体条件保留。没有新增公共颜色或放宽为任意 CSS；没有把图标色用于边框或把文字色用于危险图标。

[颜色检查](color-review.json)没有登记错误，但保留 **22 项对比度 finding 与 22 项用途资格 finding**：

- 最新普通说明 `/4` 在品牌 Pressed 底色有 2 项对比度问题；浅一档选中说明 `/2` 在部分状态底色有 8 项对比度问题。所有说明仍登记为真实交互文字。
- 危险文字置于候选红底：Light Pressed 4.34；Dark Hover 4.26、Pressed 3.88，低于 4.5。
- 复选框边界及深色已选边界有 9 项低于 3；选中事实还由勾号与文字保留，边界 finding 继续记录。
- 普通弱色说明有 10 项交互用途资格 finding；选中主文字、说明与图标叠加浅红底有 12 项同色系用途 finding，不由对比度数值推定合格。

[原稿 Light 观察测量](source-color-observations.json)：说明 `#79869E` 在白底为 3.673；危险文字在原稿 12% Pressed 红底为 4.183，均低于普通小字号文字的 4.5。禁用文字、装饰边框仅报告测量，不套用相同文字门槛。所有观察与 finding 均未接受为例外。

这些是下一次视觉评审的具体材料。用户已确认的是选中主题色与 600/400；留白、普通/危险背景、边框、阴影和颜色资格仍待检查，不能据本页自动新增 Token 或进入公共发布。

## 独立审阅与变更追踪

独立审阅最初提出 3 个 P2：异步期间切换模板、链接默认关闭不同、颜色消费未登记及身份错用。修复后复查确认 3 项均解决，未发现修复范围内直接回归。补充治理审阅指出的 Input/Dropdown eligibility 生命周期串线已按 Recipe 前缀分离，Dropdown 使用自己的 Manifest。所有颜色消费现逐项声明交互性、信息重要性和品牌意图；初批普通说明曾使用 `Text/Neutral/3`；13:17 用户要求调浅后按末节修订，未沿用此前审阅替代新色阶的验收。代码审阅结果与颜色 finding 分开记录。

前 8 个修改文件保存在 [source-baseline.json](source-baseline.json) 与对应归档；另两份验证脚本在修改前保存在 [source-baseline-additions.json](source-baseline-additions.json)。工作区同期存在其他改动，基线不表示这些文件的全部后续差异均由本任务产生。未执行 Git 暂存、提交或发布。

## 重现

在仓库根目录运行：

```sh
pnpm --filter @rain-next/playground exec vite --host 127.0.0.1 --port 5190
pnpm exec vitest run scripts/dropdown-batch-one.test.ts scripts/verification-helpers.test.ts --maxWorkers=2
pnpm exec playwright test tests/e2e/dropdown-batch-one.spec.ts --workers=2
pnpm typecheck
pnpm build
```

本次保留原有 4173 服务，浏览器检查用临时配置将原始 Playwright 配置的服务地址改为 5188，其他测试合同不变。正常空闲环境可直接运行上方项目命令。

包体测量为相同完整适配器、Vite 生产最小化 ESM、React/Rain 包外置，再对输出 JS 做 gzip；见 [bundle-comparison.json](bundle-comparison.json)。依赖树用 `pnpm list --prod --depth Infinity` 按唯一 `name@version` 计数，包含直接包与共享 React peers；见 [dependency-comparison.json](dependency-comparison.json)。它们不是整站首屏、实际加载性能或净新增安装量。

## 13:17 视觉修订

普通说明颜色改为 `Text/Neutral/4`，选中说明为浅一档 `Text/Brand/2`；主文字 600、说明 400，关键限制与禁用原因保留较强色。选中前导图标及子菜单箭头统一 `Icon/Brand/1`，取消选中恢复原色。没有新增公共 Token，也没有把交互说明改名成非交互或装饰内容来绕过用途检查。

两项症状均先复现失败，再通过同一浏览器断言：[修改前](hierarchy-icons-red.log)、[修改后](hierarchy-icons-green.log)。新增覆盖浅/深色、原稿/Token 两列，以及普通、带说明、危险、子菜单图标的选中和取消选中。当前颜色登记为 57 项消费、22 项对比度和 22 项用途资格 finding，均未验收。

本次全批浏览器结果见 [28 项合同](hierarchy-icons-browser.log) 与 [结构化结果](hierarchy-icons-browser.json)；局部登记检查见 [5 项检查](hierarchy-icons-registration.log)，类型和构建见 [构建记录](hierarchy-icons-build.log)，Token 检查见 [颜色登记记录](hierarchy-icons-tokens.log)。前文全库运行与独立审阅为初批记录，本次未据局部修订重写其他任务的全库状态。

截图：[浅色选中图标与说明](light-token-description-selected.png)、[深色选中图标与说明](dark-token-description-selected.png)。

## 宽度与体量修订

授权来源为第 12 节方案确认“确定”之后的“继续推进”，范围仅为第一批局部 Dropdown 宽度与体量。复用两个底座的共享局部样式及 Input 的现有 `className` 接口；修改前源码保存在 [width-refinement-baseline.json](width-refinement-baseline.json)。

| 部分 | 修订前 | 当前实测 |
| --- | --- | --- |
| 三项模板完整展示 | 440 × 495px | 360 × 409px |
| 面板标题 | 18/26 | 15/22；600 |
| 顶部区 | 80px 高 | 68px 高 |
| 主体横向留白 | 20px | 16px |
| 模板行 / 缩略图 | 74px / 52px | 60px / 40px |
| 底部区 | 69px 高 | 61px 高 |
| 搜索输入 | 224.5px 宽 | 326px，与内容区对齐 |
| 常规交互菜单 | 282px | 280px |

以上高度来自当前内容的自然排版。可用空间不足时，内容区域滚动；搜索空结果时面板高 295px，宽度仍为 360px。失败状态也保持 360px，查询“函数”和已选“函数图像练习”保留，重试成功后关闭。40px 预览中的折线与曲线仍可辨认；实际业务预览的更多细节仍需按内容检查。

未选行采用透明边框和既有中性悬停填充；选中行保留品牌边框、底色、主文字和说明的主题色。条目继续使用 15/22 与 13/18、600/400。实测共享 Dialog 为 560px，标题 18/26，顶部留白 20/20/12。

实际浏览器还检查了 360 × 640 与 320 × 480 视口：面板分别适配为 344px、304px 宽，两侧留 8px；低矮视口中列表滚动，末项收藏的完整焦点环与底部按钮可见。几何和状态原始读数见 [width-runtime-geometry.json](width-runtime-geometry.json)，两底座窄屏截图见 [Base UI](width-base-dark-narrow-panel.png)、[Radix](width-radix-dark-narrow-panel.png)。

| 本次检查 | 结果 | 记录 |
| --- | --- | --- |
| 局部授权、CSS 登记与颜色用途 | 5 项通过 | [width-registration.log](width-registration.log) |
| 现有全批 Chromium 合同 | 26 项正常通过、2 项 Radix 原生预期失败；0 意外失败、0 跳过 | [width-browser.log](width-browser.log)、[JSON](width-browser.json) |
| 生产构建 | 通过；已有图标大分块提示保留 | [width-build.log](width-build.log) |
| Token / 边界 / Tailwind | 通过 | [Token](width-tokens.log)、[边界](width-boundaries.log)、[Tailwind](width-tailwind.log) |
| 全工作区类型检查 | Foundations、UI、Playground 通过；Checkbox 治理测试第 35 行的 `sourceAlias` 类型错误使整条命令退出 1 | [width-typecheck.log](width-typecheck.log) |
| 本地颜色记录 | 57 项消费登记无错误；22 项对比度、22 项用途资格 finding 待评审 | [width-color-review.json](width-color-review.json) |

修改前共享阶段记录校验曾失败，见 [width-baseline-boundaries.log](width-baseline-boundaries.log)；共享工作区后续更新后，本次最终边界和 Tailwind 检查通过。全库单元及全库浏览器没有在此次样式修订中重跑，前文历史全库结果不升级为当前通过。

本次使用现有测试合同，未修改测试来消除已记录的两项 Radix 差异。新修订的独立审阅未开展，视觉 Human Gate 待用户检查；所有颜色 finding 仍未接受为例外。

## 23:32 圆形已选勾标尺寸修订

用户通过 `截屏2026-09-09 23.32.16.png` 要求所有相同确认/已选图标缩小 2px。已调整共用的 `.dr-check-right`：外圈 18 → 16px，内部勾号 12 → 10px，分别消费现有 `--rain-icon-size-16` 与 `--rain-icon-size-10`。当前相同圆形标记的全部渲染位置均由这一规则覆盖，尺寸已同步登记于 Manifest 和建设稿。

真实浏览器核对原稿/Token 两列、浅色/深色：外圈均为 16 × 16px，勾号为 10 × 10px，所在条目仍为 60px 高；取消选中隐藏，再次选中恢复。既有主题色保持正确。[5 项局部登记检查](selection-mark-size-registration.log)通过。本次仅复跑尺寸、状态切换与局部登记检查，前文更广验证保留各自运行时结果，视觉和颜色 Gate 继续单独处理。
