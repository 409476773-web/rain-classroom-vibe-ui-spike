# Breadcrumb · 2026-09-24

用户明确“确定。开始建设”，授权按已确认设计完善单档共享候选。工作目录 `.worktrees/card-v2`，分支 `codex/card-v2`，起点 `321e1a0`；原工作区已有大量修改，本轮不提交或整理无关内容。

## 范围与依据

Figma `MbWg1ft5zk1JRQiQ6dS30e / 1:16351`，已读取截图和节点上下文；正文实际为13px/18px，尽管变体名含size12。保留原稿冷蓝灰、400字重、深色当前页、斜线和22px视觉底，操作高度扩大为24px。复用既有 DropdownMenu / Tooltip 及正式 ArrowDown / MoreHorizontal 图标；不修改它们的实现，不新增依赖或 Token。

六组 Playground 示例涵盖真实导航、整项同级菜单、普通/禁用/当前身份、长名称、深路径和窄页头。URL 参数可刷新，宿主切换分支时重建路径并聚焦内容标题。复合 API 的既有 G3 调用保持兼容。

## 检查记录

- TDD：新增行为在实现前4项全部失败；完成实现后 Breadcrumb 4/4通过。
- 定向回归：Breadcrumb、DropdownMenu、Tooltip、原 G3 页面及导航重建 TopNavigation，共5文件26项通过。
- UI 类型检查、Playground 类型检查和构建、Prototype 类型检查通过；构建仍提示既有大体积 chunk，未扩展到打包优化。
- 真实 Chromium：专项2项端到端用例通过，覆盖整项文字/箭头统一开关、选中/禁用菜单项、方向键/Escape/Enter、导航及刷新、内容焦点、实际截断和键盘提示、菜单与Tooltip互斥、三种折叠模式、宽度变化时焦点保留、交互颜色和320/390px页面无横向溢出。
- 首轮本地服务及浏览器启动受沙盒系统权限限制；经工具授权后成功执行。不是组件运行失败。
- 测试中程序化 focus 在鼠标输入后不触发 Tooltip，修正为真实 Tab 键盘输入验证；保留共享组件的焦点可见性行为。
- 桌面和窄屏截图人工查看：文字层级、单行路径、整项箭头、页头操作、长名称均已检查。去除文档页继承的网格背景，使正文和组件更易比对。

最终检查的日志与事实见本目录；截图：`desktop.png`、`narrow.png`、`menu.png`。`browser-facts.json`记录实际字体栈、尺寸、正文颜色及浅色背景对比度；该有限场景测量不代表全状态或全库对比度验收。

## 独立审阅

按 requesting-code-review 技能进行只读审阅，发现并修复：

1. 省略按钮在变宽后卸载时丢失焦点：现在转移至有效祖先入口；缩窄隐藏聚焦祖先时转移至省略按钮。
2. 示例宿主键盘切换同级后焦点丢至body：现在转移至更新后的内容标题。
3. 仅含禁用或无href备选时仍显示箭头：现在要求存在其他可导航目标。

审阅者完成浏览器与定向单测复核，本次范围无剩余阻断问题。

## 状态与边界

- implementation: completed
- automatedVerification: scoped-passed
- independentReview: passed-after-corrections
- humanGate: accepted
- humanGateScope: breadcrumb-single-size-whole-item-menu-runtime-visual-only
- contrastAcceptance: not-granted
- publication: unpublished

`before/`为本轮相关既有文件快照；`protected-before.json`记录Foundation、DropdownMenu、Tooltip、锁文件及两处原G3调用的哈希。核对结果见 `protected-after.json`：Foundation、DropdownMenu、Tooltip、锁文件及原G3页面均未变。重建页 `rebuild/page.tsx` 在执行期间发生外部变更；本任务没有编辑或覆盖该文件，最终类型与定向回归使用其当前状态。没有Figma写入、公共Registry发布、Git提交或推送。全工作区完整测试和全量浏览器回归未运行；本轮结论限于上述定向检查。

设计方法V04/V05/D05已按设计基线应用，经验仍留在当前组件合同；用户已确认本轮运行视觉；整项触发的适用边界补充至设计方法 V05，不推广为所有面包屑的通用默认。

## 用户运行反馈 · 整项下拉

用户提供默认态与设计稿Hover截图，要求文字和箭头共同组成下拉按钮。此反馈替代最初双入口方案：统一背景与焦点，文字点击切换菜单，本层跳转放在菜单中。新增 `whole-item-hover.png` 作为本轮视觉对照；整项点击与关闭已加入浏览器回归。

最终补充：整项方案更新后，26项定向单测、2项浏览器回归、UI/Prototype类型检查与Playground构建均通过。独立审阅者连续5次检查长名称提示→点击整项→菜单出现的完整流程，均通过。曾出现热更新阶段用例失败，稳定源码后的正式回归已通过；不将热更新推断记为已证明根因。

全库治理检查未通过：冻结历史状态、历史脚本集、其他组件授权名单及缺失 `ui-command` Registry 等问题仍存在；详见三份 `governance-*.log`。历史冻结检查对本轮前快照同样失败，见 `governance-baseline.json`。这些结果未记为本轮通过，也未借本任务修改其他组件或放宽治理脚本。

## 用户视觉验收 · 2026-09-24

用户原话：“确定。视觉完成验收”。验收范围为本轮单档13px面包屑的运行视觉，包含已修正的文字与箭头整项展开/收起、统一Hover，以及本轮六组样例。Manifest、本地Registry与阶段记录同步设为 accepted。此次登记不改变已有自动验证结果，也不授予独立的对比度、发布、迁移、Figma或Git权限。
