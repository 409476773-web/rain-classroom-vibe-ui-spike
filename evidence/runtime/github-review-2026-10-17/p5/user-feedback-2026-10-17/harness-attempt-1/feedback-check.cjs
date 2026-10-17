const fs=require('node:fs'),path=require('node:path');
const {createRequire}=require('node:module');
const {chromium,expect}=createRequire(path.resolve('package.json'))('@playwright/test');
const out=path.resolve('../evidence/user-feedback-2026-10-17');
(async()=>{
 const browser=await chromium.launch({headless:true}),results=[],errors=[];
 for(const width of [1440,777,390]){
  const p=await browser.newPage({viewport:{width,height:width===390?844:width===777?788:1000},deviceScaleFactor:1});
  p.on('pageerror',e=>errors.push({width,error:e.message}));
  try{
   await p.goto('http://127.0.0.1:5518/');
   const course=p.getByRole('combobox',{name:'按课程筛选'}),compare=p.getByRole('button',{name:'查看版本比较',exact:true});
   await expect(course).toBeVisible();await expect(p.locator('select')).toHaveCount(0);
   await expect(compare).toHaveAttribute('data-size','small');await expect(compare).toHaveAttribute('data-variant','secondary');
   const compareHeight=await compare.evaluate(e=>e.getBoundingClientRect().height);
   expect(compareHeight).toBe(32);
   const pdf=p.locator('.ru-document-icon [data-icon="icon/file-format-pdf"]');
   await expect(pdf).toHaveAttribute('data-icon-color-mode','intrinsic');
   await expect.poll(()=>pdf.locator('img').evaluate(e=>e.complete&&e.naturalWidth>0)).toBe(true);
   await expect.poll(()=>p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   await p.screenshot({path:path.join(out,`after-${width}.png`),fullPage:true,animations:'disabled'});
   await p.getByTestId('row-use-01').locator('label[data-rain-id=ui-checkbox]').click();
   await p.getByRole('textbox',{name:'更新备注（选填）'}).fill('反馈修订验证');
   await course.click();const menu=p.getByRole('listbox');
   await expect(menu).toBeVisible();await expect(menu.getByRole('option')).toHaveCount(4);
   const menuBox=await menu.boundingBox();expect(menuBox.x).toBeGreaterThanOrEqual(0);expect(menuBox.x+menuBox.width).toBeLessThanOrEqual(width+1);
   await p.screenshot({path:path.join(out,`select-open-${width}.png`),animations:'disabled'});
   await p.keyboard.press('Escape');await expect(menu).toBeHidden();await expect(course).toBeFocused();
   await course.click();await p.getByRole('option',{name:'教育观察实践',exact:true}).click();
   await expect(p.locator('.ru-location')).toHaveCount(3);await expect(p.locator('.ru-result-toolbar')).toContainText('筛选外已选 1 个');
   await expect(p.getByTestId('scope-use-01')).toHaveCount(1);
   await course.click();await p.getByRole('option',{name:'全部课程',exact:true}).click();
   await expect(p.locator('.ru-location')).toHaveCount(8);await expect(p.getByTestId('row-use-01').getByRole('checkbox')).toBeChecked();
   const detailTrigger=p.getByRole('button',{name:'查看使用位置 use-01'});await detailTrigger.click();const detail=p.getByRole('dialog');await expect(detail).toBeVisible();
   const detailSelect=detail.getByRole('combobox');await detailSelect.click();await expect(p.getByRole('listbox')).toBeVisible();
   await p.keyboard.press('Escape');await expect(p.getByRole('listbox')).toBeHidden();await expect(detail).toBeVisible();await expect(detailSelect).toBeFocused();
   await detailSelect.click();await p.getByRole('option',{name:'use-08 · 第 4 周 · 主题研讨',exact:true}).click();await expect(detail).toContainText('只读 · 其他教师维护，不可加入更新');
   await detail.getByRole('button',{name:'关闭使用位置详情'}).click();await expect(detail).toHaveCount(0);await expect(detailTrigger).toBeFocused();
   await expect(p.getByRole('textbox',{name:'更新备注（选填）'})).toHaveValue('反馈修订验证');
   await compare.click();await expect(p.getByRole('dialog')).toBeVisible();await p.keyboard.press('Escape');await expect(p.getByRole('dialog')).toHaveCount(0);await expect(compare).toBeFocused();
   results.push({width,status:'passed',compareHeight,pdfAsset:'icon/file-format-pdf',nativeSelectCount:0,menuBox});
  }catch(e){results.push({width,status:'failed',error:e.stack});await p.screenshot({path:path.join(out,`failed-feedback-${width}.png`),fullPage:true});}
  await p.close();fs.writeFileSync(path.join(out,'feedback-results.json'),JSON.stringify({results,pageErrors:errors},null,2));
 }
 await browser.close();console.log(JSON.stringify({results,pageErrors:errors},null,2));process.exitCode=results.some(r=>r.status==='failed')||errors.length?1:0;
})().catch(e=>{console.error(e);process.exit(1)});
