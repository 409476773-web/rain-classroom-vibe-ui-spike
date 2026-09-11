# Rain Next Tabs Implementation Plan

> 历史首版结果：2026-09-11 用户进一步确认并授权了[视觉与布局修订](2026-09-11-tabs-visual-refinement-implementation.md)。本页 TB-00～TB-09 及 108 条旧浅边记录保留为历史事实；新修订的实现、自动检查和独立审阅已重新登记，证据写入 `evidence/runtime/tabs-visual-refinement/`。

> **For Codex:** 执行时使用 `executing-plans`，关键行为采用现有测试体系先复现再实现，收尾使用 `verification-before-completion`。用户已在计划交付后明确“开始实施”；按 TB-00～TB-09 执行。继续禁止 Git、Figma、发布和业务迁移。

**Goal:** 建设一个默认即可完整使用的 Rain Next Tabs：三种外观共同覆盖 28 / 32 / 38px 与四向，具备可靠的 More、键盘操作、首次创建后保留的面板和可追溯的 Rain Token 合同。

**Architecture:** 一份稳定的 items 模型同时拥有 Tab、More 和 Panel 的身份；完整 `Tabs` 与开放组合共用模型、配方和行为。优先验证已安装 Base UI Tabs 与现有 DropdownMenu；仅在技术预验证通过后锁定适配方式。尺寸、外观、颜色使用组件专属合同接入现有 Foundations 单源生成链，不建立第二套主题、键盘或弹层框架。

**Tech Stack:** 当前 React 19、TypeScript、Tailwind CSS v4、CVA、rainCn、Base UI 1.8.0、Vitest / Testing Library、Playwright Chromium；不计划增加依赖。

---

日期：2026-09-10；执行更新：2026-09-11。模式：**System Mode / 实施**。文档状态：**TB-00～TB-09 技术实现与验证完成，等待运行视觉 Human Gate**。

当前执行状态：TB-00～TB-09 的公共实现、正式页面、候选登记、专项证据和独立审阅已完成。最终 `VITEST_MAX_WORKERS=2 pnpm verify` 退出 0，85 文件 / 1256 项单元测试及 211 项 Chromium 测试通过；其中 Tabs 32 项浏览器检查包含 72 组 / 864 态矩阵。独立审阅所发现的缩放、水平指示线、主题、CSS 守卫和实际绘制路由问题已修复并复核关闭。最终结果见[运行证据](../../evidence/runtime/tabs/verification.md)和[独立审阅](../../evidence/runtime/tabs/independent-review.md)。资产保持 `registry-candidate`；运行视觉 Human Gate `not-evaluated`，真实辅助技术未运行，108 条 Soft 辅助浅边记录保留；这些状态不互相推导。

本计划所有相对路径均相对于：

```text
/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike
```

## 1. 已确认范围与计划边界

### 1.1 用户已确认的开发输入

| 合同 | 已确认内容 |
| --- | --- |
| 语义 | 同一界面内的关联内容分区；保留文字，图标与数量按需提供 |
| 外观 | A `line`、B `contained`、C `soft`；共用行为和尺寸体系 |
| 尺寸 | **28 / 32 / 38px 三档，三种外观全部覆盖**；不按场景删减档位 |
| 四向 | **三种外观均支持上、下、左、右**；横向 More / Scroll，纵向 Scroll |
| 默认键盘激活 | manual：方向键定位，Enter / Space 激活；auto 可选，点击直接激活 |
| 面板生命周期 | 首次真实激活后创建，之后在当前 Root 生命周期内保留 |
| More | 横向默认；选中新项后显示原序中包含它的连续区间，其余按原序进入菜单 |
| 纵向对齐 | 项内默认居中，可选物理左 / 右对齐 |
| 内容状态 | 数量 0 显示，未知不显示；Count 保持 400；禁用内容同步弱化；长名称有鼠标与键盘全文入口 |
| 稳定性 | 数量更新、容器重测、同 key 条目对象重建不改选择、不清空已访问内容、不主动抢焦点 |
| 几何状态 | 水平各 8px 内边距、内容间距 2px；A/C 项间距 8px，B 2px；B 外圆角 6 / 内圆角 4 / 内缩 2px；C 圆角 6 / 预留描边 1px |
| 复合状态 | Hover / Pressed 不冒充 Selected；Focus 独立；Selected + Disabled 保留当前项标记 |
| C 的颜色方向 | **保留当前浅灰视觉，单独解决用色规则**；不自动换成略深灰，不降低对比度门槛 |

确认原文、先后关系及来源见[设计草案](2026-09-10-tabs-design.md)和[来源审阅](../audits/2026-09-10-tabs-reference-review.md)。“开始写计划”及三项选择属于文档阶段；用户随后明确“开始实施”，才启动本次源码与验证工作。

### 1.2 本计划提出的工程默认

以下是本计划的明确方案，不能反写为更早已确认的事实；评审计划时一并确认，TB-00 冻结：

- 默认 `appearance="line"`、`position="top"`；横向 `align="start"`、按内容宽度排列，不均分。
- `size` 显式优先；缺省时 compact → 32，default → 38；28 由场景显式选择。
- 28 档图标 14px、Line 指示线 2px；32 / 38 图标 14 / 16px、线厚 2 / 3px。
- Line `indicatorSize="stretch"`、`showDivider=false`；水平 content 指示线最多 104px。水平 stretch 扣除左右 8px 内边距，纵向 stretch 覆盖项高度。
- 导航与面板间隔 16px，由 Root 组合规则拥有一处；Panel 自身不额外叠加同一间隔，不强加卡片、背景或固定高度。
- 纵向导航默认宽度 120px，项内左右各 24px，项高仍按三档；必要的更宽导航走具名 Local Recipe。
- 前后操作随方向变为左/右或上/下，不因 Bottom / End 反转。较高操作可以撑高 Nav，但不能缩放 Tab；Line 对齐靠 Panel 的边缘。
- 长名称单行省略 Label，Icon / Count 不压扁；可聚焦项用 Tabs 私有 Tooltip。禁用项另由组件提供原生“分区说明”展开入口，More 行可以换行完整呈现名称，见第 5.5 节。
- 单一有限 number / string 值身份；无选择用 null。公开 API 和异常规则见第 4 节。
- 首版不新增 Panel 过渡动画；有动效时复用既有 Motion 并尊重 Reduced Motion，不用动画掩盖测量跳动。

### 1.3 不属于本次开发目标

用户主动新增、关闭、拖拽或编辑工作区标签；路由与网络请求框架；缓存、自动保存、离开提醒；通用 Tooltip 家族；新布局框架；虚拟化标签；修改 Classic；现有组件批量迁移；Figma、包/Registry 发布、业务接入与 Git 操作。

本计划会完成 Tabs 在本工作区的候选 Manifest / 源码 Registry 登记。登记不等于发布或 System Approved。

## 2. 当前仓库事实与复用落点

| 已核对来源 | 对实施的约束 |
| --- | --- |
| [AGENTS](../../AGENTS.md)、[Brief](../../SPIKE_BRIEF.md)、[当前阶段](../../status/current-phase.yaml) | 当前总阶段仍为 Token Foundations V1；Tabs 需独立细化范围。其他组件授权不能放行 Tabs，不推进总阶段或冻结历史 |
| [Size / Density ADR](../adr/0003-size-and-density-responsibilities.md) | 完整配方、显式 Size 优先、不二次缩放；不从 Input / Button 推出通用高度 |
| [B2 ADR](../adr/0002-tailwind-b2-local-fork.md) | Rain Token 决定视觉，Tailwind 组合；Master managed，局部变化走 Existing Variant → Local Recipe → Local Fork |
| [Headless ADR 0005](../adr/0005-headless-base.md) | 已有结论针对 Dropdown / Popover / Select / Dialog，尚未决定 Tabs；不得声称 Tabs 已通过该实验 |
| `packages/ui/package.json` | Base UI 1.8.0 已安装，根入口已存在；不需要新增依赖、锁文件变更或单组件 package 子路径 |
| `packages/ui/src/dropdown-menu/dropdown-menu.tsx` | More 复用非模态菜单、RadioGroup / RadioItem、Portal、关闭与 finalFocus；不另写弹层控制器 |
| `packages/ui/src/_internal/popup.tsx` | 复用主题、Density、锚点与表面能力；不增加通用 Popup 包装层 |
| `packages/ui/src/recipes/local-recipe.ts`、`utils/rain-class-names.ts` | 复用具名 Parts 修改与 rainCn；不另建 class 合并器或通用状态 hook |
| `packages/foundations/src/focus.css` | 全局双层 Focus：1px 轮廓、3px Alpha 外环；不复写全局值 |
| [来源审阅](../audits/2026-09-10-tabs-reference-review.md) | Classic 的视觉来源及其 ID 冲突、溢出漏算、面板生命周期等缺口不得照搬 |
| [Evidence 索引](../../evidence/visual-evidence.yaml)、[Benchmark 索引](../../benchmarks/benchmark-registry.yaml) | BM-A/B/C/D 保持其现有状态；Tabs 的课程/局部面板/设置示例不是这些 Benchmark 的实现或验收 |

当前工作区有大量既有未跟踪文件，没有可用提交基线。实施时保存本批精确文件的基线、hash 与修改归属；不以初始化提交或创建 worktree 作为启动条件。共享文件更新前重新读取，不覆盖并行任务内容。

