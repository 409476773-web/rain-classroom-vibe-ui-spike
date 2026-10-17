import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
const phase=process.argv[2]??'before';
const dest=process.argv[3]??'evidence/runtime/navigation-v042/w5/review-07-cross-page/r1-r3';
mkdirSync(`${dest}/${phase}`,{recursive:true});
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1800,height:1100},locale:'zh-CN',reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const results=[];
const check=async(name,fn)=>{try{await fn();return {name,status:'passed'};}catch(e){return {name,status:'failed',error:e.message};}};
for(const width of [1200,1440,1600])for(const [sample,scene] of [['R1','plan'],['R1','industry'],['R3','files'],['R3','errors']]){
  await page.goto(`http://127.0.0.1:5198/?sample=${sample}&review=${phase}-${width}-${scene}#navigation-v042`);
  await page.getByRole('heading',{name:'导航组件 · v0.4.2'}).waitFor();
  await page.getByRole('combobox',{name:'业务子场景'}).selectOption(scene);
  await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));
  const root=page.locator('.nv43-frame');await root.waitFor();
  await page.mouse.move(1790,1090);
  const metrics=await root.evaluate(e=>{
    const box=el=>{if(!el)return null;const r=el.getBoundingClientRect(),c=getComputedStyle(el);return {x:r.x,y:r.y,w:r.width,h:r.height,sw:el.scrollWidth,cw:el.clientWidth,color:c.color,font:c.fontSize,overflow:c.overflowX};};
    return {root:box(e),main:box(e.querySelector('.nv43-main')),sheet:box(e.querySelector('.nv43-sheet')),tools:box(e.querySelector('.nv43-table-tools')),table:box(e.querySelector('.nv43-table')),fileName:box(e.querySelector('tbody tr:nth-child(2) td:nth-child(2) button')),fileIcon:box(e.querySelector('tbody tr:nth-child(2) td:nth-child(2) [data-rain-id="icon"]')),size:box(e.querySelector('tbody tr:nth-child(2) td:nth-child(3)')),date:box(e.querySelector('tbody tr:nth-child(2) td:nth-child(5)')),serialHeader:box(e.querySelector('th:first-child')),pinLabel:e.querySelector('[data-workspace-action="pin"]')?.getAttribute('aria-label'),deepTree:Array.from(e.querySelectorAll('.rain-tree [data-slot="title"]')).map(box),nestedButtons:e.querySelectorAll('button button').length};
  });
  await root.screenshot({path:`${dest}/${phase}/${sample}-${scene}-${width}.png`});
  const interactions=[];
  interactions.push(await check('hide, focus and recovery preserve business identity',async()=>{
    const title=await root.locator('.nv43-workspace-bar strong').textContent();
    await root.getByRole('button',{name:sample==='R1'?'隐藏专业导航':'隐藏资源目录',exact:true}).last().click();
    await root.getByRole('button',{name:'专注内容',exact:true}).click();await root.getByRole('button',{name:'退出专注',exact:true}).click();
    await root.getByRole('button',{name:sample==='R1'?'显示专业导航':'显示资源目录',exact:true}).click();
    if(await root.locator('.nv43-workspace-bar strong').textContent()!==title)throw new Error('identity changed');
    if(width===1200)await page.keyboard.press('Escape');
  }));
  interactions.push(await check('layout popover supports Escape',async()=>{
    await root.getByRole('button',{name:'布局',exact:true}).click();await page.getByRole('dialog',{name:`${sample} 布局`}).waitFor();await page.keyboard.press('Escape');
  }));
  if(phase.startsWith('after'))interactions.push(await check('pin naming follows fixed and temporary states',async()=>{
    const label=sample==='R1'?'专业导航':'资源目录';
    await root.getByRole('button',{name:`取消固定${label}`,exact:true}).click();
    if(await root.locator('.rain-workspace__region[data-region-id="context"]').getAttribute('data-temporary')!=='true')throw new Error('unpin did not open temporary context');
    await root.getByRole('button',{name:`固定${label}`,exact:true}).click();
    if(await root.locator('.rain-workspace__region[data-region-id="context"]').getAttribute('data-temporary')==='true')throw new Error('pin did not retain context');
  }));
  if(sample==='R1'){
    if(scene==='plan')interactions.push(await check('analysis switches and professional navigation',async()=>{
      await root.getByRole('tab',{name:'学分结构',exact:true}).click();await root.getByRole('tabpanel',{name:'学分结构',exact:true}).waitFor();
      await root.getByRole('navigation',{name:'质量监控'}).getByRole('link',{name:'学生培养分析',exact:true}).click();await root.getByRole('heading',{name:'学生培养分析',exact:true}).waitFor();
    }));
    else interactions.push(await check('chain and diagram mode switches',async()=>{
      await root.getByRole('radio',{name:'绿色低碳建造产业链',exact:true}).locator('..').click();
      await root.getByRole('radio',{name:'桑基图',exact:true}).locator('..').click();
      if(await root.locator('.nv43-industry').getAttribute('data-mode')!=='sankey')throw new Error('diagram did not switch');
    }));
  }else if(scene==='files'){
    if(phase.startsWith('after'))interactions.push(await check('file roles use 15px identity and requested public color Tokens',async()=>{
      if(metrics.fileName.font!=='15px'||metrics.fileIcon.w!==15||metrics.fileIcon.h!==15)throw new Error('filename and icon size mismatch');
      const tokens=await root.evaluate(e=>({primary:getComputedStyle(e).getPropertyValue('--rain-category-text-neutral-1').trim(),secondary:getComputedStyle(e).getPropertyValue('--rain-category-text-neutral-6').trim()}));
      const compact=c=>c.replace(/[,\s]/g,'');
      if(compact(metrics.fileName.color)!==compact(tokens.primary)||compact(metrics.size.color)!==compact(tokens.secondary)||compact(metrics.date.color)!==compact(tokens.secondary))throw new Error('file role Token mismatch');
    }));
    interactions.push(await check('file search, grid type and selection preservation',async()=>{
      await root.getByRole('checkbox',{name:'选择 第一章 函数、极限与连续.pdf',exact:true}).locator('..').click();
      await root.getByRole('radio',{name:'网格',exact:true}).locator('..').click();
      metrics.gridIcons=await root.locator('.nv43-file-open [data-rain-id="icon"]').evaluateAll(es=>es.map(e=>e.getAttribute('data-icon')));
      metrics.gridCheckboxes=await root.getByRole('checkbox').count();
      if(phase.startsWith('after')){
        if(metrics.gridCheckboxes!==8)throw new Error('grid selection affordances missing');
        const expected=['folder','file-format-pdf-outline','file-format-docx-outline','file-format-xlsx-outline','file-format-pdf-outline','file-format-docx-outline','file-format-pdf-outline','file-format-xlsx-outline'].map(id=>`icon/${id}`);
        if(JSON.stringify(metrics.gridIcons)!==JSON.stringify(expected))throw new Error('grid file types changed');
        if(!await root.getByRole('checkbox',{name:'选择 第一章 函数、极限与连续.pdf',exact:true}).isChecked())throw new Error('grid selected state missing');
      }
      await root.screenshot({path:`${dest}/${phase}/${sample}-${scene}-${width}-grid.png`});
      await root.getByRole('radio',{name:'列表',exact:true}).locator('..').click();
      if(!await root.getByRole('checkbox',{name:'选择 第一章 函数、极限与连续.pdf',exact:true}).isChecked())throw new Error('selection lost');
      await root.getByRole('textbox',{name:'搜索当前范围内的文件'}).fill('教学大纲');if(await root.locator('tbody tr').count()!==1)throw new Error('search mismatch');
      await root.getByRole('textbox',{name:'搜索当前范围内的文件'}).fill('不存在的资料');await root.getByRole('status').filter({hasText:'没有匹配内容'}).waitFor();
      await root.getByRole('textbox',{name:'搜索当前范围内的文件'}).fill('');
    }));
  }else {
    if(phase.startsWith('after'))interactions.push(await check('serial header remains on one readable line',async()=>{
      const h=await root.locator('th:first-child').evaluate(e=>({width:e.getBoundingClientRect().width,whiteSpace:getComputedStyle(e).whiteSpace}));
      if(h.width<64||h.whiteSpace!=='nowrap')throw new Error('serial header wraps');
    }));
    interactions.push(await check('star filter, star toggle, directory and log panels',async()=>{
    await root.getByRole('radio',{name:'加星',exact:true}).locator('..').click();if(await root.locator('tbody tr').count()!==3)throw new Error('star filter mismatch');
    await root.getByRole('button',{name:'取消加星 · 第 1 题',exact:true}).click();if(await root.locator('tbody tr').count()!==2)throw new Error('star removal mismatch');
    await root.getByRole('treeitem',{name:'2.2 导数的应用',exact:true}).click();
    await root.getByRole('tab',{name:'学习日志',exact:true}).click();await root.getByRole('tabpanel',{name:'学习日志',exact:true}).waitFor();
    await root.getByRole('tab',{name:'学习目录',exact:true}).click();
  }));
  }
  results.push({sample,scene,width,metrics,interactions});
  writeFileSync(`${dest}/${phase}/audit.json`,JSON.stringify({createdAt:new Date().toISOString(),phase,errors,cases:results},null,2));
}
await browser.close();
const failures=results.flatMap(c=>c.interactions.filter(i=>i.status==='failed').map(i=>({...i,sample:c.sample,scene:c.scene,width:c.width})));
console.log(JSON.stringify({phase,cases:results.length,errors,failures},null,2));
if(errors.length||failures.length)process.exitCode=1;
