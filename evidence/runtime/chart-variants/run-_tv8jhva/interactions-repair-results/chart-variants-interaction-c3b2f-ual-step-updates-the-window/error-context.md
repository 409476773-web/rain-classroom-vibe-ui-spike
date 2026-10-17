# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-variants-interactions.spec.ts >> live pause keeps the actual path offscreen and in background, manual step updates the window
- Location: tests/e2e/chart-variants-interactions.spec.ts:45:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-chart-variant="live-line-default"]').locator('[data-live-paused]')
Expected: "true"
Received: "false"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for locator('[data-chart-variant="live-line-default"]').locator('[data-live-paused]')
    5 × locator resolved to <span role="status" data-live-count="63" class="rain-chart-note" data-live-paused="false">每 0.6 秒更新 · 63/120 条</span>
      - unexpected value "false"
    - locator resolved to <span role="status" data-live-count="64" class="rain-chart-note" data-live-paused="false">每 0.6 秒更新 · 64/120 条</span>
    - unexpected value "false"
    - locator resolved to <span role="status" data-live-count="65" class="rain-chart-note" data-live-paused="false">每 0.6 秒更新 · 65/120 条</span>
    - unexpected value "false"
    - locator resolved to <span role="status" data-live-count="66" class="rain-chart-note" data-live-paused="false">每 0.6 秒更新 · 66/120 条</span>
    - unexpected value "false"
    - locator resolved to <span role="status" data-live-count="67" class="rain-chart-note" data-live-paused="false">每 0.6 秒更新 · 67/120 条</span>
    2 × unexpected value "false"
      - locator resolved to <span role="status" data-live-count="68" class="rain-chart-note" data-live-paused="false">每 0.6 秒更新 · 68/120 条</span>
    - unexpected value "false"
    - locator resolved to <span role="status" data-live-count="69" class="rain-chart-note" data-live-paused="false">每 0.6 秒更新 · 69/120 条</span>
    - unexpected value "false"
    - locator resolved to <span role="status" data-live-count="70" class="rain-chart-note" data-live-paused="false">每 0.6 秒更新 · 70/120 条</span>
    - unexpected value "false"
    - locator resolved to <span role="status" data-live-count="71" class="rain-chart-note" data-live-paused="false">每 0.6 秒更新 · 71/120 条</span>
    - unexpected value "false"

