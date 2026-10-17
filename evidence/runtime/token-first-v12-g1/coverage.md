# 64 项现实差距快照 · 2026-09-19

冻结分母仍为工作包的 64 项。此表只记录本批接续时的检索结果，不替代现有 Manifest，也不将 64 项重新记为待开发。搜索范围见 [检索记录](coverage-scan.json)：168 个非生成源码/合同文件，跨 UI、Layouts、原型和 Patterns；排除图标、测试和本批新增适配。相关线索还逐一核对其实际源码入口。未找到独立资产不等于证明全库完全没有该能力。

本批新增四项均为 local-experiment，默认方向及正式登记尚待确认；没有将“源码已适配”计为新增系统资产或 64 项验收通过。既有 18 项保留原身份、成熟度和人工状态。Badge 为宿主附着角标，其语义差异单独保留。

| # | 目录项 | 本地情况 | 证据／差距与下一步 | 原批次 |
|---|---|---|---|---|
| 1 | Accordion | 本批源码适配 / local-experiment | [本地适配](../../../apps/prototype/src/scenarios/token-first-g1/accordion.tsx)；组合与键盘已检验，F05 默认方向待确认 | W1 / G1 |
| 2 | Alert | 本批源码适配 / local-experiment | [本地适配](../../../apps/prototype/src/scenarios/token-first-g1/alert.tsx)；组合与键盘已检验，F05 默认方向待确认 | W1 / G1 |
| 3 | Alert Dialog | 既有 registry-candidate / registry-candidate | [ui-alert-dialog](../../../manifests/ui/alert-dialog.yaml)；保留原验收状态 | W0 / G0 |
| 4 | Aspect Ratio | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W4 / G6 |
| 5 | Attachment | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W4 / G6 |
| 6 | Avatar | 既有 registry-candidate / registry-candidate | [ui-avatar](../../../manifests/ui/avatar.yaml)；保留原验收状态 | W0 / G0 |
| 7 | Badge | 既有 local-experiment / prototype-ready | [ui-badge](../../../manifests/ui/badge.yaml)；保留原验收状态，附着角标不直接等于官方 Badge | W0 / G0 |
| 8 | Breadcrumb | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W2 / G3 |
| 9 | Bubble | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W4 / G6 |
| 10 | Button | 既有 local-experiment / prototype-ready | [ui-button](../../../manifests/ui/button.yaml)；保留原验收状态 | W0 / G0 |
| 11 | Button Group | 已有相关能力，尚未确认等效 | [RadioGroup / CheckableTagGroup / Button 局部组合](../../../packages/ui/src/index.ts)；在所属批次核对行为与 API，暂不计覆盖 | W2 / G2 |
| 12 | Calendar | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W3 / G5 |
| 13 | Card | 既有 registry-candidate / registry-candidate | [ui-card](../../../manifests/ui/card.yaml)；保留原验收状态 | W0 / G0 |
| 14 | Carousel | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W4 / G6 |
| 15 | Chart | 已有相关能力，尚未确认等效 | [历史 BM-D 的局部 TrendChart，不等于公共 Chart](../../../apps/prototype/src/scenarios/bm-d/trend-chart.tsx)；在所属批次核对行为与 API，暂不计覆盖 | W3 / G4 |
| 16 | Checkbox | 既有 registry-candidate / registry-candidate | [ui-checkbox](../../../manifests/ui/checkbox.yaml)；保留原验收状态 | W0 / G0 |
| 17 | Collapsible | 本批源码适配 / local-experiment | [本地适配](../../../apps/prototype/src/scenarios/token-first-g1/collapsible.tsx)；组合与键盘已检验，F05 默认方向待确认 | W1 / G1 |
| 18 | Combobox | 已有相关能力，尚未确认等效 | [Select 的搜索形态，须核对是否覆盖具体用途](../../../packages/ui/src/select/select.tsx)；在所属批次核对行为与 API，暂不计覆盖 | W3 / G5 |
| 19 | Command | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W2 / G3 |
| 20 | Context Menu | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W2 / G3 |
| 21 | Data Table | 已有相关能力，尚未确认等效 | [历史资料管理配方，不等于全部高级数据表](../../../apps/prototype/src/data-table-recipe.tsx)；在所属批次核对行为与 API，暂不计覆盖 | W4 / G6 |
| 22 | Date Picker | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W3 / G5 |
| 23 | Dialog | 既有 registry-candidate / registry-candidate | [ui-dialog](../../../manifests/ui/dialog.yaml)；保留原验收状态 | W0 / G0 |
| 24 | Direction | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W4 / G6 |
| 25 | Drawer | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W4 / G6 |
| 26 | Dropdown Menu | 既有 registry-candidate / registry-candidate | [ui-dropdown-menu](../../../manifests/ui/dropdown-menu.yaml)；保留原验收状态；本批修复 paint 层叠并回归 | W0 / G0 |
| 27 | Empty | 既有 registry-candidate / registry-candidate | [ui-empty](../../../manifests/ui/empty.yaml)；保留原验收状态 | W0 / G0 |
| 28 | Field | 已有相关能力，尚未确认等效 | [FormItem 与已有字段；不是当然等于所有 Field 能力](../../../packages/ui/src/input/form-item.tsx)；在所属批次核对行为与 API，暂不计覆盖 | W3 / G5 |
| 29 | Hover Card | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W2 / G3 |
| 30 | Input | 既有 registry-candidate / registry-candidate | [ui-input](../../../manifests/ui/input.yaml)；保留原验收状态 | W0 / G0 |
| 31 | Input Group | 已有相关能力，尚未确认等效 | [Input 现有插槽与 FormItem，先核对可组合边界](../../../packages/ui/src/input/input.tsx)；在所属批次核对行为与 API，暂不计覆盖 | W3 / G5 |
| 32 | Input OTP | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W4 / G6 |
| 33 | Item | 已有相关能力，尚未确认等效 | [List composition 局部行配方，非公共 Item](../../../apps/prototype/src/scenarios/list-composition/list.tsx)；在所属批次核对行为与 API，暂不计覆盖 | W3 / G4 |
| 34 | Kbd | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W2 / G3 |
| 35 | Label | 已有相关能力，尚未确认等效 | [FormItem 标签关联；独立标签复用能力待核对](../../../packages/ui/src/input/form-item.tsx)；在所属批次核对行为与 API，暂不计覆盖 | W3 / G5 |
| 36 | Marker | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W4 / G6 |
| 37 | Menubar | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W2 / G3 |
| 38 | Message | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W4 / G6 |
| 39 | Message Scroller | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W4 / G6 |
| 40 | Native Select | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W3 / G5 |
| 41 | Navigation Menu | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W2 / G3 |
| 42 | Pagination | 既有 registry-candidate / registry-candidate | [ui-pagination](../../../manifests/ui/pagination.yaml)；保留原验收状态 | W0 / G0 |
| 43 | Popover | 既有 registry-candidate / registry-candidate | [ui-popover](../../../manifests/ui/popover.yaml)；保留原验收状态 | W0 / G0 |
| 44 | Progress | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W3 / G4 |
| 45 | Questionnaire | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W4 / G6 |
| 46 | Radio Group | 既有 registry-candidate / registry-candidate | [ui-radio-group](../../../manifests/ui/radio-group.yaml)；保留原验收状态 | W0 / G0 |
| 47 | Resizable | 未找到独立资产 / 未验证 | 依赖与键盘调宽待核对；本批布局未引入新的调宽依赖 | W1 / G1 |
| 48 | Scroll Area | 已有相关能力，尚未确认等效 | [TableScrollArea / Split 局部滚动，勿等同通用完整能力](../../../packages/ui/src/index.ts)；在所属批次核对行为与 API，暂不计覆盖 | W2 / G3 |
| 49 | Select | 既有 registry-candidate / registry-candidate | [ui-select](../../../manifests/ui/select.yaml)；保留原验收状态 | W0 / G0 |
| 50 | Separator | 既有 registry-candidate / registry-candidate | [ui-separator](../../../manifests/ui/separator.yaml)；保留原验收状态 | W0 / G0 |
| 51 | Sheet | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W2 / G3 |
| 52 | Sidebar | 已有相关能力，尚未确认等效 | [Split/Pane 与页面目录，仅布局相关](../../../packages/layouts/src/layout.tsx)；在所属批次核对行为与 API，暂不计覆盖 | W2 / G3 |
| 53 | Skeleton | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W2 / G2 |
| 54 | Slider | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W3 / G5 |
| 55 | Spinner | 已有相关能力，尚未确认等效 | [Button 内部加载图形，独立 Spinner 待核对](../../../packages/ui/src/button/button.tsx)；在所属批次核对行为与 API，暂不计覆盖 | W2 / G2 |
| 56 | Switch | 本批源码适配 / local-experiment | [本地适配](../../../apps/prototype/src/scenarios/token-first-g1/switch.tsx)；组合与键盘已检验，F05 默认方向待确认 | W1 / G1 |
| 57 | Table | 既有 registry-candidate / registry-candidate | [ui-table](../../../manifests/ui/table.yaml)；保留原验收状态 | W0 / G0 |
| 58 | Tabs | 既有 registry-candidate / registry-candidate | [ui-tabs](../../../manifests/ui/tabs.yaml)；保留原验收状态 | W0 / G0 |
| 59 | Textarea | 既有 registry-candidate / registry-candidate | [ui-textarea](../../../manifests/ui/textarea.yaml)；保留原验收状态 | W0 / G0 |
| 60 | Toast | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W2 / G2 |
| 61 | Toggle | 未找到独立资产 / 未验证 | 保留后续缺口；先核对兼容官方源码与真实用例 | W2 / G2 |
| 62 | Toggle Group | 已有相关能力，尚未确认等效 | [CheckableTagGroup 的用途可作比较，不预设行为等价](../../../packages/ui/src/tag/checkable-tag.tsx)；在所属批次核对行为与 API，暂不计覆盖 | W2 / G2 |
| 63 | Tooltip | 已有相关能力，尚未确认等效 | [TabsFullLabelTooltip，仅 Tabs 内部，公共 API 待补](../../../packages/ui/src/tabs/tabs-full-label.tsx)；在所属批次核对行为与 API，暂不计覆盖 | W1 / G1 |
| 64 | Typography | 已有相关能力，尚未确认等效 | [现有字体与排版合同](../../../packages/foundations/src/typography-contract.ts)；在所属批次核对行为与 API，暂不计覆盖 | W3 / G4 |

