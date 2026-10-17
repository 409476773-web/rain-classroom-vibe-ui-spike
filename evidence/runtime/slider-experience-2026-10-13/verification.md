# Slider 体验续批验证

日期：2026-10-13。用户在当前颜色认可和四方面审查后明确指示“开始实施”。本轮在 `.worktrees/card-v2` 实施；5397 服务已核对为此工作树的 Playground，实际入口为 `#slider`。

## 实施结果

- 刻度距轨道下缘 4px；default、compact 和粗指针命中区保持同一视觉间距。保留原轨道、滑钮尺寸与已认可的配色，键盘焦点不叠加悬停光晕。
- 阈值标签与精确输入就近，固定参照明确为“默认 60”；再次修改显示未保存，未变化的保存按钮禁用。窄容器读数随值同步。
- 双端输入组成字段组，提示简化为下限/上限；重合滑钮可向左展开下限、向右展开上限，首次有效展开后固定本次端点。沿用 Base UI，不增加 API 或拖动引擎。
- 非法和未完成草稿保留；操作中预览与已应用结果分开。拖动一端不覆盖另一端草稿，也不会顺带提交该草稿。错误区域预留空间，轨道位置保持。
- 音量、倍速放入同一紧凑参数面板，共用轨道列轴；窄屏显示标签/读数后用整行轨道。边界预设与外观对照折叠并后移。
- Manifest、使用指南与可复制例子同步；原有限来源绑定只刷新本轮所属文件的后继哈希，前置快照不改。

## 当前检查

| 检查 | 结果 | 记录 |
| --- | --- | --- |
| Slider、组合、G5 页面、InputNumber 单元测试 | 4 文件，75/75 通过 | [日志](component-tests.log) |
| 当前 Slider 浏览器专项 | 34/34 通过；1440px desktop 与 390px touch 仿真 | [日志](browser-tests.log)、[机器报告](browser/report.json) |
| 工作区及测试类型检查 | 通过；测试数据元组推断问题修正后重跑 | [日志](typecheck.log) |
| 工作区构建 | 通过；仍有既有大分块提示 | [日志](build.log) |
| G5 独立源码消费 | 通过；87 UI 文件、1857 打包模块 | [日志](consumption.log)、[消费包](g5-source-consumer.zip) |
| 本页有限颜色登记与原两处静止色约束 | 当前 CSS 对照通过 | [记录](scoped-contract-check.log) |
| 本轮所属来源哈希与前置快照 | 限定检查通过 | [记录](source-integrity.log)、[当前哈希](source-hashes.json) |
| 独立审查 | 当前限定范围通过；两项 P2 修复并复验关闭 | [审查记录](independent-review.md) |
| 专项治理测试 | 6 通过、11 失败，未标为全通过 | [日志](scoped-governance-tests.log) |
| G5 完整组件校验 | 失败于 Select 先前阶段/Gate 严格比较 | [日志](g5-components.log) |
| 五项全局治理入口 | 均 exit 1，沿用既有阻塞，未清理或放宽规则 | 下列日志 |

浏览器覆盖默认/紧凑、浅色/深色、刻度几何、键盘和指针重合展开、活动端提示、Escape、输入冲突及未完成草稿、保存/预览/应用、稳定错误区域、窄屏、减少动态效果、强制颜色。新行为先补失败回归再实现；两项审查问题分别有非法对端草稿回归和原生错误提示零宽回归。最后仅测试数据类型修正，不改变已通过的运行时实现。

## 治理阻塞与来源边界

专项治理与 G5 完整校验受 Select 的历史阶段/Gate 精确比较阻塞，部分治理临时夹具缺少 DatePicker closeout 的 `closure-baseline.json`；本轮未修改这些验证脚本或前置证据。五项全局入口还报告冻结 B2 历史、过期资产索引、既有命令集合、历史边界与 Token 声明等问题。分别见 [workspace](global-workspace.log)、[evidence](global-evidence.log)、[boundaries](global-boundaries.log)、[tailwind-b2](global-tailwind-b2.log)、[tokens](global-token-foundations.log)。运行时及限定来源检查不能替代完整治理通过。

当前工作树存在并行 DatePicker closeout 工作：在续批起点快照之后，其阶段由 in-progress/not-run/not-run 更新为 completed/passed-scoped/passed-scoped。该变化不属于 Slider，本轮保留且不重签其来源；Slider 授权与 Gate 字段保持起点值。用旧阶段快照配当前 DatePicker 文件复查会先触发该前置批次的合同校验，见 [当前诊断](governance-intake-comparison.log)，不能作为完整前置快照重放。

旧 Slider baseline、before/before-initial、G5/日期来源锁与历史截图不覆盖。本轮源码、截图与验证输出保存在独立体验目录；本轮所属来源哈希与并行状态差异分别登记，不扩大原有限文件清单。

## 实际页面与接受边界

根任务实际查看并保存 [阈值与字段](manual-overview.png)、[范围与参数](manual-range-parameters.png)、[紧凑参数面板](manual-parameter-group.png)。保存后的文件已重新打开检查。页面为实时可交互的本地 Playground；自动检查与实际页面查看不授予人工视觉接受。

静止外圈和已选轨道仍为 Solid/2 + 55% Alpha；[当前状态对比度记录](state-contrast.json) 中静止外圈六组表面低于原 3:1 门槛，约 1.83–2.36，没有调整门槛或授予例外。候选未发布、Human Gate 待人工、对比度未授予保持。

未验证物理触控、真实辅助技术或 Safari；未写入 Figma、发布、迁移或执行 Git 提交/推送。本轮实现与运行时验证完成，完整治理和人工接受分别保留待解决状态。
