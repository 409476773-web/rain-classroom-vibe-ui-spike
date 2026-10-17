# Questionnaire 控件复用：本地实施与验证

- 日期：2026-10-16
- 工作区：`.worktrees/card-v2`，分支 `codex/card-v2`
- 授权：用户“开始按文档实施改造”；范围见 `docs/plans/2026-10-16-questionnaire-control-reuse.md`
- 模式：System Mode；沿用现有 registry-candidate，未晋升资产成熟度
- 状态：本地实现完成；专项验证通过；当前 Questionnaire 呈现已获限定视觉确认，整体 Gate 与对比度继续独立记录

## 改造结果

1. Radio／Checkbox 共用无状态 `selection-control/selection-control.tsx`，保留原生 input、事件、ref、验证、Group 和 reset 的拥有者。原 Indicator 路径继续内部转导出。
2. Card 共用 `selection-card.parts.tsx`。普通卡片保持 div → label → input、label 外独立 actions；问答采用单一 label → input，复用同一外壳与选择行。
3. 两个 Questionnaire Adapter 放在 `packages/ui/src/questionnaire/`。Choice 仍由 `Primitive.Choice/ChoiceInput` 登记，单行 Input 仍由 `Primitive.Input` 管理值、原生约束和重置；没有镜像 input、第二个答案 store 或额外输入值状态。
4. 单行输入复用既有字段外框／input 配方。`size`、`maxLength/minLength/pattern/min/max/step`、输入类型及 `form=""`／缺失 name 的行为保留。真实 input 保留 className/style/ref/render 和原 `input` Recipe Part。
5. 公共接口仅新增可选 `QuestionnairePart/QuestionnaireRecipe` 的 `input-wrapper`。内部 Surface／Adapter／render helper 不由公共根入口导出；普通组件调用无需迁移。
6. 同步五份 Registry、五份 Manifest、Tailwind 精确源路径、README、ADR 0013 和本轮有限状态记录。旧验收、旧证据和旧哈希没有改写。

## 本轮发现并修复的兼容问题

| 问题 | 原因与修正 | 失败到通过的证据 |
| --- | --- | --- |
| ReactElement render 的取消事件／undefined 属性与原引擎不同 | 避免 Base UI 二次合并；内部 helper 保留固定引擎 skip-undefined、class/style/ref 与 preventDefault 语义 | `render-red.log` → `render-green.log`；受控值、FormData、双 ref 及事件回调对照 |
| 可用 Choice 被补成 data-disabled="false" | 问答适配显式保留原引擎的缺失属性，保持存在性选择器语义 | `disabled-attribute-red.log` → `disabled-attribute-green.log` |
| 自定义 label render 缺卡片外壳类 | 在调用默认／function／element renderer 前加入同一共享外壳类 | `custom-choice-surface-red.log` → `custom-choice-surface-green.log`；浏览器三路径 paint/geometry 对照 |
| 已选 invalid 选项边框仍蓝色 | 精确提高 label 错误态权重，使其在选中态之后生效；普通 div 卡片不受影响 | `browser/invalid-selected-red.log` → `browser/affected-final.log`；radio/checkbox 已选错误态红边 |

## 已运行验证

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| 改造前相关单元基线 | 7 文件、88 项通过 | `baseline-unit.log` |
| 改造前有限治理基线 | 48 项中 22 失败、26 通过 | `baseline-governance.log`；原日志被本轮证明保留 |
| 普通选择层提取 | 8 文件、67 项通过；UI typecheck 通过 | `logs/selection-tests.log`、`logs/selection-typecheck.log` |
| 相关控件和页面回归 | 19 文件、256 项通过 | `regression-unit.log`；后续局部修复另有 34 项问答复核 |
| 问答原始 Primitive 对照及适配 | 2 文件、34 项通过 | `custom-choice-surface-green.log`；六类 reset、原生类型、render/ref/事件、FormItem 隔离 |
| 全工作区类型检查 | 退出 0 | `workspace-typecheck.log` |
| 最终测试 TypeScript 检查 | 退出 0 | `test-typecheck.log` |
| 全工作区构建 | 退出 0；保留现有大 chunk 提示 | `workspace-build.log` |
| 浏览器完整回归 | 43/43 通过，含 31 项原有控件和 12 项桌面／390 问答 | `browser/full.log`、`browser/report.json` |
| 扩展问答浏览器复核 | 12/12 通过 | `browser/specialized-final.log`、`browser/specialized-final-report.json` |
| 末次视觉修复相关复核 | 4/4 通过 | `browser/affected-final.log`、`browser/affected-final-report.json`；未把重跑算成新增独立用例 |
| Registry 独立消费者 | 离线安装、类型检查、构建均退出 0 | `consumer-validation.json`、`consumer-{install,typecheck,build}.log` |
| 本轮有限源码／合同治理 | 14/14 通过；最终绑定以本轮 source-verification 为准 | `logs/governance-scoped.log`、`source-verification.json` |
| 原 48 项治理复核 | 仍为 22 失败、26 通过；失败标题新增 0、消失 0 | `logs/legacy-governance-after.log` |
| 全量超时关联的 G6 页面单独复核 | 7/7 通过，未调整断言或超时 | `g6-page-focused-recheck.log` |

