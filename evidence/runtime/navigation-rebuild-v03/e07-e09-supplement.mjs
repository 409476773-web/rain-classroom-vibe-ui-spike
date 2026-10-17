import { chromium, expect } from '@playwright/test';
import { writeFileSync } from 'node:fs';
const root = 'evidence/runtime/navigation-rebuild-v03';
const base = 'http://127.0.0.1:4174/#token-first-g3?rebuild=1';
const sizes = [{width:1200,height:800},{width:1440,height:900},{width:1920,height:1080},{width:1200,height:650}];
const facts = { startedAt:new Date().toISOString(), status:'running', E07:[], E09:[], artifacts:[], asynchronousQuery:{status:'not-applicable',reason:'ClassScopes calls synchronous queryClasses over generated local fixtures. Loading/error are explicit synchronous demo states, not pending requests; no old network response exists to overwrite current scope. Production async ordering is outside this candidate.'} };
const browser = await chromium.launch();
const page = await browser.newPage();
const shot = async name => { const path=`${root}/${name}.png`; await page.screenshot({path});facts.artifacts.push(path); };
try {
 for (const size of sizes) {
  await page.setViewportSize(size); await page.goto(base+'&recipe=S01&page=exams');
  const body = await page.locator('.nr-table tbody').innerText();
  const font = await page.locator('.nr-table tbody').evaluate(el=>getComputedStyle(el).fontSize);
  const group = {viewport:size,relations:[]};
  for (const relation of ['edge','inset','floating']) {
   await page.getByLabel('页面关系',{exact:true}).selectOption(relation);
   expect(await page.locator('.nr-table tbody').innerText()).toBe(body);
   expect(await page.locator('.nr-table tbody').evaluate(el=>getComputedStyle(el).fontSize)).toBe(font);
   const geometry = await page.locator('.nr-workspace').evaluate(el=>{const r=el.getBoundingClientRect(); const main=el.querySelector('.nr-main-scroll');return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom,mainOverflow:getComputedStyle(main).overflow,rootWidth:document.documentElement.scrollWidth,viewport:innerWidth};});
   expect(geometry.width).toBeGreaterThanOrEqual(560);
   expect(geometry.rootWidth).toBeLessThanOrEqual(size.width+1);
   expect(geometry.right).toBeLessThanOrEqual(size.width+1);expect(geometry.bottom).toBeLessThanOrEqual(size.height+1);
   group.relations.push({relation,...geometry,font,spaceCost:group.relations.length?group.relations[0].width-geometry.width:0});
   await shot(`E07-${size.width}x${size.height}-${relation}`);
  }
  facts.E07.push(group);
 }
 for (const size of sizes) {
  await page.setViewportSize(size);
  for(const count of [0,1,4,12,200]) {
   await page.goto(base+`&scene=course&recipe=S05&page=course-content&count=${count}`);
   const scope=page.getByLabel('班级范围'),direct=scope.locator('.nr-direct-classes button'),all=scope.getByRole('button',{name:'全部班级',exact:true});
   await expect(all).toBeVisible();await expect(scope.getByRole('button',{name:'公共资源包',exact:true})).toBeVisible();
   if(count>0) await expect(direct.first()).toBeVisible();
   const n=await direct.count();expect(n).toBeLessThanOrEqual(count);
   if(size.width>=1440&&count>=4)expect(n).toBeGreaterThanOrEqual(3);
   const geometry=await scope.evaluate(el=>{const direct=el.querySelector('.nr-direct-classes');const a=direct.getBoundingClientRect();const all=direct.nextElementSibling.getBoundingClientRect();return {directWidth:a.width,directRight:a.right,allLeft:all.left,allRight:all.right,buttons:[...direct.children].map(c=>{const r=c.getBoundingClientRect();return{name:c.getAttribute('aria-label'),title:c.getAttribute('title'),text:c.textContent,x:r.x,right:r.right,width:r.width,clipped:c.scrollWidth>c.clientWidth+1};})};});
   expect(geometry.directRight).toBeLessThanOrEqual(geometry.allLeft+1);
   expect(geometry.allRight).toBeLessThanOrEqual(size.width+1);
   for(const item of geometry.buttons){expect(item.name).toBe(item.title);expect(item.clipped).toBe(false);expect(item.right).toBeLessThanOrEqual(geometry.directRight+1);}
   await all.click();await expect(page.getByRole('textbox',{name:'搜索全部班级'})).toBeVisible();
   let identity=null;
   if(count>=4){
    await page.getByRole('textbox',{name:'搜索全部班级'}).fill('智能制造');
    await expect(page.getByLabel('当前教学范围')).toContainText('公共资源包');
    await page.getByRole('button',{name:'智能制造与工程创新跨学院联合实验班 · 2026 秋季',exact:true}).last().click();
    const selected=page.getByLabel('当前教学范围');await expect(selected).toContainText('智能制造与工程创新跨学院联合实验班 · 2026 秋季');
    identity=await selected.locator('strong').evaluate(el=>{const r=el.getBoundingClientRect();return{text:el.textContent,width:r.width,right:r.right,clipped:el.scrollWidth>el.clientWidth+1};});
    expect(identity.clipped).toBe(false);expect(identity.right).toBeLessThanOrEqual(size.width+1);
    await expect(scope.getByRole('button',{name:'公共资源包',exact:true})).toBeVisible();await expect(all).toBeVisible();
   }else await page.keyboard.press('Escape');
   facts.E09.push({viewport:size,count,directCount:n,fallbackAvailable:true,geometry,currentFullIdentity:identity});
   if(count===4||count===200)await shot(`E09-${size.width}x${size.height}-${count}-classes`);
  }
 }
 facts.status='pass';facts.exitCode=0;
 console.log(`PASS E07 ${facts.E07.length} viewports × 3 same-data relations; E09 ${facts.E09.length} viewport/data combinations`);
} catch(error) {facts.status='fail';facts.exitCode=1;facts.error=String(error);console.error(error);process.exitCode=1;}
finally {facts.finishedAt=new Date().toISOString();writeFileSync(`${root}/e07-e09-supplement-facts.json`,JSON.stringify(facts,null,2)+'\n');await browser.close();}
