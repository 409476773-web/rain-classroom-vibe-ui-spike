import { expect, test, type Locator } from "@playwright/test";

async function singleLineText(locator: Locator) {
  return locator.evaluate(node => {
    const range = document.createRange();
    range.selectNodeContents(node);
    return { lines: new Set([...range.getClientRects()].map(rect => Math.round(rect.top))).size,
      width: node.getBoundingClientRect().width, font: parseFloat(getComputedStyle(node).fontSize) };
  });
}

async function renderedRingPaths(card: Locator) {
  await expect.poll(() => card.locator('[data-rain-id="ui-chart-ring"] svg path').evaluateAll(nodes =>
    nodes.filter(node => { const rect = node.getBoundingClientRect(); return rect.width > 80 && rect.height > 80; }).length
  )).toBeGreaterThanOrEqual(6);
}

for (const width of [1280, 1311, 390]) {
  test(`chart labels stay horizontal at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 796 });
    for (const entry of ["bar", "radar", "ring"]) {
      await page.goto(`/#chart-${entry}`);
      const example = page.locator(".component-doc__example").first();
      await example.scrollIntoViewIfNeeded();
      const keys = example.locator(".rain-chart-legend-button");
      await expect(keys.first()).toBeVisible();
      await page.waitForTimeout(1500);
      for (const key of await keys.all()) {
        const label = key.locator("span").filter({ hasText: /\S/ }).first();
        const reading = await singleLineText(label);
        expect(reading.lines, `${entry}: ${await label.textContent()}`).toBe(1);
        expect(reading.width).toBeGreaterThan(reading.font * 2);
      }
      if (entry === "ring") await renderedRingPaths(example);
      if (entry === "bar") await expect.poll(() => example.locator('g[class^="bar-series-"] rect').evaluateAll(nodes =>
        Math.max(...nodes.map(node => node.getBoundingClientRect().height)))).toBeGreaterThan(100);
      await example.screenshot({ path: test.info().outputPath(`${entry}-${width}.png`) });
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  });

  test(`ring progress keeps labels and series color at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 796 });
    await page.goto("/#chart-ring");
    const card = page.locator('[data-chart-variant="ring-legend"]');
    await card.scrollIntoViewIfNeeded();
    const trackWidths: number[] = [];
    for (const [label, value, max] of [["阅读进度", 28, 40], ["练习进度", 8, 12], ["复习进度", 5, 10]] as const) {
      const button = card.getByRole("button").filter({ hasText: label });
      await expect(button).toBeVisible();
      expect((await singleLineText(button.getByText(label, { exact: true }))).lines).toBe(1);
      const progress = card.getByRole("progressbar", { name: `${label}进度`, exact: true });
      await expect(progress).toHaveAttribute("aria-valuenow", String(value));
      await expect(progress).toHaveAttribute("aria-valuemax", String(max));
      const geometry = await progress.evaluate(node => {
        const track = [...node.querySelectorAll<HTMLElement>("div")].find(child => child.getBoundingClientRect().height > 0 && getComputedStyle(child).overflow === "hidden")!;
        const fill = track?.firstElementChild as HTMLElement | null;
        return { height: track?.getBoundingClientRect().height, width: track?.getBoundingClientRect().width, rounded: track ? parseFloat(getComputedStyle(track).borderRadius) : 0,
          track: track ? getComputedStyle(track).backgroundColor : "", fill: fill ? getComputedStyle(fill).backgroundColor : "" };
      });
      expect(geometry.height).toBeLessThanOrEqual(8);
      expect(geometry.rounded).toBeGreaterThanOrEqual(3);
      expect(geometry.fill).not.toBe("rgb(0, 128, 0)");
      expect(geometry.fill).not.toBe(geometry.track);
      trackWidths.push(geometry.width!);
      await button.focus();
    }
    expect(Math.max(...trackWidths) - Math.min(...trackWidths)).toBeLessThanOrEqual(1);
    await expect(card.locator("progress")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.waitForTimeout(1500);
    await renderedRingPaths(card);
    await card.screenshot({ path: test.info().outputPath(`ring-progress-${width}.png`) });
  });

  test(`map hover tooltip has compact padded content within the plot at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 796 });
    await page.goto("/#chart-choropleth");
    const card = page.locator('[data-chart-variant="choropleth-default"]');
    await card.scrollIntoViewIfNeeded();
    await card.locator("path.cursor-pointer").nth(3).hover({ force: true });
    const tooltip = card.locator(".rain-chart-tooltip");
    await expect(tooltip).toContainText("Canada");
    await expect(tooltip).toContainText("44");
    await page.waitForTimeout(250);
    const title = tooltip.getByText("Canada", { exact: true });
    const metrics = await title.evaluate(node => {
      const panel = node.closest(".rain-chart-tooltip")!;
      const text = node.getBoundingClientRect(), box = panel.getBoundingClientRect();
      return { font: parseFloat(getComputedStyle(node).fontSize), insetLeft: text.left - box.left, insetTop: text.top - box.top };
    });
    expect(metrics.font).toBeLessThanOrEqual(14);
    expect(metrics.insetLeft).toBeGreaterThanOrEqual(8);
    expect(metrics.insetTop).toBeGreaterThanOrEqual(8);
    const box = await tooltip.boundingBox(), plot = await card.locator(".rain-chart-plot").boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(plot!.x - 1);
    expect(box!.x + box!.width).toBeLessThanOrEqual(plot!.x + plot!.width + 1);
    await card.screenshot({ path: test.info().outputPath(`map-tooltip-${width}.png`) });
  });

  test(`sunburst legend keeps root and child labels in one unboxed row at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 796 });
    await page.goto("/#chart-sunburst");
    const card = page.locator('[data-chart-variant="sunburst-legend"]');
    await card.scrollIntoViewIfNeeded();
    for (const level of ["root", "child"]) {
      const buttons = card.locator('.rain-chart-sunburst-legend [data-rain-id="ui-button"]');
      await expect(buttons).toHaveCount(3);
      for (const button of await buttons.all()) {
        const geometry = await button.evaluate(node => {
          const slot = node.querySelector('[data-slot="label"]')!;
          const textNodes: Node[] = [], walker = document.createTreeWalker(slot, NodeFilter.SHOW_TEXT);
          while (walker.nextNode()) if (walker.currentNode.textContent?.trim()) textNodes.push(walker.currentNode);
          const rects = textNodes.flatMap(text => { const range = document.createRange(); range.selectNodeContents(text); return [...range.getClientRects()]; });
          const tops = rects.map(rect => rect.top), bottoms = rects.map(rect => rect.bottom);
          return { border: parseFloat(getComputedStyle(node).borderWidth), textHeight: Math.max(...bottoms) - Math.min(...tops),
            buttonHeight: node.getBoundingClientRect().height, slotHeight: slot.getBoundingClientRect().height };
        });
        expect(geometry.border).toBe(0);
        expect(geometry.textHeight).toBeLessThanOrEqual(24);
        expect(geometry.slotHeight).toBeLessThanOrEqual(24);
        expect(geometry.buttonHeight).toBeGreaterThanOrEqual(geometry.slotHeight);
      }
      await page.waitForTimeout(1500);
      await card.screenshot({ path: test.info().outputPath(`sunburst-${level}-${width}.png`) });
      if (level === "root") await card.getByRole("button", { name: /^基础课程，.*查看下级$/ }).click();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  });
}
