# Rain Next 颜色 Token 补充：Second、Orange、Green、Red

## 1. 状态、来源与范围

- 日期：2026-09-06；工作模式：System Mode，设计归档与实施准备。
- 决策来源：本任务中用户提供的完整色值，以及随后对 Fill 前景搭配的纠正与“确定。继续”。以下色值和第 3 节的搭配方向已由用户确认。
- 设计依据：[颜色治理主文档](2026-09-05-color-token-governance-design.md)。本文补充四个 Family，不改变原有分层。
- 当前运行：[Color Registry](../../packages/foundations/src/color-registry.ts) 已登记 105 个公共颜色 ID（原 57 项与新增 48 项），原 Semantic 另计。2026-09-06 用户在方案归档后要求“继续”，本次实现与验证进度见第 8 节。
- [当前阶段](../../status/current-phase.yaml) 中原第 0/1 批的实现完成和 Human Gate 状态保持独立；用户确认本次色值与用法不等于每个组合已经通过视觉或可访问性验收。
- 设计归档阶段交付了补充设计、来源核对和配对分析；其后的颜色基础与预览实现单独记录。组件迁移、Dark、Figma、发布与 Git 状态保持独立。

本文中的“所有 Alpha”专指这次新增四个 Family 的 18% / 10% Alpha 填充。不将这些规则套到既有 Neutral 或 Brand 色阶；例如既有 Brand 的 85% / 65% Alpha 仍按自身表面方案处理。

## 2. 已确认的颜色与公共身份

沿用 `Category/Family[/Mode]/Key`。一级对应初始 key 1，后续插级继续遵守主文档的 key / order 分离规则。等级不绑定 Hover、Pressed、Selected 或 Disabled。

`Second` 保留用户命名，表示介于品牌与中性之间的蓝色系；不改名为中性色或业务状态。`Orange`、`Green`、`Red` 是色系名，Warning / Success / Error 是另一层语义，不自动改写既有 Semantic。

### 2.1 Text 与 Icon

下表每个值分别形成 `Text/<Family>/<Key>` 和 `Icon/<Family>/<Key>`。公开角色身份分开，首次值保持一致。

| Family | 一级 | 二级 | 三级 | 四级 |
| --- | --- | --- | --- | --- |
| Second | `#1C3A9C` | `#3751A7` | `#576EBD` | `#91ACEA` |
| Orange | `#DD5C00` | `#F18300` | — | — |
| Green | `#058952` | `#00B574` | — | — |
| Red | `#CA2732` | `#F34848` | — | — |

用户说明：橙、绿、红通常让文字与图标同色；文字旁的小图标有时使用浅一个等级。Second 四级的设计意图是极少数辅助小字。以上属于用途意图，具体表面与内容仍需检查，不能直接作为低对比度豁免。

### 2.2 Border

公开身份为 `Border/<Family>/<Key>`。

| Family | 一级 | 二级 |
| --- | --- | --- |
| Second | `#5F7DE1` | `#ACBAEA` |
| Orange | `#F78600` | `#FFD6B7` |
| Green | `#14BF82` | `#98DAC5` |
| Red | `#F34848` | `#F5BABC` |

### 2.3 Fill / Solid

公开身份为 `Fill/<Family>/Solid/<Key>`；全部为不透明原值。

| Family | 一级 | 二级 | 三级 |
| --- | --- | --- | --- |
| Second | `#3752AB` | `#365BD6` | `#E3E9FC` |
| Orange | `#EB7600` | `#F78600` | `#FFF2EB` |
| Green | `#0E9954` | `#14B565` | `#E7F9F2` |
| Red | `#E13843` | `#F34848` | `#FCEDED` |

### 2.4 Fill / Alpha

公开身份为 `Fill/<Family>/Alpha/<Key>`。Alpha 表示不透明度，保存源 RGB 与 Alpha，不保存叠白后的颜色来冒充原值。

| Family | 源色 | 一级 Alpha | 二级 Alpha |
| --- | --- | --- | --- |
| Second | `#4976F2` | `18%` | `10%` |
| Orange | `#F78600` | `18%` | `10%` |
| Green | `#14B565` | `18%` | `10%` |
| Red | `#F34848` | `18%` | `10%` |

18 和 10 已在现有 Alpha 白名单内，无需新增全局 Alpha 档位。Solid 三级与 Alpha 的前景选择方向相同，但两种填充不承诺视觉等效。

### 2.5 计数与共享边界

| 类别 | 新增公共 ID 数量 |
| --- | ---: |
| Text | 10 |
| Icon | 10 |
| Border | 8 |
| Fill / Solid | 12 |
| Fill / Alpha | 8 |
| 合计 | 48 |

设计表将 Text / Icon 合并展示时是 38 个输入条目，不是 38 个唯一 Hex，也不是最终公共 ID 数。

相同 Hex 不自动建立 Alias 或共同改值关系。首次 Text / Icon 可以复用同一组输入行，但各自的身份与后续变更影响仍需明确。尤其保留 `Text/Second/2 #3751A7` 与 `Fill/Second/Solid/1 #3752AB`、`Border/Green/1 #14BF82` 与 `Fill/Green/Solid/2 #14B565` 的原始差异。

