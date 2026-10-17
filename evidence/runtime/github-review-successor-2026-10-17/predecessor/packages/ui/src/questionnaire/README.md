# Questionnaire

逐题问答候选，适合课程反馈与学习需求收集。保留固定源码15个styled出口：Questionnaire、Progress、Item、Title、Description、Choices、Choice、ChoiceDescription、Input、Error、Actions、Previous、Skip、Next、Submit。所有状态/键盘/导航/校验使用唯一 `@shadcn/react@0.3.1` 引擎。

```tsx
<Questionnaire items={[{ name: "goal", required: true, choices: [{ value: "review" }, { value: "practice" }] }]} onSubmit={event => {
  event.preventDefault();
  save(new FormData(event.currentTarget));
}}>
  <QuestionnaireProgress />
  <QuestionnaireItem name="goal" required>
    <QuestionnaireTitle>今天的学习目标</QuestionnaireTitle>
    <QuestionnaireDescription>选择一项，或填写其他目标。</QuestionnaireDescription>
    <QuestionnaireChoices>
      <QuestionnaireChoice value="review">复习<QuestionnaireChoiceDescription>回顾已学章节。</QuestionnaireChoiceDescription></QuestionnaireChoice>
      <QuestionnaireChoice value="practice">练习</QuestionnaireChoice>
      <QuestionnaireInput aria-label="其他学习目标" placeholder="填写其他目标" />
    </QuestionnaireChoices>
    <QuestionnaireError />
  </QuestionnaireItem>
  <QuestionnaireActions><QuestionnairePrevious /><QuestionnaireSkip /><QuestionnaireNext /><QuestionnaireSubmit /></QuestionnaireActions>
</Questionnaire>
```

Root始终native form，Item始终fieldset，Title为legend。SSR时可传完整 `items` 定义；Item name和choice value使用稳定业务ID。单选Choice与自由输入互斥；`multiple` 使用native checkbox并支持组合，自由输入仍按引擎协调。FormData单选用get、多选用getAll；主动跳过不产生答案字段，`onStatusChange` 区分unanswered/answered/skipped。每个Choice只有一个原生input。

选择控件共用内部 `SelectionControlSurface`（label、指示器、内容行）与 `CardSurface`（卡片外壳）。普通 Radio／Checkbox 保留自己的原生输入与事件；问答适配器注入 `Primitive.ChoiceInput`，仍由固定引擎登记答案。QuestionnaireChoice 默认根仍为 label，input 为其直接子节点；className/style/recipe.choice 与 label ref 归属不变。富内容仍通过 ChoiceLabel／ChoiceDescription 呈现，不把任意 ReactNode 转为普通 Card 的 string label，也不在选项中嵌套完整 RadioCard／CheckboxCard。

下一题先校验当前题；提交校验所有启用题。必填不能Skip；返回保留答案。隐藏项沿用hidden/inert，导航后聚焦fieldset，错误聚焦答案。reset沿用原引擎恢复默认值/当前题/skip/invalid。`defaultItem`、受控item/onItemChange、Choice checked/defaultChecked/onChange、Input value/defaultValue及各类型全部保留；required/disabled/invalid由原primitive消费。不在包装器自行重排题目、管理提交网络、评分、同步或持久化。

单选原生箭头/Space、字母或数字shortcut选择仍不自动前进；文本输入不抢占字母，IME组合Enter/keyCode229保留给输入。Enter与Ctrl/Meta+Enter按源码导航。Boolean data属性为存在/不存在：例如checked、active、invalid、visible/hidden，不能按Scroller的data-active="true/false"匹配。

Progress默认可见文本与aria-valuetext均中文“第 n 题，共 m 题”，aria-label为问答进度；children、ARIA、render/state和ref仍可覆盖。默认Error文案可按题目覆盖。四导航按钮采用已有Button的variant/size类型及buttonRootRecipe画面，engine仍拥有真实button/ref/事件/隐藏；不用带第二状态的完整Button或Input取代引擎。默认Previous/Skip为secondary、Next/Submit为primary，中文文案可覆盖。

