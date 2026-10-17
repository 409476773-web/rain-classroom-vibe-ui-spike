# 图库运行验证 · 首版结果

日期：2026-10-07。范围：`Prototype Mode / local-experiment`。[打开实验室](http://127.0.0.1:5387/chart-validation.html)。本报告记录运行验证，不代表用户视觉验收或公共组件批准。来源与配方见[方案v0.4](../../../docs/plans/2026-10-07-chart-reference-recipes-design.md)，执行范围见[实施计划](../../../docs/plans/2026-10-07-chart-library-validation-plan.md)。

## 结果与实现边界

页面使用 **Plots 2.6.8 / G2 5.4.8**，共 7 个真实绘图实例：Area、Column、Tiny.Area、DualAxes、G2 矩阵、Sankey、关系网络。Bklit 用作视觉参考，未引入其完整交互与动效实现。

| 样本 | 原生能力／配置 | 页面局部定制与已知限制 |
| --- | --- | --- |
| 趋势、面积、迷你图 | Area / Tiny.Area、平滑与折线、独立线与面、渐变 | 局部 Rain 配色、精确读数与数据表；真实零值与缺测分别保留。未实现 Bklit 弹簧提示、左右边缘遮罩或完整动画编排。 |
| 分组柱 | Column 分组、圆角、渐变、原生提示 | 正负值分别设置数值端圆角与渐隐方向；包含短柱、零值、负值。 |
| 组合图 | DualAxes、柱／线／面积、双轴、原生 Slider | 外部范围、图例与精确读数联动。原生 Slider 筛选后，动画更新曾使柱的 X 位置残留；最终仅对 interval 设置 `animate: false`，面积与线保留动效。正常动效模式下，筛后6周→换色→更新数据，六根柱已逐项目视确认对齐。 |
| 热力／气泡矩阵 | G2 cell / point / text，6×6 与 12×12 | 固定连续色阶；气泡面积按数值映射，零值使用独立灰点，缺测显示「—」；密集矩阵在自身区域横向滚动。 |
| 桑基图 | 原生 Sankey 权重布局与流带 | 页面路径选择、焦点渐变、弱化其余流带。节点高度仍随权重变化，未实现参考图中的等高列表锚点。 |
| 关系网络 | G2 point / link、径向渐变、箭头、虚线曲线 | 9 个固定示例坐标；有向边为直线箭头，无向边为虚线弧线。未实现力导向布局或弧形有向箭头。 |

## 验证状态

| 维度 | 最终结果 | 证据与覆盖 |
| --- | --- | --- |
| 浏览器与交互 | 最终4项检查全部通过，退出0，7.6秒：真实Canvas绘制、精确数据、配色／数据更新、零／缺测、范围与关系选择保持。 | [浏览器日志](./browser-test.log)。四个Plots实例分别等待本轮 `afterrender` 计数增长，检查Canvas实际变化及运行异常；三个原生G2实例更新后身份保留。原生Slider拖动、共享提示3系列→隐藏完成率后2系列另经实际操作检查。 |
| 尺寸与动效偏好 | 桌面1440×1000、窄屏390×844与Reduced Motion通过；12×12矩阵在自身区域滚动，文档无横向溢出。 | 同一最终浏览器运行；默认截图使用Reduced Motion取得稳定最终图形，组合更新另在正常动效模式截取。 |
| 类型与构建 | 最终类型与独立入口构建均退出0。整页JS 2,366.73kB／gzip707.98kB，存在chunk大于500kB提示。 | [类型日志](./typecheck.log)、[构建日志](./build.log)。整页包含Rain UI与多个图库样本，不是纯G2体积或正式消费成本；未做按需打包或性能基准。 |
| 保护范围 | 起始2270文件快照曾全部一致；最终2267一致，按钮组源码2文件与manifest1文件在并发修复期间发生变化，本图表任务未写入它们。 | [保护校验](./protection.json)保留原始不一致，不改基线。[并发会话](codex://threads/01a10618-a74a-7df0-970d-cc296144f5ff)为“推进导航组件 W6 至 W8”，当时正在按用户“继续修复”处理按钮组。不能声明最终全量保护校验通过；并发变化未回滚。 |
| 人工与覆盖范围 | 实际 Safari、VoiceOver、全部图型、性能及完整对比度均未评估；用户视觉验收仍待进行。 | 无自动批准。 |

仅本地实验得到验证。公共组件、全局 Token、Figma、Registry／包发布、业务迁移与 Git 提交不在本轮批准范围内。

最终命令（工作目录为card-v2）：

```sh
pnpm exec playwright test --config tests/e2e/chart-library-validation.config.ts
pnpm --filter @rain-next/prototype typecheck
pnpm --filter @rain-next/prototype exec vite build --config vite.chart-validation.config.ts
```

局部依赖仅新增Plots与G2两个锁定版本；[依赖解析](./dependencies.json)确认Plots共用G2 5.4.8。锁文件相对本轮起点新增517行、无删除，原有Recharts保留。开发预览启动：`pnpm --filter @rain-next/prototype exec vite --host 127.0.0.1 --port 5387 --strictPort`。

实际适配发现：G2线／面积样式回调传入系列数组；G渐变角度与CSS不同（90°向下、0°向右）；组合人数系列须显式共享尺度key；Plots包装器会丢失无载荷生命周期事件，须监听内部G2。复核曾发现ready仅记录首次成功；第一次用React状态复位又造成重复渲染，失败日志保留在[生命周期复查](./lifecycle-recheck-failed.log)。最终以ref记录生命周期，避免触发新一轮绘制；独立只读复核和最终4项检查通过。

## 画面证据

- 桌面：[首屏](./overview.png)、[完整页面](./full-page.png)。
- 图形：[组合](./combination.png)、[矩阵](./matrix.png)、[桑基](./sankey.png)、[网络](./network.png)、[气泡矩阵](./bubble.png)。
- 窄屏：[密集矩阵](./mobile-dense.png)、[完整页面](./mobile-full.png)。
- Slider 后数据更新：[组合图更新](./combination-updated.png)。

当前结果支持继续以 **Plots / G2 为主方向**：常规统计图由 Plots 承载，矩阵与关系样本使用同版本 G2。已知适配代价和未实现项如上；是否达到 Rain 视觉要求，仍需用户检查实际页面与截图后判断。
