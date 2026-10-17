# 图例、第二批与当前收口 · 2026-10-11

用户授权：“确定。继续按之前的规划：明确图例规则并推进第二批 → 合并当前体验审阅、清理工程与文档遗留”。实际工作区为 `.worktrees/card-v2`、`codex/card-v2`；5173提供该工作区Playground。既有755份文件先完整冻结，见 [baseline-files.json](baseline-files.json) 与 `before/`。本轮属于现有未发布候选增量。

## 已落实范围

- 普通图例使用临时读数，鼠标与键盘同源；点击／Enter／Space读取，Escape／失焦／外部点按清除，指针离开恢复键盘目标。更新／重排／移除按稳定唯一标签跟随；不隐藏系列或改写分母。自定义与compound子内容仍由宿主提供按钮。详见[事件合同](../../../docs/ai/chart-legend-rules.md)。
- Pie小类别／长名称／移除；Ring零／满／零目标／超目标；Gauge既有量程校验；Funnel缺测／增长／零入口／高于入口；Sankey细流向／零边。具名边界状态、默认与来源变体控件和实际源码下载同步，精确表保留原值，正常数据不重编。
- Heatmap逐日键盘读取、可见定位、日期更新／移除、真实0与缺测；11来源变体保留真实日期与既有日历合同。世界展示地图释放页面触摸滚动。Matrix复用稳定ID巡读和本地滚动。
- 当前中国宿主实际复现两处缺陷并局部修复：原比例单指滚动的pointercancel不再误移地图；展开600px精确表在390px页面内横滚，不撑宽页面。两个私有拥有者之外的实际地图资源、数据和Matrix实现保留，详见[Matrix／China证据](heatmap-matrix-map/matrix-china/verification.md)。
- 四处旧类型错误修正；旧China颜色消费者记录重新生成；Network索引状态恢复既有枚举。详见[工程记录](engineering/verification.md)。全仓3项冻结B2／danger治理失败有改前同源证明，不作为图表检查通过或扩大修改的理由。

共享图例复核额外发现Escape后原位重复点击遗漏：原自定义测试的宿主点击回调掩盖该问题。改为无额外回调的用例先出现2个失败，随后共享capture直接读取当前项；见 [RED](legend-click-capture-red.log) 与 [GREEN](legend-click-capture-green.log)。Heatmap等级点击按同一临时读数规则修正，旧“点击即清除”检查被明确替代。

共享图例使用点、公开Props与实际页面的独立复核见[只读审阅](independent-legend-review.md)；发现的点击遗漏已关闭，其余所审范围未见新增阻断。

## 合并检查

本轮本地技术交付已完成。以下为当前冻结源码的实际结果，不从历史运行重复累加；用户体验审阅保持独立。

| 范围 | 当前结果与证据 |
| --- | --- |
| 相关单元／合同 | 56文件726项通过，[当前完整日志](unit-current.log)；不与各组目标单测重复累加 |
| 类型 | 工作区各包、Playground、Prototype与测试项目均退出0，[类型日志](typecheck-current.log)；原4处诊断已修正 |
| 构建 | Playground与Prototype标准构建均退出0，[构建日志](builds-current.log)；保留既有分块／体积提示 |
| 完整来源消费 | 当前170下载、16家族类型与构建通过，3219模块全部在独立host，0外部模块路径／alias、源码变动为空；[事实记录](consumption-current/facts.json) |
| 定向下载消费 | 19 Registry闭包、18真实下载、35宽窄观察通过；独立类型／18入口构建、2223模块全在同一host，0页面异常／失败请求／外部origin／alias，源和host变动为空；[最终事实](targeted-consumption/run-05/facts.json)、[汇总](targeted-consumption/summary.json)和[完整范围](targeted-consumption/README.md)。12默认边界／网格、5变体与1中国广东宿主使用实际下载；17组检查两档宽度，中国专查390px |
| 普通图例实际浏览器 | 5项通过：宽1440／窄390、普通／减少动效20宿主检查，加4个自定义图例Escape后重复读取；[日志](legend-browser-current.log)及`legend-browser/` |
| 前后页面 | 各38区域，0页面异常；正常精确表38组逐字一致。见[对照事实](presentation-comparison.json)、`before-browser/`与`after-browser/`；新增边界控件和准确日历域使部分宿主尺寸改变，不声称整页像素一致 |
| 径向／流向 | 8项真实浏览器、164截图、176观察，90目标单测通过；[冻结与结果](radial-flow/source-freeze.json)。最终合并单测已覆盖其当前源码 |
| Matrix／China | 4项真实浏览器，390px巡读、实际触摸仿真、视图与失败恢复、精确表；[记录](heatmap-matrix-map/matrix-china/verification.md) |
| Heatmap／流向／世界图 | 15项真实浏览器、63目标单测通过；11日历变体、5流向变体及默认读数覆盖1440／390与普通／reduce，0页面异常；[最终事实](heatmap-matrix-map/final-verification-facts.json)与[日志](heatmap-matrix-map/browser-after-06-final.log) |
| 生成一致性 | [图表样式](chart-style-generation-current.log)、[Token](token-generation-final.log)、[资产索引](asset-index-final.log)均退出0 |
| 文档 | 302本地文件链接、28锚点及19唯一入口通过，[文档事实](docs-check.json)；主报告后续新增链接另在收口时复核 |

