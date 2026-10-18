import { expect, test } from "@playwright/test";
import { resolve } from "node:path";
import { writeFileSync } from "node:fs";

test("Button contract observes aria-disabled variants and preserves supported activation guards", async ({ page }, info) => {
  await page.goto("/#components");
  await page.evaluate(async url => (await import(url)).mountButtonContractFixture(), `/@fs${resolve("tests/e2e/button-contract.fixture.tsx")}`);
  const facts = [];
  for (const variant of ["primary", "secondary", "tertiary", "text"]) for (const mode of ["true", "string-true", "false", "string-false", "loading", "disabled"]) {
    const scope = page.locator(`[data-button-case="${variant}-${mode}"]`), button = scope.getByRole("button");
    await button.scrollIntoViewIfNeeded();
    const box = (await button.boundingBox())!;
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    const mouse = JSON.parse((await scope.locator("output").getAttribute("data-counts"))!);
    if (mode !== "disabled") {
      await button.focus(); await expect(button).toBeFocused();
      await page.keyboard.press("Enter"); await page.keyboard.press("Space");
    } else await expect(button).toBeDisabled();
    const result = JSON.parse((await scope.locator("output").getAttribute("data-counts"))!);
    const guarded = mode === "loading" || mode === "disabled" || (variant === "text" && ["true", "string-true"].includes(mode));
    if (guarded) expect(result).toEqual({ clicks: 0, submits: 0, bubbles: 0 });
    if (["false", "string-false"].includes(mode)) expect(result).toEqual({ clicks: 3, submits: 3, bubbles: 3 });
    // Non-text aria-disabled alone is observed, not promoted to an activation contract.
    facts.push({ variant, mode, mouse, afterKeyboard: result, supportedGuard: guarded });
  }
  writeFileSync(info.outputPath("button-contract.json"), JSON.stringify(facts, null, 2));
  await page.locator("#button-contract").screenshot({ path: info.outputPath("button-contract.png") });
  expect((await page.pageErrors()).map(error => error.message)).toEqual([]);
});
