# ADR 0012：Bklit原生图表与Rain候选子入口

> 历史决策记录（2026-10-07／08），正文保留当时范围。后续实现已扩为19入口、170展示变体和10配方；Matrix／Network已在Rain本地实现，世界地图采用固定Natural Earth真实几何，中国业务宿主采用固定HDX／OSM边界，统计仍为Mock。下文“自创示意GeoJSON”“矩阵／网络缺口”及数量不是当前能力结论。最新合同见[能力清单](../ai/chart-capabilities.md)、[图例规则](../ai/chart-legend-rules.md)，技术与人工状态见[第二批记录](../../evidence/runtime/chart-experience-second-batch-2026-10-11/verification.md)及[合并审阅](../../evidence/runtime/chart-experience-second-batch-2026-10-11/human-review.md)；候选仍未发布。

用户在2026-10-07确认Bklit原生图形、动效和交互，Rain配色／渐变／字体适配，并授权连续完成完整实施计划。

采用固定MIT源码commit `5d699897b2dde26374cf15501dbaadbc52cea982`，仅接入17图型和实际组合依赖。共享代码属于UI层，`registry-candidate`、`unpublished`；数据生产、请求、业务单位及页面布局留宿主。视觉审阅和发布状态独立记录。

在现有UI包使用`@rain-next/ui/charts`与`@rain-next/ui/charts/styles.css`，不转导出到UI根入口，不新建包或双库统一层。保留Bklit原生Compound API及可修改Parts。

静态原生utility由现有Tailwind编译器生成，再限制在`.rain-chart`作用域；消费者不依赖实验页CSS或重新恢复全局默认theme。生成文件和主题分别维护，图形几何不因机械样式接入而改变。

源锁记录上游／本地哈希及修改。必要修正：桑基／K线／漏斗的实例专属ID；纵轴主题间距与柱／端点边缘；桑基首次有效尺寸保护；17入口身份追踪；共用spring在减少动效时直接读取，日期ticker首悬停及高亮片段同步。163文件逐项差异与哈希见来源锁，正常运动与几何保留。

本地图表目录和Playground从共享入口消费；只有固定上游的原生对照保留私有基线，Rain共享实现不维护两套。地图示例使用自创示意GeoJSON，无真实行政边界或远程可变资产依赖。

完整深色、任意XY、分类矩阵、关系网络及额外交互保留为独立缺口；不能从相似名称推导支持。

2026-10-08技术交付完成：17目录、9配方、两项干净宿主消费成立，详见[交付记录](../../evidence/runtime/bklit-rain-catalog/verification.md)。自动验证为scoped-passed；全仓治理仍有既存未闭环项，视觉／对比度Gate待审，候选未发布。