## 3. 已确认的前景搭配规则

| 本次新增的承载面 | 文字与普通单色 Icon 的搭配方向 |
| --- | --- |
| Fill / Solid 一级、二级 | 仅既有 OnColor 反白色系 |
| Fill / Solid 三级 | 普通深色 Text / Icon，或同 Family 的 Text / Icon |
| Fill / Alpha 一级、二级 | 与 Solid 三级相同：普通深色或同 Family 的 Text / Icon |

执行细则：

1. 背景与前景等级不要求对应。例如 `Fill/Orange/Solid/3` 可选择 `Text/Orange/1` 或 `/2`，图标可选择对应的 `Icon/Orange/1` 或 `/2`，再验证具体内容。
2. 小图标浅一档是具体 Recipe 的选择，不实现全局 `Icon = Text key + 1`。图标如果承担必要操作或识别，单独检查它与实际背景的对比度。
3. 普通深色复用既有 Neutral 前景。例如 `Text/Neutral/1 #142346` 与 `Icon/Neutral/1 #3A4865`，不用新增“深色”公共色系。
4. 反白复用既有 `OnColor/1–5`，不是给每个 Family 再建一套白色 Token。只有符合实际表面与内容资格的档位可以进入消费方案。
5. Solid 一级、二级的反白组合若不足，应记录缺口并讨论相应填充或完整配方，不自动改配深色前景。
6. 规则作用于该填充直接承载的内容。嵌套组件若有独立表面，按自己的表面方案重新判断。
7. 明确登记前景范围，不在运行时根据颜色亮度猜测。当前只支持 Light；不据此推导 Dark。

## 4. 已计算的搭配与待调整点

使用现有合同的门槛：普通文字 4.5:1；大文字、有意义 Icon 与必要边界 3:1。Alpha 先与实际底色合成，再计算；展示保留两位小数，判定使用未舍入值。规则来源见 [WCAG 文字对比度](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)与[非文字对比度](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)。

### 4.1 Solid 一级、二级与反白

| Family | 一级 + OnColor/1 | 二级 + OnColor/1 | 现有 OnColor 中满足普通文字的档位 |
| --- | ---: | ---: | --- |
| Second | 7.10:1 | 5.79:1 | 两个 Solid 均可用 OnColor/1、/2 |
| Orange | 2.95:1 | 2.51:1 | 两个 Solid 均无 |
| Green | 3.68:1 | 2.68:1 | 两个 Solid 均无 |
| Red | 4.33:1 | 3.60:1 | 两个 Solid 均无 |

有意义 Icon 的资格另算：Second 两档可用 OnColor/1–3；Green 一级可用 /1、/2；Red 一级可用 /1、/2，二级仅 /1。Orange 两档与 Green 二级无合格的现有反白 Icon 档。`Red Solid/2 + OnColor/2` 约为 2.975:1，仍不足 3:1。OnColor/4、/5 在这八个强填充上均不足 3:1；真实 Disabled 与 Decorative 按原合同处理。

因此，橙、绿、红这六个强填充的普通反白文字搭配仍有缺口。原色可保留为已确认输入，但不能直接标为合格的小字组件方案；本轮没有擅自替换任何 Hex。

### 4.2 Solid 三级与普通／同系前景

| Family | 同系文字一级 | 同系文字二级 | 普通深色文字 Neutral/1 | 普通深色 Icon Neutral/1 |
| --- | ---: | ---: | ---: | ---: |
| Second | 8.12:1 | 5.98:1 | 12.75:1 | 7.55:1 |
| Orange | 3.42:1 | 2.40:1 | 14.10:1 | 8.35:1 |
| Green | 4.09:1 | 2.45:1 | 14.15:1 | 8.38:1 |
| Red | 4.80:1 | 3.17:1 | 13.60:1 | 8.05:1 |

普通深色在这四个 Solid 三级上都有可用的文字与 Icon 组合。同系普通文字目前可用 Second 一级、二级和 Red 一级；橙、绿同系文字仍缺更深档位或适用的完整方案。

Second 三级文字在白底为 4.81:1，在同系 Solid 三级为 3.96:1；四级在白底仅 2.26:1。不能给一个前景等级标记“所有浅底均可用”，也不能把“极少数辅助小字”直接设为豁免。

### 4.3 Alpha 与 Border

- Alpha 的使用方向与 Solid 三级相同，资格仍取决于真实父背景。例如 Red 文字一级搭配 Red Alpha 10% 叠白底约 4.81:1，18% 叠白底约 4.34:1，后者不足普通文字要求。
- Green 文字一级在白底约 4.462:1，仍未达到 4.5:1；不能按近似显示值放行。
- 橙、绿 Border 在白底、同系 Solid 三级、同系 18% / 10% Alpha 叠白底这四种测试表面上均不足 3:1，不能独自承担必要边界识别。装饰分隔线不因此统一禁用。
- 以上只覆盖明确列出的 Light 色对，不是全组件、全背景、交互状态或 Human Gate 的通过记录。

## 5. 与现有 Token 体系的衔接

