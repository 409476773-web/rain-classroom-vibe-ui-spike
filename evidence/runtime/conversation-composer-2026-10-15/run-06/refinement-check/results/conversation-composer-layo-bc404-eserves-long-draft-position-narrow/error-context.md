# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: conversation-composer.spec.ts >> layout motion can reverse and immediate editing preserves long draft position
- Location: tests/e2e/conversation-composer.spec.ts:29:1

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 1
Received:   40.296875
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
                - textbox "灰底紧凑示例内容" [active] [ref=e79]:
                  - /placeholder: 结合课程资料，写下你的问题…
                  - text: 随时继续输入x
                - generic [ref=e80]:
                  - generic [ref=e81]:
                    - button "添加资料" [ref=e82] [cursor=pointer]
                    - button "选择搜索范围" [ref=e85] [cursor=pointer]:
                      - generic [ref=e87]: 本课程资料
                  - generic [ref=e89]:
                    - button "开始语音输入" [ref=e90] [cursor=pointer]
                    - button "收起输入框" [expanded] [ref=e94] [cursor=pointer]
                    - button "发送" [ref=e98] [cursor=pointer]
        - generic [ref=e101]:
          - heading "白底 · 紧凑" [level=4] [ref=e102]
          - region "白底紧凑示例" [ref=e103]:
            - form "白底紧凑示例" [ref=e104]:
              - generic [ref=e105]:
                - textbox "白底紧凑示例内容" [ref=e107]:
                  - /placeholder: 结合课程资料，写下你的问题…
                - generic [ref=e108]:
                  - generic [ref=e109]:
                    - button "添加资料" [ref=e110] [cursor=pointer]
                    - button "选择搜索范围" [ref=e113] [cursor=pointer]:
                      - generic [ref=e115]: 本课程资料
                  - generic [ref=e117]:
                    - button "开始语音输入" [ref=e118] [cursor=pointer]
                    - button "展开输入框" [ref=e122] [cursor=pointer]
                    - button "发送" [disabled] [ref=e126]
        - generic [ref=e129]:
          - heading "灰底 · 展开" [level=4] [ref=e130]
          - region "灰底展开示例" [ref=e131]:
            - form "灰底展开示例" [ref=e132]:
              - generic [ref=e133]:
                - textbox "灰底展开示例内容" [ref=e135]:
                  - /placeholder: 结合课程资料，写下你的问题…
                - generic [ref=e136]:
                  - generic [ref=e137]:
                    - button "添加资料" [ref=e138] [cursor=pointer]
                    - button "选择搜索范围" [ref=e141] [cursor=pointer]:
                      - generic [ref=e143]: 本课程资料
                  - generic [ref=e145]:
                    - button "开始语音输入" [ref=e146] [cursor=pointer]
                    - button "收起输入框" [expanded] [ref=e150] [cursor=pointer]
                    - button "发送" [disabled] [ref=e154]
        - generic [ref=e157]:
          - heading "白底 · 展开" [level=4] [ref=e158]
          - region "白底展开示例" [ref=e159]:
            - form "白底展开示例" [ref=e160]:
              - generic [ref=e161]:
                - textbox "白底展开示例内容" [ref=e163]:
                  - /placeholder: 结合课程资料，写下你的问题…
                - generic [ref=e164]:
                  - generic [ref=e165]:
                    - button "添加资料" [ref=e166] [cursor=pointer]
                    - button "选择搜索范围" [ref=e169] [cursor=pointer]:
                      - generic [ref=e171]: 本课程资料
                  - generic [ref=e173]:
                    - button "开始语音输入" [ref=e174] [cursor=pointer]
                    - button "收起输入框" [expanded] [ref=e178] [cursor=pointer]
                    - button "发送" [disabled] [ref=e182]
    - generic [ref=e185]:
      - heading "接入与验证边界" [level=2] [ref=e186]
      - generic [ref=e187]:
        - paragraph [ref=e188]: 录音使用浏览器真实录音能力；本页上传、转写、课程资料和消息接收均为本地模拟。转写成功后先审阅文字，再发送。尚未处理的保留录音需要重试或明确丢弃。
        - paragraph [ref=e189]:
          - text: 实际课程答疑和课堂讨论见
          - link "会话滚动与场景组合" [ref=e190] [cursor=pointer]:
            - /url: "#message-scroller"
          - text: 。业务接口、权限、消息幂等与持久化由宿主提供；真实设备与服务验证单独记录。
  - region [ref=e191]:
    - heading "使用边界" [level=2] [ref=e192]
    - generic [ref=e193]:
      - generic [ref=e194]:
        - heading "适合用在" [level=3] [ref=e195]
        - list [ref=e196]:
          - listitem [ref=e197]: AI 答疑、聊天和讨论需要共享的输入体验。
          - listitem [ref=e198]: 需要真实文件生命周期、语音输入适配与失败保稿。
      - generic [ref=e199]:
        - heading "避免用在" [level=3] [ref=e200]
        - list [ref=e201]:
          - listitem [ref=e202]: 只需普通表单多行字段。
          - listitem [ref=e203]: 需要内置消息服务、课程权限或跨设备草稿同步。
  - generic [ref=e204]:
    - region [ref=e205]:
      - heading "API 与结构" [level=2] [ref=e206]
      - table [ref=e208]:
        - caption [ref=e209]: ConversationComposer 对话输入 常用接口
        - rowgroup [ref=e210]:
          - row [ref=e211]:
            - columnheader "名称" [ref=e212]
            - columnheader "类型" [ref=e213]
            - columnheader "默认" [ref=e214]
            - columnheader "说明" [ref=e215]
        - rowgroup [ref=e216]:
          - row [ref=e217]:
            - rowheader [ref=e218]:
              - code [ref=e219]: draft / draftRevision
            - cell [ref=e220]:
              - code [ref=e221]: ComposerDraft / number
            - cell "—" [ref=e222]
            - cell "宿主受控内容版本；上传进度不算用户编辑。" [ref=e223]
          - row [ref=e224]:
            - rowheader [ref=e225]:
              - code [ref=e226]: surface / layout
            - cell [ref=e227]:
              - code [ref=e228]: gray | white / compact | expanded
            - cell "—" [ref=e229]
            - cell "两种表面与两种布局独立；切换保留草稿和光标。" [ref=e230]
          - row [ref=e231]:
            - rowheader [ref=e232]:
              - code [ref=e233]: attachments / references / voice
            - cell [ref=e234]:
              - code [ref=e235]: 可选能力组
            - cell "—" [ref=e236]
            - cell "附件状态只有一个所有者；服务由宿主接入。" [ref=e237]
          - row [ref=e238]:
            - rowheader [ref=e239]:
              - code [ref=e240]: submission / generation
            - cell [ref=e241]:
              - code [ref=e242]: 独立受控状态
            - cell "—" [ref=e243]
            - cell "确认前保稿，AI 回答时可准备下一稿。" [ref=e244]
      - paragraph [ref=e245]: Parts / Slots：context、editor、toolbar、primary-action、feedback
    - region [ref=e246]:
      - heading "调用示例" [level=2] [ref=e247]
      - generic [ref=e248]:
        - generic [ref=e249]:
          - button "复制代码" [ref=e250] [cursor=pointer]
          - status
        - code [ref=e253]: "<ConversationComposer conversationId={id} draft={draft} draftRevision={revision} onDraftChange={setDraft} aria-label=\"消息内容\" attachments={attachmentAdapter} references={referenceService} voice={{ transcribe }} submission={submission} onSubmit={submitSnapshot} />"
      - paragraph [ref=e254]:
        - text: 当前源码：
        - code [ref=e255]: packages/ui/src/conversation-composer/index.ts
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
> 41  |   expect(Math.abs((await shell.boundingBox())!.height-(await editor.boundingBox())!.height)).toBeLessThan(1);
      |                                                                                              ^ Error: expect(received).toBeLessThan(expected)
  42  |   await editor.fill('长草稿的阅读位置与光标必须保持。\n'.repeat(30));await editor.press('ControlOrMeta+End');
  43  |   const cursor=await editor.evaluate(node=>(node as HTMLTextAreaElement).selectionEnd);
  44  |   expect(await editor.evaluate(node=>node.scrollTop)).toBeGreaterThan(0);
  45  |   await form.getByRole('button',{name:'收起输入框',exact:true}).click();
  46  |   await expect(shell).toHaveAttribute('data-resizing','false');
  47  |   expect(await editor.evaluate(node=>node.scrollTop)).toBeGreaterThan(0);
  48  |   expect(await editor.evaluate(node=>(node as HTMLTextAreaElement).selectionEnd)).toBe(cursor);
  49  |   await expect(editor).toBeFocused();
  50  | });
  51  | test('narrow recovery cards leave room for names and retry returns focus before the action disappears',async({page},info)=>{
  52  |   await page.goto('/#conversation-composer');
  53  |   const form=page.getByRole('form',{name:'恢复与会话示例',exact:true}),section=page.getByRole('region',{name:'恢复与会话示例',exact:true});
  54  |   await form.evaluate(node=>{node.style.width='320px';});
  55  |   await section.getByText('演示控制',{exact:true}).click();await section.getByRole('button',{name:'模拟上传失败：关',exact:true}).click();
  56  |   await form.locator('input[type=file]').setInputFiles({name:'课堂观察与课后反馈整理记录-第一小组.txt',mimeType:'text/plain',buffer:Buffer.from('local test')});
  57  |   const card=form.locator('.rain-composer__material'),content=card.locator('.rain-attachment__content'),actions=card.locator('.rain-attachment__actions');
  58  |   await expect(form.getByRole('button',{name:'重试',exact:true})).toBeVisible();
  59  |   const copy=await content.boundingBox(),controls=await actions.boundingBox();
  60  |   expect(copy!.width).toBeGreaterThan(220);expect(controls!.y).toBeGreaterThanOrEqual(copy!.y+copy!.height);
  61  |   expect(await form.evaluate(node=>node.scrollWidth-node.clientWidth)).toBeLessThanOrEqual(1);
  62  |   await form.screenshot({path:`${evidence}/narrow-recovery-actions-${info.project.name}.png`});
  63  |   await section.getByRole('button',{name:'模拟上传失败：开',exact:true}).click();
  64  |   await form.getByRole('button',{name:'重试',exact:true}).press('Enter');
  65  |   await expect(form.getByRole('textbox')).toBeFocused();
  66  |   await expect(form.getByRole('button',{name:'发送',exact:true})).toBeEnabled();
  67  |   await expect(form.getByRole('textbox')).toBeFocused();
  68  | });
  69  | test('full-width writing and fixed toolbar slots survive expansion and voice phases',async({page},info)=>{
  70  |   await page.goto('/#conversation-composer');
  71  |   const form=page.getByRole('form',{name:'灰底紧凑示例',exact:true}),editor=form.getByRole('textbox');
  72  |   await editor.fill('保持这段草稿与光标');
  73  |   const before=await form.boundingBox(),body=await editor.boundingBox(),send=await form.getByRole('button',{name:'发送',exact:true}).boundingBox();
  74  |   expect(body!.width/before!.width).toBeGreaterThan(.85);
  75  |   expect(send!.y).toBeGreaterThanOrEqual(body!.y+body!.height);
  76  |   await form.getByRole('button',{name:'展开输入框',exact:true}).click();
  77  |   const expandedSend=await form.getByRole('button',{name:'发送',exact:true}).boundingBox();
  78  |   expect(Math.abs(send!.x-expandedSend!.x)).toBeLessThan(1);
  79  |   await expect(editor).toBeFocused();
  80  |   await form.getByRole('button',{name:'开始语音输入',exact:true}).click();
  81  |   await expect(form.getByRole('button',{name:'结束录音',exact:true})).toBeVisible();
  82  |   await expect(form.getByRole('timer',{name:'录音时长'})).not.toHaveText('00:00',{timeout:5000});
  83  |   const stop=await form.getByRole('button',{name:'结束录音',exact:true}).boundingBox();
  84  |   expect(Math.abs(stop!.x-expandedSend!.x)).toBeLessThan(1);
  85  |   expect(Math.abs(stop!.y-expandedSend!.y)).toBeLessThan(1);
  86  |   await expect(editor).toHaveValue('保持这段草稿与光标');
  87  |   expect(await form.evaluate(node=>node.scrollWidth-node.clientWidth)).toBeLessThanOrEqual(1);
  88  |   await form.screenshot({path:`${evidence}/stable-voice-toolbar-${info.project.name}.png`});
  89  |   await form.getByRole('button',{name:'取消录音',exact:true}).click();
  90  |   await expect(editor).toBeFocused();await expect(editor).toHaveValue('保持这段草稿与光标');
  91  | });
  92  | test('many failed materials scroll without displacing the writing area or trapping keyboard recovery',async({page},info)=>{
  93  |   await page.goto('/#conversation-composer');
  94  |   const form=page.getByRole('form',{name:'恢复与会话示例',exact:true}),section=page.getByRole('region',{name:'恢复与会话示例',exact:true});
  95  |   await section.getByText('演示控制',{exact:true}).click();
  96  |   await section.getByRole('button',{name:'模拟上传失败：关',exact:true}).click();
  97  |   await form.locator('input[type=file]').setInputFiles(Array.from({length:5},(_,index)=>({name:`课堂记录-${index}.txt`,mimeType:'text/plain',buffer:Buffer.from('供本地恢复检查')})));
  98  |   await expect(form.getByRole('button',{name:'重试',exact:true})).toHaveCount(5);
  99  |   const materials=form.getByRole('group',{name:'本次资料，共 5 项'});
  100 |   expect((await materials.boundingBox())!.height).toBeLessThanOrEqual(192);
  101 |   expect(await materials.evaluate(node=>node.scrollHeight-node.clientHeight)).toBeGreaterThan(0);
  102 |   await materials.focus();await page.keyboard.press('End');
  103 |   await expect.poll(()=>materials.evaluate(node=>node.scrollTop)).toBeGreaterThan(0);
  104 |   await form.getByRole('button',{name:'移除资料 课堂记录-4.txt',exact:true}).focus();
  105 |   await page.keyboard.press('Enter');await expect(form.getByRole('button',{name:'重试',exact:true})).toHaveCount(4);
  106 |   await expect(form.getByRole('textbox')).toBeFocused();
  107 |   await form.getByRole('textbox').fill('附件失败时仍能继续写正文');
  108 |   await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  109 |   await form.screenshot({path:`${evidence}/bounded-materials-${info.project.name}.png`});
  110 | });
  111 | test('visible source and separated selections keep a successful empty draft quiet',async({page},info)=>{
  112 |   await page.goto('/#conversation-composer');
  113 |   const form=page.getByRole('form',{name:'灰底紧凑示例',exact:true});
  114 |   await expect(form.getByRole('button',{name:'选择搜索范围',exact:true}).getByText('本课程资料',{exact:true})).toBeVisible();
  115 |   await form.getByRole('button',{name:'添加资料',exact:true}).click();await page.getByRole('menuitem',{name:'选择课程资料',exact:true}).click();
  116 |   const picker=page.getByRole('dialog',{name:'引用课程资料',exact:true});
  117 |   await expect(picker.locator('.rain-composer-picker-body')).toHaveCSS('display','flex');
  118 |   await expect(picker.locator('.rain-composer-picker-label').first()).toHaveCSS('font-weight','400');
  119 |   expect((await picker.locator('.rain-composer-picker-search').boundingBox())!.height).toBeGreaterThanOrEqual(36);
  120 |   await picker.getByRole('checkbox').first().locator('..').click();
  121 |   await picker.getByRole('textbox',{name:'搜索课程资料',exact:true}).fill('无关关键词');
  122 |   await expect(picker.getByRole('group',{name:'搜索结果',exact:true})).toContainText('未找到匹配的资料');
  123 |   await expect(picker.getByRole('group',{name:'搜索结果',exact:true}).getByRole('checkbox')).toHaveCount(0);
  124 |   await expect(picker.getByRole('group',{name:'已选资料',exact:true}).getByRole('checkbox')).toBeChecked();
  125 |   await picker.screenshot({path:`${evidence}/refined-picker-${info.project.name}.png`});
  126 |   await picker.getByRole('button',{name:'添加引用',exact:true}).click();
  127 |   await form.getByRole('button',{name:'选择搜索范围',exact:true}).click();
  128 |   await page.getByRole('radio',{name:'本次引用资料',exact:false}).locator('..').click();
  129 |   await expect(form.getByRole('button',{name:'选择搜索范围',exact:true}).getByText('本次引用资料',{exact:true})).toBeVisible();
  130 |   await form.getByRole('textbox').fill('只分析这份资料');await form.getByRole('button',{name:'发送',exact:true}).click();
  131 |   await expect(form.getByRole('textbox')).toBeEmpty();
  132 |   await expect(form.locator('[data-slot="feedback"]')).toHaveCount(0);
  133 |   await expect(form.getByText('本次引用资料',{exact:true})).toBeVisible();
  134 |   await form.screenshot({path:`${evidence}/quiet-after-send-${info.project.name}.png`});
  135 |   await form.getByRole('textbox').fill('下一问');
  136 |   await expect(form.locator('[data-slot="feedback"]')).toContainText('请添加引用资料或更改范围');
  137 |   await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  138 | });
  139 | 
  140 | test('material summaries keep failed files visible and recovery does not repeat',async({page},info)=>{
  141 |   await page.goto('/#conversation-composer');
```