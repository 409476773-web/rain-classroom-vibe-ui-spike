# Rain Select 统一面板：本轮验证

2026-10-13，工作区 `.worktrees/card-v2`。用户明确要求“所有目标浏览器里，展开后都要保持同样的雨课堂视觉”，并授权“直接落实最小范围的修改”。

## 实现范围

- 原生选择的独立目录项、示例和作业发布设置已合并到现有 Rain Select；旧 `#native-select` 链接继续打开 Select 页。
- 共享 Select 增加 `name` / `form`，仅命名字段接通 Base UI 既有 `required`；支持单选、多选重复字段名、清空、禁用排除和外部表单关联。未命名字段保留宿主校验合同。
- NativeSelect 本体及公共导出保留兼容，已有业务工程未迁移。未新增组件、依赖或视觉 Token。
- Select / NativeSelect 合同、G5 使用说明、检索索引与独立消费样例同步。人工视觉、正式浏览器/设备验收和发布状态未提升。

## 实际检查

| 检查 | 结果与证据 |
| --- | --- |
| Select、NativeSelect、相关页面测试 | 5 文件、75 项通过；`tests.log`。新表单测试先失败后实现；`tests-before.log`。 |
| 最终表单测试 | 7 项通过；`form-tests-final.log`。修正测试查询的 TypeScript 参数后复跑。 |
| 本轮源记录及日期历史夹具 | 3 文件、13 项通过；`select-governance-final.log`，包括本轮 3 项有限范围、状态和篡改负例。 |
| Playground 类型检查与构建 | 通过；`typecheck.log`、`build.log`。构建保留已有大包体积提示。 |
| 测试源类型检查 | `pnpm exec tsc --noEmit --project tsconfig.tests.json` 退出码 0；`tests-typecheck.log`。 |
| Chromium / Firefox / WebKit | 每引擎 2 项，共 6 项通过，无跳过、失败或 flaky；`browser/report.json`、`browser-run.log`。 |
| 主题与窄屏 | 每引擎检查 1440 / 390 宽度及浅 / 深主题；展开面板、分组、禁用项、无横向溢出、Escape 返回焦点；`browser/*-visual.json` 与 12 张截图。字体引号规范化后，三引擎记录的面板颜色、圆角、内边距、字体及边界一致；不代表字体栅格逐像素相同。 |
| 表单与键盘浏览器检查 | 必填阻止提交并聚焦、ArrowDown / End / Enter、提交值、清空、作业类型切换与保存反馈通过。 |
| 独立源码消费 | 类型、构建及 ZIP 完整性通过；`consumption/consumer-validation.json`。使用已安装依赖缓存，不是全新在线安装。 |
| 独立审阅 | 两次只读审阅未发现本轮实质问题；`independent-review.md`。 |

