# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w5.spec.ts >> N09 N25 S5 ribbon modes have exact persistent heights and no temporary document displacement
- Location: tests/e2e/navigation-v042-w5.spec.ts:70:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('.nv44-workspace').locator('.rain-workspace__region[data-region-id="ribbon"]')
Expected: "true"
Received: "false"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for locator('.nv44-workspace').locator('.rain-workspace__region[data-region-id="ribbon"]')
    14 × locator resolved to <div data-side="top" data-mode="tabs" aria-label="文档工具区" data-forced="false" data-temporary="false" data-region-id="ribbon" id="_r_0_-workspace-ribbon" class="rain-workspace__region nv44-ribbon">…</div>
       - unexpected value "false"

```

```yaml
- tablist "工具分类":
  - tab "开始" [selected]
  - tab "插入"
  - tab "审阅"
- button "收起工具区"
```

# Test source

```ts
  1   | import { expect, test, type Locator, type Page } from '@playwright/test';
  2   | const open=async(page:Page,sample:string)=>{await page.goto(`/?sample=${sample}#navigation-v042`);await expect(page.getByRole('heading',{name:'导航组件 · v0.4.2'})).toBeVisible();};
  3   | const region=(root:Locator,id:string)=>root.locator(`.rain-workspace__region[data-region-id="${id}"]`);
  4   | const restore=(root:Locator,id:string)=>root.locator(`.rain-workspace__restore[aria-controls$="-workspace-${id}"]`);
  5   | const shape=async(locator:Locator)=>locator.evaluate(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};});
  6   | 
  7   | for(const width of [1200,1440,1600])for(const [sample,scene] of [['R1','plan'],['R1','industry'],['R2',''],['R3','files'],['R3','errors'],['R4','interaction'],['R4','grading'],['R5',''],['R6','']]){
  8   |   test(`nine-scene matrix ${sample}/${scene||'default'} at ${width}`,async({page},testInfo)=>{
  9   |     const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));await open(page,sample!);
  10  |     if(scene)await page.getByRole('combobox',{name:'业务子场景'}).selectOption(scene);
  11  |     await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));
  12  |     const canvas=page.getByTestId('candidate-canvas'),root=canvas.locator('.rain-workspace');
  13  |     await expect(root).toHaveCount(1);await expect(root).toBeVisible();expect((await shape(root)).width).toBe(width);
  14  |     expect(await root.locator('.rain-workspace__region:not([hidden])').count()).toBeGreaterThan(0);
  15  |     if(width>=1440){for(const pane of await root.locator('.rain-workspace__region').all())await expect(pane).toHaveAttribute('data-mode',await pane.getAttribute('data-region-id')==='global'?'compact':'expanded');}
  16  |     if(width===1200&&(sample==='R5'||sample==='R6')){
  17  |       await expect(region(root,'global')).toHaveAttribute('data-mode','hidden');
  18  |       const note=root.locator('.nv5-adaptation');await expect(note).toContainText('你的展开偏好未被覆盖');expect((await shape(note)).height).toBe(24);
  19  |       if(sample==='R6')await expect(region(root,'fields')).toHaveAttribute('data-mode','hidden');
  20  |     }
  21  |     const controls=root.locator('.rain-workspace__restore');expect(await controls.count()).toBeGreaterThan(0);
  22  |     for(const control of await controls.all()){
  23  |       expect(await control.getAttribute('aria-label')).toBeTruthy();const id=await control.getAttribute('aria-controls');await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
  24  |     }
  25  |     expect(await root.evaluate(e=>Array.from(e.querySelectorAll('path')).some(path=>/NaN|Infinity/.test(path.getAttribute('d')??'')))).toBe(false);
  26  |     expect(errors).toEqual([]);
  27  |     await root.screenshot({path:testInfo.outputPath('workspace.png')});
  28  |   });
  29  | }
  30  | test('R4 interaction selected group and activity stay synchronized through temporary recovery',async({page})=>{
  31  |   await open(page,'R4');const root=page.locator('[data-recipe-id="recipe-navigation-r4"]');
  32  |   await root.getByRole('group',{name:'课堂活动'}).getByRole('button',{name:'小组汇报：从概念到真实应用'}).click();
  33  |   await root.getByRole('group',{name:'小组结果'}).getByRole('button',{name:'探索者小组'}).click();
  34  |   await expect(root.getByRole('heading',{name:'探索者小组',exact:true})).toBeVisible();await expect(root.getByLabel('当前小组得分')).toContainText('8.5');
  35  |   const main=await shape(root.locator('.nv5-group-detail'));await region(root,'queue').getByRole('button',{name:/取消固定/}).click();await expect(region(root,'queue')).toHaveAttribute('data-temporary','true');
  36  |   await page.keyboard.press('Escape');await expect(region(root,'queue')).toBeHidden();await restore(root,'queue').click();
  37  |   expect(await shape(root.locator('.nv5-group-detail'))).toEqual(main);await expect(root.getByRole('group',{name:'小组结果'}).getByRole('button',{name:'探索者小组'})).toHaveAttribute('aria-pressed','true');
  38  | });
  39  | test('N10 N12 N13 R4 grading ownership survives layout and subscene changes without saving',async({page})=>{
  40  |   await open(page,'R4');await page.getByRole('combobox',{name:'业务子场景'}).selectOption('grading');const root=page.locator('[data-recipe-id="recipe-navigation-r4"]');
  41  |   const draft=root.getByRole('textbox',{name:'给当前作答的反馈'});await draft.fill('请说明推导条件。');await root.getByRole('spinbutton',{name:'当前作答得分'}).fill('9.2');
  42  |   await region(root,'review').getByRole('button',{name:/隐藏/}).click();await restore(root,'review').click();await expect(draft).toHaveValue('请说明推导条件。');
  43  |   await root.getByRole('button',{name:'专注作答预览',exact:true}).click();await root.getByRole('button',{name:'退出专注',exact:true}).click();
  44  |   await expect(root.locator('.nv5-demo-note')).toContainText('未提交成绩');
  45  |   await root.getByRole('group',{name:'学生队列'}).getByRole('button',{name:'欧阳小明'}).click();await expect(draft).toHaveValue('');await expect(root.getByRole('spinbutton',{name:'当前作答得分'})).toHaveValue('7.0');
  46  |   await root.getByRole('group',{name:'学生队列'}).getByRole('button',{name:'李梦'}).click();await expect(draft).toHaveValue('请说明推导条件。');
  47  |   await page.getByRole('combobox',{name:'业务子场景'}).selectOption('interaction');await page.getByRole('combobox',{name:'业务子场景'}).selectOption('grading');
  48  |   await expect(root).toHaveAttribute('data-focused','false');await expect(draft).toHaveValue('请说明推导条件。');await expect(root.getByRole('spinbutton',{name:'当前作答得分'})).toHaveValue('9.2');
  49  | });
  50  | test('N08 R5 explicit seek and focus restore preserve playback and hidden knowledge',async({page})=>{
  51  |   await open(page,'R5');const root=page.locator('[data-recipe-id="recipe-navigation-r5"]');
  52  |   await root.getByRole('group',{name:'课堂回顾事件'}).getByRole('button',{name:'随堂练习 · 等效电路'}).click();
  53  |   await expect(root.getByRole('slider',{name:'模拟播放位置'})).toHaveValue('984');await expect(root.getByLabel('回放时间')).toContainText('16:24');await expect(root.getByRole('button',{name:'16:24 一起试一试'})).toHaveAttribute('aria-pressed','true');
  54  |   await region(root,'knowledge').getByRole('button',{name:/隐藏/}).click();await root.getByRole('button',{name:'专注回放',exact:true}).click();await root.getByRole('button',{name:'退出专注',exact:true}).click();await expect(region(root,'knowledge')).toBeHidden();
  55  |   await restore(root,'knowledge').click();await expect(root.getByRole('slider',{name:'模拟播放位置'})).toHaveValue('984');await expect(root.getByRole('button',{name:'播放回放',exact:true})).toBeVisible();
  56  | });
  57  | test('R6 views, page identity, added fields and form drafts have independent ownership',async({page})=>{
  58  |   await open(page,'R6');const root=page.locator('[data-recipe-id="recipe-navigation-r6"]'),draft=root.getByRole('textbox',{name:'你希望我们改进的地方'});await draft.fill('增加概念辨析练习。');
  59  |   await root.getByRole('button',{name:'新增文本题'}).click();await root.getByRole('textbox',{name:'新增文本题 1'}).fill('本实例附加题');
  60  |   await region(root,'fields').getByRole('button',{name:/隐藏/}).click();await restore(root,'fields').click();await expect(draft).toHaveValue('增加概念辨析练习。');
  61  |   await root.getByRole('tab',{name:'表格',exact:true}).click();await root.getByRole('tab',{name:'反馈表单',exact:true}).click();await expect(root.getByRole('textbox',{name:'新增文本题 1'})).toHaveValue('本实例附加题');
  62  |   await root.getByRole('navigation',{name:'工作区页面'}).getByRole('link',{name:'课程任务',exact:true}).click();await expect(root.getByRole('table',{name:'课程任务记录'})).toBeVisible();
  63  |   await root.getByRole('navigation',{name:'工作区页面'}).getByRole('link',{name:'学习反馈',exact:true}).click();await expect(root.getByRole('tab',{name:'反馈表单',exact:true})).toHaveAttribute('aria-selected','true');await expect(draft).toHaveValue('增加概念辨析练习。');
  64  | });
  65  | test('N02 N03 S3 other region hide/show executes on the first click while context is temporary',async({page})=>{
  66  |   await open(page,'S3');const root=page.locator('[data-recipe-id="recipe-navigation-r6"]');await restore(root,'context').click();await expect(region(root,'context')).toHaveAttribute('data-temporary','true');
  67  |   await restore(root,'directory').click();await expect(region(root,'context')).toBeHidden();await expect(region(root,'directory')).toBeHidden();
  68  |   await restore(root,'context').click();await restore(root,'directory').click();await expect(region(root,'context')).toBeHidden();await expect(region(root,'directory')).toBeVisible();
  69  | });
  70  | test('N09 N25 S5 ribbon modes have exact persistent heights and no temporary document displacement',async({page})=>{
  71  |   await open(page,'S5');const root=page.locator('.nv44-workspace'),ribbon=region(root,'ribbon'),paper=root.locator('.nv44-editor-paper'),draft=root.getByRole('textbox',{name:'教学目标草稿'});await draft.fill('工具区切换保留此目标。');
  72  |   for(const [mode,height] of [['full',111],['icons',83],['tabs',41],['hidden',0]] as const){
  73  |     await root.getByRole('button',{name:'布局设置'}).click();await page.getByRole('combobox',{name:'文档工具显示模式'}).selectOption(mode);await page.keyboard.press('Escape');
  74  |     if(height)expect((await shape(ribbon)).height).toBe(height);else await expect(ribbon).toBeHidden();
  75  |     if(mode==='tabs'||mode==='hidden'){
  76  |       const y=(await shape(paper)).y;
  77  |       if(mode==='tabs'){
  78  |         await ribbon.getByRole('tab',{name:'开始',exact:true}).click();
> 79  |         await expect(ribbon).toHaveAttribute('data-temporary','true');
      |                              ^ Error: expect(locator).toHaveAttribute(expected) failed
  80  |         expect((await shape(paper)).y).toBe(y);await page.keyboard.press('Escape');
  81  |         await ribbon.getByRole('tab',{name:'插入',exact:true}).click();
  82  |       }else await restore(root,'ribbon').click();
  83  |       await expect(ribbon).toHaveAttribute('data-temporary','true');expect((await shape(ribbon)).height).toBe(112);expect((await shape(paper)).y).toBe(y);await page.keyboard.press('Escape');expect((await shape(paper)).y).toBe(y);
  84  |     }
  85  |     await expect(draft).toHaveValue('工具区切换保留此目标。');
  86  |   }
  87  |   await root.getByRole('button',{name:'专注内容',exact:true}).click();await expect(root.locator('.nv44-workspace-head')).toBeHidden();
  88  |   await root.getByRole('button',{name:'退出专注',exact:true}).click();await expect(root.locator('.nv44-workspace-head')).toBeVisible();await expect(draft).toHaveValue('工具区切换保留此目标。');
  89  |   await root.getByRole('button',{name:'专注内容',exact:true}).click();await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:'S6',exact:true}).click();await expect(page.locator('[data-recipe-id="recipe-navigation-r5"]')).toHaveAttribute('data-focused','false');
  90  | });
  91  | test('N22 short-height layout menu keeps the last control reachable',async({page})=>{
  92  |   await page.setViewportSize({width:1200,height:420});await open(page,'S3');await page.locator('[data-recipe-id="recipe-navigation-r6"]').getByRole('button',{name:'布局设置'}).click();
  93  |   const dialog=page.getByRole('dialog');await dialog.getByRole('button',{name:'隐藏全部区域',exact:true}).click();
  94  |   await expect(dialog.getByRole('button',{name:'隐藏全部区域',exact:true})).toBeInViewport();await page.keyboard.press('Escape');await expect(page.locator('.rain-workspace__restore[aria-controls$="-workspace-directory"]')).toBeVisible();
  95  | });
  96  | test('N33 independent nine-scene consumer has no reference runtime and runs new business states',async({page})=>{
  97  |   await page.goto('/navigation-v042-w3-consumer.html');
  98  |   for(const [label,id] of [['课堂互动','r4'],['教师批改','r4'],['课堂回放','r5'],['协作空间','r6']] as const){await page.getByRole('radio',{name:label,exact:true}).locator('..').click();await expect(page.locator(`[data-recipe-id="recipe-navigation-${id}"]`)).toBeVisible();}
  99  |   expect(await page.evaluate(()=>['YKT_DEBUG','YKT_VISIBILITY','ui','vApply'].filter(key=>key in window))).toEqual([]);await expect(page.locator('iframe')).toHaveCount(0);
  100 | });
  101 | test('N37 instance B name, condition density and connection preserve instance A DOM and draft',async({page})=>{
  102 |   await page.goto('/navigation-v042-w3-consumer.html');await page.getByRole('radio',{name:'实例隔离',exact:true}).locator('..').click();const a=page.getByRole('region',{name:'实例 A',exact:true}),b=page.getByRole('region',{name:'实例 B',exact:true});
  103 |   await a.getByRole('textbox',{name:'实例 A 草稿'}).fill('只属于 A 的草稿');await b.getByRole('textbox',{name:'实例 B 草稿'}).fill('只属于 B 的草稿');
  104 |   const snapshot=async()=>a.evaluate(e=>{const control=e.querySelector('[data-slot="items"]')!,surface=e.querySelector('[data-rain-id="layout-connected-surface"]')!;return {html:control.outerHTML,controlHeight:control.getBoundingClientRect().height,surfaceWidth:surface.getBoundingClientRect().width,background:getComputedStyle(surface).backgroundColor};});
  105 |   const before=await snapshot();await a.getByRole('textbox',{name:'实例 A 草稿'}).evaluate(e=>e.setAttribute('data-proof-instance','original'));
  106 |   await page.getByRole('textbox',{name:'实例 B 名称'}).fill('研究资料 B');await page.getByRole('checkbox',{name:'紧凑条件'}).check();await page.getByRole('combobox',{name:'实例 B 连接'}).selectOption('merged');
  107 |   await expect(b.getByRole('tab',{name:'研究资料 B',exact:true})).toHaveAttribute('aria-selected','true');await expect(b.locator('[data-rain-id="ui-segmented-control"]')).toHaveAttribute('data-nav-density','compact');await expect(b.locator('[data-rain-id="layout-connected-surface"]')).toHaveAttribute('data-connection','merged');
  108 |   expect(await snapshot()).toEqual(before);await expect(a.getByRole('textbox',{name:'实例 A 草稿'})).toHaveAttribute('data-proof-instance','original');await expect(a.getByRole('textbox',{name:'实例 A 草稿'})).toHaveValue('只属于 A 的草稿');await expect(b.getByRole('textbox',{name:'实例 B 草稿'})).toHaveValue('只属于 B 的草稿');
  109 | });
  110 | test('actual paired R5 recipes isolate native filters and playback position',async({page})=>{
  111 |   await page.goto('/navigation-v042-w3-consumer.html');await page.getByRole('radio',{name:'双回放实例',exact:true}).locator('..').click();const a=page.getByRole('region',{name:'回放实例 A',exact:true}),b=page.getByRole('region',{name:'回放实例 B',exact:true});
  112 |   const aAll=a.getByRole('radiogroup',{name:'回顾事件类型'}).getByRole('radio',{name:'全部',exact:true});
  113 |   await b.getByRole('radiogroup',{name:'回顾事件类型'}).getByRole('radio',{name:'习题',exact:true}).locator('..').click();await expect(aAll).toBeChecked();
  114 |   await b.getByRole('group',{name:'课堂回顾事件'}).getByRole('button',{name:'随堂练习 · 等效电路'}).click();await expect(b.getByRole('slider',{name:'模拟播放位置'})).toHaveValue('984');await expect(a.getByRole('slider',{name:'模拟播放位置'})).toHaveValue('0');
  115 |   await b.locator('.rain-workspace__restore[aria-controls$="-workspace-events"]').click();await expect(a.locator('.rain-workspace__region[data-region-id="events"]')).toBeVisible();await expect(b.locator('.rain-workspace__region[data-region-id="events"]')).toBeHidden();
  116 | });
  117 | 
```