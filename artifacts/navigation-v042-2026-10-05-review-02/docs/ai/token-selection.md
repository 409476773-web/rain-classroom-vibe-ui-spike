# Token 选择与消费（Foundations V1 第 0/1 批）

状态：新增基础为 registry-candidate。2026-09-19 核对当前源码：42 项 Semantic 中的 17 项接入 Category 色源；其余保留原定义。2026-09-06 首批 14 项的记录保留为历史。映射实施、组件可读性与主题验收、Human Gate、发布各自记录；当前能力不授权后续批次。

## Foundations 总入口与兼容定义

`#foundations` 是基础体系总入口，`#token-foundations` 是其 Token 与完整排版目录。Foundations 包含 Token、组合与使用规则，Tailwind 从同一套事实生成入口。

旧 `rain-type-ui` / `rain-type-reading` / `rain-type-data` 的字号和行高已引用各自 `*-default` 预设使用的基础 Token。两种入口的默认尺寸相同；旧类不自动增加完整预设的所有字距或数字属性。Button / Input 中同值同用途的字号、行高、间距及 1px 边框已登记为兼容引用，原值不变；尺寸高度、图标大小与 Focus 规则保持独立。

颜色兼容区保留旧入口，并显示已确认项的 Category 来源。当前对应关系登记在 `token-contract.ts`，展示值与 CSS 引用由这份登记及 Color Registry 共同派生。其余项仍需按 property、Part、State、Surface 和主题逐项确认；[颜色映射记录](../audits/2026-09-06-foundations-color-mapping.md)先列本轮决定，下方历史候选表不代表当前批准关系。

## 从完整方案开始

1. 已有组件优先使用 Variant 与完整 Recipe。
2. 页面自有内容可以选公共 Category，但同时登记用途、属性、真实父表面和内容资格。不能仅凭 Token 名合法就判定搭配合法。
3. 有明确需要时，仅改变完整方案中的必要字段，再检查相关的几何、状态与可访问性。
4. 新的局部方案使用现有 `defineRainLocalRecipe` 和 `--rain-local-*`，不自动升级为全局 Semantic。

## 颜色检索与复用

当前仓库的检索入口是 [生成 Manifest](../../manifests/contracts/token-foundations-v1.json) 的 `color.discovery`，与颜色目录使用相同数据。先检索已有 Variant / Recipe；页面自有内容或需要调整的具名 Local Recipe 再查询颜色。不要把整个 Manifest 反复塞入上下文，只读取命中色组、相关配对与所需用途。

- `entries` 提供稳定 ID、中文色名、业务关键词、原用途、来源与完整 `utilities`。中文名称不重命名 Family；业务别名由原 Tag 映射派生。
- `scope: tag-palette` 表示 20 组中的基础角色候选；`tag-state` 是关闭操作反馈预设，`tag-special` 是业务或动作专用色。后两者保留原用途，不因检索命中成为通用浅底、品牌或状态默认值。
- `pairings` 提供三种固定的非交互页面组合：中性正文 + 浅底、同色图标 + 浅底、彩色正文 + 页面表面。每项附 `use`、实际父背景以及 Light / Dark 的声明条件检查结果；不覆盖交互叠层、整体透明度或必要边界。
- `passed` 仅表示所附声明条件通过当前用途与对比度校验。`rejected` 保留失败原因，`needs-context` 要求补充主题、实际父表面，或专用色对应的既有 Recipe / 单独用途依据。`actualUse: not-verified` 不可改写为新页面已经验收。

在 React/TypeScript 使用方可直接查询同源数据：

```ts
import { searchColorTokens, colorDiscovery, assessColorUse } from "@rain-next/foundations";

const colors = searchColorTokens("蓝紫", "Fill"); // 也可查“视频”、Family 或准确 ID
const pairs = colorDiscovery.pairings.filter((pair) => pair.family === "TagPurple");
const use = {
  tokenId: "Text/Neutral/1", role: "text", property: "color", content: "text",
  context: "page", theme: "light", interaction: "non-interactive", critical: true,
  parentSurfaceId: "Fill/TagPurple/Alpha/1", parentBackgroundId: "Background/Neutral/1",
} as const;
const assessment = assessColorUse(use);
```

返回使用类名时，从命中项 `utilities` 选择正确的 role/property，给出完整字符串。不要拼接 utility，也不要将 `bg-rain-swatch-*` 当作页面颜色入口。未知父背景不能默认为白底；`OnColor` 缺少实际具名表面 Recipe 时不能通过虚构名称取得资格。

