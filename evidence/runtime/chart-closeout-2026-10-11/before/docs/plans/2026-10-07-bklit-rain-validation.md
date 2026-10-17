# Bklit 原生与 Rain 主题验证实施计划

**Goal:** 用真实 Bklit 组件完成面积、组合、桑基及96×40迷你趋势四组对照，保留上游动效与交互。

**Architecture:** Prototype Mode / local-experiment。复用 card-v2 工作区和5387预览服务，新增独立 bklit-validation.html。官方源码放页面私有 vendor 目录；两列复用同一数据和图表组合，只改变颜色、渐变配方及字体。共享组件和原 G2 页面保持独立。

**Tech Stack:** React、TypeScript、Vite、Bklit源码及其实际依赖；现有 Playwright。

用户于2026-10-07明确“开始实施”，承接设计v0.6；授权本地四样本接入与验证，不推导全目录完成、视觉验收或发布。使用 executing-plans 与 verification-before-completion；Git 提交不在本轮范围。

## 1. 来源、保护和测试起点

- 记录工作区HEAD、原图表源码校验值；保留正在进行的其他工作。
- 核验官方 registry、源码、依赖和许可证，只获取四样本所需闭包，记录来源及本地差异。
- 新建 `tests/e2e/bklit-rain-validation.{config,spec}.ts`，先运行缺失页面的预期失败。

## 2. 接入与对照页面

- 新增 `apps/prototype/bklit-validation.html`、`vite.bklit-validation.config.ts`。
- 新增 `apps/prototype/src/scenarios/bklit-validation/`：原生源码、来源清单、页面和局部主题。
- 局部依赖仅写 `apps/prototype/package.json` 与既有锁文件，不运行全局 shadcn 初始化。
- 四组原生／Rain对照共享数据、尺寸和更新操作，提供重播入场、数据更新、精确数据和旧实验入口。
- V01稳定系列身份；V02同构对照；V03验证渐变与透明叠加；I02保持坐标、单位、权重和精确读数。Rain字体职责、色彩来源沿用现有方案。
- 额外点击固定、图例点击隐藏及矩阵／网络不进入本次主题实现。

## 3. 验证与交付

- `pnpm exec playwright test --config tests/e2e/bklit-rain-validation.config.ts`：真实渲染、两列数据一致、提示读取、更新、窄屏与减少动效。
- `pnpm --filter @rain-next/prototype typecheck`；`pnpm --filter @rain-next/prototype exec vite build --config vite.bklit-validation.config.ts`。
- 浏览器实际查看整页与代表悬停状态；运行既有图表专项回归。
- `evidence/runtime/bklit-rain-validation/` 保存来源、检查输出、截图与限制；方案和阶段状态仅登记本次范围。
- 原生字体可用性、上游减少动效支持、迷你图提示及数据更新的表现均须实测，不预先标通过。原生行为不足时如实记录；必要兼容修改单列，避免把主题实验变成重写引擎。

## 本轮完成记录

2026-10-07：以上三步已完成。四组对照使用真实Bklit源码，原生动效保留；六项Bklit浏览器检查、四项G2回归、类型检查和独立构建均通过。来源哈希、唯一的桑基渐变ID修正、截图、字体回退和减少动效限制见[验证记录](../../evidence/runtime/bklit-rain-validation/verification.md)。当前为本地实验完成，视觉验收待用户审阅。
