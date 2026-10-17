import { chromium, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const out = path.dirname(fileURLToPath(import.meta.url));
const sourceFiles = ['r4-r6.tsx','r4-r6.css','workspace-states.tsx','workspace-states.css','platform-navigation.css'];
const hashSources = async () => Object.fromEntries(await Promise.all(sourceFiles.map(async file => [file,crypto.createHash('sha256').update(await fs.readFile(`apps/playground/src/recipes/navigation-v042/${file}`)).digest('hex')])));
const beforeHash = await hashSources();
await fs.mkdir(`${out}/after`, {recursive:true});
const browser = await chromium.launch({headless:true});
const checks = [], errors = [];
const region = (root,id) => root.locator(`.rain-workspace__region[data-region-id="${id}"]`);
const restore = (root,id) => root.locator(`.rain-workspace__restore[aria-controls$="-workspace-${id}"]`);
const box = locator => locator.evaluate(element => {const r=element.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};});
const open = async (sample,width=1440,scene) => {
  const page = await browser.newPage({viewport:{width:1800,height:1100},locale:'zh-CN',reducedMotion:'reduce'});
  page.on('pageerror',error=>errors.push({sample,message:error.message}));
  await page.goto(`http://127.0.0.1:5198/?sample=${sample}&ownerAudit=review07-${width}#navigation-v042`);
  await expect(page.getByRole('heading',{name:'导航组件 · v0.4.2'})).toBeVisible();
  await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));
  if(scene) await page.getByRole('combobox',{name:'业务子场景'}).selectOption(scene);
  return {page,root:page.getByTestId('candidate-canvas').locator('.rain-workspace')};
};
const check = async (name,callback) => {
  try {const facts=await callback();checks.push({name,status:'passed',facts});}
  catch(error) {checks.push({name,status:'failed',message:error.message});}
};

for(const width of [1200,1440,1600]) await check(`S5 standard Avatar and default width recovery at ${width}`,async()=>{
  const {page,root}=await open('S5',width);
  const draft=root.getByRole('textbox',{name:'教学目标草稿'});
  await draft.fill('Review07 保留当前文档草稿。');
  const separator=root.getByRole('separator',{name:'调整课程导航宽度'});
  await separator.focus();for(let i=0;i<3;i++) await page.keyboard.press('ArrowRight');
  expect(await separator.getAttribute('aria-valuenow')).toBe('246');
  await root.getByRole('button',{name:'布局设置'}).click();
  await page.getByRole('button',{name:'恢复默认',exact:true}).click();await page.keyboard.press('Escape');
  expect((await box(region(root,'context'))).width).toBe(216);
  await expect(draft).toHaveValue('Review07 保留当前文档草稿。');
  const avatar=root.locator('.nv44-avatar');
  expect((await box(avatar)).width).toBe(32);expect((await box(avatar)).height).toBe(32);
  expect(await avatar.locator('.rain-avatar__picture').evaluate(e=>getComputedStyle(e).visibility)).toBe('visible');
  await expect(avatar.locator('img')).toBeVisible();
  await root.screenshot({path:`${out}/after/S5-default-${width}.png`});
  await region(root,'global').getByRole('button',{name:'展开平台导航',exact:true}).click();
  expect((await box(avatar)).width).toBe(32);expect((await box(avatar)).height).toBe(32);
  await root.screenshot({path:`${out}/after/S5-expanded-${width}.png`});
  const facts={contextWidth:(await box(region(root,'context'))).width,avatar:await box(avatar),globalMode:await region(root,'global').getAttribute('data-mode')};
  await page.close();return facts;
});

