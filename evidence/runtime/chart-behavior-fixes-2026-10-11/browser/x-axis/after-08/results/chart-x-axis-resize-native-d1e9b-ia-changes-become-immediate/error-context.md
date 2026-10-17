# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-x-axis-resize.spec.ts >> native consumer: same-size data positions animate normally and mounted media changes become immediate
- Location: tests/e2e/chart-x-axis-resize.spec.ts:150:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-test-axis-host]').getByText('Sep 2', { exact: true })
Expected: visible
Error: strict mode violation: locator('[data-test-axis-host]').getByText('Sep 2', { exact: true }) resolved to 2 elements:
    1) <span class="whitespace-nowrap text-chart-label text-xs">Sep 2</span> aka getByText('Sep').nth(1)
    2) <span class="whitespace-nowrap text-chart-label text-xs">Sep 2</span> aka getByText('Sep').nth(4)

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[data-test-axis-host]').getByText('Sep 2', { exact: true })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - button "Change time domain" [ref=e3]
    - generic [ref=e4]:
      - generic:
        - generic: Sep 1
        - generic: Sep 2
        - generic: Sep 3
  - main [ref=e11]:
    - button "Change time domain" [ref=e12]
    - generic [ref=e13]:
      - generic:
        - generic: Sep 1
        - generic: Sep 2
        - generic: Sep 3
