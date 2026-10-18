import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const evidence = process.env.RAIN_CHART_VARIANTS_EVIDENCE_DIR ?? evidenceOutputPath("evidence/runtime/chart-variants/interactions");

test("six curves repaint actual geometry and the downloaded call stays synchronized", async ({page}) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/#chart-area");
  const card=page.locator('[data-chart-variant="area-interactive"]');await card.scrollIntoViewIfNeeded();
  const curve=card.getByRole("combobox",{name:"图表曲线"});
  await expect(curve.locator("option")).toHaveCount(6);
  const paths=card.locator('path[stroke="var(--chart-1)"]');await expect(paths.first()).toBeVisible();
  const original=await paths.first().getAttribute("d");
  await curve.selectOption("step");await expect.poll(()=>paths.first().getAttribute("d")).not.toBe(original);
  await card.getByText("查看本卡代码",{exact:true}).click();await expect(card.locator("pre")).toContainText('useState<string | undefined>("step")');
  await page.locator("h1").scrollIntoViewIfNeeded();await card.scrollIntoViewIfNeeded();await expect(curve).toHaveValue("step");
});

test("Brush mouse and keyboard control the same visible handles, window, and exact rows",async({page})=>{
  await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/#chart-line");
  const card=page.locator('[data-chart-variant="line-trio-brush"]');await card.scrollIntoViewIfNeeded();
  const left=card.locator(".visx-brush-handle-left");await expect(left).toBeVisible();
  const before=(await left.boundingBox())!.x;
  const start=card.getByRole("slider",{name:"范围开始日期"});await start.focus();await page.keyboard.press("ArrowRight");
  await expect(start).toHaveValue("1");await expect.poll(async()=> (await left.boundingBox())!.x).toBeGreaterThan(before+5);
  await card.getByText("查看精确数据",{exact:true}).click();await expect(card.locator("tbody tr")).toHaveCount(29);
  await card.getByText("查看本卡代码",{exact:true}).click();
  const capturedStart=await page.evaluate(()=>new Date(2026,8,2).toISOString());await expect(card.locator("pre")).toContainText(`"brush":["${capturedStart}"`);
  await card.getByRole("button",{name:"重置范围"}).click();await expect(start).toHaveValue("0");await expect.poll(async()=> (await left.boundingBox())!.x).toBeCloseTo(before,0);
  const right=card.locator(".visx-brush-handle-right");await right.scrollIntoViewIfNeeded();const box=(await right.boundingBox())!;
  const plot=card.locator(".rain-chart-plot path.visx-linepath").first();const fullPath=await plot.getAttribute("d");
  await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x-160,box.y+box.height/2,{steps:8});await page.mouse.up();
  await expect.poll(()=>card.getByRole("slider",{name:"范围结束日期"}).inputValue()).not.toBe("29");
  await expect.poll(async()=> (await right.boundingBox())!.x).toBeLessThan(box.x-100);
  await expect.poll(()=>plot.getAttribute("d")).not.toBe(fullPath);
  const end=Number(await card.getByRole("slider",{name:"范围结束日期"}).inputValue());await expect(card.locator("tbody tr")).toHaveCount(end+1);
  await card.getByRole("button",{name:"重置范围"}).click();await expect(card.locator("tbody tr")).toHaveCount(30);
  await mkdir(evidence,{recursive:true});await card.screenshot({path:`${evidence}/line-brush-pointer-keyboard-reset.png`});
});

test("temporary drag selection disappears after release while data stays complete",async({page})=>{
  await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/#chart-area");
  const card=page.locator('[data-chart-variant="area-segment-selection"]');await card.scrollIntoViewIfNeeded();
  const plot=card.locator('[data-rain-id="ui-chart-area"] svg').first();const box=(await plot.boundingBox())!;
  const band=card.locator('rect[fill="var(--chart-segment-background)"]');
  const originalRows=await card.locator("tbody tr").count();
  await page.mouse.move(box.x+120,box.y+100);await page.mouse.down();await page.mouse.move(box.x+360,box.y+100,{steps:8});await expect(band).toBeVisible();
  await page.mouse.up();await expect(band).toHaveCount(0);
  await card.getByText("查看精确数据",{exact:true}).click();await expect(card.locator("tbody tr")).toHaveCount(originalRows);
});

test("live pause keeps the actual path offscreen and in background, manual step updates the window",async({page})=>{
  await page.clock.install();await page.goto("/#chart-live-line");
  const card=page.locator('[data-chart-variant="live-line-default"]');await card.scrollIntoViewIfNeeded();
  await expect(card.locator('[data-live-count]')).toBeVisible();await page.clock.runFor(1000);
  await card.getByRole("button",{name:"暂停实时",exact:true}).click();
  const path=card.locator('[data-rain-id="ui-chart-live-line"] path.visx-linepath').first();const before=await path.getAttribute("d");
  const count=await card.locator('[data-live-count]').getAttribute("data-live-count");
  await card.getByRole("button",{name:"恢复实时",exact:true}).blur();await page.locator("h1").scrollIntoViewIfNeeded();
  await page.clock.fastForward(120_000);await card.scrollIntoViewIfNeeded();await page.clock.runFor(50);
  await expect(card.getByRole("button",{name:"恢复实时",exact:true})).toBeVisible();await expect(path).toHaveAttribute("d",before!);await expect(card.locator('[data-live-count]')).toHaveAttribute("data-live-count",count!);
  await card.getByRole("button",{name:"重播动效",exact:true}).click();await page.clock.runFor(50);
  await expect(path).toHaveAttribute("d",before!);await expect(card.locator("[data-live-count]")).toHaveAttribute("data-live-count",count!);
  await card.getByRole("button",{name:"追加一次",exact:true}).click();await page.clock.runFor(50);
  await expect.poll(()=>path.getAttribute("d")).not.toBe(before);
  await card.getByRole("button",{name:"恢复实时",exact:true}).click();await page.clock.runFor(650);
  await expect.poll(()=>card.locator('[data-live-count]').getAttribute("data-live-count")).not.toBe(count);
  await page.emulateMedia({reducedMotion:"reduce"});await expect(card.locator('[data-live-paused]')).toHaveAttribute("data-live-paused","true");
});

