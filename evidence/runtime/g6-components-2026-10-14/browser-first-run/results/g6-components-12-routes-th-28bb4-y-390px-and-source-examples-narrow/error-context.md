# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g6-components.spec.ts >> 12 routes, themes, density, 390px and source examples
- Location: tests/e2e/g6-components.spec.ts:7:1

# Error details

```
Error: attachment

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 391
Received:    595
```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - link "返回组件目录" [ref=e6] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e8]:
      - heading "Attachment 文件附件" [active] [level=1] [ref=e9]
      - generic [ref=e10]: UI · 共享候选 · 尚未发布
    - paragraph [ref=e11]: 用文件名、类型、处理状态和独立动作组织课程资料。
    - generic "预览设置" [ref=e12]:
      - button "浅色" [pressed] [ref=e13] [cursor=pointer]
      - button "深色" [ref=e15] [cursor=pointer]
      - button "紧凑密度" [ref=e17] [cursor=pointer]
  - generic [ref=e19]:
    - generic [ref=e20]:
      - heading "预览、上传与移除" [level=2] [ref=e21]
      - paragraph [ref=e22]: 本地模拟上传，不连接服务器。整卡预览和右侧动作分别操作。
      - generic [ref=e23]:
        - generic [ref=e24]:
          - generic [ref=e25]:
            - generic [ref=e27]:
              - generic [ref=e28]: 课程导读：从问题到证据.pdf
              - generic [ref=e29]: 已上传 · 1.8 MB
            - button "预览 课程导读：从问题到证据.pdf" [ref=e30] [cursor=pointer]
            - button "移除 课程导读：从问题到证据.pdf" [ref=e32] [cursor=pointer]
          - generic [ref=e35]:
            - generic [ref=e37]:
              - generic [ref=e38]: 课堂观察记录与同伴反馈说明.docx
              - generic [ref=e39]: 等待上传
            - button "预览 课堂观察记录与同伴反馈说明.docx" [ref=e40] [cursor=pointer]
            - generic [ref=e41]:
              - button "上传 课堂观察记录与同伴反馈说明.docx" [ref=e42] [cursor=pointer]:
                - generic [ref=e43]: 上传
              - button "移除 课堂观察记录与同伴反馈说明.docx" [ref=e44] [cursor=pointer]
        - generic [ref=e47]:
          - button "添加示例附件" [ref=e48] [cursor=pointer]
          - button "模拟失败" [ref=e50] [cursor=pointer]
        - status
    - generic [ref=e52]:
      - heading "完整五态" [level=2] [ref=e53]
      - paragraph [ref=e54]: 处理中保留可读文字和动态提示；失败同时使用文字和图标。
      - group "附件状态对照" [ref=e56]:
        - generic [ref=e59]:
          - generic [ref=e60]: idle.pdf
          - generic [ref=e61]: 等待上传
        - generic [ref=e64]:
          - generic [ref=e65]: uploading.pdf
          - generic [ref=e66]: 正在上传
        - generic [ref=e69]:
          - generic [ref=e70]: processing.pdf
          - generic [ref=e71]: 正在处理
        - generic [ref=e74]:
          - generic [ref=e75]: error.pdf
          - generic [ref=e76]: 上传失败，请重试
        - generic [ref=e79]:
          - generic [ref=e80]: done.pdf
          - generic [ref=e81]: 已上传 · 1.8 MB
    - generic [ref=e82]:
      - heading "三档尺寸与竖排媒体" [level=2] [ref=e83]
      - generic [ref=e84]:
        - generic [ref=e85]:
          - generic [ref=e88]:
            - generic [ref=e89]: 课程资料.pdf
            - generic [ref=e90]: default · PDF
          - generic [ref=e93]:
            - generic [ref=e94]: 课程资料.pdf
            - generic [ref=e95]: sm · PDF
          - generic [ref=e98]:
            - generic [ref=e99]: 课程资料.pdf
            - generic [ref=e100]: xs · PDF
        - generic [ref=e101]:
          - img "课程封面占位：从问题到证据" [ref=e103]:
            - generic [ref=e104]:
              - generic [ref=e105]: 课堂观察 · 第 04 讲
              - strong [ref=e106]: 从问题到证据
              - generic [ref=e107]: 观察 · 记录 · 讨论
          - generic [ref=e108]:
            - generic [ref=e109]: 课程封面
            - generic [ref=e110]: 预览占位
  - region [ref=e111]:
    - heading "使用边界" [level=2] [ref=e112]
    - generic [ref=e113]:
      - generic [ref=e114]:
        - heading "适合用在" [level=3] [ref=e115]
        - list [ref=e116]:
          - listitem [ref=e117]: 表单、消息或资料区需要展示文件和处理状态。
          - listitem [ref=e118]: 同一文件需要预览、移除或重试等独立动作。
      - generic [ref=e119]:
        - heading "避免用在" [level=3] [ref=e120]
        - list [ref=e121]:
          - listitem [ref=e122]: 让附件组件管理上传请求、权限或文件校验。
          - listitem [ref=e123]: 把整卡按钮与移除按钮做成嵌套按钮。
  - generic [ref=e124]:
    - region [ref=e125]:
      - heading "API 与结构" [level=2] [ref=e126]
      - table [ref=e128]:
        - caption [ref=e129]: Attachment 文件附件 常用接口
        - rowgroup [ref=e130]:
          - row [ref=e131]:
            - columnheader "名称" [ref=e132]
            - columnheader "类型" [ref=e133]
            - columnheader "默认" [ref=e134]
            - columnheader "说明" [ref=e135]
        - rowgroup [ref=e136]:
          - row [ref=e137]:
            - rowheader [ref=e138]:
              - code [ref=e139]: state
            - cell [ref=e140]:
              - code [ref=e141]: idle / uploading / processing / error / done
            - cell "done" [ref=e142]
            - cell "宿主拥有生命周期；组件只呈现状态。" [ref=e143]
          - row [ref=e144]:
            - rowheader [ref=e145]:
              - code [ref=e146]: size
            - cell [ref=e147]:
              - code [ref=e148]: default / sm / xs
            - cell "default" [ref=e149]
            - cell "三档源码尺寸，显式size不再次被密度缩放。" [ref=e150]
          - row [ref=e151]:
            - rowheader [ref=e152]:
              - code [ref=e153]: orientation
            - cell [ref=e154]:
              - code [ref=e155]: horizontal / vertical
            - cell "horizontal" [ref=e156]
            - cell "附件内容排列；Group保持横向滚动。" [ref=e157]
      - paragraph [ref=e158]: Parts / Slots：Attachment、Group、Media、Content、Title、Description、Actions、Action、Trigger
    - region [ref=e159]:
      - heading "调用示例" [level=2] [ref=e160]
      - generic [ref=e161]:
        - generic [ref=e162]:
          - button "复制代码" [ref=e163] [cursor=pointer]
          - status
        - code [ref=e166]: "<Attachment state=\"done\"> <AttachmentMedia><FileIcon /></AttachmentMedia> <AttachmentContent><AttachmentTitle>课程导读.pdf</AttachmentTitle><AttachmentDescription>PDF · 1.8 MB</AttachmentDescription></AttachmentContent> <AttachmentTrigger aria-label=\"预览课程导读.pdf\" onClick={openPreview} /> <AttachmentActions><AttachmentAction aria-label=\"移除课程导读.pdf\" onClick={remove}>移除</AttachmentAction></AttachmentActions> </Attachment>"
      - paragraph [ref=e167]:
        - text: 当前源码：
        - code [ref=e168]: packages/ui/src/attachment/attachment.tsx
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { mkdirSync, writeFileSync } from "node:fs";
  3  | const evidence="evidence/runtime/g6-components-2026-10-14/browser";
  4  | mkdirSync(evidence,{recursive:true});
  5  | const ids=["data-table","aspect-ratio","attachment","direction","drawer","input-otp","carousel","bubble","marker","message","message-scroller","questionnaire"];
  6  | test.beforeEach(({page})=>page.on("pageerror",error=>{throw error;}));
  7  | test("12 routes, themes, density, 390px and source examples",async({page,context},info)=>{
  8  |  await context.grantPermissions(["clipboard-read","clipboard-write"]);const facts=[];
  9  |  for(const id of ids){
  10 |   await page.goto(`/#${id}`); await expect(page.locator(`#${id}-title`)).toBeVisible();
  11 |   await expect(page.getByRole("heading",{name:"API 与结构",exact:true})).toBeVisible();
> 12 |   expect(await page.evaluate(()=>document.documentElement.scrollWidth),id).toBeLessThanOrEqual(page.viewportSize()!.width+1);
     |                                                                            ^ Error: attachment
  13 |   await page.locator(".component-doc__example").first().screenshot({path:`${evidence}/${id}-${info.project.name}-light.png`});
  14 |   await page.getByRole("button",{name:"深色",exact:true}).click();await page.getByRole("button",{name:"紧凑密度",exact:true}).click();
  15 |   await expect(page.locator("main.component-doc")).toHaveAttribute("data-rain-theme","dark");
  16 |   expect(await page.evaluate(()=>document.documentElement.scrollWidth),`${id} dark`).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  17 |   await page.locator(".component-doc__example").first().screenshot({path:`${evidence}/${id}-${info.project.name}-dark-compact.png`});
  18 |   await page.getByRole("button",{name:"复制代码",exact:true}).last().click();await expect(page.getByText("已复制",{exact:true})).toBeVisible();
  19 |   facts.push({id,width:await page.evaluate(()=>document.documentElement.scrollWidth),copied:await page.evaluate(()=>navigator.clipboard.readText())});
  20 |  }
  21 |  writeFileSync(`${evidence}/matrix-${info.project.name}.json`,JSON.stringify(facts,null,2));
  22 | });
  23 | test("media ratio, attachment actions and direction islands",async({page})=>{
  24 |  await page.goto('/#aspect-ratio'); const ratios=await page.locator('.g6-media-grid').first().locator('[data-rain-id="ui-aspect-ratio"]').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return r.width/r.height;}));
  25 |  expect(ratios[0]).toBeCloseTo(16/9,1);expect(ratios[1]).toBeCloseTo(1,1);expect(ratios[2]).toBeCloseTo(4/3,1);
  26 |  await expect(page.locator('.g6-media-image--cover')).toHaveCSS('object-fit','cover');await expect(page.locator('.g6-media-image--contain')).toHaveCSS('object-fit','contain');
  27 |  await page.goto('/#attachment');await page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true}).click();await expect(page.getByRole('dialog')).toBeVisible();await page.getByRole('button',{name:'关闭预览',exact:true}).click();await expect(page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true})).toBeFocused();
  28 |  await page.getByRole('button',{name:'移除 课程导读：从问题到证据.pdf',exact:true}).click();await expect(page.getByRole('dialog')).toHaveCount(0);await expect(page.getByRole('button',{name:'预览 课堂观察记录与同伴反馈说明.docx',exact:true})).toBeFocused();
  29 |  await page.getByRole('button',{name:'上传 课堂观察记录与同伴反馈说明.docx',exact:true}).click();await expect(page.getByTestId('attachment-live-list')).toContainText('正在上传');await expect(page.getByTestId('attachment-live-list')).toContainText('已上传',{timeout:4000});
  30 |  await page.goto('/#direction');await expect(page.locator('.g6-direction-example[dir="rtl"]')).toContainText('Context: rtl');await expect(page.locator('.g6-direction-example[dir="ltr"]')).toContainText('Context: ltr');
  31 | });
  32 | test("task drawer modality, draft protection, menu and nested focus",async({page},info)=>{
  33 |  await page.goto('/#drawer');await page.getByRole('button',{name:'深色',exact:true}).click();await page.getByRole('button',{name:'紧凑密度',exact:true}).click();
  34 |  const trigger=page.getByRole('button',{name:'编辑课前任务',exact:true});await trigger.click();const dialog=page.getByRole('dialog',{name:'编辑课前任务',exact:true});await expect(dialog).toHaveAttribute('data-density','compact');
  35 |  await page.getByRole('button',{name:'展开编辑',exact:true}).click();await dialog.getByRole('textbox',{name:'任务标题',exact:true}).fill('本地课堂任务草稿');await dialog.press('Escape');await expect(page.getByRole('alert')).toContainText('未保存');await page.getByRole('button',{name:'继续编辑',exact:true}).click();
  36 |  await page.getByRole('button',{name:'完成方式：个人记录',exact:true}).click();await page.getByRole('menuitem',{name:'小组讨论',exact:true}).click();await expect(page.getByRole('button',{name:'完成方式：小组讨论',exact:true})).toBeVisible();
  37 |  await page.getByRole('button',{name:'查看学生任务预览',exact:true}).click();await expect(page.getByRole('dialog',{name:'学生任务预览',exact:true})).toContainText('本地课堂任务草稿');await page.getByRole('button',{name:'返回编辑',exact:true}).click();await expect(page.getByRole('button',{name:'查看学生任务预览',exact:true})).toBeFocused();
  38 |  await dialog.screenshot({path:`${evidence}/drawer-task-${info.project.name}.png`});await page.getByRole('button',{name:'取消修改',exact:true}).click();await expect(trigger).toBeFocused();await expect(page.getByTestId('drawer-saved-title')).not.toContainText('本地课堂任务草稿');
  39 |  for(const side of ['底部','顶部','左侧','右侧']){await page.getByRole('button',{name:`从${side}打开`,exact:true}).click();await page.getByRole('button',{name:`关闭${side}抽屉`,exact:true}).click();await expect(page.getByRole('button',{name:`从${side}打开`,exact:true})).toBeFocused();}
  40 |  await page.getByRole('button',{name:'打开非模态记录',exact:true}).click();await page.getByRole('textbox',{name:'随堂记录',exact:true}).fill('可以编辑非模态记录');await page.getByRole('button',{name:'记录一次观察',exact:true}).click();await expect(page.getByTestId('drawer-observation-count')).toContainText('1次');await expect(page.getByRole('dialog',{name:'非模态课堂记录',exact:true})).toBeVisible();await page.getByRole('button',{name:'关闭课堂记录',exact:true}).click();
  41 |  await page.getByRole('button',{name:'打开焦点约束记录',exact:true}).click();await page.getByRole('textbox',{name:'随堂记录',exact:true}).fill('可以编辑焦点约束记录');await page.getByRole('button',{name:'关闭课堂记录',exact:true}).press('Tab');expect(await page.evaluate(()=>!!document.activeElement?.closest('[role="dialog"]'))).toBe(true);await page.getByRole('button',{name:'关闭课堂记录',exact:true}).click();
  42 | });
  43 | test("OTP paste, explicit verification, error preservation and retry",async({page,context})=>{
  44 |  await context.grantPermissions(['clipboard-read','clipboard-write']);await page.goto('/#input-otp');const form=page.getByTestId('otp-verification-form'),input=form.getByRole('textbox',{name:'课堂验证码',exact:true});await expect(form.locator('input')).toHaveCount(1);
  45 |  await page.evaluate(()=>navigator.clipboard.writeText('123456'));await input.focus();await input.press('ControlOrMeta+V');await expect(input).toHaveValue('123456');await expect(page.getByTestId('otp-submitted-code')).toContainText('尚未提交');
  46 |  await form.getByRole('button',{name:'验证并进入课堂',exact:true}).click();await expect(form).toContainText('验证码已过期');await expect(input).toHaveValue('123456');await expect(input).toHaveAttribute('aria-invalid','true');await input.fill('654321');await form.getByRole('button',{name:'验证并进入课堂',exact:true}).click();await expect(form).toContainText('验证通过');
  47 | });
  48 | test("carousel actual API, input key ownership, RTL and vertical",async({page})=>{
  49 |  await page.goto('/#carousel');const first=page.getByRole('region',{name:'课程学习资料',exact:true});await expect(page.getByTestId('carousel-position')).toContainText('第1份 / 共3份');await page.getByRole('textbox',{name:'记录第1份资料笔记',exact:true}).fill('课堂笔记');await page.getByRole('textbox',{name:'记录第1份资料笔记',exact:true}).press('ArrowRight');await expect(page.getByTestId('carousel-position')).toContainText('第1份');
  50 |  await first.getByRole('button',{name:'阅读下一份资料',exact:true}).click();await expect(page.getByTestId('carousel-position')).toContainText('第2份');await page.getByRole('button',{name:'添加一份资料',exact:true}).click();await expect(page.getByTestId('carousel-position')).toContainText('共4份');
  51 |  const rtl=page.getByRole('region',{name:'资料 RTL 示例',exact:true});await expect(rtl).toHaveAttribute('dir','rtl');await rtl.press('ArrowLeft');await expect(rtl.getByRole('button',{name:'上一份',exact:true})).toBeEnabled();
  52 |  const vertical=page.getByRole('region',{name:'纵向课程摘录',exact:true});await vertical.press('ArrowDown');await expect(vertical.getByRole('button',{name:'上一页',exact:true})).toBeEnabled();
  53 | });
  54 | test("conversation reactions, copy, local retry and meaningful marker",async({page,context})=>{
  55 |  await page.goto('/#bubble');const reaction=page.getByRole('button',{name:/有帮助/});await reaction.click();await expect(reaction).toHaveAttribute('aria-pressed','true');await reaction.click();await expect(reaction).toHaveAttribute('aria-pressed','false');
  56 |  await page.goto('/#marker');await page.getByRole('button',{name:'查看说明',exact:true}).click();await expect(page.locator('#g6-marker-details')).toBeVisible();
  57 |  await context.grantPermissions(['clipboard-read','clipboard-write']);await page.goto('/#message');await page.getByRole('button',{name:'复制辅导回答',exact:true}).click();expect(await page.evaluate(()=>navigator.clipboard.readText())).toContain('先写下你直接看到的事实');await page.getByRole('button',{name:'重试发送补充问题',exact:true}).click();await expect(page.getByText('已发送 · 本地模拟',{exact:true})).toBeVisible();
  58 | });
  59 | test("scroller preserves reading on stream/prepend, pauses and commands",async({page})=>{
  60 |  await page.goto('/#message-scroller');const viewport=page.getByRole('region',{name:'课程辅导对话',exact:true}),panel=page.locator('.component-doc__example').first();await viewport.hover();await page.mouse.wheel(0,-800);await expect.poll(()=>viewport.evaluate(n=>n.scrollTop)).toBeLessThan(50);
  61 |  const before=await viewport.evaluate(n=>n.scrollTop);await panel.getByRole('button',{name:'模拟增量回答',exact:true}).click();await expect(panel.locator('[role="log"]')).toHaveAttribute('aria-busy','true');await expect(panel).toContainText('正在生成回答');await page.waitForTimeout(250);expect(await viewport.evaluate(n=>n.scrollTop)).toBeLessThanOrEqual(before+2);
  62 |  await panel.getByRole('button',{name:'暂停',exact:true}).click();await expect(panel).toContainText('已暂停');await panel.getByRole('button',{name:'定位第 4 条',exact:true}).click();expect(await viewport.evaluate(n=>n.scrollTop)).toBeGreaterThan(0);
  63 |  const old=await viewport.locator('[data-message-id="course-3"]').boundingBox();await panel.getByRole('button',{name:'载入更早消息',exact:true}).click();const after=await viewport.locator('[data-message-id="course-3"]').boundingBox();expect(Math.abs((old?.y??0)-(after?.y??0))).toBeLessThan(3);
  64 |  await panel.getByRole('button',{name:'到最新',exact:true}).click();await expect.poll(()=>viewport.evaluate(n=>n.scrollHeight-n.clientHeight-n.scrollTop)).toBeLessThan(3);
  65 | });
  66 | test("questionnaire conditional validation, native summary, restore and submit failure",async({page})=>{
  67 |  await page.goto('/#questionnaire');const form=page.getByRole('form',{name:'课堂反馈',exact:true});await form.getByRole('button',{name:'下一题',exact:true}).click();await expect(form.getByRole('alert')).toBeVisible();await form.getByRole('radio',{name:/其他目标/}).check();await form.getByRole('button',{name:'下一题',exact:true}).click();await form.getByRole('textbox',{name:'具体学习目标',exact:true}).fill('一');await page.getByRole('button',{name:'保存本页草稿',exact:true}).click();await page.getByRole('button',{name:'恢复草稿',exact:true}).click();await form.getByRole('button',{name:'下一题',exact:true}).click();await expect(form.getByRole('progressbar')).toContainText('第 2 题');
  68 |  await form.getByRole('textbox',{name:'具体学习目标',exact:true}).fill('希望理解证据');await form.getByRole('button',{name:'下一题',exact:true}).click();await form.getByRole('checkbox',{name:/观察记录/}).check();await form.getByRole('button',{name:'上一题',exact:true}).click();await expect(form.getByRole('textbox',{name:'具体学习目标',exact:true})).toHaveValue('希望理解证据');await form.getByRole('button',{name:'下一题',exact:true}).click();await form.getByRole('button',{name:'下一题',exact:true}).click();await form.getByRole('button',{name:'跳过',exact:true}).click();await page.getByRole('button',{name:'模拟提交失败：关',exact:true}).click();await form.getByRole('button',{name:'提交反馈',exact:true}).click();await expect(page.getByRole('region',{name:'反馈摘要',exact:true})).toHaveCount(0);await page.getByRole('button',{name:'模拟提交失败：开',exact:true}).click();await form.getByRole('button',{name:'提交反馈',exact:true}).click();await expect(page.getByRole('region',{name:'反馈摘要',exact:true})).toContainText('希望理解证据');
  69 | });
  70 | test("reduced motion and forced colors keep state readable",async({page})=>{
  71 |  await page.emulateMedia({reducedMotion:'reduce',forcedColors:'active'});await page.goto('/#marker');await expect(page.locator('.rain-marker__content--shimmer')).toHaveCSS('animation-name','none');await expect(page.locator('.rain-marker__content--shimmer')).toBeVisible();await page.goto('/#attachment');await expect(page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true})).toBeVisible();await page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true}).press('Enter');await expect(page.getByRole('dialog')).toBeVisible();
  72 | });
  73 | 
```