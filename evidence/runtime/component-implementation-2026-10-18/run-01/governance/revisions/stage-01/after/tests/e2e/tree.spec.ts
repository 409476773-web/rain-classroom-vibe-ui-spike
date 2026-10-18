import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";

test("approved connector geometry and responsive Rich layout", async ({ page }) => {
  await page.goto("/#tree");
  const basic = page.locator(".tree-page__panel").first();
  const branch = basic.getByRole("treeitem", { name: "1.1　随机事件" });
  const leaf = basic.getByRole("treeitem", { name: "样本空间与随机事件" });
  const geometry = await Promise.all([branch, leaf].map((row) => row.evaluate((node) => {
    const connector = node.querySelector<HTMLElement>(".rain-tree-connector")!;
    const arm = getComputedStyle(connector, "::after");
    const target = node.querySelector<HTMLElement>(".rain-tree-expander, .rain-tree-content")!;
    const start = connector.getBoundingClientRect().left;
    return { arm: parseFloat(arm.width), gap: target.getBoundingClientRect().left - (start + parseFloat(arm.width)) };
  })));
  expect(geometry).toEqual([{ arm: 12, gap: 4 }, { arm: 12, gap: 4 }]);
  const rich = page.locator(".tree-page__panel--wide").getByRole("treeitem", { name: "3.1　离散型随机变量" });
  const richGeometry = await rich.evaluate((node) => {
    const button = node.querySelector<HTMLElement>(".rain-tree-expander")!;
    const outgoing = node.querySelector<HTMLElement>(".rain-tree-outgoing-line")!;
    const title = node.querySelector<HTMLElement>('[data-slot="title"]')!;
    return { verticalGap: outgoing.getBoundingClientRect().top - button.getBoundingClientRect().bottom,
      alignment: button.getBoundingClientRect().top + 12 - (title.getBoundingClientRect().top + 11) };
  });
  expect(richGeometry).toEqual({ verticalGap: 4, alignment: 0 });
  await page.setViewportSize({ width: 320, height: 740 });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: evidenceOutputPath("evidence/runtime/tree/narrow.png"), fullPage: true });
});

test("search keeps expansion and ManageTree saves an edited title", async ({ page }) => {
  await page.goto("/#tree");
  const search = page.getByRole("textbox", { name: "搜索节点" });
  await search.fill("样本空间");
  await expect(page.locator(".tree-page__panel").first().getByRole("treeitem", { name: "样本空间与随机事件" })).toBeVisible();
  await search.fill("");
  await expect(page.locator(".tree-page__panel").first().getByRole("treeitem", { name: "样本空间与随机事件" })).toBeVisible();
  await page.goto("/#manage-tree");
  const row = page.getByRole("treeitem", { name: "第一章　随机事件与概率" });
  await row.hover();
  await row.getByRole("button", { name: "编辑第一章　随机事件与概率" }).click();
  const editor = page.getByRole("textbox", { name: "标题" });
  await editor.fill("第一章　概率基础");
  await page.getByRole("button", { name: "保存草稿" }).click();
  await expect(editor).toHaveValue("第一章　概率基础");
  await editor.press("Enter");
  await page.getByRole("button", { name: "保存草稿" }).click();
  await expect(page.getByRole("treeitem", { name: "第一章　概率基础" })).toBeVisible();
  await expect(page.locator('[data-rain-id="pattern-manage-tree"]')).toHaveAttribute("data-mode", "view");
  await expect(page.getByRole("status").last()).toHaveText("保存成功");
});

test("dark selection and forced-color connectors remain distinguishable", async ({ page }) => {
  await page.goto("/#tree");
  await page.evaluate(() => document.documentElement.setAttribute("data-rain-theme", "dark"));
  const row = page.locator(".tree-page__panel").first().getByRole("treeitem", { name: "样本空间与随机事件" });
  await row.click();
  await expect(row).toHaveAttribute("aria-selected", "true");
  await expect(row.locator('[data-slot="row"]')).toHaveCSS("background-color", "rgb(32, 48, 101)");
  await expect(row.locator(".rain-tree-connector")).toHaveCSS("background-color", "rgba(194, 212, 255, 0.1)");
  await page.emulateMedia({ forcedColors: "active" });
  const line = row.locator(".rain-tree-connector");
  const color = await line.evaluate((element) => getComputedStyle(element).backgroundColor);
  expect(color).not.toBe("rgba(0, 0, 0, 0)");
});

test("ManageTree mouse drag moves only the dragged subtree", async ({ page }) => {
  await page.goto("/#manage-tree");
  const tree = page.getByRole("tree");
  const source = tree.getByRole("treeitem", { name: "课前学习" });
  const target = tree.getByRole("treeitem", { name: "课后练习" });
  const height = await target.evaluate((node) => node.getBoundingClientRect().height);
  await source.getByRole("button", { name: "移动课前学习" }).dragTo(target, { targetPosition: { x: 80, y: height - 2 } });
  await expect.poll(() => tree.getByRole("treeitem").allTextContents()).toContainEqual(expect.stringContaining("课前学习"));
  const names = await tree.getByRole("treeitem").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("aria-label")));
  expect(names.indexOf("课前学习")).toBeGreaterThan(names.indexOf("课后练习"));
  expect(names.indexOf("生活中的随机现象")).toBeGreaterThan(names.indexOf("课前学习"));
});

