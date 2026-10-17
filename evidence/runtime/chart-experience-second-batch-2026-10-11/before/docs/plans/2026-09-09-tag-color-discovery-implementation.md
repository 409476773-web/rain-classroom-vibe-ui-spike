# Tag 颜色检索与复用入口 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 让当前仓库里的 AI 与设计师按色相、业务名称和用途找到既有 Tag 颜色，并取得完整 Tailwind 入口与可核验的使用条件。

**Architecture:** 在现有 Tag 色组旁维护少量检索信息，结合 Color Registry、用途校验和已有类名输出生成索引。颜色目录与 AI 指南共用这一索引；继续沿用 Foundations → Public Category → 可选 Semantic / Recipe → 受控 Tailwind 的结构。

**Tech Stack:** 当前 React、TypeScript、Tailwind、Node 生成脚本、Vitest 与 Playwright；不新增依赖。

---

## 1. 状态与范围

- 2026-09-09：用户在第一阶段范围问题后回复“确认范围”，授权开始本计划的第一阶段实施。
- 工作模式：System Mode；实施对象涉及 Foundations、生成器与文档基础设施。
- 当前依据：[阶段登记](../../status/current-phase.yaml)、[颜色治理](2026-09-05-color-token-governance-design.md)、[Token 使用入口](../ai/token-selection.md)、[Tag 设计](2026-09-08-tag-design.md)。
- 已有事实：Light / Dark 共用 269 个稳定颜色 ID，其中 164 个来自 Tag；20 个完整色组已经生成受控 Tailwind 入口。
- 范围：检索信息、生成索引、现有颜色目录、AI 使用指引、用途校验展示和两个最小实际使用样例。
- 保持：所有既有 ID、order、主题 RGBA、CSS 变量、utility、组件视觉与独立验收状态。
- 不包含：Tag 第三批、通用调色板改名或补色阶、新公共组件或 Recipe 家族、放宽配对规则、接受对比度例外、跨项目/Figma 分发、依赖与 Git 操作。

实施授权已在 `status/current-phase.yaml` 的 `tokenRefinements.tagColorDiscovery` 中追加，保留其他任务和历史状态；实施、自动验证、独立审阅、Human Gate 分别记录。

## 2. 索引的边界

颜色身份继续使用现有 `Category / Family / Mode / Key`；中文名称只用于显示与检索。

| 原 Profile | 建议搜索名称 | 原 Profile | 建议搜索名称 |
| --- | --- | --- | --- |
| classroom | 翠绿 | audio | 叶绿 |
| olive | 橄榄绿 | magenta | 洋红 |
| paper | 青绿 | brown | 棕褐 |
| exam | 青蓝 | vote | 雾蓝、紫调灰蓝 |
| courseware | 暖橙 | self-test | 明紫、兰紫 |
| gold | 金黄 | slate | 石板蓝 |
| purple | 蓝紫 | difficulty1 | 薄荷绿 |
| assignment | 靛蓝 | difficulty2 | 草绿 |
| live | 亮蓝 | difficulty3 | 芥末金 |
| difficulty4 | 鲜橙 | difficulty5 | 朱红 |

业务关键词从已有 `learningUnitTagProfiles`、`groupTypeTagProfiles` 等映射派生。相近颜色保留独立身份；Difficulty 1–5 是业务色组，不是统一色阶。蓝色不自动获得 Brand 用途，灰蓝不自动成为 Neutral。

164 个 Tag Token 的用途区分：

- 100 个基础角色：20 × Text/1、Icon/1、Border/1、Fill/Solid/1、Fill/Alpha/1。可以进入按条件检索的候选；不代表全部组合通过。
- 40 个 Fill/Alpha/2、3：关闭操作的 Hover / Pressed 预设。仍按组件状态标注，不作为普通浅底强度档推荐；Tag 主体反馈另有 multiply 叠层合同。
- 24 个专用角色：业务状态、特殊前景与动作色。按原用途展示，不自动推广为通用背景或状态默认值。

## 3. AI 返回内容

每次检索至少提供：稳定 ID、中文名称与命中关键词、角色、已有完整类名、来源、支持主题、用途提示。只有给出明确的内容角色和实际父背景，才可进一步评估组合。

结果区分三层：

1. **颜色事实**：来自 Registry 与现有 outputs。
2. **声明条件校验**：`validateColorUse` 的结果；可同时展示 `measureColorContrast` 的数值，但数值不代替用途校验。
3. **实际使用验证**：只有对应消费者、DOM 与运行证据才可标记已验证；索引生成默认不具备此结论。

