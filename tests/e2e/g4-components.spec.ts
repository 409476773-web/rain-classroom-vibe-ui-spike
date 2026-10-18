import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test } from "@playwright/test";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const evidence = process.env.RAIN_G4_EVIDENCE_DIR ? resolve(process.env.RAIN_G4_EVIDENCE_DIR) : evidenceOutputPath(fileURLToPath(new URL("../../evidence/runtime/g4-review-sizing-2026-10-11/browser/", import.meta.url)));
mkdirSync(evidence, { recursive: true });
const browserErrors = new Map<string, string[]>();

test.beforeEach(({ page }, info) => {
  const errors: string[] = [];
  browserErrors.set(info.testId, errors);
  page.on("pageerror", error => errors.push(`pageerror: ${error.message}`));
  page.on("console", message => { if (message.type() === "error") errors.push(`console: ${message.text()}`); });
});

test.afterEach(({}, info) => {
  const errors = browserErrors.get(info.testId) ?? [];
  writeFileSync(`${evidence}/console-${info.project.name}-${info.line}.json`, JSON.stringify(errors, null, 2));
  expect(errors, "browser console errors and uncaught page errors").toEqual([]);
});

test("catalog links focus G4 headings, copy usable examples and preserve adjacent documentation", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  for (const [id, title, code] of [
    ["typography", "Typography 文字排版", "rain-type-reading-default"],
    ["item", "Item 内容条目", "ItemContent"],
    ["progress", "Progress 任务进度", "ProgressLabel"],
  ] as const) {
    await page.goto("/#components");
    await page.getByRole("link", { name: title, exact: true }).click();
    await expect(page.locator(`#${id}-title`)).toBeFocused();
    await page.getByRole("button", { name: "复制代码", exact: true }).last().click();
    await expect(page.getByText("已复制", { exact: true })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(code);
  }
  for (const id of ["accordion", "spinner", "sheet"]) {
    await page.goto(`/#${id}`);
    await expect(page.locator(`#${id}-title`)).toBeVisible();
    await expect(page.getByRole("heading", { name: "API 与结构", exact: true })).toBeVisible();
  }
});

test("three G4 pages expose examples, API, copyable code, themes and inherited density", async ({ page }, info) => {
  const headingFacts = [];
  for (const id of ["typography", "item", "progress"]) {
    await page.goto(`/#${id}`);
    await expect(page.locator(`#${id}-title`)).toBeVisible();
    await expect(page.getByRole("heading", { name: "API 与结构", exact: true })).toBeVisible();
    const headings = await page.locator(".component-doc__title > h1, main.component-doc h2").evaluateAll(nodes => nodes.map(node => ({
      tag: node.tagName, text: node.textContent, size: getComputedStyle(node).fontSize, line: getComputedStyle(node).lineHeight,
    })));
    headingFacts.push({ id, headings });
    for (const heading of headings) {
      expect.soft(heading.size, `${id}: ${heading.text}`).toBe("16px");
      expect.soft(heading.line, `${id}: ${heading.text}`).toBe("24px");
    }
    await expect(page.locator("pre code").last()).not.toBeEmpty();
    const codeDetails = page.locator(".g4-doc-example-code").first();
    const summary = codeDetails.locator("summary");
    await expect(codeDetails).not.toHaveAttribute("open");
    await summary.focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    await expect(summary).toBeFocused();
    await expect(summary).toHaveCSS("outline-style", "auto");
    await page.keyboard.press("Enter");
    await expect(codeDetails.locator("pre code").first()).toBeVisible();
    await page.keyboard.press("Space");
    await expect(codeDetails).not.toHaveAttribute("open");
    await page.locator(`#${id}-title`).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth), id).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
    await page.screenshot({ path: `${evidence}/${id}-${info.project.name}-light.png`, fullPage: true });
    await page.getByRole("button", { name: "深色", exact: true }).click();
    await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
    await expect(page.locator("main.component-doc")).toHaveAttribute("data-rain-theme", "dark");
    if (id !== "typography") await expect(page.locator(`[data-rain-id="ui-${id}"][data-slot="root"]`).first()).toHaveAttribute("data-density", "compact");
    expect(await page.evaluate(() => document.documentElement.scrollWidth), `${id} dark`).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
    await page.screenshot({ path: `${evidence}/${id}-${info.project.name}-dark-compact.png`, fullPage: true });
    if (id === "item") await page.getByRole("region", { name: "课程资料示例", exact: true }).screenshot({ path: `${evidence}/item-${info.project.name}-dark-compact-scene.png` });
  }
  writeFileSync(`${evidence}/headings-${info.project.name}-facts.json`, JSON.stringify(headingFacts, null, 2));
});

