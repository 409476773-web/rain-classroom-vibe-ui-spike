# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-x-axis-resize.spec.ts >> native consumer: same-size data positions animate normally and mounted media changes become immediate
- Location: tests/e2e/chart-x-axis-resize.spec.ts:143:1

# Error details

```
Error: expect(received).toBeCloseTo(expected, precision)

Expected: 170
Received: 185.781

Expected precision:    3
Expected difference: < 0.0005
Received difference:   15.781000000000006
```

# Page snapshot

```yaml
- main [ref=e2]:
  - button "Change time domain" [active] [ref=e3]
  - generic [ref=e4]:
    - generic:
      - generic: Sep 1
      - generic: Sep 2
      - generic: Sep 5
```

# Test source

```ts
  62  |         ticks: ticks().map(node => {
  63  |           const box = node.getBoundingClientRect(), parent = node.parentElement!, style = getComputedStyle(parent), text = getComputedStyle(node);
  64  |           return { id: id(node), label: node.textContent ?? "", left: box.left, right: box.right, center: (box.left + box.right) / 2, position: style.left, transition: style.transition, color: text.color, fontSize: text.fontSize };
  65  |         }),
  66  |       });
  67  |     };
  68  |     const resize = () => sample("resize-event");
  69  |     addEventListener("resize", resize);
  70  |     const observer = new ResizeObserver(() => sample("resize-observer"));
  71  |     const plot = host.querySelector(".rain-chart-plot,.rain-category-plot") ?? host;
  72  |     observer.observe(plot);
  73  |     const next = () => {
  74  |       if (targetWidth === null || innerWidth === targetWidth) { sample("raf"); count++; }
  75  |       if (count < frames) requestAnimationFrame(next);
  76  |       else {
  77  |         observer.disconnect(); removeEventListener("resize", resize);
  78  |         finish!({ samples, beforeIds, afterIds: ticks().map(id), firstEvent });
  79  |       }
  80  |     };
  81  |     requestAnimationFrame(next);
  82  |   }, { selector, targetWidth, frames });
  83  | }
  84  | 
  85  | async function finishFrames(page: Page): Promise<FrameAudit> {
  86  |   return page.evaluate(async () => (window as unknown as { __axisDone: Promise<FrameAudit> }).__axisDone);
  87  | }
  88  | 
  89  | const cases = ["line", "area", "composed", "scatter", "profit-loss", "category"];
  90  | for (const family of cases) for (const reducedMotion of ["no-preference", "reduce"] as const) {
  91  |   test(`${family} ${reducedMotion}: earliest resize frames retain axis identity, hover and data reads`, async ({ page }) => {
  92  |     await mkdir(evidence, { recursive: true });
  93  |     const intercepted: string[] = [], errors: string[] = [], audits: FrameAudit[] = [];
  94  |     page.on("pageerror", error => errors.push(String(error)));
  95  |     await attachBefore(page, intercepted);
  96  |     await page.emulateMedia({ reducedMotion });
  97  |     await page.goto(`/?axis-resize-audit=${runName}#chart-${family}`);
  98  |     const category = family === "category";
  99  |     if (category) await page.getByRole("combobox", { name: "分类业务场景" }).selectOption("semester");
  100 |     const selector = category ? '[data-category-example="semester"]' : `[data-rain-id="chart-${family}"]`;
  101 |     const host = page.locator(selector);
  102 |     const plot = host.locator(".rain-chart-plot,.rain-category-plot").first();
  103 |     await expect(plot.locator("svg").first()).toBeVisible();
  104 |     await expect(host.locator("span.whitespace-nowrap.text-chart-label.text-xs").first()).toBeVisible();
  105 |     const controls = page.locator(category ? ".rain-category-controls" : "[data-chart-default-controls]");
  106 |     const beforeVisual = await host.locator("span.whitespace-nowrap.text-chart-label.text-xs").first().evaluate(node => ({ color: getComputedStyle(node).color, fontSize: getComputedStyle(node).fontSize }));
  107 |     try {
  108 |       for (const width of [390, 1440]) {
  109 |         await beginFrames(page, selector, width);
  110 |         await page.setViewportSize({ width, height: 1000 });
  111 |         audits.push(await finishFrames(page));
  112 |       }
  113 |       // The data update remains in progress when the responsive shrink begins.
  114 |       await beginFrames(page, selector, 390);
  115 |       await controls.getByRole("button", { name: "更新数据", exact: true }).evaluate(button => (button as HTMLButtonElement).click());
  116 |       await page.setViewportSize({ width: 390, height: 1000 });
  117 |       audits.push(await finishFrames(page));
  118 |       const svg = plot.locator("svg").first(); await svg.scrollIntoViewIfNeeded();
  119 |       const box = (await svg.boundingBox())!;
  120 |       // Initial reveal deliberately disables input; retry the genuine pointer
  121 |       // after it becomes interactive, without changing any resize-frame sample.
  122 |       await expect(async () => {
  123 |         await page.mouse.move(0, 0);
  124 |         await page.mouse.move(box.x + 80, box.y + box.height / 2);
  125 |         await expect(host.locator(category ? ".rain-category-tooltip" : ".rain-chart-tooltip")).toBeVisible();
  126 |       }).toPass({ timeout: 5000, intervals: [50] });
  127 |       await page.mouse.move(0, 0);
  128 |       await host.screenshot({ path: `${evidence}/${family}-${reducedMotion}-390.png` });
  129 |     } finally {
  130 |       await writeFile(`${evidence}/${family}-${reducedMotion}.json`, JSON.stringify({ baseline, beforeHash, intercepted, errors, beforeVisual, audits }, null, 2));
  131 |     }
  132 |     expect(errors).toEqual([]);
  133 |     if (baseline) expect(intercepted.length).toBeGreaterThan(0);
  134 |     for (const audit of audits) {
  135 |       expect(audit.samples.filter(sample => sample.reason === "raf")).toHaveLength(8);
  136 |       expect(audit.afterIds).toEqual(audit.beforeIds);
  137 |       expect(audit.samples.every(sample => sample.documentWidth <= sample.viewport + 1), JSON.stringify(audit.samples.map(sample => ({ reason: sample.reason, elapsed: sample.elapsed, width: sample.documentWidth })))).toBe(true);
  138 |       expect(audit.samples.flatMap(sample => sample.ticks).every(tick => tick.color === beforeVisual.color && tick.fontSize === beforeVisual.fontSize)).toBe(true);
  139 |     }
  140 |   });
  141 | }
  142 | 
  143 | test("native consumer: same-size data positions animate normally and mounted media changes become immediate", async ({ page }) => {
  144 |   await mkdir(evidence, { recursive: true });
  145 |   const intercepted: string[] = [], errors: string[] = [];
  146 |   const audits: FrameAudit[] = [];
  147 |   page.on("pageerror", error => errors.push(String(error)));
  148 |   await attachBefore(page, intercepted);
  149 |   await page.emulateMedia({ reducedMotion: "no-preference" });
  150 |   await page.goto(`/?axis-native-consumer=${runName}`);
  151 |   const module = `/@fs${resolve(`${run}/x-axis-consumer.tsx`)}`;
  152 |   await page.evaluate(async module => { await import(/* @vite-ignore */ module); }, module);
  153 |   const host = page.locator("[data-test-axis-host]");
  154 |   await expect(host.getByText("Sep 2", { exact: true })).toBeVisible();
  155 |   const position = () => host.getByText("Sep 2", { exact: true }).evaluate(node => getComputedStyle(node.parentElement!).left);
  156 |   try {
  157 |     await beginFrames(page, "[data-test-axis-host]", null, 40);
  158 |     await page.getByRole("button", { name: "Change time domain" }).click();
  159 |     const normal = await finishFrames(page); audits.push(normal);
  160 |     const normalPositions = normal.samples.filter(sample => sample.reason === "raf").map(sample => Number.parseFloat(sample.ticks.find(tick => tick.label === "Sep 2")!.position));
  161 |     expect(normalPositions.some(left => left > 170.5 && left < 299.5)).toBe(true);
> 162 |     expect(Number.parseFloat(await position())).toBeCloseTo(170, 3);
      |                                                 ^ Error: expect(received).toBeCloseTo(expected, precision)
  163 |     await page.emulateMedia({ reducedMotion: "reduce" });
  164 |     await beginFrames(page, "[data-test-axis-host]", null, 8);
  165 |     await page.getByRole("button", { name: "Change time domain" }).click();
  166 |     const reduced = await finishFrames(page); audits.push(reduced);
  167 |     // The caller keeps animationDuration=1100; the mounted XAxis must react itself.
  168 |     expect(reduced.samples.filter(sample => sample.reason === "raf").slice(-4).every(sample => Number.parseFloat(sample.ticks.find(tick => tick.label === "Sep 2")!.position) === 300)).toBe(true);
  169 |     expect(reduced.samples.flatMap(sample => sample.ticks).every(tick => !tick.transition.includes("500ms"))).toBe(true);
  170 |     await page.emulateMedia({ reducedMotion: "no-preference" });
  171 |     await beginFrames(page, "[data-test-axis-host]", null, 40);
  172 |     await page.getByRole("button", { name: "Change time domain" }).click();
  173 |     const restored = await finishFrames(page); audits.push(restored);
  174 |     expect(restored.samples.some(sample => sample.ticks.some(tick => tick.label === "Sep 2" && Number.parseFloat(tick.position) > 170.5 && Number.parseFloat(tick.position) < 299.5))).toBe(true);
  175 |   } finally {
  176 |     await writeFile(`${evidence}/native-consumer.json`, JSON.stringify({ baseline, beforeHash, intercepted, errors, audits }, null, 2));
  177 |   }
  178 |   expect(errors).toEqual([]);
  179 | });
  180 | 
```