test("drag hover expands a closed branch with a subtle target behind its content", async ({ page }) => {
  await page.goto("/#manage-tree");
  const tree = page.getByRole("tree");
  const branch = tree.getByRole("treeitem", { name: "课前学习" });
  await branch.getByRole("button", { name: "收起课前学习" }).click();
  await expect(branch).toHaveAttribute("aria-expanded", "false");
  const titleColor = await branch.locator('[data-slot="title"]').evaluate((element) => getComputedStyle(element).color);
  const source = tree.getByRole("button", { name: "移动课后练习" });
  const from = await source.boundingBox(), to = await branch.boundingBox();
  expect(from && to).toBeTruthy();
  await page.mouse.move(from!.x + from!.width / 2, from!.y + from!.height / 2);
  await page.mouse.down();
  await page.mouse.move(from!.x + from!.width / 2 + 12, from!.y + from!.height / 2, { steps: 5 });
  await page.mouse.move(to!.x + to!.width / 2, to!.y + to!.height / 2, { steps: 8 });
  await expect(branch).toHaveAttribute("aria-expanded", "true", { timeout: 2_000 });
  const indicator = branch.locator('[data-slot="drop-indicator"][data-placement="inside"]');
  await expect(indicator).toBeVisible();
  await expect(indicator).toHaveCSS("background-color", "rgba(61, 123, 255, 0.1)");
  await expect(indicator).toHaveCSS("border-top", "1px solid rgb(181, 204, 252)");
  await expect(branch.locator('[data-slot="title"]')).toHaveCSS("color", titleColor);
  const geometry = await indicator.evaluate((element) => {
    const row = element.closest('[data-slot="node"]')!.querySelector('[data-slot="row"]')!;
    const paint = element.getBoundingClientRect(), bounds = row.getBoundingClientRect();
    return { contained: paint.top >= bounds.top && paint.bottom <= bounds.bottom,
      coversRow: Math.abs(paint.width - (bounds.width - 16)) < 1 && Math.abs(paint.height - (bounds.height - 2)) < 1,
      behindContent: Number(getComputedStyle(element).zIndex) < Number(getComputedStyle(row.querySelector('[data-slot="content"]')!).zIndex) };
  });
  expect(geometry).toEqual({ contained: true, coversRow: true, behindContent: true });
  await tree.screenshot({ path: evidenceOutputPath("evidence/runtime/tree/drop-target-light.png") });
  await page.evaluate(() => document.documentElement.setAttribute("data-rain-theme", "dark"));
  await expect(indicator).toHaveCSS("background-color", "rgba(20, 95, 255, 0.1)");
  await tree.screenshot({ path: evidenceOutputPath("evidence/runtime/tree/drop-target-dark.png") });
  await page.mouse.move(0, 0); await page.mouse.up();
  await expect(tree.locator('[data-slot="drop-indicator"]')).toHaveCount(0);
});

test("dragging near a scroll boundary advances the tree viewport", async ({ page }) => {
  await page.goto("/#manage-tree");
  const tree = page.getByRole("tree");
  await tree.evaluate((node) => { (node as HTMLElement).style.height = "120px"; });
  const source = tree.getByRole("button", { name: "移动生活中的随机现象" });
  await source.scrollIntoViewIfNeeded();
  const from = await source.boundingBox(), box = await tree.boundingBox();
  expect(from && box).toBeTruthy();
  await page.mouse.move(from!.x + from!.width / 2, from!.y + from!.height / 2);
  await page.mouse.down();
  await page.mouse.move(from!.x + from!.width / 2 + 12, from!.y + from!.height / 2, { steps: 5 });
  await page.mouse.move(box!.x + 100, box!.y + box!.height - 3, { steps: 8 });
  await expect.poll(() => tree.evaluate((node) => node.scrollTop)).toBeGreaterThan(0);
  await page.mouse.move(0, 0);
  const stoppedAt = await tree.evaluate((node) => node.scrollTop);
  await page.waitForTimeout(120);
  expect(await tree.evaluate((node) => node.scrollTop)).toBe(stoppedAt);
  await page.mouse.up();
});

