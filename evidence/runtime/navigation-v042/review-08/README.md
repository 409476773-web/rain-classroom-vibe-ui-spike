# G1 review-08 · 平台导航展开过渡与 Avatar

2026-10-01两处用户浏览器批注授权。System Mode，R2局部Recipe：固定品牌DOM和几何锚点，以现有Motion/region=220ms与ease-out过渡位置、文字透明度及区域宽度；账户直接消费Avatar size32默认人物图。共享Sidebar/Avatar/全局Token保持不变。V05/D02：保持终态布局、可访问名称和点击行为，原生CSS连接两态，支持连续反向切换及reduced motion。

检查：展开/收起逐帧几何、文字节点保留、快速反向、减少动效、832/1157窗口、Avatar资源加载、原R2布局与独立消费者状态保留；Playground类型检查/构建。终态视觉仍待用户复审。

结果：4项浏览器检查和Playground类型检查/构建通过。回归检查在修改前因折叠态文字节点不存在而失败（before-check.log）；修改后通过。正常动效下展开/收起分别记录37/33帧，Logo总位移35px连续完成，本轮相邻采样最大位移约5.42px，文字节点保持同一实例；快速反向可恢复终态。减少动效时为0ms。Avatar使用标准32px默认人物图片，已确认资源加载，账户按钮名称和行为保留。原R2两种画板布局、范围/布局切换及独立消费者草稿保留检查通过。截图及逐帧事实见after，日志见browser-checks.log/build.log；这些记录不构成硬件FPS测量或用户视觉验收。

6项资产引用和源码摘要校验通过；10551个既有文件核对无缺失、无无关修改，冻结参照保持原摘要，状态仅更新navigationComponentsV042。见protection-and-registry.json。未新增全局动效规则或设计方法结论。
