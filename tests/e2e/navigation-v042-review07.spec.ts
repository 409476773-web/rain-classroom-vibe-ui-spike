import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import {test,expect,type Locator} from '@playwright/test';
const evidence=process.env.NAVIGATION_PLATFORM_EVIDENCE_DIR??evidenceOutputPath('evidence/runtime/navigation-v042/w5/review-07-cross-page/platform-final');
// Review07 behavior is retained against the accepted Review11/12 successor:
// w5/review-11-annotations-navigation/scope.md, w5/review-12-pale-splitters/scope.md;
// owning source is frozen by g2-acceptance-13/accepted-source-before-status.json.
const color=async(root:Locator,value:string)=>root.evaluate((el,paint)=>{const probe=document.createElement('span');probe.style.color=paint;probe.style.position='absolute';probe.style.visibility='hidden';el.append(probe);const expected=getComputedStyle(probe).color;probe.remove();return expected;},value);
const open=async(page:import('@playwright/test').Page,sample:string,width:number)=>{await page.goto('/#navigation-v042');await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:sample,exact:true}).click();await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));};
for(const sample of ['R1','R2','R3','R4','R5','R6','S1','S2','S3','S4','S5','S6'])for(const width of [1200,1440,1600])test(`${sample} ${width} platform states consume category Tokens and preserve icon geometry`,async({page})=>{
 await open(page,sample,width);
 const platform=page.locator('.rain-workspace__region:is(.nv43-platform,.nv42-global-region,.nv5-platform,.nv44-global)').first();
 if(!await platform.isVisible())await page.locator('.rain-workspace__restore[aria-controls$="-workspace-global"]').first().click();
 await expect(platform).toBeVisible();
 const current=platform.locator('.rain-navigation-family__item[data-active="true"] .rain-navigation-family__row,.nv42-rail [data-slot="item"][data-active]').first();
 await expect(current).toBeVisible();
 const fact=await current.evaluate(el=>{const s=getComputedStyle(el);const t=s.getPropertyValue('--rain-category-oncolor-1').trim();return {bg:s.backgroundColor,token:t};});
 expect(fact.bg).toBe(await color(platform,'var(--rain-category-oncolor-1)'));expect(fact.token.match(/\d+/g)?.map(Number)).toEqual([255,255,255]);
 const other=platform.locator('.rain-navigation-family__item:not([data-active="true"]) .rain-navigation-family__row,.nv42-rail [data-slot="item"]:not([data-active])').first();
 await other.hover();
 expect(await other.evaluate(el=>getComputedStyle(el).backgroundColor)).toBe(await color(platform,'color-mix(in srgb, var(--rain-category-oncolor-1) 51%, transparent)'));
 await platform.screenshot({path:`${evidence}/${sample}-${width}-hover.png`});
 await page.mouse.move(1750,1000);
 const icons=platform.locator('.rain-navigation-family__leading>[data-rain-id="icon"],.nv42-rail-links [data-slot="icon"]>[data-rain-id="icon"]');
 const sizes=()=>icons.evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return [r.width,r.height];}));
 const before=await sizes();expect(before).toHaveLength(4);expect(before).toEqual(Array.from({length:4},()=>[18,18]));
 const alignment=await icons.evaluateAll(els=>els.map(el=>{const entry=el.closest('.rain-navigation-family__entry,.nv42-rail [data-slot="item"]')!,a=entry.getBoundingClientRect(),b=el.getBoundingClientRect();const list=entry.closest('.rain-navigation-list');const compact=list?list.getAttribute('data-appearance')==='icons':entry.closest('.rain-workspace__region')?.getAttribute('data-mode')==='compact';return {x:compact?Math.abs(b.x+b.width/2-a.x-a.width/2):0,y:Math.abs(b.y+b.height/2-a.y-a.height/2)};}));
 for(const icon of alignment){expect(icon.x).toBeLessThanOrEqual(1);expect(icon.y).toBeLessThanOrEqual(1);}
 await platform.screenshot({path:`${evidence}/${sample}-${width}-initial.png`});
 if(width===1600){
 const expand=page.getByRole('button',{name:'展开平台导航',exact:true});
 const expanding=Boolean(await expand.count());
 if(expanding)await expand.first().click();else await page.getByRole('button',{name:'收起平台导航',exact:true}).first().click();
 // The accepted controller owns 64/208px tracks; R2 animates width/flex-basis in r2.css.
 // Stable glyph size cannot signal that this track transition has reached its endpoint.
 // RecoverableRegion keeps the compact base mode when expansion is temporary.
 await expect.poll(async()=>{const mode=await platform.getAttribute('data-mode'),temporary=await platform.getAttribute('data-temporary')==='true';return expanding?mode==='expanded'||temporary:mode==='compact'&&!temporary;}).toBe(true);
 await expect.poll(async()=>(await platform.boundingBox())?.width).toBe(expanding?208:64);
 await expect.poll(sizes).toEqual(before);
 const bounds=await platform.boundingBox(),row=await current.boundingBox();expect(row!.x).toBeGreaterThanOrEqual(bounds!.x);expect(row!.x+row!.width).toBeLessThanOrEqual(bounds!.x+bounds!.width);
 await platform.screenshot({path:`${evidence}/${sample}-${width}-toggled.png`});
 if(sample==='R3')await page.locator('.rain-workspace').screenshot({path:`${evidence}/R3-expanded-workspace.png`});
 }
});
for(const sample of ['A4','Connections'])test(`${sample} search no match gives a visible status and retains focus return`,async({page})=>{
 await open(page,sample,1440);await page.getByRole('button',{name:sample==='A4'?'全部班级':'全部',exact:true}).click();await page.getByRole('textbox',{name:'搜索范围'}).fill('没有这个班级');await expect(page.getByRole('status')).toHaveText('无匹配范围');await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:sample==='A4'?'全部班级':'全部',exact:true})).toBeFocused();
});
test('R2 content filters, scope identity and temporary layout preserve the existing resource draft',async({page})=>{
 await open(page,'R2',1600);const root=page.locator('.nv42-r2-frame');
 if(await root.getByRole('button',{name:'进入编辑',exact:true}).count())await root.getByRole('button',{name:'进入编辑',exact:true}).click();await expect(root.getByRole('button',{name:'退出编辑'})).toBeVisible();
 await root.getByRole('radio',{name:'作业',exact:true}).locator('..').click();await expect(root.getByRole('tree',{name:'课程内容编辑树'})).toBeVisible();
 await root.getByRole('button',{name:'专注内容',exact:true}).click();await expect(root.getByRole('button',{name:'退出编辑'})).toBeVisible();
 await root.getByRole('button',{name:'退出专注',exact:true}).click();await expect(root.getByRole('radio',{name:'作业',exact:true})).toBeChecked();
 await root.getByRole('button',{name:'更多班级',exact:true}).click();await expect(page.getByRole('textbox',{name:'搜索范围'})).toBeVisible();await page.getByRole('textbox',{name:'搜索范围'}).fill('不存在的范围');await expect(page.getByRole('status').filter({hasText:'没有匹配的范围'})).toBeVisible();await page.keyboard.press('Escape');
});
