import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const routes = ["alert","switch","collapsible","accordion","tooltip","resizable","button-group","toggle","toggle-group","spinner","skeleton","toast","breadcrumb","scroll-area","sheet","sidebar","command","kbd","context-menu","hover-card","menubar","navigation-menu","navigation-tabs","navigation-bar","scope-navigation","navigation-list","object-navigator","segmented-control","connected-surface","workspace"];
const captures = process.env.RAIN_NAVIGATION_EVIDENCE_DIR ? `${process.env.RAIN_NAVIGATION_EVIDENCE_DIR}/g123` : evidenceOutputPath(fileURLToPath(new URL("../../evidence/runtime/g123-playground-2026-10-07/browser/", import.meta.url)));
mkdirSync(captures, { recursive: true });

test("all 30 independent component URLs show their demo, API and copyable code", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  for (const id of routes) {
    await page.goto(`/#${id}`);
    await expect(page.locator(`#${id}-title`)).toBeVisible();
    await expect(page.getByRole("heading", { name: "API 与结构", exact: true })).toBeVisible();
    await expect(page.locator("pre code").first()).not.toBeEmpty();
    await expect(page.getByRole("button", { name: "复制代码", exact: true }).first()).toBeVisible();
    await page.screenshot({ path: `${captures}/${id}-desktop.png`, fullPage: true });
  }
  expect(errors).toEqual([]);
});

test("the component catalog opens lazy documentation with heading focus and clipboard", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/#components");
  await page.getByRole("link", { name: "Accordion 折叠组", exact: true }).click();
  await expect(page.locator("#accordion-title")).toBeFocused();
  await page.getByRole("button", { name: "复制代码", exact: true }).last().click();
  await expect(page.getByText("已复制", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("Accordion");
});

test("all component examples fit a narrow viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const id of routes) {
    await page.goto(`/#${id}`);
    await expect(page.locator(`#${id}-title`)).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth), id).toBeLessThanOrEqual(391);
  }
  await page.screenshot({ path: `${captures}/workspace-narrow.png`, fullPage: true });
});

test("navigation drafts remain with their content and layout actions preserve workspace drafts", async ({ page }) => {
  await page.goto("/#navigation-tabs");
  await page.getByRole("button", { name: "高级组合与异常状态", exact: true }).click();
  const draft = page.getByRole("textbox", { name: "该内容面备注" });
  await draft.fill("资料草稿");
  await page.getByRole("tab", { name: "课堂任务" }).click();
  await expect(draft).toHaveValue("");
  await draft.fill("课堂草稿");
  await page.getByRole("button", { name: "切换为连接工作面样式" }).click();
  await expect(draft).toHaveValue("课堂草稿");
  await page.getByRole("tab", { name: "课程资料" }).click();
  await expect(draft).toHaveValue("资料草稿");
  await page.goto("/#workspace?chapter=2");
  await expect(page.locator("#workspace-title")).toBeVisible();
  const workspaceDraft = page.getByRole("textbox", { name: "宿主草稿" });
  await workspaceDraft.fill("布局操作保留的草稿");
  await page.getByRole("button", { name: "专注主内容" }).click();
  await expect(workspaceDraft).toHaveValue("布局操作保留的草稿");
  await page.getByRole("button", { name: "退出专注" }).click();
  await expect(workspaceDraft).toHaveValue("布局操作保留的草稿");
});

