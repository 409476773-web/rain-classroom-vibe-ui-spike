# Direction

来源：shadcn-ui/ui 固定 `3ba91b1cc83e1bbe4ab35a422ff2a694849c5048` Base UI Direction，MIT。直接重导出当前 `@base-ui/react@1.8.0` 的 `DirectionProvider`、`useDirection` 和 `DirectionProviderProps`，不新增 store、DOM、样式或方向转换。

Provider 的 `direction?: "ltr" | "rtl"` 默认 ltr；原生 DOM 方向仍由宿主提供。Context 影响支持该合同的 Base UI 行为，不自动写 document.dir、不替宿主反转数据排序。

```tsx
<DirectionProvider direction="rtl">
  <section dir="rtl">…</section>
</DirectionProvider>
```

内嵌LTR岛同样配对Provider和原生dir。Portal不会自动继承局部DOM的dir；新的弹层可用useDirection给实际视觉容器带出方向。Carousel还需把context映射到Embla direction及logical布局。文件图标、Logo等非方向glyph不镜像。

没有对两个纯重导出编写机械测试。组合页检查LTR/RTL/内嵌岛、默认兄弟以及真实Slider/Carousel/Portal；只记录实测消费者，不据此声明全库RTL验收。
