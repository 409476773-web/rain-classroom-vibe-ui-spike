# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w5.spec.ts >> N10 N12 N13 R4 grading ownership survives layout and subscene changes without saving
- Location: tests/e2e/navigation-v042-w5.spec.ts:31:1

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator:  locator('[data-recipe-id="recipe-navigation-r4"]').getByRole('spinbutton', { name: '当前作答得分' })
Expected: "7"
Received: "7.0"
Timeout:  5000ms

Call log:
  - Expect "toHaveValue" with timeout 5000ms
  - waiting for locator('[data-recipe-id="recipe-navigation-r4"]').getByRole('spinbutton', { name: '当前作答得分' })
    14 × locator resolved to <input min="0" max="10" step="0.5" value="7.0" type="number" aria-label="当前作答得分"/>
       - unexpected value "7.0"

```

```yaml
- spinbutton "当前作答得分": "7.0"
```

# Test source

```ts
  1  | import { expect, test, type Locator, type Page } from '@playwright/test';
  2  | const open=async(page:Page,sample:string)=>{await page.goto(`/?sample=${sample}#navigation-v042`);await expect(page.getByRole('heading',{name:'导航组件 · v0.4.2'})).toBeVisible();};
  3  | const region=(root:Locator,id:string)=>root.locator(`.rain-workspace__region[data-region-id="${id}"]`);
  4  | const restore=(root:Locator,id:string)=>root.locator(`.rain-workspace__restore[aria-controls$="-workspace-${id}"]`);
  5  | const shape=async(locator:Locator)=>locator.evaluate(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};});
  6  | 
  7  | for(const width of [1200,1440,1600])for(const [sample,scene] of [['R1','plan'],['R1','industry'],['R2',''],['R3','files'],['R3','errors'],['R4','interaction'],['R4','grading'],['R5',''],['R6','']]){
  8  |   test(`nine-scene matrix ${sample}/${scene||'default'} at ${width}`,async({page})=>{
  9  |     const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));await open(page,sample!);
  10 |     if(scene)await page.getByRole('combobox',{name:'业务子场景'}).selectOption(scene);
  11 |     await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));
  12 |     const canvas=page.getByTestId('candidate-canvas'),root=canvas.locator('.rain-workspace');
  13 |     await expect(root).toHaveCount(1);await expect(root).toBeVisible();expect((await shape(root)).width).toBe(width);
  14 |     const controls=root.locator('.rain-workspace__restore');expect(await controls.count()).toBeGreaterThan(0);
  15 |     for(const control of await controls.all()){
  16 |       expect(await control.getAttribute('aria-label')).toBeTruthy();const id=await control.getAttribute('aria-controls');await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
  17 |     }
  18 |     expect(await root.evaluate(e=>Array.from(e.querySelectorAll('path')).some(path=>/NaN|Infinity/.test(path.getAttribute('d')??'')))).toBe(false);
  19 |     expect(errors).toEqual([]);
  20 |   });
  21 | }
  22 | test('R4 interaction selected group and activity stay synchronized through temporary recovery',async({page})=>{
  23 |   await open(page,'R4');const root=page.locator('[data-recipe-id="recipe-navigation-r4"]');
  24 |   await root.getByRole('group',{name:'课堂活动'}).getByRole('button',{name:'小组汇报：从概念到真实应用'}).click();
  25 |   await root.getByRole('group',{name:'小组结果'}).getByRole('button',{name:'探索者小组'}).click();
  26 |   await expect(root.getByRole('heading',{name:'探索者小组',exact:true})).toBeVisible();await expect(root.getByLabel('当前小组得分')).toContainText('8.5');
  27 |   await region(root,'queue').getByRole('button',{name:/取消固定/}).click();const main=await shape(root.locator('.nv5-group-detail'));
  28 |   await page.keyboard.press('Escape');await expect(region(root,'queue')).toBeHidden();await restore(root,'queue').click();
  29 |   expect(await shape(root.locator('.nv5-group-detail'))).toEqual(main);await expect(root.getByRole('group',{name:'小组结果'}).getByRole('button',{name:'探索者小组'})).toHaveAttribute('aria-pressed','true');
  30 | });
  31 | test('N10 N12 N13 R4 grading ownership survives layout and subscene changes without saving',async({page})=>{
  32 |   await open(page,'R4');await page.getByRole('combobox',{name:'业务子场景'}).selectOption('grading');const root=page.locator('[data-recipe-id="recipe-navigation-r4"]');
  33 |   const draft=root.getByRole('textbox',{name:'给当前作答的反馈'});await draft.fill('请说明推导条件。');await root.getByRole('spinbutton',{name:'当前作答得分'}).fill('9.2');
  34 |   await region(root,'review').getByRole('button',{name:/隐藏/}).click();await restore(root,'review').click();await expect(draft).toHaveValue('请说明推导条件。');
  35 |   await root.getByRole('button',{name:'专注作答预览',exact:true}).click();await root.getByRole('button',{name:'退出专注',exact:true}).click();
  36 |   await expect(root.locator('.nv5-demo-note')).toContainText('未提交成绩');
> 37 |   await root.getByRole('group',{name:'学生队列'}).getByRole('button',{name:'欧阳小明'}).click();await expect(draft).toHaveValue('');await expect(root.getByRole('spinbutton',{name:'当前作答得分'})).toHaveValue('7');
     |                                                                                                                                                                                        ^ Error: expect(locator).toHaveValue(expected) failed
  38 |   await root.getByRole('group',{name:'学生队列'}).getByRole('button',{name:'李梦'}).click();await expect(draft).toHaveValue('请说明推导条件。');
  39 |   await page.getByRole('combobox',{name:'业务子场景'}).selectOption('interaction');await page.getByRole('combobox',{name:'业务子场景'}).selectOption('grading');
  40 |   await expect(root).toHaveAttribute('data-focused','false');await expect(draft).toHaveValue('请说明推导条件。');await expect(root.getByRole('spinbutton',{name:'当前作答得分'})).toHaveValue('9.2');
  41 | });
  42 | test('N08 R5 explicit seek and focus restore preserve playback and hidden knowledge',async({page})=>{
  43 |   await open(page,'R5');const root=page.locator('[data-recipe-id="recipe-navigation-r5"]');
  44 |   await root.getByRole('group',{name:'课堂回顾事件'}).getByRole('button',{name:'随堂练习 · 等效电路'}).click();
  45 |   await expect(root.getByRole('slider',{name:'模拟播放位置'})).toHaveValue('984');await expect(root.getByLabel('回放时间')).toContainText('16:24');await expect(root.getByRole('button',{name:'16:24 一起试一试'})).toHaveAttribute('aria-pressed','true');
  46 |   await region(root,'knowledge').getByRole('button',{name:/隐藏/}).click();await root.getByRole('button',{name:'专注回放',exact:true}).click();await root.getByRole('button',{name:'退出专注',exact:true}).click();await expect(region(root,'knowledge')).toBeHidden();
  47 |   await restore(root,'knowledge').click();await expect(root.getByRole('slider',{name:'模拟播放位置'})).toHaveValue('984');await expect(root.getByRole('button',{name:'播放回放',exact:true})).toBeVisible();
  48 | });
  49 | test('R6 views, page identity, added fields and form drafts have independent ownership',async({page})=>{
  50 |   await open(page,'R6');const root=page.locator('[data-recipe-id="recipe-navigation-r6"]'),draft=root.getByRole('textbox',{name:'你希望我们改进的地方'});await draft.fill('增加概念辨析练习。');
  51 |   await root.getByRole('button',{name:'新增文本题'}).click();await root.getByRole('textbox',{name:'新增文本题 1'}).fill('本实例附加题');
  52 |   await region(root,'fields').getByRole('button',{name:/隐藏/}).click();await restore(root,'fields').click();await expect(draft).toHaveValue('增加概念辨析练习。');
  53 |   await root.getByRole('tab',{name:'表格',exact:true}).click();await root.getByRole('tab',{name:'反馈表单',exact:true}).click();await expect(root.getByRole('textbox',{name:'新增文本题 1'})).toHaveValue('本实例附加题');
  54 |   await root.getByRole('navigation',{name:'工作区页面'}).getByRole('link',{name:'课程任务',exact:true}).click();await expect(root.getByRole('table',{name:'课程任务记录'})).toBeVisible();
  55 |   await root.getByRole('navigation',{name:'工作区页面'}).getByRole('link',{name:'学习反馈',exact:true}).click();await expect(root.getByRole('tab',{name:'反馈表单',exact:true})).toHaveAttribute('aria-selected','true');await expect(draft).toHaveValue('增加概念辨析练习。');
  56 | });
  57 | test('N02 N03 S3 other region hide/show executes on the first click while context is temporary',async({page})=>{
  58 |   await open(page,'S3');const root=page.locator('[data-recipe-id="recipe-navigation-r6"]');await restore(root,'context').click();await expect(region(root,'context')).toHaveAttribute('data-temporary','true');
  59 |   await region(root,'directory').getByRole('button',{name:/隐藏/}).click();await expect(region(root,'context')).toBeHidden();await expect(region(root,'directory')).toBeHidden();
  60 |   await restore(root,'context').click();await restore(root,'directory').click();await expect(region(root,'context')).toBeHidden();await expect(region(root,'directory')).toBeVisible();
  61 | });
  62 | test('N09 N25 S5 ribbon modes have exact persistent heights and no temporary document displacement',async({page})=>{
  63 |   await open(page,'S5');const root=page.locator('.nv44-workspace'),ribbon=region(root,'ribbon'),paper=root.locator('.nv44-editor-paper'),draft=root.getByRole('textbox',{name:'教学目标草稿'});await draft.fill('工具区切换保留此目标。');
  64 |   for(const [mode,height] of [['full',111],['icons',83],['tabs',41],['hidden',0]] as const){
  65 |     await root.getByRole('button',{name:'布局设置'}).click();await page.getByRole('combobox',{name:'文档工具显示模式'}).selectOption(mode);await page.keyboard.press('Escape');
  66 |     if(height)expect((await shape(ribbon)).height).toBe(height);else await expect(ribbon).toBeHidden();
  67 |     if(mode==='tabs'||mode==='hidden'){
  68 |       const y=(await shape(paper)).y;if(mode==='tabs')await ribbon.getByRole('tab',{name:'插入',exact:true}).click();else await restore(root,'ribbon').click();
  69 |       await expect(ribbon).toHaveAttribute('data-temporary','true');expect((await shape(ribbon)).height).toBe(112);expect((await shape(paper)).y).toBe(y);await page.keyboard.press('Escape');expect((await shape(paper)).y).toBe(y);
  70 |     }
  71 |     await expect(draft).toHaveValue('工具区切换保留此目标。');
  72 |   }
  73 |   await root.getByRole('button',{name:'专注内容',exact:true}).click();await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:'S6',exact:true}).click();await expect(page.locator('[data-recipe-id="recipe-navigation-r5"]')).toHaveAttribute('data-focused','false');
  74 | });
  75 | test('N22 short-height layout menu keeps the last control reachable',async({page})=>{
  76 |   await page.setViewportSize({width:1200,height:420});await open(page,'S3');await page.locator('[data-recipe-id="recipe-navigation-r6"]').getByRole('button',{name:'布局设置'}).click();
  77 |   const dialog=page.getByRole('dialog');await dialog.getByRole('button',{name:'隐藏全部区域',exact:true}).click();
  78 |   await expect(dialog.getByRole('button',{name:'隐藏全部区域',exact:true})).toBeInViewport();await page.keyboard.press('Escape');await expect(page.locator('.rain-workspace__restore[aria-controls$="-workspace-directory"]')).toBeVisible();
  79 | });
  80 | test('N33 independent nine-scene consumer has no reference runtime and runs new business states',async({page})=>{
  81 |   await page.goto('/navigation-v042-w3-consumer.html');
  82 |   for(const [label,id] of [['课堂互动','r4'],['教师批改','r4'],['课堂回放','r5'],['协作空间','r6']] as const){await page.getByRole('radio',{name:label,exact:true}).locator('..').click();await expect(page.locator(`[data-recipe-id="recipe-navigation-${id}"]`)).toBeVisible();}
  83 |   expect(await page.evaluate(()=>['YKT_DEBUG','YKT_VISIBILITY','ui','vApply'].filter(key=>key in window))).toEqual([]);await expect(page.locator('iframe')).toHaveCount(0);
  84 | });
  85 | 
```