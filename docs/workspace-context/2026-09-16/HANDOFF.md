# Rain Next 下拉家族交接

更新日期：2026-09-14。工作区：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构`；实际代码仓库是子目录 `rain-classroom-vibe-ui-spike`。

**当前停点：公共 DropdownMenu 默认按内容定宽，并依用户最新要求设置 140px 最小宽度；自动上限 320px，显式数字可加宽，视口不足时优先避免超屏。最新实现、验证与确认范围见 [宽度修订证据](rain-classroom-vibe-ui-spike/evidence/runtime/dropdown/width-refinement.md)。9 月 12 日既有菜单/Popover 及选择标记视觉验收保留，本次宽度已由用户“确定没问题。”确认；后续底部结束按钮已改为二级按钮：单个铺满行宽，两个按内容定宽并靠右排列；本次按钮视觉单独待确认。整体仍为候选、未发布。**

以 `status/current-phase.yaml` 及本次宽度证据为当前状态；以下标明历史的数字只说明对应批次，不合并计数。第一批实验及失败材料继续保留。

## 1. 目标与已确认规则

- DropdownMenu 承担操作、链接、复选、单选、分组、分隔线和子菜单；Popover 提供可以组合搜索、分类、预览、独立收藏、底部操作的正常内容面板。
- 默认直接使用完整 Recipe；有明确需求时，再拆开需要改变的部分。Rain Token 是视觉来源，Tailwind 只做受约束组合；行为复用 Base UI，不自建第二套浮层/键盘控制器。
- 主文字 15/22、说明 13/18；有说明或已选时主文字 600、说明 400。500 不再是候选。
- 普通说明 Text/Neutral/4；选中主文字 Text/Brand/1、说明 Text/Brand/2、前导图标/子菜单箭头 Icon/Brand/1，取消选中恢复原色。
- 关键限制和禁用原因使用较强文字色并完整显示；选中禁用保留选中事实，但不能激活。
- 行内圆形已选确认标记为 16/10；菜单选择标记按新指令复用 Checkbox 16/10、Radio 18/6，画布均为 24；单选为圆点，原生输入与菜单各自管理行为。
- 菜单默认随完整条目定宽，最小 140px，自动上限 320px；显式数字可加宽，最小值受视口约束。内容面板仍默认 320px；本例课程菜单显式 240px、模板面板显式 360px。
- 实现、自动检查、独立技术复核、视觉 Human Gate、颜色资格/对比度、发布、迁移及 Git 状态分别记录。

## 2. 接续前应读的当前来源

| 文件 | 用途 |
| --- | --- |
| [AGENTS.md](rain-classroom-vibe-ui-spike/AGENTS.md)、[SPIKE_BRIEF.md](rain-classroom-vibe-ui-spike/SPIKE_BRIEF.md) | System Mode、原型目标、授权和状态边界 |
| [current-phase.yaml](rain-classroom-vibe-ui-spike/status/current-phase.yaml) | 看 `componentRefinements.dropdownFamily`；顶层仍是 token-foundations-v1，不因本批自行换阶段 |
| [建设计划](rain-classroom-vibe-ui-spike/docs/plans/2026-09-09-dropdown-family-construction-plan.md) | 已确认来源、Task 1–5；第 13 节为公共初版历史，第 14 节为最新视觉复用检查点 |
| [视觉统一复用记录](rain-classroom-vibe-ui-spike/evidence/runtime/dropdown/selection-visual-reuse.md) | 当前共享图形、原生/菜单状态配对、24 组实际背景测量和独立复核 |
| [公共验证记录](rain-classroom-vibe-ui-spike/evidence/runtime/dropdown/verification.md) | 公共初版历史与最新追加索引，保留旧 19/30 证据 |
| [实际组合改造](rain-classroom-vibe-ui-spike/evidence/runtime/dropdown/composition.md) | 简单 RadioGroup 面板到搜索/分类/缩略图/收藏的真实前后源码，以及哪些 Master 未因业务修改 |
| [DropdownMenu Manifest](rain-classroom-vibe-ui-spike/manifests/ui/dropdown-menu.yaml)、[Popover Manifest](rain-classroom-vibe-ui-spike/manifests/ui/popover.yaml)、[Registry](rain-classroom-vibe-ui-spike/registry/dropdown-family.json) | 公共 API、Parts、配方、修改边界、来源、候选/未发布状态 |
| [ADR 0005](rain-classroom-vibe-ui-spike/docs/adr/0005-headless-base.md) | Base UI 1.8.0 选择、Radix 两项已复现的合同缺口 |
| [第一批实验 Manifest](rain-classroom-vibe-ui-spike/apps/playground/src/experiments/headless/manifest.json)、[旧实验验证](rain-classroom-vibe-ui-spike/evidence/runtime/dropdown-batch-one/verification.md) | 原稿/Token 对照、7/9 与 6/8 留白、宽度及层次历史修订；与公共范围独立 |
| [视觉索引](rain-classroom-vibe-ui-spike/evidence/visual-evidence.yaml)、[Benchmark 索引](rain-classroom-vibe-ui-spike/benchmarks/benchmark-registry.yaml)、[说明](rain-classroom-vibe-ui-spike/benchmarks/README.md) | 按本次修改范围加载来源，不能以记忆代替现场文件 |

公共选择控件的语义见 [原生 Checkbox ADR](rain-classroom-vibe-ui-spike/docs/adr/0006-native-checkbox.md)、[原生 Radio ADR](rain-classroom-vibe-ui-spike/docs/adr/0007-native-radio.md)。进一步修改这些控件时再读各自计划和当前验收；它们的 Gate 不覆盖 Dropdown。使用图标前读 [图标选择规范](rain-classroom-vibe-ui-spike/docs/ai/icon-selection.md)。

排版、组合、颜色和 Focus 的权威来源在 Foundations 的 typography-contract、composition-contract、token-contract、color-registry 和 focus.css；不手改生成 CSS。

原始设计来源：[研究与设计会话](https://chatgpt.com/g/g-p-6a94e99106608191a167431c5916d66d/c/6aa012c0-8fb0-83ec-a620-a55cf190f89f)；[Figma 完整菜单](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2255-26)、[当前规格](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2280-618)、[状态补全](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2280-619)、[内容边界](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2280-620)。此前已读全部 8 轮与 7 个画板，索引和结论在计划；没有写入 Figma。历史附件不应假定在新会话仍有本地文件。

## 3. 实际交付与源文件

| 文件 | 职责 |
| --- | --- |
| [dropdown-menu.tsx](rain-classroom-vibe-ui-spike/packages/ui/src/dropdown-menu/dropdown-menu.tsx) | Compound 菜单、动作/链接/选择项、子菜单、默认关闭策略、公开 Parts |
| [dropdown-menu.styles.ts](rain-classroom-vibe-ui-spike/packages/ui/src/dropdown-menu/dropdown-menu.styles.ts)、[CSS](rain-classroom-vibe-ui-spike/packages/ui/src/dropdown-menu/dropdown-menu.css) | Rain 排版和 Parts 联动、表面、指示器、主题状态、forced-colors |
| [popover.tsx](rain-classroom-vibe-ui-spike/packages/ui/src/popover/popover.tsx) | 开放内容面板、Title/Description/Close；业务保留在调用方 |
| [popup.tsx](rain-classroom-vibe-ui-spike/packages/ui/src/_internal/popup.tsx) | 只桥接活动入口主题、密度与真实 ref，不接管打开/关闭行为 |
| [dropdown-page.tsx](rain-classroom-vibe-ui-spike/apps/playground/src/docs/components/dropdown-page.tsx)、[局部 CSS](rain-classroom-vibe-ui-spike/apps/playground/src/docs/components/dropdown-page.css) | 三份真实公共 Recipe、Light/Dark/compact、模板实际改造和 Mock 首次失败/重试 |
| [专项治理测试](rain-classroom-vibe-ui-spike/scripts/dropdown-family.test.ts)、[公共浏览器测试](rain-classroom-vibe-ui-spike/tests/e2e/dropdown.spec.ts) | 精确授权、源图、颜色登记、交互与主题/窄屏检查 |

实现已经复用公共 Button、Input、Checkbox、Radio/RadioGroup 和 IconButton。旧实验 main.tsx 的“操作后关闭”也已换成公共 Checkbox；菜单 CheckboxItem/RadioItem 保留原语，复用同一 CheckboxIndicator / RadioIndicator 被动视觉，避免嵌套两个交互控件。原生 Master 仅按新指令抽出原样绘制层，输入、表单与卡片逻辑未变。

本轮没有新依赖。Base UI Menu、Popover 和示例的 Dialog 仅允许在各自精确文件导入。独立 CSS 随组件源码导入，配套精确的 CSS 声明文件；公共 styles.css 仅将原生控件的同组状态声明接入菜单精确状态分支，菜单私有 14/12 样式已删除。

## 4. 2026-09-10 历史验证记录

当时视觉复用：全库 79 文件 / 1214 单元通过；相关 Chromium 39/39（公共菜单 11/11），追加背景采样的两主题复测 2/2；独立技术复核通过。类型、构建和治理通过。新证据为 selection-*.png/json、selection-checks.log，保留初版证据。

以下为公共初版历史验证，不能与最新结果合并计数：

- 公共组件 + 专项治理小集：22/22 通过（15 项组件、7 项治理）。
- 全库单元最终：79 个文件、1212/1212 通过。默认高并发首轮的导航位置、历史 B2 fixture 和 1 秒 FIFO 超时已有归因；修复后两 worker 原断言通过，没有提高超时。
- 全量 Chromium 首轮：176 项，172 正常通过、2 个旧 Radix 预期失败、2 个正式 Checkbox 替换后的旧定位意外失败。
- 浏览器受影响复测：公共 Dropdown、旧实验和 Core UI 共 41 项，39 正常通过、2 个旧 Radix 预期失败；0 意外失败、0 跳过、0 重试。公共 Dropdown 的 9 项全部正常通过。未再次执行全量 176 项，不能改写为全量一次全绿。
- 全工作区类型、生产构建、Lockfile/Workspace/Evidence/Boundaries/Tailwind/Tokens 检查通过。已有图标目录大分块提示仍在。
- 独立只读技术复核通过，原发现已闭合，未发现剩余可复现 P1/P2。动态追加入口、显式 ID 切换、取消打开、真实 ref、描述关联及 CSS 解析漏错均已检查。
- 初版颜色为 38 项登记 / 19 项对比度 / 30 项用途 finding；当前移除私有选择标记后为 35 项登记 / **9 项对比度、26 项用途资格 finding**，全部未接受例外。共享图形在普通菜单实际背景上 24 组测量最低 3.714:1，数值通过 3:1，不扩展为整体视觉接受。文本 4.5、必要图形/边界 3.0 的门槛保留。

当前状态以阶段文件为准：`dropdownFamily` 仍 in-progress / passed / findings，Human Gate 已在 2026-09-12 接受既有 runtime visual，contrastAcceptance 仍 not-granted。`selectionVisualReuse` 为 completed / passed / passed，既有视觉同日已接受。本次 `widthRefinement` 独立登记，宽度视觉已于 2026-09-14 接受。底部结束按钮新修订见 footer-action.md，视觉待确认。

原始记录和测量统一在 [本批验证索引](rain-classroom-vibe-ui-spike/evidence/runtime/dropdown/verification.md)。不要覆盖首轮失败、旧实验或其他家族的验收图片。

## 5. 当前待办和风险

1. 宽度已确认：展示页新增“内容自适应 / 固定 240px / 固定 400px”对照；同图短菜单最终 140px。既有视觉验收不重新开启；本次追加的底部结束按钮（单个全宽 / 两个自然宽度）单独待视觉确认，见 [结束按钮证据](rain-classroom-vibe-ui-spike/evidence/runtime/dropdown/footer-action.md)。
2. 颜色与用途 finding 保持阶段/当前颜色证据的独立结论；本次没有修改颜色。
3. 真实屏幕阅读器、操作系统 IME、物理触屏和 Firefox/WebKit 未在本批完成。
4. 工作区有既存变更、HEAD 及 origin；历史 Day 3 登记仍为未创建/未配置，且两份 V2 证据 HTML 不在旧边界名单内，导致全库边界检查失败。不得清理、提交或覆盖他人工作来制造通过状态。详情及单元检查口径见本次宽度证据。

## 6. 下一步与复现入口

先读本交接和精确阶段/Manifest/验证记录，再从本次宽度视觉和独立颜色 finding 接续。若用户要求修订，先按 Existing Variant → Local Recipe → Local Fork 的顺序判断；普通组合不应修改共享控制器。通过用户 Gate 后再单独同步对应状态，发布/迁移/Figma/Git 仍各自需要授权。

本次实际运行公共页面：[http://127.0.0.1:5190/#dropdown](http://127.0.0.1:5190/#dropdown)。旧对照页：[dropdown-review.html](http://127.0.0.1:5190/dropdown-review.html)。交接时 5190 是本任务启动的服务；下次先确认服务仍存在。4173 属其他任务，不能直接结束。

全部项目命令进入实际仓库后执行：

```sh
cd /Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike
pnpm exec vitest run packages/ui/src/dropdown-menu/dropdown-menu.test.tsx packages/ui/src/popover/popover.test.tsx scripts/dropdown-family.test.ts --maxWorkers=2
pnpm typecheck
pnpm verify:governance
pnpm build
```

需要浏览器时使用 `tests/e2e/dropdown.spec.ts`；触碰旧实验则同时运行 `dropdown-batch-one.spec.ts`。默认 Playwright 会启动 4173 且不复用已有服务，应为当前可用服务生成临时配置，保留原项目/断言和 `retries:0`。本次定向复测配置 `/tmp/rain-dropdown-width-playwright.config.mjs` 指向 5190；临时文件和进程编号不是长期入口。

浏览器可以从临时工作目录运行仓库内绝对路径的 Playwright CLI 和测试，以把测试自动生成的图片写到临时目录；不要在复查其他组件时覆盖它们原有证据。源码读取测试使用各自源文件位置，不能随意移动测试文件。

本批未执行 Figma 写入、发布、迁移或 Git 操作。
