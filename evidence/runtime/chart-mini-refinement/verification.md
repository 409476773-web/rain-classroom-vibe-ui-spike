# 迷你图表双尺寸改造：本地技术交付

日期：2026-10-09（Asia/Shanghai）。用户明确授权“按照方案开始实施”。实施范围为 [双尺寸方案](../../../docs/plans/2026-10-09-mini-chart-size-refinement-implementation-plan.md) T00–T11，工作树为 `/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`，保留现有 `codex/card-v2` 分支及已有未提交工作。

本轮技术交付完成，候选未发布。用户视觉审阅、对比度接受与业务迁移仍未完成；原 chartBusinessExpansion 的阶段和授权范围没有被本轮状态替换。具体视觉审阅入口见 [human-review.md](human-review.md)。

## 实际交付

- 局部 `mini-layout.ts` 统一 compact / comfortable 两档；业务画廊呈现 9 种表达 × 2 档，共 18 项，同图两档使用相同数据。
- 表格采用紧凑档，指标卡采用舒展档，列表采用紧凑分组并附一个舒展组。人数右齐、卡片三个主读数基线一致，状态说明不重复。
- 原始人数比较域与每日趋势比较域分开，筛选保留原始比较域；评分与完成目标分别计算。20/80 显示 25%，0/0 显示“不适用”，无效值不进入正常图形运算。
- 缺测、全零及离屏占位保留逻辑槽；失效的离屏缓存先清空，重新进入视野时采用最新数据与域。页面级 empty / invalid 保留整体提示。
- 图表库与原型目录的 line / area / bar / pie / ring 五个迷你入口贯通型号选择、对照实例、说明及源码。标准模式、Matrix 和既有 170 个官网映射保留。
- 单图下载的原前五个位置参数保持兼容，随后追加 `miniSize / seriesCount / revision`；业务和单图下载共享实际 owning file map，均带真实 `mini-layout.ts`。
- 普通入场、更新、悬停及 reduced motion 均按两档验证。MiniPie 的 reduced 分支使用已有直接 SVG 几何模式，普通悬停保持原行为。

| 几何 / 读数 | compact | comfortable |
| --- | --- | --- |
| 柱、折线、面积槽 | 96×32，padding 2 | 128×48，padding 3 |
| 饼、环饼槽 | 32×32 | 56×56 |
| 完整进度环槽 | 32×32 | 64×64；中心 16px/20px |
| 底部开口进度弧槽 | 40×30 | 72×54；中心 18px/22px |
| 数量 / 分段条 | 宽 120，有效厚度 6 | 宽 160，有效厚度 8 |
| 图文间距 | 8 | 12 |

弧采用等比圆形坐标和底部开口，并显式设置内半径、线宽及边距；没有把圆压成椭圆。中心文字按真实 glyph 墨迹判断圆内边界，放大后不合适时同一 HTML 读数移到普通文档流，尺寸恢复后可返回中心。100% 的测试字形需要外置，不缩小字体；该结论来自真实字体测量辅助的单测，未冒充真实业务 100% 浏览器 fixture。

## 验证结果

| 检查 | 最终结果 | 证据与范围 |
| --- | --- | --- |
| 相关单元 / 数据 / 下载合同 | 8 文件、99 项通过 | [final-unit.log](final-unit.log)，含 Mini、DataBar、Ring 与下载 / 颜色消费者 |
| 原生来源、170 映射、样式及数据边界合同 | 4 项通过 | [source-closure.log](source-closure.log)；单独跳过已确认的旧 17 项数量断言 |
| 18 个 Registry / Manifest 合同 | 全部通过 | [asset-contracts.json](asset-contracts.json)，单独调用现有 YAML 解析及 `validateAsset`；数量失败没有被当作合同迭代通过 |
| Chromium 浏览器 | 49 个不同用例通过 | [browser/verification.md](browser/verification.md)：业务 23、目录相关 20、Playground 6；修复后只复测受影响用例 |
| UI、Playground、Prototype 类型检查 | exit 0 | UI 单独检查；后两者亦包含在最终构建中 |
| Playground / Prototype 构建 | 均 exit 0 | [playground-build.log](playground-build.log)、[prototype-build.log](prototype-build.log)，最后 CSS 修复后重建 |
| 图表样式生成一致性 | 通过，1351 个候选 | `node scripts/generate-chart-styles.mjs --check` |
| 业务 / 迷你下载独立消费 | 21 入口的类型、构建、浏览器均通过 | [consumption/facts.json](consumption/facts.json)：7 种业务状态，5 图型 × 2 档，加 pie / ring 5 系列 × 2 档；单图 revision 2 |
| 170 官网下载入口 | 闭包、类型、构建及模块审计通过 | [official-variants/facts.json](consumption/official-variants/facts.json)；本轮没有运行 170 个入口的浏览器检查 |

99 项目标单测可按以下命令复现：

