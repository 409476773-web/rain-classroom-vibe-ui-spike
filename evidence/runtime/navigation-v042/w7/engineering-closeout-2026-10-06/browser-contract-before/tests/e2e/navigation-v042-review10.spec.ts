import { test, expect, type Locator, type Page } from '@playwright/test';

async function open(page:Page,sample:string,width=1440,scene?:string){
 await page.goto(`/?sample=${sample}#navigation-v042`);
 await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:sample,exact:true}).click();
 await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));
 if(scene)await page.getByRole('combobox',{name:'业务子场景'}).selectOption(scene);
 return page.locator('.rain-workspace').first();
}
const paint=(el:Locator)=>el.evaluate(e=>{const s=getComputedStyle(e);return {color:s.color,weight:s.fontWeight,radius:s.borderRadius,border:s.borderBottomColor,size:s.fontSize};});
const rgb=(value:string)=>{const hex=/^#([\da-f]{6})$/i.exec(value.trim());if(hex)return [0,2,4].map(i=>parseInt(hex[1]!.slice(i,i+2),16));const parts=value.match(/[\d.]+/g)?.map(Number);if(parts?.length===4&&value.includes('%'))parts[3]=parts[3]!/100;return parts;};
const token=(el:Locator,name:string)=>el.evaluate((e,name)=>getComputedStyle(e).getPropertyValue(name).trim(),name);

for(const width of [1200,1440,1600]){
 test(`R3 ${width} neutral actions, soft table hierarchy and primary file identity coexist`,async({page})=>{
  const root=await open(page,'R3',width,'files');
  for(const label of ['成员','上传文件']){
   const button=root.getByRole('button',{name:label,exact:true});
   await expect(button).toHaveAttribute('data-variant','tertiary');
   expect((await paint(button)).radius).toBe(await token(button,'--rain-button-small-radius'));
   expect(await button.evaluate(e=>e.getBoundingClientRect().height)).toBe(32);
   for(const part of ['label','leading-icon'])expect(rgb((await paint(button.locator(`[data-slot="${part}"]`))).color)).toEqual(rgb(await token(button,part==='label'?'--rain-button-tertiary-text':'--rain-button-neutral-icon')));
  }
  const table=root.getByRole('table',{name:'云盘文件列表'}),heading=table.getByRole('columnheader',{name:'文件名',exact:true});
  expect((await paint(heading)).weight).toBe('400');
  expect(rgb((await paint(heading)).color)).toEqual(rgb(await token(heading,'--rain-category-text-neutral-5')));
  const cell=table.locator('tbody tr').first().locator('td').nth(1);
  expect(rgb((await paint(cell)).border)).toEqual(rgb(await token(cell,'--rain-category-border-neutral-4')));
  const name=table.getByRole('button',{name:'第一章 函数、极限与连续.pdf',exact:true});
  expect((await paint(name)).size).toBe('15px');
  expect(rgb((await paint(name)).color)).toEqual(rgb(await token(name,'--rain-category-text-neutral-1')));
  const query=root.getByRole('textbox',{name:'搜索当前范围内的文件'});await query.fill('教学大纲');await expect(table.locator('tbody tr')).toHaveCount(1);await query.fill('');
  await root.getByRole('button',{name:'上传文件',exact:true}).click();await expect(root.getByRole('status').filter({hasText:'上传为演示操作'})).toBeVisible();
 });
 test(`R3 ${width} auxiliary icons retain hover, keyboard focus and recovery`,async({page})=>{
  const root=await open(page,'R3',width,'files'),context=root.locator('.nv43-context');
  const hide=context.getByRole('button',{name:'隐藏资源目录',exact:true});
  expect(await hide.getAttribute('data-size')).toBe('24/14');
  expect(await hide.evaluate(e=>[e.getBoundingClientRect().width,e.getBoundingClientRect().height])).toEqual([24,24]);
  expect(await hide.locator('[data-rain-id="icon"]').evaluate(e=>[e.getBoundingClientRect().width,e.getBoundingClientRect().height])).toEqual([14,14]);
  expect(rgb((await paint(hide)).color)).toEqual(rgb(await token(hide,'--rain-category-icon-neutral-4')));
  await hide.hover();await expect.poll(async()=>rgb((await paint(hide)).color)).toEqual(rgb(await token(hide,'--rain-category-icon-neutral-2')));
  await page.mouse.move(1790,1090);await hide.focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');
  expect(await hide.evaluate(e=>e.matches(':focus-visible'))).toBe(true);
  expect(await hide.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');
  await page.keyboard.press('Enter');await expect(context).toBeHidden();
  await root.locator('.rain-workspace__restore[aria-controls$="-workspace-context"]').first().click();await expect(context).toBeVisible();
  await expect(root.getByRole('heading',{name:'全部文件',exact:true})).toBeVisible();
 });
}
test('R1 auxiliary text leaves graph and statistics readable, ordinary action remains functional',async({page})=>{
 const root=await open(page,'R1',1440,'plan'),action=root.getByRole('button',{name:'重新分析',exact:true});
 await expect(action).toHaveAttribute('data-variant','tertiary');await action.click();
 await expect(root.getByRole('status').filter({hasText:'示例已重新分析'})).toBeVisible();
 expect((await paint(root.locator('.nv43-statistics strong').first())).size).toBe('28px');
 const hint=root.locator('.nv43-context>small:last-child');expect(rgb((await paint(hint)).color)).toEqual(rgb(await token(hint,'--rain-category-text-neutral-6')));
});
test('R3 practice stays a brand action and stars retain their semantic selected color',async({page})=>{
 const root=await open(page,'R3',1440,'errors'),action=root.getByRole('button',{name:'开始练习',exact:true});
 await expect(action).toHaveAttribute('data-variant','secondary');expect((await paint(action)).radius).toBe('6px');
 const star=root.getByRole('button',{name:'添加加星 · 第 2 题',exact:true});
 expect(rgb((await paint(star)).color)).toEqual(rgb(await token(star,'--rain-category-icon-neutral-4')));
 await star.click();const selected=root.getByRole('button',{name:'取消加星 · 第 2 题',exact:true});await expect(selected).toHaveAttribute('aria-pressed','true');
 expect(rgb((await paint(selected)).color)).toEqual(rgb(await token(selected,'--rain-color-semantic-warning')));
});
