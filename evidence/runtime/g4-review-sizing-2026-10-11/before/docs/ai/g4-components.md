# G4：排版、内容条目与任务进度

当前入口：Playground `#typography`、`#item`、`#progress`。Item 与 Progress 为未发布共享候选；本页新增使用例不继承其他组件或既有图表的视觉验收。

2026-10-11 视觉反馈是独立增量：修正文档预览对段落行高的覆盖，并完善课程导读、课程资料和资料同步的完整使用场景。原始 G4 来源与验证记录保留；本轮状态和证据见[视觉反馈记录](../../evidence/runtime/g4-visual-refinement-2026-10-11/verification.md)，仍需用户检阅。

## 选择能力

| 任务 | 使用入口 | 边界 |
| --- | --- | --- |
| 标题、正文、短说明、关键数值 | [Typography 合同](../../manifests/ui/typography.yaml)；现有 Foundations 预设与 `rain-type-*` 类 | 原生 HTML 表达内容语义；UI、Reading、Data 按角色选择，不新增 Typography 包装层 |
| 显示资料、成员、通知等内容及独立动作 | [Item 合同](../../manifests/ui/item.yaml)；从 `@rain-next/ui` 导入 Item 与 Parts | 静态条目无伪点击；导航和表单继续使用各自组件 |
| 表达任务完成量或未知比例 | [Progress 合同](../../manifests/ui/progress.yaml)；从 `@rain-next/ui` 导入 Progress 与 Label／Value | 宿主提供数据、任务名称和状态说明；没有内部请求、计时或自动增长 |

## Typography：直接复用已有预设

`packages/foundations/src/typography-contract.ts` 是预设和值的来源。UI 的普通文字、英文、日期和表格数字使用 PingFang SC；长答案、评语、课程介绍与报告结论选择 Reading。重点数值才选择 Data，中文单位、分母、标签与解释保留 UI 字体。预设 class 不替代 heading、paragraph、article 等 HTML 语义。

```tsx
export function TypographyExample() {
  return (
    <>
      <h2 className="rain-type-heading-section">课程资料</h2>
      <p className="rain-type-ui-default">共 12 份资料，更新于 2026-10-11。</p>
      <article className="rain-type-reading-default"><p>长内容……</p></article>
      <div>
        <span className="rain-type-ui-default">平均得分 </span>
        <span className="rain-type-data-default">86.5</span>
        <span className="rain-type-ui-default"> 分</span>
      </div>
    </>
  );
}
```

载入项目现有 Foundations typography／tailwind-theme 以及 UI 样式与明确的源码扫描；示例只使用已登记的静态类。字体不可用时保持现有回退并记录实际环境，不在源码或下载包中分发字体。局部排版调整先从现有预设选择，再核对字形、行高和相关几何。

检查实际承载文字的节点：预览容器可以提供默认行高，不能用覆盖所有后代段落的规则压过预设。Reading 放在文章容器时，内部段落应正常继承；直接带预设的段落应保留自己的行高。页面中的阅读行长和示例面板宽度只用于当前内容，不升级为基础排版或全库默认尺寸。

## Item：展示语义与动作分开

从高层资产检索后，需要普通内容条目时使用 Item。`ItemContent` 中放 `ItemTitle` 和 `ItemDescription`，图标／图片放 `ItemMedia`，操作放 `ItemActions`。Header／Footer 用于确有必要的上下内容，长名称和说明默认完整换行。默认尺寸跟随父级 Density；显式 size 的用途和边界见源码 README。

```tsx
import { Button, Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@rain-next/ui";

export function CourseMaterialItem({ onOpenDetails }: { onOpenDetails: () => void }) {
  return (
    <ItemGroup aria-label="课程资料">
      <div role="listitem">
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>第一讲阅读资料</ItemTitle>
            <ItemDescription>PDF · 12 页</ItemDescription>
          </ItemContent>
          <ItemActions><Button variant="text" onClick={onOpenDetails}>查看详情</Button></ItemActions>
        </Item>
      </div>
    </ItemGroup>
  );
}
```

此例的 `onOpenDetails` 是示例宿主传入的本地回调，可以打开现有 Dialog；不属于共享 Item API。

整行确为导航时用 `render={<a href="…" />}`，内部只有非交互内容；保留链接自身语义、键盘访问、上下文菜单与修饰键操作。内部有按钮、输入或其他链接时，根保持内容容器。列表通过独立 `role="listitem"` 或合适的原生列表结构保留成员关系，不能把链接的 role 改成 listitem。`ItemSeparator` 复用现有 Separator 的身份与 trace；装饰性分隔使用 `decorative`。

课程资料样例把课程与讲次放在列表头，连续条目使用透明 Item 和分隔线，按名称、类别、阅读时间／来源、已读状态组织信息。阅读操作组合已有 Dialog；下载使用原生 Link 的 `download`，本页提供的是对应 Markdown 演示材料。未开放资料明确说明开放时间并禁用操作。已读状态由宿主维护，只保留在当前页面；本例不增加共享 Item 的业务状态或持久化 API。

## Progress：使用实际完成量

```tsx
import { Progress, ProgressLabel, ProgressValue } from "@rain-next/ui";

export function ProgressExamples() {
  return (
    <>
      <Progress value={6} min={0} max={24}>
        <ProgressLabel>批改任务</ProgressLabel>
        <ProgressValue />
      </Progress>
      <p>已完成 6 / 24 份</p>
      <Progress value={null}><ProgressLabel>正在解析资料</ProgressLabel></Progress>
      <p>进度暂不可计算，请等待结果。</p>
    </>
  );
}
```

Base UI 负责限制有限值、按 min／max 归一化读数与指示宽度，以及 label 关联。min／max 必须有限且 min < max；非法范围抛出 RangeError。`null` 是明确的未知值入口；非有限 value 沿引擎未知语义处理，不输出 NaN／Infinity 百分比。给 ProgressLabel 或 `aria-label` 提供具体任务名称。

默认 Progress 自动提供 Track／Indicator。这些 Parts 可用于直接组合已安装的 Base UI Root；在默认 Progress 内再追加轨道会产生重复显示。没有需要时使用简短组合即可。

暂停、失败、完成、重试等由宿主提供相邻文字和按钮；改变状态不应抹除已经完成的数量。通过操作或真实数据更新进度，不用定时器猜比例。普通进度条用于一个任务；构成、独立目标和比较关系仍使用既有 Chart 能力。

任务样例把课程背景、任务名称、完成量、状态和恢复操作放在同一个任务容器中，演示用的完成下一批／模拟失败／重置控制单独标识。未知耗时组合已有 Spinner，并在当前页面局部隐藏比例轨道，保留 Progress 的无数值语义和具体处理说明；这不是共享 Progress 的新 Variant。

Playground 每个使用例下方可就近展开完整代码。未知耗时样例的 TSX 和局部 CSS 分开显示，复制 TSX 后再载入对应 CSS；复制片段中的导入、局部状态和事件函数均一并提供。

## 来源与验证

Item／Progress 基于已固定的 shadcn Base UI 源码与已安装 Base UI 1.8.0，来源、MIT 和本地差异见[来源锁](../../evidence/runtime/g4-components-2026-10-11/source-lock.json)及[本轮记录](../../evidence/runtime/g4-components-2026-10-11/verification.md)。文档和实际 API 一起更新；全库主题、图表、历史视觉验收及生产状态各自保持原范围。
