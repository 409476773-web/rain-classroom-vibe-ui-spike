# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: conversation-composer.spec.ts >> four combinations preserve draft, keyboard and responsive surfaces
- Location: tests/e2e/conversation-composer.spec.ts:172:1

# Error details

```
Error: locator.screenshot: Protocol error (DOM.scrollIntoViewIfNeeded): Cannot find context with specified id
Call log:
  - taking element screenshot
  - waiting for fonts to load...
  - fonts loaded
  - attempting scroll into view action
    - waiting for element to be stable

```

# Page snapshot

```yaml
- main [ref=f1e3]:
  - status [ref=f1e4]: 正在打开页面…
```

# Test source

```ts
  94  |   await expect(form.getByRole('button',{name:'结束录音',exact:true})).toBeVisible();
  95  |   await expect(form.getByRole('timer',{name:'录音时长'})).not.toHaveText('00:00',{timeout:5000});
  96  |   const stop=await form.getByRole('button',{name:'结束录音',exact:true}).boundingBox();
  97  |   expect(Math.abs(stop!.x-expandedSend!.x)).toBeLessThan(1);
  98  |   expect(Math.abs(stop!.y-expandedSend!.y)).toBeLessThan(1);
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
> 194 |   await page.locator('.composer-demo-grid').screenshot({path:`${evidence}/surfaces-${info.project.name}-dark.png`});
      |                                             ^ Error: locator.screenshot: Protocol error (DOM.scrollIntoViewIfNeeded): Cannot find context with specified id
  195 |   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  196 |   const minimum=page.getByRole('form',{name:'灰底紧凑示例',exact:true});
  197 |   await minimum.evaluate(node=>{node.style.width='320px';});
  198 |   expect(await minimum.getByRole('textbox').evaluate(node=>node.clientWidth)).toBeGreaterThan(240);
  199 |   expect(await minimum.evaluate(node=>node.scrollWidth-node.clientWidth)).toBeLessThanOrEqual(1);
  200 |   await page.emulateMedia({reducedMotion:'reduce',forcedColors:'active'});
  201 |   await expect(page.getByRole('form',{name:'白底紧凑示例',exact:true})).toBeVisible();
  202 |   const growing=minimum.getByRole('textbox');
  203 |   await growing.fill('长草稿保留全部文字并在内部滚动。\n'.repeat(20));
  204 |   const grown=await growing.boundingBox();
  205 |   expect(grown!.height).toBeLessThanOrEqual(112);
  206 |   expect(await growing.evaluate(node=>node.scrollHeight-node.clientHeight)).toBeGreaterThan(0);
  207 |   await growing.fill('');expect((await growing.boundingBox())!.height).toBeLessThan(grown!.height);
  208 | });
  209 | test('material picker is transactional, source is single choice and overlays keep the composer height',async({page},info)=>{
  210 |   await page.goto('/#conversation-composer');const form=page.getByRole('form',{name:'恢复与会话示例',exact:true});
  211 |   await form.getByRole('textbox').fill('请结合资料分析。');
  212 |   const before=await form.boundingBox();
  213 |   await form.getByRole('button',{name:'添加资料',exact:true}).click();await page.getByRole('menuitem',{name:'选择课程资料',exact:true}).click();
  214 |   const picker=page.getByRole('dialog',{name:'引用课程资料',exact:true});await expect(picker).toBeVisible();
  215 |   expect(Math.abs((await form.boundingBox())!.height-before!.height)).toBeLessThan(1);
  216 |   await picker.screenshot({path:`${evidence}/reference-picker-${info.project.name}.png`});
  217 |   await picker.getByRole('checkbox').first().locator('..').click();await picker.getByRole('button',{name:'取消',exact:true}).click();
  218 |   await expect(form.locator('.rain-composer__reference')).toHaveCount(0);
  219 |   await form.getByRole('button',{name:'添加资料',exact:true}).click();await page.getByRole('menuitem',{name:'选择课程资料',exact:true}).click();
  220 |   await picker.getByRole('checkbox').first().locator('..').click();await picker.getByRole('checkbox').nth(1).locator('..').click();await picker.getByRole('button',{name:'添加引用',exact:true}).click();
  221 |   await expect(form.locator('.rain-composer__reference')).toHaveCount(2);await expect(form.getByRole('textbox')).toBeFocused();
  222 |   await form.getByRole('button',{name:'选择搜索范围',exact:true}).click();await page.getByRole('dialog',{name:'搜索范围',exact:true}).screenshot({path:`${evidence}/source-scope-${info.project.name}.png`});await page.getByRole('radio',{name:'本次引用资料',exact:false}).locator('..').click();
  223 |   while(await form.getByRole('button',{name:/移除引用/}).count())await form.getByRole('button',{name:/移除引用/}).first().click();
  224 |   await expect(form).toContainText('请添加引用资料或更改范围');await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  225 |   await form.screenshot({path:`${evidence}/reference-recovery-${info.project.name}.png`});
  226 | });
  227 | test('files and sending recover locally while drafts remain owned by each conversation',async({page},info)=>{
  228 |   await page.goto('/#conversation-composer');const form=page.getByRole('form',{name:'恢复与会话示例',exact:true}),section=page.getByRole('region',{name:'恢复与会话示例',exact:true});
  229 |   await section.getByText('演示控制',{exact:true}).click();await section.getByRole('button',{name:'模拟上传失败：关',exact:true}).click();
  230 |   await form.locator('input[type=file]').setInputFiles({name:'课堂观察记录.txt',mimeType:'text/plain',buffer:Buffer.from('一段课堂记录')});
  231 |   await expect(form).toContainText('本地模拟上传失败');await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  232 |   await section.getByRole('button',{name:'模拟上传失败：开',exact:true}).click();await form.getByRole('button',{name:'重试',exact:true}).click();await expect(form.getByText('上传失败',{exact:true})).toHaveCount(0);
  233 |   await expect(form.getByRole('button',{name:'发送',exact:true})).toBeEnabled();
  234 |   const fileCard=form.locator('.rain-composer__file .rain-attachment'),title=await fileCard.locator('[data-slot="attachment-title"]').boundingBox(),icon=await fileCard.locator(':scope > .rain-icon').boundingBox(),actions=await fileCard.locator('[data-slot="attachment-actions"]').boundingBox();
  235 |   expect(title!.x).toBeGreaterThanOrEqual(icon!.x+icon!.width+4);
  236 |   expect(title!.x+title!.width).toBeLessThanOrEqual(actions!.x);
  237 |   await section.getByRole('button',{name:'模拟发送失败：关',exact:true}).click();await form.getByRole('textbox').fill('失败后保留这段话');await form.getByRole('button',{name:'发送',exact:true}).click();
  238 |   await expect(form).toContainText('发送失败，内容已保留');await expect(form.getByRole('textbox')).toHaveValue('失败后保留这段话');
  239 |   await expect(form.getByRole('button',{name:'重新发送',exact:true})).toBeFocused();
  240 |   await form.getByRole('textbox').fill('修改后再发送');await expect(form.getByRole('button',{name:'重新发送',exact:true})).toHaveCount(0);
  241 |   await section.getByRole('radio',{name:'会话 B',exact:true}).locator('..').click();await expect(form.getByRole('textbox')).toBeEmpty();await form.getByRole('textbox').fill('B 独立草稿');
  242 |   await section.getByRole('radio',{name:'会话 A',exact:true}).locator('..').click();await expect(form.getByRole('textbox')).toHaveValue('修改后再发送');await expect(form).toContainText('课堂观察记录.txt');
  243 |   await form.screenshot({path:`${evidence}/send-recovery-${info.project.name}.png`});
  244 | });
  245 | test('native capture with a synthetic microphone preserves failed audio and inserts reviewed text',async({page},info)=>{
  246 |   await page.goto('/#conversation-composer');const form=page.getByRole('form',{name:'恢复与会话示例',exact:true}),section=page.getByRole('region',{name:'恢复与会话示例',exact:true});
  247 |   await section.getByText('演示控制',{exact:true}).click();await section.getByRole('button',{name:'模拟转写失败：关',exact:true}).click();
  248 |   await form.getByRole('textbox').fill('原有正文');await form.getByRole('button',{name:'开始语音输入',exact:true}).click();
  249 |   await expect(form.getByRole('button',{name:'结束录音',exact:true})).toBeVisible();await expect(form.getByRole('textbox')).toHaveAttribute('readonly','');
  250 |   await form.screenshot({path:`${evidence}/voice-recording-${info.project.name}.png`});
  251 |   await page.waitForTimeout(200);await form.getByRole('button',{name:'结束录音',exact:true}).click();
  252 |   await expect(form.getByRole('button',{name:'重试转写',exact:true})).toBeVisible();await expect(form.getByRole('button',{name:'重试转写',exact:true})).toBeFocused();
  253 |   await form.screenshot({path:`${evidence}/voice-retained-${info.project.name}.png`});
  254 |   await expect(form.getByRole('textbox')).toHaveValue('原有正文');await expect(form.getByRole('button',{name:'发送',exact:true})).toBeDisabled();
  255 |   await form.getByRole('textbox').fill('修改后的正文');await section.getByRole('button',{name:'模拟转写失败：开',exact:true}).click();await form.getByRole('button',{name:'重试转写',exact:true}).click();
  256 |   await expect(form.getByRole('textbox')).toHaveValue(/修改后的正文.*【模拟转写】/);
  257 |   await expect(section.getByText(/本地接收/)).toHaveCount(0);
  258 |   await form.screenshot({path:`${evidence}/voice-review-${info.project.name}.png`});
  259 | });
  260 | test('course scroll, prepend, manual expansion and stop preserve reading and next draft',async({page})=>{await verifyConversationReading(page);});
  261 | test('discussion reply survives failure and editing clears stale retry',async({page},info)=>{
  262 |   await page.goto('/#message-scroller');const scene=page.locator('.g6-discussion-shell'),example=page.locator('.g6-discussion-example');
  263 |   await example.getByText('演示控制',{exact:true}).click();await example.getByRole('button',{name:'模拟发送失败：关',exact:true}).click();
  264 |   await scene.locator('[data-message-id="student-3"]').hover();
  265 |   await scene.getByRole('button',{name:'回复王同学的消息',exact:true}).click();await scene.getByRole('textbox',{name:'输入讨论内容',exact:true}).fill('需要更多证据。');
  266 |   await scene.getByRole('button',{name:'发送讨论',exact:true}).click();await expect(scene.getByRole('button',{name:'重新发送',exact:true})).toBeVisible();
  267 |   await scene.getByRole('button',{name:'取消回复',exact:true}).click();await expect(scene.getByRole('textbox')).toHaveValue('需要更多证据。');await expect(scene.getByRole('button',{name:'发送讨论',exact:true})).toBeVisible();
  268 |   await scene.screenshot({path:`${evidence}/discussion-${info.project.name}.png`});
  269 | });
  270 | 
  271 | test('unchanged failed payload retries once and clears only acknowledged content',async({page},info)=>{
  272 |   await page.goto('/#conversation-composer');
  273 |   const form=page.getByRole('form',{name:'恢复与会话示例',exact:true}),section=page.getByRole('region',{name:'恢复与会话示例',exact:true});
  274 |   await section.getByText('演示控制',{exact:true}).click();
  275 |   await section.getByRole('button',{name:'模拟发送失败：关',exact:true}).click();
  276 |   await section.getByRole('button',{name:'加入回复对象',exact:true}).click();
  277 |   await form.getByRole('textbox').fill('同一份失败内容重新发送');
  278 |   await form.locator('input[type=file]').setInputFiles({name:'重试资料.txt',mimeType:'text/plain',buffer:Buffer.from('保留附件')});
  279 |   await expect(form.getByRole('button',{name:'发送',exact:true})).toBeEnabled();
  280 |   await form.getByRole('button',{name:'发送',exact:true}).click();
  281 |   await expect(form.getByRole('button',{name:'重新发送',exact:true})).toBeFocused();
  282 |   await expect(form.getByRole('group',{name:'当前回复对象'})).toContainText('王同学');
  283 |   await expect(form.getByRole('button',{name:'查看资料 重试资料.txt',exact:true})).toBeVisible();
  284 |   await form.getByRole('button',{name:'收起输入框',exact:true}).click();
  285 |   await expect(form).toContainText('发送失败，内容已保留');
  286 |   await section.getByRole('button',{name:'模拟发送失败：开',exact:true}).click();
  287 |   await form.getByRole('button',{name:'重新发送',exact:true}).click();
  288 |   await expect(form.getByRole('textbox')).toBeEmpty();
  289 |   await expect(form.getByRole('group',{name:'当前回复对象'})).toHaveCount(0);
  290 |   await expect(form.getByRole('button',{name:'查看资料 重试资料.txt',exact:true})).toHaveCount(0);
  291 |   await expect(section.getByText('本地接收：同一份失败内容重新发送',{exact:true})).toHaveCount(1);
  292 |   await expect(form).toHaveAttribute('data-layout','compact');
  293 |   await form.screenshot({path:`${evidence}/retry-accepted-${info.project.name}.png`});
  294 | });
```