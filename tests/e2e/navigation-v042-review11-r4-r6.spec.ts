import { test, expect, type Locator, type Page } from '@playwright/test';

async function open(page:Page,sample:string,width=1440,scene?:string){
 await page.goto(`/?sample=${sample}#navigation-v042`);
 await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));
 if(scene)await page.getByRole('combobox',{name:'业务子场景'}).selectOption(scene);
 return page.getByTestId('candidate-canvas').locator('.rain-workspace');
}
const css=(el:Locator)=>el.evaluate(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return{color:s.color,bg:s.backgroundColor,font:s.fontSize,line:s.lineHeight,weight:s.fontWeight,left:s.borderLeftWidth,bottom:s.borderBottomWidth,padding:s.padding,marginTop:s.marginTop,gap:s.gap,align:s.textAlign,w:r.width,h:r.height};});
const token=(el:Locator,name:string)=>el.evaluate((e,name)=>{const n=document.createElement('span');n.style.color=`var(${name})`;e.append(n);const c=getComputedStyle(n).color;n.remove();return c;},name);

for(const width of [1200,1440,1600]){
 test(`Review11 R4 ${width} queue metadata rhythm and matching count retain selection`,async({page})=>{
  const root=await open(page,'R4',width,'interaction'),queue=root.locator('.nv5-queue');
  expect((await css(queue.locator(':scope>.nv5-region-head'))).bottom).toBe('0px');
  for(const name of ['全部','已提交','未评分']){const option=root.getByRole('radio',{name,exact:true}).locator('..');const style=await css(option);expect(style.font).toBe('14px');expect(style.line).toBe('20px');}
  const desc=queue.locator('.rain-navigation-family__description').first();expect((await css(desc)).color).toBe(await token(desc,'--rain-category-text-neutral-6'));await expect(desc).toContainText(' | ');
  const footer=queue.locator('.nv5-queue-footer');await expect(footer).toHaveText('共 6 个小组');expect((await css(footer)).bottom).toBe('0px');
  await root.getByRole('radio',{name:'未评分',exact:true}).locator('..').click();await expect(footer).toHaveText('共 2 个小组');
  await root.getByRole('group',{name:'小组结果'}).getByRole('button',{name:'知行合一',exact:true}).click();const query=root.getByRole('textbox',{name:'搜索小组'});await query.fill('不存在');await expect(footer).toHaveText('共 0 个小组');await query.fill('知行');await expect(footer).toHaveText('共 1 个小组');await query.fill('');await expect(root.getByRole('group',{name:'小组结果'}).getByRole('button',{name:'知行合一',exact:true})).toHaveAttribute('aria-pressed','true');
  const author=root.locator('.nv5-comment .nv5-between>span').first(),body=root.locator('.nv5-comment p').first();expect((await css(author)).color).toBe(await token(author,'--rain-category-text-neutral-5'));expect((await css(body)).color).toBe(await token(body,'--rain-category-text-neutral-2'));expect((await css(body)).marginTop).toBe('2px');expect((await css(root.locator('.nv5-comments'))).gap).toBe('32px');expect((await css(root.locator('.nv5-comment').first())).bottom).toBe('0px');
  const activity=root.locator('.nv5-activities .rain-navigation-family__metadata').first();expect((await css(activity)).color).toBe(await token(activity,'--rain-category-text-neutral-6'));await expect(activity.locator('.nv5-meta-divider')).toHaveCount(1);
 });
 test(`Review11 R5 ${width} native follow control, type tags and 68px footer preserve replay`,async({page})=>{
  const root=await open(page,'R5',width),footer=root.locator('.nv5-events-footer'),checkbox=root.getByRole('checkbox',{name:'跟随播放定位'});
  const f=await css(footer);expect(f.padding).toBe('10px');expect(f.h).toBe(68);await expect(footer.locator('p')).toHaveCount(0);
  const label=footer.locator('[data-slot="label"]');expect((await css(label)).font).toBe('15px');expect((await css(label)).line).toBe('24px');expect((await css(footer.locator('[data-slot="control"]'))).w).toBe(16);
  const row=root.locator('.nv5-event-objects .rain-navigation-family__item[data-active="true"] .rain-navigation-family__row');expect((await css(row)).left).toBe('2px');
  const meta=row.locator('.rain-navigation-family__metadata');await expect(meta.locator('.nv5-event-type')).toHaveAttribute('data-color','courseware');await expect(meta.locator(':scope>*').first()).toHaveAttribute('data-rain-id','ui-tag');const time=meta.locator('.nv5-event-time');expect((await css(time)).color).toBe(await token(time,'--rain-category-text-neutral-6'));
  await checkbox.locator('..').click();await expect(checkbox).toBeChecked();const seek=root.getByRole('slider',{name:'模拟播放位置'});await seek.focus();await page.keyboard.press('End');await expect(root.getByRole('group',{name:'课堂回顾事件'}).getByRole('button',{name:'课堂小结 · 三个关键步骤',exact:true})).toHaveAttribute('aria-pressed','true');
  await root.getByRole('radio',{name:'习题',exact:true}).locator('..').click();await expect(root.locator('.nv5-event-type')).toHaveAttribute('data-color','self-test');await expect(root.getByRole('group',{name:'课堂回顾事件'}).getByRole('button')).toHaveCount(1);await root.getByRole('radio',{name:'全部',exact:true}).locator('..').click();
  expect((await css(root.locator('.nv5-knowledge>.nv5-region-head>strong'))).font).toBe('15px');expect((await css(root.locator('.nv5-play-title h4'))).font).toBe('15px');
  const pin=root.locator('.nv5-knowledge>.nv5-region-head .rain-icon-button').first();await expect(pin).toHaveAttribute('data-size','32/14');expect([(await css(pin)).w,(await css(pin)).h]).toEqual([32,32]);const hide=root.locator('.nv5-knowledge').getByRole('button',{name:'隐藏知识索引',exact:true});await hide.click();await root.getByRole('button',{name:'显示知识索引',exact:true}).click();await expect(root.getByRole('tab',{name:'知识导引',exact:true})).toBeVisible();
 });
 test(`Review11 R6 ${width} board counts and album tags preserve view and record state`,async({page})=>{
  const root=await open(page,'R6',width);await root.getByRole('tab',{name:'表格',exact:true}).click();await root.getByRole('button',{name:'+ 添加记录',exact:true}).click();await expect(root.getByRole('table').locator('tbody tr')).toHaveCount(6);
  await root.getByRole('tab',{name:'状态分组',exact:true}).click();const board=root.locator('.nv5-kanban');expect((await css(board)).bg).toBe(await token(board,'--rain-category-background-neutral-2'));expect((await css(board.locator(':scope>section').first())).bg).toBe(await token(board,'--rain-category-background-neutral-3'));expect((await css(board.locator('h4>span').first())).weight).toBe('400');
  await root.getByRole('tab',{name:'画册',exact:true}).click();const card=root.locator('.nv5-album>article').first();expect((await css(card)).align).toBe('left');expect((await css(card.locator('.nv5-slide-preview'))).align).toBe('left');await expect(card.locator('.nv5-album-tags [data-rain-id="ui-tag"]')).toHaveCount(2);for(const tag of await card.locator('.nv5-album-tags [data-rain-id="ui-tag"]').all())expect((await css(tag)).h).toBe(20);
  await root.getByRole('tab',{name:'表格',exact:true}).click();await expect(root.getByRole('table').locator('tbody tr')).toHaveCount(6);await root.getByRole('tab',{name:'反馈表单',exact:true}).click();const draft=root.getByRole('textbox',{name:'课程名称'});await draft.fill('Review11 课程草稿');await root.getByRole('tab',{name:'画册',exact:true}).click();await root.getByRole('tab',{name:'反馈表单',exact:true}).click();await expect(draft).toHaveValue('Review11 课程草稿');
 });
}
for(const [sample,view]of [['S4','interaction'],['S6','replay'],['S3','album']])test(`Review11 inherited ${sample} uses the same local composition`,async({page})=>{
 const root=await open(page,sample!,1440,view==='interaction'?'interaction':undefined);
 if(sample==='S4')await expect(root.locator('.nv5-queue-footer')).toHaveText('共 6 个小组');
 if(sample==='S6')expect((await css(root.locator('.nv5-events-footer'))).h).toBe(68);
 if(sample==='S3'){await root.getByRole('tab',{name:'画册',exact:true}).click();await expect(root.locator('.nv5-album-tags')).toHaveCount(6);}
});
