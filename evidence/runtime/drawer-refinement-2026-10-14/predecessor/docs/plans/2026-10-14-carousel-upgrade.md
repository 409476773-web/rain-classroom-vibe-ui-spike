# Carousel v0.4 公共组件升级实施计划

**Goal:** 以用户已确认的v0.4视觉与交互稿为基准，将浅灰控件、覆盖/分离组合、真实短条定位及两种自动播放纳入共享Carousel。

**Architecture:** Embla8.5.2继续独占拖动、吸附、循环、位置、尺寸变化。定时正反通过公开API调度；连续正反使用官方AutoScroll8.5.2。共享Context提供位置及统一播放状态，Controls/Indicators/PlaybackControl读取它；宿主负责内容与安全区。

**Tech Stack:** React19、TypeScript、Embla8.5.2、embla-carousel-auto-scroll8.5.2、既有Rain组件与Token；Vitest真实引擎和内置浏览器。

## 授权与工作范围

2026-10-14用户先明确“确定。这些交互与视觉完成检验。”，随后指示“开始以视觉稿为基准参照，开始改造、优化升级该组件”。此为System Mode的具体实施授权；设计已完成，不重新要求选方向。研究、v0.4确认及源码摘要位于根工作区evidence/carousel-research-2026-10-14/prototype/feedback-01。

沿用card-v2及所有已有工作。范围：packages/ui/src/carousel/**、精确AutoScroll依赖及锁文件、Carousel专用Playground消费场景、相关Manifest/Registry/AI合同、限定治理与来源绑定、证据。现有五个Parts、opts/plugins/setApi/orientation和文本导航兼容。当前默认浅蓝32px导航更新为已确认浅灰36px配方；旧外置48px不继续作为默认。

相关依据：AGENTS/SystemMode，SPIKE_BRIEF颜色/字体/焦点规则，current-phase/G6登记，VisualEvidence和Benchmark索引（本轮没有对应正式Carousel benchmark），G6固定源码与测试，Rain Designer/本库接入说明。当前用户中性色指令覆盖该组件原品牌蓝控件选择；派生灰度必须在Carousel专用来源账本明确登记，不冒充原带蓝Neutral Token。

保留已确认本地视觉稿源码和五个SHA绑定。公共实现另作运行验证；不自动升级成熟度、公开发布、生产接入、Figma或Git状态。

## API与行为

- 保留Carousel/Content/Item/Previous/Next/useCarousel。
- 新增CarouselControls：layout=inline|overlay；indicatorPlacement=top|bottom|start|end。overlay为稳定层，空白pointer-events:none，子控件auto；宿主可提供实际媒体区域height/style，纵向安全高度由宿主决定。
- 新增CarouselIndicators：停靠点数量、当前项全部来自API；默认普通按钮组，标签“转到第n项”，getLabel可供组/缩略图语义；0/1停靠不显示。短条4px，18/28px长度、6px可见间距；覆盖胶囊两端15px。
- 新增CarouselPlaybackControl：36px正式播放/暂停图标及可访问名称。默认手动；仅显式playback配置开启自动。
- playback={mode:autoplay,delay:5000,direction:forward|reverse,start?:boolean} 或 {mode:continuous,speed:36,direction,start}。delay为毫秒；speed为px/s，基于锁定核心60Hz固定步长换算为插件speed/60；配置非正或非有限值明确报错。
- 同一个Context提供selectedIndex/scrollSnaps/slideCount/scrollTo与playback(mode,enabled,isPlaying,status,play,pause,getProgress)。React不按每帧重渲染内容；仅指示器计时CSS变量按需更新。
- 显式暂停、箭头/短条/拖动/键盘焦点持续停止；悬停、后台、离屏为临时暂停，只恢复未被接管的意图。播放按钮鼠标点击不被其focus事件反向覆盖；键盘进入仍停止。
- 减弱动效默认停止自动、手动duration0；无可滚动内容不启动；非loop到头停止。插件playOnInit=false，Rain统一调度暂停。
- 箭头边缘采用aria-disabled保持焦点；显式native disabled仍尊重调用者。不要无条件隐藏离屏交互内容，继续Embla watchFocus。

## Task 1：行为测试（先红）

文件：carousel.upgrade.test.tsx；原carousel.test.tsx边缘断言在兼容变更后改为aria-disabled。验证真实引擎snap短条、直达与同步、边缘焦点及阻挡、0/1/allfit、动态slides/reInit、嵌套输入键、定时正反、暂停优先级、减弱动效与非loop边界。运行pnpm exec vitest run packages/ui/src/carousel/*.test.tsx，先确认新增行为失败再实现。

## Task 2：共享实现与插件

新增carousel-playback.ts（统一播放生命周期），增量改carousel.tsx/css，安装精确embla-carousel-auto-scroll@8.5.2。保持真实引擎，使用正式Arrow和Play/Pause图标。先实现位置/控制Parts再播放，运行专项测试与UI/测试类型检查。

## Task 3：公共消费场景

新增Playground carousel-examples.tsx/css及本地媒体素材，替换Carousel页主例为精选、多卡、纵向、定时、连续；示例全部消费公共Parts。继续保留原资料增删/输入、RTL、Drawer例的行为测试，清除外置通道，独立导航保持可见。既有被确认原型只读。

## Task 4：合同与治理

更新Carousel README/Manifest/Registry和g6-components；记录新Parts/默认控件/API/速度单位/配置reInit限制。新增本轮阶段授权、派生灰度颜色账本与来源绑定，保留G6历史证据。源校验增加精确且仅覆盖Carousel的后续授权，不放宽其他G6资产。

## Task 5：验证与交付

专项组件及Playground回归、UI/Playground/测试类型、Playground构建、必要治理检查。浏览器比较已确认稿与公共消费：桌面/390px，覆盖/分离/四指示器位置，浅灰状态和尺寸，鼠标拖动与点击、焦点、定时/连续正反、暂停恢复、0/1/变更/RTL。检查当前改动及来源绑定，保存屏幕证据和未验证项；实测公共实现后交付可打开的组件页。没有相应设备时不声称Safari/VoiceOver/真实触摸或对比度已接受。
