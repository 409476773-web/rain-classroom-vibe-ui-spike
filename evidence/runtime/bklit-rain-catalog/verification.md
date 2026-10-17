# Bklit → Rain 图表候选库交付与验收记录

**2026-10-08样式反馈更新：**互斥堆叠柱累计刻度、13px 图例与小号标签、图例间距、弧形／线形仪表读数、旭日默认反白文字与漏斗浅色数字已调整。[本次反馈冻结版](feedback-2026-10-08/README.md)的62项图库、4项文档页、23项独立消费检查及9项源码／颜色／动效合同检查通过。另一个授权任务加入蓝灰配方后，本任务保留其改动，对[当前合并版](feedback-2026-10-08/merged-current/README.md)重新执行2项反馈、6项文档页、23项消费和9项合同检查，全部通过；当前173份源码、消费快照和安装文件哈希一致。下方冻结版的97项检查及独立代码复核属于上一版本，不替代本次检查；本反馈批次未重新执行独立代码复核。候选仍未发布，新增样式待用户审阅，对比度不登记为通过。

**2026-10-08用户反馈：**「我觉得现在的视觉效果和交互体验很好。」据此将当前版本的整体视觉效果与交互体验记录为已认可基线，后续图型和配方沿用。该反馈未单独列举逐图／逐配方检查结果；下方技术证据及专项验收状态继续按各自范围记录。

2026-10-08。范围为用户授权的完整17图计划。运行源码、Rain适配、9项配方、组件目录、源码下载、17份合同／Registry及两项独立消费已实现。当前为本地 `registry-candidate / unpublished`；本文件记录技术证据，用户对首版全目录的视觉／动效审阅仍为 `awaiting-user-review`，不能登记“首版全部验收完成”。

