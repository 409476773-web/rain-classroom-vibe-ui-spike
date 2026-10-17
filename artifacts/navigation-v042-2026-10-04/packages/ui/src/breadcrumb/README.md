# Breadcrumb 面包屑

单档 13px / 18px，Regular 400；22px 视觉底、24px 操作热区。基于 Figma `MbWg1ft5zk1JRQiQ6dS30e / 1:16351`。本地候选；用户于2026-09-24确认本轮运行视觉验收完成，整项下拉方案已接受。

## 数据入口

```tsx
import { Breadcrumb } from "@rain-next/ui";

<Breadcrumb aria-label="消息层级" items={[
  { id: "messages", label: "消息中心", href: "/messages" },
  { id: "notices", label: "行政通知", href: "/notices", siblings: [
    { id: "notices", label: "行政通知", href: "/notices" },
    { id: "teaching", label: "教学通知", href: "/teaching" },
  ] },
  { id: "detail", label: "通知详情" },
]} />
```

`items` 的每项需要唯一稳定 `id` 与非空 `label`；最后一项始终为当前页，即使提供 href 也不渲染链接。无 href 的上级是普通静态分组，disabled 的链接移除 href 并阻止操作。siblings 使用相同目标结构；无 href 是菜单分组，有 href 且 disabled 是禁用菜单项；当前分支按 id 标记。至少存在一个其他可导航同级目标才显示箭头。

可下拉项的文字与箭头组成一个完整按钮，点击任一区域均展开或收起菜单；Hover、Pressed、Focus 与 Open 统一覆盖整项。普通上级链接仍直接返回，有同级菜单的上级通过菜单中的本层目标返回。宿主使用有效链接并按新目标重建整条路径，同时管理导航后内容标题焦点。组件不拼接旧的详情路径，也不接管路由、权限或数据请求。原生链接保留新标签页和浏览器历史行为。

按实际容器宽度优先保留根节点、父级与当前页，将中间层级放入省略菜单；进一步缩窄将根节点收入省略菜单。父级与当前页最长32ch，其余最长24ch。只在实际截断时显示完整名称 Tooltip，鼠标悬停和键盘聚焦均可查看；当前页/静态文本仅截断时进入 Tab。菜单打开期间抑制同项 Tooltip。宿主应提供足够容纳固定箭头与分隔符的宽度。

## 兼容的组合入口

```tsx
<Breadcrumb>
  <Breadcrumb.List>
    <Breadcrumb.Item><Breadcrumb.Link href="/courses">课程</Breadcrumb.Link></Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item><Breadcrumb.Page>课程详情</Breadcrumb.Page></Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb>
```

可用 Parts：List、Item、Link、Text、Page、Separator、Ellipsis、Back、Menu。Menu 必须放在 Item 内，提供可访问 label、可选显示 text 与 current 标记，其 children 组合既有 DropdownMenu.Item / LinkItem 等。Ellipsis 只是装饰图形，需放在可操作的 Menu 入口；Back 是链接组合，不自动推断浏览器历史。Separator 渲染 aria-hidden 的 li，保持 ol 结构有效。Compound 模式按宿主所给层级展示，不自动折叠；需要自动折叠时使用 items。items 与 compound children 不可同时传入。

## 预览与验证

Playground `#breadcrumb` 提供六组样例；`?breadcrumb-page=teaching#breadcrumb` 可直接进入切换后的示例状态。

- 单测：`pnpm exec vitest run packages/ui/src/breadcrumb/breadcrumb.test.tsx`
- 浏览器：启动 Playground 5194 端口后，`pnpm exec playwright test --config tests/e2e/breadcrumb.config.ts`
- [设计基线](../../../../docs/plans/2026-09-24-breadcrumb-design.md)
- [验证记录](../../../../evidence/runtime/breadcrumb/verification.md)

未新增 Token 或依赖；不包含 Figma 写入、公开发布、Git 提交或全库对比度验收。独立审阅和自动检查不替代用户视觉验收。