test("concurrent loads, checked inheritance, retries and filter/locate dragging", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/#tree");
  await page.getByText("04　异步加载、勾选继承与搜索拖拽", { exact: true }).click();
  const tree = page.getByRole("tree", { name: "异步与移动示例" });
  await tree.getByRole("treeitem", { name: "第一组 · 异步课程", exact: true }).locator('[data-slot="checkbox"]').click();
  await tree.getByRole("button", { name: "展开第一组 · 异步课程" }).click();
  await tree.getByRole("button", { name: "展开第二组 · 失败后重试" }).click();
  await expect(tree.getByRole("checkbox", { name: "勾选第一组 · 视频课程" })).toBeChecked();
  await tree.getByRole("button", { name: "加载失败，重试" }).click();
  await expect(tree.getByRole("treeitem", { name: "第二组 · 视频课程" })).toBeVisible();
  const video = tree.getByRole("treeitem", { name: "第一组 · 视频课程" });
  await video.getByRole("button", { name: "移动第一组 · 视频课程" }).focus();
  await page.keyboard.press("Space");
  for (let index = 0; index < 5; index++) await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("Enter");
  await expect(tree.getByRole("treeitem", { name: "空目录" })).toHaveAttribute("aria-expanded", "true");
  await expect(video.getByRole("checkbox")).toBeChecked();
  const names = await tree.getByRole("treeitem").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("aria-label")));
  expect(names.indexOf("第一组 · 视频课程")).toBeGreaterThan(names.indexOf("空目录"));
  await page.getByRole("textbox", { name: "搜索异步示例" }).fill("视频");
  await expect(tree.getByRole("button", { name: /^移动/ })).toHaveCount(0);
  await page.getByRole("button", { name: "切换为定位搜索" }).click();
  await expect(tree.getByRole("button", { name: "移动本地课件" })).toBeVisible();
  await expect(tree.getByRole("treeitem", { name: "本地课件" })).toBeVisible();
  await tree.screenshot({ path: evidenceOutputPath("evidence/runtime/tree/functional-async-move.png") });
  expect(errors).toEqual([]);
});

test("large-tree window preserves focus, measures production interactions and contains deep overflow", async ({ page, browser }) => {
  await page.goto("/#tree");
  await page.getByText("05　大树与 15 层目录", { exact: true }).click();
  const tree = page.getByRole("tree", { name: "大树与深层示例" });
  await expect(tree.getByRole("treeitem", { name: "完整课程目录" })).toBeVisible();
  const tenth = tree.getByRole("treeitem", { name: "第 10 层 · 目录", exact: true });
  await expect(tenth.locator('[data-slot="ancestor-line"]')).toHaveCount(8);
  await expect(tenth.locator('.rain-tree-connector.is-last, .rain-tree-ancestor-line.is-last')).toHaveCount(0);
  const segments = await tenth.locator('[data-slot="connector"], [data-slot="ancestor-line"]').evaluateAll((lines) => lines.map((line) => ({ left: (line as HTMLElement).offsetLeft, height: line.getBoundingClientRect().height })));
  expect(segments.map((line) => line.left).sort((a, b) => a - b)).toEqual(Array.from({ length: 9 }, (_, i) => 16 + 24 * i));
  expect(segments.every((line) => line.height === 36)).toBe(true);
  await tree.screenshot({ path: evidenceOutputPath("evidence/runtime/tree/continuous-ancestors-top.png") });
  const measure = async (name: string) => page.getByRole("button", { name, exact: true }).evaluate((button) => new Promise<number>((resolve) => {
    const start = performance.now(); (button as HTMLButtonElement).click();
    requestAnimationFrame(() => requestAnimationFrame(() => resolve(performance.now() - start)));
  }));
  const thousandDOM = await tree.getByRole("treeitem").count();
  const mount10000Ms = await measure("使用 10,000 个节点");
  const collapseMs = await measure("折叠全部");
  await expect(tree.getByRole("treeitem")).toHaveCount(1);
  const expandMs = await measure("展开全部");
  const first = tree.getByRole("treeitem", { name: "完整课程目录" });
  await first.focus();
  await tree.evaluate((element) => { element.scrollTop = 36 * 100; element.dispatchEvent(new Event("scroll")); });
  await expect(first).toBeFocused();
  await expect.poll(() => tree.evaluate((element) => element.scrollTop)).toBe(3600);
  expect(await tree.getByRole("treeitem").count()).toBeLessThan(25);
  const revealMs = await measure("定位末节点");
  await expect(tree.getByRole("treeitem", { name: "课程节点 9985", exact: true })).toBeFocused();
  const query = page.getByRole("textbox", { name: "搜索大树" });
  const searchStart = await page.evaluate(() => performance.now());
  await query.fill("课程节点 9985");
  await expect(tree.getByRole("treeitem")).toHaveCount(2);
  await expect(query).toBeFocused();
  const searchMs = await page.evaluate((start) => performance.now() - start, searchStart);
  await query.fill("");
  await tree.evaluate((element) => { element.scrollTop = 360; element.dispatchEvent(new Event("scroll")); });
  await expect(tree.getByRole("treeitem", { name: "第 15 层 · 最深节点" })).toBeAttached();
  const lastDeep = tree.getByRole("treeitem", { name: "第 15 层 · 最深节点", exact: true });
  await expect(lastDeep.locator('[data-slot="ancestor-line"]')).toHaveCount(13);
  await expect(lastDeep.locator('.rain-tree-ancestor-line.is-last')).toHaveCount(12);
  await expect(lastDeep.locator('.rain-tree-connector')).toHaveClass(/is-last/);
  const deepEnd = await lastDeep.locator('[data-slot="ancestor-line"]').evaluateAll((lines) => lines.map((line) => line.getBoundingClientRect().height));
  expect(deepEnd).toEqual([36, ...Array(12).fill(18)]);
  await tree.screenshot({ path: evidenceOutputPath("evidence/runtime/tree/continuous-ancestors-scrolled.png") });
  await query.fill("最深节点");
  await tree.evaluate((element) => { element.scrollTop = element.scrollHeight; element.dispatchEvent(new Event("scroll")); });
  await expect(lastDeep.locator('.rain-tree-ancestor-line.is-last')).toHaveCount(13);
  await query.fill("");
  await tree.getByRole("button", { name: "收起第 8 层 · 目录" }).click();
  await expect(lastDeep).toHaveCount(0);
  const eighth = tree.getByRole("treeitem", { name: "第 8 层 · 目录", exact: true });
  await expect(eighth.locator('.rain-tree-ancestor-line.is-last')).toHaveCount(5);
  await expect(eighth.locator('.rain-tree-connector')).toHaveClass(/is-last/);
  await tree.getByRole("button", { name: "展开第 8 层 · 目录" }).click();
  await tree.evaluate((element) => { element.scrollTop = 360; element.dispatchEvent(new Event("scroll")); });
  await page.setViewportSize({ width: 320, height: 740 });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await tree.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
  await tree.evaluate((element) => { element.scrollLeft = element.scrollWidth; });
  const deepest = await tree.getByRole("treeitem", { name: "第 15 层 · 最深节点" }).locator('[data-slot="title"]').boundingBox();
  const viewport = await tree.boundingBox();
  expect(deepest!.x).toBeGreaterThanOrEqual(viewport!.x);
  expect(deepest!.x + deepest!.width).toBeLessThanOrEqual(viewport!.x + viewport!.width);
  await tree.screenshot({ path: evidenceOutputPath("evidence/runtime/tree/functional-deep-narrow.png") });
  writeFileSync(evidenceOutputPath("evidence/runtime/tree/functional-scale-facts.json"), JSON.stringify({
    build: process.env.TREE_PREVIEW === "1" ? "production-preview" : "development", browser: browser.version(),
    userAgent: await page.evaluate(() => navigator.userAgent), totalNodes: [1000, 10000], depth: 15, thousandDOM,
    tenThousandDOM: await tree.getByRole("treeitem").count(), timingDefinition: "button action to two animation frames; search includes browser input and assertion round trips; one run, not a latency guarantee",
    mount10000Ms, collapseMs, expandMs, revealMs, searchMs,
  }, null, 2));
});

