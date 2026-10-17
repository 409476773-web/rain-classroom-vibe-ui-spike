# W7 收尾质量差额归属（2026-10-05）

本报告只审计当前事实和新增证据；没有修改产品、共享测试配置、历史结果或阶段。用户已接受当前阶段运行消费审阅并要求继续。工作包结束于 W8，没有 W9；继续项属于 W7 收尾。运行视觉接受不替代整体质量、对比度或辅助技术门。

## 全项目结果与已证明的历史边界

旧全项目记录：治理 exit1、图标 exit0、类型 exit1、单元 exit1、构建 exit0。单元为 **147 失败 / 1569 通过（1716，28 失败文件）**。147 不能统称为逐项已证明的旧问题。

- 97 项出现 `Invalid Token Foundations V1 history` 同一签名。恢复前批 phase 的独立运行仍产生该签名；这是签名来源证据，不是逐项前批重跑。
- 1 项 Core UI 数量不匹配：页面实际 9 家族，旧单元期待 8，旧浏览器期待 6。页面及其单元源与 W6 前保护哈希一致。
- 49 项未逐项归属，保留原失败和测试标题；本次不扩展修复其他组件。
- 类型唯一残项是 `packages/ui/src/command/command.test.tsx:20` TS2322，字面量回调参数窄于 `CommandGroupData`；测试和产品 Command 源均与前批哈希一致。
- 前批 phase 精确恢复后，治理仍报冻结 B2/历史 Gate 解析与根 verify/script 集合精确字符串差异。这些已复现项可以称历史问题。asset-index 两项只触发同一历史解析错误，没有证据证明本批导航索引新失败。

来源：[全项目结果](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/full-quality/results.json)、[原始单元日志](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/full-quality/test.log)、[前批治理复现](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/full-quality/governance-prebatch-baseline.json)。JSON 附全部 147 项准确标题和 28 文件计数。

## 五项浏览器失败

全量尝试在 5 个失败后停：**172 通过 / 5 失败 / 516 未运行**；另 1 个非测试错误是达到 stop policy 后停止。516 不表示失败或通过。隔离源副本中的旧 spec 混用 4173、4174、5369，因此 172 通过不能统称为全部在隔离包环境中得到证明。

| 原用例位置 | 准确标题 | 原始入口 | 实际失败 |
| --- | --- | --- | --- |
| tests/e2e/core-ui.spec.ts:117 | the Day 3 Core UI page exposes truthful families and real interaction | http://127.0.0.1:4173 | component-family expected 6, rendered 9 |
| tests/e2e/learning-report-a.spec.ts:9 | report V2 preserves filter scope, keyboard readings and recovery | http://127.0.0.1:5369 | page.goto net::ERR_CONNECTION_REFUSED before business assertions |
| tests/e2e/learning-report-a.spec.ts:71 | report V2 keeps three breathable chapters, blue gaps and a locally scrolling mobile table | http://127.0.0.1:5369 | page.goto net::ERR_CONNECTION_REFUSED before business assertions |
| tests/e2e/navigation-rebuild-closure.spec.ts:6 | closure S04: keyboard and pointer follow the icon child destination | http://127.0.0.1:4173 | 30s timeout waiting for global navigation disclosure on Playground fallback page |
| tests/e2e/navigation-rebuild-closure.spec.ts:22 | closure S06: inset clips rounded corners, scrolls independently and survives collapse | http://127.0.0.1:4173 | 30s timeout waiting for .nr-workspace on Playground fallback page |

来源：[原始浏览器日志](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/full-quality/full-e2e.log)、[隔离运行边界](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/full-quality/full-e2e-isolation.json)。

两项旧导航闭包使用相对 `/#token-first-g3?rebuild=1`，被默认 chromium 指向 Playground 4173；该 route 的真实消费者是 [Prototype 路由](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/apps/prototype/src/main.tsx:41)。原全量尝试时 shared config 的 Prototype 项目只包含 bm-a/m2。review02 的 5204 也是 Playground 消费验证入口，不能仅改为 5204 后声称旧导航有效。

**局部 fixture 修复**：root 已把该 spec 明确归入 `chromium-prototype` 且从默认 chromium 排除，保留所有原期待值。本审计代理仅运行独立诊断，结果见末节。原 spec 把截图硬编码到 `evidence/runtime/navigation-rebuild-v03` 相对路径，诊断必须使用独立临时工作目录以保护历史截图。源工作区诊断不称独立交付包验证。