await check('R4 filtered group summary, empty result and restored selection',async()=>{
  const {page,root}=await open('R4',1440,'interaction');
  await root.getByRole('radio',{name:'未评分',exact:true}).locator('..').click();
  await expect(root.locator('.nv5-queue-footer')).toContainText('展示 2 / 6 组');
  await root.getByRole('textbox',{name:'搜索小组'}).fill('知行');
  await expect(root.locator('.nv5-queue-footer')).toContainText('展示 1 / 6 组');
  await root.getByRole('textbox',{name:'搜索小组'}).fill('无此小组');
  await expect(root.locator('.nv5-queue-footer')).toContainText('展示 0 / 6 组');
  await expect(root.getByRole('group',{name:'小组结果'})).toContainText('暂无可用对象');
  await root.getByRole('textbox',{name:'搜索小组'}).fill('');
  await root.getByRole('group',{name:'小组结果'}).getByRole('button',{name:'知行合一',exact:true}).click();
  await expect(root.getByRole('heading',{name:'知行合一',exact:true})).toBeVisible();
  await root.screenshot({path:`${out}/after/R4-filtered-ungraded-1440.png`});
  await region(root,'queue').getByRole('button',{name:'取消固定小组列表'}).click();
  await expect(region(root,'queue')).toHaveAttribute('data-temporary','true');await page.keyboard.press('Escape');
  await expect(region(root,'queue')).toBeHidden();await restore(root,'queue').click();
  await expect(root.getByRole('group',{name:'小组结果'}).getByRole('button',{name:'知行合一',exact:true})).toHaveAttribute('aria-pressed','true');
  await page.close();return {filterSummary:'2 / 6; 1 / 6; 0 / 6',selectedGroupRetained:true};
});

await check('R4 grading paper and question drafts survive focus and layout recovery',async()=>{
  const {page,root}=await open('R4',1440,'grading');
  const note=root.getByRole('textbox',{name:'给当前作答的反馈'});
  await note.fill('Review07 仅属于 A 卷第一题李梦。');
  await root.getByRole('spinbutton',{name:'当前作答得分'}).fill('9');
  await root.getByRole('radio',{name:'B 卷',exact:true}).locator('..').click();await expect(note).toHaveValue('');
  await root.getByRole('radio',{name:'A 卷',exact:true}).locator('..').click();await expect(note).toHaveValue('Review07 仅属于 A 卷第一题李梦。');
  await root.getByRole('group',{name:'批改题目'}).getByRole('button',{name:'第二题 · 案例分析',exact:true}).click();await expect(note).toHaveValue('');
  await root.getByRole('group',{name:'批改题目'}).getByRole('button',{name:'第一题 · 概念辨析',exact:true}).click();
  await region(root,'review').getByRole('button',{name:'隐藏批改面板'}).click();await restore(root,'review').click();
  await expect(note).toHaveValue('Review07 仅属于 A 卷第一题李梦。');
  await root.getByRole('button',{name:'专注作答预览',exact:true}).click();await root.getByRole('button',{name:'退出专注',exact:true}).click();
  await expect(root.getByRole('spinbutton',{name:'当前作答得分'})).toHaveValue('9');
  await root.screenshot({path:`${out}/after/R4-grading-restored-1440.png`});await page.close();return {paperDraftsIsolated:true,questionDraftsIsolated:true,layoutPreservedDraft:true};
});

await check('R5 real mock playback, follow, filters, seek, transcript and recovery',async()=>{
  const {page,root}=await open('R5',1440);
  await root.getByRole('checkbox',{name:'跟随播放定位'}).locator('..').click();
  await expect(root.getByRole('checkbox',{name:'跟随播放定位'})).toBeChecked();
  await root.getByRole('group',{name:'课堂回顾事件'}).getByRole('button',{name:'随堂练习 · 等效电路',exact:true}).click();
  await expect(root.getByRole('slider',{name:'模拟播放位置'})).toHaveValue('984');
  await root.getByRole('button',{name:'播放回放',exact:true}).click();
  await expect.poll(async()=>Number(await root.getByRole('slider',{name:'模拟播放位置'}).inputValue())).toBeGreaterThan(984);
  await root.getByRole('button',{name:'暂停回放',exact:true}).click();
  const paused=await root.getByRole('slider',{name:'模拟播放位置'}).inputValue();await page.waitForTimeout(1100);await expect(root.getByRole('slider',{name:'模拟播放位置'})).toHaveValue(paused);
  await root.getByRole('radio',{name:'习题',exact:true}).locator('..').click();
  await expect(root.getByRole('group',{name:'课堂回顾事件'}).getByRole('button')).toHaveCount(1);
  await root.getByRole('tab',{name:'讲稿',exact:true}).click();await expect(root.locator('.nv5-transcript')).toContainText('画出端口');
  await region(root,'knowledge').getByRole('button',{name:'隐藏知识索引'}).click();await restore(root,'knowledge').click();
  await expect(root.getByRole('slider',{name:'模拟播放位置'})).toHaveValue(paused);
  await root.screenshot({path:`${out}/after/R5-seek-transcript-restored-1440.png`});await page.close();return {seek:984,paused:Number(paused),follow:true,filteredCount:1};
});

