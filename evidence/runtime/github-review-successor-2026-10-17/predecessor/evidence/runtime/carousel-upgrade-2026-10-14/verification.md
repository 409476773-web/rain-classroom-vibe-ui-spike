# Carousel v0.4 公共升级验证记录

状态：公共Carousel有限实现及独立技术审阅完成。原型v0.4的用户接受仅作为设计来源，不等同于公共实现、对比度或发布接受。当前工作区存在独立Drawer/Conversation并行增量，全G6与全库通过不在本记录结论内。

## 已建立的有限合同

- 当前源码范围由 `scripts/carousel-upgrade-governance.mjs` 的33项明确清单约束。29项按整文件绑定；共享 `g6-interaction-pages.tsx` 仅绑定Carousel控件import、examples import、Material/CarouselPage区域三个片段，after SHA 表示原G6兄弟源码加本轮Carousel片段的规范投影，不表示整个当前共享文件已被接受。Registry仅投影唯一Carousel条目与AutoScroll依赖，阶段仅投影根carouselUpgrade块，AI指南仅投影Carousel表格行/布局句/后续章节；其他兄弟内容仍交原G6验证。原 G6 baseline、source-bindings、颜色账本和 hash 常量不变。
- 原 G6 验证仅逆投影已验证的Carousel片段；当前Drawer剩余字节保留供旧G6检查。共享 CSS 与共享测试文件的当前差异属于Drawer，不在Carousel范围；不会被本轮颜色登记跳过或声明已验证。
- Manifest / Registry / README / AI消费指南登记 Controls、Indicators、PlaybackControl、真实停靠点、统一暂停规则、36/20 控件及局部灰度候选。
- 依赖仅新增 embla-carousel-auto-scroll 8.5.2，lock 的三个明确新增块及 core 8.5.2 分辨率均检查；其他依赖、Registry资产和旧阶段Gate不得改变。
- 灰色Focus为本轮确认的 Carousel 根内控件配方；宽度/offset使用既有Focus Token，不改变全局Focus。
- 五个已接受本地原型来源SHA留在 `design-lineage.json`，公共实现不修改这些来源。媒体Artwork保留独立媒体身份，固定颜料不成为UI色板。

## 当前声明配对测量

以下为实际去色后颜色的声明配对计算，非媒体截图或人工对比度接受：

| 主题 | Default | Hover | Pressed |
| --- | ---: | ---: | ---: |
| Light | 3.345 | 5.634 | 5.153 |
| Dark | 4.249 | 6.787 | 5.878 |

六组 meaningful-icon 配对均达到3:1。历史名 control-white 实际取 Background/Neutral/1 的绿色通道去色，Light保持白色，Dark使用中性深底。透明覆盖控件依赖实际媒体，仍保留未验证观察；无任何对比度例外被接受。

## 已运行的治理回归

- `scripts/carousel-upgrade-governance.test.ts`：9项，包含精确依赖/lock/Registry/阶段授权与共享片段归属；Carousel处于最后refinement/下一root/EOF及含冒号注释时生命周期仍完整绑定。
- `scripts/carousel-color-consumers.test.ts`：4项，包含真实当前CSS派生颜色和6组控件配对。
- `scripts/carousel-upgrade-source.test.ts`：1项，临时历史夹具验证完整G6→Carousel→Slider phase逆投影；Carousel源码、旧证据、接受稿、Drawer源码/共享TSX/共享CSS/共享测试/Registry/阶段/指南漂移及范围扩张必须失败。夹具只在临时目录还原兄弟旧源码，不修改工作区。
- 2026-10-14 17:51，本轮3文件14项全部通过，见 `governance-tests.log`；test TypeScript检查exit 0，见 `tests-typecheck.log`。完成字段与实际封存后的14项重跑仍全通过，见 `governance-tests-after-binding.log`。新增测试的3处推断类型错误已修，原失败日志单独保留为 `tests-typecheck.before-governance-fix.log`。

## 组件与工作区验证边界

- Carousel核心及升级测试38项通过，见 `component-tests.log`。最终合并6文件59项中57项通过，另2项失败是当前并行Drawer共享页面测试的重复“编辑课前任务”查询，见 `final-tests.log`；本轮不改写该兄弟测试或声明其通过。
- 最终封存后独立重跑：核心及治理5文件52项全部通过（`final-scoped-tests.log`）；共享页面仅筛选Carousel的3项全部通过，其余4项明确跳过（`playground-carousel-tests.log`）。本轮合计55项目标检查通过，不等同于全库或共享Drawer测试通过。
- UI类型检查、Playground构建通过，见 `ui-typecheck.log`、`playground-build.log`；test类型检查按上文修复后通过。
- 独立审阅已闭合自动连续播放stop重入、resolved active/breakpoints、overlay播放按钮点击，以及治理共享归属、Slider阶段传递、phase最后节点/带冒号注释边界。控件灰色Focus/主题halo仍是本轮局部候选。
- 资产索引使用现有官方renderer只重算Carousel行，其余行与说明保留原G6字节。共享Registry只绑定Carousel行与本轮依赖，不吸收DrawerBody登记。
- 实际封存与有限独立验证exit 0：33项来源、58处paint、8个局部颜色候选，见 `binding.log`、`source-bindings.json`、`color-consumers.json`、`scoped-governance.json`。原G6验证exit 1，首个残差是Conversation CSS；只读快照列出13项并行残差（含共享片段逆投影后的Drawer记录），见 `parallel-residual-observation.json`、`original-g6-verification.log`。全量资产索引校验exit 1，仅Drawer行待其独立更新，见 `global-asset-index.log`。这些失败均未重签为通过；不能将本轮独立Carousel验证解释为完整G6或全库验证通过。
- Safari / VoiceOver / 真实触摸、媒体覆盖对比度、发布、Figma、生产采用和Git操作各自边界保留。

## 公共浏览器现场复核

- 公共实现入口为 `http://127.0.0.1:5196/#carousel`。观察记录与原始位移在 `browser-checks.json`；确认稿来源与公共实现分别登记，没有用旧原型播放结果替代当前公共实现检查。
- 在1280px和390px检查精选、多卡、纵向场景的顶部、底部、左侧、右侧覆盖布局；条厚4px、条间隙6px、胶囊两端15px、圆形箭头36px符合本轮视觉稿。初次390px多卡两侧胶囊越过封面进入文字，改为204px媒体最小高度后两组复核通过；初次失败观察与修后观察均保留。
- 短条直接定位、非循环末端按钮保焦点并阻止点击/方向键导航、inline与overlay切换保留当前位置已现场复核。鼠标真实拖动从精选第1项到第2项；第2项专题预览打开后关闭，焦点返回该项“查看专题”。
- 连续展示设置36px/秒：横向正播两次采样约35.99px/秒，纵向反播约36.00px/秒。暂停/继续使用公共状态；定时3秒正向与反向均实际翻页，手动箭头接管后离开轮播仍保持暂停与当前位置。悬停、后台/视口、减弱动效及非循环边界的精确计时另由真实引擎组件回归覆盖。
- 保存最终稳定宽屏浅色、宽屏深色与390px浅色截图：`03-final-desktop-light.png`、`04-final-desktop-dark.png`、`05-final-narrow-light.png`。截图与现场复核不构成人工接受或全背景对比度接受。临时视口覆盖已恢复，公共预览保持可打开。

`humanGate=awaiting_human`、`contrastAcceptance=not-granted`、`publication=unpublished`。
