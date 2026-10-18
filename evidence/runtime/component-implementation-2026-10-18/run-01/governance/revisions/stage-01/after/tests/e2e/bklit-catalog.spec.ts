import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const evidence = process.env.RAIN_BKLIT_CATALOG_EVIDENCE_DIR ?? evidenceOutputPath("evidence/runtime/chart-mini-refinement/browser/catalog");
const groups = { P1:["area","line","bar","composed"], P2:["pie","ring","radar","scatter","funnel","gauge"], P3:["sankey","sunburst","heatmap","choropleth"], P4:["candlestick","profit-loss","live-line"] };

for (const id of ["line", "area", "bar", "pie", "ring"]) test(`[mini] ${id} switches both sizes, keeps comparison slots and restores standard geometry`, async ({ page }) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`/bklit-catalog.html#chart-${id}`);
  const hosts = page.locator(`[data-rain-id="chart-${id}"]`), primary = hosts.first();
  await expect(primary.locator("svg").first()).toBeVisible();
  const standardWidth = await primary.locator("svg").first().evaluate(node => node.getBoundingClientRect().width);
  await page.getByRole("combobox", { name: "图表尺寸", exact: true }).selectOption("mini");
  await page.getByRole("button", { name: "对照实例", exact: true }).click();
  await expect(hosts).toHaveCount(2);
  const facts = [];
  for (const width of [1440, 916, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    let reading: string | null = null;
    for (const size of ["compact", "comfortable"]) {
      await page.getByRole("combobox", { name: "迷你型号", exact: true }).selectOption(size);
      await expect(primary.locator("[data-mini-kind]").first()).toHaveAttribute("data-size", size);
      const identities = await primary.locator("[data-mini-kind]").evaluateAll(nodes => nodes.map(node => node.getAttribute("data-mini-kind")));
      const actualReading = await primary.locator("tbody").textContent();
      if (reading !== null) expect(actualReading).toBe(reading);
      reading = actualReading;
      const geometry = await hosts.evaluateAll(nodes => nodes.map(node => [...node.querySelectorAll("[data-mini-kind]")].map(mini => {
        const b = mini.getBoundingClientRect();
        return { kind: mini.getAttribute("data-mini-kind"), size: mini.getAttribute("data-size"), width: b.width, height: b.height };
      })));
      expect(geometry[0]).toEqual(geometry[1]);
      for (const state of ["zero", "missing"]) {
        await page.getByRole("combobox", { name: "示例状态", exact: true }).selectOption(state);
        expect(await primary.locator("[data-mini-kind]").evaluateAll(nodes => nodes.map(node => node.getAttribute("data-mini-kind")))).toEqual(identities);
        if (state === "missing") await expect(primary).toContainText("缺测");
        expect(await hosts.locator('path[d*="NaN"], path[d*="Infinity"]').count()).toBe(0);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      }
      await page.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("normal");
      await mkdir(`${evidence}/mini`, { recursive: true });
      await page.screenshot({ path: `${evidence}/mini/${id}-${size}-${width}.png`, fullPage: true });
      facts.push({ width, size, geometry, reading: actualReading });
    }
  }
  if (["line", "area"].includes(id)) {
    await page.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("single");
    await expect(primary.locator("[data-mini-kind] svg circle").first()).toBeVisible();
    await primary.getByText("查看精确数据", { exact: true }).click();
    await expect(primary.locator("tbody tr")).toHaveCount(1);
    const date = await primary.locator("tbody th").first().innerText();
    await primary.locator("[data-mini-kind] svg").first().hover();
    await expect(primary.locator(".rain-chart-tooltip")).toContainText(date);
    await page.locator('[data-chart-default-controls]').getByRole("button", { name: "重播动效", exact: true }).click();
    await expect(primary.locator("[data-mini-kind] svg circle").first()).toBeVisible();
  }
  await page.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("normal");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole("combobox", { name: "图表尺寸", exact: true }).selectOption("standard");
  await expect(primary.locator("[data-mini-kind]")).toHaveCount(0);
  await expect.poll(() => primary.locator("svg").first().evaluate(node => node.getBoundingClientRect().width)).toBeCloseTo(standardWidth, 0);
  await writeFile(`${evidence}/mini/${id}-facts.json`, JSON.stringify(facts, null, 2));
});