从找到颜色到实际使用，还需登记源码节点。例如本批 [实际页面示例](../../apps/playground/src/docs/token-foundations/color-panel.tsx) 的正文节点使用：

```ts
{
  filePath: "apps/playground/src/docs/token-foundations/color-panel.tsx",
  selector: '[data-slot="discovery-light-text"]',
  scope: '[data-rain-id="token-color-discovery-examples"]',
  className: "text-rain-category-text-neutral-1",
  use: {
    tokenId: "Text/Neutral/1", role: "text", property: "color", content: "text",
    context: "page", theme: "light", interaction: "non-interactive", critical: true,
    parentSurfaceId: "Fill/TagPurple/Alpha/1", parentBackgroundId: "Background/Neutral/1",
    evidenceRef: "evidence/runtime/tag-color-discovery/verification.md",
  },
}
```

这是现有 `colorConsumers` 的登记格式，写在 [生成来源](../../scripts/token-foundation-outputs.mjs)；实际 Fill 和不透明背景祖先也要登记，theme 须匹配最近的真实主题边界。新页面应使用自己的路径、选择器与实际证据，不复制这个示例的身份。运行 `pnpm generate:tokens`、`pnpm verify:tokens` 并检查实际 DOM、键盘和主题表现。

当前入口覆盖本仓库及其本地设计预览；跨项目或 Figma 尚未因此获得同一检索入口或分发资格。此批工作见 [实施计划](../plans/2026-09-09-tag-color-discovery-implementation.md) 与 [验证记录](../../evidence/runtime/tag-color-discovery/verification.md)。

## 唯一事实与输出

| 能力 | 手工维护的事实 | 派生结果 |
| --- | --- | --- |
| 颜色 | [color-registry.ts](../../packages/foundations/src/color-registry.ts) 的结构化 Light / Dark 数据、Profile 与用途合同；[token-contract.ts](../../packages/foundations/src/token-contract.ts) 的已确认 Semantic 对应关系 | 公共变量、已确认兼容引用、合法用途类、展示作用域、局部 Alpha 输出、Manifest |
| 字体 | [typography-contract.ts](../../packages/foundations/src/typography-contract.ts) 的数值与完整预设 | 字号/行高/字距变量、桥接与完整方案类 |
| 线条、圆角 | [token-contract.ts](../../packages/foundations/src/token-contract.ts) | 变量、固定 utility 与 Manifest |
| 间距 | [composition-contract.ts](../../packages/foundations/src/composition-contract.ts) | 变量、桥接与静态选择表 |
| Tag | [tag-token-contract.ts](../../packages/foundations/src/tag-token-contract.ts) 的完整旧色来源、角色和专用尺寸 | Category 色源、20/24/28 高度、随尺寸变化的动作区、状态参数与静态类入口 |

运行 `pnpm generate:tokens` 更新生成输出；`pnpm verify:tokens` 检查输出漂移和实际消费者。不要手工改生成的 CSS 或再建一份 RGB/类名清单。生成器只按精确授权更新兼容引用，其余组件与历史变量保留。

## 颜色

公开身份为 `Text/Neutral/1` 等稳定 ID，key 与 order 分开。Light / Dark 各有 269 项，共用稳定 ID；原 105 项保留，Tag 第一批追加 164 项分类、业务专用及动作角色来源。`Background/Dark` 是 Family 身份，两种主题分别解析各自色值，不是主题开关。Light 原值与决定见[颜色补充规范](../plans/2026-09-06-color-family-supplement-design.md)，Dark 来源与待检查范围见[Dark 接入说明](../plans/2026-09-06-color-dark-theme.md)。

