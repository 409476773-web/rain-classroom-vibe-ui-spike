# 图表第三批当前技术记录 · 2026-10-11

用户“确定。继续推进下一批”授权既有计划的散点、盈亏线、K线与实时折线增量。实际工作区 `.worktrees/card-v2`、`codex/card-v2`，5173服务已核对该工作区。先冻结773文件与32个宽窄／动效页面，见[基线](baseline-files.json)、`before/`及[改前页面事实](before-browser/facts.json)。当前仍是未发布候选，第三批体验待用户审阅。

## 已实施

- 时间散点默认五系列与10来源变体提供96日期密集、同日同值重叠样本；私有日期控件读取全部系列的原值和单位。原hook按稳定日期刷新更新后的数据；目标移除或不能交互时清理提示及待执行帧。单指页面滚动释放，原双指选取保留。
- 盈亏线默认与Line来源行提供近零正负、连续零平台；保留完整值、符号、线性过零和非负／负值图例，日期读取不四舍五入丢失负号。
- K线默认与11来源变体提供96日期密集／全平盘；日期读取保留OHLC、上涨／下跌／平盘语义。非法关系仍由已有校验拒绘；共同hook更新同日期的OHLC浮层，不保留旧值。
- 实时折线默认与9来源变体根据实际plot可见性、页面后台、减少动效和用户暂停控制生产者／原生时钟。暂停时数据与时钟一起冻结；手动追加推进冻结时间，重播保留窗口。默认与变体下载记录当前暂停的points和frozenNow。
- 私有读取组件、边界Props、页面状态、实际下载闭包和使用说明同步。未新增公共XY选择API、连接框架、依赖或图表引擎。

## 当前验证

以下按当前冻结源码记录；目标测试与合并单测、旧运行与新运行不重复累加。

| 范围 | 结果与证据 |
| --- | --- |
| 相关单元／合同 | 63文件759项通过，[最终日志](unit-closeout.log)；覆盖新增父页快照往返、其余目标用例及既有图表／下载合同。此前758项保留[原日志](unit-current.log)，不重复累加 |
| 类型 | workspace各包及tests项目退出0，[最终类型日志](typecheck-closeout-roundtrip.log)；包含最终新增检查代码 |
| 标准构建 | Playground与Prototype退出0，[最终Playground](build-playground-closeout.log)、[Prototype](build-prototype.log)；保留已有分块体积提示，Prototype来源在父页补修中未变 |
| 完整来源下载 | 当前170入口、16族独立类型／构建通过；0 alias、外部模块路径与外部依赖链接，源变化为空；[当前事实](consumption-final/facts.json)。独立host复制139项已安装依赖缓存，未声称干净安装 |
| 定向实际下载 | 19 Registry闭包、14下载、32浏览器观察通过；涵盖默认边界、散点双轴／小点、盈亏近零、K线pattern／solid／非法与实时暂停快照；[定向范围](targeted-consumption/verification.md)。Live两份main与页面实际下载逐字节一致，8个宽度／动效组合复核实际plot离屏、模拟后台、恢复及真实root.unmount清理 |
| 最终Live状态往返 | 4个1440／390、普通／reduce模式中，empty／invalid／missing各自到zero／single，以及空态期间revision更新到2后恢复正常均通过；12次实际下载捕获与当前exporter逐文件一致，3个代表下载独立类型／构建通过并有12个消费观察；见[补充事实](targeted-consumption/live-state-roundtrip/facts.json)、[完整说明](targeted-consumption/live-state-roundtrip/verification.md)和[旧／新身份核对](targeted-consumption/live-state-roundtrip/phase-scope-shas.json)。代表消费同时验证65秒冻结、Enter追加及真实root.unmount资源清零；原32加4模式只计36项，旧host文件保持，仅新增137文件样本命名空间 |
| 散点 | 10浏览器用例、40来源组合与默认五系列；1440／390、普通／reduce、真实CDP单指与双指通过；[散点事实](scatter/verification-summary.json)、[完整边界](scatter/verification.md)。保留6条既有双指passive监听提示，未声称控制台零警告 |
| 盈亏线 | 4宽度／动效用例，默认与来源行近零、连续零、同日期更新及原符号通过；[日志](profit-loss-browser-third.log)、`profit-loss-browser/`。原过零4例复核另保留[日志](profit-loss-browser-first.log)，不重复累计 |
| K线 | 4宽度／动效用例，48宿主观察、48非法拒绘、8原位指针更新、96截图通过；[最终事实](candle-live/candle-browser/summary.json) |
| 实时折线 | 40宿主观察与4独立同页深路径通过；当前深路径验证实际离屏、模拟后台、65秒时钟推进、暂停／手动／重播、ordinary→reduce及hash切换后所属循环、observer和监听清零；[最终事实](candle-live/live-browser/summary.json)、[Candle／Live汇总](candle-live/verification-summary.json)。旧整页销毁未计为React清理证明 |
| 改前／改后 | 各32页面、0页面异常；32组正常精确表内容一致，[对照](presentation-comparison.json)、[改后事实](after-browser/facts.json)。新增控件使宿主尺寸变化；6个匹配偏移的plot区域仍有像素差异，不声称整页或图形逐像素相同 |
| 生成一致性 | 图表样式、Token生成、资产索引均退出0：[样式](chart-style-check.log)、[Token](token-generator-check.log)、[索引](asset-index-check.log) |
| 当前文档 | 当前相关文档的本地链接有效，见[文档核对](docs-check.json)；人工Gate与历史确认范围分开登记 |

