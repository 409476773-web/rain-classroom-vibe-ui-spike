# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-matrix-refinement.spec.ts >> clicking a hovered nonfirst cell preserves its inspected coordinate
- Location: tests/e2e/chart-business-matrix-refinement.spec.ts:247:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-matrix-example="course-count"] [data-rain-id="ui-chart-matrix"]').locator('[data-slot="cell"][data-row-id="category-2"][data-column-id="college-3"]')
Expected: "true"
Received: ""
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for locator('[data-matrix-example="course-count"] [data-rain-id="ui-chart-matrix"]').locator('[data-slot="cell"][data-row-id="category-2"][data-column-id="college-3"]')
    14 × locator resolved to <td aria-label="25" data-slot="cell" data-state="value" data-row-id="category-2" data-column-id="college-3" headers="_r_k_-row-1 _r_k_-column-2">…</td>
       - unexpected value "null"

```

```yaml
- cell "25"
```

# Test source

```ts
  155 | test("offscreen entry starts when viewed and includes intermediate bubble geometry", async ({ page }) => {
  156 |   await open(page, false);
  157 |   const chart = matrix(page, "course-count");
  158 |   const target = cell(chart, "category-6", "college-6").locator("circle").first();
  159 |   expect(await chart.evaluate(node => node.getBoundingClientRect().top)).toBeGreaterThan(1000);
  160 |   await page.waitForTimeout(1800);
  161 |   await chart.scrollIntoViewIfNeeded();
  162 |   const samples = await target.evaluate(async node => {
  163 |     const circle = node as SVGCircleElement;
  164 |     const frames: { time: number; width: number; opacity: number }[] = [];
  165 |     const start = performance.now();
  166 |     await new Promise<void>(resolve => {
  167 |       const sample = (now: number) => {
  168 |         const parent = circle.closest('[data-slot="mark-container"]')!;
  169 |         frames.push({ time: now - start, width: circle.getBoundingClientRect().width, opacity: Number(getComputedStyle(parent).opacity) });
  170 |         if (now - start < 1800) requestAnimationFrame(sample); else resolve();
  171 |       };
  172 |       requestAnimationFrame(sample);
  173 |     });
  174 |     return frames;
  175 |   });
  176 |   const final = samples.at(-1)!;
  177 |   expect(final.width).toBeGreaterThan(0);
  178 |   expect(final.opacity).toBeCloseTo(1, 2);
  179 |   expect(samples.some(frame => frame.width > 0 && frame.width < final.width - .1 || frame.opacity > 0 && frame.opacity < .99)).toBe(true);
  180 |   await record("viewport-entry", { samples, intermediateFrame: true });
  181 | });
  182 | 
  183 | test("updates and sorting retain coordinate nodes and animate through intermediate geometry", async ({ page }) => {
  184 |   await open(page, false);
  185 |   const chart = matrix(page, "course-count");
  186 |   const target = cell(chart, "category-4", "college-4");
  187 |   await chart.scrollIntoViewIfNeeded();
  188 |   await page.waitForTimeout(1800);
  189 |   await target.evaluate(node => node.setAttribute("data-test-stable-coordinate", "true"));
  190 |   const circle = target.locator("circle").first();
  191 |   const before = await circle.evaluate(node => node.getBoundingClientRect().width);
  192 |   await page.getByRole("button", { name: "更新数据", exact: true }).evaluate(node => (node as HTMLButtonElement).click());
  193 |   const updateFrames = await circle.evaluate(async node => {
  194 |     const frames: { width: number; readingVisible: boolean }[] = [], start = performance.now();
  195 |     await new Promise<void>(resolve => {
  196 |       const frame = (now: number) => {
  197 |         const reading = node.closest('[data-slot="cell"]')!.querySelector('text[data-slot="reading"]')!;
  198 |         frames.push({ width: node.getBoundingClientRect().width, readingVisible: getComputedStyle(reading).visibility === "visible" });
  199 |         if (now - start < 1100) requestAnimationFrame(frame); else resolve();
  200 |       };
  201 |       requestAnimationFrame(frame);
  202 |     });
  203 |     return frames;
  204 |   });
  205 |   const after = updateFrames.at(-1)!.width;
  206 |   expect(after).toBeGreaterThan(before);
  207 |   expect(updateFrames.some(frame => frame.width > before + .01 && frame.width < after - .01)).toBe(true);
  208 |   expect(updateFrames.every(frame => frame.readingVisible)).toBe(true);
  209 |   await expect(target).toHaveAttribute("data-test-stable-coordinate", "true");
  210 |   const original = await circle.evaluate(node => { const box = node.getBoundingClientRect(), chart = node.closest('[data-rain-id="ui-chart-matrix"]')!.getBoundingClientRect(); return { x: box.x + box.width / 2 - chart.x, y: box.y + box.height / 2 - chart.y }; });
  211 |   await page.getByRole("button", { name: "按数量排序" }).evaluate(node => (node as HTMLButtonElement).click());
  212 |   const sortFrames = await circle.evaluate(async node => {
  213 |     const positions: { x: number; y: number }[] = [], start = performance.now();
  214 |     await new Promise<void>(resolve => {
  215 |       const frame = (now: number) => { const box = node.getBoundingClientRect(), chart = node.closest('[data-rain-id="ui-chart-matrix"]')!.getBoundingClientRect(); positions.push({ x: box.x + box.width / 2 - chart.x, y: box.y + box.height / 2 - chart.y }); if (now - start < 1100) requestAnimationFrame(frame); else resolve(); };
  216 |       requestAnimationFrame(frame);
  217 |     });
  218 |     return positions;
  219 |   });
  220 |   const end = sortFrames.at(-1)!;
  221 |   const distance = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);
  222 |   expect(distance(original, end)).toBeGreaterThan(5);
  223 |   const totalDistance = distance(original, end);
  224 |   expect(sortFrames.some(position => distance(position, original) > totalDistance * .1 && distance(position, end) > totalDistance * .1)).toBe(true);
  225 |   await expect(target).toHaveAttribute("data-test-stable-coordinate", "true");
  226 |   await record("update-sort", { before, after, updateFrames, original, sortFrames, end, retainedCoordinate: true });
  227 | });
  228 | 
  229 | test("reduced motion exposes final values immediately without hidden readouts after update", async ({ page }) => {
  230 |   await open(page);
  231 |   const chart = matrix(page, "course-count");
  232 |   await chart.scrollIntoViewIfNeeded();
  233 |   const target = cell(chart, "category-6", "college-6");
  234 |   const circle = target.locator("circle").first();
  235 |   const first = await circle.evaluate(node => node.getBoundingClientRect().width);
  236 |   await page.getByRole("button", { name: "更新数据", exact: true }).evaluate(node => (node as HTMLButtonElement).click());
  237 |   await expect(target).toHaveAttribute("aria-label", "93");
  238 |   const immediate = await circle.evaluate(node => node.getBoundingClientRect().width);
  239 |   expect(immediate).toBeGreaterThan(first);
  240 |   await page.waitForTimeout(60);
  241 |   expect(await circle.evaluate(node => node.getBoundingClientRect().width)).toBeCloseTo(immediate, 2);
  242 |   expect(await target.locator('text[data-slot="reading"]').evaluate(node => getComputedStyle(node).visibility)).toBe("visible");
  243 |   expect(await target.locator('[data-slot="mark-container"]').evaluate(node => Number(getComputedStyle(node).opacity))).toBe(1);
  244 |   await record("reduced-motion", { first, immediate, readoutVisible: true });
  245 | });
  246 | 
  247 | test("clicking a hovered nonfirst cell preserves its inspected coordinate", async ({ page }) => {
  248 |   await open(page);
  249 |   const chart = matrix(page, "course-count"), target = cell(chart, "category-2", "college-3");
  250 |   await target.hover();
  251 |   await expect(target).toHaveAttribute("data-active", "true");
  252 |   await target.click();
  253 |   const facts = await chart.locator('[data-slot="cell"][data-active="true"]').evaluateAll(nodes => nodes.map(node => ({ row: node.getAttribute("data-row-id"), column: node.getAttribute("data-column-id") })));
  254 |   await record("pointer-focus", { expected: { row: "category-2", column: "college-3" }, actual: facts });
> 255 |   await expect(target).toHaveAttribute("data-active", "true");
      |                        ^ Error: expect(locator).toHaveAttribute(expected) failed
  256 |   await expect(page.locator(".rain-matrix__tooltip")).toContainText("25");
  257 | });
  258 | 
  259 | test("keyboard focus reveals the inspected coordinate beyond a sticky row heading after horizontal scrolling", async ({ page }) => {
  260 |   await open(page);
  261 |   await page.setViewportSize({ width: 390, height: 844 });
  262 |   const chart = matrix(page, "weekday-hour"), region = chart.locator('[data-slot="scroll-container"]');
  263 |   await region.scrollIntoViewIfNeeded();
  264 |   await page.mouse.move(0, 0);
  265 |   await page.waitForTimeout(150);
  266 |   await region.evaluate(node => { node.scrollLeft = node.scrollWidth - node.clientWidth; });
  267 |   await region.focus();
  268 |   const active = chart.locator('[data-slot="cell"][data-active="true"]');
  269 |   await expect(active).toHaveCount(1);
  270 |   const facts = await active.evaluate(node => {
  271 |     const cell = node.getBoundingClientRect(), heading = node.parentElement!.querySelector("th")!.getBoundingClientRect();
  272 |     const region = node.closest('[data-slot="scroll-container"]')!.getBoundingClientRect();
  273 |     return { left: cell.left, right: cell.right, headingRight: heading.right, regionRight: region.right, row: node.getAttribute("data-row-id"), column: node.getAttribute("data-column-id") };
  274 |   });
  275 |   await record("keyboard-scrolled-focus", facts);
  276 |   expect(facts.left).toBeGreaterThanOrEqual(facts.headingRight - 1);
  277 |   expect(facts.right).toBeLessThanOrEqual(facts.regionRight + 1);
  278 | });
  279 | 
  280 | test("semester legend shows the eight discrete semesters without fractional intervals", async ({ page }) => {
  281 |   await open(page);
  282 |   const legend = matrix(page, "course-version").locator('[data-slot="legend"]');
  283 |   const labels = await legend.getByRole("button").evaluateAll(nodes => nodes.map(node => node.getAttribute("aria-label") ?? node.textContent!.trim()));
  284 |   await record("semester-legend", { labels });
  285 |   expect(labels).toHaveLength(8);
  286 |   labels.forEach((label, index) => {
  287 |     expect(label).not.toMatch(/\d+\.\d+/);
  288 |     expect(label.match(/\d+/g)).toEqual([String(index + 1)]);
  289 |   });
  290 | });
  291 | 
  292 | test("zero-to-large bubble transition never paints a visible glyph beyond its current circle", async ({ page }) => {
  293 |   await open(page, false);
  294 |   const control = page.getByRole("combobox", { name: "业务数据状态" });
  295 |   await control.selectOption("zero");
  296 |   const chart = matrix(page, "course-count"), target = cell(chart, "category-6", "college-6");
  297 |   await chart.scrollIntoViewIfNeeded();
  298 |   await page.mouse.move(0, 0);
  299 |   await page.waitForTimeout(1800);
  300 |   await target.evaluate(node => node.setAttribute("data-test-painted-coordinate", "true"));
  301 |   await control.evaluate(node => { (node as HTMLSelectElement).value = "normal"; node.dispatchEvent(new Event("change", { bubbles: true })); });
  302 |   const frames = await target.evaluate(async node => {
  303 |     const frames: { time: number; radius: number; visible: boolean; farthestGlyphCorner: number }[] = [], start = performance.now();
  304 |     await new Promise<void>(resolve => {
  305 |       const sample = (now: number) => {
  306 |         const circle = node.querySelector<SVGCircleElement>("circle")!, text = node.querySelector<SVGTextElement>('text[data-slot="reading"]')!;
  307 |         const bounds = circle.getBoundingClientRect(), center = { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 };
  308 |         const textBounds = text.getBBox(), transform = text.getScreenCTM()!;
  309 |         const corners = [[textBounds.x, textBounds.y], [textBounds.x + textBounds.width, textBounds.y], [textBounds.x, textBounds.y + textBounds.height], [textBounds.x + textBounds.width, textBounds.y + textBounds.height]];
  310 |         const farthestGlyphCorner = Math.max(...corners.map(([x, y]) => { const point = new DOMPoint(x, y).matrixTransform(transform); return Math.hypot(point.x - center.x, point.y - center.y); }));
  311 |         let opacity = 1;
  312 |         for (let parent: Element | null = text; parent && parent !== node; parent = parent.parentElement) opacity *= Number(getComputedStyle(parent).opacity);
  313 |         frames.push({ time: now - start, radius: bounds.width / 2, visible: getComputedStyle(text).visibility === "visible" && opacity > .01, farthestGlyphCorner });
  314 |         if (now - start < 900) requestAnimationFrame(sample); else resolve();
  315 |       };
  316 |       requestAnimationFrame(sample);
  317 |     });
  318 |     return frames;
  319 |   });
  320 |   await record("painted-bubble-fit", { frames, tolerancePx: 1 });
  321 |   await expect(target).toHaveAttribute("data-test-painted-coordinate", "true");
  322 |   expect(frames.some(frame => frame.visible)).toBe(true);
  323 |   expect(frames.filter(frame => frame.visible).every(frame => frame.farthestGlyphCorner <= frame.radius + 1)).toBe(true);
  324 | });
  325 | 
  326 | test("heat readout tone follows the painted light-to-dark and dark-to-light fill without a plate", async ({ page }) => {
  327 |   await open(page, false);
  328 |   const control = page.getByRole("combobox", { name: "业务数据状态" });
  329 |   await control.selectOption("zero");
  330 |   const chart = matrix(page, "course-similarity"), target = cell(chart, "course-4", "course-1");
  331 |   await chart.scrollIntoViewIfNeeded();
  332 |   await page.mouse.move(0, 0);
  333 |   await page.waitForTimeout(1800);
  334 |   const results = [];
  335 |   for (const state of ["normal", "zero"]) {
  336 |     await control.evaluate((node, state) => { (node as HTMLSelectElement).value = state; node.dispatchEvent(new Event("change", { bubbles: true })); }, state);
  337 |     const frames = await target.evaluate(async node => {
  338 |       const luminance = (color: string) => {
  339 |         const rgb = color.match(/^rgba?\((.+)\)$/), srgb = color.match(/^color\(srgb (.+)\)$/);
  340 |         const channels = (rgb?.[1] ?? srgb?.[1] ?? "").split(/[\s,\/]+/).filter(Boolean).slice(0, 3).map(part => parseFloat(part) / (part.endsWith("%") ? 100 : rgb ? 255 : 1));
  341 |         return channels.map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index]!, 0);
  342 |       };
  343 |       const chart = node.closest('[data-rain-id="ui-chart-matrix"]')!;
  344 |       const dark = luminance(getComputedStyle(chart.querySelector(".rain-matrix__color-probe--dark")!).color);
  345 |       const light = luminance(getComputedStyle(chart.querySelector(".rain-matrix__color-probe--light")!).color);
  346 |       const frames: { time: number; background: string; readout: string; plate: string; chosenRatio: number; bestRatio: number }[] = [], start = performance.now();
  347 |       await new Promise<void>(resolve => {
  348 |         const sample = (now: number) => {
  349 |           const mark = node.querySelector('[data-slot="cell-mark"]')!, reading = node.querySelector('[data-slot="reading"]')!, container = node.querySelector('[data-slot="reading-container"]')!;
  350 |           const background = getComputedStyle(mark).backgroundColor, readout = getComputedStyle(reading).color, fill = luminance(background);
  351 |           const ratio = (tone: number) => (Math.max(tone, fill) + .05) / (Math.min(tone, fill) + .05);
  352 |           frames.push({ time: now - start, background, readout, plate: getComputedStyle(container).backgroundColor, chosenRatio: ratio(luminance(readout)), bestRatio: Math.max(ratio(dark), ratio(light)) });
  353 |           if (now - start < 900) requestAnimationFrame(sample); else resolve();
  354 |         };
  355 |         requestAnimationFrame(sample);
```