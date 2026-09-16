import { chromium, firefox, webkit, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { mkdirSync, writeFileSync } from 'node:fs';
const base = process.env.LIST_BASE_URL || 'http://127.0.0.1:5345';
const output = fileURLToPath(new URL('./', import.meta.url));
const results = [];
for (const [name, engine] of Object.entries({ chromium, firefox, webkit })) {
  const browser = await engine.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  page.setDefaultTimeout(8000);
  const errors = []; page.on('pageerror', error => errors.push(String(error)));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const directory = `${output}${name}`; mkdirSync(directory, { recursive: true });
  const checks = [];
  const check = async (label, run) => { await run(); checks.push(label); };
  try {
    await page.goto(`${base}/#list-composition`); await expect(page.getByRole('heading', { name: '课程资料库' })).toBeVisible();
    await page.screenshot({ path: `${directory}/calibration.png`, fullPage: true });
    await check('selection survives paging and batch excludes read-only rows', async () => {
      await expect(page.getByRole('checkbox', { name: '选择 课堂观察记录' })).toBeDisabled();
      await page.getByRole('checkbox', { name: '选择 教学案例研读' }).locator('..').click();
      await page.getByRole('button', { name: '第 2 页', exact: true }).click();
      await page.getByRole('checkbox', { name: '选择 课堂活动设计' }).locator('..').click();
      await expect(page.locator('[data-slot="selected-count"]')).toContainText('已选 2 份');
      await page.getByRole('button', { name: '标为已发布', exact: true }).click();
      await expect(page.getByRole('row', { name: /教学案例研读/ })).toContainText('已发布');
      await expect(page.getByRole('row', { name: /课堂观察记录/ })).toContainText('草稿');
    });
    await check('failed refresh retains selection, retries and locks mutation while loading', async () => {
      await page.getByRole('checkbox', { name: '选择 课程阅读清单' }).locator('..').click();
      await page.locator('summary').click();
      await page.getByRole('checkbox', { name: '下次刷新模拟失败' }).locator('..').click();
      await page.getByRole('button', { name: '刷新资料', exact: true }).click();
      await expect(page.getByRole('button', { name: '标为已发布' })).toBeDisabled();
      await expect(page.getByRole('alert')).toContainText('刷新失败');
      await expect(page.getByRole('checkbox', { name: '选择 课程阅读清单' })).toBeChecked();
      await page.screenshot({path:`${directory}/failure.png`, fullPage:true});
      await page.getByRole('button', { name: '重试', exact: true }).click();
      await expect(page.getByRole('alert')).toHaveCount(0);
      await expect(page.getByRole('checkbox', { name: '选择 课程阅读清单' })).toBeChecked();
      await page.locator('summary').click();
    });
    await check('view switches preserve selection; hidden columns retain identity', async () => {
      await page.getByRole('button', { name: '卡片视图' }).click();
      await expect(page.getByRole('checkbox', { name: '选择 课程阅读清单' })).toBeChecked();
      await page.screenshot({path:`${directory}/cards.png`, fullPage:true});
      await page.getByRole('button', { name: '表格视图' }).click();
      await page.getByRole('button', { name: '显示列', exact: true }).click();
      await page.getByRole('menuitemcheckbox', { name: '资料类型', exact: true }).click();
      await page.keyboard.press('Escape');
      await expect(page.locator('th[data-column-id="kind"]')).toHaveCount(0);
      assert((await page.locator('th[data-column-id="name"]').boundingBox()).width > 300);
    });
    await page.goto(`${base}/?sample=cases#list-composition`);
    await check('committed search combines with type filter and resets selection', async () => {
      await page.getByRole('checkbox', { name: '选择 项目式学习中的小组分工与过程评价' }).locator('..').click();
      await page.getByRole('textbox', { name: '查找资料' }).fill('课堂');
      await expect(page.locator('[data-slot="result-count"]')).toHaveText('共 12 份资料');
      await page.getByRole('textbox', { name: '查找资料' }).press('Enter');
      await expect(page.getByRole('button', { name: '标为已发布' })).toHaveCount(0);
      await page.getByRole('combobox', { name: '资料类型' }).click();
      await page.getByRole('option', { name: '教学设计', exact: true }).click();
      await expect(page.locator('[data-slot="result-count"]')).toHaveText('找到 2 份资料');
      await page.getByRole('button', { name: '清空筛选', exact: true }).click();
      await expect(page.locator('[data-slot="result-count"]')).toHaveText('共 12 份资料');
    });
    await check('no results recovery and explicit local detail with focus return', async () => {
      await page.getByRole('textbox', { name: '查找资料' }).fill('不存在的记录');
      await page.getByRole('button', { name: '搜索', exact: true }).click();
      await expect(page.getByRole('heading', { name: '没有找到相关资料' })).toBeVisible();
      await page.screenshot({path:`${directory}/empty.png`, fullPage:true});
      await page.getByRole('button', { name: '清空筛选条件', exact: true }).click();
      const title=page.getByRole('button', { name:'同伴互评怎样给出具体反馈', exact:true });
      await title.click(); await expect(page.getByRole('dialog')).toBeVisible();
      await expect(page.getByRole('dialog')).toContainText('学术写作');
      await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).toHaveCount(0);
      await expect(title).toBeFocused();
    });
    await page.reload(); await expect(page.getByRole('heading', { name: '教学案例资料库' })).toBeVisible();
    await page.screenshot({path:`${directory}/transfer.png`, fullPage:true});
    await check('narrow view keeps controls readable and scroll confined to table', async () => {
      await page.setViewportSize({width:390,height:844});
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),390);
      const region=page.getByRole('region', { name:'课程资料表滚动区' });
      await region.focus(); await page.keyboard.press('ArrowRight');
      assert(await region.evaluate(node=>node.scrollLeft)>0);
      await region.evaluate(node=>node.scrollLeft=0);
      await page.screenshot({path:`${directory}/narrow.png`,fullPage:true});
      await page.getByRole('button',{name:'卡片视图'}).click();
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),390);
      await page.screenshot({path:`${directory}/narrow-cards.png`,fullPage:true});
    });
    await page.setViewportSize({width:1400,height:900}); await page.getByRole('button',{name:'表格视图'}).click();
    const typography=await page.locator('.lc-heading h1, .lc-grid th, .lc-name, .lc-secondary').evaluateAll(nodes=>nodes.filter(n=>n.getBoundingClientRect().width).map(n=>{const c=getComputedStyle(n);return {text:n.textContent.slice(0,60),size:c.fontSize,lineHeight:c.lineHeight,weight:c.fontWeight,color:c.color,font:c.fontFamily};}));
    writeFileSync(`${directory}/typography.json`, JSON.stringify(typography,null,2)+'\n');
    assert.deepEqual(errors,[]); checks.push('no browser console/runtime errors');
    results.push({browser:name,passed:true,checks}); console.log(name, checks.length, 'checks passed');
  } catch(error) {
    results.push({browser:name,passed:false,checks,error:String(error),errors});
    await page.screenshot({path:`${directory}/unexpected.png`,fullPage:true});
    throw error;
  } finally { writeFileSync(`${output}browser-results.json`,JSON.stringify(results,null,2)+'\n'); await browser.close(); }
}
