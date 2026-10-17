# E01—E03与T22运行记录

日期：2026-10-10（Asia/Shanghai）。用户授权：“按补齐后的计划开始第一批实施，先做基线检查，再完成 E01—E03 和专项验收，之后按约定衔接 T22。”

## 版本与范围

- 工作区：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`；分支`codex/card-v2`，HEAD `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。开始时已有675项Git状态（含本次基线目录），没有重置他人改动。
- 基线359份文件hash和原文件副本见[基线](baseline/source-hashes.json)、[事实](baseline/facts.json)；固定版本、依赖和验证输入见[固定版本](frozen-source.json)。登记仍为19入口、170来源变体、10配方。
- 实现位于现有默认样本／宿主：默认Line／Area／Composed缺测，普通柱与mini／DataBar全零说明，默认Sunburst键盘下钻、返回和焦点；共享UI／vendor运行代码、公共API、Registry／Manifest、依赖或来源锁未改；charts README随交付同步。
- 两个预览服务由本任务从card-v2启动：5173为Playground，5387为独立图库。端口服务身份分别核对，未知服务未被停止。
- I02用于同源精确读数，D05用于真实内容、窄容器与状态；本次没有新增全局方法规则。

## 基线与问题定位

三个应用类型检查通过；测试类型原有4项诊断：Toast两处`ByRoleOptions.exact`、旧chart-feedback配置两处`reducedMotion`。本次保留并逐行核对，不记为新增问题或修复。

17个默认入口浏览器基线、相关目标单元及下载文件闭包已记录。缺测门控、缺少全零说明、默认旭日缺少键盘进入下级，先用[目标失败](implementation/root-red.log)复现；E02真实零高、缺测、非法、超域等已有正确行为复用现有实现。

复审修正了全缺测误标全零、失效路径和根层控件删除后的焦点、更新后旧悬停对象及默认Hint遗漏父路径。最终[12项示例单元](implementation/root-final-green.log)通过；原失败和修复前日志分别保留。

## 当前技术结果

| 检查 | 实际结果 | 记录 |
| --- | --- | --- |
| V1 图表单元／合同 | 48文件、538测试通过，最终以单worker运行 | [最终日志](t22/v1-final.log) |
| 样式生成一致性 | exit0；生成样式未改 | [检查](t22/styles-check.log) |
| V2 UI类型 | 基线通过；220份UI范围输入未变，复用有效结果 | [UI类型](t22/ui-typecheck.log) |
| V2 Playground／Prototype类型 | 最终均exit0 | [Playground](t22/playground-typecheck-final.log)、[Prototype](t22/prototype-typecheck-final.log) |
| V2 测试项目类型 | exit1，仅原有4项诊断；与基线逐行一致 | [收尾诊断](t22/tests-typecheck-closeout.log) |
| V2 两个构建 | 最终均exit0，保留体积提示 | [Playground](t22/playground-build-final.log)、[独立图库](t22/catalog-build-final.log) |
| 默认入口专项 | E01—E03共6项通过；普通与减少动效、真实Tooltip、更新中断、mini两尺寸、键盘及390px | [专项](acceptance/agent-default-final.log)、[读数事实](acceptance/default/e01-standard-facts.json)、[运动路径](acceptance/default/e01-motion-facts.json) |
| V3 完整默认文档 | 12项通过，含17原生入口、15单色入口及5387图库、源码显示和普通Switch样式隔离 | [最终日志](t22/default.log) |
| V3 实际嵌入／动效／尺寸 | 23项通过，含5／40行、排序／筛选、尺度、离屏返回、portal Tooltip、两mini型号与放大阅读 | [专项](acceptance/business.log) |
| V3 旭日反馈与旧变体 | 3项反馈＋3项受影响旧变体通过 | [反馈](acceptance/structure.log)、[变体](t22/variants.log) |
| V4 下载与独立消费 | 当前19 Registry闭包、170变体类型／构建、78下载类型／构建及78浏览器通过；12新增＋66既有，无页面错误 | [最终事实](t22/consumption/final-facts.json)、[170来源结果](t22/consumption/official-variants/facts.json) |
| V4 验证器／登记回归 | 最终2文件18项通过，含13消费与5登记；最终脚本hash与固定输入对应 | [收尾单测](t22/closeout-contracts.log)、[恢复来源](t22/consumption-resume-02-provenance.json) |

第一次V1并发执行中China选择器测试和矩阵5秒超时未通过；[隔离26测试](t22/v1-failure-isolation.log)均通过，最终单worker全范围538测试通过。保留实际首跑日志，不将并发失败写成基线行为或隐藏重跑。

业务性能JSON只记录同一Chromium的局部帧间隔／long task样本，不声称持续60fps或实机性能。3D回归只检查静态柱位置为有限值；正常动效专项覆盖的是其实际2D／mini路径。

## 消费恢复与版本一致性

首次消费退出1前，170变体类型／构建、78下载类型／构建，以及21个浏览器样本已通过。新增默认Line断言仍按旧“returned全缺测”假设；修正后首次恢复又将Tooltip覆盖SVG计入主图数量而退出1。两处均为验证器假设，最终恢复退出0，补齐剩余57个浏览器样本。原始事实及退出码1→1→0保留在[最终汇总](t22/consumption/final-facts.json)，未把首轮原命令改写为退出0。

恢复前逐文件核对临时宿主、78下载和已安装依赖；运行代码、下载器和构建输入一致，复用有效类型／构建结果，没有重复170变体。最终78浏览器为21已完成＋57恢复完成，涵盖7业务态、14 mini、13分类、16网络、16中国地图、12新默认／矩阵；不是170变体逐项浏览器验收。

冻结清单359份输入中，350份非Markdown运行／验证文件保持最终hash。指南、能力清单、两份计划和charts README这5份Markdown在技术验证后同步事实，其余4份Markdown不变；阶段记录单列。消费汇总中的文档hash表示当时审计版本，最终交付文档版本见[收尾核对](closeout-documentation/checks.json)。当前19 Registry闭包已复核，包括现行README；README更新不涉及运行代码或构建入口。

完整538项检查后仅修正消费验证器并新增回归断言，13项目标单测另列；没有重复统计为完整538中的新总数。最终测试类型仍只保留基线4项诊断。技术范围检查已完成并记录基线例外，用户体验Gate继续待审。

## 人工确认与交接

[审阅页与改前／改后对照](human-review.md)提供实际页面入口、状态切换方式、正常／减少动效、键盘路径和代表图。技术验证独立于用户体验确认：第一批、地图、矩阵、雷达、迷你及全目录Gate分别保留，候选仍未发布。

Safari／VoiceOver、真实触屏、完整对比度、完整深色／强制颜色、大规模数据、SSR、生产数据和干净联网安装未验证。没有Git提交／推送、Figma写入、发布或业务迁移。第二批未启动。
