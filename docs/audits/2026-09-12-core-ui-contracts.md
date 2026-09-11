# 既有基础组件使用合同索引

核对日期：2026-09-12。范围：Badge、Surface、Card、Link 的当前源码与已有证据。本文件供源码审核和现有原型使用；不是新增 Manifest / Registry，不改变资产身份、成熟度、人工验收或发布状态。本索引只整理说明，没有修改组件；本批实际测试与复核结果见[收口执行记录](../plans/2026-09-12-existing-assets-closure.md#本批执行记录)。

## 共同入口与边界

四者均由 [UI 公共入口](../../packages/ui/src/index.ts) 导出；[UI 包](../../packages/ui/package.json) 为 `private: true`，入口直接指向本地 TypeScript 源码。当前没有这四者各自的 Manifest / Registry 条目，不能把本索引当作可独立安装的资产清单。

在已有工作区中从 `@rain-next/ui` 消费；应用统一加载样式，完整接入顺序见 [Playground 入口](../../apps/playground/src/main.tsx)：

```tsx
import { Badge, Surface, Card, CardHeader, CardTitle, CardContent, Link } from "@rain-next/ui";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/motion.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/styles.css";
```

直接运行依赖：四者使用 React；Badge、Link 还调用 Foundations 的 `useDensity`。视觉共同依赖 Foundations 和 [UI 原生样式](../../packages/ui/src/styles.css)。这四份源码没有使用 Base UI、CVA 或 Tailwind Merge；整个 UI 包的依赖清单不等于每个组件的直接依赖。

原生属性与 ref 按各自类型转发；以下“不可作为操作”等是使用约束，不代表源码会拦截调用方传入的所有原生事件。修改仍须遵守 [协作合同](../../AGENTS.md)；现有类型开放 `className` 不等于允许页面绕过 Rain 视觉规则。

## Badge

[实现](../../packages/ui/src/badge/badge.tsx) · [现有测试](../../packages/ui/src/tag/tag-badge.test.tsx) · 演示：`#components`

用途：给宿主补充圆点、数量或极短标记。默认根为静态 `span`，不自动创建按钮、焦点入口或 Tooltip。`tone` 仅选择现有配色，不把 Badge 变成命名系统状态组件。

| 属性 | 当前合同 |
| --- | --- |
| `type` | `dot`（默认） / `count` / `label` |
| `placement` | 默认 `top-end`；dot 支持 top-end / bottom-end / inline-end；count、label 支持 top-end / inline-end / standalone。非法组合回退 top-end |
| `size` | `small` / `medium`（默认）；dot 固定尺寸。源码记录父密度，但不按密度自动切换 size |
| `tone` | `neutral`（默认） / info / success / warning / error / processing |
| `count`、`max`、`showZero` | 默认 0、99、false；count 必须为非负整数，max 为正整数；超过上限显示 `max+`，0 默认隐藏；非法数值隐藏标记 |
| `label` | 默认 NEW；仅 1–4 个大写英文字母或 1–2 个汉字，非法内容隐藏标记 |
| `children` | 非 standalone 时放入宿主区；standalone 不渲染 children |

Parts：`root`、可选 `content`、`indicator`、可选 `indicator-text`；`data-state` 为 visible / hidden / invalid。附着标记带 `aria-hidden`，宿主须自行提供包含数量含义的可访问名称；standalone 标记文字不隐藏。

```tsx
<Badge type="count" count={3} tone="info">
  <Link href="#updates" aria-label="资源更新，3 条更新">资源更新</Link>
</Badge>
<Badge type="label" placement="standalone" label="NEW" />
```

现状与待完善：使用早期 `--rain-color-*` 语义变量与 `--rain-badge-neutral-fill`。dot 为 6px；count/label 为 16/18px 高、9/10px 字号、700 字重，间距也是原生 CSS 固定值。尚未完成面向当前完整 Token Recipe 的独立整理；这些既有数值不是本次新确认的设计规则，尤其小字号和 700 字重需要单独复核。

## Surface

[实现](../../packages/ui/src/surface/surface.tsx) · [现有测试](../../packages/ui/src/surface/surface-card.test.tsx) · 演示：`#components`

用途：表达任务表面层级；不拥有容器宽度、间距编排、滚动或业务状态。唯一 Part 为 `root`。

| 属性 | 当前合同 |
| --- | --- |
| `as` | div（默认） / main / section / article / aside；语义标签由使用方选择 |
| `variant` | panel（默认） / page / raised |
| 原生属性 | `HTMLAttributes<HTMLElement>` 与 ref，包括 children、className、可访问属性 |

```tsx
<Surface as="section" variant="panel" aria-label="资源概览">资源概览内容</Surface>
```

现状与待完善：page 无边框圆角；panel 使用表面色、1px 边框与 Radius/8；raised 使用另一表面色和较强边框，阴影为 none。仍消费早期表面/边框别名，没有专用尺寸或 Local Recipe API。`raised` 不承诺浮层阴影，也不表示已完成独立视觉验收。

## Card

[实现](../../packages/ui/src/card/card.tsx) · [现有测试](../../packages/ui/src/surface/surface-card.test.tsx) · 演示：`#components`

用途：表达可以独立识别的内容对象。根固定为 `article`，`variant` 为 panel（默认）或 raised；不是通用间距容器或整卡按钮，动作应放在内部独立控件中。

| 导出 / Part | 当前结构 |
| --- | --- |
| Card / root | article；`CardProps` 扩展 `HTMLAttributes<HTMLElement>` |
| CardHeader / header | div；内部采用双列 Grid |
| CardTitle / title | 默认 h3；`as` 支持 h2 / h3 / h4 / h5 / h6 / p |
| CardDescription / description | p |
| CardAction / action | div；放置独立操作或附加信息 |
| CardContent / content | div |
| CardFooter / footer | footer |

所有 Part 均转发相应原生属性、children、className 和 ref；没有 `asChild`、整卡选择或专用 Local Recipe 属性。

```tsx
<Card>
  <CardHeader><CardTitle as="h2">课程资源包</CardTitle></CardHeader>
  <CardContent>24 个文件</CardContent>
</Card>
```

现状与待完善：表面、文字、边框使用早期语义变量，圆角 Radius/8、阴影 none；Header 的 6/18px 间距及 18/20/14px 留白、内容/页脚留白、字号行高仍为原生 CSS 固定值。根有 `overflow: hidden`，带内部操作时需在实际组合中确认焦点不被裁切。尚不能宣称完整迁入新 Token Recipe 或完成全组合视觉验收。

## Link

[实现](../../packages/ui/src/link/link.tsx) · [现有测试](../../packages/ui/src/link/link.test.tsx) · 演示：`#text-button`

用途：真实导航，底层是原生 `a`；执行动作使用 `Button variant="text"`。不另建重复 TextButton 组件。

| 属性 / Part | 当前合同 |
| --- | --- |
| `href`、`children` | 必填 string 与 ReactNode |
| `appearance` | standalone（默认） / inline；standalone 完整单行，inline 继承正文排版并允许换行 |
| 原生属性 | 转发 target、rel、download、aria-*、事件等；类型明确不开放 role / disabled / loading / tone |
| `_blank` | 大小写不敏感；合并去重 noopener / noreferrer，并追加可见“（新标签页打开）” |
| 可访问名称 | 自定义 aria-label / aria-labelledby 时，用稳定提示 ID 合并 aria-describedby；普通可见名称不重复追加描述 |
| Parts | root / label / 按需 new-tab-hint；根为 `data-focus="item"` |

```tsx
<Link href="#help">查看帮助</Link>
<p>详情见 <Link href="#rules" appearance="inline">课程规则</Link>。</p>
```

现状与待完善：使用 `--rain-link-color` 及早期 action hover/pressed 变量；standalone 仍为 26px 高、左右 6px、14/20px 排版，inline 为细下划线。保留共享 Focus、强制颜色与 reduced motion。没有独立 Token Recipe，也没有因 Button 的 Token 迁移而自动完成 Link 迁移。

## 已有证据与尚未完成的登记

| 范围 | 可引用的完成记录 | 不能扩大到的结论 |
| --- | --- | --- |
| Badge / Surface / Card | [Day 3 说明](../../evidence/runtime/day-3/README.md)及[红绿与独立复核记录](../../evidence/runtime/day-3/red-green-summary.md)：最小 API、单元与 Chromium 检查已完成；记录身份为 local-experiment / prototype-ready | Badge、Surface/Card 人工验收仍未完成；后续 Tag 接受不覆盖 Badge。历史截图不证明当前完整主题/密度/状态矩阵 |
| Link | [TextButton 实施与复核](../verification/2026-09-03-text-button-implementation.md)：原生导航、新标签提示、描述关联、窄屏换行等已有证据 | 09-08 接受范围为 text-button-current-token-recipe-visual-only；没有单独 Link Gate，不扩大为完整读屏、真实设备或跨浏览器认证 |

当前授权与验收以 [阶段记录](../../status/current-phase.yaml) 为准。已有测试文件证明覆盖内容可检查，历史通过记录不等于本次重新运行；这四者尚无本轮独立、完整的颜色/对比度验收报告。不得推导为 system-approved、WCAG 通过、已发布或生产采用。

后续若确实要正式登记，最少还需：明确每项资产身份和成熟度；为现有 API 补精确 Manifest 与来源/视觉血缘；登记真实源码、样式与依赖的 Registry 关系；接入现有治理验证；补足声明范围所需的运行和人工验收证据。Token 迁移、视觉调整及颜色处理应另列实际变更范围，不能通过补文档自动完成。