保留现有链路：颜色事实 → Public Category → 可选 Semantic / 具体 Recipe → 受控 Tailwind 与使用端。

1. **事实与来源**：在既有 Color Registry 增补四个 Family，48 个新 ID 的 `source` 指向本文第 2 节，原 57 个保留原出处。现有 `source` 是文档溯源，不是 Palette 引用解析器；无需先建设完整私有色板引擎。
2. **配对规则**：以精确 Family、Fill mode 和 key 约束前景角色与范围。复用既有用途合同，避免一个显示名条件误伤原 Neutral / Brand；展示原值与合法消费分别处理。
3. **Alpha 背景合成**：本次实施前 `validateColorUse` 只接受不透明父表面。补充实现需要验证“Text / Icon → Alpha Fill → 不透明 Background”；未知父表面仍报告缺口，不把叠白值另建成公共 Token。当前最小实现与限制见第 8 节。
4. **单源输出与预览**：复用现有生成器、CSS 变量、静态类与 Playground。新规则必须覆盖实际消费者检查，不能只在预览里限制选择。仅展示色值的样本不能冒充已通过的组件配方。
5. **Semantic 与组件**：Warning / Success / Error 的候选映射可引用 Orange / Green / Red，但选择具体档位、前景、边界与状态由各自配方决定。既有 danger、Focus 和组件颜色不自动迁移；Second 不默认等同 Info。
6. **完整色板**：这些是按角色整理的用途档位，不要求先补出红橙黄绿青蓝紫的完整连续色板。未来新增私有色板时保留这些公共身份和原值来源，明确映射后再接入，不把最近色阶当作等值替代。

## 6. 后续建设顺序与交付条件

| 顺序 | 工作 | 前置与完成条件 |
| --- | --- | --- |
| 1 | 48 个原值登记、来源与范围标注 | 第 2、3 节已确认；登记后原 57 值不变，新总数 105，Dark 未配置，缺口不伪装成可用配方 |
| 2A，可并行准备 | 新增前景范围校验与最小 Alpha 表面链 | 拒绝四族 Solid 1/2 的深色前景、拒绝未知底色；可验证 Solid 3 / Alpha 的普通与同族前景 |
| 2B，可并行准备 | 讨论并验证缺失的搭配 | 优先强填充反白小字，其次橙绿同系浅底小字；是否调整／补充颜色需形成具体候选并单独确认 |
| 3 | 生成输出、Playground 与 AI 选色说明 | 依赖数据和规则；演示精确原值、合法搭配与待调整样本，正确显示 Alpha 的真实承载面 |
| 4 | 代表性完整 Recipe 与组件迁移 | 只采用已解决的具体搭配，另定组件范围；结合真实交互、状态、嵌套表面和 Human Gate 验证 |

事实登记和规则实现可以在保留缺口标记的前提下推进；未解决的具体配对限制对应组件的采用，不要求先解决所有色系才能登记数据。

实施时复用当前质量门：先运行颜色专项、类型与 `verify:tokens`，再执行受影响 Playground 的浏览器验证；公共输出或消费校验改变时完成该批次所需回归。验证重点包括来源和计数、原值精确性、角色限制、Alpha 合成、未舍入门槛、真实样本与原有作用域隔离。

## 7. 本轮核对

设计归档时已核对 Registry、颜色治理规则、原第 0/1 批阶段状态与 AI 选色入口；独立只读审阅确认了身份计数、来源、角色边界和 Alpha 校验缺口。第 4 节重新计算了具体色对。该次设计归档未产生运行资产；随后获授权的实现记录如下，原有验收保持独立。

## 8. 2026-09-06 实现增量

用户在上述设计交付后要求“继续”。工作范围为 System Mode：48 个 Light 原值、已有生成输出、新配对限制、一层 Alpha 承载面合成与独立 Playground；不迁移现有组件。

- 实现顺序：先补失败用例 → 原值与角色约束 → 表面合成 → 单源样式与展示范围 → Playground → 专项与完整回归 → 独立审阅。
- 当前实现：105 个公共 ID，来源分开；原 57 值与未托管 CSS 段按实施前基线核对。
- 实际用法：`parentSurfaceId` 是直接承载面，透明时由 `parentBackgroundId` 指定其不透明底。源代码检查逐层匹配最近的已知绘制背景，不能跳过中间背景或使用同节点多背景的歧义证明。拒绝未知底、多层透明底以及未表达的父表面 Alpha 覆盖；不进行自动白底回退。
- 展示范围：`#token-foundations` 中新增 Fill 前景配对预览，可独立选文字和 Icon，显示对比度不足。展示用样本不作为通过的组件配方，公共消费仍走实际角色、Recipe 和表面检查。
- 状态：本次实现、自动验证与独立审阅已完成。2026-09-06 用户确认颜色 Token 视觉无问题，颜色视觉 Human Gate 为 `accepted`；不改变第 4 节具体配对缺口或其他资产验收。独立记录于[阶段文件](../../status/current-phase.yaml)的 `tokenRefinements.colorFamilySupplement`；具体检查、修复和证据见[验证记录](../../evidence/runtime/color-family-supplement/verification.md)。