首轮相关单测720通过、4失败：一项下载测试错误依赖Props字符串相邻排列，三项在并行构建／消费负载下超时。保留 [首轮](unit-final.log)、[定向复查](unit-final-retry.log)与[矩阵串行复查](unit-matrix-serial-final.log)；修正断言后当前完整726项通过，未放宽超时或删断言。首轮浏览器在受限环境无法启动；第二轮的错误Candlestick变体ID已依据真实来源清单修正，最终5项全通过。前两轮独立消费之后还修正生成CSS／Heatmap等级事件，已被上述完整当前消费替代。

上述页面检查合计32个不同案例（8＋5＋15＋4），不把目标单测与726项合并单测累加。径向／流向和Matrix／China的拥有者源码保持冻结；后续共享图例点击修复与Heatmap事件／生成样式由当前合并单测、5项图例和15项热力图检查覆盖。按实际清单统计，不推导每个图／设备已完全验收。

定向消费逐项保留原始失败与修正：精确表details定位、Gradient把加载层当数据格、宽屏无溢出却要求scrollLeft>0、China将带单位／无数据文本直接转数字，均为检查代码错误。仅修检查拥有者，沿同一host、同一源码SHA保留已通过观察并继续，最终唯一35项全部通过。China21行初始revision2／更新revision3按实际下载统计与格式函数逐行核对。没有改写运行时来适配检查，也没有据此宣称完整干净安装或全设备验收。

来源锁保留原上游commit与hash，当前181份native闭包包含新增私有图例辅助文件；该文件标为 `rain-local`、无伪造上游hash。源锁变动见 [source-lock-changes.json](source-lock-changes.json)。生成样式只新增热力图按钮重置及内部焦点入口所需作用域utility，既有规则保留，见 [chart-utilities.diff](chart-utilities.diff)。

实际正常数据27个原函数逐字一致，见[数据源保护](radial-flow/normal-data-source-comparison.json)。244份最终运行源码hash见[完整冻结](merged-runtime-source-freeze.json)，755基线对照见[本轮改动范围](source-scope-current.json)。原配色、共享样式、Mini数据／尺寸与地图资源保持；CSS仅中国表容器min-width及生成utility变化。新增边界控件与文字保持宿主私有，不推广为新公共资产。

最终[收口校验](closeout-verification.json)确认244运行源码无变动、755基线707份保持／48份已审增量、阶段YAML有效、冻结B2子阶段逐值保留；302条先行文档链接／28锚点检查之后另复核297条当前相关文件链接。`git diff --check`退出0。

## 体验审阅与未覆盖项

最新19入口、170来源变体、已确认范围与当前待审项统一在[合并人工审阅](human-review.md)。蓝灰15项、P3三例、Network四组、演示数据和当前局部曲线的既有确认分别保留；本轮新图例、边界状态、窄屏与输入体验仍待用户确认。

实机Safari／VoiceOver、实体触屏、完整对比度、强制颜色、深色主题、任意生产数据与规模性能未登记通过。独立消费者复用已安装依赖缓存，不声称干净安装。未发布、写入Figma、执行业务迁移或进行Git提交／推送。
