# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g6-components.spec.ts >> carousel actual API, input key ownership, RTL and vertical
- Location: tests/e2e/g6-components.spec.ts:48:1

# Error details

```
Error: expect(locator).toBeEnabled() failed

Locator: getByRole('region', { name: '纵向课程摘录', exact: true }).getByRole('button', { name: '上一页', exact: true })
Expected: enabled
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeEnabled" with timeout 5000ms
  - waiting for getByRole('region', { name: '纵向课程摘录', exact: true }).getByRole('button', { name: '上一页', exact: true })

```

```yaml
- main:
  - link "返回组件目录":
    - /url: "#components"
  - heading "Carousel 资料轮播" [level=1]
  - text: UI · 共享候选 · 尚未发布
  - paragraph: 按学习顺序浏览资料，保留真实拖动、焦点和内容变化后的导航状态。
  - button "浅色" [pressed]
  - button "深色"
  - button "紧凑密度"
  - heading "单页阅读与资料更新" [level=2]
  - paragraph: 拖动、使用方向键或点击导航浏览。第一份资料中的笔记输入保留自己的方向键；新增资料后计数来自实际 API。
  - text: 课堂观察 · 第04讲
  - heading "沿着学习任务阅读" [level=3]
  - button "添加一份资料" [disabled]
  - region "课程学习资料":
    - group "1 / 4：课程导读：从问题到证据":
      - article:
        - text: 01 / 课前导读
        - strong: 从问题 到证据
        - text: 课堂观察 · 学习资料 PDF · 6页
        - heading "课程导读：从问题到证据" [level=3]
        - paragraph: 先读三个真实观察案例，练习把笼统的感受转化为可追问的问题。
        - text: 记录第1份资料笔记
        - textbox "记录第1份资料笔记":
          - /placeholder: 记录一个问题，方向键可编辑
          - text: 课堂笔记
    - group "2 / 4：课堂观察记录表":
      - article:
        - text: 02 / 观察与记录
        - strong: 从问题 到证据
        - text: 课堂观察 · 学习资料 DOCX · 2页
        - heading "课堂观察记录表" [level=3]
        - paragraph: 记录现象、已有解释和需要补充的证据，课堂中可继续完善。
    - group "3 / 4：同伴反馈提示卡":
      - article:
        - text: 03 / 同伴交流
        - strong: 从问题 到证据
        - text: 课堂观察 · 学习资料 PDF · 4页
        - heading "同伴反馈提示卡" [level=3]
        - paragraph: 用一个追问和一条证据反馈同伴的观点，让小组交流更具体。
    - group "4 / 4：小组讨论回顾":
      - article:
        - text: 04 / 课堂回顾
        - strong: 从问题 到证据
        - text: 课堂观察 · 学习资料 PDF · 3页
        - heading "小组讨论回顾" [level=3]
        - paragraph: 整理共同观点与仍有分歧的问题，保留下一次课堂的讨论线索。
    - button "阅读上一份资料"
    - button "阅读下一份资料"
  - status: 第2份 / 共4份
  - button "恢复三份资料"
  - heading "多项资料浏览" [level=2]
  - paragraph: 资料宽度由宿主布局决定；导航沿引擎边缘状态启用。
  - region "多项课程资料":
    - group "1 / 3：课程导读：从问题到证据":
      - article:
        - text: 01 / 课前导读
        - strong: 从问题到证据
        - text: 课堂观察 · 学习资料 PDF · 6页
        - heading "课程导读：从问题到证据" [level=3]
        - paragraph: 先读三个真实观察案例，练习把笼统的感受转化为可追问的问题。
    - group "2 / 3：课堂观察记录表":
      - article:
        - text: 02 / 观察与记录
        - strong: 从问题到证据
        - text: 课堂观察 · 学习资料 DOCX · 2页
        - heading "课堂观察记录表" [level=3]
        - paragraph: 记录现象、已有解释和需要补充的证据，课堂中可继续完善。
    - group "3 / 3：同伴反馈提示卡":
      - article:
        - text: 03 / 同伴交流
        - strong: 从问题到证据
        - text: 课堂观察 · 学习资料 PDF · 4页
        - heading "同伴反馈提示卡" [level=3]
        - paragraph: 用一个追问和一条证据反馈同伴的观点，让小组交流更具体。
    - button "上一项" [disabled]
    - button "下一项"
  - paragraph: 宽屏同时显示两份资料；窄屏保留一份完整内容与可见导航。
  - heading "纵向课件摘录" [level=2]
  - paragraph: 提供固定的可用高度；上下键只在轮播入口与导航上生效，不抢子控件按键。
  - region "纵向课程摘录":
    - group "1 / 3：课程导读：从问题到证据":
      - article:
        - text: 01 / 课前导读
        - heading "课程导读：从问题到证据" [level=3]
        - paragraph: 先读三个真实观察案例，练习把笼统的感受转化为可追问的问题。
    - group "2 / 3：课堂观察记录表":
      - article:
        - text: 02 / 观察与记录
        - heading "课堂观察记录表" [level=3]
        - paragraph: 记录现象、已有解释和需要补充的证据，课堂中可继续完善。
    - group "3 / 3：同伴反馈提示卡":
      - article:
        - text: 03 / 同伴交流
        - heading "同伴反馈提示卡" [level=3]
        - paragraph: 用一个追问和一条证据反馈同伴的观点，让小组交流更具体。
    - button "上一项"
    - button "下一项"
  - heading "从右向左的学习资料" [level=2]
  - paragraph: 显式 DOM dir 与 DirectionProvider 一起提供方向；顺序、按钮位置与方向键跟随真实 RTL 引擎。
  - region "资料 RTL 示例":
    - group "1 / 3：课程导读：从问题到证据":
      - article:
        - text: مواد التعلم
        - heading "课程导读：从问题到证据" [level=3]
        - paragraph: 先读三个真实观察案例，练习把笼统的感受转化为可追问的问题。
    - group "2 / 3：课堂观察记录表":
      - article:
        - text: مواد التعلم
        - heading "课堂观察记录表" [level=3]
        - paragraph: 记录现象、已有解释和需要补充的证据，课堂中可继续完善。
    - group "3 / 3：同伴反馈提示卡":
      - article:
        - text: مواد التعلم
        - heading "同伴反馈提示卡" [level=3]
        - paragraph: 用一个追问和一条证据反馈同伴的观点，让小组交流更具体。
    - button "上一份"
    - button "下一份"
  - heading "在课程抽屉中阅读" [level=2]
  - paragraph: 保留轮播与抽屉各自的引擎。当前 Base UI 1.8 按 data-base-ui-swipe-ignore 属性的存在忽略该区域手势，不解析轴值；真实触摸仲裁仍需设备检查。
  - button "在抽屉中阅读资料"
  - region "使用边界":
    - heading "使用边界" [level=2]
    - heading "适合用在" [level=3]
    - list:
      - listitem: 课程封面、课件页或少量资料需要横向浏览。
      - listitem: 需要单页、多项、纵向和 RTL 的成熟拖动与吸附。
    - heading "避免用在" [level=3]
    - list:
      - listitem: 把大量必须比较的结构化对象藏进轮播。
      - listitem: 默认自动播放，或自己实现另一套拖动与惯性引擎。
  - region "API 与结构":
    - heading "API 与结构" [level=2]
    - table "Carousel 资料轮播 常用接口":
      - caption: Carousel 资料轮播 常用接口
      - rowgroup:
        - row "名称 类型 默认 说明":
          - columnheader "名称"
          - columnheader "类型"
          - columnheader "默认"
          - columnheader "说明"
      - rowgroup:
        - row "opts / plugins EmblaOptions / EmblaPlugin[] — 完整来源引擎入口；本轮不安装也不启用自动播放。":
          - rowheader "opts / plugins":
            - code: opts / plugins
          - cell "EmblaOptions / EmblaPlugin[]":
            - code: EmblaOptions / EmblaPlugin[]
          - cell "—"
          - cell "完整来源引擎入口；本轮不安装也不启用自动播放。"
        - row "setApi (api) => void — 读取当前位置、订阅变化；宿主对应清理select与reInit。":
          - rowheader "setApi":
            - code: setApi
          - cell "(api) => void":
            - code: (api) => void
          - cell "—"
          - cell "读取当前位置、订阅变化；宿主对应清理select与reInit。"
        - row "orientation horizontal / vertical horizontal 纵向必须给viewport可用高度；按Up/Down导航。":
          - rowheader "orientation":
            - code: orientation
          - cell "horizontal / vertical":
            - code: horizontal / vertical
          - cell "horizontal"
          - cell "纵向必须给viewport可用高度；按Up/Down导航。"
        - row "dir / opts.direction ltr / rtl — 引擎与DOM方向一致；显式opts优先，然后dir与context。":
          - rowheader "dir / opts.direction":
            - code: dir / opts.direction
          - cell "ltr / rtl":
            - code: ltr / rtl
          - cell "—"
          - cell "引擎与DOM方向一致；显式opts优先，然后dir与context。"
        - row "Previous / Next Rain ButtonProps — 默认IconButton32/16；显式文字/variant保留真实Button组合。":
          - rowheader "Previous / Next":
            - code: Previous / Next
          - cell "Rain ButtonProps":
            - code: Rain ButtonProps
          - cell "—"
          - cell "默认IconButton32/16；显式文字/variant保留真实Button组合。"
    - paragraph: Parts / Slots：Carousel、Content、Item、Previous、Next、useCarousel / CarouselApi
  - region "调用示例":
    - heading "调用示例" [level=2]
    - button "复制代码"
    - status
    - code: "<Carousel aria-label=\"课程学习资料\" tabIndex={0} opts={{ align: \"start\" }} setApi={setApi}> <CarouselContent>{materials.map(material => <CarouselItem key={material.id} aria-label={material.title}>{/* 资料内容 */}</CarouselItem> )}</CarouselContent> <CarouselPrevious /><CarouselNext /> </Carousel> // Content的className设置inner布局；宿主留出外置导航空间。 // setApi订阅select/reInit，并对称off；不另造selectedIndex状态机。"
    - paragraph:
      - text: 当前源码：
      - code: packages/ui/src/carousel/carousel.tsx
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
> 52 |  const vertical=page.getByRole('region',{name:'纵向课程摘录',exact:true});await vertical.press('ArrowDown');await expect(vertical.getByRole('button',{name:'上一页',exact:true})).toBeEnabled();
     |                                                                                                                                                                          ^ Error: expect(locator).toBeEnabled() failed
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