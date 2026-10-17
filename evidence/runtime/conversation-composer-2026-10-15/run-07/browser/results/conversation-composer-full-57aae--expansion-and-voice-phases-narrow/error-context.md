# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: conversation-composer.spec.ts >> full-width writing and fixed toolbar slots survive expansion and voice phases
- Location: tests/e2e/conversation-composer.spec.ts:81:1

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 1
Received:   480
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
            - textbox "恢复与会话示例内容" [ref=e44]:
              - /placeholder: 结合课程资料，写下你的问题…
            - generic [ref=e45]:
              - generic [ref=e46]:
                - button "添加资料" [ref=e47] [cursor=pointer]
                - button "选择搜索范围" [ref=e50] [cursor=pointer]:
                  - generic [ref=e52]: 本课程资料
              - generic [ref=e54]:
                - button "开始语音输入" [ref=e55] [cursor=pointer]
                - button "收起输入框" [expanded] [ref=e59] [cursor=pointer]
                - button "发送" [disabled] [ref=e63]
        - group [ref=e66]:
          - generic "演示控制" [ref=e67] [cursor=pointer]
    - generic [ref=e68]:
      - heading "表面与布局" [level=2] [ref=e69]
      - paragraph [ref=e70]: 四个独立草稿均可输入、添加资料与展开。Enter 换行，点击上箭头发送。
      - generic [ref=e72]:
        - generic [ref=e73]:
          - heading "灰底 · 紧凑" [level=4] [ref=e74]
          - region "灰底紧凑示例" [ref=e75]:
            - form "灰底紧凑示例" [ref=e76]:
              - generic [ref=e77]:
                - textbox "灰底紧凑示例内容" [ref=e79]:
                  - /placeholder: 结合课程资料，写下你的问题…
                  - text: 保持这段草稿与光标
                - generic [ref=e80]:
                  - generic [ref=e81]:
                    - button "取消录音" [active] [ref=e82] [cursor=pointer]
                    - status [ref=e85]: 录音中
                    - timer "录音时长" [ref=e86]: 00:01
                  - generic [ref=e97]:
                    - button "收起输入框" [expanded] [ref=e99] [cursor=pointer]
                    - button "结束录音" [ref=e103] [cursor=pointer]
        - generic [ref=e106]:
          - heading "白底 · 紧凑" [level=4] [ref=e107]
          - region "白底紧凑示例" [ref=e108]:
            - form "白底紧凑示例" [ref=e109]:
              - generic [ref=e110]:
                - textbox "白底紧凑示例内容" [ref=e112]:
                  - /placeholder: 结合课程资料，写下你的问题…
                - generic [ref=e113]:
                  - generic [ref=e114]:
                    - button "添加资料" [ref=e115] [cursor=pointer]
                    - button "选择搜索范围" [ref=e118] [cursor=pointer]:
                      - generic [ref=e120]: 本课程资料
                  - generic [ref=e122]:
                    - button "开始语音输入" [ref=e123] [cursor=pointer]
                    - button "展开输入框" [ref=e127] [cursor=pointer]
                    - button "发送" [disabled] [ref=e131]
        - generic [ref=e134]:
          - heading "灰底 · 展开" [level=4] [ref=e135]
          - region "灰底展开示例" [ref=e136]:
            - form "灰底展开示例" [ref=e137]:
              - generic [ref=e138]:
                - textbox "灰底展开示例内容" [ref=e140]:
                  - /placeholder: 结合课程资料，写下你的问题…
                - generic [ref=e141]:
                  - generic [ref=e142]:
                    - button "添加资料" [ref=e143] [cursor=pointer]
                    - button "选择搜索范围" [ref=e146] [cursor=pointer]:
                      - generic [ref=e148]: 本课程资料
                  - generic [ref=e150]:
                    - button "开始语音输入" [ref=e151] [cursor=pointer]
                    - button "收起输入框" [expanded] [ref=e155] [cursor=pointer]
                    - button "发送" [disabled] [ref=e159]
        - generic [ref=e162]:
          - heading "白底 · 展开" [level=4] [ref=e163]
          - region "白底展开示例" [ref=e164]:
            - form "白底展开示例" [ref=e165]:
              - generic [ref=e166]:
                - textbox "白底展开示例内容" [ref=e168]:
                  - /placeholder: 结合课程资料，写下你的问题…
                - generic [ref=e169]:
                  - generic [ref=e170]:
                    - button "添加资料" [ref=e171] [cursor=pointer]
                    - button "选择搜索范围" [ref=e174] [cursor=pointer]:
                      - generic [ref=e176]: 本课程资料
                  - generic [ref=e178]:
                    - button "开始语音输入" [ref=e179] [cursor=pointer]
                    - button "收起输入框" [expanded] [ref=e183] [cursor=pointer]
                    - button "发送" [disabled] [ref=e187]
    - generic [ref=e190]:
      - heading "接入与验证边界" [level=2] [ref=e191]
      - generic [ref=e192]:
        - paragraph [ref=e193]: 录音使用浏览器真实录音能力；本页上传、转写、课程资料和消息接收均为本地模拟。转写成功后先审阅文字，再发送。尚未处理的保留录音需要重试或明确丢弃。
        - paragraph [ref=e194]:
          - text: 实际课程答疑和课堂讨论见
          - link "会话滚动与场景组合" [ref=e195] [cursor=pointer]:
            - /url: "#message-scroller"
          - text: 。业务接口、权限、消息幂等与持久化由宿主提供；真实设备与服务验证单独记录。
  - region [ref=e196]:
    - heading "使用边界" [level=2] [ref=e197]
    - generic [ref=e198]:
      - generic [ref=e199]:
        - heading "适合用在" [level=3] [ref=e200]
        - list [ref=e201]:
          - listitem [ref=e202]: AI 答疑、聊天和讨论需要共享的输入体验。
          - listitem [ref=e203]: 需要真实文件生命周期、语音输入适配与失败保稿。
      - generic [ref=e204]:
        - heading "避免用在" [level=3] [ref=e205]
        - list [ref=e206]:
          - listitem [ref=e207]: 只需普通表单多行字段。
          - listitem [ref=e208]: 需要内置消息服务、课程权限或跨设备草稿同步。
  - generic [ref=e209]:
    - region [ref=e210]:
      - heading "API 与结构" [level=2] [ref=e211]
      - table [ref=e213]:
        - caption [ref=e214]: ConversationComposer 对话输入 常用接口
        - rowgroup [ref=e215]:
          - row [ref=e216]:
            - columnheader "名称" [ref=e217]
            - columnheader "类型" [ref=e218]
            - columnheader "默认" [ref=e219]
            - columnheader "说明" [ref=e220]
        - rowgroup [ref=e221]:
          - row [ref=e222]:
            - rowheader [ref=e223]:
              - code [ref=e224]: draft / draftRevision
            - cell [ref=e225]:
              - code [ref=e226]: ComposerDraft / number
            - cell "—" [ref=e227]
            - cell "宿主受控内容版本；上传进度不算用户编辑。" [ref=e228]
          - row [ref=e229]:
            - rowheader [ref=e230]:
              - code [ref=e231]: surface / layout
            - cell [ref=e232]:
              - code [ref=e233]: gray | white / compact | expanded
            - cell "—" [ref=e234]
            - cell "两种表面与两种布局独立；切换保留草稿和光标。" [ref=e235]
          - row [ref=e236]:
            - rowheader [ref=e237]:
              - code [ref=e238]: attachments / references / voice
            - cell [ref=e239]:
              - code [ref=e240]: 可选能力组
            - cell "—" [ref=e241]
            - cell "附件状态只有一个所有者；服务由宿主接入。" [ref=e242]
          - row [ref=e243]:
            - rowheader [ref=e244]:
              - code [ref=e245]: submission / generation
            - cell [ref=e246]:
              - code [ref=e247]: 独立受控状态
            - cell "—" [ref=e248]
            - cell "确认前保稿，AI 回答时可准备下一稿。" [ref=e249]
      - paragraph [ref=e250]: Parts / Slots：context、editor、toolbar、primary-action、feedback
    - region [ref=e251]:
      - heading "调用示例" [level=2] [ref=e252]
      - generic [ref=e253]:
        - generic [ref=e254]:
          - button "复制代码" [ref=e255] [cursor=pointer]
          - status
        - code [ref=e258]: "<ConversationComposer conversationId={id} draft={draft} draftRevision={revision} onDraftChange={setDraft} aria-label=\"消息内容\" attachments={attachmentAdapter} references={referenceService} voice={{ transcribe }} submission={submission} onSubmit={submitSnapshot} />"
      - paragraph [ref=e259]:
        - text: 当前源码：
        - code [ref=e260]: packages/ui/src/conversation-composer/index.ts
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
  15  |   expect(opening.filter(height=>height>collapsed+1&&height<expanded-1).length).toBeGreaterThanOrEqual(2);
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
  29  | test('layout motion can reverse and immediate editing preserves long draft position',async({page})=>{
  30  |   await page.goto('/#conversation-composer');
  31  |   const form=page.getByRole('form',{name:'灰底紧凑示例',exact:true}),editor=form.getByRole('textbox'),shell=form.locator('.rain-composer__editor-shell');
  32  |   await editor.fill('随时继续输入');const collapsed=(await form.boundingBox())!.height;
  33  |   await form.getByRole('button',{name:'展开输入框',exact:true}).click();
  34  |   const middle=(await form.boundingBox())!.height;
  35  |   await form.getByRole('button',{name:'收起输入框',exact:true}).click({force:true});
  36  |   await expect.poll(async()=>Math.abs((await form.boundingBox())!.height-collapsed)).toBeLessThan(1);
  37  |   expect(middle).toBeGreaterThan(collapsed);
  38  |   await form.getByRole('button',{name:'展开输入框',exact:true}).click();
  39  |   await editor.press('End');await editor.press('x');
  40  |   await expect(editor).toHaveValue('随时继续输入x');await expect(shell).toHaveAttribute('data-resizing','false');
  41  |   expect(Math.abs((await shell.boundingBox())!.height-(await editor.boundingBox())!.height)).toBeLessThan(1);
  42  |   await editor.fill('长草稿的阅读位置与光标必须保持。\n'.repeat(30));await editor.press('ControlOrMeta+End');
  43  |   const cursor=await editor.evaluate(node=>(node as HTMLTextAreaElement).selectionEnd);
  44  |   expect(await editor.evaluate(node=>node.scrollTop)).toBeGreaterThan(0);
  45  |   await form.getByRole('button',{name:'收起输入框',exact:true}).click();
  46  |   await expect(shell).toHaveAttribute('data-resizing','false');
  47  |   expect(await editor.evaluate(node=>node.scrollTop)).toBeGreaterThan(0);
  48  |   expect(await editor.evaluate(node=>(node as HTMLTextAreaElement).selectionEnd)).toBe(cursor);
  49  |   expect(await editor.evaluate(node=>node.scrollHeight-node.clientHeight-node.scrollTop)).toBeLessThanOrEqual(1);
  50  |   await expect(editor).toBeFocused();
  51  |   await form.getByRole('button',{name:'展开输入框',exact:true}).click();
  52  |   await expect(shell).toHaveAttribute('data-resizing','false');
  53  |   await editor.fill('正文中段光标\n'.repeat(30));await editor.press('ControlOrMeta+Home');
  54  |   for(let line=0;line<15;line++)await editor.press('ArrowDown');
  55  |   const middleCursor=await editor.evaluate(node=>(node as HTMLTextAreaElement).selectionEnd);
  56  |   const pagePosition=await page.evaluate(()=>window.scrollY);
  57  |   await form.getByRole('button',{name:'收起输入框',exact:true}).click();
  58  |   await expect(shell).toHaveAttribute('data-resizing','false');
  59  |   expect(await editor.evaluate(node=>{const input=node as HTMLTextAreaElement;return input.value.slice(0,input.selectionEnd).split('\n').length*parseFloat(getComputedStyle(input).lineHeight)-input.scrollTop-input.clientHeight;})).toBeLessThanOrEqual(1);
  60  |   expect(await editor.evaluate(node=>(node as HTMLTextAreaElement).selectionEnd)).toBe(middleCursor);
  61  |   expect(Math.abs(await page.evaluate(()=>window.scrollY)-pagePosition)).toBeLessThanOrEqual(1);
  62  | });
  63  | test('narrow recovery cards leave room for names and retry returns focus before the action disappears',async({page},info)=>{
  64  |   await page.goto('/#conversation-composer');
  65  |   const form=page.getByRole('form',{name:'恢复与会话示例',exact:true}),section=page.getByRole('region',{name:'恢复与会话示例',exact:true});
  66  |   await form.evaluate(node=>{node.style.width='320px';});
  67  |   await section.getByText('演示控制',{exact:true}).click();await section.getByRole('button',{name:'模拟上传失败：关',exact:true}).click();
  68  |   await form.locator('input[type=file]').setInputFiles({name:'课堂观察与课后反馈整理记录-第一小组.txt',mimeType:'text/plain',buffer:Buffer.from('local test')});
  69  |   const card=form.locator('.rain-composer__material'),content=card.locator('.rain-attachment__content'),actions=card.locator('.rain-attachment__actions');
  70  |   await expect(form.getByRole('button',{name:'重试',exact:true})).toBeVisible();
  71  |   const copy=await content.boundingBox(),controls=await actions.boundingBox();
  72  |   expect(copy!.width).toBeGreaterThan(220);expect(controls!.y).toBeGreaterThanOrEqual(copy!.y+copy!.height);
  73  |   expect(await form.evaluate(node=>node.scrollWidth-node.clientWidth)).toBeLessThanOrEqual(1);
  74  |   await form.screenshot({path:`${evidence}/narrow-recovery-actions-${info.project.name}.png`});
  75  |   await section.getByRole('button',{name:'模拟上传失败：开',exact:true}).click();
  76  |   await form.getByRole('button',{name:'重试',exact:true}).press('Enter');
  77  |   await expect(form.getByRole('textbox')).toBeFocused();
  78  |   await expect(form.getByRole('button',{name:'发送',exact:true})).toBeEnabled();
  79  |   await expect(form.getByRole('textbox')).toBeFocused();
  80  | });
  81  | test('full-width writing and fixed toolbar slots survive expansion and voice phases',async({page},info)=>{
  82  |   await page.goto('/#conversation-composer');
  83  |   const form=page.getByRole('form',{name:'灰底紧凑示例',exact:true}),editor=form.getByRole('textbox');
  84  |   await editor.fill('保持这段草稿与光标');
  85  |   const before=await form.boundingBox(),body=await editor.boundingBox(),send=await form.getByRole('button',{name:'发送',exact:true}).boundingBox();
  86  |   expect(body!.width/before!.width).toBeGreaterThan(.85);
  87  |   expect(send!.y).toBeGreaterThanOrEqual(body!.y+body!.height);
  88  |   await form.getByRole('button',{name:'展开输入框',exact:true}).click();
  89  |   await expect(form.locator('.rain-composer__editor-shell')).toHaveAttribute('data-resizing','false');
  90  |   const expandedSend=await form.getByRole('button',{name:'发送',exact:true}).boundingBox();
  91  |   expect(Math.abs(send!.x-expandedSend!.x)).toBeLessThan(1);
  92  |   await expect(editor).toBeFocused();
  93  |   await form.getByRole('button',{name:'开始语音输入',exact:true}).click();
  94  |   await expect(form.getByRole('button',{name:'结束录音',exact:true})).toBeVisible();
  95  |   await expect(form.getByRole('timer',{name:'录音时长'})).not.toHaveText('00:00',{timeout:5000});
  96  |   const stop=await form.getByRole('button',{name:'结束录音',exact:true}).boundingBox();
  97  |   expect(Math.abs(stop!.x-expandedSend!.x)).toBeLessThan(1);
> 98  |   expect(Math.abs(stop!.y-expandedSend!.y)).toBeLessThan(1);
      |                                             ^ Error: expect(received).toBeLessThan(expected)
  99  |   await expect(editor).toHaveValue('保持这段草稿与光标');
  100 |   expect(await form.evaluate(node=>node.scrollWidth-node.clientWidth)).toBeLessThanOrEqual(1);
  101 |   await form.screenshot({path:`${evidence}/stable-voice-toolbar-${info.project.name}.png`});
  102 |   await form.getByRole('button',{name:'取消录音',exact:true}).click();
  103 |   await expect(editor).toBeFocused();await expect(editor).toHaveValue('保持这段草稿与光标');
  104 | });
  105 | test('many failed materials scroll without displacing the writing area or trapping keyboard recovery',async({page},info)=>{
  106 |   await page.goto('/#conversation-composer');
  107 |   const form=page.getByRole('form',{name:'恢复与会话示例',exact:true}),section=page.getByRole('region',{name:'恢复与会话示例',exact:true});
  108 |   await section.getByText('演示控制',{exact:true}).click();
  109 |   await section.getByRole('button',{name:'模拟上传失败：关',exact:true}).click();
  110 |   await form.locator('input[type=file]').setInputFiles(Array.from({length:5},(_,index)=>({name:`课堂记录-${index}.txt`,mimeType:'text/plain',buffer:Buffer.from('供本地恢复检查')})));
  111 |   await expect(form.getByRole('button',{name:'重试',exact:true})).toHaveCount(5);
  112 |   const materials=form.getByRole('group',{name:'本次资料，共 5 项'});
  113 |   expect((await materials.boundingBox())!.height).toBeLessThanOrEqual(192);
  114 |   expect(await materials.evaluate(node=>node.scrollHeight-node.clientHeight)).toBeGreaterThan(0);
  115 |   await materials.focus();await page.keyboard.press('End');
  116 |   await expect.poll(()=>materials.evaluate(node=>node.scrollTop)).toBeGreaterThan(0);
  117 |   await form.getByRole('button',{name:'移除资料 课堂记录-4.txt',exact:true}).focus();
  118 |   await page.keyboard.press('Enter');await expect(form.getByRole('button',{name:'重试',exact:true})).toHaveCount(4);
  119 |   await expect(form.getByRole('textbox')).toBeFocused();
  120 |   await form.getByRole('textbox').fill('附件失败时仍能继续写正文');
  121 |   await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  122 |   await form.screenshot({path:`${evidence}/bounded-materials-${info.project.name}.png`});
  123 | });
  124 | test('visible source and separated selections keep a successful empty draft quiet',async({page},info)=>{
  125 |   await page.goto('/#conversation-composer');
  126 |   const form=page.getByRole('form',{name:'灰底紧凑示例',exact:true});
  127 |   await expect(form.getByRole('button',{name:'选择搜索范围',exact:true}).getByText('本课程资料',{exact:true})).toBeVisible();
  128 |   await form.getByRole('button',{name:'添加资料',exact:true}).click();await page.getByRole('menuitem',{name:'选择课程资料',exact:true}).click();
  129 |   const picker=page.getByRole('dialog',{name:'引用课程资料',exact:true});
  130 |   await expect(picker.locator('.rain-composer-picker-body')).toHaveCSS('display','flex');
  131 |   await expect(picker.locator('.rain-composer-picker-label').first()).toHaveCSS('font-weight','400');
  132 |   expect((await picker.locator('.rain-composer-picker-search').boundingBox())!.height).toBeGreaterThanOrEqual(36);
  133 |   await picker.getByRole('checkbox').first().locator('..').click();
  134 |   await picker.getByRole('textbox',{name:'搜索课程资料',exact:true}).fill('无关关键词');
  135 |   await expect(picker.getByRole('group',{name:'搜索结果',exact:true})).toContainText('未找到匹配的资料');
  136 |   await expect(picker.getByRole('group',{name:'搜索结果',exact:true}).getByRole('checkbox')).toHaveCount(0);
  137 |   await expect(picker.getByRole('group',{name:'已选资料',exact:true}).getByRole('checkbox')).toBeChecked();
  138 |   await picker.screenshot({path:`${evidence}/refined-picker-${info.project.name}.png`});
  139 |   await picker.getByRole('button',{name:'添加引用',exact:true}).click();
  140 |   await form.getByRole('button',{name:'选择搜索范围',exact:true}).click();
  141 |   await page.getByRole('radio',{name:'本次引用资料',exact:false}).locator('..').click();
  142 |   await expect(form.getByRole('button',{name:'选择搜索范围',exact:true}).getByText('本次引用资料',{exact:true})).toBeVisible();
  143 |   await form.getByRole('textbox').fill('只分析这份资料');await form.getByRole('button',{name:'发送',exact:true}).click();
  144 |   await expect(form.getByRole('textbox')).toBeEmpty();
  145 |   await expect(form.locator('[data-slot="feedback"]')).toHaveCount(0);
  146 |   await expect(form.getByText('本次引用资料',{exact:true})).toBeVisible();
  147 |   await form.screenshot({path:`${evidence}/quiet-after-send-${info.project.name}.png`});
  148 |   await form.getByRole('textbox').fill('下一问');
  149 |   await expect(form.locator('[data-slot="feedback"]')).toContainText('请添加引用资料或更改范围');
  150 |   await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  151 | });
  152 | 
  153 | test('material summaries keep failed files visible and recovery does not repeat',async({page},info)=>{
  154 |   await page.goto('/#conversation-composer');
  155 |   const form=page.getByRole('form',{name:'恢复与会话示例',exact:true}),section=page.getByRole('region',{name:'恢复与会话示例',exact:true});
  156 |   await form.getByRole('button',{name:'添加资料',exact:true}).click();await page.getByRole('menuitem',{name:'选择课程资料',exact:true}).click();
  157 |   const picker=page.getByRole('dialog',{name:'引用课程资料',exact:true});
  158 |   for(const choice of await picker.getByRole('checkbox').all())await choice.locator('..').click();
  159 |   await picker.getByRole('button',{name:'添加引用',exact:true}).click();
  160 |   await section.getByText('演示控制',{exact:true}).click();await section.getByRole('button',{name:'模拟上传失败：关',exact:true}).click();
  161 |   await form.locator('input[type=file]').setInputFiles({name:'失败记录.txt',mimeType:'text/plain',buffer:Buffer.from('检查资料')});
  162 |   await expect(form.getByRole('button',{name:'重试',exact:true})).toBeVisible();
  163 |   await expect(form.getByRole('button',{name:'查看全部 4 项资料',exact:true})).toBeVisible();
  164 |   await expect(form.locator('.rain-composer__reference').nth(2)).toBeHidden();
  165 |   await expect(form.locator('[data-slot="feedback"]')).toHaveCount(0);
  166 |   await form.getByRole('button',{name:'查看全部 4 项资料',exact:true}).click();await expect(form.locator('.rain-composer__reference').nth(2)).toBeVisible();
  167 |   await form.getByRole('button',{name:'收起资料',exact:true}).click();
  168 |   await expect(form.getByRole('button',{name:'重试',exact:true})).toBeVisible();
  169 |   expect(await form.evaluate(node=>node.scrollWidth-node.clientWidth)).toBeLessThanOrEqual(1);
  170 |   await form.screenshot({path:`${evidence}/refined-material-recovery-${info.project.name}.png`});
  171 | });
  172 | test('four combinations preserve draft, keyboard and responsive surfaces',async({page},info)=>{
  173 |   await page.goto('/#conversation-composer');
  174 |   await expect(page.locator('#conversation-composer-title')).toBeVisible();
  175 |   for(const label of ['灰底紧凑示例','白底紧凑示例','灰底展开示例','白底展开示例']){
  176 |     const form=page.getByRole('form',{name:label,exact:true}),input=form.getByRole('textbox');
  177 |     await input.fill('请结合资料，解释事实与判断的区别。');
  178 |     await input.press('End');await input.press('Enter');await input.pressSequentially('保留换行');
  179 |     await expect(input).toHaveValue('请结合资料，解释事实与判断的区别。\n保留换行');
  180 |     const initial=await form.getAttribute('data-layout');
  181 |     await form.getByRole('button',{name:initial==='compact'?'展开输入框':'收起输入框',exact:true}).click();
  182 |     await expect(input).toBeFocused();await expect(input).toHaveValue('请结合资料，解释事实与判断的区别。\n保留换行');
  183 |     await form.getByRole('button',{name:initial==='compact'?'收起输入框':'展开输入框',exact:true}).click();
  184 |     await expect(form.locator('.rain-composer__editor-shell')).toHaveAttribute('data-resizing','false');
  185 |   }
  186 |   const compact=await page.getByRole('form',{name:'白底紧凑示例',exact:true}).boundingBox(), expanded=await page.getByRole('form',{name:'白底展开示例',exact:true}).boundingBox();
  187 |   expect(expanded!.height-compact!.height).toBeGreaterThan(24);
  188 |   await expect(page.getByRole('form',{name:'白底展开示例',exact:true}).getByRole('textbox')).toHaveCSS('box-shadow','none');
  189 |   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  190 |   await page.getByRole('form',{name:'白底展开示例',exact:true}).screenshot({path:`${evidence}/focus-${info.project.name}.png`});
  191 |   await page.locator('#conversation-composer-title').click();
  192 |   await page.locator('.composer-demo-grid').screenshot({path:`${evidence}/surfaces-${info.project.name}-light.png`});
  193 |   await page.getByRole('button',{name:'深色',exact:true}).click();
  194 |   await page.locator('.composer-demo-grid').screenshot({path:`${evidence}/surfaces-${info.project.name}-dark.png`});
  195 |   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  196 |   const minimum=page.getByRole('form',{name:'灰底紧凑示例',exact:true});
  197 |   await minimum.evaluate(node=>{node.style.width='320px';});
  198 |   expect(await minimum.getByRole('textbox').evaluate(node=>node.clientWidth)).toBeGreaterThan(240);
```