test("Typography uses existing measured roles and separates value from Chinese unit", async ({ page }, info) => {
  await page.goto("/#typography");
  const facts = await page.locator('[data-slot="typography-data-example"]').evaluate(root => {
    const measure = (selector: string) => {
      const node = root.querySelector<HTMLElement>(selector)!;
      const style = getComputedStyle(node);
      return { text: node.textContent, font: style.fontFamily, size: style.fontSize, line: style.lineHeight, weight: style.fontWeight };
    };
    const reading = getComputedStyle(document.querySelector('[aria-label="课程导读示例"]')!);
    const heading = getComputedStyle(document.querySelector('[data-slot="typography-ui-example"] h3')!);
    return { value: measure('[data-slot="value"]'), unit: measure('[data-slot="unit"]'), reading: { font: reading.fontFamily, size: reading.fontSize, line: reading.lineHeight }, heading: { size: heading.fontSize, line: heading.lineHeight }, dataFontCheck: document.fonts.check('28px "LINE Seed JP App_OTF"') };
  });
  writeFileSync(`${evidence}/typography-${info.project.name}-facts.json`, JSON.stringify(facts, null, 2));
  expect.soft(facts.value.size).toBe("28px");
  expect.soft(facts.value.line).toBe("36px");
  expect.soft(facts.heading.size).toBe("16px");
  expect.soft(facts.heading.line).toBe("24px");
  expect(facts.value.font).toContain("LINE Seed JP");
  expect(facts.value.weight).toBe("700");
  expect(facts.unit.size).toBe("14px");
  expect(facts.unit.font).toContain("PingFang SC");
  expect(facts.unit.text).toBe("分");
  expect(facts.reading.size).toBe("15px");
  expect(facts.reading.line).toBe("26px");
});

test("Typography paragraphs keep the registered line heights on actual text nodes", async ({ page }, info) => {
  await page.goto("/#typography");
  await expect(page.locator("#typography-title")).toBeVisible();
  const facts = [];
  for (const [selector, line] of [
    ['[data-slot="typography-ui-example"] p.rain-type-ui-default', "22px"],
    ['.g4-doc-article > p.rain-type-ui-supporting, [data-slot="typography-data-example"] > p.rain-type-ui-supporting', "20px"],
    ['[data-slot="typography-ui-example"] p.rain-type-ui-caption', "20px"],
    ['[aria-label="课程导读示例"] p', "26px"],
  ] as const) {
    const paragraphs = await page.locator(selector).evaluateAll(nodes => nodes.map(node => ({
      text: node.textContent,
      line: getComputedStyle(node).lineHeight,
    })));
    facts.push({ selector, expectedLine: line, paragraphs });
    expect.soft(paragraphs.length, `${selector} has visible examples`).toBeGreaterThan(0);
    for (const paragraph of paragraphs) expect.soft(paragraph.line, `${selector}: ${paragraph.text}`).toBe(line);
  }
  writeFileSync(`${evidence}/typography-${info.project.name}-paragraph-facts.json`, JSON.stringify(facts, null, 2));
  await expect(page.locator(".g4-doc-type-row")).toHaveCount(9);
  for (const [preset, size, line] of [
    ["ui-default", "14px", "22px"], ["ui-compact", "13px", "18px"],
    ["ui-caption", "12px", "20px"], ["ui-supporting", "13px", "20px"],
    ["heading-section", "16px", "24px"], ["heading-page", "16px", "24px"],
    ["reading-small", "14px", "24px"], ["reading-default", "15px", "26px"],
    ["reading-large", "16px", "26px"],
  ] as const) {
    const sample = page.locator(`.g4-doc-type-row > p.rain-type-${preset}`);
    await expect(sample).toHaveCSS("font-size", size);
    await expect(sample).toHaveCSS("line-height", line);
  }
});

