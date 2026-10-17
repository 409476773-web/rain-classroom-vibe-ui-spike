import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

// Native artboard evidence only: no resizing and no automatic visual acceptance.
const repo=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const pack=resolve(repo,'../../rain-classroom-vibe-ui-spike/docs/rain-navigation-codex-workpack');
const frozen=resolve(pack,'reference/approved-v0.4.2.html');
const hash=data=>createHash('sha256').update(data).digest('hex');
const frozenHash=hash(await readFile(frozen));
assert.equal(frozenHash,JSON.parse(await readFile(resolve(pack,'contracts/baseline-decision.json'),'utf8')).sha256);
const baseReference=resolve(repo,process.env.RAIN_W5_REFERENCE||'evidence/runtime/navigation-v042/w5/reference/2026-10-01T11-21-22-887Z');
const selectedReference=process.env.RAIN_W5_REFERENCE?baseReference:resolve(repo,'evidence/runtime/navigation-v042/w5/reference/2026-10-01T11-25-05-492Z');
const tableReference=process.env.RAIN_W5_REFERENCE?baseReference:resolve(repo,'evidence/runtime/navigation-v042/w5/reference/2026-10-01T11-23-03-349Z');
const thirdReference=resolve(repo,process.env.RAIN_W5_THIRD_REFERENCE||baseReference);
const out=resolve(repo,'evidence/runtime/navigation-v042/w5/compare',new Date().toISOString().replace(/[:.]/g,'-'));
await mkdir(out,{recursive:true});
const write=(name,data)=>writeFile(resolve(out,name),typeof data==='string'?data:JSON.stringify(data,null,2),{flag:'wx'});
const files=['apps/playground/src/recipes/navigation-v042/r4-r6.tsx','apps/playground/src/recipes/navigation-v042/r4-r6.css','packages/layouts/src/workspace.tsx','packages/layouts/src/workspace.css','packages/ui/src/navigation/navigation-families.tsx','packages/ui/src/navigation/navigation-families.css'];
files.push('packages/layouts/src/workspace-state.ts');
const hashes=async()=>Object.fromEntries(await Promise.all(files.map(async f=>[f,hash(await readFile(resolve(repo,f)))])));
const cases=['R4-interaction','R4-grading','R5-default','R6-default'].flatMap(id=>[1440,1200,1600].map(width=>({id,width,scene:id.slice(0,2),subscene:id.startsWith('R4')?id.slice(3):null,reference:baseReference})));
cases.push(
 {id:'R4-interaction-selected',width:1440,scene:'R4',subscene:'interaction',action:'interaction-select',reference:selectedReference},
 {id:'R4-grading-selected',width:1440,scene:'R4',subscene:'grading',action:'grading-select',reference:selectedReference},
 {id:'R5-seek-second',width:1440,scene:'R5',action:'replay-select',reference:selectedReference},
 ...(process.env.RAIN_W5_THIRD_REFERENCE?[{id:'R5-seek-third',width:1440,scene:'R5',action:'replay-select-third',reference:thirdReference}]:[]),
 {id:'R6-table',width:1440,scene:'R6',action:'table',reference:tableReference},
 ...['form','board','album'].map(action=>({id:'R6-'+action,width:1440,scene:'R6',action,reference:baseReference}))
);
const map=[
 ['.vr-budget','.nv5-adaptation'],
 ['.vr-bar','.nv5-recovery'],['.rail','.rain-workspace__region[data-region-id="global"]'],['.contextnav','.rain-workspace__region[data-region-id="context"]'],['.workspace-head','.nv5-module-header,.nv5-document-header'],['.vr-splitter','.rain-workspace__splitter'],
 ['.queue','.rain-workspace__region[data-region-id="queue"]'],['.gradepanel','.rain-workspace__region[data-region-id="review"]'],['.grading-head','.nv5-grading-header'],['.grading-context','.nv5-grading-context'],['.grading-content','.nv5-grading-content'],['.answerwork','.nv5-answerwork'],['.answer-title','.nv5-answer-title'],['.answer-body','.nv5-answer-body'],['.pdfpane','.nv5-pdf-pane'],['.pdf-toolbar','.nv5-pdf-toolbar'],['.pdf-page','.nv5-pdf-page'],['.gradeform','.nv5-grade-form'],['.queuehead','.nv5-queue-head'],
 ['.object-card','.rain-object-navigator[data-appearance="cards"] .rain-navigation-family__row'],['.object-card .title','.rain-object-navigator[data-appearance="cards"] .rain-navigation-family__label'],['.object-card .meta','.rain-object-navigator[data-appearance="cards"] .rain-navigation-family__metadata'],['.object-card .progress','.rain-navigation-family__progress'],['.queue .soft-item','.rain-object-navigator[data-appearance="queue"] .rain-navigation-family__row'],
 ['.preview-row','.rain-object-navigator[data-appearance="preview"] .rain-navigation-family__row'],['.preview-slide','.nv5-event-objects .nv5-slide-preview'],['.playback-left','.rain-workspace__region[data-region-id="events"]'],['.knowledge','.rain-workspace__region[data-region-id="knowledge"]'],['.player-area','.nv5-player'],['.media-top','.nv5-media-top'],['.slidecanvas','.nv5-slidecanvas'],['.slide','.nv5-slide'],['.slide h2','.nv5-slide h2'],['.slide p','.nv5-slide p'],['.slide-kicker','.nv5-slide-kicker'],['.slide-footer','.nv5-slide-footer'],['.player-controls','.nv5-player-controls'],['.timeline-item','.nv5-timeline > button'],['.timeline-item .time','.nv5-timeline > button > span:first-child'],['.timeline-item .text','.nv5-timeline > button > div'],
 ['.nested-docs','.rain-workspace__region[data-region-id="directory"]'],['.forminspector','.rain-workspace__region[data-region-id="fields"]'],['.view-tools-bar','.nv5-view-tools'],['.formwork','.nv5-formwork'],['.formcanvas','.nv5-formcanvas'],['.formpaper','.nv5-formpaper'],['.formcover','.nv5-formcover'],['.formbody','.nv5-formbody'],['.formfield','.nv5-formfield'],['.fieldtile','.nv5-fieldtile'],
 ['.table','.nv5-table'],['.table th','.nv5-table th'],['.table tbody tr','.nv5-table tbody tr'],['.kanban','.nv5-kanban'],['.kanban-col','.nv5-kanban > section'],['.task-card','.nv5-kanban article'],['.files-grid','.nv5-album'],['.file-card','.nv5-album article'],['textarea','textarea'],['input','input']
];
const props=['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','color','backgroundColor','padding','margin','gap','borderTop','borderRight','borderBottom','borderLeft','borderRadius','boxShadow','width','height','position','display','overflow','alignItems','justifyContent','flexDirection'];
const report={kind:'W5-native-source-comparison-only',approved:false,frozenHash,sourceBefore:await hashes(),cases:[],interactions:[],pageErrors:[],consoleErrors:[]};
const browser=await chromium.launch();report.browser=browser.version();
const filter=process.env.RAIN_W5_CASES?.split(',');
for(const c of cases.filter(c=>!filter||filter.includes(c.id))){
 const page=await browser.newPage({viewport:{width:c.width===1600?1800:1600,height:1100},deviceScaleFactor:1,locale:'zh-CN',reducedMotion:'reduce'});
 page.on('pageerror',e=>report.pageErrors.push(String(e)));page.on('console',e=>{if(e.type()==='error')report.consoleErrors.push(e.text());});
 const name=c.id+'-'+c.width;
 try{
  await page.goto(`http://127.0.0.1:5198/?sample=${c.scene}#navigation-v042`,{waitUntil:'networkidle'});
  await page.getByLabel('画板宽度').selectOption(String(c.width));
  if(c.subscene)await page.getByLabel('业务子场景').selectOption(c.subscene);
  const root=page.locator('.nv42-review-canvas > .nv5-workspace').first();await root.waitFor({state:'visible'});
  const pressed=async(name)=>{const b=root.getByRole('button',{name,exact:true});await b.click();assert.equal(await b.getAttribute('aria-pressed'),'true');};
  if(c.action==='interaction-select'){await pressed('小组汇报：从概念到真实应用');await pressed('探索者小组');assert.match(await root.locator('.nv5-group-detail h3').innerText(),/探索者小组/);}
  if(c.action==='grading-select'){await pressed('第二题 · 案例分析');await pressed('林晓');assert.match((await root.locator('.nv5-answer-title h3').innerText()).replace(/\s+/g,' '),/第二题 · 案例分析.*林晓/);}
  if(c.action==='replay-select'){await pressed('戴维南定理与模型边界');assert.equal(await root.getByLabel('模拟播放位置').inputValue(),'536');assert.match(await root.getByLabel('回放时间').innerText(),/08:56 \/ 25:00/);}
  if(c.action==='replay-select-third'){await pressed('随堂练习 · 等效电路');assert.equal(await root.getByLabel('模拟播放位置').inputValue(),'984');assert.match(await root.getByLabel('回放时间').innerText(),/16:24 \/ 25:00/);}
  if(c.action==='table'){const link=root.getByRole('link',{name:'课程任务',exact:true});await link.click();assert.equal(await link.getAttribute('aria-current'),'page');await root.getByRole('table',{name:'课程任务记录'}).waitFor();}
  if(['form','board','album'].includes(c.action)){const label={form:'反馈表单',board:'状态分组',album:'画册'}[c.action];const tab=root.getByRole('tab',{name:label,exact:true});await tab.click();assert.equal(await tab.getAttribute('aria-selected'),'true');}
  if(c.action)report.interactions.push({case:name,actualDOM:true,candidateAsserted:true,referenceDirectory:c.reference});
  await page.evaluate(()=>document.fonts.ready);await root.scrollIntoViewIfNeeded();await page.mouse.move(0,0);await page.waitForTimeout(900);
  const data=await root.evaluate((root,{map,props})=>{const rect=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height};};return{rect:rect(root),text:root.textContent.trim(),measurements:map.flatMap(([,selector])=>[...root.querySelectorAll(selector)].slice(0,16).map((e,index)=>({selector,index,text:e.textContent.trim().slice(0,160),rect:rect(e),styles:Object.fromEntries(props.map(k=>[k,getComputedStyle(e)[k]])),attributes:Object.fromEntries([...e.attributes].map(a=>[a.name,a.value]))}))) };},{map,props});
  const png=resolve(out,name+'-candidate.png');const clip={x:Math.round(data.rect.x),y:Math.floor(data.rect.y),width:Math.round(data.rect.width),height:Math.round(data.rect.height)};
  data.hash=hash(await page.screenshot({path:png,clip,animations:'disabled'}));await page.waitForTimeout(250);data.repeatHash=hash(await page.screenshot({path:resolve(out,name+'-candidate-pass2.png'),clip,animations:'disabled'}));data.stable=data.hash===data.repeatHash;
  await write(name+'-candidate.json',data);await write(name+'-candidate.fragment.html',await root.evaluate(e=>e.outerHTML));
  const ref=JSON.parse(await readFile(resolve(c.reference,name+'-pass1.json'),'utf8'));const refImage=resolve(out,name+'-reference-native-crop.png');
  const crop=spawnSync('python3',['-c','from PIL import Image; import sys; im=Image.open(sys.argv[1]); w,h=map(int,sys.argv[3:]); assert im.width>=w and im.height>=h; im.crop((0,0,w,h)).save(sys.argv[2])',resolve(c.reference,name+'-pass1.png'),refImage,String(Math.round(ref.rect.width)),String(Math.round(ref.rect.height))],{encoding:'utf8'});if(crop.status!==0)throw Error(crop.stderr);
  const geometry=map.flatMap(([sourceSelector,candidateSelector])=>data.measurements.filter(m=>m.selector===candidateSelector).map(m=>{const s=ref.measurements.find(s=>s.selector===sourceSelector&&s.index===m.index);if(!s)return{sourceSelector,candidateSelector,index:m.index,missingReference:true};const local=(r,o)=>({...r,x:r.x-o.x,y:r.y-o.y}),a=local(s.rect,ref.rect),b=local(m.rect,data.rect);return{sourceSelector,candidateSelector,index:m.index,reference:a,candidate:b,delta:Object.fromEntries(Object.keys(a).map(k=>[k,+(b[k]-a[k]).toFixed(4)])),referenceText:s.text,candidateText:m.text,changedStyles:Object.fromEntries(props.filter(k=>s.styles[k]!==m.styles[k]).map(k=>[k,{reference:s.styles[k],candidate:m.styles[k]}]))};}));await write(name+'-geometry.json',geometry);
  const comparison=spawnSync('python3',[resolve(pack,'tools/compare_renders.py'),refImage,png,'--out',resolve(out,name+'-comparison')],{encoding:'utf8'});let metrics;try{metrics=JSON.parse(await readFile(resolve(out,name+'-comparison/metrics.json'),'utf8'));}catch{}
  report.cases.push({...c,stable:data.stable,reference:refImage,candidate:png,geometry:name+'-geometry.json',comparisonExitCode:comparison.status,metrics});console.log(JSON.stringify({id:c.id,width:c.width,stable:data.stable,status:metrics?.status,meanAbsoluteChannelDifference:metrics?.meanAbsoluteChannelDifference}));
 }catch(error){report.cases.push({...c,failure:String(error)});console.error(name,error);process.exitCode=1;}
 finally{await page.close();}
}
report.sourceAfter=await hashes();report.sourceUnchangedDuringCapture=JSON.stringify(report.sourceBefore)===JSON.stringify(report.sourceAfter);report.frozenReferenceUnchanged=hash(await readFile(frozen))===frozenHash;await write('comparison-report.json',report);await browser.close();console.log(`EVIDENCE ${out}`);
if(!report.sourceUnchangedDuringCapture||!report.frozenReferenceUnchanged||report.pageErrors.length||report.consoleErrors.length||report.cases.some(c=>c.failure||!c.stable))process.exitCode=1;
