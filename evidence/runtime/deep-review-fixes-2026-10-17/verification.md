# 深度审阅报告：前三项工作包

日期：2026-10-17（Asia/Shanghai）。基线 `6a2364c8b0325a243b2de8ebe12361e305aab333`，本地 System Mode 修复。用户提供的审阅报告为分析输入；只执行本轮明确要求的前三个工作包。

## 审阅结论与处理边界

报告正确区分了实际执行、源码确认、待验证风险和历史证据。R01/R02/R05 属于真实消费者合同；R03/R04 需要精确 React/DOM 验证，懒加载焦点需要延迟模块加载验证；R06/R07 属于示例/文档可信度。保留架构、业务状态归属与现有组件尺寸，补消费闭包更符合本次目标。

本轮没有新增公共组件家族、改变品牌 Token 基础值、迁移业务或扩大旧人工验收。Button aria-disabled 合同、用途搜索、新需求盲测与 Figma 往返属于报告其他建议，未并入本轮前三项。

## 逐项结果

| 项目 | 当前处理 | 证据 |
| --- | --- | --- |
| R01 CSS 变量 | 12 处引用回到实际角色对应的 Token/局部尺寸；新增变量存在性检查 | [CSS 记录](css.md) |
| R02 Workspace | 内置操作只选择 allowedModes 支持的目标；不吞 reducer 异常；无法折叠时保持可用焦点 | [Workspace 记录](workspace.md) |
| R03 Input | 原生 reset 同步初值、FormData 和内部显示状态；尊重取消与受控所有权 | [Input / Tree 记录](input-tree.md) |
| R04 Tree | StrictMode cleanup 释放请求票据和 pending 状态；保留旧响应身份保护 | [Input / Tree 记录](input-tree.md) |
| R05 Starter | 从指南明确引用推导必读 Manifest，附便携索引及三组合消费 | [Starter 记录](starter.md) |
| R06 Field | 课程/满分独立错误、按阅读顺序定位首错；可复制示例与实际渲染共用完整源文件 | [Playground 记录](playground.md) |
| R07 当前状态 | 从当前状态摘要和真实 Manifest 生成首页数据；Benchmark 分开呈现实现/自动检查/人工确认 | [Playground 记录](playground.md) |
| 懒加载焦点 | 延迟 slider/drawer 两条键盘用例修复前失败；焦点现在随内容一起提交，离开后不抢回 | [Playground 记录](playground.md) |
| 三组合指引 | 筛选工具栏、分区表单、连续批改各有完整 TSX；明确尺寸、状态和改造面 | [使用指引](../../../docs/ai/composition-recipes.md) |

## 本轮实际验证

锁定依赖：Node 24.13.0、pnpm 10.28.1、React / React DOM 19.2.8、Vitest 4.1.11、JSDOM 29.1.1；未修改 pnpm-lock.yaml。

| 检查 | 结果 |
| --- | --- |
| Input / Tree 及相邻输入家族 | 12 个文件、157 项通过；见 input-tree.md |
| Workspace 状态与 DOM | 51 项通过；见 workspace.md |
| 合并后的受影响功能回归 | 13 个文件、204 项通过；日志 `logs/rain-review-unit-final.log` |
| 最后 Field 按字段清错修订 | G5 与日期表单 2 个文件、33 项通过；日志 `logs/rain-field-clearing-green.log` |
| 合并 Chromium 专项 | 最终 12 / 12 通过；覆盖 Tabs 四方向、Input reset、Tree StrictMode、延迟焦点、Field、三组合及首页 |
| 完整 pnpm typecheck | 通过，包括 Playground、Prototype、共享包和测试类型 |
| 完整 pnpm build | 通过；现有大于 500 kB 的分包提醒仍保留 |
| M1 / M2 新目录 | 两种均精确离线安装、类型检查、构建和构建后文件锁检查通过 |
| 受影响治理测试 | 44 个不同用例分轮全部通过：最终 Starter / Tabs / 本轮 successor 25 项 + 其余未修改的 19 项；原串行组 2 项重复读取超时，经只读作用域复用后通过，未调高时限或移除断言 |
| 完整 pnpm verify:governance | 通过：锁文件、工作区、证据、边界、Tailwind B2、Token、CSS 变量、Playground 状态共八项 |
| pnpm verify:icons | 899 / 899 图标来源身份通过，独立人审状态保留 |
| 最后新增治理测试类型、差异格式、锁文件 | 通过；pnpm-lock.yaml 无差异 |

以上用例有重叠，不相加冒充全库测试总数。本轮未重跑历史全部单元测试和全量 E2E，不沿用报告中的 3,577 项作为本轮结果。

## 治理处理

本轮修复触及已有按字节锁定的源码。新增有限维护 successor 保存本轮 before/after、精确文件清单与当前授权；原历史记录和旧校验继续执行。新增 CSS 变量与 Playground 状态一致性检查接入原治理链。针对旧 Token paint 记录只适配已修正的实际声明，保留阈值、pending 和未接受异常状态。独立只读审阅未发现移除旧检查或扩大 Gate 的变更。

最终 `pnpm verify:governance` 返回 0，八项全部通过；见 `logs/rain-deep-review-governance-final.log`。CSS 检查覆盖 1,701 个源码文件 / 13,099 次 Rain 变量引用；Token 检查覆盖 109 个消费者来源，原已知对比度失败与未证明组合继续单独列出。来源封存、旧 Gate 保留及变异拒绝测试的详细说明见 [治理记录](governance.md)。

## 独立边界

截图与自动化是本轮技术自查，不是用户视觉验收。全库对比度、Safari、读屏、真实触控、跨机器字体及全量端到端矩阵没有由本轮自动通过。包/在线 Registry 未发布，无 Figma 写入、业务接入、commit 或 push。
