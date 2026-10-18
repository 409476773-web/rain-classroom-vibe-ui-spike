import { expect, test } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import CHART_VARIANT_REFERENCE from "../../apps/playground/src/docs/components/chart-variants/reference.json" with { type: "json" };

const evidence = process.env.RAIN_CHART_VARIANTS_EVIDENCE_DIR ?? "evidence/runtime/chart-variants/current";

test("[T01] variants remain on one page, local updates stay isolated and group navigation preserves the route", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#chart-bar");
  const first = page.locator('[data-chart-variant="bar-default"]');
  const second = page.locator('[data-chart-variant="bar-multiple-series"]');
  await first.scrollIntoViewIfNeeded();
  await expect(first.locator('[data-ready="true"]')).toBeVisible();
  await first.getByRole("button", { name: "更新数据", exact: true }).click();
  await expect(first.getByRole("status").filter({ hasText: "已更新 1 次" })).toBeVisible();
  await expect(second.getByRole("status").filter({ hasText: "已更新 0 次" })).toHaveCount(1);
  await page.getByRole("button", { name: "基础结构", exact: true }).click();
  await expect(page.locator("#chart-bar-variants-structure")).toBeFocused();
  await expect(page).toHaveURL(/#chart-bar$/);
  for (const width of [1440, 900, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await first.scrollIntoViewIfNeeded();
    await first.getByText("查看本卡代码", { exact: true }).click();
    await expect(first.locator("pre")).toContainText('variantId="bar-default"');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await mkdir(evidence, { recursive: true });
    await first.screenshot({ path: `${evidence}/bar-default-category-wide-normal-${width}-reduce.png` });
    await first.getByText("查看本卡代码", { exact: true }).click();
  }
});

test("[T03] each displayed card exposes its actual family source and current parameters", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#chart-bar");
  const card = page.locator('[data-chart-variant="bar-default"]');
  await card.scrollIntoViewIfNeeded();
  await page.getByRole("combobox", { name: "视觉配方", exact: true }).selectOption("monochrome-blue");
  await card.getByRole("button", { name: "更新数据", exact: true }).click();
  await card.getByText("查看本卡代码", { exact: true }).click();
  await expect(card.locator("pre")).toContainText('recipe="monochrome-blue" revision={1}');
  await card.getByRole("combobox", { name: "本卡源码文件" }).selectOption("chart-variants/bar.tsx");
  await expect(card.locator("pre")).toContainText("export function BarVariant");
  const href = await card.getByRole("link", { name: "下载 chart-variants/bar.tsx", exact: true }).getAttribute("href");
  expect(decodeURIComponent(href!)).toContain('from "@rain-next/ui/charts"');
});

