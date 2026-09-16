# 设计知识交付与独立消费

2026-09-16，用户在现状评估与三项建议后要求“继续”。System Mode，范围为 AI 入口、设计指南、RN-14 Starter 和隔离的大表单消费试验。实施计划见 [计划](../../../docs/plans/2026-09-16-design-knowledge-delivery.md)。

状态：知识入口、指南与导出交付完成，专项检查通过；一次隔离消费完成并通过独立需求、代码审阅。本轮完成的是首批表单消费闭环，无新的视觉接受、对比度接受、发布、迁移或 Git 操作。

## 已核实基线

- RN-14 与资产索引定向测试：2 文件 5 项通过。
- 新增“导出包含可发现设计入口”检查在旧导出器失败于缺失 AGENTS.md，旧两项导出测试通过。
- 修改前 Tailwind B2 检查通过；源码边界检查因既有 teacher-grading 场景不在允许清单失败，该场景在本轮开始前已存在。本轮不修改该页面或放宽其清单。
- 基线记录 2,235 个源文件哈希。原始输出先存于 /tmp/rain-design-knowledge-20260916，收尾保存本批证据。

## 已交付的知识与入口

- 原工作区 AGENTS 与 docs/ai/README 接入同一份 [设计指南](../../../docs/ai/prototype-design.md)，在选型前识别任务，按需查看组合与截图。
- [大表单指南](../../../docs/ai/form-composition.md)提炼分区、内容宽度、固定操作、失败/退出保护；具体 12/20/8 等数值保持 BM-B 局部范围。列表/工作台/报告的修订不被包装成成熟模板。
- RN-14 的 M1/M2 导出都附带短 AGENTS、两份相同指南、13 份组件合同、两张参考图与两份 BM-B 确认来源。沿用原来源锁；新增导出器自身指纹，文档和图片与源码一样参与完整性检查。历史归档不重写。
- [范围核对](scope-proof.json)：只改 7 个已有文件，增加指南、计划及本批证据；共享组件、既有页面和锁文件保持开始时指纹。独立消费写在仓库外。

## 本轮技术检查

| 检查 | 实际结果 |
| --- | --- |
| 回归检查先红后绿 | [旧实现缺少入口](red.log)；随后 M1/M2 的链接可达、同源内容、篡改拒绝和原导出边界通过 |
| RN-14 / 资产索引 / RN-15 | [3 文件 7 项通过](targeted-final.log) |
| 当前工作区类型 | [通过](typecheck-final.log)；初次新增测试的严格类型问题见 typecheck.log，已补存在性收窄与来源映射类型 |
| Evidence、资产索引、Tailwind B2 | [Evidence](evidence.log)、[Tailwind](tailwind-after.log)通过；资产索引引用/导出/生成内容检查通过 |
| 独立 M2 导出安装、类型、构建 | [安装](m2-install.log)、[类型](m2-typecheck.log)、[构建](m2-build.log)均通过；保留原 bundle 体积提醒 |
| 导出来源锁 | M1 消费起点 rn14-909b9a71a4d59767；M2 rn14-5995efaec8dd4ebb；安装后及 M2 构建后校验通过 |
| 归档恢复 | [最终 M2 Starter](starter-m2.tar.gz)解压到另一新目录后[来源锁校验通过](archive-check.log)；[归档校验值](starter-archive.json)。最终 rn14-1b8783ed5f7321a9 比已构建导出只多了表单指南的历史导航检查，运行源码相同 |
| 原有范围外失败 | [扩展检查](targeted.log) 11/12，失败为既有 teacher-grading 入口的历史保护检查；源码边界检查同样失败，不声称全仓通过 |

[诊断](m2-baseline-diagnosis.json)确认 main.tsx 与本轮开始相同；在内存中去掉本次授权仍失败，仅移除既有 teacher-grading 两条入口语句才恢复历史匹配。没有改动该源码、放宽断言或修改旧来源记录。未重跑全库单元和全部业务浏览器用例。

[独立需求与代码审阅](independent-review.md)通过；仅覆盖入口与导出，独立新页面单独审阅。

## 参考图

从当前本地 BM-B 取景：桌面 1280×900、窄屏 390×844，截图只包含 dialog。内容是既有虚构教材。已查看两张图片；它们展示当前分区、字段重排与底栏关系，不新增验收。静态浅色提示的既有对比度欠项在指南中明确保留。

## 本次消费试验的判定边界

一次无本轮聊天历史的独立需求消费，检查资料能否找到、规则能否使用、页面是否满足需求。没有对照组，也没有多任务或真实用户修改数据，不据此宣称首稿质量/效率稳定提升。新页面始终为 local-experiment，视觉待用户评审。

## 单次消费观察

