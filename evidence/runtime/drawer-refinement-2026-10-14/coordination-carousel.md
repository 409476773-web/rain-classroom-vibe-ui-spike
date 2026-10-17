# Carousel 共享接入协调

2026-10-14（Asia/Shanghai）· **ready：Carousel 已完成有限封存，Drawer 后继可接入。**

本轮公共实现完成；55项目标检查、UI/test类型与Playground构建通过。`node scripts/verify-carousel-upgrade.mjs` exit 0。人工、对比度接受、发布状态仍为 awaiting_human / not-granted / unpublished。

- 阶段入口：`componentRefinements.carouselUpgrade`。
- 来源记录：`evidence/runtime/carousel-upgrade-2026-10-14/source-bindings.json`。
- 校验入口：`scripts/verify-carousel-upgrade.mjs`。
- sourceSeal：`318e18504ddd92093df592490fcf46d8e6e05569f589c3de33ad68bd9c495abe`。
- moduleHash：`b89f99f7651fa5acfb6759b67a82b5104b2bc692c30606cceaab9c5109649f71`。

33项来源包含29个完整文件与4个局部投影。共享 `g6-interaction-pages.tsx`、Registry、AI指南、阶段的 partial mode after SHA 是规范投影 SHA，不能当作整个live文件SHA。继任治理应使用 `carouselBindingBytes` / `carouselProjectedPredecessor`，先验证Carousel合同，再只逆投影本轮Carousel片段，将剩余兄弟字节交各自合同检查。保持已封存Carousel源码、示例和有限治理模块不变；共享Drawer部分可由其拥有者继续维护。

当前Drawer core、TaskDraftDrawer、DrawerBody/Registry条目、共享CSS/test及Drawer证据仍由Drawer拥有者维护；本轮未回滚或吸收这些并行变化。原G6与全量索引仍保留Conversation/Drawer残差，不能用独立Carousel通过替代整体通过。观察见 `evidence/runtime/carousel-upgrade-2026-10-14/parallel-residual-observation.json`；合并共享页面测试另有2条Drawer重复查询失败，原始记录在同目录 `final-tests.log`。

2026-10-14 补充：用户随后指出按钮和短条摆放与确认稿存在差异，当前live已有独立视觉反馈后继。该后继校正Carousel控件、五例局部与合同，不改初次公共Carousel的四项封存记录及确认稿五项源码，也不修改Drawer实现或其来源合同。

- 当前有限入口：`node scripts/verify-carousel-visual-feedback.mjs`，exit 0；12项来源、63处颜色消费，46项组件／颜色检查及3项Carousel页面检查通过，类型与构建通过。
- 当前阶段：`componentRefinements.carouselVisualFeedback`。
- 当前来源：`evidence/runtime/carousel-upgrade-2026-10-14/feedback-01/source-bindings.json`；说明与截图在同目录。
- 当前sourceSeal：`54aefc7db73cefe616a3152847a07c190602c2dd1ba5060a256962424fa87a5a`。
- 当前moduleHash：`2936dc2186589ef8429529e94b575ae77a58977b944052f2e53bc40253f30210`。

上方33项封存及seal属于初次公共升级的历史边界；对当前字节进行完整共享治理时，须显式处理此视觉反馈后继，再交回旧Carousel／Drawer合同。此反馈的局部投影仅覆盖CarouselPage、Carousel指南章节与carouselVisualFeedback阶段，保留兄弟任务的live变化。不要重签旧证据或据此宣称全G6通过。当前人工、对比度、发布状态仍为awaiting_human／not-granted／unpublished。

2026-10-14 收尾补充：用户已明确接受当前公共Carousel预览的视觉与交互。当前入口为`node scripts/verify-carousel-closeout.mjs`，来源在`evidence/runtime/carousel-closeout-2026-10-14/source-bindings.json`，接受记录在同目录manual-acceptance.json；当前阶段为carouselCloseout。9个运行源码保持接受时SHA，8项原Carousel证据／治理源码保持原始字节。Manifest与Registry只更新Carousel接受信息，共享文档、索引、阶段均使用有限投影。当前Human Gate为accepted（仅当前公共预览视觉与交互），对比度仍not-granted，仍未发布。上方awaiting_human描述保留其历史时点。

后续完整共享治理应先验证并恢复本次收尾的有限元数据差额，再交回视觉反馈与旧Carousel／Drawer合同；本次不修改Drawer实现、其证据或全G6门禁。