示例：查询“蓝紫浅底、普通正文、浅深主题”，显式父背景为 `Background/Neutral/1`。候选是 `Fill/TagPurple/Alpha/1` + `Text/Neutral/1`，可选 `Icon/TagPurple/1`；完整类名由 `colorTokenOutputs` 取出。必须附上父背景、主题、正文/图标资格和“新页面实际使用未验证”。

未知父背景返回待检查；不得默认为白底。Solid + OnColor 缺少具名 Recipe 时保留候选和限制说明，不能虚构 Recipe 名称取得资格。已有 Alpha 不追加透明度；不改变现有整体 Opacity 与合成支持范围。

## 4. 实施任务

### Task 1：冻结现状与精确登记

**文件：** `status/current-phase.yaml`；新增 `evidence/runtime/tag-color-discovery/verification.md` 与本批颜色事实基线。

1. 确认用户对第一阶段实施的回复，记录原话与范围；没有实施授权时停留在本计划。
2. 从 Registry 与 outputs 导出当前 ID、order、浅深 RGBA、变量及合法 utility 的基线；保存为证据，不建立新的颜色事实源。
3. 记录已有组件与颜色输出的指纹，以及正在并行修改的文件；保留其他任务内容。
4. 记录本批测试入口、实际使用样例范围和待验证假设。Git、发布与其他 Human Gate 不随本任务推进。

### Task 2：补充检索信息并生成索引

**修改：** `packages/foundations/src/tag-token-contract.ts`、`packages/foundations/src/color-registry.ts`、`scripts/generate-token-foundations.mjs`。

**测试：** `packages/foundations/src/tag-token-contract.test.ts`、`packages/foundations/src/color-registry.test.ts`、`scripts/verify-token-foundations.test.ts` 中与本次行为相关的用例。

1. 先添加一个检索行为检查：中文“蓝紫”、业务“视频”、原 Family 和准确 Token ID 都能定位各自对应的既有记录；用途不同不会返回错误角色。
2. 确认检查因缺少检索能力而失败，再为 20 组增加中文标签与少量关键词；业务别名从既有映射派生。
3. 复用 Registry 的 Token 身份与 outputs，建立可过滤的索引。使用普通数组筛选与字符串规范化，不引入搜索服务、模糊搜索依赖或动态 utility 拼接。
4. 索引写入现有生成 Manifest 的 `color` 下，例如 `color.discovery`。字段同时包含数据范围、推荐边界和使用指引引用；不复制 RGB 或人工维护类名。
5. 增加生成一致性检查：索引引用都存在，推荐用途没有把组件状态预设泛化，已有颜色事实与输出不变。

运行：`pnpm test packages/foundations/src/tag-token-contract.test.ts packages/foundations/src/color-registry.test.ts scripts/verify-token-foundations.test.ts`。

预期：新增检索与生成检查通过；原有身份、来源、用途与配对检查保留。

### Task 3：接入声明条件校验

**修改：** `packages/foundations/src/color-registry.ts`；复用上一任务的测试文件。

1. 接受明确的 `ColorUse` 条件，用 `resolveColorSurface`、`measureColorContrast` 展示测量，用 `validateColorUse` 判定声明条件是否可用。
2. 保留校验失败与待补条件，不在查询层吞掉错误、默认主题/父背景或伪造证据。
3. 检查一个通过和几个关键反例：Neutral 正文 + Purple Alpha；未知父背景；Fill 用作文字；无 Recipe 的 OnColor；同色正文在浅底上的不足；数值满足但用途不合法。
4. 普通文字 4.5、有意义图标和必要边界 3 的门槛沿用现有合同。浮点原值用于判定，显示四舍五入不改变结果。
5. 通用预计算只覆盖明示的固定场景，并附完整条件；不人工保存“20/18/4”通过名单，也不把 Border 未测组合标记可用。

运行：`pnpm test packages/foundations/src/color-registry.test.ts`。

预期：合法声明可用；用途错误、上下文缺失和对比度不足均不会被推荐为已验证。

### Task 4：扩展现有颜色目录

**修改：** `apps/playground/src/docs/token-foundations/color-panel.tsx`、`apps/playground/src/docs/token-foundations/color-pairing-preview.tsx`；必要时只调整同目录 `token-foundations.css` 的人工维护区。

**测试：** `apps/playground/src/docs/token-foundations/color-panel.test.tsx`。

