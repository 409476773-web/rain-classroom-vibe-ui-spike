import { expect, test, type Locator, type Page } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

test.use({ hasTouch: true });
const evidence = "evidence/runtime/chart-business-expansion/p5/browser/host";
const layer = (page: Page) => page.locator("[data-china-layer]");
async function beginClickCapture(page: Page) {
  await page.evaluate(() => {
    const captures: { type: string; tag: string | null; region: string | null; targetIdentity: number; hitRegion: string | null; time: number }[] = [];
    const identities = new WeakMap<EventTarget, number>();
    let sequence = 0;
    const identify = (target: EventTarget) => {
      if (!identities.has(target)) identities.set(target, ++sequence);
      return identities.get(target)!;
    };
    const mutations: { time: number; added: { identity: number; region: string | null }[]; removed: { identity: number; region: string | null }[] }[] = [];
    const describe = (nodes: NodeList) => [...nodes].filter((node): node is Element => node instanceof Element && node.matches("[data-feature-id]")).map(node => ({ identity: identify(node), region: node.getAttribute("data-feature-id") }));
    const featureLayer = document.querySelector(".choropleth-features");
    if (featureLayer) new MutationObserver(records => {
      for (const record of records) {
        const added = describe(record.addedNodes), removed = describe(record.removedNodes);
        if (added.length || removed.length) mutations.push({ time: Number(performance.now().toFixed(1)), added, removed });
      }
      document.documentElement.setAttribute("data-test-china-path-mutations", JSON.stringify(mutations));
    }).observe(featureLayer, { childList: true, subtree: true });
    for (const type of ["pointermove", "pointerdown", "pointerup", "mousedown", "mouseup", "click"]) document.addEventListener(type, event => {
      const target = event.target instanceof Element ? event.target : null, mouse = event as MouseEvent;
      captures.push({ type, tag: target?.tagName ?? null, region: target?.closest("[data-feature-id]")?.getAttribute("data-feature-id") ?? null, targetIdentity: target ? identify(target) : 0, hitRegion: document.elementFromPoint(mouse.clientX, mouse.clientY)?.closest("[data-feature-id]")?.getAttribute("data-feature-id") ?? null, time: Number(performance.now().toFixed(1)) });
      document.documentElement.setAttribute("data-test-china-click-events", JSON.stringify(captures));
    }, true);
  });
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
  test(`${motion}: national and province maps fit actual boundaries, retain readings and return by stable identity`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: motion });
    await page.goto("/#chart-china");
    await mkdir(evidence, { recursive: true });
    await expect(page.getByRole("heading", { name: "全国与省市下钻", exact: true })).toBeVisible();
    await expect(layer(page).getByRole("list", { name: "地区列表" }).getByRole("button")).toHaveCount(34);
    await expect(layer(page).locator(".choropleth-features path[data-feature-id]")).toHaveCount(34);
    const controlBounds = await layer(page).locator(".rain-china-map-controls").evaluate(node => ({ bottom: node.getBoundingClientRect().bottom, mapBottom: node.closest(".rain-china-map")!.getBoundingClientRect().bottom }));
    expect(controlBounds.bottom).toBeLessThanOrEqual(controlBounds.mapBottom);
    await layer(page).screenshot({ path: `${evidence}/national-${motion}.png` });
    const nationPoint = await fillPoint(layer(page).locator('.choropleth-features path[data-feature-id="440000"]').last());
    await page.mouse.move(nationPoint.x, nationPoint.y);
    await expectTooltip(layer(page), "广东省", (await layer(page).locator('[data-china-region="440000"] [data-slot="value"]').textContent())!);
    await layer(page).getByRole("button", { name: "广东省", exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(layer(page)).toHaveAttribute("data-china-layer", "440000");
    await expect(layer(page).getByRole("list", { name: "地区列表" }).getByRole("button")).toHaveCount(21);
    await expect(layer(page).locator(".choropleth-features path[data-feature-id]")).toHaveCount(21);
    expect(await layer(page).locator(".choropleth-features path[data-feature-id]").evaluateAll(paths => paths.every(path => !/NaN|Infinity/.test(path.getAttribute("d") ?? "")))).toBe(true);
    const bounds = await layer(page).locator("svg").evaluate(svg => {
      const viewport = svg.getBoundingClientRect();
      return [...svg.querySelectorAll(".choropleth-features path[data-feature-id]")].map(path => { const b = path.getBoundingClientRect(); return { left: b.left - viewport.left, top: b.top - viewport.top, right: b.right - viewport.left, bottom: b.bottom - viewport.top, width: viewport.width, height: viewport.height }; });
    });
    expect(bounds.every(b => b.left >= 15 && b.top >= 15 && b.right <= b.width - 15 && b.bottom <= b.height - 15)).toBe(true);
    const city = layer(page).getByRole("button", { name: "广州市", exact: true });
    await city.focus();
    await page.keyboard.press(" ");
    await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "440100");
    await expect(layer(page).locator('path[data-feature-id="440100"][data-selected="true"]')).toHaveCount(1);
    await layer(page).locator(".rain-china-map").evaluate(node => node.setAttribute("data-test-retained-map", "true"));
    await page.getByRole("button", { name: "更新数据", exact: true }).click();
    await page.getByRole("combobox", { name: "地图图表配色" }).selectOption("intensity");
    await expect(layer(page).locator('[data-test-retained-map="true"]')).toHaveCount(1);
    await expect(city).toHaveAttribute("aria-pressed", "true");
    const palette = await layer(page).evaluate(node => ({ first: getComputedStyle(node).getPropertyValue("--chart-scale-01").trim(), last: getComputedStyle(node).getPropertyValue("--chart-scale-05").trim() }));
    expect(palette.first).not.toBe(palette.last);
    await page.getByRole("combobox", { name: "地图图表配色" }).selectOption("monochrome-blue");
    const mono = await layer(page).evaluate(node => getComputedStyle(node).getPropertyValue("--chart-scale-05").trim());
    expect(mono.toLowerCase()).toBe("#3f5d91");
    const buttonValue = await city.locator('[data-slot="value"]').textContent();
    const cityPoint = await fillPoint(layer(page).locator('.choropleth-features path[data-feature-id="440100"]').last());
    await page.mouse.move(cityPoint.x, cityPoint.y);
    await expectTooltip(layer(page), "广州市", buttonValue!);
    await layer(page).getByText("查看精确数据", { exact: true }).click();
    await expect(layer(page).locator('[data-china-row="440100"]')).toContainText(buttonValue!);
    await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toContainText(buttonValue!);
    await layer(page).screenshot({ path: `${evidence}/guangdong-detail-${motion}.png` });
    await layer(page).getByRole("button", { name: "返回全国", exact: true }).click();
    await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
    await expect(layer(page).locator('path[data-feature-id="440000"][data-selected="true"]')).toHaveCount(1);
    await expect(layer(page)).toHaveAttribute("data-revision", "1");
    await expect(layer(page)).toHaveAttribute("data-recipe", "monochrome-blue");
    await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toHaveCount(0);
    await page.getByRole("combobox", { name: "地图查看范围" }).selectOption("330000");
    await expect(layer(page).getByRole("list", { name: "地区列表" }).getByRole("button")).toHaveCount(11);
    await layer(page).getByRole("button", { name: "杭州市", exact: true }).click();
    await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "330100");
    await layer(page).screenshot({ path: `${evidence}/zhejiang-${motion}.png` });
    expect(errors).toEqual([]);
    await writeFile(`${evidence}/readings-${motion}.json`, JSON.stringify({ motion, bounds, palette, mono, buttonValue, preservedRevision: 1, pageErrors: errors }, null, 2));
  });

  test(`${motion}: 390px keeps long real names, truthful states and loading retry`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: motion });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/#chart-china");
    await page.getByRole("combobox", { name: "地图查看范围" }).selectOption("650000");
    await expect(layer(page).getByRole("list", { name: "地区列表" }).getByRole("button")).toHaveCount(26);
    await expect(layer(page).getByRole("button", { name: "巴音郭楞蒙古自治州", exact: true })).toBeVisible();
    await layer(page).getByRole("button", { name: "白杨市", exact: true }).click();
    await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toContainText("省直管县级");
    await mkdir(evidence, { recursive: true });
    await page.screenshot({ path: `${evidence}/xinjiang-390-${motion}.png`, fullPage: true });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.getByRole("combobox", { name: "地图数据状态" }).selectOption("zero");
    await expect(layer(page).getByLabel(/参与人数色阶/)).toContainText("全部为 0");
    await page.getByRole("combobox", { name: "地图数据状态" }).selectOption("missing");
    await expect(layer(page).getByLabel(/参与人数色阶/)).toContainText("暂无有效数值");
    await expect(layer(page).getByLabel(/参与人数色阶/)).not.toContainText("全部为 0");
    const fills = await layer(page).locator(".choropleth-features path[data-feature-id]").evaluateAll(paths => paths.map(path => getComputedStyle(path).fill));
    expect(new Set(fills).size).toBe(1);
    await page.getByRole("combobox", { name: "地图数据状态" }).selectOption("unmatched");
    await expect(layer(page).getByRole("alert")).toContainText("999999");
    await page.getByRole("combobox", { name: "地图数据状态" }).selectOption("invalid");
    await expect(layer(page).getByRole("alert")).toContainText("已拒绝无效统计数据");
    await expect(layer(page).locator("svg")).toHaveCount(0);
    await page.getByRole("combobox", { name: "地图数据状态" }).selectOption("load-error");
    await expect(layer(page).getByRole("alert")).toContainText("边界加载失败");
    await layer(page).getByRole("button", { name: "重试加载", exact: true }).click();
    await expect(layer(page).getByRole("list", { name: "地区列表" }).getByRole("button")).toHaveCount(26);
    await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "659012");
    await page.getByRole("combobox", { name: "地图数据状态" }).selectOption("normal");
    await layer(page).getByRole("button", { name: "返回全国", exact: true }).click();
    await layer(page).getByRole("button", { name: "北京市", exact: true }).click();
    await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toContainText("直辖市");
    await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
    await layer(page).getByRole("button", { name: "香港特别行政区", exact: true }).click();
    await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toContainText("当前来源未提供下级地图");
    expect(errors).toEqual([]);
  });
}

