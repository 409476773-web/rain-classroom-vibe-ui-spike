# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g6-components.spec.ts >> questionnaire conditional validation, native summary, restore and submit failure
- Location: evidence/runtime/g1-g6-closeout-2026-10-17/run-01/browser/g6-components.spec.ts:64:1

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.check: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('form', { name: '课堂反馈', exact: true }).getByRole('radio', { name: /其他目标/ })
    - locator resolved to <input id="_r_4_" required="" type="radio" name="topic" value="other" data-invalid="" data-unchecked="" data-shortcut="C" data-type="radio" aria-invalid="true" data-focus="control" aria-keyshortcuts="C" data-slot="choice-input" class="rain-questionnaire__choice-input sr-only"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
    - retrying click action
      - waiting 100ms
    115 × waiting for element to be visible, enabled and stable
        - element is visible, enabled and stable
        - scrolling into view if needed
        - done scrolling
        - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
      - retrying click action
        - waiting 500ms

```

# Page snapshot

```yaml
- main [ref=e5]:
  - generic [ref=e6]:
    - link "返回组件目录" [ref=e7] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e9]:
      - heading "Questionnaire 逐题问答" [level=1] [ref=e10]
      - generic [ref=e11]: UI · 文档页试改 · 公共组件待评审
    - paragraph [ref=e12]: 聚焦一题，允许返回修改；保留原生表单，提交后由宿主呈现结果。
    - generic "预览设置" [ref=e13]:
      - button "浅色" [pressed] [ref=e14] [cursor=pointer]
      - button "深色" [ref=e16] [cursor=pointer]
      - button "紧凑密度" [ref=e18] [cursor=pointer]
  - generic [ref=e20]:
    - generic [ref=e21]:
      - heading "课堂反馈" [level=2] [ref=e22]
      - paragraph [ref=e23]: 逐题作答、回改和条件补充；成功后切换到本次完成摘要。
      - generic [ref=e25]:
        - generic [ref=e26]:
          - generic [ref=e27]: 课堂观察与证据判断
          - generic [ref=e28]: 课后反馈 · 本地演示
        - form "课堂反馈" [ref=e29]:
          - progressbar "问答进度" [ref=e30]: 第 1 题 · 当前共 3 题
          - group "这节课，你最希望得到什么帮助？" [ref=e31]:
            - paragraph [ref=e33]: 选择最需要的一项，帮助老师安排后续学习。
            - generic [ref=e34]:
              - generic [ref=e35] [cursor=pointer]:
                - radio "希望多看示例 通过例子理解事实和解释。" [active] [ref=e36]
                - generic [ref=e39]:
                  - generic [ref=e40]: 希望多看示例
                  - generic [ref=e41]: 通过例子理解事实和解释。
                - generic: A
              - generic [ref=e42] [cursor=pointer]:
                - radio "希望加强练习 练习记录与判断。" [ref=e43]
                - generic [ref=e46]:
                  - generic [ref=e47]: 希望加强练习
                  - generic [ref=e48]: 练习记录与判断。
                - generic: B
              - generic [ref=e49] [cursor=pointer]:
                - radio "其他目标 接下来需要补充说明。" [ref=e50]
                - generic [ref=e53]:
                  - generic [ref=e54]: 其他目标
                  - generic [ref=e55]: 接下来需要补充说明。
                - generic: C
            - alert [ref=e56]: 请选择学习目标。
          - button "下一题" [ref=e58] [cursor=pointer]
        - generic [ref=e59]:
          - generic [ref=e60]: 需要稍后继续？
          - button "保存本页草稿" [ref=e61] [cursor=pointer]
          - button "恢复草稿" [disabled] [ref=e63]
        - group [ref=e65]:
          - generic "演示控制" [ref=e66] [cursor=pointer]
    - generic [ref=e67]:
      - heading "默认、局改与未改兄弟" [level=2] [ref=e68]
      - paragraph [ref=e69]: 只改中间样板的Title；三个原生表单与答案分别独立。
      - generic [ref=e71]:
        - generic [ref=e72]:
          - form "默认偏好样板" [ref=e73]:
            - progressbar "问答进度" [ref=e74]: 第 1 题，共 1 题
            - group "回答长度" [ref=e75]:
              - generic [ref=e77]:
                - generic [ref=e78] [cursor=pointer]:
                  - radio "简短回答" [ref=e79]
                  - generic [ref=e82]: 简短回答
                - generic [ref=e83] [cursor=pointer]:
                  - radio "展开说明" [ref=e84]
                  - generic [ref=e87]: 展开说明
            - button "应用偏好" [ref=e89] [cursor=pointer]
          - status [ref=e90]: 默认偏好样板
        - generic [ref=e91]:
          - form "局改偏好样板" [ref=e92]:
            - progressbar "问答进度" [ref=e93]: 第 1 题，共 1 题
            - group "回答长度" [ref=e94]:
              - generic [ref=e96]:
                - generic [ref=e97] [cursor=pointer]:
                  - radio "简短回答" [ref=e98]
                  - generic [ref=e101]: 简短回答
                - generic [ref=e102] [cursor=pointer]:
                  - radio "展开说明" [ref=e103]
                  - generic [ref=e106]: 展开说明
            - button "应用偏好" [ref=e108] [cursor=pointer]
          - status [ref=e109]: 局改偏好样板
        - generic [ref=e110]:
          - form "未改兄弟偏好样板" [ref=e111]:
            - progressbar "问答进度" [ref=e112]: 第 1 题，共 1 题
            - group "回答长度" [ref=e113]:
              - generic [ref=e115]:
                - generic [ref=e116] [cursor=pointer]:
                  - radio "简短回答" [ref=e117]
                  - generic [ref=e120]: 简短回答
                - generic [ref=e121] [cursor=pointer]:
                  - radio "展开说明" [ref=e122]
                  - generic [ref=e125]: 展开说明
            - button "应用偏好" [ref=e127] [cursor=pointer]
          - status [ref=e128]: 未改兄弟偏好样板
    - generic [ref=e129]:
      - heading "持久化与消费边界" [level=2] [ref=e130]
      - paragraph [ref=e132]: 本页草稿仅保存在当前组件状态中。实际产品由宿主决定保存位置、恢复策略与隐私边界。题目集合使用稳定name，提交读取真实FormData与onStatusChange状态。恢复的是答案和上次跳过元信息；引擎没有默认skipped入口，因此恢复后须重新确认跳过。最后一题的Skip沿源码会自动提交，宿主明确显示“跳过并提交”。
  - region [ref=e133]:
    - heading "使用边界" [level=2] [ref=e134]
    - generic [ref=e135]:
      - generic [ref=e136]:
        - heading "适合用在" [level=3] [ref=e137]
        - list [ref=e138]:
          - listitem [ref=e139]: 短反馈与偏好问答需要单题节奏。
          - listitem [ref=e140]: 需要单选、多选、文本与条件题。
      - generic [ref=e141]:
        - heading "避免用在" [level=3] [ref=e142]
        - list [ref=e143]:
          - listitem [ref=e144]: 问卷编辑器、考试评分或复杂跳转系统。
          - listitem [ref=e145]: 把宿主摘要当作来源新增Summary Part。
  - generic [ref=e146]:
    - region [ref=e147]:
      - heading "API 与结构" [level=2] [ref=e148]
      - table [ref=e150]:
        - caption [ref=e151]: Questionnaire 逐题问答 常用接口
        - rowgroup [ref=e152]:
          - row [ref=e153]:
            - columnheader "名称" [ref=e154]
            - columnheader "类型" [ref=e155]
            - columnheader "默认" [ref=e156]
            - columnheader "说明" [ref=e157]
        - rowgroup [ref=e158]:
          - row [ref=e159]:
            - rowheader [ref=e160]:
              - code [ref=e161]: items / item / onItemChange
            - cell [ref=e162]:
              - code [ref=e163]: QuestionnaireItemDefinition[] / string / callback
            - cell "—" [ref=e164]
            - cell "明确集合支持SSR；宿主可控制当前题。" [ref=e165]
          - row [ref=e166]:
            - rowheader [ref=e167]:
              - code [ref=e168]: name / required / multiple
            - cell [ref=e169]:
              - code [ref=e170]: 原生fieldset语义
            - cell "—" [ref=e171]
            - cell "引擎维护答案；一个真实input对应一个choice。" [ref=e172]
          - row [ref=e173]:
            - rowheader [ref=e174]:
              - code [ref=e175]: shortcuts
            - cell [ref=e176]:
              - code [ref=e177]: letters / numbers
            - cell "—" [ref=e178]
            - cell "保留来源快捷键；输入组合期间不自动提交。" [ref=e179]
      - paragraph [ref=e180]: Parts / Slots：Root、Progress、Item、Title、Description、Choices、Choice、ChoiceDescription、Input、Error、Actions、Previous、Skip、Next、Submit
    - region [ref=e181]:
      - heading "调用示例" [level=2] [ref=e182]
      - generic [ref=e183]:
        - generic [ref=e184]:
          - button "复制代码" [ref=e185] [cursor=pointer]
          - status
        - code [ref=e188]: "const items=[{name:\"goal\",required:true,choices:[{value:\"review\"}]},{name:\"note\"}]; <Questionnaire items={items} onSubmit={e=>{e.preventDefault(); save(new FormData(e.currentTarget));}}> <QuestionnaireProgress /><QuestionnaireItem name=\"goal\" required><QuestionnaireTitle>学习目标</QuestionnaireTitle><QuestionnaireChoice value=\"review\">复习</QuestionnaireChoice><QuestionnaireError /></QuestionnaireItem> <QuestionnaireItem name=\"note\"><QuestionnaireTitle>补充</QuestionnaireTitle><QuestionnaireInput aria-label=\"补充说明\" /></QuestionnaireItem> <QuestionnaireActions><QuestionnairePrevious /><QuestionnaireSkip /><QuestionnaireNext /><QuestionnaireSubmit /></QuestionnaireActions> </Questionnaire>"
      - paragraph [ref=e189]:
        - text: 当前源码：
        - code [ref=e190]: packages/ui/src/questionnaire/questionnaire.tsx
