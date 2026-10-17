# P6 当前版本人审导航

本轮已完成当前版本的实际整体复核，见 [P6复核结果](p6-current-review/review.md)：工作台/报告当前入口、7组实际操作、覆盖限定、返工归类与1处说明修订候选。用户已回复“确定。”，当前本地整体交付及Input Group修订候选已确认，见[确认记录](p6-current-review/manual-acceptance.json)。

当前本轮整体人审 **accepted**；P5 用户反馈 **received**，三项修订已获用户确认。此页保留本轮审阅入口与确认范围，不扩大各组件独立Gate。耗时、tokens、费用及成本效率均为 **not-measured**。

打开 [当前组件库](http://127.0.0.1:5507/#components)、[批改工作台](http://127.0.0.1:5519/#teacher-grading)、[学习报告](http://127.0.0.1:5519/#learning-report) 与 [P5 课程资源引用更新](http://127.0.0.1:5518/)。P5 为虚构样本、本地草稿，无真实资源替换；刷新会清空。

2026-10-17 反馈闭环：标准 Select、小尺寸二级比较按钮与库内 PDF 图标已修订，用户回复“确定”，当前三项视觉修订 **accepted**；[确认范围与源码绑定](../../github-review-2026-10-17/p5/user-feedback-2026-10-17/manual-acceptance.json)，[修订及验证](../../github-review-2026-10-17/p5/user-feedback-2026-10-17/verification.md)。下方保留 P6 本轮整体复核入口；整体结果确认另见上方新记录。

| 审阅方面 | 有限审阅动作 | 对应证据与边界 |
| --- | --- | --- |
| 冻结资产完成度 | 在组件库目录查看 G1–G6；重点核对 FormItem、Select/NativeSelect 和 Data Table 的入口身份是否容易理解。 | [覆盖映射](coverage.md)为 G0 18＋G1–G6 46＝64/64结构对应；Label/Field复用FormItem、NativeSelect保留API且展示合并到Select、Data Table为Recipe。工程与浏览器结果见[本轮验证](verification.md)，不把目录映射当作64项人工接受。 |
| 首次业务使用 | 在P5读三项v2/v3变化，选use-01与use-04，再按课程或关键词过滤；检查区应仍显示全部已选，use-06/use-08只读不可选。 | [业务brief](p5-brief.md)、[读取合同与选型](../../github-review-2026-10-17/p5/design-notes.md)、[首稿与返工](../../github-review-2026-10-17/p5/first-draft/self-review.md)。[13组行为结果](../../github-review-2026-10-17/p5/final/behavior-results.json)属于开发者自查；后续三项视觉修订及用户确认见上方反馈闭环。 |
| 局部隔离 | 对照390px的原态、移除局部规则、恢复三张图，确认资源Tag变化与兄弟实例不变的关系；再看1440px对照。 | [实际运行隔离记录](../../github-review-2026-10-17/p5/isolation-check/README.md)：目标Tag x93→33→93，兄弟Tag与比较按钮逐字段保持，按钮开/关与焦点恢复实际执行。仅覆盖该规则、实例、状态及两视口；不同变体只与自身前后比较。 |
| 桌面/390px信息与交互 | 对照桌面和390px阅读顺序、标题/版本与位置归属。填写备注并开关版本/详情；底部勾选“下次保存模拟失败”，检查范围后保存、重试，再重新打开草稿。用Tab/Escape检查可达和关闭恢复。 | 最新[桌面图](../../github-review-2026-10-17/p5/user-feedback-2026-10-17/after-1440.png)／[390px图](../../github-review-2026-10-17/p5/user-feedback-2026-10-17/after-390.png)；[失败/重开与全部证据](../../github-review-2026-10-17/p5/README.md)。关闭查看不丢稿，明确放弃才清空；保存仍是本地草稿，发布引用保持v2。 |

## 既有 P1–P4 的限定记录

[status/current-phase.yaml 的 tokenFirstV12](../../../../status/current-phase.yaml)保留：P1为用户选定的稳定三列工作台方向，P2为教师批改页本地实现与批注；其[26条及追加16条记录](../../teacher-grading-annotations/verification.md)只确认对应页面视觉范围。

P3为用户选定的趋势/对照报告方向，P4为报告A V2视觉调整；[报告V2确认记录](../../learning-report-a/v2-feedback/verification.md)限定当前报告页、25条批注与最后六项微调。以上不转移为P5接受、全库对比度、原BM-D或发布验收。

本轮依据为[实施计划](../../../../docs/plans/2026-10-17-g1-g6-closeout-and-p5-p6.md)与[有限画面复核](visual-review.md)。真实Safari、读屏、物理触控、跨机器字体、完整对比度、真实服务、生产迁移与发布仍沿各自未验证边界。反馈只需指出页面、窗口和操作后的具体问题；当前整体结果已确认，P5三项修订及各资产原独立接受仍保留各自范围。

入口可读性：本次实际打开两URL均HTTP 200，分别渲染“Core UI，把高频动作先做准”与“更新资源引用”；文内本地文件链接已逐一检查存在。此可读验证不等于人审通过。
