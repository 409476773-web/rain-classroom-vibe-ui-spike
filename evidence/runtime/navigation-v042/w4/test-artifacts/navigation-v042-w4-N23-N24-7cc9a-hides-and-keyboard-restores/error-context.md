# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w4.spec.ts >> N23 N24 N25 splitter keys clamp width, Enter hides and keyboard restores
- Location: tests/e2e/navigation-v042-w4.spec.ts:50:1

# Error details

```
Error: expect(locator).toBeFocused() failed

Locator:  locator('[data-rain-id="recipe-navigation-r3"]').getByRole('button', { name: '显示资源目录', exact: true })
Expected: focused
Received: inactive
Timeout:  5000ms

Call log:
  - Expect "toBeFocused" with timeout 5000ms
  - waiting for locator('[data-rain-id="recipe-navigation-r3"]').getByRole('button', { name: '显示资源目录', exact: true })
    14 × locator resolved to <button type="button" title="显示资源目录" data-mode="hidden" data-active="false" aria-label="显示资源目录" aria-expanded="false" data-workspace-action="restore" class="rain-workspace__restore " aria-controls="_r_1_-workspace-context">…</button>
       - unexpected value "inactive"

```

```yaml
- button "显示资源目录"
```

# Test source

```ts
  1  | import { expect, test, type Page } from '@playwright/test';
  2  | const open=async(page:Page,sample='R2')=>{await page.goto(`/?sample=${sample}#navigation-v042`);await expect(page.getByRole('heading',{name:'导航组件 · v0.4.2'})).toBeVisible();};
  3  | const box=async(page:Page,selector:string)=>page.locator(selector).evaluate(element=>{const r=element.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};});
  4  | 
  5  | test('N01 all-hidden R2 has stable named keyboard recovery and untouched scope',async({page})=>{
  6  |   await open(page);const root=page.locator('.nv42-r2');
  7  |   await root.getByRole('button',{name:'布局',exact:true}).click();
  8  |   const menu=page.getByRole('dialog',{name:'R2 布局'});
  9  |   await menu.getByRole('checkbox',{name:'显示平台导航',exact:true}).uncheck();
  10 |   await menu.getByRole('checkbox',{name:'显示课程导航',exact:true}).uncheck();
  11 |   await page.keyboard.press('Escape');
  12 |   await expect(root.locator('[data-region-id="global"]')).toBeHidden();await expect(root.locator('[data-region-id="context"]')).toBeHidden();
  13 |   const restore=root.getByRole('button',{name:'恢复课程导航',exact:true});const controlled=await restore.getAttribute('aria-controls');
  14 |   await expect(page.locator(`[id="${controlled}"]`)).toHaveCount(1);
  15 |   await restore.focus();await page.keyboard.press('Enter');await expect(root.locator('[data-region-id="context"]')).toBeVisible();
  16 |   await expect(root.getByRole('tab',{name:'公共资源包',exact:true})).toHaveAttribute('aria-selected','true');
  17 | });
  18 | test('N02 N03 temporary dismiss and the next controller complete on the first click',async({page})=>{
  19 |   await open(page);const root=page.locator('.nv42-r2');
  20 |   await root.getByRole('button',{name:'取消固定，改为临时课程导航',exact:true}).click();
  21 |   await expect(root.locator('[data-region-id="context"]')).toHaveAttribute('data-temporary','true');
  22 |   await root.locator('.nv42-workspace-bar').getByRole('button',{name:'展开平台导航',exact:true}).click();
  23 |   await expect(root.locator('[data-region-id="context"]')).toBeHidden();await expect(root.locator('[data-region-id="global"]')).toHaveAttribute('data-mode','expanded');
  24 |   await root.getByRole('button',{name:'恢复课程导航',exact:true}).click();await expect(root.locator('[data-region-id="context"]')).toBeVisible();
  25 | });
  26 | test('N05 N22 temporary pin, unpin and outside preserve one region instance',async({page})=>{
  27 |   await open(page);const root=page.locator('.nv42-r2');const initial=await root.locator('[data-region-id="context"]').getAttribute('id');
  28 |   await root.getByRole('button',{name:'取消固定，改为临时课程导航',exact:true}).click();
  29 |   const overlay=await box(page,'.nv42-main');
  30 |   await root.getByRole('button',{name:'固定课程导航',exact:true}).click();await expect(root.locator('[data-region-id="context"]')).toHaveAttribute('data-temporary','false');
  31 |   expect((await box(page,'.nv42-main')).x-overlay.x).toBe(221);
  32 |   await root.getByRole('button',{name:'取消固定，改为临时课程导航',exact:true}).click();
  33 |   await expect(root.locator('[data-region-id="context"]')).toHaveAttribute('data-temporary','true');
  34 |   await root.getByRole('heading',{name:'知识点总览',exact:true}).click();
  35 |   await expect(root.locator('[data-region-id="context"]')).toBeHidden();expect(await box(page,'.nv42-main')).toEqual(overlay);
  36 |   expect(await root.locator('[data-region-id="context"]').getAttribute('id')).toBe(initial);
  37 | });
  38 | test('N14 N15 nested semester popup consumes Escape before the temporary panel',async({page})=>{
  39 |   await open(page);const root=page.locator('.nv42-r2');
  40 |   await root.getByRole('button',{name:'取消固定，改为临时课程导航',exact:true}).click();
  41 |   await root.locator('.nv42-term').click();await expect(page.getByRole('menu')).toBeVisible();
  42 |   await page.keyboard.press('Escape');await expect(page.getByRole('menu')).toHaveCount(0);await expect(root.locator('[data-region-id="context"]')).toHaveAttribute('data-temporary','true');
  43 |   await page.keyboard.press('Escape');await expect(root.locator('[data-region-id="context"]')).toBeHidden();await expect(root.getByRole('button',{name:'恢复课程导航',exact:true})).toBeFocused();
  44 | });
  45 | test('N08 N12 focus restores the hidden layout and an independent editor draft',async({page})=>{
  46 |   await page.goto('/navigation-v042-consumer.html');const text='布局切换保留的当前课程草稿';const draft=page.getByRole('textbox',{name:'教学目标草稿'});await draft.fill(text);
  47 |   await page.getByRole('button',{name:'隐藏课程导航',exact:true}).first().click();await page.getByRole('button',{name:'专注内容',exact:true}).click();await page.getByRole('button',{name:'退出专注',exact:true}).click();
  48 |   await expect(page.locator('[data-region-id="context"]')).toBeHidden();await expect(page.locator('[data-region-id="global"]')).toHaveAttribute('data-mode','compact');await expect(draft).toHaveValue(text);
  49 | });
  50 | test('N23 N24 N25 splitter keys clamp width, Enter hides and keyboard restores',async({page})=>{
  51 |   await open(page,'R3');const root=page.locator('[data-rain-id="recipe-navigation-r3"]');const splitter=root.getByRole('separator',{name:'调整资源目录宽度'});
  52 |   await splitter.focus();await page.keyboard.press('Shift+ArrowRight');await expect(splitter).toHaveAttribute('aria-valuenow','248');
  53 |   await page.keyboard.press('Home');await expect(splitter).toHaveAttribute('aria-valuenow','180');await page.keyboard.press('End');await expect(splitter).toHaveAttribute('aria-valuenow','420');
> 54 |   await page.keyboard.press('Enter');await expect(splitter).toBeHidden();await expect(root.getByRole('button',{name:'显示资源目录',exact:true})).toBeFocused();
     |                                                                                                                                            ^ Error: expect(locator).toBeFocused() failed
  55 |   await page.keyboard.press('Enter');await expect(splitter).toBeVisible();await expect(splitter).toHaveAttribute('aria-valuenow','420');
  56 | });
  57 | test('accepted R2 brand remains mounted through full, compact and reverse motion',async({page})=>{
  58 |   await open(page);await page.emulateMedia({reducedMotion:'no-preference'});const rail=page.locator('.nv42-rail');
  59 |   const facts=await rail.evaluate(async element=>{const brand=element.querySelector('.nv42-brand strong')!;const control=()=>element.querySelector<HTMLButtonElement>('.nv42-rail-head button')!;const widths:number[]=[];control().click();const start=performance.now();while(performance.now()-start<350){await new Promise(requestAnimationFrame);widths.push(element.getBoundingClientRect().width);}control().click();await new Promise(resolve=>setTimeout(resolve,350));return {same:brand===element.querySelector('.nv42-brand strong'),widths,final:element.getBoundingClientRect().width};});
  60 |   expect(facts.same).toBe(true);expect(facts.widths.at(-1)).toBe(208);expect(facts.widths.filter(width=>width>64&&width<208).length).toBeGreaterThan(2);expect(facts.final).toBe(64);
  61 |   await page.emulateMedia({reducedMotion:'reduce'});await expect(rail).toHaveCSS('transition-duration','0s');
  62 | });
  63 | 
```