# 当前 W7 工程收尾 · 2026-10-06

W6运行/AI消费与W8本地交付已完成；人工对比度与可读性已完成。W7整体质量门仍开放。当前原始证据见[工程收尾报告](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/README.md)和[机器汇总](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/summary.json)，已接受review02源码/预览ZIP及运行视觉保持。

| 检查 | 当前结果 |
| --- | --- |
| 全仓类型、构建、图标 | 通过；根类型与最后测试类型检查exit0，构建/899图标exit0 |
| 全仓单元 | 166文件，1763实际通过，0失败/0跳过，exit0 |
| 默认全量浏览器 | 原737项：719实际通过/14意外失败/2旧预期失败/2采集跳过，exit1；没有五失败截断 |
| 原失败修复复测 | 13项意外失败关闭；逐身份汇总732实际通过/1账户hover意外失败/2旧预期失败/2采集跳过；不是单次全量绿色 |
| 账户hover修复候选 | 隔离G1完整14通过；单行旧Token恢复，未采用，基线失败不回填 |
| 全新目录安装交付 | 空store正常冻结安装、133测试、四workspace类型/构建、18路由、83运行文件一致，完成 |
| 治理 | 前五阶段通过；Token210诊断仍开放（18导航旧扫描、192其他归属）；有限登记不等于颜色自动合规 |
| 对比度与可读性人工检验 | 用户已确认完成；原测量保留，不重新索要此人审 |
| 实际Safari/VoiceOver | Safari由用户明确留人工；VoiceOver尝试后未取得有效播报；临时设置和自有测试进程已恢复/清理 |

[逐身份浏览器汇总](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/browser-current-coverage.json)没有把复跑次数加成用例总数，也没有把Playwright的expected桶全部叫通过；两项旧Radix比较失败仍按原test.fail注释记录。[候选说明](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/agent/g1-browser/account-hover-candidate-v2.md)明确真实产品缺口和独立候选结果，候选不继承review02人审。

本轮不发布、不迁移、不写Figma、不做Git操作；旧日志、失败与快照不改写。一次早期默认浏览器运行在实际工作区执行，可能覆盖部分非导航旧canonical截图/JSON，此前字节恢复未证明；后续使用隔离副本。下方制作日期的G3/147单元失败/5浏览器失败及516未运行表述均为历史，当前状态以上表为准。

---

> 本次继续收尾：已增加[全仓失败归属与当前消费对比度证据](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/closeout-2026-10-05/README.md)。旧导航闭包测试只修正应用项目归属，原断言保持；实跑与收集检查单列。原全仓5失败/516未运行和147单元失败不被新的窄项结果覆盖。

> 后续决定（2026-10-05）：[当前G3运行/AI消费及本地交付确认](G3-acceptance-review02.md)已登记，接受review02快照`navigation-v042-f43719b448cf6043`。整体W7质量/完整对比度/AT仍开放。本文下方保留制作时的结果与pending表述，不改写旧快照或失败；当前交付以新决定中的review02包为准。

# W7 · 导航专项回归与全项目质量门

状态：导航限定技术验证通过；全项目质量门失败；G3、完整对比度与 AT 保持待处理。

本机：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`；分支 `codex/card-v2`；开始及结束 HEAD `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。用户明确授权“按 W6 → W7 → W8 推进导航相关的组件建设”。System Mode 治理/专项验证，新增消费页面为 Prototype Mode。原有 dirty/untracked 工作按 [2396 文件保护记录](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w6/protection-before.json) 保留；未进行提交、发布、Figma 写入或业务迁移。

冻结批准原稿 SHA256：`d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c`。G1 A1/A4/R2、G2 候选13的历史人工视觉接受保留；本批新增 E1–E6、行为修复及独立包不自动继承 G3 或完整无障碍接受。

## 合同、修复与兼容

[N01–N38精确映射](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/regression-map.json)包含36条实际浏览器合同、N30存储单元、N34旧消费者70项单元。N36的旧2px顶部线要求已由用户接受的Review11渐变/无顶线替代，未伪称原规则通过。

