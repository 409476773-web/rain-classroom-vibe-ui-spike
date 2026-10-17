# Carousel 公共组件收尾 · 2026-10-14

用户确认：“确定，当前 Carousel 的视觉和交互检查通过，继续完成该组件的收尾。”逐字记录在manual-acceptance.json。接受范围是当前公共Carousel预览的视觉与交互，预览地址为http://127.0.0.1:5196/#carousel。

本轮在card-v2完成System Mode记录收尾。Manifest根与verification的humanGate更新为accepted；Registry仅Carousel单项登记接受范围与后继来源；README、Carousel AI指南、目录单行同步接受信息；新增componentRefinements.carouselCloseout阶段。原carouselUpgrade和carouselVisualFeedback阶段保留当时状态，不重写历史授权或验收。

9项当前完整／有限投影来源记录在source-bindings.json。9个运行文件（共享实现、播放调度、样式、相关测试和三项示例源）保持接受时SHA不变；共享CarouselPage由原反馈的局部绑定继续验证。初次公共升级与视觉反馈的8项证据／治理源码保持原始字节，确认稿五项源码由原反馈入口继续核验。当前入口是node scripts/verify-carousel-closeout.mjs；它验证精确记录差额，并在临时来源副本恢复旧元数据后调用原反馈验证，未改live源码或原证据。

本轮检查：

- Carousel核心12项、升级30项、颜色消费4项：46项通过。见component-tests.log。
- 公共页面Carousel相关3项通过，另外4项Drawer／OTP场景按本轮范围跳过。见page-tests.log。
- 收尾治理4项通过，覆盖当前接受与旧证据衔接、接受后运行源码变化、扩大对比度／接受范围、重写历史证据等拒绝路径。见governance-tests.log。
- UI类型、测试类型及Playground类型／构建通过。已有大资源包体提示保留；没有新增Carousel运行变更。见checks.json、tests-typecheck.log、playground-build.log。
- 有限源码入口通过，见source-verification.json。相关测试合计53项通过；未声称整份G6测试、全量索引或全库门禁通过。

本次不重复或替代用户的视觉检查，也没有追加截图；先前48组宽窄布局对照与现场播放记录仍在carousel-upgrade-2026-10-14/feedback-01。此接受没有自动补上Safari、VoiceOver、真实触摸、媒体覆盖对比度或生产采用的证据。

组件仍为registry-candidate、未发布，contrastAcceptance仍为not-granted。未执行Git提交、推送、Figma写入、发布或业务迁移。其它组件及全G6门禁保持各自状态。

后续共享治理应先验证carouselCloseout，再恢复本轮有限元数据投影交回视觉反馈和早期Carousel／Drawer合同；不能重签旧源码绑定来掩盖变化。本轮当前接受由新阶段和当前Manifest表达，早期awaiting_human记录表示其历史时点。
