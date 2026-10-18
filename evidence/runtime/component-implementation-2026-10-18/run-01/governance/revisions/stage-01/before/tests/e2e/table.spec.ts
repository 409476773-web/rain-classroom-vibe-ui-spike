import { test, expect, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

async function setCheckbox(page: Page, name: string, checked: boolean) {
  const input = page.getByRole("checkbox", { name, exact: true });
  if (await input.isChecked() !== checked) await input.locator("..").click();
  await expect(input).toBeChecked({ checked });
}

test.beforeEach(async ({ page }) => {
  page.on("pageerror", error => { throw error; });
  page.on("console", message => { if (message.type() === "error") throw new Error(message.text()); });
  await page.goto("/#table");
  await expect(page).toHaveTitle("Rain Next Foundation Spike");
  await expect(page).toHaveURL(/\/#table$/);
  await expect(page.getByRole("heading", { name: "表格与数据管理", exact: true })).toBeVisible();
  await expect(page.locator("vite-error-overlay")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "取消选择", exact: true })).toHaveCount(0);
});

test("query, pages, sorting, selection and column visibility share one host model", async ({ page }, info) => {
  const clear = page.getByRole("button", { name: "清空筛选", exact: true });
  await expect(clear).toHaveCount(0);
  await setCheckbox(page, "选择 设计方法导论", true);
  await page.getByRole("button", { name: "下一页", exact: true }).click();
  await expect(page.getByText("已选 1 份资料", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "卡片视图", exact: true }).click();
  await page.getByRole("button", { name: "上一页", exact: true }).click();
  await expect(page.getByRole("checkbox", { name: "选择 设计方法导论", exact: true })).toBeChecked();
  await page.getByRole("button", { name: "表格视图", exact: true }).click();
  await page.getByRole("button", { name: "显示列", exact: true }).click();
  await page.getByRole("menuitemcheckbox", { name: "资料类型", exact: true }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("columnheader", { name: "资料类型", exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "卡片视图", exact: true }).click();
  await expect(page.locator('[aria-label="课程资料卡片"]')).toContainText("阅读材料");
  await page.getByRole("button", { name: "表格视图", exact: true }).click();
  await expect(page.getByRole("columnheader", { name: "资料类型", exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "按资料名称排序", exact: true }).click();
  await expect(page.locator('th[aria-sort="ascending"]')).toHaveCount(1);
  await page.getByRole("button", { name: "下一页", exact: true }).click();
  await page.getByRole("textbox", { name: "查找资料", exact: true }).fill("教学案例");
  await expect(clear).toHaveCount(0);
  await page.getByRole("button", { name: "搜索", exact: true }).click();
  await expect(page.locator('.data-table-controls label[data-label-position="inside"]')).toHaveText(["查找资料", "发布状态"]);
  await expect(page.getByRole("cell", { name: "教学案例研读", exact: true })).toBeVisible();
  await expect(page.getByText("已选 0 份资料", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "上一页", exact: true })).toBeDisabled();
  await expect(clear).toBeVisible();
  await expect(clear).toHaveAttribute("data-variant", "text");
  const icon = clear.locator('[data-icon="icon/circle-close-filled"]');
  await expect(icon).toBeVisible();
  await expect(icon).toHaveAttribute("aria-hidden", "true");
  expect(await icon.evaluate(el => getComputedStyle(el).maskImage)).toMatch(/^url\(/);
  const directory = resolve(process.env.RAIN_TABLE_EVIDENCE_DIR ?? "/tmp/rain-table-clear-filters", info.project.name);
  mkdirSync(directory, { recursive: true });
  const toolbarMeasurements = [];
  for (const dark of [false, true]) for (const compact of [false, true]) {
    await setCheckbox(page, "深色主题", dark);
    await setCheckbox(page, "紧凑密度", compact);
    const clearBox = await clear.boundingBox(), selectBox = await page.locator('.data-table-filter [data-rain-id="ui-select"]').boundingBox();
    expect(Math.abs(clearBox!.y + clearBox!.height / 2 - selectBox!.y - selectBox!.height / 2)).toBeLessThanOrEqual(1);
    await expect(clear).toHaveAttribute("data-size", compact ? "compact" : "regular");
    await expect(clear).toHaveCSS("height", compact ? "24px" : "26px");
    toolbarMeasurements.push({ dark, compact, clear: clearBox, select: selectBox, icon: await icon.boundingBox() });
    await page.locator(".data-table-controls").screenshot({ path: resolve(directory, `clear-${dark ? "dark" : "light"}-${compact ? "compact" : "default"}.png`), animations: "disabled" });
  }
  writeFileSync(resolve(directory, "clear-toolbar-measurements.json"), JSON.stringify(toolbarMeasurements, null, 2));
  await clear.click();
  await expect(clear).toHaveCount(0);
  await expect(page.getByRole("textbox", { name: "查找资料", exact: true })).toHaveValue("");
  await expect(page.getByRole("textbox", { name: "查找资料", exact: true })).toBeFocused();
  await expect(page.getByRole("navigation", { name: "分页", exact: true })).toContainText("共 13 条");
  await page.getByRole("combobox", { name: "发布状态", exact: true }).click();
  await page.getByRole("option", { name: "草稿", exact: true }).click();
  await expect(clear).toBeVisible();
  await page.getByRole("button", { name: "下一页", exact: true }).click();
  await clear.click();
  await expect(page.getByRole("combobox", { name: "发布状态", exact: true })).toContainText("全部状态");
  await expect(page.getByRole("button", { name: "上一页", exact: true })).toBeDisabled();
  await expect(clear).toHaveCount(0);
});

test("refresh disables actions, failure preserves selection, retry and both empty states work", async ({ page }, info) => {
  const directory = resolve(process.env.RAIN_TABLE_EVIDENCE_DIR ?? "/tmp/rain-table-empty-reuse", info.project.name);
  mkdirSync(directory, { recursive: true });
  const empty = page.locator('[data-rain-id="ui-empty"]');
  async function checkEmpty(illustration: "empty-search" | "empty-box") {
    await expect(empty).toHaveCount(1);
    await expect(empty.locator('[data-slot="media"]')).toHaveAttribute("data-illustration", illustration);
    for (const dark of [false, true]) {
      await setCheckbox(page, "深色主题", dark);
      await page.getByRole("button", { name: dark ? "卡片视图" : "表格视图", exact: true }).click();
      const image = empty.locator('img:visible');
      await expect(image).toHaveCount(1);
      await expect.poll(() => image.evaluate(el => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 0)).toBe(true);
      await expect(empty.locator('[data-slot="title"]')).toHaveCSS("font-size", "14px");
      await page.locator('.data-table-recipe').screenshot({ path: resolve(directory, `${illustration}-${dark ? "dark-cards" : "light-table"}.png`), animations: "disabled" });
    }
  }
  await setCheckbox(page, "选择当前页可操作资料", true);
  await expect(page.getByText("已选 4 份资料", { exact: true })).toBeVisible();
  await expect(page.getByRole("checkbox", { name: "选择 课堂观察记录", exact: true })).toBeDisabled();
  await page.getByText("试用加载与空数据状态", { exact: true }).click();
  await setCheckbox(page, "下次刷新模拟失败", true);
  await page.getByRole("button", { name: "刷新资料", exact: true }).click();
  await expect(page.getByRole("checkbox", { name: "选择当前页可操作资料", exact: true })).toBeDisabled();
  await expect(page.getByRole("button", { name: "按资料名称排序", exact: true })).toBeDisabled();
  await expect(page.getByRole("button", { name: "更多操作 设计方法导论", exact: true })).toBeDisabled();
  await expect(page.getByRole("alert")).toContainText("刷新失败");
  await expect(page.getByText("已选 4 份资料", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "重试", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("资料已刷新");
  await expect(page.getByRole("alert")).toHaveCount(0);
  await page.getByRole("button", { name: "标为已发布", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("已将 4 份资料标为已发布");
  await page.getByRole("textbox", { name: "查找资料", exact: true }).fill("没有这样的资料");
  await page.getByRole("button", { name: "搜索", exact: true }).click();
  await expect(page.getByRole("heading", { name: "没有找到相关资料", exact: true })).toBeVisible();
  await checkEmpty("empty-search");
  await page.getByRole("button", { name: "刷新资料", exact: true }).click();
  await expect(page.getByRole("button", { name: "清空筛选", exact: true })).toBeDisabled();
  await expect(page.getByRole("button", { name: "清空筛选", exact: true })).toBeEnabled();
  await page.getByRole("button", { name: "清空筛选", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "查找资料", exact: true })).toBeFocused();
  await page.getByRole("button", { name: "预览空数据", exact: true }).click();
  await expect(page.getByRole("heading", { name: "还没有课程资料", exact: true })).toBeVisible();
  await expect(empty.getByRole("button", { name: "添加示例资料", exact: true })).toHaveCSS("height", "28px");
  await checkEmpty("empty-box");
  await expect(page.getByRole("button", { name: "下一页", exact: true })).toBeDisabled();
  await page.getByRole("button", { name: "表格视图", exact: true }).click();
  await page.getByRole("button", { name: "添加示例资料", exact: true }).click();
  await expect(page.getByRole("cell", { name: "设计方法导论", exact: true })).toBeVisible();
  await page.setViewportSize({ width: 320, height: 844 });
  await page.getByRole("textbox", { name: "查找资料", exact: true }).fill("窄屏无结果");
  await page.getByRole("button", { name: "搜索", exact: true }).click();
  const clear = page.getByRole("button", { name: "清空筛选", exact: true });
  const bounds = await clear.boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(16);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(304);
  expect(await empty.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  await page.locator('.data-table-recipe').screenshot({ path: resolve(directory, "empty-search-narrow-320.png"), animations: "disabled" });
});

test("theme, density, keyboard focus and narrow scrolling render using Rain geometry", async ({ page }, info) => {
  const directory = resolve(process.env.RAIN_TABLE_EVIDENCE_DIR ?? "evidence/runtime/table-rn08", info.project.name);
  mkdirSync(directory, { recursive: true });
  const measurements = [];
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const dark of [false, true]) for (const compact of [true, false]) {
    await setCheckbox(page, "深色主题", dark);
    await setCheckbox(page, "紧凑密度", compact);
    await setCheckbox(page, "选择 设计方法导论", true);
    // The shared text button animates theme changes; measure its settled foreground.
    await expect.poll(() => page.locator('thead button [data-slot="label"]').evaluate(el => getComputedStyle(el).color))
      .toBe(dark ? "rgb(148, 156, 184)" : "rgb(86, 104, 143)");
    const result = await page.locator('[data-rain-id="ui-table"]').evaluate(table => {
      const cell = table.querySelector('tbody td:nth-child(2)')!, selected = table.querySelector('tbody tr[data-state="selected"]')!;
      const style = getComputedStyle(cell), root = getComputedStyle(table), row = getComputedStyle(selected);
      const headerText = [...table.querySelectorAll('thead th')].filter(el => el.textContent?.trim()).map(el => {
        const text = el.querySelector('button [data-slot="label"]') ?? el.querySelector("button") ?? el, paint = getComputedStyle(text);
        return { text: text.textContent?.trim(), fontSize: paint.fontSize, lineHeight: paint.lineHeight, fontWeight: paint.fontWeight, color: paint.color };
      });
      const toolbar = [...document.querySelectorAll('.data-table-controls [data-rain-id="ui-input"], .data-table-filter [data-rain-id="ui-select"], .data-table-view button')].map(el => {
        const rect = el.getBoundingClientRect(); return { height: rect.height, top: rect.top, bottom: rect.bottom };
      });
      const labels = [...document.querySelectorAll('.data-table-controls label')].map(el => {
        const bounds = el.getBoundingClientRect(), owner = el.closest('[data-rain-id="ui-input"], [data-slot="frame"]')?.getBoundingClientRect();
        return { text: el.textContent, position: el.getAttribute("data-label-position"), top: bounds.top, bottom: bounds.bottom, left: bounds.left, right: bounds.right,
          frame: owner ? { top: owner.top, bottom: owner.bottom, left: owner.left, right: owner.right } : null };
      });
      return { padding: style.padding, fontFamily: style.fontFamily, fontSize: style.fontSize, lineHeight: style.lineHeight, color: style.color, background: root.backgroundColor, selected: row.backgroundColor,
        headerHeight: table.querySelector('thead tr')!.getBoundingClientRect().height, rowHeight: selected.getBoundingClientRect().height, headerText, toolbar, labels };
    });
    const actions = await page.getByRole("group", { name: "资料操作", exact: true }).evaluate(group => {
      const row = group.getBoundingClientRect();
      return { left: row.left, right: row.right, buttons: [...group.querySelectorAll("button")].map(button => {
        const box = button.getBoundingClientRect(); return { text: button.getAttribute("aria-label") || button.textContent, left: box.left, right: box.right, top: box.top, height: box.height };
      }) };
    });
    expect(actions.buttons.map(button => button.text)).toEqual(["选择规则说明", "刷新资料", "显示列", "取消选择", "标为已发布"]);
    expect(actions.buttons[4]!.right).toBe(actions.right);
    expect(actions.buttons[2]!.right).toBeLessThan(actions.buttons[3]!.left);
    expect(actions.buttons[3]!.right).toBeLessThan(actions.buttons[4]!.left);
    expect(result.padding).toBe(compact ? "8px 16px" : "12px 16px");
    expect(result.fontSize).toBe("14px"); expect(result.lineHeight).toBe("22px"); expect(result.fontFamily).toContain("PingFang SC");
    expect(result.selected).not.toBe("rgba(0, 0, 0, 0)");
    expect(result.headerHeight).toBe(compact ? 32 : 44);
    expect(result.rowHeight).toBe(compact ? 44 : 50);
    for (const header of result.headerText) {
      expect(header.fontSize).toBe("13px"); expect(header.lineHeight).toBe("18px"); expect(header.fontWeight).toBe("400");
      expect(header.color).toBe(dark ? "rgb(148, 156, 184)" : "rgb(86, 104, 143)");
    }
    expect(result.toolbar).toHaveLength(4);
    for (const control of result.toolbar) {
      expect(control.height).toBe(compact ? 28 : 32);
      expect(control.top).toBe(result.toolbar[0]!.top);
      expect(control.bottom).toBe(result.toolbar[0]!.bottom);
    }
    expect(result.labels.map(label => label.text)).toEqual(["查找资料", "发布状态"]);
    for (const label of result.labels) {
      expect(label.position).toBe("inside");
      expect(label.frame).not.toBeNull();
      expect(label.top).toBeGreaterThanOrEqual(label.frame!.top);
      expect(label.bottom).toBeLessThanOrEqual(label.frame!.bottom);
      expect(label.left).toBeGreaterThan(label.frame!.left);
      expect(label.right).toBeLessThan(label.frame!.right);
    }
    expect(result.labels[0]!.top).toBe(result.labels[1]!.top);
    await page.locator("thead tr").hover();
    const headerHover = await page.locator("thead tr").evaluate(el => ({ background: getComputedStyle(el).backgroundColor,
      parent: getComputedStyle(el.parentElement!).backgroundColor, foreground: getComputedStyle(el.querySelector('th:nth-child(3)')!).color }));
    expect(headerHover.background).toBe(dark ? "rgba(86, 106, 181, 0.1)" : "rgba(85, 119, 244, 0.1)");
    expect(headerHover.foreground).toBe(dark ? "rgb(148, 156, 184)" : "rgb(86, 104, 143)");
    await page.locator("tbody tr").nth(1).hover();
    expect(await page.locator("tbody tr").nth(1).evaluate(el => getComputedStyle(el).backgroundColor))
      .toBe(dark ? "rgba(86, 106, 181, 0.1)" : "rgba(85, 119, 244, 0.1)");
    measurements.push({ dark, compact, ...result, headerHover, actions });
    await page.screenshot({ path: resolve(directory, `${dark ? "dark" : "light"}-${compact ? "compact" : "default"}.png`), fullPage: true, animations: "disabled" });
  }
  expect(measurements[0]!.background).not.toBe(measurements[2]!.background);
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const button of await page.getByRole("group", { name: "资料操作", exact: true }).getByRole("button").all()) {
      const box = await button.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(16);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width - 16);
    }
    const cancelBox = await page.getByRole("button", { name: "取消选择", exact: true }).boundingBox();
    const publishBox = await page.getByRole("button", { name: "标为已发布", exact: true }).boundingBox();
    expect(cancelBox!.x + cancelBox!.width).toBeLessThan(publishBox!.x);
    expect(Math.abs(cancelBox!.y + cancelBox!.height / 2 - publishBox!.y - publishBox!.height / 2)).toBeLessThanOrEqual(1);
    const scroll = page.getByRole("region", { name: "课程资料表滚动区", exact: true });
    expect(await scroll.evaluate(element => element.scrollWidth > element.clientWidth)).toBe(true);
    await scroll.focus(); await page.keyboard.press("ArrowRight");
    await expect.poll(() => scroll.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
    await expect(page.getByRole("navigation", { name: "分页", exact: true })).toBeVisible();
    await page.screenshot({ path: resolve(directory, `narrow-${width}.png`), fullPage: true, animations: "disabled" });
  }
  await page.emulateMedia({ forcedColors: "active" });
  const selectedRow = page.locator('tbody tr[data-state="selected"]');
  expect(await selectedRow.evaluate(element => getComputedStyle(element).outlineStyle)).toBe("solid");
  await page.getByRole("region", { name: "课程资料表滚动区", exact: true }).focus();
  await page.keyboard.press("Tab");
  expect(await page.evaluate(() => document.activeElement?.matches(":focus-visible"))).toBe(true);
  await page.getByRole("button", { name: "取消选择", exact: true }).click();
  await expect(page.getByRole("button", { name: "取消选择", exact: true })).toHaveCount(0);
  await expect(page.getByText("已选 0 份资料", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "标为已发布", exact: true })).toBeDisabled();
  writeFileSync(resolve(directory, "measurements.json"), JSON.stringify(measurements, null, 2));
});

test("the independent prototype consumes the same public components and recipe", async ({ page }) => {
  await page.goto(`${process.env.RAIN_TABLE_PROTOTYPE_URL ?? "http://127.0.0.1:5199"}/#materials`);
  await expect(page.locator('[data-rain-id="prototype-materials-consumer"]')).toBeVisible();
  await expect(page.getByRole("table")).toBeVisible();
  await setCheckbox(page, "选择 设计方法导论", true);
  await expect(page.getByText("已选 1 份资料", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "切换深色", exact: true }).click();
  await expect(page.locator('[data-rain-id="prototype-materials-consumer"]')).toHaveAttribute("data-rain-theme", "dark");
});

test("the confirmed pager owns capacity, jump and filtered totals in both table views", async ({ page }) => {
  const nav = page.getByRole("navigation", { name: "分页", exact: true });
  await expect(nav).toHaveAttribute("data-rain-id", "ui-pagination");
  await expect(nav.locator('[data-slot="total"]')).toHaveText("共 13 条");
  await expect(page.getByRole("combobox", { name: "每页数量" })).toHaveCount(0);
  await setCheckbox(page, "选择 设计方法导论", true);
  await nav.getByRole("button", { name: "第 3 页", exact: true }).click();
  await nav.getByRole("button", { name: "分页设置", exact: true }).click();
  await page.getByRole("button", { name: "每页 10 条", exact: true }).click();
  await expect(nav.locator('[aria-current="page"]')).toHaveText("2");
  await expect(page.locator('tbody tr').first()).toContainText("课堂活动设计");
  await expect(page.getByText("已选 1 份资料", { exact: true })).toBeVisible();
  await nav.getByRole("button", { name: "分页设置", exact: true }).click();
  await page.getByRole("textbox", { name: "跳转到页码", exact: true }).fill("1");
  await page.getByRole("textbox", { name: "跳转到页码", exact: true }).press("Enter");
  await expect(page.getByRole("checkbox", { name: "选择 设计方法导论", exact: true })).toBeChecked();
  await page.getByRole("button", { name: "卡片视图", exact: true }).click();
  await expect(nav.getByRole("button", { name: "分页设置", exact: true })).toContainText("10");
  await page.setViewportSize({ width: 320, height: 844 });
  await nav.getByRole("button", { name: "分页设置", exact: true }).click();
  const settings = page.locator('[data-slot="settings"]');
  const bounds = await settings.boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(320);
  await page.getByRole("button", { name: "每页 5 条", exact: true }).click();
  await page.getByRole("button", { name: "表格视图", exact: true }).click();
  await page.getByRole("button", { name: "刷新资料", exact: true }).click();
  await expect(nav).toHaveAttribute("aria-busy", "true");
  await expect(nav.getByRole("button", { name: "下一页", exact: true })).toBeDisabled();
  await nav.getByRole("button", { name: "下一页", exact: true }).dispatchEvent("click");
  await expect(nav.locator('[aria-current="page"]')).toContainText("1");
  await expect(nav).not.toHaveAttribute("aria-busy", "true");
  await page.getByRole("textbox", { name: "查找资料", exact: true }).fill("不存在的资料");
  await page.getByRole("button", { name: "搜索", exact: true }).click();
  await expect(nav.locator('[data-slot="total"]')).toHaveText("共 0 条");
  await expect(nav.getByRole("button", { name: "上一页", exact: true })).toBeDisabled();
  await expect(nav.getByRole("button", { name: "下一页", exact: true })).toBeDisabled();
});

test("cards share fields and menus while only checkboxes select records", async ({ page }) => {
  const more = page.getByRole("button", { name: "更多操作 设计方法导论", exact: true });
  await expect(more).toHaveAttribute("data-tone", "brand");
  await more.click();
  await expect(page.getByRole("menu")).toHaveCSS("width", "140px");
  await page.keyboard.press("Escape");
  const tableTags = await page.locator('tbody tr').first().locator('[data-rain-id="ui-tag"]').evaluateAll(tags => tags.map(tag => [tag.textContent, tag.getAttribute("data-color"), tag.getAttribute("data-appearance")]));
  await page.getByRole("button", { name: "卡片视图", exact: true }).click();
  const card = page.getByRole("article", { name: "设计方法导论", exact: true });
  expect(await card.locator('[data-rain-id="ui-tag"]').evaluateAll(tags => tags.map(tag => [tag.textContent, tag.getAttribute("data-color"), tag.getAttribute("data-appearance")]))).toEqual(tableTags);
  await card.click({ position: { x: 3, y: 3 } });
  await card.getByRole("heading").click();
  await card.getByText("阅读材料", { exact: true }).click();
  await expect(card.getByRole("checkbox")).not.toBeChecked();
  await expect(more).toHaveAttribute("data-rain-id", "ui-icon-button");
  await expect(more.locator('[data-icon="icon/more-horizontal"]')).toBeVisible();
  await more.focus(); await page.keyboard.press("Enter");
  await expect(page.getByRole("menuitem", { name: "查看资料", exact: true })).toBeVisible();
  await expect(page.getByRole("menu")).toHaveCSS("width", "140px");
  await page.keyboard.press("Escape");
  await expect(more).toBeFocused();
  await more.click(); await page.getByRole("menuitem", { name: "查看资料", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("正在查看《设计方法导论》");
  await expect(card.getByRole("checkbox")).not.toBeChecked();
  await page.getByRole("button", { name: "更多操作 课堂观察记录", exact: true }).click();
  await expect(page.getByRole("menuitem", { name: /记录稍后处理/ })).toHaveAttribute("aria-disabled", "true");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("checkbox", { name: "选择 课堂观察记录", exact: true })).toBeDisabled();
  await card.getByRole("checkbox").focus(); await page.keyboard.press("Space");
  await expect(card).toHaveAttribute("data-selected", "true");
  await expect(page.getByRole("checkbox", { name: "选择当前页可操作资料", exact: true })).toHaveAttribute("aria-checked", "mixed");
  await setCheckbox(page, "选择当前页可操作资料", true);
  await expect(page.getByText("已选 4 份资料", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "下一页", exact: true }).click();
  await setCheckbox(page, "选择当前页可操作资料", true);
  await expect(page.getByText("已选 9 份资料", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "上一页", exact: true }).click();
  await setCheckbox(page, "选择当前页可操作资料", false);
  await expect(page.getByText("已选 5 份资料", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "按资料名称排序", exact: true }).click();
  await page.getByRole("menuitemradio", { name: "资料名称 · 升序", exact: true }).click();
  const ids = await page.locator('[aria-label="课程资料卡片"] [data-record-id]').evaluateAll(cards => cards.map(card => card.getAttribute("data-record-id")));
  await page.getByRole("button", { name: "表格视图", exact: true }).click();
  await expect(page.locator('th[aria-sort="ascending"]')).toHaveCount(1);
  expect(await page.locator('tbody tr').evaluateAll(rows => rows.map(row => row.getAttribute("data-record-id")))).toEqual(ids);
  await page.getByRole("button", { name: "卡片视图", exact: true }).click();
  await expect(page.getByRole("button", { name: "按资料名称排序", exact: true })).toContainText("升序");
  await page.getByRole("button", { name: "刷新资料", exact: true }).click();
  await expect(page.getByRole("button", { name: "按资料名称排序", exact: true })).toBeDisabled();
  await expect(page.getByRole("checkbox", { name: "选择当前页可操作资料", exact: true })).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("资料已刷新");
  await expect(page.getByText("已选 5 份资料", { exact: true })).toBeVisible();
});

test("card hierarchy, selected feedback and fixed actions fit themes, densities and long titles", async ({ page }, info) => {
  const directory = resolve(process.env.RAIN_TABLE_EVIDENCE_DIR ?? "/tmp/rain-table-card-parity", info.project.name);
  mkdirSync(directory, { recursive: true });
  const measurements = [];
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole("button", { name: "卡片视图", exact: true }).click();
  await setCheckbox(page, "选择 设计方法导论", true);
  for (const dark of [false, true]) for (const compact of [false, true]) {
    await setCheckbox(page, "深色主题", dark);
    await setCheckbox(page, "紧凑密度", compact);
    const card = page.getByRole("article", { name: "设计方法导论", exact: true });
    const other = page.getByRole("article", { name: "教学案例研读", exact: true });
    const result = await card.evaluate(card => {
      const title = card.querySelector('h3')!, time = card.querySelector('time')!, checkbox = card.querySelector('[data-rain-id="ui-checkbox"]')!, more = card.querySelector('button')!;
      const box = (el: Element) => { const b = el.getBoundingClientRect(); return { x: b.x, y: b.y, width: b.width, height: b.height, right: b.right, bottom: b.bottom }; };
      const text = (el: Element) => { const s = getComputedStyle(el); return { color: s.color, size: s.fontSize, weight: s.fontWeight }; };
      return { bounds: box(card), title: box(title), checkbox: box(checkbox), more: box(more), time: box(time), titleText: text(title), timeText: text(time), background: getComputedStyle(card).backgroundColor };
    });
    expect(result.checkbox.y).toBe(result.title.y);
    expect(result.more.y).toBe(result.title.y);
    expect(result.checkbox.right).toBeLessThan(result.title.x);
    expect(result.title.right).toBeLessThan(result.more.x);
    expect(result.time.x).toBe(result.title.x);
    expect(result.time.y).toBeGreaterThan(result.title.bottom);
    expect(result.titleText).toMatchObject({ size: "16px", weight: "600" });
    expect(result.timeText).toEqual({ size: "13px", weight: "400", color: dark ? "rgb(148, 156, 184)" : "rgb(86, 104, 143)" });
    expect(result.background).not.toBe(await other.evaluate(el => getComputedStyle(el).backgroundColor));
    const contentFlow = await page.locator('[aria-label="课程资料卡片"] [data-record-id]').evaluateAll(cards => cards.map(card => {
      const title = card.querySelector('h3')!.getBoundingClientRect(), tag = card.querySelector('[data-rain-id="ui-tag"]')!.getBoundingClientRect();
      const time = card.querySelector('time')!.getBoundingClientRect(), permission = card.querySelector('p[id$="-locked"]')?.getBoundingClientRect();
      return { id: card.getAttribute("data-record-id"), top: card.getBoundingClientRect().top, height: card.getBoundingClientRect().height,
        titleToTags: tag.top - title.bottom, tagsToTime: time.top - tag.bottom, permissionAfterTime: permission ? permission.top - time.bottom : null };
    }));
    for (const item of contentFlow) {
      expect(item.titleToTags).toBe(12);
      expect(item.tagsToTime).toBe(8);
      if (item.permissionAfterTime !== null) expect(item.permissionAfterTime).toBe(8);
    }
    expect(contentFlow[0]!.top).toBe(contentFlow[1]!.top);
    expect(contentFlow[0]!.height).toBe(contentFlow[1]!.height);
    measurements.push({ dark, compact, ...result, contentFlow });
    await page.locator('.data-table-recipe').screenshot({ path: resolve(directory, `cards-${dark ? "dark" : "light"}-${compact ? "compact" : "default"}.png`), animations: "disabled" });
  }
  await page.getByRole("navigation", { name: "分页", exact: true }).getByRole("button", { name: "第 3 页", exact: true }).click();
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const card of await page.locator('[aria-label="课程资料卡片"] [data-record-id]').all()) {
      const bounds = await card.boundingBox();
      const title = await card.getByRole("heading").boundingBox(), more = await card.getByRole("button").boundingBox();
      expect(bounds!.x).toBeGreaterThanOrEqual(16);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width - 16);
      expect(title!.x + title!.width).toBeLessThan(more!.x);
      expect(title!.y).toBe(more!.y);
      const tag = await card.locator('[data-rain-id="ui-tag"]').first().boundingBox();
      expect(tag!.y - title!.y - title!.height).toBe(12);
      expect(await card.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    }
    await page.locator('.data-table-recipe').screenshot({ path: resolve(directory, `cards-narrow-${width}.png`), animations: "disabled" });
  }
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  const checkbox = page.locator('[aria-label="课程资料卡片"]').getByRole("checkbox").first();
  await checkbox.focus();
  await page.keyboard.press(info.project.name === "webkit" ? "Alt+Tab" : "Tab");
  await expect(page.locator('[aria-label="课程资料卡片"]').getByRole("button").first()).toBeFocused();
  await page.keyboard.press(info.project.name === "webkit" ? "Alt+Shift+Tab" : "Shift+Tab");
  await expect(checkbox).toBeFocused();
  await page.keyboard.press("Space");
  await expect(checkbox).toBeChecked();
  expect(await checkbox.evaluate(el => el.matches(":focus-visible"))).toBe(true);
  writeFileSync(resolve(directory, "card-measurements.json"), JSON.stringify(measurements, null, 2));
});


test("material menus fit content in both themes and narrow cards", async ({ page }, info) => {
  const directory = resolve(process.env.RAIN_TABLE_EVIDENCE_DIR ?? "/tmp/rain-menu-width", info.project.name);
  mkdirSync(directory, { recursive: true });
  await page.getByRole("button", { name: "卡片视图", exact: true }).click();
  for (const dark of [false, true]) for (const width of [1440, 320]) {
    await setCheckbox(page, "深色主题", dark);
    await page.setViewportSize({ width, height: 1000 });
    for (const title of ["设计方法导论", "课堂观察记录"]) {
      await page.getByRole("button", { name: `更多操作 ${title}`, exact: true }).click();
      const menu = page.getByRole("menu");
      await expect(menu).toBeVisible();
      if (title === "设计方法导论") await expect(menu).toHaveCSS("width", "140px");
      const box = (await menu.boundingBox())!;
      expect(box.width).toBeGreaterThanOrEqual(140);
      expect(box.width).toBeLessThanOrEqual(320);
      expect(box.x).toBeGreaterThanOrEqual(8);
      expect(box.x + box.width).toBeLessThanOrEqual(width - 8);
      expect(await menu.evaluate(node => node.scrollWidth - node.clientWidth)).toBeLessThanOrEqual(1);
      if (title === "课堂观察记录") await expect(menu.getByText("只读资料不可修改", { exact: true })).toBeVisible();
      await page.screenshot({ path: resolve(directory, `menu-${dark ? "dark" : "light"}-${width}-${title}.png`) });
      await page.keyboard.press("Escape");
    }
  }
});

test("two toolbar rows keep the primary action fixed across views, filters and selection", async ({ page }, info) => {
  const directory = resolve(process.env.RAIN_TABLE_EVIDENCE_DIR ?? "/tmp/rain-two-row-toolbar", info.project.name);
  mkdirSync(directory, { recursive: true });
  const publish = page.getByRole("button", { name: "标为已发布", exact: true });
  const toolbar = page.locator('.data-table-toolbar');
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const dark of [false, true]) for (const compact of [false, true]) for (const view of ["表格", "卡片"]) {
    await setCheckbox(page, "深色主题", dark);
    await setCheckbox(page, "紧凑密度", compact);
    await page.getByRole("button", { name: `${view}视图`, exact: true }).click();
    await expect(publish).toHaveAttribute("data-variant", "primary");
    await expect(publish).toBeDisabled();
    await expect(toolbar.locator('[data-slot="selected-count"]')).toHaveCount(0);
    await expect(toolbar.locator('[data-slot="result-count"]')).toHaveText("共 13 份资料");
    await expect(page.getByRole("button", { name: "显示列", exact: true })).toHaveCount(view === "表格" ? 1 : 0);
    const before = (await publish.boundingBox())!;
    const top = await toolbar.evaluate(node => {
      const query = node.querySelector('.data-table-query-row')!, actions = node.querySelector('.data-table-actions-row')!;
      const rect = (el: Element) => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, right: r.right, bottom: r.bottom, height: r.height }; };
      return { query: rect(query), actions: rect(actions), view: rect(node.querySelector('.data-table-view')!) };
    });
    expect(top.view.x).toBe(top.query.x);
    expect(top.query.height).toBe(compact ? 28 : 32);
    expect(top.actions.height).toBe(44);
    expect(top.actions.y - top.query.bottom).toBe(12);
    expect(before.x + before.width).toBe(top.actions.right);
    await setCheckbox(page, "选择 设计方法导论", true);
    await expect(page.getByRole("button", { name: "取消选择", exact: true })).toHaveAttribute("data-variant", "tertiary");
    await expect(publish).toBeEnabled();
    expect(await publish.boundingBox()).toEqual(before);
    await page.getByRole("button", { name: "下一页", exact: true }).click();
    await expect(toolbar.getByText("含其他页 1 份", { exact: true })).toBeVisible();
    expect(await publish.boundingBox()).toEqual(before);
    await page.getByRole("button", { name: "取消选择", exact: true }).click();
    await page.getByRole("textbox", { name: "查找资料", exact: true }).fill("教学案例");
    await page.getByRole("button", { name: "搜索", exact: true }).click();
    await expect(toolbar.locator('[data-slot="result-count"]')).toHaveText("筛选结果 1 份");
    await setCheckbox(page, "选择 教学案例研读", true);
    expect(await publish.boundingBox()).toEqual(before);
    await toolbar.screenshot({ path: resolve(directory, `toolbar-${view}-${dark ? "dark" : "light"}-${compact ? "compact" : "default"}.png`) });
    await page.getByRole("button", { name: "清空筛选", exact: true }).click();
  }
  const help = page.getByRole("button", { name: "选择规则说明", exact: true });
  await help.focus(); await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "选择规则", exact: true })).toContainText("翻页或切换视图后");
  await page.keyboard.press("Escape"); await expect(help).toBeFocused();
  const refresh = page.getByRole("button", { name: "刷新资料", exact: true });
  await refresh.focus();
  await expect(page.getByRole("tooltip")).toHaveText("刷新资料");
  expect(await page.getByRole("tooltip").evaluate(node => node.scrollWidth - node.clientWidth)).toBeLessThanOrEqual(1);
  await page.keyboard.press("Escape"); await expect(page.getByRole("tooltip")).toHaveCount(0);
  await page.getByRole("button", { name: "按资料名称排序", exact: true }).click();
  await page.getByRole("menuitemradio", { name: "资料名称 · 降序", exact: true }).click();
  await expect(page.getByRole("button", { name: "按资料名称排序", exact: true })).toContainText("降序");
  await page.getByRole("button", { name: "表格视图", exact: true }).click();
  await expect(page.locator('th[aria-sort="descending"]')).toHaveCount(1);
  await page.getByRole("button", { name: "卡片视图", exact: true }).click();
  await page.getByRole("button", { name: "按资料名称排序", exact: true }).click();
  await expect(page.getByRole("menuitemradio", { name: "资料名称 · 降序", exact: true })).toHaveAttribute("aria-checked", "true");
  await page.getByRole("menuitemradio", { name: "默认顺序", exact: true }).click();
  await setCheckbox(page, "选择 设计方法导论", true);
  for (const width of [1100, 960, 760, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    for (const button of await toolbar.getByRole("button").all()) {
      const b = (await button.boundingBox())!;
      expect(b.x).toBeGreaterThanOrEqual(16);
      expect(b.x + b.width).toBeLessThanOrEqual(width - 16);
    }
    await page.screenshot({ path: resolve(directory, `toolbar-selected-${width}.png`) });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await publish.click();
  await expect(page.getByRole("status")).toContainText("已将 1 份资料标为已发布");
  await expect(publish).toBeDisabled();
  await expect(page.getByRole("button", { name: "取消选择", exact: true })).toHaveCount(0);
});