```sh
pnpm exec vitest run apps/playground/src/docs/components/chart-business/mini-data.test.ts apps/playground/src/docs/components/chart-business/mini-examples.test.tsx apps/playground/src/docs/components/chart-mini-size.test.tsx packages/ui/src/charts/data-bar.test.tsx packages/ui/src/charts/ring-compact.test.tsx scripts/verify-chart-business-consumption.test.ts scripts/verify-chart-variant-consumption.test.ts scripts/chart-color-consumers.test.ts
```

浏览器的准确命令、选择器范围、缩放模拟方法和定向复测记录在 [浏览器记录](browser/verification.md)。1440 / 916 / 390px 的两档画廊没有页面横向溢出；卡片主读数基线差为 0px。最后底部舒展弧的 18px/22px、Data 字体及主读数基线在真实页面单例复测通过。

隔离消费使用真实 Rain 宿主能力：已有 Tailwind 4.3.3 / Vite 插件、Foundations theme，以及 UI 与 21 下载目录的明确源码扫描，没有复制整份 Playground 样式。依赖来自已安装缓存的隔离复制，内部 link 291、外部 link 0；这不是全新联网安装或最小 Registry 安装验证。170 官方入口首轮通过后，确认其源文件及共享包 hash 无漂移，仅重新生成并构建改动的 21 下载入口。复用过程见 [final-run-method.json](consumption/final-run-method.json) 与 [source-and-results-audit.json](consumption/source-and-results-audit.json)。

独立消费实际读数：表格行高 56px，正文 UI 字体 14px/22px，人数 Data 字体 14px/22px；完整进度环 16px/20px，舒展弧 18px/22px。390px 下页面宽 390，表格可见宽 342、内容宽 900，滚动发生在表格内部。已挂载的弧路径在槽内，SVG X/Y 缩放均为 1。早期失败及修复前证据保留，没有用最终成功覆盖失败事实。

独立宿主验证的是 CSS `font-family` 声明与实测字号 / 行高，未验证字体文件随下载打包或每台设备实际加载 LINE；缺少字体时使用既有回退字体。真实 Playground 的字体测量与中心适配另有浏览器证据。

## 必要修复与来源边界

共享 Ring 仅增加一处响应式测量就绪条件：测量直径容不下两倍 padding 时暂缓内部渲染，尺寸恢复后继续。真实诊断记录过 340→12/4→340 的瞬时尺寸，旧代码在暂态触发异常。固定尺寸路径、有限非负 padding 及半径验证保留；目标 Ring 测试 6 项及受影响 900/390px 浏览器两例通过。见 [ring-diagnostic-390.json](ring-diagnostic-390.json)。本地 source-lock hash / 修改说明已更新，上游 hash 与 commit 保留；Registry、公共 index 及公共 props 未改。

下载页面补回业务根样式作用域，列表标题规则限制到直接标题，避免覆盖中心弧读数。三个最终小修复经过独立只读审阅，下载合同 9 项通过。核心、宿主与集成审阅发现的问题均已修复并定向复测。

颜色仍来自现有 token。只登记新增 caption 标题消费者并更新对应派生产物，没有更改 Foundations 色值或全局 Table / Card 默认。

改动清单 [changed-files.json](changed-files.json) 对照 T00 捕获的已有脏源码，而非 Git HEAD；另两个派生产物 / 脚本使用同一 T00 临时快照作比较。本轮未提交、推送、创建 PR、写入 Figma、发布或迁移业务。当前服务来源在 [baseline.md](baseline.md) 中核实；Matrix 源码及 170 映射不在本轮增量内。

## 已知边界

- `scripts/charts.test.ts` 的首项仍硬编码 17，T00 已因 Rain Matrix 使 Registry 为 18 而失败。保留 Matrix；不声称全套该脚本通过。
- 全仓 tests 类型检查仍有四项范围外错误：toast role-option 两项、chart-feedback reducedMotion 配置两项。相关浏览器文件的单独 strict 类型检查通过。
- 全局 `verify:tokens` 仍失败，含范围外合同 / 消费者问题，且图表对比度与颜色配对审核仍 pending；见 [token-check.log](token-check.log)。本轮颜色消费者单测通过，不构成全仓颜色或可读性接受。
- 构建保留大于 500kB 的 chunk 警告。5/40 行更新采样的 RAF 中位约 8.3/8.4ms、p95 约 16.7ms，仍有 132/133ms long task 和约 142ms 最大 RAF 间隔；不能承诺持续 60fps。见 [performance.json](browser/embedding/performance.json)。
- 原生 Ring 更新采用既有弹簧，路径稳定检测约 1.9 秒；650ms 是局部入场配置，不能写成更新固定完成时间。
- 未测 Safari、Firefox、VoiceOver、物理移动设备、原生浏览器菜单缩放或 OS 文字设置。200% 布局模拟及独立文字压力方法已如实记录；没有把它们称为系统级验证。
- T00 未重新拍摄浏览器“前图”；旧版视觉参照来自计划已有材料，源码 / 测试基线是本轮真实快照。最终预览使用 normal、revision 0 新拍，见 [final-preview/facts.json](final-preview/facts.json)。

最终可视材料与待审项目见 [human-review.md](human-review.md)。所有技术通过结论都保持在上述范围内。
