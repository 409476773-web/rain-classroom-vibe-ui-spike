# Button Group 多尺寸 · 2026-10-08

用户「确定。需要补充多尺寸，现在只有1个尺寸。」确认上一轮style当前runtime视觉，并授权本轮mini/small/medium/large/xl五档。仅上一轮style的Human Gate登记accepted，证据见 [style-human-gate.json](style-human-gate.json)。本轮sizeRefinement为completed / passed-scoped / passed-scoped，新多尺寸Human Gate仍awaiting_human；旧repair、G123与contrast Gate保留。System Mode，共享registry-candidate；未授予发布、业务迁移、Figma或Git操作。

本轮子Button继续拥有size，没有新增Group API。直接同尺寸ordinary Button与Text通过低specificity关系选择器匹配现有字号、行高、半径及最小高度，连接内角规则保持优先；独立Text仍沿用原默认值。独立页增加五档横向、文字与竖向的15组对照，XL在窄容器局部横向滚动，复制代码留出焦点空间。旧四例、状态对照、键盘与各例反馈保持。

## 实际验证

- [doc-red.log](doc-red.log)、[browser-red.log](browser-red.log) 和 browser-red/ 是实施前多尺寸失败证据；[governance-authorization-red.log](governance-authorization-red.log) 是新精确授权检查的先失败记录。
- [behavior.log](behavior.log)：112项相关行为通过。Root最后复制代码调整后，[doc-green.log](doc-green.log) 6项文档检查通过。
- [browser-green.log](browser-green.log)、[browser/report.json](browser/report.json)：11项Chromium检查通过，覆盖浅/深、默认/紧凑、五档字体/行高/高度/外角、Text、禁用、单一接缝与完整分隔线、390px页面不溢出和XL局部滚动、键盘和反馈。Root已查看实际浅深与窄屏PNG；未推导为Safari/VoiceOver接受。
- [ui-typecheck.log](ui-typecheck.log)、[test-typecheck.log](test-typecheck.log)、[build.log](build.log)：Root执行的UI/测试类型和最终构建均exit0。构建保留既有大chunk提示。
- [implementation-review.md](implementation-review.md)：独立UI实施审阅无P1/P2/P3，审阅四源hash与当前冻结值一致。
- [governance-scoped-tests-final.log](governance-scoped-tests-final.log)：Button Group精确治理8项通过、4项G123无关检查按筛选跳过，exit0。合法授权与完整完成态通过；扩大scope、篡改binding、擅自接受新增尺寸、错误迁移旧Gate和额外publication字段均拒绝。治理测试类型检查见 [governance-tests-typecheck.log](governance-tests-typecheck.log)，exit0。
- [governance-final-result.json](governance-final-result.json)：授权、生命周期、6项实际来源和27项保留记录验证通过，23份before原文匹配snapshot，exit0。旧repair/G123字段投影后完全相同；phase其余变化精确列为并行bklitRainCharts的4项字段，不归因给本轮。
- [asset-index-write.log](asset-index-write.log)、[asset-index-check.log](asset-index-check.log)：资产索引生成与核对均exit0，Button Group以scoped-passed / awaiting_human / not-granted / unpublished进入候选检索。

## 来源与颜色差额

新 [source-bindings.json](source-bindings.json) SHA-256为99b3202343ddf86340b8ffd579088b0c648711528fe751f81ac35d9b046f0f6b。继承旧repair 8d497cc6…和style fa011732…原文，逐项验证repair→style→size前后关系，不刷新旧来源记录。四项新源码hash见该记录；Group TSX、独立Button TSX/样式、Token、共同Doc壳、Registry、旧82源summary及E2E config保持，详见 [governance-final-result.json](governance-final-result.json)。

新 [doc-color-consumers.json](doc-color-consumers.json) SHA-256为2fcd528704084d286c8d50cfa1eb2055cd0b9981688bb8a045d0eec13d90a961，仅更新本页CSS sourcehash；投影回前版hash后精确恢复旧style ledger全部字节，六项角色、父表面、criticality和正文4.5阈值保持。[doc-color-result.json](doc-color-result.json) 定向色检查failures=[]、exit0；暗色正文读数最低13.548，浅色局部反馈/状态/代码标签6.565、深色8.549，均满足原4.5要求。这些测量没有授予contrast Human Gate。

[scoped-size-delta-checks.json](scoped-size-delta-checks.json) 验证组CSS六项paint（包含禁用opacity）前后完全相同，新尺寸诊断=[]，文档颜色定向检查=[]，差额exit0。直接组件Token probe仍exit1，原始结果见 [scoped-token-color-checks.json](scoped-token-color-checks.json)：Separator的background-color: var(--rain-button-tertiary-border)尚未登记。该诊断在本轮before与现源逐字相同，作为上轮style继承发现保留；未新增allowlist、降低阈值、重分类边界或把整个组件Token扫描表述为通过。

全库此前并行chartLibraryValidation状态未知字段、bklit图表范围及其他历史Token发现继续独立保留。本轮未重跑或修复全库，不宣称全库green。授权/来源链只读追加复核确认无范围或Gate迁移问题，并提醒保留旧Separator诊断；见 [governance-source-review.md](governance-source-review.md)。