### 2.1 已发现的底层适配风险

这些是安装源码的只读发现，**尚未进行本任务运行验证**：

1. Base Tabs.List 默认 `activateOnFocus=false`、`loopFocus=true`，符合 manual 默认方向。
2. Tabs.Tab 默认允许 disabled 项被聚焦，内部 useButton 还会删除 composite disabled button 的原生 disabled。不能假定加一个 `<button disabled>` 就能满足 Rain 的禁用跳过。
3. 卸载 More 中的 Tab 会影响条目注册和非受控回退；保留实例但 `hidden/display:none` 又会被 Composite 跳过，需验证完整原序上的边界显露与聚焦。
4. `Panel.keepMounted` 本身会保留所有子内容，不等于首次访问再创建。候选为始终保留有真实 ID 的 Panel 外壳，内部内容按访问状态管理。
5. More 的实际接口是 `onValueChange` 和 `Content.finalFocus`；不要假设有 `onSelect` 或 `Content.initialFocus`。

上述发现决定了 TB-01 必须先于正式 UI 实现。不得修改 node_modules、导入 Base UI internal，或因为某条适配失败而悄悄削减已确认的默认 More、禁用跳过和四向范围。

## 3. 完整配方与支持矩阵

### 3.1 尺寸单一来源

新增 Tabs 专属高度身份与配方，不借用 Input / Select 的高度 Token。所有字号、行高、间距、圆角与线厚均复用已存在的基础值。

| size | Label 字号 / 行高 | Icon | Count 字号 / 行高 | Label 普通 / 选中 | Line 厚度 | B 内部绘制高度 |
| --- | --- | --- | --- | --- | --- | --- |
| 28 | 13 / 18px | 14px（本计划补齐） | 12 / 14px | 400 / 600 | 2px（本计划补齐） | 24px |
| 32 | 14 / 20px | 14px | 12 / 14px | 400 / 600 | 2px | 28px |
| 38 | 15 / 22px | 16px | 12 / 14px | 400 / 600 | 3px | 34px |

Count 始终 400，使用 PingFang SC，不套关键数据字体。32 的 14/20 和 38 的 15/22 不等于现有 UI 默认排版，必须组合现有字号、行高、字重、字体 Token，不能只改现成 Typography 预设的字号。

```ts
const resolvedSize = size ?? (density === "compact" ? 32 : 38);
```

尺寸合同一次返回字体、图标、间距和绘制几何；appearance 不重算 size。编译出的高度工具只提供 `h-rain-tabs-28/32/38`，不把组件高度扩为任意 width/gap 工具。

### 3.2 三种外观的结构

| 外观 | 水平项间距 | 圆角 | 选中标记 | 结构注意 |
| --- | --- | --- | --- | --- |
| line | 8px | Tab Focus 轮廓 4px | 品牌线 + Label 600 | 线计入既定高度；只裁文字，不裁 Focus |
| contained | 2px | 外 6px / 内 4px | 底板内独立选中块 + Label 600 | 底板内缩 2px 计入总高度，More 与列表共用同一底板 |
| soft | 8px | 单项 6px | 主题文字、浅主题填充、浅边 + Label 600 | 普通态预留 1px 透明边框，选择不增加宽高 |

B 的“内部绘制高度”不是更小的公共 size，也不是允许缩小有效交互区域。优先让单项交互盒保持 H，以内部绘制层表达 H−4；底板的四边留白按视觉内缩实现，避免再加到外部高度。TB-01 用实际点击坐标和测量验证此结构，不能只测白色块。

纵向继续使用相同项高、字体与 Icon；B/C 不因纵向退回 A 外观。纵向宽度、24px 内容内边距、B 内缩和 C 描边需逐档核对长名称，不允许靠缩字体补救。

### 3.3 支持矩阵

| position | 导航轴 | A/B/C | overflow | Line 标记 / 可选分隔线 | 前后操作 |
| --- | --- | --- | --- | --- | --- |
| top | 横向 | 三档全部支持 | more 默认 / scroll 可选 | 下沿，靠 Panel | 左 / 右 |
| bottom | 横向 | 三档全部支持 | more 默认 / scroll 可选 | 上沿，靠 Panel | 左 / 右 |
| start | 纵向 | 三档全部支持 | scroll | 右沿，靠 Panel | 上 / 下 |
| end | 纵向 | 三档全部支持 | scroll | 左沿，靠 Panel | 上 / 下 |

本轮按现有从左到右界面落实 start/end；不宣称新增 RTL 全矩阵验证。三档 × 三外观为 9 配方，乘四向为 **36 合法组合**。Density 不增加外观分支；Light/Dark 是同一配方的颜色解析。

横向居中以扣除前后操作区后的“标签＋More”区域为基准。高操作不拉伸 Tab；操作挤占基本标签空间时，由完整页面组合移至独立行，不收入 More 标签菜单。纵向改为横向由页面显式布局，基础组件不暗中转换 position。

### 3.4 颜色配方的冻结输入

静态视觉来源：[已确认状态示意](</Users/wenchengkai/.codex/visualizations/2026/09/10/01a08b45-e89b-7c22-a192-03934a7c5140/tabs-state-directions.html>)；SHA-256：`a9908df43d56859f99011e9f8132e945b4cfe3ba479b99cabb57c92d1baf7b6a`。以下按该源码与现行 Token 注册源逐项映射，表示实施输入，**不等于精确 Token 身份已获 Human Gate 或当前配方已完成颜色验证**。TB-00 将表和来源 hash 一起写入基线，不在实施时重新自由选色。

表中 N 为对应类别的 Neutral，BA 为 Fill/Brand/Alpha；例如文字 N3 是 `Text/Neutral/3`，填充 NA6 是 `Fill/Neutral/Alpha/6`。

| 状态 | A/B Label | A/B Count | B 单项背景 | C Label / Count | C 填充 | C 描边 |
| --- | --- | --- | --- | --- | --- | --- |
| 未选普通 | N3 | N3 | 透明 | N4 | NA6 | 透明，预留 1px |
| 未选 Hover | N2 | N2 | NA6 | N3 | NA5 | 透明 |
| 未选 Pressed | N1 | N1 | NA5 | N2 | NA4 | 透明 |
| Selected | N1 | N2 | `Background/Neutral/1` | `Text/Brand/1` | BA4 | `Border/Brand/3` |
| Selected + Hover | N2 | N2 | `Background/Neutral/1` | `Text/Brand/1` | BA4 | `Border/Brand/2` |
| Selected + Pressed | N1 | N2 | `Background/Neutral/1` | `Text/Brand/1` | BA4 | `Border/Brand/1` |
| Disabled | N6 | N6 | 透明 | N6 | NA6 | 透明 |
| Selected + Disabled | N6 | N6 | `Background/Neutral/1` | N6 | BA4 | `Border/Brand/3` |

Focus、Focus+Hover、Focus+Pressed、Selected+Focus 分别继承对应内容态，只叠加全局 Focus；Focus 不把 Hover/Pressed 改回普通色。A 全部状态背景透明，已选复合状态保留指示线；B 底板始终是 `Background/Neutral/3`。B 普通颜色在底板上验证，Hover/Pressed 在 Alpha 填充合成到底板后验证，Selected 在 `Background/Neutral/1` 上验证；不要因 Light 颜色相似就换成不同 Dark 值的 Fill Neutral Solid。

静态示意未展示图标，下面 Icon 取值是本计划明确补齐的**工程默认**，不是追认示意范围：

| Part / 状态 | 固定 Token |
| --- | --- |
| A/B/C 未选 Icon 普通 / Focus | `Icon/Neutral/3` |
| 未选 Icon Hover / Pressed，含 Focus 复合 | `Icon/Neutral/2` / `Icon/Neutral/1` |
| A/B 已选 Icon，含 Hover / Pressed / Focus | `Icon/Neutral/1` |
| C 已选 Icon，含 Hover / Pressed / Focus | `Icon/Brand/1` |
| 所有 Disabled / Selected+Disabled Icon | `Icon/Neutral/5` |
| A 选中指示线，含复合状态 | `Fill/Brand/Solid/2`，工程默认 |
| A 可选导航分隔线 | `Border/Neutral/3`，1px decorative，工程默认 |
| 所有可聚焦控件 | 现有全局 `Border/Brand/1` 1px 轮廓与 `Fill/Brand/Alpha/3` 3px 外环 |

指示线有一处明确来源差异：示意为 Light `#1561F8` / Dark `#7CA5FF`，不能由一个现有且用途合适的绘制 Token 同时表达。本计划采用 Fill/Brand/Solid/2，Light 保持、Dark 为 `#266BFF`；在运行视觉时单独核对，不能声称像素一致。使用 Fill/surface 角色仍要执行必要选中标记对相邻底面的独立 **3.0** 检查，不能因 Fill 的默认用途没有对比度门槛就略过。C 的浅边仍按辅助装饰记录，不共享这条指示线通过结论。

More 菜单的条目颜色继续使用现有 DropdownMenu 配方；触发器文字和 Icon 的工程默认分别使用自身类别的 N3 → N2 → N1（普通/Hover/Pressed），Focus 继承当前内容态，背景沿外观未选配方，不画成已选 Tab，也不借用 C Tab Label/Count 的 N4 限定用途裁决。前后操作保持各自组件配方，Tabs 不覆盖其颜色。

