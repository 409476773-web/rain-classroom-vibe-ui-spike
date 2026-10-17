# ADR 0013：Questionnaire 共用选择呈现与原生输入字段基础

- 日期：2026-10-16
- 状态：本地实施；候选未发布，视觉接受待确认
- 决策来源：用户先要求梳理重复能力并制定计划，随后明确“开始按文档实施改造”
- 工作模式：System Mode
- 计划：`../plans/2026-10-16-questionnaire-control-reuse.md`
- 证据：`../../evidence/runtime/questionnaire-reuse-2026-10-16/verification.md`

## 问题

Questionnaire 已有逐题、答案登记、跳过、校验、键盘、焦点和原生提交引擎，其选项与输入外观又重复实现了普通选择控件及字段的一部分能力。直接放入完整 Radio／Checkbox／Card 会增加另一个 input 或状态拥有者；直接替换为完整 Input 会改变原生 size、长度约束与 reset 语义。

## 决策

Questionnaire 继续使用固定 `@shadcn/react@0.3.1`。Radio／Checkbox 保留原生输入、验证、事件、ref 与 reset；Group 继续拥有自己的组合值。页面仍拥有题目定义、业务草稿、条件规则、提交与结果。

提取内部无状态 `SelectionControlSurface`，统一 label、指示器和选择行，调用方提供唯一真实 input。Surface 不 clone input、不存选中状态、不改变事件。普通控件调用原生 input，问答适配器调用 `Primitive.ChoiceInput`。

提取 `CardSurface` 与 `CardContent`。普通 Card 保留 div → label → input 与 label 外独立 actions；问答通过 CardSurface 的 label 形态保持单一 label → input。Card 的 string label 合同与问答任意 ReactNode 内容各自保留。共享 CSS 扩展直接 input 的匹配路径，共用现有状态声明。

问答适配文件放在 `packages/ui/src/questionnaire/`，直接依赖 Primitive 和共享呈现；不反向导入公开包装文件、不新增 Context 或答案 store。共享文件不得导入 Questionnaire。

单行输入继续由 `Primitive.Input` 创建，适配器消费 `fieldFrameRecipe`、`inputControlClassName` 与现有尺寸配方。外框只将引擎 invalid/disabled 和原生 readOnly 映射为外观；不接管输入值、原生约束或重置，不消费外部 FormItemContext 来覆盖问答语义。

## 公共合同

Radio／Checkbox／Group、Card、Input／FormItem 的公共接口不变。Questionnaire 的 Choice label ref、Input input ref、className/style、render(state)、原生约束与节点归属保留。

唯一新增的公共合同是 `QuestionnairePart`／`QuestionnaireRecipe` 可选的 `input-wrapper` Part。原 `input` Part 继续作用真实 input。内部 Surface、Card parts 与 Adapter 不由公共根入口导出。

输入 `size` 仍是原生字符宽度，`maxLength` 仍是原生 UTF-16 约束；不引入完整 Input 的字符簇管理。引擎为了排除未选文本而设置的 `form=""` 和缺失 name 必须保留。reset 与原始 Primitive 对照，不能在适配器中额外清空脱离 form 的文本。

## 影响与验证

普通控件预期无视觉变化。问答默认选项采用共享 Card 的 Radius8、内边距与选择行；输入采用共享 outlined 字段，default/compact 大屏为32/28，窄屏保留真实 input 至少44px的有效点击高度。问答视觉差异明确呈现，不能继承旧用户接受。

验证分别覆盖原有控件和逐题流程，包括单一 input／label、取消事件、受控／默认值、skip 回选、原生 reset、约束、IME 合成事件、自定义 render/ref、局改隔离、键盘与浏览器矩阵。真实输入法、Safari、屏幕阅读器和物理触控单列未验证范围。

Registry 交付必须包含共享层、图标、field/input 样式与传递依赖；独立消费入口覆盖问答、Card 和 DropdownMenu。历史证据与本轮绑定分开，已有治理失败不通过改旧 hash、降低断言或批量刷新基线隐藏。

## 暂缓

完整 Group／Input 状态接入、多行题、新输入类型、清除／计数、自动前进、业务持久化、引擎升级和生产接入不在本轮范围。
