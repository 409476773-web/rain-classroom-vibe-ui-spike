# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: css-local-consumption.spec.ts >> [B01-entry] drawer loads its declared Foundation motion dependency
- Location: tests/e2e/css-local-consumption.spec.ts:63:4

# Error details

```
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - button "顶部带把手" [ref=e3] [cursor=pointer]
  - button "顶部无把手" [ref=e5] [cursor=pointer]
  - button "底部带把手" [ref=e7] [cursor=pointer]
  - button "底部无把手" [ref=e9] [cursor=pointer]
```

# Test source

```ts
  1  | import { writeFileSync } from "node:fs";
  2  | import { expect, test, type Locator, type TestInfo } from "@playwright/test";
  3  | 
  4  | async function attachJson(info: TestInfo, name: string, value: unknown) {
  5  |   const path = info.outputPath(`${name}.json`);
  6  |   writeFileSync(path, JSON.stringify(value, null, 2));
  7  |   await info.attach(name, { path, contentType: "application/json" });
  8  | }
  9  | const playground = "http://127.0.0.1:5392", prototype = "http://127.0.0.1:5393";
  10 | async function tokenConsumption(locator: Locator, property: string, variable: string) {
  11 |   await expect(locator).toBeVisible();
  12 |   const result = await locator.evaluate((node, { property, variable }) => {
  13 |     const current = getComputedStyle(node), probe = document.createElement("span");
  14 |     probe.style.cssText = "position:fixed;visibility:hidden;pointer-events:none";
  15 |     probe.style.setProperty(property, `var(${variable})`); node.append(probe);
  16 |     const result = { property, variable, actual: current.getPropertyValue(property), token: current.getPropertyValue(variable).trim(), resolved: getComputedStyle(probe).getPropertyValue(property) };
  17 |     probe.remove(); return result;
  18 |   }, { property, variable });
  19 |   expect(result.token).not.toBe(""); expect(result.actual).toBe(result.resolved); return result;
  20 | }
  21 | test.afterEach(async ({ page }) => expect((await page.pageErrors()).map(error => error.message)).toEqual([]));
  22 | 
  23 | test("[B01-local] spinner and menu labels use the registered semibold role", async ({ page }, info) => {
  24 |   await page.goto(`${playground}/#spinner`);
  25 |   const spinner = await tokenConsumption(page.locator(".component-doc__loading-result strong"), "font-weight", "--rain-font-weight-semibold");
  26 |   await page.locator(".component-doc__loading-result").screenshot({ path: info.outputPath("spinner-role.png") });
  27 |   await page.goto(`${playground}/#navigation-menu`); await page.getByRole("button", { name: "教学空间", exact: true }).click();
  28 |   const menu = await tokenConsumption(page.locator(".g3-doc-nav-link strong").first(), "font-weight", "--rain-font-weight-semibold");
  29 |   await page.locator(".rain-navigation-menu-content").screenshot({ path: info.outputPath("navigation-label.png") });
  30 |   await attachJson(info, "computed-typography", { spinner, menu });
  31 | });
  32 | 
  33 | test("[B01-local] slider label and output roles and task pagination width are computed", async ({ page }, info) => {
  34 |   await page.goto(`${playground}/#slider`);
  35 |   const label = await tokenConsumption(page.locator(".slider-example__heading > label").first(), "font-weight", "--rain-font-weight-semibold");
  36 |   const output = await tokenConsumption(page.locator(".slider-example__heading > output").first(), "font-weight", "--rain-font-weight-semibold");
  37 |   await page.locator(".slider-example__heading").first().screenshot({ path: info.outputPath("slider-label-output.png") });
  38 |   await page.goto(`${playground}/#drawer`); await page.getByRole("button", { name: /^查看任务：/ }).first().click();
  39 |   const position = page.locator(".g6-task-details-position"); await expect(position).toBeVisible(); await expect(position).toHaveCSS("min-width", "48px");
  40 |   const width = (await position.boundingBox())!.width; expect(width).toBeGreaterThanOrEqual(48);
  41 |   await page.locator(".g6-task-details-footer").screenshot({ path: info.outputPath("task-pagination.png") });
  42 |   await attachJson(info, "computed-local-roles", { label, output, pagination: { minWidth: "48px", width } });
  43 | });
  44 | 
  45 | test("[B01-local] exam display-mode width remains local and its selection works", async ({ page }, info) => {
  46 |   await page.goto(`${prototype}/#exam-editor`); await page.getByRole("button", { name: "移动到", exact: true }).first().click();
  47 |   const modes = page.locator(".em-display-modes"); await expect(modes).toBeVisible(); await expect(modes).toHaveCSS("width", "240px");
  48 |   await modes.getByRole("tab", { name: "紧凑", exact: true }).click(); await expect(modes.getByRole("tab", { name: "紧凑", exact: true })).toHaveAttribute("aria-selected", "true");
  49 |   await expect(modes).toHaveCSS("width", "240px"); await page.locator(".em-target-toolbar").screenshot({ path: info.outputPath("exam-display-modes.png") });
  50 | });
  51 | 
  52 | test("[B01-local] Bklit real link and both focus surfaces resolve semantic roles", async ({ page }, info) => {
  53 |   await page.goto(`${prototype}/bklit-validation.html`);
  54 |   const link = page.getByRole("link", { name: "查看 G2 实验 ↗" });
  55 |   const linkColor = await tokenConsumption(link, "color", "--rain-color-text-link");
  56 |   await page.keyboard.press("Tab"); await link.focus(); await expect(link).toHaveCSS("outline-width", "2px");
  57 |   const linkFocus = await tokenConsumption(link, "outline-color", "--rain-color-focus-control");
  58 |   await page.locator(".bklit-page-heading").screenshot({ path: info.outputPath("bklit-link-focus.png") });
  59 |   const summary = page.locator(".rain-chart summary").first(); await summary.focus(); await expect(summary).toHaveCSS("outline-width", "2px");
  60 |   const chartFocus = await tokenConsumption(summary, "outline-color", "--rain-color-focus-control");
  61 |   await summary.screenshot({ path: info.outputPath("bklit-chart-focus.png") });
  62 |   await attachJson(info, "computed-color-roles", { linkColor, linkFocus, chartFocus });
  63 | });
  64 | 
  65 | for (const entry of [
  66 |   { name: "drawer", url: `${playground}/drawer-refinement-consumer.html`, selector: "button" },
  67 |   { name: "bklit-validation", url: `${prototype}/bklit-validation.html`, selector: ".bklit-lab" },
> 68 |   { name: "bklit-catalog", url: `${prototype}/bklit-catalog.html`, selector: ".rain-chart-catalog" },
     |                             ^ Error: expect(received).not.toBe(expected) // Object.is equality
  69 | ]) test(`[B01-entry] ${entry.name} loads its declared Foundation motion dependency`, async ({ page }, info) => {
  70 |   await page.goto(entry.url); const consumer = page.locator(entry.selector).first(); await expect(consumer).toBeVisible();
  71 |   const fact = await consumer.evaluate(node => ({ feedback: getComputedStyle(node).getPropertyValue("--rain-motion-feedback-duration").trim(), overlay: getComputedStyle(node).getPropertyValue("--rain-motion-overlay-duration").trim(), region: getComputedStyle(node).getPropertyValue("--rain-motion-region-duration").trim(), ease: getComputedStyle(node).getPropertyValue("--rain-motion-ease-out").trim(), uiButtonCount: document.querySelectorAll(".rain-button").length, inputNumberCount: document.querySelectorAll('[data-rain-id="ui-input-number"]').length }));
  72 |   await attachJson(info, "entry-computed-dependencies", fact);
  73 |   await page.screenshot({ path: info.outputPath(`${entry.name}-entry.png`), fullPage: false });
  74 |   expect(fact.feedback).not.toBe(""); expect(fact.overlay).not.toBe(""); expect(fact.region).not.toBe(""); expect(fact.ease).not.toBe("");
  75 | });
  76 | 
```