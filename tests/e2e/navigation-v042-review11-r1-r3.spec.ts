import {test,expect,type Page,type Locator} from '@playwright/test';
const open=async(page:Page,sample:string,width:number)=>{await page.goto(`/?sample=${sample}#navigation-v042`);await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));};
const style=(node:Locator,property:string)=>node.evaluate((e,property)=>getComputedStyle(e).getPropertyValue(property),property);
const root=(page:Page,id:string)=>page.locator(`[data-rain-id=recipe-navigation-${id}]`);
for(const width of [1200,1440,1600]){
 test(`Review11 R1 ${width} white context and restrained stat hierarchy preserve scene selection`,async({page})=>{
  await open(page,'R1',width);const r=root(page,'r1');
  await expect.poll(()=>style(r.locator('.nv43-context'),'background-color')).toBe('rgb(255, 255, 255)');
  for(const selector of ['.nv43-statistics>div>span','.nv43-statistics>div>small']){const entries=r.locator(selector);await expect(entries).toHaveCount(3);for(const entry of await entries.all()){expect(await style(entry,'font-size')).toBe('13px');expect(await style(entry,'line-height')).toBe('20px');}}
  expect(await style(r.locator('.nv43-page-top>p'),'color')).toBe('rgb(160, 172, 197)');expect(await style(r.locator('.nv43-workspace-actions'),'gap')).toBe('16px');
  await r.getByRole('tab',{name:'学分结构',exact:true}).click();await page.getByRole('combobox',{name:'业务子场景'}).selectOption('industry');
  expect(await style(r.locator('.nv43-context'),'background-color')).toBe('rgb(255, 255, 255)');expect(await style(r.locator('.nv43-page-top>p'),'color')).toBe('rgb(160, 172, 197)');
  await r.getByRole('radio',{name:'桑基图',exact:true}).locator('..').click();await expect(r.getByRole('radio',{name:'桑基图',exact:true})).toBeChecked();
  await page.getByRole('combobox',{name:'业务子场景'}).selectOption('plan');await expect(r.getByRole('tab',{name:'学分结构',exact:true})).toHaveAttribute('aria-selected','true');
 });
 test(`Review11 R3 ${width} heading16 file16 name15 resource color and list-grid selection`,async({page})=>{
  await open(page,'R3',width);const r=root(page,'r3'),h=r.locator('.nv43-resource-heading h3');expect(await style(h,'font-size')).toBe('16px');expect(await style(h,'line-height')).toBe('22px');expect((await h.boundingBox())?.height).toBe(22);
  expect(await style(r.locator('.nv43-workspace-actions'),'gap')).toBe('16px');expect(await style(r.locator('.nv43-icon-tile'),'background-color')).toBe('rgb(255, 242, 235)');expect(await style(r.locator('.nv43-icon-tile [data-rain-id=icon]'),'color')).toBe('rgb(221, 92, 0)');
  for(const name of await r.locator('.nv43-file-name').all())expect(await style(name,'font-size')).toBe('15px');for(const icon of await r.locator('.nv43-file-name [data-rain-id=icon]').all()){const box=await icon.boundingBox();expect(box?.width).toBe(16);expect(box?.height).toBe(16);}
  const file='第一章 函数、极限与连续.pdf';await r.getByRole('checkbox',{name:`选择 ${file}`,exact:true}).locator('..').click();await r.getByRole('radio',{name:'网格',exact:true}).locator('..').click();await expect(r.getByRole('checkbox',{name:`选择 ${file}`,exact:true})).toBeChecked();expect((await r.locator('.nv43-file-open [data-rain-id=icon]').nth(1).boundingBox())?.width).toBe(24);
  await r.getByRole('radio',{name:'列表',exact:true}).locator('..').click();await r.getByRole('textbox',{name:'搜索当前范围内的文件'}).fill('教学大纲');await expect(r.locator('tbody tr')).toHaveCount(1);await page.getByRole('combobox',{name:'业务子场景'}).selectOption('errors');expect(await style(h,'font-size')).toBe('16px');
  await r.getByRole('radio',{name:'加星',exact:true}).locator('..').click();await expect(r.locator('tbody tr')).toHaveCount(3);await r.getByRole('button',{name:'取消加星 · 第 1 题',exact:true}).click();await expect(r.locator('tbody tr')).toHaveCount(2);
 });
 test(`Review11 White ${width} gradient no top line, title/type hierarchy and count track state`,async({page})=>{
  await open(page,'White',width);const w=page.getByTestId('candidate-White');
  for(const item of await w.locator('.nv43-white-example li').all())expect(await style(item,'font-size')).toBe('15px');for(const item of await w.locator('.nv43-white-example li>small').all())expect(await style(item,'font-size')).toBe('13px');
  for(const item of await w.locator('.nv43-white-panel li>span:not([data-rain-id=icon])').all())expect(await style(item,'font-size')).toBe('15px');
  const selected=w.locator('.nv43-white-connected .rain-tabs__tab[data-selected=true]');expect(await selected.evaluate(e=>getComputedStyle(e,'::before').content)).toBe('none');expect(await style(selected,'background-image')).toBe('linear-gradient(rgb(224, 234, 255), rgb(255, 255, 255))');
  const soft=w.locator('.nv43-white-soft');expect(await style(soft.locator('[data-state=checked] [data-slot=count]'),'color')).toBe('rgb(15, 85, 223)');expect(await style(soft.locator('[data-state=unchecked] [data-slot=count]').first(),'color')).toBe('rgb(103, 115, 134)');
  await soft.getByRole('radio',{name:'已练对',exact:true}).locator('..').click();await expect(soft.getByRole('radio',{name:'已练对',exact:true})).toBeChecked();expect(await style(soft.locator('[data-state=checked] [data-slot=count]'),'color')).toBe('rgb(15, 85, 223)');
  await w.getByRole('tab',{name:'参考案例',exact:true}).click();await expect(w.getByRole('tab',{name:'参考案例',exact:true})).toHaveAttribute('aria-selected','true');expect(await style(selected,'background-image')).toContain('linear-gradient');
  const line=w.getByRole('radiogroup',{name:'W1 / 白底指示线'});await line.getByRole('radio',{name:'已练对',exact:true}).locator('..').click();expect(await line.locator('[data-state=checked]').evaluate(e=>getComputedStyle(e,'::after').height)).toBe('2px');
 });
 test(`Review11 Connections ${width} pale directional chevron preserves dialog search Escape and selection`,async({page})=>{
  await open(page,'Connections',width);const c=page.getByTestId('candidate-Connections'),all=c.locator('.nv42-connection-controls button:last-child'),icon=all.locator('[data-rain-id=icon]');
  await expect(all).toHaveAttribute('aria-expanded','false');expect(await style(icon,'color')).toBe('rgb(184, 194, 216)');await expect(icon).toHaveAttribute('data-icon','icon/arrow-down');await all.click();await expect(all).toHaveAttribute('aria-expanded','true');await expect(icon).toHaveAttribute('data-icon','icon/arrow-up');
  const dialog=page.getByRole('dialog',{name:'选择课程内容范围'});await expect(dialog).toBeVisible();await dialog.getByRole('textbox',{name:'搜索范围'}).fill('不存在');await expect(dialog.getByRole('status')).toHaveText('无匹配范围');await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(all).toHaveAttribute('aria-expanded','false');
  await all.click();await dialog.getByRole('textbox',{name:'搜索范围'}).fill('创新');await dialog.getByRole('button',{name:/创新实验班/}).click();await expect(dialog).not.toBeVisible();await expect(c.getByRole('tab',{name:/创新实验班/})).toHaveAttribute('aria-selected','true');
 });
}
for(const sample of ['R1','R3'])test(`Review11 ${sample} forced compact header and persistent restore reopen on first click`,async({page})=>{
 await open(page,sample,1440);const r=root(page,sample.toLowerCase()),button=r.locator('.nv43-platform-expand'),region=r.locator('.nv43-platform'),restore=r.locator('.nv43-workspace-bar>.rain-workspace__restore').first();
 await button.click();await expect(button).toHaveAttribute('aria-expanded','true');
 // Resize the existing host only in this isolated runtime; no production breakpoint is introduced.
 await page.getByTestId('candidate-canvas').evaluate(e=>{e.style.width='900px';});
 await expect(region).toHaveAttribute('data-mode','compact');await expect(region).toHaveAttribute('data-forced','true');await expect(button).toHaveAttribute('aria-label','展开平台导航');
 await button.click();await expect(region).toHaveAttribute('data-temporary','true');await expect(button).toHaveAttribute('aria-label','关闭临时平台导航');await button.click();await expect(region).toHaveAttribute('data-temporary','false');
 await button.click();await expect(region).toHaveAttribute('data-temporary','true');await button.click();await expect(region).toHaveAttribute('data-temporary','false');
 await restore.click();await expect(region).toHaveAttribute('data-temporary','true');await restore.click();await expect(region).toHaveAttribute('data-temporary','false');await restore.click();await expect(region).toHaveAttribute('data-temporary','true');
});
