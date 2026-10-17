# Item 内容条目

状态：`registry-candidate` / `unpublished`，修改等级 `managed`。用于一条对象信息的媒体、名称、说明、元信息和操作；数据、路由、选择、权限和操作结果由宿主拥有。

## 使用与组合

普通内容默认渲染 `div`，没有点击、选中或 Tab 停留点。需要独立操作时，使用 `ItemActions` 组合现有 Button；需要整行跳转时，用 `render={<a href="…" />}` 保留链接的 Tab、Enter、原生 href、事件与 ref。整行链接或按钮里面禁止再放按钮、复选框或另一条链接；有这些操作时保持普通 Item，把名称链接和操作分别放在内容区与操作区。

```tsx
import { Button, Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@rain-next/ui";

<Item variant="outline">
  <ItemContent>
    <ItemTitle>课程资料</ItemTitle>
    <ItemDescription>本周课堂使用的阅读材料。</ItemDescription>
  </ItemContent>
  <ItemActions><Button onClick={openResource}>打开</Button></ItemActions>
</Item>

<Item render={<a href="/courses/intro" />}>
  <ItemContent><ItemTitle>查看课程介绍</ItemTitle></ItemContent>
</Item>
```

需要集合语义时，`ItemGroup` 提供 `role="list"`，每条内容用 `div role="listitem"` 包装，或在普通 Item 上显式提供 `role="listitem"`。链接放在列表项包装内，不能给整行链接覆盖 `role="listitem"`，否则会丢失其链接角色。`ItemSeparator` 默认是装饰分隔线，不计为列表项。

```tsx
<ItemGroup aria-label="课程资料">
  <div role="listitem"><Item render={<a href="/resources/1" />}>
    <ItemContent><ItemTitle>第一份资料</ItemTitle></ItemContent>
  </Item></div>
  <ItemSeparator />
  <div role="listitem"><Item><ItemTitle>第二份资料</ItemTitle></Item></div>
</ItemGroup>
```

## API 与 Parts

| Part | 默认元素 / 追踪 | 用途 |
| --- | --- | --- |
| Item | `div`，`ui-item / root` | 内容根节点，支持 Base UI `render` 和原生 props |
| ItemGroup | `div`，`ui-item / group` | 同类条目的集合，固定 list 角色 |
| ItemSeparator | 复用 `Separator`，`ui-separator / root` | 组内装饰分隔，保留既有组件身份；类 `rain-item__separator` 定位组合关系 |
| ItemMedia | `div / media` | `default` 内容、`icon` 图标框、`image` 缩略图 |
| ItemContent | `div / content` | 主文字区域 |
| ItemTitle | `div / title` | 14px / 22px Semibold 对象名称；标题级别由宿主语义决定 |
| ItemDescription | `p / description` | 12px / 20px 辅助说明 |
| ItemActions | `div / actions` | 独立操作区，无内置点击或选择行为 |
| ItemHeader | `div / header` | 跨整行补充内容 |
| ItemFooter | `div / footer` | 跨整行 12px / 20px 元信息 |

`variant` 为 `default`（无背景）、`outline`（轻边框白色表面）、`muted`（浅冷色表面）。省略 `size` 时随父 `DensityProvider`：`default` 使用 16px 留白与间距，`compact` 映射 `sm` 使用 12px；显式 `xs` 为 8px。尺寸只控制当前条目几何，不改变内嵌控件的密度。根节点暴露 `data-variant`、`data-size`、`data-density`。

文字默认完整保留，长中文、网址和文件名自然换行；不默认省略标题或裁切说明。媒体图标框为 32px，图标为 20px；缩略图为 40px，内容用 `img` 并提供适合任务的 `alt`。装饰图标由宿主标明 `aria-hidden`。长篇正文可在内容区组合现有 Reading Typography；不要按字符串长度临时改变说明的字号或行高。

窄容器中优先保留正文的阅读宽度，独立操作放不下时自然换到下一行。

`className` 用于局部布局和已登记 Rain Token 组合。Item 不承担排序、选择列表、树导航或数据表模型。交互式 Root 保留 item Focus，独立 Button 保留自己的控件 Focus。不要添加静态条目的伪按钮角色，也不要用颜色单独表达业务状态。

## 来源与本地差异

源码直接适配 shadcn-ui/ui 固定 commit `3ba91b1cc83e1bbe4ab35a422ff2a694849c5048` 的 `apps/v4/registry/bases/base/ui/item.tsx`，MIT。源码、许可证、URL 和校验值保存在 `evidence/runtime/g4-components-2026-10-11/upstream/` 与本批来源锁。

保留十个上游 Parts、CVA、Base UI `useRender` / `mergeProps`、原生 `render` 和开放组合。修改为 `rainCn` 与 Rain 颜色 / 几何 / 字体 / Focus；省略尺寸随父级 Density，去除标题和说明的默认 line-clamp。Separator 复用已有实现，保留自身身份；不增加业务选择模型、配置型 Slots 或依赖。

视觉沿用 Rain 冷色文字、轻边界、克制圆角与对象信息 / 独立动作关系；字号与留白是本批候选组件方案。使用 V02、V04、V05、D02、D05、I01 方法，并由 Playground 的真实内容、两种密度、长文案与窄屏进行检查。自动测试不代表视觉 Human Gate、Safari / VoiceOver、发布或生产采用已完成。
