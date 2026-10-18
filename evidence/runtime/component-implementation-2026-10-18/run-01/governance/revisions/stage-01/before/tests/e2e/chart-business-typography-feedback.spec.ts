import { expect, test, type Page } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const evidence = process.env.RAIN_CHART_EXPERIENCE_EVIDENCE_DIR ? `${process.env.RAIN_CHART_EXPERIENCE_EVIDENCE_DIR}/typography` : "evidence/runtime/chart-mini-typography-feedback-2026-10-09/browser";

async function openBusiness(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#chart-business");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('[data-business="horizontal"] span.text-right.text-xs').first()).toBeVisible();
  await page.locator(".rain-business-table tbody tr").first().scrollIntoViewIfNeeded();
  await expect(page.locator(".rain-business-table tbody tr")).toHaveCount(5);
}

async function saveFacts(name: string, facts: unknown) {
  await mkdir(evidence, { recursive: true });
  await writeFile(`${evidence}/${name}.json`, JSON.stringify(facts, null, 2));
}

test("business labels and ordinary mini readings use one 13px hierarchy while card metrics retain emphasis", async ({ page }) => {
  await openBusiness(page);
  const labels = await page.locator('[data-business^="horizontal"] span.text-right.text-xs, .rain-business-ranking__label, .rain-business-row-link').evaluateAll(nodes => nodes.map(node => {
    const css = getComputedStyle(node);
    return { text: node.textContent, className: node.className, fontSize: css.fontSize, lineHeight: css.lineHeight };
  }));
  const ordinarySelector = [
    ".rain-business-mini-gallery h3", ".rain-business-mini-gallery figcaption", ".rain-business-mini-gallery__description",
    ".rain-business-mini-legend li", ".rain-business-mini-legend li > span",
    ".rain-business-reading", ".rain-business-reading small", ".rain-business-number small",
    ".rain-business-progress-reading strong", ".rain-business-progress-reading > span",
    ".rain-business-cards p", ".rain-business-composition-reading",
    ".rain-business-cell-radial", ".rain-business-cell-radial small",
    ".rain-business-course-list span", ".rain-business-list-progress b", ".rain-business-comfortable-group p",
  ].join(", ");
  const ordinary = await page.locator(ordinarySelector).evaluateAll(nodes => nodes.map(node => {
    const css = getComputedStyle(node);
    return { text: node.textContent, className: node.className, fontSize: css.fontSize, lineHeight: css.lineHeight };
  }));
  const metrics = await page.locator(".rain-business-cards .rain-business-number").evaluateAll(nodes => nodes.map(node => {
    const css = getComputedStyle(node);
    return { text: node.textContent, fontSize: css.fontSize, lineHeight: css.lineHeight };
  }));
  await page.getByRole("combobox", { name: "业务数据状态" }).selectOption("missing");
  await expect(page.locator(".rain-business-mini-gallery .rain-business-mini-state").first()).toBeVisible();
  const states = await page.locator(".rain-business-mini-state").evaluateAll(nodes => nodes.map(node => {
    const css = getComputedStyle(node);
    return { text: node.textContent, fontSize: css.fontSize, lineHeight: css.lineHeight };
  }));
  await saveFacts("typography", { labels, ordinary, metrics, states });
  await page.locator(".rain-business-mini-gallery").screenshot({ path: `${evidence}/typography-missing.png` });
  expect(labels.length).toBeGreaterThanOrEqual(15);
  expect.soft([...new Set(labels.map(label => label.fontSize))]).toEqual(["13px"]);
  expect(ordinary.length).toBeGreaterThan(0);
  expect(states.length).toBeGreaterThan(0);
  expect.soft([...new Set([...ordinary, ...states].map(reading => `${reading.fontSize}/${reading.lineHeight}`))]).toEqual(["13px/20px"]);
  expect(metrics).toHaveLength(3);
  for (const metric of metrics) {
    expect(metric.fontSize).toBe("28px");
    expect(metric.lineHeight).toBe("36px");
  }
});

