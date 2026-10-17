# Drawer

基于固定 shadcn Base UI Drawer（MIT）与已安装 Base UI 1.8.0，保留四方向、手势、吸附点、嵌套、受控打开和三种 modal。公开 Parts：Drawer、Trigger、Portal、Overlay、SwipeHandle、Content、Header、Body、Footer、Title、Description、Close。

Content 组合现成 Portal/Viewport/Popup/Content；DrawerBody 是转发 ref、原生 div 属性与 onScroll 的独立滚动区域，与 Header/Footer 同级组合。Root 接原引擎 Props，Content 接 Popup 的完整 props/ref/render，className/style 支持原来的状态回调。关闭拦截通过 onOpenChange 的 details.cancel()，业务草稿和保存由宿主维护。

颜色、字体、圆角、间距绑定 Rain；源码运动时序、吸附/stack 变量保留为局部参数。层叠接 Rain 的浮层30/31，使既有菜单/提示40能够在抽屉内显示；这是明确的来源差额。遮罩采用 Rain focus，与 modality 分开；父主题/密度及 DOM dir 带入 Portal。reduced-motion 停用非必要过渡。

纵向默认内容高度，最多100dvh−24px，宽度min(100%,680px)并贴边居中；680px仅为本组件几何，不是Foundation Token。有 snap 时按原引擎预留视口高度，在公共配方扣除可见偏移与可选24px把手区域；up可见内容对齐Popup底端。Header/Body/Footer横向桌面24px、窄屏16px，标题左对齐，Body min-height:0、overflow:auto。纵向把手40×4，横向4×40；Header/Footer不承担业务状态。侧向默认75%，≥640px为24rem，宿主可通过 Content className/style 改布局。iOS 来源的绝对定位遮罩需要宿主 body position:relative；键盘/真实触摸与Safari独立验证。需要虚拟键盘管理时可组合已安装 Base UI VirtualKeyboardProvider，不写另一个视口引擎。

Base UI 1.8的`data-base-ui-swipe-ignore`按属性存在忽略整个区域，不解析x/y轴值。可在输入/阅读正文区域设置该属性，保留Header/把手作为拖动入口；应在实际设备验证滚动仲裁。受控snapPoint在同一Root中保持受控，不切成undefined。切换snap模式时只重建内部Backdrop以重置源引擎残留的progress，保持Popup、草稿与单层预览。

普通关闭放在Header右上角，通过DrawerClose组合既有36/20 IconButton与CloseIcon，提供明确的aria-label。Footer只放当前任务操作，不放占满一行的普通“关闭”按钮。

当前Web主场景为`g6-task-details-drawer.tsx/.css`：任务列表展开右侧详情，显式选择`swipeDirection="right"`和`disablePointerDismissal`。桌面`modal={false}`，列表保持可操作；≤768px通栏时使用现有模态焦点管理，避免焦点落到被覆盖的列表。列表入口及中性色文字按钮前一项/后一项更新同一个面板；详情只读，首尾导航禁用，关闭后返回当前任务入口。四方向与模态能力在独立基础示例中保留，不将本页方向选择改为公共默认。

桌面详情默认480px，有效下限360px。私有`g6-drawer-width-control.tsx/.css`组合既有Rain Resizable：左边缘拖动或左右方向键连续调宽，Home/End到边界；根据列表真实左边界，保留280px列表及24px间隔，详情最多960px，默认宽度同时受此上限约束。头部“加宽／标准宽度”与边缘控制器共用同一约束；实际像素尺寸由Resizable回传。任务切换保留宽度，重新打开恢复默认；此右侧示例不显示顶部手势柄，正文及表格不承担关闭手势。调宽层使用30层级，后打开的编辑Dialog覆盖它；仅把手使用局部col-resize，卸载不遗留全局cursor。

任务要求、表格行数、容器宽度分别控制：“展开完整要求／收起要求”只改变正文与清单；“查看全部8组／返回3组预览”只改变完成明细。8列表格保留原生横向滚动及键盘操作，溢出时显示滚动说明与边缘渐隐；宽版优先增加表格空间，属性和正文限制阅读宽度。整行均为同一个可聚焦的查看按钮；重复点击当前项不重置阅读，返回任务恢复其正文范围、表格范围与滚动位置。≤768px从右侧展开全宽详情，收起调宽控制器、保留内容展开与前后导航；若控制器正持有焦点，进入窄屏前交还关闭按钮。纵向分段高度仍由公共Drawer的snapPoints/snapPoint承载，本轮调宽仅是页面私有组合。

单项课前任务编辑改为现有Dialog，在历史命名文件`g6-task-drawer.tsx/.css`中导出`TaskDraftDialog`：FormItem/Input/Textarea与两项RadioGroup、同层预览、AlertDialog未保存确认、显式校验、500ms本地保存和首次失败重试。全部关闭入口在pending时取消请求；宿主保留提交快照与草稿。≤400px高屏幕使用整个表单滚动以保证操作可达。附件没有实际文件或伪下载动作。两种容器均可承载业务内容，当前示例分别表达集中编辑与列表连续查看；长内容、遮罩或保存能力不是选型分界。

原升级来源、检查和限制见`evidence/runtime/drawer-refinement-2026-10-14/verification.md`；弹窗编辑与右侧详情增量见同目录`dialog-and-task-details/verification.md`；中性色导航、连续调宽及预览范围增量见`width-and-preview-feedback/verification.md`。原G6来源与证据封存；本轮独立检查不等于跨家族后继治理通过。此前确认仅覆盖视觉方案，新运行版本仍待人工视觉确认。

来源：evidence/runtime/g6-preflight-2026-10-14/source-lock.json；详细制作规格：docs/research/2026-10-14-g6-component-research.md。当前共享候选，人工视觉/对比度验收与发布另记。