27个正常数据函数和原4个边界函数的31份声明逐字保留，见[数据源保护](normal-functions-preservation.json)。原CSS、Token值、字体、正常图形参数与颜色保留；新增示例控件及说明改变局部排版。181份native source lock和211份当前Registry源逐hash匹配170消费，见[身份核对](native-consumption-source-integrity.json)。上游commit与hash保留；本轮3份native拥有者的局部变更见[source lock增量](source-lock-changes.json)。245运行源码冻结见[最终源码](merged-runtime-source-freeze.json)。

## 失败与检查边界

真实失败→修复→通过的目标用例覆盖浮层旧值、待执行帧和默认Live离屏／时钟行为；来源与具体日志见[Scatter记录](scatter/verification.md)及[Candle／Live记录](candle-live/README.md)。新增样本、日期读取和暂停下载有目标合同覆盖，未把测试环境失败当运行缺陷。

保留首轮类型诊断、ResizeObserver缺失的测试环境问题、select键模拟无效、窄屏focus导致指针离开，以及定向下载误将`-0.004`子串判为`-0.00`等原始运行。Live追加复核另保留在首次绘制前暂停测试时钟的超时、VM跨realm对象原型深等差异；修检查后逐文件字符串／字节比较均一致。仅修相应检查代码后复核；未添加假的菜单键处理或修改运行时适配断言。浏览器日期菜单只验证focus及实际selectOption，原生菜单方向键选择未证明通过。

独立代码审阅确认一处额外实际回归：已暂停的默认Live经过Notice卸载，再到零值／单点或更新后的数据，父快照可能沿用旧points，实际下载也会带上旧值。新真实ChartPage用例先1失败／3通过，修复父页state／revision控件的快照失效后4项通过，并纳入759项合并单测。仅保留paused，清除旧points与frozenNow；重播及配方切换不重置窗口。[最终只读审阅](candle-live/peer-review.md)核对两条动态父入口和其余reader／样本／Pnl／闭包／hooks，未见新的critical／important。原245冻结中只有父页变化、其余244与exporter／native／Registry保持，见[补修记录](late-page-fix.json)与[改前冻结](merged-runtime-source-freeze-pre-peer-review.json)。原32页面及Candle／Scatter／Live观察属于此前相同图形和拥有者源码；父页额外控制路径另以当前往返和实际下载检查覆盖，不把旧hash称为最新父页身份。

Token生成一致性通过，但[全仓Token验证](token-global-final.log)退出1，不能据此宣称全仓治理通过。冻结B2历史验证在本轮改前／改后仍返回同一错误，26个无关phase主段与91份foundation／政策／生成源保持，原special颜色引用保持，见[治理范围核对](governance-scope-proof.json)。第二批记录的3项B2／danger单测失败属于既有历史结果，未混入当前759项，也未修改政策或旧断言来通过。

四族当前入口见[人工审阅](human-review.md)，本轮方法与范围见[计划](../../../docs/plans/2026-10-11-chart-experience-third-batch.md)。真实Safari／VoiceOver、实体触屏、完整对比度、深色／强制颜色、生产规模与任意数据未登记通过。Live仍为Mock，真实断流／重连／过期以数据源接入为条件。未执行Git提交／推送、Figma、发布或迁移。

最终[收口核对](closeout-verification.json)记录245源码无漂移、773基线中的752份保持／21份已审增量、当前链接及phase有效、历史Gate保留、Git HEAD不变。当前生成复核仍全部退出0：[样式](chart-style-closeout.log)、[Token](token-generator-closeout.log)、[索引](asset-index-closeout.log)；完整全仓治理未登记通过。
