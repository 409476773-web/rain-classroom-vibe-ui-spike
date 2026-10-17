# Review11：平台导航与拖动边界收口

2026-10-04 北京时间；采集目录使用真实 UTC 时间 2026-10-03。本报告为本地候选运行时证据，待人工视觉评审。以前的 G1、阶段记录和失败证据均保留。

R1–R6、S1–S6 已统一到 R2 的控制器槽位与头部、导航项、账户及工具结构。浅色外框采用既有局部 `#e8edf8`，白色选中项与蓝色图标文字；深色外框采用既有局部 `#252d43`，白色品牌与半透明白色选中项。Gallery 的「深色外框」已对全部 R/S 样例可用，邻近说明为「轻品牌」。切换仅影响平台栏，业务内容与顶部恢复栏保持原来的浅色主题。

本 owner 改动 5 个生产文件：`platform-navigation.css`、`r2.tsx`、`r2.css`、`workspace-states.tsx`、`navigation-v042-page.tsx`。未改 `workspace-states.css`、Gallery CSS、共享组件、Foundation、默认 Token、Classic、布局 reducer 或其他 Recipe 内容。所有样例的业务注释修复由其 owner 另行登记；本证据矩阵锁定其最终源。

## 根因与修复

1. Review07 的 current/hover 映射将原稿的白色/半透明白色替换为蓝色填充和通用中性悬停色。R2 使用 Sidebar，其余样例使用 NavigationList，各自局部样式又分别控制图标、header、footer，造成视觉大小和排列差异。实际 before 的控制器槽宽均为 64/208；本轮未凭假设改成新轨道预算。统一 feature 私有别名和局部宿主样式后，实际槽位仍由控制器决定。
2. Gallery 原有深色开关只在 S 页面出现，R Recipe 未接收 inverse；R4 族深色样式还曾染到恢复栏。补齐 R 页显式 inverse 接线后，将主题限定到 global 平台槽。没有将整个工作区置为 dark。
3. 受预算影响的临时展开关闭后，偏好仍为 expanded，有效状态却为 compact。原「展开」动作根据偏好 TOGGLE，首次点击没有打开。消费者以临时状态/有效展开状态选择 DISMISS、TOGGLE 或携带 viewportWidth 的 SHOW。S 顶部原有 peek 语义已正确，保留不改。共享布局策略与 reducer 未改。
4. 全账户改为 native button 后，R1 原辅助按钮 28×28 规则意外命中账户。明确局部账户 `width:auto;height:auto`，恢复 Avatar32、原 copy 行高及 padding 支撑的 compact40/expanded44。工具尺寸保持完整 28/16 合同。展开账户在左、通知和帮助在右；DOM 顺序为账户→通知→帮助；收起视觉顺序为通知→帮助→账户。账户整块可聚焦，Enter 打开现有 Popover 或本地反馈。
5. 拖动边界原有常驻 paint 形成多条可见线。仅在这些样例宿主范围降低伪元素的默认 opacity，hover、active 与 focus-visible 时恢复。原 5/10px 命中面积、separator 角色、键盘操作与 focus ring 保留。

## 最终验证

正式浏览器测试 **19/19 通过**：12 个样例的两主题/两模式合同、4 个代表 splitter 的指针与键盘合同、3 个整账户键盘反馈合同。日志为 `formal-platform-closure-final.log`。

最终一次自然稳定矩阵为 `after-stable-final-2026-10-03T17-32-56-903Z/after-measurements.json`：**144 个组合、3606 个断言、0 失败、0 page/console error**。实际宽度与有效槽位状态稳定后，再等待三帧采集；此次截图没有复用。全部 11 个生产源的采集前后 hash 一致，交付时再核对当前源一致。

最终 **286 张原始 PNG**：142 个可见栏组合各有完整工作区及栏截图；R5/R6 在 1200-light-compact 按现有预算隐藏平台栏，分别保留完整工作区和可见恢复入口证据。两种主题的状态连续执行，数据记录 effective/temporary/forced 与请求模式，不将预算适配伪装为固定收起宽度。临时栏保留共享 1px overlay 边框，几何断言按真实盒模型校核。

R2 与其余栏的 footer 几何一致：expanded 账户 125×44、footer 187×57；compact 账户 36×40、footer 47×109；通知/帮助完整按钮 28×28，glyph16。普通槽位第一项 expanded x10/y69、compact x11.5/y98；临时 overlay 的额外边框单独记录。

定向拖动状态证据为 `splitter-states-2026-10-03T17-41-22-569Z/`：R2/R4/S3/S5 的正常、悬停、真实拖动、键盘聚焦和 ArrowRight 调整，共 20 张原始 PNG 与 24 份状态读数，0 错误/失败，源锁与最终矩阵完全相同。实际查看 S3 正常/拖动/聚焦截图，确认边界按状态出现。

## 原稿对照与差额

实际打开、操作冻结原稿的 100% 原尺寸模式，采集 1200/1440/1600 × 轻品牌/深色外框 × 收起/展开，共 12 个原稿组合、24 张原始截图。冻结 HTML hash 保持 `d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c`。

`comparisons-final/` 提供 1440 的四组 R2 原稿/候选栏并排图，无缩放或修饰。已实际查看浅色展开、深色收起、深色展开并排图，以及 R4 深色完整页、S5 浅色展开页；布局、白色 current、深色半透明 current 与浅色业务区可直接审核。

明确保留的组件合同差额：品牌采用既有固定 RainBrand `#1561F8`，选中 ink 采用已有 category `#0F55DF`；冻结 R2 为 logo RGB40/98/200、选中 ink RGB36/90/193。最新白选中要求令 compact-light current 使用白色100%，冻结 compact 为79%。保留现有官方 Rain/导航 glyph 与 Avatar32，未替换为原稿内嵌 glyph 或字首头像。采用已有完整 IconButton28/16 与 radius6，原稿 toggle30/radius7。永久展开只有收起控制，临时展开保留关闭入口与共享 overlay 边框。本轮不声称所有像素相同。

## 历史与证据可靠性

初始 before paint locator 曾匹配 `data-active=false` item，不能据此把 transparent 当作 current 真值；`before-paint-correction-2026-10-03T16-41-56-703Z` 已补实际 active row 测量，该批在 unified CSS 之前、owner 最小 header DOM 之后。最早 before 截图及根 source protection 均保持不变。

早期 after、17-15、17-27 批次和失败日志均是中间结果。失败包括图标 span 被过宽 selector 隐藏、首次强制收起恢复不打开、账户误受 28px 规则、采集未等真实宽度及临时边框断言遗漏。最终索引只选择 17-32 的新采集与 CSS `770f9968418ca6c8a3d7fe959da292e521b2ac3f09b11b672e3f4dad18b004b3`；没有将中间失败图复用成最终通过图。

统一入口为 `review-evidence-index.json`，记录每张交付图的路径、尺寸、SHA、全部源锁、正式日志和原稿差额。复现脚本位于证据目录 `scripts/`，属于采集证据，不新增生产 helper/module。人工视觉验收、完整辅助技术/对比度审计、公共发布、迁移、Figma、Git 提交仍不在此次 owner 的完成声明内。
