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

Root始终native form，Item始终fieldset，Title为legend。SSR时可传完整 `items` 定义；Item name和choice value使用稳定业务ID。单选Choice与自由输入互斥；`multiple` 使用native checkbox并支持组合，自由输入仍按引擎协调。FormData单选用get、多选用getAll；主动跳过不产生答案字段，`onStatusChange` 区分unanswered/answered/skipped。每个Choice只有一个原生input，Rain RadioIndicator/CheckboxIndicator仅提供被动视觉。

下一题先校验当前题；提交校验所有启用题。必填不能Skip；返回保留答案。隐藏项沿用hidden/inert，导航后聚焦fieldset，错误聚焦答案。reset沿用原引擎恢复默认值/当前题/skip/invalid。`defaultItem`、受控item/onItemChange、Choice checked/defaultChecked/onChange、Input value/defaultValue及各类型全部保留；required/disabled/invalid由原primitive消费。不在包装器自行重排题目、管理提交网络、评分、同步或持久化。

单选原生箭头/Space、字母或数字shortcut选择仍不自动前进；文本输入不抢占字母，IME组合Enter/keyCode229保留给输入。Enter与Ctrl/Meta+Enter按源码导航。Boolean data属性为存在/不存在：例如checked、active、invalid、visible/hidden，不能按Scroller的data-active="true/false"匹配。

Progress默认可见文本与aria-valuetext均中文“第 n 题，共 m 题”，aria-label为问答进度；children、ARIA、render/state和ref仍可覆盖。默认Error文案可按题目覆盖。四导航按钮采用已有Button的variant/size类型及buttonRootRecipe画面，engine仍拥有真实button/ref/事件/隐藏；不用带第二状态的完整Button或Input取代引擎。默认Previous/Skip为secondary、Next/Submit为primary，中文文案可覆盖。

Root可接 `QuestionnaireRecipe`，Parts为root/progress/item/title/description/choices/choice/choice-description/input/error/actions/previous/skip/next/submit；子Part可显式指定recipe。原生className/style、source提供的各render、refs/事件保留；嵌套root建立局改新边界。页面为提交结果/失败保留答案与明确反馈，并由宿主决定提交成功后是否reset。

来源与差额：

- [固定作者源码](https://github.com/shadcn-ui/ui/blob/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048/apps/v4/registry/bases/base/ui/questionnaire.tsx)、[Nova](https://github.com/shadcn-ui/ui/blob/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048/apps/v4/registry/styles/style-nova.css)、[原引擎](https://github.com/shadcn-ui/ui/blob/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048/packages/react/src/questionnaire/components.tsx)，MIT。
- root/item gap16、choices gap8、choice gap10/内边距10×12、shortcut20保留。Nova rounded-lg当前固定默认10px（根16px假设），映射已有Rain Radius/10；标题16/24、说明14/22、progress12/20，Rain600替换来源500。
- Choice至少44px全断点；Input和四动作在小于640px时至少44px、Input在大屏32px，来自固定TSX min-h-11/sm:min-h-0与Nova h-8，非新增交互规定。compact仅收紧题面gap16→12；native文字输入不因密度变化压小触达目标。
- 表面/selected/invalid/focus/disabled全部Rain Token；状态同时有原生radio/check标志。复用既有18px radio/16px checkbox和24px对齐canvas，替换Nova自己绘制的16pxindicator；不复制input或内部选中状态。Source shortcut采用Rain UI12/20替换10px mono，便于阅读。隐藏规则单独保留display:none，防止Button display utility覆盖语义，不使用important。
- 颜色反馈使用Rain140ms；默认无进出题动画。四个动作补齐aria-disabled=true/"true"的click/Enter/Space阻断并保留焦点；它控制该按钮激活，不替代Questionnaire的题目/流程权限。启用动作先执行caller，preventDefault继续阻止引擎导航/提交。未加入自动前进、快捷键冲突的新策略、答案上传、分支/题库或Typeform SDK。

测试覆盖必填校验与焦点、单一native input、自由输入互斥、多值FormData、返回保持、主动跳过、字母选择/组合Enter、中文Progress的自定义render/ARIA/ref，以及aria-disabled的导航/原生提交阻断。真实浏览器还需检查reset/受控更新、鼠标/键盘和窄屏、暗色/强制色、焦点与标题说明层级；候选未发布、用户视觉Gate独立。