可操作入口：[Select](http://127.0.0.1:5395/#select)、[作业发布设置](http://127.0.0.1:5395/#field)。

## 保留的整库失败与并行边界

本批功能与有限验证通过，不宣称整库校验通过。

- `pnpm verify:governance` 的 lockfile 检查通过，随后 workspace 检查失败：原有 B2 状态历史、脚本集合、图表测试反向依赖，以及 Slider 的文档源记录；见 `workspace-governance.log`。修改前 phase 快照也能复现 B2 历史错误。
- 检索索引整体检查被并行日期任务尚不存在的 `evidence/runtime/date-picker-visual-feedback-2026-10-13/verification.md` 阻止；见 `asset-index-check.log`。本轮 NativeSelect 条目已调整，但不把整体索引检查记为通过。
- G5 / G4 跨批源记录仍被 Slider 的 `docs/ai/g5-components.md` 绑定挡住；见 `g5-validation.log`、`governance-test.log`。Slider 记录的 after 为 `914f1ef172b7e6c2ec67be5f1f52a309daa1ce0531b98a8f38c25f6e04efc4e1`，本任务开始时文档实际值为 `c6bfe77cc20bb6ce41a65931f63f11576d743d89b83f6b658ab8726e37bf039f`，此前差异保留，未改写其他任务的绑定来消除错误。
- 日期与滑块任务同时更新共享校验文件。本轮 `.mjs` 与阶段文件的交接基线采用日期任务当时已绑定且与磁盘匹配的版本；最早副本保存在 `before-initial/` 和 `closure-baseline-initial.json`。最初 14 个业务源文件的 `baseline.json` 与 before 字节保持不变。
- 本轮 `source-bindings.json` 只登记这 28 个有限路径；后续并行修改可使当前字节校验再次报告漂移，应由实际修改任务按范围续接，不推导已完成全库验收。

## 未检查或未授权

未做真实 Safari / iOS / Android 设备、VoiceOver、全库无障碍/对比度、强制颜色和全面生产性能验收；本轮复用既有 Select 的相关能力。未提交、推送、发布、写入 Figma 或迁移业务工程。未呈现状态及完整表单流程的人工验收仍待完成。

## 2026-10-13 用户确认后的续查

用户在实际 Select 页面展开“任务类型”面板后明确回复“确定。继续推进”。[本次确认](acceptance.json)只接受已展示的当前面板视觉，绑定 [当时截图](preview-open.jpg) 与六份未发生变化的本轮实现/合同文件；不授予全部状态、真实设备、表单实操、无障碍、对比度或发布验收。整体候选 Gate 保持原状态。

本次复跑 Select、NativeSelect、表单和相关页面的五份用例，75 项全部通过；见 [确认后回归](confirmation-tests.log)。没有再添加功能或改变已确认样式。

日期收口阶段的有限源文件记录已能验证。Select / G5 共享链当前仍失败；[阶段差异](confirmation-shared-differences.json)逐项比较后，唯一剩余阶段差异是本批开始后新增的 `localExperiments.rainDesignerStarter` 完整记录。这是单独 S3 任务的登记，本轮不修改或删除它、不回填旧快照，也不把未知条目忽略成通过。

此前缺少的日期验证文档现在存在，索引检查最初进入内容比对并报告 `Asset index is stale`。随后用既有 `asset-index.mjs --write` 重建索引，`--check` 通过；见 [索引检查](confirmation-asset-index-check.log)。[单文件来源观察](confirmation-index-source.json)绑定实际 before/after，原件保存在 `confirmation-before/docs/ai/asset-index.md`；没有为此重写原 Select 或其他任务的历史绑定。旧共享链仍需要按实际 owner 衔接这次索引后继。B2 历史校验仍失败，未对整库校验作通过声明。

## 2026-10-13 共享来源收口复核（当前结果）

用户要求“继续下一步”后，检查发现 [Slider 的有限收口](../slider-closeout-2026-10-13/verification.md)已经完成共享阶段与索引的来源衔接。本次直接复用并验证这条已有证明，没有再次修改组件实现、阶段状态、旧快照或原 Select 绑定；前两节记录的共享来源阻塞现在已经关闭。

- 12 条当前来源读者全部通过，覆盖 Select、Slider、DatePicker 的各次改造与收口，以及 G4/G5；见 [来源结果与当前哈希](shared-closeout-followup/source-readers.json)。新增 S3 记录通过有限证明衔接，其原始来源与验收状态仍受检查，不将未知阶段自动忽略。
- 8 份相关回归文件、55 项测试全部通过，包含额外授权、未知阶段、第三份源码、伪造快照、重新签名、改变旧 Gate 与 S3 来源的拒绝用例；见 [回归日志](shared-closeout-followup/governance-tests.log)。
- 当前索引检查通过；见 [索引日志](shared-closeout-followup/asset-index-check.log)。本次没有重新生成索引。
- 当前面板确认绑定的六份源码/合同与截图全部保持原字节；见 [确认来源复核](shared-closeout-followup/accepted-source-check.json)。没有重复运行浏览器，也没有扩大原视觉确认的范围。

整库 workspace 检查仍退出 1，剩余问题是完整冻结 B2 历史、精确命令清单，以及两份图表测试的反向依赖；见 [实际整库结果](shared-closeout-followup/workspace.log)。本次没有将这些结果记为通过。Select 保持候选、未发布；整体人工验收、真实 Safari/设备、读屏及对比度验收仍按原边界保留。
