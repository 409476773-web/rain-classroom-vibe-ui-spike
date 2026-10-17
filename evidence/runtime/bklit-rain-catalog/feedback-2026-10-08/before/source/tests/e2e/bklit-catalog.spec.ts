import { expect, test } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const evidence = process.env.RAIN_BKLIT_CATALOG_EVIDENCE_DIR ?? "evidence/runtime/bklit-rain-catalog/runtime";
const groups = { P1:["area","line","bar","composed"], P2:["pie","ring","radar","scatter","funnel","gauge"], P3:["sankey","sunburst","heatmap","choropleth"], P4:["candlestick","profit-loss","live-line"] };

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
    await page.getByRole("button", { name:"更新数据", exact:true }).click();
    await expect(page.getByRole("status").last()).toContainText("已更新 1 次");
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
    await page.getByRole("combobox", { name:"示例状态" }).selectOption("empty");
    await expect(host).toContainText("暂无数据");
    await page.getByRole("combobox", { name:"示例状态" }).selectOption("invalid");
    await expect(host).toContainText("已拒绝无效数据");
    await page.getByRole("combobox", { name:"示例状态" }).selectOption("zero");
    await expect(host).not.toContainText("NaN");
    await page.getByRole("combobox", { name:"示例状态" }).selectOption("missing");
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
