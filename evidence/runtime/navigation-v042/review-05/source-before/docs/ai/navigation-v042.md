# 导航 v0.4.2 · W0–W2 候选使用指南

本轮是批准 HTML 的组件化首片，状态为 **pending-G1 / unpublished**。这里说明已经存在的 API 和复制边界，不代表 W4 区域协调器、W7 全矩阵、设计验收或生产接入已经完成。

来源为 [approved-v0.4.2.html](../../../../rain-classroom-vibe-ui-spike/docs/rain-navigation-codex-workpack/reference/approved-v0.4.2.html)，版本 `0.4.2-style.1`，SHA-256 `d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c`。本轮实际打开、操作、测量与截图保存在 [reference 证据](../../evidence/runtime/navigation-v042/reference/)。原稿的认可不自动授予 React 候选 G1。

## 按任务选择

| 任务 | 资产 / 入口 | 责任边界 |
|---|---|---|
| 前往页面、路由、工作区功能 | [NavigationBar](../../manifests/ui/navigation-bar.yaml) · `@rain-next/ui` | 原生链接与 `aria-current`；宿主提供 href/路由 |
| 同一对象内切换内容面板 | [NavigationTabs](../../manifests/ui/navigation-tabs.yaml) · `@rain-next/ui` | 复用现有 Tabs 行为；显式选择 A1/A4 外观 |
| 公共资源包与大量教学班范围 | [ScopeNavigation](../../manifests/ui/scope-navigation.yaml) · `@rain-next/ui` | 一个受控 scope value；More 搜索全部数据；编辑数据归应用 |
| 当前页签连接工作面 | [ConnectedSurface](../../manifests/layouts/connected-surface.yaml) · `@rain-next/layouts` | 单 SVG 轮廓、实例测量；不拥有选择/业务状态 |
| 课程工作区 + 编辑树 | [R2Recipe 源码](../../apps/playground/src/recipes/navigation-v042/r2.tsx)及[配方合同](../../manifests/recipes/navigation-r2.yaml) | 可复制的 local-experiment；不是公共 Template 或完整 Workspace controller |

仅改变模式或筛选条件时继续比较 RadioGroup/CheckableTagGroup，不能因为轮廓相似就赋予 Tabs 或链接语义。先按 Template → Block → Pattern → Layout → UI → Primitive 检索；当前只有 R2 语义匹配时才复制它。

## 公共 API 与组合

`NavigationBar` 接收 `items: { id, label, href, count?, icon? }[]`、`activeId`、具名 `aria-label`、可选 `onNavigate(id,event)` 和 `className`。只有未取消、无修饰键的主键点击调用 `onNavigate`；宿主自行决定是否 `preventDefault()`。不要用它实现内容面板选择。

`NavigationTabs` 保留 Tabs 的受控/非受控、manual/automatic、面板挂载和 overflow 协议；仅支持顶部。`visualPreset="navigation-line"` 是默认，`navigation-browser` 用于 A4。`description?: string` 是单独身份说明，不绕过纯文本 `label`。导航 count 显示原值，旧 Tabs 的括号格式保持不变。默认键盘激活仍为 manual。`.Root/.Nav/.Panels` 可组合，`renderSurface({track,panels})` 可从上层注入 Layout。

```tsx
import { useState } from "react";
import { ScopeNavigation, type ScopeNavigationItem } from "@rain-next/ui";
import { ConnectedSurface } from "@rain-next/layouts";

export function CourseScope({ items }: { items: ScopeNavigationItem[] }) {
  const [scope, setScope] = useState<string | null>(items[0]?.id ?? null);
  const [draft, setDraft] = useState("");
  return <ScopeNavigation items={items} value={scope} onValueChange={setScope}
    visibleLimit={4} aria-label="课程内容范围"
    renderSurface={({ track, panels }) =>
      <ConnectedSurface instanceId="course-editor-scope" activeKey={scope}
        connection="inset" track={track}>{panels}</ConnectedSurface>}>
    <textarea aria-label="课程编辑草稿" value={draft}
      onChange={event => setDraft(event.target.value)} />
  </ScopeNavigation>;
}
```