test("recommended objects keep sibling marking separate and show exact two-row activity progress", async ({ page }) => {
  await page.goto("/#object-navigator");
  const queue = page.getByRole("region", { name: "学生批阅", exact: true });
  const note = queue.getByRole("textbox", { name: "批阅备注", exact: true });
  await note.fill("欧阳小明的第 3 题草稿");
  await queue.getByRole("button", { name: "标记 林晓", exact: true }).click();
  await expect(queue.getByRole("button", { name: "欧阳小明", exact: true })).toHaveAttribute("aria-pressed", "true");
  await queue.getByRole("button", { name: "林晓", exact: true }).click();
  await queue.getByRole("button", { name: "欧阳小明", exact: true }).click();
  await expect(note).toHaveValue("欧阳小明的第 3 题草稿");
  await queue.getByRole("button", { name: "陈一诺", exact: true }).click();
  await expect(queue.getByRole("spinbutton", { name: "得分", exact: true })).toBeDisabled();
  await expect(queue.getByRole("button", { name: "保存评分", exact: true })).toBeDisabled();
  const activities = page.getByRole("region", { name: "课堂活动", exact: true });
  const progress = activities.getByRole("progressbar");
  expect(await progress.evaluateAll(items => items.map(item => item.getAttribute("aria-valuenow")))).toEqual(["75", "100", "37.5"]);
  const facts = await activities.locator('[data-slot="entry"]').evaluateAll(entries => entries.map(entry => {
    const metadata = entry.querySelector<HTMLElement>('[data-slot="metadata"]')!, info = metadata.querySelector<HTMLElement>(".object-recipe__activity-meta > span")!, bar = metadata.querySelector<HTMLElement>(".object-recipe__activity-progress")!;
    return { width: entry.getBoundingClientRect().width, metadataHeight: metadata.getBoundingClientRect().height, sameRow: Math.abs(info.getBoundingClientRect().top - bar.getBoundingClientRect().top) <= 2, extraProgress: Boolean(entry.querySelector('[data-slot="progress"]')) };
  }));
  facts.forEach(fact => { expect(fact.sameRow).toBe(true); expect(fact.extraProgress).toBe(false); expect(fact.metadataHeight).toBeLessThanOrEqual(20); });
  writeFileSync(`${captures}/object-progress-geometry.json`, JSON.stringify(facts, null, 2));
  const previews = page.getByRole("region", { name: "讲稿预览", exact: true });
  await previews.getByRole("button", { name: "课堂小结", exact: true }).click();
  await expect(previews.getByRole("img", { name: "当前讲稿：课堂小结", exact: true })).toBeVisible();
  expect(await previews.getByRole("img", { name: "当前讲稿：课堂小结", exact: true }).evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 1000)).toBe(true);
});