test("[feedback] stacked bars use the cumulative domain through recipe, series and data changes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const facts = [];
  for (const width of [880, 390]) {
    await page.setViewportSize({ width, height: 764 });
    await page.goto(`/bklit-catalog.html?feedback-width=${width}#chart-bar`);
    const host = page.locator('[data-rain-id="chart-bar"]').first();
    await page.getByRole("combobox", { name: "柱形配方", exact: true }).selectOption("stacked");
    for (const count of [3, 5]) {
      await page.getByRole("combobox", { name: "系列数", exact: true }).selectOption(String(count));
      for (const recipe of ["category-wide", "bar-gradient", "bar-fade"]) {
        await page.getByRole("combobox", { name: "视觉配方", exact: true }).selectOption(recipe);
        await page.waitForTimeout(200);
        const geometry = await host.evaluate(el => {
          const plot = el.querySelector("svg")!.getBoundingClientRect();
          const bars = [...el.querySelectorAll('g[class^="bar-series-"] rect')].map(x => x.getBoundingClientRect());
          const ticks = [...el.querySelectorAll("span.text-chart-label")].map(x => Number(x.textContent)).filter(Number.isFinite);
          return { minTop: Math.min(...bars.map(x => x.top)) - plot.top, maxBottom: Math.max(...bars.map(x => x.bottom)) - plot.top, height: plot.height, count: bars.length, maxTick: Math.max(...ticks) };
        });
        facts.push({ width, seriesCount: count, recipe, ...geometry });
        await mkdir(evidence, { recursive: true });
        await writeFile(`${evidence}/stacked-bars-facts.json`, JSON.stringify(facts, null, 2));
        await page.screenshot({ path: `${evidence}/stacked-bars-${width}-${count}-${recipe}.png`, fullPage: true });
        expect(geometry.count).toBe(count * 6);
        expect(geometry.minTop).toBeGreaterThanOrEqual(23);
        expect(geometry.maxBottom).toBeLessThanOrEqual(geometry.height - 37);
        expect(geometry.maxTick).toBeGreaterThanOrEqual(count === 3 ? 102 : 132);
      }
    }
    await host.getByText("查看精确数据", { exact: true }).click();
    await expect(host.locator("table")).toBeVisible();
    const previous = Number(await host.locator("tbody td").first().innerText());
    await page.locator("[data-chart-default-controls]").getByRole("button", { name: "更新数据", exact: true }).click();
    await expect(host.locator("tbody td").first()).toHaveText(String(previous + 3));
    await expect.poll(() => host.locator('g[class^="bar-series-"] rect').evaluateAll(nodes => Math.min(...nodes.map(x => Number(x.getAttribute("y")))))).toBeGreaterThanOrEqual(0);
    await page.getByRole("combobox", { name: "柱形配方", exact: true }).selectOption("grouped");
    await expect(host.locator(".legend-container")).toContainText("参与人数");
    await expect.poll(() => host.locator('g[class^="bar-series-"] rect').evaluateAll(nodes => Math.min(...nodes.map(x => Number(x.getAttribute("y")))))).toBeGreaterThanOrEqual(0);
  }
});