同页多个实例使用不同 `instanceId` 和各自 `value`。上例展示最小状态归属；真实服务仍需应用按业务对象保存草稿、取消过期请求并处理权限。沿用应用已有 Foundations、Focus、Tailwind 和 `@rain-next/ui/styles.css` 样式入口，不只复制单个 TSX 文件。

Scope 的第一项是公共资源包；可见上限为 3/4/5，默认 4，空间不足会减少槽位。公共项保持首位，当前溢出项占最后槽，其余常用项不按点击顺序任意重排。More 是带隐藏班级数的独立下拉入口，不是 scope 值；通过既有非模态Popover定位，搜索全部范围，数量排除公共资源包及已展示班级。删除当前项会显示失效提示，不自动选择另一个班级。`loading/error` 由宿主传入，组件不请求服务。有效 scope 变化通过 `Tabs.Panels sharedContent` 保持同一编辑器实例；跨场景持久化仍归应用。

ConnectedSurface 的可选配置：

| 属性 | 已实现范围 |
|---|---|
| `connection` | `inset` 默认 / `merged` |
| `surfaceMode` | `tonal` 默认 / `plain` / `outlined` |
| `geometry.panelRadius` | 0 / 6 / 8 / 10 / 12，默认 10 |
| `geometry.tabRadius` | 0 / 4 / 6 / 8 / 10 / 12，默认 10 |
| `geometry.shoulder` | 4 / 6 / 8，默认 8 |
| `geometry.trackInset` | 0 / 8 / 16 / 20 / 24 / 28 / 32，默认 24 |

这些数值引用现有 Rain 几何键的批准子集；0 是平角构造。inset 自动解析 `max(trackInset, panelRadius + shoulder + 2)`，2px guard 只是本构造约束。当前只有 browser 主轮廓，没有 `contour` 公共参数。原生 track 可用 `data-connected-viewport` 与 `data-connected-active="true"` 标记，内置适配 Tabs 的 viewport/ARIA。SVG 是装饰层；真实 trigger 负责键盘与 focus，内容区负责滚动。

## 复制 R2 与状态归属

复制 [r2.tsx](../../apps/playground/src/recipes/navigation-v042/r2.tsx)、[r2.css](../../apps/playground/src/recipes/navigation-v042/r2.css) 及其 [CSS 类型声明](../../apps/playground/src/recipes/navigation-v042/r2.css.d.ts)，保留真实公共 imports。`R2Recipe` 支持 `editor?: ReactNode`、`instanceId?`、`visibleLimit?`、`connection?`；不提供生产查询、发布、同步或完整区域状态机。建立独立消费入口时同时带上 [consumer.css](../../apps/playground/src/recipes/navigation-v042/consumer.css) 和[类型声明](../../apps/playground/src/recipes/navigation-v042/consumer.css.d.ts)，按目标目录调整其中的 `@source` 扫描路径；此文件使用仓库已经安装的 Tailwind 与 Foundations 主题生成公共组件所需样式，不新增依赖。

| 状态/边界 | owner |
|---|---|
| 当前 scope、过滤、树选择/展开、编辑名称 | R2 本地应用；接入业务后由宿主管理 |
| 注入 editor 内部状态 | 编辑器/应用；不要用布局状态重建编辑器 |
| More 下拉打开、搜索、可见槽与隐藏数推导 | ScopeNavigation |
| 单个轮廓、接缝、安全内衬和测量 | ConnectedSurface |
| 内容滚动 | R2 有限高度工作面中的 editor scrollport |
| 隐藏后的恢复按钮 | R2 头部 + 既有 Split focus ref；W4 完整协调器尚未交付 |

复制时记录 `sourceAssetId=recipe-navigation-r2`、`sourceVersion=local-2026-09-28-navigation-v042-g1-review-02`、实际复制时的 source SHA-256、`parentRecipe=navigation-approved-v0.4.2/R2`、新的 `instanceId`、`modifiedParts`、原因、`contractVersion=1.0`、`visualBaselineId`、检查及 `reviewState`。本轮代码仍在 G1 前修订，不能把某次中间源码哈希当成永不变化的发布版本。

## 局部视觉映射

