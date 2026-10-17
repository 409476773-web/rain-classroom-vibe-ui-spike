import { chromium } from '@playwright/test';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const repo=resolve(dirname(fileURLToPath(import.meta.url)),'..'),pack=resolve(repo,'../../rain-classroom-vibe-ui-spike/docs/rain-navigation-codex-workpack');
const reference=resolve(repo,process.env.RAIN_W4_REFERENCE || 'evidence/runtime/navigation-v042/w4/reference/2026-10-01T11-15-07-260Z'),source=resolve(pack,'reference/approved-v0.4.2.html');
const extraReference=process.env.RAIN_W4_EXTRA_REFERENCE?resolve(repo,process.env.RAIN_W4_EXTRA_REFERENCE):null;
const hash=x=>createHash('sha256').update(x).digest('hex'),sourceHash=hash(await readFile(source));
if(sourceHash!==JSON.parse(await readFile(resolve(pack,'contracts/baseline-decision.json'),'utf8')).sha256)throw Error('Frozen source mismatch');
const out=resolve(repo,'evidence/runtime/navigation-v042/w4/compare',new Date().toISOString().replace(/[:.]/g,'-'));await mkdir(out,{recursive:true});
const write=(name,data)=>writeFile(resolve(out,name),typeof data==='string'?data:JSON.stringify(data,null,2),{flag:'wx'});
const sourceFiles=['apps/playground/src/recipes/navigation-v042/workspace-states.tsx','apps/playground/src/recipes/navigation-v042/workspace-states.css','apps/playground/src/recipes/navigation-v042/r1-r3.tsx','apps/playground/src/recipes/navigation-v042/r1-r3.css','apps/playground/src/recipes/navigation-v042/r4-r6.tsx','apps/playground/src/recipes/navigation-v042/r4-r6.css','packages/layouts/src/workspace.tsx','packages/layouts/src/workspace.css'];
sourceFiles.push('packages/layouts/src/workspace-state.ts');
const hashes=async()=>Object.fromEntries(await Promise.all(sourceFiles.map(async f=>[f,hash(await readFile(resolve(repo,f)))])));
const cases=[...['S1','S2','S3','S4','S5','S6'].map(scene=>({id:scene+'-default',scene})),{id:'S1-compact',scene:'S1',action:'compact'},{id:'S1-hidden',scene:'S1',action:'hidden'},{id:'S3-overlay-inverse',scene:'S3',inverse:true,action:'overlay'},{id:'S4-grading',scene:'S4',grading:true},{id:'S5-icons',scene:'S5',ribbon:'icons'},{id:'S6-focus',scene:'S6',action:'focus'},...['S1','S2','S3','S4','S5','S6'].map(scene=>({id:scene+'-inverse',scene,inverse:true})),{id:'S3-overlay-light',scene:'S3',action:'overlay'},{id:'S3-global-overlay-inverse',scene:'S3',inverse:true,action:'global-overlay'},...['tabs','hidden'].flatMap(ribbon=>[{id:`S5-${ribbon}`,scene:'S5',ribbon},{id:`S5-${ribbon}-peek`,scene:'S5',ribbon,peek:true}])];
if(extraReference)cases.push({id:'S3-view-board',scene:'S3',action:'view-board',reference:extraReference},{id:'S5-tabs-current-peek',scene:'S5',ribbon:'tabs',action:'current-ribbon-tab',reference:extraReference},{id:'S5-focus',scene:'S5',action:'focus',reference:extraReference});
if(process.env.RAIN_W4_GRADING_REFERENCE)for(const c of cases)if(c.id==='S4-grading')c.reference=resolve(repo,process.env.RAIN_W4_GRADING_REFERENCE);
const map=[['.vr-bar','.nv44-restorebar'],['.rail','.rain-workspace__region[data-region-id="global"]'],['.contextnav','.rain-workspace__region[data-region-id="context"]'],['.workspace-head','.nv44-workspace-head,.nv43-module-header,.nv5-module-header,.nv5-document-header'],['.vr-splitter','.rain-workspace__splitter'],['.formpaper','.nv44-form-paper,.nv5-formpaper'],['.formcanvas','.nv44-form-canvas,.nv5-formcanvas'],['.forminspector','.rain-workspace__region[data-region-id="fields"]'],['.vr-ribbon','.nv44-ribbon'],['.vr-ribbon-tabrow','.nv44-ribbon-nav'],['.vr-ribbon-tools','.nv44-ribbon-tools'],['.vr-editor-paper','.nv44-editor-paper'],['.player-area','.nv44-player,.nv5-player'],['.slidecanvas','.nv44-player-canvas,.nv5-slidecanvas'],['.slide','.nv44-slide,.nv5-slide'],['.player-controls','.nv44-player-controls,.nv5-player-controls'],['.playback-left','.rain-workspace__region[data-region-id="events"]'],['.knowledge','.rain-workspace__region[data-region-id="knowledge"]'],['.queue','.rain-workspace__region[data-region-id="queue"]'],['.gradepanel','.rain-workspace__region[data-region-id="review"]']];
const props=['fontFamily','fontSize','fontWeight','lineHeight','color','backgroundColor','padding','margin','gap','borderRadius','borderTop','boxShadow','width','height','minHeight','position','display','overflow'];
map.push(['.vr-identity','.nv44-identity'],['.vr-identity>strong','.nv44-identity>strong'],['.vr-identity>small','.nv44-identity>small']);
map.push(['.answerwork','.nv5-answerwork'],['.answer-title','.nv5-answer-title'],['.answer-body','.nv5-answer-body'],['.pdfpane','.nv5-pdf-pane'],['.pdf-toolbar','.nv5-pdf-toolbar'],['.pdf-page','.nv5-pdf-page'],['.pdf-page > h4','.nv5-pdf-page > h4'],['.pdf-page > p','.nv5-pdf-page > p']);
const report={kind:'W4-native-source-comparison-only',approved:false,sourceHash,reference,sourceBefore:await hashes(),cases:[],errors:[],consoleErrors:[]};
const browser=await chromium.launch();report.browser=browser.version();
const stateSnapshot=async root=>root.evaluate(root=>{
 const rect=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height};};
 const props=['display','position','width','height','backgroundColor','color','opacity','transform','animationName','animationDuration','animationPlayState','transitionProperty','transitionDuration'];
 const detail=e=>({tag:e.tagName,class:e.className,dataset:{...e.dataset},rect:rect(e),styles:Object.fromEntries(props.map(k=>[k,getComputedStyle(e)[k]])),focused:e.matches(':focus'),hovered:e.matches(':hover'),scroll:[e.scrollLeft,e.scrollTop]});
 return{root:detail(root),viewport:{width:innerWidth,height:innerHeight,scrollX,scrollY},activeElement:document.activeElement?.outerHTML.slice(0,800),regions:[...root.querySelectorAll('.rain-workspace__region')].map(detail),restoreButtons:[...root.querySelectorAll('[data-workspace-action="restore"]')].map(e=>({...detail(e),text:e.textContent,ariaLabel:e.getAttribute('aria-label'),children:[...e.children].map(detail)})),selected:[...root.querySelectorAll('[aria-selected="true"],[aria-pressed="true"],[aria-current]')].map(e=>({tag:e.tagName,text:e.textContent.slice(0,100),selected:e.getAttribute('aria-selected'),pressed:e.getAttribute('aria-pressed'),current:e.getAttribute('aria-current')}))};
});
const filter=process.env.RAIN_WORKSPACE_CASES?.split(',');
for(const c of cases.filter(c=>!filter||filter.includes(c.id))){
 const page=await browser.newPage({viewport:{width:1600,height:1100},deviceScaleFactor:1,locale:'zh-CN',reducedMotion:'reduce'});
 page.on('pageerror',e=>report.errors.push(String(e)));page.on('console',e=>{if(e.type()==='error')report.consoleErrors.push(e.text());});
 try{
  await page.goto(`http://127.0.0.1:5198/?sample=${c.scene}#navigation-v042`,{waitUntil:'networkidle'});const root=page.locator('.nv42-review-canvas > .nv44-workspace, .nv42-review-canvas > .nv44-shared > .rain-workspace').first();await root.waitFor({state:'visible'});
  if(c.grading)await page.getByLabel('业务子场景').selectOption('grading');if(c.inverse)await page.getByLabel('深色外框').check();
  if(c.action==='compact')await root.getByRole('button',{name:/^收起(为图标|平台导航)$/}).first().click();
  if(c.action==='hidden'){await root.getByRole('button',{name:'布局设置',exact:true}).click();await page.getByRole('button',{name:'隐藏全部区域',exact:true}).click();await page.keyboard.press('Escape');}
  if(c.action==='focus')await root.getByRole('button',{name:'专注内容',exact:true}).click();
  if(c.action==='overlay')await root.locator('[data-workspace-action="restore"][aria-controls$="-context"]').click();
  if(c.action==='global-overlay')await root.locator('.nv44-restorebar [data-workspace-action="restore"][aria-controls$="-global"]').click();
  if(c.ribbon){await root.getByRole('button',{name:'布局设置',exact:true}).click();await page.getByLabel('文档工具显示模式').selectOption(c.ribbon);await page.keyboard.press('Escape');}
  if(c.peek)await root.locator('[data-workspace-action="restore"][aria-controls$="-ribbon"]').click();
  if(c.action==='current-ribbon-tab'){const tab=root.getByRole('tab',{name:'开始',exact:true});if(await tab.getAttribute('aria-selected')!=='true')throw Error('Current Ribbon tab was not selected');await tab.click();const temp=root.locator('.nv44-ribbon[data-temporary="true"]');await temp.waitFor({state:'visible'});await temp.getByRole('button',{name:'加粗目标',exact:true}).waitFor({state:'visible'});}
  if(c.action==='view-board'){await root.getByRole('tab',{name:'状态分组',exact:true}).click();await root.locator('.nv5-kanban').waitFor({state:'visible'});}
  await page.evaluate(()=>document.fonts.ready);await root.scrollIntoViewIfNeeded();await page.mouse.move(0,0);await page.waitForTimeout(900);
  const data=await root.evaluate((root,{map,props})=>{const rect=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height};};return{rect:rect(root),text:root.textContent.trim(),measurements:map.flatMap(([,selector])=>[...root.querySelectorAll(selector)].slice(0,12).map((e,index)=>({selector,index,text:e.textContent.trim().slice(0,160),rect:rect(e),styles:Object.fromEntries(props.map(k=>[k,getComputedStyle(e)[k]]))}))) };},{map,props});
  const name=c.id+'-1440',png=resolve(out,name+'-candidate.png'),clip={x:Math.round(data.rect.x),y:Math.floor(data.rect.y),width:Math.round(data.rect.width),height:Math.round(data.rect.height)};
  data.stateBefore=await stateSnapshot(root);data.stateBeforeHash=hash(JSON.stringify(data.stateBefore));
  data.hash=hash(await page.screenshot({path:png,clip,animations:'disabled'}));await page.waitForTimeout(250);data.stateAfter=await stateSnapshot(root);data.stateAfterHash=hash(JSON.stringify(data.stateAfter));data.stateFingerprintStable=data.stateBeforeHash===data.stateAfterHash;
  data.repeatHash=hash(await page.screenshot({path:resolve(out,name+'-candidate-pass2.png'),clip,animations:'disabled'}));data.stable=data.hash===data.repeatHash;
  await write(name+'-candidate.json',data);await write(name+'-candidate.fragment.html',await root.evaluate(e=>e.outerHTML));
  const caseReference=c.reference||reference;
  const ref=JSON.parse(await readFile(resolve(caseReference,name+'-pass1.json'),'utf8')),refImage=resolve(out,name+'-reference-native-crop.png');
  const crop=spawnSync('python3',['-c','from PIL import Image; import sys; im=Image.open(sys.argv[1]); w,h=map(int,sys.argv[3:]); assert im.width>=w and im.height>=h; im.crop((0,0,w,h)).save(sys.argv[2])',resolve(caseReference,name+'-pass1.png'),refImage,String(Math.round(ref.rect.width)),String(Math.round(ref.rect.height))],{encoding:'utf8'});if(crop.status!==0)throw Error(crop.stderr);
  const geometry=map.flatMap(([sourceSelector,candidateSelector])=>data.measurements.filter(m=>m.selector===candidateSelector).map(m=>{const s=ref.measurements.find(s=>s.selector===sourceSelector&&s.index===m.index);if(!s)return{sourceSelector,candidateSelector,index:m.index,missingReference:true};const local=(r,o)=>({...r,x:r.x-o.x,y:r.y-o.y}),a=local(s.rect,ref.rect),b=local(m.rect,data.rect);return{sourceSelector,candidateSelector,index:m.index,reference:a,candidate:b,delta:Object.fromEntries(Object.keys(a).map(k=>[k,+(b[k]-a[k]).toFixed(4)])),referenceText:s.text,candidateText:m.text};}));await write(name+'-geometry.json',geometry);
  const comparison=spawnSync('python3',[resolve(pack,'tools/compare_renders.py'),refImage,png,'--out',resolve(out,name+'-comparison')],{encoding:'utf8'});
  let metrics;try{metrics=JSON.parse(await readFile(resolve(out,name+'-comparison/metrics.json'),'utf8'));}catch{}
  report.cases.push({...c,stable:data.stable,stateFingerprintStable:data.stateFingerprintStable,comparisonExitCode:comparison.status,metrics,reference:refImage,candidate:png,geometry:name+'-geometry.json',actualActions:c.action||c.ribbon||null});console.log(JSON.stringify({id:c.id,stable:data.stable,stateFingerprintStable:data.stateFingerprintStable,status:metrics?.status}));
 }catch(error){report.cases.push({...c,failure:String(error)});console.error(c.id,error);process.exitCode=1;}
 finally{await page.close();}
}
report.sourceAfter=await hashes();report.sourceUnchangedDuringCapture=JSON.stringify(report.sourceBefore)===JSON.stringify(report.sourceAfter);report.frozenReferenceUnchanged=hash(await readFile(source))===sourceHash;await write('comparison-report.json',report);await browser.close();console.log(`EVIDENCE ${out}`);
if(!report.sourceUnchangedDuringCapture||!report.frozenReferenceUnchanged||report.errors.length||report.consoleErrors.length||report.cases.some(c=>c.failure||c.stable===false))process.exitCode=1;
