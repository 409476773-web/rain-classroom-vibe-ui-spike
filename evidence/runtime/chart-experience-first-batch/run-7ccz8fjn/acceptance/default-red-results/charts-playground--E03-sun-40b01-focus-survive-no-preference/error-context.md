# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: charts-playground.spec.ts >> [E03] sunburst keyboard drill, multilevel return and external focus survive no-preference
- Location: tests/e2e/charts-playground.spec.ts:172:60

# Error details

```
Error: expect(locator).toBeFocused() failed

Locator:  locator('[data-rain-id="chart-sunburst"]').getByRole('link', { name: '返回学习内容', exact: true })
Expected: focused
Received: inactive
Timeout:  5000ms

Call log:
  - Expect "toBeFocused" with timeout 5000ms
  - waiting for locator('[data-rain-id="chart-sunburst"]').getByRole('link', { name: '返回学习内容', exact: true })
    14 × locator resolved to <a data-slot="link" aria-label="返回学习内容" id="base-ui-_r_19_" data-return-id="学习内容" href="#chart-sunburst" data-trigger-disabled="" class="rain-breadcrumb-control relative min-w-0 rounded-rain-6 px-rain-4 font-rain-ui font-rain-regular no-underline outline-none rain-breadcrumb-link">学习内容</a>
       - unexpected value "inactive"

```

```yaml
- link "返回学习内容":
  - /url: "#chart-sunburst"
  - text: 学习内容
```

# Test source