test("[feedback] compact labels, legend gaps and gauge readings stay readable at 880 and 390px", async ({ page }) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await mkdir(evidence, { recursive: true });
  const facts = [];
  for (const width of [880, 390]) {
    await page.setViewportSize({ width, height: 764 });
    for (const id of ["line", "bar", "gauge", "sunburst", "funnel"]) {
      await page.goto(`/bklit-catalog.html#chart-${id}`);
      const host = page.locator(`[data-rain-id="chart-${id}"]`).first();
      await expect(host.locator("svg").first()).toBeVisible();
      await page.waitForTimeout(2200);
      if (id === "line" || id === "bar") {
        const legend = await host.locator(".legend-container").evaluate(el => ({
          fontSizes: [...el.querySelectorAll("button > span:last-child")].map(x => getComputedStyle(x).fontSize),
          columnGap: getComputedStyle(el).columnGap,
        }));
        expect(legend.fontSizes.length).toBeGreaterThan(0);
        expect(legend.fontSizes.every(size => size === "13px")).toBe(true);
        expect(legend.columnGap).toBe("24px");
        facts.push({ width, id, legend });
      }
      if (id === "gauge") {
        const arc = await host.locator('[data-rain-id="ui-chart-gauge"]').evaluate(el => {
          const plot = el.querySelector("svg")!.getBoundingClientRect();
          const reading = el.querySelector("span.tabular-nums")!.parentElement!.getBoundingClientRect();
          return { centerOffset: (reading.top + reading.height / 2) - (plot.top + plot.height / 2) };
        });
        expect(Math.abs(arc.centerOffset)).toBeLessThan(1);
        await page.screenshot({ path: `${evidence}/gauge-arc-${width}.png`, fullPage: true });
        await page.getByRole("combobox", { name: "仪表形态", exact: true }).selectOption("linear");
        await page.waitForTimeout(250);
        const linear = await host.locator('[data-rain-id="ui-chart-gauge"]').evaluate(el => {
          const label = el.querySelector("span.text-chart-foreground-muted")!;
          const labelBox = label.getBoundingClientRect();
          const reading = label.parentElement!;
          const track = el.querySelector("svg")!.getBoundingClientRect();
          return { labelWidth: labelBox.width, labelHeight: labelBox.height, labelFont: getComputedStyle(label).fontSize, readingDirection: getComputedStyle(reading).flexDirection, readingGap: track.top - reading.getBoundingClientRect().bottom };
        });
        expect(linear.labelWidth).toBeGreaterThan(20);
        expect(linear.labelHeight).toBeGreaterThan(0);
        expect(parseFloat(linear.labelFont)).toBeLessThanOrEqual(13);
        expect(linear.readingDirection).toBe("row");
        expect(linear.readingGap).toBeGreaterThanOrEqual(7);
        expect(linear.readingGap).toBeLessThanOrEqual(9);
        facts.push({ width, id, arc, linear });
      }
      if (id === "sunburst") {
        const labels = await host.locator("svg text").evaluateAll(nodes => nodes.map(x => ({ label: x.textContent, fill: getComputedStyle(x).fill, stroke: getComputedStyle(x).stroke, fontSize: getComputedStyle(x).fontSize })));
        expect(labels.length).toBeGreaterThan(0);
        expect(labels.every(label => label.fill === "rgb(255, 255, 255)" && label.stroke === "none")).toBe(true);
        facts.push({ width, id, labels });
      }
      if (id === "funnel") {
        const numbers = await host.locator(".font-semibold.text-foreground").evaluateAll(nodes => nodes.map(x => ({ label: x.textContent, fontSize: getComputedStyle(x).fontSize, weight: getComputedStyle(x).fontWeight, color: getComputedStyle(x).color, expected: getComputedStyle(x).getPropertyValue("--rain-category-text-neutral-4").trim() })));
        expect(numbers.length).toBe(4);
        expect(numbers.every(x => x.fontSize === "13px" && x.weight === "400")).toBe(true);
        facts.push({ width, id, numbers });
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      await page.screenshot({ path: `${evidence}/${id}-${width}.png`, fullPage: true });
    }
  }
  await writeFile(`${evidence}/style-facts.json`, JSON.stringify(facts, null, 2));
});

test("[P0] Rain chart catalog is a usable independent entry", async ({ page }) => {
  await page.goto("/bklit-catalog.html");
  await expect(page.getByRole("heading", { name: "Rain 图表库", exact: true })).toBeVisible({ timeout: 5000 });
  await expect(page.getByRole("navigation", { name: "图型目录" }).getByRole("link")).toHaveCount(17);
  await expect(page.locator('[data-rain-id="chart-area"] svg').first()).toBeVisible();
});

