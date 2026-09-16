# RN-07 Textarea 验证

2026-09-13；基线 HEAD `321e1a0`。用户已有 V2 工作包未跟踪，保留其内容。范围与合同见 [实施记录](../../../docs/plans/2026-09-13-textarea-rn07.md)。

## 实际检查

| 检查 | 本轮结果 |
| --- | --- |
| 组件、字段、样例、入口及授权定向 Vitest | 8 文件 / 97 项通过 |
| Textarea Chromium | 3/3 通过；3 外观 × 2 密度 × 2 主题 × 6 真实字段，共 72 组静态测量；另测普通/错误/只读键盘聚焦 |
| Input/Core UI Chromium 回归 | 2/2 通过，原生字段 Focus 与入口交互保持；入口家族数量由 6 更新为 7 |
| 类型与生产构建 | 通过；原有大分块提示保留 |
| Lockfile / Workspace / Evidence | 通过，无新依赖 |
| Tailwind B2 / Token 验证 | 通过；已有颜色 findings / 例外保留 |
| 完整治理 | 未通过：4 条修改前已存在的 boundary finding，见下方 |
| verification-helpers 完整测试 | 232/234 通过；2 项真实 CLI fixture 同样被上述 baseline findings 阻塞 |
| Diff 空白检查 | 通过 |

新单元测试先因缺失导出、样例路由、授权辅助函数而失败，再在实现后通过。首轮浏览器定位发现 `min-h-rain-48` 没有公共映射，改用现有 `Space/40`；同时修正测试的 resize 值与 Checkbox 标签点击。最终浏览器 3/3 无重试，另跑 Input/Core UI 2/2；没有把首轮失败计为通过。

浏览器在独立本地 Vite 服务执行，临时 Playwright 配置指向 `http://127.0.0.1:5173`，`retries=0`。长期复跑入口为 `tests/e2e/textarea.spec.ts`；可设 `RAIN_TEXTAREA_EVIDENCE_DIR` 指定产物目录。只有样例自身的模拟保存，没有网络保存或持久化。

## 产物与可见范围

- [浅色](light.png)、[深色](dark.png)、[390px 窄屏](narrow.png)。已查看本轮截图，并用浏览器测量确认没有页面横向溢出；此检查不等于用户视觉验收。
- [Light 测量](light.json)、[Dark 测量](dark.json)：实际控件 14/24、PingFang SC、40px 最低高度、原生纵向拖拽；禁用不可拖拽，readonly 可选择聚焦。颜色数值为诊断数据，隐藏占位符、透明边框和禁用控件不能直接按普通必要文字/边界计算验收。
- 已填写正文在两主题所测非禁用状态最低分别约 12.49:1 / 13.46:1；浅色常规可见占位符仍低于 4.5:1。共享弱边界及 Dark Error 等旧 finding 不因继承而关闭。
- 样例覆盖空值阻止、Enter 换行、保存中禁用、失败保留、重试成功、取消恢复已保存值、拖拽、390px 窄屏和 forced-colors Focus。

## 既有治理阻塞

对 `321e1a0` 的独立只读导出快照，保留用户原有 V2 工作包，并让 Git 只读查询同一实际 HEAD/remotes；运行原版 boundary 脚本复现与当前完全相同的 4 条结果：

1. V2 `证据/css-cascade-reproduction.html` 未登记在旧 Day 3 完整源码清单。
2. V2 `证据/selector-scope-reproduction.html` 同上。
3. 实际已有本地 HEAD，但旧 Day 3 登记仍是 `localGitCommit: not-created`。
4. 实际已有 `origin`，但旧 Day 3 登记仍是 `remoteGit: not-configured`。

这些不是 Textarea 新增失败。RN-07 自身范围验证通过，但不能宣称全库治理全绿；未删除 V2 文件、修改 remote 或改写冻结历史以绕过检查。

视觉来源：已核对 Classic TextArea SCSS 与尺寸审核；使用 Rain Next 现有 fieldFrameRecipe、Input control reset/forced-colors、FormItem 与 Reading/Small。没有改写旧字段视觉或基础 Token。

