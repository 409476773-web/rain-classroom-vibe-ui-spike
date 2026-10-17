# W7 有限颜色登记与实际背景审计

本次只改检查脚本和新证据，不改已验收颜色、Token、原登记表、冻结记录或交付包。人工对比度与可读性验收继续有效；自动颜色一致性仍未证明。

## 已实际运行

- `node scripts/navigation-w7-colors.mjs --out=evidence/runtime/navigation-v042/w7/closure-2026-10-06/colors/source-audit-final.json`：执行完成，exit 1。18 个文件的原始登记完整，1,295 个 CSS 绘制声明、312 个绑定、2 个 inline 绘制仍绑定原登记；R2 精确一行 successor 单独保留 1 个 pending，当前总数为原 810 + successor 1。12 个 DOM/anatomy 源与 10 个 Manifest/contract 的现行 SHA 与登记一致。退出失败保留自动一致性未闭合的事实。[结果](source-audit-final.json)、[日志](source-audit-final.log)。
- `node scripts/navigation-w7-color-anatomy.mjs --out=evidence/runtime/navigation-v042/w7/closure-2026-10-06/colors/role-anatomy-audit.json`：执行完成，exit 1。14 项逐条核对原声明 tuple、现行整个源文件 SHA、唯一完整源码行，再执行已有 `validateColorUse`，保留自动一致性未闭合。[裁决原表](role-anatomy-resolution.json)、[执行结果](role-anatomy-audit.json)、[日志](role-anatomy-audit.log)。
- `pnpm exec vitest run scripts/navigation-w7-colors.test.ts --maxWorkers=1`：2 项检查通过，exit 0。实际 Alpha 祖先链、无不透明终点、低对比、未知颜色、阈值降低、缺少 critical 标记、缺失 pending 引用、anatomy 源证明篡改、Fill border 错用与 Dark 候选回退均有可运行检查。[JSON](unit.json)、[日志](unit.log)。
- `pnpm exec tsc --noEmit --project tsconfig.tests.json`：exit 0。[日志](typecheck.log)。全工程的最新状态由根工程报告记录。

## 登记的真实含义

源审计保留 506 个 CSS 小文字的 4.5:1 阈值，以及有意义图标、图形、重要边界的 3:1 阈值。原 5 个 passive 元数据声明即便 `critical: false`，文字仍要求 4.5:1。135 项精确无绘制仅允许原记录中的 `0`、`none`、`transparent`、`1px solid transparent`、`3px solid transparent`；`inherit`、`currentColor`、原生系统色和渐变未借此豁免。

本次另发现 17 项“原登记 role/property 与直接 authored Category 的合同冲突”。这些是待核查的源码合同问题，**不等于 17 个可读性缺陷**：原保守登记把部分只含图标的按钮归为 text，把纯分割线背景归为 surface，必须由精确 anatomy 进一步确认。`navigation.css` 的 tabs/result hover 将 Fill/Brand/Solid/2 用作文字，以及 selection check 用作有意义图标，确有直接 Category 用途冲突。相同 Light RGB 不证明 Token 身份可以替换；相关 Dark RGB 不同，本次没有换色。

原 810 个 pending 声明完整保留，按每个声明 ID 和六个原因组列出。350 项 source-related 背景记录只证明源码关系；没有因登记、人工验收或哈希匹配成为自动对比度通过。新的 R2 一行 source successor 必须由根的精确投影接口验证，另保留其用途 pending。

## 17 项合同冲突的逐项分流

下列编号均指原表 `nav-color-xxxx`。原表、原阈值及人工审阅范围均未修改。

| 分流 | 编号 | 精确源码结论 | 当前闭合边界 |
|---|---|---|---|
| 可无改色纠正登记 role | 0281、0312、1258、1261、1263 | 只含图标的原生/专用 IconButton；aria-label 是可访问名称，未绘制可见文字 | 原 text 归类误分类；真实 icon Category/property 符合既有规则。背景、状态、弱 Neutral 资格仍未证明 |
| 可无改色纠正登记 role/property | 0928、1031、1071、1128 | 空 `i`/`hr` 是非交互分割线；Border 的 `background-color` 为既有允许属性 | 原 surface 归类误分类；含 Alpha 的实际背景仍需证明 |
| 需要 winning cascade | 0944 | 品牌同时含 logo 与文字；上层平台规则覆盖旧 Icon 规则的源码关系明确 | 不当作 icon-only，也不从 specificity 单独推断实际 paint |
| 需要分部登记 | 0983 | strong/small 有独立 Text paint，容器 Icon 用于图标按钮 | 容器不能冒充全部文字的实际前景；需各部件和 cascade 证据 |
| 真实混合前景用途问题 | 0946 | 隐藏时恢复标签可见，继承 Icon/Neutral/2 | Text/Neutral/3 与其两主题 RGBA 相同，可作为容器文字候选，图标需独立 Icon 声明；未实施 |
| 真实属性资格问题 | 1093、1096 | primary default/hover 将 Fill 用在 border-color | 既有规则分别拒绝 `border` role 和 `fill + border-color`；不借此宣称独立边界可读性不合格 |
| 真实文字/图标 Category 用途问题 | 0031、0074、0077 | tabs/result hover 可见文字、selection check 的有意义视觉信息使用 Fill/Brand/Solid/2 | 可复现现有 validator 拒绝；最小 Category 候选仍需父背景、品牌用途与 Dark 状态证明 |