快照计数：18 项既有合同、4 项本批适配、14 项相关能力待核对、28 项未找到独立资产／待验证，共 64 项。这是检索分类，不是完成率。

下一轮 G1：F05 限定确认后，先评估把已有 Base UI Tooltip 扩成可复用接口，再处理 Resizable 的源码及依赖兼容；与本批四项一并完成各自合同、边界和必要证据后才考虑正式登记。G2/G3 不先全面展开。

## 2026-09-20 G1 续批

本节增量优先于上表 2026-09-19 快照，其他行不重计。第 63 项 Tooltip 从 Tabs 内部线索推进到可调用的局部通用适配；Resizable 从未找到独立资产推进到官方引擎上的局部适配。两项具有默认、局改、兄弟实例与实测证据，均为 local-experiment、视觉待确认、未公开发布。G1 六项已有局部来源适配，不等于六项视觉或系统验收完成；Switch 样式继续暂缓。

参看[本批使用说明](../../../apps/prototype/src/scenarios/token-first-g1/README.md)与[续批证据](../token-first-v12-g1-next/verification.md)。沿现有工作包，下一组为 G2 Button Group / Toggle / Toggle Group / Spinner / Skeleton / Toast，先核对已有能力和兼容来源。

### 2026-09-20 Tooltip 共享候选替换

用户另行授权参考旧 Vue Tooltip 完成共享建设并替换 G1 续批实例。当前入口为 `@rain-next/ui` 的 `Tooltip`，源码 `packages/ui/src/tooltip/tooltip.tsx`，Manifest `manifests/ui/tooltip.yaml` / Registry `registry/tooltip.json`；固定 #2F3545 Token 已补入。限定实现和自动验证已完成，状态为 registry-candidate / accepted（仅当前Tooltip视觉与默认下方交互）/ unpublished；对比度接受仍 not-granted。[本轮证据](../tooltip-classic/verification.md)。此前局部 Tooltip 记录是历史快照；Resizable 保持局部适配和 2px。冻结64项与其他组件状态不变。
