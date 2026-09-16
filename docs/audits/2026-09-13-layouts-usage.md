# RN-06 最小布局用法

日期：2026-09-13。`@rain-next/layouts`为未发布候选；当前布局示例及外卡/面板三级间距试排已获[限定人工视觉接受](../../evidence/runtime/spacing-hierarchy/outer-cards/visual-acceptance.md)，其他资产验收范围保持独立。它只管理空间和区域，依赖现有 React / Foundations；不提供背景、边框、圆角、字体、控件密度或业务状态。依据：[ADR 0009](../adr/0009-minimal-layouts.md)、[组合规则](2026-09-13-composition-layout-rules.md)、[实际 API](../../packages/layouts/src/layout.tsx)。

## 三级间距使用

全库共享 **边缘留白 ≥ 分区间距 ≥ 分区内信息间距**；同一容器、同一方向分别比较，具体数值可自由选取现有 Rain Space，允许相等。页面、卡片、面板各有可调整的默认配方，不按组件嵌套深度自动递减。完整规则见[组合规则第 2.1 节](2026-09-13-composition-layout-rules.md#21-已确认自由选值的三级间距关系)，决定来源与实施范围见[设计记录](../plans/2026-09-13-spacing-hierarchy-design.md)。

`defineLayoutSpacing` 已在唯一布局包中提供关系校验，现有两处布局消费者已协调数值。它校验调用方声明的三元组，不检查整棵 DOM，也不会替容器设置 padding 或根据嵌套深度自动改 gap。最终几何仍须由消费者接入并实测，不能据此宣称全库现有组件自动符合新关系。

| 当前局部默认 | 边缘留白 | 分区间距 | 信息间距 | 使用边界 |
| --- | --- | --- | --- | --- |
| 布局页面纵向 | 32 | 24 | 16 | 左右留白宽屏32、窄屏16，横向关系另核对 |
| 默认 Card 中的内容组合 | 20 | 16 | 12 | 宿主显式应用到两张Card根和正文；公共默认不变 |
| 资料列表与详情面板 | 16 | 12 | 8 | 两面板分别拥有留白，可在试排中调整 |

数值单位为 px，来源是[局部配方](../../apps/prototype/src/layout-recipes.tsx)。这些是当前样例的默认值，不是全库固定配方。Card 的公共default20/sm12继续按 Card 合同管理；当前`LayoutRecipes`通过可选`cardSpacing`显式协调两张局部Card，`panelSpacing`单独控制内部两面板。只调用`defineLayoutSpacing`仍不会自动改写任何容器。控件及 FormItem 内部尺寸由各自合同管理，不跟随组合取值缩放。

## 入口与扫描

在已有应用入口消费：

```tsx
import { Stack, Inline, Grid, Split, defineLayoutSpacing, type LayoutSpacing } from "@rain-next/layouts";
import "@rain-next/layouts/styles.css";
```

保留应用已有的 Rain Tokens、Typography、Focus、UI 样式和唯一 Tailwind 入口。Layout CSS 只包含必要的 Grid / Split 几何；其结构和 gap utility 仍须由应用 Tailwind 编译，单独加载 Layout CSS 不足以完成接入。

当前两个应用在各自 `src/styles.css` 中明确扫描 `@source "../../../packages/layouts/src/layout.tsx";`。Prototype 已扫描自身源码；Playground 另明确扫描 `./docs/components/layouts-page.tsx` 和 `../../prototype/src/layout-recipes.tsx`。路径相对 CSS 文件，参考[Prototype 入口](../../apps/prototype/src/styles.css)与[Playground 入口](../../apps/playground/src/styles.css)。不扫描整个仓库、依赖目录、测试或证据快照，也不增设第二个 Tailwind / Token 桥。

## 实际 API

所有根节点和 Split Parts 都透传原生 `div` 属性、`ref`、`className`、`style`；没有 `as`、Toggle 包装或通用 Pane 配置。

| 对象 | 参数与默认 |
| --- | --- |
| `Stack` | `gap=0`；`align="stretch"`，可选 start / center / end / stretch；`justify="start"`，可选 start / center / end / between |
| `Inline` | `gap=0`；`align="center"`，另支持 start / end / stretch / baseline；`justify` 同 Stack；`wrap=true` |
| `Grid` | `columns=1`，仅 1 / 2 / 3 / 4；`gap=0`；可选 `minColumnWidth` |
| `Split.Root` | 必填 `collapsed`、`sidebarWidth`、`minMainWidth`、`sidebarId`、`collapseFocusRef`；`gap=0` |
| `Split.Main` / `Split.Sidebar` | `scroll="none"`，可选 auto；必须在 Root 中作为两个直接区域使用 |

`gap` 使用全部 16 个已有 Space 键：`0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40`。源码静态映射到 `gap-rain-*`，没有动态生成 Tailwind 类；不接受其他 gap 值。

`minColumnWidth`、`sidebarWidth`、`minMainWidth` 均为有限正数，单位 px；不是新的 Foundation 刻度。Grid 不传最小列宽时保持指定列数；传入后根据自身可用宽度自适应，实际列数不超过 `columns`。容器比最小列宽还窄时收成一列并服从可用宽度；不使用全局视口断点。

Props 拥有 gap、列数和分区宽度。宿主可用 `className` 补充其他局部布局，但不要再叠加冲突 gap 类或覆盖 `--rain-layout-*` 内部几何变量；改变这些关系应使用对应 Props。DensityProvider 继续由外层提供，显式控件 Size 保留其完整方案。

`LayoutSpacing` 包含只读的 `inset`、`section`、`item`，各自使用上述16个数值键。`defineLayoutSpacing` 返回冻结的独立快照；不支持的值或 `inset < section` / `section < item` 抛出 `RangeError`，不静默修正。全部为0、部分相等或全部相等均合法。横向、纵向取值不同时，分别定义并校验各自组合。

```tsx
import { compositionSpaceTokens } from "@rain-next/foundations";

const panel = defineLayoutSpacing({ inset: 24, section: 20, item: 12 });
// 容器显式消费 inset，父布局分别拥有分区和信息间距。
<Stack style={{ padding: compositionSpaceTokens[panel.inset] }} gap={panel.section}>
  <Stack gap={panel.item}><h3>资料简介</h3><p>同一主题中的信息。</p></Stack>
  <Stack gap={panel.item}><h3>学习建议</h3><p>另一分区中的信息。</p></Stack>
</Stack>
```

上例的文字样式与段落 margin 由宿主已有样式管理。不能在这些 gap 上再叠加同一段留白的子 padding / margin；有分隔线时，空白和线厚分别测量。原语仍默认 `gap=0`，这项校验不会改变现有调用。

Playground有两个独立入口，分别保留待应用值、错误和生效值：

- “调整外层卡片间距”→“应用卡片间距”：作用于“课程设置”“课程资料”两张外层Card。边缘留白同时协调根上下与Header/Content左右缩进；分区间距协调Header→Content及正文直接分区；信息间距用于字段/查询组和Split两区之间。标题说明细距保留4px上限、动作组保留8px上限，选更紧的信息间距时同步缩小。
- “调整资料面板间距”→“应用面板间距”：作用于资料列表和详情两面板。外层Card的数值不会随该入口变化。

两入口都可独立选择三个刻度，点击应用时校验；非法组合显示原因并保留所属容器上一个有效预览，合法组合才应用。业务草稿与节点保留，局部设置不跨页面持久化。Card与内部Pane分别按自己的容器校验；不是跨DOM深度自动递减。

当前外卡接入复用Card已有根别名`--rain-card-spacing`与`--rain-card-section-gap`，通过原生style一次赋现有Rain Space；Header/Content沿用自身的别名消费。标题说明在Header自身协调，不增加后代穿透CSS、公共Card参数或全局默认。具体实施与窄屏边界见[外层Card验证](../../evidence/runtime/spacing-hierarchy/outer-cards/verification.md)。

## 样例一：字段组与完整动作组

```tsx
// 位于默认内距20的 CardContent 中。
const card = defineLayoutSpacing({ inset: 20, section: 16, item: 12 });
<Stack gap={card.section}>
  <Grid columns={2} minColumnWidth={260} gap={card.item} className="items-start">
    <FormItem label="课程名称"><Input defaultValue="设计方法与实践" /></FormItem>
    <FormItem label="主要教学方式" help="按本学期主要活动选择；说明可自然换行。">
      <Select defaultValue="seminar" options={modes} clearable={false} />
    </FormItem>
  </Grid>
  <Inline gap={card.item} justify="between">
    <p>修改仅保留在本页。</p>
    <Inline gap={8} justify="end">
      <Button size="small" variant="tertiary">重置</Button>
      <Button size="small" variant="primary">保存设置</Button>
    </Inline>
  </Inline>
</Stack>
```

FormItem、Input、Select、Button 均来自现有 `@rain-next/ui`。不同帮助 / 错误高度的字段需要宿主 `items-start`，避免 Grid 默认 stretch 拉高短字段，继而扩大字段内部行间空白。原语默认 stretch 保留给等高 Card 等组合；不改 FormItem 内部 gap。动作保持同一父组，空间足够时同排，窄屏或较大Card内距下放不下时允许组内换行并右对齐，不侵占容器留白；动作gap不超过所选信息间距，上例默认组合使用8px。

## 样例二：受控收起与草稿保留

```tsx
function Details() {
  const [collapsed, setCollapsed] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const sidebarId = useId();
  function collapse() { setPopupOpen(false); setCollapsed(true); }
  return <>
    <Button ref={toggle} aria-controls={sidebarId} aria-expanded={!collapsed}
      onClick={() => collapsed ? setCollapsed(false) : collapse()}>资料详情</Button>
    <Split.Root collapsed={collapsed} sidebarWidth={320} minMainWidth={320}
      sidebarId={sidebarId} collapseFocusRef={toggle} gap={12}
      className="layout-example-workbench">
      <Split.Main scroll="auto" role="region" aria-label="资料列表" tabIndex={0} data-focus="item">列表内容</Split.Main>
      <Split.Sidebar scroll="auto" role="region" aria-label="资料详情" tabIndex={0} data-focus="item">
        <Input aria-label="草稿标题" defaultValue="尚未保存的标题" />
        <FormItem label="教学方式">
          <Select open={popupOpen} onOpenChange={setPopupOpen}
            defaultValue="seminar" options={modes} clearable={false} />
        </FormItem>
        <Button onClick={collapse}>收起当前详情</Button>
      </Split.Sidebar>
    </Split.Root>
  </>;
}
```

本例的 Hooks 来自 React，`modes` 和 `.layout-example-workbench` 沿用[可运行样例](../../apps/prototype/src/layout-recipes.tsx)及[局部样式](../../apps/prototype/src/layout-recipes.css)。实际样例由宿主给出 560px 有界高度；这是该工作区几何，不是全局高度默认。`scroll="auto"` 只有在父布局高度受到约束时才形成独立滚动，默认 none 保持内容自然流动。

Root 按实际容器内容宽度与“侧宽 + 主区最小宽 + gap”比较，空间不足则按 DOM 顺序上下堆叠。Sidebar 收起时保留挂载并设置 hidden / inert，不卸载内容，草稿因此保留；它不是跨页面持久化。只有收起侧区内的焦点时才返回 `collapseFocusRef`，不抢无关焦点。该引用必须指向侧区外仍可见的控制，宿主同时维护 `aria-expanded` / `aria-controls` 和唯一 `sidebarId`。

Portal 不受祖先 hidden 控制：宿主必须先关闭侧区内受控 Select / Dialog 等浮层，再收起。Split 不遍历或接管业务浮层状态；上例显式关闭 `popupOpen`。真实区域是否需要可聚焦的滚动入口、`role`、名称和 Focus 样式，由宿主按内容补齐，完整样例已提供。

## 当前验证边界

面板首轮生产浏览器[24项通过](../../evidence/runtime/spacing-hierarchy/logs/production.log)（Layout 9 + Dialog 9 + Card 6），专项单元8项通过；外卡补接新增一项两容器隔离/真实四边/按钮边界回归，最新结果与独立复核见[外层Card验证](../../evidence/runtime/spacing-hierarchy/outer-cards/verification.md)。原[三级间距记录](../../evidence/runtime/spacing-hierarchy/verification.md)与RN-06的[22项记录](../../evidence/runtime/layouts-v1/verification.md)保留各自历史范围。

这些检查不代表完整 BM-A / BM-B / BM-C、人工视觉接受、对比度接受或生产采用。拖动调宽、布局持久化、多 Pane 协调和独立导航 Sidebar 均不在 RN-06 范围。
