# 第三批 Root-owned 实现独立只读审阅

实际工作区 `.worktrees/card-v2`，HEAD `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。差异比较使用本轮 `before/` 的773文件基线，没有把未提交实现与HEAD混比。依据第三批计划审阅当前 Mock 范围；本审阅只新增此文档，没有修改运行源码、测试或其他证据，也没有运行旧套件。

结论：发现1项 important/P1 回归，无 critical。Root已实施最小修复；对修复后的两条控制路径完成独立代码复核，其余已审范围未发现新的 important/critical 问题。新的实际页面／下载往返由B继续验证，不把修复前的浏览器指纹当成修复后全量证明。

## P1：Live 经拒绘状态往返后恢复旧 points，违背当前 state/revision

修复前涉及 `chart-examples.tsx:372`、377、389，`chart-page.tsx:27`、40、54，以及 `chart-example-source.tsx:256`。Live初始化优先恢复父级 `liveSettings.points`，又把当前 state/revision 记为初始输入；empty／invalid／missing 在 ChartExample 外层返回 Notice，卸载Live，却没有使父快照失效。重新挂载时初始化守卫直接跳过重建，因此旧数据被解释为新场景。

独立只读真实浏览器复现：暂停正常Live → empty → zero，60行逐格等于原正常数据，首值65，零值场景仍含非零；随后 empty → single 仍为60行而非1行。实际默认下载的 main.tsx 同时包含 `state="zero"`、`paused:true` 与旧非零points。Notice期间更新revision再回normal产生同根因的不一致，可由初始化路径直接推导。原三个默认生命周期测试没有覆盖真实父页捕获与状态卸载往返。

Root处置：只在父 `ChartPage` 的示例状态onChange（当前44行）和更新数据onClick（当前48行）使 points／frozenNow 失效，保留用户 paused。两条路径覆盖拒绘状态的退出、拒绘期间revision更新，以及挂载期间显式更新；重播和配色不清快照。实际动态父调用者通过 `component-asset-page.tsx:48` 的 `key={component}` 隔离各图页面，下载App的state为固定入参，因此本修复没有引入新的snapshot元数据或公共API。重新挂载以当前 state/revision 生成合法数据，暂停标记仍恢复；挂载期间已有输入变化effect负责更新自身points，再回传当前快照。

已读取Root保留的 [真实RED](../live-state-roundtrip-red.log)（新增父页用例失败、旧3项通过）和 [GREEN](../live-state-roundtrip-green.log)（4项通过）。新增测试使用真实ChartPage，仅mock图库与源码展示元数据，断言empty→zero／single、empty期间revision更新→normal、paused保留，以及传入下载组件的points与实际表一致。最新 [合并单测](../unit-closeout.log) 为63文件759项通过；Root记录的类型及构建结果见 [补修状态](../late-page-fix.json)。当前补修源码为 `chart-page.tsx` SHA256 `5f7e04f8cdc1903cff442ea40002c124b8325ff009abf40c18b990514fd497f5`，替代修复前 `64314986945ccda59c1ce74c160d0a8e428cd0220043ad64421b19455795890d`。其余Root记录的244个运行文件、原生及导出器保持不变。实际页面与zero／single独立下载补证由B接续。

## 其余核对结果

- `chart-point-reading.tsx`：选择值与查找均按Date时间戳，不按数组下标；同日期更新／重排重读当前record，移除所选日期后清空而不替读另一日期。有限number直接String，不舍入近零符号；0有效，null／undefined／非有限number显示缺测；字符串用于方向。字段单位各自保留，空数据禁用选择并提供常驻status。实际当前caller传入合法、唯一日期；不把私有reader扩张成任意外部输入保证。
- `chart-data.ts` 三个helper：normal或无关scenario返回原数组；Scatter密集和Candle密集只复制既有原值并生成连续96日期，未变更正常数组；Scatter重叠保留null和有效0，0分母的rate仍null；Candle平盘令open=close，沿用原high／low，原合法OHLC关系仍成立，没有epsilon；ProfitLoss具名样本保留精确正负小数和真实0，未以舍入结果驱动颜色。独立逐字比较 `makeTimeline`、`makeMissingTimeline`、`makeCandles`、`makeProfitLoss`、`makeLivePoints` 五个实际声明，均与before相同。
- `ProfitLossExample` 与Trend调用：默认和line-profit-loss共享同一实现；受控boundaryScenario通过已有VariantSettings回传／捕获；日期reader、精确表和Tooltip均读取同源原值，近零值不toFixed；零线、线性曲线、原语义色和旧绘图props保持。Trend新增调用没有改其他分支几何。`profit-loss-line.tsx`、`profit-loss-segments.ts` 和 `chart-examples.css` 与本轮before字节相同，审阅没有把原生沿用的零边界规则当成新增几何API。
- 默认Live：除上述修复前父快照问题，运行／用户暂停分开；仅图形容器IO与visibility控制活动状态；暂停保留manualNow，手动追加推进冻结时间，重播只key LiveLine而不key Chart；显式state／revision更新重建数据，单个interval随依赖清理，IO／visibility监听卸载清理。捕获包含当前points、用户paused与frozenNow；系统reduce／可见性在消费端重判，不伪造生产连接。
- `chart-example-source.tsx`：保留原参数次序，新增最后可选snapshot参数；实际默认完整源码／下载入口传入父快照；变体按已有settings序列化并回传。默认和相关变体闭包包含新增root级reader，Trend闭包包含ProfitLoss模块，chart-data依赖的raw数据亦收集。没有新增生产依赖、别名捷径或丢失原调用者；本P1是父级数据失效遗漏，导出器正确序列化了当时传入的旧数据，而非闭包缺文件。
- 原生共同hook：common re-anchor刷新当前数据前reset旧index/x去重键，canInteract=false清Tooltip并通过原scheduler取消待提交RAF；Scatter按所读日期重取当前record及新坐标，日期消失或交互禁用时清空，有限数判断保留0且不把null制成y=0。单指采用pan-y，双指选择仍preventDefault，touchcancel清理沿用touchend。原scheduler与before字节相同；共同hook原返回形状不变，Scatter新增可选cancel事件为局部接线，没有扩展公共选择API。

## 审阅指纹与边界

当前读到的关键文件SHA256：

| 文件 | SHA256 |
| --- | --- |
| chart-point-reading.tsx | 80a9051ee68100ef973e66dd3c26af78869f4afd06a9f3e66d685db772f4d63c |
| chart-data.ts | 4965d35d26c5c91ddfd92d1d80e8bdba693fb1bbe5da8c3ba2d407ac5a0f1fa2 |
| chart-variants/profit-loss.tsx | 589626f13e33daba3c1eb48e58f4bcf1a64d1aa3071f2fc386cc82aea3cd22bb |
| chart-variants/trend.tsx | b896c73f48bf673848e2d07d1b5691a858afe2b82fc2083089243b9012abc263 |
| chart-examples.tsx | 0ba128411723cb441cd63c7d4b7689fca632636892e2d8d157a45e34df38a823 |
| chart-example-source.tsx | 148335464880a677a0c00f5cab54a616b266b5c56148296e86b51fe997f33a6e |
| use-chart-interaction.ts | 983a2717d41e9d327e2b7ca97d332b5bb6499011fe39357935ea7ecd48e799f4 |
| use-scatter-chart-interaction.ts | 6464a31f1d28b819f5a9e2fb2f4579658c60953258c5dee97c293c12648821e8 |

独立代码审阅加一条真实页面状态回归诊断；没有重复全758／759或170消费套件。正常函数和既有样式／原生实现按before直接比对，不只依靠绿勾。实机、生产数据源、新API、跨浏览器及原有Human Gates均未列为本次修改要求或关闭条件。