test("Typography sizing reaches existing consumers and limits named preset choices", async ({ page }, info) => {
  const facts = [];
  for (const [id, headingId] of [["input", "input-title"], ["select", "select-title"], ["input-number", "input-number-title"], ["tag", "tag-title"]] as const) {
    await page.goto(`/#${id}`);
    const heading = page.locator(`#${headingId}`);
    await expect(heading).toBeVisible();
    const measured = await heading.evaluate(node => ({ size: getComputedStyle(node).fontSize, line: getComputedStyle(node).lineHeight }));
    facts.push({ id, measured });
    expect.soft(measured.size, id).toBe("16px");
    expect.soft(measured.line, id).toBe("24px");
  }
  await page.goto("/#foundations");
  const statistic = page.locator('[data-rain-id="foundation-type-data"]');
  const legacy = await statistic.evaluate(root => {
    const value = getComputedStyle(root.querySelector('[data-slot="statistic-value"]')!);
    const unit = getComputedStyle(root.querySelector('[data-slot="statistic-unit"]')!);
    return { value: { size: value.fontSize, line: value.lineHeight, font: value.fontFamily, weight: value.fontWeight }, unit: { size: unit.fontSize, font: unit.fontFamily } };
  });
  facts.push({ id: "foundations", measured: legacy });
  expect.soft(legacy.value.size).toBe("28px");
  expect.soft(legacy.value.line).toBe("36px");
  expect(legacy.value.font).toContain("LINE Seed JP");
  expect(legacy.value.weight).toBe("700");
  expect(legacy.unit.size).toBe("14px");
  expect(legacy.unit.font).toContain("PingFang SC");

  await page.goto("/#token-foundations");
  const panel = page.locator('[data-rain-id="token-typography-panel"]');
  const preset = panel.getByRole("combobox", { name: "排版方案", exact: true });
  const size = panel.getByRole("combobox", { name: "字号", exact: true });
  const line = panel.getByRole("combobox", { name: "行高", exact: true });
  const sample = panel.getByTestId("typography-live-preview");
  const uiSizes = await size.locator("option").evaluateAll(nodes => nodes.map(node => Number((node as HTMLOptionElement).value)));
  expect(uiSizes).toHaveLength(19);
  expect(uiSizes).toContain(40);
  for (const name of ["heading-page", "heading-section"]) {
    await preset.selectOption(name);
    const choices = await size.locator("option").evaluateAll(nodes => nodes.map(node => Number((node as HTMLOptionElement).value)));
    const measured = await sample.evaluate(node => ({ size: getComputedStyle(node).fontSize, line: getComputedStyle(node).lineHeight }));
    facts.push({ id: name, choices, measured });
    expect.soft(choices, name).toEqual([16, 17, 18]);
    expect.soft(measured.size, name).toBe("16px");
    expect.soft(measured.line, name).toBe("24px");
    for (const selectedSize of ["17", "18"]) {
      await size.selectOption(selectedSize);
      await expect(sample).toHaveCSS("font-size", `${selectedSize}px`);
    }
    await panel.getByRole("button", { name: "恢复完整方案", exact: true }).click();
    await expect.soft(sample).toHaveCSS("font-size", "16px");
  }
  await preset.selectOption("data-default");
  const dataSizes = await size.locator("option").evaluateAll(nodes => nodes.map(node => Number((node as HTMLOptionElement).value)));
  const value = sample.locator('[data-slot="statistic-value"]');
  const measured = await value.evaluate(node => ({ size: getComputedStyle(node).fontSize, line: getComputedStyle(node).lineHeight, weight: getComputedStyle(node).fontWeight }));
  facts.push({ id: "data-default", choices: dataSizes, measured });
  writeFileSync(`${evidence}/typography-consumers-${info.project.name}-facts.json`, JSON.stringify(facts, null, 2));
  expect.soft(Math.max(...dataSizes)).toBe(28);
  expect.soft(dataSizes.every(candidate => candidate <= 28)).toBe(true);
  expect.soft(measured.size).toBe("28px");
  expect.soft(measured.line).toBe("36px");
  expect(measured.weight).toBe("700");
  for (const excluded of [32, 36, 40]) expect(dataSizes).not.toContain(excluded);
  await size.selectOption("24");
  await line.selectOption("32");
  await expect(value).toHaveCSS("font-size", "24px");
  await expect(value).toHaveCSS("line-height", "32px");
  await panel.getByRole("button", { name: "恢复完整方案", exact: true }).click();
  await expect(value).toHaveCSS("font-size", "28px");
  await expect(value).toHaveCSS("line-height", "36px");
  await preset.selectOption("reading-default");
  await size.selectOption("40");
  await expect(sample).toHaveCSS("font-size", "40px");
  await panel.screenshot({ path: `${evidence}/typography-panel-${info.project.name}.png` });
});

