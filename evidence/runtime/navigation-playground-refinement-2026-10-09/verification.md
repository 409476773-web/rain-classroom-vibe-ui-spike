# 八类导航推荐场景实施与验证

状态：2026-10-10，授权范围实施完成，AI 实页对照 passed；人工运行视觉 awaiting-user-review。

工作模式：System Mode 管理现有 Registry 消费记录，新增场景保持 Local Experiment；公共组件继续为既有 Registry Candidate。本次没有晋升、发布、业务迁移、Figma 或 Git 操作。唯一实施源为 `.worktrees/card-v2`、`codex/card-v2`，现有未提交内容作为基线保留。开始前的文件、哈希与保护副本见 `source-before.json`；当前合并源见 `source-after.json`，不把整份共享文件的其他并行变化归入本切片。

## 交互入口

| 组件 | 页面 |
| --- | --- |
| ObjectNavigator | http://127.0.0.1:5376/#object-navigator |
| ScopeNavigation | http://127.0.0.1:5376/#scope-navigation |
| ConnectedSurface | http://127.0.0.1:5376/#connected-surface |
| NavigationList | http://127.0.0.1:5376/#navigation-list |
| Workspace | http://127.0.0.1:5376/#workspace |
| NavigationTabs | http://127.0.0.1:5376/#navigation-tabs |
| NavigationBar | http://127.0.0.1:5376/#navigation-bar |
| SegmentedControl | http://127.0.0.1:5376/#segmented-control |

每页保留完整建设页入口。目标来自四份已确认静态方案，实际外观服从 Rain Tokens 与已有组件合同。

## 实际变化

- 新增四组具名局部场景与 CSS：`object-navigator-recipes`、`scope-connected-recipes`、`navigation-workspace-recipes`、`navigation-switching-recipes`。对象页包含学生批阅、常规两行活动卡、四张实际 PNG 讲稿；范围页与连体页共用范围内容；纵向目的地与可恢复编辑工作区分开；内容 Tabs、课程目的地与批阅遍历轴维持各自语义。
- 独立文档首屏采用推荐场景；原高级状态通过 keepMounted Collapsible 保留，旧 Workspace chapter 深链接继续进入高级例。示例代码指向实际局部源码与依赖，页尾保留公共最小调用。
- 指定 A1/A2/A3/A5/C1/C2/C4/C5/R2 共用局部外观或对象数据。R2 只新增 CSS 消费，保留200个班级与原编辑工作台。
- App 与 ComponentAssetPage 的两个标题聚焦点仅豁免同页 NavigationList / NavigationBar query；新目的地保留原生链接、修饰键、刷新和历史。
- 唯一共享样式修复为深色 portaled Scope dropdown 的语义主题映射。公开 API、普通 Tabs 与浅色默认未改。
- 现有 Registry / Manifest 的当前源记录同步，旧接受快照与纯 family item.files 保留。R2 本地闭包十文件；W3 Gallery 本地闭包十五文件，包含四张 PNG，并显式记录 DataBar 共享来源。导出器读取已有当前指针，并将新推荐场景的两个测试留在 Gallery 外；原四个 R/S/W6 场景测试保留，不扩建 Gallery 下载。

源文件与调用范围都包含在 `source-after.json`；四组计划与 `docs/ai/navigation-v042.md`、`status/current-phase.yaml` 同步执行状态。

## 实际检查结果

