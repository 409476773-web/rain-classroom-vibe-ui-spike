# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w6.spec.ts >> E6 unseen review identity, two-side recovery and explicit local save at 1600
- Location: tests/e2e/navigation-v042-w6.spec.ts:12:37

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:5198/navigation-v042-w6-consumer.html#E6
Call log:
  - navigating to "http://127.0.0.1:5198/navigation-v042-w6-consumer.html#E6", waiting until "load"

```

# Test source

```ts
  1  | import {test,expect,type Page} from '@playwright/test';
> 2  | async function open(page:Page,id:string){await page.goto(`/navigation-v042-w6-consumer.html#${id}`);const root=page.locator(`[data-scene="${id}"]`);await expect(root).toBeVisible();return root;}
     |                                                     ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:5198/navigation-v042-w6-consumer.html#E6
  3  | for(const width of [1200,1440,1600])test(`E1 source selection, all-class search and missing-current draft at ${width}`,async({page})=>{
  4  |  await page.setViewportSize({width,height:1100});const root=await open(page,'E1');const draft=root.getByRole('textbox',{name:'资源说明草稿'});await draft.fill('公共资源的独立草稿');
  5  |  await root.getByRole('button',{name:'更多班级',exact:true}).click();await page.getByRole('textbox',{name:'搜索范围'}).fill('237');await page.getByRole('button',{name:/跨学科项目课程.*237班/}).click();await expect(root.getByRole('heading',{name:/237班资源/})).toBeVisible();await draft.fill('237班独立草稿');await root.getByRole('tab',{name:'公共资源包',exact:true}).click();await expect(draft).toHaveValue('公共资源的独立草稿');
  6  |  await root.getByRole('button',{name:'更多班级',exact:true}).click();await page.getByRole('textbox',{name:'搜索范围'}).fill('237');await page.getByRole('button',{name:/跨学科项目课程.*237班/}).click();await root.getByRole('button',{name:'移除当前班级',exact:true}).click();await expect(root.getByText('当前范围已不可用，请重新选择。')).toBeVisible();await expect(root.getByRole('tab',{name:'公共资源包',exact:true})).toHaveAttribute('aria-selected','false');await root.getByRole('button',{name:'恢复刚移除的班级',exact:true}).click();await expect(draft).toHaveValue('237班独立草稿');await root.screenshot({path:test.info().outputPath(`E1-${width}.png`)});
  7  | });
  8  | test('E2 activity and group details remain one stable identity',async({page})=>{const root=await open(page,'E2');await root.getByRole('button',{name:'证据分析讨论',exact:true}).click();await root.getByRole('button',{name:'第二研究组',exact:true}).click();await expect(root.getByRole('heading',{name:'第二研究组 · 证据分析讨论'})).toBeVisible();await root.getByRole('button',{name:'方案投票',exact:true}).click();await expect(root.getByRole('heading',{name:'第一研究组 · 方案投票'})).toBeVisible();await expect(root.getByTestId('interaction-identity')).toHaveAttribute('data-group-id','vote-g1');});
  9  | test('E3 score stays visible while keyed draft survives display and mode without implicit save',async({page})=>{const root=await open(page,'E3');await expect(root.getByRole('complementary',{name:'评分区'})).toBeVisible();await root.getByRole('button',{name:'显示批改队列',exact:true}).click();await root.getByRole('group',{name:'当前批改对象',exact:true}).getByRole('button',{name:'陈安',exact:true}).click();await root.getByRole('tablist',{name:'当前题目选择',exact:true}).getByRole('tab',{name:'第2题',exact:true}).click();const draft=root.getByRole('textbox',{name:'评分评语'});await draft.fill('请补充实验依据');await root.getByRole('spinbutton',{name:'本题分数'}).fill('17');if(!await root.locator('.rain-workspace__region[data-region-id="grading-queue"]').isVisible())await root.getByRole('button',{name:'显示批改队列',exact:true}).click();await root.getByText('按题',{exact:true}).click();await expect(root.getByRole('radio',{name:'按题',exact:true})).toBeChecked();await root.getByText('卡片队列',{exact:true}).click();await expect(root.getByRole('radio',{name:'卡片队列',exact:true})).toBeChecked();await root.getByRole('button',{name:'隐藏批改队列',exact:true}).click();await root.getByRole('button',{name:'进入专注',exact:true}).click();await expect(root.getByRole('complementary',{name:'评分区'})).toBeVisible();await root.getByRole('button',{name:'退出专注',exact:true}).click();await expect(draft).toHaveValue('请补充实验依据');await expect(root.getByTestId('grading-identity')).toHaveAttribute('data-student-id','chen-an');await expect(root.getByTestId('grading-identity')).toHaveAttribute('data-question-id','q2');await expect(root.getByText('尚未保存到本地')).toBeVisible();});
  10 | test('E4 nonmodal temporary knowledge preserves geometry, playback and exact focus exit',async({page})=>{const root=await open(page,'E4');const main=root.locator('.w6-replay-main');const before=await main.boundingBox();await root.getByRole('button',{name:'临时查看知识索引',exact:true}).click();await expect(root.locator('.rain-workspace__region[data-region-id="knowledge-index"]')).toHaveAttribute('data-temporary','true');expect(await main.boundingBox()).toEqual(before);await root.getByRole('button',{name:'控制变量 · 02:10',exact:true}).click();await expect(root.getByTestId('playback-time')).toHaveText('02:10');await page.keyboard.press('Escape');await expect(root.getByRole('button',{name:'临时查看知识索引',exact:true})).toBeFocused();await root.getByRole('button',{name:'进入专注',exact:true}).click();await root.getByRole('button',{name:'退出专注',exact:true}).click();await expect(root.getByTestId('playback-time')).toHaveText('02:10');await expect(root.getByRole('button',{name:'讲稿 02:10',exact:true})).toHaveAttribute('aria-pressed','true');});
  11 | test('E5 instance-local density leaves B selection, draft and computed geometry unchanged',async({page})=>{const root=await open(page,'E5');const b=root.getByRole('region',{name:'实例 B',exact:true});await b.getByRole('button',{name:'实验方法',exact:true}).click();await b.getByRole('textbox',{name:'实例 B 草稿'}).fill('B保留的审阅说明');const facts=()=>b.evaluate(e=>({html:e.innerHTML,rect:{width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height},styles:[...e.querySelectorAll('.rain-navigation-family__row')].map(n=>({height:getComputedStyle(n).height,padding:getComputedStyle(n).padding,font:getComputedStyle(n).fontSize}))}));const before=await facts();await root.getByRole('button',{name:'仅当前实例 A 使用紧凑目录',exact:true}).click();await expect(root.getByRole('region',{name:'实例 A',exact:true})).toHaveAttribute('data-directory-density','compact');expect(await facts()).toEqual(before);await expect(b.getByRole('textbox',{name:'实例 B 草稿'})).toHaveValue('B保留的审阅说明');});
  12 | for(const width of [1200,1440,1600])test(`E6 unseen review identity, two-side recovery and explicit local save at ${width}`,async({page})=>{await page.setViewportSize({width,height:1100});const root=await open(page,'E6');const work=root.locator('[data-ai-task="E6"]');const draft=work.getByRole('textbox',{name:/审核意见|评审意见/});await draft.fill('第一份资料未保存的意见');await work.getByRole('button',{name:'隐藏资源队列',exact:true}).click();await work.getByRole('button',{name:'隐藏评审面板',exact:true}).click();await work.getByRole('button',{name:'显示资源队列',exact:true}).click();await work.getByRole('button',{name:'显示评审面板',exact:true}).click();await expect(draft).toHaveValue('第一份资料未保存的意见');await expect(work.getByText('未保存',{exact:true})).toBeVisible();await work.getByRole('button',{name:'保存本地评审',exact:true}).click();await expect(work.getByRole('status',{name:'本地保存状态'})).toHaveText('本页已保存');const list=work.getByRole('group',{name:'待评审学术资源'});await list.getByRole('button',{name:'城市微气候观测数据的跨尺度校验、缺测处理与可复现分析流程说明',exact:true}).click();await expect(draft).toHaveValue('');await list.getByRole('button',{name:'数字人文研究中的多模态史料整理、版本校勘与长期开放获取方案（修订稿）',exact:true}).click();await expect(draft).toHaveValue('第一份资料未保存的意见');await expect(work.getByRole('tab')).toHaveCount(0);await root.screenshot({path:test.info().outputPath(`E6-${width}.png`)});expect(await page.evaluate(()=>['YKT_DEBUG','YKT_VISIBILITY','vApply'].filter(k=>k in window))).toEqual([]);});
  13 | 
  14 | test('public controls render compiled Rain styles in independent consumer', async ({page}) => {
  15 |  const root=await open(page,'E3');
  16 |  const button=root.getByRole('button',{name:'保存本地草稿',exact:true});
  17 |  const facts=await button.evaluate(e=>({background:getComputedStyle(e).backgroundColor,height:e.getBoundingClientRect().height,borderRadius:getComputedStyle(e).borderRadius}));
  18 |  expect(facts.background).toBe('rgb(21, 97, 248)');
  19 |  expect(facts.height).toBe(36);
  20 |  expect(parseFloat(facts.borderRadius)).toBeGreaterThan(0);
  21 |  expect((await root.getByRole('textbox',{name:'评分评语'}).boundingBox())!.width).toBeGreaterThan(220);
  22 | });
  23 | 
  24 | test('consumer deactivation clears temporary workspace and focus sessions while preserving business drafts', async ({page}) => {
  25 |  const root=await open(page,'E4');
  26 |  await root.getByRole('button',{name:'讲稿 02:10',exact:true}).click();
  27 |  await root.getByRole('button',{name:'临时查看知识索引',exact:true}).click();
  28 |  await expect(root.locator('[data-region-id="knowledge-index"].rain-workspace__region')).toHaveAttribute('data-temporary','true');
  29 |  await page.evaluate(()=>{window.location.hash='E1';});
  30 |  await expect(root).toBeHidden();
  31 |  await expect(root.locator('[data-region-id="knowledge-index"].rain-workspace__region')).toHaveAttribute('data-temporary','false');
  32 |  await page.getByRole('link',{name:'课程资源',exact:true}).focus();
  33 |  await page.keyboard.press('Escape');
  34 |  await expect(page.getByRole('link',{name:'课程资源',exact:true})).toBeFocused();
  35 |  await page.evaluate(()=>{window.location.hash='E4';});
  36 |  await expect(root.getByTestId('playback-time')).toHaveText('02:10');
  37 |  await root.getByRole('button',{name:'进入专注',exact:true}).click();
  38 |  await page.evaluate(()=>{window.location.hash='E1';});
  39 |  await expect(root.locator('.rain-workspace')).toHaveAttribute('data-focused','false');
  40 | });
  41 | test('consumer deactivation closes portaled scope search and retains host draft', async ({page}) => {
  42 |  const root=await open(page,'E1');
  43 |  await root.getByRole('textbox',{name:'资源说明草稿'}).fill('跨页面保留的说明');
  44 |  await root.getByRole('button',{name:'更多班级',exact:true}).click();
  45 |  await expect(page.getByRole('textbox',{name:'搜索范围'})).toBeVisible();
  46 |  await page.evaluate(()=>{window.location.hash='E2';});
  47 |  await expect(page.getByRole('textbox',{name:'搜索范围'})).toHaveCount(0);
  48 |  await page.evaluate(()=>{window.location.hash='E1';});
  49 |  await expect(root.getByRole('textbox',{name:'资源说明草稿'})).toHaveValue('跨页面保留的说明');
  50 | });
  51 | 
```