test("narrow Scope searches hidden classes and focuses the accepted scope without replacing the shared editor", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#scope-navigation");
  const scene = page.getByRole("region", { name: "课程范围内容", exact: true }), note = scene.getByRole("textbox", { name: "范围教学备注", exact: true });
  await note.fill("公共资源草稿");
  const editor = await note.elementHandle();
  const trigger = scene.getByRole("button", { name: "更多班级", exact: true });
  await expect(trigger).toContainText("9");
  await trigger.click();
  const popup = page.locator(".rain-navigation-scope-dropdown");
  await popup.getByRole("textbox", { name: "搜索范围", exact: true }).fill("5 班");
  await popup.getByRole("button", { name: /高等数学 5 班/ }).click();
  const selected = scene.getByRole("tab", { name: "高等数学 5 班", exact: true });
  await expect(selected).toBeFocused();
  await expect(selected).toHaveAttribute("aria-selected", "true");
  expect(await selected.locator('.rain-tabs__label > span').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  await expect(note).toHaveValue("");
  expect(await editor!.evaluate(element => element.isConnected)).toBe(true);
  await trigger.click();
  await popup.getByRole("textbox", { name: "搜索范围", exact: true }).fill("10 班");
  await popup.getByRole("button", { name: /高等数学 10 班/ }).click();
  const tenth = scene.getByRole("tab", { name: "高等数学 10 班", exact: true });
  await expect(tenth).toHaveAttribute("aria-selected", "true");
  expect(await tenth.locator('.rain-tabs__label > span').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  await scene.getByRole("tab", { name: "公共资源包", exact: true }).click();
  await expect(note).toHaveValue("公共资源草稿");
  await page.screenshot({ path: `${captures}/scope-narrow-selected.png`, fullPage: true });
});

test("course workspace keeps its main geometry and draft through narrow peek, unfit pin and wide recovery", async ({ page }) => {
  await page.goto("/#workspace");
  const scene = page.getByRole("region", { name: "课程资料编辑", exact: true });
  const note = scene.getByRole("textbox", { name: "教学备注", exact: true });
  await expect(note).toBeVisible();
  const noteBox = (await note.boundingBox())!, mainBox = (await scene.locator('.workspace-recipe__main').boundingBox())!;
  expect(noteBox.y + noteBox.height).toBeLessThanOrEqual(mainBox.y + mainBox.height);
  await note.fill("按资料 ID 保留的函数讲义备注");
  const editor = await note.elementHandle();
  await scene.getByRole("treeitem", { name: "1.2 极限的直观理解", exact: true }).click();
  await expect(note).toHaveValue("");
  await scene.getByRole("treeitem", { name: "1.1 函数的定义与表示", exact: true }).click();
  await expect(note).toHaveValue("按资料 ID 保留的函数讲义备注");
  await page.setViewportSize({ width: 390, height: 844 });
  const directory = scene.locator('[data-region-id="directory"][data-side="start"]'), main = scene.locator(".workspace-recipe__main");
  await expect(directory).toBeHidden();
  await main.evaluate(el => { el.scrollTop = Math.min(120, el.scrollHeight - el.clientHeight); });
  const geometry = () => main.evaluate(el => { const rect = el.getBoundingClientRect(); return { x: rect.x, width: rect.width, scroll: el.scrollTop }; });
  const before = await geometry();
  const restore = scene.locator('[data-workspace-action="restore"][aria-controls$="-workspace-directory"]');
  await restore.click();
  await expect(directory).toHaveAttribute("data-temporary", "true");
  expect((await directory.boundingBox())!.height).toBeLessThanOrEqual(380);
  await directory.getByRole("button", { name: "固定课程目录", exact: true }).click();
  await expect(directory).toHaveAttribute("data-temporary", "true");
  await expect(directory).toHaveAttribute("data-mode", "hidden");
  const during = await geometry();
  expect(during).toEqual(before);
  await page.screenshot({ path: `${captures}/workspace-narrow-peek.png`, fullPage: true });
  await page.keyboard.press("Escape");
  await expect(directory).toBeHidden();
  await expect(restore).toBeFocused();
  await expect(note).toHaveValue("按资料 ID 保留的函数讲义备注");
  await page.setViewportSize({ width: 1390, height: 900 });
  await expect(directory).toBeVisible();
  expect(await editor!.evaluate(element => element.isConnected)).toBe(true);
  await expect(note).toHaveValue("按资料 ID 保留的函数讲义备注");
  writeFileSync(`${captures}/workspace-peek-geometry.json`, JSON.stringify({ before, during }, null, 2));
});

test("native course and work-area destinations follow history and keep query focus in their scenes", async ({ page, context }) => {
  for (const destination of [{ id: "navigation-bar", scene: "课程目的地演示", initial: "resources", first: "课程总览", firstId: "overview", second: "学习报告", secondId: "report", defaultLabel: "教学内容" }, { id: "navigation-list", scene: "教师课程导航", initial: "courses", first: "工作台", firstId: "overview", second: "资源库", secondId: "resources", defaultLabel: "我的课程" }]) {
    await page.goto(`/#${destination.id}?view=${destination.initial}`);
    const scene = page.getByRole("region", { name: destination.scene, exact: true });
    const first = scene.getByRole("link", { name: destination.first, exact: true }), second = scene.getByRole("link", { name: destination.second, exact: true });
    await first.click(); await expect(page).toHaveURL(new RegExp(`view=${destination.firstId}$`));
    await expect(first).toHaveAttribute("aria-current", "page"); await expect(first).toBeFocused();
    await second.click(); await expect(page).toHaveURL(new RegExp(`view=${destination.secondId}$`));
    await page.goBack(); await expect(first).toHaveAttribute("aria-current", "page");
    await page.goForward(); await expect(second).toHaveAttribute("aria-current", "page");
    await page.reload(); await expect(second).toHaveAttribute("aria-current", "page");
    const popupEvent = context.waitForEvent("page");
    await first.click({ modifiers: ["ControlOrMeta"] });
    const popup = await popupEvent; await popup.waitForLoadState();
    await expect(popup).toHaveURL(new RegExp(`view=${destination.firstId}$`));
    await expect(page).toHaveURL(new RegExp(`view=${destination.secondId}$`)); await popup.close();
    await page.goto(`/#${destination.id}?view=invalid`);
    await expect(scene.getByRole("link", { name: destination.defaultLabel, exact: true })).toHaveAttribute("aria-current", "page");
  }
});

test("exercise Tabs keep manual activation while their single marker moves and respects reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#navigation-tabs");
  const scene = page.getByRole("region", { name: "第一章随堂练习", exact: true }), current = scene.getByRole("tab", { name: "提交情况", exact: true }), history = scene.getByRole("tab", { name: "批阅记录", exact: true });
  await current.focus(); await page.keyboard.press("ArrowRight");
  await expect(history).toBeFocused(); await expect(current).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("Enter"); await expect(history).toHaveAttribute("aria-selected", "true");
  const marker = scene.locator(".switching-recipe__tab-marker");
  const alignment = () => scene.evaluate(el => { const line = el.querySelector(".switching-recipe__tab-marker")!.getBoundingClientRect(), label = el.querySelector('.rain-tabs__tab[aria-selected="true"] .rain-tabs__label')!.getBoundingClientRect(); return Math.abs(line.x + line.width / 2 - label.x - label.width / 2); });
  await expect.poll(alignment).toBeLessThan(1); await expect(marker).toHaveCount(1);
  await current.click();
  const animations = await marker.evaluate(async el => { await new Promise<void>(resolve => requestAnimationFrame(() => resolve())); return el.getAnimations().map(animation => ({ type: animation.constructor.name, duration: animation.effect?.getTiming().duration })); });
  expect(animations.some(animation => animation.type === "CSSTransition" && Number(animation.duration) > 0)).toBe(true);
  await scene.getByRole("tab", { name: "题目内容", exact: true }).click(); await history.click(); await current.click();
  await expect.poll(alignment).toBeLessThan(1);
  await page.setViewportSize({ width: 390, height: 844 }); await expect.poll(alignment).toBeLessThan(1);
  await page.emulateMedia({ reducedMotion: "reduce" }); await history.click(); await expect.poll(alignment).toBeLessThan(1);
  expect(await marker.evaluate(el => getComputedStyle(el).transitionDuration)).toBe("0s");
  expect(await history.locator(".rain-tabs__label").evaluate(el => getComputedStyle(el, "::after").display)).toBe("none");
  writeFileSync(`${captures}/tabs-motion-facts.json`, JSON.stringify({ animations, reducedDuration: "0s", markerCount: await marker.count() }, null, 2));
  await page.screenshot({ path: `${captures}/tabs-selected-focused.png`, fullPage: true });
});

