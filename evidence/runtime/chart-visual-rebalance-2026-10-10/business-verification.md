# 业务迷你图表与指标卡：本轮验证

运行于 card-v2 工作树，使用既有 `http://127.0.0.1:5173/#chart-business`。本轮开始于2026-10-10，浏览器收口跨至2026-10-11。测试均使用本地 Chromium、单 worker；不把结果扩展为其他浏览器或用户视觉接受。

## 实现与直接影响

- 九种图型就近比较紧凑／舒展两档，保留18个 figure 样本，取消18个大边框盒及固定80px图形区＋80px说明区。读数按图型共用，通过 figure 的 `aria-describedby` 关联。
- 三张指标卡分别使用独立主数字；完成率以百分比主值配辅助弧，不重复中心读数。局部 `MiniProgress.showReading` 默认维持已有行为，只有该卡片传 `false`；缺测、无目标等状态仍可读。
- 保留普通文字13px/20px、主数字28px/36px、既有图槽、颜色身份、量程与运动。百分比主值的 `%` 与数字一起使用 Data 字体。
- 新页面壳导致普通排名读数继承14px/22px后，在既有 `.rain-business-reading` 角色明确13px/20px；不修改共享页面壳或共享图表默认。

## 计数与最终证据

最终浏览器唯一覆盖为 **25项通过**。排版定向复跑的3项已包含在最终16项中，不重复计数。

| 检查 | 唯一项数 | 最终结果与证据 |
| --- | ---: | --- |
| chart-business-sizes | 9 | 1440／916／390、真实槽与状态、径向悬停、200%页面和文字放大、共同主数字基线、异常读数与大整数。包含在 [最终布局日志](business-e2e-layout-final.log)，16/16、退出0、29.0s |
| chart-business-typography-feedback | 3 | 普通与主数字层级、面积填充、数量条比例与圆头；包含在同一最终16项 |
| chart-business-embedding | 4 | 共享域、筛选／排序／详情、40行稳定ID、门户Tooltip、静止悬停更新、离屏返回；包含在同一最终16项 |
| chart-business-motion | 9 | 普通更新中间几何、堆叠起点、两档饼／弧／数量条的节点保持及减少动效即时终态；[最终运动日志](business-e2e-motion-final.log)，9/9、退出0、35.3s |
| 相关单元 | 77，3文件 | mini-examples、mini-data、chart-mini-size；[单元日志](business-unit.log)，77/77、退出0、2.84s。新增2项功能回归在旧源码失败后修复通过；本次单元运行早于后续仅CSS的普通读数字号继承修复 |

最终排版事实见 [typography.json](business-e2e/final/typography/typography.json)：9处共享说明均13px/20px，所有普通读数均13px/20px，三处主值25人／25门／20%均28px/36px。指标卡基线与表格读数事实见 [host-readings.json](business-e2e/final/sizes/host-readings.json)。这些是computed样式与浏览器布局检查，不单独证明字体文件实际加载。

最终截图与几何JSON位于 `business-e2e/final/`：

- 图库：[1440](business-e2e/final/sizes/gallery-1440.png)、[916](business-e2e/final/sizes/gallery-916.png)、[390](business-e2e/final/sizes/gallery-390.png)；各自同名JSON保留18个样本的实际槽与圆形缩放事实。
- 缩放：[200%页面](business-e2e/final/sizes/page-zoom-200.png)、[独立文字放大](business-e2e/final/sizes/text-only-200.png)；同名JSON记录共享说明与读数的可见性、分组边界及具体模拟方法。
- 宿主：[指标卡](business-e2e/final/typography/area-card.png)、[表格](business-e2e/final/typography/area-table.png)、[整页](business-e2e/final/embedding/desktop.png)、[390长内容](business-e2e/final/embedding/narrow-long.png)。
- 更新与运动：`business-e2e/final/motion/`；40行实例与门户事实见 [batch-facts.json](business-e2e/final/embedding/batch-facts.json)。

## 保留失败及处理

1. **环境失败：** 首次16项均在页面断言前因Chromium启动失败终止。macOS MachPort报`Permission denied (1100)`，属于沙箱启动限制。保留 [环境失败日志](business-e2e-layout-sandbox.log) 与 `business-e2e/results/`。申请已授权测试的沙箱外浏览器启动后重跑；未通过改运行时代码绕过环境问题。
2. **真实回归：** 沙箱外首轮16项中15项通过，排版1项失败。事实JSON显示5个普通排名读数为14px/22px；新增 `core-ui-shell` 的字体规则覆盖了业务main原来的继承字号。仅给既有普通读数角色明确13px/20px，保留测试要求。首轮 [失败日志](business-e2e-layout.log)、`business-e2e/pass1-results/` trace及 `business-e2e/typography/typography.json` 保留。
3. **复跑范围：** 修复后先定向重跑排版3项，3/3、退出0、3.8s，见 [定向日志](business-e2e-typography-final.log)；随后运动9项通过，再完整重跑尺寸／排版／嵌入16项通过。最终布局输出是 `business-e2e/layout-final-results/`，运动输出是 `business-e2e/motion-final-results/`；不会用最终成功覆盖首轮失败记录。

## 本次未测

明确排除 embedding 的1项帧间隔／long-task性能采样，未测持续帧率、未声明60fps。运动回归证明所检查的中间几何、节点稳定与减少动效终态，不构成性能结论。整库图例样式修订、类型／构建、独立下载消费及同条件before／after由主任务与其他分工另行记录；本报告不将其计入以上25项。