分隔线复用 Next 当前 border-subtle 的 `/3` 语义；Classic 的 Light `#F2F3F5` / Dark `#303030` 没有现成逐色对应，不宣称完全复刻。原生分区说明复用现有 `tag-flow-examples.tsx` 的 details 模式：summary 设置 `data-focus="item"`，summary/正文使用 `rain-type-ui-default` 与 `text-rain-text-secondary`（Text/Neutral/3），保留原生标记，仅添加必要局部间距。

## 4. 公共 API 与完整使用方式

### 4.1 建议公开类型

类型是本计划的目标合同；TB-01 决定底层实现，不把底层的 any、内部 ref 或注册器暴露给调用方。

```tsx
import type { ReactNode } from "react";
import type { RainLocalRecipe } from "@rain-next/ui";

export type TabsValue = string | number;
export type TabsSize = 28 | 32 | 38;
export type TabsAppearance = "line" | "contained" | "soft";
export type TabsPanelMount = "lazy-retain" | "eager-retain" | "unmount";
export type TabsPart = "root" | "nav" | "list" | "tab" | "icon" | "label"
  | "count" | "indicator" | "extra-start" | "extra-end" | "more" | "panel";
export type TabsLocalRecipe = RainLocalRecipe<TabsPart, "ui-tabs">;

export interface TabsItem {
  readonly value: TabsValue;
  readonly label: string;
  readonly leadingIcon?: ReactNode;
  readonly count?: number | string | null;
  readonly countAccessibleLabel?: string;
  readonly disabled?: boolean;
  readonly disabledReason?: string;
  readonly content: ReactNode;
  readonly panelMount?: TabsPanelMount;
}

export interface TabsChangeDetails {
  readonly reason: "tab" | "more" | "initial" | "disabled" | "missing";
  readonly previousValue: TabsValue | null;
}

type TabsValueProps =
  | { value: TabsValue | null; defaultValue?: never;
      onValueChange: (value: TabsValue | null, details: TabsChangeDetails) => void }
  | { value?: never; defaultValue?: TabsValue | null;
      onValueChange?: (value: TabsValue | null, details: TabsChangeDetails) => void };

type TabsDirectionProps =
  | { position?: "top" | "bottom"; overflow?: "more" | "scroll";
      align?: "start" | "center"; itemAlign?: never }
  | { position: "start" | "end"; overflow?: "scroll";
      itemAlign?: "left" | "center" | "right"; align?: never };

type TabsAppearanceProps =
  | { appearance?: "line"; indicatorSize?: "stretch" | "content";
      showDivider?: boolean }
  | { appearance: "contained" | "soft"; indicatorSize?: never;
      showDivider?: never };

type TabsNameProps =
  | { "aria-label": string; "aria-labelledby"?: never }
  | { "aria-label"?: never; "aria-labelledby": string };

type TabsCommonProps = {
    items: readonly TabsItem[];
    size?: TabsSize;
    activationMode?: "manual" | "automatic";
    panelMount?: TabsPanelMount;
    extraStart?: ReactNode;
    extraEnd?: ReactNode;
    id?: string;
    "aria-describedby"?: string;
    className?: string;
    localRecipe?: TabsLocalRecipe;
};

export type TabsProps = TabsValueProps & TabsDirectionProps & TabsAppearanceProps
  & TabsNameProps & TabsCommonProps;
export type TabsRootProps = TabsValueProps & TabsDirectionProps & TabsAppearanceProps
  & TabsNameProps & Omit<TabsCommonProps, "extraStart" | "extraEnd">
  & { children: ReactNode };
export type TabsNavProps = Pick<TabsCommonProps, "extraStart" | "extraEnd">;
// Tabs.Panels 不接收另一份模型或视觉 props；使用 Root 的 panel Part 修改。
```

数值身份要求 finite；字符串身份非空；number 1 与 string "1" 不相等。React key 包含值类型，DOM ID 用实例稳定 ID，不直接拼 label、数组下标或泄露业务值到追踪属性。items 重复值、空 label、非法尺寸/位置组合、同时提供 value/defaultValue、运行时切换受控模式应给开发诊断，并留下拒绝用例。

`count` 为有限非负整数时显示完整括号数；0 显示 `(0)`。undefined/null/空字符串隐藏；纯数字字符串按括号数呈现。其他显示字符串原样展示，要求 `countAccessibleLabel` 提供完整含义；默认不生成 `99+`。负数、非整数或非有限 number 给开发诊断并隐藏，不生成误导性数量。图标为辅助内容，不成为独立按钮。

同一内部格式化函数返回 `{ display, description }`，Tab、More 与分区说明共用：默认数量说明为“数量 0”等完整文本，非空 `countAccessibleLabel` 优先。Tab 与 More 用各自稳定的说明 ID 接入 `aria-describedby`，可见括号数设 `aria-hidden`，避免名称与数量重复朗读。More 的 `aria-label` 仍为 label；meta 内含可见数量与独立 `sr-only` 说明，不能假设 meta 自动进入可访问名称。`disabledReason` 仅在 disabled 时作为完整说明，缺省不编造原因；菜单使用现有 `description`，其 ID 与数量 ID 按 DropdownMenu 的现有合并规则共存。

### 4.2 默认入口给出完整 Recipe

```tsx
import { useState } from "react";
import { Button, Input, Tabs, type TabsItem, type TabsValue } from "@rain-next/ui";

function StudentNotes() {
  const [note, setNote] = useState("");
  return <Input aria-label="学生备注" value={note}
    onChange={(event) => setNote(event.target.value)} />;
}

const courseTabs: readonly TabsItem[] = [
  { value: "overview", label: "概览", content: <p>课程内容概览</p> },
  { value: "students", label: "学生", count: 56, content: <StudentNotes /> },
  { value: "records", label: "课堂记录", count: 0, content: <p>暂无课堂记录</p> },
];

export function CourseSections() {
  const [value, setValue] = useState<TabsValue | null>("overview");
  const [message, setMessage] = useState("");
  return <>
    <Tabs aria-label="课程内容" items={courseTabs} value={value}
      onValueChange={setValue} appearance="line" size={32}
      extraEnd={<Button variant="secondary" onClick={() => setMessage("导出示例已触发")}>导出</Button>} />
    <p aria-live="polite">{message}</p>
  </>;
}
```

完整默认使用包含列表、More、Panel、manual 和 lazy-retain。页面显式给 `appearance="contained" size={28}` 即可形成局部面板；同一 B 也必须支持 32/38。示例中的业务数据与导出是 Mock，不进入 Tabs 内部。

### 4.3 开放组合保持同一份模型

规划开放 `Tabs.Root`、`Tabs.Nav`、`Tabs.Panels` 三个组合入口：Root 接收同一 items、值、外观及尺寸合同；Nav 自动产生 List/Tab/More；Panels 自动产生 Panel。它们与完整 `Tabs` 共享实现，不能形成第二种默认行为。

```tsx
<Tabs.Root aria-label="课程内容" items={courseTabs} defaultValue="overview" size={32}>
  <Tabs.Nav extraEnd={<Button variant="secondary">课程操作</Button>} />
  <p>此处放当前课程所有分区共用的说明。</p>
  <Tabs.Panels />
</Tabs.Root>
```

Root 组合方式与完整入口的互斥类型单独导出，避免既传 children 又自动渲染第二份 Nav/Panel。一个 Root 首版只允许一份同步提交的 Nav 和一份 Panels；异步内容与 Suspense 边界放在 item.content 内，保持导航和 Panel 外壳始终可注册。缺失、重复或跨 Root 组合给诊断。上述示意中的按钮在正式文档中接入可观察的本地示例动作。

Root 类型从各互斥合同与普通公共字段组合；Omit 只作用于 `TabsCommonProps`，不抹掉方向分支。Nav 仅接收 extraStart/extraEnd，Panels 不接收另一份 items/value/appearance。Root 的可访问名称与描述传到实际 tablist；Root 容器不假冒 tablist。默认 Root 布局按 position 安排 Nav / Panels 与一处间隔；插入的共用说明保持正常文档流，调用方改变空间排列使用具名 Local Recipe，组件不猜测任意子节点语义。

Tab/Icon/Label/Count/Indicator 是受保护 Parts，通过 localRecipe 与 items 内容组合，不默认全部导出为空包装。未来只有明确组合需求才增加低阶手工 Tab/Panel API；当前不让调用方重复维护 items 与 More 数据，也不以任意 children 解析/克隆代替显式模型。

## 5. 行为与算法合同

### 5.1 单一接受值

- Rain 解析公开受控/非受控值，并只把**实际接受值**传给 Base Tabs 与菜单；Tab 与 More 请求统一进入同一选择函数。
- 受控发出意图后等待 owner 回填；拒绝/延迟期间选中标记、Panel、visited 不提前改变。异步回填不把已移走的外部焦点重新抢回。
- 非受控省略 defaultValue 时选首个可用项；显式 null 保持无选择。初始归一记录 initial，普通同值点击不重复回调。
- 非受控选中项被删除/禁用时回退首个可用项，全部不可用则 null；分别记录 missing/disabled。受控无效值诊断并呈现无匹配选择，交由 owner 修正，不发明另一套内部值。
- 受控 owner 明确保留 selected+disabled 时内容继续保留，禁止新激活；它不等于非受控回退路径。

### 5.2 Panel 外壳与内容分开

候选结构：每项有始终稳定注册的 Panel 外壳；内部按策略渲染。所有外壳的存在不等于全部业务内容被创建。

