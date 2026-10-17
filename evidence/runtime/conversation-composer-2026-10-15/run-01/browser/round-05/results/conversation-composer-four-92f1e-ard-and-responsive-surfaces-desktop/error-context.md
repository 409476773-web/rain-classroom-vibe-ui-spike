# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: conversation-composer.spec.ts >> four combinations preserve draft, keyboard and responsive surfaces
- Location: tests/e2e/conversation-composer.spec.ts:7:1

# Error details

```
Test timeout of 45000ms exceeded.
```

```
Error: locator.click: Test timeout of 45000ms exceeded.
Call log:
  - waiting for getByRole('form', { name: '灰底紧凑示例', exact: true }).getByRole('button', { name: '展开输入框', exact: true })
    - locator resolved to <button type="button" data-slot="root" data-size="28/16" aria-label="展开输入框" data-variant="fill" data-tone="default" data-state="default" data-focus="control" aria-expanded="false" data-highlight="none" data-density="default" data-rain-state="default" data-feedback="interactive" data-rain-id="ui-icon-button" class="rain-icon-button box-border relative inline-flex flex-none items-center justify-center p-rain-0 border-none overflow-visible align-middle appearance-none select-none isolate transition-color…>…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <button tabindex="0" type="button" data-slot="root" aria-label="添加资料" data-size="36/20" id="base-ui-_r_i_" data-variant="fill" data-tone="default" aria-haspopup="menu" data-focus="control" data-state="default" aria-expanded="false" data-highlight="none" data-density="default" data-rain-state="default" data-feedback="interactive" data-rain-id="ui-icon-button" class="rain-icon-button box-border relative inline-flex flex-none items-center justify-center p-rain-0 border-none overflow-visible align-middle …>…</button> from <div>…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <button tabindex="0" type="button" data-slot="root" aria-label="添加资料" data-size="36/20" id="base-ui-_r_i_" data-variant="fill" data-tone="default" aria-haspopup="menu" data-focus="control" data-state="default" aria-expanded="false" data-highlight="none" data-density="default" data-rain-state="default" data-feedback="interactive" data-rain-id="ui-icon-button" class="rain-icon-button box-border relative inline-flex flex-none items-center justify-center p-rain-0 border-none overflow-visible align-middle …>…</button> from <div>…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    84 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <button tabindex="0" type="button" data-slot="root" aria-label="添加资料" data-size="36/20" id="base-ui-_r_i_" data-variant="fill" data-tone="default" aria-haspopup="menu" data-focus="control" data-state="default" aria-expanded="false" data-highlight="none" data-density="default" data-rain-state="default" data-feedback="interactive" data-rain-id="ui-icon-button" class="rain-icon-button box-border relative inline-flex flex-none items-center justify-center p-rain-0 border-none overflow-visible align-middle …>…</button> from <div>…</div> subtree intercepts pointer events
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
              - generic [ref=e29]:
                - textbox "灰底紧凑示例内容" [active] [ref=e30]:
                  - /placeholder: 结合课程资料，写下你的问题…
                  - text: 请结合资料，解释事实与判断的区别。 保留换行
                - generic [ref=e31]:
                  - generic [ref=e32]:
                    - button "添加资料" [ref=e33] [cursor=pointer]
                    - button "选择搜索范围" [ref=e36] [cursor=pointer]
                  - generic [ref=e38]:
                    - button "开始语音输入" [ref=e39] [cursor=pointer]
                    - button "展开输入框" [ref=e43] [cursor=pointer]
                    - button "发送" [ref=e46] [cursor=pointer]
        - generic [ref=e49]:
          - heading "白底 · 紧凑" [level=4] [ref=e50]
          - region "白底紧凑示例" [ref=e51]:
            - form "白底紧凑示例" [ref=e52]:
              - generic [ref=e53]:
                - textbox "白底紧凑示例内容" [ref=e54]:
                  - /placeholder: 结合课程资料，写下你的问题…
                - generic [ref=e55]:
                  - generic [ref=e56]:
                    - button "添加资料" [ref=e57] [cursor=pointer]
                    - button "选择搜索范围" [ref=e60] [cursor=pointer]
                  - generic [ref=e62]:
                    - button "开始语音输入" [ref=e63] [cursor=pointer]
                    - button "展开输入框" [ref=e67] [cursor=pointer]
                    - button "发送" [disabled] [ref=e70]
              - status [ref=e73]: 请先输入内容
        - generic [ref=e74]:
          - heading "灰底 · 展开" [level=4] [ref=e75]
          - region "灰底展开示例" [ref=e76]:
            - form "灰底展开示例" [ref=e77]:
              - generic [ref=e78]:
                - textbox "灰底展开示例内容" [ref=e79]:
                  - /placeholder: 结合课程资料，写下你的问题…
                - generic [ref=e80]:
                  - generic [ref=e81]:
                    - button "添加资料" [ref=e82] [cursor=pointer]
                    - button "选择搜索范围" [ref=e85] [cursor=pointer]:
                      - generic [ref=e87]: 本课程资料
                  - generic [ref=e89]:
                    - button "开始语音输入" [ref=e90] [cursor=pointer]
                    - button "收起输入框" [expanded] [ref=e94] [cursor=pointer]
                    - button "发送" [disabled] [ref=e97]
              - status [ref=e100]: 请先输入内容
        - generic [ref=e101]:
          - heading "白底 · 展开" [level=4] [ref=e102]
          - region "白底展开示例" [ref=e103]:
            - form "白底展开示例" [ref=e104]:
              - generic [ref=e105]:
                - textbox "白底展开示例内容" [ref=e106]:
                  - /placeholder: 结合课程资料，写下你的问题…
                - generic [ref=e107]:
                  - generic [ref=e108]:
                    - button "添加资料" [ref=e109] [cursor=pointer]
                    - button "选择搜索范围" [ref=e112] [cursor=pointer]:
                      - generic [ref=e114]: 本课程资料
                  - generic [ref=e116]:
                    - button "开始语音输入" [ref=e117] [cursor=pointer]
                    - button "收起输入框" [expanded] [ref=e121] [cursor=pointer]
                    - button "发送" [disabled] [ref=e124]
              - status [ref=e127]: 请先输入内容
    - generic [ref=e128]:
      - heading "恢复与会话草稿" [level=2] [ref=e129]
      - paragraph [ref=e130]: 用下方演示控制重现失败、长草稿与回复；在会话间切换检查内容归属。
      - region "恢复与会话示例" [ref=e132]:
        - radiogroup "页面内会话草稿" [ref=e133]:
          - generic [ref=e135]:
            - generic [ref=e136] [cursor=pointer]:
              - radio "会话 A" [checked] [ref=e137]
              - generic [ref=e141]: 会话 A
            - generic [ref=e143] [cursor=pointer]:
              - radio "会话 B" [ref=e144]
              - generic [ref=e147]: 会话 B
        - form "恢复与会话示例" [ref=e149]:
          - generic [ref=e150]:
            - textbox "恢复与会话示例内容" [ref=e151]:
              - /placeholder: 结合课程资料，写下你的问题…
            - generic [ref=e152]:
              - generic [ref=e153]:
                - button "添加资料" [ref=e154] [cursor=pointer]
                - button "选择搜索范围" [ref=e157] [cursor=pointer]:
                  - generic [ref=e159]: 本课程资料
              - generic [ref=e161]:
                - button "开始语音输入" [ref=e162] [cursor=pointer]
                - button "收起输入框" [expanded] [ref=e166] [cursor=pointer]
                - button "发送" [disabled] [ref=e169]
          - status [ref=e172]: 请先输入内容
        - group [ref=e173]:
          - generic "演示控制" [ref=e174] [cursor=pointer]
    - generic [ref=e175]:
      - heading "接入与验证边界" [level=2] [ref=e176]
      - generic [ref=e177]:
        - paragraph [ref=e178]: 录音使用浏览器真实录音能力；本页上传、转写、课程资料和消息接收均为本地模拟。转写成功后先审阅文字，再发送。尚未处理的保留录音需要重试或明确丢弃。
        - paragraph [ref=e179]:
          - text: 实际课程答疑和课堂讨论见
          - link "会话滚动与场景组合" [ref=e180] [cursor=pointer]:
            - /url: "#message-scroller"
          - text: 。业务接口、权限、消息幂等与持久化由宿主提供；真实设备与服务验证单独记录。
  - region [ref=e181]:
    - heading "使用边界" [level=2] [ref=e182]
    - generic [ref=e183]:
      - generic [ref=e184]:
        - heading "适合用在" [level=3] [ref=e185]
        - list [ref=e186]:
          - listitem [ref=e187]: AI 答疑、聊天和讨论需要共享的输入体验。
          - listitem [ref=e188]: 需要真实文件生命周期、语音输入适配与失败保稿。
      - generic [ref=e189]:
        - heading "避免用在" [level=3] [ref=e190]
        - list [ref=e191]:
          - listitem [ref=e192]: 只需普通表单多行字段。
          - listitem [ref=e193]: 需要内置消息服务、课程权限或跨设备草稿同步。
  - generic [ref=e194]:
    - region [ref=e195]:
      - heading "API 与结构" [level=2] [ref=e196]
      - table [ref=e198]:
        - caption [ref=e199]: ConversationComposer 对话输入 常用接口
        - rowgroup [ref=e200]:
          - row [ref=e201]:
            - columnheader "名称" [ref=e202]
            - columnheader "类型" [ref=e203]
            - columnheader "默认" [ref=e204]
            - columnheader "说明" [ref=e205]
        - rowgroup [ref=e206]:
          - row [ref=e207]:
            - rowheader [ref=e208]:
              - code [ref=e209]: draft / draftRevision
            - cell [ref=e210]:
              - code [ref=e211]: ComposerDraft / number
            - cell "—" [ref=e212]
            - cell "宿主受控内容版本；上传进度不算用户编辑。" [ref=e213]
          - row [ref=e214]:
            - rowheader [ref=e215]:
              - code [ref=e216]: surface / layout
            - cell [ref=e217]:
              - code [ref=e218]: gray | white / compact | expanded
            - cell "—" [ref=e219]
            - cell "两种表面与两种布局独立；切换保留草稿和光标。" [ref=e220]
          - row [ref=e221]:
            - rowheader [ref=e222]:
              - code [ref=e223]: attachments / references / voice
            - cell [ref=e224]:
              - code [ref=e225]: 可选能力组
            - cell "—" [ref=e226]
            - cell "附件状态只有一个所有者；服务由宿主接入。" [ref=e227]
          - row [ref=e228]:
            - rowheader [ref=e229]:
              - code [ref=e230]: submission / generation
            - cell [ref=e231]:
              - code [ref=e232]: 独立受控状态
            - cell "—" [ref=e233]
            - cell "确认前保稿，AI 回答时可准备下一稿。" [ref=e234]
      - paragraph [ref=e235]: Parts / Slots：context、editor、toolbar、primary-action、feedback
    - region [ref=e236]:
      - heading "调用示例" [level=2] [ref=e237]
      - generic [ref=e238]:
        - generic [ref=e239]:
          - button "复制代码" [ref=e240] [cursor=pointer]
          - status
        - code [ref=e243]: "<ConversationComposer conversationId={id} draft={draft} draftRevision={revision} onDraftChange={setDraft} aria-label=\"消息内容\" attachments={attachmentAdapter} references={referenceService} voice={{ transcribe }} submission={submission} onSubmit={submitSnapshot} />"
      - paragraph [ref=e244]:
        - text: 当前源码：
        - code [ref=e245]: packages/ui/src/conversation-composer/index.ts
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
> 16 |     await form.getByRole('button',{name:initial==='compact'?'展开输入框':'收起输入框',exact:true}).click();
     |                                                                                          ^ Error: locator.click: Test timeout of 45000ms exceeded.
  17 |     await expect(input).toBeFocused();await expect(input).toHaveValue('请结合资料，解释事实与判断的区别。\n保留换行');
  18 |     await form.getByRole('button',{name:initial==='compact'?'收起输入框':'展开输入框',exact:true}).click();
  19 |   }
  20 |   const compact=await page.getByRole('form',{name:'白底紧凑示例',exact:true}).boundingBox(), expanded=await page.getByRole('form',{name:'白底展开示例',exact:true}).boundingBox();
  21 |   expect(expanded!.height-compact!.height).toBeGreaterThan(24);
  22 |   await expect(page.getByRole('form',{name:'白底展开示例',exact:true}).getByRole('textbox')).toHaveCSS('box-shadow','none');
  23 |   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  24 |   await page.locator('.composer-demo-grid').screenshot({path:`${evidence}/surfaces-${info.project.name}-light.png`});
  25 |   await page.getByRole('button',{name:'深色',exact:true}).click();
  26 |   await page.locator('.composer-demo-grid').screenshot({path:`${evidence}/surfaces-${info.project.name}-dark.png`});
  27 |   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  28 |   await page.emulateMedia({reducedMotion:'reduce',forcedColors:'active'});
  29 |   await expect(page.getByRole('form',{name:'白底紧凑示例',exact:true})).toBeVisible();
  30 | });
  31 | test('material picker is transactional, source is single choice and overlays keep the composer height',async({page},info)=>{
  32 |   await page.goto('/#conversation-composer');const form=page.getByRole('form',{name:'恢复与会话示例',exact:true});
  33 |   await form.getByRole('textbox').fill('请结合资料分析。');
  34 |   const before=await form.boundingBox();
  35 |   await form.getByRole('button',{name:'添加资料',exact:true}).click();await page.getByRole('menuitem',{name:'选择课程资料',exact:true}).click();
  36 |   const picker=page.getByRole('dialog',{name:'引用课程资料',exact:true});await expect(picker).toBeVisible();
  37 |   expect(Math.abs((await form.boundingBox())!.height-before!.height)).toBeLessThan(1);
  38 |   await picker.getByRole('checkbox').first().locator('..').click();await picker.getByRole('button',{name:'取消',exact:true}).click();
  39 |   await expect(form.locator('.rain-composer__reference')).toHaveCount(0);
  40 |   await form.getByRole('button',{name:'添加资料',exact:true}).click();await page.getByRole('menuitem',{name:'选择课程资料',exact:true}).click();
  41 |   await picker.getByRole('checkbox').first().locator('..').click();await picker.getByRole('checkbox').nth(1).locator('..').click();await picker.getByRole('button',{name:'添加引用',exact:true}).click();
  42 |   await expect(form.locator('.rain-composer__reference')).toHaveCount(2);await expect(form.getByRole('textbox')).toBeFocused();
  43 |   await form.getByRole('button',{name:'选择搜索范围',exact:true}).click();await page.getByRole('radio',{name:'本次引用资料',exact:false}).locator('..').click();
  44 |   while(await form.getByRole('button',{name:/移除引用/}).count())await form.getByRole('button',{name:/移除引用/}).first().click();
  45 |   await expect(form).toContainText('请添加引用资料或更改范围');await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  46 |   await form.screenshot({path:`${evidence}/reference-recovery-${info.project.name}.png`});
  47 | });
  48 | test('files and sending recover locally while drafts remain owned by each conversation',async({page},info)=>{
  49 |   await page.goto('/#conversation-composer');const form=page.getByRole('form',{name:'恢复与会话示例',exact:true}),section=page.getByRole('region',{name:'恢复与会话示例',exact:true});
  50 |   await section.getByText('演示控制',{exact:true}).click();await section.getByRole('button',{name:'模拟上传失败：关',exact:true}).click();
  51 |   await form.locator('input[type=file]').setInputFiles({name:'课堂观察记录.txt',mimeType:'text/plain',buffer:Buffer.from('一段课堂记录')});
  52 |   await expect(form).toContainText('本地模拟上传失败');await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  53 |   await section.getByRole('button',{name:'模拟上传失败：开',exact:true}).click();await form.getByRole('button',{name:'重试',exact:true}).click();await expect(form.getByText('上传失败',{exact:true})).toHaveCount(0);
  54 |   await expect(form.getByRole('button',{name:'发送',exact:true})).toBeEnabled();
  55 |   await section.getByRole('button',{name:'模拟发送失败：关',exact:true}).click();await form.getByRole('textbox').fill('失败后保留这段话');await form.getByRole('button',{name:'发送',exact:true}).click();
  56 |   await expect(form).toContainText('发送失败，内容已保留');await expect(form.getByRole('textbox')).toHaveValue('失败后保留这段话');
  57 |   await form.getByRole('textbox').fill('修改后再发送');await expect(form.getByRole('button',{name:'重新发送',exact:true})).toHaveCount(0);
  58 |   await section.getByRole('radio',{name:'会话 B',exact:true}).locator('..').click();await expect(form.getByRole('textbox')).toBeEmpty();await form.getByRole('textbox').fill('B 独立草稿');
  59 |   await section.getByRole('radio',{name:'会话 A',exact:true}).locator('..').click();await expect(form.getByRole('textbox')).toHaveValue('修改后再发送');await expect(form).toContainText('课堂观察记录.txt');
  60 |   await form.screenshot({path:`${evidence}/send-recovery-${info.project.name}.png`});
  61 | });
  62 | test('native capture with a synthetic microphone preserves failed audio and inserts reviewed text',async({page},info)=>{
  63 |   await page.goto('/#conversation-composer');const form=page.getByRole('form',{name:'恢复与会话示例',exact:true}),section=page.getByRole('region',{name:'恢复与会话示例',exact:true});
  64 |   await section.getByText('演示控制',{exact:true}).click();await section.getByRole('button',{name:'模拟转写失败：关',exact:true}).click();
  65 |   await form.getByRole('textbox').fill('原有正文');await form.getByRole('button',{name:'开始语音输入',exact:true}).click();
  66 |   await expect(form.getByRole('button',{name:'结束录音',exact:true})).toBeVisible();await expect(form.getByRole('textbox')).toHaveAttribute('readonly','');
  67 |   await page.waitForTimeout(200);await form.getByRole('button',{name:'结束录音',exact:true}).click();
  68 |   await expect(form.getByRole('button',{name:'重试转写',exact:true})).toBeVisible();await expect(form.getByRole('button',{name:'重试转写',exact:true})).toBeFocused();
  69 |   await expect(form.getByRole('textbox')).toHaveValue('原有正文');await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  70 |   await form.getByRole('textbox').fill('修改后的正文');await section.getByRole('button',{name:'模拟转写失败：开',exact:true}).click();await form.getByRole('button',{name:'重试转写',exact:true}).click();
  71 |   await expect(form.getByRole('textbox')).toHaveValue(/修改后的正文.*【模拟转写】/);
  72 |   await expect(section.getByText(/本地接收/)).toHaveCount(0);
  73 |   await form.screenshot({path:`${evidence}/voice-review-${info.project.name}.png`});
  74 | });
  75 | test('course scroll, prepend, manual expansion and stop preserve reading and next draft',async({page})=>{await verifyConversationReading(page);});
  76 | test('discussion reply survives failure and editing clears stale retry',async({page},info)=>{
  77 |   await page.goto('/#message-scroller');const scene=page.locator('.g6-discussion-shell'),example=page.locator('.g6-discussion-example');
  78 |   await example.getByText('演示控制',{exact:true}).click();await example.getByRole('button',{name:'模拟发送失败：关',exact:true}).click();
  79 |   await scene.locator('[data-message-id="student-3"]').hover();
  80 |   await scene.getByRole('button',{name:'回复王同学的消息',exact:true}).click();await scene.getByRole('textbox',{name:'输入讨论内容',exact:true}).fill('需要更多证据。');
  81 |   await scene.getByRole('button',{name:'发送讨论',exact:true}).click();await expect(scene.getByRole('button',{name:'重新发送',exact:true})).toBeVisible();
  82 |   await scene.getByRole('button',{name:'取消回复',exact:true}).click();await expect(scene.getByRole('textbox')).toHaveValue('需要更多证据。');await expect(scene.getByRole('button',{name:'发送讨论',exact:true})).toBeVisible();
  83 |   await scene.screenshot({path:`${evidence}/discussion-${info.project.name}.png`});
  84 | });
  85 | 
```