for (const [phase, ids] of Object.entries(groups)) for (const id of ids) for (const width of [1440,900,390]) {
  test(`[${phase}] ${id} renders, reads and updates at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.setViewportSize({ width, height: 1000 });
    if (width !== 1440) await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/bklit-catalog.html#chart-${id}`);
    const host = page.locator(`[data-rain-id="chart-${id}"]`).first();
    await expect(host.locator("svg").first()).toBeVisible();
    await expect(host.locator('svg :is(path[d],rect,circle)').first()).toBeAttached();
    await page.waitForTimeout(width === 1440 ? 1800 : 300);
    await mkdir(evidence, { recursive: true });
    await page.screenshot({ path: `${evidence}/${id}-${width}.png`, fullPage: true });
    await host.getByText("查看精确数据", { exact:true }).click();
    await expect(host.locator("table")).toBeVisible();
    const before = await host.locator("tbody").innerText();
    expect(await host.locator("tbody tr").count()).toBeGreaterThan(0);
    await page.locator("[data-chart-default-controls]").getByRole("button", { name:"更新数据", exact:true }).click();
    await expect(page.locator(".rain-chart-catalog__status")).toContainText("已更新 1 次");
    await expect.poll(() => host.locator("tbody").innerText()).not.toBe(before);
    await expect.poll(() => host.locator("svg").evaluateAll(nodes => Math.max(0, ...nodes.map(node => node.getBoundingClientRect().width)))).toBeGreaterThan(30);
    const svgIndex = await host.locator("svg").evaluateAll(nodes => nodes.map((node,i) => ({ i, area:node.getBoundingClientRect().width*node.getBoundingClientRect().height })).sort((a,b) => b.area-a.area)[0]!.i);
    const plot = host.locator("svg").nth(svgIndex);
    const geometry = await plot.evaluate(svg => ({
      width: svg.getBoundingClientRect().width, height: svg.getBoundingClientRect().height,
      invalid: [...svg.querySelectorAll("path[d]")].filter(p => /NaN|Infinity/.test(p.getAttribute("d") ?? "")).length,
      labelColor: [...svg.querySelectorAll("text")].map(t => getComputedStyle(t).fill).slice(0,12),
    }));
    expect(geometry.width).toBeGreaterThan(30); expect(geometry.height).toBeGreaterThan(30); expect(geometry.invalid).toBe(0);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(overflow).toBe(false);
    const hoverable = !["gauge","live-line"].includes(id);
    if (hoverable) {
      const box = await plot.boundingBox();
      await page.mouse.move(box!.x+geometry.width*.48,box!.y+geometry.height*.45);
      await page.waitForTimeout(300);
      await page.screenshot({ path: `${evidence}/${id}-${width}-hover.png`, fullPage: true });
    }
    expect(errors).toEqual([]);
    await writeFile(`${evidence}/${id}-${width}-facts.json`, JSON.stringify({ id,width,geometry,errors,hoverChecked:hoverable },null,2));
  });
}

test("[P6] empty, invalid, zero and missing are honest states for all entries", async ({ page }) => {
  await page.emulateMedia({ reducedMotion:"reduce" });
  const errors: string[] = []; page.on("pageerror", e => errors.push(e.message));
  for (const id of Object.values(groups).flat()) {
    await page.goto(`/bklit-catalog.html#chart-${id}`);
    const host = page.locator(`[data-rain-id="chart-${id}"]`).first();
    await page.locator("[data-chart-default-controls]").getByRole("combobox", { name:"示例状态", exact: true }).selectOption("empty");
    await expect(host).toContainText("暂无数据");
    await page.locator("[data-chart-default-controls]").getByRole("combobox", { name:"示例状态", exact: true }).selectOption("invalid");
    await expect(host).toContainText("已拒绝无效数据");
    await page.locator("[data-chart-default-controls]").getByRole("combobox", { name:"示例状态", exact: true }).selectOption("zero");
    await expect(host).not.toContainText("NaN");
    await page.locator("[data-chart-default-controls]").getByRole("combobox", { name:"示例状态", exact: true }).selectOption("missing");
    if (!["heatmap","choropleth"].includes(id)) await expect(host).toContainText("缺测");
  }
  expect(errors).toEqual([]);
});