以 [实际 computed 捕获](../../evidence/runtime/navigation-v042/reference/2026-09-27T19-36-55-642Z/) 为原稿依据，当前实现分别在 [navigation.css](../../packages/ui/src/navigation/navigation.css)、[ConnectedSurface CSS](../../packages/layouts/src/connected-surface.css) 和 [R2 CSS](../../apps/playground/src/recipes/navigation-v042/r2.css)。以下都只属于本轮候选，不改全局 Token。

| 原稿部件/当前值 | 当前映射 | 范围/状态 |
|---|---|---|
| 品牌线 `#1561f8` | 既有 `--rain-category-fill-brand-solid-2` / 品牌主蓝 | 现有 Token；不是新配色 |
| surface `#fff`、track `#eef1f7`、outline `#dce2eb` | `--rain-local-navigation-surface/track/outline` | navigation-only，pending-G1 |
| A1 idle/current `#525b6a/#202631` | `--rain-local-navigation-text/current` | navigation-only，pending-G1 |
| A1 count/current `#667080/#596477` | `--rain-local-navigation-count/count-current` | navigation-only，pending-G1 |
| A4 idle/current/description `#596271/#203350/#626d7d` | `--rain-local-navigation-browser-text/browser-current/description` | navigation-only，pending-G1 |
| outlined current `#1957b9`、separator `#bac6d8` | `--rain-local-navigation-outlined-current/separator` | W3 同轮廓适配，非 W1/W2 完成声明 |
| focus `#1558dd`、hover `#283d5c` / 既有 `fill-neutral-alpha-6` | `--rain-local-navigation-focus/hover/hover-fill` | 候选值；未授予对比度豁免 |
| 原稿 system 字体栈，14/20 标签、12/18 说明 | `--rain-local-navigation-font`；R2 的 `--rain-local-r2-font` | 仅保真候选例外；不改全局 PingFang，不分发字体 |
| A1 40px 高、24px 项距、4px label-count、名称线当前 24×3px（原稿 24×2px） | 显式 navigation-line CSS | 不能影响普通 Tabs |
| A4 双行 224×64、10/16 内边距、10px 图文间距；R2 item 实测 242×64 | browser 内容规格；Scope 按空间分配 170–255px | 不是全库固定 item 宽 |
| track 顶部8px、水平内缩24px或贴边0；gap当前8（原稿2）、圆角10、shoulder8 | ConnectedSurface 几何属性与 `--rain-local-cs-*`；间距复用 `--rain-space-8` | single boundary owner；review-04用户确认 |
| A4/Connections样本 Dialog 宽500、圆角13、头22/24、正文20/24 | 本实例 Dialog 局部 CSS；Scope More已由review-03改为下拉 | 精确候选例外，非全局 Dialog 默认 |
| R2 冷浅色 shell/rail、编辑树类型标签与通知底 | `--rain-local-r2-*`，现有局部 type CSS | 保真配方值；不得升级为全站默认 |
| R2 容器宽度 ≤1250px：context 内边距8、页头23/22/22、内容0/22/22 | 局部 `@container navigation-r2`；Scope预算使用原稿188/186 | 仅当前配方响应式规则；不是全局断点 |
| R2 筛选按钮30×30、边框 `#d5dae2`、图标 `#414958`、圆角6、内边距5 | 本配方筛选按钮局部 CSS | 原稿实测值；不更改 IconButton 默认 |

图标继续用现有 Rain 单图标入口 `@rain-next/ui/icons/<slug>`，保持宿主控制颜色。More/关闭/选中映射 `arrow-down/close/check-bold`；课程/资源/班级映射 `course/folder/members`；平台入口映射 `home/course/folder/graduation-cap`，数据面板使用线性柱形 `ranking`；恢复/收起映射 `expand/collapse`，学期菜单开合使用 `arrow-down/arrow-up`。Logo 使用 `rain-classroom` 现有资产。专业与数据面板的选择来自用户 G1 第一轮批注，只属于此配方，不定义全库唯一语义；没有引入外部图标或重画标志。

### G1 review-01：R2 用户批注覆盖

