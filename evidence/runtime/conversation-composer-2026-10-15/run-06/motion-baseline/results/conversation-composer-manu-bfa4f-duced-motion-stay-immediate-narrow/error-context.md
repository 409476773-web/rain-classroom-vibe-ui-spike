# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: conversation-composer.spec.ts >> manual layout changes animate height continuously while typing and reduced motion stay immediate
- Location: tests/e2e/conversation-composer.spec.ts:7:1

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 2
Received:    0
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
                - textbox "灰底紧凑示例内容" [active] [ref=e77]:
                  - /placeholder: 结合课程资料，写下你的问题…
                  - text: 切换时保留正文与光标
                - generic [ref=e78]:
                  - generic [ref=e79]:
                    - button "添加资料" [ref=e80] [cursor=pointer]
                    - button "选择搜索范围" [ref=e83] [cursor=pointer]:
                      - generic [ref=e85]: 本课程资料
                  - generic [ref=e87]:
                    - button "开始语音输入" [ref=e88] [cursor=pointer]
                    - button "收起输入框" [expanded] [ref=e92] [cursor=pointer]
                    - button "发送" [ref=e96] [cursor=pointer]
        - generic [ref=e99]:
          - heading "白底 · 紧凑" [level=4] [ref=e100]
          - region "白底紧凑示例" [ref=e101]:
            - form "白底紧凑示例" [ref=e102]:
              - generic [ref=e103]:
                - textbox "白底紧凑示例内容" [ref=e104]:
                  - /placeholder: 结合课程资料，写下你的问题…
                - generic [ref=e105]:
                  - generic [ref=e106]:
                    - button "添加资料" [ref=e107] [cursor=pointer]
                    - button "选择搜索范围" [ref=e110] [cursor=pointer]:
                      - generic [ref=e112]: 本课程资料
                  - generic [ref=e114]:
                    - button "开始语音输入" [ref=e115] [cursor=pointer]
                    - button "展开输入框" [ref=e119] [cursor=pointer]
                    - button "发送" [disabled] [ref=e123]
        - generic [ref=e126]:
          - heading "灰底 · 展开" [level=4] [ref=e127]
          - region "灰底展开示例" [ref=e128]:
            - form "灰底展开示例" [ref=e129]:
              - generic [ref=e130]:
                - textbox "灰底展开示例内容" [ref=e131]:
                  - /placeholder: 结合课程资料，写下你的问题…
                - generic [ref=e132]:
                  - generic [ref=e133]:
                    - button "添加资料" [ref=e134] [cursor=pointer]
                    - button "选择搜索范围" [ref=e137] [cursor=pointer]:
                      - generic [ref=e139]: 本课程资料
                  - generic [ref=e141]:
                    - button "开始语音输入" [ref=e142] [cursor=pointer]
                    - button "收起输入框" [expanded] [ref=e146] [cursor=pointer]
                    - button "发送" [disabled] [ref=e150]
        - generic [ref=e153]:
          - heading "白底 · 展开" [level=4] [ref=e154]
          - region "白底展开示例" [ref=e155]:
            - form "白底展开示例" [ref=e156]:
              - generic [ref=e157]:
                - textbox "白底展开示例内容" [ref=e158]:
                  - /placeholder: 结合课程资料，写下你的问题…
                - generic [ref=e159]:
                  - generic [ref=e160]:
                    - button "添加资料" [ref=e161] [cursor=pointer]
                    - button "选择搜索范围" [ref=e164] [cursor=pointer]:
                      - generic [ref=e166]: 本课程资料
                  - generic [ref=e168]:
                    - button "开始语音输入" [ref=e169] [cursor=pointer]
                    - button "收起输入框" [expanded] [ref=e173] [cursor=pointer]
                    - button "发送" [disabled] [ref=e177]
    - generic [ref=e180]:
      - heading "接入与验证边界" [level=2] [ref=e181]
      - generic [ref=e182]:
        - paragraph [ref=e183]: 录音使用浏览器真实录音能力；本页上传、转写、课程资料和消息接收均为本地模拟。转写成功后先审阅文字，再发送。尚未处理的保留录音需要重试或明确丢弃。
        - paragraph [ref=e184]:
          - text: 实际课程答疑和课堂讨论见
          - link "会话滚动与场景组合" [ref=e185] [cursor=pointer]:
            - /url: "#message-scroller"
          - text: 。业务接口、权限、消息幂等与持久化由宿主提供；真实设备与服务验证单独记录。
  - region [ref=e186]:
    - heading "使用边界" [level=2] [ref=e187]
    - generic [ref=e188]:
      - generic [ref=e189]:
        - heading "适合用在" [level=3] [ref=e190]
        - list [ref=e191]:
          - listitem [ref=e192]: AI 答疑、聊天和讨论需要共享的输入体验。
          - listitem [ref=e193]: 需要真实文件生命周期、语音输入适配与失败保稿。
      - generic [ref=e194]:
        - heading "避免用在" [level=3] [ref=e195]
        - list [ref=e196]:
          - listitem [ref=e197]: 只需普通表单多行字段。
          - listitem [ref=e198]: 需要内置消息服务、课程权限或跨设备草稿同步。
  - generic [ref=e199]:
    - region [ref=e200]:
      - heading "API 与结构" [level=2] [ref=e201]
      - table [ref=e203]:
        - caption [ref=e204]: ConversationComposer 对话输入 常用接口
        - rowgroup [ref=e205]:
          - row [ref=e206]:
            - columnheader "名称" [ref=e207]
            - columnheader "类型" [ref=e208]
            - columnheader "默认" [ref=e209]
            - columnheader "说明" [ref=e210]
        - rowgroup [ref=e211]:
          - row [ref=e212]:
            - rowheader [ref=e213]:
              - code [ref=e214]: draft / draftRevision
            - cell [ref=e215]:
              - code [ref=e216]: ComposerDraft / number
            - cell "—" [ref=e217]
            - cell "宿主受控内容版本；上传进度不算用户编辑。" [ref=e218]
          - row [ref=e219]:
            - rowheader [ref=e220]:
              - code [ref=e221]: surface / layout
            - cell [ref=e222]:
              - code [ref=e223]: gray | white / compact | expanded
            - cell "—" [ref=e224]
            - cell "两种表面与两种布局独立；切换保留草稿和光标。" [ref=e225]
          - row [ref=e226]:
            - rowheader [ref=e227]:
              - code [ref=e228]: attachments / references / voice
            - cell [ref=e229]:
              - code [ref=e230]: 可选能力组
            - cell "—" [ref=e231]
            - cell "附件状态只有一个所有者；服务由宿主接入。" [ref=e232]
          - row [ref=e233]:
            - rowheader [ref=e234]:
              - code [ref=e235]: submission / generation
            - cell [ref=e236]:
              - code [ref=e237]: 独立受控状态
            - cell "—" [ref=e238]
            - cell "确认前保稿，AI 回答时可准备下一稿。" [ref=e239]
      - paragraph [ref=e240]: Parts / Slots：context、editor、toolbar、primary-action、feedback
    - region [ref=e241]:
      - heading "调用示例" [level=2] [ref=e242]
      - generic [ref=e243]:
        - generic [ref=e244]:
          - button "复制代码" [ref=e245] [cursor=pointer]
          - status
        - code [ref=e248]: "<ConversationComposer conversationId={id} draft={draft} draftRevision={revision} onDraftChange={setDraft} aria-label=\"消息内容\" attachments={attachmentAdapter} references={referenceService} voice={{ transcribe }} submission={submission} onSubmit={submitSnapshot} />"
      - paragraph [ref=e249]:
        - text: 当前源码：
        - code [ref=e250]: packages/ui/src/conversation-composer/index.ts
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { mkdirSync } from 'node:fs';
  3   | import { verifyConversationReading } from './helpers/conversation-scrolling';
  4   | const evidence=process.env.COMPOSER_EVIDENCE_DIR??'evidence/runtime/conversation-composer-2026-10-15/run-01/browser/'+(process.env.COMPOSER_BROWSER_RUN??'final');
  5   | mkdirSync(evidence,{recursive:true});
  6   | test.beforeEach(({page})=>page.on('pageerror',error=>{throw error;}));
  7   | test('manual layout changes animate height continuously while typing and reduced motion stay immediate',async({page},info)=>{
  8   |   await page.goto('/#conversation-composer');
  9   |   const form=page.getByRole('form',{name:'灰底紧凑示例',exact:true}),editor=form.getByRole('textbox');
  10  |   await editor.fill('切换时保留正文与光标');await editor.press('Home');await editor.press('ArrowRight');
  11  |   const collapsed=(await form.boundingBox())!.height;
  12  |   await form.getByRole('button',{name:'展开输入框',exact:true}).click();
  13  |   const opening=await form.evaluate(async node=>{const heights:number[]=[];const started=performance.now();await new Promise<void>(resolve=>{const sample=()=>{heights.push(node.getBoundingClientRect().height);if(performance.now()-started<300)requestAnimationFrame(sample);else resolve();};requestAnimationFrame(sample);});return heights;});
  14  |   const expanded=(await form.boundingBox())!.height;
> 15  |   expect(opening.filter(height=>height>collapsed+1&&height<expanded-1).length).toBeGreaterThanOrEqual(2);
      |                                                                                ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  16  |   expect(opening.every((height,index)=>index===0||height>=opening[index-1]!-1)).toBeTruthy();
  17  |   await expect(editor).toBeFocused();expect(await editor.evaluate(node=>(node as HTMLTextAreaElement).selectionStart)).toBe(1);
  18  |   await form.getByRole('button',{name:'收起输入框',exact:true}).click();
  19  |   const closing=await form.evaluate(async node=>{const heights:number[]=[];const started=performance.now();await new Promise<void>(resolve=>{const sample=()=>{heights.push(node.getBoundingClientRect().height);if(performance.now()-started<300)requestAnimationFrame(sample);else resolve();};requestAnimationFrame(sample);});return heights;});
  20  |   expect(closing.filter(height=>height>collapsed+1&&height<expanded-1).length).toBeGreaterThanOrEqual(2);
  21  |   expect(closing.every((height,index)=>index===0||height<=closing[index-1]!+1)).toBeTruthy();
  22  |   await expect.poll(async()=>Math.abs((await form.boundingBox())!.height-collapsed)).toBeLessThan(1);
  23  |   await page.emulateMedia({reducedMotion:'reduce'});
  24  |   await form.getByRole('button',{name:'展开输入框',exact:true}).click();
  25  |   expect(Math.abs((await form.boundingBox())!.height-expanded)).toBeLessThan(1);
  26  |   await expect(editor).toHaveValue('切换时保留正文与光标');
  27  |   await form.screenshot({path:`${evidence}/smooth-layout-${info.project.name}.png`});
  28  | });
  29  | test('full-width writing and fixed toolbar slots survive expansion and voice phases',async({page},info)=>{
  30  |   await page.goto('/#conversation-composer');
  31  |   const form=page.getByRole('form',{name:'灰底紧凑示例',exact:true}),editor=form.getByRole('textbox');
  32  |   await editor.fill('保持这段草稿与光标');
  33  |   const before=await form.boundingBox(),body=await editor.boundingBox(),send=await form.getByRole('button',{name:'发送',exact:true}).boundingBox();
  34  |   expect(body!.width/before!.width).toBeGreaterThan(.85);
  35  |   expect(send!.y).toBeGreaterThanOrEqual(body!.y+body!.height);
  36  |   await form.getByRole('button',{name:'展开输入框',exact:true}).click();
  37  |   const expandedSend=await form.getByRole('button',{name:'发送',exact:true}).boundingBox();
  38  |   expect(Math.abs(send!.x-expandedSend!.x)).toBeLessThan(1);
  39  |   await expect(editor).toBeFocused();
  40  |   await form.getByRole('button',{name:'开始语音输入',exact:true}).click();
  41  |   await expect(form.getByRole('button',{name:'结束录音',exact:true})).toBeVisible();
  42  |   await expect(form.getByRole('timer',{name:'录音时长'})).not.toHaveText('00:00',{timeout:5000});
  43  |   const stop=await form.getByRole('button',{name:'结束录音',exact:true}).boundingBox();
  44  |   expect(Math.abs(stop!.x-expandedSend!.x)).toBeLessThan(1);
  45  |   expect(Math.abs(stop!.y-expandedSend!.y)).toBeLessThan(1);
  46  |   await expect(editor).toHaveValue('保持这段草稿与光标');
  47  |   expect(await form.evaluate(node=>node.scrollWidth-node.clientWidth)).toBeLessThanOrEqual(1);
  48  |   await form.screenshot({path:`${evidence}/stable-voice-toolbar-${info.project.name}.png`});
  49  |   await form.getByRole('button',{name:'取消录音',exact:true}).click();
  50  |   await expect(editor).toBeFocused();await expect(editor).toHaveValue('保持这段草稿与光标');
  51  | });
  52  | test('many failed materials scroll without displacing the writing area or trapping keyboard recovery',async({page},info)=>{
  53  |   await page.goto('/#conversation-composer');
  54  |   const form=page.getByRole('form',{name:'恢复与会话示例',exact:true}),section=page.getByRole('region',{name:'恢复与会话示例',exact:true});
  55  |   await section.getByText('演示控制',{exact:true}).click();
  56  |   await section.getByRole('button',{name:'模拟上传失败：关',exact:true}).click();
  57  |   await form.locator('input[type=file]').setInputFiles(Array.from({length:5},(_,index)=>({name:`课堂记录-${index}.txt`,mimeType:'text/plain',buffer:Buffer.from('供本地恢复检查')})));
  58  |   await expect(form.getByRole('button',{name:'重试',exact:true})).toHaveCount(5);
  59  |   const materials=form.getByRole('group',{name:'本次资料，共 5 项'});
  60  |   expect((await materials.boundingBox())!.height).toBeLessThanOrEqual(192);
  61  |   expect(await materials.evaluate(node=>node.scrollHeight-node.clientHeight)).toBeGreaterThan(0);
  62  |   await materials.focus();await page.keyboard.press('End');
  63  |   await expect.poll(()=>materials.evaluate(node=>node.scrollTop)).toBeGreaterThan(0);
  64  |   await form.getByRole('button',{name:'移除资料 课堂记录-4.txt',exact:true}).focus();
  65  |   await page.keyboard.press('Enter');await expect(form.getByRole('button',{name:'重试',exact:true})).toHaveCount(4);
  66  |   await expect(form.getByRole('textbox')).toBeFocused();
  67  |   await form.getByRole('textbox').fill('附件失败时仍能继续写正文');
  68  |   await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  69  |   await form.screenshot({path:`${evidence}/bounded-materials-${info.project.name}.png`});
  70  | });
  71  | test('visible source and separated selections keep a successful empty draft quiet',async({page},info)=>{
  72  |   await page.goto('/#conversation-composer');
  73  |   const form=page.getByRole('form',{name:'灰底紧凑示例',exact:true});
  74  |   await expect(form.getByRole('button',{name:'选择搜索范围',exact:true}).getByText('本课程资料',{exact:true})).toBeVisible();
  75  |   await form.getByRole('button',{name:'添加资料',exact:true}).click();await page.getByRole('menuitem',{name:'选择课程资料',exact:true}).click();
  76  |   const picker=page.getByRole('dialog',{name:'引用课程资料',exact:true});
  77  |   await expect(picker.locator('.rain-composer-picker-body')).toHaveCSS('display','flex');
  78  |   await expect(picker.locator('.rain-composer-picker-label').first()).toHaveCSS('font-weight','400');
  79  |   expect((await picker.locator('.rain-composer-picker-search').boundingBox())!.height).toBeGreaterThanOrEqual(36);
  80  |   await picker.getByRole('checkbox').first().locator('..').click();
  81  |   await picker.getByRole('textbox',{name:'搜索课程资料',exact:true}).fill('无关关键词');
  82  |   await expect(picker.getByRole('group',{name:'搜索结果',exact:true})).toContainText('未找到匹配的资料');
  83  |   await expect(picker.getByRole('group',{name:'搜索结果',exact:true}).getByRole('checkbox')).toHaveCount(0);
  84  |   await expect(picker.getByRole('group',{name:'已选资料',exact:true}).getByRole('checkbox')).toBeChecked();
  85  |   await picker.screenshot({path:`${evidence}/refined-picker-${info.project.name}.png`});
  86  |   await picker.getByRole('button',{name:'添加引用',exact:true}).click();
  87  |   await form.getByRole('button',{name:'选择搜索范围',exact:true}).click();
  88  |   await page.getByRole('radio',{name:'本次引用资料',exact:false}).locator('..').click();
  89  |   await expect(form.getByRole('button',{name:'选择搜索范围',exact:true}).getByText('本次引用资料',{exact:true})).toBeVisible();
  90  |   await form.getByRole('textbox').fill('只分析这份资料');await form.getByRole('button',{name:'发送',exact:true}).click();
  91  |   await expect(form.getByRole('textbox')).toBeEmpty();
  92  |   await expect(form.locator('[data-slot="feedback"]')).toHaveCount(0);
  93  |   await expect(form.getByText('本次引用资料',{exact:true})).toBeVisible();
  94  |   await form.screenshot({path:`${evidence}/quiet-after-send-${info.project.name}.png`});
  95  |   await form.getByRole('textbox').fill('下一问');
  96  |   await expect(form.locator('[data-slot="feedback"]')).toContainText('请添加引用资料或更改范围');
  97  |   await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  98  | });
  99  | 
  100 | test('material summaries keep failed files visible and recovery does not repeat',async({page},info)=>{
  101 |   await page.goto('/#conversation-composer');
  102 |   const form=page.getByRole('form',{name:'恢复与会话示例',exact:true}),section=page.getByRole('region',{name:'恢复与会话示例',exact:true});
  103 |   await form.getByRole('button',{name:'添加资料',exact:true}).click();await page.getByRole('menuitem',{name:'选择课程资料',exact:true}).click();
  104 |   const picker=page.getByRole('dialog',{name:'引用课程资料',exact:true});
  105 |   for(const choice of await picker.getByRole('checkbox').all())await choice.locator('..').click();
  106 |   await picker.getByRole('button',{name:'添加引用',exact:true}).click();
  107 |   await section.getByText('演示控制',{exact:true}).click();await section.getByRole('button',{name:'模拟上传失败：关',exact:true}).click();
  108 |   await form.locator('input[type=file]').setInputFiles({name:'失败记录.txt',mimeType:'text/plain',buffer:Buffer.from('检查资料')});
  109 |   await expect(form.getByRole('button',{name:'重试',exact:true})).toBeVisible();
  110 |   await expect(form.getByRole('button',{name:'查看全部 4 项资料',exact:true})).toBeVisible();
  111 |   await expect(form.locator('.rain-composer__reference').nth(2)).toBeHidden();
  112 |   await expect(form.locator('[data-slot="feedback"]')).toHaveCount(0);
  113 |   await form.getByRole('button',{name:'查看全部 4 项资料',exact:true}).click();await expect(form.locator('.rain-composer__reference').nth(2)).toBeVisible();
  114 |   await form.getByRole('button',{name:'收起资料',exact:true}).click();
  115 |   await expect(form.getByRole('button',{name:'重试',exact:true})).toBeVisible();
```