await check('R6 all views, pages, editable fields and preview preserve local drafts',async()=>{
  const {page,root}=await open('R6',1440);
  const draft=root.getByRole('textbox',{name:'你希望我们改进的地方'});await draft.fill('Review07 增加课堂练习。');
  await root.getByRole('button',{name:'新增文本题',exact:true}).click();await root.getByRole('textbox',{name:'新增文本题 1'}).fill('本实例追加文本。');
  for(const label of ['表格','状态分组','画册','反馈表单']) {await root.getByRole('tab',{name:label,exact:true}).click();await root.screenshot({path:`${out}/after/R6-view-${label}-1440.png`});}
  await expect(draft).toHaveValue('Review07 增加课堂练习。');await expect(root.getByRole('textbox',{name:'新增文本题 1'})).toHaveValue('本实例追加文本。');
  await root.getByRole('radio',{name:'填写预览',exact:true}).locator('..').click();await expect(region(root,'fields')).toHaveCount(0);await expect(draft).toHaveValue('Review07 增加课堂练习。');
  await root.getByRole('radio',{name:'编辑表单',exact:true}).locator('..').click();
  await root.getByRole('navigation',{name:'工作区页面'}).getByRole('link',{name:'课程任务',exact:true}).click();
  await expect(root.getByRole('table',{name:'课程任务记录'})).toBeVisible();await root.getByRole('button',{name:'+ 添加记录',exact:true}).click();await expect(root.getByRole('table',{name:'课程任务记录'})).toContainText('新增记录 1');
  await root.getByRole('navigation',{name:'工作区页面'}).getByRole('link',{name:'学习反馈',exact:true}).click();await expect(draft).toHaveValue('Review07 增加课堂练习。');
  await page.close();return {views:4,formDraftRetained:true,extrasRetained:true,recordAdded:true};
});

for(const sample of ['S1','S2','S3','S4','S5','S6']) await check(`${sample} layout, temporary restore, default reset and focus`,async()=>{
  const {page,root}=await open(sample,1600);
  const panes=await root.locator('.rain-workspace__region').evaluateAll(elements=>elements.map(e=>({id:e.getAttribute('data-region-id'),mode:e.getAttribute('data-mode')})));
  const target=panes.find(item=>item.id!=='global'&&item.id!=='ribbon'&&item.mode==='expanded');
  if(target) {
    await root.getByRole('button',{name:'布局设置',exact:true}).click();
    const dialog=page.getByRole('dialog');await dialog.getByRole('button',{name:'隐藏全部区域',exact:true}).click();await page.keyboard.press('Escape');
    await restore(root,target.id).click();await expect(region(root,target.id)).toHaveAttribute('data-temporary','true');await page.keyboard.press('Escape');await expect(region(root,target.id)).toBeHidden();
  }
  await root.getByRole('button',{name:'布局设置',exact:true}).click();await page.getByRole('button',{name:'恢复默认',exact:true}).click();await page.keyboard.press('Escape');
  await root.getByRole('button',{name:'专注内容',exact:true}).click();await expect(root).toHaveAttribute('data-focused','true');await page.keyboard.press('Escape');await expect(root).toHaveAttribute('data-focused','false');
  await root.screenshot({path:`${out}/after/${sample}-layout-restored-1600.png`});await page.close();return {regions:panes.map(item=>item.id),temporary:target?.id??null,focusRestored:true};
});

await browser.close();
const afterHash = await hashSources();
const summary = {recordedAt:new Date().toISOString(),checks,passed:checks.filter(item=>item.status==='passed').length,failed:checks.filter(item=>item.status==='failed').length,pageErrors:errors,sourceBefore:beforeHash,sourceAfter:afterHash,sourceStable:JSON.stringify(beforeHash)===JSON.stringify(afterHash),notVerified:['VoiceOver','contrast certification','cross-browser','real service/PDF/video integration','Human G2 approval']};
await fs.writeFile(`${out}/owner-browser-results.json`,JSON.stringify(summary,null,2));
console.log(JSON.stringify(summary,null,2));
if(summary.failed||errors.length) process.exitCode=1;
