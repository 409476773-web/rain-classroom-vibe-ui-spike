import { chromium, firefox, webkit, expect } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// Run a copy from the independent starter so browser tooling resolves there too.
const [url, output, stage = "final", engine = "chromium"] = process.argv.slice(2);
if (!url || !output || !["baseline", "a0", "a1", "a2", "b0", "b1", "b2", "final"].includes(stage) || !["chromium", "firefox", "webkit"].includes(engine)) throw new Error("Usage: node rn14-browser.mjs URL OUTPUT [baseline|a0|a1|a2|b0|b1|b2|final] [chromium|firefox|webkit]");
mkdirSync(output, { recursive: true });
const browser = await ({ chromium, firefox, webkit })[engine].launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
const page = await context.newPage(), errors = [], checks = [], geometry = [];
page.on("pageerror", error => errors.push(error.message));
page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
const button = name => page.getByRole("button", { name, exact: true });
async function start(hash) { await page.goto("about:blank"); await page.goto(`${url}/#${hash}`); }
async function capture(name) {
  await page.screenshot({ path: resolve(output, `${engine}-${name}.png`), fullPage: true });
  const fact = await page.evaluate(() => ({ viewport: innerWidth, overflow: document.documentElement.scrollWidth - innerWidth, font: getComputedStyle(document.body).fontFamily }));
  expect(fact.overflow).toBeLessThanOrEqual(1); geometry.push({ name, ...fact });
}
try {
  await start("bm-a");
  if (stage !== "baseline") await expect(page.locator('[data-rain-id="local-rn14-bm-a-context"]')).toBeVisible();
  await expect(page.getByText("共 13 份资料", { exact: true })).toBeVisible();
  if (["a1", "a2", "b0", "b1", "b2", "final"].includes(stage)) {
    const query = page.locator('[data-slot="rn14-query"]'), results = page.locator('[data-slot="rn14-results-tools"]');
    await expect(query.getByRole("textbox", { name: "查找资料", exact: true })).toBeVisible();
    await expect(query.getByRole("button", { name: "表格视图", exact: true })).toHaveCount(0);
    await expect(results.getByRole("button", { name: "表格视图", exact: true })).toBeVisible();
    const first = await query.boundingBox(), second = await results.boundingBox();
    expect(first.y + first.height).toBeLessThanOrEqual(second.y + 1);
    checks.push("BM-A query separated from view and results controls");
  }
  if (["a2", "b0", "b1", "b2", "final"].includes(stage)) {
    await expect(page.locator('[data-slot="rn14-batch-summary"]').getByRole("button", { name: "标为已发布", exact: true })).toBeVisible();
    await expect(page.locator('[data-slot="rn14-pagination"]').getByRole("button", { name: "下一页", exact: true })).toBeVisible();
    checks.push("BM-A separate batch summary and pagination regions");
  }
  const selected = page.getByRole("checkbox", { name: "选择 教学案例研读", exact: true });
  await selected.locator("..").click();
  await button("下一页").click();
  await expect(page.getByText("含其他页 1 份", { exact: true })).toBeVisible();
  await button("卡片视图").click(); await button("上一页").click();
  await expect(selected).toBeChecked();
  await expect(page.getByRole("checkbox", { name: "选择 课堂观察记录", exact: true })).toBeDisabled();
  await button("标为已发布").click();
  await expect(page.getByRole("article", { name: "教学案例研读", exact: true }).getByText("已发布", { exact: true })).toBeVisible();
  await button("表格视图").click();
  await page.getByRole("textbox", { name: "查找资料", exact: true }).fill("教学案例");
  await button("搜索").click(); await expect(page.locator("tbody tr")).toHaveCount(1);
  await button("清空筛选").click();
  await selected.locator("..").click();
  await button("刷新资料").click();
  await expect(button("表格视图")).toBeDisabled(); await expect(button("卡片视图")).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("资料已刷新"); await expect(selected).toBeChecked();
  await page.getByText("试用加载与空数据状态", { exact: true }).click();
  await page.getByRole("checkbox", { name: "下次刷新模拟失败", exact: true }).locator("..").click();
  await button("刷新资料").click(); await expect(page.getByRole("alert")).toContainText("刷新失败");
  await expect(selected).toBeChecked(); await button("重试").click();
  await expect(page.getByRole("alert")).toHaveCount(0); await expect(selected).toBeChecked();
  await button("显示列").click();
  await page.getByRole("menuitemcheckbox", { name: "更新时间", exact: true }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("columnheader", { name: "更新时间", exact: true })).toHaveCount(0);
  await page.getByRole("checkbox", { name: "紧凑密度", exact: true }).locator("..").click();
  await expect(page.locator("tbody tr").first()).toHaveCSS("height", "50px");
  checks.push("BM-A selection/pagination/view/search/batch/refresh-failure/retry/column-menu/density");
  await start("bm-a");
  await capture("bm-a-1440");
  await page.setViewportSize({ width: 390, height: 844 }); await capture("bm-a-390");

  await page.setViewportSize({ width: 1440, height: 1000 }); await start("bm-b");
  if (["b0", "b1", "b2", "final"].includes(stage)) await expect(page.locator('[data-rain-id="local-rn14-bm-b-context"]')).toBeVisible();
  await page.getByText("演示选项", { exact: true }).click();
  await page.getByText("模拟下次保存失败", { exact: true }).click();
  await button("编辑教材").click();
  const dialog = page.getByRole("dialog"), title = page.getByRole("textbox", { name: "教材标题", exact: true });
  if (["b1", "b2", "final"].includes(stage)) {
    await expect(dialog.locator('[data-slot="rn14-reading"] textarea')).toHaveCount(4);
    await expect(dialog.locator('[data-slot="rn14-reading"] [data-rain-id="layout-grid"]')).toHaveCount(0);
    checks.push("BM-B four long-text fields share a full-width reading region");
  }
  if (["b2", "final"].includes(stage)) {
    const attachmentFacts = await dialog.locator('[data-slot="rn14-attachments"]').evaluate(el => ({ inForm: Boolean(el.closest("form")), owner: el.querySelector("input[type=file]").getAttribute("form"), formId: document.querySelector('form[aria-label="教材表单"]').id }));
    expect(attachmentFacts.inForm).toBe(false); expect(attachmentFacts.owner).toBe(attachmentFacts.formId);
    checks.push("BM-B attachment sibling region retains explicit form ownership");
  }
  await expect(title).toBeFocused();
  await title.fill(""); await button("保存教材").click();
  await expect(title).toHaveAttribute("aria-invalid", "true"); await expect(title).toBeFocused();
  await title.fill("RN-14 教材草稿");
  const subject = page.getByRole("combobox", { name: "所属学科", exact: true });
  await subject.click(); await expect(page.getByRole("listbox")).toBeVisible();
  await page.keyboard.press("Escape"); await expect(page.getByRole("listbox")).toHaveCount(0);
  await expect(dialog).toBeVisible(); await expect(subject).toBeFocused();
  await page.keyboard.press("Escape");
  const confirmation = page.getByRole("alertdialog");
  await expect(confirmation).toBeVisible(); await expect(button("继续编辑")).toBeFocused();
  await button("继续编辑").click(); await expect(confirmation).toHaveCount(0); await expect(title).toHaveValue("RN-14 教材草稿");
  await button("保存教材").click();
  await expect(page.getByRole("alert")).toHaveText("保存失败，填写内容已保留。请重试。");
  await expect(page.getByRole("alert")).toBeFocused();
  await button("重试保存").click(); await expect(dialog).toHaveCount(0); await expect(button("编辑教材")).toBeFocused();
  await expect(page.getByRole("heading", { name: "RN-14 教材草稿", exact: true })).toBeVisible();
  await button("编辑教材").click(); await title.fill("将丢弃的草稿"); await page.keyboard.press("Escape");
  await button("放弃修改").click(); await expect(dialog).toHaveCount(0); await expect(button("编辑教材")).toBeFocused();
  checks.push("BM-B validation/save-failure/retry/commit/discard/nested-Select/AlertDialog/focus-return");
  await start("bm-b");
  await page.getByText("演示选项", { exact: true }).click();
  await page.getByText("模拟下次上传失败", { exact: true }).click();
  await button("编辑教材").click();
  const files = page.getByLabel("添加教材附件", { exact: true });
  await files.setInputFiles({ name: "rn14.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.7 local mock") });
  await expect(page.getByText(/上传失败，请重试/)).toBeVisible();
  await button("保存教材").click(); await expect(button("添加教材附件")).toBeFocused();
  await button("重试上传 rn14.pdf").click();
  await expect(page.getByText(/模拟上传成功/)).toBeVisible();
  await button("保存教材").click();
  await expect(page.locator('[data-slot="saved-attachments"]')).toHaveText("已保存附件：rn14.pdf");
  checks.push("BM-B attachment failure/save-block/focus/retry/commit");
  await start("bm-b"); await button("编辑教材").click();
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    const body = page.getByRole("dialog").locator('[data-slot="body"]');
    await body.evaluate(el => { el.scrollTop = 0; });
    await capture(`bm-b-${width}-top`);
    const footer = page.getByRole("dialog").locator('[data-slot="footer"]').first();
    const before = await footer.boundingBox(); await body.evaluate(el => { el.scrollTop = el.scrollHeight; });
    const after = await footer.boundingBox();
    expect(after?.y).toBe(before?.y);
    expect(await page.getByRole("dialog").evaluate(el => el.scrollWidth - el.clientWidth)).toBeLessThanOrEqual(1);
    geometry.push({ name: `fixed-footer-${width}`, before, after });
    await capture(`bm-b-${width}-bottom`);
  }
  expect(errors).toEqual([]);
  writeFileSync(resolve(output, `${engine}-result.json`), JSON.stringify({ stage, engine, browserVersion: browser.version(), nodeVersion: process.version, status: "passed", checks, geometry, errors }, null, 2) + "\n");
  console.log(`${stage} ${engine}: ${checks.length} interaction groups passed; screenshots and geometry saved`);
} catch (error) {
  await page.screenshot({ path: resolve(output, `${engine}-failure.png`), fullPage: true }).catch(() => {});
  writeFileSync(resolve(output, `${engine}-result.json`), JSON.stringify({ stage, engine, status: "failed", checks, geometry, errors, failure: String(error) }, null, 2) + "\n");
  throw error;
} finally { await browser.close(); }