| 策略 | 从未访问时 | 离开后 | 真正删除 item |
| --- | --- | --- | --- |
| lazy-retain 默认 | 无业务子树 | 保留子树并隐藏 | 释放对应子树 |
| eager-retain | 提前创建 | 保留并隐藏 | 释放 |
| unmount | 无业务子树 | 卸载子树，外壳仍保留关联 | 释放 |

visited 仅在实际接受的选择命中后登记；方向键 manual、菜单浏览、被拒绝选择均不登记。已有值的条目对象重建、数量变化、More 收纳不清空 visited。删除后重新添加同值视为新内容；Root 被卸载、React 业务组件类型/key改变或页面刷新不承诺恢复。

隐藏 Panel 必须从可访问树与顺序聚焦中排除；不得覆盖 Base 的 hidden/inert 使其重新露出。默认不添加会延长隐藏时间的退场动画。用户输入、滚动等保留通过浏览器验证；轮询/媒体/缓存由业务根据 value 控制。

### 5.3 连续区间分配

纯函数放 `tabs-overflow.ts`，输入只包含已测量的尺寸、原序和目标索引；不依赖 DOM、菜单 state 或 React。它只负责区间，事件与焦点在 Tabs 层处理。

```ts
type OverflowInput = {
  widths: readonly number[];
  availableWidth: number;
  moreWidth: number;
  gap: number;
  frameInline: number;
  anchorIndex: number;
  previous: readonly [start: number, end: number] | null; // 两端均包含
};
type OverflowResult =
  | { mode: "all"; start: number; end: number }
  | { mode: "more"; start: number; end: number }
  | { mode: "scroll"; reason: "insufficient-width" };
```

计算约定：

1. `availableWidth` 已扣除 ExtraStart/End、导航自身间距和实际占用；`frameInline` 只记录 B 整体底板等一次性左右空间，不能每项重复计入。
2. 全部项宽总和＋项间距＋frame 能放下时，移除 More，返回 all。空列表返回空呈现，不生成假 Tab。
3. 否则预算扣除 `moreWidth + gap`；这里的 gap 包含最后可见 Tab → More，不能遗漏。
4. 宽度包含固定 Icon 盒、真实 Label/Count、间距和选中字重。取普通/选中两态测量的较大宽度作为稳定交互盒宽，避免单纯字重变化抖动；超长 Label 先按可辨识截断盒测量，不拿无限全文宽迫使它永久隐藏。
5. 先保留 previous 与锚点；在相同空间下选择已可见项不重新居中。目标原本不可见时，先向目标移动到刚好包含它。任何候选区间超预算时，从索引距离锚点较远的一端移除项目，等距先移除 end，重复到预算内，绝不移除锚点；Resize 缩小也使用此规则。previous 越界/不再适用于当前原序时以当前稳定业务身份映射到新索引；纯函数接收的 previous 须已由 Tabs 层归一，空映射视为 null。
6. 保留下来的区间无论是否移动，都在剩余预算内扩展相邻项：先尝试 end 后一项，再尝试 start 前一项，重复到两端均不能加入。空间增长必须允许扩展，不以“previous 仍放得下”提前返回；锚点与已保留项不为重新居中而被换走。首次没有 previous 时从 anchor 单项开始，使用同一扩展规则。使用前缀和或简单双端扫描，不做通用布局求解器。
7. 连一个可辨识目标与 More 都放不下，返回 scroll；保持字体和交互尺寸。不得把普通算法/底座失败伪装成极窄降级。
8. 宽度为负、NaN、Infinity、目标越界等输入有明确拒绝或空值处理。字体尚未稳定/容器隐藏时先保留可访问的 Scroll 状态，再测量；避免 0 宽把全部项错误删除。

使用 `ResizeObserver`、字体 ready/loadingdone 与真实内容更新触发重测；合并同一帧通知，不新增固定超时轮询。观察、事件与 rAF 必须清理，只有分配结果改变才写 React state，避免 Resize 循环。

隐藏注册 Tab 的 `display:none` 不参与尺寸采集。Tabs 内另有一层移出布局、`aria-hidden`、`inert` 的静态 span 测量项，复用实际 Label/Count 的 Parts 渲染与完整字体/间距/边框配方；Icon 使用与可见项完全一致的固定尺寸盒，不重复渲染业务图标 SVG，避免重复其内部 ID 或副作用。测量层没有 Tab role、可聚焦内容、业务 DOM ID、事件或 Base 注册；普通/选中字重都采集。名称、数量、字体在收纳期间变化也重测，不永久缓存旧宽度。

必须保留数值回归：6 项各 100px、More 20px、gap/frame 为 0，available 320 → 520、previous `[0,2]`、anchor 1，结果从 `[0,2]` 扩展为 `[0,4]`，不能继续只显示 3 项。缩小场景保持锚点并按上述确定顺序收缩；测量层与实际项宽度的等价性用真实浏览器检查。

### 5.4 焦点与菜单规则

- 横向只接管左右/Home/End，纵向只接管上下/Home/End；跳过禁用，允许循环；正常 Tab 离开。嵌套只处理当前 Root 所属列表。
- 键盘沿完整原序定位；More 边界层只协调隐藏目标的显露和随后聚焦。不得并行维护第二套完整 roving state。
- manual 的焦点与 selected 可以不同；极窄时优先显露实际 Tab 焦点，Panel 保持原内容。不保证任何窄度都能同时看见二者。
- 非 Tab 焦点场景下，外部 selected 变化显露已选项；Resize 不主动把焦点从面板/外部操作拉回来。
- 菜单打开时保持其当前条目集合/焦点，重测结果可延后到关闭后应用；业务真正删除或禁用当前条目时按菜单合同转移，不保持已不存在的数据假象。
- `DropdownMenu.RadioGroup` 读实际 value；More 只包含区间外项，保留原始顺序、禁用与数量语义。
- 接受 More 选择：新项显露后交接 Focus；Escape：回 More；外点/Tab 离开：保留外部去向。受控延迟接受时不持续持有过期“必须聚焦”意图。

### 5.5 全文与禁用说明的键盘入口

可聚焦且实际截断的 Tab 使用私有 Tooltip，Trigger 合并到同一个 Tab DOM，不新增每项 Tab stop。Focus/Hover 打开、Escape 关闭，不吞掉激活事件；数量保持独立描述。

只要 items 中存在禁用项，Nav 就在 tablist 和 More **之外**提供一个原生 `<details><summary>分区说明</summary>…</details>`；展开后按原序列出禁用项完整名称、数量、禁用状态及可选 disabledReason。无禁用项则不显示，不为每个禁用项增加假按钮。此入口属于完整组件，开放组合也由 Nav 自动提供，适用于未溢出、More、Scroll 和四向；不依赖调用方另写页面文案。放在导航主行/列之后，不计入 Tab 高度或 More 分配预算；它进入正常键盘顺序，不加入 Tab 的 roving 集合，也不改变当前选择。条件改变时若焦点仍在说明内部，先保留该入口到焦点离开，避免移除当前焦点。使用平台展开行为，不增加新弹层或通用 Disclosure 组件。

More 的禁用行同样显示完整名称、数量与原因；数量说明及原因分别通过既有 aria-describedby 合并。必测无 More 的可见禁用长项、纵向禁用长项、没有原因字段、数量 0、自定义 `99+` 配合完整数量描述。

## 6. C 浅灰的精确用色治理

### 6.1 当前事实与目标

用户已选择保留 `Text/Neutral/4` 的浅灰方向。指定父填充 `Fill/Neutral/Alpha/6`、底面 `Background/Neutral/1` 下，既有草案测量为 Light **5.181**、Dark **5.309**，均高于普通文字 **4.5**；现行全局规则仍拒绝其 interactive / critical 用途。

本任务解决的是 Tabs Soft 的**限定用途资格**。不改颜色值、全局 weakIds 或默认 Weak Neutral 禁令，不添加 `allowWeakNeutral`/`skipContrast` 公共开关，不把有意义文字改成 decorative 或 non-interactive。

### 6.2 最小实现方案

在 `scripts/verify-token-foundations.mjs::validateRegisteredRecipeColors` 的既有消费者验证流程中加入精确裁决：

1. 先原样调用 `validateColorUse(use)`；只承接其精确 Weak Neutral 用途错误。
2. 必须匹配 `ui-tabs`、soft、`selected=false / disabled=false / hover=false / pressed=false`（focus 可有可无）、真实源文件、静态 symbol、Part、scope、recipeId、evidenceRef 和当前 Tabs 范围登记。Focus+Hover / Focus+Pressed 不属于此资格。
3. Label 与 Count 分别声明消费者；不能把整个文件中所有 `/4` 都放行。普通 Icon 不借文字裁决获得资格。
4. 保持 `role=text`、`property=color`、`context=component-recipe`、`content=text`、`interaction=interactive`、`critical=true`。
5. 只接受 `Text/Neutral/4 + Fill/Neutral/Alpha/6 + Background/Neutral/1`，Light/Dark 两主题；不接受额外 alpha、alphaOperation 或 componentOpacity。
6. 验证器当前先测对比度、后检查 Weak Neutral；低于 4.5、未知底面、其他合成或错误角色必须原样失败。精确匹配错误类型/文本，不泛化捕获异常后返回通过。
7. 记录为 `scopedEligibilityDecision`、`contrastException:false`；新增用途记录路径为 `evidence/runtime/tabs/soft-text-eligibility.md`。不混入既有 acceptedContrastExceptions，也不继承 Input/Select/Dropdown/Tag 的 pending 例外。

