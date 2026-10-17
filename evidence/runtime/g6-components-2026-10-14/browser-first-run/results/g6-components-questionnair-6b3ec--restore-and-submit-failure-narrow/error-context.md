# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g6-components.spec.ts >> questionnaire conditional validation, native summary, restore and submit failure
- Location: tests/e2e/g6-components.spec.ts:66:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('region', { name: '反馈摘要', exact: true })
Expected: 0
Received: 1
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for getByRole('region', { name: '反馈摘要', exact: true })
    14 × locator resolved to 1 element
       - unexpected value "1"

```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - link "返回组件目录" [ref=e6] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e8]:
      - heading "Questionnaire 逐题问答" [level=1] [ref=e9]
      - generic [ref=e10]: UI · 共享候选 · 尚未发布
    - paragraph [ref=e11]: 聚焦一题，允许返回修改；保留原生表单，提交后由宿主呈现结果。
    - generic "预览设置" [ref=e12]:
      - button "浅色" [pressed] [ref=e13] [cursor=pointer]
      - button "深色" [ref=e15] [cursor=pointer]
      - button "紧凑密度" [ref=e17] [cursor=pointer]
  - generic [ref=e19]:
    - generic [ref=e20]:
      - heading "课堂反馈" [level=2] [ref=e21]
      - paragraph [ref=e22]: 三题为主；选择其他目标会增加条件题。支持返回修改、必填校验、可选跳过、草稿恢复和失败重试。
      - generic [ref=e24]:
        - form "课堂反馈" [ref=e25]:
          - progressbar "问答进度" [ref=e26]: 第 4 题，共 4 题
          - group "还有想告诉老师的话吗？" [ref=e27]:
            - paragraph [ref=e29]: 可选；留空或跳过都不会丢失前面的回答。
            - textbox "给老师的补充" [ref=e31]
          - generic [ref=e32]:
            - button "上一题" [ref=e33] [cursor=pointer]
            - button "跳过" [ref=e34] [cursor=pointer]
            - button "提交反馈" [active] [ref=e35] [cursor=pointer]
        - generic [ref=e36]:
          - button "保存本页草稿" [ref=e37] [cursor=pointer]
          - button "恢复草稿" [ref=e39] [cursor=pointer]
          - button "载入示例草稿" [ref=e41] [cursor=pointer]
          - button "重新填写" [ref=e43] [cursor=pointer]
          - button "模拟提交失败：开" [pressed] [ref=e45] [cursor=pointer]
        - status [ref=e47]: 提交失败，回答保留。关闭模拟失败后可重试。
        - region "反馈摘要" [ref=e48]:
          - heading "反馈摘要" [level=3] [ref=e49]
          - generic [ref=e50]:
            - term [ref=e51]: 学习目标
            - definition [ref=e52]: 其他目标：希望理解证据
            - term [ref=e53]: 练习内容
            - definition [ref=e54]: 观察记录
            - term [ref=e55]: 补充
            - definition [ref=e56]: 未填写
          - paragraph [ref=e57]: 摘要由宿主组合；没有上传到服务器。
    - generic [ref=e58]:
      - heading "持久化与消费边界" [level=2] [ref=e59]
      - paragraph [ref=e61]: 本页草稿仅保存在当前组件状态中。实际产品由宿主决定保存位置、恢复策略与隐私边界。题目集合使用稳定 name，提交读取真实 FormData；服务器端需独立校验。
  - region [ref=e62]:
    - heading "使用边界" [level=2] [ref=e63]
    - generic [ref=e64]:
      - generic [ref=e65]:
        - heading "适合用在" [level=3] [ref=e66]
        - list [ref=e67]:
          - listitem [ref=e68]: 短反馈与偏好问答需要单题节奏。
          - listitem [ref=e69]: 需要单选、多选、文本与条件题。
      - generic [ref=e70]:
        - heading "避免用在" [level=3] [ref=e71]
        - list [ref=e72]:
          - listitem [ref=e73]: 问卷编辑器、考试评分或复杂跳转系统。
          - listitem [ref=e74]: 把宿主摘要当作来源新增Summary Part。
  - generic [ref=e75]:
    - region [ref=e76]:
      - heading "API 与结构" [level=2] [ref=e77]
      - table [ref=e79]:
        - caption [ref=e80]: Questionnaire 逐题问答 常用接口
        - rowgroup [ref=e81]:
          - row [ref=e82]:
            - columnheader "名称" [ref=e83]
            - columnheader "类型" [ref=e84]
            - columnheader "默认" [ref=e85]
            - columnheader "说明" [ref=e86]
        - rowgroup [ref=e87]:
          - row [ref=e88]:
            - rowheader [ref=e89]:
              - code [ref=e90]: items / item / onItemChange
            - cell [ref=e91]:
              - code [ref=e92]: QuestionnaireItemDefinition[] / string / callback
            - cell "—" [ref=e93]
            - cell "明确集合支持SSR；宿主可控制当前题。" [ref=e94]
          - row [ref=e95]:
            - rowheader [ref=e96]:
              - code [ref=e97]: name / required / multiple
            - cell [ref=e98]:
              - code [ref=e99]: 原生fieldset语义
            - cell "—" [ref=e100]
            - cell "引擎维护答案；一个真实input对应一个choice。" [ref=e101]
          - row [ref=e102]:
            - rowheader [ref=e103]:
              - code [ref=e104]: shortcuts
            - cell [ref=e105]:
              - code [ref=e106]: letters / numbers
            - cell "—" [ref=e107]
            - cell "保留来源快捷键；输入组合期间不自动提交。" [ref=e108]
      - paragraph [ref=e109]: Parts / Slots：Root、Progress、Item、Title、Description、Choices、Choice、ChoiceDescription、Input、Error、Actions、Previous、Skip、Next、Submit
    - region [ref=e110]:
      - heading "调用示例" [level=2] [ref=e111]
      - generic [ref=e112]:
        - generic [ref=e113]:
          - button "复制代码" [ref=e114] [cursor=pointer]
          - status
        - code [ref=e117]: "const items=[{name:\"goal\",required:true,choices:[{value:\"review\"}]},{name:\"note\"}]; <Questionnaire items={items} onSubmit={e=>{e.preventDefault(); save(new FormData(e.currentTarget));}}> <QuestionnaireProgress /><QuestionnaireItem name=\"goal\" required><QuestionnaireTitle>学习目标</QuestionnaireTitle><QuestionnaireChoice value=\"review\">复习</QuestionnaireChoice><QuestionnaireError /></QuestionnaireItem> <QuestionnaireItem name=\"note\"><QuestionnaireTitle>补充</QuestionnaireTitle><QuestionnaireInput /></QuestionnaireItem> <QuestionnaireActions><QuestionnairePrevious /><QuestionnaireSkip /><QuestionnaireNext /><QuestionnaireSubmit /></QuestionnaireActions> </Questionnaire>"
      - paragraph [ref=e118]:
        - text: 当前源码：
        - code [ref=e119]: packages/ui/src/questionnaire/questionnaire.tsx
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { mkdirSync, writeFileSync } from "node:fs";
  3  | const evidence="evidence/runtime/g6-components-2026-10-14/browser";
  4  | mkdirSync(evidence,{recursive:true});
  5  | const ids=["data-table","aspect-ratio","attachment","direction","drawer","input-otp","carousel","bubble","marker","message","message-scroller","questionnaire"];
  6  | test.beforeEach(({page})=>page.on("pageerror",error=>{throw error;}));
  7  | test("12 routes, themes, density, 390px and source examples",async({page,context},info)=>{
  8  |  await context.grantPermissions(["clipboard-read","clipboard-write"]);const facts=[];
  9  |  for(const id of ids){
  10 |   await page.goto(`/#${id}`); await expect(page.locator(`#${id}-title`)).toBeVisible();
  11 |   await expect(page.getByRole("heading",{name:"API 与结构",exact:true})).toBeVisible();
  12 |   expect(await page.evaluate(()=>document.documentElement.scrollWidth),id).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  13 |   await page.locator(".component-doc__example").first().screenshot({path:`${evidence}/${id}-${info.project.name}-light.png`});
  14 |   await page.getByRole("button",{name:"深色",exact:true}).click();await page.getByRole("button",{name:"紧凑密度",exact:true}).click();
  15 |   await expect(page.locator("main.component-doc")).toHaveAttribute("data-rain-theme","dark");
  16 |   expect(await page.evaluate(()=>document.documentElement.scrollWidth),`${id} dark`).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  17 |   await page.locator(".component-doc__example").first().screenshot({path:`${evidence}/${id}-${info.project.name}-dark-compact.png`});
  18 |   await page.getByRole("button",{name:"复制代码",exact:true}).last().click();await expect(page.getByText("已复制",{exact:true})).toBeVisible();
  19 |   facts.push({id,width:await page.evaluate(()=>document.documentElement.scrollWidth),copied:await page.evaluate(()=>navigator.clipboard.readText())});
  20 |  }
  21 |  writeFileSync(`${evidence}/matrix-${info.project.name}.json`,JSON.stringify(facts,null,2));
  22 | });
  23 | test("media ratio, attachment actions and direction islands",async({page})=>{
  24 |  await page.goto('/#aspect-ratio'); const ratios=await page.locator('.g6-media-grid').first().locator('[data-rain-id="ui-aspect-ratio"]').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return r.width/r.height;}));
  25 |  expect(ratios[0]).toBeCloseTo(16/9,1);expect(ratios[1]).toBeCloseTo(1,1);expect(ratios[2]).toBeCloseTo(4/3,1);
  26 |  await expect(page.locator('.g6-media-image--cover')).toHaveCSS('object-fit','cover');await expect(page.locator('.g6-media-image--contain')).toHaveCSS('object-fit','contain');
  27 |  await page.goto('/#attachment');await page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true}).click();await expect(page.getByRole('dialog')).toBeVisible();await page.getByRole('button',{name:'关闭预览',exact:true}).click();await expect(page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true})).toBeFocused();
  28 |  await page.getByRole('button',{name:'移除 课程导读：从问题到证据.pdf',exact:true}).click();await expect(page.getByRole('dialog')).toHaveCount(0);await expect(page.getByRole('button',{name:'预览 课堂观察记录与同伴反馈说明.docx',exact:true})).toBeFocused();
  29 |  await page.getByRole('button',{name:'上传 课堂观察记录与同伴反馈说明.docx',exact:true}).click();await expect(page.getByTestId('attachment-live-list')).toContainText('正在上传');await expect(page.getByTestId('attachment-live-list')).toContainText('已上传',{timeout:4000});
  30 |  await page.goto('/#direction');await expect(page.locator('.g6-direction-example[dir="rtl"]')).toContainText('Context: rtl');await expect(page.locator('.g6-direction-example[dir="ltr"]')).toContainText('Context: ltr');
  31 | });
  32 | test("task drawer modality, draft protection, menu and nested focus",async({page},info)=>{
  33 |  await page.goto('/#drawer');await page.getByRole('button',{name:'深色',exact:true}).click();await page.getByRole('button',{name:'紧凑密度',exact:true}).click();
  34 |  const trigger=page.getByRole('button',{name:'编辑课前任务',exact:true});await trigger.click();const dialog=page.getByRole('dialog',{name:'编辑课前任务',exact:true});await expect(dialog).toHaveAttribute('data-density','compact');
  35 |  await page.getByRole('button',{name:'展开编辑',exact:true}).click();await dialog.getByRole('textbox',{name:'任务标题',exact:true}).fill('本地课堂任务草稿');await dialog.press('Escape');await expect(page.getByRole('alert')).toContainText('未保存');await page.getByRole('button',{name:'继续编辑',exact:true}).click();
  36 |  await page.getByRole('button',{name:'完成方式：个人记录',exact:true}).click();await page.getByRole('menuitem',{name:'小组讨论',exact:true}).click();await expect(page.getByRole('button',{name:'完成方式：小组讨论',exact:true})).toBeVisible();
  37 |  await page.getByRole('button',{name:'查看学生任务预览',exact:true}).click();await expect(page.getByRole('dialog',{name:'学生任务预览',exact:true})).toContainText('本地课堂任务草稿');await page.getByRole('button',{name:'返回编辑',exact:true}).click();await expect(page.getByRole('button',{name:'查看学生任务预览',exact:true})).toBeFocused();
  38 |  await dialog.screenshot({path:`${evidence}/drawer-task-${info.project.name}.png`});await page.getByRole('button',{name:'取消修改',exact:true}).click();await expect(trigger).toBeFocused();await expect(page.getByTestId('drawer-saved-title')).not.toContainText('本地课堂任务草稿');
  39 |  for(const side of ['底部','顶部','左侧','右侧']){await page.getByRole('button',{name:`从${side}打开`,exact:true}).click();await page.getByRole('button',{name:`关闭${side}抽屉`,exact:true}).click();await expect(page.getByRole('button',{name:`从${side}打开`,exact:true})).toBeFocused();}
  40 |  await page.getByRole('button',{name:'打开非模态记录',exact:true}).click();await page.getByRole('textbox',{name:'随堂记录',exact:true}).fill('可以编辑非模态记录');await page.getByRole('button',{name:'记录一次观察',exact:true}).click();await expect(page.getByTestId('drawer-observation-count')).toContainText('1次');await expect(page.getByRole('dialog',{name:'非模态课堂记录',exact:true})).toBeVisible();await page.getByRole('button',{name:'关闭课堂记录',exact:true}).click();
  41 |  await page.getByRole('button',{name:'打开焦点约束记录',exact:true}).click();await page.getByRole('textbox',{name:'随堂记录',exact:true}).fill('可以编辑焦点约束记录');await page.getByRole('button',{name:'关闭课堂记录',exact:true}).press('Tab');expect(await page.evaluate(()=>!!document.activeElement?.closest('[role="dialog"]'))).toBe(true);await page.getByRole('button',{name:'关闭课堂记录',exact:true}).click();
  42 | });
  43 | test("OTP paste, explicit verification, error preservation and retry",async({page,context})=>{
  44 |  await context.grantPermissions(['clipboard-read','clipboard-write']);await page.goto('/#input-otp');const form=page.getByTestId('otp-verification-form'),input=form.getByRole('textbox',{name:'课堂验证码',exact:true});await expect(form.locator('input')).toHaveCount(1);
  45 |  await page.evaluate(()=>navigator.clipboard.writeText('123456'));await input.focus();await input.press('ControlOrMeta+V');await expect(input).toHaveValue('123456');await expect(page.getByTestId('otp-submitted-code')).toContainText('尚未提交');
  46 |  await form.getByRole('button',{name:'验证并进入课堂',exact:true}).click();await expect(form).toContainText('验证码已过期');await expect(input).toHaveValue('123456');await expect(input).toHaveAttribute('aria-invalid','true');await input.fill('654321');await form.getByRole('button',{name:'验证并进入课堂',exact:true}).click();await expect(form).toContainText('验证通过');
  47 | });
  48 | test("carousel actual API, input key ownership, RTL and vertical",async({page})=>{
  49 |  await page.goto('/#carousel');const first=page.getByRole('region',{name:'课程学习资料',exact:true});await expect(page.getByTestId('carousel-position')).toContainText('第1份 / 共3份');await page.getByRole('textbox',{name:'记录第1份资料笔记',exact:true}).fill('课堂笔记');await page.getByRole('textbox',{name:'记录第1份资料笔记',exact:true}).press('ArrowRight');await expect(page.getByTestId('carousel-position')).toContainText('第1份');
  50 |  await first.getByRole('button',{name:'阅读下一份资料',exact:true}).click();await expect(page.getByTestId('carousel-position')).toContainText('第2份');await page.getByRole('button',{name:'添加一份资料',exact:true}).click();await expect(page.getByTestId('carousel-position')).toContainText('共4份');
  51 |  const rtl=page.getByRole('region',{name:'资料 RTL 示例',exact:true});await expect(rtl).toHaveAttribute('dir','rtl');await rtl.press('ArrowLeft');await expect(rtl.getByRole('button',{name:'上一份',exact:true})).toBeEnabled();
  52 |  const vertical=page.getByRole('region',{name:'纵向课程摘录',exact:true});await vertical.press('ArrowDown');await expect(vertical.getByRole('button',{name:'上一页',exact:true})).toBeEnabled();
  53 | });
  54 | test("conversation reactions, copy, local retry and meaningful marker",async({page,context})=>{
  55 |  await page.goto('/#bubble');const reaction=page.getByRole('button',{name:/有帮助/});await reaction.click();await expect(reaction).toHaveAttribute('aria-pressed','true');await reaction.click();await expect(reaction).toHaveAttribute('aria-pressed','false');
  56 |  await page.goto('/#marker');await page.getByRole('button',{name:'查看说明',exact:true}).click();await expect(page.locator('#g6-marker-details')).toBeVisible();
  57 |  await context.grantPermissions(['clipboard-read','clipboard-write']);await page.goto('/#message');await page.getByRole('button',{name:'复制辅导回答',exact:true}).click();expect(await page.evaluate(()=>navigator.clipboard.readText())).toContain('先写下你直接看到的事实');await page.getByRole('button',{name:'重试发送补充问题',exact:true}).click();await expect(page.getByText('已发送 · 本地模拟',{exact:true})).toBeVisible();
  58 | });
  59 | test("scroller preserves reading on stream/prepend, pauses and commands",async({page})=>{
  60 |  await page.goto('/#message-scroller');const viewport=page.getByRole('region',{name:'课程辅导对话',exact:true}),panel=page.locator('.component-doc__example').first();await viewport.hover();await page.mouse.wheel(0,-800);await expect.poll(()=>viewport.evaluate(n=>n.scrollTop)).toBeLessThan(50);
  61 |  const before=await viewport.evaluate(n=>n.scrollTop);await panel.getByRole('button',{name:'模拟增量回答',exact:true}).click();await expect(panel.locator('[role="log"]')).toHaveAttribute('aria-busy','true');await expect(panel).toContainText('正在生成回答');await page.waitForTimeout(250);expect(await viewport.evaluate(n=>n.scrollTop)).toBeLessThanOrEqual(before+2);
  62 |  await panel.getByRole('button',{name:'暂停',exact:true}).click();await expect(panel).toContainText('已暂停');await panel.getByRole('button',{name:'定位第 4 条',exact:true}).click();expect(await viewport.evaluate(n=>n.scrollTop)).toBeGreaterThan(0);
  63 |  const old=await viewport.locator('[data-message-id="course-3"]').boundingBox();await panel.getByRole('button',{name:'载入更早消息',exact:true}).click();const after=await viewport.locator('[data-message-id="course-3"]').boundingBox();expect(Math.abs((old?.y??0)-(after?.y??0))).toBeLessThan(3);
  64 |  await panel.getByRole('button',{name:'到最新',exact:true}).click();await expect.poll(()=>viewport.evaluate(n=>n.scrollHeight-n.clientHeight-n.scrollTop)).toBeLessThan(3);
  65 | });
  66 | test("questionnaire conditional validation, native summary, restore and submit failure",async({page})=>{
  67 |  await page.goto('/#questionnaire');const form=page.getByRole('form',{name:'课堂反馈',exact:true});await form.getByRole('button',{name:'下一题',exact:true}).click();await expect(form.getByRole('alert')).toBeVisible();await form.getByRole('radio',{name:/其他目标/}).check();await form.getByRole('button',{name:'下一题',exact:true}).click();await form.getByRole('textbox',{name:'具体学习目标',exact:true}).fill('一');await page.getByRole('button',{name:'保存本页草稿',exact:true}).click();await page.getByRole('button',{name:'恢复草稿',exact:true}).click();await form.getByRole('button',{name:'下一题',exact:true}).click();await expect(form.getByRole('progressbar')).toContainText('第 2 题');
> 68 |  await form.getByRole('textbox',{name:'具体学习目标',exact:true}).fill('希望理解证据');await form.getByRole('button',{name:'下一题',exact:true}).click();await form.getByRole('checkbox',{name:/观察记录/}).check();await form.getByRole('button',{name:'上一题',exact:true}).click();await expect(form.getByRole('textbox',{name:'具体学习目标',exact:true})).toHaveValue('希望理解证据');await form.getByRole('button',{name:'下一题',exact:true}).click();await form.getByRole('button',{name:'下一题',exact:true}).click();await form.getByRole('button',{name:'跳过',exact:true}).click();await page.getByRole('button',{name:'模拟提交失败：关',exact:true}).click();await form.getByRole('button',{name:'提交反馈',exact:true}).click();await expect(page.getByRole('region',{name:'反馈摘要',exact:true})).toHaveCount(0);await page.getByRole('button',{name:'模拟提交失败：开',exact:true}).click();await form.getByRole('button',{name:'提交反馈',exact:true}).click();await expect(page.getByRole('region',{name:'反馈摘要',exact:true})).toContainText('希望理解证据');
     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ^ Error: expect(locator).toHaveCount(expected) failed
  69 | });
  70 | test("reduced motion and forced colors keep state readable",async({page})=>{
  71 |  await page.emulateMedia({reducedMotion:'reduce',forcedColors:'active'});await page.goto('/#marker');await expect(page.locator('.rain-marker__content--shimmer')).toHaveCSS('animation-name','none');await expect(page.locator('.rain-marker__content--shimmer')).toBeVisible();await page.goto('/#attachment');await expect(page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true})).toBeVisible();await page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true}).press('Enter');await expect(page.getByRole('dialog')).toBeVisible();
  72 | });
  73 | 
```