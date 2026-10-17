import { chromium, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const out=path.dirname(fileURLToPath(import.meta.url));
const mode=process.argv[2]??'before';
await fs.mkdir(`${out}/${mode}`,{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[],errors=[];
const source=Object.fromEntries(await Promise.all(['r4-r6.tsx','r4-r6.css','r4-r6.test.tsx'].map(async f=>[f,crypto.createHash('sha256').update(await fs.readFile(`apps/playground/src/recipes/navigation-v042/${f}`)).digest('hex')])));
const open=async(sample,width=1440,scene,height=1100)=>{
 const page=await browser.newPage({viewport:{width:1800,height},locale:'zh-CN',reducedMotion:'reduce'});
 page.setDefaultTimeout(8000);
 page.on('pageerror',e=>errors.push({sample,scene,message:e.message}));
 await page.goto(`http://127.0.0.1:5198/?sample=${sample}&audit=review10-owner-${width}-${scene??'default'}#navigation-v042`);
 await expect(page.getByRole('heading',{name:'导航组件 · v0.4.2'})).toBeVisible();
 await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));
 if(scene) await page.getByRole('combobox',{name:'业务子场景'}).selectOption(scene);
 return {page,root:page.getByTestId('candidate-canvas').locator('.rain-workspace')};
};
const capture=async(root,name)=>{
 await root.screenshot({path:`${out}/${mode}/${name}.png`});
 return root.evaluate(el=>{
  const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}};
  const visible=e=>e.getClientRects().length>0;
  return {workspace:rect(el),regions:[...el.querySelectorAll('.rain-workspace__region')].map(e=>({id:e.dataset.regionId,mode:e.dataset.mode,...rect(e)})),
   overflows:[...el.querySelectorAll('.nv5-formbody,.nv5-table-view,.nv5-kanban,.nv5-album,.nv5-slide,.nv5-answer-title,.nv5-document-header,.nv5-media-top,.nv5-view-tools,.nv5-grade-footer')].filter(visible).map(e=>({class:e.className,...rect(e),cw:e.clientWidth,sw:e.scrollWidth,ch:e.clientHeight,sh:e.scrollHeight,overflow:getComputedStyle(e).overflow})),
   controls:[...el.querySelectorAll('button,input,textarea')].filter(visible).map(e=>({label:e.getAttribute('aria-label')||e.textContent?.trim(),...rect(e)})).filter(e=>e.w<10||e.h<10)};
 });
};
const check=async(name,run)=>{try{results.push({name,status:'passed',facts:await run()})}catch(e){results.push({name,status:'failed',message:e.message})}await fs.writeFile(`${out}/${mode}-results.json`,JSON.stringify({at:new Date().toISOString(),mode,source,results,errors},null,2));console.log(name,results.at(-1).status)};
const tabNames={form:'反馈表单',table:'表格',board:'状态分组',album:'画册'};
for(const width of (process.env.AUDIT_INTERACTIONS_ONLY?[]:[1200,1440,1600])) for(const [sample,scene,view] of [['R4','interaction'],['R4','grading'],['R5'],['R6',null,'form'],['R6',null,'table'],['R6',null,'board'],['R6',null,'album']]){
 await check(`visual ${sample} ${scene??view??'replay'} ${width}`,async()=>{
  const {page,root}=await open(sample,width,scene);
  if(view&&view!=='form') await root.getByRole('tab',{name:tabNames[view],exact:true}).click();
  const facts=await capture(root,`${sample}-${scene??view??'replay'}-${width}`);
  await page.close();return facts;
 });
}
await check('R4 grading search empty, keyboard material and per-identity draft isolation',async()=>{
 const {page,root}=await open('R4',1200,'grading');
 await root.getByRole('textbox',{name:'给当前作答的反馈'}).fill('Review10 当前学生草稿。');
 await root.getByRole('spinbutton',{name:'当前作答得分'}).fill('8.7');
 await root.getByRole('button',{name:'本地保存草稿',exact:true}).click();
 const inputValidity=await root.getByRole('spinbutton',{name:'当前作答得分'}).evaluate(e=>({value:e.value,stepMismatch:e.validity.stepMismatch,valid:e.validity.valid}));
 const search=root.getByRole('textbox',{name:'搜索学生姓名或学号'});
 await search.fill('无此学生'); await expect(root.getByRole('group',{name:'学生队列'}).getByRole('button')).toHaveCount(0);
 await expect(root.getByRole('textbox',{name:'给当前作答的反馈'})).toHaveValue('Review10 当前学生草稿。');
 await search.fill('');
 await root.getByRole('group',{name:'学生队列'}).getByRole('button',{name:'欧阳小明',exact:true}).click();
 await expect(root.getByRole('textbox',{name:'给当前作答的反馈'})).toHaveValue('');
 await root.getByRole('group',{name:'学生队列'}).getByRole('button',{name:'李梦',exact:true}).click();
 await expect(root.getByRole('textbox',{name:'给当前作答的反馈'})).toHaveValue('Review10 当前学生草稿。');
 const source=root.getByRole('tab',{name:'原题材料.pdf',exact:true});await source.focus();await page.keyboard.press('ArrowRight');await page.keyboard.press('Enter');
 await expect(root.getByRole('tab',{name:'附录.pdf',exact:true})).toHaveAttribute('aria-selected','true');
 await root.getByRole('button',{name:'专注内容',exact:true}).click();await root.getByRole('button',{name:'退出专注',exact:true}).click();
 await expect(root.getByRole('textbox',{name:'给当前作答的反馈'})).toHaveValue('Review10 当前学生草稿。');
 const facts=await capture(root,'R4-grading-draft-1200');await page.close();return {inputValidity,...facts};
});
await check('R4 interaction selected hidden by query recovers, local tabs and group submission filter',async()=>{
 const {page,root}=await open('R4',1200,'interaction');
 const search=root.getByRole('textbox',{name:'搜索小组'});await search.fill('不存在');
 await expect(root.getByRole('group',{name:'小组结果'}).getByRole('button')).toHaveCount(0);
 await search.fill(''); await expect(root.getByRole('group',{name:'小组结果'}).getByRole('button',{name:'第一小分队',exact:true})).toHaveAttribute('aria-pressed','true');
 for(const name of ['投稿','随机点名','分组讨论','智能汇报']) await root.getByRole('tab',{name,exact:true}).click();
 await root.getByRole('radio',{name:'未评分',exact:true}).locator('..').click();
 await expect(root.getByRole('group',{name:'小组结果'}).getByRole('button')).toHaveCount(2);
 await root.getByRole('group',{name:'小组结果'}).getByRole('button',{name:'知行合一',exact:true}).click();
 await expect(root.getByRole('heading',{name:'知行合一',exact:true})).toBeVisible();
 await root.getByRole('button',{name:'隐藏小组列表',exact:true}).first().click();await root.getByRole('button',{name:'显示小组列表',exact:true}).click();
 const facts=await capture(root,'R4-interaction-filter-1200');await page.close();return facts;
});
await check('R5 all events, follow playback, filter, mind-map and transcript',async()=>{
 const {page,root}=await open('R5',1200);
 for(const name of ['课堂小结 · 三个关键步骤','随堂练习 · 等效电路','戴维南定理与模型边界','课堂导入 · 认识等效关系']){
  const event=root.getByRole('group',{name:'课堂回顾事件'}).getByRole('button',{name,exact:true});await event.click();
  await expect(event).toHaveAttribute('aria-pressed','true');
 }
 await root.getByRole('radio',{name:'习题',exact:true}).locator('..').click();
 await expect(root.getByRole('group',{name:'课堂回顾事件'}).getByRole('button')).toHaveCount(1);
 await root.getByRole('radio',{name:'全部',exact:true}).locator('..').click();
 await root.getByRole('checkbox',{name:'跟随播放定位'}).locator('..').click();
 const range=root.getByRole('slider',{name:'模拟播放位置'});await range.focus();await page.keyboard.press('End');
 await expect(root.getByRole('group',{name:'课堂回顾事件'}).getByRole('button',{name:'课堂小结 · 三个关键步骤',exact:true})).toHaveAttribute('aria-pressed','true');
 await page.keyboard.press('Home');await root.getByRole('button',{name:'播放回放',exact:true}).click();
 await expect(range).not.toHaveValue('0');await root.getByRole('button',{name:'暂停回放',exact:true}).click();
 await root.getByRole('radio',{name:'脑图 3',exact:true}).locator('..').click();await expect(root.getByRole('img',{name:'应用边界示意脑图'})).toBeVisible();
 await root.getByRole('tab',{name:'讲稿',exact:true}).click();await root.getByRole('button',{name:/定位到/}).click();
 const facts=await capture(root,'R5-controls-1200');await page.close();return facts;
});
await check('R6 all six page identities, four views, long draft, add fields and table records',async()=>{
 const {page,root}=await open('R6',1200);
 await root.getByRole('button',{name:'显示编辑工具',exact:true}).click();
 await root.getByRole('textbox',{name:'课程名称'}).fill('Review10 长课程名称：大学物理与高等数学联合课堂反馈记录');
 await root.getByRole('textbox',{name:'你希望我们改进的地方'}).fill('Review10 草稿保留。');
 for(const kind of ['文本','单选','评分','附件']) await root.getByRole('button',{name:`新增${kind}题`,exact:true}).click();
 await root.getByRole('textbox',{name:'新增附件题 4'}).fill('附件示例内容');
 await root.getByRole('radio',{name:'填写预览',exact:true}).locator('..').click();
 await expect(root.getByRole('textbox',{name:'你希望我们改进的地方'})).toHaveValue('Review10 草稿保留。');
 await root.getByRole('button',{name:'完成预览',exact:true}).click();
 const pageFacts=[];
 for(const name of ['课程任务','教研周报','资源素材','课程介绍','参考资料','学习反馈']){
  await root.getByRole('link',{name,exact:true}).click();
  await expect(root.getByRole('tab',{name:'反馈表单',exact:true})).toHaveCount(name==='学习反馈'?1:0);
  await root.getByRole('tab',{name:'表格',exact:true}).click();await root.getByRole('button',{name:'+ 添加记录',exact:true}).click();
  await expect(root.getByRole('table',{name:`${name}记录`}).getByRole('row')).toHaveCount(7);
  for(const tab of ['状态分组','画册']) await root.getByRole('tab',{name:tab,exact:true}).click();
  pageFacts.push({page:name,viewCount:await root.getByRole('tablist',{name:'页面内容视图'}).getByRole('tab').count()});
 }
 await root.getByRole('tab',{name:'反馈表单',exact:true}).click();await expect(root.getByRole('textbox',{name:'新增附件题 4'})).toHaveValue('附件示例内容');
 const search=root.getByRole('textbox',{name:'搜索工作区'});await search.fill('no match');
 await expect(root.getByText('未找到匹配的工作区或文档',{exact:true})).toBeVisible();
 await search.fill('');const facts=await capture(root,'R6-extended-form-1200');await page.close();return {pageFacts,...facts};
});
for(const [sample,scene] of [['R4','interaction'],['R4','grading'],['R5'],['R6']]) await check(`short window ${sample} ${scene??'default'} layout popup and focus recovery`,async()=>{
 const {page,root}=await open(sample,1200,scene,480);
 await root.getByRole('button',{name:'布局',exact:true}).click();
 const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();
 const facts=await dialog.evaluate(e=>{const r=e.getBoundingClientRect();return {top:r.top,bottom:r.bottom,height:r.height,viewport:innerHeight,scroll:e.scrollHeight,client:e.clientHeight}});
 await page.keyboard.press('Escape');
 await root.getByRole('button',{name:'专注内容',exact:true}).click();await root.getByRole('button',{name:'退出专注',exact:true}).click();
 await page.screenshot({path:`${out}/${mode}/${sample}-${scene??'default'}-short480.png`});await page.close();return facts;
});
await browser.close();await fs.writeFile(`${out}/${mode}-results.json`,JSON.stringify({at:new Date().toISOString(),mode,source,results,errors},null,2));
console.log(JSON.stringify({mode,passed:results.filter(r=>r.status==='passed').length,failed:results.filter(r=>r.status==='failed').map(r=>({name:r.name,message:r.message})),pageErrors:errors.length},null,2));
process.exitCode=results.some(r=>r.status==='failed')||errors.length?1:0;