公共 `validateColorUse` 的普通 `/4` 交互拒绝测试继续成立。受保护 Tabs 的消费者声明、静态源码与限定用途记录共同决定这一个使用资格，不让消费者绕过真实角色。

进入此裁决前还要接上现有验证器的两个前置检查：为 `packages/ui/src/tabs/tabs.styles.ts` 的唯一 static symbol `tabsPaints` 增加 Tabs 专属授权；在通用前景推断前增加 Tabs 分支，Label/Count 为 text，Icon 按 meaningful-icon 验证，disabled 与 selected+disabled 内容均为 disabled。不能沿用现有“所有 CVA 前景算 meaningful-icon / 大部分 static 前景算 text”的默认分支。背景块保持 background/surface，Alpha 填充为 fill/surface，C 浅边为 border/decorative；必要 Line 指示线另执行固定 3.0 检查。

沿现有 Token 输出模块增加 `getTabsColorConsumers()`，只返回这一固定 source/symbol 的消费者表。每项显式保留 componentId/refinement、appearance/part/state、scope/recipeId/evidenceRef、parentSurfaceId/parentBackgroundId 和真实 paint/foreground；指示线的 `requiredStateContrast=3` 由验证器固定核对。metadata 与源码完整 literal 必须一致；伪造 Part、selected/disabled 布尔值、symbol、角色或 evidence，B 偷换底板、删掉指示线门槛，都有否决用例。裁决函数接收已核实的实际源码/消费者上下文，不仅凭 recipeId 字符串放行。

### 6.3 底面和状态边界

C 的首版完整示例放在明确 `Background/Neutral/1` 的表面上；Tabs 不因此给所有 Panel 自动加背景。组件文档、Manifest 和 Local Recipe 合同明确这个已验证底面要求。调用者改用其他底面时必须新增真实合成验证，不能复用此资格结论；未知背景按未验证处理。

普通→Hover→Pressed：C 文字 `/4 → /3 → /2`，填充 `Neutral/Alpha/6 → /5 → /4`。Selected 使用 Brand/1 文字、Brand/Alpha/4 填充、Brand/3 边；已选 Hover/Pressed 边按第 3.4 节增强。Focus 只叠加全局轮廓，不覆盖 Hover/Pressed 的颜色，二者同时存在时不得回落 `/4`。每一新组合均需要重新测量，禁止只测普通态。

既有选中浅边对填充 **1.436 / 1.296**，对底面 **1.614 / 1.412**，低于必要边界 **3.0**。浅边保持已确认的辅助装饰意图；TB-08 检查字重、选中形状和 Forced Colors 下的当前项识别。若实际依赖该边才能识别选择，应报告必要边界失败并调整设计；本次文字用途裁决不覆盖描边，也不构成整组件 WCAG 通过。

## 7. 文件清单与最小改动面

下表是**未来实施文件**，本轮不得创建空壳占位。新文件不存在是正常的计划状态；只有实施后才进入 Manifest / Registry。

| 类型 | 路径 | 用途 |
| --- | --- | --- |
| 新增 | `packages/foundations/src/tabs-token-contract.ts`、`.test.ts` | 完整尺寸、外观几何及高度入口 |
| 新增 | `packages/ui/src/tabs/tabs.tsx`、`tabs.styles.ts`、`tabs.test.tsx` | 模型、完整组件/组合入口、静态配方、行为 |
| 新增 | `packages/ui/src/tabs/tabs-overflow.ts`、`tabs-overflow.test.ts` | 纯区间算法；不再并列创建 tabs.utils.ts |
| 新增 | `packages/ui/src/tabs/tabs-full-label.tsx` | 私有全文提示及原生禁用项说明；专项断言并入 tabs.test.tsx 和浏览器文件 |
| 新增 | `scripts/tabs-governance.test.ts`、`scripts/tabs-color-consumers.test.ts` | 范围、元数据、真实颜色消费者与否决路径 |
| 新增 | `apps/playground/src/docs/components/tabs-page.tsx`、`tabs-page.css`、`tabs-page.test.tsx` | 完整 Recipe、36 组合入口与交互场景 |
| 新增 | `tests/e2e/tabs.spec.ts` | 真浏览器测量、交互、主题和颜色事实 |
| 新增 | `manifests/ui/tabs.yaml`、`registry/tabs.json` | 实现存在后的工作区候选资产登记 |
| 新增 | `docs/adr/0008-tabs-headless.md` | TB-01 实测后的底座/私有 Tooltip 决定；编号若已被占用，使用下一空号并同步引用 |
| 新增 | `evidence/runtime/tabs/source-baseline.json`、`preflight.md`、`soft-text-eligibility.md` | 实施基线、技术证据和限定用途决定 |
| 新增 | `evidence/runtime/tabs/verification.md`、`browser-facts.json`、`color-findings.json`、`independent-review.md` | 实际执行结果与独立审阅；截图精确清单在实施时登记 |
| 修改 | `packages/ui/src/index.ts`、`styles.css`；`packages/foundations/src/index.ts` | 根导出及必要机械 CSS / 合同导出 |
| 修改 | `scripts/token-foundation-outputs.mjs`、`generate-token-foundations.mjs`、`verify-token-foundations.mjs` | 单源生成、精确消费者与限定用途验证 |
| 修改 | `scripts/verification-helpers.mjs`、`verify-boundaries.mjs`、`verify-tailwind-b2.mjs` | Tabs 细化 guard、精确文件/导入/静态类/CSS/元数据范围 |
| 修改 | `scripts/verification-helpers.test.ts`、`verify-tailwind-b2.test.ts`、必要的 `verify-token-foundations.test.ts` | 在已有框架中补真实负例 |
| 修改 | `manifests/contracts/tailwind-b2.yaml`、`status/current-phase.yaml` | 实施获准后的 Tabs 精确范围和各独立状态 |
| 修改 | `apps/playground/src/app.tsx`、`src/styles.css`、`src/routes/route-registry.ts`、`src/docs/components/core-ui-page.tsx`、`src/routes/playground-shell.test.tsx` | #tabs 接线、精确 @source、组件总览和路由检查 |
| 修改 | 本计划、设计草案、来源审阅 | 决策、进度、实际偏差与交接 |
| 仅生成 | `packages/foundations/src/tokens.css`、`tailwind-theme.css`、`apps/playground/src/docs/token-foundations/token-classes.generated.ts`、`manifests/contracts/token-foundations-v1.json` | `pnpm generate:tokens` 的登记输出，不手改 |

默认不改根 package scripts、UI package exports、锁文件、Vitest/Playwright/TS 配置、`verify-workspace.mjs`、`verify-evidence.mjs`、全局 Density、全局 Focus、色值注册源、旧组件或冻结 Benchmark。确有新增失败需要改时先追踪根因并在范围中记录，不能预先扩大白名单。

`rainCn` 已支持 rain 前缀高度及现有排版 utility；只有新冲突用例证明不满足时才改其现有文件与测试。无需为 Tabs 预先增加通用合并规则。

## 8. 执行顺序、任务与完成条件

依赖顺序：**TB-00 → TB-01 → TB-02 → TB-03 → TB-04 → TB-05 → TB-06 → TB-07 → TB-08 → TB-09**。TB-02 后颜色治理和核心行为可由不同执行者独立准备，但共享源/生成输出由同一人串行集成，稳定后重新验证。

每个步骤完成一个可检查动作；复杂步骤拆成小提交面，但不自动执行 Git commit。范围基线/证据代替本仓库未授权的提交动作。

### TB-00：执行前合同与基线

**Create:** `evidence/runtime/tabs/source-baseline.json`、`scripts/tabs-governance.test.ts`。

**Modify:** 本计划、设计草案、`status/current-phase.yaml`、`scripts/verification-helpers.mjs` / `.test.ts`、`verify-boundaries.mjs`、`verify-tailwind-b2.mjs` / `.test.ts`、`manifests/contracts/tailwind-b2.yaml`。

1. 核对实施授权、当前阶段、并行修改和本计划版本；没有实施指令时停留在计划评审，不创建 runtime 文件。
2. 将第 1.2 节工程默认、第 3.4 节颜色映射与静态来源 hash、第 4 节 API、第 6 节限定颜色用途方案收口；保留用户已确认的三档/四向/C 浅灰，不重复问已锁定选择。
3. **先**在 helpers 接入小样专属 refinement guard、精确文件集和冻结历史过滤（只过滤合法新增的 Tabs 细化块，不改历史 hash），在 boundaries 两处导入判断和 B2 source/CSS 清单中允许 TB-01 的确切路径与 `@base-ui/react/tabs` / `tooltip` 导入。然后登记独立 Tabs 范围；初始仅放行该小样，正式源在通过后按批启用。implementation / checks / review / Human Gate 分别记录，不改 currentPhase 与旧组件决定。
4. 记录计划实际修改文件的 hash、现有相关检查结果与缺陷；不存在的文件记 planned-new。保留其他任务改动，不创造 Git 基线。
5. 先补未经 Tabs 授权、借用其他组件权限、宽泛 source/import、伪造 Human Gate、改冻结历史的拒绝用例，再通过合法小样范围；尚未创建的后续公共源不能先列为实际实现。

