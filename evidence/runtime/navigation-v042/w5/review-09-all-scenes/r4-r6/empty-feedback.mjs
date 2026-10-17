import { chromium,expect } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const out=path.dirname(fileURLToPath(import.meta.url)),stage=process.argv[2]??'before';
const browser=await chromium.launch({headless:true}),checks=[],errors=[];
for(const width of [1200,1440,1600]) for(const [sample,scene,searchName,text,action] of [['R4','interaction','搜索小组','未找到匹配的小组','清除搜索小组'],['R4','grading','搜索学生姓名或学号','未找到匹配的学生','清除搜索学生姓名或学号'],['R6',null,'搜索工作区','未找到匹配的工作区或文档','清除搜索工作区']]){
 const page=await browser.newPage({viewport:{width:1800,height:1100},locale:'zh-CN',reducedMotion:'reduce'});page.setDefaultTimeout(7000);page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`http://127.0.0.1:5198/?sample=${sample}&emptyAudit=review09-${width}-${scene??'default'}#navigation-v042`);
 await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));if(scene)await page.getByRole('combobox',{name:'业务子场景'}).selectOption(scene);
 const root=page.getByTestId('candidate-canvas').locator('.rain-workspace');
 if(scene==='grading')await root.getByRole('textbox',{name:'给当前作答的反馈'}).fill('Review09 空搜索保留草稿。');
 if(sample==='R6')await root.getByRole('textbox',{name:'你希望我们改进的地方'}).fill('Review09 工作区空搜索保留草稿。');
 const search=root.getByRole('textbox',{name:searchName});await search.fill('找不到匹配对象');
 await root.screenshot({path:`${out}/${stage}/${sample}-${scene??'workspace'}-search-empty-${width}.png`});
 const facts={width,sample,scene,emptyFeedback:await root.getByText(text,{exact:true}).count(),statuses:await root.locator('.rain-navigation-family__message,.nv5-workspace-search-empty').allTextContents(),studentCount:scene==='grading'?await root.locator('.nv5-student-queue .nv5-queue-head small').innerText():null};
 if(stage==='after'){
  await expect(root.getByText(text,{exact:true})).toBeVisible();await root.getByRole('button',{name:action,exact:true}).click();await expect(search).toHaveValue('');await expect(root.getByText(text,{exact:true})).toHaveCount(0);
  if(scene==='grading')await expect(root.getByRole('textbox',{name:'给当前作答的反馈'})).toHaveValue('Review09 空搜索保留草稿。');
  if(sample==='R6')await expect(root.getByRole('textbox',{name:'你希望我们改进的地方'})).toHaveValue('Review09 工作区空搜索保留草稿。');
 }
 checks.push(facts);await page.close();
}
await browser.close();await fs.writeFile(`${out}/empty-${stage}-results.json`,JSON.stringify({at:new Date().toISOString(),stage,checks,errors},null,2));console.log(JSON.stringify({stage,scenarios:checks.length,errors}));