1. 先写搜索与清空的交互检查，再加入有可访问名称的搜索输入和必要的用途筛选；空查询保留当前完整目录，空结果有清晰反馈。
2. 颜色目录、配对选择器共享中文标签与匹配结果；保留原 ID、稳定选择状态、浅深主题与原有矩阵。
3. 配对预览展示声明条件校验结果与完整使用类名；保留不足样本，不把展示 utility 当作使用入口。
4. 修正“特殊状态等待组件接入”“当前消费者只有本页”等过时笼统说明。若不展示由登记数据产生的消费者清单，就链接真实登记，不猜测使用范围。
5. 保持键盘、Focus、读屏状态提示；搜索不会强制移动焦点。详情中的数字与源码说明只放在文档使用场景。

运行：`pnpm test apps/playground/src/docs/token-foundations/color-panel.test.tsx`。

预期：搜索、角色过滤、清空、主题切换和旧详情流程通过，原始颜色仍可访问。

### Task 5：打通实际使用与 AI 指引

**修改：** `docs/ai/token-selection.md`、`scripts/token-foundation-outputs.mjs`、现有 `color-panel.tsx`。

**测试：** `scripts/verify-token-foundations.test.ts`、`tests/e2e/token-foundations.spec.ts`。

1. 在现有页面加入两个最小的页面自有使用样例：Neutral 正文 + Purple Alpha，以及 Purple 图标 + Purple Alpha；明确 Light / Dark 父背景与主题。
2. 使用现有 Category utility，按现有 `filePath / selector / scope / className / use` 登记实际节点。不把展示专用 swatch 伪装成真实消费者，也不新建公共组件或 Recipe 家族。
3. 样例验证应覆盖真实父表面与计算样式；故意错配父背景或用途的元数据必须被现有治理入口拒绝。
4. AI 指南直接说明索引位置、最小查询/返回示例、消费者登记格式和 Existing Variant → Local Recipe 的使用路径。颜色清单由生成数据提供，不在指南再维护 20 行配色表。
5. 明确本批只覆盖当前仓库；跨项目或 Figma 仍需以后接入同源输出。

运行：`pnpm generate:tokens`、`pnpm verify:tokens`、相关 Vitest 与下面的浏览器检查。

### Task 6：验证、证据与交付

1. 与 Task 1 的证据比较：269 个稳定 ID、order、主题值、变量和旧 utility 不变；生成差异只包含本批索引、登记与预期文档内容。
2. 运行 `pnpm verify:governance`、`pnpm typecheck`、`pnpm build`，以及前五项涉及的定向测试。已通过且无新变更的检查不重复运行。
3. 运行 `pnpm exec playwright test tests/e2e/token-foundations.spec.ts`，验证搜索、筛选、清空、主题、真实父背景、键盘 Focus 与窄屏。已有配置使用 4173 且拒绝复用服务器；若被占用，先确认归属，采用独立测试端口配置，不终止未知或用户仍在使用的服务。
4. 新截图和测量存入本批证据目录，不覆盖旧批次的验收图片；必要时调整本批测试的截图目的地，避免重跑污染旧证据。
5. 按实际影响完成独立审阅；将自动验证、技术审阅、人工目录体验确认分别记录。旧 Tag 的视觉接受与未接受对比度发现保持原状态。
6. 交付当前目录入口、精确改动范围、当前运行结果与尚未验证部分；人工确认只覆盖这次目录和使用体验，不推导发布或其他组件验收。

## 5. 待实施验证的假设

- 中文与业务别名能明显降低寻找颜色的成本；需在真实目录搜索中确认。
- 现有消费者登记能够承载两个页面自有样例；若需修正校验器，限定为真实合同缺口，不放宽既有角色、祖先或主题约束。
- 生成索引的体积与页面筛选成本可接受；本批先用现有数组和生成器，只有实测问题才考虑独立输出或搜索优化。
- 边界、控件交互状态、多层 Alpha、整体透明度、品牌与状态替色均不由这两个样例得到资格。

## 6. 当前检查点

第一阶段六项实施任务与自动验证已完成，独立审阅无剩余 P1 / P2。2026-09-09，用户在收到目录体验待确认的交付后回复“确定。”，本次颜色目录、搜索与配对预览的体验 Human Gate 已接受。实施阶段 290 项相关测试、9 项浏览器测试、完整治理、类型与构建检查通过，结果与图片见[验证记录](../../evidence/runtime/tag-color-discovery/verification.md)。

既有 269 个颜色 ID、主题值、输出及 Tag 视觉保持不变。当前入口覆盖本仓库；不转入 Tag 第三批，也不推导颜色对比度例外、跨项目/Figma 分发、发布或 Git 授权。