唯一新增共享行为修复：`packages/layouts/src/workspace.tsx` 的既有 pointer-leave 在临时层已经因 Escape 关闭、但仍带 hover suppression 时清理当前区域。保留240ms延迟、禁止立即反弹、焦点和偏好规则；无 CSS/Token 改动。新增单元先红后绿，复核通过。`workspace.test.tsx`登记回归。两份 Registry 当前源锁与 workspace Manifest 只补当前修复/历史来源；旧 G2 43源锁不覆盖。[来源差额](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/repair-source-lineage.json)：workspace `1d8677dc…` → `c74c1373…`。

公共 API 检查 UI358 / Layout49 名称、55导航符号、16项导航 Registry/Manifest，无新增断裂/重复出口。旧 Tabs/Select/Card 的 API/默认调用保留，无废弃或自动迁移。Figma 页级参考保持来源身份，未冒充组件绑定。[API与兼容报告](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/api-compatibility.md)。N13使用实际R4/R6保存处理器的有效spy：布局操作0次、明确保存1次并实际反馈，覆盖本地Mock，未虚构生产提交。

## 实际通过项

| 命令/检查 | 结果 | 证据 |
|---|---|---|
| `pnpm exec vitest run` + 导航/UI/Layout/Recipe/W6明确12文件 + `--maxWorkers 1` | 119/119，exit0 | [最终日志](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/navigation-final-unit.log) |
| `pnpm -r typecheck` | 5包，exit0 | navigation-final-package-typecheck.log |
| `RAIN_W7_BROWSER_MATRIX=all pnpm exec playwright test --config tests/e2e/navigation-v042-w7.config.ts` | 232/232，exit0；Chromium150、Firefox41、WebKit41；无skip/flaky | [浏览器总结](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/browser-final-summary.json) |
| `node scripts/navigation-v042-w7-quality.mjs` | 387渲染组合，0失败/0页面错误，exit0 | [三引擎矩阵](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/matrix/2026-10-04T09-43-11-251Z/report.json) |
| Tabs15 / Select50 / Card5完整单元 | 70/70，exit0 | compatibility-old-consumers.json |
| W6独立消费者复跑 | 13/13，exit0 | w6/browser-after-w7-repair.log |
| 全项目 `pnpm build`、`pnpm verify:icons` | exit0 | full-quality/results.json |

矩阵：1200/1440/1600、DPR1/2、light/inverse、九业务子场景与七个S状态；截图保留原尺寸。原稿/历史候选、失败轮与 trace 独立保留；387是本轮运行几何/加载检查，不能替代人类视觉判断。

## 失败与未验证

全仓命令已真实执行，见 [工程结果](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/full-quality/results.json) 和 [最终汇总](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/verification-summary.json)：

- `pnpm verify:governance` exit1；后续 evidence/boundaries/tailwind/tokens 分项也保留真实结果。旧 phase/精确脚本合同在恢复批前文件的隔离副本可复现，未静默改旧阶段。
- 根 `pnpm typecheck` exit1，余一条旧 Command test TS2322；六条导航 fs 声明已补，W6/W7新诊断0。
- `pnpm test --maxWorkers 1` exit1：1716测试中1569通过/147失败，160文件中132通过/28失败；范围外组件与治理失败详见原日志。仅已复现项称已知旧问题，未将全部147项自动归因为旧问题。
- 隔离源副本 `pnpm test:e2e --workers 1 --max-failures 5` exit1：172通过/5失败/516未运行，另1个非测试错误；在五失败阈值停止。旧UI/教学报告/v0.3导航关闭失败保留，不称全项目浏览器通过。
- 对比度：75场景、5751实色CSS文字估计、1724低于阈值样本、90复杂背景/opacity未测，最低估计1.746。属于CSS估计，不是完整像素/非文本审计，不能登记通过。[详细审计](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/contrast-audit.json)。没有擅自改变已接受视觉或全局Token。
- VoiceOver、实际Safari未运行；Playwright WebKit不等于实际Safari验收。完整读屏/对比度、G3和生产化仍开放。

所有首次失败和选择器/旧假设修正保留。[81文件最终冻结](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/final-source.json)供W8复制包核对；下一批交付准备可继续，整工作包验收仍不能关闭。
