# AspectRatio

来源：shadcn-ui/ui 固定 `3ba91b1cc83e1bbe4ab35a422ff2a694849c5048` 的 Base UI AspectRatio，MIT。来源记录在 `evidence/runtime/g6-preflight-2026-10-14/source-lock.json`。

`AspectRatio` 是原生相对定位 div，必传正数有限值 `ratio`，例如 `16 / 9`、`1`、`4 / 3`。接收原生 div 属性、children、ref、className、style；不添加背景、圆角、边框、媒体角色或加载逻辑。

```tsx
<AspectRatio ratio={16 / 9} className="w-full overflow-hidden rounded-rain-12">
  <img src={cover} alt="课程封面" className="h-full w-full object-cover" />
</AspectRatio>
```

宿主决定宽度；flex 布局需分配宽度或 flex。图片使用实际 alt，cover/contain 由图片决定。长标题放到容器外；加载/失败占位复用相同框，不改变媒体预留比例。

源码差额：使用原生 `style.aspectRatio` 代替 Tailwind 动态 `--ratio` 工具，保留相同布局含义；先合并调用方 style，再以 ratio 绑定 aspectRatio。调用方背景/尺寸不会丢失，错误比例清楚报错。无新增依赖或视觉 Token。

`aspect-ratio.test.tsx` 检查边界值、style 合并与 ref。真实浏览器宽高、媒体加载和不同宿主布局由 Playground/消费页检查；测试通过不是视觉验收。
