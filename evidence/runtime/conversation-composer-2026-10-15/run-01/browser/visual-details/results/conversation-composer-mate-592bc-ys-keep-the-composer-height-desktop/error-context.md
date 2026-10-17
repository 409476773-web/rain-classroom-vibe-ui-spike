# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: conversation-composer.spec.ts >> material picker is transactional, source is single choice and overlays keep the composer height
- Location: tests/e2e/conversation-composer.spec.ts:37:1

# Error details

```
Test timeout of 45000ms exceeded.
```

```
Error: locator.screenshot: Test timeout of 45000ms exceeded.
Call log:
  - waiting for getByRole('dialog', { name: '搜索范围', exact: true })

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
                - textbox "灰底紧凑示例内容" [ref=e30]:
                  - /placeholder: 结合课程资料，写下你的问题…
                - generic [ref=e31]:
                  - generic [ref=e32]:
                    - button "添加资料" [ref=e33] [cursor=pointer]
                    - button "选择搜索范围" [ref=e36] [cursor=pointer]:
                      - generic [ref=e38]: 本课程资料
                  - generic [ref=e39]:
                    - button "开始语音输入" [ref=e40] [cursor=pointer]
                    - button "展开输入框" [ref=e44] [cursor=pointer]
                    - button "发送" [disabled] [ref=e48]
              - status [ref=e51]: 请先输入内容
        - generic [ref=e52]:
          - heading "白底 · 紧凑" [level=4] [ref=e53]
          - region "白底紧凑示例" [ref=e54]:
            - form "白底紧凑示例" [ref=e55]:
              - generic [ref=e56]:
                - textbox "白底紧凑示例内容" [ref=e57]:
                  - /placeholder: 结合课程资料，写下你的问题…
                - generic [ref=e58]:
                  - generic [ref=e59]:
                    - button "添加资料" [ref=e60] [cursor=pointer]
                    - button "选择搜索范围" [ref=e63] [cursor=pointer]:
                      - generic [ref=e65]: 本课程资料
                  - generic [ref=e66]:
                    - button "开始语音输入" [ref=e67] [cursor=pointer]
                    - button "展开输入框" [ref=e71] [cursor=pointer]
                    - button "发送" [disabled] [ref=e75]
              - status [ref=e78]: 请先输入内容
        - generic [ref=e79]:
          - heading "灰底 · 展开" [level=4] [ref=e80]
          - region "灰底展开示例" [ref=e81]:
            - form "灰底展开示例" [ref=e82]:
              - generic [ref=e83]:
                - textbox "灰底展开示例内容" [ref=e84]:
                  - /placeholder: 结合课程资料，写下你的问题…
                - generic [ref=e85]:
                  - generic [ref=e86]:
                    - button "添加资料" [ref=e87] [cursor=pointer]
                    - button "选择搜索范围" [ref=e90] [cursor=pointer]:
                      - generic [ref=e92]: 本课程资料
                  - generic [ref=e94]:
                    - button "开始语音输入" [ref=e95] [cursor=pointer]
                    - button "收起输入框" [expanded] [ref=e99] [cursor=pointer]
                    - button "发送" [disabled] [ref=e103]
              - status [ref=e106]: 请先输入内容
        - generic [ref=e107]:
          - heading "白底 · 展开" [level=4] [ref=e108]
          - region "白底展开示例" [ref=e109]:
            - form "白底展开示例" [ref=e110]:
              - generic [ref=e111]:
                - textbox "白底展开示例内容" [ref=e112]:
                  - /placeholder: 结合课程资料，写下你的问题…
                - generic [ref=e113]:
                  - generic [ref=e114]:
                    - button "添加资料" [ref=e115] [cursor=pointer]
                    - button "选择搜索范围" [ref=e118] [cursor=pointer]:
                      - generic [ref=e120]: 本课程资料
                  - generic [ref=e122]:
                    - button "开始语音输入" [ref=e123] [cursor=pointer]
                    - button "收起输入框" [expanded] [ref=e127] [cursor=pointer]
                    - button "发送" [disabled] [ref=e131]
              - status [ref=e134]: 请先输入内容
    - generic [ref=e135]:
      - heading "恢复与会话草稿" [level=2] [ref=e136]
      - paragraph [ref=e137]: 用下方演示控制重现失败、长草稿与回复；在会话间切换检查内容归属。
      - region "恢复与会话示例" [ref=e139]:
        - radiogroup "页面内会话草稿" [ref=e140]:
          - generic [ref=e142]:
            - generic [ref=e143] [cursor=pointer]:
              - radio "会话 A" [checked] [ref=e144]
              - generic [ref=e148]: 会话 A
            - generic [ref=e150] [cursor=pointer]:
              - radio "会话 B" [ref=e151]
              - generic [ref=e154]: 会话 B
        - form "恢复与会话示例" [ref=e156]:
          - generic [ref=e157]:
            - generic [ref=e158]:
              - generic "课堂观察记录与同伴反馈说明.pdf" [ref=e160]
              - button "移除引用 课堂观察记录与同伴反馈说明.pdf" [ref=e161] [cursor=pointer]
            - generic [ref=e164]:
              - generic "从课堂证据到学习判断.pdf" [ref=e166]
              - button "移除引用 从课堂证据到学习判断.pdf" [ref=e167] [cursor=pointer]
          - generic [ref=e170]:
            - textbox "恢复与会话示例内容" [ref=e171]:
              - /placeholder: 结合课程资料，写下你的问题…
              - text: 请结合资料分析。
            - generic [ref=e172]:
              - generic [ref=e173]:
                - button "添加资料" [ref=e174] [cursor=pointer]
                - button "选择搜索范围" [expanded] [ref=e178] [cursor=pointer]:
                  - generic [ref=e180]: 本课程资料
                - dialog [ref=e185]:
                  - radiogroup "搜索范围" [ref=e187]:
                    - generic [ref=e189]:
                      - generic [ref=e190] [cursor=pointer]:
                        - radio "本次引用资料" [ref=e191]
                        - generic [ref=e194]:
                          - generic [ref=e195]: 本次引用资料
                          - generic [ref=e196]: 仅检索已添加的资料
                      - generic [ref=e197] [cursor=pointer]:
                        - radio "本课程资料" [checked] [active] [ref=e198]
                        - generic [ref=e202]:
                          - generic [ref=e203]: 本课程资料
                          - generic [ref=e204]: 检索本课程的可用资料
              - generic [ref=e207]:
                - button "开始语音输入" [ref=e208] [cursor=pointer]
                - button "收起输入框" [expanded] [ref=e212] [cursor=pointer]
                - button "发送" [ref=e216] [cursor=pointer]
        - group [ref=e219]:
          - generic "演示控制" [ref=e220] [cursor=pointer]
    - generic [ref=e221]:
      - heading "接入与验证边界" [level=2] [ref=e222]
      - generic [ref=e223]:
        - paragraph [ref=e224]: 录音使用浏览器真实录音能力；本页上传、转写、课程资料和消息接收均为本地模拟。转写成功后先审阅文字，再发送。尚未处理的保留录音需要重试或明确丢弃。
        - paragraph [ref=e225]:
          - text: 实际课程答疑和课堂讨论见
          - link "会话滚动与场景组合" [ref=e226] [cursor=pointer]:
            - /url: "#message-scroller"
          - text: 。业务接口、权限、消息幂等与持久化由宿主提供；真实设备与服务验证单独记录。
  - region [ref=e227]:
    - heading "使用边界" [level=2] [ref=e228]
    - generic [ref=e229]:
      - generic [ref=e230]:
        - heading "适合用在" [level=3] [ref=e231]
        - list [ref=e232]:
          - listitem [ref=e233]: AI 答疑、聊天和讨论需要共享的输入体验。
          - listitem [ref=e234]: 需要真实文件生命周期、语音输入适配与失败保稿。
      - generic [ref=e235]:
        - heading "避免用在" [level=3] [ref=e236]
        - list [ref=e237]:
          - listitem [ref=e238]: 只需普通表单多行字段。
          - listitem [ref=e239]: 需要内置消息服务、课程权限或跨设备草稿同步。
  - generic [ref=e240]:
    - region [ref=e241]:
      - heading "API 与结构" [level=2] [ref=e242]
      - table [ref=e244]:
        - caption [ref=e245]: ConversationComposer 对话输入 常用接口
        - rowgroup [ref=e246]:
          - row [ref=e247]:
            - columnheader "名称" [ref=e248]
            - columnheader "类型" [ref=e249]
            - columnheader "默认" [ref=e250]
            - columnheader "说明" [ref=e251]
        - rowgroup [ref=e252]:
          - row [ref=e253]:
            - rowheader [ref=e254]:
              - code [ref=e255]: draft / draftRevision
            - cell [ref=e256]:
              - code [ref=e257]: ComposerDraft / number
            - cell "—" [ref=e258]
            - cell "宿主受控内容版本；上传进度不算用户编辑。" [ref=e259]
          - row [ref=e260]:
            - rowheader [ref=e261]:
              - code [ref=e262]: surface / layout
            - cell [ref=e263]:
              - code [ref=e264]: gray | white / compact | expanded
            - cell "—" [ref=e265]
            - cell "两种表面与两种布局独立；切换保留草稿和光标。" [ref=e266]
          - row [ref=e267]:
            - rowheader [ref=e268]:
              - code [ref=e269]: attachments / references / voice
            - cell [ref=e270]:
              - code [ref=e271]: 可选能力组
            - cell "—" [ref=e272]
            - cell "附件状态只有一个所有者；服务由宿主接入。" [ref=e273]
          - row [ref=e274]:
            - rowheader [ref=e275]:
              - code [ref=e276]: submission / generation
            - cell [ref=e277]:
              - code [ref=e278]: 独立受控状态
            - cell "—" [ref=e279]
            - cell "确认前保稿，AI 回答时可准备下一稿。" [ref=e280]
      - paragraph [ref=e281]: Parts / Slots：context、editor、toolbar、primary-action、feedback
    - region [ref=e282]:
      - heading "调用示例" [level=2] [ref=e283]
      - generic [ref=e284]:
        - generic [ref=e285]:
          - button "复制代码" [ref=e286] [cursor=pointer]
          - status
        - code [ref=e289]: "<ConversationComposer conversationId={id} draft={draft} draftRevision={revision} onDraftChange={setDraft} aria-label=\"消息内容\" attachments={attachmentAdapter} references={referenceService} voice={{ transcribe }} submission={submission} onSubmit={submitSnapshot} />"
      - paragraph [ref=e290]:
        - text: 当前源码：
        - code [ref=e291]: packages/ui/src/conversation-composer/index.ts
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { mkdirSync } from 'node:fs';
  3  | import { verifyConversationReading } from './helpers/conversation-scrolling';
  4  | const evidence='evidence/runtime/conversation-composer-2026-10-15/run-01/browser/'+(process.env.COMPOSER_BROWSER_RUN??'final');
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
  20 |   const compact=await page.getByRole('form',{name:'白底紧凑示例',exact:true}).boundingBox(), expanded=await page.getByRole('form',{name:'白底展开示例',exact:true}).boundingBox();
  21 |   expect(expanded!.height-compact!.height).toBeGreaterThan(24);
  22 |   await expect(page.getByRole('form',{name:'白底展开示例',exact:true}).getByRole('textbox')).toHaveCSS('box-shadow','none');
  23 |   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  24 |   await page.getByRole('form',{name:'白底展开示例',exact:true}).screenshot({path:`${evidence}/focus-${info.project.name}.png`});
  25 |   await page.locator('#conversation-composer-title').click();
  26 |   await page.locator('.composer-demo-grid').screenshot({path:`${evidence}/surfaces-${info.project.name}-light.png`});
  27 |   await page.getByRole('button',{name:'深色',exact:true}).click();
  28 |   await page.locator('.composer-demo-grid').screenshot({path:`${evidence}/surfaces-${info.project.name}-dark.png`});
  29 |   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  30 |   const minimum=page.getByRole('form',{name:'灰底紧凑示例',exact:true});
  31 |   await minimum.evaluate(node=>{node.style.width='320px';});
  32 |   expect(await minimum.getByRole('textbox').evaluate(node=>node.clientWidth)).toBeGreaterThan(240);
  33 |   expect(await minimum.evaluate(node=>node.scrollWidth-node.clientWidth)).toBeLessThanOrEqual(1);
  34 |   await page.emulateMedia({reducedMotion:'reduce',forcedColors:'active'});
  35 |   await expect(page.getByRole('form',{name:'白底紧凑示例',exact:true})).toBeVisible();
  36 | });
  37 | test('material picker is transactional, source is single choice and overlays keep the composer height',async({page},info)=>{
  38 |   await page.goto('/#conversation-composer');const form=page.getByRole('form',{name:'恢复与会话示例',exact:true});
  39 |   await form.getByRole('textbox').fill('请结合资料分析。');
  40 |   const before=await form.boundingBox();
  41 |   await form.getByRole('button',{name:'添加资料',exact:true}).click();await page.getByRole('menuitem',{name:'选择课程资料',exact:true}).click();
  42 |   const picker=page.getByRole('dialog',{name:'引用课程资料',exact:true});await expect(picker).toBeVisible();
  43 |   expect(Math.abs((await form.boundingBox())!.height-before!.height)).toBeLessThan(1);
  44 |   await picker.screenshot({path:`${evidence}/reference-picker-${info.project.name}.png`});
  45 |   await picker.getByRole('checkbox').first().locator('..').click();await picker.getByRole('button',{name:'取消',exact:true}).click();
  46 |   await expect(form.locator('.rain-composer__reference')).toHaveCount(0);
  47 |   await form.getByRole('button',{name:'添加资料',exact:true}).click();await page.getByRole('menuitem',{name:'选择课程资料',exact:true}).click();
  48 |   await picker.getByRole('checkbox').first().locator('..').click();await picker.getByRole('checkbox').nth(1).locator('..').click();await picker.getByRole('button',{name:'添加引用',exact:true}).click();
  49 |   await expect(form.locator('.rain-composer__reference')).toHaveCount(2);await expect(form.getByRole('textbox')).toBeFocused();
> 50 |   await form.getByRole('button',{name:'选择搜索范围',exact:true}).click();await page.getByRole('dialog',{name:'搜索范围',exact:true}).screenshot({path:`${evidence}/source-scope-${info.project.name}.png`});await page.getByRole('radio',{name:'本次引用资料',exact:false}).locator('..').click();
     |                                                                                                                             ^ Error: locator.screenshot: Test timeout of 45000ms exceeded.
  51 |   while(await form.getByRole('button',{name:/移除引用/}).count())await form.getByRole('button',{name:/移除引用/}).first().click();
  52 |   await expect(form).toContainText('请添加引用资料或更改范围');await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  53 |   await form.screenshot({path:`${evidence}/reference-recovery-${info.project.name}.png`});
  54 | });
  55 | test('files and sending recover locally while drafts remain owned by each conversation',async({page},info)=>{
  56 |   await page.goto('/#conversation-composer');const form=page.getByRole('form',{name:'恢复与会话示例',exact:true}),section=page.getByRole('region',{name:'恢复与会话示例',exact:true});
  57 |   await section.getByText('演示控制',{exact:true}).click();await section.getByRole('button',{name:'模拟上传失败：关',exact:true}).click();
  58 |   await form.locator('input[type=file]').setInputFiles({name:'课堂观察记录.txt',mimeType:'text/plain',buffer:Buffer.from('一段课堂记录')});
  59 |   await expect(form).toContainText('本地模拟上传失败');await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  60 |   await section.getByRole('button',{name:'模拟上传失败：开',exact:true}).click();await form.getByRole('button',{name:'重试',exact:true}).click();await expect(form.getByText('上传失败',{exact:true})).toHaveCount(0);
  61 |   await expect(form.getByRole('button',{name:'发送',exact:true})).toBeEnabled();
  62 |   await section.getByRole('button',{name:'模拟发送失败：关',exact:true}).click();await form.getByRole('textbox').fill('失败后保留这段话');await form.getByRole('button',{name:'发送',exact:true}).click();
  63 |   await expect(form).toContainText('发送失败，内容已保留');await expect(form.getByRole('textbox')).toHaveValue('失败后保留这段话');
  64 |   await form.getByRole('textbox').fill('修改后再发送');await expect(form.getByRole('button',{name:'重新发送',exact:true})).toHaveCount(0);
  65 |   await section.getByRole('radio',{name:'会话 B',exact:true}).locator('..').click();await expect(form.getByRole('textbox')).toBeEmpty();await form.getByRole('textbox').fill('B 独立草稿');
  66 |   await section.getByRole('radio',{name:'会话 A',exact:true}).locator('..').click();await expect(form.getByRole('textbox')).toHaveValue('修改后再发送');await expect(form).toContainText('课堂观察记录.txt');
  67 |   await form.screenshot({path:`${evidence}/send-recovery-${info.project.name}.png`});
  68 | });
  69 | test('native capture with a synthetic microphone preserves failed audio and inserts reviewed text',async({page},info)=>{
  70 |   await page.goto('/#conversation-composer');const form=page.getByRole('form',{name:'恢复与会话示例',exact:true}),section=page.getByRole('region',{name:'恢复与会话示例',exact:true});
  71 |   await section.getByText('演示控制',{exact:true}).click();await section.getByRole('button',{name:'模拟转写失败：关',exact:true}).click();
  72 |   await form.getByRole('textbox').fill('原有正文');await form.getByRole('button',{name:'开始语音输入',exact:true}).click();
  73 |   await expect(form.getByRole('button',{name:'结束录音',exact:true})).toBeVisible();await expect(form.getByRole('textbox')).toHaveAttribute('readonly','');
  74 |   await form.screenshot({path:`${evidence}/voice-recording-${info.project.name}.png`});
  75 |   await page.waitForTimeout(200);await form.getByRole('button',{name:'结束录音',exact:true}).click();
  76 |   await expect(form.getByRole('button',{name:'重试转写',exact:true})).toBeVisible();await expect(form.getByRole('button',{name:'重试转写',exact:true})).toBeFocused();
  77 |   await form.screenshot({path:`${evidence}/voice-retained-${info.project.name}.png`});
  78 |   await expect(form.getByRole('textbox')).toHaveValue('原有正文');await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  79 |   await form.getByRole('textbox').fill('修改后的正文');await section.getByRole('button',{name:'模拟转写失败：开',exact:true}).click();await form.getByRole('button',{name:'重试转写',exact:true}).click();
  80 |   await expect(form.getByRole('textbox')).toHaveValue(/修改后的正文.*【模拟转写】/);
  81 |   await expect(section.getByText(/本地接收/)).toHaveCount(0);
  82 |   await form.screenshot({path:`${evidence}/voice-review-${info.project.name}.png`});
  83 | });
  84 | test('course scroll, prepend, manual expansion and stop preserve reading and next draft',async({page})=>{await verifyConversationReading(page);});
  85 | test('discussion reply survives failure and editing clears stale retry',async({page},info)=>{
  86 |   await page.goto('/#message-scroller');const scene=page.locator('.g6-discussion-shell'),example=page.locator('.g6-discussion-example');
  87 |   await example.getByText('演示控制',{exact:true}).click();await example.getByRole('button',{name:'模拟发送失败：关',exact:true}).click();
  88 |   await scene.locator('[data-message-id="student-3"]').hover();
  89 |   await scene.getByRole('button',{name:'回复王同学的消息',exact:true}).click();await scene.getByRole('textbox',{name:'输入讨论内容',exact:true}).fill('需要更多证据。');
  90 |   await scene.getByRole('button',{name:'发送讨论',exact:true}).click();await expect(scene.getByRole('button',{name:'重新发送',exact:true})).toBeVisible();
  91 |   await scene.getByRole('button',{name:'取消回复',exact:true}).click();await expect(scene.getByRole('textbox')).toHaveValue('需要更多证据。');await expect(scene.getByRole('button',{name:'发送讨论',exact:true})).toBeVisible();
  92 |   await scene.screenshot({path:`${evidence}/discussion-${info.project.name}.png`});
  93 | });
  94 | 
```