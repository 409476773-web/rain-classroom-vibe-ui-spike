# Carousel

来源：shadcn-ui/ui 固定 `3ba91b1cc83e1bbe4ab35a422ff2a694849c5048` Base UI Carousel 和同版 Nova，MIT。实际引擎为 `embla-carousel-react@8.5.2`，传递依赖为core/reactive-utils同版；记录在 `evidence/runtime/g6-preflight-2026-10-14/source-lock.json`。拖动、吸附、循环、resize、slide变更和焦点滚入视野全部由Embla负责。

保留五个来源 Parts：`Carousel`、`CarouselContent`、`CarouselItem`、`CarouselPrevious`、`CarouselNext`；保留 `useCarousel`、`CarouselApi`，导出 Root/Content/Item/Navigation Props 与 Options/Plugin 类型。opts/plugins/setApi与所有原生div属性/ref继续可用；不添加另一个selectedIndex真源。

```tsx
<Carousel aria-label="课程资料" opts={{ align: "start" }}>
  <CarouselContent>
    {materials.map(material => <CarouselItem key={material.id} aria-labelledby={material.id}>
      <Item><ItemTitle id={material.id}>{material.name}</ItemTitle></Item>
    </CarouselItem>)}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

宿主提供区域与每个slide名称、宽度和按钮外置空间；basis类决定单项/多项布局，纵向实例须给可用高度。Content的ref/className/style仍作用于来源inner flex容器，Embla viewport ref由内部拥有。默认gap16、按钮外侧48px的来源关系保留；窄屏可用宿主布局把按钮放入可见区域，不用隐藏控件作为响应式方案。

Direction解析顺序为显式opts.direction → 明确dir属性 → Base UI context；实际Root dir与引擎direction相同。orientation默认horizontal且优先于opts.axis，保持来源关系。RTL使用logical margin/padding/按钮位置和实际相反方向图标；纵向直接使用Up/Down资产，避免将整个按钮旋转。

默认导航是真实IconButton 32/16完整recipe，圆形通过命名`carousel-navigation` Local Recipe绑定已注册Radius/full；不通过覆盖Button padding伪造图标按钮。显式children/variant/size/block/leadingIcon/trailingIcon/loadingLabel/localRecipe或危险tone走完整Rain Button分支，保留合法ButtonProps、ref、loading和原生事件。图标分支默认名称上一项/下一项；显式文本默认沿真实内容命名，不用默认aria-label覆盖宿主文字。

来源差额：

- 作者outline/icon-sm转为默认IconButton32/16；显式组合仍走house Button合法variants/sizes，而非透传不存在的outline/icon-sm。house控件保留自己的data-slot/root和data-rain-id，以data-carousel-navigation及CSS类标记Previous/Next身份。
- 调用方onClick先执行；preventDefault可阻止导航。引擎边缘与调用方disabled合并，aria-disabled/loading阻挡所有激活，不能靠末尾props覆盖而重新启用边缘。
- 两种真实house导航分支都将来源absolute定位在utility层合并，避免house默认relative覆盖组件CSS；调用方className/static或原生style仍可改变宿主布局，不影响按钮视觉recipe。
- 原capture吞后代左右键，适配改为正常bubble、调用方事件优先，只响应Root明确键盘入口或导航控件；输入/OTP/Slider等后代保留自身箭头。水平箭头随RTL改变，纵向Up/Down，修饰键/已阻止事件不导航；不重写Tab序列。
- select/reInit订阅与清理对称且使用同一回调，重新初始化后边缘按钮跟随真实引擎。
- Embla duration为物理参数，不是毫秒；reduced-motion断点强制duration0，正常模式保留作者引擎配置。CSS只负责逻辑布局与真实Focus，不叠加transform运动引擎。
- 无条件aria-hidden/inert不加到离屏slide；资料中的链接/控件通过Embla watchFocus可聚焦并进入可见区。图片例可在宿主用简短polite位置状态，不每个动画帧播报。

plugins原入口保留，但本轮不安装autoplay插件且默认手动。后续加入自动播放时，宿主必须同时提供停止/恢复控制，焦点进入/悬停停止，且仅用户明确操作恢复；不能仅插入插件当作完整体验。

测试使用真实Embla。jsdom只给100px viewport/三项几何、observer/matchMedia平台shim；验证DOM/context RTL、编辑子控件箭头与纵向键、IconButton/Button两分支事件组合/preventDefault/aria-disabled、边缘保护、双事件cleanup、reduced-motion真实引擎参数。没有mock carousel引擎；这些测试不证明拖动距离、惯性或真实触摸体验。浏览器仍需drag/点按仲裁、resize/增删、边缘焦点、长内容、loop不足项、RTL、Drawer轴仲裁和独立消费检查。
