# Progress

G4 的通用线性进度条，当前为 `registry-candidate / unpublished`。用于上传、导入、任务处理等有完成比例的过程；短暂等待可以使用 Spinner，比较多组数据可以使用 Chart。业务暂停、失败、重试由页面文案和 Button 表达。

## 基本使用

```tsx
import { Progress, ProgressLabel, ProgressValue } from "@rain-next/ui";
import "@rain-next/ui/styles.css";

<Progress value={42} locale="zh-CN">
  <ProgressLabel>课件上传</ProgressLabel>
  <ProgressValue />
</Progress>
```

`Progress` 保留上游结构，自动在 `children` 后追加一组 `ProgressTrack` / `ProgressIndicator`。页面只需组合标签、读数或辅助内容；不要再放一组 Track / Indicator，否则会有两条进度轨道。各 Part 保留公开出口供显式源码改造及自定义 `render` 使用。

```tsx
// 已处理 8 / 20 份，默认读数和填充比例均为 40%。
<Progress value={8} max={20} aria-label="课件导入" locale="zh-CN">
  <ProgressValue />
</Progress>

// 比例未知时不提供假数值；状态文字由消费者提供。
<Progress value={null} aria-valuetext="进度暂不可计算">
  <ProgressLabel>课件处理</ProgressLabel>
  <span>进度暂不可计算</span>
</Progress>
```

## API、状态与密度

公开 `Progress`、`ProgressLabel`、`ProgressValue`、`ProgressTrack`、`ProgressIndicator`，以及对应 `*Props` 类型。Props 直接沿用已安装的 `@base-ui/react/progress`，不添加业务状态或计时器。

| 能力 | 行为 |
| --- | --- |
| `value: number \| null` | 必传；0 保留为已知进度；`null`、`NaN`、`Infinity`、`-Infinity` 为未知进度 |
| `min / max` | 默认 0 / 100；必须有限且 `min < max`，否则渲染前抛出 `RangeError` |
| 有限数值越界 | Base UI 将 `aria-valuenow` 和显示读数限制在范围内；达到或超过 max 为完成 |
| 非 0–100 范围 | Base UI 统一计算相对 min / max 的百分比，Indicator 与默认 Value 使用同一比例 |
| `format / locale` | 使用 Base UI 的数字格式；设置 `format` 后，Value 格式化范围内的实际值，Indicator 仍呈现归一化比例 |
| `getAriaValueText` | 保留 `(formattedValue, rawValue)` 回调；可提供“已处理 8 份，共 20 份”等说明 |
| `ProgressValue.children` | 保留 `(formattedValue, rawValue)` 回调；未知时首参为上游 `"indeterminate"`，原始非有限值仍会透传，默认 Value 留空 |
| `className / style / render / ref` | 保留上游字符串、状态回调和元素替换语义；`className` 通过 `rainCn` 合并 |
| `DensityProvider` | default 高度使用 `--rain-space-8`，compact 使用 `--rain-space-6`；无独立 size 轴 |

未知状态呈现居中短指示块，不自动前进；它不代表 30% 完成。消费者必须提供“进度暂不可计算”等清楚文案。不要用随机数、计时增长、0 或 100 代替未知比例。自定义 Value / ARIA 回调处理未知分支时，应先识别 `indeterminate` / 非有限值，避免生成 NaN 百分比。

## Anatomy 与修改边界

| Part | 稳定属性 | 职责 |
| --- | --- | --- |
| Root | `data-rain-id="ui-progress"`、`data-slot="root"` | 标签与读数布局、进度条 ARIA、Density |
| Label | `data-slot="progress-label"` | 自动与根节点关联的可见名称 |
| Value | `data-slot="progress-value"` | Base UI 格式化读数；`aria-hidden` 避免重复朗读 |
| Track | `data-slot="progress-track"` | 中性轨道、full 圆角、按上下文切换高度 |
| Indicator | `data-slot="progress-indicator"` | 品牌填充、由 Base UI 控制的宽度 |

根节点 `data-state` 使用 `progressing / complete / indeterminate`，并保留 Base UI 的 `data-progressing / data-complete / data-indeterminate`。结构、排版与静态颜色使用已登记的 Rain Tailwind utility，颜色集中在导出的 `progressPaints`；共享字体、间距、圆角与动效均复用已有公开 Rain Token。CSS 仅保留已标注 `@rain-css-exception ui-progress` 的 Parts 密度联动、未知形态、宽度过渡和可访问性规则；宽度属于上游根据真实数值计算的几何值。

`className` 用于布局。局部视觉改造按 Existing Variant → Local Recipe → Local Fork 处理并登记作用域；不得覆盖 Indicator 数值宽度、进度语义或以色彩代替状态说明。普通百分比沿用 UI 字体，不自动使用关键数据字体。

## Accessibility 与验证边界

必须使用 `ProgressLabel`、`aria-label` 或 `aria-labelledby` 提供有意义的名称；组件不写固定隐式名称。未知状态没有 `aria-valuenow`，默认 Value 没有百分比；可用 `aria-valuetext` 提供中文状态说明。Progress 本身不加入 Tab 顺序；相关暂停、取消、重试操作使用独立 Button。

已知进度的宽度过渡复用 feedback Motion Token，`prefers-reduced-motion` 关闭过渡；未知指示块保持静止。forced-colors 使用 Canvas / CanvasText / Highlight，确保轨道与指示仍可区分。

行为测试覆盖名称关联、0、完成、越界、非 100 范围、未知和非有限值、非法 min / max、密度、ref、render、handler、className / style / Value / ARIA 回调。测试记录见 `evidence/runtime/g4-components-2026-10-11/progress-red.log` 与 `progress-unit.log`。真实浏览器视觉、字体、对比度、Safari / VoiceOver 和 Human Gate 的状态以本批总验证记录为准；单元测试通过不等于发布或系统批准。

## 来源与本地差异

- 直接适配 `shadcn-ui/ui@3ba91b1cc83e1bbe4ab35a422ff2a694849c5048` 的 Base UI Progress（MIT），未调用安装 CLI。
- 原始源码、示例、许可证和 checksum：`evidence/runtime/g4-components-2026-10-11/source-lock.json` 及其 `upstream/`。
- 行为底座：已安装 `@base-ui/react@1.8.0`（MIT）；保留自动 Track / Indicator、Label 关联、Root 数值限制、Indicator 比例和 Value 格式化。
- Rain 修改：`cn` 改为 `rainCn`，保留函数形式 `className`；增加公开 Props 类型、稳定追踪属性、Density 和有限范围校验。标准结构、排版与 `progressPaints` 使用静态 Rain utility，CSS 只承接密度联动及必要复杂规则。原 `data-slot="progress"` 根槽改为 Rain `root`，子槽名称保留上游。
- 未继承上游 Nova 默认视觉值；未新增依赖、Token、业务状态或进度计算引擎。
