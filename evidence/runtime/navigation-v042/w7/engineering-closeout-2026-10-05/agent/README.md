# 工程收尾：最小测试/fixture修复

产品Runtime、已接受UI、Token、默认行为、旧日志/ZIP/freeze未修改。修改10个既有测试或配置；任务开始前 dirty/untracked 内容完整保存before/，task-only.diff只包含本次增量。

- Core UI当前旧计数红：7通过/1失败；独立明确家族身份合同绿：8/8。不是机械8→9；集合检查拒绝缺失、重复、额外或错序，原字段/Tag/Button交互均保留。
- Command：复用既有公开回调类型，1/1原搜索/执行/空态单元通过。
- 测试类型最终 `tsconfig.tests.json` exit0；原Command错误、4个新导航config层级错误及并发root helper中间错误均留日志。
- 浏览器首轮3通过/1失败，报告同RGBA的字符串格式差异用原生CSSStyleDeclaration统一后，仅重跑失败项1/1。4个不同合同的最新状态全部通过；未伪称一次4/4完整重跑。
- 4个导航配置正常load；4个实际页面context媒体断言通过，确认contextOptions.reducedMotion生效。它们不在accepted freeze97。
- 共享discovery737→737，仅2个报告用例归入Prototype，735其他保持，0丢失/新增/重复，旧导航closure归属未变。

## 修改文件

- packages/ui/src/command/command.test.tsx
- apps/playground/src/docs/components/core-ui-page.test.tsx
- tests/e2e/core-ui.spec.ts
- tests/e2e/learning-report-a.spec.ts
- tests/e2e/learning-report.config.ts
- playwright.config.ts
- tests/e2e/navigation-v042-w6-review01.config.ts
- tests/e2e/navigation-v042-w6-review02.config.ts
- tests/e2e/navigation-v042-w6-review01-compat.config.ts
- tests/e2e/navigation-v042-w6-review02-compat.config.ts

## 四个受影响浏览器合同

- the Day 3 Core UI page exposes truthful families and real interaction — passed (browser-run-01-results.json)
- report V2 preserves filter scope, keyboard readings and recovery — passed (browser-run-01-results.json)
- report V2 keeps three breathable chapters, blue gaps and a locally scrolling mobile table — passed (browser-results.json)
- R02 E4 actual pointer pin expands the pane and preserves playback, notes and focus mode — passed (browser-run-01-results.json)

报告页面原固定5369忽略runner baseURL；现由实际Prototype项目消费相对route。独立旧report config保持旧预览默认5369，可显式RAIN_REPORT_BASE_URL。几何、色值、筛选、键盘、恢复、深色/forced-colors及原bm-d入口断言全部保留。5211/5212是当前工作区专属服务，不声称独立交付包结果；已停止。诊断cwd隔离，报告9项截图/JSON仅写temp后复制到report-render-evidence，历史截图未覆盖。

## 原49未知项

49项全在scripts验证/治理，没有实际UI行为单元。完整原错误、Vitest共用尾和归属在unknown49-original-errors.json/unknown49.md。分组：{"scope-css-or-protected-source-validation": 15, "protected-source-or-validation-fixture-review": 10, "whole-record-history-or-source-projection": 7, "historical-color-evidence-or-token-inventory-assumption": 4, "standalone-starter-reference-fixture": 1, "seven-day2-cli-tests-fixture-timeout": 7, "shared-frozen-B2-parser-or-boundary-authorization": 4, "fresh-build-fixture-runtime-dependency-resolution": 1}。root独占共享helper、phase与metadata；本代理未改scripts，未声称49通过。7项Day2 CLI都是5000ms超时；4个原空header共享旧B2/boundary错误尾。

原全仓147失败、浏览器172/5/516不被本次窄项覆盖。后续以root整合后的最新全仓质量证据为准。
