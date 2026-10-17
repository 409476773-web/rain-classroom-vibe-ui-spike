# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g6-components.spec.ts >> task drawer modality, draft protection, menu and nested focus
- Location: evidence/runtime/g1-g6-closeout-2026-10-17/run-01/browser/g6-components.spec.ts:34:1

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: '展开编辑', exact: true })

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
        - heading [level=1] [ref=e9]: Drawer 抽屉
        - generic [ref=e10]: UI · 共享候选 · 尚未发布
      - paragraph [ref=e11]: 从任务列表展开右侧详情，保持列表可操作，在同一个抽屉中连续查看任务。
      - generic [ref=e12]:
        - button [ref=e13] [cursor=pointer]:
          - generic [ref=e14]: 浅色
        - button [pressed] [ref=e15] [cursor=pointer]:
          - generic [ref=e16]: 深色
        - button [pressed] [ref=e17] [cursor=pointer]:
          - generic [ref=e18]: 紧凑密度
    - generic [ref=e19]:
      - generic [ref=e20]:
        - heading [level=2] [ref=e21]: 任务列表与右侧详情
        - paragraph [ref=e22]: 左边缘拖动调宽，或点击展开/收起；顶部把手向右拖动关闭。第2项包含多列完成明细，预览与完整内容切换独立于宽度。上一项/下一项为中性色文字按钮。
        - region [ref=e24]:
          - generic [ref=e25]:
            - heading [level=3] [ref=e26]: 课前任务
            - generic [ref=e27]: 3项
          - paragraph [ref=e28]: 选择任务查看详情，可连续切换。任务及小组完成数据均为示例。
          - list [ref=e29]:
            - listitem [ref=e30]:
              - button [ref=e31] [cursor=pointer]:
                - generic [ref=e32]:
                  - generic [ref=e33]: 第04讲 · 观察与追问
                  - generic [ref=e34]: 找一个值得追问的问题
                  - generic [ref=e35]: 从课程导读中选择一个尚未得到解释的现象。
                  - generic [ref=e36]: 个人记录 · 待开始
            - listitem [ref=e37]:
              - button [ref=e38] [cursor=pointer]:
                - generic [ref=e39]:
                  - generic [ref=e40]: 第05讲 · 证据与解释
                  - generic [ref=e41]: 比较两种解释
                  - generic [ref=e42]: 对照两份材料，找出解释的共同点与分歧。
                  - generic [ref=e43]: 小组讨论 · 进行中
            - listitem [ref=e44]:
              - button [ref=e45] [cursor=pointer]:
                - generic [ref=e46]:
                  - generic [ref=e47]: 第06讲 · 表达与回应
                  - generic [ref=e48]: 带着证据分享你的判断
                  - generic [ref=e49]: 用具体证据说明判断，并准备回应同伴的追问。
                  - generic [ref=e50]: 课堂分享 · 已完成
      - generic [ref=e51]:
        - heading [level=2] [ref=e52]: 对照：用弹窗编辑一项课前任务
        - paragraph [ref=e53]: 居中Dialog集中完成单项编辑；同层预览、草稿保护和保存失败重试由编辑宿主管理。
        - generic [ref=e55]:
          - generic [ref=e56]:
            - radiogroup [ref=e57]:
              - generic [ref=e58]: 保存演示
              - generic [ref=e59]:
                - generic [ref=e60] [cursor=pointer]:
                  - radio [checked] [ref=e61]
                  - generic [ref=e65]: 正常保存
                - generic [ref=e67] [cursor=pointer]:
                  - radio [ref=e68]
                  - generic [ref=e71]: 首次保存失败
            - radiogroup [ref=e73]:
              - generic [ref=e74]: 预览内容
              - generic [ref=e75]:
                - generic [ref=e76] [cursor=pointer]:
                  - radio [checked] [ref=e77]
                  - generic [ref=e81]: 默认内容
                - generic [ref=e83] [cursor=pointer]:
                  - radio [ref=e84]
                  - generic [ref=e87]: 长内容
          - paragraph [ref=e89]: 本地交互演示：保存等待500ms，不连接课程服务；附件只展示信息。
          - generic [ref=e90]:
            - generic [ref=e91]:
              - generic [ref=e92]: 课前准备 · 草稿
              - heading [level=3] [ref=e93]: 找一个值得追问的问题
              - paragraph [ref=e94]: 阅读课程导读，记录一个尚未得到解释的现象。带着问题来课堂讨论。
              - generic [ref=e95]: 完成方式：个人记录
            - button [expanded] [ref=e96] [cursor=pointer]:
              - generic [ref=e97]: 编辑课前任务
          - status [ref=e98]: 任务尚未发布。
      - generic [ref=e99]:
        - heading [level=2] [ref=e100]: 四个打开方向
        - paragraph [ref=e101]: 每个入口都打开真实抽屉；上下与左右分别使用纵轴和横轴手势。
        - generic [ref=e103]:
          - button [ref=e104] [cursor=pointer]:
            - generic [ref=e105]: 从底部打开
          - button [ref=e106] [cursor=pointer]:
            - generic [ref=e107]: 从顶部打开
          - button [ref=e108] [cursor=pointer]:
            - generic [ref=e109]: 从左侧打开
          - button [ref=e110] [cursor=pointer]:
            - generic [ref=e111]: 从右侧打开
      - generic [ref=e112]:
        - heading [level=2] [ref=e113]: 页面交互与焦点约束
        - paragraph [ref=e114]: 打开记录后继续点页面按钮，比较非模态与仅约束焦点模式。Tab 行为需在浏览器中检查。
        - generic [ref=e116]:
          - generic [ref=e117]:
            - generic [ref=e118]:
              - strong [ref=e119]: 课堂观察
              - paragraph [ref=e120]: 已记录0次观察
            - button [ref=e121] [cursor=pointer]:
              - generic [ref=e122]: 记录一次观察
          - generic [ref=e123]:
            - button [ref=e124] [cursor=pointer]:
              - generic [ref=e125]: 打开非模态记录
            - button [ref=e126] [cursor=pointer]:
              - generic [ref=e127]: 打开焦点约束记录
    - region [ref=e128]:
      - heading [level=2] [ref=e129]: 使用边界
      - generic [ref=e130]:
        - generic [ref=e131]:
          - heading [level=3] [ref=e132]: 适合用在
          - list [ref=e133]:
            - listitem [ref=e134]: Web列表与右侧对象详情关联，连续查看多项任务。
            - listitem [ref=e135]: 移动端确实需要拖动关闭或分段展开的流程。
        - generic [ref=e136]:
          - heading [level=3] [ref=e137]: 避免用在
          - list [ref=e138]:
            - listitem [ref=e139]: 单项编辑只有保存和取消时，优先评估居中Dialog。
            - listitem [ref=e140]: 把长流程或多级页面导航全部塞进抽屉，或用遮罩外观判断模态行为。
    - generic [ref=e141]:
      - region [ref=e142]:
        - heading [level=2] [ref=e143]: API 与结构
        - table [ref=e145]:
          - caption [ref=e146]: Drawer 抽屉 常用接口
          - rowgroup [ref=e147]:
            - row [ref=e148]:
              - columnheader [ref=e149]: 名称
              - columnheader [ref=e150]: 类型
              - columnheader [ref=e151]: 默认
              - columnheader [ref=e152]: 说明
          - rowgroup [ref=e153]:
            - row [ref=e154]:
              - rowheader [ref=e155]:
                - code [ref=e156]: open / onOpenChange
              - cell [ref=e157]:
                - code [ref=e158]: boolean / (open, details) => void
              - cell [ref=e159]: —
              - cell [ref=e160]: 受控状态；details.cancel() 可以阻止尚未确认的退出。
            - row [ref=e161]:
              - rowheader [ref=e162]:
                - code [ref=e163]: swipeDirection
              - cell [ref=e164]:
                - code [ref=e165]: down / up / left / right
              - cell [ref=e166]: down
              - cell [ref=e167]: 引擎保留四方向；当前Web详情场景显式选择right。
            - row [ref=e168]:
              - rowheader [ref=e169]:
                - code [ref=e170]: snapPoints / snapPoint
              - cell [ref=e171]:
                - code [ref=e172]: Array<number | string> / number | string | null
              - cell [ref=e173]: —
              - cell [ref=e174]: 纵向分段高度及受控位置；数字0—1为视口比例。
            - row [ref=e175]:
              - rowheader [ref=e176]:
                - code [ref=e177]: modal
              - cell [ref=e178]:
                - code [ref=e179]: true / false / trap-focus
              - cell [ref=e180]: "true"
              - cell [ref=e181]: 详情场景显式使用false，允许继续操作任务列表。
            - row [ref=e182]:
              - rowheader [ref=e183]:
                - code [ref=e184]: showSwipeHandle
              - cell [ref=e185]:
                - code [ref=e186]: boolean
              - cell [ref=e187]: "false"
              - cell [ref=e188]: 可选可视拖动把手，不增加假的独立交互控件。
        - paragraph [ref=e189]: Parts / Slots：Drawer、Trigger、Portal、Overlay、SwipeHandle、Content、Header、Body、Footer、Title、Description、Close
      - region [ref=e190]:
        - heading [level=2] [ref=e191]: 调用示例
        - generic [ref=e192]:
          - button [ref=e194] [cursor=pointer]:
            - generic [ref=e195]: 复制代码
          - code [ref=e197]: "<Drawer open={open} onOpenChange={setOpen} swipeDirection=\"right\" modal={false} disablePointerDismissal> <TaskList onView={task => { setCurrentTask(task); setOpen(true); }} /> <DrawerContent><DrawerHeader className=\"flex-row items-start justify-between\"><DrawerTitle>{currentTask.title}</DrawerTitle> <DrawerClose render={<IconButton icon={<CloseIcon />} aria-label=\"关闭任务详情\" />} /> </DrawerHeader><DrawerBody>{content}</DrawerBody> </DrawerContent> </Drawer>"
        - paragraph [ref=e198]:
          - text: 当前源码：
          - code [ref=e199]: packages/ui/src/drawer/drawer.tsx
  - dialog [ref=e203]:
    - generic [ref=e205]:
      - generic [ref=e206]:
        - generic [ref=e207]:
          - heading "编辑课前任务" [level=2] [ref=e208]
          - paragraph [ref=e209]: 修改任务要求，保存后继续准备课堂。
        - generic [ref=e210]:
          - button "预览任务" [ref=e211] [cursor=pointer]
          - button "关闭编辑" [ref=e213] [cursor=pointer]
      - generic [ref=e217]:
        - generic [ref=e218]:
          - generic [ref=e219]:
            - text: 任务标题
            - generic [ref=e220]: "*"
          - textbox "任务标题" [active] [ref=e222]: 找一个值得追问的问题
        - generic [ref=e223]:
          - generic [ref=e224]: 任务要求
          - textbox "任务要求" [ref=e226]: 阅读课程导读，记录一个尚未得到解释的现象。带着问题来课堂讨论。
          - generic [ref=e227]: 写清楚学生需要观察什么、带来什么。
        - radiogroup "完成方式" [ref=e228]:
          - generic [ref=e230]:
            - generic [ref=e231] [cursor=pointer]:
              - radio "个人记录" [checked] [ref=e232]
              - generic [ref=e236]: 个人记录
            - generic [ref=e238] [cursor=pointer]:
              - radio "小组讨论" [ref=e239]
              - generic [ref=e242]: 小组讨论
      - generic [ref=e245]:
        - button "取消" [ref=e246] [cursor=pointer]
        - button "保存草稿" [ref=e248] [cursor=pointer]
