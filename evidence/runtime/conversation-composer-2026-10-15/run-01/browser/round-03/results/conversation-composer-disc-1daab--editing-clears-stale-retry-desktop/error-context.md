# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: conversation-composer.spec.ts >> discussion reply survives failure and editing clears stale retry
- Location: tests/e2e/conversation-composer.spec.ts:73:1

# Error details

```
Test timeout of 45000ms exceeded.
```

```
Error: locator.click: Test timeout of 45000ms exceeded.
Call log:
  - waiting for locator('.g6-discussion-shell').getByRole('button', { name: '回复王同学的消息', exact: true })
    - locator resolved to <button type="button" data-slot="root" data-size="compact" data-tone="default" data-variant="text" data-focus="control" data-state="default" aria-label="回复王同学的消息" data-density="default" data-rain-id="ui-button" class="rain-button box-border relative inline-flex flex-none items-center justify-center overflow-visible whitespace-nowrap text-center align-middle appearance-none select-none isolate border-solid border-rain-action-ghost no-underline transition-rain-button duration-rain-button ease-rain-butto…>…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-slot="footer" class="rain-message__footer flex max-w-full min-w-0 items-center g6-discussion-meta g6-discussion-tools">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-slot="footer" class="rain-message__footer flex max-w-full min-w-0 items-center g6-discussion-meta g6-discussion-tools">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    84 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div data-slot="footer" class="rain-message__footer flex max-w-full min-w-0 items-center g6-discussion-meta g6-discussion-tools">…</div> intercepts pointer events
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
      - heading "Message Scroller 会话滚动" [level=1] [ref=e10]
      - generic [ref=e11]: UI · 文档页试改 · 公共组件待评审
    - paragraph [ref=e12]: 在新消息增长和阅读历史之间保持清楚的滚动控制。
    - generic "预览设置" [ref=e13]:
      - button "浅色" [pressed] [ref=e14] [cursor=pointer]
      - button "深色" [ref=e16] [cursor=pointer]
      - button "紧凑密度" [ref=e18] [cursor=pointer]
  - generic [ref=e20]:
    - paragraph [ref=e21]:
      - text: 输入能力与状态见
      - link "ConversationComposer 对话输入" [ref=e22] [cursor=pointer]:
        - /url: "#conversation-composer"
      - text: 。
    - generic [ref=e23]:
      - heading "课程辅导对话" [level=2] [ref=e24]
      - paragraph [ref=e25]: 阅读、查看来源与继续提问连成一条主路径；请求与资料均为本地示例。
      - generic [ref=e27]:
        - region "课程答疑样板" [ref=e28]:
          - generic [ref=e29]:
            - generic [ref=e30]:
              - text: 课堂观察 · 第 04 讲
              - heading "从事实出发，读懂课堂" [level=3] [ref=e31]
            - generic [ref=e32]: 本地示例
          - generic [ref=e33]:
            - region "课程答疑记录" [ref=e34]:
              - button "加载更早记录" [ref=e36] [cursor=pointer]
              - log [ref=e38]:
                - generic [ref=e39]:
                  - generic [ref=e41]:
                    - strong [ref=e43]: 我
                    - generic [ref=e45]:
                      - paragraph [ref=e46]: 课堂观察中，怎样区分事实与解释？能用一个例子说明吗？
                      - generic [ref=e49]:
                        - button "查看完整文件名：课堂观察记录与同伴反馈说明.pdf" [ref=e51] [cursor=pointer]: 课堂观察记录与同伴反馈说明.pdf
                        - generic [ref=e52]: 课程资料 · 仅本页使用
                  - group "课程助教回答" [ref=e53]:
                    - generic [ref=e57]:
                      - generic [ref=e58]:
                        - strong [ref=e59]: 课程助教
                        - generic [ref=e60]: 课程辅导
                      - generic [ref=e62]:
                        - generic [ref=e63]:
                          - heading "先记录看见的，再解释它" [level=4] [ref=e64]
                          - paragraph [ref=e65]: 事实是可以被再次核对的观察记录；解释是你根据这些记录作出的判断。把两者分开写，并不是不允许解释，而是让读者知道：哪些内容已经发生，哪些仍需要证据支持。
                        - generic [ref=e66]:
                          - heading "用三步完成一次课堂观察" [level=4] [ref=e67]
                          - list [ref=e68]:
                            - listitem [ref=e69]: 写清时间、人物与行为。例如：教师提出问题后，三位同学举手，其中两位解释了自己的解题步骤。尽量记录原话与动作，暂时不用“积极”“理解了”等概括。
                            - listitem [ref=e70]: 单列自己的解释。例如：这些同学可能理解了这一方法。使用“可能”“我推测”让判断的性质更清楚，同时写出你的依据。
                            - listitem [ref=e71]: 补一条需要核对的问题。没有举手的同学是否也理解了？可以观察随后的独立练习，或请不同同学说明理由，而不是仅用举手人数得出结论。
                        - generic [ref=e72]:
                          - heading "把判断留给更多证据" [level=4] [ref=e73]
                          - paragraph [ref=e74]: 一次行为可能有不同原因。学生没有发言，可能正在思考，也可能没有听清问题。比较课堂发言、练习过程与课后反馈，才能逐步检验最初的解释。记录时保留不确定性，是让结论更可靠的一部分。
                        - region "事实与解释对照" [ref=e75]:
                          - table [ref=e76]:
                            - rowgroup [ref=e77]:
                              - row [ref=e78]:
                                - columnheader "记录类型" [ref=e79]
                                - columnheader "示例" [ref=e80]
                            - rowgroup [ref=e81]:
                              - row [ref=e82]:
                                - rowheader "事实" [ref=e83]
                                - cell "三位同学举手。" [ref=e84]
                              - row [ref=e85]:
                                - rowheader "解释" [ref=e86]
                                - cell "他们可能理解了。" [ref=e87]
                              - row [ref=e88]:
                                - rowheader "待验证" [ref=e89]
                                - cell "其他同学能否独立完成练习？" [ref=e90]
                      - generic [ref=e91]:
                        - button "参考资料 · 2 份" [ref=e93] [cursor=pointer]
                        - button "复制此回答" [ref=e95] [cursor=pointer]:
                          - generic [ref=e96]: 复制
                        - button "有帮助" [ref=e97] [cursor=pointer]
                        - status
            - button "返回最新" [ref=e101] [cursor=pointer]
          - generic [ref=e102]:
            - form "课程提问" [ref=e103]:
              - textbox "输入课程问题" [ref=e104]:
                - /placeholder: 结合课程内容，写下你的问题…
              - generic [ref=e105]:
                - generic [ref=e106]:
                  - button "添加资料" [ref=e107] [cursor=pointer]
                  - button "选择搜索范围" [ref=e110] [cursor=pointer]:
                    - generic [ref=e112]: 全部课程资料
                - generic [ref=e114]:
                  - button "展开输入框" [ref=e115] [cursor=pointer]
                  - button "开始语音输入" [ref=e118] [cursor=pointer]
                  - button "发送问题" [disabled] [ref=e121]
              - status [ref=e124]: 请先输入内容
            - paragraph [ref=e125]: 本地示例 · 上传、课程资料、转写与回答均为模拟。Enter 换行，点击发送。
        - group [ref=e126]:
          - generic "演示控制" [ref=e127] [cursor=pointer]
    - generic [ref=e128]:
      - heading "课堂讨论" [level=2] [ref=e129]
      - paragraph [ref=e130]: 作者分组、短引用与回复输入保持连续阅读；新内容不打断历史阅读。
      - generic [ref=e132]:
        - region "课堂讨论样板" [ref=e133]:
          - generic [ref=e134]:
            - generic [ref=e135]:
              - text: 课堂观察 · 教学研讨班
              - heading "哪些是事实，哪些是解释？" [level=3] [ref=e136]
            - generic [ref=e137]: 本地示例
          - region "课堂讨论记录" [ref=e139]:
            - button "加载更早讨论" [ref=e141] [cursor=pointer]
            - log [ref=e143]:
              - generic [ref=e144]:
                - generic [ref=e145]: 今天 · 课堂讨论
                - generic [ref=e151]:
                  - generic [ref=e152]:
                    - strong [ref=e153]: 张老师
                    - generic [ref=e154]: 教师
                    - time [ref=e155]: 10:24
                  - paragraph [ref=e158]: 请描述一个你在课堂上观察到的片段。先写事实，再说说你的解释，以及准备怎样验证。
                  - generic [ref=e159]:
                    - button "回复张老师的消息":
                      - generic: 回复
                    - button "赞同张老师的消息":
                      - generic: 赞同
              - generic [ref=e165]:
                - generic [ref=e166]:
                  - strong [ref=e167]: 李同学
                  - time [ref=e168]: 10:26
                - paragraph [ref=e171]: 小组讨论开始后，有三位同学轮流解释各自的解题步骤，另一位同学在做记录。
                - generic [ref=e172]:
                  - button "回复李同学的消息":
                    - generic: 回复
                  - button "赞同李同学的消息":
                    - generic: 赞同
              - generic [ref=e175]:
                - paragraph [ref=e178]: 我最初认为他们已经理解了，但还需要看看每个人能否独立完成下一题。
                - generic [ref=e179]:
                  - button "回复李同学的消息":
                    - generic: 回复
                  - button "赞同李同学的消息":
                    - generic: 赞同
              - generic [ref=e185]:
                - generic [ref=e186]:
                  - strong [ref=e187]: 王同学
                  - time [ref=e188]: 10:28
                - button "李同学 另一位同学在做记录。" [ref=e189] [cursor=pointer]:
                  - strong [ref=e190]: 李同学
                  - generic [ref=e191]: 另一位同学在做记录。
                - paragraph [ref=e194]: 我会把“做了记录”和“已经理解”分开写。记录本身不能证明理解，还需要听听他怎样解释。
                - generic [ref=e195]:
                  - button "回复王同学的消息":
                    - generic: 回复
                  - button "赞同王同学的消息":
                    - generic: 赞同
          - generic [ref=e197]:
            - form "发送课堂讨论" [ref=e198]:
              - textbox "输入讨论内容" [ref=e199]:
                - /placeholder: 写下你的观察与思考…
              - generic [ref=e200]:
                - button "添加资料" [ref=e202] [cursor=pointer]
                - generic [ref=e205]:
                  - button "展开输入框" [ref=e206] [cursor=pointer]
                  - button "开始语音输入" [ref=e209] [cursor=pointer]
                  - button "发送讨论" [disabled] [ref=e212]
              - status [ref=e215]: 请先输入内容
            - status [ref=e216]: 本地示例 · 上传、转写与发送均为模拟。Enter 换行，点击发送。
        - group [ref=e217]:
          - generic "演示控制" [ref=e218] [cursor=pointer]
          - paragraph [ref=e219]: 以下操作只改变本页模拟服务。
          - generic [ref=e220]:
            - button "载入示例" [ref=e221] [cursor=pointer]
            - button "模拟发送失败：开" [active] [pressed] [ref=e223] [cursor=pointer]
            - button "模拟上传失败：关" [ref=e225] [cursor=pointer]
            - button "模拟转写失败：关" [ref=e227] [cursor=pointer]
    - generic [ref=e229]:
      - heading "空会话与定位 API" [level=2] [ref=e230]
      - paragraph [ref=e231]: 载入后以last-anchor打开，系统标记是锚点；四种align与缺失ID均调用真实引擎。autoScroll保留默认关闭。
      - generic [ref=e233]:
        - generic [ref=e234]:
          - button "载入锚点存档" [ref=e235] [cursor=pointer]
          - button "第 3 条：start" [disabled] [ref=e237]
          - button "第 3 条：center" [disabled] [ref=e239]
          - button "第 3 条：end" [disabled] [ref=e241]
          - button "第 3 条：nearest" [disabled] [ref=e243]
          - button "定位不存在的消息" [disabled] [ref=e245]
        - status
        - paragraph [ref=e247]: 可见消息：无 · 当前锚点：无
        - generic [ref=e248]:
          - region "定位 API 会话" [ref=e249]:
            - log [ref=e250]
          - status: 暂无消息，请载入示例存档。
          - button "滚动到开头"
          - button "滚动到最新"
  - region [ref=e251]:
    - heading "使用边界" [level=2] [ref=e252]
    - generic [ref=e253]:
      - generic [ref=e254]:
        - heading "适合用在" [level=3] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]: 消息增长、历史prepend或定位需要稳定阅读位置。
          - listitem [ref=e258]: 使用显式autoScroll开启对话跟随。
      - generic [ref=e259]:
        - heading "避免用在" [level=3] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]: 只有普通文档阅读，无消息生命周期。
          - listitem [ref=e263]: 将本地流演示当作真实模型服务。
  - generic [ref=e264]:
    - region [ref=e265]:
      - heading "API 与结构" [level=2] [ref=e266]
      - table [ref=e268]:
        - caption [ref=e269]: Message Scroller 会话滚动 常用接口
        - rowgroup [ref=e270]:
          - row [ref=e271]:
            - columnheader "名称" [ref=e272]
            - columnheader "类型" [ref=e273]
            - columnheader "默认" [ref=e274]
            - columnheader "说明" [ref=e275]
        - rowgroup [ref=e276]:
          - row [ref=e277]:
            - rowheader [ref=e278]:
              - code [ref=e279]: autoScroll
            - cell [ref=e280]:
              - code [ref=e281]: boolean
            - cell "false" [ref=e282]
            - cell "对话示例显式true；用户上滚后引擎尊重阅读位置。" [ref=e283]
          - row [ref=e284]:
            - rowheader [ref=e285]:
              - code [ref=e286]: messageId / scrollAnchor
            - cell [ref=e287]:
              - code [ref=e288]: string / boolean
            - cell "—" [ref=e289]
            - cell "稳定ID和宿主选定的锚点。" [ref=e290]
          - row [ref=e291]:
            - rowheader [ref=e292]:
              - code [ref=e293]: hooks
            - cell [ref=e294]:
              - code [ref=e295]: commands / scrollable / visibility
            - cell "—" [ref=e296]
            - cell "按ID、首尾导航与当前阅读状态。" [ref=e297]
      - paragraph [ref=e298]: Parts / Slots：Provider、Root、Viewport、Content、Item、Button、3 hooks
    - region [ref=e299]:
      - heading "调用示例" [level=2] [ref=e300]
      - generic [ref=e301]:
        - generic [ref=e302]:
          - button "复制代码" [ref=e303] [cursor=pointer]
          - status
        - code [ref=e306]: "<MessageScrollerProvider autoScroll> <MessageScroller><MessageScrollerViewport><MessageScrollerContent> {messages.map(m=><MessageScrollerItem key={m.id} messageId={m.id} scrollAnchor={m.role===\"student\"}>{m.content}</MessageScrollerItem>)} </MessageScrollerContent></MessageScrollerViewport><MessageScrollerButton /></MessageScroller> </MessageScrollerProvider>"
      - paragraph [ref=e307]:
        - text: 当前源码：
        - code [ref=e308]: packages/ui/src/message-scroller/message-scroller.tsx
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { mkdirSync } from 'node:fs';
  3  | import { verifyConversationReading } from './helpers/conversation-scrolling';
  4  | const evidence='evidence/runtime/conversation-composer-2026-10-15/run-01/browser/'+(process.env.COMPOSER_BROWSER_RUN??'round-02');
  5  | mkdirSync(evidence,{recursive:true});
  6  | test.beforeEach(({page})=>page.on('pageerror',error=>{throw error;}));
  7  | test('four combinations preserve draft, keyboard and responsive surfaces',async({page},info)=>{
  8  |   await page.goto('/#conversation-composer');
  9  |   await expect(page.locator('#conversation-composer-title')).toBeVisible();
  10 |   for(const label of ['灰底紧凑示例','白底紧凑示例','灰底展开示例','白底展开示例']){
  11 |     const form=page.getByRole('form',{name:label,exact:true}),input=form.getByRole('textbox');
  12 |     await input.fill('请结合资料，解释事实与判断的区别。');
  13 |     await input.press('End');await input.press('Enter');await input.pressSequentially('保留换行');
  14 |     await expect(input).toHaveValue('请结合资料，解释事实与判断的区别。\n保留换行');
  15 |     const initial=await form.getAttribute('data-layout');
  16 |     await form.getByRole('button',{name:initial==='compact'?'展开输入框':'收起输入框',exact:true}).click();
  17 |     await expect(input).toBeFocused();await expect(input).toHaveValue('请结合资料，解释事实与判断的区别。\n保留换行');
  18 |     await form.getByRole('button',{name:initial==='compact'?'收起输入框':'展开输入框',exact:true}).click();
  19 |   }
  20 |   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  21 |   await page.locator('.composer-demo-grid').screenshot({path:`${evidence}/surfaces-${info.project.name}-light.png`});
  22 |   await page.getByRole('button',{name:'深色',exact:true}).click();
  23 |   await page.locator('.composer-demo-grid').screenshot({path:`${evidence}/surfaces-${info.project.name}-dark.png`});
  24 |   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  25 |   await page.emulateMedia({reducedMotion:'reduce',forcedColors:'active'});
  26 |   await expect(page.getByRole('form',{name:'白底紧凑示例',exact:true})).toBeVisible();
  27 | });
  28 | test('material picker is transactional, source is single choice and overlays keep the composer height',async({page},info)=>{
  29 |   await page.goto('/#conversation-composer');const form=page.getByRole('form',{name:'恢复与会话示例',exact:true});
  30 |   await form.getByRole('textbox').fill('请结合资料分析。');
  31 |   const before=await form.boundingBox();
  32 |   await form.getByRole('button',{name:'添加资料',exact:true}).click();await page.getByRole('menuitem',{name:'选择课程资料',exact:true}).click();
  33 |   const picker=page.getByRole('dialog',{name:'引用课程资料',exact:true});await expect(picker).toBeVisible();
  34 |   expect(Math.abs((await form.boundingBox())!.height-before!.height)).toBeLessThan(1);
  35 |   await picker.getByRole('checkbox').first().locator('..').click();await picker.getByRole('button',{name:'取消',exact:true}).click();
  36 |   await expect(form.locator('.rain-composer__reference')).toHaveCount(0);
  37 |   await form.getByRole('button',{name:'添加资料',exact:true}).click();await page.getByRole('menuitem',{name:'选择课程资料',exact:true}).click();
  38 |   await picker.getByRole('checkbox').first().locator('..').click();await picker.getByRole('checkbox').nth(1).locator('..').click();await picker.getByRole('button',{name:'添加引用',exact:true}).click();
  39 |   await expect(form.locator('.rain-composer__reference')).toHaveCount(2);await expect(form.getByRole('textbox')).toBeFocused();
  40 |   await form.getByRole('button',{name:'选择搜索范围',exact:true}).click();await page.getByRole('radio',{name:'本次引用资料',exact:false}).locator('..').click();
  41 |   while(await form.getByRole('button',{name:/移除引用/}).count())await form.getByRole('button',{name:/移除引用/}).first().click();
  42 |   await expect(form).toContainText('请添加引用资料或更改范围');await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  43 |   await form.screenshot({path:`${evidence}/reference-recovery-${info.project.name}.png`});
  44 | });
  45 | test('files and sending recover locally while drafts remain owned by each conversation',async({page},info)=>{
  46 |   await page.goto('/#conversation-composer');const form=page.getByRole('form',{name:'恢复与会话示例',exact:true}),section=page.getByRole('region',{name:'恢复与会话示例',exact:true});
  47 |   await section.getByText('演示控制',{exact:true}).click();await section.getByRole('button',{name:'模拟上传失败：关',exact:true}).click();
  48 |   await form.locator('input[type=file]').setInputFiles({name:'课堂观察记录.txt',mimeType:'text/plain',buffer:Buffer.from('一段课堂记录')});
  49 |   await expect(form).toContainText('本地模拟上传失败');await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  50 |   await section.getByRole('button',{name:'模拟上传失败：开',exact:true}).click();await form.getByRole('button',{name:'重试',exact:true}).click();await expect(form.getByText('上传失败',{exact:true})).toHaveCount(0);
  51 |   await expect(form.getByRole('button',{name:'发送',exact:true})).toBeEnabled();
  52 |   await section.getByRole('button',{name:'模拟发送失败：关',exact:true}).click();await form.getByRole('textbox').fill('失败后保留这段话');await form.getByRole('button',{name:'发送',exact:true}).click();
  53 |   await expect(form).toContainText('发送失败，内容已保留');await expect(form.getByRole('textbox')).toHaveValue('失败后保留这段话');
  54 |   await form.getByRole('textbox').fill('修改后再发送');await expect(form.getByRole('button',{name:'重新发送',exact:true})).toHaveCount(0);
  55 |   await section.getByRole('radio',{name:'会话 B',exact:true}).locator('..').click();await expect(form.getByRole('textbox')).toBeEmpty();await form.getByRole('textbox').fill('B 独立草稿');
  56 |   await section.getByRole('radio',{name:'会话 A',exact:true}).locator('..').click();await expect(form.getByRole('textbox')).toHaveValue('修改后再发送');await expect(form).toContainText('课堂观察记录.txt');
  57 |   await form.screenshot({path:`${evidence}/send-recovery-${info.project.name}.png`});
  58 | });
  59 | test('native capture with a synthetic microphone preserves failed audio and inserts reviewed text',async({page},info)=>{
  60 |   await page.goto('/#conversation-composer');const form=page.getByRole('form',{name:'恢复与会话示例',exact:true}),section=page.getByRole('region',{name:'恢复与会话示例',exact:true});
  61 |   await section.getByText('演示控制',{exact:true}).click();await section.getByRole('button',{name:'模拟转写失败：关',exact:true}).click();
  62 |   await form.getByRole('textbox').fill('原有正文');await form.getByRole('button',{name:'开始语音输入',exact:true}).click();
  63 |   await expect(form.getByRole('button',{name:'结束录音',exact:true})).toBeVisible();await expect(form.getByRole('textbox')).toHaveAttribute('readonly','');
  64 |   await page.waitForTimeout(200);await form.getByRole('button',{name:'结束录音',exact:true}).click();
  65 |   await expect(form.getByRole('button',{name:'重试转写',exact:true})).toBeVisible();await expect(form.getByRole('button',{name:'重试转写',exact:true})).toBeFocused();
  66 |   await expect(form.getByRole('textbox')).toHaveValue('原有正文');await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  67 |   await form.getByRole('textbox').fill('修改后的正文');await section.getByRole('button',{name:'模拟转写失败：开',exact:true}).click();await form.getByRole('button',{name:'重试转写',exact:true}).click();
  68 |   await expect(form.getByRole('textbox')).toHaveValue(/修改后的正文.*【模拟转写】/);
  69 |   await expect(section.getByText(/本地接收/)).toHaveCount(0);
  70 |   await form.screenshot({path:`${evidence}/voice-review-${info.project.name}.png`});
  71 | });
  72 | test('course scroll, prepend, manual expansion and stop preserve reading and next draft',async({page})=>{await verifyConversationReading(page);});
  73 | test('discussion reply survives failure and editing clears stale retry',async({page},info)=>{
  74 |   await page.goto('/#message-scroller');const scene=page.locator('.g6-discussion-shell'),example=page.locator('.g6-discussion-example');
  75 |   await example.getByText('演示控制',{exact:true}).click();await example.getByRole('button',{name:'模拟发送失败：关',exact:true}).click();
> 76 |   await scene.getByRole('button',{name:'回复王同学的消息',exact:true}).click();await scene.getByRole('textbox',{name:'输入讨论内容',exact:true}).fill('需要更多证据。');
     |                                                                ^ Error: locator.click: Test timeout of 45000ms exceeded.
  77 |   await scene.getByRole('button',{name:'发送讨论',exact:true}).click();await expect(scene.getByRole('button',{name:'重新发送',exact:true})).toBeVisible();
  78 |   await scene.getByRole('button',{name:'取消回复',exact:true}).click();await expect(scene.getByRole('textbox')).toHaveValue('需要更多证据。');await expect(scene.getByRole('button',{name:'发送讨论',exact:true})).toBeVisible();
  79 |   await scene.screenshot({path:`${evidence}/discussion-${info.project.name}.png`});
  80 | });
  81 | 
```