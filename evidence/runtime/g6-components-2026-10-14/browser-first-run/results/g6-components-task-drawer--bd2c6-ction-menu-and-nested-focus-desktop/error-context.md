# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g6-components.spec.ts >> task drawer modality, draft protection, menu and nested focus
- Location: tests/e2e/g6-components.spec.ts:32:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e4]:
    - generic [ref=e5]:
      - link [ref=e6] [cursor=pointer]:
        - /url: "#components"
        - generic [ref=e7]: 返回组件目录
      - generic [ref=e8]:
        - heading [level=1] [ref=e9]: Drawer 拖动抽屉
        - generic [ref=e10]: UI · 共享候选 · 尚未发布
      - paragraph [ref=e11]: 保留课程上下文，处理一段短任务；滑动、分段高度和退出保护保持真实可操作。
      - generic [ref=e12]:
        - button [ref=e13] [cursor=pointer]:
          - generic [ref=e14]: 浅色
        - button [pressed] [ref=e15] [cursor=pointer]:
          - generic [ref=e16]: 深色
        - button [pressed] [ref=e17] [cursor=pointer]:
          - generic [ref=e18]: 紧凑密度
    - generic [ref=e19]:
      - generic [ref=e20]:
        - heading [level=2] [ref=e21]: 课程任务草稿
        - paragraph [ref=e22]: 半屏与展开位置由源引擎控制；正文独立滚动，底部操作保留在可见位置。支持完成方式菜单和学生预览嵌套。
        - generic [ref=e23]:
          - generic [ref=e24]:
            - generic [ref=e25]:
              - generic [ref=e26]: 课堂观察 · 第04讲
              - heading [level=3] [ref=e27]: 找一个值得追问的问题
              - paragraph [ref=e28]: 阅读课程导读，记录一个尚未得到解释的现象。带着问题来课堂讨论。
              - generic [ref=e29]: 课前任务 · 个人记录 · 本地草稿
            - button [ref=e30] [cursor=pointer]:
              - generic [ref=e31]: 编辑课前任务
          - status [ref=e32]: 已取消修改，原任务保留。
      - generic [ref=e33]:
        - heading [level=2] [ref=e34]: 四个打开方向
        - paragraph [ref=e35]: 每个入口都打开真实抽屉；上下与左右分别使用纵轴和横轴手势。
        - generic [ref=e37]:
          - button [ref=e38] [cursor=pointer]:
            - generic [ref=e39]: 从底部打开
          - button [ref=e40] [cursor=pointer]:
            - generic [ref=e41]: 从顶部打开
          - button [ref=e42] [cursor=pointer]:
            - generic [ref=e43]: 从左侧打开
          - button [ref=e44] [cursor=pointer]:
            - generic [ref=e45]: 从右侧打开
      - generic [ref=e46]:
        - heading [level=2] [ref=e47]: 页面交互与焦点约束
        - paragraph [ref=e48]: 打开记录后继续点页面按钮，比较非模态与仅约束焦点模式。Tab 行为需在浏览器中检查。
        - generic [ref=e50]:
          - generic [ref=e51]:
            - generic [ref=e52]:
              - strong [ref=e53]: 课堂观察
              - paragraph [ref=e54]: 已记录1次观察
            - button [ref=e55] [cursor=pointer]:
              - generic [ref=e56]: 记录一次观察
          - generic [ref=e57]:
            - button [ref=e58] [cursor=pointer]:
              - generic [ref=e59]: 打开非模态记录
            - button [expanded] [ref=e60] [cursor=pointer]:
              - generic [ref=e61]: 打开焦点约束记录
    - region [ref=e62]:
      - heading [level=2] [ref=e63]: 使用边界
      - generic [ref=e64]:
        - generic [ref=e65]:
          - heading [level=3] [ref=e66]: 适合用在
          - list [ref=e67]:
            - listitem [ref=e68]: 移动端或课程页面中的短任务编辑、资料预览。
            - listitem [ref=e69]: 需要拖动关闭、分段高度和嵌套抽屉的流程。
        - generic [ref=e70]:
          - heading [level=3] [ref=e71]: 避免用在
          - list [ref=e72]:
            - listitem [ref=e73]: 把长流程或多级页面导航全部塞进抽屉。
            - listitem [ref=e74]: 用 Sheet 别名代替触摸手势，或用遮罩外观判断模态行为。
    - generic [ref=e75]:
      - region [ref=e76]:
        - heading [level=2] [ref=e77]: API 与结构
        - table [ref=e79]:
          - caption [ref=e80]: Drawer 拖动抽屉 常用接口
          - rowgroup [ref=e81]:
            - row [ref=e82]:
              - columnheader [ref=e83]: 名称
              - columnheader [ref=e84]: 类型
              - columnheader [ref=e85]: 默认
              - columnheader [ref=e86]: 说明
          - rowgroup [ref=e87]:
            - row [ref=e88]:
              - rowheader [ref=e89]:
                - code [ref=e90]: open / onOpenChange
              - cell [ref=e91]:
                - code [ref=e92]: boolean / (open, details) => void
              - cell [ref=e93]: —
              - cell [ref=e94]: 受控状态；details.cancel() 可以阻止尚未确认的退出。
            - row [ref=e95]:
              - rowheader [ref=e96]:
                - code [ref=e97]: swipeDirection
              - cell [ref=e98]:
                - code [ref=e99]: down / up / left / right
              - cell [ref=e100]: down
              - cell [ref=e101]: 保留来源四方向；页面底部编辑为主场景。
            - row [ref=e102]:
              - rowheader [ref=e103]:
                - code [ref=e104]: snapPoints / snapPoint
              - cell [ref=e105]:
                - code [ref=e106]: Array<number | string> / number | string | null
              - cell [ref=e107]: —
              - cell [ref=e108]: 纵向分段高度及受控位置；数字0—1为视口比例。
            - row [ref=e109]:
              - rowheader [ref=e110]:
                - code [ref=e111]: modal
              - cell [ref=e112]:
                - code [ref=e113]: true / false / trap-focus
              - cell [ref=e114]: "true"
              - cell [ref=e115]: 真实焦点与页面交互策略，与有无遮罩分开。
            - row [ref=e116]:
              - rowheader [ref=e117]:
                - code [ref=e118]: showSwipeHandle
              - cell [ref=e119]:
                - code [ref=e120]: boolean
              - cell [ref=e121]: "false"
              - cell [ref=e122]: 可选可视拖动把手，不增加假的独立交互控件。
        - paragraph [ref=e123]: Parts / Slots：Drawer、Trigger、Portal、Overlay、SwipeHandle、Content、Header、Footer、Title、Description、Close
      - region [ref=e124]:
        - heading [level=2] [ref=e125]: 调用示例
        - generic [ref=e126]:
          - button [ref=e128] [cursor=pointer]:
            - generic [ref=e129]: 复制代码
          - code [ref=e131]: "<Drawer open={open} onOpenChange={(next, details) => { if (!next && hasUnsavedChanges) { details.cancel(); showExitChoice(); return; } setOpen(next); }} showSwipeHandle snapPoints={[0.5, 0.85]} snapPoint={snap} onSnapPointChange={setSnap}> <DrawerTrigger render={<Button>编辑课前任务</Button>} /> <DrawerContent><DrawerHeader><DrawerTitle>课前任务</DrawerTitle></DrawerHeader> {/* 宿主正文独立滚动；Footer留在可见位置。 */} <DrawerFooter><DrawerClose render={<Button>关闭</Button>} /></DrawerFooter> </DrawerContent> </Drawer>"
        - paragraph [ref=e132]:
          - text: 当前源码：
          - code [ref=e133]: packages/ui/src/drawer/drawer.tsx
  - dialog [ref=e134]:
    - generic [ref=e136]:
      - generic [ref=e137]:
        - heading [level=2] [ref=e138]: 非模态课堂记录
        - paragraph [ref=e139]: 可以继续点击页面的记录按钮，也可以在页面与抽屉之间移动焦点。
      - generic [ref=e140]:
        - generic [ref=e141]:
          - generic [ref=e142]: 随堂记录
          - textbox [ref=e144]:
            - /placeholder: 记下课堂中的观察
            - text: 可以编辑非模态记录
        - paragraph [ref=e145]: 已记录1次观察。此例关闭指针外部退出，便于比较模式。
      - button [ref=e147] [cursor=pointer]:
        - generic [ref=e148]: 关闭课堂记录
  - dialog [ref=e149]:
    - generic [ref=e151]:
      - generic [ref=e152]:
        - heading "焦点约束课堂记录" [level=2] [ref=e153]
        - paragraph [ref=e154]: 页面仍接受指针点击；Tab 焦点被约束在抽屉内。
      - generic [ref=e155]:
        - generic [ref=e156]:
          - generic [ref=e157]: 随堂记录
          - textbox "随堂记录" [active] [ref=e159]:
            - /placeholder: 记下课堂中的观察
            - text: 可以编辑焦点约束记录
        - paragraph [ref=e160]: 已记录1次观察。此例关闭指针外部退出，便于比较模式。
      - button "关闭课堂记录" [ref=e162] [cursor=pointer]
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
  12 |   expect(await page.evaluate(()=>document.documentElement.scrollWidth),id).toBeLessThanOrEqual(page.viewportSize()!.width+1);
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
> 41 |  await page.getByRole('button',{name:'打开焦点约束记录',exact:true}).click();await page.getByRole('textbox',{name:'随堂记录',exact:true}).fill('可以编辑焦点约束记录');await page.getByRole('button',{name:'关闭课堂记录',exact:true}).press('Tab');expect(await page.evaluate(()=>!!document.activeElement?.closest('[role="dialog"]'))).toBe(true);await page.getByRole('button',{name:'关闭课堂记录',exact:true}).click();
     |                                                                                                                                                                                                                                                                                                               ^ Error: expect(received).toBe(expected) // Object.is equality
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