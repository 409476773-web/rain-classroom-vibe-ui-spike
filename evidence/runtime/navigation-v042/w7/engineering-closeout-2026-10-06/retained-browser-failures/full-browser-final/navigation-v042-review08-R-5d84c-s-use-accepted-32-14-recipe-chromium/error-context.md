# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-review08.spec.ts >> Review08 local feedback >> shared RegionHead defaults stay at 32/18; replay knowledge controls use accepted 32/14 recipe
- Location: tests/e2e/navigation-v042-review08.spec.ts:56:3

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('candidate-canvas').locator('.nv5-region-head>[data-rain-id="ui-icon-button"]').first()
Expected: "32/14"
Received: "32/18"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for getByTestId('candidate-canvas').locator('.nv5-region-head>[data-rain-id="ui-icon-button"]').first()
    14 × locator resolved to <button type="button" data-slot="root" data-size="32/18" data-variant="fill" data-tone="default" data-state="default" data-focus="control" aria-label="取消固定回顾列表" data-highlight="none" data-density="default" data-rain-state="default" data-workspace-action="pin" data-feedback="interactive" data-rain-id="ui-icon-button" data-local-recipe="navigation-v042-w5-auxiliary-icon" class="rain-icon-button box-border relative inline-flex flex-none items-center justify-center p-rain-0 border-none overflow-visible al…>…</button>
       - unexpected value "32/18"

