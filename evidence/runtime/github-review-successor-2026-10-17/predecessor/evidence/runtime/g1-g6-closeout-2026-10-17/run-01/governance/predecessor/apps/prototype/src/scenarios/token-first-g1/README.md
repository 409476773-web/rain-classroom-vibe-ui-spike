# G1 局部源码适配

状态：场景页面保持 `local-experiment`；Accordion、Collapsible、Resizable 已迁入共享 `registry-candidate`，旧入口同源导出；Tooltip 已按用户授权迁入共享候选 Registry；G1 示例页的 Alert 已按用户授权改用共享 `@rain-next/ui`。第一批 Alert / Switch / Collapsible / Accordion 的说明和原验收保留在 [G1 证据](../../../../../evidence/runtime/token-first-v12-g1/verification.md)。Switch 外观仍暂缓。

## Tooltip：就近解释

入口已替换为共享 `@rain-next/ui` 的 `Tooltip`；完整合同见 [共享组件](../../../../../packages/ui/src/tooltip/README.md)。原本地 Parts 适配已移除。

```tsx
import { Tooltip, IconButton } from "@rain-next/ui";
import { HelpIcon } from "@rain-next/ui/icons/help";
<Tooltip text="仅统计已提交作答。" portal>
  <IconButton aria-label="成绩口径" icon={<HelpIcon />} />
</Tooltip>
```

继承旧 Vue 的固定 #2F3545 深底、白字、14/20 排版、7×16 内边距和三角箭头；12方位、100ms悬停开关、键盘、受控状态及本地/Portal挂载。仍是候选资产，Tooltip 当前视觉与默认下方交互已于2026-09-20获得用户确认。[本轮验证](../../../../../evidence/runtime/tooltip-classic/verification.md)。

## Resizable：阅读与判断区域分配

共享入口：`@rain-next/ui`；旧 [resizable.tsx](resizable.tsx) 保留兼容导出。Playground 独立页 `#resizable`。组合 `ResizablePanelGroup` → `ResizablePanel` / `ResizableHandle` / `ResizablePanel`；使用已固定 `react-resizable-panels@4.12.4`。参看[完整样例](next-samples.tsx)。

```tsx
<div style={{ height: 320 }}>
  <ResizablePanelGroup orientation="horizontal">
    <ResizablePanel id="answer" defaultSize="55%" minSize="25%">作答</ResizablePanel>
    <ResizableHandle withHandle aria-label="调整作答与评分依据宽度" />
    <ResizablePanel id="rubric" minSize="25%">评分依据</ResizablePanel>
  </ResizablePanelGroup>
</div>
```

引擎 Group 自带 100% 高度，固定高度给外层容器；面板内部按内容设置 `overflow:auto`。4.x 数字尺寸是像素，比例必须写 `"55%"`。每个 Panel 使用稳定唯一 ID；宿主用 `groupRef.setLayout()` 恢复比例。拖动、方向键、Home/End 与上下限由引擎管理，不另建一套拖动状态。分隔条需独立可访问名称；应用的评分、草稿、保存等业务状态留在宿主。

## 来源、局改和限制

- 固定 shadcn 官方作者源码与同提交 Nova 样式：[来源锁](../../../../../evidence/runtime/token-first-v12-g1-next/source-lock.json)。行为与开放 Parts 保留；视觉转译为现有 Rain Token，没有导入外部全局主题或字体。
- Tooltip 继承 Classic 固定深色视觉，无边框和阴影。拖动握柄是必要操作标记，默认使用较浅的 Icon/Neutral/3 并按 3:1 检查。完整 2px 细分割线在悬停、键盘聚焦和拖动期间变色；用 width/height 明确视觉细度，拖动命中与边界继续由引擎管理。
- 共享 Tooltip / Resizable 使用 `ui-tooltip` / `ui-resizable` 追踪身份；例子中的布局高度、初始比例和上限只属于样例。
- 当前查看：[构建预览](http://127.0.0.1:5372/#token-first-g1-next)；[本批验证与未验证项](../../../../../evidence/runtime/token-first-v12-g1-next/verification.md)。实际运行测试不等于用户视觉确认或公共发布。
