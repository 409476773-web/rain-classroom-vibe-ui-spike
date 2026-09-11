# Icon 迁移前只读预检

本次核对了讨论涉及的 42 个真实资产及 Rain Next 的现有接入位置。结果支持既定的“正式资产 + 统一渲染 + 语义索引”方向，同时明确了颜色转换、蒙版、Loading 和显示尺寸的处理要求。

**状态：仅完成结构预检与文档更新。** 未迁移运行时代码，未生成正式资产库存、安装入口或组件；未运行构建、测试或新图标的浏览器视觉验证；未改写或发布 Figma。完整图库仍以[迁移计划](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/docs/plans/2026-09-03-icon-library-migration.md)为准，本记录不关闭任何 Human Gate。

## 1. 核对范围与方法

- 日期：2026-09-03；记录整理截至 16:37（Asia/Shanghai）。
- Figma 文件：`olqwu95QD6n4Y3IAwUdgF4`；图库页面 [02 · Icons](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=1-3)。
- 样本：语义说明 [section 2201:707](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2201-707) 的 41 个不同主组件，加 Loading `207:33`。包含默认、例外及备选，不表示 42 个全局默认。
- 逐项核对主组件 ID、名称、Key、类型和画布，再只读调用 `exportAsync({ format: "SVG_STRING", contentsOnly: true, svgIdAttribute: false })`。
- 共 45 次读取导出：14 + 14 + 15 + 2；其中 3 次为双层蒙版的重复细查，合计 42 个不同资产。身份不匹配 0，导出失败 0。
- 检查节点 paint、stroke、蒙版、变量绑定，以及 SVG 的画布、固定颜色、ID/引用、渐变和 foreignObject。三个双层蒙版另读完整 SVG，确认白色所在位置。
- SVG 字符串仅用于本次读取和分析，未作为原始资产文件写入仓库；本记录是检查摘要，不是可重放的全量 source-lock。正式实施仍需保存原始导出及哈希。
- 属性提取仅用于结构信号统计，不把简单正则当作完整 SVG 解析、颜色分类或保真证明。未来转换须理解元素及引用关系。

## 2. 直接观察结果

| 项目 | 结果 |
|---|---:|
| 唯一主组件及身份核对 | 42/42 一致 |
| 主组件画布与 SVG viewBox | 42/42 为 24×24、0 0 24 24 |
| 单色图形 | 41 |
| 角向透明渐变 Loading | 1 |
| 导出使用 currentColor | 0/42 |
| 单层 alpha 蒙版 | 38 |
| 双层 alpha/luminance 蒙版 | 3 |
| 包含 SVG ID | 42/42 |
| 包含 foreignObject | 1，仅 Loading |
| 本批导出 stroke 属性 | 0 |
| 节点具有颜色变量绑定 | 42/42，观察到 VariableID:431:30 |

41 个单色导出均包含固定前景色 `#1D2129`。其中 3 个还含白色，但白色用于蒙版/裁切辅助结构，不构成固有多色。未据此核定该变量的名称，也不将变量绑定视为网页自动继承颜色的证据。

本批线性图标的轮廓由填充路径构成；“线性版”是视觉样式，不等于 SVG 必须使用 stroke。不能通过有没有 fill 来判断线性/实心版本。

## 3. 查明的风险与处理要求

### 3.1 固定颜色是可以直接确认的失配条件

一级按钮已有反白前景色，见 [styles.css:136](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/packages/ui/src/styles.css:136)；图标插槽传递 color，见 [styles.css:262](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/packages/ui/src/styles.css:262)。而本批原始导出的可见前景仍为固定深灰色。把这种 SVG 原样放进按钮，仅设置外层 color 不会使其固定 fill 变为白色。

现有私有图标能跟随按钮，是因为路径已明确使用 currentColor，见 [text-button-icons.tsx:22](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/apps/playground/src/docs/components/text-button-icons.tsx:22)。

**实施要求：** 将经过分类确认的可见前景转换为宿主色；保留图形、透明度和蒙版语义。一级按钮、普通按钮和状态提示各自由宿主供色，页面不逐个修补白色。本次证明了该失配的形成条件，没有重现或定位旧版每一次 Vibe Coding 失败现场。

### 3.2 不能无差别替换所有 fill

`icon/arrow-down`、`icon/arrow-up`、`icon/check-bold` 均具有外层 alpha 蒙版、内层 luminance 蒙版及 clipPath。内层 luminance 蒙版使用白色矩形路径；最终可见前景由蒙版外的深灰矩形提供。