test("Item lists aligned readable resources and keeps native keyboard navigation", async ({ page }, info) => {
  await page.goto("/#item");
  const list = page.getByRole("list", { name: "本讲课程资料", exact: true });
  await expect(list.getByRole("listitem")).toHaveCount(3);
  await expect(list.getByRole("button", { name: "课堂讨论任务尚未开放", exact: true })).toBeDisabled();
  const rows = list.locator('[data-rain-id="ui-item"][data-slot="root"]');
  await expect(rows).toHaveCount(3);
  const mediaSizes = await rows.evaluateAll(nodes => nodes.map(root => {
    const media = root.querySelector('[data-slot="media"]')!, icon = media.querySelector('[data-rain-id="icon"]')!;
    const box = media.getBoundingClientRect(), glyph = icon.getBoundingClientRect();
    const probe = document.createElement("span");
    probe.style.backgroundColor = "var(--rain-category-background-neutral-2)";
    media.append(probe);
    const expectedBackground = getComputedStyle(probe).backgroundColor;
    probe.remove();
    return { box: { width: box.width, height: box.height }, icon: { width: glyph.width, height: glyph.height }, asset: icon.getAttribute("data-icon"), hidden: icon.getAttribute("aria-hidden"), background: getComputedStyle(media).backgroundColor, expectedBackground };
  }));
  writeFileSync(`${evidence}/item-${info.project.name}-media-sizes.json`, JSON.stringify(mediaSizes, null, 2));
  for (const media of mediaSizes) {
    expect.soft(media.box).toEqual({ width: 40, height: 40 });
    expect.soft(media.icon).toEqual({ width: 20, height: 20 });
    expect(media.asset).toBe("icon/file");
    expect(media.hidden).toBe("true");
    expect(media.background).toBe(media.expectedBackground);
  }
  const actionSizes = await rows.evaluateAll(nodes => nodes.flatMap(root => {
    const actions = root.querySelector('[data-slot="actions"]')!;
    const read = actions.querySelector("button"), download = actions.querySelector("a[download]");
    if (!read || !download) return [];
    const measure = (node: Element) => {
      const style = getComputedStyle(node), bounds = node.getBoundingClientRect();
      return { fontSize: style.fontSize, lineHeight: style.lineHeight, height: bounds.height, width: bounds.width };
    };
    return [{ title: root.querySelector('[data-slot="title"]')!.textContent, read: measure(read), download: measure(download) }];
  }));
  writeFileSync(`${evidence}/item-${info.project.name}-action-sizes.json`, JSON.stringify(actionSizes, null, 2));
  await page.getByRole("region", { name: "课程资料示例", exact: true }).screenshot({ path: `${evidence}/item-${info.project.name}-scene.png` });
  expect(actionSizes).toHaveLength(2);
  for (const row of actionSizes) {
    for (const key of ["fontSize", "lineHeight"] as const) expect.soft(row.read[key], `${row.title}: ${key}`).toBe(row.download[key]);
    for (const key of ["height", "width"] as const) expect.soft(row.read[key], `${row.title}: ${key}`).toBeCloseTo(row.download[key], 1);
    expect.soft(row.read.fontSize).toBe("14px");
    expect.soft(row.read.lineHeight).toBe("20px");
    expect.soft(row.read.height).toBe(26);
    expect.soft(row.read.width).toBe(40);
  }
  const first = rows.first();
  const layout = await rows.evaluateAll(nodes => nodes.map(root => {
    const content = root.querySelector('[data-slot="content"]')!;
    const title = root.querySelector('[data-slot="title"]')!;
    const bounds = root.getBoundingClientRect(), contentBounds = content.getBoundingClientRect();
    const style = getComputedStyle(title);
    return { rowWidth: bounds.width, contentLeft: contentBounds.left, contentWidth: contentBounds.width,
      titleWidth: title.clientWidth, titleScrollWidth: title.scrollWidth, clamp: style.webkitLineClamp,
      wrap: style.overflowWrap, text: title.textContent };
  }));
  for (const row of layout) {
    expect(row.rowWidth).toBeCloseTo(layout[0]!.rowWidth, 0);
    expect(row.contentLeft).toBeCloseTo(layout[0]!.contentLeft, 0);
    expect(row.contentWidth).toBeGreaterThanOrEqual(120);
    expect(row.titleScrollWidth).toBeLessThanOrEqual(row.titleWidth + 1);
    expect(row.clamp).toBe("none");
    expect(row.wrap).toBe("anywhere");
  }
  writeFileSync(`${evidence}/item-${info.project.name}-layout.json`, JSON.stringify(layout, null, 2));
  const padding = await first.evaluate(node => getComputedStyle(node).paddingTop);
  expect(padding).toBe("16px");
  await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  expect(await first.evaluate(node => getComputedStyle(node).paddingTop)).toBe("12px");
  const link = page.getByRole("link", { name: /文字排版规范/ });
  const navigationIcon = link.locator('[data-slot="media"] > [data-rain-id="icon"]');
  const arrowRightPath = readFileSync(fileURLToPath(new URL("../../packages/ui/src/icons/assets/arrow-right.svg", import.meta.url)), "utf8").match(/\sd="([^"]+)"/)![1]!;
  const iconFacts = [];
  for (const [theme, label] of [["light", "浅色"], ["dark", "深色"]] as const) {
    await page.getByRole("button", { name: label, exact: true }).click();
    const measured = await navigationIcon.evaluate(icon => {
      const probe = document.createElement("span");
      probe.style.color = "var(--rain-category-icon-neutral-3)";
      icon.parentElement!.append(probe);
      const expectedColor = getComputedStyle(probe).color;
      probe.remove();
      return { asset: icon.getAttribute("data-icon"), hidden: icon.getAttribute("aria-hidden"), rendering: icon.getAttribute("data-icon-rendering"), color: getComputedStyle(icon).color, expectedColor, mask: getComputedStyle(icon).maskImage };
    });
    iconFacts.push({ theme, ...measured });
    expect.soft(measured.asset).toBe("icon/arrow-right");
    expect.soft(measured.color).toBe(measured.expectedColor);
    expect(measured.hidden).toBe("true");
    expect(measured.rendering).toBe("svg-mask");
    expect(measured.mask).not.toBe("none");
    expect(decodeURIComponent(measured.mask)).toContain(arrowRightPath);
    await link.screenshot({ path: `${evidence}/item-${info.project.name}-navigation-${theme}.png` });
    await navigationIcon.screenshot({ path: `${evidence}/item-${info.project.name}-arrow-right-${theme}.png` });
  }
  writeFileSync(`${evidence}/item-${info.project.name}-navigation-icon.json`, JSON.stringify(iconFacts, null, 2));
  await page.getByRole("button", { name: "浅色", exact: true }).click();
  await link.focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await expect(link).toBeFocused();
  expect(await link.evaluate(node => getComputedStyle(node).outlineStyle)).toBe("solid");
  await page.screenshot({ path: `${evidence}/item-${info.project.name}-focused-link.png`, fullPage: true });
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#typography$/);
  await expect(page.locator("#typography-title")).toBeFocused();
});

