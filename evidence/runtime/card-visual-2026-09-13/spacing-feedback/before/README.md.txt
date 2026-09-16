# Rain Next

用于雨课堂高保真交互原型的 React 源码组件体系。Rain Token 决定视觉，Tailwind 负责受约束组合；Rain Classic 保持独立，仅作为来源参考。

**当前是可运行的本地候选库，尚未发布。** 部分组件已完成限定范围的人工视觉验收，仍有颜色、真实设备和正式业务场景验证未完成。本说明核对于 2026-09-12，不把某个批次的通过记录当作全库当前通过。

## 开始审核

1. 先读 [协作合同](AGENTS.md)与 [Spike 范围](SPIKE_BRIEF.md)，了解品牌、组合和生命周期边界。
2. 按下面的组件表进入当前源码和证据。[阶段记录](status/current-phase.yaml)顶层是 2026-09-05 的 Token 总阶段；后续进展在 `tokenRefinements` / `componentRefinements`，冻结历史不回填。
3. 看 [本次收口计划与执行记录](docs/plans/2026-09-12-existing-assets-closure.md)、[颜色待决清单](docs/audits/2026-09-12-color-closure-review.md)及 [早期基础组件合同](docs/audits/2026-09-12-core-ui-contracts.md)。
4. 需要设计来源时，再沿 [Visual Evidence](evidence/visual-evidence.yaml)、组件 Manifest 和对应审计链接展开。早期实现计划中的“待建设”不覆盖后续已有实现。

审核意见请给出具体组件、源码位置、触发条件和影响；将可复现缺陷、未完成能力、已接受的设计决定和建议分开。已记录颜色不足仍需处理；已接受例外也不代表达到原对比度门槛。

## 本地运行

所有命令在本 README 所在的仓库根执行。环境要求以 [package.json](package.json) 为准：Node `^22.13.0 || >=24.0.0`、pnpm `10.28.1`。

```sh
pnpm install --frozen-lockfile
pnpm dev --port 5173 --strictPort
```

