# G2 review09 · R1–R6 / S1–S6 自查修复

2026-10-03 用户明确要求检查并优化全部12个R/S页面，最新截图为R3单图标平台导航。本轮修复已落到对应组件或局部Recipe；此前Review07/08及G1验收保留，G2仍待人工视觉评审。

| 范围 | 复现问题与修复 |
|---|---|
| R1/R3及S1/S2单图标平台 | 原18px图标顶在40px目标上沿，偏离中心11px；功能内规则使其居中。展开与收起仍用同一图标尺寸。 |
| 共用NavigationList单图标入口 | 原生灰色title提示缺少统一外观和键盘呈现；复用已有Tooltip，右侧portal，支持悬停、聚焦、Escape。展开截断文字的title保留。 |
| R2平台／内容过滤 | compact Sidebar缺少图标提示，局部复用Tooltip；手写radio按钮不响应上下键，改消费已有SegmentedControl/RadioGroup，保留32px轨道／26px选项。 |
| R3文件列表 | 勾选只有复选框变化；整行补现有主题Token的selected及hover反馈。打开文件、过滤后恢复、列表／网格切换均保留选择。 |
| R4及S4互动／批改 | 搜索空态原有通用提示改为明确小组／学生情境；批改队列硬编码6人改为匹配／总数。复用ObjectNavigator.emptyLabel。 |
| R6及S3工作区搜索 | 全零匹配出现三个重复提示与空栏目；复用既有Empty文本呈现一次，部分匹配隐藏没有结果的组及标题，清除搜索恢复。 |
| S1/S2/S6顶部恢复条 | 专业目标、知识节点、回放事件与时间变化后标题仍旧；统一消费R正文的实际identity回调。 |
| S5文档入口 | 版本记录／通知／帮助点击无反应；增加明确本地演示反馈，保持文档草稿。 |
| S1–S6恢复默认 | 悬停预览开关开启后恢复默认仍保持开启；局部恢复处理同时重置开关，与认可原稿默认一致。 |
| R1/R3、R5/R6、S5颜色职责 | 主要表面、文字、分隔和选中状态消费已有Category/Semantic Token；保留布局几何、业务数据、图示及既有Light/Dark边界。 |

方法记录遵循V04/V05/D05：实际检查默认、展开／收起、hover/current、键盘、搜索过滤、布局恢复、草稿、长内容、窄画板与短窗口。使用Existing Variant和功能内别名，不新增Token或组件尺寸。画板仍采用既有1200/1440/1600规则；1176×771批注是浏览器上下文，不新增专属断点。既有手动激活Tabs使用方向键移动焦点、Enter选择，属于正常合同，未误改成自动激活。

复制消费新增显式既有Tooltip、SegmentedControl、Empty依赖；接受组件本身的源码和Gate保持。本轮只更新导航候选的当前源码锁，历史G1 sourceSnapshot和Review08证据不回写。原稿版本0.4.2-style.1、SHA256 d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c未变；各owner分别记录原稿操作范围。

本轮最终技术验证见review-evidence-index.json。浏览器测试中的初次失败包含实际修前回归，以及定位/预期错误；保留失败日志并区分两类，不作为未修产品缺陷。完整测试项目类型检查的既有7项诊断单独记录。Safari/Firefox、VoiceOver、完整对比度、真实业务服务、G2/G3人工验收与发布仍独立。

[当前预览](http://127.0.0.1:5198/?sample=R3#navigation-v042) · [逐页审计证据](review-evidence-index.json)


最终技术检查：117项组件检查／10文件通过；115个浏览器case中113合同最终通过、2个截图专用case跳过。整轮首次110通过／3失败：两处临时展开区域被检查脚本误当单图标、R2原生sr-only输入被脚本直接点击；校正实际呈现判定与label目标后3项单独重验通过，production不为这三处修改。Playground类型检查／构建通过；完整测试类型项目仅保留7项既有诊断。四Registry／10候选Manifest、67当前源哈希、14/9/4/4本地与登记依赖复制闭包通过；三UI family的物理源码加既有依赖闭包各14文件。

逐页修前／修后与实际操作：R1–R3见r1-r3/audit-summary.json（15场景、60步），R4–R6见r4-r6/owner-report.json（29操作场景、9空搜索场景、6配色测量），S1–S6见states/review-evidence-index.json（27场景与7悬停对象、425断言）。统计互有覆盖，未相加冒充独立合同数量。


[最终源码与依赖登记](metadata-validation.json) · [改动范围保护](protection-final.json) · [独立审查](independent-review.md) · [截图](root-final/R3-compact-tooltip.png)