test("native segmented arrows preserve the current grading identity and score across traversal axes", async ({ page }) => {
  await page.goto("/#segmented-control");
  const scene = page.getByRole("region", { name: "批阅顺序演示", exact: true }), note = scene.getByRole("textbox", { name: "批阅备注", exact: true }), score = scene.getByRole("spinbutton", { name: "得分", exact: true });
  const tray = scene.locator('.segmented-recipe__axis [data-slot="items"]');
  expect(parseFloat(await tray.evaluate(el => getComputedStyle(el, '::before').transitionDuration))).toBeGreaterThan(0);
  await note.fill("欧阳小明第 3 题未保存备注");
  await scene.getByRole("radio", { name: "按人", exact: true }).focus(); await page.keyboard.press("ArrowRight");
  await expect(scene.getByRole("radio", { name: "按题", exact: true })).toBeChecked();
  await expect.poll(() => tray.evaluate(el => new DOMMatrixReadOnly(getComputedStyle(el, '::before').transform).m41)).toBeGreaterThan(70);
  await expect(note).toHaveValue("欧阳小明第 3 题未保存备注"); await expect(score).toHaveValue("7");
  await scene.getByRole("button", { name: "第 1 题 · 函数的概念", exact: true }).click();
  await expect(score).toHaveValue(""); await expect(scene.getByRole("button", { name: "保存评分", exact: true })).toBeDisabled();
  await score.fill("9"); await note.fill("欧阳小明第 1 题备注");
  await scene.getByRole("radio", { name: "按题", exact: true }).focus(); await page.keyboard.press("ArrowLeft");
  await expect(scene.getByRole("button", { name: "欧阳小明", exact: true })).toHaveAttribute("aria-pressed", "true");
  await scene.getByRole("button", { name: "李梦", exact: true }).click(); await expect(score).toHaveValue("");
  await scene.getByRole("button", { name: "欧阳小明", exact: true }).click(); await expect(score).toHaveValue("9"); await expect(note).toHaveValue("欧阳小明第 1 题备注");
  await scene.getByRole("button", { name: "保存评分", exact: true }).click(); await expect(scene.getByRole("status")).toHaveText("评分已在本地保存");
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await tray.evaluate(el => getComputedStyle(el, '::before').transitionDuration)).toBe('0s');
  await page.screenshot({ path: `${captures}/segmented-after-traversal.png`, fullPage: true });
});

test("exercise marker stays in the selected label at 200 percent CSS zoom", async ({ page }) => {
  await page.setViewportSize({ width: 780, height: 1100 });
  await page.goto("/#navigation-tabs");
  await page.evaluate(() => { document.body.style.zoom = "2"; });
  const scene = page.getByRole("region", { name: "第一章随堂练习", exact: true });
  const alignment = () => scene.evaluate(el => {
    const marker = el.querySelector(".switching-recipe__tab-marker")!.getBoundingClientRect(), label = el.querySelector('.rain-tabs__tab[aria-selected="true"] .rain-tabs__label')!.getBoundingClientRect();
    return { centerError: Math.abs(marker.x + marker.width / 2 - label.x - label.width / 2), bottomError: Math.abs(marker.bottom - label.bottom), width: marker.width };
  });
  for (const name of ["批阅记录", "题目内容", "提交情况"]) {
    await scene.getByRole("tab", { name, exact: true }).click();
    await expect.poll(async () => (await alignment()).centerError).toBeLessThan(1);
    await expect.poll(async () => (await alignment()).bottomError).toBeLessThan(2);
  }
  const facts = await alignment(); expect(facts.width).toBe(48);
  writeFileSync(`${captures}/tabs-zoom-marker-facts.json`, JSON.stringify(facts, null, 2));
  await page.screenshot({ path: `${captures}/tabs-zoom-200-selected.png`, fullPage: true });
});

