# M2 工作台、报告与限定试用交付

> 执行：executing-plans；实现后使用 requesting-code-review 独立复核。

**目标：** 按用户“继续m2”完成 RN-11 BM-C、RN-12 BM-D，以及两场景的 RN-14 修改/独立消费和 RN-15 验证交付。RN-16 保持按场景需要扩面，本批不建立新公共组件。

**模式：** System Mode（场景为 Prototype/local-experiment；另有范围登记及验证维护）。继续既有 `codex/card-v2` 工作区，不创建 Git 提交。开始基线见 `evidence/runtime/m2/before/source-lock.json`，现有决策逐字保留。

**架构：** 页面拥有业务数据、筛选、当前对象、草稿及异步任务。复用 Rain UI、DensityProvider 和 Stack/Inline/Grid/Split。图表采用本地 SVG 配方及等价数据表；Statistic 为页面内 Value/Unit/Label 小组合。复用 BM-B 的可取消模拟任务，不引入依赖、公共 API、Resizable 或第二套表单系统。

**技术：** 现有 React/TypeScript/Vite/Tailwind、Vitest、Playwright；浏览器原生 SVG、details 和 CSS。

## 来源与设计决定

- 最新阶段、SPIKE、V2 RN-11/12/14/15 台账及 benchmark-registry 是本批依据，V2 规划快照不回填。
- BM-C：本次查看 VE-003/012/009 来源图和 2026-09-01 审计，保留任务栏、上下文、主作答、独立评分区。沉浸式任务有返回路径，不复制来源平台导航。
- 批改业务参考原项目 HANDOFF 和已确认分层目录：卷别为硬边界；按题的父级是题、子级是学生，按人的父级是学生、子级是题。切换遍历方式保留当前元组；上一/下一不跨父级或试卷；只有正式分数算已批改。
- 本批仅虚构文字作答和手动评分切片；评语可选。筛选作用于作答记录，学生父级只显示计数，不推断学生级状态。草稿按作答 ID 保留；切换卷别/对象/筛选/布局不销毁草稿。保存期间禁用对象切换；失败保留原对象与输入，成功后才按原遍历列表前进。
- BM-D：本次查看 VE-007，VE-010 使用已登记的脱敏结构审计，不转录身份数据。标题、四指标、趋势、摘要和 AI 示例分层，避免所有区块套 Card。
- 报告使用明确的虚构周度汇总数据；全筛选集先聚合、明细最后分页。趋势指标和高亮周只属于本地图表状态，不改变四指标定义。AI 为确定性的示例解读，明确标记。
- 风格只消费已登记 Rain Token；Data 字体只用于关键数值，中文单位和普通表格数字使用 UI 字体。本批不分发字体。

## 精确修改范围

- `apps/prototype/src/scenarios/bm-c/{page.tsx,page.css,state.ts,state.test.tsx,state-contract.md}`。
- `apps/prototype/src/scenarios/bm-d/{page.tsx,page.css,state.ts,state.test.tsx,state-contract.md}`。
- `apps/prototype/src/main.tsx` 仅增加 C/D 入口；既有 A/B 渲染保持。
- `apps/playground/src/docs/benchmark-index.ts`、`benchmarks/benchmark-registry.yaml` 同步 C/D 独立状态；对应索引断言。
- `status/current-phase.yaml` 新增独立 `m2Delivery`，保留旧记录和所有 Human Gate。
- `scripts/verification-helpers.mjs`、既有范围校验和历史测试仅接纳精确授权的 M2 增量；`scripts/verify-token-foundations.mjs` 核验冻结的本地颜色用途。不得放宽其他字段、来源哈希或历史视觉基线。
- `scripts/rn14-starter.mjs` 及对应测试在原默认 A/B 导出之外增加明确 M2 导出选项；旧样例文件和归档保持不变。
- `scripts/m2.test.ts`、`tests/e2e/m2.{config.ts,spec.ts}`、本计划、`docs/ai/m2-trial-guide.md`、`evidence/runtime/m2/**`。

## 执行任务与验证

1. **基线与入口授权**：保存当前来源锁及阶段；登记范围；新增严格 M2 授权负例与历史保留检查。通过之后才能把新文件纳入允许范围。
2. **RN-11**：先测卷别/两种遍历/分数验证；再测保存中阻止重复及切换、失败重试、草稿跨对象保留；最小实现三 Pane 和折叠焦点。为每个风险保留可运行检查。
3. **RN-12**：先测全筛选集加权聚合、空集/零分母、分页/图表选择不影响指标；实现四指标、趋势和等价表格。Loading/Error/Empty 可体验，失败不呈现旧范围数据。
4. **RN-14 M2**：记录初始生成和两轮明确结构调整（C1：固定筛选/独立滚动目录与位置恢复；C2：评分参考移入右区及滚动高度修复；D1：摘要提前和深色系列颜色；D2：趋势与 AI 并排及窄屏图内滚动），保留前后来源与实际结果。后续浏览器/审阅修复独立留痕，不覆盖六轮快照。导出新固定版本到独立目录，离线安装、类型/构建/三引擎运行及嵌套浮层复用回归。未测效率写 not-measured。
5. **RN-15 M2**：运行类型、完整单元/范围检查、构建、C/D Chromium/Firefox/WebKit，以及 A/B/依赖关键回归；截取桌面/窄屏/深色证据，测几何、字体、无页面溢出、键盘和错误状态。独立审阅后归档来源、限制、回退点及体验说明。

## 局部配方与边界

| 配方 | 来源与 Parts | CSS 例外理由 | Token / 晋升 |
| --- | --- | --- | --- |
| bm-c-grading-workbench | Layout Split/Stack/Inline；taskbar/context/answer/inspector/footer | 视口与多 Pane 滚动/响应式关系，原生目录状态 | 既有 Space/Radius/Line/Typography/语义颜色；not-proposed |
| bm-d-learning-report | Layout Grid/Stack/Inline；statistic/trend/detail/insight | 图形坐标和系列形状属于数据几何；响应式报告关系 | 既有 Token；系列为 Icon/Second/1、Icon/Green/1；AI 为 Fill/Second/Solid/3、Text/Second/1；not-proposed |

布局数值只定义局部几何，不新增全局 Token。所有样式限制在各场景根 class 下；不改变 Master 或历史 source-lock。

## 未决检查与状态

新视觉 Human Gate 为 awaiting_human；对比度按实测记录且不推导人工接受。真实 IME、读屏、触屏、跨机器 Data 字体仍待专门验证。无真实 AI、后端保存、生产附件预览；刷新清空示例编辑。无 Figma 写入、包/Registry 发布、业务迁移或 Git 写入授权。RN-16 后续品类不影响本批限定试用范围。