## 对比度角色与复杂背景

历史 R/S 审计：75 场景、5751 纯色 CSS 估计样本、1724 低于阈值的重复样本、90 未测样本。最低估计 1.746。覆盖 R/S，不覆盖 E1–E6，也未覆盖 review02 的新消费者改动。重复宽度/主题样本不是 1724 个独立缺陷。

历史记录缺少语义角色、own-text 范围、disabled/aria-hidden 和视口/overflow 裁剪证明，只能以 tag/class 辅助分组，不能自动宣告装饰豁免。90 复杂背景样本中：R2 封面 18（12 课程内容，6 个源码明确 aria-hidden 的 ∫）；R5/S6 幻灯片梯度 72（36 标题 + 36 CLASS/1 标签），内容部分仍需渲染背景测量。图标、焦点和边框不在该文字估计结果中。

当前 review02 已新增独立角色和渲染背景差额证据：[对比度报告](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/closeout-2026-10-05/contrast/contrast-audit.json)，快照 `navigation-v042-f43719b448cf6043`，**22 个真实浅色状态 + 1 个 dark 诊断**；当前源与已接受视觉不变。以下真实浅色样本排除 dark 诊断。浅色辅助信息偏好仍作为设计偏好，未计作合规豁免。

| 当前角色 | 重复样本 | 活跃文字低于阈值 | 未验证 |
| --- | ---: | ---: | ---: |
| 任务标签/标题/内容（正文子集另外核对） | 543 | 43 | 7 |
| 当前对象身份 | 222 | 49 | 4 |
| 状态与动作 | 195 | 75 | 1 |
| 辅助元数据 | 298 | 225 | 12 |
| 表单提示/placeholder | 17 | 17 | 0 |
| 禁用控件 | 12 | 0 | 3 |

真实浅色合计 **1287 文本节点、409 活跃文字重复低值、27 未验证**。报告去重为 **143 个角色/文本/颜色/背景/字号组合**，不等于 143 个独立缺陷。任务角色 43 个低值主要是标签，不能据此推断正文整体失败：明确正文子集 40 个，**39 个实测均达到阈值，最低 6.5648**；另 1 个 E4 临时知识面板状态遮挡的段落没有有效比值。

实际取样包含 **202 个 Alpha 背景样本、9 个父 opacity 样本、133 个复杂背景实测样本**（主要 SVG 背景）；当前 E1–E6 **没有真实 gradient 背景样本**，不会关闭旧 R/S 封面/幻灯片梯度差额。禁用控件 9 个实测另外记录，3 个仍未验证。非文本与全状态、真实 Safari/VoiceOver/Windows 仍各自保留。独立报告附遮挡、像素与透明度方法局限。

## 继续项与范围决策

本次已完成一个导航验证动作：**用当前工作区源、正确 Prototype host，保持原 spec/期待值，运行整个 closure 四项并新增证据**。它验证两项原失败只需 runner fixture 修正，并补两项此前未运行的旧导航证据；不会关闭原 516 未运行记录或整体质量门。

剩余可新增证据：按 application/route 枚举未运行列表后仅选导航拥有的子集；实际 Safari；真实 VoiceOver 的焦点/区域/状态播报；Windows 字体渲染；非文本与 hover/focus/恢复状态对比度；W8 新目录 frozen install（既有缓存链接不等于干净安装）。环境不可用时记录未运行。

需要新范围决策的工作：修改已接受共享浅色视觉或全局 Token 来消除比值差额；批量修复其他组件治理；Core UI 数量政策及报告页 fixture 维护；公共资产成熟度、生产服务、迁移、Figma、发布和 Git。真实导航缺陷或局部导航 fixture 可以在已有 W7 范围内由 root 接收具体修复。

## 新增旧消费者验证结果

正确 Prototype host 上原断言四项 **4/4 通过，5.432s**，另保留原两失败的 2/2 先行诊断。root 已做两数组 fixture 归属修正；discovery 737→737，整文件 4 项迁移，733 其他项不动，0 drop/add/duplicate。227 历史证据和 31 产品源哈希未变。见 [独立诊断报告](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/closeout-2026-10-05/legacy-consumer-diagnostic/summary.json)、[集合比较](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-v042/w7/closeout-2026-10-05/legacy-consumer-diagnostic/discovery-comparison.json)。原 172/5/516 总体事实仍保留。