工作区：`.worktrees/card-v2`，分支 `codex/card-v2`，HEAD `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。本次没有commit、push、PR、远程发布、Figma写入或生产业务迁移。

## 可直接审阅与消费

- [17图本地图库](http://127.0.0.1:5387/bklit-catalog.html#chart-composed)：默认、配方、示例状态、更新／重播、窄屏、精确表与完整示例源文件。
- [组件文档](http://127.0.0.1:5173/#chart-composed)：G4图型目录、直达页面、导航焦点、真实API和源码下载。真实路由为 `/#chart-<id>`。
- [原生／Rain四样本对照](http://127.0.0.1:5387/bklit-validation.html)、[旧G2实验](http://127.0.0.1:5387/chart-validation.html)。
- 独立新宿主：[人数与比率报告](http://127.0.0.1:5391/?task=report)、[地区强度与多目标进度](http://127.0.0.1:5391/?task=regional)。
- 共享入口：`@rain-next/ui/charts`、`@rain-next/ui/charts/styles.css`；[README](../../../packages/ui/src/charts/README.md)、[选图规则](../../../docs/ai/charts.md)、[本地Registry](../../../registry/charts.json)。宿主同时加载Rain Foundations tokens、typography和focus样式。
- 原型和文档只维护一份实际示例；UI源码没有反向导入应用、Mock、页面或祖先布局。主UI入口不转导出图表；文档按需加载图表页面。

5387原服务在执行期间自行退出，确认端口空闲后从同一worktree／同一Prototype重新启动，没有终止其他任务服务。见[恢复日志](p5/prototype-server-recovered.log)。服务为本地预览，不代表部署。

## 17项运行、数据与视觉状态

下表的“通过”限定本任务Chrome自动检查、手算语义与独立审阅；全部视觉Gate仍待用户。每项有1440／900／390px默认、更新、适用悬停和几何记录，见[运行证据](runtime/)。没有原生hover的仪表等项目不虚构hover能力。

| 图型／批次 | 运行／数据 | 已实现配方与形态 | 专项结论和范围 | 用户视觉 |
| --- | --- | --- | --- | --- |
| 面积 area／P1 | 通过 | trend-soft、类别3配方；96×40迷你 | 同一日期读数一致，透明叠加不当堆叠；缺测不补零 | 待审阅 |
| 折线 line／P1 | 通过 | trend-soft、类别3配方 | 真实端点、单点、更新定位；不声称缺口插值／固定读数 | 待审阅 |
| 柱 bar／P1 | 通过 | 类别3配方、bar-gradient、bar-fade；分组／互斥堆叠 | 零基线；P01 .95→.4，P02圆头1→0；不支持本例负柱 | 待审阅 |
| 组合 composed／P1 | 通过 | 类别3配方；面积＋柱＋线 | 人／%双轴；完成／参与分母；零分母不造0%；两轴可见间距≥8px | 待审阅 |
| 饼／环饼 pie／P2 | 通过 | 类别3配方；innerRadius环饼 | 互斥类别构成；零总量不造100%；3／5系列焦点更新安全 | 待审阅 |
| 多目标进度环 ring／P2 | 通过 | 类别3配方 | 每项自身value/maxValue，不相加；0、满进度及多实例可读 | 待审阅 |
| 雷达 radar／P2 | 通过 | 类别3配方 | 固定维度0—100；多系列和长标签；不同量纲须先归一 | 待审阅 |
| 时间散点 scatter／P2 | 通过 | 类别3配方 | Date X、非负Y；不支持任意XY和负Y | 待审阅 |
| 漏斗 funnel／P2 | 通过 | trend-soft、category-near、category-solid；原生形态 | 阶段分母与增长解释；多实例渐变／纹理ID隔离 | 待审阅 |
| 仪表 gauge／P2 | 通过 | trend-soft；弧形／线形 | 百分比量程，40刻度；0／50／100对应0／20／40；实际蓝紫渐变 | 待审阅 |
| 桑基 sankey／P3 | 通过 | flow、category-near、category-wide | 中间节点守恒；单流420；图内短名称，提示／表保留完整名称；窄屏节点中心400及标签间距 | 待审阅 |
| 旭日 sunburst／P3 | 通过 | 类别3配方；下钻／面包屑 | 叶项求和、不重复加父项；精确数据和层级读取 | 待审阅 |
| 日历热图 heatmap／P3 | 通过 | intensity | 周日开始、7日一列；0与缺测区分；不是任意分类矩阵 | 待审阅 |
| 分区地图 choropleth／P3 | 通过 | intensity | 稳定ID值映射；无数据单列；自创示意GeoJSON，不是行政边界；未展示缩放 | 待审阅 |
| K线 candlestick／P4 | 通过 | sign | OHLC关系、涨／跌／平盘，多实例渐变唯一；方向不当好坏 | 待审阅 |
| 盈亏线 profit-loss／P4 | 通过 | sign；LineChart组合 | 零线、跨零与正负色／精确值一致；使用注册值域的Line | 待审阅 |
| 实时线 live-line／P4 | 通过 | trend-soft、sign | Unix秒、60秒窗口、≤120条；生产者暂停／恢复／卸载，减少动效手动追加 | 待审阅 |

“类别3配方”为 `category-near / category-wide / category-solid`。共9个公开配方ID，色值仅在 `.rain-chart` 中声明为 `--rain-local-chart-*`，并映射到原生变量；元信息见[recipes.ts](../../../packages/ui/src/charts/recipes.ts)。P06只覆盖原生可配置仪表，P08关系网络仍是能力缺口；迷你尺寸不额外计图型。

## 来源、最小补丁与样式归属

固定MIT源码：[bklit/bklit-ui commit 5d699897b2dde26374cf15501dbaadbc52cea982](https://github.com/bklit/bklit-ui/tree/5d699897b2dde26374cf15501dbaadbc52cea982/packages/ui/src/charts)。共享163个原生源文件，来源锁逐项记录上游／本地SHA-256及差异；[来源锁](../../../packages/ui/src/charts/vendor/source-lock.json)和MIT许可在完整Registry闭包中。163包含SunburstHint；P0早期162的统计已修正。

保留Bklit Compound API、曲线、材质和正常模式弹簧／展示强度。补丁限于：
- 上游alias转相对导入；17入口的组件身份和部件追踪。
- 纵轴主题间距及实际柱／端点边缘偏移；左右可见间距检查。
- 桑基首次测量有效尺寸防护，以及桑基／K线／漏斗的实例专属ID。
- 减少动效时共用spring直接读数；补齐高亮片段；日期ticker用真实日期偏移初始化，首悬停Sep16与9月16日提示相符。

静态原生utility由已安装Tailwind生成并逐条限制到 `.rain-chart`，无全局reset、`:root`、`:host`或@property；消费者不需要宿主Tailwind扫描。36个原生chart／legend变量均有映射。普通Rain Switch在图表样式加载前后计算样式相同；强读数保留Neutral/1或2，图例／辅助标注用更浅角色及Regular字重。Focus复用既有Rain轮廓／halo，forced-colors有局部对应规则。

原生比较仍使用P0固定74文件副本，源文件哈希全部未变，误留的89个额外副本已移除；Rain列和图库使用唯一共享来源。见[基线隔离](p5/native-baseline-isolation.json)。

## 实际验证

最终命令、退出码与计数在[最终检查清单](p6/checks.json)；最早失败／修复记录保留，不能用最终成功覆盖失败历史。

| 检查 | 已记录结果／日志 |
| --- | --- |
| 最终17图三宽度、更新／悬停、所有配方／状态、ID、轴距、系列焦点、减少动效、桑基、仪表 | 60项通过，[p6目录日志](p6/catalog.log) |
| 最终文档17入口、源码下载、导航焦点、390px与普通Rain样式隔离 | 4项通过，[p6文档日志](p6/playground.log) |
| 原四样本Native／Rain回归 | 6项通过，[独立目录日志](p5/native-rain-browser-final.log)与[p6截图](p6/native-rain/) |
| 旧G2回归 | 4项通过，[独立目录日志](p5/g2-browser-final.log)与[p6截图](p6/g2/) |
| Registry／163源码哈希／作用域／数据边界、颜色登记、索引、减少动效与目录合同 | 14项通过，[最终合同日志](p6/contracts-green.log)；并行运行中1项5秒超时保留于[首次p6日志](p6/contracts.log)，单独重跑未改测试或时限 |
| UI build（类型）／Prototype类型 | 退出0，[UI](p5/ui-build-final.log)、[Prototype](p6/prototype-typecheck.log) |
| Playground类型＋生产构建／Prototype图库独立构建 | 退出0，[p6 Playground](p6/playground-build.log)、退出0，[p6图库构建](p6/prototype-build.log) |
| 测试项目TypeScript／局部CSS生成一致性 | 退出0，[p6测试类型](p6/tests-typecheck.log)、[样式生成检查](p5/styles-check-final.log) |
| 独立手算语义／资源生命周期 | [17项正常＋更新34次对照](review/spec/exact-data-all-17.json)、[实时生命周期](review/spec/live-lifecycle-numberflow.json) |
| 独立代码／减少动效复核 | [审阅与定位证据](review/code/README.md)；正常保留spring，reduced立即跟随 |
| 颜色治理独立复核 | [颜色审阅](review/code/colors/README.md)，4测试通过、无登记阻断 |
| 干净宿主两项新消费 | 23检查、18截图、console=[]；[完整报告](consumption/README.md) |

构建成功仍有真实警告：固定Visx alpha依赖、上游use-client／sourcemap提示及大于500kB的chunk。Playground图表懒加载chunk约644.82kB／gzip203.30kB、局部CSS23.89kB／gzip4.80kB；Prototype图库约1518.69kB／gzip474.24kB，包含原型共用入口成本。最终字节数以构建日志为准；没有据此宣称性能预算通过，也未新增推测性的拆包架构。

两项独立需求从文档选择真实Parts，替换数据／中文标签／单位；没有导入当前演示页、Mock或Playground App。最终新宿主离线安装／数据／类型／构建均退出0；170个图表文件＋3个Foundations样式的173个安装哈希与冻结源码一致，285个symlink均在宿主内部，无workspace链接和宿主Tailwind。最终styles.css哈希 `ebdf65729bb932a55f5859b9f82a900b2087b2eef18a1a805a9668aa0a52020a`。最初离线缺包及辅助探测误失败作为历史保留；最新冻结宿主证据单列。

## 治理与未检项

4个本任务新增CSS的颜色登记通过：131条精确声明，包含89条共享样式、11条示例、8条文档页、23条图库页。严格逐声明／别名／selector／media匹配，改色、重复、越界、媒体移位和强读数弱化均会失败；没有按文件豁免。Foundations生成合同只增加131个colorCssConsumers和4个consumerPaths，除去该增量后精确还原P0哈希；全局Token值、Token合同、typography、theme、color registry未改。

**登记通过不等于对比度验收。** light／声明的全不透明表面上，27条contrast和16条weak-eligibility结果为pending-review，acceptedException全部false。Text/Neutral/5白底约3.708:1，未满足普通文字4.5:1阈值；强读数的4.5／大字3阈值没有降低。渐变／重叠／淡化后的实际可读性及dark未验收。见[逐项登记结果](p5/color-registration/rain-chart-color-registration.json)。

完整 `pnpm verify:governance` 仍失败：phase合同unknown status fields和根脚本集合不一致在P0已存在，根package.json本任务未改；[基线证明](p5/governance-baseline-proof.json)。另行运行evidence、boundaries、tailwind、tokens检查也有全仓未闭环项，包括旧页面颜色登记、其他组件授权／固定Token输出；日志在[p5](p5/)。本任务新增4文件已单独登记并复核，不通过扩大样式修改或降低全局门槛消除旧错误。不得称“全仓质量门通过”。

未运行或未授予：Safari／真实VoiceOver、物理触屏、完整图形键盘等效、所有日期跨月组合、全面对比度、深色、SSR、生产数据接入／性能预算；可选日历纹理的多实例审阅也未完成，本轮基线使用solid/intensity。所有图点都有精确表等稳定读取途径，仍不能据此宣称全面a11y合规。任意XY、分类矩阵、关系网络和图例隐藏／点击固定另列能力缺口。

## 原有工作保护与证据保存失误

P0记录33216个既有文件哈希。最终对照见[工作区保存核对](p6/preservation.json)；本次源码修改限定任务消费入口／依赖／精确登记／状态／索引，其他任务源文件保持原哈希。

早期旧页面回归命令漏设已有 `RAIN_BKLIT_EVIDENCE_DIR`／`RAIN_CHART_EVIDENCE_DIR`，覆盖14份原输出（13截图＋1动效JSON）。已把这次输出复制到本任务独立目录，找到1份字节相同原图恢复；另13份原字节无法从只有哈希的P0记录恢复。此处是证据保存失误，不能声称“全部历史截图保持原样”。原源码、入口与原生74文件未因此改变；原哈希、覆盖后哈希和恢复情况逐文件记录在[覆盖清单](p5/legacy-regression/historical-evidence-overwrite.json)。最终旧页回归已使用独立输出目录，不再覆盖历史记录。

## 首版集中人工验收入口

用户可在17项目录逐图检查默认效果、适用配方、入场／悬停／更新／离开，重点比较：
- 组合图两侧轴距、弱标注、日期pill与共享读数。
- P01／P02柱、迷你面积、仪表弧／线渐变。
- 桑基正常／长名称、双色流向与节点读数；旭日层级。
- 热图／地图强度阶梯、零／缺测；K线／盈亏／实时的语义色和动态过程。

本次只登记技术实施完成与scoped-passed自动验证。用户实际审阅范围另记；候选仍未发布，不能转成system-approved，也不会自行写回Figma／迁移业务／提交Git。