const familyIds = [...new Set(CHART_VARIANT_REFERENCE.map(row => row.chartId))];
for (const family of familyIds) {
  const variants = CHART_VARIANT_REFERENCE.filter(row => row.chartId === family);
  test(`[T13] ${family}: all ${variants.length} frozen cards render real geometry and readable data at 1440 and 390`, async ({ page }) => {
    test.setTimeout(180_000);
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`/#chart-${family}`);
    await expect(page.locator("[data-chart-variant]")).toHaveCount(variants.length);
    await mkdir(evidence, { recursive: true });
    const audit: Record<string, unknown>[] = [];
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const variant of variants) {
        const card = page.locator(`[data-chart-variant="${variant.id}"]`);
        await card.scrollIntoViewIfNeeded();
        await expect(card.locator('[data-ready="true"]')).toBeVisible();
        await expect(card).toHaveAttribute("data-active", "true");
        const showData = card.getByRole("button", { name: "显示数据", exact: true });
        if (await showData.count()) await showData.click();
        const geometry = async () => card.locator(".rain-chart-variant__plot").evaluate(plot => {
          const roots = [...plot.querySelectorAll('[data-slot="chart-root"]')];
          const invalid: string[] = [];
          const marks = roots.flatMap(root => [...root.querySelectorAll("svg path[d], svg rect, svg circle, svg polygon, svg line")]).filter(node => {
            if (node.closest("defs, clipPath, mask")) return false;
            for (const name of ["d", "points", "x", "y", "width", "height", "cx", "cy", "r", "x1", "x2", "y1", "y2"]) {
              const value = node.getAttribute(name);
              if (value && /NaN|Infinity|undefined/.test(value)) invalid.push(`${node.tagName}.${name}=${value}`);
            }
            const rect = node.getBoundingClientRect();
            const style = getComputedStyle(node);
            const painted = style.fill !== "none" && style.fill !== "transparent" && style.fill !== "rgba(0, 0, 0, 0)" || style.stroke !== "none" && style.stroke !== "transparent";
            return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none" && Number(style.opacity) > 0 && painted;
          });
          return { nativeRoots: roots.length, visibleMarks: marks.length, paths: marks.filter(node => node.tagName.toLowerCase() === "path").length, invalid };
        });
        await expect.poll(async () => (await geometry()).visibleMarks, { message: `${variant.id} has painted finite native marks at ${width}px` }).toBeGreaterThan(0);
        const result = await geometry();
        expect(result.nativeRoots, variant.id).toBeGreaterThan(0);
        expect(result.invalid, variant.id).toEqual([]);
        if (family === "funnel") {
          const labelOpacity = await card.locator('[data-slot="chart-root"] span.font-medium').evaluateAll(labels => labels.map(label => label.closest<HTMLElement>(".absolute.inset-0")?.style.opacity));
          expect(labelOpacity, `${variant.id} reduced-motion labels appear immediately`).toEqual(["1", "1", "1", "1"]);
        }
        const summary = card.getByText("查看精确数据", { exact: true });
        await summary.click();
        const table = card.getByRole("table");
        await expect(table, `${variant.id} exact data is readable`).toBeVisible();
        const rows = await table.locator("tbody tr").count();
        expect(rows, variant.id).toBeGreaterThan(0);
        expect(await table.textContent(), variant.id).not.toMatch(/NaN|Infinity|undefined/);
        let operations: { updateVerified?: boolean; replayVerified?: boolean; updateRevision?: number } = {};
        if (width === 1440) {
          const initialData = await table.textContent();
          await card.getByRole("button", { name: "更新数据", exact: true }).click();
          await expect(card.getByRole("status").filter({ hasText: "已更新 1 次" }), `${variant.id} update advances only this card`).toBeVisible();
          await expect.poll(() => table.textContent(), { message: `${variant.id} update changes the precise data` }).not.toBe(initialData);
          await expect.poll(async () => (await geometry()).visibleMarks, { message: `${variant.id} updated data paints native marks` }).toBeGreaterThan(0);
          const updatedGeometry = await geometry();
          expect(updatedGeometry.nativeRoots, `${variant.id} updated native root`).toBeGreaterThan(0);
          expect(updatedGeometry.invalid, `${variant.id} updated finite geometry`).toEqual([]);
          const updatedData = await table.textContent();
          expect(updatedData, `${variant.id} updated readable data`).not.toMatch(/NaN|Infinity|undefined/);
          await card.getByRole("button", { name: "重播动效", exact: true }).click();
          await expect(table, `${variant.id} replay preserves the precise data`).toHaveText(updatedData!);
          await expect(card.getByRole("status").filter({ hasText: "已更新 1 次" })).toBeVisible();
          await expect.poll(async () => (await geometry()).visibleMarks, { message: `${variant.id} replay paints native marks` }).toBeGreaterThan(0);
          const replayedGeometry = await geometry();
          expect(replayedGeometry.nativeRoots, `${variant.id} replayed native root`).toBeGreaterThan(0);
          expect(replayedGeometry.invalid, `${variant.id} replayed finite geometry`).toEqual([]);
          operations = { updateVerified: true, replayVerified: true, updateRevision: 1 };
        }
        await summary.click();
        await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), { message: `${variant.id} at ${width}px` }).toBe(true);
        const duplicateDefs = await page.evaluate(() => {
          const ids = [...document.querySelectorAll("svg defs [id]")].map(node => node.id);
          return ids.filter((id, index) => ids.indexOf(id) !== index);
        });
        expect(duplicateDefs, `${variant.id} SVG definitions are instance-safe`).toEqual([]);
        audit.push({ id: variant.id, width, ...result, rows, duplicateDefs, ...operations });
        if (variant === variants[0]) {
          await card.scrollIntoViewIfNeeded();
          await card.screenshot({ path: `${evidence}/${family}-${width}-all-variants-reduce.png` });
        }
      }
    }
    await writeFile(`${evidence}/${family}-render-audit.json`, `${JSON.stringify({ family, count: variants.length, errors, audit }, null, 2)}\n`);
    expect(errors, `${family} browser errors`).toEqual([]);
  });
}

test("[T14] paused and reduced live charts keep mouse-driven tooltip reading", async ({ page }) => {
  for (const reducedMotion of ["no-preference", "reduce"] as const) {
    await page.emulateMedia({ reducedMotion });
    await page.goto("/#chart-live-line");
    const card = page.locator('[data-chart-variant="live-line-default"]');
    await card.scrollIntoViewIfNeeded();
    const svg = card.locator('[data-rain-id="ui-chart-live-line"] svg').first();
    await expect(svg).toBeVisible();
    if (reducedMotion === "no-preference") await card.getByRole("button", { name: "暂停实时", exact: true }).click();
    const box = (await svg.boundingBox())!;
    const tooltip = card.locator(".rain-chart-tooltip");
    await page.mouse.move(box.x + box.width * .4, box.y + box.height * .5);
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toContainText("实时人数 · 插值读数");
    const first = await tooltip.textContent();
    await page.mouse.move(box.x + box.width * .65, box.y + box.height * .5);
    await expect.poll(() => tooltip.textContent()).not.toBe(first);
    await page.mouse.move(box.x - 10, box.y - 10);
    await expect(tooltip).toHaveCount(0);
  }
});

test("[T15] current Gauge value and paused Live point buffer are present in downloaded calls", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#chart-gauge");
  const gauge = page.locator('[data-chart-variant="gauge-default"]');
  await gauge.scrollIntoViewIfNeeded();
  await gauge.getByRole("button", { name: "0%", exact: true }).click();
  await gauge.getByText("查看本卡代码", { exact: true }).click();
  await expect(gauge.locator("pre")).toContainText('"value":0');
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#chart-live-line");
  const live = page.locator('[data-chart-variant="live-line-default"]');
  await live.scrollIntoViewIfNeeded();
  await live.getByRole("button", { name: "暂停实时", exact: true }).click();
  await live.getByText("查看本卡代码", { exact: true }).click();
  await expect(live.locator("pre")).toContainText('"paused":true');
  await expect(live.locator("pre")).toContainText('"points":[');
  await expect(live.locator("pre")).toContainText('"frozenNow":');
  await live.getByRole("button", { name: "追加一次", exact: true }).click();
  const raw = await live.locator("pre").textContent();
  const snapshot = JSON.parse(raw!.match(/useState<VariantSettings>\((\{.+\})\);/)![1]!);
  expect(snapshot.points.length).toBe(await live.locator("tbody tr").count());
  expect(snapshot.points.at(-1).time * 1000).toBeCloseTo(snapshot.frozenNow, 1);
});
