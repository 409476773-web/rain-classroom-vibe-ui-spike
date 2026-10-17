# 曲线观感修复 · 2026-10-11

用户指出组合图及多个入口的曲线有细碎转折，并授权“确定，开始修复”。本轮修正绘图精度和当前Mock宿主的曲线选择；人工视觉验收待用户查看。实际worktree为 `card-v2`，分支 `codex/card-v2`、HEAD `321e1a0`；5173服务实际来自该worktree的Playground。

## 实现与保留

- 正常及缺测完成率采用 `completed / enrolled * 100` 的完整绘图值；显示读数在默认组合、时序双轴、散点双轴的Tooltip与表格中统一为一位小数。参与者为0仍不造完成率，缺测仍为空。
- 普通时序及组合的宿主通过本地 `trendCurve` 选择现有Natural/MonotoneX；连续观测使用更连贯的Natural，平台、零、缺测和本轮已知危险端点保留MonotoneX。没有新增曲线引擎或修改共享默认。
- Mini两档折线/面积及学期、两期、版本三个业务面积样本通过实际数据的Natural校准。明确的Linear/Step、已有手动曲线选项和其他图型保持既有用途。
- 全部原始人数、日期、非比率数据、CSS、配色、线宽、填充、布局、字体、图例及共享UI源码不变。365个基线文件中350个字节相同，15个变化属于7个运行时宿主、5个测试、2个指引及phase。详见[最终范围](final-scope-verification.json)。

相关方法为V05、D05和I02：使用既有组件能力，整页和窄屏验证，趋势形态与精确读数并存。经验留在本任务记录；用户确认之前不新增全库曲线规则。

## 技术证据

| 范围 | 当前结果 |
| --- | --- |
| 精度与调用者先失败后通过 | 原3个精度/显示失败与2个调用者失败；改变曲线之前2个真实路径C2接缝失败；[精度RED](precision-red.log)、[调用者RED](precision-callers-red.log)、[曲线RED](curve-red.log)，7文件146项[目标GREEN](curve-green.log) |
| 最终相关单测/合同 | 50文件、644项通过，[最终日志](unit-final.log)。不重复累加目标集 |
| UI类型、Playground类型与构建 | 均通过，[UI](ui-typecheck-final.log)、[Playground构建含类型检查](playground-build-final.log)；既有大文件体积提示保留 |
| 实际工厂与宿主选择 | UI实际使用 `@visx/curve`→`@visx/vendor`，独立读取真实函数对象与宿主AST。18完整序列+18个7点前缀，原始点误差0、无新增/丢失峰谷及负值，完成率在0–100，[复核](curve-audit/current-native-helper-review.md) |
| Mini实际几何 | 两档、12轮共288可绘制数组，整数原始点误差0、无负值/新增turn；C2最大误差≤2.56e-13，[记录](mini-curve-verification.md)。其中60条为正常profiles |
| 业务面积 | 当前学期3、本期/上期6、版本3条校准样本保持原始点和turn，[审计](curve-audit/business-area-turn-results.json) |
| 桌面/窄屏稳定对照 | 前后各24区域、0页面异常；所有图尺寸、日期、图例、字体与可见绘制属性一致；曲线形态与比率精度按本轮目标变化，[DOM属性复核](visual-preservation.json)、[浏览器前后对照](browser-comparison.json) |
| 交互浏览器 | 14项通过：默认/正式示例/Mini 12项与业务面积2项，两档宽度1440/390、普通及减少动效；234次原生几何快照，更新/重播/Tooltip/表格及零/缺测边界通过，0页面异常。全部通过结果与最终截图为同一冻结运行时，[汇总](browser-summary.json)、[核心12项](browser-tests-02.log)、[业务面积2项](browser-tests-03.log) |
| 最终下载消费 | 新独立host完成170真实下载闭包、严格类型与构建；12代表页、10真实Tooltip、2Radar图例通过；源码/下载/模块无越界或漂移，[报告](consumption/report.md)。复制139个已有依赖缓存，不是干净安装 |

全测试项目类型检查仍有4处既有范围外诊断（Toast两处、旧反馈配置两处），与本轮开始前逐条一致，没有新增；[日志](tests-typecheck-final.log)。本轮不处理这些诊断。

## 校准边界

这次是当前Mock数据的宿主校准。Natural准确经过原始点，也可能把既有峰位移到两次观测之间，并略超出相邻端点值；不能把它称作任意输入都保形。1/3端点条件只经当前样本和前缀实测，不是通用数学保证。替换这些数据时需重新核对范围与turn；任意边界样本如 `[0,0,5,0]` 的Natural可能过冲为负，相关反例完整保留。

原生曲线选型、完整精度和读数舍入没有改写真实观察值；精确人数与日期可以在表格和Tooltip核对。系统减少动效、入场和更新时序保持已有合同，曲线工厂变化由当前原生组件处理。

未进行Safari/VoiceOver实机、实体触屏、完整对比度、任意大数据、生产数据接入、Figma写入、发布、迁移或Git提交/推送。当前技术结果不关闭这些Gate，也不替代用户对弧度观感的确认。

## 实时入口

- [组合图](http://127.0.0.1:5173/#chart-composed)
- [折线](http://127.0.0.1:5173/#chart-line) / [面积](http://127.0.0.1:5173/#chart-area)
- [Mini与业务面积](http://127.0.0.1:5173/#chart-business)

可直接更新数据、重播、悬停、查看表格及缩放窗口。最终代表截图在 `browser-after/`，修复前源码与24区域截图完整保留在 `before/` 与 `browser-before/`。