```

# Test source

```ts
  61  |     store.__axisDone = new Promise(resolve => { finish = resolve; });
  62  |     const sample = (reason: string) => {
  63  |       if (targetWidth !== null && innerWidth !== targetWidth) return;
  64  |       started ??= performance.now();
  65  |       firstEvent ??= reason;
  66  |       samples.push({ reason, elapsed: performance.now() - started, viewport: innerWidth, documentWidth: document.documentElement.scrollWidth,
  67  |         overflowTicks: [...document.querySelectorAll('span.whitespace-nowrap.text-chart-label.text-xs')].filter(node => node.getBoundingClientRect().right > innerWidth + 1).map(node => ({ label: node.textContent, host: node.closest('[data-rain-id]')?.getAttribute('data-rain-id'), example: node.closest('[data-chart-example],[data-category-example]')?.outerHTML.slice(0,200), right: node.getBoundingClientRect().right, inlineLeft: node.parentElement!.style.left, parentWidth: node.parentElement!.parentElement!.getBoundingClientRect().width, transition: getComputedStyle(node.parentElement!).transition })),
  68  |         overflowElements: [...document.querySelectorAll('svg,div,span')].filter(node => node.getBoundingClientRect().right > innerWidth + 1 && node.closest('.rain-chart-plot,.rain-category-plot')).map(node => ({ tag: node.tagName, class: node.getAttribute('class'), host: node.closest('[data-rain-id]')?.getAttribute('data-rain-id'), right: node.getBoundingClientRect().right, width: node.getBoundingClientRect().width, attributeWidth: node.getAttribute('width'), parentClass: node.parentElement!.getAttribute('class') ?? '', parentWidth: node.parentElement!.getBoundingClientRect().width })).slice(0,25),
  69  |         ticks: ticks().map(node => {
  70  |           const box = node.getBoundingClientRect(), parent = node.parentElement!, style = getComputedStyle(parent), text = getComputedStyle(node);
  71  |           return { id: id(node), label: node.textContent ?? "", left: box.left, right: box.right, center: (box.left + box.right) / 2, position: style.left, transition: style.transition, color: text.color, fontSize: text.fontSize, inlineLeft: parent.style.left, overlayWidth: parent.parentElement!.getBoundingClientRect().width, containingWidth: parent.parentElement!.parentElement!.getBoundingClientRect().width };
  72  |         }),
  73  |       });
  74  |     };
  75  |     const resize = () => sample("resize-event");
  76  |     addEventListener("resize", resize);
  77  |     const observer = new ResizeObserver(() => sample("resize-observer"));
  78  |     const plot = host.querySelector(".rain-chart-plot,.rain-category-plot") ?? host;
  79  |     observer.observe(plot);
  80  |     const next = () => {
  81  |       if (targetWidth === null || innerWidth === targetWidth) { sample("raf"); count++; }
  82  |       if (count < frames || started === null || performance.now() - started < durationMs) requestAnimationFrame(next);
  83  |       else {
  84  |         observer.disconnect(); removeEventListener("resize", resize);
  85  |         finish!({ samples, beforeIds, afterIds: ticks().map(id), firstEvent });
  86  |       }
  87  |     };
  88  |     requestAnimationFrame(next);
  89  |   }, { selector, targetWidth, frames, durationMs });
  90  | }
  91  | 
  92  | async function finishFrames(page: Page): Promise<FrameAudit> {
  93  |   return page.evaluate(async () => (window as unknown as { __axisDone: Promise<FrameAudit> }).__axisDone);
  94  | }
  95  | 
  96  | const cases = ["line", "area", "composed", "scatter", "profit-loss", "category"];
  97  | for (const family of cases) for (const reducedMotion of ["no-preference", "reduce"] as const) {
  98  |   test(`${family} ${reducedMotion}: earliest resize frames retain axis identity, hover and data reads`, async ({ page }) => {
  99  |     await mkdir(evidence, { recursive: true });
  100 |     const intercepted: string[] = [], errors: string[] = [], audits: FrameAudit[] = [];
  101 |     page.on("pageerror", error => errors.push(String(error)));
  102 |     await attachBefore(page, intercepted);
  103 |     await page.emulateMedia({ reducedMotion });
  104 |     await page.goto(`/?axis-resize-audit=${runName}#chart-${family}`);
  105 |     const category = family === "category";
  106 |     if (category) await page.getByRole("combobox", { name: "分类业务场景" }).selectOption("semester");
  107 |     const selector = category ? '[data-category-example="semester"]' : `[data-rain-id="chart-${family}"]`;
  108 |     const host = page.locator(selector);
  109 |     const plot = host.locator(".rain-chart-plot,.rain-category-plot").first();
  110 |     await expect(plot.locator("svg").first()).toBeVisible();
  111 |     await expect(host.locator("span.whitespace-nowrap.text-chart-label.text-xs").first()).toBeVisible();
  112 |     const controls = page.locator(category ? ".rain-category-controls" : "[data-chart-default-controls]");
  113 |     const beforeVisual = await host.locator("span.whitespace-nowrap.text-chart-label.text-xs").first().evaluate(node => ({ color: getComputedStyle(node).color, fontSize: getComputedStyle(node).fontSize }));
  114 |     try {
  115 |       for (const width of [390, 1440]) {
  116 |         await beginFrames(page, selector, width);
  117 |         await page.setViewportSize({ width, height: 1000 });
  118 |         audits.push(await finishFrames(page));
  119 |       }
  120 |       // The data update remains in progress when the responsive shrink begins.
  121 |       await beginFrames(page, selector, 390);
  122 |       await controls.getByRole("button", { name: "更新数据", exact: true }).evaluate(button => (button as HTMLButtonElement).click());
  123 |       await page.setViewportSize({ width: 390, height: 1000 });
  124 |       audits.push(await finishFrames(page));
  125 |       const svg = plot.locator("svg").first(); await svg.scrollIntoViewIfNeeded();
  126 |       const box = (await svg.boundingBox())!;
  127 |       // Initial reveal deliberately disables input; retry the genuine pointer
  128 |       // after it becomes interactive, without changing any resize-frame sample.
  129 |       await expect(async () => {
  130 |         await page.mouse.move(0, 0);
  131 |         await page.mouse.move(box.x + 80, box.y + box.height / 2);
  132 |         await expect(host.locator(category ? ".rain-category-tooltip" : ".rain-chart-tooltip")).toBeVisible({ timeout: 100 });
  133 |       }).toPass({ timeout: 5000, intervals: [50] });
  134 |       await page.mouse.move(0, 0);
  135 |       await host.screenshot({ path: `${evidence}/${family}-${reducedMotion}-390.png` });
  136 |     } finally {
  137 |       await writeFile(`${evidence}/${family}-${reducedMotion}.json`, JSON.stringify({ baseline, beforeHash, intercepted, errors, beforeVisual, audits }, null, 2));
  138 |     }
  139 |     expect(errors).toEqual([]);
  140 |     if (baseline) expect(intercepted.length).toBeGreaterThan(0);
  141 |     for (const audit of audits) {
  142 |       expect(audit.samples.filter(sample => sample.reason === "raf")).toHaveLength(8);
  143 |       expect(audit.afterIds).toEqual(audit.beforeIds);
  144 |       expect(audit.samples.every(sample => sample.documentWidth <= sample.viewport + 1), JSON.stringify(audit.samples.map(sample => ({ reason: sample.reason, elapsed: sample.elapsed, width: sample.documentWidth })))).toBe(true);
  145 |       expect(audit.samples.flatMap(sample => sample.ticks).every(tick => tick.color === beforeVisual.color && tick.fontSize === beforeVisual.fontSize)).toBe(true);
  146 |     }
  147 |   });
  148 | }
  149 | 
  150 | test("native consumer: same-size data positions animate normally and mounted media changes become immediate", async ({ page }) => {
  151 |   await mkdir(evidence, { recursive: true });
  152 |   const intercepted: string[] = [], errors: string[] = [];
  153 |   const audits: FrameAudit[] = [];
  154 |   page.on("pageerror", error => errors.push(String(error)));
  155 |   await attachBefore(page, intercepted);
  156 |   await page.emulateMedia({ reducedMotion: "no-preference" });
  157 |   await page.goto(`/?axis-native-consumer=${runName}`);
  158 |   const module = `/@fs${resolve(`${run}/x-axis-consumer.tsx`)}`;
  159 |   await page.evaluate(async module => { await import(/* @vite-ignore */ module); }, module);
  160 |   const host = page.locator("[data-test-axis-host]");
> 161 |   await expect(host.getByText("Sep 2", { exact: true })).toBeVisible();
      |                                                          ^ Error: expect(locator).toBeVisible() failed
  162 |   const position = () => host.getByText("Sep 2", { exact: true }).evaluate(node => getComputedStyle(node.parentElement!).left);
  163 |   try {
  164 |     await beginFrames(page, "[data-test-axis-host]", null, 40, 650);
  165 |     await page.getByRole("button", { name: "Change time domain" }).click();
  166 |     const normal = await finishFrames(page); audits.push(normal);
  167 |     const normalPositions = normal.samples.filter(sample => sample.reason === "raf").map(sample => Number.parseFloat(sample.ticks.find(tick => tick.label === "Sep 2")!.position));
  168 |     expect(normalPositions.some(left => left > 170.5 && left < 299.5)).toBe(true);
  169 |     expect(Number.parseFloat(await position())).toBeCloseTo(170, 3);
  170 |     await page.emulateMedia({ reducedMotion: "reduce" });
  171 |     await beginFrames(page, "[data-test-axis-host]", null, 8);
  172 |     await page.getByRole("button", { name: "Change time domain" }).click();
  173 |     const reduced = await finishFrames(page); audits.push(reduced);
  174 |     // The caller keeps animationDuration=1100; the mounted XAxis must react itself.
  175 |     expect(reduced.samples.filter(sample => sample.reason === "raf").slice(-4).every(sample => Number.parseFloat(sample.ticks.find(tick => tick.label === "Sep 2")!.position) === 300)).toBe(true);
  176 |     expect(reduced.samples.flatMap(sample => sample.ticks).every(tick => !tick.transition.startsWith("left"))).toBe(true);
  177 |     await page.emulateMedia({ reducedMotion: "no-preference" });
  178 |     await beginFrames(page, "[data-test-axis-host]", null, 40, 650);
  179 |     await page.getByRole("button", { name: "Change time domain" }).click();
  180 |     const restored = await finishFrames(page); audits.push(restored);
  181 |     expect(restored.samples.some(sample => sample.ticks.some(tick => tick.label === "Sep 2" && Number.parseFloat(tick.position) > 170.5 && Number.parseFloat(tick.position) < 299.5))).toBe(true);
  182 |     expect(Number.parseFloat(await position())).toBeCloseTo(170, 3);
  183 |   } finally {
  184 |     await writeFile(`${evidence}/native-consumer.json`, JSON.stringify({ baseline, beforeHash, intercepted, errors, audits }, null, 2));
  185 |   }
  186 |   expect(errors).toEqual([]);
  187 | });
  188 | 
```