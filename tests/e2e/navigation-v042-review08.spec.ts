import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import {expect,test,type Locator,type Page} from '@playwright/test';
import {mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';

const evidence=evidenceOutputPath(resolve('evidence/runtime/navigation-v042/w5/review-08-r4-details'));
const capture=process.env.R4_DETAILS_CAPTURE;
const open=async(page:Page,sample='R4',width=1440,scene='interaction')=>{
  await page.goto(`/?sample=${sample}#navigation-v042`);
  await page.getByRole('combobox',{name:'业务子场景'}).selectOption(scene);
  await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));
  const root=page.locator('[data-recipe-id="recipe-navigation-r4"]');await expect(root).toBeVisible();return root;
};
const metrics=(root:Locator)=>root.evaluate(el=>{
  const rect=(node:Element)=>{const r=node.getBoundingClientRect();return {width:r.width,height:r.height};};
  const label=el.querySelector('.nv5-class-context>h4')!;
  const row=el.querySelector('.nv5-group-objects [data-active="true"] .rain-navigation-family__row')!;
  return {headers:Array.from(el.querySelectorAll('.nv5-region-head>[data-rain-id="ui-icon-button"]')).map(button=>({name:button.getAttribute('aria-label'),size:button.getAttribute('data-size'),target:rect(button),icon:rect(button.querySelector('[data-slot="icon"]')!)})),label:{weight:getComputedStyle(label).fontWeight,color:getComputedStyle(label).color},selected:{text:row.textContent,background:getComputedStyle(row).backgroundColor},tokens:{brandAlpha:getComputedStyle(row).getPropertyValue('--rain-category-fill-brand-alpha-3').trim(),label:getComputedStyle(label).getPropertyValue('--rain-category-text-neutral-6').trim()}};
});
const tokenColor=(root:Locator,token:string)=>root.evaluate((el,token)=>{const probe=document.createElement('span');probe.style.color=`var(${token})`;probe.style.visibility='hidden';el.append(probe);const color=getComputedStyle(probe).color;probe.remove();return color;},token);
const settle=async(page:Page,root:Locator)=>{await root.locator('img').evaluateAll(async images=>{await Promise.all(images.map(async img=>{try{await (img as HTMLImageElement).decode();}catch{}}));});await page.mouse.move(1790,1090);};

test('capture review08 before or after at all existing canvas widths',async({page})=>{
  test.skip(!capture,'Separate immutable visual evidence capture.');
  const dir=resolve(evidence,capture!);mkdirSync(dir,{recursive:true});const cases:Record<string,unknown>={};
  for(const width of [1200,1440,1600]){const root=await open(page,'R4',width);await settle(page,root);cases[`R4-${width}`]=await metrics(root);await root.screenshot({path:resolve(dir,`R4-${width}.png`)});}
  const root=await open(page,'S4');await settle(page,root);cases.S4=await metrics(root);await root.screenshot({path:resolve(dir,'S4-1440.png')});
  writeFileSync(resolve(dir,'measurements.json'),JSON.stringify({recordedAt:new Date().toISOString(),cases},null,2));
});
test.describe('Review08 local feedback',()=>{
  test.skip(Boolean(capture),'Assertions are separate from before/after evidence.');
  for(const width of [1200,1440,1600])test(`smaller header icons retain usable targets and selected group theme at ${width}`,async({page})=>{
    const root=await open(page,'R4',width),now=await metrics(root);expect(now.headers).toHaveLength(4);
    for(const button of now.headers){expect(button.size).toBe('32/14');expect(button.target).toEqual({width:32,height:32});expect(button.icon).toEqual({width:14,height:14});}
    expect(now.label.weight).toBe('400');expect(now.label.color).toBe(await tokenColor(root,'--rain-category-text-neutral-6'));
    expect(now.selected.background).toBe(await tokenColor(root,'--rain-category-fill-brand-alpha-3'));expect(now.selected.background).toMatch(/^rgba\(/);
    const rows=root.getByRole('group',{name:'小组结果',exact:true}),selected=rows.getByRole('button',{name:'第一小分队',exact:true}),other=rows.getByRole('button',{name:'探索者小组',exact:true});
    await selected.hover();expect((await metrics(root)).selected.background).toBe(now.selected.background);
    await other.focus();await page.keyboard.press('Enter');await expect(other).toHaveAttribute('aria-pressed','true');await expect(selected).toHaveAttribute('aria-pressed','false');
    await expect(root.getByRole('heading',{name:'探索者小组',exact:true})).toBeVisible();await expect(root.getByLabel('当前小组得分')).toContainText('8.5');
    expect((await metrics(root)).selected.background).toBe(now.selected.background);
  });
  test('small pin and hide controls preserve selection through temporary recovery in S4',async({page})=>{
    const root=await open(page,'S4'),queue=root.locator('.rain-workspace__region[data-region-id="queue"]'),context=root.locator('.rain-workspace__region[data-region-id="context"]');
    const other=root.getByRole('group',{name:'小组结果',exact:true}).getByRole('button',{name:'探索者小组',exact:true});await other.click();
    for(const [pane,label,id] of [[queue,'小组列表','queue'],[context,'课堂功能','context']] as const){
      await pane.getByRole('button',{name:`取消固定${label}`,exact:true}).click();await expect(pane).toHaveAttribute('data-temporary','true');
      const pin=pane.getByRole('button',{name:`固定${label}`,exact:true});await expect(pin).toHaveAttribute('data-size','32/14');await pin.focus();await page.keyboard.press('Enter');await expect(pane).toHaveAttribute('data-temporary','false');
      const hide=pane.getByRole('button',{name:`隐藏${label}`,exact:true});await hide.focus();await page.keyboard.press('Enter');await expect(pane).toBeHidden();
      await root.locator(`.rain-workspace__restore[aria-controls$="-workspace-${id}"]`).first().click();await expect(pane).toBeVisible();
      // S4 restores hidden panes temporarily; pin before opening a different pane.
      if(await pane.getAttribute('data-temporary')==='true')await pane.getByRole('button',{name:`固定${label}`,exact:true}).click();
    }
    await expect(other).toHaveAttribute('aria-pressed','true');await expect(root.getByRole('heading',{name:'探索者小组',exact:true})).toBeVisible();
    expect((await metrics(root)).label.weight).toBe('400');
  });
  test('shared RegionHead defaults stay at 32/18; replay knowledge controls use accepted 32/14 recipe',async({page})=>{
    await open(page,'R4',1440,'grading');
    for(const sample of ['R4','R5','R6']){
      if(sample!=='R4'){await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:sample,exact:true}).click();}
      const controls=page.getByTestId('candidate-canvas').locator('.nv5-region-head>[data-rain-id="ui-icon-button"]');expect(await controls.count()).toBeGreaterThan(0);
      // Review08 defaults remain 32/18; accepted later R5 knowledge refinement is local.
      // Owning calls are frozen in w5/review-13-r3-actions/accepted-review12-source.json.
      for(const button of await controls.all()){
        const owner=await button.evaluate(el=>el.closest('.rain-workspace__region')?.getAttribute('data-region-id'));
        const iconSize=sample==='R5'&&owner==='knowledge'?14:18;
        if(sample==='R5')expect(['events','knowledge']).toContain(owner);
        await expect(button).toHaveAttribute('data-size',`32/${iconSize}`);
        expect(await button.evaluate(el=>({width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height}))).toEqual({width:32,height:32});
        expect(await button.locator('[data-slot="icon"]').evaluate(el=>({width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height}))).toEqual({width:iconSize,height:iconSize});
      }
    }
  });
});