```ts
  109 |     await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("missing");
  110 |     const slot = host.locator(".rain-business-mini-slot");
  111 |     await expect(slot).toHaveCSS("width", size === "compact" ? "96px" : "128px");
  112 |     await expect(slot).toHaveCSS("height", size === "compact" ? "32px" : "48px");
  113 |     await expect(host.locator(".rain-chart-metric strong")).toHaveText("缺测");
  114 |     await expect(slot.locator("svg")).toBeVisible();
  115 |     await host.getByText("查看精确数据", { exact: true }).click();
  116 |     await expect(host.locator("tbody tr")).toHaveCount(24);
  117 |     await expect(host.locator("tbody tr").last()).toContainText("缺测");
  118 |     await controls.getByRole("button", { name: "更新数据", exact: true }).click();
  119 |     await controls.getByRole("button", { name: "更新数据", exact: true }).click();
  120 |     await expect(host.getByRole("status")).toContainText("全部缺测");
  121 |     await expect(slot.locator("svg")).toHaveCount(0);
  122 |     await expect(host.locator(".rain-chart-metric strong")).toHaveText("缺测");
  123 |     await expect(slot).toHaveCSS("width", size === "compact" ? "96px" : "128px");
  124 |     await controls.getByRole("button", { name: "更新数据", exact: true }).click();
  125 |     await expect(slot.locator("svg")).toBeVisible();
  126 |     for (const state of ["zero", "normal", "single"]) {
  127 |       await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption(state);
  128 |       await expect(slot.locator("svg")).toBeVisible();
  129 |       await expect(host.locator("tbody tr")).toHaveCount(state === "single" ? 1 : 24);
  130 |       if (state === "zero") await expect(host.locator(".rain-chart-metric strong")).toHaveText("0");
  131 |       else await expect(host.locator(".rain-chart-metric strong")).not.toHaveText("缺测");
  132 |     }
  133 |     await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("invalid");
  134 |     await expect(host).toContainText("已拒绝无效数据");
  135 |     await expect(host.locator("svg")).toHaveCount(0);
  136 |     facts.push({ id, size, latestMissing: true, allMissingSlotPreserved: true, states: ["missing", "zero", "normal", "single", "invalid"] });
  137 |   }
  138 |   await mkdir(evidence, { recursive: true });
  139 |   await writeFile(`${evidence}/e01-mini-facts.json`, JSON.stringify(facts, null, 2));
  140 | });
  141 | 
  142 | test("[E02] standard and both mini bars retain real zeros and explain their reference-only scale", async ({ page }) => {
  143 |   await page.emulateMedia({ reducedMotion: "reduce" });
  144 |   for (const size of ["standard", "compact", "comfortable"]) {
  145 |     await page.goto("/#chart-bar");
  146 |     const host = page.locator('[data-rain-id="chart-bar"]');
  147 |     const controls = page.locator("[data-chart-default-controls]");
  148 |     if (size !== "standard") {
  149 |       await controls.getByRole("combobox", { name: "尺寸配方", exact: true }).selectOption("mini");
  150 |       await controls.getByRole("combobox", { name: "迷你型号", exact: true }).selectOption(size);
  151 |     }
  152 |     await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("zero");
  153 |     await expect(host.getByText(/全零.*量程.*1/)).toBeVisible();
  154 |     await host.getByText("查看精确数据", { exact: true }).click();
  155 |     await expect(host.locator("tbody tr")).toHaveCount(6);
  156 |     expect((await host.locator("tbody td").allTextContents()).every(text => text === "0")).toBe(true);
  157 |     const bars = host.locator('g[class^="bar-series-"] rect');
  158 |     await expect(bars).toHaveCount(size === "standard" ? 18 : 6);
  159 |     expect(await bars.evaluateAll(nodes => nodes.every(node => Number(node.getAttribute("height")) === 0))).toBe(true);
  160 |     for (const state of ["normal", "single"]) {
  161 |       await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption(state);
  162 |       await expect(host.getByText(/全零.*量程.*1/)).toHaveCount(0);
  163 |       await expect(host.locator("tbody tr")).toHaveCount(state === "single" ? 1 : 6);
  164 |       await expect(host.locator("svg").first()).toBeVisible();
  165 |     }
  166 |     await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("invalid");
  167 |     await expect(host).toContainText("已拒绝无效数据");
  168 |     await expect(host.locator("svg")).toHaveCount(0);
  169 |   }
  170 | });
  171 | 
  172 | for (const motion of ["no-preference", "reduce"] as const) test(`[E03] sunburst keyboard drill, multilevel return and external focus survive ${motion}`, async ({ page }) => {
  173 |   await page.emulateMedia({ reducedMotion: motion });
  174 |   await page.goto("/#chart-sunburst");
  175 |   const host = page.locator('[data-rain-id="chart-sunburst"]');
  176 |   const controls = page.locator("[data-chart-default-controls]");
  177 |   const course = host.getByRole("button", { name: "查看基础课程", exact: true });
  178 |   await course.focus();
  179 |   await course.press("Enter");
  180 |   const back = host.getByRole("link", { name: "返回学习内容", exact: true });
  181 |   await expect(back).toBeFocused();
  182 |   await expect(host.getByRole("group", { name: /当前层级/ })).toContainText("视频");
  183 |   await expect(host.getByRole("button", { name: "查看视频", exact: true })).toHaveCount(0);
  184 |   for (const label of ["更新数据", "重播动效"]) {
  185 |     const update = controls.getByRole("button", { name: label, exact: true });
  186 |     await update.focus();
  187 |     await update.press("Enter");
  188 |     await expect(back).toBeVisible();
  189 |     await expect(host.getByText("基础课程", { exact: true })).toHaveAttribute("aria-current", "page");
  190 |     await expect(update).toBeFocused();
  191 |   }
  192 |   await back.focus();
  193 |   await back.press("Enter");
  194 |   await expect(course).toBeFocused();
  195 |   await course.press("Space");
  196 |   await expect(back).toBeFocused();
  197 |   const state = controls.getByRole("combobox", { name: "示例状态", exact: true });
  198 |   await state.focus();
  199 |   await state.selectOption("long");
  200 |   await expect(state).toBeFocused();
  201 |   await expect(host.getByRole("heading", { name: "学习内容", exact: true })).toBeVisible();
  202 |   await page.setViewportSize({ width: 390, height: 1000 });
  203 |   const longCourse = host.getByRole("button", { name: /查看基础课程/ });
  204 |   await longCourse.focus();
  205 |   await longCourse.press("Enter");
  206 |   const video = host.getByRole("button", { name: "查看视频", exact: true });
  207 |   await video.focus();
  208 |   await video.press("Space");
> 209 |   await expect(back).toBeFocused();
      |                      ^ Error: expect(locator).toBeFocused() failed
  210 |   const breadcrumb = host.getByRole("navigation", { name: "学习内容层级" });
  211 |   await expect(breadcrumb.getByRole("link")).toHaveCount(2);
  212 |   await expect(host.getByRole("group", { name: /当前层级/ }).getByRole("button")).toHaveCount(0);
  213 |   await breadcrumb.getByRole("link").nth(1).focus();
  214 |   await breadcrumb.getByRole("link").nth(1).press("Enter");
  215 |   await expect(video).toBeFocused();
  216 |   await back.focus();
  217 |   await back.press("Enter");
  218 |   await expect(longCourse).toBeFocused();
  219 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  220 |   await longCourse.press("Enter");
  221 |   await state.focus();
  222 |   await state.selectOption("normal");
  223 |   await expect(state).toBeFocused();
  224 |   await expect(host.getByRole("heading", { name: "学习内容", exact: true })).toBeVisible();
  225 |   await host.getByText("查看精确数据", { exact: true }).click();
  226 |   await expect(host.locator("tbody tr")).toHaveCount(9);
  227 |   await mkdir(evidence, { recursive: true });
  228 |   await host.screenshot({ path: `${evidence}/e03-sunburst-${motion}-390.png` });
  229 |   await writeFile(`${evidence}/e03-sunburst-${motion}.json`, JSON.stringify({ motion, enterAndSpace: true, leafNotButton: true, multilevelReturn: true, externalFocusPreserved: true, width: 390 }, null, 2));
  230 | });
  231 | 
  232 | test("[T09] catalog navigation restores focus after the lazy chart page loads", async ({ page }) => {
  233 |   await page.goto("/#components");
  234 |   const group = page.getByRole("region", { name: "G4 · 图表与图表基础" });
  235 |   await expect(group.getByRole("link")).toHaveCount(CHART_ENTRIES.length + 3);
  236 |   await group.getByRole("link", { name: "面积图", exact: true }).click();
  237 |   const heading = page.getByRole("heading", { name: "面积图", level: 1 });
  238 |   await expect(heading).toBeFocused();
  239 |   await page.getByRole("link", { name: "返回组件目录" }).click();
  240 |   await expect(group).toBeVisible();
  241 | });
  242 | 
  243 | test("[T09] all 17 native documentation entries render, read and expose their actual source", async ({ page }) => {
  244 |   await page.emulateMedia({ reducedMotion: "reduce" });
  245 |   const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
  246 |   await mkdir(evidence, { recursive: true });
  247 |   const entries=CHART_ENTRIES.filter(entry => entry.origin === "bklit");
  248 |   expect(entries).toHaveLength(17);
  249 |   for (const entry of entries) {
  250 |     await page.goto(`/#chart-${entry.id}`);
  251 |     await expect(page.getByRole("heading", { level: 1, name: entry.label })).toBeVisible();
  252 |     const chart = page.locator(`[data-rain-id="chart-${entry.id}"]`);
  253 |     await expect(chart.locator("svg").first()).toBeVisible();
  254 |     await chart.getByText("查看精确数据", { exact: true }).click();
  255 |     await expect(chart.locator("tbody tr").first()).toBeVisible();
  256 |     await page.getByText("调用配置、完整源码与示例数据", { exact: true }).click();
  257 |     await expect(page.getByRole("link", { name: "下载 chart-examples.tsx", exact: true })).toHaveAttribute("href", /AreaChart|LineChart/);
  258 |     await page.getByRole("combobox", { name: "示例源码文件" }).selectOption("chart-data.ts");
  259 |     await expect(page.locator('.rain-chart-source[data-source="default"] pre')).toContainText("makeTimeline");
  260 |     await page.getByText("调用配置、完整源码与示例数据", { exact: true }).click();
  261 |     await page.screenshot({ path: `${evidence}/${entry.id}.png`, fullPage: true });
  262 |   }
  263 |   expect(errors).toEqual([]);
  264 |   await writeFile(`${evidence}/entry-facts.json`, JSON.stringify({ entries: entries.map(entry => entry.id), errors }, null, 2));
  265 | });
  266 | 
  267 | test("[T09] recipe source stays current and the narrow chart doc does not overflow", async ({ page }) => {
  268 |   await page.setViewportSize({ width: 390, height: 1000 });
  269 |   await page.emulateMedia({ reducedMotion: "reduce" });
  270 |   await page.goto("/#chart-bar");
  271 |   await page.getByRole("combobox", { name: "视觉配方" }).selectOption("bar-fade");
  272 |   await page.getByText("调用配置、完整源码与示例数据", { exact: true }).click();
  273 |   await expect(page.locator('.rain-chart-source[data-source="default"] pre')).toContainText('data-recipe="bar-fade"');
  274 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  275 |   await page.screenshot({ path: `${evidence}/bar-fade-390.png`, fullPage: true });
  276 | });
  277 | 
  278 | test("[T09] chart styles leave a normal Rain switch unchanged", async ({ page }) => {
  279 |   await page.goto("/#switch");
  280 |   const control = page.getByRole("switch", { name: "自动发布" });
  281 |   await expect(control).toBeVisible();
  282 |   const style = () => control.evaluate(node => {
  283 |     const css = getComputedStyle(node); return [css.width, css.height, css.fontFamily, css.backgroundColor, css.borderRadius];
  284 |   });
  285 |   const before = await style();
  286 |   await page.evaluate(() => { location.hash = "#chart-area"; });
  287 |   await expect(page.getByRole("heading", { level: 1, name: "面积图" })).toBeVisible();
  288 |   await page.getByRole("link", { name: "返回组件目录" }).click();
  289 |   await page.getByRole("link", { name: "Switch 开关", exact: true }).click();
  290 |   await expect(control).toBeVisible();
  291 |   expect(await style()).toEqual(before);
  292 | });
  293 | 
  294 | test("blue-gray monochrome repaints actual bars, areas and stage gradients and restores the previous recipe", async ({ page }) => {
  295 |   await page.emulateMedia({ reducedMotion: "reduce" });
  296 |   const colors = ["#6288C7", "#3F5D91", "#91B0E1", "#BFD3F2", "#E5EEFC"];
  297 |   const facts = [];
  298 |   for (const id of ["bar", "area", "funnel"]) {
  299 |     await page.goto(`/#chart-${id}`);
  300 |     const host = page.locator(`[data-rain-id="chart-${id}"]`);
  301 |     const select = page.getByRole("combobox", { name: "视觉配方", exact: true });
  302 |     const previousRecipe = await select.inputValue();
  303 |     const previousColors = await host.evaluate(node => Array.from({ length: 5 }, (_, i) => getComputedStyle(node).getPropertyValue(`--chart-${i + 1}`).trim()));
  304 |     await select.selectOption("monochrome-blue", { timeout: 5000 });
  305 |     await expect(host).toHaveAttribute("data-recipe", "monochrome-blue");
  306 |     expect(await host.evaluate(node => Array.from({ length: 5 }, (_, i) => getComputedStyle(node).getPropertyValue(`--chart-${i + 1}`).trim()))).toEqual(colors);
  307 |     if (id === "bar") {
  308 |       expect(await host.locator('g[class^="bar-series-"] rect').evaluateAll(nodes => [...new Set(nodes.map(node => getComputedStyle(node).fill))])).toEqual(["rgb(98, 136, 199)", "rgb(63, 93, 145)", "rgb(145, 176, 225)"]);
  309 |       await host.locator(".legend-container button").first().focus();
```