初次实施时：独立审阅 not-run；Human Gate awaiting_human；contrastAcceptance not-granted。真实系统 IME、屏幕阅读器、物理触屏和 Firefox/WebKit 未验证。本地样例不持久化；刷新清空。当前限定视觉验收见下文。

## 2026-09-13 拖拽角标留白修正

用户确认“文字留白与角标位置互不牵连”并授权“确定。开始实施”。本次在 RN-07 System Mode 内，仅调整 Textarea 自身两个样式位置：root 横向 padding 为 0，control 横向 padding 为 12px，纵向仍为 8px。同步 Manifest 与实施记录；未修改共享字段配方或验收状态。

在 1440px 与 390px 视口，对修改前后的同一课程说明控件测量：原生 control 右边缘距外框从 13px 改为 1px，底部仍为 1px（均含外框 1px 边框，非斜线像素间距）。两种宽度下，外框位置和尺寸、文字内容区域四边坐标均完全相同；已查看前后控件截图，原生角标回到可见框右下角。

- 浅/深色 × 常规/紧凑 × 三种外观 × 六个真实字段，共 72 组浏览器测量通过：control 的右、下边缘均贴合外框内沿；文字 padding 全部为 8px 12px。
- `pnpm test:e2e tests/e2e/textarea.spec.ts`：3/3 通过（7.1s），包含原生拖拽、禁用、聚焦、窄屏及保存/失败/重试/取消。
- `pnpm test packages/ui/src/textarea/textarea.test.tsx apps/playground/src/docs/components/textarea-page.test.tsx scripts/textarea-rn07.test.ts --maxWorkers=2`：3 文件 / 6 项通过。
- `pnpm verify:tailwind-b2`：通过。

本次未重跑类型、生产构建与全库治理；前述历史验证和既有治理阻塞仍独立保留。未新增运行逻辑、依赖或测试框架。修正完成时 Human Gate 为 awaiting_human；该次实施确认不等于调整后的人工视觉验收，其他浏览器原生角标绘制尚未验证。

## 2026-09-13 限定视觉验收

用户原文：“视觉验确认”。当前 `humanGate=accepted`，仅覆盖 `textarea-resize-handle-and-text-padding-runtime-visual-only`：原生角标与可见外框右下角对齐，文字继续保持左右 12px / 上下 8px 留白。

本次按 RN-07 System Mode 同步阶段决策、Manifest、Registry、实施记录、精确授权校验与对应测试，没有调整组件或样例实现。完整 RN-07、其他视觉范围、对比度、独立审阅、跨浏览器/真实设备/辅助技术、发布、迁移与 Git 不由此验收推导完成。

本次记录验证：RN-07 授权/元数据测试 2/2 通过；Tailwind B2 与 Evidence 校验通过。测试覆盖缺失/篡改决策字段、扩大范围、未完成实现，以及旧 awaiting_human 记录仍有效。首轮发现缺失完整决策时校验返回 undefined，已统一为布尔 false 后复跑通过。未重跑组件浏览器检查、类型、构建与完整治理；既有治理阻塞保留。

## 2026-09-14 技术收口

用户授权“好的。继续完成RN-07 的建设”。本轮为 RN-07 System Mode 的技术收口；Textarea 仍为 registry-candidate，样例仍为 local-experiment。实际增量为使用说明、独立审阅与精确状态守卫、三浏览器专项配置、原生字段/几何检查、V2 台账执行引用及本次证据；Textarea 运行实现与共享颜色配方没有修改。

### 验证结果

