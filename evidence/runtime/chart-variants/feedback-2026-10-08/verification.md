# 2026-10-08 图表样式反馈修复

本轮四类共性问题及14条批注已完成本地修改。工作区为 Card V2，候选仍未发布；本轮视觉状态为 `awaiting-user-review`。

## 修改与证据

| 用户反馈 | 修复 | 实际证据 |
| --- | --- | --- |
| 共性1、批注3 | 数据斜线略淡至0.8，灰色参考区/背景斜线淡至0.2 | [材质截图与测量](material/)、[白色语义纹理复核](legend-tooltip/findings.md) |
| 批注1、2、14 | 分类默认及材质示例使用蓝紫/蓝青邻近色；去除默认示例中的不协调暖色端点 | [柱形材质](material/playground-bar-shape-gradient-1280.png) |
| 共性2 | 主数字与单位分开；单位为数字字号65%，间距2px | [环饼](radial-final/playground-pie-donut-1280.png)、[测量](radial-final/playground-1280-facts.json) |
| 共性3、批注4 | 只给装饰圆点10px尺寸，文字保持横排，完整图例项可换行 | [真实三宽图例检查](legend-tooltip/findings.md) |
| 共性3 | 使用原生Compound进度条，两行结构、纵向等宽轨道；旭日图图例同行且无错误边框 | [最终图例](legend-tooltip/final-poll-results/)、[真实测量](feedback-settled.log) |
| 批注5、6 | 纹理饼图禁用多余hover光晕；每扇区只用自己的色相做透明度渐变 | [径向检查](radial.md)、[渐变](radial-final/playground-pie-gradients-1280.png) |
| 批注7 | 进度环默认显示首项目标的数字、文字与独立分母，聚焦后读取对应项 | [径向检查](radial.md) |
| 批注8 | 月/季分轨；密集日历保留周一/周三/周五标签；窄屏图内滚动 | [日历](structure/calendar-contributions-1280.png)、[三宽结构记录](structure/verification.md) |
| 批注9 | 默认地图改用已记录来源的177个Natural Earth世界地区，与变体共用；值仍为演示数据 | [世界地图](structure/world-default-1280.png)、[数据来源](../../../../apps/playground/src/docs/components/chart-variants/data/README.md) |
| 批注10、11、12 | 根层为15px标题，下钻使用现有Rain Breadcrumb；独立下载也保留库字体、间距、列表和链接样式 | [旭日图](structure/sunburst-breadcrumb-1280.png)、[真实默认下载消费](structure/default-consumer/facts.json) |
| 批注13 | 线性仪表数字/文字同行；减少动效时所有刻度立即显示 | [线性仪表](radial-final/playground-gauge-linear-390.png)、[原型旧断言更新后的复测](default-prototype-row.log) |
| 共性4 | 地图hover复用原生TooltipContent，恢复紧凑字号、留白及系列标记 | [提示](legend-tooltip/final-poll-results/)、[检查记录](legend-tooltip/findings.md) |

保留手动选择的 `category-wide` 和正负/涨跌语义配方。已认可的蓝灰色值不变；本轮共用样式修改的视觉确认不借用旧Human Gate。

## 验证

- [88/88 图表单测，22文件](unit-settled-results.json)，包括新增的独立目标、单位、减少动效刻度、默认旭日图下钻和返回。
- [29/29 本轮Chromium检查](feedback-settled.log)：桌面与390px窄屏，涵盖真实文字/图形边界、材质、图例、悬浮、下钻和恢复。12个图例/Tooltip检查、9个结构检查、4个径向检查、4个材质检查。
- [21/21 完整变体目录检查](catalog-settled.log)：170变体在1440/390两宽呈现，340次更新/重播动作及对应精确数据检查，结果在[catalog-settled](catalog-settled/)。
- [默认文档入口6/6](default-playground.log)。[默认原型初次61/62](default-prototype.log)的唯一失败是旧断言从“标签底部”测轨道间距；用户要求横排后改测“整行底部”，保留8px间距和横排断言，[单项复测1/1](default-prototype-row.log)通过。未将两次运行伪报为一次62/62。
- UI、Playground、Prototype类型检查及两套生产构建通过，具体命令/退出码见[commands.json](commands.json)；共享工作区其他组件变化后的最新类型与独立消费复核见[current-checks.json](current-checks.json)。
- [170份下载独立消费](consumption-current/facts.json)：复制当前候选UI/Foundation与123份已有依赖缓存，在独立临时宿主执行类型检查和生产构建；无宿主外模块/依赖链接。这不是clean-install或最小单项Registry安装。[两个默认示例](structure/default-consumer/facts.json)另从真实UI下载源码、构建并用生产浏览器操作世界地图与库面包屑。
- 179个原生文件锁定哈希与Registry完整性、图表工具CSS生成、资产索引和四份图表Token颜色登记检查通过。六处必要原生调整见[source-lock-changes.json](source-lock-changes.json)，固定上游commit不变。

原始RED、生成工具主题顺序错误导致的回归及修复后GREEN均保留；只有已出现完整图形的截图用于最终审阅。默认文档一轮截图因旧目录环境变量名称误用先写入旧路径，已搬入本轮目录并以修复前交付快照恢复旧记录，见[搬移记录](default-playground-evidence-relocation.json)。原始170变体交付目录保持独立。

## 未完成的独立验收

Safari、VoiceOver、物理触屏、完整深色/对比度验收未登记通过。本轮截图待用户视觉确认。全仓库Token检查仍存在Tree、布局等其他组件的既有登记/对比度失败，见[实际日志](workspace-token-check.log)；本轮图表登记的针对性检查已通过。共享工作区其他组件的并发变化保留，没有回滚。

未发布、未写回Figma、未迁移业务、未创建Git提交。此前的蓝灰配方认可与原交付记录作为历史证据保留。