- 默认主题为 Light；在消费容器上显式设置 `data-rain-theme="dark"`，需要还原时设置 `data-rain-theme="light"`。消费元数据的 `theme` 必须与最近的实际主题边界及承载背景一致；未知或动态主题不能冒充已验证的静态消费者。当前映射的 17 项引用随主题读取对应 Category，未迁移项保留旧值；这种混合状态不代表完整组件的 Dark 配方已经合格。
- `Text` / `Icon` → `color`；`Background` / `Fill` → `background-color`；`Border` → 边界，填充线可用 `background-color`。`OnColor` 需要具名表面方案与实际可读性。
- `validateColorUse` 验证角色、属性、主题、内容、父表面、品牌意图、弱色与条件色资格，以及实际合成对比度。使用方仍需核对真实 DOM、节点结构、状态与证据文件；声明不替代浏览器验证。
- 条件色需要具名 Recipe 与对应消费者证据。弱 Neutral 的有意义内容需要明确为非交互、非关键信息，并通过实际对比度。
- Alpha 白名单由 `colorAlphaValues` 提供。已有 Alpha 预设不能再追加；使用 `replace` 产生局部变量，以替换后的最终 Alpha 输出，不相乘。
- `colorFillFamilies` 中登记的强实底 Family（含 Second、Orange、Green、Red 与相应 Tag 色组）使用 `Fill/Solid/1–2` 时仅接受 OnColor；较弱实底与 Alpha 接受普通 Neutral 或同 Family 的 Text / Icon。文字与图标可独立选档，前景 key 不必与背景对应。OnColor 必须有 Component / Local Recipe 上下文；仅提供一个名称不能让 page 消费获得资格。
- Alpha 父表面使用 `parentSurfaceId` 指向 Fill，`parentBackgroundId` 指向其实际不透明底。`resolveColorSurface` 与 `measureColorContrast` 只解析和测量，资格由 `validateColorUse` 判断；真实消费者检查还需匹配源码中的表面祖先。未知底、多层 Alpha 或父表面局部 Alpha 覆盖不自动通过。
- 组件整体 Opacity 与 Color Alpha 分别登记。核心通用路径仅支持明确叶节点的数学合成；实际消费者仍拒绝未经 DOM 合成验证的 `componentOpacity`。Tag 第一批有独立且精确的 isolated-group 消费分支，按真实层叠和整体透明度测量，不扩展其他组件的资格。
- `bg-rain-swatch-*`、`text-rain-swatch-*` 只用于登记的展示节点，不是组件消费入口。配对预览保留不足样本并显示说明；样本均为 `aria-hidden`，状态文字提供可访问结果，其样式不得移出文档根。预览画布不代表产品表面资格。

示例真实消费者见 [颜色预览](../../apps/playground/src/docs/token-foundations/color-panel.tsx)：原 16% 预设与局部替换 20% 并排比较；[Manifest](../../manifests/contracts/token-foundations-v1.json) 记录用途与作用域。

### 本轮颜色选择与默认细档

- `text-secondary` / `text-muted` / `text-placeholder` / `text-disabled` 分别使用 `Text/Neutral/3` / `4` / `5` / `6`。映射只明确来源，不豁免内容资格：`Text/Neutral/4` 仍是弱档；`Text/Neutral/5` 在白底约 **3.708:1**，不足普通文字 **4.5:1**，占位提示的可读性问题仍待解决。不得降低 `validateColorUse` 标准，或将真实输入占位、单位、可点击入口说明标为装饰来绕过检查。
- `surface-page` 默认使用 `Background/Neutral/3`，更后的页面底可明确选择 `/4`。`border-default` 与 `border-subtle` 使用 `Border/Neutral/3`；轻强调边界及 `border-strong` 默认使用 `/2`，只有极重要边界才选 `/1`。必要边界仍需在实际底色上核对。
- `action-primary` 的填充使用 `Fill/Brand/Solid/2`，独立文字角色使用 `Text/Brand/1`；不要把填充 Category 用作文字或边框。`action-disabled` 使用 `Fill/Neutral/Solid/2`，不能因此把其他控件状态也统一替换。
- Tailwind 的 `text-rain-action-primary` 与 `bg-rain-action-primary` 分别读取这两个来源；该名字不再注册跨用途的通用颜色映射。Link 默认文字的中间引用随 Light / Dark 边界重新求值，hover / pressed 仍属未迁移状态。
- 用户指定四种状态弱背景采用各自半透明色；本次默认选择 `Fill/Green/Alpha/2`、`Fill/Orange/Alpha/2`、`Fill/Red/Alpha/2`、`Fill/Second/Alpha/2`，均为 **10% Alpha**。Alpha/2 及信息弱背景 Second 是实施默认，状态前景仍保留旧定义，配对需检查真实父背景。
- 本段原轮次保留的 `--rain-tag-neutral-fill`、`--rain-badge-neutral-fill` 仍作为兼容变量。Tag 请直接复用[当前完整 Recipe](../../packages/ui/src/tag/tag.styles.ts)，视觉验收与对比度缺口见[独立记录](../../evidence/runtime/tag-batch-two/verification.md)；Badge 保持原值。其他语义色、品牌与 Focus 按当前登记使用，不随颜色检索改变。

精确范围见[本轮实施计划](../plans/2026-09-06-foundations-color-alignment.md)。上述选择不等于全部组件可读性、交互状态或主题视觉已经验收。

