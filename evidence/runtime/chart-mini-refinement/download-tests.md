# T07 源码下载验证

日期：2026-10-09。工作区：`.worktrees/card-v2`。范围：页面局部源码下载与既有隔离消费验证器；候选未发布。

## RED → GREEN

执行命令：

```sh
pnpm exec vitest run scripts/verify-chart-business-consumption.test.ts scripts/verify-chart-variant-consumption.test.ts
```

实施前有效 RED：8 个测试中 5 个失败、3 个通过。失败分别证明：缺少 `chartExampleFiles`；业务下载没有每日原始比较域；compact / comfortable 生成的 App 实际运行后缺少型号与系列参数，且 revision 仍为 0；显式导出提取没有完整的单图函数依赖。

实施后 GREEN：2 个测试文件、8 个初始测试全部通过。后续独立消费发现业务导出缺少 `rain-chart-business` 宿主 class，新增第 9 个测试先获得有效 RED（1 失败、其余 6 个业务测试通过），仅补导出 main 的宿主 class 后，2 个测试文件、9 个测试全部通过（最终目标运行 2.55s）。测试执行真实下载函数，转译其 main 并用 React 的服务器渲染实际调用 App，验证两档、3 / 5 系列及 revision 7 均到达 ChartExample。两个下载集均含真实 raw `mini-layout.ts`；删掉该文件会触发相对导入闭包错误。业务下载保留原始人数域、每日域及 invalid 分流；原前 5 个位置参数和 Matrix 规模保持兼容。

提取器测试同时运行 `chartExampleFiles`、`chartBusinessFiles` 和既有 `chartVariantFiles`。单图提取显式包含 `chartExampleCode`，没有引入通用依赖解析器。下载项与实际 owning map 的路径和入口一致，所有源文件内容逐项与磁盘 raw 比较；Vitest 的 CSS 模块处理会把 `?raw` CSS 变为空字符串，因此 CSS 内容比较采用磁盘原文，未跳过 CSS。

## 隔离消费命令与覆盖

```sh
node scripts/verify-chart-business-consumption.mjs evidence/runtime/chart-mini-refinement/consumption
```

已执行完整命令一次。170 官方示例首轮下载闭包 / 独立 typecheck / build 通过，两个命令均退出 0，170 HTML 入口覆盖 16 family，外部模块路径 0，源文件漂移 0；本轮没有执行这 170 项的浏览器验收。随后使用真实 `chartBusinessFiles` / `chartExampleFiles` 下载 7 种业务状态、5 类单图 × 2 档正常样本，以及饼 / 环 5 系列 × 2 档样本，合计 21 个业务 / 迷你独立入口；单图样本 revision 为 2。

首轮浏览器失败已保留为 `consumption/first-attempt-facts.json`：Line / Area 外框先于 ParentSize / ResizeObserver 的 SVG 出现。诊断证明一次 comfortable 样本即时 SVG 0，108ms 条件等待后 SVG 2、128×48、零 pageerror；验证器增加实际 SVG 就绪条件后复用同一构建检查，未重跑 170。

第二个失败是隔离 fixture 缺少已有 Rain 宿主的 Tailwind 能力：TableScrollArea 的 `overflow-auto` 未编译，390px 页面宽度变为 925px。按已定义宿主合同使用已安装 Tailwind 4.3.3 / Vite 插件缓存，额外复制 16 个缓存包到原隔离目录；消费者 CSS 只加载 Foundations theme、扫描复制的 UI 与明确的 21 个下载目录。没有安装依赖或复制整仓 App 样式；真实项目依赖保持不变。`chartBusinessFiles` 的宿主 class 缺口则通过上述第 9 个测试闭合。这两件事分别登记，不把宿主配置缺失当业务图形缺陷。

补充字级检查还发现 footer 的后置 `.rain-business-comfortable-group strong` 把进度百分比覆盖成 14px，证据保留在 `consumption/typography-and-arc-bounds-before-fix.json`。主 agent 将该 selector 限定为业务标题的直接子元素；本验证器以 `.rain-business-comfortable-group [data-mini-kind="arc"][data-size="comfortable"] [data-primary-reading]` 实测百分比字级，未降低期望值。

最终从 owning map 重新生成 21 项并执行独立 typecheck / build / browser，全部通过；170 包与官方源未变，复用首轮已通过结果。最后补上单图舒展 3 / 5 系列中心字级断言后，复用这个最终构建再跑 21 个浏览器入口也全部通过。一次性复用说明在 `consumption/final-run-method.json`；没有新增通用 resume 配置。最新通过事实在 `consumption/facts.json`，源码与链接审计在 `consumption/source-and-results-audit.json`。

最终结果：21 个浏览器状态 / 样本、零 pageerror；业务更新 fraction 0.75；表格 cell 为 56px、14px / 22px、UI 字体声明，数据读数为 14px / 22px、Data 字体声明；全部舒展进度弧为 18px / 22px，完整环为 16px / 20px。footer 实际更新读数为 24%。当前挂载的弧形路径在逻辑槽内、SVG 横纵变换等比；390px 页面宽度 390，表格区域宽 342、内部 scrollWidth 900、overflow:auto。下载与共享源均无漂移，隔离目录 291 个内部依赖链接、零外部链接。

最终 exporter SHA-256：`c29ff2a1ca84cae44405289b58b9fa1fcf0ababc6941cf1f3c853385cb42edfb`。

脚本检查下载闭包、隔离 TypeScript / Vite 构建、浏览器正常图形与逻辑槽尺寸、精确数据表读数、CSS 配色 / 基础字级与数据字体声明、390px 宽度、业务数据更新及无 NaN 路径；记录每个下载的参数与文件 hash，并在结束复核源码没有漂移。字体检查证明 CSS 声明生效，不等于交付字体文件。正常 motion、Safari / VoiceOver 与用户视觉确认另由本轮其他验证记录承担。Vite 保留了完整候选包带来的 chunk size 提示，本轮未作拆包优化。

依赖来自已安装缓存的隔离复制，沿用现有完整 UI / Foundations 源码快照；这不是全新联网安装，也不证明最小 Registry 安装、发布或生产采用。

## 其他检查

`node --check scripts/verify-chart-business-consumption.mjs` 通过。`pnpm exec tsc --noEmit --project tsconfig.tests.json` 在其他 agent 尚在落地 size / trendMaxValue API 时执行，返回未完成的相关接口及既有 toast / Playwright 配置错误；T07 文件本身新增的 Node 声明兼容问题已处理。最终测试类型结论以全体源码稳定后的主验证记录为准。
