# G1–G6 当前版本收尾

状态：本轮本地工程收尾完成；P5 独立新任务试用已完成，P6 本轮整体复核及 Input Group 说明修订候选已获用户确认，本轮本地收尾与 P5/P6 计划交付完成。范围与授权见[本轮计划](../../../../docs/plans/2026-10-17-g1-g6-closeout-and-p5-p6.md)。

当前工作区 `card-v2`，分支 `codex/card-v2`。保存初始源摘要与已有 Git 前态；工程验证的新证据写入本目录，P5 独立交付另存下列 outputs 目录，历史证据保留。

## 最终候选检查

冻结来源签名：`db36f041dc9326c15ad0d6d4c9858e3db9e0db0b0a11191621ca956c267525d0`。最终正式检查见 [checks-complete.json](checks-complete.json)，五项退出码均为 0，前后来源签名相同。治理通过指登记、来源及权限检查有效；颜色输出仍保留低于阈值和 `failed-with-unproved` 的记录，对比度接受不由本轮提升。

| 检查 | 最终结果 |
| --- | --- |
| `pnpm verify:governance` | [通过](complete-governance.log)，完整五段治理链 |
| `pnpm verify:icons` | [通过](complete-icons.log)，899 个可用来源身份 |
| `pnpm typecheck` | [通过](complete-typecheck.log)，工作区及测试类型 |
| `pnpm build` | [通过](complete-build.log)；保留原大分块提示，不据此声明生产性能验收 |
| `node scripts/asset-index.mjs --check` | [通过](complete-asset-index.log) |
| `pnpm test` | 通过，318 文件、3,570 项，0 失败／0 跳过；[摘要](unit/final-summary.json)／[完整结果](unit/final-vitest.json) |

同一运行体的四个受影响全文件 52 项及 6 项来源隔离均通过；最后只补返回类型的 JSDoc 泛型，两个签名的运行体逐字相同。最终签名下的类型、8 项定向及实际 fixture 正向均通过；精确归属见[最终三项复验](governance/final-three-verification.md)。最终整库另在同一 `db36f041…` 上实际完整执行：3,570/3,570，通过且退出码为 0，运行前后来源签名相同；见[运行记录](unit/final-run-result.json)。

## 初始正式检查

完整命令、退出码和耗时见 [checks-initial.json](checks-initial.json)。

| 检查 | 初始结果 |
| --- | --- |
| `pnpm verify:governance` | 失败；首先在 workspace 的 Drawer 历史来源保护处中断，后续治理入口未由该串行命令执行 |
| `pnpm verify:icons` | 通过，899 个可用来源身份 |
| `pnpm typecheck` | 通过，工作区包及测试类型 |
| `pnpm build` | 通过，保留图标与地图资源大分块警告 |
| `node scripts/asset-index.mjs --check` | 通过，引用、真实导出与生成内容一致 |

初始全库单元回归为 317 文件、3,563 项：3,243 通过、195 失败、125 跳过。失败全部来自 `scripts/**` 的来源链、历史夹具与交付检查；没有组件或应用测试文件失败。完整分类见[初始回归报告](unit/classification.md)。后续最终回归结果另列，不用初始通过数替代当前结果。

后续完整 `143a38cb…` 回归为 318 文件：315 通过、3 失败；3,570 项：3,550 通过、2 失败、18 因夹具准备失败未执行。两处旧样本／错误文本断言与一处夹具复制超时均已定位并定向修复。[完整中间结果](unit/final-attempt-03-summary.json)与原日志保留，不计作最终通过。

## 当前覆盖与实际改动

- [冻结目录映射](coverage.md) / [机器快照](coverage.json)：G0 18 项，G1–G6 46 项，结构映射合计 64/64。不是新建 64 个同名公共组件，也不是运行或人工验收 64/64。
- Label/Field 复用 FormItem；Input Group 为局部组合；NativeSelect 保留 API 并按原决策合并展示到 Select；Data Table 为 Recipe。旧 G1/G2 Registry 创建快照和 SHA 保持不变。
- 根 README 更正当前入口与“调宽/Sidebar 尚未建设”的过期说明；AI 阅读入口统一为当前 Rain Designer + prototype-design，旧经验库按需查阅；G6 明确为 11 项 UI 与 1 项配方。
- 独立 Starter 补齐两份新组合合同，未附带的原始追溯链接明确说明；文档闭包与防篡改测试保留。
- 治理按精确后继接续已有 Attachment/Composer/Questionnaire 等实际成果；保留原封存验证、原证明、旧 Gate 与负向保护。治理链首轮修复见[阶段记录](governance/verification.md)，最终候选的历史夹具与只读操作修复见[操作边界复验](governance/operation-boundary-verification.md)；整库发现的最后三处问题与最终类型签名修正见[最终三项复验](governance/final-three-verification.md)，[独立审阅](operation-review.md)逐阶段记录精确差额。
- 封存来源检查的默认并发设为 2、默认用例时限为 60 秒；既有 20/120 秒显式时限、60 秒夹具准备和 20 秒边界子进程时限保持。只读作用域在每次操作结束后释放，公开返回值保留隔离；所有 callback 实际执行，磁盘变异后重新验证。
- [本轮源差额](source-delta.json)核对 36 份既有源的实际变化与 2 份新增治理源；[公共包保护核对](protected-packages.json)确认任务开始时的 2,492 份公共包文件在最终整库结束后仍 0 变化。
- G6 总浏览器用例按当前示例操作更新，历史独立 consumer 与当前构建分别执行；Composer 反向动画测试等待实际帧变化后采样。公共组件的视觉和行为源码没有因本轮收尾改变。