## 排版

默认选 10 个完整预设之一（`rain-type-ui-default` 等）。局部变更通过 `resolveTypographyPreset` 检查后，使用登记的 `text-rain-size-*`、`leading-rain-*`；用 `rainCn` 合并类名。

字号 19 档，固定行高 15 档，Equal 为无单位 `1`。行高须满足 `字号 ≤ 实际行高 ≤ 2 × 字号`，不限制浏览器缩放或用户阅读样式。默认字距 `0em`；组件特例保留组件范围。

关键数据也可以使用其他已登记字号；36 / 42 / 700 只是默认组合。例如 24 / 32 / 700 可沿用 Data 字体与数字规则，调整后仍检查行高和容器，不必新增全局预设。

界面/阅读字体字重为 400/600；Tag Solid 标签有用户确认的 UI 700 专项组合，仅允许 Tag / LinkTag / CheckableTag、label、solid、12/14 或 13/18，不扩展普通 UI/Reading 范围。关键 Data Value 用 LINE Seed 700、等宽齐线数字。Value 与 Unit / Label 分开；中文单位和说明不套 Data 字体。字体文件没有随包分发，验收需核对目标环境实际字体和字形。

## 几何

- Line 仅 1–6px，入口仅 `border-rain-line-N`、`h-rain-line-N`、`w-rain-line-N`；实线/虚线用平台线型。不得把 Line 当 spacing、增加 0 或自行扩展单侧/ring/outline/stroke。
- 内容分隔线局部 Recipe：`h-rain-line-1 w-full flex-none bg-rain-border-subtle`。装饰线 `aria-hidden`，周围间距由内容容器负责；焦点系统保持原合同。
- Radius 为 4/6/8/10/12/16/full；Space 为 0/2/4/6/8/10/12/14/16/18/20/24/28/32/36/40。具体数字是稳定身份，不代表同值必须共同变化。
- Size / Density 本批只做 [首组配方设计](../plans/2026-09-05-size-density-first-recipes.md)，不创建统一全局高度，也不把 Classic 特例四舍五入到公共档位。

## Tag 第一批消费

默认使用完整 `Tag` / `LinkTag` / `CheckableTagGroup` Recipe，已存在集合时才直接组合 `CheckableTag`。`color` 接受 neutral、brand 与完整 20 组原 profile；`tone` 保留兼容，color 优先。三外观、20/24/28 均从 Foundations 消费；静态紧凑默认 20，交互默认 24。

操作区随完整尺寸变化：关闭反馈由原生拉伸与正方形比例取标签内高，Line/1 下对应 18/22/26；图标盒复用本档 12/14/14。Link 可视主操作填满同一内高，选择操作取整个标签范围。Space/6 的一半作为透明点击余量与对应留白，使桌面关闭点击区为 24/28/32、各动作不重叠；不再使用固定 24px Tag action Token。触屏纵向扩大为 Space/14 及相同行距，逐项检查至少 24px 宽、44px 高和目标不重叠。

选中勾单独复用 Icon Size/10/12/12 与已有 Alpha/90 配方：对继承的 Icon 色 apply 90%，不改变源 RGB 或组件 Opacity；前图标、关闭图标仍为 12/14/14。强制颜色模式使用不透明系统色。

分类文字、图标、浅底、边界和实底各有独立 Category；白字复用 OnColor/1。TagNeutralSolid 图标及关闭反馈从已有文字色派生，不在 UI 复制 RGB。业务专用色值、专用形状及 Domain 包装已按第二批接入；两批视觉确认与对比度发现分别记录。来源中的 24/60/64/66/68% 仅注册为原始事实，不扩大局部 Alpha 覆盖白名单。

Main Hover/Pressed 按 isolated multiply 的 12/18% 合成；边框位于 padding box 外，不叠加该层；Disabled 为整个组件 0.3。Neutral Filled 选中转为 Brand，不生成不存在的中性选中边框。普通文字保持 4.5:1、有意义图标和必要边界保持 3:1，所有原配色不足仍记录为未接受发现。详见[真实组件证据](../../evidence/runtime/tag-batch-one/verification.md)。

## 进入下一批

参见 [实施计划](../plans/2026-09-05-token-foundations-v1-implementation.md) 和 [准备度评估](../audits/2026-09-05-token-construction-readiness.md)。本批自动验证、独立技术审阅、Human Gate 分别记录。确认首组 Size/Density 与视觉后，再开展 Input + Button + 搜索/筛选完整 Recipe 的迁移。