test("card and table trends prefer filled compact areas while the gallery retains both trend forms", async ({ page }) => {
  await openBusiness(page);
  const hostTrends = page.locator('.rain-business-cards [data-mini-kind="line"], .rain-business-cards [data-mini-kind="area"], .rain-business-table [data-mini-kind="line"], .rain-business-table [data-mini-kind="area"]');
  for (const trend of await hostTrends.all()) {
    await trend.scrollIntoViewIfNeeded();
    if (await trend.getAttribute("data-mini-kind") === "area") await expect(trend.locator("path.visx-area-closed")).toHaveCount(1);
  }
  const trends = await hostTrends.evaluateAll(nodes => nodes.map(node => {
    const slot = node.querySelector(".rain-business-mini-slot")!.getBoundingClientRect();
    const fills = [...node.querySelectorAll<SVGPathElement>("path[d]")].map(path => {
      const css = getComputedStyle(path);
      const box = path.getBBox();
      const gradientId = path.getAttribute("fill")?.match(/#([^)'\"]+)/)?.[1];
      const gradient = gradientId ? document.getElementById(gradientId) : null;
      const paintedGradient = [...(gradient?.querySelectorAll("stop") ?? [])].some(stop => Number(getComputedStyle(stop).stopOpacity) > 0);
      return { fill: css.fill, opacity: css.opacity, fillOpacity: css.fillOpacity, closed: /[zZ]\s*$/.test(path.getAttribute("d") ?? ""), paintedGradient, width: box.width, height: box.height };
    }).filter(path => path.closed && path.paintedGradient && Number(path.opacity) > 0 && Number(path.fillOpacity) > 0 && path.width > 0 && path.height > 0);
    return { host: node.closest(".rain-business-cards") ? "card" : "table", kind: node.getAttribute("data-mini-kind"), size: node.getAttribute("data-size"), width: slot.width, height: slot.height, fills };
  }));
  const gallery = await page.locator('.rain-business-mini-gallery [data-mini-kind="line"], .rain-business-mini-gallery [data-mini-kind="area"]').evaluateAll(nodes => nodes.map(node => ({ kind: node.getAttribute("data-mini-kind"), size: node.getAttribute("data-size") })));
  await saveFacts("area-hosts", { trends, gallery });
  await page.locator(".rain-business-cards").screenshot({ path: `${evidence}/area-card.png` });
  await page.locator(".rain-business-table").screenshot({ path: `${evidence}/area-table.png` });
  expect(trends).toHaveLength(6);
  for (const trend of trends) {
    expect.soft(trend.kind, trend.host).toBe("area");
    expect.soft(trend.size, trend.host).toBe("compact");
    expect.soft(trend.width, trend.host).toBe(96);
    expect.soft(trend.height, trend.host).toBe(32);
    expect.soft(trend.fills.length, trend.host).toBeGreaterThan(0);
  }
  expect(gallery).toEqual([
    { kind: "line", size: "compact" }, { kind: "line", size: "comfortable" },
    { kind: "area", size: "compact" }, { kind: "area", size: "comfortable" },
  ]);
});

test("small quantity bars preserve fractions and physical round caps at every table value", async ({ page }) => {
  await openBusiness(page);
  const bars = await page.locator(".rain-business-table .rain-data-bar").evaluateAll(nodes => nodes.map(node => {
    const track = node.getBoundingClientRect();
    const fill = node.querySelector<HTMLElement>(".rain-data-bar__fill")!;
    const box = fill.getBoundingClientRect();
    const css = getComputedStyle(fill);
    const matrix = new DOMMatrixReadOnly(css.transform === "none" ? undefined : css.transform);
    const declaredRadius = parseFloat(css.borderTopRightRadius);
    // Uniform CSS radii are normalized to half the local short side before transforms apply.
    const usedRadius = Math.min(declaredRadius, fill.offsetWidth / 2, fill.offsetHeight / 2);
    return { fraction: Number(node.getAttribute("data-fraction")), trackWidth: track.width, trackHeight: track.height, width: box.width, height: box.height,
      localWidth: fill.offsetWidth, localHeight: fill.offsetHeight, transform: css.transform, a: matrix.a, d: matrix.d,
      declaredRadius, usedRadius, physicalRadiusX: usedRadius * Math.abs(matrix.a), physicalRadiusY: usedRadius * Math.abs(matrix.d) };
  }));
  await saveFacts("quantity-caps", { bars });
  await page.locator(".rain-business-table").screenshot({ path: `${evidence}/quantity-caps.png` });
  expect(bars.map(bar => bar.fraction)).toEqual([.25, .5, 1, .75, .45]);
  for (const bar of bars) {
    expect.soft(bar.trackHeight, `${bar.fraction}`).toBe(6);
    expect.soft(bar.width / bar.trackWidth, `${bar.fraction}`).toBeCloseTo(bar.fraction, 3);
    expect.soft(bar.height, `${bar.fraction}`).toBe(6);
    expect.soft(bar.a, `${bar.fraction}`).toBeCloseTo(1, 5);
    expect.soft(bar.d, `${bar.fraction}`).toBeCloseTo(1, 5);
    expect.soft(bar.physicalRadiusX, `${bar.fraction}`).toBeCloseTo(3, 3);
    expect.soft(bar.physicalRadiusY, `${bar.fraction}`).toBeCloseTo(3, 3);
  }
});
