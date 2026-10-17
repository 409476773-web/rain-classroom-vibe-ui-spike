# 第二轮图表样式反馈

本轮四项截图反馈及两条浏览器批注已完成，本地候选仍未发布，视觉待用户审阅。修改共用在Playground、Prototype和下载示例源码中。

| 反馈 | 修改 | 验证 |
| --- | --- | --- |
| Pie仍有阴影 | 普通Pie和Donut调用也关闭PieSlice光晕，保留原生平移/扩张、聚焦和读数 | [图例焦点截图](final-screens/playground-pie-legend-hover-1197.png)，真实hover状态下所有扇区filter为none |
| Ring读数重复 | 六个变体中心仅保留百分比和目标名称，整组居中；独立分母保留于图例、状态及精确表 | [中心截图](final-screens/playground-ring-default-1197.png)，六款逐一比对文字及图形中心边界；聚焦练习项显示66.7% |
| 参考虚线太深 | ReferenceArea的测量区间虚线stroke opacity降至0.2，与辅助斜线一致，数据线不变 | [参考区间](final-screens/playground-area-reference-band-1197.png)，柱/面积/折线/散点/K线逐一测量 |
| 日历图例过近 | 11款日历图例增加16px上间距；默认示例的HTML图例从SVG移到图外，并共用原生交互Provider | [渐变图例](final-screens/playground-heatmap-gradient-legend-1197.png)、[默认示例](final-screens/playground-heatmap-default-example-1197.png)，全部实际图例位于格子下方至少16px |
| 旭日标题/路径居左 | 根层15px标题与已有库Breadcrumb均在图形中心线上排列 | [根标题](title-screens/playground-sunburst-legend-root-1197.png)、[下钻路径](final-screens/playground-sunburst-legend-drill-390.png)，3款变体及默认根标题检查，下钻/返回维持居中 |

## 真实复现与检查

- 修改前真实浏览器20/20 RED，见[red-correct.log](red-correct.log)；环中心精确文本单测RED见[unit-red.log](unit-red.log)。首次测试草稿的视口hook作用域不正确，其日志作为草稿保留，不作为1197px证据。随后按describe分组固定两宽，并对异步加载的6/11/3个变体显式等待数量，避免空循环被误计为覆盖。
- [最终浏览器49/49](final-browser.log)：上轮29项及本轮20项均通过。1197/390两宽分别在5173与5387操作，包含6款Ring、11款Heatmap、3款Sunburst及默认示例。根标题补充截图的4项检查见[title-browser.log](title-browser.log)。
- [图表单测88/88，22文件](unit.json)。旧的“中心必须显示8/12项”断言按本轮明确要求替换为两行主读数，图例aria分母与精确表仍被验证。
- [三套类型检查与两套生产构建](commands.json)均通过。
- [170份独立下载消费](consumption/facts.json)通过类型/构建与依赖闭包检查，使用复制的当前候选包和既有依赖缓存，运行结束canonicalChanges为空；不宣称clean-install。
- 图表静态工具CSS、资产索引、179个原生源锁和图表颜色登记均通过现有检查。本轮未改native源文件、上游commit、全局Token、原有色组或公共API。

已目视检查真实中心读数、无光晕的Pie聚焦、浅虚线、日历图例间距、旭日标题和下钻路径。原始用户截图为本轮视觉目标，自动化与AI目视不能替代用户视觉确认。

本轮未检查Safari/VoiceOver或物理触屏；未重跑全仓库其他组件检查或340条完整变体动作。上轮相关历史记录独立保留。未发布、迁移、写回Figma或创建Git提交。