```

# Test source

```ts
  1   | import { test, expect, type Page } from "@playwright/test";
  2   | import { mkdirSync, writeFileSync } from "node:fs";
  3   | import { verifyConversationReading } from "/Users/wenchengkai/CodexFile/\u96e8\u8bfe\u5802-shadcn\u7ec4\u4ef6\u5e93\u67b6\u6784/.worktrees/card-v2/tests/e2e/helpers/conversation-scrolling";
  4   | const evidence="/Users/wenchengkai/CodexFile/\u96e8\u8bfe\u5802-shadcn\u7ec4\u4ef6\u5e93\u67b6\u6784/.worktrees/card-v2/evidence/runtime/g1-g6-closeout-2026-10-17/run-01/browser/g6";
  5   | mkdirSync(evidence,{recursive:true});
  6   | async function open(page:Page,id:string){await page.goto(`/#${id}`);await expect(page.locator(`#${id}-title`)).toBeVisible();}
  7   | const ids=["data-table","aspect-ratio","attachment","direction","drawer","input-otp","carousel","bubble","marker","message","message-scroller","questionnaire"];
  8   | test.beforeEach(({page})=>page.on("pageerror",error=>{throw error;}));
  9   | test("12 routes, themes, density, 390px and source examples",async({page,context},info)=>{
  10  |  await context.grantPermissions(["clipboard-read","clipboard-write"]);const facts=[];
  11  |  for(const id of ids){
  12  |   await page.goto(`/#${id}`); await expect(page.locator(`#${id}-title`)).toBeVisible();
  13  |   await expect(page.getByRole("heading",{name:"API 与结构",exact:true})).toBeVisible();
  14  |   expect(await page.evaluate(()=>document.documentElement.scrollWidth),id).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  15  |   await page.locator(".component-doc__example").first().screenshot({path:`${evidence}/${id}-${info.project.name}-light.png`});
  16  |   await page.getByRole("button",{name:"深色",exact:true}).click();await page.getByRole("button",{name:"紧凑密度",exact:true}).click();
  17  |   await expect(page.locator("main.component-doc")).toHaveAttribute("data-rain-theme","dark");
  18  |   expect(await page.evaluate(()=>document.documentElement.scrollWidth),`${id} dark`).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  19  |   await page.locator(".component-doc__example").first().screenshot({path:`${evidence}/${id}-${info.project.name}-dark-compact.png`});
  20  |   await page.getByRole("button",{name:"复制代码",exact:true}).last().click();await expect(page.getByText("已复制",{exact:true})).toBeVisible();
  21  |   facts.push({id,width:await page.evaluate(()=>document.documentElement.scrollWidth),copied:await page.evaluate(()=>navigator.clipboard.readText())});
  22  |  }
  23  |  writeFileSync(`${evidence}/matrix-${info.project.name}.json`,JSON.stringify(facts,null,2));
  24  | });
  25  | test("media ratio, attachment actions and direction islands",async({page})=>{
  26  |  await open(page,"aspect-ratio"); const ratios=await page.locator('.g6-media-grid').first().locator('[data-rain-id="ui-aspect-ratio"]').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return r.width/r.height;}));
  27  |  expect(ratios[0]).toBeCloseTo(16/9,1);expect(ratios[1]).toBeCloseTo(1,1);expect(ratios[2]).toBeCloseTo(4/3,1);
  28  |  await expect(page.locator('.g6-media-image--cover')).toHaveCSS('object-fit','cover');await expect(page.locator('.g6-media-image--contain')).toHaveCSS('object-fit','contain');
  29  |  await open(page,"attachment");await page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true}).click();await expect(page.getByRole('dialog')).toBeVisible();await page.getByRole('button',{name:'关闭',exact:true}).click();await expect(page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true})).toBeFocused();
  30  |  await page.getByRole('button',{name:'移除 课程导读：从问题到证据.pdf',exact:true}).click();await expect(page.getByRole('dialog')).toHaveCount(0);await expect(page.getByRole('button',{name:'预览 高等数学课程封面.png',exact:true})).toBeFocused();
  31  |  await page.locator('.rain-attachment-picker input[type="file"]').setInputFiles({name:'课堂补充说明.txt',mimeType:'text/plain',buffer:Buffer.from('课堂补充说明')});await page.getByRole('button',{name:'上传 课堂补充说明.txt',exact:true}).click();await expect(page.getByTestId('attachment-live-list')).toContainText('正在上传');await expect(page.getByRole('button',{name:'保存附件',exact:true})).toBeEnabled({timeout:4000});
  32  |  await open(page,"direction");await expect(page.locator('.g6-direction-example[dir="rtl"]')).toContainText('Context: rtl');await expect(page.locator('.g6-direction-example[dir="ltr"]')).toContainText('Context: ltr');
  33  | });
  34  | test("task drawer modality, draft protection, menu and nested focus",async({page},info)=>{
  35  |  await open(page,"drawer");await page.getByRole('button',{name:'深色',exact:true}).click();await page.getByRole('button',{name:'紧凑密度',exact:true}).click();
  36  |  const trigger=page.getByRole('button',{name:'编辑课前任务',exact:true});await trigger.click();const dialog=page.getByRole('dialog',{name:'编辑课前任务',exact:true});await expect(dialog).toHaveAttribute('data-density','compact');
  37  |  await page.getByRole('button',{name:'展开编辑',exact:true}).click();await dialog.getByRole('textbox',{name:'任务标题',exact:true}).fill('本地课堂任务草稿');await dialog.press('Escape');await expect(page.getByRole('alert')).toContainText('未保存');await page.getByRole('button',{name:'继续编辑',exact:true}).click();
  38  |  await page.getByRole('button',{name:'完成方式：个人记录',exact:true}).click();await page.getByRole('menuitem',{name:'小组讨论',exact:true}).click();await expect(page.getByRole('button',{name:'完成方式：小组讨论',exact:true})).toBeVisible();
  39  |  await page.getByRole('button',{name:'查看学生任务预览',exact:true}).click();await expect(page.getByRole('dialog',{name:'学生任务预览',exact:true})).toContainText('本地课堂任务草稿');await page.getByRole('button',{name:'返回编辑',exact:true}).click();await expect(page.getByRole('button',{name:'查看学生任务预览',exact:true})).toBeFocused();
  40  |  await dialog.screenshot({path:`${evidence}/drawer-task-${info.project.name}.png`});await page.getByRole('button',{name:'取消修改',exact:true}).click();await expect(trigger).toBeFocused();await expect(page.getByTestId('drawer-saved-title')).not.toContainText('本地课堂任务草稿');
  41  |  for(const side of ['底部','顶部','左侧','右侧']){await page.getByRole('button',{name:`从${side}打开`,exact:true}).click();await page.getByRole('button',{name:`关闭${side}抽屉`,exact:true}).click();await expect(page.getByRole('button',{name:`从${side}打开`,exact:true})).toBeFocused();}
  42  |  await page.getByRole('button',{name:'打开非模态记录',exact:true}).click();await page.getByRole('textbox',{name:'随堂记录',exact:true}).fill('可以编辑非模态记录');await page.getByRole('button',{name:'记录一次观察',exact:true}).click();await expect(page.getByTestId('drawer-observation-count')).toContainText('1次');await expect(page.getByRole('dialog',{name:'非模态课堂记录',exact:true})).toBeVisible();await page.getByRole('button',{name:'关闭课堂记录',exact:true}).click();
  43  |  await page.getByRole('button',{name:'打开焦点约束记录',exact:true}).click();await page.getByRole('textbox',{name:'随堂记录',exact:true}).fill('可以编辑焦点约束记录');await page.getByRole('button',{name:'关闭课堂记录',exact:true}).press('Tab');await expect.poll(()=>page.evaluate(()=>!!document.activeElement?.closest('[role="dialog"]'))).toBe(true);await page.getByRole('button',{name:'关闭课堂记录',exact:true}).click();
  44  | });
  45  | test("OTP paste, explicit verification, error preservation and retry",async({page,context})=>{
  46  |  await context.grantPermissions(['clipboard-read','clipboard-write']);await open(page,"input-otp");const form=page.getByTestId('otp-verification-form'),input=form.getByRole('textbox',{name:'课堂验证码',exact:true});await expect(form.locator('input')).toHaveCount(1);
  47  |  await page.evaluate(()=>navigator.clipboard.writeText('123456'));await input.focus();await input.press('ControlOrMeta+V');await expect(input).toHaveValue('123456');await expect(page.getByTestId('otp-submitted-code')).toContainText('尚未提交');
  48  |  await form.getByRole('button',{name:'验证并进入课堂',exact:true}).click();await expect(form).toContainText('验证码已过期');await expect(input).toHaveValue('123456');await expect(input).toHaveAttribute('aria-invalid','true');await input.fill('654321');await form.getByRole('button',{name:'验证并进入课堂',exact:true}).click();await expect(form).toContainText('验证通过');
  49  | });
  50  | test("carousel actual API, input key ownership, RTL and vertical",async({page})=>{
  51  |  await open(page,"carousel");const first=page.getByRole('region',{name:'课程学习资料',exact:true});await expect(page.getByTestId('carousel-position')).toContainText('第1份 / 共3份');await page.getByRole('textbox',{name:'记录第1份资料笔记',exact:true}).fill('课堂笔记');await page.getByRole('textbox',{name:'记录第1份资料笔记',exact:true}).press('ArrowRight');await expect(page.getByTestId('carousel-position')).toContainText('第1份');
  52  |  await first.getByRole('button',{name:'阅读下一份资料',exact:true}).click();await expect(page.getByTestId('carousel-position')).toContainText('第2份');await page.getByRole('button',{name:'添加一份资料',exact:true}).click();await expect(page.getByTestId('carousel-position')).toContainText('共4份');
  53  |  const rtl=page.getByRole('region',{name:'资料 RTL 示例',exact:true});await expect(rtl).toHaveAttribute('dir','rtl');await rtl.press('ArrowLeft');await expect(rtl.getByRole('button',{name:'上一份',exact:true})).toBeEnabled();
  54  |  const vertical=page.getByRole('region',{name:'纵向课程摘录',exact:true});await vertical.press('ArrowDown');await expect(vertical.getByRole('button',{name:'上一项',exact:true})).toBeEnabled();
  55  | });
  56  | test("conversation reactions, copy, local retry and meaningful marker",async({page,context})=>{
  57  |  await open(page,"bubble");const reaction=page.getByRole('button',{name:/有帮助/});await reaction.click();await expect(reaction).toHaveAttribute('aria-pressed','true');await reaction.click();await expect(reaction).toHaveAttribute('aria-pressed','false');
  58  |  await open(page,"marker");await page.getByRole('button',{name:'查看说明',exact:true}).click();await expect(page.locator('#g6-marker-details')).toBeVisible();
  59  |  await context.grantPermissions(['clipboard-read','clipboard-write']);await open(page,"message");await page.getByRole('button',{name:'复制辅导回答',exact:true}).click();expect(await page.evaluate(()=>navigator.clipboard.readText())).toContain('先写下你直接看到的事实');await page.getByRole('button',{name:'重试发送补充问题',exact:true}).click();await expect(page.getByText('已发送 · 本地模拟',{exact:true})).toBeVisible();
  60  | });
  61  | test("scroller preserves reading on stream/prepend, pauses and commands",async({page})=>{
  62  |  await verifyConversationReading(page);
  63  | });
  64  | test("questionnaire conditional validation, native summary, restore and submit failure",async({page})=>{
> 65  |  await open(page,"questionnaire");const form=page.getByRole('form',{name:'课堂反馈',exact:true});await form.getByRole('button',{name:'下一题',exact:true}).click();await expect(form.getByRole('alert')).toBeVisible();await form.getByRole('radio',{name:/其他目标/}).check();await form.getByRole('button',{name:'下一题',exact:true}).click();await form.getByRole('textbox',{name:'具体学习目标',exact:true}).fill('一');await page.getByRole('button',{name:'保存本页草稿',exact:true}).click();await page.getByRole('button',{name:'恢复草稿',exact:true}).click();await form.getByRole('button',{name:'下一题',exact:true}).click();await expect(form.getByRole('progressbar')).toContainText('第 2 题');
      |                                                                                                                                                                                                                                                             ^ Error: locator.check: Test timeout of 60000ms exceeded.
  66  |  await form.getByRole('textbox',{name:'具体学习目标',exact:true}).fill('希望理解证据');await form.getByRole('button',{name:'下一题',exact:true}).click();await form.getByRole('checkbox',{name:/观察记录/}).check();await form.getByRole('button',{name:'上一题',exact:true}).click();await expect(form.getByRole('textbox',{name:'具体学习目标',exact:true})).toHaveValue('希望理解证据');await form.getByRole('button',{name:'下一题',exact:true}).click();await form.getByRole('button',{name:'下一题',exact:true}).click();await page.getByRole('button',{name:'模拟提交失败：关',exact:true}).click();await form.getByRole('button',{name:'跳过并提交',exact:true}).click();await form.getByRole('button',{name:'提交反馈',exact:true}).click();await expect(page.getByRole('region',{name:'反馈摘要',exact:true})).toHaveCount(0);await page.getByRole('button',{name:'模拟提交失败：开',exact:true}).click();await form.getByRole('button',{name:'提交反馈',exact:true}).click();await expect(page.getByRole('region',{name:'反馈摘要',exact:true})).toContainText('希望理解证据');
  67  | });
  68  | test("reduced motion and forced colors keep state readable",async({page})=>{
  69  |  await page.emulateMedia({reducedMotion:'reduce',forcedColors:'active'});await open(page,"marker");await expect(page.locator('.rain-marker__content--shimmer')).toHaveCSS('animation-name','none');await expect(page.locator('.rain-marker__content--shimmer')).toBeVisible();await open(page,"attachment");await expect(page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true})).toBeVisible();await page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true}).press('Enter');await expect(page.getByRole('dialog')).toBeVisible();
  70  | });
  71  | test("isolated installed packages: default, local recipe, sibling and copied table",async({page})=>{
  72  |  await page.goto('http://127.0.0.1:5398');await expect(page.getByRole('heading',{name:'G6 独立包消费',exact:true})).toBeVisible();
  73  |  const first=page.getByTestId('default'),local=page.getByTestId('local'),sibling=page.getByTestId('sibling');
  74  |  const padding=(host:ReturnType<typeof page.getByTestId>)=>host.locator('.rain-bubble__content').first().evaluate(n=>getComputedStyle(n).paddingInlineStart);
  75  |  expect(await padding(first)).toBe(await padding(sibling));expect(await padding(local)).not.toBe(await padding(first));
  76  |  const drawerPadding=[];
  77  |  for (const [host,label] of [[first,'默认'],[local,'局改'],[sibling,'未改兄弟']] as const) {
  78  |   const trigger=host.getByRole('button',{name:`打开${label}任务`,exact:true});await trigger.click();const popup=page.getByRole('dialog',{name:`${label}任务`,exact:true});await expect(popup).toBeVisible();drawerPadding.push(await popup.evaluate(el=>getComputedStyle(el).paddingInlineStart));await popup.getByRole('button',{name:'关闭任务',exact:true}).click();await expect(trigger).toBeFocused();
  79  |  }
  80  |  expect(drawerPadding[0]).toBe(drawerPadding[2]);expect(drawerPadding[1]).not.toBe(drawerPadding[0]);
  81  |  await first.getByRole('textbox',{name:'默认验证码',exact:true}).fill('1234');await expect(first.getByRole('textbox',{name:'默认验证码',exact:true})).toHaveValue('1234');
  82  |  await first.getByRole('radio',{name:'复习课程',exact:true}).check();await first.getByRole('button',{name:'提交默认反馈',exact:true}).click();await expect(first.getByRole('status')).toContainText('反馈：review');
  83  |  await expect(page.getByTestId('table-default').getByRole('textbox',{name:'查找资料',exact:true})).toBeVisible();
  84  |  const localFacts=[];
  85  |  for (const [id,selector,property] of [
  86  |   ['aspect-ratio','[data-rain-id="ui-aspect-ratio"]','padding-inline-start'],['attachment','[data-rain-id="ui-attachment"]','padding-inline-start'],
  87  |   ['input-otp','[data-slot="input-otp-group"]','gap'],['carousel','[data-rain-id="ui-carousel"]','padding-inline-start'],
  88  |   ['marker','[data-rain-id="ui-marker"]','padding-inline-start'],['message','[data-rain-id="ui-message"]','padding-inline-start'],
  89  |   ['message-scroller','[data-rain-id="ui-message-scroller"]','height'],['questionnaire','[data-rain-id="ui-questionnaire"]','padding-inline-start'],
  90  |  ] as const) {
  91  |   const value=async(host:ReturnType<typeof page.getByTestId>)=>host.locator(selector).first().evaluate((element,name)=>getComputedStyle(element).getPropertyValue(name),property);
  92  |   const values=[await value(first),await value(local),await value(sibling)];expect(values[0],id).toBe(values[2]);expect(values[1],id).not.toBe(values[0]);localFacts.push({id,property,values});
  93  |  }
  94  |  expect(await local.locator('[dir="rtl"]').count()).toBe(1);expect(await sibling.locator('[dir="rtl"]').count()).toBe(0);
  95  |  const tablePadding=async(mode:string)=>page.getByTestId(`table-${mode}`).locator('.data-table-recipe').evaluate(el=>getComputedStyle(el).paddingInlineStart);
  96  |  expect(await tablePadding('default')).toBe(await tablePadding('sibling'));expect(await tablePadding('local')).not.toBe(await tablePadding('default'));
  97  |  writeFileSync(`${evidence}/consumer-local-isolation-${page.viewportSize()!.width}.json`,JSON.stringify({localFacts,drawerPadding,tableFork:'source-copy-export-and-one-root-class-only',tablePadding:[await tablePadding('default'),await tablePadding('local'),await tablePadding('sibling')],direction:'local RTL; sibling LTR'},null,2));
  98  | });
  99  | test("data table keeps stable selection, query scope, columns and failed refresh",async({page})=>{
  100 |  await open(page,'data-table');await page.getByRole('checkbox',{name:'选择当前页可操作资料',exact:true}).locator('..').click();await expect(page.getByText('已选 4 份资料',{exact:true})).toBeVisible();await expect(page.getByRole('checkbox',{name:'选择 课堂观察记录',exact:true})).toBeDisabled();await page.getByRole('button',{name:'取消选择',exact:true}).click();
  101 |  await page.getByRole('checkbox',{name:'选择 设计方法导论',exact:true}).press('Space');await page.getByRole('button',{name:'下一页',exact:true}).click();await expect(page.getByText('含其他页 1 份',{exact:true})).toBeVisible();await page.getByRole('button',{name:'上一页',exact:true}).click();await expect(page.getByRole('checkbox',{name:'选择 设计方法导论',exact:true})).toBeChecked();
  102 |  await page.getByRole('button',{name:'按资料名称排序',exact:true}).click();await page.getByRole('button',{name:'下一页',exact:true}).click();await expect(page.getByText('已选 1 份资料',{exact:true})).toBeVisible();
  103 |  await page.getByRole('textbox',{name:'查找资料',exact:true}).fill('教学案例');await page.getByRole('button',{name:'搜索',exact:true}).click();await expect(page.getByRole('button',{name:'上一页',exact:true})).toBeDisabled();await expect(page.getByRole('button',{name:'取消选择',exact:true})).toHaveCount(0);await page.getByRole('button',{name:'清空筛选',exact:true}).click();
  104 |  await page.getByRole('button',{name:'显示列',exact:true}).click();await page.getByRole('menuitemcheckbox',{name:'资料类型',exact:true}).click();await page.keyboard.press('Escape');await expect(page.getByRole('columnheader',{name:'资料类型',exact:true})).toHaveCount(0);await page.getByText('试用加载与空数据状态',{exact:true}).click();await page.getByRole('checkbox',{name:'下次刷新模拟失败',exact:true}).locator('..').click();await page.getByRole('button',{name:'刷新资料',exact:true}).click();await expect(page.getByRole('alert')).toContainText('资料和选择已保留');await page.getByRole('button',{name:'重试',exact:true}).click();await expect(page.getByRole('alert')).toHaveCount(0);
  105 | });
  106 | test("drawer mouse swipe closes, while carousel drag retains its owning drawer",async({page})=>{
  107 |  await open(page,'drawer');await page.getByRole('button',{name:'从底部打开',exact:true}).click();const popup=page.getByRole('dialog',{name:'底部任务概览',exact:true});const handle=popup.locator('[data-slot="drawer-swipe-handle"]');await expect(handle).toBeVisible();await expect(popup).not.toHaveAttribute('data-starting-style','');await popup.evaluate(el=>Promise.all(el.getAnimations().map(animation=>animation.finished.catch(()=>{}))));
  108 |  const box=await handle.boundingBox();if(!box)throw new Error('Missing real swipe handle');await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+box.width/2,Math.min(page.viewportSize()!.height-2,box.y+box.height/2+220),{steps:10});await page.mouse.up();await expect(popup).toHaveCount(0);
  109 |  await open(page,'carousel');await page.getByRole('button',{name:'在抽屉中阅读资料',exact:true}).click();const carouselPopup=page.getByRole('dialog',{name:'课堂资料阅读',exact:true});await expect(carouselPopup).toBeVisible();const viewport=carouselPopup.locator('[data-base-ui-swipe-ignore]');await expect(viewport).toHaveCount(1);const bounds=await viewport.boundingBox();if(!bounds)throw new Error('Missing Embla owned region');await page.mouse.move(bounds.x+bounds.width*.8,bounds.y+bounds.height*.5);await page.mouse.down();await page.mouse.move(bounds.x+bounds.width*.15,bounds.y+bounds.height*.5+3,{steps:12});await page.mouse.up();await expect(carouselPopup).toBeVisible();
  110 | });
  111 | 
```