独立消费者实际复制 142 个 Registry／源码／说明文件，递归核对 23 个 Registry 引用并在工作区外安装既有精确版本；没有复制完整 UI 源码树。消费者的公共 barrel 只保留本次已有公开入口，编译夹具还验证内部 Surface 未公开。该结果覆盖源码闭包、类型和构建，不等同于发布或生产硬化。

## 全库检查边界

本轮还运行 `pnpm test`、`pnpm verify:boundaries`、`pnpm verify:tailwind-b2`、`pnpm verify:tokens` 及旧 `verify-g6-components.mjs`，结果见相应 `workspace-test.log`、`verify-*.log`，均退出 1。全量测试为 317 文件中 51 失败／266 通过；3563 项中 192 失败／3223 通过／148 跳过。它们没有被记为全库通过；本轮相关控件测试及新增治理没有出现在全量失败文件列表中。

在本轮开始前单独测得的 22 项旧治理失败已完整保留，所选 48 项在改造后失败标题集合相同。更广范围的失败没有在本轮逐一建立改造前全量基线，不能将其全部归因为历史问题，也不在本轮扩大修复。主要可见信息包括历史阶段／源码绑定漂移、旧 CSS 结构校验和当前阶段边界策略缺口；部分页面用例在并发全量测试时触发原 5 秒超时。没有调大超时或降低断言来获得全量通过。

新增 CSS 后继仅在本轮有限变换、当前完整源码哈希、状态和保留证据都通过时，向旧颜色台账投影原选择器。新增 label 状态和扩展选择器另记实际 Token 消费与测量；无有效证明或被改动的源码继续失败。没有删除断言、刷新所有旧 hash 或把旧失败伪装成已通过前驱。

## 视觉与交互证据

- [打开前后对照](browser/index.html)：切换宽度、主题、密度，查看普通控件和问答的前后截图。
- [浏览器验证说明](browser/verification.md)：具体运行范围与截图、JSON 入口。
- 普通 Radio／Checkbox／Card 在 default/compact、light/dark、桌面/390 的八组中，各组 58 个已测节点的结构、paint 与几何一致。该结论限于夹具及已测属性，不推导全库视觉等价。
- 问答默认选项采用共享卡片 Radius8、内边距及选择行，选中和 disabled 采用原选择控件的视觉。输入采用共享 outlined 字段，default/compact 大屏 32/28；窄屏真实 input 高度 44px，含边框外框至少 46px。
- 实测点击真实 input 上下内边缘均聚焦；没有用外框高度替代点击测试。已验证 Choice/Input 焦点、invalid/disabled/readOnly、Select/Textarea 原焦点路径、强制颜色、字母／数字、skip 回改、120 原生 UTF-16 限制及六类 reset。
- 主任务已查看最终桌面和窄屏截图：指示器与文本行、快捷键位置、错误项和字段边界没有出现本轮可见的裁切或错位。此为限定自查，不替代用户视觉接受。

## 独立审阅与尚未验证项

用户在本轮交付后回复“确定”，已记录为[当前 Questionnaire 呈现的限定视觉确认](current-view-acceptance.md)。本次确认绑定上述实现版本；不扩展为四项暗色对比度测量的例外接受，或整体控件与设备矩阵的验收。

独立 AI 规格／代码质量审阅已通过，发现的问题按红绿验证修复；本轮治理另做只读复核并通过。此处不是人工视觉接受；审阅与运行检查各自保留，不互相推导。

`color-verification.json` 保留四项暗色边界低于 3:1 目标的待审测量：选中品牌边界约 2.573/2.361，错误红边界约 1.378/1.264。它们是声明表面堆栈的 Token 测量，没有被记为用户接受或实际全页面对比度通过；本轮未改 Token。

真实中文输入法、Safari、屏幕阅读器和物理触控尚未验证。Chromium、合成 IME 事件和模拟触控不能替代上述实测。当前页面视觉确认、整体人工 Gate、对比度接受、发布、Figma 和业务迁移分别记录；未创建 Git commit 或执行远程操作。

本地预览：`http://127.0.0.1:5481/#questionnaire`；可交互前后对照：`http://127.0.0.1:5482/`。没有由本地实现或检查通过推导生产可用。