test("[P4] multiple candlesticks keep independent SVG gradients", async ({ page }) => {
  await page.goto("/bklit-catalog.html#chart-candlestick");
  await page.getByRole("button", { name: "对照实例" }).click();
  await expect(page.locator('[data-rain-id="chart-candlestick"]')).toHaveCount(2);
  await expect(page.locator('[data-rain-id="chart-candlestick"] svg').first()).toBeVisible();
  const ids = await page.locator("linearGradient[id]").evaluateAll(nodes => nodes.map(node => node.id));
  expect(ids.length).toBeGreaterThan(1);
  expect(new Set(ids).size).toBe(ids.length);
});

test("[P5] multiple funnels isolate gradient definitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion:"reduce" });
  await page.goto("/bklit-catalog.html#chart-funnel");
  await page.getByRole("button", { name:"对照实例" }).click();
  await expect(page.locator('[data-rain-id="chart-funnel"]')).toHaveCount(2);
  await expect.poll(() => page.locator("linearGradient[id]").count()).toBeGreaterThan(1);
  const ids = await page.locator("linearGradient[id]").evaluateAll(nodes => nodes.map(node => node.id));
  expect(new Set(ids).size).toBe(ids.length);
});

test("[P1] composed bars leave visible space to both axes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion:"reduce" });
  for (const width of [1440,900,390]) {
    await page.setViewportSize({width,height:1000});
    await page.goto("/bklit-catalog.html#chart-composed");
    const host = page.locator('[data-rain-id="chart-composed"]');
    await expect(host.locator('.series-bar rect').first()).toBeVisible();
    await page.waitForTimeout(400);
    const facts = await host.evaluate(el => {
      const bars = [...el.querySelectorAll('.series-bar rect')].map(x => x.getBoundingClientRect()).filter(x=>x.height>1);
      const svg = el.querySelector('svg')!.getBoundingClientRect();
      const labels = [...el.querySelectorAll('span.text-chart-label')].filter(x=>/^\d+%?$/.test(x.textContent ?? "")).map(x=>x.getBoundingClientRect());
      const left = labels.filter(x=>x.x<svg.x+svg.width/3), right = labels.filter(x=>x.x>svg.x+svg.width*2/3);
      return {left:Math.min(...bars.map(x=>x.left))-Math.max(...left.map(x=>x.right)),right:Math.min(...right.map(x=>x.left))-Math.max(...bars.map(x=>x.right))};
    });
    expect(facts.left).toBeGreaterThanOrEqual(8);expect(facts.right).toBeGreaterThanOrEqual(8);
  }
});

test("[P6] reducing series after a focused last legend item is safe", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));
  for (const id of ["pie","ring","radar"]) {
    await page.goto(`/bklit-catalog.html#chart-${id}`);
    await page.getByRole("combobox",{name:"系列数"}).selectOption("5");
    const host=page.locator(`[data-rain-id="chart-${id}"]`);
    await host.locator('.rain-chart-legend-button').last().click();
    await page.getByRole("combobox",{name:"系列数"}).selectOption("3");
    await expect(host.locator('svg').first()).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("[P6] reduced-motion first date and moving highlight are actual readouts", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/bklit-catalog.html#chart-area");
  const chart = page.locator('[data-rain-id="chart-area"]');
  await expect(chart.locator("svg").first()).toBeVisible();
  const box = (await chart.locator("svg").first().boundingBox())!;
  await page.mouse.move(box.x + box.width * .65, box.y + box.height * .4);
  await expect(chart.locator(".rain-chart-tooltip")).toContainText("9月16日");
  const visiblePill = () => chart.locator(".bg-zinc-900").evaluate(el => [...el.querySelectorAll("span")].filter(span => {
    const mask = span.closest(".relative.h-6.overflow-hidden"); if (!mask) return false;
    const text = span.getBoundingClientRect(), clip = mask.getBoundingClientRect();
    return text.y + text.height / 2 >= clip.top && text.y + text.height / 2 < clip.bottom;
  }).map(span => span.textContent).join(" "));
  await expect.poll(visiblePill).toBe("Sep 16");
  await page.goto("/bklit-catalog.html#chart-line");
  const plot = page.locator('[data-rain-id="chart-line"] svg').first();
  await expect(plot).toBeVisible();
  await expect.poll(() => plot.evaluate(node => node.getBoundingClientRect().width)).toBeGreaterThan(500);
  const lineBox = (await plot.boundingBox())!;
  const clips = () => plot.locator("clipPath rect").evaluateAll(nodes => nodes.filter(node => Number.parseFloat(node.getAttribute("width") ?? "") < 400).map(node => Number.parseFloat(node.getAttribute("x") ?? "")));
  await page.mouse.move(lineBox.x + lineBox.width * .22, lineBox.y + lineBox.height * .4);
  await expect.poll(async () => (await clips()).length).toBe(3);
  await page.mouse.move(lineBox.x + lineBox.width * .78, lineBox.y + lineBox.height * .4);
  await page.waitForTimeout(65); const immediate = await clips();
  await page.waitForTimeout(150); const settled = await clips();
  expect(immediate.length).toBe(3);
  immediate.forEach((x, index) => expect(Math.abs(x - settled[index]!)).toBeLessThan(.1));
});