test("actual filled polygon click and tap drill; mouse/touch drag and two-finger pinch do not activate", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#chart-china");
  const map = layer(page).locator("svg");
  const guangdong = () => layer(page).locator('.choropleth-features path[data-feature-id="440000"]').last();
  let point = await fillPoint(guangdong());
  const transform = map.locator('> g[transform^="matrix"]').first();
  const initial = await transform.getAttribute("transform");
  const initialCss = await transform.evaluate(node => getComputedStyle(node).transform);
  const reset = async () => {
    await layer(page).getByRole("button", { name: "重置地图", exact: true }).click();
    await expect(transform).toHaveAttribute("transform", initial!);
    await expect.poll(() => transform.evaluate(node => getComputedStyle(node).transform)).toBe(initialCss);
  };
  await page.mouse.move(point.x, point.y);
  await page.mouse.down();
  await page.mouse.move(point.x + 65, point.y + 18, { steps: 6 });
  await page.mouse.up();
  await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  await reset();
  point = await fillPoint(guangdong());
  await page.mouse.move(point.x, point.y);
  await expectTooltip(layer(page), "广东省");
  await page.mouse.click(point.x, point.y);
  await expect(layer(page)).toHaveAttribute("data-china-layer", "440000");
  await layer(page).getByRole("button", { name: "返回全国", exact: true }).click();
  const session = await page.context().newCDPSession(page);
  point = await fillPoint(guangdong());
  await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ id: 0, x: point.x, y: point.y }] });
  await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ id: 0, x: point.x + 50, y: point.y + 15 }] });
  await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  await reset();
  point = await fillPoint(guangdong());
  const before = await transform.getAttribute("transform");
  await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ id: 0, x: point.x - 18, y: point.y }, { id: 1, x: point.x + 18, y: point.y }] });
  await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ id: 0, x: point.x - 42, y: point.y }, { id: 1, x: point.x + 42, y: point.y }] });
  await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  await expect.poll(() => transform.getAttribute("transform")).not.toBe(before);
  await reset();
  point = await fillPoint(guangdong());
  const asymmetricBefore = await transform.getAttribute("transform");
  await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ id: 0, x: point.x - 18, y: point.y }, { id: 1, x: point.x + 18, y: point.y }] });
  await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ id: 0, x: point.x - 18, y: point.y }, { id: 1, x: point.x + 70, y: point.y }] });
  await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  await expect.poll(() => transform.getAttribute("transform")).not.toBe(asymmetricBefore);
  await reset();
  point = await fillPoint(guangdong());
  await page.touchscreen.tap(point.x, point.y);
  await expect(layer(page)).toHaveAttribute("data-china-layer", "440000");
  await session.detach();
  await mkdir(evidence, { recursive: true });
  await writeFile(`${evidence}/pointer-touch.json`, JSON.stringify({ pointerClick: true, pointerDragSuppressed: true, touchDragSuppressed: true, pinchChangedTransformWithoutActivation: true, asymmetricPinchChangedTransformWithoutActivation: true, touchTap: true, physicalHardware: "not-checked" }, null, 2));
});

