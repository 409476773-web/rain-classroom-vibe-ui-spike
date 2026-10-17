# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: conversation-composer.spec.ts >> files and sending recover locally while drafts remain owned by each conversation
- Location: tests/e2e/conversation-composer.spec.ts:45:1

# Error details

```
Test timeout of 45000ms exceeded.
```

```
Error: locator.check: Test timeout of 45000ms exceeded.
Call log:
  - waiting for getByRole('region', { name: '恢复与会话示例', exact: true }).getByRole('radio', { name: '会话 B', exact: true })
    - locator resolved to <input type="radio" name="_r_1i_" class="sr-only" value="course-b" data-slot="input" data-focus="control" aria-labelledby="_r_1k_-label"/>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
  - retrying click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <html lang="zh-CN" data-rain-theme="light">…</html> intercepts pointer events
  - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
    - retrying click action
      - waiting 100ms
    20 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <html lang="zh-CN" data-rain-theme="light">…</html> intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
     - retrying click action
       - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <html lang="zh-CN" data-rain-theme="light">…</html> intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
  - retrying click action
    - waiting 500ms

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
      - heading "表面与布局" [level=2] [ref=e21]
      - paragraph [ref=e22]: 四个独立草稿均可输入、添加资料与展开。Enter 换行，点击上箭头发送。
      - generic [ref=e24]:
        - generic [ref=e25]:
          - heading "灰底 · 紧凑" [level=4] [ref=e26]
          - region "灰底紧凑示例" [ref=e27]:
            - form "灰底紧凑示例" [ref=e28]:
              - textbox "灰底紧凑示例内容" [ref=e29]:
                - /placeholder: 结合课程资料，写下你的问题…
              - generic [ref=e30]:
                - generic [ref=e31]:
                  - button "添加资料" [ref=e32] [cursor=pointer]
                  - button "选择搜索范围" [ref=e35] [cursor=pointer]:
                    - generic [ref=e37]: 本课程资料
                - generic [ref=e39]:
                  - button "展开输入框" [ref=e40] [cursor=pointer]
                  - button "开始语音输入" [ref=e43] [cursor=pointer]
                  - button "发送" [disabled] [ref=e46]
              - status [ref=e49]: 请先输入内容
        - generic [ref=e50]:
          - heading "白底 · 紧凑" [level=4] [ref=e51]
          - region "白底紧凑示例" [ref=e52]:
            - form "白底紧凑示例" [ref=e53]:
              - textbox "白底紧凑示例内容" [ref=e54]:
                - /placeholder: 结合课程资料，写下你的问题…
              - generic [ref=e55]:
                - generic [ref=e56]:
                  - button "添加资料" [ref=e57] [cursor=pointer]
                  - button "选择搜索范围" [ref=e60] [cursor=pointer]:
                    - generic [ref=e62]: 本课程资料
                - generic [ref=e64]:
                  - button "展开输入框" [ref=e65] [cursor=pointer]
                  - button "开始语音输入" [ref=e68] [cursor=pointer]
                  - button "发送" [disabled] [ref=e71]
              - status [ref=e74]: 请先输入内容
        - generic [ref=e75]:
          - heading "灰底 · 展开" [level=4] [ref=e76]
          - region "灰底展开示例" [ref=e77]:
            - form "灰底展开示例" [ref=e78]:
              - textbox "灰底展开示例内容" [ref=e79]:
                - /placeholder: 结合课程资料，写下你的问题…
              - generic [ref=e80]:
                - generic [ref=e81]:
                  - button "添加资料" [ref=e82] [cursor=pointer]
                  - button "选择搜索范围" [ref=e85] [cursor=pointer]:
                    - generic [ref=e87]: 本课程资料
                - generic [ref=e89]:
                  - button "收起输入框" [expanded] [ref=e90] [cursor=pointer]
                  - button "开始语音输入" [ref=e93] [cursor=pointer]
                  - button "发送" [disabled] [ref=e96]
              - status [ref=e99]: 请先输入内容
        - generic [ref=e100]:
          - heading "白底 · 展开" [level=4] [ref=e101]
          - region "白底展开示例" [ref=e102]:
            - form "白底展开示例" [ref=e103]:
              - textbox "白底展开示例内容" [ref=e104]:
                - /placeholder: 结合课程资料，写下你的问题…
              - generic [ref=e105]:
                - generic [ref=e106]:
                  - button "添加资料" [ref=e107] [cursor=pointer]
                  - button "选择搜索范围" [ref=e110] [cursor=pointer]:
                    - generic [ref=e112]: 本课程资料
                - generic [ref=e114]:
                  - button "收起输入框" [expanded] [ref=e115] [cursor=pointer]
                  - button "开始语音输入" [ref=e118] [cursor=pointer]
                  - button "发送" [disabled] [ref=e121]
              - status [ref=e124]: 请先输入内容
    - generic [ref=e125]:
      - heading "恢复与会话草稿" [level=2] [ref=e126]
      - paragraph [ref=e127]: 用下方演示控制重现失败、长草稿与回复；在会话间切换检查内容归属。
      - region "恢复与会话示例" [ref=e129]:
        - radiogroup "页面内会话草稿" [ref=e130]:
          - generic [ref=e132]:
            - generic [ref=e133] [cursor=pointer]:
              - radio "会话 A" [checked] [ref=e134]
              - generic [ref=e138]: 会话 A
            - generic [ref=e140] [cursor=pointer]:
              - radio "会话 B" [ref=e141]
              - generic [ref=e144]: 会话 B
        - form "恢复与会话示例" [ref=e146]:
          - generic [ref=e149]:
            - button "查看资料 课堂观察记录.txt" [ref=e151] [cursor=pointer]:
              - generic [ref=e152]: 课堂观察记录.txt
            - button "移除资料 课堂观察记录.txt" [ref=e154] [cursor=pointer]
          - textbox "恢复与会话示例内容" [active] [ref=e157]:
            - /placeholder: 结合课程资料，写下你的问题…
            - text: 修改后再发送
          - generic [ref=e158]:
            - generic [ref=e159]:
              - button "添加资料" [ref=e160] [cursor=pointer]
              - button "选择搜索范围" [ref=e163] [cursor=pointer]:
                - generic [ref=e165]: 本课程资料
            - generic [ref=e167]:
              - button "收起输入框" [expanded] [ref=e168] [cursor=pointer]
              - button "开始语音输入" [ref=e171] [cursor=pointer]
              - button "发送" [ref=e174] [cursor=pointer]
        - group [ref=e177]:
          - generic "演示控制" [ref=e178] [cursor=pointer]
          - generic [ref=e179]:
            - button "模拟发送失败：开" [pressed] [ref=e180] [cursor=pointer]
            - button "模拟上传失败：关" [ref=e182] [cursor=pointer]
            - button "模拟转写失败：关" [ref=e184] [cursor=pointer]
            - button "加入回复对象" [ref=e186] [cursor=pointer]
            - button "填入长草稿" [ref=e188] [cursor=pointer]
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
  1  | import { test, expect } from '@playwright/test';
  2  | import { mkdirSync } from 'node:fs';
  3  | import { verifyConversationReading } from './helpers/conversation-scrolling';
  4  | const evidence='evidence/runtime/conversation-composer-2026-10-15/run-01/browser';
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
> 55 |   await section.getByRole('radio',{name:'会话 B',exact:true}).locator('..').click();await expect(form.getByRole('textbox')).toBeEmpty();await form.getByRole('textbox').fill('B 独立草稿');
     |                                                             ^ Error: locator.check: Test timeout of 45000ms exceeded.
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
  76 |   await scene.getByRole('button',{name:'回复王同学的消息',exact:true}).click();await scene.getByRole('textbox',{name:'输入讨论内容',exact:true}).fill('需要更多证据。');
  77 |   await scene.getByRole('button',{name:'发送讨论',exact:true}).click();await expect(scene.getByRole('button',{name:'重新发送',exact:true})).toBeVisible();
  78 |   await scene.getByRole('button',{name:'取消回复',exact:true}).click();await expect(scene.getByRole('textbox')).toHaveValue('需要更多证据。');await expect(scene.getByRole('button',{name:'发送讨论',exact:true})).toBeVisible();
  79 |   await scene.screenshot({path:`${evidence}/discussion-${info.project.name}.png`});
  80 | });
  81 | 
```