```

# Test source

```ts
  1   | import { test, expect, type Page } from "@playwright/test";
  2   | import { mkdirSync, writeFileSync } from "node:fs";
  3   | import { verifyConversationReading } from "/Users/wenchengkai/CodexFile/\u96e8\u8bfe\u5802-shadcn\u7ec4\u4ef6\u5e93\u67b6\u6784/.worktrees/card-v2/tests/e2e/helpers/conversation-scrolling";
  4   | const evidence="/Users/wenchengkai/CodexFile/\u96e8\u8bfe\u5802-shadcn\u7ec4\u4ef6\u5e93\u67b6\u6784/.worktrees/card-v2/evidence/runtime/g1-g6-closeout-2026-10-17/run-01/browser/g6";
  5   | mkdirSync(evidence,{recursive:true});
  6   | async function open(page:Page,id:string){await page.goto(`/#${id}`);await expect(page.locator(`#${id}-title`)).toBeVisible();}
  7   | const ids=["data-table","aspect-ratio","attachment","direction","drawer","input-otp","carousel","bubble","marker","message","message-scroller","questionnaire"];
  8   | test.beforeEach(({page})=>page.on("pageerror",error=>{throw error;}));
  9   | test("12 routes, themes, density, 390px and source examples",async({page,context},info)=>{
  10  |  await context.grantPermissions(["clipboard-read","clipboard-write"]);const facts=[];
  11  |  for(const id of ids){
  12  |   await page.goto(`/#${id}`); await expect(page.locator(`#${id}-title`)).toBeVisible();
  13  |   await expect(page.getByRole("heading",{name:"API 与结构",exact:true})).toBeVisible();
  14  |   expect(await page.evaluate(()=>document.documentElement.scrollWidth),id).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  15  |   await page.locator(".component-doc__example").first().screenshot({path:`${evidence}/${id}-${info.project.name}-light.png`});
  16  |   await page.getByRole("button",{name:"深色",exact:true}).click();await page.getByRole("button",{name:"紧凑密度",exact:true}).click();
  17  |   await expect(page.locator("main.component-doc")).toHaveAttribute("data-rain-theme","dark");
  18  |   expect(await page.evaluate(()=>document.documentElement.scrollWidth),`${id} dark`).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  19  |   await page.locator(".component-doc__example").first().screenshot({path:`${evidence}/${id}-${info.project.name}-dark-compact.png`});
  20  |   await page.getByRole("button",{name:"复制代码",exact:true}).last().click();await expect(page.getByText("已复制",{exact:true})).toBeVisible();
  21  |   facts.push({id,width:await page.evaluate(()=>document.documentElement.scrollWidth),copied:await page.evaluate(()=>navigator.clipboard.readText())});
  22  |  }
  23  |  writeFileSync(`${evidence}/matrix-${info.project.name}.json`,JSON.stringify(facts,null,2));
  24  | });
  25  | test("media ratio, attachment actions and direction islands",async({page})=>{
  26  |  await open(page,"aspect-ratio"); const ratios=await page.locator('.g6-media-grid').first().locator('[data-rain-id="ui-aspect-ratio"]').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return r.width/r.height;}));
  27  |  expect(ratios[0]).toBeCloseTo(16/9,1);expect(ratios[1]).toBeCloseTo(1,1);expect(ratios[2]).toBeCloseTo(4/3,1);
  28  |  await expect(page.locator('.g6-media-image--cover')).toHaveCSS('object-fit','cover');await expect(page.locator('.g6-media-image--contain')).toHaveCSS('object-fit','contain');
  29  |  await open(page,"attachment");await page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true}).click();await expect(page.getByRole('dialog')).toBeVisible();await page.getByRole('button',{name:'关闭',exact:true}).click();await expect(page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true})).toBeFocused();
  30  |  await page.getByRole('button',{name:'移除 课程导读：从问题到证据.pdf',exact:true}).click();await expect(page.getByRole('dialog')).toHaveCount(0);await expect(page.getByRole('button',{name:'预览 高等数学课程封面.png',exact:true})).toBeFocused();
  31  |  await page.locator('.rain-attachment-picker input[type="file"]').setInputFiles({name:'课堂补充说明.txt',mimeType:'text/plain',buffer:Buffer.from('课堂补充说明')});await page.getByRole('button',{name:'上传 课堂补充说明.txt',exact:true}).click();await expect(page.getByTestId('attachment-live-list')).toContainText('正在上传');await expect(page.getByRole('button',{name:'保存附件',exact:true})).toBeEnabled({timeout:4000});
  32  |  await open(page,"direction");await expect(page.locator('.g6-direction-example[dir="rtl"]')).toContainText('Context: rtl');await expect(page.locator('.g6-direction-example[dir="ltr"]')).toContainText('Context: ltr');
  33  | });
  34  | test("task drawer modality, draft protection, menu and nested focus",async({page},info)=>{
  35  |  await open(page,"drawer");await page.getByRole('button',{name:'深色',exact:true}).click();await page.getByRole('button',{name:'紧凑密度',exact:true}).click();
  36  |  const trigger=page.getByRole('button',{name:'编辑课前任务',exact:true});await trigger.click();const dialog=page.getByRole('dialog',{name:'编辑课前任务',exact:true});await expect(dialog).toHaveAttribute('data-density','compact');
> 37  |  await page.getByRole('button',{name:'展开编辑',exact:true}).click();await dialog.getByRole('textbox',{name:'任务标题',exact:true}).fill('本地课堂任务草稿');await dialog.press('Escape');await expect(page.getByRole('alert')).toContainText('未保存');await page.getByRole('button',{name:'继续编辑',exact:true}).click();
      |                                                          ^ Error: locator.click: Test timeout of 60000ms exceeded.
  38  |  await page.getByRole('button',{name:'完成方式：个人记录',exact:true}).click();await page.getByRole('menuitem',{name:'小组讨论',exact:true}).click();await expect(page.getByRole('button',{name:'完成方式：小组讨论',exact:true})).toBeVisible();
  39  |  await page.getByRole('button',{name:'查看学生任务预览',exact:true}).click();await expect(page.getByRole('dialog',{name:'学生任务预览',exact:true})).toContainText('本地课堂任务草稿');await page.getByRole('button',{name:'返回编辑',exact:true}).click();await expect(page.getByRole('button',{name:'查看学生任务预览',exact:true})).toBeFocused();
  40  |  await dialog.screenshot({path:`${evidence}/drawer-task-${info.project.name}.png`});await page.getByRole('button',{name:'取消修改',exact:true}).click();await expect(trigger).toBeFocused();await expect(page.getByTestId('drawer-saved-title')).not.toContainText('本地课堂任务草稿');
  41  |  for(const side of ['底部','顶部','左侧','右侧']){await page.getByRole('button',{name:`从${side}打开`,exact:true}).click();await page.getByRole('button',{name:`关闭${side}抽屉`,exact:true}).click();await expect(page.getByRole('button',{name:`从${side}打开`,exact:true})).toBeFocused();}
  42  |  await page.getByRole('button',{name:'打开非模态记录',exact:true}).click();await page.getByRole('textbox',{name:'随堂记录',exact:true}).fill('可以编辑非模态记录');await page.getByRole('button',{name:'记录一次观察',exact:true}).click();await expect(page.getByTestId('drawer-observation-count')).toContainText('1次');await expect(page.getByRole('dialog',{name:'非模态课堂记录',exact:true})).toBeVisible();await page.getByRole('button',{name:'关闭课堂记录',exact:true}).click();
  43  |  await page.getByRole('button',{name:'打开焦点约束记录',exact:true}).click();await page.getByRole('textbox',{name:'随堂记录',exact:true}).fill('可以编辑焦点约束记录');await page.getByRole('button',{name:'关闭课堂记录',exact:true}).press('Tab');await expect.poll(()=>page.evaluate(()=>!!document.activeElement?.closest('[role="dialog"]'))).toBe(true);await page.getByRole('button',{name:'关闭课堂记录',exact:true}).click();
  44  | });
  45  | test("OTP paste, explicit verification, error preservation and retry",async({page,context})=>{
  46  |  await context.grantPermissions(['clipboard-read','clipboard-write']);await open(page,"input-otp");const form=page.getByTestId('otp-verification-form'),input=form.getByRole('textbox',{name:'课堂验证码',exact:true});await expect(form.locator('input')).toHaveCount(1);
  47  |  await page.evaluate(()=>navigator.clipboard.writeText('123456'));await input.focus();await input.press('ControlOrMeta+V');await expect(input).toHaveValue('123456');await expect(page.getByTestId('otp-submitted-code')).toContainText('尚未提交');
  48  |  await form.getByRole('button',{name:'验证并进入课堂',exact:true}).click();await expect(form).toContainText('验证码已过期');await expect(input).toHaveValue('123456');await expect(input).toHaveAttribute('aria-invalid','true');await input.fill('654321');await form.getByRole('button',{name:'验证并进入课堂',exact:true}).click();await expect(form).toContainText('验证通过');
  49  | });
  50  | test("carousel actual API, input key ownership, RTL and vertical",async({page})=>{
  51  |  await open(page,"carousel");const first=page.getByRole('region',{name:'课程学习资料',exact:true});await expect(page.getByTestId('carousel-position')).toContainText('第1份 / 共3份');await page.getByRole('textbox',{name:'记录第1份资料笔记',exact:true}).fill('课堂笔记');await page.getByRole('textbox',{name:'记录第1份资料笔记',exact:true}).press('ArrowRight');await expect(page.getByTestId('carousel-position')).toContainText('第1份');
  52  |  await first.getByRole('button',{name:'阅读下一份资料',exact:true}).click();await expect(page.getByTestId('carousel-position')).toContainText('第2份');await page.getByRole('button',{name:'添加一份资料',exact:true}).click();await expect(page.getByTestId('carousel-position')).toContainText('共4份');
  53  |  const rtl=page.getByRole('region',{name:'资料 RTL 示例',exact:true});await expect(rtl).toHaveAttribute('dir','rtl');await rtl.press('ArrowLeft');await expect(rtl.getByRole('button',{name:'上一份',exact:true})).toBeEnabled();
  54  |  const vertical=page.getByRole('region',{name:'纵向课程摘录',exact:true});await vertical.press('ArrowDown');await expect(vertical.getByRole('button',{name:'上一项',exact:true})).toBeEnabled();
  55  | });
  56  | test("conversation reactions, copy, local retry and meaningful marker",async({page,context})=>{
  57  |  await open(page,"bubble");const reaction=page.getByRole('button',{name:/有帮助/});await reaction.click();await expect(reaction).toHaveAttribute('aria-pressed','true');await reaction.click();await expect(reaction).toHaveAttribute('aria-pressed','false');
  58  |  await open(page,"marker");await page.getByRole('button',{name:'查看说明',exact:true}).click();await expect(page.locator('#g6-marker-details')).toBeVisible();
  59  |  await context.grantPermissions(['clipboard-read','clipboard-write']);await open(page,"message");await page.getByRole('button',{name:'复制辅导回答',exact:true}).click();expect(await page.evaluate(()=>navigator.clipboard.readText())).toContain('先写下你直接看到的事实');await page.getByRole('button',{name:'重试发送补充问题',exact:true}).click();await expect(page.getByText('已发送 · 本地模拟',{exact:true})).toBeVisible();
  60  | });
  61  | test("scroller preserves reading on stream/prepend, pauses and commands",async({page})=>{
  62  |  await verifyConversationReading(page);
  63  | });
  64  | test("questionnaire conditional validation, native summary, restore and submit failure",async({page})=>{
  65  |  await open(page,"questionnaire");const form=page.getByRole('form',{name:'课堂反馈',exact:true});await form.getByRole('button',{name:'下一题',exact:true}).click();await expect(form.getByRole('alert')).toBeVisible();await form.getByRole('radio',{name:/其他目标/}).check();await form.getByRole('button',{name:'下一题',exact:true}).click();await form.getByRole('textbox',{name:'具体学习目标',exact:true}).fill('一');await page.getByRole('button',{name:'保存本页草稿',exact:true}).click();await page.getByRole('button',{name:'恢复草稿',exact:true}).click();await form.getByRole('button',{name:'下一题',exact:true}).click();await expect(form.getByRole('progressbar')).toContainText('第 2 题');
  66  |  await form.getByRole('textbox',{name:'具体学习目标',exact:true}).fill('希望理解证据');await form.getByRole('button',{name:'下一题',exact:true}).click();await form.getByRole('checkbox',{name:/观察记录/}).check();await form.getByRole('button',{name:'上一题',exact:true}).click();await expect(form.getByRole('textbox',{name:'具体学习目标',exact:true})).toHaveValue('希望理解证据');await form.getByRole('button',{name:'下一题',exact:true}).click();await form.getByRole('button',{name:'下一题',exact:true}).click();await page.getByRole('button',{name:'模拟提交失败：关',exact:true}).click();await form.getByRole('button',{name:'跳过并提交',exact:true}).click();await form.getByRole('button',{name:'提交反馈',exact:true}).click();await expect(page.getByRole('region',{name:'反馈摘要',exact:true})).toHaveCount(0);await page.getByRole('button',{name:'模拟提交失败：开',exact:true}).click();await form.getByRole('button',{name:'提交反馈',exact:true}).click();await expect(page.getByRole('region',{name:'反馈摘要',exact:true})).toContainText('希望理解证据');
  67  | });
  68  | test("reduced motion and forced colors keep state readable",async({page})=>{
  69  |  await page.emulateMedia({reducedMotion:'reduce',forcedColors:'active'});await open(page,"marker");await expect(page.locator('.rain-marker__content--shimmer')).toHaveCSS('animation-name','none');await expect(page.locator('.rain-marker__content--shimmer')).toBeVisible();await open(page,"attachment");await expect(page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true})).toBeVisible();await page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true}).press('Enter');await expect(page.getByRole('dialog')).toBeVisible();
  70  | });
  71  | test("isolated installed packages: default, local recipe, sibling and copied table",async({page})=>{
  72  |  await page.goto('http://127.0.0.1:5398');await expect(page.getByRole('heading',{name:'G6 独立包消费',exact:true})).toBeVisible();
  73  |  const first=page.getByTestId('default'),local=page.getByTestId('local'),sibling=page.getByTestId('sibling');
  74  |  const padding=(host:ReturnType<typeof page.getByTestId>)=>host.locator('.rain-bubble__content').first().evaluate(n=>getComputedStyle(n).paddingInlineStart);
  75  |  expect(await padding(first)).toBe(await padding(sibling));expect(await padding(local)).not.toBe(await padding(first));
  76  |  const drawerPadding=[];
  77  |  for (const [host,label] of [[first,'默认'],[local,'局改'],[sibling,'未改兄弟']] as const) {
  78  |   const trigger=host.getByRole('button',{name:`打开${label}任务`,exact:true});await trigger.click();const popup=page.getByRole('dialog',{name:`${label}任务`,exact:true});await expect(popup).toBeVisible();drawerPadding.push(await popup.evaluate(el=>getComputedStyle(el).paddingInlineStart));await popup.getByRole('button',{name:'关闭任务',exact:true}).click();await expect(trigger).toBeFocused();
  79  |  }
  80  |  expect(drawerPadding[0]).toBe(drawerPadding[2]);expect(drawerPadding[1]).not.toBe(drawerPadding[0]);
  81  |  await first.getByRole('textbox',{name:'默认验证码',exact:true}).fill('1234');await expect(first.getByRole('textbox',{name:'默认验证码',exact:true})).toHaveValue('1234');
  82  |  await first.getByRole('radio',{name:'复习课程',exact:true}).check();await first.getByRole('button',{name:'提交默认反馈',exact:true}).click();await expect(first.getByRole('status')).toContainText('反馈：review');
  83  |  await expect(page.getByTestId('table-default').getByRole('textbox',{name:'查找资料',exact:true})).toBeVisible();
  84  |  const localFacts=[];
  85  |  for (const [id,selector,property] of [
  86  |   ['aspect-ratio','[data-rain-id="ui-aspect-ratio"]','padding-inline-start'],['attachment','[data-rain-id="ui-attachment"]','padding-inline-start'],
  87  |   ['input-otp','[data-slot="input-otp-group"]','gap'],['carousel','[data-rain-id="ui-carousel"]','padding-inline-start'],
  88  |   ['marker','[data-rain-id="ui-marker"]','padding-inline-start'],['message','[data-rain-id="ui-message"]','padding-inline-start'],
  89  |   ['message-scroller','[data-rain-id="ui-message-scroller"]','height'],['questionnaire','[data-rain-id="ui-questionnaire"]','padding-inline-start'],
  90  |  ] as const) {
  91  |   const value=async(host:ReturnType<typeof page.getByTestId>)=>host.locator(selector).first().evaluate((element,name)=>getComputedStyle(element).getPropertyValue(name),property);
  92  |   const values=[await value(first),await value(local),await value(sibling)];expect(values[0],id).toBe(values[2]);expect(values[1],id).not.toBe(values[0]);localFacts.push({id,property,values});
  93  |  }
  94  |  expect(await local.locator('[dir="rtl"]').count()).toBe(1);expect(await sibling.locator('[dir="rtl"]').count()).toBe(0);
  95  |  const tablePadding=async(mode:string)=>page.getByTestId(`table-${mode}`).locator('.data-table-recipe').evaluate(el=>getComputedStyle(el).paddingInlineStart);
  96  |  expect(await tablePadding('default')).toBe(await tablePadding('sibling'));expect(await tablePadding('local')).not.toBe(await tablePadding('default'));
  97  |  writeFileSync(`${evidence}/consumer-local-isolation-${page.viewportSize()!.width}.json`,JSON.stringify({localFacts,drawerPadding,tableFork:'source-copy-export-and-one-root-class-only',tablePadding:[await tablePadding('default'),await tablePadding('local'),await tablePadding('sibling')],direction:'local RTL; sibling LTR'},null,2));
  98  | });
  99  | test("data table keeps stable selection, query scope, columns and failed refresh",async({page})=>{
  100 |  await open(page,'data-table');await page.getByRole('checkbox',{name:'选择当前页可操作资料',exact:true}).locator('..').click();await expect(page.getByText('已选 4 份资料',{exact:true})).toBeVisible();await expect(page.getByRole('checkbox',{name:'选择 课堂观察记录',exact:true})).toBeDisabled();await page.getByRole('button',{name:'取消选择',exact:true}).click();
  101 |  await page.getByRole('checkbox',{name:'选择 设计方法导论',exact:true}).press('Space');await page.getByRole('button',{name:'下一页',exact:true}).click();await expect(page.getByText('含其他页 1 份',{exact:true})).toBeVisible();await page.getByRole('button',{name:'上一页',exact:true}).click();await expect(page.getByRole('checkbox',{name:'选择 设计方法导论',exact:true})).toBeChecked();
  102 |  await page.getByRole('button',{name:'按资料名称排序',exact:true}).click();await page.getByRole('button',{name:'下一页',exact:true}).click();await expect(page.getByText('已选 1 份资料',{exact:true})).toBeVisible();
  103 |  await page.getByRole('textbox',{name:'查找资料',exact:true}).fill('教学案例');await page.getByRole('button',{name:'搜索',exact:true}).click();await expect(page.getByRole('button',{name:'上一页',exact:true})).toBeDisabled();await expect(page.getByRole('button',{name:'取消选择',exact:true})).toHaveCount(0);await page.getByRole('button',{name:'清空筛选',exact:true}).click();
  104 |  await page.getByRole('button',{name:'显示列',exact:true}).click();await page.getByRole('menuitemcheckbox',{name:'资料类型',exact:true}).click();await page.keyboard.press('Escape');await expect(page.getByRole('columnheader',{name:'资料类型',exact:true})).toHaveCount(0);await page.getByText('试用加载与空数据状态',{exact:true}).click();await page.getByRole('checkbox',{name:'下次刷新模拟失败',exact:true}).locator('..').click();await page.getByRole('button',{name:'刷新资料',exact:true}).click();await expect(page.getByRole('alert')).toContainText('资料和选择已保留');await page.getByRole('button',{name:'重试',exact:true}).click();await expect(page.getByRole('alert')).toHaveCount(0);
  105 | });
  106 | test("drawer mouse swipe closes, while carousel drag retains its owning drawer",async({page})=>{
  107 |  await open(page,'drawer');await page.getByRole('button',{name:'从底部打开',exact:true}).click();const popup=page.getByRole('dialog',{name:'底部任务概览',exact:true});const handle=popup.locator('[data-slot="drawer-swipe-handle"]');await expect(handle).toBeVisible();await expect(popup).not.toHaveAttribute('data-starting-style','');await popup.evaluate(el=>Promise.all(el.getAnimations().map(animation=>animation.finished.catch(()=>{}))));
  108 |  const box=await handle.boundingBox();if(!box)throw new Error('Missing real swipe handle');await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+box.width/2,Math.min(page.viewportSize()!.height-2,box.y+box.height/2+220),{steps:10});await page.mouse.up();await expect(popup).toHaveCount(0);
  109 |  await open(page,'carousel');await page.getByRole('button',{name:'在抽屉中阅读资料',exact:true}).click();const carouselPopup=page.getByRole('dialog',{name:'课堂资料阅读',exact:true});await expect(carouselPopup).toBeVisible();const viewport=carouselPopup.locator('[data-base-ui-swipe-ignore]');await expect(viewport).toHaveCount(1);const bounds=await viewport.boundingBox();if(!bounds)throw new Error('Missing Embla owned region');await page.mouse.move(bounds.x+bounds.width*.8,bounds.y+bounds.height*.5);await page.mouse.down();await page.mouse.move(bounds.x+bounds.width*.15,bounds.y+bounds.height*.5+3,{steps:12});await page.mouse.up();await expect(carouselPopup).toBeVisible();
  110 | });
  111 | 
```