2026-09-28 的 23 条批注明确覆盖上表中 R2 对应值，原 HTML 与 A1/A4 公共样本保留。完整逐项记录及原稿/前后截图见 [review-01](../../evidence/runtime/navigation-v042/review-01/README.md)。

- R2 画布与直属 Scope 轨道用 `background-neutral-3`；导航 hover 用 `fill-neutral-alpha-6`（6%）；平台选中用更深的 `text-brand-1` + 600 字重。非重要说明用 `text-neutral-6`；学期文字和箭头用 `text-neutral-5`。
- 平台导航文字/图标 15px，展开/收起 IconButton 使用既有 `28/16` 规格。展开时 Logo 居左、按钮居右；底部账户信息与工具并排，收起后保留图标竖排和有名称的账户按钮。
- Scope 标题 15/22、页标题 17/24、统计与历史入口 14/20；说明与标题间距 2px，返回图文间距 4px，主区顶部 8px。适用于所有 R2 宽度；沿用 ≤1250px 的原有容器布局和导航/history gap8 同步规则，不为批注视口添加断点。
- 路径使用现有 `Breadcrumb` 的 13px 规格及 `aria-current`，不再手写分隔样式。示例没有真实父页地址，父级保持静态；当前页由 scope 决定。学期入口复用 `DropdownMenu` 的键盘/Escape/焦点恢复，当前仅有一个 mock 学期，不暗示已接入跨学期业务。
- 样式定位在当前 R2 直属 Scope 导航，遇到嵌套 `.rain-tabs` 即止；普通编辑器 Tabs 的尺寸、指示线和草稿继续由原合同管理。

当前复核：7 项浏览器检查、Playground typecheck/build 通过。Human Gate 仍 pending-G1；本轮没有授予全局弱文字策略、对比度验收或发布资格。

### G1 review-02：A1 / A4 / Hover

用户第二轮四条批注覆盖对应原稿细节，记录与前后截图见 [review-02](../../evidence/runtime/navigation-v042/review-02/README.md)。

- A1 名称线引用既有 `--rain-line-thickness-3`，仍宽24px；底部改为0，避免水平滚动容器裁去1px。仅作用于导航候选，普通Tabs不变。
- A4 样本内容标题16/24，说明用 `text-neutral-6`、标题下间距2px。这些内容层级数值在 `samples.css`，不进入公共Tabs默认值。
- 公共导航browser hover、More和弹窗关闭使用既有 `fill-neutral-alpha-6`。R2配方和样本按钮分别补齐其覆盖的hover；主按钮用更深 `fill-brand-solid-1`，搜索/编辑输入采用已有品牌边框Token。禁用按钮不展示可点击反馈，焦点仍可见，已选面板保持连体表面。
- 所有修订跨现有画板宽度生效，不为1055px批注视口新增断点；评审壳继续原尺寸横向滚动。静态内容行保持只读。

8项导航浏览器检查与Playground类型检查/构建通过；G1仍待人工复核，不升级全局视觉规范。

### G1 review-03：更多班级下拉

2026-09-29 用户四点要求覆盖原稿对应More形态，见 [review-03](../../evidence/runtime/navigation-v042/review-03/README.md)。入口无独立描边白底，沿用64px页签高度、15px文字，显示当前页签之外的班级数；公共资源包不计数，全部可见时隐藏入口。200班示例在1440画板显示197，在1200画板显示198；更换当前班级不改变隐藏总数。

既有Popover承接非模态锚点定位、外点/Escape关闭及焦点恢复；因包含搜索字段，使用正常Tab/Shift+Tab和按钮Enter，不强制menu角色或为普通输入叠加菜单typeahead。下拉宽360、默认下方右对齐间隔6px，空间不足沿用现有浮层避碰。最浅 `--rain-overlay-separation`（亮色6%）叠在 `background-neutral-1` 上形成浅底，页面无整屏遮罩。搜索保留全部范围与无结果状态，选择后焦点回到当前页签，草稿保持。

8项导航单元检查、9项浏览器检查、Playground类型检查和构建通过。仅当前Scope候选更新；普通Tabs及A4/Connections的独立参考Dialog保留，未新增全局Token。G1继续待评审。

### G1 review-04：内容固定，悬停分离，选中连接