**Run:** `pnpm exec vitest run scripts/tabs-governance.test.ts scripts/verification-helpers.test.ts scripts/verify-tailwind-b2.test.ts --maxWorkers=2`

**完成条件:** 输入合同、精确实施权限与文件基线可审阅；颜色取舍有来源，技术候选仍标未验证。

### TB-01：底座、More、全文提示与几何预验证

**Create（局部小样）:** `apps/playground/src/experiments/tabs-preflight.tsx`、`tabs-preflight.css`、`tests/e2e/tabs-preflight.spec.ts`、`evidence/runtime/tabs/preflight.md`。

**Modify:** `apps/playground/src/app.tsx`、`src/styles.css` 及 TB-00 对应精确 guard/导入许可。临时路由 `#tabs-preflight` 明确 local-experiment，不进入组件总览或 Registry。

1. 先把表格中的用例写成可运行浏览器断言，不创建完整公共组件。基础样例使用实际 Rain 字体、两种密度和真实图标，内容为 Mock。
2. 复现禁用项聚焦差异；通过公开组合尝试最小适配，记录事件顺序与最终 activeElement。不得用 skipped/expected-fail 把 Rain 合同记成通过。
3. 验证全体 Tab 稳定注册、隐藏项与全原序键盘、More 显露后聚焦；同时检查 Root 无错误 missing 回退。
4. 验证 Panel 外壳/子树分离，所有 controls/labelledby 有唯一真实目标；初始只创建默认选中内容，manual/菜单浏览不创建。
5. 使用 `DropdownMenu.RadioGroup/RadioItem` 与 `Content.finalFocus` 验证拒绝、延迟接受、Escape、Tab 离开、外点和打开时 Resize。
6. 私有 `@base-ui/react/tooltip` 的 Trigger `render` 组合到 BaseTabs.Tab，只保留一个真实 button/tab DOM。检查 ID/ref/事件合并、Hover/Focus/Escape、截断、隐藏收纳后关闭；manual 下仅 pointerdown 后取消不得提交选择或创建内容，完整 click/触摸确认仍直接激活。同时实现第 5.5 节原生说明小样，覆盖无 More 和纵向禁用长名，不能用 title 或调用方可能存在的说明替代完整键盘入口。
7. 检查 B 的绘制内缩与有效点击 H、C 预留边框、四向 Focus 不裁切；用 28/32/38 验证中文、Icon、Count，不在此小样完成全部外观。
8. 写 ADR：通过后选择 Base UI Tabs + 现有 DropdownMenu + 私有 Tooltip；精确授权 `@base-ui/react/tabs`、`@base-ui/react/tooltip` 到实际两个公共源文件，小样导入另限定在小样文件。

| 必须通过的预验证 | 失败时的动作 |
| --- | --- |
| 禁用跳过、Home/End/循环、manual 与自动激活 | 查清公开 API 是否能有限适配；若要重写完整 roving controller，暂停该候选并提出 ADR 底座调整，不降低合同 |
| 隐藏项稳定注册及完整原序显露 | 不卸载 Tab、不复制同值 Tab；若架构不成立，先修订适配路线再继续 |
| lazy-retain 与所有 Panel 的 ARIA 关联 | 不把 eager keepMounted 冒充 lazy；修正外壳/子树策略 |
| More 关闭与延迟接受焦点 | 不靠全局事件或固定超时强制回焦点；沿菜单接口纠正 |
| Tooltip 单 DOM、键盘全文、禁用长项可发现性 | 普通禁用跳过不取消；组件自带原生说明入口覆盖无 More 与纵向，完整名称/数量/原因均可读，不依赖页面另写兜底 |

**Run:**

```sh
pnpm exec playwright test tests/e2e/tabs-preflight.spec.ts --project=chromium
pnpm verify:boundaries
pnpm verify:tailwind-b2
```

**完成条件:** 每一行有真实结果、失败证据或解决方式，关键行为全部满足后才进入公共实现。失败未解决时可继续完善非依赖文档与 Token 方案，不能宣称底座完成。

### TB-02：精确治理接线与 Tabs 尺寸合同

**Create:** `packages/foundations/src/tabs-token-contract.ts`、`.test.ts`。

**Modify:** Foundations index；Token 输出/生成器；verification-helpers、verify-boundaries、verify-tailwind-b2 及对应测试；B2 合同、Tabs 阶段记录。

1. 扩展 TB-00 已创建的 `scripts/tabs-governance.test.ts`，增加正式源分批启用和小样权限不可冒用的负例。
2. 在 TB-00 的 helpers/guard 上扩展正式实现分组；历史比对继续只过滤合法新增的 Tabs refinement，不改历史 hash。小样与公共实现阶段范围分开。
3. 依据 TB-01 ADR 扩展 boundaries 两处 headless 导入判断、Foundations/UI/app/docs/evidence 文件集；只开放实际文件+子模块组合，不开放 `@base-ui/react/*`。
4. 新建三档完整合同，静态高度 class、字体、Icon、Count、间距、线厚与 B/C 几何由一份事实导出。尺寸解析例外仅在 Tabs 内。
5. 接入 `token-foundation-outputs.mjs` 与 `generate-token-foundations.mjs` 的 imports/sourcePaths/source directive/metadata；新颜色消费者尚未写完时不声明完整 Token 验证通过。
6. 更新 B2 的变量/导出/source inventory/受保护路径/页面扫描与候选 Registry 清单；拒绝非法 Tabs 高度用于 width/gap。
7. 运行生成器，核对非目标输出漂移；不手工补 CSS 或复制另一张类名表。

**Run:**

```sh
pnpm exec vitest run packages/foundations/src/tabs-token-contract.test.ts scripts/tabs-governance.test.ts --maxWorkers=2
pnpm generate:tokens
node scripts/generate-token-foundations.mjs --check
pnpm verify:boundaries
pnpm verify:tailwind-b2
```

**完成条件:** 三档静态可消费、独立构建可达；已创建范围的正/负用例通过。尚未创建的后续源不得通过宽泛占位清单绕过治理，应按批次分组登记。

### TB-03：状态色、C 限定用途与真实消费者

**Create:** `packages/ui/src/tabs/tabs.styles.ts`、`scripts/tabs-color-consumers.test.ts`、`evidence/runtime/tabs/soft-text-eligibility.md`。

**Modify:** `token-foundation-outputs.mjs`、`verify-token-foundations.mjs`、helpers/相关测试、生成合同。

1. 按第 3.4 节冻结表创建 A/B/C × 实际 Parts × 状态 × Light/Dark 的静态 literal 映射；本批精确登记 `tabs.styles.ts` 与实际 symbol，不在实现时重新选色。接上第 6.2 节 static 授权和按 Part 角色分支，Selected+Disabled 仍按 disabled 内容验证，Disabled 不通过整组 opacity 实现。
2. 按第 6 节落实 C scopedEligibilityDecision，与实际 Source/Symbol/Scope 一致；不修改全局 color-registry 的 Weak Neutral 默认规则。
3. 先验证非法作用域、其他组件/外观/状态、Focus+Hover/Pressed 冒用普通资格、错误底面、额外 Alpha/opacity、错角色/Part/disabled/critical、伪造 symbol/证据、未登记源以及低于 4.5 的组合均被拒绝。
4. 为合法 Light/Dark 普通/Focus 的 Label 和 Count 逐一建立通过用例；保留公共 `validateColorUse` 对一般 N4 交互的拒绝断言。
5. 对其他状态和浅边分别记录实际数值、阈值与分类；不能把 scoped 用途决定写成 contrast exception 或 WCAG pass。
6. 静态扫描检出追加未登记 `/4`、复制到另一个文件、错误 helper 路径。生成消费者清单与 metadata，保留其他组件既有 findings。

**Run:**

```sh
pnpm exec vitest run scripts/tabs-color-consumers.test.ts packages/foundations/src/color-registry.test.ts scripts/verify-token-foundations.test.ts --maxWorkers=2
pnpm generate:tokens
pnpm verify:tokens
```

**完成条件:** C 合法范围有单独用途决定；所有越界和低对比度用例失败关闭；未完成的实际 DOM 验证明确留到 TB-08。

### TB-04：模型、完整组件与 Panel 生命周期

**Create:** `packages/ui/src/tabs/tabs.tsx`、`tabs.test.tsx`；**Modify:** `packages/ui/src/index.ts`。

1. 按第 4 节公开类型和边界写入行为用例：唯一值、1 与 "1"、无效值、空列表/全禁用、受控拒绝、同值回调、动态删除。
2. 实现一份 items 模型与统一选择入口。使用组件内必要 state/ref，不新增通用受控状态库；不原地修改 items。
3. 按 TB-01 已通过策略接入 Base；所有选择渠道读同一接受值。Base 自动回退与 Rain 归一规则不能各发一次回调。
4. 实现 Panel 外壳、visited 与三种策略。React key 以类型化 value 稳定；只清理真正移除的项，不以对象引用判断访问是否失效。
5. 实现完整 Tabs 与 Root/Nav/Panels 组合，保证相同 props 的结果一致。保护必要结构、跨 Root 错用和重复 Nav/Panel。
6. 保留 data-rain-id/data-slot/data-variant/data-size/data-density 及可观察状态；标记不包含业务私有内容。

可直接加入同一测试文件的核心回归示例：

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tabs } from "./tabs";

