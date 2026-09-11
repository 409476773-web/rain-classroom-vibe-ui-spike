# Token Foundations V1 第 0/1 批验证

启动：2026-09-05；技术收口：2026-09-06。第 0/1 批实现完成、自动检查通过、独立技术审阅通过。2026-09-12 用户已确认基础页排版、线条、圆角与间距的运行视觉；整体 Human Gate 仍为 awaiting_human，限定决定见文末。下方 2026-09-05/06 日志及“待验收”说明保留为当时历史。

本批交付 57 个 Light Category 事实与 16 档 Alpha、19 档字号、14 档固定行高加 Equal、10 个排版预设、6 档 Line、7 档 Radius、16 档 Space，以及单源生成、桥接、受控消费检查和独立预览。Size/Density 仅形成首组候选设计。

## 原有运行保护

开工前归档：`pre-token-runtime.tar.gz`，SHA-256 `39b6253185367626ddf8f66e6b1cd99ed2e8addd4937e7c93f3c12ad48289280`。归档包含 1,963 个文件；对应逐文件索引见 `pre-token-runtime.json`，二者保持冻结。

本次现场比对归档中的原 UI components、icons、recipes、B2 benchmark、B2 运行证据及 pnpm-lock，共 1,850 个受保护文件：**0 个变化**。旧 42 项 Semantic、组件值、Focus、Motion 与图标树另外由原 B2 严格检查保护。旧 B2 状态在 `phaseHistory.tailwindB2` 保存完整快照，哈希验证继续生效。

这不是重新测量旧 B2 benchmark，也没有重写其 baseline/trial。改动基于独立 Token 阶段登记。

## 已取得的专项证据

- 阶段/历史治理：205 项专项测试通过。
- B2 增量与旧冻结回归、Space/Radius：155 项专项测试通过。
- 合并：16 项定向测试通过；生成段外重复值复现检查通过。
- 新浏览器专项：4 项通过，覆盖六档 border/h/w、solid/dashed、分隔 Recipe 不变、Radius/Space、排版局部调整及 Equal、Data Parts、Alpha 替换、页面外样式隔离、导航焦点与 390px 页面宽度。
- 已打开本地交互预览 `http://127.0.0.1:5173/#token-foundations`。

最终 `pnpm verify` exit 0：[完整日志](final-verify.log)。单元测试 35 个文件、760 项通过；Chromium 40 项通过；897 个图标身份通过；类型、构建、依赖锁定、阶段、证据、边界、B2 和 Token 检查均通过。`verify:reuse-audit` 另行通过（75 个资产，snapshot 模式）。文档 30 个本地链接与代码围栏检查通过。

最终截图为 line.png、geometry.png、typography.png、colors.png，独立技术审阅见 [independent-review.md](independent-review.md)。

## 人工视觉检查范围

线条在实际设备缩放下的细腻度；圆角和间距档位；十个排版方案的中文/英文/数字混排；目标机器实际使用的 PingFang SC / LINE Seed；颜色层级与真实承载面。页面中黑白画布只是展示例外，不配置 Dark，也不替代产品表面对比度证据。

Human Gate、组件迁移、Figma、资产发布与 Git 均独立，未由自动测试批准。

本地浏览器已现场检查完整预览、颜色矩阵和排版/几何截图；未替代用户对字体与最终视觉的裁决。新生成器与消费者校验的后续运行方式见 [AI 使用说明](../../../docs/ai/token-selection.md)。

## 2026-09-06 视觉反馈：关键数据可选其他字号

用户确认关键数据也可使用其他字号。当前仍处于 Token Foundations V1 的 System Mode 视觉验收；36 / 42 / 700 保持默认组合，运行逻辑本来就支持字号与行高覆盖。本次仅更新 `typography-contract.ts` 的用途说明、`typography-panel.tsx` 的“默认字号”列名，并同步排版设计规范与 `docs/ai/token-selection.md`。没有改变 Token 数值、增加预设或创建新资产。

本次定向验证：`verify:tokens` 通过；Typography 合同与面板 10/10 测试通过；现场浏览器将关键数据调整为 24px / 32px，计算样式确认为字号 24px、行高 32px、字重 700。预览已保留该局部组合。复核者确认无须改变运行逻辑。

本次未重跑整库检查，以上完整日志仍属于批次收口证据。原 Registry Candidate、Human Gate awaiting_human，以及未授权的发布/Figma/组件迁移/Git 状态保持；下一检查点仍为其余视觉验收和首组 Size/Density 方案确认。

## 2026-09-06 预览修复：切换小字号后样本消失

用户截图及现场浏览器复现：关键数据从 24 / 32 只改字号为 14 后，旧行高 32 超过字号的两倍，面板校验隐藏了样本。上一项 24 / 32 的验证未覆盖只切换字号的操作，“无须改变运行逻辑”仅适用于公共组合能力，未发现这处预览交互缺陷。

本次只调整 `typography-panel.tsx` 的字号选择交互：原行高仍合法或为 Equal 时保留；否则从已登记固定行高中，使用现有组合校验选出距原行高最近的合法值，并同步更新选择框。帮助文字说明联动行为；手动选择越界行高仍显示错误，恢复完整方案和切换方案仍清除局部调整。公共 Token、预设及组合校验规则未改变。

验证先失败后通过：新增同一回归场景在 UI / Reading / Data 三类方案下均复现样本缺失；修复后 Typography 面板与合同 13/13 项通过，`verify:tokens`、`typecheck` 通过。新增处理曾因局部变量重赋值触发 Token 消费检查，已改为 const 表达式后通过，未放宽检查。`tests/e2e/token-foundations.spec.ts` 4/4 项 Chromium 通过，包含关键数据 15–9px 逐档、放大到 40px、实际字号/行高/700 字重，以及手动行高和 Equal 检查；对应既有四张演示截图由本次专项运行刷新。

现场浏览器确认 14 / 28、9 / 18、手动 14 / 20 的实际计算样式，页面停在关键数据 14 / 20。独立只读技术复核未发现实质问题。本次未重跑整库 `pnpm verify`，批次完整日志仍属于此前收口证据；Human Gate 继续等待用户视觉验收。

## 2026-09-12 基础页限定视觉验收

用户原话：“基础页通过； 综合页通过”。在本轮已说明的限定范围内，基础页的排版、线条、圆角与间距运行视觉已接受。精确决定登记于 [current-phase.yaml](../../../status/current-phase.yaml) 的 `tokenRefinements.foundationsPageVisualAcceptance`，范围为 `foundations-entry-typography-line-radius-spacing-runtime-visual-only`。

此次确认不包含颜色或对比度、组件 Token 映射、全局 Size/Density、其他机器字体表现、剩余真机检查，也不代替其他 Human Gate。总阶段及较广的 `foundationsAlignment` 仍为 `awaiting_human`；颜色相关接受与发现保留各自原范围。Figma、发布、业务迁移与 Git 状态未改变。

本次仅补充决定、严格范围校验与页面状态说明，没有改动 Token 数值、生成合同或几何样式。上述历史测试日志不作为本次重新执行的证据；本轮登记验证另见 [现有资产收口计划](../../../docs/plans/2026-09-12-existing-assets-closure.md)。