## 浏览器与有限画面复核

| 范围 | 实际结果 | 证据 |
| --- | --- | --- |
| G1–G3 当前构建 | 15/15 | [报告](browser/g123/report.json) |
| G4 当前构建 | 20/20，桌面/390px | [报告](browser/g4/report.json) |
| G5 当前构建 | 14/14，桌面/390px | [报告](browser/g5/report.json) |
| G6 当前构建 | 22/22，桌面/390px | [报告](browser/test-repair/current/report.json) |
| 10/14 冻结 consumer | 2/2，独立历史范围，不计当前 P5 | [报告](browser/test-repair/frozen-consumer/report.json) |
| 当前附件/Composer 专项 | 初跑 48 通过/2 失败；反向动画采样修正后两项复验 2/2 | [初跑](browser/g6-current/report.json)、[修复复验](browser/composer-motion.log) |

以上分组回归合计 71 项，另保留专项及冻结 consumer 的独立计数。旧 G6 总用例失败/中断与配置未启动日志均保留，不计通过。更新原因及等价覆盖见[G6 测试收尾记录](browser/test-repair/verification.md)。截图观察及边界见[有限画面复核](visual-review.md)；不据此新增人审状态。

## P5：固定资产上的独立新任务

原计划 P1–P4 已有工作台与报告的限定成果，当前记录引用这些既有成果，不重新实施或扩充原视觉接受。P5 使用不继承前期调优上下文的独立执行者，按[本轮虚构业务需求](p5-brief.md)完成新“课程资源引用更新”页。

- [打开新原型](http://127.0.0.1:5518/)；[完整交付报告](../../github-review-2026-10-17/p5/README.md)。仅本机预览，本地模拟，不替换真实资源。
- 固定输入为 `rn14-fea18282c8c33b5b`。原始导出及 `--check` 均通过；独立副本离线安装、初始与最终类型/构建通过。
- 首稿、首次自查和修正结果分别留存；13/13 组浏览器行为检查通过，0 pageerror。覆盖可编辑/只读边界、跨筛选选择、版本比较、取消/放弃、失败重试、连击去重、保存快照重开、键盘与390px。
- 父执行者查看了桌面与窄屏，发现单列仍使用“从左侧选择”的方向文案；已改为“先选择需要更新的位置”。该微调后两视口零选择状态 2/2、类型与构建通过，另存新节点，不覆盖首稿或此前结果。
- 父执行者独立核对 2,494 个公共源、锁与基础配置，冻结基线和原型均 0 变化；子执行者另核对含 BM-A/B 兄弟源码的 2,500 个原始文件，亦为 0 变化。新页面仅改三份页面私有源码。
- 另外在真实浏览器临时移除并恢复唯一一条局部规则：390px 的目标 Tag 几何实际变化并恢复，1440px 不受该窄屏规则影响；相邻 Tag 与比较按钮逐字段保持原状，按钮开关与焦点恢复实际执行。两视口 2/2 通过、0 pageerror，公共与页面私有源码摘要保持不变。[局部隔离证据](../../github-review-2026-10-17/p5/isolation-check/README.md)仅覆盖所测规则、实例与状态。
- 用户反馈已收到，标准 Select、小尺寸二级比较按钮和库内 PDF 图标已修订，用户回复“确定”；[本轮三项视觉修订接受](../../github-review-2026-10-17/p5/user-feedback-2026-10-17/manual-acceptance.json)绑定当前页面源码。[修订验证](../../github-review-2026-10-17/p5/user-feedback-2026-10-17/verification.md)含3视口与13组交互回归通过。P6本轮整体结果已另获用户确认，成本与效率 `not-measured`。

## P6：整体审阅检查点

2026-10-17已接续完成[P6当前版本复核](p6-current-review/review.md)：7组实际入口/主流程检查、工作台与报告整页观察、覆盖限定及返工归类。发现Input Group说明身份误标，已在独立候选修正，原封存源不改；用户随后回复“确定。”，当前本地整体结果及修订候选已确认，见[确认记录](p6-current-review/manual-acceptance.json)。

已准备[当前版本人审导航](p6-review.md)：当前 64 项结构映射、工作台/报告既有局部成果索引、新任务首稿/返工和交互证据。两个预览入口均实际打开并返回 HTTP 200；导航内 17 个链接通过检查。整体人工评审应以当前实际结果为对象，组件级验收仍沿各自记录；本轮不统一提升成熟度。

最终工程复验已完成；P6本轮呈现的首版本地整体结果及说明修订候选已由用户确认；组件级独立Gate不统一提升。对比度与实际绘制未证项、真实 Safari、读屏、物理触控、跨机器字体、真实服务、生产迁移和发布仍保持各自边界；未执行 Git 提交、推送、Figma 写入或发布。

交付文件与两个本机预览的可达核对见 [delivery-links-check.json](delivery-links-check.json)；该检查只核对文件存在与 HTTP 响应，不新增视觉接受。
