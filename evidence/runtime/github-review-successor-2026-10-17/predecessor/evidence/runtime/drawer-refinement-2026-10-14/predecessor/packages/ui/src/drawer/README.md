# Drawer

基于固定 shadcn Base UI Drawer（MIT）与已安装 Base UI 1.8.0，保留四方向、手势、吸附点、嵌套、受控打开和三种 modal。公开 Parts：Drawer、Trigger、Portal、Overlay、SwipeHandle、Content、Header、Footer、Title、Description、Close。

Content 组合现成 Portal/Viewport/Popup/Content；body 使用宿主普通滚动布局。Root 接原引擎 Props，Content 接 Popup 的完整 props/ref/render，className/style 支持原来的状态回调。关闭拦截通过 onOpenChange 的 details.cancel()，业务草稿和保存由宿主维护。

颜色、字体、圆角、间距绑定 Rain；源码运动时序、吸附/stack 变量保留为局部参数。层叠接 Rain 的浮层30/31，使既有菜单/提示40能够在抽屉内显示；这是明确的来源差额。遮罩采用 Rain focus，与 modality 分开；父主题/密度及 DOM dir 带入 Portal。reduced-motion 停用非必要过渡。

纵向默认内容高度，最多100dvh−6rem；有 snap 时按原引擎预留视口高度。侧向默认75%，≥640px为24rem，宿主可通过 Content className/style 改布局。iOS 来源的绝对定位遮罩需要宿主 body position:relative；键盘/真实触摸与Safari独立验证。需要虚拟键盘管理时可组合已安装 Base UI VirtualKeyboardProvider，不写另一个视口引擎。

来源：evidence/runtime/g6-preflight-2026-10-14/source-lock.json；详细制作规格：docs/research/2026-10-14-g6-component-research.md。当前共享候选，人工视觉/对比度验收与发布另记。
