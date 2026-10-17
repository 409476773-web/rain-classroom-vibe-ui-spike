import { chromium, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const repo=process.cwd(),evidence=path.dirname(fileURLToPath(import.meta.url));
const runDir=path.join(evidence,'run-'+new Date().toISOString().replace(/[:.]/g,'-'));
await fs.mkdir(runDir,{recursive:true});
const report={at:new Date().toISOString(),runDir,scope:'Current local navigation-v042 R1–R6/S1–S6 consumers, including R4 grading and R6 edit. Existing shared PaneSplitter unchanged. Latest feedback also reduces platform unit glyphs to 18px and strengthens the discussion title.',normalCases:[],platformCases:[],interactionCases:[],errors:[],failures:[],assertions:0};
const sourceFiles=['apps/playground/src/recipes/navigation-v042/platform-navigation.css','apps/playground/src/recipes/navigation-v042/r1-r3.css','apps/playground/src/recipes/navigation-v042/r1-r3.tsx','apps/playground/src/recipes/navigation-v042/r2.css','apps/playground/src/recipes/navigation-v042/r2.tsx','apps/playground/src/recipes/navigation-v042/r4-r6.css','apps/playground/src/recipes/navigation-v042/r4-r6.tsx','apps/playground/src/recipes/navigation-v042/workspace-states.css','apps/playground/src/recipes/navigation-v042/workspace-states.tsx','packages/layouts/src/workspace.css','packages/layouts/src/workspace.tsx'];
const hashes=async()=>Object.fromEntries(await Promise.all(sourceFiles.map(async file=>[file,createHash('sha256').update(await fs.readFile(path.join(repo,file))).digest('hex')])));
report.sourceBefore=await hashes();
if(process.env.EXPECT_PLATFORM_CSS_SHA&&report.sourceBefore[sourceFiles[0]]!==process.env.EXPECT_PLATFORM_CSS_SHA)throw Error('CSS SHA differs from requested final source freeze.');
if(process.env.EXPECT_R4_R6_CSS_SHA&&report.sourceBefore['apps/playground/src/recipes/navigation-v042/r4-r6.css']!==process.env.EXPECT_R4_R6_CSS_SHA)throw Error('R4/R6 CSS SHA differs from requested final source freeze.');
if(process.env.EXPECT_R2_TSX_SHA&&report.sourceBefore['apps/playground/src/recipes/navigation-v042/r2.tsx']!==process.env.EXPECT_R2_TSX_SHA)throw Error('R2 TSX SHA differs from requested final source freeze.');
const check=(caseId,role,actual,expected)=>{report.assertions++;if(JSON.stringify(actual)!==JSON.stringify(expected))report.failures.push({caseId,role,actual,expected});};
const browser=await chromium.launch({headless:true});
const measure=el=>el.evaluate(e=>{const b=getComputedStyle(e,'::before'),a=getComputedStyle(e,'::after'),s=getComputedStyle(e),r=e.getBoundingClientRect(),id=e.dataset.regionId,region=document.getElementById(e.getAttribute('aria-controls'));return {region:id,name:e.getAttribute('aria-label'),side:region?.dataset.side,role:e.getAttribute('role'),orientation:e.getAttribute('aria-orientation'),controls:e.getAttribute('aria-controls'),value:Number(e.getAttribute('aria-valuenow')),min:Number(e.getAttribute('aria-valuemin')),max:Number(e.getAttribute('aria-valuemax')),tabIndex:e.tabIndex,hidden:e.hidden,hover:e.matches(':hover'),active:e.matches(':active'),focusVisible:e.matches(':focus-visible'),width:r.width,height:r.height,cursor:s.cursor,touchAction:s.touchAction,outline:{style:s.outlineStyle,width:s.outlineWidth,color:s.outlineColor},line:{width:b.width,opacity:b.opacity,background:b.backgroundColor},handle:{width:a.width,height:a.height,opacity:a.opacity,background:a.backgroundColor}};});
const token=async(el,name)=>el.evaluate((e,name)=>{const node=document.createElement('span');node.style.color=`var(${name})`;e.append(node);const value=getComputedStyle(node).color;node.remove();return value;},name);
const alpha=color=>color.startsWith('color(')?Number(color.split('/')[1]?.replace(')','').trim()??1):color.startsWith('rgba')?Number(color.match(/[\d.]+/g)?.[3]):1;
const frame=async page=>page.evaluate(async()=>{await document.fonts.ready;for(let n=0;n<3;n++)await new Promise(requestAnimationFrame);});
async function open(sample,width=1440,scene){
 const page=await browser.newPage({viewport:{width:1800,height:1100},locale:'zh-CN',deviceScaleFactor:1,reducedMotion:'reduce'});
 page.setDefaultTimeout(10000);
 page.on('pageerror',e=>report.errors.push({sample,scene,kind:'pageerror',message:e.message}));
 page.on('console',e=>{if(e.type()==='error')report.errors.push({sample,scene,kind:'console-error',message:e.text()});});
 await page.goto(`http://127.0.0.1:5198/?sample=${sample}&audit=review12-splitters#navigation-v042`,{waitUntil:'networkidle'});
 await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));
 if(scene)await page.getByRole('combobox',{name:'业务子场景'}).selectOption(scene);
 const root=page.getByTestId('candidate-canvas').locator('.rain-workspace');
 await expect(root).toBeVisible();await frame(page);
 return{page,root};
}
async function normalCheck(id,el){
 const state=await measure(el),expectedToken=await token(el,'--rain-category-border-neutral-4');
 check(id,'line thickness',state.line.width,'1px');check(id,'normal line opacity',state.line.opacity,'0.4');check(id,'normal line Token',state.line.background,expectedToken);check(id,'normal handle hidden',state.handle.opacity,'0');check(id,'full hit target preserved',state.width>=5,true);check(id,'separator role',state.role,'separator');check(id,'vertical ARIA orientation',state.orientation,'vertical');check(id,'focusable target',state.tabIndex,0);check(id,'resize cursor',state.cursor,'col-resize');check(id,'touch action',state.touchAction,'none');check(id,'valid ARIA range',state.value>=state.min&&state.value<=state.max,true);
 state.normalTokenAlpha=alpha(expectedToken);state.effectiveNormalAlpha=Number((alpha(expectedToken)*Number(state.line.opacity)).toFixed(6));
 check(id,'effective normal alpha',state.effectiveNormalAlpha,0.04);
 return state;
}
const normalDefinitions=[...['R1','R2','R3','R4','R5','R6','S1','S2','S3','S4','S5','S6'].map(sample=>({sample,width:1440})),{sample:'R4',scene:'grading',width:1440},{sample:'R6',width:1600,edit:true}];
for(const def of normalDefinitions){
 const id=def.sample+(def.scene?'-'+def.scene:def.edit?'-form-edit':''),{page,root}=await open(def.sample,def.width,def.scene);
 try{
  if(def.edit){await root.getByRole('tab',{name:'反馈表单',exact:true}).click();await root.getByRole('radio',{name:'编辑表单',exact:true}).locator('..').click();await frame(page);await expect(root.locator('.rain-workspace__splitter[data-region-id="fields"]')).toBeVisible();}
  for(const dark of [false,true]){
   await page.getByLabel('深色外框',{exact:true}).setChecked(dark);await page.mouse.move(1790,1090);await frame(page);
   const splitters=root.locator('.rain-workspace__splitter:not([hidden])'),count=await splitters.count();check(id,'at least one visible draggable boundary',count>0,true);
   const current={id:id+(dark?'-dark':'-light'),sample:def.sample,scene:def.scene??'default',width:def.width,dark,splitters:[]};
   for(const el of await splitters.all())current.splitters.push(await normalCheck(current.id,el));
   if(['R4','S4'].includes(def.sample)&&!def.scene){
    const heading=root.getByRole('heading',{name:/^讨论过程/});
    current.discussion=await heading.evaluate(e=>{const h=getComputedStyle(e),count=getComputedStyle(e.querySelector('small'));return{heading:{weight:h.fontWeight,size:h.fontSize,line:h.lineHeight},count:{weight:count.fontWeight,size:count.fontSize,line:count.lineHeight}};});
    check(current.id,'discussion heading semibold',current.discussion.heading.weight,'600');check(current.id,'discussion heading size retained',current.discussion.heading.size,'14px');check(current.id,'discussion count regular',current.discussion.count.weight,'400');check(current.id,'discussion count size retained',current.discussion.count.size,'12px');
    if(!dark){current.discussionScreenshot=path.join(runDir,`${def.sample}-1440-discussion-heading.png`);await heading.screenshot({path:current.discussionScreenshot,animations:'disabled'});}
   }
   if(def.sample==='R4'&&!def.scene&&!dark){current.screenshot=path.join(runDir,'R4-1440-normal-full.png');await root.screenshot({path:current.screenshot,animations:'disabled'});const queue=root.locator('.rain-workspace__splitter[data-region-id="queue"]');const box=await queue.boundingBox();if(box){current.boundaryScreenshot=path.join(runDir,'R4-1440-normal-boundary.png');await page.screenshot({path:current.boundaryScreenshot,clip:{x:Math.max(0,box.x-32),y:box.y,width:69,height:Math.min(650,box.height)}});}}
   if(def.edit&&!dark){current.screenshot=path.join(runDir,'R6-1600-form-edit-normal-full.png');await root.screenshot({path:current.screenshot,animations:'disabled'});}
   report.normalCases.push(current);
  }
 }catch(e){report.failures.push({caseId:id,kind:'driver-or-contract',message:e.message});}
 finally{await page.close();}
}
const interactions=[{sample:'R2',width:1200},{sample:'R4',width:1200,region:'queue'},{sample:'S3',width:1200},{sample:'S5',width:1200},{sample:'R4',width:1440,scene:'grading',region:'review'},{sample:'R6',width:1600,region:'fields',draft:true}];
for(const sample of ['R1','R2','R3','R4','R5','R6','S1','S2','S3','S4','S5','S6']){
 const{page,root}=await open(sample,1440),rail=root.locator('.rain-workspace__region[data-region-id="global"]');
 try{
  const expanded=async()=>await rail.getAttribute('data-mode')==='expanded'||await rail.getAttribute('data-temporary')==='true';
  for(const dark of [false,true])for(const mode of ['compact','expanded']){
   await page.getByLabel('深色外框',{exact:true}).setChecked(dark);
   if(await expanded()!==(mode==='expanded')){
    if(await rail.isVisible())await rail.getByRole('button',{name:mode==='expanded'?'展开平台导航':/^(关闭临时|收起)平台导航$/,exact:mode==='expanded'}).click();
    else await root.locator('.rain-workspace__restore[aria-controls$="-workspace-global"]').first().click();
   }
   await expect.poll(expanded).toBe(mode==='expanded');await frame(page);
   const id=`${sample}-1440-${dark?'dark':'light'}-${mode}`;
   await expect(rail).toBeVisible();
   const units=await rail.locator('a').evaluateAll(es=>es.map(e=>{const icon=e.querySelector('[data-rain-id="icon"]'),r=icon?.getBoundingClientRect(),leading=e.querySelector('.rain-navigation-family__leading,[data-slot="icon"]'),lr=leading?.getBoundingClientRect(),label=e.querySelector('.rain-navigation-family__label,[data-slot="label"]'),tr=label?.getBoundingClientRect(),row=e.closest('.rain-navigation-family__row')??e,rr=row.getBoundingClientRect();return {label:e.getAttribute('aria-label')??e.textContent.trim(),icon:icon?{width:r.width,height:r.height}:null,slot:lr?{width:lr.width,height:lr.height,glyphX:r.x-lr.x,glyphY:r.y-lr.y}:null,labelStartOffset:tr?.width?tr.x-rr.x:null,row:{width:rr.width,height:rr.height}};}));
   const logo=await rail.locator('.nv42-brand,.nv43-brand,.nv5-brand,.nv44-brand').locator('[data-rain-id="icon"]').evaluate(e=>({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}));
   const helpers=await rail.getByRole('button',{name:/^(通知|帮助)$/}).locator('[data-rain-id="icon"]').evaluateAll(es=>es.map(e=>({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})));
   check(id,'navigation units present',units.length>0,true);for(const unit of units){check(id,unit.label+' glyph size',unit.icon,{width:18,height:18});check(id,unit.label+' row height retained',unit.row.height,40);check(id,unit.label+' slot remains 20px and centers 18px glyph',unit.slot,{width:20,height:20,glyphX:1,glyphY:1});if(mode==='expanded')check(id,unit.label+' text origin retained',unit.labelStartOffset,42);}check(id,'brand logo remains 23px',logo,{width:23,height:23});for(const helper of helpers)check(id,'helper glyph remains 16px',helper,{width:16,height:16});
   const current={id,sample,dark,mode,effectiveMode:await rail.getAttribute('data-mode'),temporary:await rail.getAttribute('data-temporary'),units,logo,helpers};
   if(['R3','R4'].includes(sample)&&!dark){await page.mouse.move(1790,1090);current.screens=[];for(const[el,label]of[[root,'full'],[rail,'rail']]){const file=path.join(runDir,`${id}-${label}.png`);await el.screenshot({path:file,animations:'disabled'});current.screens.push(file);}}
   report.platformCases.push(current);
  }
 }catch(e){report.failures.push({caseId:sample+' platform glyphs',kind:'driver-or-contract',message:e.message});}
 finally{await page.close();}
}
for(const def of interactions){
 const id=def.sample+(def.scene?'-'+def.scene:def.draft?'-form-edit':'')+'-'+def.width,{page,root}=await open(def.sample,def.width,def.scene);
 try{
  if(def.draft)await root.getByRole('textbox',{name:'课程名称'}).fill('Review12 分割线检查草稿');
  const splitter=def.region?root.locator(`.rain-workspace__splitter[data-region-id="${def.region}"]`):root.locator('.rain-workspace__splitter:not([hidden])').first();
  await expect(splitter).toBeVisible();await splitter.scrollIntoViewIfNeeded();await page.mouse.move(1790,1090);await frame(page);
  const states={normal:await normalCheck(id,splitter)};const brand=await token(splitter,'--rain-category-border-brand-1');
  await splitter.hover();states.hover=await measure(splitter);check(id,'hover line visible',states.hover.line.opacity,'1');check(id,'hover handle visible',states.hover.handle.opacity,'1');check(id,'hover uses Brand1',states.hover.line.background,brand);
  const box=await splitter.boundingBox(),move=states.hover.value<states.hover.max-12?12:-12,sign=states.hover.side==='end'?-1:1;
  await page.mouse.move(box.x+box.width/2,box.y+Math.min(100,box.height/2));await page.mouse.down();await page.mouse.move(box.x+box.width/2+move*sign,box.y+Math.min(100,box.height/2),{steps:5});await frame(page);
  states.drag=await measure(splitter);check(id,'active pointer drag visible',states.drag.line.opacity,'1');check(id,'active drag handle visible',states.drag.handle.opacity,'1');check(id,'pointer resize changes ARIA value',states.drag.value!==states.hover.value,true);check(id,'hit width after drag',states.drag.width,states.normal.width);
  await page.mouse.up();await page.mouse.move(1790,1090);await splitter.focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');await frame(page);
  states.keyboardFocus=await measure(splitter);check(id,'keyboard focus visible',states.keyboardFocus.focusVisible,true);check(id,'keyboard focus line visible',states.keyboardFocus.line.opacity,'1');check(id,'keyboard focus handle visible',states.keyboardFocus.handle.opacity,'1');check(id,'focus outline preserved',states.keyboardFocus.outline.width,'2px');
  const arrow=states.keyboardFocus.value<states.keyboardFocus.max-8?(states.keyboardFocus.side==='end'?'ArrowLeft':'ArrowRight'):(states.keyboardFocus.side==='end'?'ArrowRight':'ArrowLeft');await page.keyboard.press(arrow);await frame(page);states.keyboardResize=await measure(splitter);check(id,'arrow resizes boundary',states.keyboardResize.value!==states.keyboardFocus.value,true);
  await page.keyboard.press('Tab');await page.mouse.move(1790,1090);await frame(page);states.returnedNormal=await normalCheck(id,splitter);
  if(def.draft){check(id,'form draft retained',await root.getByRole('textbox',{name:'课程名称'}).inputValue(),'Review12 分割线检查草稿');}
  report.interactionCases.push({id,states,region:states.normal.region});
 }catch(e){report.failures.push({caseId:id,kind:'driver-or-contract',message:e.message});}
 finally{await page.close();}
}
report.sourceAfter=await hashes();report.sourceStable=JSON.stringify(report.sourceBefore)===JSON.stringify(report.sourceAfter);check('source','source remains stable through QA',report.sourceStable,true);
report.summary={normalCases:report.normalCases.length,splittersMeasured:report.normalCases.reduce((n,c)=>n+c.splitters.length,0),platformCases:report.platformCases.length,unitGlyphsMeasured:report.platformCases.reduce((n,c)=>n+c.units.length,0),interactionCases:report.interactionCases.length,assertions:report.assertions,errors:report.errors.length,failures:report.failures.length,sourceStable:report.sourceStable};
await fs.writeFile(path.join(runDir,'measurements.json'),JSON.stringify(report,null,2),{flag:'wx'});await fs.writeFile(path.join(evidence,'latest-run.json'),JSON.stringify({runDir,summary:report.summary},null,2));await browser.close();console.log(JSON.stringify(report.summary));console.log(runDir);if(report.failures.length)console.log(JSON.stringify(report.failures,null,2));if(report.failures.length||report.errors.length)process.exitCode=1;