describe("Tabs accepted selection", () => {
  it("does not mount a panel on manual focus and retains it after activation", async () => {
    const user = userEvent.setup();
    const created = vi.fn();
    function Notes() {
      created();
      return <input aria-label="面板草稿" defaultValue="" />;
    }
    render(<Tabs aria-label="课程内容" defaultValue="a" items={[
      { value: "a", label: "概览", content: <p>概览内容</p> },
      { value: "b", label: "学生", content: <Notes /> },
    ]} />);
    screen.getByRole("tab", { name: "概览" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "学生" })).toHaveFocus();
    expect(created).not.toHaveBeenCalled();
    expect(screen.getByRole("tab", { name: "概览" })).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{Enter}");
    const input = screen.getByRole("textbox", { name: "面板草稿" });
    await user.type(input, "未保存内容");
    await user.click(screen.getByRole("tab", { name: "概览" }));
    expect(screen.queryByRole("textbox", { name: "面板草稿" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("tab", { name: "学生" }));
    expect(screen.getByRole("textbox", { name: "面板草稿" })).toBe(input);
    expect(input).toHaveValue("未保存内容");
  });

  it("waits for the controlled owner before mounting the requested panel", async () => {
    const user = userEvent.setup();
    const changed = vi.fn();
    render(<Tabs aria-label="课程内容" value="a" onValueChange={changed} items={[
      { value: "a", label: "概览", content: <p>概览内容</p> },
      { value: "b", label: "学生", content: <input aria-label="尚未访问" /> },
    ]} />);
    await user.click(screen.getByRole("tab", { name: "学生" }));
    expect(changed).toHaveBeenCalledWith("b", expect.objectContaining({ reason: "tab", previousValue: "a" }));
    expect(screen.getByRole("tab", { name: "概览" })).toHaveAttribute("aria-selected", "true");
    expect(screen.queryByRole("textbox", { name: "尚未访问", hidden: true })).not.toBeInTheDocument();
  });
});
```

示例检查未访问时没有创建、返回时 DOM 实例与输入仍保留；不依赖组件恰好 render 几次。新增实现测试先产生真实失败再通过；已有能力天然通过时不为制造红灯而回退代码。

**Run:** `pnpm exec vitest run packages/ui/src/tabs/tabs.test.tsx --maxWorkers=2`

**完成条件:** 单一模型、生命周期、受控拒绝、同 key 重建和空/动态值路径通过；尚未完成 More 时不能声明完整 Tabs 已交付。

### TB-05：三外观、三尺寸、四向与导航组合

**Modify:** `tabs.tsx`、`tabs.styles.ts`、`packages/ui/src/styles.css`、`tabs.test.tsx`、B2 精确 CSS 登记。

1. 应用完整尺寸与外观矩阵，静态类组合不得用字符串动态拼接。三种外观都用同一 Label/Icon/Count 结构。
2. 实现四向排列、Line 的 panel-facing 标记/分隔线、content/stretch、横向居中与纵向项内对齐。
3. 处理 B 绘制层/交互盒、C 预留边框、selected+hover/pressed/focus/disabled；保证选择不造成尺寸跳动。
4. 实现 ExtraStart/End、16px Panel 间隔的单一拥有者、较高操作对齐、窄容器页面操作换行示例。原组件不内置导出/搜索等业务开关。
5. 只为测量尺寸变量、指示线位置、滚动、复杂 Parts 和 forced-colors 登记精确 CSS 例外；变量不是任意视觉值入口。全局 Focus 保持单一来源。
6. 对不同 size/appearance/density 的 class 合并写实际冲突用例；合并器现有能力足够就不改。

**Run:**

```sh
pnpm exec vitest run packages/ui/src/tabs/tabs.test.tsx packages/foundations/src/tabs-token-contract.test.ts scripts/tabs-color-consumers.test.ts --maxWorkers=2
pnpm verify:tailwind-b2
pnpm verify:tokens
```

**完成条件:** 36 组合均有配方路径；JS DOM 验证结构/状态，实际尺寸与颜色不得用这些断言代替 TB-08 浏览器测量。

### TB-06：可靠溢出、菜单焦点与全文提示

**Create:** `tabs-overflow.ts`、`tabs-overflow.test.ts`、`tabs-full-label.tsx`、`tests/e2e/tabs.spec.ts`；**Modify:** `tabs.tsx`、`tabs.styles.ts`、相关行为用例与 `apps/playground/src/experiments/tabs-preflight.tsx` / `.css`。

1. 先为区间算法写数值测试：恰好放下、Tab→More 间距、宽选中项、长文本截断、可见目标不重新居中、320→520 扩容从 3 项到 5 项、向前/向后显露、移除/变宽、零宽/非法宽度和极窄 Scroll。
2. 按第 5.3 节实现纯函数，断言可见索引始终连续、目标可见、无重排、所有占用总和不越界。采用表格例与有限输入枚举，不依赖仅镜像实现的快照。
3. 按第 5.3 节接入无交互测量层、ResizeObserver/字体变更和清理；核对同一字号、普通/选中字重、Icon 固定盒、Count、间距与边框。隐藏期间名称/Count/字体变化后再次显露必须使用新宽度，测量层不得引入重复 ID 或注册。
4. 按 TB-01 结果保留全 Tab 注册，边界显露后聚焦；切换/Resize 不重建 Panels。
5. More 复用公共菜单关闭与 Radio 语义，数量通过共享格式化器、meta 和稳定 aria-describedby 说明，图标通过 leading，原因通过 description，禁用继承一致；验证 0 与自定义缩写全文，Line 的 indicator 不复制进菜单。
6. 私有 Tooltip 仅在真实截断时启用；同一 Tab ID/role，悬停/键盘/Escape 可用，不吞掉指针事件。完整 click/触摸确认直接激活，manual 下仅 pointerdown 或随后 pointercancel/拖出取消不提交选择；Pressed 只是按压反馈。按第 5.5 节内置原生说明，覆盖无 More、四向、原因缺省及键盘读取。
7. 回归菜单打开重测、数量更新、受控拒绝与延迟接受、外部值更新、焦点位于不同项、极窄 More↔Scroll、多 Root 和嵌套。
8. 将技术路由切换为渲染**实际公共 Tabs**，保留已有预验证场景标识；本批创建正式 `tabs.spec.ts` 指向该路由并覆盖新增算法/全文/焦点行为。不得只运行旧 Base UI 小样就声称公共 Tabs 通过；预验证断言能迁移的同时迁入正式文件。

**Run:**

```sh
pnpm exec vitest run packages/ui/src/tabs --maxWorkers=2
pnpm exec playwright test tests/e2e/tabs.spec.ts --project=chromium
```

**完成条件:** More 满足真实宽度与全序键盘，完整名称与菜单焦点用浏览器验证；没有遗留第二套选择值、重复 Tab、错 ID 或已访问内容丢失。

### TB-07：完整使用文档、候选 Manifest 与 Registry

**Create:** `tabs-page.tsx/.css/.test.tsx`、`manifests/ui/tabs.yaml`、`registry/tabs.json`。

**Modify:** app、playground styles、route-registry、core-ui-page、playground-shell test，以及精确元数据清单。

1. 新建 `#tabs` 页面，标题 `tabs-title`；app 的 view union/hash解析/标题焦点/渲染一起接入。Components 中加入 Tabs 家族入口，四个 overview 总入口数量不变。
2. 第一个示例给完整 Tabs＋面板＋可实际操作内容；再提供三外观/三档/四向、四种内容组合和复合状态比较。展示控件只改变当前示例，不污染全页组件默认。
3. 实现三个 Mock 场景：课程分区与数量/操作；B/C 局部面板与输入保留；纵向设置、长名称和滚动。至少一个完整输入保留例、一个受控拒绝/延迟接受例、一个动态删除例。
4. 说明用途边界、API、Parts、默认 Recipe 与开放组合、Local Recipe、C 底面要求、键盘、生命周期/副作用、已知未验证项、来源与修改级别。
5. Manifest 登记 ui-tabs、managed、registry-candidate，写清 9 配方/36 方向组合、相关 Tokens、Dropdown/Tooltip 依赖、源码和全部实际证据。
6. Registry 仅列真实已存在源/共享样式/图标/依赖；从根 `@rain-next/ui` 消费。publication=not-published，scope=current-workspace；不复制其他组件的 Human Gate。
7. 在 helpers/B2 的固定 Manifest/Registry 文件集条件追加 Tabs。将 TB-06 的正式测试入口迁到 `#tabs`，将全部尚未覆盖的预验证断言迁入正式文件并实际运行后，才删除小样源/测试/路由及其专属导入、@source 与精确清单；保留 preflight 证据。

**Run:**

```sh
pnpm exec vitest run apps/playground/src/docs/components/tabs-page.test.tsx apps/playground/src/routes/playground-shell.test.tsx scripts/tabs-governance.test.ts --maxWorkers=2
pnpm verify:governance
pnpm exec playwright test tests/e2e/tabs.spec.ts --project=chromium
pnpm typecheck
pnpm build
```

**完成条件:** 完整入口可找到、示例真实可操作、源码和元数据一致；文档既说明当前能力，也保留独立的技术/颜色/视觉验收边界。

### TB-08：完整浏览器矩阵与颜色证据

**Expand:** TB-06 已创建的 `tests/e2e/tabs.spec.ts`；**Create:** `evidence/runtime/tabs/browser-facts.json`、`color-findings.json`、`verification.md`，实际截图路径清单。

1. 在字体 ready 后对 3 sizes × 3 appearances × 4 positions × 2 themes 共 **72 组**检查几何与状态。状态覆盖 ordinary、hover、pressed、selected、focus、focus+hover、focus+pressed、selected+hover、selected+pressed、selected+focus、disabled、selected+disabled；十二态共 864 个计划状态检查，不等于 864 张截图。
2. 每组测 H、Label/Count 字号行高字重、Icon、间距、圆角、边框、B 绘制/点击区域、Line 边缘/长度，保存测量值和容差理由，不能只截图看起来相似。
3. 每种状态测真实前景与合成底面，保留 Token 身份、Light/Dark、4.5/3.0 阈值和 findings。C 普通/Focus 必须命中本次限定用途边界，其他底面不借用结果。
4. 按第 9 节行为表覆盖 More/Scroll/Resize、焦点、生命周期、控制模式、多实例、长名称、实际图标、0/未知/长数字等案例。
5. 200% 缩放、360px 窄容器、coarse pointer 44px 有效操作区域、Forced Colors、Reduced Motion；桌面配方保持既定 H，触摸布局的额外交互空间由明确 coarse-pointer 规则提供，不重叠、不偷改 size 的字体。
6. 检查 C 的完整选中可识别性、A/B/C Focus 在底板/滚动边缘不裁切。选中浅边低于 3.0 的数值继续保留，不用文字用途裁决吞掉。
7. 保存代表性联系表和关键交互前后真实截图；输出 72 组测量及已执行状态数量。未跑的组合明确 not-run，不用样例数扩大覆盖。

**Run:**

```sh
pnpm exec playwright test tests/e2e/tabs.spec.ts --project=chromium
pnpm exec vitest run scripts/tabs-color-consumers.test.ts --maxWorkers=2
```

**完成条件:** 每个要求有实际结果、路径与未解决项；当前只配置 Chromium，不宣称跨浏览器或真实读屏完成。真实屏幕阅读器人工检查单独记录。

### TB-09：稳定工作区复核、独立审阅与交接

**Files:** 所有实际变更；`verification.md`、`independent-review.md`、本计划、阶段/Manifest/Registry 的真实状态。

1. 等所有并行共享文件修改稳定，核对精确差异和 hash；按实际依赖补旧 Dropdown/Input/Select/Tag/全局 Focus 回归，不扩大实现范围。
2. 执行本计划专项后，再运行仓库规定的完整验证；记录时间、命令、退出结果、失败归属与当前 revision/hash。
3. 交给未参与该实现的审阅者检查接口、全序键盘/禁用/ARIA/生命周期、颜色限定用途、生成链、文档/Registry、修改边界。修正问题后重跑受影响检查；共享治理变动后重新执行完整治理。
4. 更新 implementation、automated checks、independent review 的真实结果，准备运行视觉 Human Gate 材料。用户没有对实际运行结果作决定前，不把此前示意确认填成组件 Human Gate 通过。
5. 交接当前计划任务号、已完成范围、待处理 findings、真实辅助技术状态、复现命令、相关文件与下一个动作；不自动发布或执行 Git。

**Run:**

```sh
pnpm exec vitest run packages/ui/src/dropdown-menu packages/ui/src/input packages/ui/src/select packages/ui/src/tag --maxWorkers=2
pnpm exec playwright test tests/e2e/dropdown.spec.ts tests/e2e/select.spec.ts tests/e2e/input.spec.ts --project=chromium
pnpm verify
```

**完成条件:** 技术完成有本次稳定基线的验证与独立审阅；运行视觉、颜色 finding、真实辅助技术和发布各自有明确状态。测试失败则如实记录，不借其他批次旧 PASS 关闭。

## 9. 验证清单与失败信号

| ID | 必须验证 | 关键失败信号 | 层级 |
| --- | --- | --- | --- |
| T-01 | 三档共同尺寸和 Density 解析 | B 默认偷偷变 28；显式 28 在 default 被放大；漏一外观 | 合同 + 浏览器 |
| T-02 | 36 组合与状态 | 纵向 B/C 退回 A；状态改高度；Focus 被裁 | 浏览器 |
| T-03 | 0/未知/长数字、四种内容组合、Tab/More 数量描述 | 0 消失、Count 选中加粗、图标占位不释放；meta 数量读屏丢失 | 交互 + 浏览器 |
| T-04 | manual、automatic、禁用/Home/End/循环 | 路过就创建 Panel；聚焦禁用；抢非所属方向键 | 预验证 + 交互 + 浏览器 |
| T-05 | controlled 拒绝/延迟/外部变化 | 发出请求就更新 visited；过期回调抢外部焦点 | 交互 + 浏览器 |
| T-06 | lazy/eager/unmount、同 key 重建 | 保留实例失败；More 被误作删除；隐藏输入可 Tab 进入 | 交互 + 浏览器 |
| T-07 | 空/全禁用、动态删除/禁用 | 受控值被擅改；多次回退回调；旧项 visited 残留 | 交互 |
| T-08 | ID/ARIA、多 Root、嵌套 | controls/labelledby 悬空或重复；跨实例串键盘 | 浏览器 |
| T-09 | 连续区间、宽当前项、最后间距 | 前缀+替换；总宽越界；已可见仍抖动重排 | 纯函数 + 浏览器 |
| T-10 | Resize/字体/数量、隐藏期间变化、打开菜单重测 | 扩容仍不增加项目；隐藏宽度为零/过期；Observer 循环；丢菜单焦点；面板输入重置 | 浏览器 |
| T-11 | More 选择/Escape/外点/Tab | 一律回 More；菜单浏览提前激活；Focus 落到隐藏 Tab | 浏览器 |
| T-12 | 极窄降级与纵向滚动 | 为掩盖适配失败禁用 More；项目永远藏在菜单 | 浏览器 |
| T-13 | 长名称全文、原生禁用说明、可选原因 | 仅 title；每个可用 Tab 多一个 Tab stop；无 More/纵向时禁用全文无入口；Tooltip 吞激活 | 浏览器 |
| T-14 | Extra/对齐/分隔线/Panel gap | 高操作使 Line 错边；重复留白；独立操作混入 More | 浏览器 |
| T-15 | C 资格精确边界与颜色/复合 Focus | 低对比度被豁免；其他组件/底面也可消费 N4；Focus 覆盖 Hover/Pressed；浅边假称达标 | 治理 + 浏览器 |
| T-16 | 静态生成、局部 Recipe、元数据 | 新高度不能独立消费；扫描放宽；假文件进入 Registry | 治理 |
| T-17 | 触摸/缩放/强制颜色 | 点击区小或互相覆盖；标签不可辨；选中仅靠浅边 | 浏览器 + 人工 |

## 10. 执行与恢复说明

- 默认在当前本地工作区按任务顺序执行；执行者先检查真实授权和 TB-00，不将本计划当作授权来源。
- JS DOM 不负责布局测量。浏览器用例使用 role/accessible name；结构追踪使用 data-rain-id/data-slot，不用随机 DOM 顺序。
- 当前 Playwright 默认占 4173、`reuseExistingServer:false`。冲突时保留其他任务服务，使用本任务临时配置和独立端口，并把等效命令记录到 evidence；不要修改全局配置或终止未知服务。
- 一次性技术小样通过后迁移断言至正式文件，撤下小样路由/扫描/精确导入许可；preflight 证据保留。不得为简化维护而删除尚未被正式测试覆盖的失败案例。
- 按 TB 任务号记录 checkpoint，不用“暂停”表示完成。被阻塞时记录原因、受影响任务及可继续的独立工作。
- 可在本任务中由子代理分工执行与审阅；也可在后续专门执行任务中按此计划恢复。两者都遵守相同来源、权限、共享文件与证据合同，不由计划自动新建任务。

## 11. 本次计划交付检查

本节只记录文档编写检查，不能填成上述 runtime 的执行结果。

- 已读取现行设计、来源审阅、AGENTS/Brief/phase、Evidence/Benchmark 索引及 Size/B2/Headless ADR。
- 已只读核对实际 `apps/playground` 路由、组件/Token/治理结构、现有测试命令和安装的 Base UI 1.8.0 类型/源码。
- 已收到本轮三项设计选择，并同步设计草案与来源审阅。
- 已检查三份文档的 44 个本地链接（含 17 个行号目标）、Markdown 围栏、10 个任务顺序、8 个 package 命令入口及静态示意 SHA-256，结果通过；拟新增公共源、小样和候选登记文件仍未创建。
- 三路独立只读复核已完成：任务/治理接线顺序，底座/键盘/溢出/辅助文本合同，尺寸/颜色来源与精确验证分支。发现的缺口已在本稿修复：小样治理前移、样式和正式浏览器用例创建归属、原生禁用全文入口、隐藏测量、扩容显露、数量描述、指针取消、静态角色校验与 Focus 复合态。More 触发器另行明确正常 Token，不借 C N4 资格。
- 以上均为计划与源代码的只读检查；技术预验证、实际消费者治理、组件测试、浏览器矩阵、辅助技术与运行视觉 Human Gate 均尚未执行。
- 本轮实际修改范围仅本计划、设计草案、来源审阅。没有创建上述 runtime/治理/Manifest/Registry 文件，未运行实现测试，未改变阶段授权、组件成熟度或发布状态。
