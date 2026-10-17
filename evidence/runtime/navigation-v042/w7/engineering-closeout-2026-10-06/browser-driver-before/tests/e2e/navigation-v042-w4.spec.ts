import { expect, test, type Page } from '@playwright/test';
const open=async(page:Page,sample='R2')=>{await page.goto(`/?sample=${sample}#navigation-v042`);await expect(page.getByRole('heading',{name:'导航组件 · v0.4.2'})).toBeVisible();};
const box=async(page:Page,selector:string)=>page.locator(selector).evaluate(element=>{const r=element.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};});

test('N01 all-hidden R2 has stable named keyboard recovery and untouched scope',async({page})=>{
  await open(page);const root=page.locator('.nv42-r2');
  await root.getByRole('button',{name:'布局',exact:true}).click();
  const menu=page.getByRole('dialog',{name:'R2 布局'});
  await menu.getByRole('checkbox',{name:'显示平台导航',exact:true}).uncheck();
  await menu.getByRole('checkbox',{name:'显示课程导航',exact:true}).uncheck();
  await page.keyboard.press('Escape');
  await expect(root.locator('.rain-workspace__region[data-region-id="global"]')).toBeHidden();await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toBeHidden();
  const restore=root.getByRole('button',{name:'恢复课程导航',exact:true});const controlled=await restore.getAttribute('aria-controls');
  await expect(page.locator(`[id="${controlled}"]`)).toHaveCount(1);
  await restore.focus();await page.keyboard.press('Enter');await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toBeVisible();
  await expect(root.getByRole('tab',{name:'公共资源包',exact:true})).toHaveAttribute('aria-selected','true');
});
test('N02 N03 temporary dismiss and the next controller complete on the first click',async({page})=>{
  await open(page);const root=page.locator('.nv42-r2');
  await root.getByRole('button',{name:'取消固定，改为临时课程导航',exact:true}).click();
  await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toHaveAttribute('data-temporary','true');
  await root.locator('.nv42-workspace-bar').getByRole('button',{name:'展开平台导航',exact:true}).click();
  await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toBeHidden();await expect(root.locator('.rain-workspace__region[data-region-id="global"]')).toHaveAttribute('data-mode','expanded');
  await root.getByRole('button',{name:'恢复课程导航',exact:true}).click();await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toBeVisible();
});
test('N05 temporary pin, unpin and outside preserve one region instance',async({page})=>{
  await open(page);const root=page.locator('.nv42-r2');const initial=await root.locator('.rain-workspace__region[data-region-id="context"]').getAttribute('id');
  await root.getByRole('button',{name:'取消固定，改为临时课程导航',exact:true}).click();
  const overlay=await box(page,'.nv42-main');
  await root.getByRole('button',{name:'固定课程导航',exact:true}).click();await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toHaveAttribute('data-temporary','false');
  expect((await box(page,'.nv42-main')).x-overlay.x).toBe(221);
  await root.getByRole('button',{name:'取消固定，改为临时课程导航',exact:true}).click();
  await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toHaveAttribute('data-temporary','true');
  await root.getByRole('button',{name:'预览学生端',exact:true}).click();
  await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toBeHidden();expect(await box(page,'.nv42-main')).toEqual(overlay);
  expect(await root.locator('.rain-workspace__region[data-region-id="context"]').getAttribute('id')).toBe(initial);
});
test('N26 nested semester popup consumes Escape before the temporary panel',async({page})=>{
  await open(page);const root=page.locator('.nv42-r2');
  await root.getByRole('button',{name:'取消固定，改为临时课程导航',exact:true}).click();
  await root.locator('.nv42-term').click();await expect(page.getByRole('menu')).toBeVisible();
  await page.keyboard.press('Escape');await expect(page.getByRole('menu')).toHaveCount(0);await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toHaveAttribute('data-temporary','true');
  await page.keyboard.press('Escape');await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toBeHidden();await expect(root.getByRole('button',{name:'恢复课程导航',exact:true})).toBeFocused();
});
test('N08 focus restores the hidden layout and an independent editor draft',async({page})=>{
  await page.goto('/navigation-v042-consumer.html');const text='布局切换保留的当前课程草稿';const draft=page.getByRole('textbox',{name:'教学目标草稿'});await draft.fill(text);
  await page.getByRole('button',{name:'隐藏课程导航',exact:true}).first().click();await page.getByRole('button',{name:'专注内容',exact:true}).click();await page.getByRole('button',{name:'退出专注',exact:true}).click();
  await expect(page.locator('.rain-workspace__region[data-region-id="context"]')).toBeHidden();await expect(page.locator('.rain-workspace__region[data-region-id="global"]')).toHaveAttribute('data-mode','compact');await expect(draft).toHaveValue(text);
});
test('N24 splitter keys clamp width, Enter hides and keyboard restores',async({page})=>{
  await open(page,'R3');const root=page.locator('[data-rain-id="recipe-navigation-r3"]');const splitter=root.getByRole('separator',{name:'调整资源目录宽度'});
  await splitter.focus();await page.keyboard.press('Shift+ArrowRight');await expect(splitter).toHaveAttribute('aria-valuenow','248');
  await page.keyboard.press('Home');await expect(splitter).toHaveAttribute('aria-valuenow','180');await page.keyboard.press('End');await expect(splitter).toHaveAttribute('aria-valuenow','420');
  await page.keyboard.press('Enter');await expect(splitter).toBeHidden();await expect(root.getByRole('button',{name:'显示资源目录',exact:true})).toBeFocused();
  await page.keyboard.press('Enter');await expect(splitter).toBeVisible();await expect(splitter).toHaveAttribute('aria-valuenow','420');
});
test('accepted R2 brand remains mounted through full, compact and reverse motion',async({page})=>{
  await open(page);await page.emulateMedia({reducedMotion:'no-preference'});const rail=page.locator('.nv42-rail');
  const facts=await rail.evaluate(async element=>{const brand=element.querySelector('.nv42-brand strong')!;const control=()=>element.querySelector<HTMLButtonElement>('.nv42-rail-head button')!;const widths:number[]=[];control().click();const start=performance.now();while(performance.now()-start<350){await new Promise(requestAnimationFrame);widths.push(element.getBoundingClientRect().width);}control().click();await new Promise(resolve=>setTimeout(resolve,350));return {same:brand===element.querySelector('.nv42-brand strong'),widths,final:element.getBoundingClientRect().width};});
  expect(facts.same).toBe(true);expect(facts.widths.at(-1)).toBe(208);expect(facts.widths.filter(width=>width>64&&width<208).length).toBeGreaterThan(2);expect(facts.final).toBe(64);
  await page.emulateMedia({reducedMotion:'reduce'});await expect(rail).toHaveCSS('transition-duration','0s');
});