2026-09-30 用户确认规则并授权修改，证据见 [review-04](../../evidence/runtime/navigation-v042/review-04/README.md)。A4、Connections、R2共同消费导航组件修订，普通Tabs不受影响。

- browser页签横向间距8px，More与末项也为8px。inset/merged均保留8px轨道顶部留白、相同页签高度与内边距；模式仅改变水平内缩与边缘连接。
- 未选中hover背景底部上收8px并保留四角；内容和点击区域不缩小、不移动。选中加粗沿用已有宽度预留，标题、说明、图标、计数位置不因状态改变。不要使用hover padding/margin/transform或不同状态高度来做留白。
- 选中项只由ConnectedSurface的单一SVG轮廓连接工作面。merged以可见当前项是否实际碰到左右边缘决定对应角归属；内侧页签保持两个工作面上角，位于More前的最后页签仍是内侧项。hover不改变工作面圆角；底部圆角始终保留。
- Scope沿用170–255px项宽和188/186可见槽预算；轨道在达到最大项宽时停止撑满，More紧随末项。没有新增视口断点；已有窄容器滚动和缩减可见槽规则继续生效。More展开只显示hover式背景，始终与工作面分离。

31项导航/Tabs/几何单元检查、10项导航浏览器检查及Playground类型检查/构建通过。浏览器实测三样本×两模式：横向间距8px，hover留白8px，内容相对坐标差0；普通编辑器Tabs与草稿、短窗口菜单和键盘焦点回归通过。规则已确认，渲染结果仍为pending-G1，不表示全浏览器、对比度或读屏验收。

## 改造边界与验证

可直接修改：文案、合法计数、已有 Rain 图标、editor 内容、受控值、已列连接/几何参数以及本实例有限布局。新增 Part/Variant、纵向或底部连体、更换恢复 owner、跨区联动须先做 local-experiment 并另行评审。禁止改全局 Token 修一页、重设旧 Tabs 默认、复制全局 DOM patch 链、隐藏 focus、让样式切换保存/发布业务。

本轮受限检查于 2026-09-28 实跑：

```sh
pnpm exec vitest run packages/ui/src/navigation/navigation.test.tsx packages/ui/src/tabs/tabs.test.tsx packages/ui/src/tabs/tabs-overflow.test.ts packages/layouts/src/connected-surface.test.tsx packages/layouts/src/layout.test.tsx
```

结果：5 文件、34 测试通过。范围是共享单元合同及既有 Tabs/Layout 回归；ConnectedSurface 的几何矩阵、双实例、缩放换算、隐藏恢复和清理含在其中。此结果不代表 W7 全浏览器/缩放/密度矩阵、真实读屏、对比度或 G1 通过。R2 的整页截图和交互结果以主线程本批证据为准。

入口为 Playground `#navigation-v042`，当前有 A1、A4、Connections 与 R2。另有[无评审壳的本地消费入口](http://127.0.0.1:5198/navigation-v042-consumer.html)，源码为 [consumer.tsx](../../apps/playground/src/recipes/navigation-v042/consumer.tsx)、[consumer.css](../../apps/playground/src/recipes/navigation-v042/consumer.css) 和 [HTML 入口](../../apps/playground/navigation-v042-consumer.html)，直接消费 R2、公共组件及普通 Tabs 编辑器插槽。这是同一工作区的独立运行入口，尚不是 W7 全量导出或离线交付。

本地源码 Registry 是 [navigation-v042.json](../../registry/navigation-v042.json)，`publication=not-published`；仅描述当前工作区依赖，没有在线安装或发布动作。Manifest 的 `sourceSha256/styleSourceSha256` 与 Registry 的 `sourceSnapshot.filesSha256` 记录本次文档沉淀时的实际源码，后续修改必须刷新，不能拿中间快照冒充冻结发布。Figma 组件映射和 Code Connect 尚未建立。

本轮五项源码/导出/依赖可单独通过既有 `validateAsset` 校验。完整 `asset-index.mjs --write` 因既有 `ui-command` 缺少 Registry 登记而退出；因此保留原生成索引，通过 [AI 主入口](README.md) 增量发现本指南，不拼接绕过完整索引门槛。