luminance 蒙版会利用颜色亮度和 alpha 计算可见程度，因此把这个白色也改成深色 currentColor，可能改变图标透明度。这是基于已观察结构与 [W3C CSS Masking 的蒙版计算规则](https://www.w3.org/TR/css-masking-1/#MaskValues)得出的风险判断，尚未在本仓库浏览器中重现。

**实施要求：** 区分可见前景与蒙版/裁切辅助值；先保留源结构，任何简化都须另做保真验证。白色辅助值不纳入图标固有配色，也不随宿主盲目改色。

### 3.3 原始 ID 不能直接重复内联

本批每个 SVG 都有 ID。三个双层蒙版还同时存在 mask 和 clipPath 引用。例如 arrow-down 使用 `mask0_63_76`、`mask1_63_76`、`clip0_63_76`。同一个原始 SVG 重复内联，会重复这些固定 ID。

**实施要求：** 渲染策略必须保证引用隔离；保留 defs 时同时处理 ID 及其所有引用，不能只给文件名加前缀。验证同图多实例、不同宿主颜色和不同图标共页。当前仅确认结构风险，没有观察到新组件串色或裁切错误。

### 3.4 Loading 是独立适配项

`icon/button-loading` 的 Figma paint 为角向渐变；两端均为白色，alpha 从 0 到 1。此次 SVG 导出使用 foreignObject 内的 CSS conic-gradient，并由 clipPath 限制为圆环；不是普通的 SVG linearGradient/radialGradient。

`data-figma-gradient-fill` 是附加的渐变元数据，不是 fill 属性；不能将其当作固定颜色，也不能仅保留 path 就假定渐隐仍然存在。

现有 [button-loading.png](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/packages/ui/src/button/assets/button-loading.png) 为 27×27 RGBA、1212 字节；只读解码 alpha 范围为 0–252，共 156 种取值，包含 457 个全透明像素和 272 个半透明像素。SHA-256：

`adbfc717706b3d90add735fcad30f480e86148a72d3a8d833ab3fa787d261704`

[现有样式](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/packages/ui/src/styles.css:289)通过 PNG mask + currentColor 着色，并由 Button 控制 800ms 旋转；[reduced-motion 规则](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/packages/ui/src/styles.css:683)停转。普通 Button loading 整体 opacity 为 0.82，文字按钮覆盖为 1。

**实施要求：** 优先将现有 PNG 与正式来源比较，核对圆环、渐隐方向、边界和宿主色；确认一致后再决定复用。新 Icon 不再叠加第二层旋转或整体透明度。不凭本次结构检查宣称 PNG 已与源图逐像素一致，也不宣称 foreignObject 已发生兼容性故障。

### 3.5 Button 接口可以复用，显示尺寸仍需比较

[Button](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/packages/ui/src/button/button.tsx:16)已经接受 leadingIcon/trailingIcon，并管理 loading、装饰图标容器及状态。本次没有发现需要新增 iconName 或按文案猜图标的理由。

[尺寸规则](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/packages/ui/src/styles.css:272)分别管理前图标与后图标：

| 宿主尺寸 | 前图标/Loading | 后图标 |
|---|---:|---:|
| Button mini | 14 | 10 |
| Button small / medium / large | 16 | 12 |
| Button xl | 22 | 16 |
| 文字按钮 small | 14 | 12 |
| 文字按钮 compact / regular | 16 | 12 |

数值单位为 px。直接子元素填满图标插槽，不代表可见图形填满插槽。旧编辑夹具为紧裁切 viewBox `0 0 11.3749 11.356`，新 edit-pencil 为完整 24×24；保留标准画布后必须比较视觉大小、留白与居中。

旧右三角仍有[旋转样式](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/apps/playground/src/docs/components/text-button-page.css:156)。切换到正式上下资产时需同步调整页面引用和断言；不能把旧三角改名当成新双箭头。

### 3.6 当前保护还不能保证 AI 使用正式图标

[边界检查](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/scripts/verify-boundaries.mjs:2065)主要约束允许的文件范围。[现有文字按钮 E2E](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/tests/e2e/text-button.spec.ts:112)检查两个旧夹具的名称、viewBox 和填色。当前没有正式公共 Icon、生成器或 verify-icons，也没有覆盖页面内联近似 SVG、Unicode 箭头、原生 marker 和非法名称的专项图标检查。

**实施要求：** 静态引用、正式资产身份、AI 语义索引和消费检查一起接入。文件在允许目录内不代表使用了正确图标；静态扫描也不能独自判定任意业务语义。计划中的未来检查不计为当前已实现能力。

## 4. 对后续计划的影响

实施顺序保持不变：登记授权范围 → 冻结完整图库 → 建立语义/颜色数据 → 首批 9 项接通渲染 → 扩展本批及全库 → 场景验证与人工验收。

此次新增了明确验证对象：

| 验证对象 | 必须回答的问题 |
|---|---|
| 41 个单色资产 | 只转换可见前景后，宿主色是否正确，形状是否保真？ |
| 两个单箭头与 check-bold | 白色 luminance 蒙版是否保留，深色/白色宿主下是否改变透明度？ |
| 同图多实例 | ID 与引用是否隔离，不同颜色/状态是否互相影响？ |
| Loading | 正式渐隐、宿主色、尺寸、单次旋转、reduced-motion 是否共同成立？ |
| 新旧画布差异 | 标准 24×24 资产在现有插槽中是否大小合适、视觉居中？ |
| AI 页面消费 | 是否根据已确认场景选对真实资产，并由宿主控制颜色？ |

完整图库此前统计为 897 项；本次未重数全库，也未检验其余资产的颜色类别。品牌、多色及其他复杂结构仍需单独取样和全量核对。本次只更新预检与计划文档，不开始上述实施步骤。

## 附录：42 个核对对象

Component Key 与已确认语义见迁移计划第 2.1 节及附录 B。本表仅记录本次结构分类，不新增默认语义。

| 正式名称 | 主组件 ID | 本次导出结构 |
|---|---|---|
| `icon/edit-pencil` | `183:574` | 单色；alpha 蒙版 |
| `icon/circle-close` | `67:39` | 单色；alpha 蒙版 |
| `icon/button-loading` | `207:33` | 角向透明渐变；foreignObject + clipPath |
| `icon/close` | `8:2` | 单色；alpha 蒙版 |
| `icon/circle-close-filled` | `63:88` | 单色；alpha 蒙版 |
| `icon/edit-pencil-filled` | `183:540` | 单色；alpha 蒙版 |
| `icon/search` | `8:20` | 单色；alpha 蒙版 |
| `icon/filter` | `63:56` | 单色；alpha 蒙版 |
| `icon/more-vertical` | `52:74` | 单色；alpha 蒙版 |
| `icon/more-horizontal` | `52:68` | 单色；alpha 蒙版 |
| `icon/more-horizontal-filled` | `68:62` | 单色；alpha 蒙版 |
| `icon/settings-3` | `183:581` | 单色；alpha 蒙版 |
| `icon/settings-3-filled` | `183:546` | 单色；alpha 蒙版 |
| `icon/refresh` | `51:80` | 单色；alpha 蒙版 |
| `icon/arrow-down` | `63:76` | 单色；alpha + luminance 双层蒙版 |
| `icon/arrow-up` | `63:69` | 单色；alpha + luminance 双层蒙版 |
| `icon/chevron-down` | `8:17` | 单色；alpha 蒙版 |
| `icon/chevron-up` | `52:33` | 单色；alpha 蒙版 |
| `icon/double-arrow-down` | `71:35` | 单色；alpha 蒙版 |
| `icon/double-arrow-up` | `71:32` | 单色；alpha 蒙版 |
| `icon/circle-check-filled` | `63:85` | 单色；alpha 蒙版 |
| `icon/circle-check` | `67:42` | 单色；alpha 蒙版 |
| `icon/alert-circle` | `67:64` | 单色；alpha 蒙版 |
| `icon/alert-filled` | `68:50` | 单色；alpha 蒙版 |
| `icon/info` | `67:58` | 单色；alpha 蒙版 |
| `icon/info-filled` | `68:44` | 单色；alpha 蒙版 |
| `icon/help` | `8:14` | 单色；alpha 蒙版 |
| `icon/help-filled` | `68:47` | 单色；alpha 蒙版 |
| `icon/check-bold` | `71:48` | 单色；alpha + luminance 双层蒙版 |
| `icon/close-bold` | `71:51` | 单色；alpha 蒙版 |
| `icon/add-circle-outline` | `67:32` | 单色；alpha 蒙版 |
| `icon/add-circle-filled` | `67:89` | 单色；alpha 蒙版 |
| `icon/minus-circle-outline` | `67:36` | 单色；alpha 蒙版 |
| `icon/minus-circle-filled` | `67:92` | 单色；alpha 蒙版 |
| `icon/add` | `51:32` | 单色；alpha 蒙版 |
| `icon/minus` | `51:38` | 单色；alpha 蒙版 |
| `icon/add-bold` | `71:54` | 单色；alpha 蒙版 |
| `icon/delete` | `51:50` | 单色；alpha 蒙版 |
| `icon/publish` | `182:645` | 单色；alpha 蒙版 |
| `icon/publish-filled` | `182:695` | 单色；alpha 蒙版 |
| `icon/published` | `186:546` | 单色；alpha 蒙版 |
| `icon/share-alt` | `184:606` | 单色；alpha 蒙版 |

