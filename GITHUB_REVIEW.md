# Rain Next：2026-10-17 组件库审核入口

当前审核范围为本仓库 `main`；固定分支为 `review/2026-10-17-component-library`。这是用户授权的私有源码送审版本，包含已建设组件、原型、合同、测试和必要证据。2026-09-16 的分支保留历史用途，不是本轮版本。

## 先读这些文件

1. [本轮查漏与送审报告](docs/review/2026-10-17/report.md)：实际发现、补齐、验证范围与交付限制。
2. [README](README.md)、[AGENTS](AGENTS.md)、[SPIKE_BRIEF](SPIKE_BRIEF.md)：目标、品牌和组合约束。
3. [原始计划](docs/review/2026-10-17/original-plan/00-START-HERE.md)、[冻结64项逐项映射](evidence/runtime/g1-g6-closeout-2026-10-17/run-01/coverage.md)、[本轮实施计划](docs/plans/2026-10-17-g1-g6-closeout-and-p5-p6.md)。
4. [资产使用入口](docs/ai/README.md)、[生成资产索引](docs/ai/asset-index.md)、`manifests/`、`registry/`，再进入对应源码。目录能力、资产数量与展示页数量不是同一口径。
5. [阶段状态](status/current-phase.yaml)：顶部保留早期阶段；后续 refinement 和末尾本次授权才是各批次事实。实现、自动检查、人工接受、对比度、真实设备、发布分别判断。
6. [G1–G6原收尾证明](evidence/runtime/g1-g6-closeout-2026-10-17/run-01/verification.md)、[本轮后继验证](evidence/runtime/github-review-successor-2026-10-17/verification.md)、[当前验证结果](evidence/runtime/github-review-2026-10-17/verification.md)。旧批次数字保留原日期，不能相加或冒充本次执行。

## 本轮重点

- 冻结目录64项 = G0的18项 + G1–G6的46项，均有代码或明确组合对应。Label/Field复用FormItem，Input Group为现有控件的局部组合，Native Select兼容能力纳入Select，Data Table为表格配方。请检查实际能力，不按名称要求重复造组件。
- 已集成用户确认的Input Group两行文案修订；没有新增独立公共导出。
- 补齐Tag家族10份Manifest的用途与不适用检索信息，资产索引由现有生成器生成。
- P5资源引用更新页已进入 `apps/prototype/src/scenarios/resource-update/`，复用标准Select、32px二级按钮和PDF文件类型图标。新入口 `#resource-update`；状态和保存均为本地模拟。
- 旧封存源与原证明保持原样。本轮有限后继绑定允许上述确认修订及新的Git提交，仍检查原证明、源文件、阶段和精确Git远端。

## 运行和检查

需要Git克隆仓库；不要用无Git元数据的ZIP代替治理检查环境。Node版本见 `package.json`，pnpm为10.28.1。

```sh
pnpm install --frozen-lockfile
pnpm dev --port 5173 --strictPort
# 另一个终端
pnpm --filter @rain-next/prototype dev --port 5201 --strictPort
```

组件页为 `http://127.0.0.1:5173/#input-group`，原型页为 `http://127.0.0.1:5201/#resource-update`、`#teacher-grading`、`#learning-report`。这些地址需审核者在自己的机器运行；GitHub不托管本地预览服务。现成画面见[本轮P5证据](evidence/runtime/github-review-2026-10-17/p5/README.md)与[P6当前复核](evidence/runtime/g1-g6-closeout-2026-10-17/run-01/p6-current-review/review.md)。历史截图中的端口仅表示当时运行环境。

```sh
pnpm verify:governance
pnpm verify:icons
pnpm typecheck
pnpm test --maxWorkers=2
pnpm build
# 安装Chromium后执行现有浏览器套件
pnpm exec playwright install chromium
pnpm test:e2e
```

完整浏览器套件可能刷新其既有输出目录；在独立克隆执行。此次实际执行命令和结果以本轮验证记录为准。

## 请如何给出审核意见

请先确认实际能读取本轮分支和源码，再审查架构、复用、公开API、Token视觉约束、状态完整性、键盘交互、可访问性、测试与治理成本。每项问题给出文件位置、触发步骤、影响、优先级和可验证建议。把可复现缺陷、当前未实现能力、历史记录、已接受设计与可选建议分别说明；不要仅凭README或局部画面判断全库完成。

颜色/对比度、Safari/读屏/物理触控、跨机器字体、真实上传与持久化等仍按各资产证据独立判断。仓库未发布npm包、在线Registry或Figma组件，未接入生产业务。原项目没有根许可证声明；第三方许可保留其原文件，不推定整个项目可对外授权。
