import { expect, test } from "@playwright/test";

test("real recipes retain failed inputs, save zero by identity and remain readable at 1440/390", async ({ page }, info) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/#compositions');
  const filter = page.getByRole('region', { name: '资源筛选组合' });
  const form = page.getByRole('form', { name: '分区作业设置' });
  const grading = page.getByRole('region', { name: '连续批改操作组合' });
  await page.getByRole('button', { name: '模拟请求失败：关' }).click();
  await filter.getByRole('textbox').fill('案例');
  await filter.getByRole('button', { name: '查询', exact: true }).click();
  await expect(filter.getByRole('textbox')).toBeDisabled();
  await expect(filter.getByRole('alert')).toContainText('查询失败');
  await expect(filter.getByRole('status')).toContainText('3 项');
  await expect(filter.getByRole('textbox')).toHaveValue('案例');
  await form.getByRole('combobox', { name: '所属课程' }).click();
  await page.getByRole('option', { name: '人工智能导论', exact: true }).click();
  await form.getByRole('spinbutton').fill('200');
  const longTitle = '课程案例分析与跨学科证据比较：从课堂观察到作业反馈的完整说明20261018';
  await form.getByRole('textbox', { name: '作业名称' }).fill(longTitle);
  await form.getByRole('button', { name: '保存设置' }).click();
  await expect(form.getByRole('spinbutton')).toBeDisabled();
  await expect(form.getByRole('alert')).toContainText('保存失败');
  await expect(form.getByRole('textbox', { name: '作业名称' })).toHaveValue(longTitle);
  await grading.getByRole('spinbutton').fill('0');
  await grading.getByRole('textbox').fill('当前评分为0分。请补充比较依据；这段长中文评语完整保留，并与学生及题目身份关联。');
  await grading.getByRole('button', { name: '保存并继续' }).click();
  await expect(grading.getByRole('button', { name: '下一份', exact: true })).toBeDisabled();
  await expect(grading.getByRole('alert')).toContainText('学生甲保存失败');
  await expect(grading.getByRole('spinbutton')).toHaveValue('0');
  await grading.screenshot({ path: info.outputPath('grading-failed-desktop.png') });
  await page.getByRole('button', { name: '模拟请求失败：开' }).click();
  await grading.getByRole('button', { name: '保存并继续' }).click();
  await expect(grading.getByRole('heading')).toContainText('学生乙');
  await grading.getByRole('button', { name: '上一份', exact: true }).click();
  await expect(grading.getByRole('spinbutton')).toHaveValue('0');
  await expect(grading.getByRole('textbox')).toHaveValue(/当前评分为0分/);
  await page.getByRole('button', { name: '禁用操作：关' }).click();
  await expect(form.getByRole('button', { name: '保存设置' })).toBeDisabled();
  await expect(filter.getByRole('button', { name: '查询', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: '禁用操作：开' }).click();
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
    await filter.screenshot({ path: info.outputPath(`filter-${width}.png`) });
    await form.screenshot({ path: info.outputPath(`form-${width}.png`) });
    await grading.screenshot({ path: info.outputPath(`grading-${width}.png`) });
  }
  // CSS zoom is a bounded reflow probe; this is not native browser zoom acceptance.
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => { document.body.style.zoom = '2'; });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(1441);
  await grading.screenshot({ path: info.outputPath('grading-css-zoom-200.png') });
  expect((await page.pageErrors()).map(error => error.message)).toEqual([]);
});