```

```yaml
- button "取消固定回顾列表"
```

# Test source

```ts
  1  | import {expect,test,type Locator,type Page} from '@playwright/test';
  2  | import {mkdirSync,writeFileSync} from 'node:fs';
  3  | import {resolve} from 'node:path';
  4  | 
  5  | const evidence=resolve('evidence/runtime/navigation-v042/w5/review-08-r4-details');
  6  | const capture=process.env.R4_DETAILS_CAPTURE;
  7  | const open=async(page:Page,sample='R4',width=1440,scene='interaction')=>{
  8  |   await page.goto(`/?sample=${sample}#navigation-v042`);
  9  |   await page.getByRole('combobox',{name:'业务子场景'}).selectOption(scene);
  10 |   await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));
  11 |   const root=page.locator('[data-recipe-id="recipe-navigation-r4"]');await expect(root).toBeVisible();return root;
  12 | };
  13 | const metrics=(root:Locator)=>root.evaluate(el=>{
  14 |   const rect=(node:Element)=>{const r=node.getBoundingClientRect();return {width:r.width,height:r.height};};
  15 |   const label=el.querySelector('.nv5-class-context>h4')!;
  16 |   const row=el.querySelector('.nv5-group-objects [data-active="true"] .rain-navigation-family__row')!;
  17 |   return {headers:Array.from(el.querySelectorAll('.nv5-region-head>[data-rain-id="ui-icon-button"]')).map(button=>({name:button.getAttribute('aria-label'),size:button.getAttribute('data-size'),target:rect(button),icon:rect(button.querySelector('[data-slot="icon"]')!)})),label:{weight:getComputedStyle(label).fontWeight,color:getComputedStyle(label).color},selected:{text:row.textContent,background:getComputedStyle(row).backgroundColor},tokens:{brandAlpha:getComputedStyle(row).getPropertyValue('--rain-category-fill-brand-alpha-3').trim(),label:getComputedStyle(label).getPropertyValue('--rain-category-text-neutral-6').trim()}};
  18 | });
  19 | const tokenColor=(root:Locator,token:string)=>root.evaluate((el,token)=>{const probe=document.createElement('span');probe.style.color=`var(${token})`;probe.style.visibility='hidden';el.append(probe);const color=getComputedStyle(probe).color;probe.remove();return color;},token);
  20 | const settle=async(page:Page,root:Locator)=>{await root.locator('img').evaluateAll(async images=>{await Promise.all(images.map(async img=>{try{await (img as HTMLImageElement).decode();}catch{}}));});await page.mouse.move(1790,1090);};
  21 | 
  22 | test('capture review08 before or after at all existing canvas widths',async({page})=>{
  23 |   test.skip(!capture,'Separate immutable visual evidence capture.');
  24 |   const dir=resolve(evidence,capture!);mkdirSync(dir,{recursive:true});const cases:Record<string,unknown>={};
  25 |   for(const width of [1200,1440,1600]){const root=await open(page,'R4',width);await settle(page,root);cases[`R4-${width}`]=await metrics(root);await root.screenshot({path:resolve(dir,`R4-${width}.png`)});}
  26 |   const root=await open(page,'S4');await settle(page,root);cases.S4=await metrics(root);await root.screenshot({path:resolve(dir,'S4-1440.png')});
  27 |   writeFileSync(resolve(dir,'measurements.json'),JSON.stringify({recordedAt:new Date().toISOString(),cases},null,2));
  28 | });
  29 | test.describe('Review08 local feedback',()=>{
  30 |   test.skip(Boolean(capture),'Assertions are separate from before/after evidence.');
  31 |   for(const width of [1200,1440,1600])test(`smaller header icons retain usable targets and selected group theme at ${width}`,async({page})=>{
  32 |     const root=await open(page,'R4',width),now=await metrics(root);expect(now.headers).toHaveLength(4);
  33 |     for(const button of now.headers){expect(button.size).toBe('32/14');expect(button.target).toEqual({width:32,height:32});expect(button.icon).toEqual({width:14,height:14});}
  34 |     expect(now.label.weight).toBe('400');expect(now.label.color).toBe(await tokenColor(root,'--rain-category-text-neutral-6'));
  35 |     expect(now.selected.background).toBe(await tokenColor(root,'--rain-category-fill-brand-alpha-3'));expect(now.selected.background).toMatch(/^rgba\(/);
  36 |     const rows=root.getByRole('group',{name:'小组结果',exact:true}),selected=rows.getByRole('button',{name:'第一小分队',exact:true}),other=rows.getByRole('button',{name:'探索者小组',exact:true});
  37 |     await selected.hover();expect((await metrics(root)).selected.background).toBe(now.selected.background);
  38 |     await other.focus();await page.keyboard.press('Enter');await expect(other).toHaveAttribute('aria-pressed','true');await expect(selected).toHaveAttribute('aria-pressed','false');
  39 |     await expect(root.getByRole('heading',{name:'探索者小组',exact:true})).toBeVisible();await expect(root.getByLabel('当前小组得分')).toContainText('8.5');
  40 |     expect((await metrics(root)).selected.background).toBe(now.selected.background);
  41 |   });
  42 |   test('small pin and hide controls preserve selection through temporary recovery in S4',async({page})=>{
  43 |     const root=await open(page,'S4'),queue=root.locator('.rain-workspace__region[data-region-id="queue"]'),context=root.locator('.rain-workspace__region[data-region-id="context"]');
  44 |     const other=root.getByRole('group',{name:'小组结果',exact:true}).getByRole('button',{name:'探索者小组',exact:true});await other.click();
  45 |     for(const [pane,label,id] of [[queue,'小组列表','queue'],[context,'课堂功能','context']] as const){
  46 |       await pane.getByRole('button',{name:`取消固定${label}`,exact:true}).click();await expect(pane).toHaveAttribute('data-temporary','true');
  47 |       const pin=pane.getByRole('button',{name:`固定${label}`,exact:true});await expect(pin).toHaveAttribute('data-size','32/14');await pin.focus();await page.keyboard.press('Enter');await expect(pane).toHaveAttribute('data-temporary','false');
  48 |       const hide=pane.getByRole('button',{name:`隐藏${label}`,exact:true});await hide.focus();await page.keyboard.press('Enter');await expect(pane).toBeHidden();
  49 |       await root.locator(`.rain-workspace__restore[aria-controls$="-workspace-${id}"]`).first().click();await expect(pane).toBeVisible();
  50 |       // S4 restores hidden panes temporarily; pin before opening a different pane.
  51 |       if(await pane.getAttribute('data-temporary')==='true')await pane.getByRole('button',{name:`固定${label}`,exact:true}).click();
  52 |     }
  53 |     await expect(other).toHaveAttribute('aria-pressed','true');await expect(root.getByRole('heading',{name:'探索者小组',exact:true})).toBeVisible();
  54 |     expect((await metrics(root)).label.weight).toBe('400');
  55 |   });
  56 |   test('shared RegionHead defaults stay at 32/18; replay knowledge controls use accepted 32/14 recipe',async({page})=>{
  57 |     await open(page,'R4',1440,'grading');
  58 |     for(const sample of ['R4','R5','R6']){
  59 |       if(sample!=='R4'){await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:sample,exact:true}).click();}
  60 |       const controls=page.getByTestId('candidate-canvas').locator('.nv5-region-head>[data-rain-id="ui-icon-button"]');expect(await controls.count()).toBeGreaterThan(0);
> 61 |       for(const button of await controls.all()){const iconSize=sample==='R5'?14:18;await expect(button).toHaveAttribute('data-size',`32/${iconSize}`);expect(await button.locator('[data-slot="icon"]').evaluate(el=>el.getBoundingClientRect().width)).toBe(iconSize);}
     |                                                                                                         ^ Error: expect(locator).toHaveAttribute(expected) failed
  62 |     }
  63 |   });
  64 | });
  65 | 
```