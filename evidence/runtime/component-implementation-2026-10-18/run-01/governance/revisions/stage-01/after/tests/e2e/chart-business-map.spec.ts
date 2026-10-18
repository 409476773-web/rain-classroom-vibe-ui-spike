import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test, type Locator, type Page } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

test.use({ hasTouch: true });
const evidence = evidenceOutputPath("evidence/runtime/chart-china-selector-feedback-2026-10-10/browser");
const layer = (page: Page) => page.locator("[data-china-layer]");
const active = (page: Page) => layer(page).locator('[data-map-active="true"]');
const paths = (page: Page) => active(page).locator("path[data-feature-id]");
const transform = (page: Page) => active(page).locator('svg > g[transform^="matrix"]').first();
async function settle(page: Page, count: number) {
  await expect(paths(page)).toHaveCount(count);
  await expect(active(page)).toHaveCSS("opacity", "1");
  await expect(active(page)).toHaveCSS("transform", "none");
}
async function demo(page: Page) {
  const section = page.locator(".rain-china-demo");
  if (await section.getAttribute("open") == null) await section.locator("summary").click();
}
async function picker(page: Page) {
  if (!(await page.getByRole("listbox", { name: "选项" }).isVisible())) await layer(page).getByRole("combobox", { name: "地图地区", exact: true }).click();
}
async function choose(page: Page, name: string, key?: string) {
  await picker(page);
  const option = page.locator(".rain-china-picker").getByRole("option", { name, exact: true });
  if (key) {
    const search = page.getByRole("combobox", { name: "搜索选项" });
    await search.fill(name); await search.press("Enter");
  } else await option.click();
}
async function expectTooltip(container: Locator, title: string, value?: string) {
  const tooltip = container.locator(".rain-chart-tooltip");
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toContainText(title);
  if (value) await expect(tooltip).toContainText(value);
  await expect.poll(() => tooltip.evaluate(node => {
    const b = node.getBoundingClientRect();
    return b.left >= 0 && b.top >= 0 && b.right <= window.innerWidth && b.bottom <= window.innerHeight;
  })).toBe(true);
}
async function fillPoint(path: Locator) {
  await expect(path).toBeVisible();
  await path.scrollIntoViewIfNeeded();
  return path.evaluate(async element => {
    await Promise.all(element.closest("svg")!.getAnimations({ subtree: true }).map(animation => animation.finished.catch(() => undefined)));
    const path = element as SVGPathElement, box = path.getBBox(), matrix = path.getScreenCTM()!;
    for (const y of [.5, .4, .6, .3, .7, .2, .8, .1, .9]) for (const x of [.5, .4, .6, .3, .7, .2, .8, .1, .9]) {
      const point = new DOMPoint(box.x + box.width * x, box.y + box.height * y);
      if (path.isPointInFill(point)) {
        const screen = point.matrixTransform(matrix), hit = document.elementFromPoint(screen.x, screen.y);
        if (hit?.closest("[data-feature-id]")?.getAttribute("data-feature-id") === path.getAttribute("data-feature-id")) return { x: screen.x, y: screen.y };
      }
    }
    throw new Error("No actual filled point in the region polygon");
  });
}