test("all eight recommended scenes fit dark narrow and 200 percent zoom layouts", async ({ page }) => {
  const ids = ["object-navigator", "scope-navigation", "connected-surface", "navigation-list", "workspace", "navigation-tabs", "navigation-bar", "segmented-control"];
  const facts = [];
  await page.setViewportSize({ width: 390, height: 844 });
  for (const id of ids) {
    await page.goto(`/#${id}`); await page.getByRole("button", { name: "深色", exact: true }).click();
    await expect(page.locator(`[data-demo-component="${id}"]`)).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth), id).toBeLessThanOrEqual(391);
    await page.screenshot({ path: `${captures}/${id}-dark-narrow.png`, fullPage: true });
    await page.setViewportSize({ width: 780, height: 1100 });
    await page.evaluate(() => { document.body.style.zoom = "2"; });
    await page.waitForTimeout(250);
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width, `${id} at 200%`).toBeLessThanOrEqual(781);
    facts.push({ id, viewport: 780, zoom: 2, documentWidth: width });
    await page.screenshot({ path: `${captures}/${id}-dark-zoom-200.png`, fullPage: true });
    await page.evaluate(() => { document.body.style.zoom = ""; }); await page.setViewportSize({ width: 390, height: 844 });
  }
  writeFileSync(`${captures}/dark-zoom-facts.json`, JSON.stringify(facts, null, 2));
});

test("context menu keyboard access follows the same engine and returns focus", async ({ page }) => {
  await page.goto("/#context-menu");
  const trigger = page.locator('[data-demo-component="context-menu"] [data-rain-id="ui-context-menu"][data-slot="trigger"]');
  await trigger.focus();
  await page.keyboard.press("Shift+F10");
  await expect(page.getByRole("menuitem").first()).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("dark portaled Sheet preserves its theme and the trigger receives focus on closing", async ({ page }) => {
  await page.goto("/#sheet");
  await page.getByRole("button", { name: "深色", exact: true }).click();
  const trigger = page.getByRole("button", { name: "打开资料详情", exact: true });
  await trigger.click();
  const popup = page.locator('[data-rain-id="ui-sheet"][data-slot="content"]');
  await expect(popup).toBeVisible();
  expect(await popup.evaluate(el => el.closest<HTMLElement>("[data-rain-theme]")?.dataset.rainTheme)).toBe("dark");
  expect(await popup.evaluate(el => getComputedStyle(el).backgroundColor)).toBe("rgb(30, 36, 59)");
  await page.screenshot({ path: `${captures}/sheet-dark-open.png`, fullPage: true });
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("dark portaled Scope results use readable theme text and restore trigger focus", async ({ page }) => {
  await page.goto("/#scope-navigation");
  await page.getByRole("button", { name: "深色", exact: true }).click();
  const scene = page.getByRole("region", { name: "课程范围内容", exact: true });
  const trigger = scene.getByRole("button", { name: /更多/ });
  await trigger.click();
  const popup = page.locator(".rain-navigation-scope-dropdown");
  await expect(popup).toBeVisible();
  expect(await popup.evaluate(el => el.closest<HTMLElement>("[data-rain-theme]")?.dataset.rainTheme)).toBe("dark");
  const paint = await popup.locator(".rain-scope-navigation__result:not([aria-pressed='true'])").first().evaluate(el => {
    const style = getComputedStyle(el);
    const probe = document.createElement("span");
    probe.style.color = "var(--rain-category-text-neutral-1)";
    el.append(probe);
    const expected = getComputedStyle(probe).color;
    probe.remove();
    return { current: style.color, expected };
  });
  expect(paint.current).toBe(paint.expected);
  const current = popup.getByRole("button", { name: /公共资源包/ });
  expect(await current.evaluate(el => getComputedStyle(el).color)).toBe(paint.expected);
  const hovered = popup.getByRole("button", { name: /高等数学 1 班/ });
  await hovered.hover();
  expect(await hovered.evaluate(el => getComputedStyle(el).color)).toBe(paint.expected);
  await page.screenshot({ path: `${captures}/scope-dark-popup.png`, fullPage: true });
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});
