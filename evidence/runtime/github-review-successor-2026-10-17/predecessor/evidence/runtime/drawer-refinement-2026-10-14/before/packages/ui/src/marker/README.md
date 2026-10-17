# Marker

会话内的状态、系统备注与带标签分隔行候选。它不承担Toast、图表标记或彩色状态点职责。

保留 Marker、MarkerIcon、MarkerContent、markerVariants；variant为default/border/separator。Root使用Base UI useRender与mergeProps，支持真实链接/按钮、原生className/style、refs和事件。Icon默认aria-hidden；状态role与文本由宿主提供，不从variant推断异步生命周期。

```tsx
<Marker role="status">
  <MarkerIcon><Spinner /></MarkerIcon>
  <MarkerContent>正在整理课堂提问…</MarkerContent>
</Marker>
<Marker variant="separator"><MarkerContent>今天</MarkerContent></Marker>
```

可用内容Local Recipe类 `rain-marker__content--shimmer` 组合文字光带。Root的 `MarkerRecipe` Parts为root/icon/content，Part也可显式指定recipe；不会影响相邻实例。采用shimmer时仍给出可读状态文字；不要用循环动画代表请求完成。

来源与差额：

- [固定Marker源码](https://github.com/shadcn-ui/ui/blob/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048/apps/v4/registry/bases/base/ui/marker.tsx)、同commit Nova与[shared CSS](https://github.com/shadcn-ui/ui/blob/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048/packages/shadcn/src/tailwind.css)，MIT。
- 三种完整表面、装饰图标16、文本/线条关系保留；左右线段间隔转逻辑方向。源码text-left改为text-align:start。
- 默认UI14/22，compact13/18；说明Text/Neutral/3，线条Border/Neutral/3或4，内联链接用已有品牌文字。
- 光带保留currentColor渐变、2s线性循环、200%加两倍spread的背景宽度与RTL反向；spread中的40px消费已存在Space/40，未新增全局Token。
- reduced-motion与forced-colors直接匹配实际光带类，关闭动画并恢复普通文字，避免透明text-fill让内容消失。深色按来源提高光带亮度。

测试覆盖真实链接、ref/合并事件、状态可访问语义与局改隔离；主题嵌套、实际文字对比、长分隔标签、窄屏及光带减弱动效需要浏览器检查。候选未发布、用户视觉Gate独立。
