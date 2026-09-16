import { expect, test } from "@playwright/test";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

let errors: string[];
test.beforeEach(async ({ page }) => { errors = []; page.on("pageerror", error => errors.push(error.message)); page.on("console", message => { if (message.type() === "error") errors.push(message.text()); }); });
test.afterEach(() => expect(errors).toEqual([]));
const evidence = process.env.RAIN_M2_EVIDENCE ?? mkdtempSync(join(tmpdir(), "rain-m2-full-suite-"));
const directory = (project: string) => { const path = join(evidence, project); mkdirSync(path, { recursive: true }); return path; };

test("BM-C keeps paper, traversal, group position and unsaved drafts", async ({ page }, info) => {
  await page.setViewportSize({ width: 1433, height: 760 });
  await page.goto("/#bm-c");
  await page.screenshot({ path: join(directory(info.project.name), "bm-c-1433.png"), fullPage: true });
  const score = page.getByRole("textbox", { name: "本题得分", exact: true });
  await score.fill("8.5");
  await page.getByRole("textbox", { name: "评语", exact: true }).fill("补充适用条件");
  await page.getByRole("button", { name: "下一位", exact: true }).click();
  await expect(score).toHaveValue("");
  await page.getByRole("button", { name: "上一位", exact: true }).click();
  await expect(score).toHaveValue("8.5");
  const byQuestion = page.getByRole("tab", { name: "按题批改", exact: true });
  await byQuestion.focus(); await byQuestion.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "按人批改", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("tabpanel", { name: "按人批改", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "示例学生 01 · 第 1 题", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "下一题", exact: true }).click();
  await page.getByRole("button", { name: "下一题", exact: true }).click();
  await expect(page.getByRole("button", { name: "下一题", exact: true })).toBeDisabled();
  await page.getByRole("radio", { name: "B 卷", exact: true }).click(); await expect(score).toHaveValue("");
  await page.getByRole("radio", { name: "A 卷", exact: true }).click(); await expect(score).toHaveValue("8.5");
  await expect(page.getByRole("textbox", { name: "评语", exact: true })).toHaveValue("补充适用条件");
});

