# Tooltip 继承 Rain Classic

用户明确授权：以已核对的旧 Vue Tooltip 视觉与功能为参考建设当前组件，替换本页；缺少固定 #2F3545 时可补入 Token。继续使用 card-v2 工作区。

System Mode：新增可复用 Tooltip 候选、精确 Token、Manifest/Registry 与验证；Prototype Mode：替换 G1 续批提示。新 Human Gate 待确认，不发布、不写 Figma、不修改旧 Vue 库。Resizable 保留 2px 与较浅握柄，不修改。

设计已确认：固定 #2F3545/白字，PingFang SC 14/20、Regular，左右16/上下7、圆角6、最大250、14×6三角箭头，无边框/阴影。V04 保持就近解释的阅读层级；V05 保留真实触发元素、事件、焦点和实例隔离。Figma 1749:85201 与原稿 1:5214 已在本会话实时只读核对。

直接复用现有 Base UI 1.8.0 Tooltip 及 Popup 主题/密度桥，不另写定位/计时引擎。React API 为 text + 单个真实触发元素，支持12 placement、默认100ms hover开关延迟、焦点立即打开、Escape/Tab/Blur关闭、hover内容保持、受控/非受控、disabled/空文本抑制、箭头开关、可选Portal/目标容器。点击不固定；富内容走Popover。

步骤：1. 保留基线，增加最小失败检查。2. 建设共享组件与Token、替换局部入口并补齐示例。3. 类型/构建、定位与行为/颜色/实例浏览器检查；独立复核与真实截图；更新发现入口和阶段记录。

待验证：旧Vue视觉在Base UI定位和箭头几何中的一致性、Dialog内Portal、本地挂载、动态禁用及受控内容更新、窄屏与forced-colors。原全库治理遗留问题单独保留，不能以本批通过替代。

用户补充：默认出现在下方，空间不足时才考虑其他方位。目的是保持从上到下、从左到右的阅读通畅与一致性。V04 的阅读连续性落实为共享默认 bottom，保留引擎碰撞回退与显式方位选项；新增浏览器实测默认下方、压缩下方空间翻转、空间恢复回下方。

2026-09-20 用户“确定。”：登记当前 Tooltip 视觉与默认下方交互为 accepted。状态同步、授权边界检查与索引再生成采用 System Mode；本次不改运行实现。确认范围见 evidence/runtime/tooltip-classic/verification.md。