```

```yaml
- status: 每 0.6 秒更新 · 71/120 条
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { mkdir } from "node:fs/promises";
  3  | const evidence = process.env.RAIN_CHART_VARIANTS_EVIDENCE_DIR ?? "evidence/runtime/chart-variants/interactions";
  4  | 
  5  | test("six curves repaint actual geometry and the downloaded call stays synchronized", async ({page}) => {
  6  |   await page.emulateMedia({reducedMotion:"reduce"});
  7  |   await page.goto("/#chart-area");
  8  |   const card=page.locator('[data-chart-variant="area-interactive"]');await card.scrollIntoViewIfNeeded();
  9  |   const curve=card.getByRole("combobox",{name:"图表曲线"});
  10 |   await expect(curve.locator("option")).toHaveCount(6);
  11 |   const paths=card.locator('path[stroke="var(--chart-1)"]');await expect(paths.first()).toBeVisible();
  12 |   const original=await paths.first().getAttribute("d");
  13 |   await curve.selectOption("step");await expect.poll(()=>paths.first().getAttribute("d")).not.toBe(original);
  14 |   await card.getByText("查看本卡代码",{exact:true}).click();await expect(card.locator("pre")).toContainText('curveName="step"');
  15 |   await page.locator("h1").scrollIntoViewIfNeeded();await card.scrollIntoViewIfNeeded();await expect(curve).toHaveValue("step");
  16 | });
  17 | 
  18 | test("Brush mouse and keyboard control the same visible handles, window, and exact rows",async({page})=>{
  19 |   await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/#chart-line");
  20 |   const card=page.locator('[data-chart-variant="line-trio-brush"]');await card.scrollIntoViewIfNeeded();
  21 |   const left=card.locator(".visx-brush-handle-left");await expect(left).toBeVisible();
  22 |   const before=(await left.boundingBox())!.x;
  23 |   const start=card.getByRole("slider",{name:"范围开始日期"});await start.focus();await page.keyboard.press("ArrowRight");
  24 |   await expect(start).toHaveValue("1");await expect.poll(async()=> (await left.boundingBox())!.x).toBeGreaterThan(before+5);
  25 |   await card.getByText("查看精确数据",{exact:true}).click();await expect(card.locator("tbody tr")).toHaveCount(29);
  26 |   await card.getByRole("button",{name:"重置范围"}).click();await expect(start).toHaveValue("0");await expect.poll(async()=> (await left.boundingBox())!.x).toBeCloseTo(before,0);
  27 |   const right=card.locator(".visx-brush-handle-right");const box=(await right.boundingBox())!;
  28 |   await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x-160,box.y+box.height/2,{steps:8});await page.mouse.up();
  29 |   await expect.poll(()=>card.getByRole("slider",{name:"范围结束日期"}).inputValue()).not.toBe("29");
  30 |   await card.getByRole("button",{name:"重置范围"}).click();await expect(card.locator("tbody tr")).toHaveCount(30);
  31 |   await mkdir(evidence,{recursive:true});await card.screenshot({path:`${evidence}/line-brush-pointer-keyboard-reset.png`});
  32 | });
  33 | 
  34 | test("temporary drag selection disappears after release while data stays complete",async({page})=>{
  35 |   await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/#chart-area");
  36 |   const card=page.locator('[data-chart-variant="area-segment-selection"]');await card.scrollIntoViewIfNeeded();
  37 |   const plot=card.locator('[data-rain-id="ui-chart-area"] svg').first();const box=(await plot.boundingBox())!;
  38 |   const band=card.locator('rect[fill="var(--chart-segment-background)"]');
  39 |   const originalRows=await card.locator("tbody tr").count();
  40 |   await page.mouse.move(box.x+120,box.y+100);await page.mouse.down();await page.mouse.move(box.x+360,box.y+100,{steps:8});await expect(band).toBeVisible();
  41 |   await page.mouse.up();await expect(band).toHaveCount(0);
  42 |   await card.getByText("查看精确数据",{exact:true}).click();await expect(card.locator("tbody tr")).toHaveCount(originalRows);
  43 | });
  44 | 
  45 | test("live pause keeps the actual path offscreen and in background, manual step updates the window",async({page})=>{
  46 |   await page.clock.install();await page.goto("/#chart-live-line");
  47 |   const card=page.locator('[data-chart-variant="live-line-default"]');await card.scrollIntoViewIfNeeded();
  48 |   await expect(card.locator('[data-live-count]')).toBeVisible();await page.clock.runFor(1000);
  49 |   await card.getByRole("button",{name:"暂停实时",exact:true}).click();
  50 |   const path=card.locator('[data-rain-id="ui-chart-live-line"] path.visx-linepath').first();const before=await path.getAttribute("d");
  51 |   const count=await card.locator('[data-live-count]').getAttribute("data-live-count");
  52 |   await card.getByRole("button",{name:"恢复实时",exact:true}).blur();await page.locator("h1").scrollIntoViewIfNeeded();
  53 |   await page.clock.fastForward(120_000);await card.scrollIntoViewIfNeeded();await page.clock.runFor(50);
  54 |   await expect(card.getByRole("button",{name:"恢复实时",exact:true})).toBeVisible();await expect(path).toHaveAttribute("d",before!);await expect(card.locator('[data-live-count]')).toHaveAttribute("data-live-count",count!);
  55 |   await card.getByRole("button",{name:"追加一次",exact:true}).click();await page.clock.runFor(50);
  56 |   await expect.poll(()=>path.getAttribute("d")).not.toBe(before);
  57 |   await card.getByRole("button",{name:"恢复实时",exact:true}).click();await page.clock.runFor(650);
  58 |   await expect.poll(()=>card.locator('[data-live-count]').getAttribute("data-live-count")).not.toBe(count);
> 59 |   await page.emulateMedia({reducedMotion:"reduce"});await expect(card.locator('[data-live-paused]')).toHaveAttribute("data-live-paused","true");
     |                                                                                                      ^ Error: expect(locator).toHaveAttribute(expected) failed
  60 | });
  61 | 
  62 | test("horizontal bars have a visible numeric axis and native 3D segments align without extra stack gaps",async({page})=>{
  63 |   await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/#chart-bar");
  64 |   const horizontal=page.locator('[data-chart-variant="bar-horizontal"]');await horizontal.scrollIntoViewIfNeeded();await expect(horizontal.locator('g[aria-label="人数刻度"] text').first()).toBeVisible();
  65 |   const stack=page.locator('[data-chart-variant="bar-3d-stacked"]');await stack.scrollIntoViewIfNeeded();
  66 |   const secondSeries=stack.locator('g[class^="bar-series-"]').nth(1).locator("rect");await expect(secondSeries).toHaveCount(6);
  67 |   const values=await secondSeries.evaluateAll(nodes=>nodes.map(node=>Number(node.getAttribute("y"))));
  68 |   expect(values.length).toBe(6);expect(values.every(Number.isFinite)).toBe(true);
  69 | });
  70 | 
```