test("horizontal bars have a visible numeric axis and native 3D segments align without extra stack gaps",async({page})=>{
  await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/#chart-bar");
  const horizontal=page.locator('[data-chart-variant="bar-horizontal"]');await horizontal.scrollIntoViewIfNeeded();await expect(horizontal.locator('g[aria-label="人数刻度"] text').first()).toBeVisible();
  const stack=page.locator('[data-chart-variant="bar-3d-stacked"]');await stack.scrollIntoViewIfNeeded();
  const secondSeries=stack.locator('g[class^="bar-series-"]').nth(1).locator("rect");await expect(secondSeries).toHaveCount(6);
  const values=await secondSeries.evaluateAll(nodes=>nodes.map(node=>Number(node.getAttribute("y"))));
  expect(values.length).toBe(6);expect(values.every(Number.isFinite)).toBe(true);
});

test("downloaded calls preserve current loading, zero, long-label, range and hierarchy choices", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const cases = [
    { route: "bar", id: "bar-loading", choose: async (card: ReturnType<typeof page.locator>) => card.getByRole("button", { name: "显示数据", exact: true }).click(), expected: '"loading":false' },
    { route: "line", id: "line-loading", choose: async (card: ReturnType<typeof page.locator>) => card.getByRole("button", { name: "显示数据", exact: true }).click(), expected: '"loading":false' },
    { route: "pie", id: "pie-default", choose: async (card: ReturnType<typeof page.locator>) => card.getByRole("combobox", { name: "饼图示例状态" }).selectOption("zero"), expected: '"state":"zero"' },
    { route: "ring", id: "ring-default", choose: async (card: ReturnType<typeof page.locator>) => card.getByRole("combobox", { name: "进度环示例状态" }).selectOption("long"), expected: '"state":"long"' },
    { route: "gauge", id: "gauge-default", choose: async (card: ReturnType<typeof page.locator>) => card.getByRole("button", { name: "0%", exact: true }).click(), expected: '"value":0' },
    { route: "heatmap", id: "heatmap-loading", choose: async (card: ReturnType<typeof page.locator>) => card.getByRole("button", { name: "显示数据", exact: true }).click(), expected: '"loading":false' },
    { route: "line", id: "line-trio-brush", choose: async (card: ReturnType<typeof page.locator>) => { await card.getByRole("slider", { name: "范围开始日期" }).focus(); await page.keyboard.press("ArrowRight"); }, expected: '"brush":[' },
    { route: "sunburst", id: "sunburst-legend", choose: async (card: ReturnType<typeof page.locator>) => card.getByRole("button", { name: /查看下级/ }).first().click(), expected: '"focusId":' },
  ];
  for (const entry of cases) {
    await page.goto(`/#chart-${entry.route}`);
    const card = page.locator(`[data-chart-variant="${entry.id}"]`);
    await card.scrollIntoViewIfNeeded(); await entry.choose(card);
    await card.getByText("查看本卡代码", { exact: true }).click();
    await expect(card.locator("pre"), entry.id).toContainText(entry.expected);
    const download = await card.getByRole("link", { name: "下载 main.tsx", exact: true }).getAttribute("href");
    expect(decodeURIComponent(download!), entry.id).toContain(entry.expected);
  }
  await page.emulateMedia({ reducedMotion: "no-preference" }); await page.goto("/#chart-live-line");
  const live = page.locator('[data-chart-variant="live-line-default"]'); await live.scrollIntoViewIfNeeded();
  await live.getByRole("button", { name: "暂停实时", exact: true }).click();
  await live.getByText("查看本卡代码", { exact: true }).click();
  await expect(live.locator("pre")).toContainText('"paused":true');
  await expect(live.locator("pre")).toContainText('"points":[');
});

test("normal funnel replay has native label entry while reduced motion finishes immediately", async ({ page }) => {
  await page.clock.install(); await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#chart-funnel");
  const card=page.locator('[data-chart-variant="funnel-default"]'); await card.scrollIntoViewIfNeeded();
  const opacity=()=>card.locator('[data-slot="chart-root"] span.font-medium').evaluateAll(labels=>labels.map(label=>Number(label.closest<HTMLElement>(".absolute.inset-0")?.style.opacity)));
  await page.clock.runFor(1800); await expect.poll(opacity).toEqual([1,1,1,1]);
  await card.getByRole("button",{name:"重播动效",exact:true}).click();
  expect((await opacity()).some(value=>value<1)).toBe(true);
  await page.clock.runFor(1800); await expect.poll(opacity).toEqual([1,1,1,1]);
  await page.emulateMedia({ reducedMotion: "reduce" }); await card.getByRole("button",{name:"重播动效",exact:true}).click();
  await expect.poll(opacity).toEqual([1,1,1,1]);
  await page.setViewportSize({width:900,height:1000}); await card.scrollIntoViewIfNeeded();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  await mkdir(evidence,{recursive:true}); await card.screenshot({path:`${evidence}/funnel-normal-replay-reduced-900.png`});
});