test("BM-C failure stays on the same answer; zero saves and only success advances", async ({ page }) => {
  await page.goto("/#bm-c");
  const score = page.getByRole("textbox", { name: "本题得分", exact: true });
  await score.fill("10.5"); await page.getByRole("button", { name: "保存并下一位", exact: true }).click(); await expect(score).toBeFocused(); await expect(score).toHaveAttribute("aria-invalid", "true");
  await score.fill("0"); await page.getByText("演示设置", { exact: true }).click(); await page.getByText("下次保存失败", { exact: true }).click();
  await page.getByRole("button", { name: "保存并下一位", exact: true }).click();
  await expect(page.getByRole("radio", { name: "B 卷", exact: true })).toBeDisabled();
  await expect(page.getByRole("alert")).toBeFocused(); await expect(score).toHaveValue("0");
  await expect(page.getByRole("heading", { name: "示例学生 01 · 第 1 题", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "重试并下一位", exact: true }).click();
  await expect(page.getByRole("heading", { name: "示例学生 02 · 第 1 题", exact: true })).toBeFocused();
  await page.getByRole("button", { name: "上一位", exact: true }).click(); await expect(score).toHaveValue("0");
  await expect(page.getByRole("button", { name: "选择 示例学生 01 第 1 题", exact: true })).toContainText("0 分");
});

test("BM-C contains pane scrolling, restores collapse focus and survives narrow reflow", async ({ page }, info) => {
  await page.setViewportSize({ width: 1280, height: 720 }); await page.goto("/#bm-c");
  const score = page.getByRole("textbox", { name: "本题得分", exact: true }), comment = page.getByRole("textbox", { name: "评语", exact: true });
  await score.fill("8"); await comment.fill("这是一条保留在作答对象中的草稿。".repeat(30));
  await page.getByRole("region", { name: "评分面板", exact: true }).getByRole("button", { name: "收起评分", exact: true }).click();
  await expect(page.getByRole("button", { name: "展开评分", exact: true })).toBeFocused();
  await page.getByText("加宽评分区", { exact: true }).click(); await page.getByRole("button", { name: "展开评分", exact: true }).click(); await expect(score).toHaveValue("8");
  await page.getByRole("region", { name: "批改目录", exact: true }).getByRole("button", { name: "收起目录", exact: true }).click();
  await expect(page.getByRole("button", { name: "展开目录", exact: true })).toBeFocused(); await page.getByRole("button", { name: "展开目录", exact: true }).click();
  const facts = await page.evaluate(() => {
    const answer = document.querySelector<HTMLElement>(".bm-c-answer")!, nav = document.querySelector<HTMLElement>(".bm-c-context nav")!, footer = document.querySelector<HTMLElement>(".bm-c-grade-footer")!;
    return { viewport: innerHeight, document: document.documentElement.scrollHeight, navHeight: nav.clientHeight, navScroll: nav.scrollHeight, navOverflow: getComputedStyle(nav).overflowY, answerOverflow: getComputedStyle(answer).overflowY, footerBottom: footer.getBoundingClientRect().bottom, overflow: document.documentElement.scrollWidth - innerWidth };
  });
  expect(facts.document).toBeLessThanOrEqual(facts.viewport + 1); expect(facts.navOverflow).toBe("auto"); expect(facts.answerOverflow).toBe("auto"); expect(facts.footerBottom).toBeLessThanOrEqual(facts.viewport); expect(facts.overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: join(directory(info.project.name), "bm-c-desktop.png"), fullPage: true });
  await page.setViewportSize({ width: 1152, height: 720 });
  const answerPane = page.getByRole("region", { name: "当前作答", exact: true });
  await answerPane.evaluate(element => { element.scrollTop = element.scrollHeight; });
  expect(await answerPane.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
  await page.getByRole("button", { name: "下一位", exact: true }).click();
  const nextHeading = page.getByRole("heading", { name: "示例学生 02 · 第 1 题", exact: true });
  await expect(nextHeading).toBeFocused();
  const navigation = await nextHeading.evaluate(heading => ({ headingTop: heading.getBoundingClientRect().top, paneTop: heading.closest(".bm-c-answer")!.getBoundingClientRect().top }));
  expect(navigation.headingTop).toBeGreaterThanOrEqual(navigation.paneTop);
  await page.getByRole("button", { name: "上一位", exact: true }).click(); await expect(score).toHaveValue("8");
  await page.setViewportSize({ width: 390, height: 844 }); await expect(score).toHaveValue("8");
  await page.getByText("演示设置", { exact: true }).click(); await page.getByRole("button", { name: "切换深色", exact: true }).click();
  await expect(comment).toHaveValue("这是一条保留在作答对象中的草稿。".repeat(30));
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  const narrow = await page.evaluate(() => {
    const rect = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
    const body = document.querySelector<HTMLElement>(".bm-c-grade-body")!;
    return { directoryBottom: rect(".bm-c-context").bottom, navBottom: rect(".bm-c-context nav").bottom, rootBottom: rect(".bm-c").bottom, workspaceBottom: rect(".bm-c-workspace").bottom, inspectorBottom: rect(".bm-c-inspector").bottom, bodyBottom: rect(".bm-c-grade-body").bottom, bodyHeight: body.clientHeight, bodyScrollHeight: body.scrollHeight, footerTop: rect(".bm-c-grade-footer").top, footerBottom: rect(".bm-c-grade-footer").bottom, footnoteTop: rect(".bm-c-footnote").top, footnoteBottom: rect(".bm-c-footnote").bottom };
  });
  expect(narrow.navBottom).toBeLessThanOrEqual(narrow.directoryBottom);
  expect(narrow.bodyScrollHeight).toBeLessThanOrEqual(narrow.bodyHeight + 1);
  expect(narrow.bodyBottom).toBeLessThanOrEqual(narrow.footerTop + 1);
  expect(narrow.footerBottom).toBeLessThanOrEqual(narrow.inspectorBottom + 1);
  expect(narrow.inspectorBottom).toBeLessThanOrEqual(narrow.rootBottom);
  expect(narrow.footnoteBottom).toBeLessThanOrEqual(narrow.rootBottom);
  expect(narrow.workspaceBottom).toBeLessThanOrEqual(narrow.footnoteTop);
  await page.screenshot({ path: join(directory(info.project.name), "bm-c-narrow-dark.png"), fullPage: true });
  writeFileSync(join(directory(info.project.name), "bm-c-geometry.json"), JSON.stringify({ ...facts, navigation, narrow }, null, 2));
});

test("BM-C filters and clears an empty directory without losing a draft", async ({ page }) => {
  await page.goto("/#bm-c"); await page.getByRole("textbox", { name: "本题得分", exact: true }).fill("8.5");
  const search = page.getByRole("textbox", { name: "查找批改对象", exact: true }); await search.fill("不存在");
  await expect(page.getByRole("heading", { name: "没有匹配的批改对象", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "清空筛选", exact: true }).click(); await expect(page.getByRole("textbox", { name: "本题得分", exact: true })).toHaveValue("8.5");
  await search.click(); await search.pressSequentially("第 2 题");
  await expect(search).toHaveValue("第 2 题"); await expect(search).toBeFocused();
  await expect(page.getByRole("heading", { name: "示例学生 01 · 第 2 题", exact: true })).toBeVisible();
});

test("BM-C refined taskbar, disclosure icons, status and tablet layout remain usable", async ({ page }, info) => {
  await page.setViewportSize({ width: 1259, height: 695 }); await page.goto("/#bm-c");
  const scoreField = page.locator('.bm-c-grade-body .rain-input').first();
  const commentField = page.locator('.bm-c-grade-body .rain-textarea');
  for (const field of [scoreField, commentField]) {
    await expect(field).toHaveAttribute('data-appearance', 'filled');
    expect(await field.evaluate(el => getComputedStyle(el).backgroundColor)).not.toBe(await page.locator('.bm-c-detail').evaluate(el => getComputedStyle(el).backgroundColor));
  }
  await expect(page.locator('.bm-c-answer header > p')).toHaveCount(0);
  await expect(page.locator('.bm-c-grade-heading > p')).toHaveCount(0);
  const pending = page.getByRole('button', { name: '选择 示例学生 01 第 1 题', exact: true });
  await expect(pending.locator('[data-rain-id="ui-tag"]')).toHaveText('待批改');
  const graded = page.getByRole('button', { name: '选择 示例学生 03 第 1 题', exact: true });
  await expect(graded.locator('.bm-c-directory-score strong')).toHaveCSS('font-weight', '700');
  await expect(graded).toContainText('8 分');
  const alignment = await page.evaluate(() => {
    const summary = document.querySelector('.bm-c-context details[open] > summary')!;
    const name = document.querySelector('.bm-c-context details[open] li button > span')!;
    const reference = document.querySelector('.bm-c-reference > summary')!;
    const field = document.querySelector('.bm-c-grade-body .rain-input')!;
    const answer = document.querySelector('.bm-c-answer')!, inspector = document.querySelector('.bm-c-inspector')!;
    return { directory: Math.abs(summary.firstElementChild!.getBoundingClientRect().left - name.getBoundingClientRect().left),
      reference: Math.abs(reference.getBoundingClientRect().left - field.getBoundingClientRect().left),
      joined: Math.abs(answer.getBoundingClientRect().right - inspector.getBoundingClientRect().left),
      iconRight: summary.lastElementChild!.getBoundingClientRect().left > summary.firstElementChild!.getBoundingClientRect().right,
      lighterIcon: getComputedStyle(summary.lastElementChild!).color !== getComputedStyle(summary).color,
      directorySurface: getComputedStyle(document.querySelector('.bm-c-context')!).backgroundColor,
      mainSurface: getComputedStyle(document.querySelector('.bm-c-detail')!).backgroundColor };
  });
  expect(alignment.directory).toBeLessThanOrEqual(1); expect(alignment.reference).toBeLessThanOrEqual(1);
  expect(alignment.joined).toBeLessThanOrEqual(1); expect(alignment.iconRight && alignment.lighterIcon).toBe(true);
  expect(alignment.directorySurface).toBe(alignment.mainSurface);
  await page.screenshot({ path: join(directory(info.project.name), 'bm-c-primary-workflow.png') });
  const taskbar = page.locator('.bm-c-taskbar');
  await expect(taskbar).toHaveCSS("position", "sticky");
  await expect(page.locator('.bm-c-taskbar-divider')).toHaveCSS("border-left-width", "1px");
  for (const name of ["收起目录", "收起评分"]) {
    await expect(page.getByRole("button", { name, exact: true }).locator('[data-rain-id="icon"]')).toHaveCSS("width", "16px");
  }
  const tray = await page.locator('.bm-c .rain-tabs__tray').evaluate(el => ({ tray: getComputedStyle(el).backgroundColor, toolbar: getComputedStyle(el.closest('.bm-c-toolbar')!).backgroundColor }));
  expect(tray.tray).not.toBe(tray.toolbar);
  await expect(page.locator('.bm-c-back [data-rain-id="icon"]')).toHaveAttribute("data-icon", "icon/arrow-left");
  const reference = page.locator('.bm-c-reference > summary');
  await expect(reference.locator('.bm-c-disclosure-closed')).toBeVisible();
  await reference.focus(); await reference.press("Enter");
  await expect(reference.locator('.bm-c-disclosure-open')).toBeVisible();
  await reference.press("Enter");
  const help = page.getByRole("button", { name: "评分说明", exact: true });
  await help.click();
  const popup = page.getByRole("dialog", { name: "评分说明", exact: true });
  await expect(popup).toContainText("切换对象会保留草稿");
  for (const slot of ["title", "description"]) await expect(popup.locator(`[data-slot="${slot}"]`)).toHaveCSS("font-size", "14px");
  await page.keyboard.press("Escape"); await expect(help).toBeFocused();
  const status = page.locator('.bm-c-grade-footer [data-rain-id="ui-system-status-tag"]');
  await expect(status).toHaveAttribute("data-state", "neutral");
  await page.getByRole("textbox", { name: "本题得分", exact: true }).fill("8.5");
  await expect(status).toHaveAttribute("data-state", "warning");
  await page.getByRole("button", { name: "保存", exact: true }).click();
  await expect(status).toHaveAttribute("data-state", "success");
  await page.getByRole("heading", { name: "大学物理 · 单元作业批改", exact: true }).click();
  await page.screenshot({ path: join(directory(info.project.name), "bm-c-refined-desktop.png") });
  await page.setViewportSize({ width: 899, height: 800 });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await expect(page.locator('.bm-c-detail')).toHaveAttribute("data-stacked", "false");
  const geometry = await page.locator('.bm-c-inspector').boundingBox();
  expect(geometry!.x + geometry!.width).toBeLessThanOrEqual(899);
  await page.screenshot({ path: join(directory(info.project.name), "bm-c-refined-tablet.png"), fullPage: true });
  await page.getByRole("button", { name: "保存", exact: true }).scrollIntoViewIfNeeded();
  expect((await taskbar.boundingBox())!.y).toBe(0);
  for (const width of [899, 390]) {
    await page.setViewportSize({ width, height: 800 });
    await page.getByRole("button", { name: "下一位", exact: true }).click();
    const heading = page.locator('.bm-c-answer h2');
    await expect(heading).toBeFocused();
    const clear = await heading.evaluate(el => ({ top: el.getBoundingClientRect().top, barBottom: document.querySelector('.bm-c-taskbar')!.getBoundingClientRect().bottom }));
    expect(clear.top).toBeGreaterThanOrEqual(clear.barBottom);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  }
});

test("BM-C student portraits stay stable across grouping and short scoring preserves layout", async ({ page }, info) => {
  await page.setViewportSize({ width: 1215, height: 778 }); await page.goto('/#bm-c');
  const student = page.getByRole('button', { name: '选择 示例学生 01 第 1 题', exact: true });
  const portrait = student.locator('[data-slot="portrait"]');
  await expect(portrait).toHaveAttribute('data-ready', 'true');
  const src = await portrait.getAttribute('src');
  await expect(student.locator('[data-rain-id="ui-avatar"]')).toHaveAttribute('data-size', '24');
  const rowPortraits = await page.locator('.bm-c-context details[open] [data-slot="portrait"]').evaluateAll(images => images.map(image => image.getAttribute('src')));
  expect(new Set(rowPortraits).size).toBe(6);
  await page.getByRole('tab', { name: '按人批改', exact: true }).click();
  const parent = page.locator('.bm-c-context summary').filter({ hasText: '示例学生 01' });
  await expect(parent.locator('[data-slot="portrait"]')).toHaveAttribute('src', src!);
  await expect(page.locator('.bm-c-context details[open] li [data-rain-id="ui-avatar"]')).toHaveCount(0);
  await page.getByRole('textbox', { name: '查找批改对象', exact: true }).fill('示例学生 01');
  await expect(parent.locator('[data-slot="portrait"]')).toHaveAttribute('src', src!);
  await page.getByRole('textbox', { name: '查找批改对象', exact: true }).fill('');
  await page.getByRole('tab', { name: '按题批改', exact: true }).click();
  await expect(portrait).toHaveAttribute('src', src!);
  const scoreInput = await page.locator('.bm-c-score-input').boundingBox();
  const comment = await page.locator('.bm-c-grade-body .rain-textarea').boundingBox();
  expect(scoreInput!.width).toBe(128); expect(scoreInput!.width).toBeLessThan(comment!.width * 0.6);
  await expect(page.locator('.bm-c-context nav > details').nth(1)).toHaveCSS('border-top-width', '1px');
  const score = page.locator('.bm-c-context details[open] .bm-c-directory-score');
  expect(await score.locator('strong').evaluate(el => getComputedStyle(el).color)).not.toBe(await score.locator('.bm-c-score-unit').evaluate(el => getComputedStyle(el).color));
  await expect(score.locator('strong')).toHaveCSS('font-weight', '700');
  await expect(score.locator('.bm-c-score-unit')).toHaveCSS('font-size', '13px');
  await page.getByRole('heading', { name: '大学物理 · 单元作业批改', exact: true }).click();
  await page.screenshot({ path: join(directory(info.project.name), 'bm-c-directory-detail.png') });
  const scoredStudent = page.getByRole('button', { name: '选择 示例学生 03 第 1 题', exact: true });
  await scoredStudent.click();
  expect(await scoredStudent.locator('strong').evaluate(el => getComputedStyle(el).color)).toBe(await scoredStudent.evaluate(el => getComputedStyle(el).color));
  await page.locator('.bm-c-grade-body summary').filter({ hasText: '演示设置' }).click();
  await page.getByRole('button', { name: '切换深色', exact: true }).click();
  await expect(page.locator('.bm-c')).toHaveAttribute('data-rain-theme', 'dark');
  expect(await scoredStudent.locator('strong').evaluate(el => getComputedStyle(el).color)).toBe(await scoredStudent.evaluate(el => getComputedStyle(el).color));
  await page.screenshot({ path: join(directory(info.project.name), 'bm-c-directory-dark-selected.png') });
});

test("BM-C question-number navigation keeps drafts, feedback and original question identities", async ({ page }, info) => {
  await page.setViewportSize({ width: 1215, height: 778 }); await page.goto('/#bm-c');
  await page.locator('.bm-c-context summary').filter({ hasText: '第 2 题 · 能量转化' }).click();
  await page.getByRole('tab', { name: '按人批改', exact: true }).click();
  const question = (student: string, number: number) => page.getByRole('button', { name: `选择 示例学生 ${student} 第 ${number} 题`, exact: true });
  const score = page.getByRole('textbox', { name: '本题得分', exact: true });
  const comment = page.getByRole('textbox', { name: '评语', exact: true });
  await expect(question('01', 2)).toHaveAttribute('aria-current', 'step');
  await expect(question('01', 2)).toHaveAttribute('data-feedback', 'pending');
  await score.fill('11.5'); await comment.fill('补充条件');
  await question('01', 3).focus(); await question('01', 3).press('Enter');
  await expect(page.getByRole('heading', { name: '示例学生 01 · 第 3 题', exact: true })).toBeFocused();
  await expect(question('01', 2)).toHaveAccessibleDescription('草稿');
  await question('01', 2).click(); await expect(score).toHaveValue('11.5'); await expect(comment).toHaveValue('补充条件');
  await score.fill('0'); await page.getByRole('button', { name: '保存', exact: true }).click();
  await expect(question('01', 3)).toBeDisabled();
  await expect(question('01', 2)).toHaveAttribute('data-feedback', 'reviewed');
  await expect(question('01', 2)).toHaveAccessibleDescription('0 分');
  await expect(question('01', 2)).toHaveAttribute('aria-current', 'step');
  await page.getByRole('textbox', { name: '查找批改对象', exact: true }).fill('第 2 题');
  await expect(page.locator('.bm-c-context details[open] [data-rain-id="ui-question-number"] [data-slot="label"]')).toHaveText('2');
  await page.getByRole('textbox', { name: '查找批改对象', exact: true }).fill('');
  await page.locator('.bm-c-context summary').filter({ hasText: '示例学生 06' }).click();
  await expect(question('06', 3)).toHaveAttribute('data-feedback', 'unanswered');
  await expect(question('06', 3)).toHaveAccessibleDescription('未作答');
  await page.locator('.bm-c-context summary').filter({ hasText: '示例学生 03' }).click();
  await question('03', 1).click();
  await expect(question('03', 1)).toHaveAccessibleDescription('8 分');
  await page.getByRole('heading', { name: '大学物理 · 单元作业批改', exact: true }).click();
  await page.screenshot({ path: join(directory(info.project.name), 'bm-c-question-switch.png') });
  await page.setViewportSize({ width: 390, height: 800 });
  const buttons = page.locator('.bm-c-context details[open] [data-rain-id="ui-question-number"]');
  await expect(buttons).toHaveCount(3);
  const boxes = await buttons.evaluateAll(nodes => nodes.map(el => ({ width: el.getBoundingClientRect().width, right: el.getBoundingClientRect().right })));
  expect(boxes.every(box => box.width >= 44 && box.right <= 390)).toBe(true);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await page.screenshot({ path: join(directory(info.project.name), 'bm-c-question-switch-narrow.png'), fullPage: true });
});

test("BM-D scope Select and metric buttons keep independent keyboard selection", async ({ page }) => {
  await page.goto("/#bm-d");
  const scope = page.getByRole("combobox", { name: "报告班级", exact: true });
  await scope.focus(); await scope.press("Enter");
  await page.keyboard.press("Home"); await page.keyboard.press("ArrowDown"); await page.keyboard.press("Enter");
  await expect(scope).toContainText("一班");
  const values = page.getByRole("region", { name: "关键指标" }).locator('[data-slot="value"]');
  const before = await values.allTextContents();
  const metric = page.getByRole("radiogroup", { name: "趋势指标", exact: true });
  await metric.getByRole("radio", { name: "提交率", exact: true }).click();
  await expect(metric.getByRole("radio", { name: "提交率", exact: true })).toBeChecked();
  await metric.getByRole("radio", { name: "平均分", exact: true }).click();
  await metric.getByRole("radio", { name: "平均分", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(metric.getByRole("radio", { name: "提交率", exact: true })).toBeChecked();
  await expect(values).toHaveText(before);
  await expect(scope).toContainText("一班");
});

test("BM-D chart supports keyboard readings, honest axes and container resizing", async ({ page }, info) => {
  await page.goto("/#bm-d");
  const chart = page.getByRole("application", { name: "平均分趋势图" });
  await expect(chart).toBeVisible();
  await chart.focus();
  const tooltip = page.getByRole("status", { name: "图表即时读数" });
  await expect(tooltip).toContainText("第 1 周");
  await page.keyboard.press("ArrowRight"); await expect(tooltip).toContainText("第 2 周");
  await expect(tooltip).toContainText("临时查看");
  await expect(page.getByRole("combobox", { name: "固定对照", exact: true })).toContainText("第 6 周");
  await expect(page.getByRole("status", { name: "趋势读数" })).toContainText("第 6 周");
  await expect(tooltip).toContainText("一班"); await expect(tooltip).toContainText("二班");
  await expect(page.getByRole("region", { name: "关键指标" }).locator('[data-slot="value"]')).toHaveText(["312", "252", "80.9", "80.8%"]);
  await expect(chart.locator(".recharts-yAxis-tick-labels .recharts-cartesian-axis-tick-value")).toHaveText(["0", "25", "50", "75", "100"]);
  const paints = await page.evaluate(() => {
    const line = document.querySelector('.recharts-reference-line-line')!;
    return { marker: getComputedStyle(line).stroke, intendedMarker: getComputedStyle(line.parentElement!).stroke,
      emphasis: [...document.querySelectorAll('.bm-d strong,.bm-d b')].map(node => getComputedStyle(node).fontWeight),
      series: ['one', 'two'].map(series => ({
        line: getComputedStyle(document.querySelector(`g.bm-d-series-${series} .recharts-line-curve`)!).stroke,
        point: getComputedStyle(document.querySelector(`.bm-d-chart ${series === 'one' ? 'circle' : 'rect'}.bm-d-series-${series}`)!).fill,
      })) };
  });
  expect(paints.marker).toBe(paints.intendedMarker); expect(paints.emphasis.every(weight => weight === "600")).toBe(true);
  expect(paints.series.every(series => series.line === series.point)).toBe(true);
  await expect(page.getByRole("button", { name: /^清除(?:报告周期|固定对照)$/ })).toHaveCount(0);

  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect.poll(async () => chart.evaluate(node => node.getBoundingClientRect().width)).toBeLessThan(width);
    await expect.poll(() => page.locator('.bm-d-chart').evaluate(node => node.scrollWidth - node.clientWidth)).toBeLessThanOrEqual(1);
  }
  await page.screenshot({ path: join(directory(info.project.name), "bm-d-chart-keyboard.png"), fullPage: true });
});

test("BM-D full-range metrics survive complete details and chart selection with separate numeric fonts", async ({ page }, info) => {
  await page.goto("/#bm-d");
  const metrics = page.getByRole("region", { name: "关键指标", exact: true }); const values = metrics.locator('[data-slot="value"]');
  await expect(values).toHaveText(["312", "252", "80.9", "80.8%"]);
  await expect(page.getByRole("table").getByRole("row")).toHaveCount(13);
  await page.getByRole("combobox", { name: "固定对照", exact: true }).click(); await page.getByRole("option", { name: "第 4 周", exact: true }).click();
  await expect(values).toHaveText(["312", "252", "80.9", "80.8%"]);
  await expect(page.getByRole("status", { name: "趋势读数", exact: true })).toContainText("第 4 周");
  const facts = await page.evaluate(() => ({
    values: [...document.querySelectorAll('.bm-d-statistic [data-slot="value"]')].map(node => ({ font: getComputedStyle(node).fontFamily, weight: getComputedStyle(node).fontWeight })),
    units: [...document.querySelectorAll('.bm-d-statistic [data-slot="unit"]')].map(node => getComputedStyle(node).fontFamily),
    bodyFont: getComputedStyle(document.querySelector('.bm-d-details td')!).fontFamily,
    actualLineSeedAvailable: document.fonts.check('36px "LINE Seed JP App_OTF"'),
  }));
  expect(facts.values.every(value => value.font.includes("LINE Seed") && value.weight === "600")).toBe(true); expect(facts.units.every(font => font.includes("PingFang"))).toBe(true); expect(facts.bodyFont).toContain("PingFang");
  await page.screenshot({ path: join(directory(info.project.name), "bm-d-desktop.png"), fullPage: true });
  writeFileSync(join(directory(info.project.name), "bm-d-fonts.json"), JSON.stringify(facts, null, 2));
});

test("BM-D filters the source, distinguishes chart state and recovers from failure and empty", async ({ page }) => {
  await page.goto("/#bm-d"); await page.getByRole("combobox", { name: "报告班级", exact: true }).click(); await page.getByRole("option", { name: "二班", exact: true }).click();
  await expect(page.getByRole("region", { name: "关键指标" }).locator('[data-slot="value"]')).toHaveText(["156", "129", "81.9", "82.7%"]);
  await page.getByRole("combobox", { name: "报告周期", exact: true }).click();
  await page.getByRole("option", { name: "第 4–6 周", exact: true }).click();
  await expect(page.getByRole("region", { name: "关键指标" }).locator('[data-slot="value"]')).toHaveText(["78", "69", "86.1", "88.5%"]);
  await page.getByRole("radiogroup", { name: "趋势指标" }).getByRole("radio", { name: "提交率", exact: true }).click(); await expect(page.getByRole("status", { name: "趋势读数" })).toContainText("提交率");
  await page.getByText("演示设置", { exact: true }).click(); await page.getByText("下次加载失败", { exact: true }).click(); await page.getByRole("button", { name: "刷新报告", exact: true }).click();
  await expect(page.getByRole("region", { name: "关键指标" })).toHaveCount(0); await expect(page.getByRole("alert")).toBeFocused();
  await page.getByRole("button", { name: "重试加载", exact: true }).click(); await expect(page.getByRole("region", { name: "关键指标" })).toBeVisible();
  await page.getByRole("button", { name: "预览空数据", exact: true }).click(); await expect(page.getByRole("heading", { name: "暂无报告数据" })).toBeVisible();
  await page.getByRole("button", { name: "恢复示例数据", exact: true }).click(); await expect(page.getByRole("region", { name: "关键指标" })).toBeVisible();
});

test("BM-D narrow dark report retains readable equivalent data and keyboard access", async ({ page }, info) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto("/#bm-d");
  await page.getByText("演示设置", { exact: true }).click(); await page.getByRole("button", { name: "切换深色", exact: true }).click();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  const week = page.getByRole("combobox", { name: "固定对照", exact: true }); await week.focus(); await page.keyboard.press("Enter");
  await page.keyboard.press("Home"); await page.keyboard.press("ArrowDown"); await page.keyboard.press("ArrowDown"); await page.keyboard.press("ArrowDown"); await page.keyboard.press("Enter");
  await expect(page.getByRole("status", { name: "趋势读数" })).toContainText("第 4 周"); await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("table").locator("td").first()).toHaveCSS("white-space", "nowrap");
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.screenshot({ path: join(directory(info.project.name), "bm-d-narrow-dark.png"), fullPage: true });
});


test("BM-D keeps secondary guidance on demand and its page identity visible on scroll", async ({ page }, info) => {
  await page.setViewportSize({ width: 1212, height: 760 }); await page.goto("/#bm-d");
  const help = page.getByRole("button", { name: "趋势说明", exact: true });
  await expect(page.getByText("比较两个班的变化，查看具体周次。", { exact: true })).toHaveCount(0);
  await help.focus(); await help.press("Enter");
  const panel = page.getByRole("dialog", { name: "趋势说明", exact: true });
  await expect(panel).toBeVisible(); await expect(panel).toContainText("比较两个班的变化");
  const typography = await page.evaluate(() => ({
    help: [...document.querySelectorAll('.bm-d-help [data-slot="title"], .bm-d-help [data-slot="description"]')].map(node => getComputedStyle(node).fontSize),
    metrics: [...new Set([...document.querySelectorAll('.bm-d-statistic dt, .bm-d-statistic dd span')].map(node => getComputedStyle(node).fontSize))].sort(),
    fixedLabel: getComputedStyle(document.querySelector('.bm-d-week [data-slot="label"]')!).color,
    legend: getComputedStyle(document.querySelector('.bm-d figcaption')!).color,
    tableHeads: [...document.querySelectorAll('.bm-d-details th')].map(node => getComputedStyle(node).fontSize),
  }));
  expect(typography.help).toEqual(["14px", "14px"]);
  expect(typography.metrics).toEqual(["14px", "16px"]);
  expect(typography.fixedLabel).toBe(typography.legend);
  expect(typography.tableHeads.every(size => size === "14px")).toBe(true);
  writeFileSync(join(directory(info.project.name), "bm-d-typography.json"), JSON.stringify(typography, null, 2));
  await page.keyboard.press("Escape"); await expect(panel).toHaveCount(0); await expect(help).toBeFocused();
  await expect(page.getByRole("table")).toHaveAttribute("data-density", "default");
  await expect(page.getByRole("table").getByRole("row")).toHaveCount(13);
  const top = await page.locator('.bm-d-header').boundingBox();
  await page.getByRole("table").getByRole("row").last().scrollIntoViewIfNeeded();
  const after = await page.locator('.bm-d-header').boundingBox();
  expect(top!.y).toBe(0); expect(after!.y).toBe(0);
  await page.screenshot({ path: join(directory(info.project.name), "bm-d-sticky-table.png"), fullPage: false });
});