9 项可补正分类并不表示 9 项完整消费者合同通过。比如 0281、1258 的 Icon/Neutral/4 仍受已有 weak-neutral 条件约束；原重要文字 4.5:1 阈值完整保留。所有 probe 不补写猜测的白色 parent 或品牌用途，输出 `rolePropertyPermitted` 只说明该阶段没被拒绝。

此外 1039、1052 的单边 `border-left-color` 沿用既有 bounded consumer 适配方式映射为 validator 的 `border-color`，原 CSS property 不变，映射事实单列 `propertyMappings`，背景/状态仍 pending。公共 ColorUse API 未增加新属性。这两项不是 Category 家族冲突，也没有被当作通过。

两个 primary border 即便与背景同色、归为 decorative，仍不获 Fill border-color 许可。实际读取现有 Button contract 后，所有 recipe 均无 Fill border，primary default/hover 无 border part，pressed 使用 Border/Brand/1。改透明 1px 边框可能保持几何和默认 border-box 下的填充，但必须对比真实绘制与尺寸后才可采用，本次没有改。

## 为什么没有直接替换三项颜色

现有 registry 的 Light 值：Fill/Brand/Solid/2、Text/Brand/2、Icon/Brand/2 均为 `rgb(21,97,248)`。Dark 时，Fill 为 `rgb(38,107,255)`，Text/Icon 为 `rgb(81,136,255)`。因此最小 Category 替换可保持受验 Light 色值，却会改变 Dark 的实际前景。

| 作者背景模型 | Dark 现有 Fill 比值 | Dark Text/Icon 候选比值 |
|---|---:|---:|
| Background/Neutral/3 | 3.8392835709629316 | 5.237531663589869 |
| Background/Neutral/1 | 3.3774462932906557 | 4.607495533013556 |
| 未随主题变化的 `#edf3ff` 选中背景 | 4.074991932063868 | 2.987103578836599 |

最后一项低于图标 3:1，更低于文字 4.5:1。不能靠四舍五入或 Light 同色推断替换全面改善。数字来自现有 `resolveColor/measureColorContrast`，为源背景与主题模型计算，**不是实际浏览器 winning paint**。三种上下文也分别记录：整页 Light、整页 Dark 模型、Light 页面只让平台 global region inverse 的上下文；最后一种这些外部导航与弹出结果仍使用 Light，并非第三种全局主题。

## 浏览器测量入口

根已核对并实际运行现有服务的根路径；本脚本没有启动服务：

```sh
node scripts/navigation-w7-colors.mjs --browser-url=http://127.0.0.1:5368/ --out=evidence/runtime/navigation-v042/w7/closure-2026-10-06/colors/browser-audit.json
```

实际完成，exit 1，HTTP/页面异常 0。88 个声明观测中，37 低于原阈值、28 达到原阈值、23 pending；观测可能共享同一绘制，不是 37 个独特 UI 缺陷，也不能关闭完整颜色用途。入口、首页及 13 个直接引用资源与原接受构建的 SHA 绑定见 [预览来源](../preview-provenance.json)，完整原始结果见 [测量 JSON](browser-audit.json)与[日志](browser-audit.log)。

浏览器结果的 `runtimeEvidenceInput` 单列实际输入 URL、当时工作源 18 文件 SHA 与各自原 baseline SHA；不将这些工作源哈希称为浏览器实际 served source。接受后的 5368 baseline 与当前源审计 scope 需根的 provenance 记录分别绑定。此六场景消费页测量不覆盖 R2 account-hover successor，successor 单独保留 pending。

测量只覆盖 E1–E6 在 1343×747 的默认/当前选中状态，读取实际前景和透明祖先背景，必须到达实际不透明终点。Alpha 逐层混合后复用现有 Foundations 对比度计算。遇到组透明度、filter/blend、背景图/渐变、inset shadow、生成覆盖层、SVG union 背景、无法直接证明的可见位置或系统色时，保留 pending；不默认白底。

结果保留原阈值、实际低对比、HTTP/页面异常和未证明项。匹配 selector 只能观测某个当前元素，不能证明声明赢得 cascade；可能多个原声明观测同一个实际 paint，样本数也不是独特缺陷数。这次有界测量不会自动关闭原 810 声明或证明全主题/hover/focus/pressed/disabled/resize/forced-colors 矩阵。浏览器入口执行完成后仍以 exit 1 保留自动一致性未闭合的状态。