test("rapid direct polygon click retains the true region target through hover changes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#chart-china");
  const point = await fillPoint(layer(page).locator('.choropleth-features path[data-feature-id="440000"]').last());
  await beginClickCapture(page);
  await page.mouse.click(point.x, point.y);
  const events = await page.locator("html").getAttribute("data-test-china-click-events");
  await mkdir(evidence, { recursive: true });
  await writeFile(`${evidence}/rapid-click-events.json`, JSON.stringify({ point, events: JSON.parse(events ?? "[]"), scope: "Native mouse click without hover settlement; actual document capture and elementFromPoint" }, null, 2));
  await expect(layer(page)).toHaveAttribute("data-china-layer", "440000");
});

test("rapid click after drag/reset activates the current real polygon", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#chart-china");
  let point = await fillPoint(layer(page).locator('.choropleth-features path[data-feature-id="440000"]').last());
  await beginClickCapture(page);
  const transform = layer(page).locator('svg > g[transform^="matrix"]').first();
  const initialCss = await transform.evaluate(node => getComputedStyle(node).transform);
  await page.mouse.move(point.x, point.y);
  await page.mouse.down();
  await page.mouse.move(point.x + 65, point.y + 18, { steps: 6 });
  await page.mouse.up();
  await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  await layer(page).getByRole("button", { name: "重置地图", exact: true }).click();
  await expect.poll(() => transform.evaluate(node => getComputedStyle(node).transform)).toBe(initialCss);
  point = await fillPoint(layer(page).locator('.choropleth-features path[data-feature-id="440000"]').last());
  await page.mouse.click(point.x, point.y);
  const events = await page.locator("html").getAttribute("data-test-china-click-events");
  const mutations = await page.locator("html").getAttribute("data-test-china-path-mutations");
  await mkdir(evidence, { recursive: true });
  await writeFile(`${evidence}/drag-reset-press-events.json`, JSON.stringify({ point, events: JSON.parse(events ?? "[]"), mutations: JSON.parse(mutations ?? "[]"), scope: "Native drag/reset then direct rapid click without hover settlement; actual down/up/click capture and path insertion/removal observation" }, null, 2));
  await expect(layer(page)).toHaveAttribute("data-china-layer", "440000");
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

for (const motion of ["no-preference", "reduce"] as const) {
  test(`${motion}: static map snapshots reach the real final opacity before capture`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: motion });
    await page.goto("/#chart-china");
    await mkdir(evidence, { recursive: true });
    const settled = async (count: number) => {
      await layer(page).locator(".rain-china-map").scrollIntoViewIfNeeded();
      await page.mouse.move(4, 4);
      const paths = layer(page).locator(".choropleth-features path[data-feature-id]");
      await expect(paths).toHaveCount(count);
      await expect.poll(() => paths.evaluateAll(nodes => nodes.every(node => {
        const opacity = Number(node.getAttribute("opacity"));
        const computed = Number(getComputedStyle(node).opacity);
        const parent = node.parentElement;
        return opacity === .85 && computed === .85 && parent?.tagName.toLowerCase() === "g" && !parent.hasAttribute("opacity");
      }))).toBe(true);
      await expect(layer(page).locator('.choropleth-features path[pointer-events="none"]')).toHaveCount(0);
      return paths.evaluateAll(nodes => nodes.map(node => ({ id: node.getAttribute("data-feature-id"), opacity: node.getAttribute("opacity"), computedOpacity: getComputedStyle(node).opacity, parentOpacity: node.parentElement!.getAttribute("opacity"), fill: getComputedStyle(node).fill })));
    };
    const national = await settled(34);
    await layer(page).screenshot({ path: `${evidence}/national-${motion}.png` });
    await page.getByRole("combobox", { name: "地图查看范围" }).selectOption("440000");
    await layer(page).getByRole("button", { name: "广州市", exact: true }).click();
    await page.getByRole("button", { name: "更新数据", exact: true }).click();
    await layer(page).getByText("查看精确数据", { exact: true }).click();
    const guangdong = await settled(21);
    await layer(page).screenshot({ path: `${evidence}/guangdong-detail-${motion}.png` });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole("combobox", { name: "地图查看范围" }).selectOption("650000");
    await layer(page).getByRole("button", { name: "白杨市", exact: true }).click();
    const xinjiang = await settled(26);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await page.screenshot({ path: `${evidence}/xinjiang-390-${motion}.png`, fullPage: true });
    await writeFile(`${evidence}/static-snapshot-${motion}.json`, JSON.stringify({ motion, national, guangdong, xinjiang, captureCondition: "All real hit paths have attribute and computed opacity 0.85; their static parent group has no opacity; mouse outside map; no visual hover overlay" }, null, 2));
  });
}
