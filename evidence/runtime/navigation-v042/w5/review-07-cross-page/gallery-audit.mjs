import { chromium, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
const out=path.resolve('evidence/runtime/navigation-v042/w5/review-07-cross-page/gallery-audit');
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const errors=[],issues=[],matrix=[];
for(const sample of ['A1','A2','A3','A4','A5','Contents','White','Connections']) {
  const page=await browser.newPage({viewport:{width:1600,height:1100},locale:'zh-CN',reducedMotion:'reduce'});
  page.on('pageerror',e=>errors.push({sample,error:String(e)}));
  await page.goto(`http://127.0.0.1:5198/?sample=${sample}#navigation-v042`);
  await page.locator('.nv42-review-canvas').waitFor();
  if(sample==='A1') {
    await page.getByTestId('candidate-A1').getByRole('link',{name:'资源中心',exact:true}).click();
    await expect(page.getByTestId('candidate-A1').getByRole('link',{name:'资源中心',exact:true})).toHaveAttribute('aria-current','page');
    await expect(page.getByTestId('candidate-A1')).toContainText('云盘文件');
    const tabs=page.getByRole('tablist',{name:'专业分析'});
    await tabs.getByRole('tab').first().focus();await page.keyboard.press('End');
    await expect(tabs.getByRole('tab').last()).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(tabs.getByRole('tab').last()).toHaveAttribute('aria-selected','true');
  }
  if(sample==='A4'||sample==='Connections') {
    const tabs=page.getByRole('tablist',{name:sample==='A4'?'课程内容样本范围':'连接实验范围'});
    await tabs.getByRole('tab').last().click();
    await expect(tabs.getByRole('tab').last()).toHaveAttribute('aria-selected','true');
    const trigger=sample==='A4'?page.getByRole('button',{name:'全部班级',exact:true}):page.getByRole('button',{name:'全部',exact:true});
    await trigger.click();
    const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();
    await dialog.getByRole('textbox',{name:'搜索范围',exact:true}).fill('不会有匹配结果');
    const empty=await dialog.locator('.rain-scope-navigation__results').evaluate(e=>({text:e.textContent.trim(),entries:e.querySelectorAll('button').length,status:e.querySelectorAll('[role="status"]').length}));
    if(empty.entries===0&&!empty.text) issues.push({sample,id:'scope-search-empty-feedback',detail:'Unmatched search produces a blank result area without an empty-state message.'});
    await page.screenshot({path:path.join(out,`${sample}-scope-search-empty.png`)});
    await page.keyboard.press('Escape');await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
    if(sample==='Connections') {
      await page.getByRole('button',{name:'定位当前',exact:true}).click();
      await expect(tabs.getByRole('tab').last()).toBeFocused();
    }
  }
  for(const width of [1200,1440,1600]) {
    await page.getByRole('combobox',{name:'画板宽度',exact:true}).selectOption(String(width));
    const facts=await page.locator('.nv42-review-canvas').evaluate(root=>({
      width:root.getBoundingClientRect().width,
      nestedControls:root.querySelectorAll('button button,button a,a button').length,
      tablists:Array.from(root.querySelectorAll('[role="tablist"]')).map(e=>({label:e.getAttribute('aria-label'),tabs:e.querySelectorAll('[role="tab"]').length,selected:e.querySelectorAll('[role="tab"][aria-selected="true"]').length})),
      icons:Array.from(root.querySelectorAll('.rain-navigation-list .rain-navigation-family__leading>[data-rain-id="icon"]')).map(e=>({w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height})),
      hiddenAvatarPictures:Array.from(root.querySelectorAll('.rain-avatar__picture')).filter(e=>getComputedStyle(e).visibility==='hidden'||Array.from(e.querySelectorAll('img')).some(i=>getComputedStyle(i).visibility==='hidden')).length,
      familyTracks:Array.from(root.querySelectorAll('.rain-navigation-family__track')).map(e=>({clientWidth:e.clientWidth,scrollWidth:e.scrollWidth,overflowX:getComputedStyle(e).overflowX}))
    }));
    expect(facts.nestedControls).toBe(0);facts.tablists.forEach(e=>expect(e.selected).toBe(1));
    facts.icons.forEach(i=>expect(i).toEqual({w:18,h:18}));
    if(facts.hiddenAvatarPictures&&!issues.some(i=>i.sample===sample&&i.id==='hidden-avatar-portrait')) issues.push({sample,id:'hidden-avatar-portrait',count:facts.hiddenAvatarPictures,detail:'Existing Avatar portrait is hidden and replaced with manually drawn initials.'});
    matrix.push({sample,width,scope:['A2','A3','A5','Contents','White'].includes(sample)?'Live geometry and semantic inspection; detailed interaction additionally covered by existing W3 browser suite.':'Live interaction plus geometry and semantic inspection.',...facts});
    await page.locator('.nv42-review-canvas').screenshot({path:path.join(out,`${sample}-${width}.png`)});
  }
  await page.close();
}
await browser.close();
await fs.writeFile(path.join(out,'facts.json'),JSON.stringify({recordedAt:new Date().toISOString(),matrix,issues,errors},null,2));
console.log(JSON.stringify({caseCount:matrix.length,pageErrors:errors.length,issues}));