test("[P3] narrow Sankey labels preserve spacing, the node-center readout and single flow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/bklit-catalog.html#chart-sankey");
  const host = page.locator('[data-rain-id="chart-sankey"]');
  for (const state of ["normal", "long"]) {
    await page.getByRole("combobox", { name: "示例状态" }).selectOption(state);
    const node = host.locator(".sankey-nodes rect").first();
    await expect(node).toBeVisible(); await node.hover();
    await expect(host.locator(".rain-chart-tooltip")).toContainText(state === "long" ? "课程入口 · 综合课程学习情况" : "课程入口");
    await expect(host.locator(".rain-chart-tooltip")).toContainText("400");
    const boxes = await host.evaluate(element => {
      const read = (node: Element) => { const b = node.getBoundingClientRect(); return { left: b.left, right: b.right, top: b.top, bottom: b.bottom }; };
      return { labels: [...element.querySelectorAll(".sankey-nodes text")].map(read), nodes: [...element.querySelectorAll(".sankey-nodes rect")].map(read) };
    });
    expect(boxes.labels.every(box => box.left >= 0 && box.right <= 390)).toBe(true);
    for (const label of boxes.labels) for (const rect of boxes.nodes) {
      if (label.bottom > rect.top && label.top < rect.bottom) expect(Math.max(rect.left - label.right, label.left - rect.right)).toBeGreaterThanOrEqual(8);
    }
  }
  await page.getByRole("combobox", { name: "示例状态" }).selectOption("single");
  await expect(host.locator(".sankey-nodes rect")).toHaveCount(2);
  await host.getByText("查看精确数据", { exact: true }).click();
  await expect(host.locator("tbody tr")).toHaveCount(1);
  await expect(host.locator("tbody")).toContainText("420");
});

test("[P2] both native gauge shapes use Rain gradient and real 0/50/100 readings", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/bklit-catalog.html#chart-gauge");
  const host = page.locator('[data-rain-id="chart-gauge"]');
  for (const shape of ["arc", "linear"]) {
    await page.getByRole("combobox", { name: "仪表形态" }).selectOption(shape);
    for (const value of ["50", "100"]) {
      await page.getByRole("combobox", { name: "仪表读数" }).selectOption(value);
      await expect.poll(() => host.locator('svg path[fill^="url("]').count()).toBe(Number(value) / 100 * 40);
      const stops = await host.locator("linearGradient stop").evaluateAll(nodes => nodes.map(node => getComputedStyle(node).stopColor));
      expect(new Set(stops).size).toBe(2);
    }
    await page.getByRole("combobox", { name: "示例状态" }).selectOption("zero");
    await expect(host.locator('svg path[fill^="url("]')).toHaveCount(0);
    await page.getByRole("combobox", { name: "示例状态" }).selectOption("normal");
  }
});
