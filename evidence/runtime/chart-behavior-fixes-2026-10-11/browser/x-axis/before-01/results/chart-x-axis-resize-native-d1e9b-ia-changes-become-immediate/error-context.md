# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-x-axis-resize.spec.ts >> native consumer: same-size data positions animate normally and mounted media changes become immediate
- Location: tests/e2e/chart-x-axis-resize.spec.ts:145:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- main [ref=e2]:
  - button "Change time domain" [active] [ref=e3]
  - generic [ref=e4]:
    - generic:
      - generic: Sep 1
      - generic: Sep 2
      - generic: Sep 3
```

# Test source

```ts
  70  |     const resize = () => sample("resize-event");
  71  |     addEventListener("resize", resize);
  72  |     const observer = new ResizeObserver(() => sample("resize-observer"));
  73  |     const plot = host.querySelector(".rain-chart-plot,.rain-category-plot") ?? host;
  74  |     observer.observe(plot);
  75  |     const next = () => {
  76  |       if (targetWidth === null || innerWidth === targetWidth) { sample("raf"); count++; }
  77  |       if (count < frames || started === null || performance.now() - started < durationMs) requestAnimationFrame(next);
  78  |       else {
  79  |         observer.disconnect(); removeEventListener("resize", resize);
  80  |         finish!({ samples, beforeIds, afterIds: ticks().map(id), firstEvent });
  81  |       }
  82  |     };
  83  |     requestAnimationFrame(next);
  84  |   }, { selector, targetWidth, frames, durationMs });
  85  | }
  86  | 
  87  | async function finishFrames(page: Page): Promise<FrameAudit> {
  88  |   return page.evaluate(async () => (window as unknown as { __axisDone: Promise<FrameAudit> }).__axisDone);
  89  | }
  90  | 
  91  | const cases = ["line", "area", "composed", "scatter", "profit-loss", "category"];
  92  | for (const family of cases) for (const reducedMotion of ["no-preference", "reduce"] as const) {
  93  |   test(`${family} ${reducedMotion}: earliest resize frames retain axis identity, hover and data reads`, async ({ page }) => {
  94  |     await mkdir(evidence, { recursive: true });
  95  |     const intercepted: string[] = [], errors: string[] = [], audits: FrameAudit[] = [];
  96  |     page.on("pageerror", error => errors.push(String(error)));
  97  |     await attachBefore(page, intercepted);
  98  |     await page.emulateMedia({ reducedMotion });
  99  |     await page.goto(`/?axis-resize-audit=${runName}#chart-${family}`);
  100 |     const category = family === "category";
  101 |     if (category) await page.getByRole("combobox", { name: "分类业务场景" }).selectOption("semester");
  102 |     const selector = category ? '[data-category-example="semester"]' : `[data-rain-id="chart-${family}"]`;
  103 |     const host = page.locator(selector);
  104 |     const plot = host.locator(".rain-chart-plot,.rain-category-plot").first();
  105 |     await expect(plot.locator("svg").first()).toBeVisible();
  106 |     await expect(host.locator("span.whitespace-nowrap.text-chart-label.text-xs").first()).toBeVisible();
  107 |     const controls = page.locator(category ? ".rain-category-controls" : "[data-chart-default-controls]");
  108 |     const beforeVisual = await host.locator("span.whitespace-nowrap.text-chart-label.text-xs").first().evaluate(node => ({ color: getComputedStyle(node).color, fontSize: getComputedStyle(node).fontSize }));
  109 |     try {
  110 |       for (const width of [390, 1440]) {
  111 |         await beginFrames(page, selector, width);
  112 |         await page.setViewportSize({ width, height: 1000 });
  113 |         audits.push(await finishFrames(page));
  114 |       }
  115 |       // The data update remains in progress when the responsive shrink begins.
  116 |       await beginFrames(page, selector, 390);
  117 |       await controls.getByRole("button", { name: "更新数据", exact: true }).evaluate(button => (button as HTMLButtonElement).click());
  118 |       await page.setViewportSize({ width: 390, height: 1000 });
  119 |       audits.push(await finishFrames(page));
  120 |       const svg = plot.locator("svg").first(); await svg.scrollIntoViewIfNeeded();
  121 |       const box = (await svg.boundingBox())!;
  122 |       // Initial reveal deliberately disables input; retry the genuine pointer
  123 |       // after it becomes interactive, without changing any resize-frame sample.
  124 |       await expect(async () => {
  125 |         await page.mouse.move(0, 0);
  126 |         await page.mouse.move(box.x + 80, box.y + box.height / 2);
  127 |         await expect(host.locator(category ? ".rain-category-tooltip" : ".rain-chart-tooltip")).toBeVisible({ timeout: 100 });
  128 |       }).toPass({ timeout: 5000, intervals: [50] });
  129 |       await page.mouse.move(0, 0);
  130 |       await host.screenshot({ path: `${evidence}/${family}-${reducedMotion}-390.png` });
  131 |     } finally {
  132 |       await writeFile(`${evidence}/${family}-${reducedMotion}.json`, JSON.stringify({ baseline, beforeHash, intercepted, errors, beforeVisual, audits }, null, 2));
  133 |     }
  134 |     expect(errors).toEqual([]);
  135 |     if (baseline) expect(intercepted.length).toBeGreaterThan(0);
  136 |     for (const audit of audits) {
  137 |       expect(audit.samples.filter(sample => sample.reason === "raf")).toHaveLength(8);
  138 |       expect(audit.afterIds).toEqual(audit.beforeIds);
  139 |       expect(audit.samples.every(sample => sample.documentWidth <= sample.viewport + 1), JSON.stringify(audit.samples.map(sample => ({ reason: sample.reason, elapsed: sample.elapsed, width: sample.documentWidth })))).toBe(true);
  140 |       expect(audit.samples.flatMap(sample => sample.ticks).every(tick => tick.color === beforeVisual.color && tick.fontSize === beforeVisual.fontSize)).toBe(true);
  141 |     }
  142 |   });
  143 | }
  144 | 
  145 | test("native consumer: same-size data positions animate normally and mounted media changes become immediate", async ({ page }) => {
  146 |   await mkdir(evidence, { recursive: true });
  147 |   const intercepted: string[] = [], errors: string[] = [];
  148 |   const audits: FrameAudit[] = [];
  149 |   page.on("pageerror", error => errors.push(String(error)));
  150 |   await attachBefore(page, intercepted);
  151 |   await page.emulateMedia({ reducedMotion: "no-preference" });
  152 |   await page.goto(`/?axis-native-consumer=${runName}`);
  153 |   const module = `/@fs${resolve(`${run}/x-axis-consumer.tsx`)}`;
  154 |   await page.evaluate(async module => { await import(/* @vite-ignore */ module); }, module);
  155 |   const host = page.locator("[data-test-axis-host]");
  156 |   await expect(host.getByText("Sep 2", { exact: true })).toBeVisible();
  157 |   const position = () => host.getByText("Sep 2", { exact: true }).evaluate(node => getComputedStyle(node.parentElement!).left);
  158 |   try {
  159 |     await beginFrames(page, "[data-test-axis-host]", null, 40, 650);
  160 |     await page.getByRole("button", { name: "Change time domain" }).click();
  161 |     const normal = await finishFrames(page); audits.push(normal);
  162 |     const normalPositions = normal.samples.filter(sample => sample.reason === "raf").map(sample => Number.parseFloat(sample.ticks.find(tick => tick.label === "Sep 2")!.position));
  163 |     expect(normalPositions.some(left => left > 170.5 && left < 299.5)).toBe(true);
  164 |     expect(Number.parseFloat(await position())).toBeCloseTo(170, 3);
  165 |     await page.emulateMedia({ reducedMotion: "reduce" });
  166 |     await beginFrames(page, "[data-test-axis-host]", null, 8);
  167 |     await page.getByRole("button", { name: "Change time domain" }).click();
  168 |     const reduced = await finishFrames(page); audits.push(reduced);
  169 |     // The caller keeps animationDuration=1100; the mounted XAxis must react itself.
> 170 |     expect(reduced.samples.filter(sample => sample.reason === "raf").slice(-4).every(sample => Number.parseFloat(sample.ticks.find(tick => tick.label === "Sep 2")!.position) === 300)).toBe(true);
      |                                                                                                                                                                                         ^ Error: expect(received).toBe(expected) // Object.is equality
  171 |     expect(reduced.samples.flatMap(sample => sample.ticks).every(tick => !tick.transition.includes("500ms"))).toBe(true);
  172 |     await page.emulateMedia({ reducedMotion: "no-preference" });
  173 |     await beginFrames(page, "[data-test-axis-host]", null, 40, 650);
  174 |     await page.getByRole("button", { name: "Change time domain" }).click();
  175 |     const restored = await finishFrames(page); audits.push(restored);
  176 |     expect(restored.samples.some(sample => sample.ticks.some(tick => tick.label === "Sep 2" && Number.parseFloat(tick.position) > 170.5 && Number.parseFloat(tick.position) < 299.5))).toBe(true);
  177 |   } finally {
  178 |     await writeFile(`${evidence}/native-consumer.json`, JSON.stringify({ baseline, beforeHash, intercepted, errors, audits }, null, 2));
  179 |   }
  180 |   expect(errors).toEqual([]);
  181 | });
  182 | 
```