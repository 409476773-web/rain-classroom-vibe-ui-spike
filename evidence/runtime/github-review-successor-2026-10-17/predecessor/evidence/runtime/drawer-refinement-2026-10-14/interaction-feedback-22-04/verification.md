# Drawer 22:04 交互反馈修复

用户请求：“有些地方的交互比较奇怪。请你先自我分析并修复”。截图对应8768的旧视觉状态稿，并非此前已实现的5397组件演示；两套入口未明确区分，使静态状态按钮被当成真实动作。这是本轮自查确认的主要原因。

旧稿复现：更多点击后不展开菜单；保存、关闭、放弃、下载只更新页脚；预览dirty关闭不进入确认。SVG文件实际存在，没有将空白原因写成缺文件。

## 修正

- 8768主入口改为独立真实组件消费页；直接复用TaskDraftDrawer和现有Base UI / Rain样式，不再维护另一套保存／焦点／退出控制器。
- 历史视觉稿保留为visual-gallery.html，业务控件只读，比较导航可用。
- 真实宿主中“继续编辑”只在从preview发起退出时返回edit，恢复editorSnap，保留草稿；AlertDialog.finalFocus指向恢复的预览入口。关闭确认图标／Escape仍回原预览，编辑页原取消恢复不变。
- 更多／下载缺少真实动作或文件，真实演示不展示。附件保留信息。
- 修复独立消费页CSS加载顺序，头部关闭／预览／展开保持右侧关系。

## 实际验证

新增“preview退出后继续编辑”测试先失败：找不到任务标题textbox；改动后通过。补“仅关闭退出确认仍停留preview”回归。当前任务测试8/8通过；Playground typecheck exit0；独立消费Vite build exit0，保留大chunk提示。日志位于根outputs/drawer-visual-proposals-2026-10-14/interaction-tests.log和interaction-build.log。

内置浏览器：默认关闭结束后焦点回触发按钮；dirty编辑→预览→关闭→继续编辑恢复草稿和编辑入口焦点；390×844中同一路径通过，放弃后恢复原任务／入口焦点；首次保存失败保留输入，pending期间Escape不关闭，修改后重试更新最新标题。独立审阅者也实际检查了preview确认取消和Escape原预览焦点，以及历史稿只读控件。未发现这些路径剩余阻断。

截图为原始JPEG：根outputs/drawer-visual-proposals-2026-10-14/interaction-mobile-current.jpg（390×844）和interaction-preview-current.jpg（常规尺寸）。临时视口恢复，测试产生的草稿放弃后回原示例。

## 来源与范围

source-bindings.json仅绑定本轮两个宿主文件；before快照逐个匹配此前Drawer封存record的after SHA。原Drawer来源证明、G6保留证明不回写，不重封或吸收并行Registry / phase / Carousel样板 / 指南差额。完整G6来源链仍未通过；本轮独立修复证据不冒充它通过。

共享Drawer、Foundations、依赖、Registry、Manifest、Figma、Git与发布未改。保存为页内mock，不连接课程服务或跨刷新存储。人工视觉、真实触摸／软键盘、Safari／VoiceOver仍未接受或验证。
