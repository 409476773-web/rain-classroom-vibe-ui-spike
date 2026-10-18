import { writeFileSync } from "node:fs";
import { expect, test, type Locator, type TestInfo } from "@playwright/test";

async function attachJson(info: TestInfo, name: string, value: unknown) {
  const path = info.outputPath(`${name}.json`);
  writeFileSync(path, JSON.stringify(value, null, 2));
  await info.attach(name, { path, contentType: "application/json" });
}
const playground = "http://127.0.0.1:5392", prototype = "http://127.0.0.1:5393";
async function tokenConsumption(locator: Locator, property: string, variable: string) {
  await expect(locator).toBeVisible();
  const result = await locator.evaluate((node, { property, variable }) => {
    const current = getComputedStyle(node), probe = document.createElement("span");
    probe.style.cssText = "position:fixed;visibility:hidden;pointer-events:none";
    probe.style.setProperty(property, `var(${variable})`); node.append(probe);
    const result = { property, variable, actual: current.getPropertyValue(property), token: current.getPropertyValue(variable).trim(), resolved: getComputedStyle(probe).getPropertyValue(property) };
    probe.remove(); return result;
  }, { property, variable });
  expect(result.token).not.toBe(""); expect(result.actual).toBe(result.resolved); return result;
}
test.afterEach(async ({ page }) => expect((await page.pageErrors()).map(error => error.message)).toEqual([]));

test("[B01-local] spinner and menu labels use the registered semibold role", async ({ page }, info) => {
  await page.goto(`${playground}/#spinner`);
  const spinner = await tokenConsumption(page.locator(".component-doc__loading-result strong"), "font-weight", "--rain-font-weight-semibold");
  await page.locator(".component-doc__loading-result").screenshot({ path: info.outputPath("spinner-role.png") });
  await page.goto(`${playground}/#navigation-menu`); await page.getByRole("button", { name: "教学空间", exact: true }).click();
  const menu = await tokenConsumption(page.locator(".g3-doc-nav-link strong").first(), "font-weight", "--rain-font-weight-semibold");
  await page.locator(".rain-navigation-menu-content").screenshot({ path: info.outputPath("navigation-label.png") });
  await attachJson(info, "computed-typography", { spinner, menu });
});

test("[B01-local] slider label and output roles and task pagination width are computed", async ({ page }, info) => {
  await page.goto(`${playground}/#slider`);
  const label = await tokenConsumption(page.locator(".slider-example__heading > label").first(), "font-weight", "--rain-font-weight-semibold");
  const output = await tokenConsumption(page.locator(".slider-example__heading > output").first(), "font-weight", "--rain-font-weight-semibold");
  await page.locator(".slider-example__heading").first().screenshot({ path: info.outputPath("slider-label-output.png") });
  await page.goto(`${playground}/#drawer`); await page.getByRole("button", { name: /^查看任务：/ }).first().click();
  const position = page.locator(".g6-task-details-position"); await expect(position).toBeVisible(); await expect(position).toHaveCSS("min-width", "48px");
  const width = (await position.boundingBox())!.width; expect(width).toBeGreaterThanOrEqual(48);
  await page.locator(".g6-task-details-footer").screenshot({ path: info.outputPath("task-pagination.png") });
  await attachJson(info, "computed-local-roles", { label, output, pagination: { minWidth: "48px", width } });
});

test("[B01-local] exam display-mode width remains local and its selection works", async ({ page }, info) => {
  await page.goto(`${prototype}/#exam-editor`); await page.locator(".em-question").first().hover(); await page.getByRole("button", { name: "移动到", exact: true }).first().click();
  const modes = page.locator(".em-display-modes"); await expect(modes).toBeVisible(); await expect(modes).toHaveCSS("width", "240px");
  await modes.getByRole("tab", { name: "紧凑", exact: true }).click(); await expect(modes.getByRole("tab", { name: "紧凑", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(modes).toHaveCSS("width", "240px"); await page.locator(".em-target-toolbar").screenshot({ path: info.outputPath("exam-display-modes.png") });
});

test("[B01-local] Bklit active link and data disclosure resolve semantic roles", async ({ page }, info) => {
  await page.goto(`${prototype}/bklit-validation.html`);
  const link = page.getByRole("link", { name: "查看 G2 实验 ↗" });
  const linkColor = await tokenConsumption(link, "color", "--rain-color-text-link");
  await page.keyboard.press("Tab"); await link.focus(); await expect(link).toHaveCSS("outline-width", "2px");
  const linkFocus = await tokenConsumption(link, "outline-color", "--rain-color-focus-control");
  await page.locator(".bklit-page-heading").screenshot({ path: info.outputPath("bklit-link-focus.png") });
  const summary = page.locator(".bklit-data summary").first(); await summary.focus(); await expect(summary).toHaveCSS("outline-width", "2px");
  const chartFocus = await tokenConsumption(summary, "outline-color", "--rain-color-focus-control");
  await summary.screenshot({ path: info.outputPath("bklit-data-focus.png") });
  await attachJson(info, "computed-color-roles", { linkColor, linkFocus, chartFocus });
});

for (const entry of [
  { name: "drawer", url: `${playground}/drawer-refinement-consumer.html`, selector: "button" },
  { name: "bklit-validation", url: `${prototype}/bklit-validation.html`, selector: ".bklit-lab" },
  { name: "bklit-catalog", url: `${prototype}/bklit-catalog.html`, selector: ".rain-chart-catalog" },
]) test(`[B01-entry] ${entry.name} loads its declared Foundation motion dependency`, async ({ page }, info) => {
  await page.goto(entry.url); const consumer = page.locator(entry.selector).first(); await expect(consumer).toBeVisible();
  const fact = await consumer.evaluate(node => ({ feedback: getComputedStyle(node).getPropertyValue("--rain-motion-feedback-duration").trim(), overlay: getComputedStyle(node).getPropertyValue("--rain-motion-overlay-duration").trim(), region: getComputedStyle(node).getPropertyValue("--rain-motion-region-duration").trim(), ease: getComputedStyle(node).getPropertyValue("--rain-motion-ease-out").trim(), uiButtonCount: document.querySelectorAll(".rain-button").length, inputNumberCount: document.querySelectorAll('[data-rain-id="ui-input-number"]').length, fieldStyleRegistered: [...document.styleSheets].some(sheet => [...sheet.cssRules].some(rule => rule.cssText.includes("--rain-field-focus-line:"))) }));
  await attachJson(info, "entry-computed-dependencies", fact);
  await page.screenshot({ path: info.outputPath(`${entry.name}-entry.png`), fullPage: false });
  if (entry.name === "bklit-catalog") { expect(fact.uiButtonCount).toBeGreaterThan(0); expect(fact.fieldStyleRegistered).toBe(true); }
  expect(fact.feedback).not.toBe(""); expect(fact.overlay).not.toBe(""); expect(fact.region).not.toBe(""); expect(fact.ease).not.toBe("");
});