test("keyboard drag commits the same subtree move", async ({ page }) => {
  await page.goto("/#manage-tree");
  const tree = page.getByRole("tree");
  await tree.getByRole("button", { name: "移动课前学习" }).focus();
  await page.keyboard.press("Space");
  await expect(tree.getByRole("treeitem", { name: "课前学习" })).toBeFocused();
  for (let index = 0; index < 3; index++) await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect.poll(async () => {
    const names = await tree.getByRole("treeitem").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("aria-label")));
    return names.indexOf("课前学习") - names.indexOf("课后练习");
  }).toBeGreaterThan(0);
});

test("deep Rich lines stay continuous and label, description and meta follow the reviewed layout", async ({ page }) => {
  await page.goto("/#tree");
  const tree = page.locator(".tree-page__panel--wide .rain-tree");
  const chapter = tree.getByRole("treeitem", { name: "第三章　离散型随机变量及其应用" });
  const section = tree.getByRole("treeitem", { name: "3.1　离散型随机变量" });
  const video = tree.getByRole("treeitem", { name: "离散型随机变量的定义与生活中的典型应用" });
  const discussion = tree.getByRole("treeitem", { name: "寻找一个生活中的随机现象，说明随机变量的定义与取值范围" });
  const quiz = tree.getByRole("treeitem", { name: "分布律巩固练习" });
  const lines = await Promise.all([
    chapter.locator(".rain-tree-outgoing-line"), section.locator(".rain-tree-connector"),
    video.locator(".rain-tree-ancestor-line"), discussion.locator(".rain-tree-ancestor-line"), quiz.locator(".rain-tree-connector"),
  ].map((line) => line.boundingBox()));
  expect(lines.every(Boolean)).toBe(true);
  for (let i = 0; i < lines.length - 1; i++) {
    expect(lines[i]!.x).toBe(lines[i + 1]!.x);
    expect(Math.abs(lines[i]!.y + lines[i]!.height - lines[i + 1]!.y)).toBeLessThanOrEqual(1);
  }
  const layout = await discussion.evaluate((node) => {
    const tag = node.querySelector<HTMLElement>('[data-slot="leading"]')!;
    const title = node.querySelector<HTMLElement>('[data-slot="title"]')!;
    const description = node.querySelector<HTMLElement>('[data-slot="description"]')!;
    const meta = node.querySelector<HTMLElement>('[data-slot="meta"]')!;
    return { tagInsideTitle: title.contains(tag), descriptionX: description.getBoundingClientRect().left,
      titleX: title.getBoundingClientRect().left, metaX: meta.getBoundingClientRect().left, titleRight: title.getBoundingClientRect().right };
  });
  expect(layout.tagInsideTitle).toBe(true);
  expect(layout.descriptionX).toBe(layout.titleX);
  expect(layout.metaX).toBeGreaterThanOrEqual(layout.titleRight);
  await expect(discussion.locator('[data-rain-id="ui-tag"]')).toHaveAttribute("data-color", "magenta");
  await page.screenshot({ path: evidenceOutputPath("evidence/runtime/tree/continuation-tree.png"), fullPage: true });
  await discussion.click();
  await expect(discussion).toHaveAttribute("data-selected", "true");
  await page.locator(".tree-page__panel--wide").screenshot({ path: evidenceOutputPath("evidence/runtime/tree/continuation-rich-selected.png") });
});

