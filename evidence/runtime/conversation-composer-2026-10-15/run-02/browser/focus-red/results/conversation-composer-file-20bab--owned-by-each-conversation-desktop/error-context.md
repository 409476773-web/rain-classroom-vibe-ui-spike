# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: conversation-composer.spec.ts >> files and sending recover locally while drafts remain owned by each conversation
- Location: tests/e2e/conversation-composer.spec.ts:55:1

# Error details

```
Error: expect(locator).toBeFocused() failed

Locator:  getByRole('form', { name: '恢复与会话示例', exact: true }).getByRole('button', { name: '重新发送', exact: true })
Expected: focused
Received: inactive
Timeout:  5000ms

Call log:
  - Expect "toBeFocused" with timeout 5000ms
  - waiting for getByRole('form', { name: '恢复与会话示例', exact: true }).getByRole('button', { name: '重新发送', exact: true })
    14 × locator resolved to <button type="submit" data-slot="root" aria-label="重新发送" data-size="36/20" title="发送失败，内容已保留。" data-variant="fill" data-tone="default" data-state="default" data-focus="control" data-highlight="none" data-density="default" data-rain-state="default" data-feedback="interactive" data-rain-id="ui-icon-button" data-local-recipe="conversation-composer-send" class="rain-icon-button box-border relative inline-flex flex-none items-center justify-center p-rain-0 border-none overflow-visible align-middle appearan…>…</button>
       - unexpected value "inactive"

```

```yaml
- button "重新发送"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { mkdirSync } from 'node:fs';
  3  | import { verifyConversationReading } from './helpers/conversation-scrolling';
  4  | const evidence=process.env.COMPOSER_EVIDENCE_DIR??'evidence/runtime/conversation-composer-2026-10-15/run-01/browser/'+(process.env.COMPOSER_BROWSER_RUN??'final');
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
  50 |   await form.getByRole('button',{name:'选择搜索范围',exact:true}).click();await page.getByRole('dialog',{name:'搜索范围',exact:true}).screenshot({path:`${evidence}/source-scope-${info.project.name}.png`});await page.getByRole('radio',{name:'本次引用资料',exact:false}).locator('..').click();
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
> 64 |   await expect(form.getByRole('button',{name:'重新发送',exact:true})).toBeFocused();
     |                                                                   ^ Error: expect(locator).toBeFocused() failed
  65 |   await form.getByRole('textbox').fill('修改后再发送');await expect(form.getByRole('button',{name:'重新发送',exact:true})).toHaveCount(0);
  66 |   await section.getByRole('radio',{name:'会话 B',exact:true}).locator('..').click();await expect(form.getByRole('textbox')).toBeEmpty();await form.getByRole('textbox').fill('B 独立草稿');
  67 |   await section.getByRole('radio',{name:'会话 A',exact:true}).locator('..').click();await expect(form.getByRole('textbox')).toHaveValue('修改后再发送');await expect(form).toContainText('课堂观察记录.txt');
  68 |   await form.screenshot({path:`${evidence}/send-recovery-${info.project.name}.png`});
  69 | });
  70 | test('native capture with a synthetic microphone preserves failed audio and inserts reviewed text',async({page},info)=>{
  71 |   await page.goto('/#conversation-composer');const form=page.getByRole('form',{name:'恢复与会话示例',exact:true}),section=page.getByRole('region',{name:'恢复与会话示例',exact:true});
  72 |   await section.getByText('演示控制',{exact:true}).click();await section.getByRole('button',{name:'模拟转写失败：关',exact:true}).click();
  73 |   await form.getByRole('textbox').fill('原有正文');await form.getByRole('button',{name:'开始语音输入',exact:true}).click();
  74 |   await expect(form.getByRole('button',{name:'结束录音',exact:true})).toBeVisible();await expect(form.getByRole('textbox')).toHaveAttribute('readonly','');
  75 |   await form.screenshot({path:`${evidence}/voice-recording-${info.project.name}.png`});
  76 |   await page.waitForTimeout(200);await form.getByRole('button',{name:'结束录音',exact:true}).click();
  77 |   await expect(form.getByRole('button',{name:'重试转写',exact:true})).toBeVisible();await expect(form.getByRole('button',{name:'重试转写',exact:true})).toBeFocused();
  78 |   await form.screenshot({path:`${evidence}/voice-retained-${info.project.name}.png`});
  79 |   await expect(form.getByRole('textbox')).toHaveValue('原有正文');await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  80 |   await form.getByRole('textbox').fill('修改后的正文');await section.getByRole('button',{name:'模拟转写失败：开',exact:true}).click();await form.getByRole('button',{name:'重试转写',exact:true}).click();
  81 |   await expect(form.getByRole('textbox')).toHaveValue(/修改后的正文.*【模拟转写】/);
  82 |   await expect(section.getByText(/本地接收/)).toHaveCount(0);
  83 |   await form.screenshot({path:`${evidence}/voice-review-${info.project.name}.png`});
  84 | });
  85 | test('course scroll, prepend, manual expansion and stop preserve reading and next draft',async({page})=>{await verifyConversationReading(page);});
  86 | test('discussion reply survives failure and editing clears stale retry',async({page},info)=>{
  87 |   await page.goto('/#message-scroller');const scene=page.locator('.g6-discussion-shell'),example=page.locator('.g6-discussion-example');
  88 |   await example.getByText('演示控制',{exact:true}).click();await example.getByRole('button',{name:'模拟发送失败：关',exact:true}).click();
  89 |   await scene.locator('[data-message-id="student-3"]').hover();
  90 |   await scene.getByRole('button',{name:'回复王同学的消息',exact:true}).click();await scene.getByRole('textbox',{name:'输入讨论内容',exact:true}).fill('需要更多证据。');
  91 |   await scene.getByRole('button',{name:'发送讨论',exact:true}).click();await expect(scene.getByRole('button',{name:'重新发送',exact:true})).toBeVisible();
  92 |   await scene.getByRole('button',{name:'取消回复',exact:true}).click();await expect(scene.getByRole('textbox')).toHaveValue('需要更多证据。');await expect(scene.getByRole('button',{name:'发送讨论',exact:true})).toBeVisible();
  93 |   await scene.screenshot({path:`${evidence}/discussion-${info.project.name}.png`});
  94 | });
  95 | 
```