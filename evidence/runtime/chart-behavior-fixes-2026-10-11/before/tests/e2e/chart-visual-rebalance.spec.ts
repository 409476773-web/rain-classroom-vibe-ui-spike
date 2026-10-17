import { expect, test } from "@playwright/test";

test("Sunburst text entry retains the Rain text Button styles inside its chart host", async ({ page }) => {
  await page.goto("/#chart-sunburst");
  const entry = page.locator('[data-rain-id="chart-sunburst"]').getByRole("button", { name: "查看基础课程", exact: true });
  await expect(entry).toBeVisible();
  const styles = await entry.evaluate(button => {
    const control = button.cloneNode(true) as HTMLElement;
    control.setAttribute("aria-hidden", "true");
    control.style.position = "fixed";
    control.style.left = "-10000px";
    document.body.append(control);
    const reading = (node: Element) => {
      const css = getComputedStyle(node);
      return { borderWidth: css.borderTopWidth, background: css.backgroundColor, padding: [css.paddingTop, css.paddingRight, css.paddingBottom, css.paddingLeft], fontSize: css.fontSize, fontFamily: css.fontFamily, fontWeight: css.fontWeight, lineHeight: css.lineHeight };
    };
    const actual = reading(button);
    const reference = reading(control);
    control.remove();
    return { actual, reference };
  });
  expect(styles.actual).toEqual(styles.reference);
});

test("native TrendLegend keeps its borderless transparent reading style", async ({ page }) => {
  await page.goto("/#chart-line");
  const card = page.locator('[data-chart-variant="line-trio-brush"]');
  await card.scrollIntoViewIfNeeded();
  const legendEntry = card.locator(".rain-chart-legend-button").first();
  await expect(legendEntry).toBeVisible();
  const style = await legendEntry.evaluate(node => {
    const css = getComputedStyle(node);
    return {
      borderWidth: css.borderTopWidth,
      background: css.backgroundColor,
      padding: [css.paddingTop, css.paddingRight, css.paddingBottom, css.paddingLeft],
      expectedPadding: ["--rain-space-6", "--rain-space-8", "--rain-space-6", "--rain-space-8"].map(name => css.getPropertyValue(name).trim()),
    };
  });
  expect(style.borderWidth).toBe("0px");
  expect(style.background).toBe("rgba(0, 0, 0, 0)");
  expect(style.padding).toEqual(style.expectedPadding);
});

for (const width of [1440, 390]) {
  test(`Sunburst parent navigation remains operable with Enter and Space at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/#chart-sunburst");
    const host = page.locator('[data-rain-id="chart-sunburst"]');
    const course = host.getByRole("button", { name: "查看基础课程", exact: true });
    await course.focus();
    await course.press("Enter");
    const back = host.getByRole("link", { name: "返回学习内容", exact: true });
    await expect(back).toBeFocused();
    await expect(host.getByRole("group", { name: /当前层级/ })).toContainText("视频");
    await back.press("Enter");
    await expect(course).toBeFocused();
    await course.press("Space");
    await expect(back).toBeFocused();
    await back.press("Enter");
    await expect(course).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  });

  test(`chart operations and the progressive interface reference remain keyboard operable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/#chart-line");
    const controls = page.locator("[data-chart-default-controls]");
    const palette = controls.getByRole("combobox", { name: "视觉配方", exact: true });
    await palette.focus();
    await palette.selectOption("monochrome-blue");
    const update = controls.getByRole("button", { name: "更新数据", exact: true });
    for (let count = 0; count < 8 && !await update.evaluate(node => node === document.activeElement); count++) await page.keyboard.press("Tab");
    await expect(update).toBeFocused();
    await update.press("Enter");
    await expect(page.getByRole("status").filter({ hasText: "示例数据 · 已更新 1 次" }).first()).toBeVisible();
    await page.keyboard.press("Tab");
    const replay = controls.getByRole("button", { name: "重播动效", exact: true });
    await expect(replay).toBeFocused();
    await replay.press("Space");
    await expect(replay).toBeFocused();
    const reference = page.locator(".component-doc__reference");
    const interfaceSummary = page.locator("summary").filter({ hasText: /^接口与调用示例$/ });
    await expect(reference).toBeHidden();
    await interfaceSummary.focus();
    await interfaceSummary.press("Enter");
    await expect(reference.getByRole("heading", { name: "API 与结构", exact: true })).toBeVisible();
    await expect(reference.getByRole("button", { name: "复制代码", exact: true })).toBeVisible();
    await interfaceSummary.press("Enter");
    await expect(reference).toBeHidden();
    await expect(interfaceSummary).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  });
}

test("variant updates, replay and downloadable source retain the current state", async ({ page }) => {
  await page.goto("/#chart-bar");
  const card = page.locator('[data-chart-variant="bar-default"]');
  await card.scrollIntoViewIfNeeded();
  await expect(card.locator('[data-ready="true"]')).toBeVisible();
  const update = card.getByRole("button", { name: "更新数据", exact: true });
  await update.focus();
  await update.press("Enter");
  await expect(card.getByRole("status").filter({ hasText: "已更新 1 次" })).toBeVisible();
  await page.keyboard.press("Tab");
  const replay = card.getByRole("button", { name: "重播动效", exact: true });
  await expect(replay).toBeFocused();
  await replay.press("Space");
  const source = card.locator("details.rain-chart-source");
  await source.locator("summary").focus();
  await source.locator("summary").press("Enter");
  await expect(source.locator("pre")).toContainText("revision={1} replay={1}");
  const downloadLink = source.getByRole("link", { name: "下载 chart-variants/bar.tsx", exact: true });
  await expect(downloadLink).toBeVisible();
  const downloadEvent = page.waitForEvent("download");
  await downloadLink.focus();
  await downloadLink.press("Enter");
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toMatch(/bar\.tsx$/);
  expect(await download.failure()).toBeNull();
  expect(decodeURIComponent((await downloadLink.getAttribute("href"))!)).toContain("export function BarVariant");
});