实施前固定 [研讨活动需求](transfer-task.md)，只给独立实施者导出的 M1 Starter 和业务要求，不指定组件、布局或像素。实施者没有继承本轮聊天；主任务未提供设计答案。页面位于仓库外的隔离导出目录，预览为 [研讨活动](http://127.0.0.1:5357/#activity)。

实施者实际阅读短入口、两份指南、两张参考图、BM-B 源码/状态及相关组件合同，留下 [选择与修订记录](consumer-design-notes.txt)。页面使用三种活动类型的 RadioGroup、按填写任务分区、长文本整行、固定保存区、宿主草稿/保存状态和 AlertDialog 退出保护；没有复制附件及布局演示控件。这与指南中的条件判断一致，属于一次可消费的观察，不能单独归因于指南或证明质量提升。

- 首次可运行结果已封存：[保存页](consumer-first-saved-desktop.png)、[桌面表单](consumer-first-form-desktop.png)、[窄屏表单](consumer-first-form-narrow.png)、[取景记录](consumer-first-capture.json)。首稿窄屏为 fullPage 截图，会包含视口外宿主内容。
- 独立审阅前的自查变化只有标题与内容对齐、删除被 Card 覆盖的无效标记，见 [自查差异](consumer-self-check.diff)；截至此时状态与保存逻辑未变。检查脚本的点击、定位、窗口更新等待另行修正，不计为产品修复。
- 主任务在新浏览器上下文查看 [最终保存页](consumer-final-saved.png)、[最终表单](consumer-final-form.png)，并实际滚到 [390px 表单底部](consumer-final-narrow.png)，确认人数输入完整可见、保存可达；[取景几何](consumer-parent-visual.json)。这些是 AI 自查证据，不是用户视觉接受。
- [状态检查](consumer-state-green.log) 4/4，[类型](consumer-typecheck.log)与[构建](consumer-build.log)通过；[浏览器](consumer-browser-results.json) 11 组通过，运行错误为空。状态检查保留 [实现前失败](consumer-state-red.log)。
- [来源核对](consumer-integrity.json)：2066 个导出基线文件中仅应用入口改变；共享组件、A/B 例页、依赖/锁和原 source-lock 保持不变。新页面与检查另列，不改写导出基线。

一次自查迭代包含上述两处产品改动，尚无用户反馈；用户修改次数、质量分数、耗时、token 和效率改善均 not-measured。

## 独立复核发现的退出遗漏

首轮 [独立需求报告](consumer-initial-spec-report.txt)暂不通过：从其他样例进入活动编辑，修改后按浏览器返回，会无提示卸载场景并丢弃草稿；前进后只剩初始数据。[独立复现](consumer-initial-spec-history-navigation.json)。原有关闭/刷新检查不能覆盖同文档历史导航，先前 [11 组自查通过结果](consumer-pre-review-browser-results.json)因此不等于完整需求通过。

此项单独算作独立需求反馈后的修正，不改写首稿或混入两处自查调整。页面复用原放弃确认，明确放弃才离开；继续编辑保留草稿，保存中拦截导航。仅改本地 activity/page.tsx，无新路由依赖；[修复记录](consumer-navigation-fix.txt)、[修复差异](consumer-navigation-fix.diff)、[首稿到最终完整差异](consumer-first-to-final.diff)。发现同时回流到 form-composition.md 的宿主退出条件和首稿检查；最终 Starter 已携带更新。消费目录仍保留实际读取的初版指南与来源锁，避免改写试验起点。

- [导航专项](consumer-navigation-results.json) 5 组通过，保留 [修复前失败](consumer-navigation-red.log)与[修复后结果](consumer-navigation-green.log)；既有浏览器 11 组、状态 4 项、类型与构建重新通过。
- [独立需求复核](consumer-spec-recheck.txt)确认原 P2 关闭。随后 [独立代码质量审阅](consumer-quality-review.txt)未发现 Critical / Important / Minor 问题；独立复跑状态 4、浏览器 11、导航 5 和类型均通过。
- 导航修复使用原生 Navigation API，本机 Chromium 151 验证通过；未实现旧浏览器替代机制，未验证其他浏览器、真实手机键盘、读屏或全部对比度。这是本地消费样例的范围，不是生产兼容承诺。

## 可恢复交付

[试验源码与三个阶段证据](consumer-trial.tar.gz)包含消费 Starter、首稿、自查后版本及最终检查，排除依赖与构建产物。已解压到另一新目录并对照 2074 个消费文件哈希；[归档校验](consumer-archive.json)。在解压后的 consumer 中按 consumer-review/README.md 安装与复跑；不要用 --first 覆盖首稿。最新可独立使用的组件 Starter 见上文最终 M2 归档。

本轮观察到了资料的传递、选型使用和缺陷回流，尚未测量稳定首稿质量或用户修改成本。列表、工作台、报告仍按各自现有审阅状态推进，不因这次表单消费升级为成熟模板。
