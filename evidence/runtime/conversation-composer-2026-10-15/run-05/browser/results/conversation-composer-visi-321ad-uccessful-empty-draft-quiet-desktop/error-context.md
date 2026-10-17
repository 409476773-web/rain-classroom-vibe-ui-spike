# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: conversation-composer.spec.ts >> visible source and separated selections keep a successful empty draft quiet
- Location: tests/e2e/conversation-composer.spec.ts:49:1

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 36
Received:    35.66632080078125
```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - link "返回组件目录" [ref=e6] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e8]:
      - heading "ConversationComposer 对话输入" [level=1] [ref=e9]
      - generic [ref=e10]: Pattern / Recipe · 共享候选 · 尚未发布
    - paragraph [ref=e11]: 在同一份草稿中准备文字、资料、引用或回复，再明确发送。
    - generic "预览设置" [ref=e12]:
      - button "浅色" [pressed] [ref=e13] [cursor=pointer]
      - button "深色" [ref=e15] [cursor=pointer]
      - button "紧凑密度" [ref=e17] [cursor=pointer]
  - generic [ref=e19]:
    - generic [ref=e20]:
      - heading "交互体验" [level=2] [ref=e21]
      - paragraph [ref=e22]: 添加资料、切换范围或使用语音；演示控制可重现失败与长草稿。
      - region "恢复与会话示例" [ref=e24]:
        - radiogroup "页面内会话草稿" [ref=e25]:
          - generic [ref=e27]:
            - generic [ref=e28] [cursor=pointer]:
              - radio "会话 A" [checked] [ref=e29]
              - generic [ref=e33]: 会话 A
            - generic [ref=e35] [cursor=pointer]:
              - radio "会话 B" [ref=e36]
              - generic [ref=e39]: 会话 B
        - form "恢复与会话示例" [ref=e41]:
          - generic [ref=e42]:
            - textbox "恢复与会话示例内容" [ref=e43]:
              - /placeholder: 结合课程资料，写下你的问题…
            - generic [ref=e44]:
              - generic [ref=e45]:
                - button "添加资料" [ref=e46] [cursor=pointer]
                - button "选择搜索范围" [ref=e49] [cursor=pointer]:
                  - generic [ref=e51]: 本课程资料
              - generic [ref=e53]:
                - button "开始语音输入" [ref=e54] [cursor=pointer]
                - button "收起输入框" [expanded] [ref=e58] [cursor=pointer]
                - button "发送" [disabled] [ref=e62]
        - group [ref=e65]:
          - generic "演示控制" [ref=e66] [cursor=pointer]
    - generic [ref=e67]:
      - heading "表面与布局" [level=2] [ref=e68]
      - paragraph [ref=e69]: 四个独立草稿均可输入、添加资料与展开。Enter 换行，点击上箭头发送。
      - generic [ref=e71]:
        - generic [ref=e72]:
          - heading "灰底 · 紧凑" [level=4] [ref=e73]
          - region "灰底紧凑示例" [ref=e74]:
            - form "灰底紧凑示例" [ref=e75]:
              - generic [ref=e76]:
                - textbox "灰底紧凑示例内容" [ref=e77]:
                  - /placeholder: 结合课程资料，写下你的问题…
                - generic [ref=e78]:
                  - generic [ref=e79]:
                    - button "添加资料" [ref=e80] [cursor=pointer]
                    - button "选择搜索范围" [ref=e83] [cursor=pointer]:
                      - generic [ref=e85]: 本课程资料
                  - generic [ref=e87]:
                    - button "开始语音输入" [ref=e88] [cursor=pointer]
                    - button "展开输入框" [ref=e92] [cursor=pointer]
                    - button "发送" [disabled] [ref=e96]
              - dialog [ref=e103]:
                - generic [ref=e105]:
                  - heading "引用课程资料" [level=2] [ref=e106]
                  - textbox "搜索课程资料" [active] [ref=e110]
                  - group "课程资料" [ref=e113]:
                    - generic [ref=e115] [cursor=pointer]:
                      - checkbox "课堂观察记录与同伴反馈说明.pdf" [ref=e116]
                      - generic [ref=e119]: 课堂观察记录与同伴反馈说明.pdf
                    - generic [ref=e122] [cursor=pointer]:
                      - checkbox "从课堂证据到学习判断.pdf" [ref=e123]
                      - generic [ref=e126]: 从课堂证据到学习判断.pdf
                    - generic [ref=e129] [cursor=pointer]:
                      - checkbox "课堂提问与反馈案例.pdf" [ref=e130]
                      - generic [ref=e133]: 课堂提问与反馈案例.pdf
                  - generic [ref=e135]:
                    - generic [ref=e136]: 已选 0 项
                    - button "取消" [ref=e137] [cursor=pointer]
                    - button "添加引用" [disabled] [ref=e139]
        - generic [ref=e143]:
          - heading "白底 · 紧凑" [level=4] [ref=e144]
          - region "白底紧凑示例" [ref=e145]:
            - form "白底紧凑示例" [ref=e146]:
              - generic [ref=e147]:
                - textbox "白底紧凑示例内容" [ref=e148]:
                  - /placeholder: 结合课程资料，写下你的问题…
                - generic [ref=e149]:
                  - generic [ref=e150]:
                    - button "添加资料" [ref=e151] [cursor=pointer]
                    - button "选择搜索范围" [ref=e154] [cursor=pointer]:
                      - generic [ref=e156]: 本课程资料
                  - generic [ref=e158]:
                    - button "开始语音输入" [ref=e159] [cursor=pointer]
                    - button "展开输入框" [ref=e163] [cursor=pointer]
                    - button "发送" [disabled] [ref=e167]
        - generic [ref=e170]:
          - heading "灰底 · 展开" [level=4] [ref=e171]
          - region "灰底展开示例" [ref=e172]:
            - form "灰底展开示例" [ref=e173]:
              - generic [ref=e174]:
                - textbox "灰底展开示例内容" [ref=e175]:
                  - /placeholder: 结合课程资料，写下你的问题…
                - generic [ref=e176]:
                  - generic [ref=e177]:
                    - button "添加资料" [ref=e178] [cursor=pointer]
                    - button "选择搜索范围" [ref=e181] [cursor=pointer]:
                      - generic [ref=e183]: 本课程资料
                  - generic [ref=e185]:
                    - button "开始语音输入" [ref=e186] [cursor=pointer]
                    - button "收起输入框" [expanded] [ref=e190] [cursor=pointer]
                    - button "发送" [disabled] [ref=e194]
        - generic [ref=e197]:
          - heading "白底 · 展开" [level=4] [ref=e198]
          - region "白底展开示例" [ref=e199]:
            - form "白底展开示例" [ref=e200]:
              - generic [ref=e201]:
                - textbox "白底展开示例内容" [ref=e202]:
                  - /placeholder: 结合课程资料，写下你的问题…
                - generic [ref=e203]:
                  - generic [ref=e204]:
                    - button "添加资料" [ref=e205] [cursor=pointer]
                    - button "选择搜索范围" [ref=e208] [cursor=pointer]:
                      - generic [ref=e210]: 本课程资料
                  - generic [ref=e212]:
                    - button "开始语音输入" [ref=e213] [cursor=pointer]
                    - button "收起输入框" [expanded] [ref=e217] [cursor=pointer]
                    - button "发送" [disabled] [ref=e221]
    - generic [ref=e224]:
      - heading "接入与验证边界" [level=2] [ref=e225]
      - generic [ref=e226]:
        - paragraph [ref=e227]: 录音使用浏览器真实录音能力；本页上传、转写、课程资料和消息接收均为本地模拟。转写成功后先审阅文字，再发送。尚未处理的保留录音需要重试或明确丢弃。
        - paragraph [ref=e228]:
          - text: 实际课程答疑和课堂讨论见
          - link "会话滚动与场景组合" [ref=e229] [cursor=pointer]:
            - /url: "#message-scroller"
          - text: 。业务接口、权限、消息幂等与持久化由宿主提供；真实设备与服务验证单独记录。
  - region [ref=e230]:
    - heading "使用边界" [level=2] [ref=e231]
    - generic [ref=e232]:
      - generic [ref=e233]:
        - heading "适合用在" [level=3] [ref=e234]
        - list [ref=e235]:
          - listitem [ref=e236]: AI 答疑、聊天和讨论需要共享的输入体验。
          - listitem [ref=e237]: 需要真实文件生命周期、语音输入适配与失败保稿。
      - generic [ref=e238]:
        - heading "避免用在" [level=3] [ref=e239]
        - list [ref=e240]:
          - listitem [ref=e241]: 只需普通表单多行字段。
          - listitem [ref=e242]: 需要内置消息服务、课程权限或跨设备草稿同步。
  - generic [ref=e243]:
    - region [ref=e244]:
      - heading "API 与结构" [level=2] [ref=e245]
      - table [ref=e247]:
        - caption [ref=e248]: ConversationComposer 对话输入 常用接口
        - rowgroup [ref=e249]:
          - row [ref=e250]:
            - columnheader "名称" [ref=e251]
            - columnheader "类型" [ref=e252]
            - columnheader "默认" [ref=e253]
            - columnheader "说明" [ref=e254]
        - rowgroup [ref=e255]:
          - row [ref=e256]:
            - rowheader [ref=e257]:
              - code [ref=e258]: draft / draftRevision
            - cell [ref=e259]:
              - code [ref=e260]: ComposerDraft / number
            - cell "—" [ref=e261]
            - cell "宿主受控内容版本；上传进度不算用户编辑。" [ref=e262]
          - row [ref=e263]:
            - rowheader [ref=e264]:
              - code [ref=e265]: surface / layout
            - cell [ref=e266]:
              - code [ref=e267]: gray | white / compact | expanded
            - cell "—" [ref=e268]
            - cell "两种表面与两种布局独立；切换保留草稿和光标。" [ref=e269]
          - row [ref=e270]:
            - rowheader [ref=e271]:
              - code [ref=e272]: attachments / references / voice
            - cell [ref=e273]:
              - code [ref=e274]: 可选能力组
            - cell "—" [ref=e275]
            - cell "附件状态只有一个所有者；服务由宿主接入。" [ref=e276]
          - row [ref=e277]:
            - rowheader [ref=e278]:
              - code [ref=e279]: submission / generation
            - cell [ref=e280]:
              - code [ref=e281]: 独立受控状态
            - cell "—" [ref=e282]
            - cell "确认前保稿，AI 回答时可准备下一稿。" [ref=e283]
      - paragraph [ref=e284]: Parts / Slots：context、editor、toolbar、primary-action、feedback
    - region [ref=e285]:
      - heading "调用示例" [level=2] [ref=e286]
      - generic [ref=e287]:
        - generic [ref=e288]:
          - button "复制代码" [ref=e289] [cursor=pointer]
          - status
        - code [ref=e292]: "<ConversationComposer conversationId={id} draft={draft} draftRevision={revision} onDraftChange={setDraft} aria-label=\"消息内容\" attachments={attachmentAdapter} references={referenceService} voice={{ transcribe }} submission={submission} onSubmit={submitSnapshot} />"
      - paragraph [ref=e293]:
        - text: 当前源码：
        - code [ref=e294]: packages/ui/src/conversation-composer/index.ts
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { mkdirSync } from 'node:fs';
  3   | import { verifyConversationReading } from './helpers/conversation-scrolling';
  4   | const evidence=process.env.COMPOSER_EVIDENCE_DIR??'evidence/runtime/conversation-composer-2026-10-15/run-01/browser/'+(process.env.COMPOSER_BROWSER_RUN??'final');
  5   | mkdirSync(evidence,{recursive:true});
  6   | test.beforeEach(({page})=>page.on('pageerror',error=>{throw error;}));
  7   | test('full-width writing and fixed toolbar slots survive expansion and voice phases',async({page},info)=>{
  8   |   await page.goto('/#conversation-composer');
  9   |   const form=page.getByRole('form',{name:'灰底紧凑示例',exact:true}),editor=form.getByRole('textbox');
  10  |   await editor.fill('保持这段草稿与光标');
  11  |   const before=await form.boundingBox(),body=await editor.boundingBox(),send=await form.getByRole('button',{name:'发送',exact:true}).boundingBox();
  12  |   expect(body!.width/before!.width).toBeGreaterThan(.85);
  13  |   expect(send!.y).toBeGreaterThanOrEqual(body!.y+body!.height);
  14  |   await form.getByRole('button',{name:'展开输入框',exact:true}).click();
  15  |   const expandedSend=await form.getByRole('button',{name:'发送',exact:true}).boundingBox();
  16  |   expect(Math.abs(send!.x-expandedSend!.x)).toBeLessThan(1);
  17  |   await expect(editor).toBeFocused();
  18  |   await form.getByRole('button',{name:'开始语音输入',exact:true}).click();
  19  |   await expect(form.getByRole('button',{name:'结束录音',exact:true})).toBeVisible();
  20  |   await expect(form.getByRole('timer',{name:'录音时长'})).not.toHaveText('00:00',{timeout:5000});
  21  |   const stop=await form.getByRole('button',{name:'结束录音',exact:true}).boundingBox();
  22  |   expect(Math.abs(stop!.x-expandedSend!.x)).toBeLessThan(1);
  23  |   expect(Math.abs(stop!.y-expandedSend!.y)).toBeLessThan(1);
  24  |   await expect(editor).toHaveValue('保持这段草稿与光标');
  25  |   expect(await form.evaluate(node=>node.scrollWidth-node.clientWidth)).toBeLessThanOrEqual(1);
  26  |   await form.screenshot({path:`${evidence}/stable-voice-toolbar-${info.project.name}.png`});
  27  |   await form.getByRole('button',{name:'取消录音',exact:true}).click();
  28  |   await expect(editor).toBeFocused();await expect(editor).toHaveValue('保持这段草稿与光标');
  29  | });
  30  | test('many failed materials scroll without displacing the writing area or trapping keyboard recovery',async({page},info)=>{
  31  |   await page.goto('/#conversation-composer');
  32  |   const form=page.getByRole('form',{name:'恢复与会话示例',exact:true}),section=page.getByRole('region',{name:'恢复与会话示例',exact:true});
  33  |   await section.getByText('演示控制',{exact:true}).click();
  34  |   await section.getByRole('button',{name:'模拟上传失败：关',exact:true}).click();
  35  |   await form.locator('input[type=file]').setInputFiles(Array.from({length:5},(_,index)=>({name:`课堂记录-${index}.txt`,mimeType:'text/plain',buffer:Buffer.from('供本地恢复检查')})));
  36  |   await expect(form.getByRole('button',{name:'重试',exact:true})).toHaveCount(5);
  37  |   const materials=form.getByRole('group',{name:'本次资料，共 5 项'});
  38  |   expect((await materials.boundingBox())!.height).toBeLessThanOrEqual(192);
  39  |   expect(await materials.evaluate(node=>node.scrollHeight-node.clientHeight)).toBeGreaterThan(0);
  40  |   await materials.focus();await page.keyboard.press('End');
  41  |   await expect.poll(()=>materials.evaluate(node=>node.scrollTop)).toBeGreaterThan(0);
  42  |   await form.getByRole('button',{name:'移除资料 课堂记录-4.txt',exact:true}).focus();
  43  |   await page.keyboard.press('Enter');await expect(form.getByRole('button',{name:'重试',exact:true})).toHaveCount(4);
  44  |   await expect(form.getByRole('textbox')).toBeFocused();
  45  |   await form.getByRole('textbox').fill('附件失败时仍能继续写正文');
  46  |   await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  47  |   await form.screenshot({path:`${evidence}/bounded-materials-${info.project.name}.png`});
  48  | });
  49  | test('visible source and separated selections keep a successful empty draft quiet',async({page},info)=>{
  50  |   await page.goto('/#conversation-composer');
  51  |   const form=page.getByRole('form',{name:'灰底紧凑示例',exact:true});
  52  |   await expect(form.getByRole('button',{name:'选择搜索范围',exact:true}).getByText('本课程资料',{exact:true})).toBeVisible();
  53  |   await form.getByRole('button',{name:'添加资料',exact:true}).click();await page.getByRole('menuitem',{name:'选择课程资料',exact:true}).click();
  54  |   const picker=page.getByRole('dialog',{name:'引用课程资料',exact:true});
  55  |   await expect(picker.locator('.rain-composer-picker-body')).toHaveCSS('display','flex');
  56  |   await expect(picker.locator('.rain-composer-picker-label').first()).toHaveCSS('font-weight','400');
> 57  |   expect((await picker.locator('.rain-composer-picker-search').boundingBox())!.height).toBeGreaterThanOrEqual(36);
      |                                                                                        ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  58  |   await picker.getByRole('checkbox').first().locator('..').click();
  59  |   await picker.getByRole('textbox',{name:'搜索课程资料',exact:true}).fill('无关关键词');
  60  |   await expect(picker.getByRole('group',{name:'搜索结果',exact:true})).toContainText('未找到匹配的资料');
  61  |   await expect(picker.getByRole('group',{name:'搜索结果',exact:true}).getByRole('checkbox')).toHaveCount(0);
  62  |   await expect(picker.getByRole('group',{name:'已选资料',exact:true}).getByRole('checkbox')).toBeChecked();
  63  |   await picker.screenshot({path:`${evidence}/refined-picker-${info.project.name}.png`});
  64  |   await picker.getByRole('button',{name:'添加引用',exact:true}).click();
  65  |   await form.getByRole('button',{name:'选择搜索范围',exact:true}).click();
  66  |   await page.getByRole('radio',{name:'本次引用资料',exact:false}).locator('..').click();
  67  |   await expect(form.getByRole('button',{name:'选择搜索范围',exact:true}).getByText('本次引用资料',{exact:true})).toBeVisible();
  68  |   await form.getByRole('textbox').fill('只分析这份资料');await form.getByRole('button',{name:'发送',exact:true}).click();
  69  |   await expect(form.getByRole('textbox')).toBeEmpty();
  70  |   await expect(form.locator('[data-slot="feedback"]')).toHaveCount(0);
  71  |   await expect(form.getByText('本次引用资料',{exact:true})).toBeVisible();
  72  |   await form.screenshot({path:`${evidence}/quiet-after-send-${info.project.name}.png`});
  73  |   await form.getByRole('textbox').fill('下一问');
  74  |   await expect(form.locator('[data-slot="feedback"]')).toContainText('请添加引用资料或更改范围');
  75  |   await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  76  | });
  77  | 
  78  | test('material summaries keep failed files visible and recovery does not repeat',async({page},info)=>{
  79  |   await page.goto('/#conversation-composer');
  80  |   const form=page.getByRole('form',{name:'恢复与会话示例',exact:true}),section=page.getByRole('region',{name:'恢复与会话示例',exact:true});
  81  |   await form.getByRole('button',{name:'添加资料',exact:true}).click();await page.getByRole('menuitem',{name:'选择课程资料',exact:true}).click();
  82  |   const picker=page.getByRole('dialog',{name:'引用课程资料',exact:true});
  83  |   for(const choice of await picker.getByRole('checkbox').all())await choice.locator('..').click();
  84  |   await picker.getByRole('button',{name:'添加引用',exact:true}).click();
  85  |   await section.getByText('演示控制',{exact:true}).click();await section.getByRole('button',{name:'模拟上传失败：关',exact:true}).click();
  86  |   await form.locator('input[type=file]').setInputFiles({name:'失败记录.txt',mimeType:'text/plain',buffer:Buffer.from('检查资料')});
  87  |   await expect(form.getByRole('button',{name:'重试',exact:true})).toBeVisible();
  88  |   await expect(form.getByRole('button',{name:'查看全部 4 项资料',exact:true})).toBeVisible();
  89  |   await expect(form.locator('.rain-composer__reference').nth(2)).toBeHidden();
  90  |   await expect(form.locator('[data-slot="feedback"]')).toHaveCount(0);
  91  |   await form.getByRole('button',{name:'查看全部 4 项资料',exact:true}).click();await expect(form.locator('.rain-composer__reference').nth(2)).toBeVisible();
  92  |   await form.getByRole('button',{name:'收起资料',exact:true}).click();
  93  |   await expect(form.getByRole('button',{name:'重试',exact:true})).toBeVisible();
  94  |   expect(await form.evaluate(node=>node.scrollWidth-node.clientWidth)).toBeLessThanOrEqual(1);
  95  |   await form.screenshot({path:`${evidence}/refined-material-recovery-${info.project.name}.png`});
  96  | });
  97  | test('four combinations preserve draft, keyboard and responsive surfaces',async({page},info)=>{
  98  |   await page.goto('/#conversation-composer');
  99  |   await expect(page.locator('#conversation-composer-title')).toBeVisible();
  100 |   for(const label of ['灰底紧凑示例','白底紧凑示例','灰底展开示例','白底展开示例']){
  101 |     const form=page.getByRole('form',{name:label,exact:true}),input=form.getByRole('textbox');
  102 |     await input.fill('请结合资料，解释事实与判断的区别。');
  103 |     await input.press('End');await input.press('Enter');await input.pressSequentially('保留换行');
  104 |     await expect(input).toHaveValue('请结合资料，解释事实与判断的区别。\n保留换行');
  105 |     const initial=await form.getAttribute('data-layout');
  106 |     await form.getByRole('button',{name:initial==='compact'?'展开输入框':'收起输入框',exact:true}).click();
  107 |     await expect(input).toBeFocused();await expect(input).toHaveValue('请结合资料，解释事实与判断的区别。\n保留换行');
  108 |     await form.getByRole('button',{name:initial==='compact'?'收起输入框':'展开输入框',exact:true}).click();
  109 |   }
  110 |   const compact=await page.getByRole('form',{name:'白底紧凑示例',exact:true}).boundingBox(), expanded=await page.getByRole('form',{name:'白底展开示例',exact:true}).boundingBox();
  111 |   expect(expanded!.height-compact!.height).toBeGreaterThan(24);
  112 |   await expect(page.getByRole('form',{name:'白底展开示例',exact:true}).getByRole('textbox')).toHaveCSS('box-shadow','none');
  113 |   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  114 |   await page.getByRole('form',{name:'白底展开示例',exact:true}).screenshot({path:`${evidence}/focus-${info.project.name}.png`});
  115 |   await page.locator('#conversation-composer-title').click();
  116 |   await page.locator('.composer-demo-grid').screenshot({path:`${evidence}/surfaces-${info.project.name}-light.png`});
  117 |   await page.getByRole('button',{name:'深色',exact:true}).click();
  118 |   await page.locator('.composer-demo-grid').screenshot({path:`${evidence}/surfaces-${info.project.name}-dark.png`});
  119 |   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  120 |   const minimum=page.getByRole('form',{name:'灰底紧凑示例',exact:true});
  121 |   await minimum.evaluate(node=>{node.style.width='320px';});
  122 |   expect(await minimum.getByRole('textbox').evaluate(node=>node.clientWidth)).toBeGreaterThan(240);
  123 |   expect(await minimum.evaluate(node=>node.scrollWidth-node.clientWidth)).toBeLessThanOrEqual(1);
  124 |   await page.emulateMedia({reducedMotion:'reduce',forcedColors:'active'});
  125 |   await expect(page.getByRole('form',{name:'白底紧凑示例',exact:true})).toBeVisible();
  126 |   const growing=minimum.getByRole('textbox');
  127 |   await growing.fill('长草稿保留全部文字并在内部滚动。\n'.repeat(20));
  128 |   const grown=await growing.boundingBox();
  129 |   expect(grown!.height).toBeLessThanOrEqual(112);
  130 |   expect(await growing.evaluate(node=>node.scrollHeight-node.clientHeight)).toBeGreaterThan(0);
  131 |   await growing.fill('');expect((await growing.boundingBox())!.height).toBeLessThan(grown!.height);
  132 | });
  133 | test('material picker is transactional, source is single choice and overlays keep the composer height',async({page},info)=>{
  134 |   await page.goto('/#conversation-composer');const form=page.getByRole('form',{name:'恢复与会话示例',exact:true});
  135 |   await form.getByRole('textbox').fill('请结合资料分析。');
  136 |   const before=await form.boundingBox();
  137 |   await form.getByRole('button',{name:'添加资料',exact:true}).click();await page.getByRole('menuitem',{name:'选择课程资料',exact:true}).click();
  138 |   const picker=page.getByRole('dialog',{name:'引用课程资料',exact:true});await expect(picker).toBeVisible();
  139 |   expect(Math.abs((await form.boundingBox())!.height-before!.height)).toBeLessThan(1);
  140 |   await picker.screenshot({path:`${evidence}/reference-picker-${info.project.name}.png`});
  141 |   await picker.getByRole('checkbox').first().locator('..').click();await picker.getByRole('button',{name:'取消',exact:true}).click();
  142 |   await expect(form.locator('.rain-composer__reference')).toHaveCount(0);
  143 |   await form.getByRole('button',{name:'添加资料',exact:true}).click();await page.getByRole('menuitem',{name:'选择课程资料',exact:true}).click();
  144 |   await picker.getByRole('checkbox').first().locator('..').click();await picker.getByRole('checkbox').nth(1).locator('..').click();await picker.getByRole('button',{name:'添加引用',exact:true}).click();
  145 |   await expect(form.locator('.rain-composer__reference')).toHaveCount(2);await expect(form.getByRole('textbox')).toBeFocused();
  146 |   await form.getByRole('button',{name:'选择搜索范围',exact:true}).click();await page.getByRole('dialog',{name:'搜索范围',exact:true}).screenshot({path:`${evidence}/source-scope-${info.project.name}.png`});await page.getByRole('radio',{name:'本次引用资料',exact:false}).locator('..').click();
  147 |   while(await form.getByRole('button',{name:/移除引用/}).count())await form.getByRole('button',{name:/移除引用/}).first().click();
  148 |   await expect(form).toContainText('请添加引用资料或更改范围');await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  149 |   await form.screenshot({path:`${evidence}/reference-recovery-${info.project.name}.png`});
  150 | });
  151 | test('files and sending recover locally while drafts remain owned by each conversation',async({page},info)=>{
  152 |   await page.goto('/#conversation-composer');const form=page.getByRole('form',{name:'恢复与会话示例',exact:true}),section=page.getByRole('region',{name:'恢复与会话示例',exact:true});
  153 |   await section.getByText('演示控制',{exact:true}).click();await section.getByRole('button',{name:'模拟上传失败：关',exact:true}).click();
  154 |   await form.locator('input[type=file]').setInputFiles({name:'课堂观察记录.txt',mimeType:'text/plain',buffer:Buffer.from('一段课堂记录')});
  155 |   await expect(form).toContainText('本地模拟上传失败');await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  156 |   await section.getByRole('button',{name:'模拟上传失败：开',exact:true}).click();await form.getByRole('button',{name:'重试',exact:true}).click();await expect(form.getByText('上传失败',{exact:true})).toHaveCount(0);
  157 |   await expect(form.getByRole('button',{name:'发送',exact:true})).toBeEnabled();
```