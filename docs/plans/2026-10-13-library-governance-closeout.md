# Library governance closeout implementation plan

> 执行：按 systematic-debugging、test-driven-development 和 verification-before-completion 逐项修复；当前用户已明确要求实施，不另开工作区或进行 Git 操作。

**Goal:** 修复剩余 B2 历史与整库校验问题，保持已确认的 Select 样式、真实历史、旧验收和发布边界不变。

**Architecture:** 复用已有的精确阶段快照、源码前后绑定和治理入口。B2 原历史哈希已完全匹配；识别遗漏的合法后继，继续拒绝未知记录。共享来源通过本次有限交接续接，旧证明不重签。演示数据消费者测试移至应用层，公共组件不得反向依赖应用。

**Tech Stack:** Node.js、TypeScript、Vitest、现有 YAML/JSON 治理合同与 pnpm 检查。

## 授权与保护范围

- 用户原话：继续解决剩余的 B2 历史和整库校验问题，保持已经确认的 Select 样式不变。
- 工作模式：System Mode，现有候选库的本地治理修复。
- Select 当前视觉确认、组件实现、样式、公共 Foundation 视觉源和原证明保存哈希，逐字节复核；不得由本次校验提升人审、对比度、发布或业务采用 Gate。
- 核心修改：`scripts/verification-helpers.mjs`、来源测试夹具、治理回归，两个图表消费者测试的目录与相对引用。
- 只有当前完整治理检查证明存在问题时，才修正相关验证器或精确消费登记；不新增产品功能、依赖或宽泛跳过规则。

## Task 1: 精确后继登记与失败回归

1. 保存五项治理入口的真实失败日志与当前源码/阶段基线。
2. 新增 `scripts/library-governance-closeout.test.ts`：当前冻结 B2 与当前 phase 必须通过；更改导航、S3、图表范围/人审/发布字段及未知记录必须失败。
3. 运行新回归，确认因遗漏后继而失败。
4. 将既有导航收口、S3 观察和七个图表阶段加入现有精确记录检查；不改任何原阶段值。

验证：`pnpm exec vitest run scripts/library-governance-closeout.test.ts`。既有完整冻结 B2 哈希必须仍为 `fb9b518f55944a74c8081d88a83d2385c8615e95887efe0cd1eae9b16ae186fe`。

## Task 2: 合法来源交接与依赖方向

1. 将本次有限 before/after、保护源、阶段和原证明登记在 `evidence/runtime/library-governance-closeout-2026-10-13/`；通过真实字节验证，保留旧证明原件。
2. 在共享来源读者中只采用验证过的本次 predecessor；第三份源码、额外路径、伪造 before、原 Gate 改动必须失败。补齐隔离夹具。
3. 将 `packages/ui/src/charts/choropleth-drilldown.test.tsx` 与 `packages/ui/src/charts/network/network-geometry.test.ts` 原测试移至 Playground 的组件消费者测试目录；保留全部测试和数据行为，修改相对引用。

验证：来源回归、两个迁移测试、`node scripts/verify-workspace.mjs` 与已有 G4/G5/Select/Slider/DatePicker 相关来源测试。

## Task 3: 剩余实际失败与整库复验

1. 分别运行 workspace、evidence、boundaries、tailwind-b2、tokens，逐条区分合法后继漏登记、真实合同错误和待独立验收发现。
2. 根因处作最小修复并保留回归。对比度发现按真实门槛与现有候选状态处理，不降低标准或编造接受；Select 与公共 Foundation 视觉源保持冻结。
3. 运行正式 `pnpm verify:governance`，然后图标、类型、测试、构建和适用的浏览器验证；失败如实归档，修复后复跑受影响范围。
4. 独立只读审查改动，最终核对保护源与原证明不变，在验证文档记录实际结果及剩余验收边界。

## 尚未验证的假设

当前导航后继遗漏解释 B2 及图标命令连锁报错；S3 和图表后继还需阶段读者识别。后续颜色/来源/边界失败尚需正式检查分类，不能把阶段修复推导为全库已通过。真实 Safari、VoiceOver、触控和人审不由本次技术校验代替。