test("ManageTree keeps edit controls compact and anchors delete confirmation to its icon", async ({ page }) => {
  await page.goto("/#manage-tree");
  const row = page.getByRole("treeitem", { name: "课前学习" });
  await row.hover();
  await row.getByRole("button", { name: "编辑课前学习" }).click();
  await expect(row.getByRole("button", { name: "编辑课前学习" })).toHaveCount(0);
  await expect(row.getByRole("button", { name: "在课前学习之后添加同级" })).toHaveCount(0);
  await expect(row.getByRole("button", { name: "删除课前学习" })).toHaveCount(0);
  const actions = row.locator('[data-slot="actions"] [data-rain-id="ui-icon-button"]');
  await expect(actions).toHaveCount(2);
  for (const action of await actions.all()) {
    const dimensions = await action.evaluate((button) => ({ control: button.getBoundingClientRect().width,
      icon: button.querySelector<HTMLElement>('[data-slot="icon"]')!.getBoundingClientRect().width }));
    expect(dimensions).toEqual({ control: 24, icon: 14 });
  }
  const alignment = await row.evaluate((node) => {
    const input = node.querySelector<HTMLElement>('[data-rain-id="ui-input"]')!.getBoundingClientRect();
    const control = node.querySelector<HTMLElement>('[data-slot="actions"] button')!.getBoundingClientRect();
    return Math.abs(input.top + input.height / 2 - (control.top + control.height / 2));
  });
  expect(alignment).toBeLessThanOrEqual(1);
  await expect(row.getByRole("button", { name: "清空标题" })).toHaveCount(0);
  await page.screenshot({ path: evidenceOutputPath("evidence/runtime/tree/continuation-manage-edit.png"), fullPage: true });
  await row.getByRole("button", { name: "取消标题" }).click();
  const deleteButton = row.getByRole("button", { name: "删除课前学习" });
  await deleteButton.click();
  const popup = page.getByRole("dialog", { name: "确认删除当前节点及其子节点？" });
  await expect(popup).toBeVisible();
  await expect(page.getByRole("alertdialog")).toHaveCount(0);
  const buttonBox = await deleteButton.boundingBox(), popupBox = await popup.boundingBox();
  expect(buttonBox && popupBox).toBeTruthy();
  expect(popupBox!.y - (buttonBox!.y + buttonBox!.height)).toBeGreaterThanOrEqual(0);
  expect(popupBox!.y - (buttonBox!.y + buttonBox!.height)).toBeLessThan(16);
  expect(Math.abs(popupBox!.x + popupBox!.width - (buttonBox!.x + buttonBox!.width))).toBeLessThan(2);
  await page.screenshot({ path: evidenceOutputPath("evidence/runtime/tree/continuation-manage-delete.png"), fullPage: true });
  await popup.getByRole("button", { name: "确认删除" }).click();
  await expect(page.getByRole("treeitem", { name: "课前学习" })).toHaveCount(0);
});

test("domain fields use one explicit dialog buffer and preserve checks and scroll after save", async ({ page }) => {
  const errors: string[] = []; page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/#manage-tree");
  await page.getByText("章节与知识点 · 领域字段编辑", { exact: true }).click();
  const example = page.locator('[data-domain="knowledge"]'), tree = example.getByRole("tree");
  const first = tree.getByRole("treeitem", { name: "知识点 1 · 样本空间", exact: true });
  await first.hover(); await first.getByRole("button", { name: "编辑知识点 1 · 样本空间" }).click();
  const dialog = page.getByRole("dialog", { name: "编辑知识点" });
  await dialog.getByRole("textbox", { name: "说明", exact: true }).fill("取消的说明");
  await dialog.getByRole("button", { name: "取消编辑" }).click();
  await expect(first).not.toContainText("取消的说明");
  await first.hover(); await first.getByRole("button", { name: "编辑知识点 1 · 样本空间" }).click();
  await dialog.getByRole("textbox", { name: "说明", exact: true }).fill("区分必然事件与不可能事件。");
  await dialog.screenshot({ path: evidenceOutputPath("evidence/runtime/manage-tree/domain-editor.png") });
  await dialog.getByRole("button", { name: "确认编辑" }).click();
  await expect(first).toContainText("区分必然事件与不可能事件。");
  await example.getByRole("button", { name: "添加根节点" }).click();
  const chapterEditor = page.getByRole("dialog", { name: "编辑章节" });
  await expect(chapterEditor.getByRole("combobox")).toHaveCount(0);
  await chapterEditor.getByRole("button", { name: "确认编辑" }).click();
  const added = tree.getByRole("treeitem", { name: "新章节", exact: true });
  await added.locator('[data-slot="checkbox"]').click();
  await tree.evaluate((root) => { root.scrollTop = 130; });
  const before = await tree.evaluate((root) => {
    const top = root.getBoundingClientRect().top;
    const row = [...root.querySelectorAll('[role="treeitem"]')].find((node) => node.getBoundingClientRect().bottom > top)!;
    return { name: row.getAttribute("aria-label")!, offset: row.getBoundingClientRect().top - top };
  });
  await example.getByRole("button", { name: "保存草稿" }).click();
  await expect(example.getByRole("button", { name: "进入编辑" })).toBeVisible();
  await expect(added.getByRole("checkbox")).toBeChecked();
  await expect.poll(async () => tree.getByRole("treeitem", { name: before.name, exact: true }).evaluate((row) => row.getBoundingClientRect().top - row.closest('[role="tree"]')!.getBoundingClientRect().top)).toBeCloseTo(before.offset, 0);
  await expect(example.locator('[data-slot="server-state"]')).toContainText("版本 2");
  await example.screenshot({ path: evidenceOutputPath("evidence/runtime/manage-tree/domain-saved.png") });
  expect(errors).toEqual([]);
});

