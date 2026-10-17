# Carousel

共享候选 `ui-carousel`，通过 `@rain-next/ui` 消费，尚未发布。Embla 8.5.2 维护拖动、吸附、位置、循环、尺寸与内容变化；Rain 提供控件组合、停靠点指示和统一播放状态。

## 组合与兼容

保留 `Carousel`、`CarouselContent`、`CarouselItem`、`CarouselPrevious`、`CarouselNext`、`useCarousel` 及 `opts/plugins/setApi/orientation`。`opts.direction` 优先于显式 `dir`，再取 DirectionProvider；orientation 决定轴。Content 的 className/style/ref 仍作用内部 flex 容器，viewport 由 Embla 持有。

新增 `CarouselControls layout="inline" | "overlay" indicatorPlacement="top" | "bottom" | "start" | "end"`。inline 将导航和短条组合为独立行/列；overlay 只让实际控件接收指针事件，空白区域保留拖动。媒体高度、纵向轨道高度和文本安全区由宿主决定，可以用 className/style 布局。Controls 应与 Content 同级。overlay中的PlaybackControl保留自身指针点击；按钮覆盖媒体的具体位置仍由宿主原生style安排，主例将播放按钮放在内容外侧。

`CarouselIndicators` 的数量和当前项来自 `scrollSnapList()` / `selectedScrollSnap()`，不等于多卡场景的内容数量；0/1 停靠点时不显示。默认按钮名称为“转到第 n 项”，可用 `getLabel` 提供分组或缩略图语义。调用公开 scrollTo 后，由实际 select/reInit 更新状态。

`CarouselPlaybackControl` 默认显示“暂停播放 / 继续播放”文字，采用确认稿36px高、16px图标的浅灰圆角矩形按钮；`showLabel={false}` 保留带可访问名称的36/20圆形图标形式。默认导航为36/20浅灰圆形箭头；短条厚4px、普通18px/当前28px、可见间距6px。旧默认外置48px导航通道已移除；需要外置布局的旧消费者应明确提供布局。显式 Button variant/size/children、宿主事件、ref/className/style 仍兼容。

确认稿的“与内容分离”由宿主组合：单图、多卡和纵向的箭头相邻放在内容标题右侧，短条独立置于轨道顶部、底部或两侧；连续展示的箭头相邻放页脚左侧。公开Previous/Next可用原生style设置静态位置，Indicators仍读真实停靠点。覆盖箭头保留8%轻阴影；纵向下箭头距底32px，底部胶囊距底28px。`Controls layout="inline"` 的基础行列组合继续供资料边界示例消费，不将通用示例的行列排列冒充确认稿的独立布局。

```tsx
<Carousel aria-label="课程精选" tabIndex={0} opts={{ loop: true }}
  playback={{ mode: "autoplay", delay: 5000, direction: "forward", start: false }}>
  <CarouselContent>{courses.map(course => <CarouselItem key={course.id}>{course.content}</CarouselItem>)}</CarouselContent>
  <CarouselControls layout="inline" indicatorPlacement="bottom">
    <CarouselPrevious /><CarouselIndicators /><CarouselNext /><CarouselPlaybackControl />
  </CarouselControls>
</Carousel>
```

## 播放合同

默认手动。显式 `playback` 可选 `{mode:"autoplay", delay:5000, direction:"forward"|"reverse", start?:boolean}` 或 `{mode:"continuous", speed:36, direction, start?:boolean}`。delay 是毫秒；speed 是 px/s，按锁定 Embla 核心60Hz固定步长换算为官方 AutoScroll 8.5.2 的 speed/60。非正或非有限参数会报错。连续插件 `playOnInit=false`，由 Rain 统一管理，不叠加第二个 transform/selectedIndex 引擎。

Context 提供 selectedIndex、scrollSnaps、slideCount、scrollTo 和 playback 的 mode/enabled/isPlaying/status/play/pause/getProgress。配置变更会重新建立对应播放调度；来源引擎的 resolved active=false（含breakpoint解析结果）会阻止两种自动播放，reInit后恢复active时只恢复此前仍启用的意图。唯一internalEngine读取只看resolved active，不读取或修改轨道位置、速度、limit或animation。保持 opts/plugins 身份稳定，避免宿主每帧重建插件。宿主插件如要移动轨道，须与 Rain playback 协调，不同时挂另一自动播放驱动。计时指示只更新局部CSS变量，不按动画帧重新渲染全部内容。

- 用户暂停、箭头、短条、拖动和键盘焦点接管会持续停止，须明确继续。
- 悬停、后台和离屏为临时暂停；原因解除仅恢复此前仍启用的播放，不覆盖用户停止意图。
- 播放按钮的鼠标聚焦不反向取消本次点击；键盘进入仍停止。
- reduced motion 默认停止自动运动，手动切换的引擎 duration 为0；内容不足滚动时不启动，非 loop 到头停止。

## 焦点、颜色与来源

边缘 Previous/Next 使用 aria-disabled 保留焦点并阻挡点击/键盘激活；调用方显式 native disabled 仍受尊重。事件先交给调用者，preventDefault 可取消动作。轴向快捷键只在明确轮播入口/导航按钮处理；后代输入、编辑器、Slider 保留键盘。离屏项不一律 inert/aria-hidden，继续由 Embla watchFocus 带入视野。Root/Item 的具体可访问名称由宿主提供；播放时避免逐帧或自动翻页反复播报。

本轮保留已确认的控件局部灰色Focus与主题表面色halo，宽度和offset仍引用既有Focus Token，不修改全局Focus。浅灰控件使用根内 `--rain-local-carousel-*` 候选：Icon/Neutral/3、2、5 的绿色通道分别复制到RGB，历史名称 control-white 代表主题表面基色，取 Background/Neutral/1 的绿色通道去色，Light保持白色、Dark采用中性深底；具名 surface 配方按账本记录。派生后的实际 Light/Dark 色值单独测量，不冒充原带蓝 Neutral 色值，不改变全局色板。覆盖在媒体上的可读性由实际媒体表面复核；登记不代表对比度接受。

来源：固定 shadcn Base UI Carousel 与 Embla 8.5.2，历史证据保留在 `evidence/runtime/g6-components-2026-10-14/`。本轮基于用户确认的本地 v0.4，公共实现及颜色证据单独位于 `evidence/runtime/carousel-upgrade-2026-10-14/`。本地稿接受不自动成为公共实现、Safari/VoiceOver/真实触摸、对比度或发布接受。
