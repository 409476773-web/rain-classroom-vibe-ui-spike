# 第二批径向与流向宿主实施证据

本目录只记录 card-v2 当前第二批 Pie / Ring / Funnel / Sankey 默认、radial / comparison 及 Mini 接线、Gauge 外部值拒绝与现有 Radar 等价读取复核。运行时四个自有文件已冻结，完整 SHA-256 见 source-freeze.json。

- 目标失败：target-red.log 10项；scatter-legend-red.log 1项；390px默认长名称漏斗真实页面宽度399px，trace位于 browser-after-03/test-results，改前原帧在 funnel-long-390-before-fix.jpeg 与 origin.json。该原帧从真实失败 trace 原样提取，未回退或修改运行时。
- 最终目标单测：unit-final-02.log，5文件90项通过。Playground与当前测试项目类型检查通过，分别见 typecheck-final.log 与 test-typecheck-at-freeze.log。
- 当前实际页面：browser-final.log 8组通过，1440/390px × 普通/减少动效，164张实际截图、176条观测、0页面异常。每组前后四个自有源码hash完全一致。每个精确表以summary→Tab真实进入可聚焦的读取/滚动容器。
- 正常观测：normal-data-source-comparison.json，27个已有数据函数声明和函数体逐字未变；protected-visual-source-comparison.json，既有CSS、Mini数据、尺寸与Mini实现五文件逐字未变。

默认及Mini宿主由 ChartPage 捕获 boundaryScenario 并传给 ChartExample；变体使用既有 VariantSettings / useVariantSetting。完整源码与下载已沿既有 chart-data.ts 文件包含四个私有具名边界helper，没有新增依赖或通用图型接口。默认四族下载场景序列化与完整170下载闭包/类型/构建由 root 在合并冻结后统一验证，本目录不冒充该消费结果。

饼图小类别固定为当前具名1000总人数样本中的1人/0.1%，完整标签可从图例和同源精确表读取。原生间隔不变，极小扇区本身不保证可辨。进度零目标显示不适用，超目标保留120/100与120%，标准图停止无效比例、Mini保持原帧；各环分母仍独立。漏斗缺项不补0、增长仍用入口分母、零入口/超入口保留原值并停止完整比例图；长名称只绘图用短阶段名，hover身份和原始完整读数保留。桑基1/0人次具名边样本保持中间节点守恒，零边保留表而不绘正值连接，过滤后Tooltip按实际绘图连接读取。

这些helper校准当前具名Mock场景，不代表任意外部输入保证。真实触屏、Safari/VoiceOver、视觉人工Gate与发布不由本目录的机械检查关闭。此前脚本重复关闭details的失败留在历史attempt目录，已更正后用最终同hash重跑全部8组。
