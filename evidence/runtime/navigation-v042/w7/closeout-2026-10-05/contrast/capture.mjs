import {createRequire} from 'node:module';
import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';

const out = dirname(fileURLToPath(import.meta.url));
const root = resolve(out, '../../../../../..');
const require = createRequire(resolve(root, 'package.json'));
const {chromium} = require('@playwright/test');
const baseURL = process.env.RAIN_CONTRAST_BASE_URL ?? 'http://127.0.0.1:5204';
const hash = data => createHash('sha256').update(data).digest('hex');
const freeze = JSON.parse(await readFile(resolve(root, 'evidence/runtime/navigation-v042/w6/review-02/final-source.json'), 'utf8'));
const archiveRecord = JSON.parse(await readFile(resolve(root, 'evidence/runtime/navigation-v042/w6/review-02/archives.json'), 'utf8'));
const runtimeFiles = Object.keys(freeze.filesSha256).filter(file => /^(apps|packages)\//.test(file) && !/\.test\./.test(file));
const protection = async () => {
  const filesSha256 = {};
  for (const file of Object.keys(freeze.filesSha256)) filesSha256[file] = hash(await readFile(resolve(root, file)));
  return {recordedAt:new Date().toISOString(), filesSha256,
    freezeDifferences:Object.keys(filesSha256).filter(file => filesSha256[file] !== freeze.filesSha256[file]),
    runtimeFiles, archives:await Promise.all(archiveRecord.archives.map(async a => ({path:a.path, expected:a.sha256, actual:hash(await readFile(resolve(root,a.path)))})))};
};
const before = await protection();
await mkdir(resolve(out, 'cases'), {recursive:true});
await writeFile(resolve(out, 'protection-before.json'), JSON.stringify(before,null,2));
const report = {schemaVersion:'1.0',kind:'current-review02-role-classified-text-contrast-difference-audit',
  startedAt:new Date().toISOString(),snapshotId:archiveRecord.snapshotId,baseURL,
  scope:'Real E1–E6 light consumers at 1200/1440 CSS px × 900 height, plus reasoned 1440-wide key states; one existing dark-Token diagnostic only.',
  sourceMode:'Read-only product sources; browser-only temporary text masking for background pixel sampling.',
  acceptedVisualsChanged:false,humanContrastAcceptance:'not-granted',cases:[],errors:[],
  userPaleMetadataPreference:{source:'User Comment 6 on E1: 这种辅助小字，颜色一定要很浅很浅很浅，并且使用竖向分割线来分割，不要用圆点分割。',
    application:'E1 scope descriptions, passive counts/semester metadata and explanatory scope note; other passive metadata classified separately by role.',
    limit:'Preference is a visual choice, not a WCAG exception or permission to reduce current identity, status, action, input value or main task text contrast.'},
  roles:['main-task','current-identity','status-action','auxiliary-metadata','form-guidance','disabled','decorative-excluded'],
  samplingRationale:['1200/1440 sample narrower and normal layouts without rerunning 387 render matrix.',
    'E1 disabled scope result/current scope identity; E2 member identity and reflection hierarchy; E3 editable/saved score state; E4 temporary/pinned knowledge; E5 A-only density/draft; E6 editable/saved review state cover new role differences.',
    'W6 has no inverse product UI. One existing dark Token scope is diagnostic only, excluded from baseline/product conclusions.'],
  limits:['Chromium headless only; not actual Safari, VoiceOver, Windows or full multi-engine accessibility audit.',
    'Text contrast ratio uses specified foreground and un-antialiased composition against sampled background; actual glyph antialiasing is not a WCAG foreground color.',
    'Visible viewport text only; clipped/offscreen text, all hover/focus/error states and complete data permutations are not covered.',
    'Non-text contrast (borders, icons, focus rings, slider, separators, avatars) remains unverified.',
    'Unresolvable background overlap, filters, blend modes, text shadows or background plus group opacity remain explicitly unverified.']};

const browser = await chromium.launch();
report.engine={name:'Chromium',version:browser.version()};
const page = await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1,locale:'zh-CN',reducedMotion:'reduce'});
page.on('pageerror', error => report.errors.push(String(error)));
async function open(scene,width=1440) {
  await page.setViewportSize({width,height:900});
  await page.goto(`${baseURL}/navigation-v042-w6-consumer.html#${scene}`);
  await page.locator(`[data-scene="${scene}"]`).waitFor({state:'visible'});
  await page.evaluate(() => document.fonts.ready);
  await page.mouse.move(1,1);
  return page.locator(`[data-scene="${scene}"]`);
}
async function capture(scene,width,state,reason,{diagnostic=false}={}) {
  const id=`${scene}-${width}-${state}`;
  const facts=await page.evaluate(({scene,id,diagnostic})=>{
    const root=document.querySelector(`[data-scene="${scene}"]`);
    const collectionRoots=[root,...document.querySelectorAll('.rain-navigation-scope-popup')].filter((e,i,a)=>a.indexOf(e)===i&&(!root.contains(e)||e===root));
    const parse=value=>{
      const canvas=document.createElement('canvas');canvas.width=canvas.height=1;const ctx=canvas.getContext('2d');
      ctx.fillStyle=value;ctx.fillRect(0,0,1,1);const a=[...ctx.getImageData(0,0,1,1).data];return [a[0],a[1],a[2],a[3]/255];
    };
    const rect=r=>({x:r.x,y:r.y,width:r.width,height:r.height});
    const selector=e=>{
      const path=[];for(let p=e;p&&p!==document.documentElement;p=p.parentElement){
        if(p.id){path.unshift(`#${CSS.escape(p.id)}`);break;}
        const cls=[...p.classList].slice(0,2).map(c=>'.'+CSS.escape(c)).join('');
        let name=p.localName+cls; if(p.parentElement){const sib=[...p.parentElement.children].filter(s=>s.localName===p.localName);if(sib.length>1)name+=`:nth-of-type(${sib.indexOf(p)+1})`;}
        path.unshift(name);
      }return path.join(' > ');
    };
    const clipped=(e,r)=>{
      let box={left:Math.max(0,r.left),right:Math.min(innerWidth,r.right),top:Math.max(0,r.top),bottom:Math.min(innerHeight,r.bottom)};
      for(let p=e;p;p=p.parentElement){const s=getComputedStyle(p),b=p.getBoundingClientRect();
        if(/hidden|clip|auto|scroll/.test(s.overflowX)){box.left=Math.max(box.left,b.left);box.right=Math.min(box.right,b.right);}
        if(/hidden|clip|auto|scroll/.test(s.overflowY)){box.top=Math.max(box.top,b.top);box.bottom=Math.min(box.bottom,b.bottom);}
      }return {x:box.left,y:box.top,width:Math.max(0,box.right-box.left),height:Math.max(0,box.bottom-box.top)};
    };
    const disabled=e=>!!e.closest(':disabled,[aria-disabled="true"],[data-disabled="true"],[data-disabled=""]');
    const classify=(e,text,type)=>{
      if(disabled(e))return{role:'disabled',basis:'Rendered disabled control; inactive-control contrast is recorded without threshold conformance assertion.'};
      if(e.closest('[aria-hidden="true"]'))return{role:'decorative-excluded',basis:'aria-hidden visual marker; non-text review remains separate.'};
      if(type==='placeholder')return{role:'form-guidance',basis:'Editable field placeholder instructs a task; pale-metadata preference does not exempt it.'};
      if(type==='value')return{role:'main-task',basis:'User-entered score or draft is task content.'};
      if(e.closest('.w6-grade-identity-meta,.w6-member-identity,.w6-review-comment-context,.w6-review-resource-details,.w6-review-preview-bar'))return{role:'current-identity',basis:'Student/resource/version identity used to bind current task.'};
      if(e.closest('.w6-grade-score-identity,.w6-grade-answer-heading,.w6-interaction-title-row'))return{role:'current-identity',basis:'Current grading or group submission identity.'};
      if(e.closest('[role="status"]')||/^(待批改|本页已|未保存|已提交|已投票|待评审|保存|尚未保存|未编辑)/.test(text)||/当前成绩|^\d+\/\d+$/.test(text))return{role:'status-action',basis:'Task status, progress, score state or saving outcome.'};
      if(e.closest('.rain-navigation-family__label'))return{role:e.closest('[data-active="true"]')?'current-identity':'main-task',basis:'Navigation object label identifies selected or selectable task.'};
      if(e.closest('.w6-course .rain-navigation__description,.w6-course .w6-inline-facts,.w6-scope-note'))return{role:'auxiliary-metadata',basis:'E1 passive scope metadata directly covered by user pale-text preference.',userPreferenceApplies:true};
      if(e.closest('.w6-grade-item-meta')||/^满分/.test(text))return{role:'main-task',basis:'Maximum-score constraint remains task information although user removed its Tag emphasis.'};
      if(e.closest('.rain-navigation-family__count'))return{role:'status-action',basis:'Queue count/progress or current grade supports task decisions.'};
      if(e.closest('.rain-navigation-family__description,.rain-navigation-family__metadata,.w6-inline-facts,.w6-panel-eyebrow,.w6-grade-control-label,.w6-grade-queue-heading>span,.w6-grade-queue-footnote,.w6-grade-save>span,.w6-scope-note,.w6-consumer-heading>span,.w6-member-role'))return{role:'auxiliary-metadata',basis:'Passive descriptive or supplementary information; no automatic threshold exception.'};
      if(e.closest('button,[role="tab"],[role="radio"],a'))return{role:'status-action',basis:'Control label is an available action/choice.'};
      if(e.closest('label'))return{role:'main-task',basis:'Field label identifies editing target.'};
      if(e.localName==='small'||e.localName==='time'||e.closest('.w6-replay-course-meta,.w6-grade-eyebrow,.w6-replay-course-heading>div>p,.w6-replay-samples>p,.w6-replay-sample-header,.w6-replay-board-top,.w6-replay-samples figcaption>span,.w6-review-save-note,.w6-review-queue-foot'))return{role:'auxiliary-metadata',basis:'Secondary time, context or explanatory text; threshold result remains reported.'};
      return{role:'main-task',basis:'Task heading, body, table or uncategorized visible text conservatively treated as task content.'};
    };
    const samples=[],excluded={hidden:0,clipped:0,decorative:0};
    function add(e,text,type,rects,pseudo=null){
      const s=getComputedStyle(e),ps=pseudo?getComputedStyle(e,pseudo):s;
      if(s.visibility!=='visible'||s.display==='none'||!text.trim()){excluded.hidden++;return;}
      const ancestors=[];for(let p=e;p;p=p.parentElement){const st=getComputedStyle(p);ancestors.unshift({selector:selector(p),backgroundColor:st.backgroundColor,background:parse(st.backgroundColor),backgroundImage:st.backgroundImage,opacity:+st.opacity,filter:st.filter,backdropFilter:st.backdropFilter,mixBlendMode:st.mixBlendMode,isolation:st.isolation});}
      if(ancestors.some(a=>a.opacity===0)){excluded.hidden++;return;}
      const role=classify(e,text,type);if(role.role==='decorative-excluded'){excluded.decorative++;return;}
      const visibleRects=rects.map(r=>clipped(e,r)).filter(r=>r.width>2&&r.height>2);
      if(!visibleRects.length){excluded.clipped++;return;}
      let overlapping=false,hitTestPoints=0;
      // A temporary panel may cover just one end of a line. Check a grid across
      // every visible line rectangle, not only its center, before trusting pixels.
      for(const b of visibleRects){
        for(let y=b.y+Math.min(2,b.height/2);y<b.y+b.height-1;y+=8){
          for(let x=b.x+Math.min(2,b.width/2);x<b.x+b.width-1;x+=8){
            const top=document.elementFromPoint(x,y);hitTestPoints++;
            if(!(top&&(top===e||e.contains(top)||top.contains(e))))overlapping=true;
          }
        }
      }
      const rawColor=ps.webkitTextFillColor&&ps.webkitTextFillColor!=='currentcolor'?ps.webkitTextFillColor:ps.color;
      const color=parse(rawColor);if(pseudo)color[3]*=Number(ps.opacity);
      const fontSize=parseFloat(ps.fontSize),fontWeight=parseInt(ps.fontWeight)||400;
      samples.push({sampleId:`${id}-text-${samples.length+1}`,text:text.trim().slice(0,240),type,selector:selector(e),...role,
        color:rawColor,foreground:color,fontSize,fontWeight,required:fontSize>=24||(fontSize>=18.6667&&fontWeight>=700)?3:4.5,
        pseudoOpacity:pseudo?ps.opacity:null,textShadow:ps.textShadow,textStroke:ps.webkitTextStrokeWidth,
        ancestors,rects:visibleRects,overlapping,hitTestPoints,selected:e.closest('[aria-selected="true"],[aria-pressed="true"],[data-active="true"]')!==null});
    }
    for(const collectionRoot of collectionRoots){const walk=document.createTreeWalker(collectionRoot,NodeFilter.SHOW_TEXT);while(walk.nextNode()){
      const n=walk.currentNode,e=n.parentElement;if(!e||!n.textContent.trim()||/^(SCRIPT|STYLE|SVG|TITLE)$/.test(e.tagName))continue;
      const range=document.createRange();range.selectNodeContents(n);add(e,n.textContent,'text',[...range.getClientRects()]);
    }}
    for(const e of collectionRoots.flatMap(collectionRoot=>[...collectionRoot.querySelectorAll('input:not([type="range"]):not([type="checkbox"]):not([type="radio"]),textarea')])){
      const type=e.value?'value':'placeholder',text=e.value||e.placeholder;if(!text)continue;
      const s=getComputedStyle(e),r=e.getBoundingClientRect(),height=parseFloat(s.lineHeight)||parseFloat(s.fontSize)*1.4;
      const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');ctx.font=`${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
      const left=r.left+parseFloat(s.borderLeftWidth)+parseFloat(s.paddingLeft),top=r.top+parseFloat(s.borderTopWidth)+parseFloat(s.paddingTop);
      add(e,text,type,[{x:left,y:top,left,right:Math.min(r.right-4,left+ctx.measureText(text.split('\n')[0]).width),top,bottom:Math.min(r.bottom-4,top+height),width:ctx.measureText(text.split('\n')[0]).width,height}],type==='placeholder'?'::placeholder':null);
    }
    return {id,scene,diagnostic,url:location.href,viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio},theme:document.documentElement.getAttribute('data-rain-theme')??'default-light',
      fonts:document.fonts.status, samples, excluded,nonTextInventory:{svg:root.querySelectorAll('svg').length,images:root.querySelectorAll('img').length,focusableControls:root.querySelectorAll('button,input,textarea,a,[tabindex]').length,
        reason:'Recorded inventory only; contrast of icons/borders/avatars/slider/focus/selection indicators not measured.'}};
  },{scene,id,diagnostic});
  await page.screenshot({path:resolve(out,'cases',`${id}-render.png`),animations:'disabled'});
  const mask=await page.addStyleTag({content:'html * { color: transparent !important; -webkit-text-fill-color: transparent !important; text-shadow: none !important; -webkit-text-stroke-color: transparent !important; caret-color: transparent !important; } html *::placeholder { color: transparent !important; -webkit-text-fill-color: transparent !important; text-shadow: none !important; }'});
  await page.screenshot({path:resolve(out,'cases',`${id}-background.png`),animations:'disabled'});
  await mask.evaluate(e=>e.remove());
  facts.reason=reason;
  await writeFile(resolve(out,'cases',`${id}.json`),JSON.stringify(facts,null,2));
  report.cases.push({id,scene,width,state,reason,diagnostic,samples:facts.samples.length,file:`cases/${id}.json`,render:`cases/${id}-render.png`,background:`cases/${id}-background.png`});
  console.log(`${id}: ${facts.samples.length} text samples captured`);
}
try {
  for(const width of [1200,1440])for(const scene of ['E1','E2','E3','E4','E5','E6']){
    await open(scene,width);await capture(scene,width,'initial','Real initial consumer; selected object, headings, actions, task content and passive metadata.');
  }
  let r=await open('E1');await r.getByRole('button',{name:'更多班级',exact:true}).click();await page.getByRole('textbox',{name:'搜索范围',exact:true}).fill('238');
  await capture('E1',1440,'disabled-scope','Archived disabled scope in native portaled range search; portal sample coverage separately checked.');
  r=await open('E2');await r.getByRole('button',{name:'第二研究组',exact:true}).click();await r.getByRole('tab',{name:'小组成员',exact:true}).click();
  await capture('E2',1440,'members','Current group, five real local Avatars, names/student numbers and roles.');
  await r.getByRole('button',{name:'课后反思',exact:true}).click();
  await capture('E2',1440,'reflection','After-class category and selected activity states; pale score progress still a task status.');
  r=await open('E3');await r.getByRole('spinbutton',{name:'本题分数',exact:true}).fill('17');await r.getByRole('textbox',{name:'评分评语',exact:true}).fill('采样方法清楚，请补充证据。');
  await capture('E3',1440,'filled','Filled score and comment, current student/question identity and unsaved status.');
  await r.getByRole('button',{name:'保存本地草稿',exact:true}).click();
  await capture('E3',1440,'saved','Saved status and resulting queue state.');
  r=await open('E4');await r.getByRole('button',{name:'讲稿 02:10',exact:true}).click();await r.getByRole('button',{name:'临时查看知识索引',exact:true}).click();
  await capture('E4',1440,'temporary-knowledge','Temporary knowledge panel action and selected queue over existing overlay and solid backgrounds.');
  await r.getByRole('button',{name:'固定知识索引',exact:true}).click();
  await capture('E4',1440,'pinned-knowledge','Pinned knowledge action/state and reorganized real consumer.');
  r=await open('E5');await r.getByRole('button',{name:'仅当前实例 A 使用紧凑目录',exact:true}).click();await r.getByRole('textbox',{name:'实例 A 草稿',exact:true}).fill('实例 A 的审阅说明');
  await capture('E5',1440,'compact-A','A-only density applied; editable draft and unchanged B task labels.');
  r=await open('E6');const show=r.getByRole('button',{name:'显示评审面板',exact:true});if(await show.isVisible())await show.click();
  const draft=r.getByRole('textbox',{name:/审核意见|评审意见/});await draft.fill('需要补充方法附件中的证据位置。');
  await capture('E6',1440,'dirty-review','Review status Tag and current resource/version identity, opinion and save action.');
  await r.getByRole('button',{name:'保存本地评审',exact:true}).click();
  await capture('E6',1440,'saved-review','Saved review Tag and local status without changing resource identity.');
  await open('E3');await page.evaluate(()=>document.documentElement.setAttribute('data-rain-theme','dark'));
  await capture('E3',1440,'dark-token-diagnostic','Existing dark Token scope only. W6 has no formal inverse product UI; excluded from main acceptance/conformance summaries.',{diagnostic:true});
} catch(error) {report.errors.push(String(error));console.error(error);}
await page.close();await browser.close();
const after=await protection();await writeFile(resolve(out,'protection-after.json'),JSON.stringify(after,null,2));
report.protection={before:'protection-before.json',after:'protection-after.json',
  frozen97DifferencesBefore:before.freezeDifferences,frozen97DifferencesAfter:after.freezeDifferences,
  filesChangedDuringAudit:Object.keys(before.filesSha256).filter(f=>before.filesSha256[f]!==after.filesSha256[f]),
  runtimeChanges:runtimeFiles.filter(f=>before.filesSha256[f]!==after.filesSha256[f]),
  archiveChanges:before.archives.filter((a,i)=>a.actual!==after.archives[i].actual),archivesMatchRecorded:after.archives.every(a=>a.actual===a.expected)};
report.finishedAt=new Date().toISOString();await writeFile(resolve(out,'capture-report.json'),JSON.stringify(report,null,2));
assert.equal(report.protection.runtimeChanges.length,0);assert.equal(report.protection.archiveChanges.length,0);assert.equal(report.protection.archivesMatchRecorded,true);
if(report.errors.length)process.exitCode=1;
console.log(JSON.stringify({cases:report.cases.length,errors:report.errors,protection:report.protection}));