打开 [本地 Playground](http://127.0.0.1:5173/)。端口若已占用，换一个未占用端口；后面的 `#input` 等片段加到实际启动地址即可。默认只监听本机。

首次执行浏览器检查前，先运行 `pnpm exec playwright install chromium` 安装项目所需的 Chromium；已有浏览器缓存时无需重复。

可单独执行已有检查：

```sh
pnpm verify:governance
pnpm verify:icons
pnpm typecheck
pnpm test --maxWorkers=2
pnpm build
pnpm test:e2e
```

`pnpm verify` 串联仓库规定的完整检查。默认浏览器配置仅为 Chromium，启动 4173 且不复用已有服务；先确认端口空闲。浏览器用例可能刷新自己的证据文件，审阅现有材料时不应无意覆盖历史证据。使用替代端口或临时证据目录时，须记录实际命令与范围，不能把分段执行写成完整命令一次通过。

本地 Registry 是 `RainLocalSourceRegistry / current-workspace` 的源码与依赖记录，不是 npm 包、在线安装器或已发布的 shadcn Registry。安装整个工作区即可审查现有实现；消费入口为 [UI 源码出口](packages/ui/src/index.ts)、[Foundations](packages/foundations/src/index.ts)，样式接入见 [应用入口](apps/playground/src/main.tsx)。

## 当前资产与证据

下表中的验收都限定于原记录的范围；“已视觉验收”不自动关闭颜色、辅助技术、发布或生产接入。自动检查的时间与范围以各证据原文为准。

| 资产 / 入口 | 当前状态与最新阅读入口 |
| --- | --- |
| Foundations `#foundations`、Token `#token-foundations` | 2026-09-12 基础页排版/线条/圆角/间距视觉已接受；颜色、组件映射、入口整体合同及其他机器字体仍独立。[基础记录](evidence/runtime/token-foundations-v1/verification.md) · [入口记录](docs/plans/2026-09-06-foundations-alignment.md) |
| Light / Dark 颜色、全局 Focus | 颜色 Token 和 Focus 各自视觉范围已接受；不等于全库颜色搭配或完整 Dark 主题通过。[颜色](evidence/runtime/color-dark-theme/verification.md) · [Focus 与按钮配方](docs/plans/2026-09-05-size-density-first-recipes.md) |
| Button / TextButton `#components`、`#button-tokens`、`#text-button` | 当前配方视觉已接受；已接受的危险文字例外保留。[配方与最新验收](docs/plans/2026-09-05-size-density-first-recipes.md) |
| IconButton `#icon-button`、图标 `#icons` | 各自视觉范围已接受。[IconButton](evidence/runtime/icon-button/verification.md) · [图标](evidence/runtime/icon-migration/verification.md) |
| QuestionNumber / OptionButton `#question-number`、`#option-button` | 当前内容和六档尺寸已有验收；精确对比度例外保留，题号右上角反馈明确暂缓。[路线与范围](docs/plans/2026-09-08-question-and-option-family-roadmap.md) |
| Input / SearchInput / FormItem `#input` | 当前运行视觉已完成人工验收；颜色与真实设备问题保留。[当前验证与缺口](evidence/runtime/input/verification.md) |
| Select `#select` | 单/多选与搜索组合、正式 Base UI / Portal / Tag 已接入；当前运行视觉已完成人工验收，颜色和真实设备检查保留。[正式依赖续批](evidence/runtime/select/formal-dependencies.md) |
| DropdownMenu / Popover `#dropdown` | 公共初版、三份组合示例及选择图形复用已落地；当前运行视觉已完成人工验收，颜色与真实设备检查保留。[当前复用记录](evidence/runtime/dropdown/selection-visual-reuse.md) · [初版与续批索引](evidence/runtime/dropdown/verification.md) |
| Tag 家族 / TagSelect `#tag` | 三批视觉分别接受，颜色问题未一并关闭。[第一批](evidence/runtime/tag-batch-one/verification.md) · [第二批](evidence/runtime/tag-batch-two/verification.md) · [第三批](evidence/runtime/tag-batch-three/verification.md) |
| Checkbox / Radio `#checkbox`、`#radio` | 原生控件与分组已有视觉接受；颜色和真实设备检查独立。[Checkbox](evidence/runtime/checkbox/verification.md) · [Radio](evidence/runtime/radio/verification.md) |
| 选择卡 / 组合 `#selection-cards`、`#selection-patterns` | SC-02 视觉、SC-03 视觉/交互已接受，保留各自颜色与设备边界。[卡片](evidence/runtime/selection-cards/verification.md) · [组合](evidence/runtime/selection-patterns/verification.md) |
| 选择综合页 `#selection-playground` | 2026-09-12 编辑/分类/预览/关闭的视觉与交互已接受；38 项完整验收仍为 30 项有范围内证据、8 项未关闭。[具体验收范围](evidence/runtime/selection-playground/verification.md) |
| Tabs `#tabs` | 2026-09-12 当前运行视觉已接受；最新限定矩阵 findings=0，不能复用旧 108 项作为当前结论。[最新记录](evidence/runtime/tabs-visual-refinement/verification.md) |
| Card `#card` | 2026-09-13 视觉修订候选：数值≤24px、轻量操作、默认同色无分割线提交区，浅底色可选参考；待集中视觉评审。[最新计划](docs/plans/2026-09-13-card-visual-refinement-plan.md) · [最新验证](evidence/runtime/card-visual-2026-09-13/verification.md) · [旧批次](evidence/runtime/card-v2/verification.md) |
| Badge / Surface `#components`、Link `#text-button` | 已有公共源码和示例，独立 Manifest / Registry 尚缺；保留早期实现和各自验收边界。[当前合同与债务](docs/audits/2026-09-12-core-ui-contracts.md) |

Button / Input 虽有现有 Manifest，但也没有各自独立的 Registry 条目；不能声称整个公共出口已经具备完整安装关系。TextButton 通过 `Button variant="text"` 提供，导航使用 Link，不另建同义组件。

## 尚未建设与验证边界

- 首批规划中的公共 Dialog、Table Primitives、Statistic；实验或页面使用 Base UI Dialog 不等于公共 Dialog 已交付。
- Stack、Inline、Grid、Split / Sidebar 四类公共 Layout。
- [四个正式业务 Benchmark](benchmarks/benchmark-registry.yaml)仍为登记状态；已有组件说明页、局部 Recipe 和实验不代替它们。
- 完整分发服务、正式 Figma 组件、生产硬化与业务接入均不属于当前已完成范围。

2026-09-12 最新页面反馈：Input / Select 非禁用空值提示统一为更浅的 `Text/Neutral/5`；普通可用菜单说明保持 `/3`，危险红字保留。Popover 内容默认紧凑，模板分类复用 28px Tabs。颜色发现独立保留；本轮运行视觉已获人工验收。[颜色清单](docs/audits/2026-09-12-color-closure-review.md)区分实施结果、已否决候选与后续问题。

颜色表中的数字通常是配方 × 主题 × 状态 × 父背景 × 部件，不是独立缺陷数量。历史批次不能相加；来源摘要发生变化的旧测量需要在实际修改后复测。

目标字体为 PingFang SC，关键数据数字使用 LINE Seed。仓库不分发字体文件；其他机器可能使用回退字形。已有本机字体证据见 [字体环境](evidence/runtime/day-2/font-environment.md)，不能据此宣称另一台机器命中相同字体。真实输入法、屏幕阅读器、触屏与完整跨浏览器检查按各批记录分别保留。

代码托管到 [GitHub 私有审核仓库](https://github.com/409476773-web/rain-classroom-vibe-ui-spike)，供有访问权限的审核者查看源码和证据。上传授权与执行范围见[送审续步](docs/plans/2026-09-12-existing-assets-closure.md#github-私有送审续步)；实际提交以仓库 `main` 分支为准。Git 托管、人工验收、资产成熟度、包或 Registry 发布和业务采用各自独立。
