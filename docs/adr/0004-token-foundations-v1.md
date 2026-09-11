# ADR 0004：Token Foundations V1 独立建设与兼容边界

日期：2026-09-05。状态：用户已授权第 0/1 批实施；实现、验证与 Human Gate 以[阶段登记](../../status/current-phase.yaml)及运行证据为准。

## 问题与决定

颜色、排版、圆角/间距与线条的新设计已经形成建设依据，而当前运行阶段与检查器仍按 B2 Button/Input 试点验证。直接覆盖旧阶段或旧数值，会丢失原验收和比较条件；只添加 Token 而不扩展消费链，也不能证明 AI 可以正确使用。

因此新增独立 `token-foundations-v1`，当前仅开放第 0/1 批：共同合同收口、增量基础数据、单源输出、静态桥接、精确检查及独立演示。旧 B2 完整状态移入 `phaseHistory.tailwindB2`，原 Day 3 快照及现有 Gate 保留。历史快照由完整内容校验保护；旧 B2、Evidence 与组件检查使用经过验证的历史视图，新阶段另行校验权限和生命周期。

## 授权的公共输入

- Color：最新设计中的 Light Public Category 与 Alpha 白名单。公共 Category 可按用途直接消费，Semantic 提供稳定别名，Recipe 负责 Parts、States、Surface 和局部组合。修订 B2 中只允许 Semantic / Component / Composition 公共来源的旧前提；私有来源仍不公开。
- Typography：已确认字号、行高、Equal 与默认字距；首批逻辑预设作为有来源、可验证的完整组合。保留字体系、数值字体资格及旧运行角色，不以新预设自动迁移组件。
- Line：`Line/Thickness/1…6` 固定 CSS px；border/h/w 共 18 个静态入口，不并入 Spacing；分隔示例独立于 Focus 和现有组件边框。
- Radius / Spacing：登记最新确认的公共固定值；Radius 增量 12 / 16。修改用途默认值时改引用，不改数字身份值。

## 实施与兼容

1. 复用现有 TypeScript 事实源、CSS 文件和 Tailwind bridge；生成输出限定在标记区，保留非本批内容。生成的 Manifest 与静态类名目录引用事实源，不手工维护另一套视觉数值。
2. 精确登记新文件、公共属性、源码扫描、合并与验证范围。现有 `source(none)`、局部作用域、managed Part 边界、静态类名、颜色资格、CSS 例外和 fail-closed 检查继续适用。
3. 新演示为 `local-experiment`，用于色表、排版、几何与局部组合验证；不宣称是完整公共 Divider、Tabs、Marker、Size 组件或发布资产。
4. 现有组件数值、状态、行为、Focus、Density、图标及各自 Gate 不迁移。原运行文件和 B2 输入已有冻结证据，见[基线索引](../../evidence/runtime/token-foundations-v1/pre-token-runtime.json)。旧 B2 收益不能由新 Token 结果代替。
5. `Color Registry` 表示颜色事实模型；生成的 `manifests/contracts/token-foundations-v1.json` 表示本地合同，两者不等于 shadcn-style `registry/` 分发或包发布。

## 延后事项与退出条件

公共控件高度与完整 Size/Density 默认方案按 Classic 证据继续裁决；现有 Next 高度只用于差异记录。后续组件迁移、Layer、布局断点、精确虚线、复杂图形、Dark、Figma、发布、业务接入及 Git 不在本批权限内。

本批需要数据和生成一致性、非法消费拒绝、真实浏览器尺寸和局部隔离、旧运行回归、AI 选择说明与独立技术审阅。自动验证通过后再提交 Human Gate，未测项目保持未测；当前阶段完成不得推导旧阶段完成或其他发布权限。

## 依据

- [建设准备度汇总](../audits/2026-09-05-token-construction-readiness.md)
- [颜色治理设计](../plans/2026-09-05-color-token-governance-design.md)
- [Typography 与布局 Token](../plans/2026-09-05-typography-and-layout-token-design.md)
- [Line Foundation V1](../plans/2026-09-05-line-foundation-v1-design.md)
- [Size / Density ADR](0003-size-and-density-responsibilities.md)
- [B2 ADR](0002-tailwind-b2-local-fork.md)

## 2026-09-06 Dark 增量授权

用户已单独授权已有 105 项颜色的 Dark 接入及 Playground 检查；范围和当前状态见[Dark 接入说明](../plans/2026-09-06-color-dark-theme.md)及 `tokenRefinements.colorDarkTheme`。本 ADR 的原第 0/1 批边界作为历史保留，未授权的组件 Semantic 迁移、发布及 Git 仍保持独立。

## 2026-09-06 Foundations 总入口与等值引用收口

用户确认 Foundations 作为基础体系总入口，Token、完整排版组合和使用规则共享来源；同值同用途改引用，有数值差异的先提交迁移方案。见[收口计划](../plans/2026-09-06-foundations-alignment.md)和 `tokenRefinements.foundationsAlignment`。

本次精确扩展原第 0/1 批的旧定义冻结规则：保留旧公共名字，允许 6 项旧排版尺寸及 23 项组件基础值改为新 Token 引用，Density 的 padding/gap 复用间距事实源；旧 Reading 的 small/large 也引用既有字号/行高。旧数值基线不改写，检查同时验证授权、确切别名与解析后的等值关系。高度与图标尺寸不当作间距处理。

Foundations 页面为总入口和兼容说明，Token 页面为详细目录，两者相互链接。Public Category 可按用途直接消费，Semantic / Component 别名按需要保留。旧 42 项语义色及组件颜色仍保持原值，实际用途、状态、主题存在差异的候选见[逐项颜色方案](../audits/2026-09-06-foundations-color-mapping.md)，当前只供确认，不实施颜色或主题迁移。

## 2026-09-06 已指定颜色层级的增量迁移

用户随后明确指定四档文字、页面背景、边框层级、主操作文字/填充、禁用填充与四种状态半透明弱背景，并要求缺少对应色系的颜色等待后续补充。此新指令精确修订上一节的颜色冻结范围，见[本轮计划](../plans/2026-09-06-foundations-color-alignment.md)及 `tokenRefinements.foundationsColorAlignment`。

14 个既有角色及主操作独立文字引用由现有 Category 数据生成，既有主题边界重新求值；未确认的实心中性填充先拆为组件引用，保持原值。其余旧色及 AI 渐变不改。原 B2 快照、品牌焦点、交互、尺寸和各自 Gate 保留，不把局部映射当作全组件 Dark 验收。

Text/Neutral/5 白底约 3.708:1，未达到普通文字 4.5；阶段与测试明确保留此问题，现有颜色用途校验不放宽。页面默认 /3、弱背景 Alpha/2（10%）及信息弱背景 Second 是本轮在用户允许范围内的具体选择，并非新增色值。TypeScript 允许原生 Node 所需的 `.ts` 导入，继续由现有 `--noEmit` 类型检查和 Vite 构建验证。