for (const motion of ["no-preference", "reduce"] as const) {
  test(`${motion}: compact tools, stable scale/readings, keyboard drill and saved national view`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: motion });
    await page.goto("/#chart-china");
    await settle(page, 34);
    await mkdir(evidence, { recursive: true });
    await expect(page.getByRole("listbox", { name: "选项" })).not.toBeVisible();
    const tools = layer(page).getByRole("group", { name: "地图视图工具" });
    const sizes = await tools.getByRole("button").evaluateAll(nodes => nodes.map(node => ({ button: node.getBoundingClientRect().width, icon: node.querySelector(".rain-icon")!.getBoundingClientRect().width })));
    expect(sizes).toEqual(Array(3).fill({ button: 28, icon: 14 }));
    await expect(tools.getByRole("button", { name: "缩小地图" })).toBeDisabled();
    await expect(tools.getByRole("button", { name: "恢复地图视图" })).toBeDisabled();
    const original = await transform(page).getAttribute("transform");
    await tools.getByRole("button", { name: "放大地图" }).click();
    await expect.poll(() => transform(page).getAttribute("transform")).not.toBe(original);
    await tools.getByRole("button", { name: "缩小地图" }).click();
    await expect(transform(page)).toHaveAttribute("transform", original!);
    await tools.getByRole("button", { name: "放大地图" }).click();
    const saved = await transform(page).getAttribute("transform");
    const point = await fillPoint(active(page).locator('path[data-feature-id="440000"]'));
    const color = await active(page).locator('path[data-feature-id="440000"]').evaluate(node => getComputedStyle(node).fill);
    await page.mouse.move(point.x, point.y);
    await expectTooltip(layer(page), "广东省");
    expect(await active(page).locator('path[data-feature-id="440000"]').evaluate(node => getComputedStyle(node).fill)).toBe(color);
    await choose(page, "广东省", "Enter");
    await expect(layer(page)).toHaveAttribute("data-china-layer", "440000");
    await settle(page, 21);
    await expect(layer(page).getByRole("combobox", { name: "地图地区" })).toBeFocused();
    await choose(page, "深圳市", "Space");
    const detail = layer(page).getByRole("region", { name: "地区样本详情" });
    await expect(detail).toHaveAttribute("data-selected-region", "440300");
    await expect(active(page).locator('path[data-feature-id="440300"]')).toHaveAttribute("data-selected", "true");
    const domain = await layer(page).locator(".rain-china-scale").getAttribute("data-domain-max");
    await active(page).evaluate(node => node.setAttribute("data-retained", "true"));
    await demo(page);
    await page.getByRole("button", { name: "更新数据", exact: true }).click();
    const expectedReading = "162 人"; // Verified Guangdong snapshot 1, Shenzhen 440300; the Vite factory imports JSON.
    await expect(detail).toContainText(expectedReading);
    await expect(active(page)).toHaveAttribute("data-retained", "true");
    await expect(layer(page).locator(".rain-china-scale")).toHaveAttribute("data-domain-max", domain!);
    await page.getByRole("combobox", { name: "地图图表配色" }).selectOption("intensity");
    await expect(active(page)).toHaveAttribute("data-retained", "true");
    await layer(page).getByText("查看精确数据", { exact: true }).click();
    await expect(layer(page).locator('[data-china-row="440300"]')).toContainText(expectedReading);
    await page.getByRole("combobox", { name: "地图图表配色" }).selectOption("monochrome-blue");
    await page.mouse.move(4, 4);
    await layer(page).screenshot({ path: `${evidence}/guangdong-detail-${motion}.png` });
    await choose(page, "全国", "Enter");
    await settle(page, 34);
    await expect(transform(page)).toHaveAttribute("transform", saved!);
    await expect(active(page).locator('path[data-feature-id="440000"]')).toHaveAttribute("data-selected", "true");
    await expect(layer(page).getByRole("combobox", { name: "地图地区" })).toBeFocused();
    await tools.getByRole("button", { name: "恢复地图视图" }).click();
    await expect(transform(page)).toHaveAttribute("transform", original!);
    await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
    await expect(layer(page)).toHaveAttribute("data-revision", "1");
    await layer(page).screenshot({ path: `${evidence}/national-${motion}.png` });
    expect(errors).toEqual([]);
    await writeFile(`${evidence}/desktop-${motion}.json`, JSON.stringify({ sizes, saved, original, domain, errors }, null, 2));
  });

  test(`${motion}: 390px long names, direct counties, zero/missing, rejection and retry keep canvas stable`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: motion });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/#chart-china");
    await settle(page, 34);
    await demo(page);
    await page.getByRole("combobox", { name: "地图查看范围" }).selectOption("650000");
    await settle(page, 26);
    await picker(page);
    await expect(page.locator(".rain-china-picker").getByRole("option", { name: "巴音郭楞蒙古自治州", exact: true })).toBeVisible();
    const popup = await page.locator(".rain-china-picker").boundingBox();
    expect(popup!.x).toBeGreaterThanOrEqual(0);
    expect(popup!.x + popup!.width).toBeLessThanOrEqual(390);
    await choose(page, "白杨市");
    await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toContainText("省直管县级");
    await layer(page).scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${evidence}/xinjiang-390-${motion}.png`, fullPage: true });
    const height = (await layer(page).locator(".rain-china-canvas").boundingBox())!.height;
    await page.getByRole("combobox", { name: "地图数据状态" }).selectOption("zero");
    await expect(layer(page).getByLabel(/参与人数色阶/)).toContainText("全部为 0");
    await page.getByRole("combobox", { name: "地图数据状态" }).selectOption("missing");
    await expect(layer(page).getByLabel(/参与人数色阶/)).toContainText("暂无有效数值");
    await expect(layer(page).getByLabel(/参与人数色阶/)).not.toContainText("全部为 0");
    await expect.poll(() => paths(page).evaluateAll(nodes => new Set(nodes.map(node => getComputedStyle(node).fill)).size)).toBe(1);
    await page.getByRole("combobox", { name: "地图数据状态" }).selectOption("unmatched");
    await expect(layer(page).getByRole("alert")).toContainText("999999");
    await page.getByRole("combobox", { name: "地图数据状态" }).selectOption("invalid");
    await expect(layer(page).getByRole("alert")).toContainText("已拒绝无效统计数据");
    await expect(layer(page).locator("svg")).toHaveCount(0);
    await page.getByRole("combobox", { name: "地图数据状态" }).selectOption("load-error");
    await expect(layer(page).getByRole("alert")).toContainText("边界加载失败");
    expect((await layer(page).locator(".rain-china-canvas").boundingBox())!.height).toBe(height);
    await layer(page).getByRole("button", { name: "重试加载" }).click();
    await settle(page, 26);
    await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "659012");
    await page.getByRole("combobox", { name: "地图数据状态" }).selectOption("normal");
    await choose(page, "全国");
    await settle(page, 34);
    await choose(page, "北京市");
    await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toContainText("直辖市");
    await choose(page, "香港特别行政区");
    await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toContainText("当前来源未提供下级地图");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test("ordinary wheel scrolls the page; drag and pinch do not activate; rapid click and tap do", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#chart-china");
  await settle(page, 34);
  const original = await transform(page).getAttribute("transform");
  let point = await fillPoint(active(page).locator('path[data-feature-id="440000"]'));
  await page.mouse.move(point.x, point.y);
  const scroll = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 180);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(scroll);
  await expect(transform(page)).toHaveAttribute("transform", original!);
  const reset = async () => {
    const button = layer(page).getByRole("button", { name: "恢复地图视图" });
    if (await button.isEnabled()) await button.click();
    await expect(transform(page)).toHaveAttribute("transform", original!);
  };
  point = await fillPoint(active(page).locator('path[data-feature-id="440000"]'));
  await page.mouse.move(point.x, point.y); await page.mouse.down();
  await page.mouse.move(point.x + 65, point.y + 18, { steps: 6 }); await page.mouse.up();
  await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  await reset();
  point = await fillPoint(active(page).locator('path[data-feature-id="440000"]'));
  await page.mouse.click(point.x, point.y);
  await settle(page, 21);
  await choose(page, "全国");
  await settle(page, 34);
  const session = await page.context().newCDPSession(page);
  point = await fillPoint(active(page).locator('path[data-feature-id="440000"]'));
  await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ id: 0, x: point.x, y: point.y }] });
  await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ id: 0, x: point.x + 50, y: point.y - 40 }] });
  await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  await reset();
  for (const asymmetric of [false, true]) {
    point = await fillPoint(active(page).locator('path[data-feature-id="440000"]'));
    const before = await transform(page).getAttribute("transform");
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ id: 0, x: point.x - 18, y: point.y }, { id: 1, x: point.x + 18, y: point.y }] });
    await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ id: 0, x: point.x - (asymmetric ? 18 : 42), y: point.y }, { id: 1, x: point.x + (asymmetric ? 70 : 42), y: point.y }] });
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
    await expect.poll(() => transform(page).getAttribute("transform")).not.toBe(before);
    await reset();
  }
  point = await fillPoint(active(page).locator('path[data-feature-id="440000"]'));
  await page.touchscreen.tap(point.x, point.y);
  await settle(page, 21);
  await session.detach();
});

test("failed drill retains national map, retry enters requested layer, late request respects latest intent", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  let attempts = 0;
  await page.route("**/cities-hdx.geojson", async route => { attempts++; if (attempts === 1) await route.abort(); else { await new Promise(resolve => setTimeout(resolve, 250)); await route.continue(); } });
  await page.goto("/#chart-china");
  await settle(page, 34);
  const height = (await layer(page).locator(".rain-china-canvas").boundingBox())!.height;
  await choose(page, "广东省");
  await expect(layer(page).getByRole("alert")).toContainText("边界加载失败");
  await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  await expect(paths(page)).toHaveCount(34);
  expect((await layer(page).locator(".rain-china-canvas").boundingBox())!.height).toBe(height);
  await layer(page).getByRole("button", { name: "重试加载" }).click();
  await expect(layer(page).getByRole("status")).toContainText("正在进入广东省");
  await demo(page);
  await page.getByRole("combobox", { name: "地图查看范围" }).selectOption("330000");
  await settle(page, 11);
  await expect(layer(page)).toHaveAttribute("data-china-layer", "330000");
  await choose(page, "全国");
  await settle(page, 34);
  await choose(page, "广东省");
  await settle(page, 21);
});

test("motion has intermediate drill and zoom frames; reduced motion reaches final state directly", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#chart-china");
  await settle(page, 34);
  const point = await fillPoint(active(page).locator('path[data-feature-id="440000"]'));
  const sampled = page.evaluate(async () => {
    const frames: { opacity: number; transform: string; active: string | null }[][] = [];
    for (let index = 0; index < 40; index++) {
      await new Promise(requestAnimationFrame);
      frames.push([...document.querySelectorAll(".rain-china-layer")].map(node => ({ opacity: Number(getComputedStyle(node).opacity), transform: getComputedStyle(node).transform, active: node.getAttribute("data-map-active") })));
    }
    return frames;
  });
  await page.mouse.click(point.x, point.y);
  const frames = await sampled;
  await settle(page, 21);
  expect(frames.some(frame => frame.length === 2 && frame.some(node => node.opacity > 0 && node.opacity < 1))).toBe(true);
  await layer(page).getByRole("button", { name: "放大地图" }).click();
  expect(await transform(page).evaluate(node => getComputedStyle(node).transitionDuration)).toBe("0.24s");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await choose(page, "全国");
  await settle(page, 34);
  await expect.poll(() => transform(page).evaluate(node => getComputedStyle(node).transitionDuration)).toBe("0s");
  await mkdir(evidence, { recursive: true });
  await writeFile(`${evidence}/motion-frames.json`, JSON.stringify({ frames, scope: "Actual requestAnimationFrame styles, not a frame-rate benchmark" }, null, 2));
});
test("all five original world-map variants retain 177 real regions and native zoom/reset", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#chart-choropleth");
  for (const id of ["choropleth-interactive", "choropleth-default", "choropleth-analytics", "choropleth-graticule", "choropleth-patterns"]) {
    const card = page.locator(`[data-chart-variant="${id}"]`);
    await card.scrollIntoViewIfNeeded();
    await expect(card.locator(".choropleth-features path[data-feature-id]")).toHaveCount(177);
    expect(await card.locator(".choropleth-features path[data-feature-id]").evaluateAll(paths => paths.every(path => !/NaN|Infinity/.test(path.getAttribute("d") ?? "")))).toBe(true);
  }
  const card = page.locator('[data-chart-variant="choropleth-interactive"]');
  await card.scrollIntoViewIfNeeded();
  const edgePoint = await fillPoint(card.locator('.choropleth-features path[data-feature-id="1159320937"]').last());
  const viewport = await card.locator("svg").evaluate(node => ({ left: node.getBoundingClientRect().left, width: node.getBoundingClientRect().width }));
  expect(edgePoint.x).toBeGreaterThan(viewport.left + viewport.width * .7);
  await page.mouse.move(edgePoint.x, edgePoint.y);
  const preciseValue = await card.getByRole("row", { includeHidden: true }).filter({ hasText: "Japan" }).locator("td").last().textContent();
  await expectTooltip(card, "Japan", preciseValue === "缺测" ? preciseValue : `${preciseValue} 人`);
  const transform = card.locator('svg > g[transform^="matrix"]').first();
  const before = await transform.getAttribute("transform");
  await card.getByRole("button", { name: "放大地图", exact: true }).click();
  await expect.poll(() => transform.getAttribute("transform")).not.toBe(before);
  const zoomed = await transform.getAttribute("transform");
  await page.locator("h1").scrollIntoViewIfNeeded();
  await expect(card).toHaveAttribute("data-active", "false");
  await card.scrollIntoViewIfNeeded();
  await expect(transform).toHaveAttribute("transform", zoomed!);
  await card.getByRole("button", { name: "重置地图", exact: true }).click();
  await expect(transform).toHaveAttribute("transform", before!);
});


test("unified region selector searches, switches provinces, restores focus and retains detail on Escape", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#chart-china");
  await settle(page, 34);
  const selector = layer(page).getByRole("combobox", { name: "地图地区" });
  await expect(selector).toHaveText("全国");
  await expect(layer(page).getByRole("button", { name: "选择地区" })).toHaveCount(0);
  await page.locator('.rain-china-region-select [data-slot="arrow"]').click();
  await expect(page.locator(".rain-china-picker").getByRole("option", { name: "全国", exact: true })).toHaveAttribute("data-selected", "true");
  const popup = page.locator(".rain-china-picker");
  await expect(popup).toHaveCSS("width", "320px");
  const search = page.getByRole("combobox", { name: "搜索选项" });
  await expect(search).toBeFocused();
  await search.fill("不存在的地区");
  await expect(page.getByRole("status")).toContainText("没有匹配选项");
  await expect(paths(page)).toHaveCount(34);
  await search.fill("浙江");
  await expect(page.locator(".rain-china-picker").getByRole("option", { name: "广东省", exact: true })).toHaveCount(0);
  await search.press("Enter");
  await settle(page, 11);
  await expect(selector).toHaveText("浙江省");
  await expect(selector).toBeFocused();
  await picker(page);
  await expect(search).toHaveValue("");
  await expect(page.getByRole("group", { name: "浙江省 · 城市与地区" })).toBeVisible();
  await search.fill("杭州");
  await search.press("Enter");
  await expect(selector).toHaveText("杭州市");
  await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "330100");
  await picker(page);
  await search.fill("广西");
  await search.press("Escape");
  await expect(selector).toBeFocused();
  await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "330100");
  await choose(page, "广东省");
  await settle(page, 21);
  await expect(selector).toHaveText("广东省");
  await choose(page, "全国");
  await settle(page, 34);
  await expect(selector).toHaveText("全国");
  await picker(page);
  await mkdir(evidence, { recursive: true });
  await page.screenshot({ path: `${evidence}/national-selector.png`, fullPage: true });
});
