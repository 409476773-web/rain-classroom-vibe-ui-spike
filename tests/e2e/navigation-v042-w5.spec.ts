import { expect, test, type Locator, type Page } from '@playwright/test';
const open=async(page:Page,sample:string)=>{await page.goto(`/?sample=${sample}#navigation-v042`);await expect(page.getByRole('heading',{name:'导航组件 · v0.4.2'})).toBeVisible();};
const region=(root:Locator,id:string)=>root.locator(`.rain-workspace__region[data-region-id="${id}"]`);
const restore=(root:Locator,id:string)=>root.locator(`.rain-workspace__restore[aria-controls$="-workspace-${id}"]`);
const shape=async(locator:Locator)=>locator.evaluate(e=>{
  const r=e.getBoundingClientRect();let x=r.x+window.scrollX,y=r.y+window.scrollY;
  // Exclude gallery auto-scroll while retaining exact logical layout geometry.
  for(let parent=e.parentElement;parent;parent=parent.parentElement){if(parent===document.scrollingElement)continue;x+=parent.scrollLeft;y+=parent.scrollTop;}
  return {x,y,width:r.width,height:r.height};
});

for(const width of [1200,1440,1600])for(const [sample,scene] of [['R1','plan'],['R1','industry'],['R2',''],['R3','files'],['R3','errors'],['R4','interaction'],['R4','grading'],['R5',''],['R6','']]){
  test(`nine-scene matrix ${sample}/${scene||'default'} at ${width}`,async({page},testInfo)=>{
    const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));await open(page,sample!);
    if(scene)await page.getByRole('combobox',{name:'业务子场景'}).selectOption(scene);
    await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));
    const canvas=page.getByTestId('candidate-canvas'),root=canvas.locator('.rain-workspace');
    await expect(root).toHaveCount(1);await expect(root).toBeVisible();expect((await shape(root)).width).toBe(width);
    expect(await root.locator('.rain-workspace__region:not([hidden])').count()).toBeGreaterThan(0);
    if(width>=1440){for(const pane of await root.locator('.rain-workspace__region').all())await expect(pane).toHaveAttribute('data-mode',await pane.getAttribute('data-region-id')==='global'?'compact':'expanded');}
    if(width===1200&&(sample==='R5'||sample==='R6')){
      await expect(region(root,'global')).toHaveAttribute('data-mode','hidden');
      const note=root.locator('.nv5-adaptation');await expect(note).toContainText('你的展开偏好未被覆盖');expect((await shape(note)).height).toBe(24);
      if(sample==='R6')await expect(region(root,'fields')).toHaveAttribute('data-mode','hidden');
    }
    const controls=root.locator('.rain-workspace__restore');expect(await controls.count()).toBeGreaterThan(0);
    for(const control of await controls.all()){
      expect(await control.getAttribute('aria-label')).toBeTruthy();const id=await control.getAttribute('aria-controls');await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
    }
    expect(await root.evaluate(e=>Array.from(e.querySelectorAll('path')).some(path=>/NaN|Infinity/.test(path.getAttribute('d')??'')))).toBe(false);
    expect(errors).toEqual([]);
    await root.screenshot({path:testInfo.outputPath('workspace.png')});
  });
}
test('R4 interaction selected group and activity stay synchronized through temporary recovery',async({page})=>{
  await open(page,'R4');const root=page.locator('[data-recipe-id="recipe-navigation-r4"]');
  await root.getByRole('group',{name:'课堂活动'}).getByRole('button',{name:'小组汇报：从概念到真实应用'}).click();
  await root.getByRole('group',{name:'小组结果'}).getByRole('button',{name:'探索者小组'}).click();
  await expect(root.getByRole('heading',{name:'探索者小组',exact:true})).toBeVisible();await expect(root.getByLabel('当前小组得分')).toContainText('8.5');
  const main=await shape(root.locator('.nv5-group-detail'));await region(root,'queue').getByRole('button',{name:/取消固定/}).click();await expect(region(root,'queue')).toHaveAttribute('data-temporary','true');
  await page.keyboard.press('Escape');await expect(region(root,'queue')).toBeHidden();await restore(root,'queue').click();
  expect(await shape(root.locator('.nv5-group-detail'))).toEqual(main);await expect(root.getByRole('group',{name:'小组结果'}).getByRole('button',{name:'探索者小组'})).toHaveAttribute('aria-pressed','true');
});
test('N10 N12 N13 R4 grading ownership survives layout and subscene changes without saving',async({page})=>{
  await open(page,'R4');await page.getByRole('combobox',{name:'业务子场景'}).selectOption('grading');const root=page.locator('[data-recipe-id="recipe-navigation-r4"]');
  const draft=root.getByRole('textbox',{name:'给当前作答的反馈'});await draft.fill('请说明推导条件。');await root.getByRole('spinbutton',{name:'当前作答得分'}).fill('9.2');
  await region(root,'review').getByRole('button',{name:/隐藏/}).click();await restore(root,'review').click();await expect(draft).toHaveValue('请说明推导条件。');
  await root.getByRole('button',{name:'专注作答预览',exact:true}).click();await root.getByRole('button',{name:'退出专注',exact:true}).click();
  await expect(root.locator('.nv5-demo-note')).toContainText('未提交成绩');
  await root.getByRole('group',{name:'学生队列'}).getByRole('button',{name:'欧阳小明'}).click();await expect(draft).toHaveValue('');await expect(root.getByRole('spinbutton',{name:'当前作答得分'})).toHaveValue('7.0');
  await root.getByRole('group',{name:'学生队列'}).getByRole('button',{name:'李梦'}).click();await expect(draft).toHaveValue('请说明推导条件。');
  await page.getByRole('combobox',{name:'业务子场景'}).selectOption('interaction');await page.getByRole('combobox',{name:'业务子场景'}).selectOption('grading');
  await expect(root).toHaveAttribute('data-focused','false');await expect(draft).toHaveValue('请说明推导条件。');await expect(root.getByRole('spinbutton',{name:'当前作答得分'})).toHaveValue('9.2');
});
test('N08 R5 explicit seek and focus restore preserve playback and hidden knowledge',async({page})=>{
  await open(page,'R5');const root=page.locator('[data-recipe-id="recipe-navigation-r5"]');
  await root.getByRole('group',{name:'课堂回顾事件'}).getByRole('button',{name:'随堂练习 · 等效电路'}).click();
  await expect(root.getByRole('slider',{name:'模拟播放位置'})).toHaveValue('984');await expect(root.getByLabel('回放时间')).toContainText('16:24');await expect(root.getByRole('button',{name:'16:24 一起试一试'})).toHaveAttribute('aria-pressed','true');
  await region(root,'knowledge').getByRole('button',{name:/隐藏/}).click();await root.getByRole('button',{name:'专注回放',exact:true}).click();await root.getByRole('button',{name:'退出专注',exact:true}).click();await expect(region(root,'knowledge')).toBeHidden();
  await restore(root,'knowledge').click();await expect(root.getByRole('slider',{name:'模拟播放位置'})).toHaveValue('984');await expect(root.getByRole('button',{name:'播放回放',exact:true})).toBeVisible();
});
test('R6 views, page identity, added fields and form drafts have independent ownership',async({page})=>{
  await open(page,'R6');const root=page.locator('[data-recipe-id="recipe-navigation-r6"]'),draft=root.getByRole('textbox',{name:'你希望我们改进的地方'});await draft.fill('增加概念辨析练习。');
  await root.getByRole('button',{name:'新增文本题'}).click();await root.getByRole('textbox',{name:'新增文本题 1'}).fill('本实例附加题');
  await region(root,'fields').getByRole('button',{name:/隐藏/}).click();await restore(root,'fields').click();await expect(draft).toHaveValue('增加概念辨析练习。');
  await root.getByRole('tab',{name:'表格',exact:true}).click();await root.getByRole('tab',{name:'反馈表单',exact:true}).click();await expect(root.getByRole('textbox',{name:'新增文本题 1'})).toHaveValue('本实例附加题');
  await root.getByRole('navigation',{name:'工作区页面'}).getByRole('link',{name:'课程任务',exact:true}).click();await expect(root.getByRole('table',{name:'课程任务记录'})).toBeVisible();
  await root.getByRole('navigation',{name:'工作区页面'}).getByRole('link',{name:'学习反馈',exact:true}).click();await expect(root.getByRole('tab',{name:'反馈表单',exact:true})).toHaveAttribute('aria-selected','true');await expect(draft).toHaveValue('增加概念辨析练习。');
});
test('N02 N03 S3 other region hide/show executes on the first click while context is temporary',async({page})=>{
  await open(page,'S3');const root=page.locator('[data-recipe-id="recipe-navigation-r6"]');await restore(root,'context').click();await expect(region(root,'context')).toHaveAttribute('data-temporary','true');
  await restore(root,'directory').click();await expect(region(root,'context')).toBeHidden();await expect(region(root,'directory')).toBeHidden();
  await restore(root,'context').click();await restore(root,'directory').click();await expect(region(root,'context')).toBeHidden();await expect(region(root,'directory')).toBeVisible();
});
test('N09 N25 S5 ribbon modes have exact persistent heights and no temporary document displacement',async({page})=>{
  await open(page,'S5');const root=page.locator('.nv44-workspace'),ribbon=region(root,'ribbon'),paper=root.locator('.nv44-editor-paper'),draft=root.getByRole('textbox',{name:'教学目标草稿'});await draft.fill('工具区切换保留此目标。');
  for(const [mode,height] of [['full',111],['icons',83],['tabs',41],['hidden',0]] as const){
    await root.getByRole('button',{name:'布局设置'}).click();await page.getByRole('combobox',{name:'文档工具显示模式'}).selectOption(mode);await page.keyboard.press('Escape');
    if(height)expect((await shape(ribbon)).height).toBe(height);else await expect(ribbon).toBeHidden();
    if(mode==='tabs'||mode==='hidden'){
      const y=(await shape(paper)).y;
      if(mode==='tabs'){
        await ribbon.getByRole('tab',{name:'开始',exact:true}).click();
        await expect(ribbon).toHaveAttribute('data-temporary','true');
        expect((await shape(paper)).y).toBe(y);await page.keyboard.press('Escape');
        await ribbon.getByRole('tab',{name:'插入',exact:true}).click();
      }else await restore(root,'ribbon').click();
      await expect(ribbon).toHaveAttribute('data-temporary','true');expect((await shape(ribbon)).height).toBe(112);expect((await shape(paper)).y).toBe(y);await page.keyboard.press('Escape');expect((await shape(paper)).y).toBe(y);
    }
    await expect(draft).toHaveValue('工具区切换保留此目标。');
  }
  await root.getByRole('button',{name:'专注内容',exact:true}).click();await expect(root.locator('.nv44-workspace-head')).toBeHidden();
  await root.getByRole('button',{name:'退出专注',exact:true}).click();await expect(root.locator('.nv44-workspace-head')).toBeVisible();await expect(draft).toHaveValue('工具区切换保留此目标。');
  await root.getByRole('button',{name:'专注内容',exact:true}).click();await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:'S6',exact:true}).click();await expect(page.locator('[data-recipe-id="recipe-navigation-r5"]')).toHaveAttribute('data-focused','false');
});
test('N22 short-height layout menu keeps the last control reachable',async({page})=>{
  await page.setViewportSize({width:1200,height:420});await open(page,'S3');await page.locator('[data-recipe-id="recipe-navigation-r6"]').getByRole('button',{name:'布局设置'}).click();
  const dialog=page.getByRole('dialog');await dialog.getByRole('button',{name:'隐藏全部区域',exact:true}).click();
  await expect(dialog.getByRole('button',{name:'隐藏全部区域',exact:true})).toBeInViewport();await page.keyboard.press('Escape');await expect(page.locator('.rain-workspace__restore[aria-controls$="-workspace-directory"]')).toBeVisible();
});
test('S3 and S4 recovery identity follows the actual page, view and grading object',async({page})=>{
  await open(page,'S3');const document=page.locator('[data-recipe-id="recipe-navigation-r6"]');
  await document.getByRole('tab',{name:'状态分组',exact:true}).click();
  await expect(document.locator('.nv44-identity small')).toContainText('状态分组');
  await document.getByRole('link',{name:'课程任务',exact:true}).click();
  await expect(document.locator('.nv44-identity small')).toContainText('课程任务 / 表格');
  await open(page,'S4');await page.getByRole('combobox',{name:'业务子场景'}).selectOption('grading');
  const grading=page.locator('[data-recipe-id="recipe-navigation-r4"]');
  expect((await shape(grading.locator('.nv5-pdf-page:visible'))).width).toBe(826);
  await expect(grading.locator('.nv44-identity strong')).toContainText('李梦');
  await grading.getByRole('group',{name:'学生队列'}).getByRole('button',{name:'欧阳小明',exact:true}).click();
  await expect(grading.locator('.nv44-identity strong')).toContainText('欧阳小明');
  await grading.getByRole('radio',{name:'按人批改',exact:true}).locator('..').click();
  await expect(grading.locator('.nv44-identity small')).toContainText('按人批改');
});
test('N33 independent nine-scene consumer has no reference runtime and runs new business states',async({page})=>{
  await page.goto('/navigation-v042-w3-consumer.html');
  for(const [label,id] of [['课堂互动','r4'],['教师批改','r4'],['课堂回放','r5'],['协作空间','r6']] as const){await page.getByRole('radio',{name:label,exact:true}).locator('..').click();await expect(page.locator(`[data-recipe-id="recipe-navigation-${id}"]`)).toBeVisible();}
  expect(await page.evaluate(()=>['YKT_DEBUG','YKT_VISIBILITY','ui','vApply'].filter(key=>key in window))).toEqual([]);await expect(page.locator('iframe')).toHaveCount(0);
});
test('N37 instance B name, condition density and connection preserve instance A DOM and draft',async({page})=>{
  await page.goto('/navigation-v042-w3-consumer.html');await page.getByRole('radio',{name:'实例隔离',exact:true}).locator('..').click();const a=page.getByRole('region',{name:'实例 A',exact:true}),b=page.getByRole('region',{name:'实例 B',exact:true});
  await a.getByRole('textbox',{name:'实例 A 草稿'}).fill('只属于 A 的草稿');await b.getByRole('textbox',{name:'实例 B 草稿'}).fill('只属于 B 的草稿');
  const snapshot=async()=>a.evaluate(e=>{const control=e.querySelector('[data-slot="items"]')!,surface=e.querySelector('[data-rain-id="layout-connected-surface"]')!;return {html:control.outerHTML,controlHeight:control.getBoundingClientRect().height,surfaceWidth:surface.getBoundingClientRect().width,background:getComputedStyle(surface).backgroundColor};});
  const before=await snapshot();await a.getByRole('textbox',{name:'实例 A 草稿'}).evaluate(e=>e.setAttribute('data-proof-instance','original'));
  await page.getByRole('textbox',{name:'实例 B 名称'}).fill('研究资料 B');await page.getByRole('checkbox',{name:'紧凑条件'}).check();await page.getByRole('combobox',{name:'实例 B 连接'}).selectOption('merged');
  await expect(b.getByRole('tab',{name:'研究资料 B',exact:true})).toHaveAttribute('aria-selected','true');await expect(b.locator('[data-rain-id="ui-segmented-control"]')).toHaveAttribute('data-nav-density','compact');await expect(b.locator('[data-rain-id="layout-connected-surface"]')).toHaveAttribute('data-connection','merged');
  expect(await snapshot()).toEqual(before);await expect(a.getByRole('textbox',{name:'实例 A 草稿'})).toHaveAttribute('data-proof-instance','original');await expect(a.getByRole('textbox',{name:'实例 A 草稿'})).toHaveValue('只属于 A 的草稿');await expect(b.getByRole('textbox',{name:'实例 B 草稿'})).toHaveValue('只属于 B 的草稿');
});
test('actual paired R5 recipes isolate native filters and playback position',async({page})=>{
  await page.goto('/navigation-v042-w3-consumer.html');await page.getByRole('radio',{name:'双回放实例',exact:true}).locator('..').click();const a=page.getByRole('region',{name:'回放实例 A',exact:true}),b=page.getByRole('region',{name:'回放实例 B',exact:true});
  const aAll=a.getByRole('radiogroup',{name:'回顾事件类型'}).getByRole('radio',{name:'全部',exact:true});
  await b.getByRole('radiogroup',{name:'回顾事件类型'}).getByRole('radio',{name:'习题',exact:true}).locator('..').click();await expect(aAll).toBeChecked();
  await b.getByRole('group',{name:'课堂回顾事件'}).getByRole('button',{name:'随堂练习 · 等效电路'}).click();await expect(b.getByRole('slider',{name:'模拟播放位置'})).toHaveValue('984');await expect(a.getByRole('slider',{name:'模拟播放位置'})).toHaveValue('0');
  await b.locator('.rain-workspace__restore[aria-controls$="-workspace-events"]').click();await expect(a.locator('.rain-workspace__region[data-region-id="events"]')).toBeVisible();await expect(b.locator('.rain-workspace__region[data-region-id="events"]')).toBeHidden();
});
