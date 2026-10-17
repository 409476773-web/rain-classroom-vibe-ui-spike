# 最新治理失败归属（2026-10-06）

依据同目录 `governance-final.log`：前五项治理检查通过，Token 检查退出码 **1**。59–268 行有 **210 条退出失败诊断**；没有未分类项。两行 ELIFECYCLE 包装、声明中的待审汇总和已接受例外不计入。这是诊断行数，各分支可能重复指向同一 paint，并非 210 个独立界面问题。

| 类别 | 诊断行数 |
| --- | ---: |
| Category/local 消费者登记分支 | 40 |
| 未登记 Category CSS paint | 62 |
| 旧登记 paint 在当前源码缺失 | 12 |
| raw/private/unregistered 总括 | 1 |
| 未登记视觉颜色声明 | 36 |
| 未登记边框颜色 | 3 |
| 实测对比度未达原阈值 | 42 |
| 弱 Neutral 使用资格未满足 | 14 |
| **合计** | **210** |

| 归属 | 诊断行数 | 内容 |
| --- | ---: | --- |
| 导航精确 18 文件 | 18 | 原扫描分支的 metadata-required 提示 |
| Report-A | 119 | 62 paint、12 旧登记缺失、36 declaration、3 border、1 raw、1 metadata；另有 4 实测对比度 |
| G1 当前冻结账本 | 36 | 28 对比度、8 弱色资格；与保留的当前 findings 逐条一致 |
| Tree 独立组件 | 16 | 10 对比度、6 弱色资格 |
| Breadcrumb 独立组件 | 3 | 消费者登记 |
| G3 页面/重建 | 6 | 消费者登记 |
| 其他共享组件 | 8 | Command、HoverCard、Kbd、Menubar、NavigationMenu、ScrollArea、Sheet、Sidebar 消费者登记 |
| 其他原型 | 4 | ExamEditor 两文件、ListComposition、TeacherGrading 消费者登记 |

导航的有限登记读取函数另行只读实跑，退出码 **0**：18 个来源及精确声明完整性通过，状态为 **metadata-registered / automatic conformance unproved**。现有记录含 1295 个 CSS paint、312 个 binding、2 个 inline paint。135 项是明确 no-paint；350 项记录了角色和源父表面，仍不能当作自动对比度通过；810 项待补证据，按六组只汇总一次：祖先未证明 621、调用方 alias/状态/cascade 128、继承颜色 26、渐变 21、resize 邻接/透明度 8、系统颜色 6。

18 条提示来自原消费者扫描分支；已有有限登记完整性结果不会遮蔽该分支，也没有授权自动颜色合规。**本导航剩余的是自动颜色证明及检查状态表达的闭合，人工对比度与可读性检验已完成，无需据此重复请求。**若要宣称自动 Token 合规，仍需为上述六组提供限定的来源、状态、真实父背景和 alpha 证据，并保留原文字 4.5:1、意义内容 3:1、critical/interaction 角色及 Category/raw 检查。

17 个来源匹配 review02；`samples.css` 属于独立的早期 G1 gallery 范围，不能扩大 review02 人工验收。其余 **192 条**不属于这 18 文件的颜色登记范围：其中 Tree/Breadcrumb 的 19 条归独立组件合同；其他旧场景/组件 173 条归各自工作包。G1、Tree、Report-A 合计 **56 条真实对比度/资格诊断**保留，导航人工接受不消除它们。

日志还列出 **3073 个待审对比度组合、396 个待审颜色资格配对、110 个已明确接受但仍未达原阈值的对比度例外**。这些是组件组合汇总，不是本轮新增导航失败，也不是可读性通过，不与 210 条相加。旧 G1/Report-A 账本和发现记录未改；最新精确来源、行号、SHA 与细分见 [governance-attribution.json](./governance-attribution.json)。
