import {test,expect} from '@playwright/test';

for(const width of [1200,1440,1600]) test(`R2 ${width} hierarchy keeps component paint, geometry, and existing actions`,async({page})=>{
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/?sample=R2#navigation-v042');
  await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));
  const root=page.locator('.nv42-r2').first(),focus=root.getByRole('button',{name:'专注内容',exact:true}),preview=root.getByRole('button',{name:'预览学生端',exact:true}),pin=root.locator('.nv42-context-head .nv42-icon').first();
  await expect(root).toBeVisible();
  const token=async(name:string)=>{expect(await root.evaluate((el,name)=>getComputedStyle(el).getPropertyValue(name).trim(),name),`${name} must be an existing Token`).not.toBe('');return root.evaluate((el,name)=>{const probe=document.createElement('span');probe.style.cssText=`position:fixed;left:-10000px;width:0;height:0;pointer-events:none;color:var(${name})`;el.append(probe);const result=getComputedStyle(probe).color;probe.remove();return result;},name);};
  const paint=async(locator:typeof focus)=>locator.evaluate(el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect(),lead=el.querySelector('[data-slot="leading-icon"]');return {variant:el.getAttribute('data-variant'),color:s.color,bg:s.backgroundColor,border:s.borderTopColor,radius:s.borderRadius,w:r.width,h:r.height,lead:lead?{w:lead.getBoundingClientRect().width,h:lead.getBoundingClientRect().height,color:getComputedStyle(lead).color}:null,label:el.querySelector('[data-slot="label"]')?getComputedStyle(el.querySelector('[data-slot="label"]')!).color:null};});
  expect(await paint(focus)).toEqual({variant:'tertiary',color:await token('--rain-button-tertiary-text'),bg:'rgba(0, 0, 0, 0)',border:await token('--rain-button-tertiary-border'),radius:'6px',w:93,h:32,lead:{w:16,h:16,color:await token('--rain-button-neutral-icon')},label:await token('--rain-button-tertiary-text')});
  expect(await paint(preview)).toEqual({variant:'text',color:await token('--rain-button-text-default-color'),bg:'rgba(0, 0, 0, 0)',border:'rgba(0, 0, 0, 0)',radius:'6px',w:103,h:32,lead:{w:16,h:16,color:await token('--rain-button-neutral-icon')},label:await token('--rain-button-text-default-color')});
  expect(await pin.evaluate(el=>{const r=el.getBoundingClientRect(),i=el.querySelector('[data-slot="icon"]')!.getBoundingClientRect();return{w:r.width,h:r.height,iw:i.width,ih:i.height,radius:getComputedStyle(el).borderRadius,color:getComputedStyle(el).color};})).toEqual({w:28,h:28,iw:14,ih:14,radius:'6px',color:await token('--rain-category-icon-neutral-4')});
  const hoverIcon=await token('--rain-category-icon-neutral-2');await pin.hover();await expect.poll(()=>pin.evaluate(el=>getComputedStyle(el).color)).toBe(hoverIcon);
  const hoverBackground=await token('--rain-button-tertiary-hover-bg');await focus.hover();await expect.poll(()=>focus.evaluate(el=>getComputedStyle(el).backgroundColor)).toBe(hoverBackground);
  await page.mouse.move(1700,1050);await focus.focus();expect(await focus.evaluate(el=>getComputedStyle(el).outlineWidth)).toBe('2px');
  await focus.click();await expect(root.getByRole('button',{name:'退出专注',exact:true})).toBeVisible();await root.getByRole('button',{name:'退出专注',exact:true}).click();
  const toast=root.locator('.nv42-toast[role="status"]');await preview.click();await expect(toast).toContainText('预览学生端：本地演示');await root.getByRole('button',{name:'关闭提示',exact:true}).click();await expect(toast).toHaveCount(0);
  await root.getByRole('button',{name:'隐藏课程导航',exact:true}).last().click();await expect(root.locator('.nv42-context')).not.toBeVisible();await root.getByRole('button',{name:'恢复课程导航',exact:true}).click();await expect(root.locator('.nv42-context')).toBeVisible();
  await root.locator('.nv42-term').click();await expect(page.getByRole('menuitem',{name:'2026 秋季学期',exact:true})).toBeVisible();await page.keyboard.press('Escape');await expect(root.locator('.nv42-term')).toBeFocused();
  await expect(root.getByRole('button',{name:'退出编辑',exact:true})).toBeVisible();await expect(root.getByRole('button',{name:'保存草稿',exact:true})).toHaveAttribute('data-variant','primary');
  expect(await root.locator('.rain-tree-node [data-slot="title"]').first().evaluate(el=>getComputedStyle(el).fontWeight)).toBe('400');
  expect(await root.locator('table').count()).toBe(0);expect(errors).toEqual([]);
});