test("task-only validation and migration-delete keep server data atomic on save failure", async ({ page }) => {
  await page.goto("/#manage-tree");
  await page.getByText("章节与学习任务 · 迁移删除与失败恢复", { exact: true }).click();
  const example = page.locator('[data-domain="task"]'), tree = example.getByRole("tree");
  const chapter = tree.getByRole("treeitem", { name: "第一章　随机事件", exact: true });
  await chapter.hover(); await chapter.getByRole("button", { name: /下添加子级/ }).click();
  const editor = page.getByRole("dialog", { name: "编辑学习任务" });
  await editor.getByRole("button", { name: "确认编辑" }).click();
  await expect(editor.getByRole("alert")).toHaveText("请选择任务类型");
  await editor.getByRole("combobox", { name: "任务类型" }).click();
  await page.getByRole("option", { name: "讨论", exact: true }).click();
  await editor.getByRole("button", { name: "确认编辑" }).click();
  await chapter.hover(); await chapter.getByRole("button", { name: "删除第一章　随机事件" }).click();
  await page.getByRole("button", { name: "确认删除", exact: true }).click();
  await expect(chapter).toHaveCount(0);
  await expect(tree.getByRole("treeitem", { name: "新学习任务", exact: true })).toBeVisible();
  await example.getByRole("button", { name: "下次保存失败：关闭" }).click();
  await example.getByRole("button", { name: "保存草稿" }).click();
  await expect(example.getByRole("status").last()).toContainText("模拟保存失败");
  await expect(example.locator('[data-slot="server-state"]')).toHaveText("已提交版本 1 · 2 个章节");
  await expect(tree.getByRole("treeitem")).toHaveCount(10);
  await example.screenshot({ path: evidenceOutputPath("evidence/runtime/manage-tree/domain-save-failure.png") });
  await example.getByRole("button", { name: "保存草稿" }).click();
  await expect(example.getByRole("button", { name: "进入编辑" })).toBeVisible();
  await expect(example.locator('[data-slot="server-state"]')).toHaveText("已提交版本 2 · 1 个章节");
  await page.setViewportSize({ width: 320, height: 740 });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("custom actions preserve keyboard ownership and empty actions restore the search", async ({ page }) => {
  await page.goto("/#tree");
  await page.getByText("06　节点内容随状态变化", { exact: true }).click();
  const tree = page.getByRole("tree", { name: "自定义状态与空态示例" });
  const video = tree.getByRole("treeitem", { name: "课前视频", exact: true });
  await expect(video.locator('[data-slot="meta"]')).toHaveText("未加入");
  await expect(video.getByRole("button", { name: "加入清单：课前视频" })).toBeVisible();
  await expect(tree.getByRole("treeitem", { name: "指定阅读", exact: true }).locator('[data-slot="meta"]')).toHaveText("不可勾选");
  await video.focus();
  await video.press("F6");
  await expect(video.getByRole("checkbox")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(video.getByRole("button", { name: "加入清单：课前视频" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(video.getByRole("checkbox")).toBeChecked();
  await expect(video).toHaveAttribute("aria-selected", "false");
  await expect(tree.getByRole("treeitem", { name: "课程材料", exact: true }).locator('[data-slot="meta"]')).toHaveText("部分加入");
  await expect(tree.getByRole("button", { name: "加入清单：指定阅读" })).toBeDisabled();
  await video.locator('[data-slot="title"]').click();
  await expect(video).toHaveAttribute("aria-selected", "true");
  await expect(video.getByText("当前行选中", { exact: true })).toBeVisible();
  await expect(video.getByRole("checkbox")).toBeChecked();
  await video.getByRole("button", { name: "移出清单：课前视频" }).click();
  await expect(video.getByRole("checkbox")).not.toBeChecked();
  await expect(video).toHaveAttribute("aria-selected", "true");
  await expect(video.locator('[data-slot="meta"]')).toHaveText("未加入");
  await video.getByRole("button", { name: "加入清单：课前视频" }).click();
  const example = page.locator("details").filter({ has: page.getByText("06　节点内容随状态变化", { exact: true }) });
  await example.screenshot({ path: evidenceOutputPath("evidence/runtime/tree/custom-state-v2-wide.png") });
  await page.setViewportSize({ width: 320, height: 740 });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await example.screenshot({ path: evidenceOutputPath("evidence/runtime/tree/custom-state-v2-narrow.png") });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ forcedColors: "active" });
  await video.getByRole("button").press("Escape");
  await expect(video).toBeFocused();
  await video.press("ArrowDown");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Space");
  await expect(tree.getByRole("checkbox", { name: "勾选延伸阅读" })).toBeChecked();
  await page.emulateMedia({ forcedColors: "none" });
  await tree.screenshot({ path: evidenceOutputPath("evidence/runtime/tree/custom-state-v2-checked.png") });
  const search = page.getByRole("textbox", { name: "搜索自定义示例" });
  await search.fill("没有的材料");
  await expect(tree.getByRole("treeitem")).toHaveCount(0);
  await expect(tree.getByText("未找到匹配的材料")).toBeVisible();
  await tree.getByRole("button", { name: "清空搜索" }).focus();
  await page.keyboard.press("Enter");
  await expect(search).toBeFocused();
  await expect(tree.getByRole("treeitem")).toHaveCount(4);
  await page.getByRole("button", { name: "清空材料" }).click();
  await expect(tree.getByText("还没有课程材料")).toBeVisible();
  await tree.screenshot({ path: evidenceOutputPath("evidence/runtime/tree/custom-empty-v2.png") });
  await tree.getByRole("button", { name: "恢复课程材料" }).click();
  await expect(search).toBeFocused();
  await expect(tree.getByRole("treeitem", { name: "课程材料", exact: true })).toBeVisible();
});

test("repeated subtree moves preserve five-level geometry and last-sibling clearance", async ({ page }) => {
  await page.goto("/#manage-tree");
  const tree = page.getByRole("tree");
  const move = async (source: string, target: string, placement: "inside" | "after", level: number) => {
    const names = await tree.getByRole("treeitem").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("aria-label")));
    await tree.getByRole("button", { name: `移动${source}`, exact: true }).focus();
    await page.keyboard.press("Space");
    const delta = names.indexOf(target) - names.indexOf(source);
    for (let i = 0; i < Math.abs(delta); i++) await page.keyboard.press(delta > 0 ? "ArrowDown" : "ArrowUp");
    if (placement === "inside") await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("Enter");
    const row = tree.getByRole("treeitem", { name: source, exact: true });
    await expect(row).toHaveAttribute("aria-level", String(level));
    await expect(row).toBeFocused();
    await expect(tree.locator('[data-slot="drop-indicator"]')).toHaveCount(0);
    const geometry = await tree.getByRole("treeitem").evaluateAll((nodes) => nodes.map((node) => {
      const row = node.querySelector<HTMLElement>('[data-slot="row"]')!;
      const connector = row.querySelector<HTMLElement>('[data-slot="connector"]');
      const arm = connector && getComputedStyle(connector, "::after");
      const first = row.querySelector<HTMLElement>('.rain-tree-expander, .rain-tree-drag-handle')!;
      const lines = [...row.querySelectorAll<HTMLElement>('[data-slot="connector"], [data-slot="ancestor-line"]')];
      const positions = lines.map((line) => line.getBoundingClientRect().left);
      return { arm: arm ? parseFloat(arm.width) : 12,
        gap: connector ? first.getBoundingClientRect().left - connector.getBoundingClientRect().left - parseFloat(arm!.width) : 4,
        uniqueAxes: new Set(positions).size === positions.length,
        continuous: lines.every((line) => line.classList.contains("is-last") || Math.abs(line.getBoundingClientRect().height - row.getBoundingClientRect().height) < 1) };
    }));
    expect(geometry.every((item) => item.arm === 12 && item.gap === 4 && item.uniqueAxes && item.continuous)).toBe(true);
  };
  await move("第一章　随机事件与概率", "第二章　随机变量", "inside", 2);
  await move("课后练习", "课前学习", "inside", 4);
  await expect(tree.getByRole("treeitem", { name: "古典概型练习" })).toHaveAttribute("aria-level", "5");
  await tree.screenshot({ path: evidenceOutputPath("evidence/runtime/tree/repeated-deep-move.png") });
  await move("课后练习", "课前学习", "after", 3);
  await move("课后练习", "课前学习", "inside", 4);
  await move("课后练习", "课前学习", "after", 3);
  await move("第一章　随机事件与概率", "第二章　随机变量", "after", 1);
  await expect(tree.getByRole("treeitem", { name: "古典概型练习" })).toHaveAttribute("aria-level", "3");
});

test("enhances only interacting Tree rows and restores approved pale colors", async ({ page }) => {
  test.setTimeout(60_000);
  const { contrastRatio } = await import("./color-contrast");
  const approved = JSON.parse(readFileSync("evidence/runtime/tree/readability-facts.json", "utf8")).findings;
  const findings: { theme: string; surface: number; state: string; part: string; color: string; background: string; contrast: number }[] = [];
  for (const theme of ["light", "dark"]) for (const surface of [1, 2]) {
    await page.goto("/#tree");
    await page.evaluate((value) => document.documentElement.setAttribute("data-rain-theme", value), theme);
    // Only vary the host surface; all foreground/state styles come from the component.
    const style = await page.addStyleTag({ content: `.tree-page__panel { background: var(--rain-category-background-neutral-${surface}); }` });
    const panel = page.locator(".tree-page__panel--wide");
    const branch = panel.getByRole("treeitem", { name: "3.1　离散型随机变量", exact: true });
    const measure = async (row: typeof branch, state: string) => {
      const colors = await row.evaluate((node) => {
        const panel = node.closest('.tree-page__panel')!;
        const row = node.querySelector('[data-slot="row"]')!;
        const indicator = node.querySelector('[data-slot="drop-indicator"][data-placement="inside"]');
        const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
        const context = canvas.getContext('2d')!;
        return [...node.querySelectorAll<HTMLElement>('[data-slot="description"], [data-slot="meta"], [data-slot="meta-mobile"], .rain-tree-expander, .rain-tree-drag-handle')].filter(part => part.getBoundingClientRect().height > 0).map(part => {
          context.clearRect(0, 0, 1, 1);
          const layers = [getComputedStyle(panel).backgroundColor, getComputedStyle(row).backgroundColor, getComputedStyle(row, '::before').backgroundColor, ...(indicator ? [getComputedStyle(indicator).backgroundColor] : []), getComputedStyle(part).backgroundColor];
          for (const color of layers) { context.fillStyle = color; context.fillRect(0, 0, 1, 1); }
          const pixel = context.getImageData(0, 0, 1, 1).data;
          return { part: part.dataset.slot ?? (part.classList.contains('rain-tree-expander') ? 'arrow' : 'handle'), color: getComputedStyle(part).color, background: `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})` };
        });
      });
      findings.push(...colors.map(color => ({ theme, surface, state, ...color, contrast: contrastRatio(color.color, color.background) })));
    };
    const leaf = panel.getByRole("treeitem", { name: "分布律巩固练习", exact: true });
    await page.mouse.move(0, 0);
    await measure(branch, "normal");
    await measure(leaf, "normal-meta");
    if (surface === 1) await panel.screenshot({ path: evidenceOutputPath(`evidence/runtime/tree/closeout/interaction-${theme}-idle.png`) });
    await branch.focus(); await measure(branch, "keyboard-focus");
    await page.getByRole("textbox", { name: "搜索节点" }).focus();
    await branch.hover(); await measure(branch, "row-hover");
    await measure(leaf, "normal-other-row");
    await branch.getByRole("button").hover(); await measure(branch, "control-hover");
    await branch.locator('[data-slot="title"]').click(); await measure(branch, "selected");
    await branch.getByRole("button").hover(); await measure(branch, "selected-control-hover");
    if (surface === 1) await panel.screenshot({ path: evidenceOutputPath(`evidence/runtime/tree/closeout/interaction-${theme}-active.png`) });
    await page.getByRole("textbox", { name: "搜索节点" }).focus();
    await leaf.hover(); await measure(leaf, "meta-hover");
    await measure(branch, "normal-restored-selected");
    await page.setViewportSize({ width: 320, height: 740 });
    await leaf.hover(); await measure(leaf, "narrow-meta-hover");
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/#manage-tree");
    const target = page.getByRole("treeitem", { name: "课前学习", exact: true });
    const handle = page.getByRole("button", { name: "移动课后练习", exact: true });
    await handle.focus(); await handle.press("Space");
    // The visible preceding branch is a valid destination. Keyboard navigation owns the drop proposal.
    for (let i = 0; i < 3; i++) await page.keyboard.press("ArrowUp");
    await page.keyboard.press("ArrowLeft");
    await expect(target.locator('[data-slot="drop-indicator"][data-placement="inside"]')).toBeVisible();
    await measure(target, "drop-inside");
    if (surface === 1) await page.getByRole("tree").screenshot({ path: evidenceOutputPath(`evidence/runtime/tree/closeout/interaction-${theme}-drop.png`) });
    await page.keyboard.press("Escape");
    await expect(target.locator('[data-slot="drop-indicator"]')).toHaveCount(0);
    await page.mouse.move(0, 0);
    await measure(target, "normal-after-drop-cancel");
    await style.evaluate(node => (node as HTMLElement).remove());
  }
  writeFileSync(evidenceOutputPath("evidence/runtime/tree/interaction-readability-facts.json"), JSON.stringify({ scope: "actual shared Tree CSS; light/dark and two surfaces; idle colors retained; active and restored states", findings }, null, 2));
  for (const finding of findings.filter(entry => !entry.state.startsWith("normal"))) expect(finding.contrast, JSON.stringify(finding)).toBeGreaterThanOrEqual(["arrow", "handle", "expander", "drag-handle"].includes(finding.part) ? 3 : 4.5);
  for (const finding of findings.filter(entry => entry.state.startsWith("normal"))) {
    const original = approved.find((entry: typeof finding & { candidate: boolean }) => entry.candidate === false && entry.theme === finding.theme && entry.surface === finding.surface && entry.state.startsWith("normal") && (entry.part === finding.part || entry.part === "expander" && finding.part === "drag-handle"))!;
    expect(finding.color, JSON.stringify(finding)).toBe(original.color);
  }
});
