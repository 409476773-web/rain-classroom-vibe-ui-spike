# review-06 · R4用户反馈证据 · 2026-10-03

本目录保存候选05之后23条R4浏览器批注的增量实施和验证。对应[workpack逐项报告](../../../../../../../rain-classroom-vibe-ui-spike/docs/rain-navigation-codex-workpack/reports/G2-review-06.md)。冻结原稿、G1人工通过以及候选05的历史均保留；G2 Human Gate仍pending，W6–W8未完成。

运行入口：[R4课堂互动](http://127.0.0.1:5198/?sample=R4#navigation-v042)。本轮样式位于`.nv5-r4[data-scene="interaction"]`，使用已有Rain颜色、字体、spacing、radius、Focus Token和AvatarGroup／AvatarGrid／Avatar／IconButton；无Public Token或依赖变更。

## 证据层次

- [before-v2测量](before-v2/measurements.json)：实施前九状态，1200／1440／1600的compact、expanded、ungraded；没有pageerror。
- [最终after-04测量](after-04/measurements.json)：末次context标题小修后的九状态，0 pageerror；[1440展开](after-04/R4-interaction-1440-expanded.png)、[compact](after-04/R4-interaction-1440-compact.png)、[ungraded](after-04/R4-interaction-1440-ungraded.png)。
- [最终inverse-final-03测量](inverse-final-03-measurements.json)与[截图](S4-interaction-1440-inverse-final-03.png)：暂展context标题22px、头36px、无横溢出，context／queue四个图标控件32px；正文保持Light。
- [after-01测量](after-01/measurements.json)：初轮组件及密度修改后的九状态，初轮5契约GREEN；对应[初轮机器结果](browser-validation.json)与[BROWSER-QA](BROWSER-QA.md)。
- [after-02测量](after-02/measurements.json)：追加Token收口后的九状态，已核对几何一致，0 pageerror；这份快照不是修正temporary cascade之后的最终paint声明。
- [after-03测量](after-03/measurements.json)：temporary平台白底cascade修正后的九状态；[最终Dark颜色修正的Light核对](current-light-proof.json)对应[1440展开同像素图](R4-interaction-1440-expanded-current-light-proof.png)，CSS `6b09bbce…`与after-03同像素。这是最后context几何修正前的历史证据，最终结果使用after-04。
- [after-03展开态前后图](R4-interaction-1440-expanded-before-after-final-03.png)、[after-03紧凑态前后图](R4-interaction-1440-compact-before-after-final-03.png)、[after-03未评分前后图](R4-interaction-1440-ungraded-before-after-final-03.png)：左before-v2、右after-03，同原像素。
- [S4 inverse-final-02测量](inverse-final-02-measurements.json)与[截图](S4-interaction-1440-inverse-final-02.png)：CSS `6b09bbce…`的局部Dark外框；最后context标题缺陷由此实际截图发现；该图是诊断历史，修正后的最终图见inverse-final-03。
- [初轮展开态前后图](R4-interaction-1440-expanded-before-after.png)、[初轮紧凑态前后图](R4-interaction-1440-compact-before-after.png)、[初轮未评分前后图](R4-interaction-1440-ungraded-before-after.png)：左修改前、右after-01，保持原像素，不遮罩或移动截图消除差异。
- 首次采集fixture未因同URL重新导航而重置React状态，失败部分保留于before-capture-diagnostic与[capture-before.log](capture-before.log)。完整before-v2使用独立画板查询参数、实施前保存，诊断轮不作为通过证据。

截图使用Chromium、DPR1、浏览器1800×1100、实际画板1200／1440／1600×800。用户批注窗口1176×771不是新增断点；1200展开平台采用既有temporary覆盖层，1440／1600可常驻展开。选择小组后恢复紧凑平台，不改变当前业务对象。完整原尺寸查看及实际浏览器操作范围见BROWSER-QA；本轮不追求与旧原稿pixel identity，因为新的局部视觉数值已由用户明确指定。

## 已实测几何与Token

| 项目 | 修改前 | 已采集修改后 |
| --- | --- | --- |
| 活动track | 115px | 92px |
| 活动entry | 85px | 66px，natural height |
| 队列条件区 | 138px | 91px，数量与筛选同排 |
| 列表可见高度 | 272px | 350px，增加78px |
| 1200temporary展开列表 | 248px | 326px，同样增加78px |
| 课堂条目至splitter | 10px | 4px |
| 恢复／课程栏 | 48／56px | 56／44px |
| 进度／metadata gap | 3／11px | 4／4px |
| 小组区域头／标题 | 40／13px | 36／15px；queue水平padding12px；context另按注释18压缩 |
| 列表label／详情h3 | 13／18px | 14／16px；详情line-height22px |
| footer三个控件 | 20／20／32px | 全部32×32px |

实际颜色与公共Token解析比较：活动浅底`Background/Neutral/2 = rgb(247,249,255)`；进度底`Fill/Neutral/Solid/3 = rgb(227,233,253)`；当前progress／平台current`Fill/Brand/Solid/3 = rgb(198,216,255)`；其他progress`Fill/Neutral/Solid/1 = rgb(204,212,237)`；未评分`Text/Neutral/3 = rgb(73,93,135)`。未评分为具名状态，不把所有分数统一染绿。四位成员的官方图片可见、完成解码，AvatarGroup无More按钮和嵌套操作；完整稳定ID在过滤前分配portrait。详情使用AvatarGrid，账户使用具名button的Avatar。

本轮使用设计方法V01配色职责、V04文字层级、D02去重复并组织空间、D05依据真实内容/容器适配。56／44／36px是局部feature几何，不新增全局Height Token。Spacing、字号、行高、圆角都取现有公共变量；完整内容不能靠1176专用缩字维持。

## 测试与收口

[最终技术汇总](technical-validation.json)记录各检查与源码归属。本轮实际44个浏览器契约（原W5 38＋新反馈6）；历史初轮GREEN、footer单项和截图采集不重复计数。最终源锁：CSS `b17fd7cdc05a802b23b1ae03b870739399a89eff2f311a68eb2ce58a865793a6`，TSX `02d4d49f5c6635d897dbeb32132016eb46c3881342e30f7396fcf6ead126ab40`。

| 检查 | 当前真实状态 | 输出 |
| --- | --- | --- |
| 新5项反馈契约修前 | 5 RED，保留失败 | [contracts-red.log](contracts-red.log) |
| 初轮5项反馈契约 | 5 passed | [contracts-green-01.log](contracts-green-01.log) |
| footer三宽度补测 | 已有第5项1 passed，不重复计数 | [contracts-green-02-footer.log](contracts-green-02-footer.log) |
| 初轮Playground构建 | 通过；不能替代末次context源码构建 | [initial-build.log](initial-build.log) |
| W5九场景既有矩阵 | 38 passed；包含R4grading／R5／R6／独立消费 | [w5-regression.log](w5-regression.log) |
| 最后追加Token后的5契约 | final-03为4 passed／1 failed，temporary平台白底cascade已修；失败记录保留 | [contracts-green-03-final.log](contracts-green-03-final.log) |
| 最终6项反馈契约 | 6 passed（8.5s，含1项inverse）；初轮5项及补测不重复计数 | [contracts-final-08.log](contracts-final-08.log) |
| focused | 9个文件／87项passed | [focused-unit.log](focused-unit.log) |
| 候选与复用资产合同 | 12候选＋4复用组件passed | [asset-validation.json](asset-validation.json) |
| 当前源码／manifest | 最终61项hash＋3个manifest passed | [current-source-validation.json](current-source-validation.json) |
| 新段Token源审计 | 41个Foundation变量存在，新R4段raw color为0；末次context源码已覆盖 | [token-source-validation.json](token-source-validation.json) |
| 文件与历史保护 | 10582仓库＋249workpack文件passed；越界变化0，原稿／G1／branch／HEAD不变 | [protection-audit.json](protection-audit.json) |
| 最终Playground构建 | exit0，保留既有bundle体积warning | [final-context-build.log](final-context-build.log) |
| 最终九图采集 | 1采集测试passed，9状态，0 pageerror；不计为额外业务契约 | [capture-after-04.log](capture-after-04.log) |
| 最终测试项目typecheck | exit1；共7项既有错误，新反馈spec／config没有错误 | [final-tests-typecheck.log](final-tests-typecheck.log) |

final-03失败没有弱化断言：通用temporary区域新增白底的specificity高于平台底，导致1200平台暂展paint变白；实现已将白底限定到非Platform临时区域，平台继续使用其Light BG4／局部Dark BG1。独立复核另发现RegionHead legacy button30px规则覆盖IconButton32／18，现已删除该尺寸覆写；[原needs-fix审阅](independent-component-review.json)保留，[closure-04](independent-component-review-closure-04.json)在CSS `c65973a7…`上scoped-passed。closure-04的组件结构范围不归因到之后的Dark颜色或context几何源码；后续Dark颜色由独立Token实测覆盖。[closure-05](independent-component-review-closure-05.json)在最终`b17fd7cd…`hash上scoped-passed，核对Dark/context头的全部差额、TSX不变与105个共享文件保护；没有把组件源码审阅冒充浏览器实测。

共享helper的消费影响需单独看W5回归：RegionHead的pin/hide和Platform footer的库组件复用也影响R4批改、R5、R6及对应S；R4grading个人头像改为官方图片fallback。新的密度/字号/Token CSS只作用R4 interaction。局部inverse只标记R4交互Platform与默认RecoveryBar，正文保持Light，Popover沿用既有nearest-theme portal能力；不设置全局主题。

[独立Token级联实测](independent-token-cascade-review.json)记录inverse颜色与级联收口，status为passed。原inverse五项family aliases和恢复颜色的specificity冲突已在本轮局部范围覆盖，平台容器也明确解析`Text/Neutral/2`；选中图标定位实际leading Part，修正曾匹配0的inline-svg选择器。实际S4深色外框和已有R4Recipe inverse props两个场景的16个computed比较全部匹配，含container／leading及其真实Icon span／普通导航／默认恢复按钮／Light正文；0 pageerror，读取期间两份源码SHA不变，CSS `6b09bbce…`。后续context标题小修不改Token映射；这16项不冒充最新geometry源码的复测。默认RecoveryBar以运行中的既有导出Recipe在1440px临时测试host渲染，检查后卸载，未修改源文件、paint或全局主题。这份结果范围是Token级联，不是新独立浏览器契约数量或完整Dark/对比度验收。

最后inverse截图发现temporary context内15px标题、12px重复暂展small及两个IconButton32挤成两行，超过36px头高。现仅R4 interaction context头横padding2→0、strong nowrap、隐藏重复temporary small；pin／恢复具名状态保留，queue左右12px不变。148px最小context有132px内容宽，可容纳60＋64＋6px。77项既有局部选择器加两项context选择器共79项，仍限定R4 interaction；Token值未变化，after-04／inverse-final-03及最终六契约已复核通过，暂展标题实际22px、头36px且无横溢出。

Human视觉、VoiceOver、完整对比度、多浏览器／DPR2、全部N01–N38及W6–W8仍未通过此证据关闭。G1历史、原稿SHA、公共UI/Foundations与依赖锁保持保护，保护结果已存并通过；最终源码／manifest和Token源审计按上述hash核对。
