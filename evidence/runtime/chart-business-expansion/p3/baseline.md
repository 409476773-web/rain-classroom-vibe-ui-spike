# P3 起点与范围 · 2026-10-09

用户明确要求在迷你图表与分类矩阵补充后继续实施原业务图表计划。保留该计划当时“仅补方案”的历史范围记录，本次按最新请求执行 T12—T15；P4/P5留下一批。唯一根目录为 card-v2，分支 codex/card-v2，已有642条修改/未跟踪记录不清理；基线590个相关文件hash见 baseline.json。

本次为 System Mode、本地 registry-candidate / unpublished 增量；公开入口仍为 @rain-next/ui/charts。默认时间合同保持。分类模式使用稳定字符串ID、独立point scale、formatter显示标签；不造日期，不下采样类别；明确拒绝分类图的时间Brush/Projection等部件。缺测保留断口，零值有效，非法有限数在边界拒绝。Composed新增逐轴固定零基线域、SeriesBar轴绑定与共享几何。宿主独立 #chart-category，P1迷你、P2矩阵保持各自页面。

预计范围：共享坐标壳、Line/Area/SeriesBar及路径/提示消费者、六个Mock业务配方、分类页面与源码下载、Manifest/Registry闭包、vendor来源锁、消费文档和证据。无新依赖，不改变17原入口/170官网身份、全局Tokens、已确认蓝灰色或既有Human Gate。

方法：I02保留单位/范围/精确值与缺测；V01颜色跟随系列身份；D02延续现有文档页结构与对齐；D05长学院名用滚动宽图和精确表。参考现有ChartPage、ChartBusinessPage、已登记业务设计与图表合同；本次无需逐像素Figma复刻。

验证：先失败再实现；专项分类/缺测/多轴/周期单测，相关共享图表回归、三个包及测试类型检查、两个消费者构建、正常与reduce浏览器交互/中间帧、170官网映射精确保留、六个业务下载的独立type/build消费。起点专项：5文件105用例通过。新增分类测试4例先因错误日期解析失败，明确暴露旧时间依赖。

未验证假设：新分类轴/长标签/缺测动效的实际阅读体验待运行样本；真实硬件触屏、VoiceOver和Safari不由Chromium验证推导。视觉人工审阅仍独立。无Git提交、推送、发布、Figma写入或业务迁移。
