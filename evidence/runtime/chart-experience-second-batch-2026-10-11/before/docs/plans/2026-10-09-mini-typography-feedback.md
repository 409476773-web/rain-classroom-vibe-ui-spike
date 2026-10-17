# 迷你图表字号、面积走势与圆头修订

授权：用户四项截图反馈要求横向图左侧标签13px、迷你文字统一、卡片/表格优先紧凑面积走势、小数量条圆弧一致。

System Mode，共享候选局部增量。V04按角色保留层级，普通标签、数值、单位、状态和辅助信息统一现有13px/20px；重点指标主数字仍28px/36px，模块标题保持既有层级。V05保持查看/更新/排序/减少动效与异常状态；I02复用既有面积图来表达走势，保留自域与逐点精确读数。

根因：BarYAxisLabel使用原生text-xs未被Rain13px适配覆盖，宿主CSS混用12/14/16px；全宽数量条用scaleX同时压缩圆角。三项浏览器回归先记录当前失败，再修共享DataBar为宽度动画；仅匹配现有BarYAxis标签类以保留vendor来源锁；宿主普通文字统一13/20；表格与第一指标卡选择已有area compact96×32，图库折线仍独立存在。

修改范围：DataBar、共享chart字体样式、business CSS与embedding组合；同步原回归/独立消费断言、README、AI指南、受影响Manifest与阶段记录。颜色登记、Foundation Token、依赖、公共Props和分类矩阵不变。

验证完成：字体/圆角几何3项red→green；卡片与表格真实面积填充；两档尺寸、200%文字、长/异常状态、5/40行更新、宽度中间状态与减少动效。91项相关单元、26项浏览器、UI类型与两应用类型/构建、Token生成一致性通过；现有21个独立下载类型/构建/Chromium，以及脚本前置170个官网下载类型/构建通过。卡片字号调整带来2px基线差，保留原断言并调整既有位置偏移后3张卡片基线一致。独立只读源码与截图复核未发现新问题，最终证据见[evidence](../../evidence/runtime/chart-mini-typography-feedback-2026-10-09/verification.md)。完整视觉/对比度Gate与Safari/VoiceOver保持单独待确认。本轮不发布、不写Figma、不提交Git。