| 检查 | 结果 |
| --- | --- |
| [独立技术审阅](independent-review.md) | 通过，未发现功能阻断项；收口增量复核通过 |
| 字段、样例、类合并及 RN-07 授权定向单元测试 | 6 文件 / 56 项通过 |
| Chromium / Firefox / WebKit | 15/15 通过；每引擎 5 项，涵盖状态矩阵、窄屏保存/失败/重试/取消与拖拽、原生 required/maxLength/readonly/FormData、forced-colors 键盘焦点 |
| 实际布局测量 | 3 引擎 × 2 主题 × 2 密度 × 3 外观 × 6 字段，共 216 组；文字 padding 为 8px 12px，编辑区贴合外框内沿 |
| 类型检查 / 生产构建 | 通过，构建原有大分块提示保留 |
| Lockfile / Workspace / Evidence / Tailwind B2 / Tokens | 通过；项目依赖与锁文件未变化，只补测试浏览器缓存 |
| 全库治理 | 仍被上述 4 条历史 boundary finding 阻塞，未扩大权限或改写冻结历史 |
| V2 工作包校验和 | 15 条均匹配；只更新新增执行引用所涉及的入口与台账两条 hash |

复跑：`RAIN_TEXTAREA_EVIDENCE_DIR=evidence/runtime/textarea/2026-09-14 pnpm test:e2e --config tests/e2e/textarea.config.ts`。配置只选择 Textarea 测试，产物按浏览器分目录；原有默认 Chromium 配置不变。若环境未装浏览器，使用已安装 Playwright 的 `install firefox webkit` 准备缓存。

初次跨浏览器运行暴露的是测试操作假设：Firefox 在最后一个可聚焦字段按 Tab 后没有移动到另一个页面控件，反向 Tab 因而落在前一个字段；已改为从前一个真实控件向前 Tab 进入目标并检查 focus-visible。WebKit 窄屏点击取消后，课程说明角标可能在视口外；已在拖拽前滚入视口并连续移动鼠标。独立浏览器探针确认只读字段可正常键盘进入，WebKit 原生拖拽可增加高度；未为通过测试修改组件行为。截图禁用过渡动画以保留稳定的最终视觉。

### 产物与尚未关闭的验收

- Chromium：[浅色](2026-09-14/chromium/light.png)、[深色](2026-09-14/chromium/dark.png)、[窄屏](2026-09-14/chromium/narrow.png)、[测量](2026-09-14/chromium/light.json)。
- Firefox：[浅色](2026-09-14/firefox/light.png)、[深色](2026-09-14/firefox/dark.png)、[窄屏](2026-09-14/firefox/narrow.png)、[测量](2026-09-14/firefox/light.json)。
- WebKit：[浅色](2026-09-14/webkit/light.png)、[深色](2026-09-14/webkit/dark.png)、[窄屏](2026-09-14/webkit/narrow.png)、[测量](2026-09-14/webkit/light.json)。

已抽样查看各引擎、深浅主题和窄屏截图，未见新增布局错位；这不是人工视觉接受。原生角标绘制随引擎不同，编辑区与边框的几何关系一致。

当前仍需分别处理：

1. **整体视觉接受**：已有接受仍只覆盖角标与文字留白，不扩展到整页、所有颜色或所有浏览器。
2. **共享颜色问题**：本轮 Chromium 复测常规描边的浅色可见占位文字约 3.708:1，浅/深常规描边约 1.558:1 / 1.568:1，深色错误描边约 1.408:1，仍是待处理 finding。正文所测非禁用状态最低约 12.49:1 / 13.46:1；禁用、隐藏占位符和透明边框不能按普通必要文字/边界直接判定。继承共享配方不等于接受其对比度，也不因此静默改动 Input / Select 的颜色。
3. **真实设备与辅助技术**：系统中文 IME 候选交互、屏幕阅读器和物理触屏尚未验证。Playwright 输入、桌面浏览器内核和 forced-colors 模拟不能代替这些人工检查。

功能建设、自动验证和独立技术审阅已完成；整体质量验收仍部分开放。未发布、未迁移、未写入 Figma、未提交或推送 Git；Switch / 富文本仍按业务需要另行安排。下一检查点是上述整体视觉及共享颜色的集中评审，不需要继续扩展 Textarea 功能来满足本轮合同。
