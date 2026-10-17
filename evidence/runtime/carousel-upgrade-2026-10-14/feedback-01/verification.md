# Carousel 公共预览视觉反馈 · 2026-10-14

用户指出公共预览与已确认视觉稿存在差异，尤其是按钮与短条的摆放。本轮延续已授权公共升级，使用只读carousel-study v0.4校正公共控件和局部示例。工作区：card-v2，System Mode。

独立布局的导航恢复在标题右侧相邻排列，连续展示的导航位于页脚；独立短条在四个方向围绕展示轨道。播放按钮默认恢复36px高、16px图标及“暂停播放／继续播放”文字，showLabel=false保留紧凑图标形式。覆盖箭头恢复8%轻阴影，纵向下箭头与底部短条恢复32px／28px偏移；短条保持4px厚、6px间距，胶囊端距15px。

同时校正控件依赖的媒体锚点：连续卡片实际宽度288px、间距20px；窄屏水平箭头内距12px；纵向左侧胶囊以192px插画的96px中线定位。多卡覆盖控件读取实际封面节点与停靠点，观察器对称清理，运动继续由公共Embla实例管理。

限定代码复核发现默认文字播放按钮对aria-disabled=true未阻挡点击。布尔true与字符串true两项真实组件回归先失败，再由共享点击处理器在宿主回调前阻挡，修复后通过。本轮其它导航、焦点、布局组合与观察器清理没有未关闭的P1/P2发现。

验证结果：

- Carousel核心与升级、颜色消费三文件46项通过；包含新增禁用行为的两项回归。见component-and-color-tests.log、disabled-red.log。
- 公共页面Carousel相关3项通过；另外4项Drawer／OTP场景按筛选范围跳过，不计入本轮通过数。见playground-tests.log。
- UI类型、测试类型及Playground类型／构建通过。构建保留已有大资源包体提示，未把它当作Carousel失败。
- 1280px与390px，各对照精选、多卡、纵向的独立／覆盖与四向短条，共48组同宽布局记录，页面横向溢出为0。当前有效对照只使用layout-comparisons.json的finalPairs；初期HMR与混合宽度观察保留为过程记录。
- 现场点击下一项得到02 / 04，短条返回01 / 04；36px带文字播放入口可启动定时播放，0→3的实际停靠位置变化已记录，点击暂停后状态为paused且文字为继续播放。见browser-checks.json。
- node scripts/verify-carousel-visual-feedback.mjs exit 0，绑定12个完整或有限投影来源、63处颜色消费。已确认原型五项源码与初次公共Carousel四项封存记录保持字节不变。

预览：http://127.0.0.1:5196/#carousel。最终截图：01-final-desktop-inline.png、02-final-desktop-overlay.png、03-final-narrow-inline.png。临时宽窄屏对照页已关闭，浏览器尺寸恢复默认。最终页面保留独立布局、底部短条，便于用户继续检查。

验收边界：本轮公共视觉反馈仍为humanGate=awaiting_human、contrastAcceptance=not-granted、publication=unpublished。六组播放文字颜色配对计算记录在独立color-consumers.json，不能代替媒体覆盖时的实景对比度接受；未补作Safari、VoiceOver或真实触摸验证。没有Git提交、发布或Figma写入。

初次公共Carousel的33项source-bindings.json、颜色账本、设计谱系与治理模块未重签。此反馈使用新source-bindings.json与有限入口验证，不能用它宣称原G6或全库当前态通过。Drawer／Conversation及其证据由各自拥有者继续维护；基线中的Drawer两项SHA仅记录当时观察，不在本轮冻结其后继工作。将来接入共享治理须把本反馈作为后继投影处理，不能修改历史证据以绕过源码变化。