test("Item reading dialogs return focus and native downloads match the readable document", async ({ page }, info) => {
  await page.goto("/#item");
  const list = page.getByRole("list", { name: "本讲课程资料", exact: true });
  const first = list.getByRole("listitem").first();
  const trigger = first.getByRole("button", { name: "阅读课程导读", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "课程导读：从问题到证据", exact: true });
  await expect(dialog).toBeVisible();
  expect(await dialog.evaluate(root => root.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Tab");
  expect(await dialog.evaluate(root => root.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(dialog).toBeVisible();
  const paragraphs = await dialog.locator("article p").allTextContents();
  expect(paragraphs).toHaveLength(3);
  await expect(dialog.locator("article p").first()).toHaveCSS("line-height", "26px");
  await dialog.screenshot({ path: `${evidence}/item-${info.project.name}-reading-dialog.png` });
  await dialog.getByRole("button", { name: "标记已读", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(first.getByText("已读", { exact: true })).toBeVisible();
  await expect(page.getByRole("status").filter({ hasText: "已读 1 / 2 份" })).toBeVisible();
  const downloadEvent = page.waitForEvent("download");
  await first.getByRole("link", { name: "下载课程导读", exact: true }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe("课程导读.md");
  const savedPath = `${evidence}/course-guide-${info.project.name}.md`;
  await download.saveAs(savedPath);
  expect(readFileSync(savedPath, "utf8")).toBe(`# 课程导读：从问题到证据\n\n${paragraphs.join("\n\n")}\n`);
  await expect(page).toHaveURL(/#item$/);
});

test("Progress keeps actual quantities and external pause/error states", async ({ page }, info) => {
  await page.goto("/#progress");
  const task = page.getByRole("region", { name: "资料同步任务", exact: true });
  const controls = page.getByRole("group", { name: "演示控制", exact: true });
  const bar = task.getByRole("progressbar", { name: "资料同步", exact: true });
  expect((await task.boundingBox())!.width).toBeLessThanOrEqual(561);
  await expect(task.getByRole("button")).toHaveCount(1);
  await expect(task.getByRole("button", { name: "暂停同步", exact: true })).toBeVisible();
  await expect(bar).toHaveAttribute("aria-valuenow", "40");
  await controls.getByRole("button", { name: "完成下一批", exact: true }).click();
  await expect(bar).toHaveAttribute("aria-valuenow", "60");
  await task.getByRole("button", { name: "暂停同步", exact: true }).click();
  await expect(controls.getByRole("button", { name: "完成下一批", exact: true })).toBeDisabled();
  await expect(task.getByRole("status")).toContainText("同步已暂停");
  await expect(bar).toHaveAttribute("aria-valuenow", "60");
  await task.getByRole("button", { name: "继续同步", exact: true }).click();
  await controls.getByRole("button", { name: "模拟失败", exact: true }).click();
  await expect(task.getByRole("status")).toContainText("同步中断，请重试");
  await expect(task.getByRole("status")).toContainText("已完成 60 份");
  await expect(controls.getByRole("button", { name: "完成下一批", exact: true })).toBeDisabled();
  await expect(bar).toHaveAttribute("aria-valuenow", "60");
  await task.screenshot({ path: `${evidence}/progress-${info.project.name}-error.png` });
  await task.getByRole("button", { name: "重试同步", exact: true }).click();
  await controls.getByRole("button", { name: "完成下一批", exact: true }).click();
  await controls.getByRole("button", { name: "完成下一批", exact: true }).click();
  await expect(bar).toHaveAttribute("aria-valuenow", "100");
  await expect(bar).toHaveAttribute("data-state", "complete");
  await expect(task.getByRole("status")).toContainText("全部资料已同步");
  await expect(task.getByRole("button")).toHaveCount(0);
  await expect(task.getByRole("link", { name: "查看课程资料", exact: true })).toHaveAttribute("href", "#item");
  await task.screenshot({ path: `${evidence}/progress-${info.project.name}-complete.png` });
  await controls.getByRole("button", { name: "重新开始", exact: true }).click();
  await expect(bar).toHaveAttribute("aria-valuenow", "0");
  const unknown = page.getByRole("progressbar", { name: "正在解析资料", exact: true });
  await expect(unknown).not.toHaveAttribute("aria-valuenow");
  await expect(unknown).toHaveAttribute("data-state", "indeterminate");
  await expect(unknown.locator('[data-slot="progress-value"]')).toHaveCount(0);
  await expect(unknown.locator('[data-slot="progress-track"]')).toBeHidden();
  await expect(unknown.locator('[data-rain-id="ui-spinner"]')).toBeVisible();
  await expect(unknown.locator('[data-rain-id="ui-spinner"]')).toHaveAttribute("aria-hidden", "true");
  expect(await unknown.textContent()).not.toMatch(/\d+%/);
  await expect(page.getByRole("region", { name: "资料解析任务", exact: true })).toContainText("正在识别资料目录");
  const quantity = page.getByRole("progressbar", { name: "批改任务", exact: true });
  await expect(quantity).toHaveAttribute("aria-valuenow", "6");
  await expect(quantity).toHaveAttribute("aria-valuemax", "24");
  await expect(quantity.locator('[data-slot="progress-value"]')).toHaveText("25%");
  const facts = await quantity.evaluate(root => {
    const track = root.querySelector('[data-slot="progress-track"]')!;
    const indicator = root.querySelector('[data-slot="progress-indicator"]')!;
    return { trackWidth: track.getBoundingClientRect().width, indicatorWidth: indicator.getBoundingClientRect().width, trackHeight: track.getBoundingClientRect().height };
  });
  expect(facts.indicatorWidth / facts.trackWidth).toBeCloseTo(0.25, 2);
  expect(facts.trackHeight).toBe(8);
  await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  expect(await quantity.locator('[data-slot="progress-track"]').evaluate(node => node.getBoundingClientRect().height)).toBe(6);
  writeFileSync(`${evidence}/progress-${info.project.name}-facts.json`, JSON.stringify(facts, null, 2));
});

test("reduced motion and forced colors retain progress and native-link meaning", async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  await page.goto("/#progress");
  const bar = page.getByRole("progressbar", { name: "资料同步", exact: true });
  const indicator = bar.locator('[data-slot="progress-indicator"]');
  expect(await indicator.evaluate(node => getComputedStyle(node).transitionDuration)).toBe("0s");
  const paint = await indicator.evaluate(node => getComputedStyle(node).backgroundColor);
  const trackPaint = await bar.locator('[data-slot="progress-track"]').evaluate(node => getComputedStyle(node).backgroundColor);
  expect(paint).not.toBe(trackPaint);
  await page.screenshot({ path: `${evidence}/progress-${info.project.name}-forced-colors.png`, fullPage: true });
  await page.goto("/#item");
  const link = page.getByRole("link", { name: /文字排版规范/ });
  await link.focus();
  const colors = await link.evaluate(root => ({ root: getComputedStyle(root).color, title: getComputedStyle(root.querySelector('[data-slot="title"]')!).color, icon: getComputedStyle(root.querySelector('[data-rain-id="icon"]')!).color, outline: getComputedStyle(root).outlineStyle }));
  writeFileSync(`${evidence}/item-${info.project.name}-forced-colors.json`, JSON.stringify(colors, null, 2));
  expect(colors.title).toBe(colors.root);
  expect(colors.icon).toBe(colors.root);
  expect(colors.outline).toBe("solid");
  await page.screenshot({ path: `${evidence}/item-${info.project.name}-forced-colors.png`, fullPage: true });
});

test("shared documentation retains adjacent Button Group, Spinner and Chart paragraph roles", async ({ page }, info) => {
  const facts = [];
  for (const [id, selector, size, line] of [
    ["button-group", '[role="status"][aria-label="尺寸对照反馈"]', "13px", "20px"],
    ["spinner", ".component-doc__loading-result > p", "13px", "20px"],
    ["chart-line", "[data-chart-default-controls] + p.rain-chart-note", "13px", "20px"],
  ] as const) {
    await page.goto(`/#${id}`);
    await expect(page.locator(`#${id}-title`)).toBeVisible();
    await expect(page.locator(`#${id}-title`)).toHaveCSS("font-size", "16px");
    await expect(page.locator(`#${id}-title`)).toHaveCSS("line-height", "24px");
    const description = page.locator(".component-doc__example > p").first();
    await expect(description).toHaveCSS("line-height", "20px");
    await expect(page.locator(".component-doc__header > p")).toHaveCSS("line-height", "24px");
    if (id === "button-group") {
      await page.getByRole("group", { name: "mini 横向按钮组", exact: true }).getByRole("button", { name: "撤销", exact: true }).click();
      await expect(page.locator(selector)).toContainText("已撤销");
    } else if (id === "spinner") {
      await page.getByRole("button", { name: "完成加载", exact: true }).click();
      await expect(page.locator(selector)).toContainText("已载入 18 份资料");
    } else {
      await page.locator("[data-chart-default-controls]").getByRole("button", { name: "更新数据", exact: true }).click();
      await expect(page.locator(selector)).toContainText("已更新 1 次");
    }
    await expect(page.locator(selector)).toHaveCSS("font-size", size);
    await expect(page.locator(selector)).toHaveCSS("line-height", line);
    const measured = await page.locator(selector).evaluate(node => ({
      size: getComputedStyle(node).fontSize, line: getComputedStyle(node).lineHeight, text: node.textContent,
    }));
    facts.push({ id, selector, expectedSize: size, expectedLine: line, measured });
  }
  writeFileSync(`${evidence}/adjacent-docs-${info.project.name}-facts.json`, JSON.stringify(facts, null, 2));
});