| 检查 | 本次结果与证据 |
| --- | --- |
| 导航相关单元／交互 | 10个测试文件、116项通过；`unit-verified.json` |
| 独立文档浏览器 | 15项通过，包含30入口、八页推荐、键盘、草稿、焦点、地址历史、窄宽、深色与200% CSS缩放；`browser-verified/g123/report.json`。最后 Scope / Segmented / 八页主题缩放补查3项通过：`browser-closed/g123/report.json` |
| W3 建设页与消费者 | 7项通过；76px无缝学生行、原生 radio、两行120×6px进度、实际缩略PNG、R1/R3与独立消费者；`gallery-final/w3/report.json` |
| G1 指定入口与范围回归 | 5项通过；A1原生目的地、A4手动激活、R2低高度、1200/1440预算、More未展示计数；`g1-final/g1/report.json`。最后范围补查3项通过：`scope-closed/g1/report.json` |
| Workspace 既有行为 | W4三项＋W6一项＋W7三项通过；嵌套Escape、首击、splitter、未能固定时仍暂看、真实滚轮、深色平台与宽窄返回；`workspace-guards/{w4,w6,w7}/report.json` |
| Playground 类型与构建 | 实际通过；`build-verified.txt` 包含类型检查与生产构建。保留了现有较大 bundle 的构建警告，没有作额外分包或性能声明 |
| 全测试源码类型检查 | 未通过：其他模块的 Toast ByRoleOptions 及两份图表配置类型错误，详见 `tests-typecheck.txt`；本次新增导航类型错误已修正。未修改这些其他模块 |
| 当前依赖与历史保护 | `metadata-verification.json`：两个 Registry 当前63个源哈希吻合，历史源与 Gate 保留，纯公共family文件不扩入Gallery，三个共享Manifest旧文本和Sheet QA保留 |
| 现有导出只读检查 | `export-plan.json`：39项Registry、397个运行源、851条已解析本地边，writes=0。范围是R/S/W6，不声称A5导出包通过 |
| AI 视觉对照 | 项目根 `design-qa.md`：final result passed。原图与真实捕获放在同一输入中，12份完整／聚焦组合见 `qa/comparison-facts.json`；未作虚假逐像素或密度等价声明 |
| 长内容实测 | 64字资料名、空白添加阻止、390px继续编辑与草稿保留通过，pageerror=[]；`qa/long-content-facts.json` |

以上为34个独立浏览器用例，针对修正的重复运行未加进总数。声明通过只限所列范围。

## 实际失败、修正与复核

1. 深色 Portal 的结果深字：真实浏览器先失败，补语义变量映射后通过，关闭时焦点回原触发器。
2. 独立审阅发现保存后队列分数仍为7.0：单元先失败，读取同一草稿后通过，清空分数不回退初始值。
3. 同一审阅发现200%缩放页签线偏移418.39px：浏览器先失败，容器坐标归一化且对齐标签底边后通过。独立复核误差中心0px、底边≤0.047px，恢复普通缩放也对齐。
4. 同图QA发现Workspace默认备注露出不足与全高暂看：保留前图；调整局部阅读密度、720px工作区、两行备注与380px暂看上限，实测完整备注与稳定主内容几何。
5. 同图QA发现窄Scope标签截断：补读取实际标签叶子而非外层span的回归；5班与10班均失败后修正。106px班级槽、86px公共槽下完整名称可读，叶子内容scrollWidth=clientWidth=90；More计数仍为9。
6. 单元冷加载测试的默认1秒findBy超时：两次复现始终停在现有异步加载状态，后续同模块测试和浏览器正常；针对首个冷加载断言允许5秒等待，最终116项通过，不把此检查当性能基准。

## 人工检查点与未验边界

下一检查点是用户在上述实际页面审阅视觉与动效。Safari、VoiceOver、真实触屏、完整对比度、全库回归与生产性能未验。AI对照、构建与键盘通过不替代这些验证，也不替代Human Gate。

评分、备注、资料添加和保存仅属于当前演示实例；刷新会重置，无后端或真实教材/PDF服务。历史视觉接受只对应历史源码，不自动覆盖本次精修。未创建可下载Gallery包；未提交、推送、发布、迁移或写Figma。

导出测试边界另以断言复核：先确认新局部测试被误带入旧包，再排除不在运行载荷内的两个测试；四个原 R/S 场景测试仍保留。证据 `export-test-boundary.json`，未实际创建新导出包。

最终文字对比度抽查：深色已选／悬停结果发现3.1:1后修正并通过回归。六个指定文字状态抽查通过，浅色当前4.6:1，深色当前12.43:1、普通13.55:1。证据 `dark-current-green/g123/report.json` 和 `contrast-spot-final-results.json`；这不是完整对比度审计。共享样式修正后生产构建再次通过。
