import { chromium, expect } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const base = process.env.RAIN_REVIEW01_BUILT_URL ?? 'http://127.0.0.1:5371';
const browser = await chromium.launch({headless:true});
const page = await browser.newPage({viewport:{width:1600,height:1100}});
const errors=[], badResponses=[], routes=[];
page.on('pageerror', error=>errors.push(String(error)));
page.on('response', response=>{if(response.status()>=400)badResponses.push({url:response.url(),status:response.status()});});
try {
  for (const family of ['R','S','E']) for(let i=1;i<=6;i++) {
    const id=family+i; await page.goto(base+'/#'+id); await expect(page.locator('main.navigation-handoff')).toBeVisible(); await expect(page.getByRole('region',{name:'当前场景 '+id,exact:true})).toBeVisible();
    if(family==='E')await expect(page.locator('[data-scene="'+id+'"]')).toBeVisible();
    routes.push(id);
  }
  let root=page.locator('[data-scene="E6"]');
  await root.getByRole('textbox',{name:'审核意见',exact:true}).fill('独立构建的审核草稿');
  await root.getByRole('button',{name:'隐藏资源队列',exact:true}).click();
  await root.getByRole('button',{name:'隐藏评审面板',exact:true}).click();
  await root.getByRole('button',{name:'展开资源队列',exact:true}).click();
  await root.getByRole('button',{name:'展开评审面板',exact:true}).click();
  await expect(root.getByRole('textbox',{name:'审核意见',exact:true})).toHaveValue('独立构建的审核草稿');
  await root.getByRole('button',{name:'保存本地评审',exact:true}).click();
  await expect(root.getByRole('status',{name:'本地保存状态'})).toHaveText('本页已保存');
  await page.evaluate(()=>localStorage.setItem('review01-unrelated','retained'));
  await page.getByRole('button',{name:'恢复包内默认',exact:true}).click();
  await expect(root.getByRole('textbox',{name:'审核意见',exact:true})).toHaveValue('');
  expect(await page.evaluate(()=>localStorage.getItem('review01-unrelated'))).toBe('retained');
  await page.goto(base+'/#E3'); root=page.locator('[data-scene="E3"]');
  await root.getByRole('spinbutton',{name:'本题分数',exact:true}).fill('16');
  await root.getByRole('textbox',{name:'评分评语'}).fill('构建包分数与答案核对');
  await root.getByRole('group',{name:'当前题目选择',exact:true}).getByRole('button',{name:'第2题',exact:true}).click();
  await expect(root.getByRole('spinbutton',{name:'本题分数',exact:true})).toHaveValue('');
  await root.getByRole('group',{name:'当前题目选择',exact:true}).getByRole('button',{name:'第1题',exact:true}).click();
  await expect(root.getByRole('spinbutton',{name:'本题分数',exact:true})).toHaveValue('16');
  await expect(root.getByText('尚未保存到本地', {exact:true})).toBeVisible();
  await page.goto(base+'/#E4'); root=page.locator('[data-scene="E4"]');
  await root.getByRole('button',{name:'讲稿 02:10',exact:true}).click();
  await root.getByRole('textbox',{name:'回放笔记',exact:true}).fill('构建包回放笔记');
  await root.getByRole('button',{name:'临时查看知识索引',exact:true}).click();
  await page.keyboard.press('Escape');
  await expect(root.getByTestId('playback-time')).toHaveText('02:10');
  await expect(root.getByRole('textbox',{name:'回放笔记',exact:true})).toHaveValue('构建包回放笔记');
  expect(errors).toEqual([]);expect(badResponses).toEqual([]);
  const report={status:'passed',recordedAt:new Date().toISOString(),engine:'chromium',version:browser.version(),baseURL:base,routes,checks:['18 R/S/E routes','E6 edge restore and explicit save','package reset preserves unrelated storage','E3 public InputNumber and keyed unsubmitted draft','E4 chapter seek and temporary retention'],errors,badResponses,humanApproved:false};
  await writeFile(fileURLToPath(new URL('built-preview-results.json',import.meta.url)),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report));
} finally {await browser.close();}