Root可接 `QuestionnaireRecipe`，Parts为root/progress/item/title/description/choices/choice/choice-description/**input-wrapper**/input/error/actions/previous/skip/next/submit；子Part可显式指定recipe。原生className/style、source提供的各render、refs/事件保留；嵌套root建立局改新边界。页面为提交结果/失败保留答案与明确反馈，并由宿主决定提交成功后是否reset。

单行输入适配器共用 `fieldFrameRecipe` 与 `inputControlClassName`，并保留唯一 `Primitive.Input`。`size` 仍是原生字符宽度，`maxLength/minLength/pattern/min/max/step` 仍是原生约束；没有引入完整 Input 的字符簇截断、清除、计数或另一套值管理。包括 number/date/password 在内的全部原有类型保留。外框默认采用 outlined 字段样式，default/compact 大屏分别为 32/28；窄于 640px 时真实 input 的有效高度至少 44px，外框计入边框后至少 46px。invalid/disabled/readOnly 映射为字段外观，不消费外层 FormItem 状态来改变问答语义。

唯一新增的公共合同是可选 `input-wrapper` Recipe Part。既有 `input` Part、className/style、ref、render 和事件继续作用在真实 input；外框改动单独声明，兄弟实例按原局改隔离规则处理：

```tsx
const questionnaireRecipe: QuestionnaireRecipe = {
  id: "course-feedback-field", scope: "feature", origin: "ui-questionnaire",
  classes: { "input-wrapper": "w-full", input: "text-start" },
  modifiedParts: ["input-wrapper", "input"], candidateTokens: [], promotionStatus: "not-proposed",
};
```

Input 的 `form=""` 或缺失 name 可能由引擎有意输出，用于排除当前未被选为答案的自由输入；适配器不补 name 或隐藏字段。reset 保留浏览器与引擎的原生路径：当前关联 form 的 input 参与原生重置；改选 radio 后脱离 form 的旧文本不承诺清空。宿主受控值的重置由宿主处理，onReset.preventDefault 继续取消重置。

来源与差额：

- [固定作者源码](https://github.com/shadcn-ui/ui/blob/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048/apps/v4/registry/bases/base/ui/questionnaire.tsx)、[Nova](https://github.com/shadcn-ui/ui/blob/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048/apps/v4/registry/styles/style-nova.css)、[原引擎](https://github.com/shadcn-ui/ui/blob/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048/packages/react/src/questionnaire/components.tsx)，MIT。
- root/item gap16、choices8、shortcut20保留；标题16/24、说明14/22、progress12/20，Rain600替换来源500。2026-10-16 选择表面改为共享 Card 的 Radius8、内边距16减边框、选择行 gap8，替代旧问答私有 Radius10／padding10×12／gap10；此变化需要独立视觉接受。
- Choice至少44px全断点；Input和四动作在小于640px时保持至少44px有效触达。compact 收紧题面gap16→12，并采用共享字段28px的大屏尺寸；默认字段大屏32px。未新增公共尺寸轴。
- 表面/selected/invalid/focus/disabled使用共享选择与字段规则及 Rain Token；状态同时有原生radio/check标志。共用既有18px radio/16px checkbox和24px对齐canvas，保留唯一input与原引擎选中状态。Source shortcut采用Rain UI12/20替换10px mono。隐藏规则单独保留display:none，防止Button display utility覆盖语义，不使用important。
- 交互反馈沿用共享控件与字段规则，默认无进出题动画。四个动作补齐aria-disabled=true/"true"的click/Enter/Space阻断并保留焦点；它控制该按钮激活，不替代Questionnaire的题目/流程权限。启用动作先执行caller，preventDefault继续阻止引擎导航/提交。未加入自动前进、快捷键冲突的新策略、答案上传、分支/题库或Typeform SDK。

本轮行为与视觉结果见 `evidence/runtime/questionnaire-reuse-2026-10-16/verification.md`；原始 Primitive 的 reset 对照与旧验证分别保留。真实中文输入法、Safari、屏幕阅读器、物理触控及用户视觉接受仍须单独记录。候选未发布，内部 Surface／Adapter 不从公共入口导出。
